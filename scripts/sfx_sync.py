#!/usr/bin/env python3
"""Fabrica 2.0 - diseno de sonido sincronizado con spec.js (sin edicion manual de tiempos).

Lee projects/<p>/film2d/spec.js (los mismos tiempos reales que usa el motor) y assets/audio/timeline.json y genera:
    assets/audio/sfx.wav          pista de efectos (48 kHz estereo) alineada con la locucion desde t=0
    assets/audio/sfx_events.json  lista de eventos (para revisar que suena y cuando)

Eventos:
    swish  cada cambio de pose del Stickman (dentro de la escena y en el corte si la pose cambia) y cada inicio de caminata
    click  cada vineta de texto que aparece (chips c, texto grande big, notas)
    pop    cada ilustracion / widget / prop que aparece (mas suave que el click)
Los niveles son picos absolutos muy por debajo de la voz (que sale del limitador cerca de -1.5 dBFS);
fabrica_video.py suma esta pista a la voz ANTES de normalizar a -14 LUFS, asi que el balance se mantiene.

Uso:  python scripts/sfx_sync.py <proyecto> [--click-db -20] [--swish-db -17] [--pop-db -23] [--sin-pop]
"""
import argparse, json, subprocess, sys
from pathlib import Path
import numpy as np

REPO = Path(__file__).resolve().parents[1]
SFX_DIR = REPO / ".agents/skills/hyperframes-media/assets/sfx"     # libreria Pixabay (licencia libre, ver CREDITS.md)
SR = 48000
ARCHIVOS = {"swish": "whoosh-short.mp3", "click": "click-soft.mp3", "pop": "pop.mp3"}
ADELANTO = {"swish": 0.08, "click": 0.0, "pop": 0.02}   # s: el roce arranca un poco antes del golpe de la pose
MIN_SEP = {"swish": 0.35, "click": 0.14, "pop": 0.20}  # s: dos eventos del mismo tipo mas juntos se funden en uno

# Evalua spec.js con los mismos SENT que el motor y devuelve root.SCENES como JSON
NODE_EVAL = r"""
const fs = require("fs"); const tl = JSON.parse(fs.readFileSync(process.argv[2], "utf8"));
global.window = { KIT: { C: new Proxy({}, { get: (_, k) => String(k) }) }, SENT: tl.sentences.map(s => [s.start, s.end]) };
eval(fs.readFileSync(process.argv[1], "utf8"));
process.stdout.write(JSON.stringify(window.SCENES));
"""


def cargar(nombre):
    f = SFX_DIR / ARCHIVOS[nombre]
    raw = subprocess.run(["ffmpeg", "-v", "error", "-i", str(f), "-ac", "2", "-ar", str(SR), "-f", "f32le", "-"], capture_output=True, check=True).stdout
    x = np.frombuffer(raw, dtype=np.float32).reshape(-1, 2).copy()
    return x / (np.abs(x).max() or 1.0)                    # pico 1.0: el nivel lo pone el argumento en dB


def items(filas):
    for fila in filas or []:
        for it in fila:
            if it.get("row") or it.get("col"):
                yield from items([it.get("row") or it.get("col")])
            else:
                yield it


def eventos(scenes, sin_pop):
    ev, pose_prev = [], None
    for sc in sorted(scenes, key=lambda s: s["a"]):
        poses = sc.get("poses") or ([[sc["a"], "idle"]] if "c" in sc.get("L", "cg") else [])
        for k, (t, nombre, *_) in enumerate(poses):
            if nombre != pose_prev and (k or pose_prev is not None):
                ev.append(("swish", float(t), f"pose {pose_prev} -> {nombre}"))
            pose_prev = nombre
        if sc.get("walk"):
            ev.append(("swish", float(sc["walk"][0]), "caminata"))
        for it in items(sc.get("g")):
            t = it.get("t", sc["a"])
            if t is None: continue
            if it.get("c") is not None or it.get("big") is not None or (it.get("n") is not None and it.get("w") is None and it.get("p") is None):
                ev.append(("click", float(t), str(it.get("c") or it.get("big") or it.get("n"))))
            elif not sin_pop and (it.get("w") or it.get("p") or it.get("img")):
                ev.append(("pop", float(t), str(it.get("w") or it.get("p") or it.get("img"))))
    ev.sort(key=lambda e: e[1])
    out, ultimo = [], {}
    for tipo, t, que in ev:
        if t - ultimo.get(tipo, -1e9) < MIN_SEP[tipo]: continue
        ultimo[tipo] = t; out.append({"tipo": tipo, "t": round(max(0.0, t - ADELANTO[tipo]), 3), "que": que})
    return out


def main():
    ap = argparse.ArgumentParser(); ap.add_argument("proyecto")
    ap.add_argument("--click-db", type=float, default=-20.0); ap.add_argument("--swish-db", type=float, default=-17.0)
    ap.add_argument("--pop-db", type=float, default=-23.0); ap.add_argument("--sin-pop", action="store_true")
    a = ap.parse_args()
    P = REPO / "projects" / a.proyecto; AU = P / "assets/audio"
    spec, tlf = P / "film2d/spec.js", AU / "timeline.json"
    if not spec.exists() or not tlf.exists(): sys.exit(f"Falta {spec} o {tlf} (corre antes la voz).")
    r = subprocess.run(["node", "-e", NODE_EVAL, str(spec), str(tlf)], capture_output=True, text=True, encoding="utf-8")
    if r.returncode: sys.exit("No pude evaluar spec.js:\n" + r.stderr)
    ev = eventos(json.loads(r.stdout), a.sin_pop)
    total = json.load(open(tlf, encoding="utf-8"))["duration"]
    buf = np.zeros((int((total + 2) * SR), 2), dtype=np.float32)
    gan = {"swish": 10 ** (a.swish_db / 20), "click": 10 ** (a.click_db / 20), "pop": 10 ** (a.pop_db / 20)}
    snd = {k: cargar(k) for k in {e["tipo"] for e in ev}}
    for e in ev:
        x = snd[e["tipo"]] * gan[e["tipo"]]; i = int(e["t"] * SR); j = min(len(buf), i + len(x))
        buf[i:j] += x[: j - i]
    buf = buf[: int(total * SR)]
    pico = float(np.abs(buf).max()) if len(buf) else 0.0
    if pico > 0.5: buf *= 0.5 / pico                       # varios efectos encimados nunca deben acercarse al nivel de la voz
    AU.mkdir(parents=True, exist_ok=True)
    subprocess.run(["ffmpeg", "-y", "-v", "error", "-f", "f32le", "-ar", str(SR), "-ac", "2", "-i", "-", "-c:a", "pcm_s16le", str(AU / "sfx.wav")],
                   input=buf.tobytes(), check=True)
    (AU / "sfx_events.json").write_text(json.dumps(ev, ensure_ascii=False, indent=1), encoding="utf-8")
    n = {k: sum(e["tipo"] == k for e in ev) for k in ARCHIVOS}
    print(f"  efectos: {n['swish']} swish, {n['click']} clicks, {n['pop']} pops -> {AU / 'sfx.wav'} (pico {20 * np.log10(max(pico, 1e-9)):.1f} dBFS)")


if __name__ == "__main__":
    main()

#!/usr/bin/env python3
"""Fabrica de videos de finanzas (estilo 2D stick figure, HyperFrames + GSAP, voz Piper davefx, musica lo-fi).

Hace de forma desatendida todo lo mecanico, a partir de un proyecto que ya tiene:
    projects/<proyecto>/guion_*.txt     guion en espanol ("## SECCION" + una frase por linea)
    projects/<proyecto>/film2d/spec.js  plano de escenas (lo disena Claude: ver REGLAS_VIDEO.md)

Etapas (cada una se salta si su resultado ya existe; --force las repite):
  1 plantilla  copia motor/voz/audit desde projects/fondos-indexados si el proyecto no los tiene
  2 voz        Piper davefx + rubberband + cadena broadcast  -> assets/audio/narration.wav + timeline.json
  3 build      compone las partes HyperFrames (f1..fN)
  4 auditoria  recorre la linea de tiempo y exige 0 solapes / 0 elementos fuera de su celda
  5 render     UNA parte a la vez, 1 hilo, pausa entre partes y espera de RAM libre
  6 musica     descarga pista lo-fi libre (Pixabay) si falta y mezcla por debajo de la voz
  7 final      une las partes, muxea el audio y verifica la duracion -> renders/final.mp4

Uso:  python fabrica_video.py <proyecto> [--musica "lo-fi chill instrumental"] [--force] [--sin-render]
"""
import argparse, ctypes, json, shutil, subprocess, sys, time
from pathlib import Path

REPO = Path(__file__).resolve().parent
PLANTILLA = REPO / "projects/fondos-indexados"
PAUSA_ENTRE_PARTES = 20      # s
RAM_MIN_MB = 1000            # espera hasta tener al menos esta RAM libre antes de cada parte
VOL_MUSICA = 0.20            # musica ~18 dB por debajo de la voz


def run(cmd, cwd=None, check=True, **kw):
    print("  $", " ".join(map(str, cmd)) if isinstance(cmd, list) else cmd, flush=True)
    return subprocess.run(cmd, cwd=cwd, check=check, shell=isinstance(cmd, str), **kw)


def ram_libre_mb():
    class M(ctypes.Structure):
        _fields_ = [("l", ctypes.c_ulong), ("load", ctypes.c_ulong), ("tp", ctypes.c_ulonglong), ("ap", ctypes.c_ulonglong),
                    ("tpf", ctypes.c_ulonglong), ("apf", ctypes.c_ulonglong), ("tv", ctypes.c_ulonglong), ("av", ctypes.c_ulonglong), ("ae", ctypes.c_ulonglong)]
    m = M(); m.l = ctypes.sizeof(M); ctypes.windll.kernel32.GlobalMemoryStatusEx(ctypes.byref(m)); return m.ap // 2**20


def dur(path):
    return float(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", str(path)], capture_output=True, text=True).stdout.strip())


def main():
    ap = argparse.ArgumentParser(); ap.add_argument("proyecto"); ap.add_argument("--musica", default="lo-fi chill instrumental")
    ap.add_argument("--force", action="store_true"); ap.add_argument("--sin-render", action="store_true")
    a = ap.parse_args()
    P = REPO / "projects" / a.proyecto; HF = P / "hyperframes"; R = P / "renders"; AU = P / "assets/audio"
    guiones = sorted(P.glob("guion_*.txt"))
    if not guiones or not (P / "film2d/spec.js").exists():
        sys.exit(f"Falta guion_*.txt o film2d/spec.js en {P}. Pide a Claude que redacte el guion y disene spec.js (ver REGLAS_VIDEO.md).")

    print("[1] plantilla")
    if P != PLANTILLA:
        for f in ["voice.py", "hyperframes/audit_dyn.cjs", "hyperframes/render_film2d.sh"] + [f"film2d/{x}" for x in ["engine.js", "kitshim.js", "widgets.js", "template.tpl", "gsap.min.js", "props.js", "build.py"]]:
            if not (P / f).exists():
                (P / f).parent.mkdir(parents=True, exist_ok=True); shutil.copy(PLANTILLA / f, P / f)
        if guiones[0].name != "guion_fondos.txt":                       # voice.py lee guion_fondos.txt
            t = (P / "voice.py").read_text(encoding="utf-8").replace("guion_fondos.txt", guiones[0].name); (P / "voice.py").write_text(t, encoding="utf-8")

    print("[2] voz")
    if a.force or not (AU / "timeline.json").exists():
        run([sys.executable, "voice.py"], cwd=P, env={**__import__("os").environ, "PYTHONIOENCODING": "utf-8"})
    tl = json.load(open(AU / "timeline.json", encoding="utf-8")); print(f"  locucion {tl['duration']:.1f} s")

    print("[3] build")
    run([sys.executable, "film2d/build.py"], cwd=P, env={**__import__("os").environ, "PYTHONIOENCODING": "utf-8"})
    partes = sorted(d.name for d in HF.iterdir() if d.is_dir() and d.name[:1] == "f" and d.name[1:].isdigit())

    print("[4] auditoria de layout")
    for d in partes:
        out = subprocess.run(["node", "audit_dyn.cjs", d, "0.4"], cwd=HF, capture_output=True, text=True).stdout
        print("  " + out.strip().replace("\n", "\n  "))
        if " issues 0 " not in out:
            sys.exit(f"Auditoria con problemas en {d}: corrige spec.js y repite.")

    if not a.sin_render:
        print("[5] render por partes (1 hilo, una a la vez)")
        (R / "parts").mkdir(parents=True, exist_ok=True)
        for i, d in enumerate(partes):
            out = R / "parts" / f"{d}.mp4"
            if out.exists() and out.stat().st_size > 0 and not a.force:
                print(f"  {d} ya existe, salto"); continue
            if i: time.sleep(PAUSA_ENTRE_PARTES)
            while ram_libre_mb() < RAM_MIN_MB:
                print(f"  RAM libre {ram_libre_mb()} MB < {RAM_MIN_MB}: espero 30 s", flush=True); time.sleep(30)
            run(f'npx hyperframes render . --output "{out}" --workers 1 --fps 30', cwd=HF / d)
            if not out.exists() or out.stat().st_size == 0:
                sys.exit(f"Fallo el render de {d}")

    print("[6] musica y mezcla")
    mus = P / "assets/music/lofi.mp3"; mix = AU / "final_mix.m4a"
    if not mus.exists():
        mus.parent.mkdir(parents=True, exist_ok=True)
        sys.path.insert(0, str(REPO)); from tools.tool_registry import registry
        registry.discover()
        r = registry._tools["pixabay_music"].execute({"query": a.musica, "min_duration": 90, "max_duration": 300, "output_path": str(mus)})
        if not r.success: sys.exit(f"No pude bajar musica: {r.error}")
        (P / "assets/music/CREDITOS.txt").write_text(json.dumps(r.data, ensure_ascii=False, indent=1), encoding="utf-8")
    total = tl["duration"]
    if a.force or not mix.exists():
        # pista en bucle con fundido cruzado, volumen bajo la voz, fundidos de entrada/salida, limitador sin renormalizar
        filt = (f"[1:a]asplit=3[x1][x2][x3];[x1][x2]acrossfade=d=3[y];[y][x3]acrossfade=d=3,atrim=0:{total + 1:.2f},volume={VOL_MUSICA},afade=t=in:d=3,afade=t=out:st={total - 5:.2f}:d=5[m];"
                f"[0:a]apad=whole_dur={total:.2f}[v];[v][m]amix=inputs=2:duration=first:normalize=0,alimiter=limit=0.95:level=disabled,atrim=0:{total:.2f}")
        run(["ffmpeg", "-y", "-hide_banner", "-loglevel", "error", "-i", str(AU / "narration.wav"), "-i", str(mus), "-filter_complex", filt, "-c:a", "aac", "-b:a", "192k", str(mix)])

    if a.sin_render: return
    print("[7] union final")
    lista = R / "lista.txt"; lista.write_text("".join(f"file 'parts/{d}.mp4'\n" for d in partes), encoding="utf-8")
    final = R / "final.mp4"
    run(["ffmpeg", "-y", "-hide_banner", "-loglevel", "error", "-f", "concat", "-safe", "0", "-i", str(lista), "-i", str(mix), "-map", "0:v:0", "-map", "1:a:0", "-c:v", "copy", "-c:a", "copy", "-shortest", "-movflags", "+faststart", str(final)])
    dv, esperado = dur(final), total
    print(f"  {final}  {dv:.1f} s (locucion {esperado:.1f} s)  {final.stat().st_size / 2**20:.0f} MB")
    if abs(dv - esperado) > 1.5: sys.exit("La duracion final no coincide con la locucion: revisar las partes.")
    print("LISTO")


if __name__ == "__main__":
    main()

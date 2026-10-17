"""Short vertical 1080x1920 de "Un millón de pesos en 1980": primeros ~45 s del guion (frases 0-6) + tarjeta "Video completo en el canal".
Reutiliza la voz, la música, el motor y el kit del video largo; NO toca hyperframes/f1, f2 ni renders/final.mp4.
   python projects/inflacion-mexico/short/build_short.py build    -> short/hf/index.html (film2d/spec_short.js + film2d/template_short.tpl)
   python projects/inflacion-mexico/short/build_short.py audit    -> auditoría de layout, ítems y cámara (las mismas de la fábrica, en 1080x1920)
   python projects/inflacion-mexico/short/build_short.py audio    -> efectos desde spec_short.js, voz recortada y mezcla a -14 LUFS / TP <= -2
   python projects/inflacion-mexico/short/build_short.py render   -> renders/short_1980.mp4 (video + mezcla)"""
import json, re, shutil, subprocess, sys
from pathlib import Path

import numpy as np

HERE = Path(__file__).resolve().parent
PROJ = HERE.parent
REPO = PROJ.parents[1]
FILM, IT, HFL = PROJ / "film2d", REPO / "ink-theater", PROJ / "hyperframes"
OUT = HERE / "hf"; AU = HERE / "audio"; R = PROJ / "renders"
sys.path.insert(0, str(REPO)); sys.path.insert(0, str(REPO / "scripts"))

ULTIMA = 6                      # última frase del short: "...el dólar pasó a costar casi el doble" (40.5 s)
RESPIRO, TARJETA = 0.38, 4.1    # mismos valores que CUT / FIN en spec_short.js
TL = json.load(open(PROJ / "assets/audio/timeline.json", encoding="utf-8"))
SENT = TL["sentences"][: ULTIMA + 1]
CUT = SENT[-1]["end"] + RESPIRO
FIN = round(CUT + TARJETA, 3)


def build():
    if OUT.exists(): shutil.rmtree(OUT)
    (OUT / "assets").mkdir(parents=True)
    tls = dict(TL, sentences=SENT, duration=FIN)
    (HERE / "timeline_short.json").write_text(json.dumps(tls, ensure_ascii=False, indent=1), encoding="utf-8")
    # subtítulos: mismo reparto proporcional por palabra que film2d/build.py
    words = []
    for k, s in enumerate(SENT):
        toks = s["text"].split(); d = s["end"] - s["start"]
        wt = [max(len(re.sub(r"\W", "", x)), 1) + (2.5 if x[-1:] in ",;:" else 0) + (4 if x[-1:] in ".?!…" else 0) for x in toks]
        tot = sum(wt); tt = s["start"]
        for i, (tok, x) in enumerate(zip(toks, wt)):
            dd = d * x / tot
            words.append({"word": tok, "k": k, "startMs": int(round(tt * 1000)), "endMs": int(round((tt + dd) * 1000)),
                          "pageBreakAfter": i == len(toks) - 1 or tok[-1:] in ".?!"}); tt += dd
    grid_css = subprocess.run(["node", "-e", "global.window={};require(process.argv[1]);process.stdout.write(window.InkGrid.css())", str(IT / "ink-grid.js")],
                              capture_output=True, text=True, encoding="utf-8").stdout
    for f in ["ink-theater.js", "ink-pose.js", "ink-grid.js"]: shutil.copy(IT / f, OUT / f)
    for f in ["props.js", "kitshim.js", "widgets.js", "gsap.min.js"]: shutil.copy(FILM / f, OUT / f)
    shutil.copy(FILM / "spec_short.js", OUT / "spec.js")
    # la cámara del motor supone un cuadro de 1920 px de ancho: en vertical usa window.FRAME_W (1080)
    eng = (FILM / "engine.js").read_text(encoding="utf-8")
    if eng.count("1920") < 2: sys.exit("engine.js cambió: revisa el parche de ancho de cuadro")
    (OUT / "engine.js").write_text(eng.replace("1920", "(root.FRAME_W || 1920)"), encoding="utf-8")
    shutil.copy(IT / "assets/patrickhand.ttf", OUT / "assets/patrickhand.ttf"); shutil.copy(IT / "assets/OFL.txt", OUT / "assets/OFL.txt")
    (OUT / "ilus.js").write_text("window.ILUS={};", encoding="utf-8")      # el short no usa ilustraciones de la biblioteca
    (OUT / "sent.js").write_text("window.SENT=" + json.dumps([[round(s["start"], 3), round(s["end"], 3)] for s in SENT]) + ";", encoding="utf-8")
    data = {"a": 0.0, "b": FIN, "anchors": [[0.0, 0.0], [FIN, FIN]], "words": words}
    html = ((FILM / "template_short.tpl").read_text(encoding="utf-8").replace("/*__GRIDCSS__*/", grid_css)
            .replace("__DUR__", f"{FIN:.3f}").replace("__FIN__", f"{FIN:.3f}").replace("__DATA__", json.dumps(data, ensure_ascii=False)))
    (OUT / "index.html").write_text(html, encoding="utf-8")
    # herramientas de auditoría de la fábrica, con el viewport vertical
    for f in ["audit_dyn.cjs", "chk_items.cjs", "cam_check.cjs"]:
        t = (HFL / f).read_text(encoding="utf-8").replace("width: 1920, height: 1080", "width: 1080, height: 1920").replace("Math.min(1080,", "Math.min(1920,")
        (HERE / f).write_text(t, encoding="utf-8")
    print(f"short: frases 0-{ULTIMA}, corte {CUT:.2f} s, tarjeta final hasta {FIN:.2f} s, {len(words)} palabras -> {OUT / 'index.html'}")


def audit():
    ok = True
    for f, args in (("audit_dyn.cjs", ["0.4"]), ("chk_items.cjs", []), ("cam_check.cjs", ["0.2"])):
        r = subprocess.run(["node", str(HERE / f), str(OUT), *args], capture_output=True, text=True, encoding="utf-8")
        print(f"== {f} (exit {r.returncode})\n" + (r.stdout + r.stderr).strip()[-2500:])
        ok = ok and r.returncode == 0
    if not ok: sys.exit("auditoría con problemas")


def audio():
    import sfx_sync, fabrica_video as fv
    AU.mkdir(exist_ok=True)
    # efectos sincronizados con spec_short.js (mismo diseño de sonido que la fábrica: swish por pose, click por viñeta)
    r = subprocess.run(["node", "-e", sfx_sync.NODE_EVAL, str(FILM / "spec_short.js"), str(HERE / "timeline_short.json")],
                       capture_output=True, text=True, encoding="utf-8")
    if r.returncode: sys.exit("No pude evaluar spec_short.js:\n" + r.stderr)
    ev = sfx_sync.eventos(json.loads(r.stdout), False)
    SR = sfx_sync.SR; buf = np.zeros((int((FIN + 2) * SR), 2), dtype=np.float32)
    gan = {"swish": 10 ** (-17 / 20), "click": 10 ** (-20 / 20), "pop": 10 ** (-23 / 20)}
    snd = {k: sfx_sync.cargar(k) for k in {e["tipo"] for e in ev}}
    for e in ev:
        x = snd[e["tipo"]] * gan[e["tipo"]]; i = int(e["t"] * SR); j = min(len(buf), i + len(x)); buf[i:j] += x[: j - i]
    buf = buf[: int(FIN * SR)]; pico = float(np.abs(buf).max())
    if pico > 0.5: buf *= 0.5 / pico
    subprocess.run(["ffmpeg", "-y", "-v", "error", "-f", "f32le", "-ar", str(SR), "-ac", "2", "-i", "-", "-c:a", "pcm_s16le", str(AU / "sfx.wav")],
                   input=buf.tobytes(), check=True)
    (AU / "sfx_events.json").write_text(json.dumps(ev, ensure_ascii=False, indent=1), encoding="utf-8")
    n = {k: sum(e["tipo"] == k for e in ev) for k in ("swish", "click", "pop")}
    print(f"  efectos: {n['swish']} swish, {n['click']} clicks, {n['pop']} pops")
    # voz: la locución sin procesar hasta el silencio después de la frase 6 (la frase 7 empieza en el hueco siguiente)
    corte = SENT[-1]["end"] + 0.22
    subprocess.run(["ffmpeg", "-y", "-v", "error", "-i", str(PROJ / "assets/audio/narration_raw.wav"),
                    "-af", f"atrim=0:{corte:.3f},afade=t=out:st={corte - 0.12:.3f}:d=0.12", str(AU / "narration_raw.wav")], check=True)
    mix = AU / "short_mix.m4a"
    fv.mezclar_audio(AU, PROJ / "assets/music/lofi.mp3", FIN, mix, ["-c:a", "aac", "-b:a", "192k"])
    li, tp = fv.loudness(mix)
    print(f"  mezcla short: {li:.1f} LUFS, true peak {tp:+.1f} dBTP")
    if abs(li - fv.LUFS_OBJ) > 1.0 or tp > fv.TP_OBJ: sys.exit("mezcla fuera de objetivo")


def render():
    vid = HERE / "video.mp4"
    if not vid.exists() or vid.stat().st_mtime < (OUT / "index.html").stat().st_mtime:
        subprocess.run(f'npx hyperframes render . --output "{vid}" --workers 1 --fps 30', cwd=OUT, shell=True, check=True)
    out = R / "short_1980.mp4"
    subprocess.run(["ffmpeg", "-y", "-hide_banner", "-loglevel", "error", "-i", str(vid), "-i", str(AU / "short_mix.m4a"),
                    "-map", "0:v:0", "-map", "1:a:0", "-c:v", "copy", "-c:a", "copy", "-shortest", "-movflags", "+faststart", str(out)], check=True)
    print(f"  {out}")


if __name__ == "__main__":
    {"build": build, "audit": audit, "audio": audio, "render": render}[sys.argv[1]]()

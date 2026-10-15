"""Render minimalista del Escuadrón 201: fondo negro, textos de film/spec.js con ffmpeg drawtext (sin imágenes ni navegador).
Voz: assets/audio/narration_raw.wav (voice.py). Mezcla con fabrica_video.mezclar_audio (-14 LUFS, TP <= -2 dBTP). Salida: renders/final.mp4"""
import json, shutil, subprocess, sys
from pathlib import Path
from PIL import ImageFont

F = Path(__file__).resolve().parent; P = F.parent; REPO = P.parents[1]; AU = P / "assets/audio"
sys.path.insert(0, str(REPO)); import fabrica_video as fv
FONT, W, H, FPS = "C:/Windows/Fonts/impact.ttf", 1920, 1080, 30
SIZE, MAXW = {"xl": 230, "l": 150, "m": 96}, 1720
COL = {"white": "#F5F5F5", "red": "#E3120B"}
FIN, FOUT, SLIDE = 0.22, 0.15, 28

tl = json.load(open(AU / "timeline.json", encoding="utf-8")); total = tl["duration"]
sent = [[s["start"], s["end"]] for s in tl["sentences"]]
js = f"globalThis.SENT={json.dumps(sent)};require({json.dumps(str(F / 'spec.js'))});console.log(JSON.stringify(globalThis.CARDS))"
cards = json.loads(subprocess.run(["node", "-e", js], capture_output=True, text=True, encoding="utf-8", check=True).stdout)

txt = F / "txt"; shutil.rmtree(txt, ignore_errors=True); txt.mkdir()
filtros, n, avisos = [], 0, 0
for i, c in enumerate(cards):
    fin = cards[i + 1]["t"] if i + 1 < len(cards) else total
    if fin <= c["t"]: print(f"AVISO card {i} sin duración"); avisos += 1
    tam = []
    for texto, color, t, s in c["rows"]:
        px = SIZE[s]
        while ImageFont.truetype(FONT, px).getlength(texto) > MAXW: px -= 4
        tam.append(px)
    alto = sum(int(px * 1.08) for px in tam); y = (H - alto) / 2
    for (texto, color, t, s), px in zip(c["rows"], tam):
        t = max(t, c["t"])
        if t > fin - 0.3: print(f"AVISO '{texto}' aparece {fin - t:.2f} s antes del corte"); avisos += 1
        (txt / f"{n:03d}.txt").write_text(texto, encoding="utf-8")
        a = (f"if(lt(t,{t:.3f}),0,if(lt(t,{t + FIN:.3f}),(t-{t:.3f})/{FIN},if(lt(t,{fin - FOUT:.3f}),1,max(0,({fin:.3f}-t)/{FOUT}))))")
        filtros.append(f"drawtext=fontfile='C\\:/Windows/Fonts/impact.ttf':textfile='txt/{n:03d}.txt':fontsize={px}:fontcolor={COL[color]}"
                       f":x=(w-text_w)/2:y='{y + px * 0.04:.1f}+{SLIDE}*max(0,1-(t-{t:.3f})/{FIN})':alpha='{a}':enable='between(t,{t:.3f},{fin:.3f})'")
        y += int(px * 1.08); n += 1
(F / "filtros.txt").write_text(",\n".join(filtros), encoding="utf-8")
print(f"{len(cards)} pantallas, {n} textos, {avisos} avisos, {total:.1f} s")
if "--check" in sys.argv: sys.exit(1 if avisos else 0)

R = P / "renders"; R.mkdir(exist_ok=True); video = R / "video_mudo.mp4"
subprocess.run(["ffmpeg", "-y", "-hide_banner", "-loglevel", "error", "-f", "lavfi", "-i", f"color=c=black:s={W}x{H}:r={FPS}:d={total:.2f}",
                "-/filter_complex", "filtros.txt", "-c:v", "libx264", "-preset", "medium", "-crf", "18", "-pix_fmt", "yuv420p", str(video)], cwd=F, check=True)
try: mus = fv.asegurar_musica(P, "cinematic documentary ambient")
except SystemExit as e: sys.exit(f"Música: {e}")
mix = AU / "final_mix.m4a"
li, tp = fv.mezclar_audio(AU, mus, total, mix, ["-c:a", "aac", "-b:a", "192k"])
print(f"mezcla {li:.1f} LUFS, true peak {tp:+.1f} dBTP")
final = R / "final.mp4"
subprocess.run(["ffmpeg", "-y", "-hide_banner", "-loglevel", "error", "-i", str(video), "-i", str(mix), "-map", "0:v:0", "-map", "1:a:0",
                "-c", "copy", "-shortest", "-movflags", "+faststart", str(final)], check=True)
print(f"{final}  {fv.dur(final):.1f} s (locución {total:.1f} s)")

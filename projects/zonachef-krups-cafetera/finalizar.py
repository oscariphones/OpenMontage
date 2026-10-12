"""Render local ZonaChef (REGLAS_ZONACHEF.md): render HyperFrames -> mezcla voz+musica (cadena de fabrica_video.py) -> renders/zonachef/<nombre>.mp4.
Termina al generar el MP4. NO publica ni sube nada."""
import json, subprocess, sys
from pathlib import Path
P = Path(__file__).resolve().parent; REPO = P.parents[1]
sys.path.insert(0, str(REPO)); import fabrica_video as fv
AU = P / "assets/audio"; tl = json.load(open(AU / "timeline.json", encoding="utf-8"))
mudo = P / "renders/video_mudo.mp4"; mudo.parent.mkdir(parents=True, exist_ok=True)
if not mudo.exists():
    fv.run(f'npx hyperframes render . --output "{mudo}" --workers 1 --fps 30', cwd=P / "hyperframes")
mus = fv.asegurar_musica(P, sys.argv[1] if len(sys.argv) > 1 else "corporate upbeat background")
mix = AU / "final_mix.m4a"
li, tp = fv.mezclar_audio(AU, mus, tl["duration"], mix, ["-c:a", "aac", "-b:a", "192k"])
out = REPO / "renders/zonachef/zonachef_krups_cafetera_automatica.mp4"; out.parent.mkdir(parents=True, exist_ok=True)
fv.run(["ffmpeg", "-y", "-hide_banner", "-loglevel", "error", "-i", str(mudo), "-i", str(mix), "-map", "0:v:0", "-map", "1:a:0",
        "-c:v", "copy", "-c:a", "copy", "-shortest", "-movflags", "+faststart", str(out)])
print(f"LISTO {out}  {fv.dur(out):.1f} s (locucion {tl['duration']:.1f} s)  {li:.1f} LUFS  TP {tp:+.1f} dBTP")

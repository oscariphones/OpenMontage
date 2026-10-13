"""Locucion oficial de guion_*.txt: Piper es_ES-sharvard-medium (voz masculina, speaker_id 0), SIN rubberband ni cambios de tono/tiempo
(la velocidad la hace Piper con length_scale). Solo remuestreo soxr a 48 kHz; todo el procesado de la voz vive en fabrica_video.py (VOZ_CHAIN).
Salida: assets/audio/narration_raw.wav (+ narration.wav = copia) y assets/audio/timeline.json (frases con inicio/fin reales)."""
import json, re, shutil, subprocess, sys, wave
from pathlib import Path

REPO = Path(__file__).resolve().parents[2]; sys.path.insert(0, str(REPO))
from tools.tool_registry import registry  # noqa: E402

PROJ = Path(__file__).resolve().parent
A = PROJ / "assets/audio"; (A / "sentences").mkdir(parents=True, exist_ok=True)
VOICE = dict(model="es_ES-sharvard-medium", speaker_id=0, length_scale=0.83, noise_scale=0.667, noise_w=0.8, sentence_silence=0.0)
GAP_S, GAP_SEC, LEAD, TAIL = 0.28, 0.65, 0.35, 1.2
sents, sec = [], None
for line in (PROJ / "guion_negocio.txt").read_text(encoding="utf-8").splitlines():
    line = line.strip()
    if line.startswith("## "): sec = line[3:].strip(); continue
    if not line or line.startswith(("FUENTE", "FORMATO")) or sec is None: continue
    sents.append({"section": sec, "text": line})

registry.discover(); tts = registry._tools["piper_tts"]
sr, pcm, t = 44100, bytearray(b"\x00\x00" * int(44100 * LEAD)), LEAD
for k, s in enumerate(sents):
    raw, fin = A / "sentences" / f"{k:03d}_raw.wav", A / "sentences" / f"{k:03d}.wav"
    if not fin.exists():
        r = tts.execute({"text": s["text"], "output_path": str(raw), **VOICE})
        if not r.success: raise SystemExit(f"synth {k}: {r.error}")
        # solo remuestreo de alta precision a 48 kHz: sin cambio de tono ni de tiempo (rubberband degradaba la voz)
        subprocess.run(["ffmpeg", "-y", "-hide_banner", "-loglevel", "error", "-i", str(raw), "-af", "aresample=resampler=soxr:precision=28", "-ar", str(sr), str(fin)], check=True)
    with wave.open(str(fin)) as w:
        d = w.getnframes() / w.getframerate(); data = w.readframes(w.getnframes())
    if k:
        gap = GAP_SEC if s["section"] != sents[k - 1]["section"] else GAP_S
        pcm += b"\x00\x00" * int(sr * gap); t += gap
    s["start"], s["end"] = round(t, 3), round(t + d, 3)
    pcm += data; t += d
pcm += b"\x00\x00" * int(sr * TAIL); t += TAIL

mono = A / "narration_raw.wav"
with wave.open(str(mono), "wb") as w:
    w.setnchannels(1); w.setsampwidth(2); w.setframerate(sr); w.writeframes(bytes(pcm))
shutil.copyfile(mono, A / "narration.wav")      # sin procesar: la cadena de voz esta en fabrica_video.py
json.dump({"duration": round(t, 3), "sentences": sents}, open(A / "timeline.json", "w", encoding="utf-8"), ensure_ascii=False, indent=1)
print(f"{len(sents)} frases, {t:.1f} s ({t / 60:.1f} min)")

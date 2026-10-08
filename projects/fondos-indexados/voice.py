"""Narracion comercial de guion_fondos.txt: Piper davefx expresivo + rubberband (pitch +2.5 st, tempo x1.09) + cadena broadcast.
Misma voz que finanzas-stickman. Salida: assets/audio/narration.wav y assets/audio/timeline.json (frases con inicio/fin reales)."""
import json, re, subprocess, sys, wave
from pathlib import Path

REPO = Path(__file__).resolve().parents[2]; sys.path.insert(0, str(REPO))
from tools.tool_registry import registry  # noqa: E402

PROJ = Path(__file__).resolve().parent
A = PROJ / "assets/audio"; (A / "sentences").mkdir(parents=True, exist_ok=True)
VOICE = dict(model="es_ES-davefx-medium", length_scale=0.90, noise_scale=0.90, noise_w=1.0, sentence_silence=0.0)
PITCH_ST, TEMPO = 2.5, 1.09
GAP_S, GAP_SEC, LEAD, TAIL = 0.28, 0.65, 0.35, 1.2
CHAIN = ("highpass=f=90,equalizer=f=180:t=q:w=1.2:g=1.0,equalizer=f=3500:t=q:w=1.0:g=3.5,equalizer=f=9000:t=q:w=0.8:g=2.0,"
         "acompressor=threshold=-22dB:ratio=4:attack=3:release=80:makeup=6,alimiter=limit=0.93:level=disabled")

sents, sec = [], None
for line in (PROJ / "guion_fondos.txt").read_text(encoding="utf-8").splitlines():
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
        rb = f"rubberband=pitch={2 ** (PITCH_ST / 12):.5f}:tempo={TEMPO}:formant=preserved"
        subprocess.run(["ffmpeg", "-y", "-hide_banner", "-loglevel", "error", "-i", str(raw), "-af", rb, "-ar", str(sr), str(fin)], check=True)
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
subprocess.run(["ffmpeg", "-y", "-hide_banner", "-loglevel", "error", "-i", str(mono), "-af", CHAIN, str(A / "narration.wav")], check=True)
json.dump({"duration": round(t, 3), "sentences": sents}, open(A / "timeline.json", "w", encoding="utf-8"), ensure_ascii=False, indent=1)
print(f"{len(sents)} frases, {t:.1f} s ({t / 60:.1f} min)")

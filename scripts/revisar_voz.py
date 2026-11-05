"""Revisa cada frase de la voz clonada con faster-whisper: texto esperado vs oido y cola de sonido tras la ultima palabra.
Uso: python scripts/revisar_voz.py projects/<proyecto> [modelo]"""
import difflib, json, re, subprocess, sys, unicodedata
from pathlib import Path
import numpy as np
from faster_whisper import WhisperModel

sys.stdout.reconfigure(encoding="utf-8", errors="replace")
P = Path(sys.argv[1]); A = P / "assets/audio"
sents = json.load(open(A / "timeline.json", encoding="utf-8"))["sentences"]
model = WhisperModel(sys.argv[2] if len(sys.argv) > 2 else "small", device="cpu", compute_type="int8", cpu_threads=2)


def norm(s):
    s = unicodedata.normalize("NFD", s.lower())
    s = "".join(ch for ch in s if unicodedata.category(ch) != "Mn")
    return re.sub(r"[^a-z0-9 ]", " ", s).split()


def cargar(f):
    raw = subprocess.run(["ffmpeg", "-hide_banner", "-loglevel", "error", "-i", str(f), "-ac", "1", "-ar", "16000", "-f", "f32le", "-"], capture_output=True, check=True).stdout
    return np.frombuffer(raw, dtype=np.float32)


malas = []
for k, s in enumerate(sents):
    x = cargar(A / "sentences" / f"{k:03d}.wav")
    segs, _ = model.transcribe(x, language="es", word_timestamps=True, beam_size=5, condition_on_previous_text=False)
    words = [w for sg in segs for w in sg.words]
    oido = " ".join(w.word.strip() for w in words)
    ratio = difflib.SequenceMatcher(None, norm(s["text"]), norm(oido)).ratio()
    fin_palabra = words[-1].end if words else 0.0
    fr = 320  # 20 ms
    db = np.array([20 * np.log10(np.sqrt(np.mean(x[i:i + fr] ** 2)) + 1e-9) for i in range(0, len(x) - fr, fr)])
    activos = np.where(db > -35)[0]
    fin_sonido = (activos[-1] + 1) * fr / 16000 if len(activos) else 0.0
    cola = fin_sonido - fin_palabra
    extra = len(norm(oido)) - len(norm(s["text"]))
    flag = ratio < 0.85 or cola > 0.6 or extra >= 2
    if flag: malas.append(k)
    print(f"{'XX' if flag else 'ok'} {k:03d} ratio {ratio:.2f} cola {cola:+.2f}s dur {len(x)/16000:.1f}s | {oido}", flush=True)
print("REVISAR:", malas)

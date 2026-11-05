"""Perfil de energia (cada 100 ms) del final de frases: python scripts/colas_voz.py projects/<proyecto> k1 k2 ..."""
import sys, subprocess, numpy as np
from pathlib import Path
from faster_whisper import WhisperModel
P = Path(sys.argv[1]); m = WhisperModel("small", device="cpu", compute_type="int8", cpu_threads=2)
for k in map(int, sys.argv[2:]):
    f = P / "assets/audio/sentences" / f"{k:03d}.wav"
    x = np.frombuffer(subprocess.run(["ffmpeg","-loglevel","error","-i",str(f),"-ac","1","-ar","16000","-f","f32le","-"],capture_output=True).stdout, dtype=np.float32)
    segs,_ = m.transcribe(x, language="es", word_timestamps=True); ws=[w for s in segs for w in s.words]; e=ws[-1].end
    st = max(0, int((e - 0.3) * 16000)); fr = 1600
    prof = [f"{20*np.log10(np.sqrt(np.mean(x[i:i+fr]**2))+1e-9):.0f}" for i in range(st, len(x)-fr, fr)]
    print(f"{k:03d} fin palabra {e:.2f}s / dur {len(x)/16000:.2f}s | dB cada 0.1s desde fin-0.3: {' '.join(prof)}")

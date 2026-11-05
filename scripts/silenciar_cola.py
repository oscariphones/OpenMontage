"""Silencia la cola de ruido tras la ultima palabra (desde el primer hueco de 100 ms < -50 dB tras la ultima palabra), fundido de 40 ms, sin cambiar la duracion.
python scripts/silenciar_cola.py projects/<proyecto> k:fin_palabra ...  (despues, python projects/<p>/voice.py re-arma la narracion desde la cache)"""
import sys, wave, numpy as np
from pathlib import Path
P = Path(sys.argv[1])
for arg in sys.argv[2:]:
    k, e = arg.split(":"); k = int(k); e = float(e)
    f = P / "assets/audio/sentences" / f"{k:03d}.wav"
    with wave.open(str(f)) as w: prm = w.getparams(); x = np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16).astype(np.float32)
    sr = prm.framerate; fr = int(0.02 * sr); i = int(e * sr); win = 5 * fr  # hueco: 100 ms seguidos por debajo de -50 dB, empezando despues de la ultima palabra
    db = lambda a: 20 * np.log10(np.sqrt(np.mean((a / 32768) ** 2)) + 1e-9)
    while i + win < len(x) and db(x[i:i+win]) > -50: i += fr
    fade = int(0.04 * sr); y = x.copy()
    y[i:i+fade] *= np.linspace(1, 0, len(y[i:i+fade])); y[i+fade:] = 0
    with wave.open(str(f), "wb") as w: w.setparams(prm); w.writeframes(y.astype(np.int16).tobytes())
    print(f"{k:03d}: silencio desde {i/sr:.2f}s (dur {len(x)/sr:.2f}s)")

"""Wrapper: la locucion la hace scripts/voice.py (clonacion de referencia_voz.wav.wav con Chatterbox)."""
import subprocess, sys
from pathlib import Path
P = Path(__file__).resolve().parent
sys.exit(subprocess.call([sys.executable, str(P.parents[1] / "scripts/voice.py"), P.name, str(P / "guion_impuestos_isr.txt")]))

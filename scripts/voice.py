"""Locucion con clonacion de voz: Chatterbox Multilingual (es) clonando referencia_voz.wav.wav (raiz del repo).
Uso: python scripts/voice.py <proyecto> [guion.txt]   (genera projects/<proyecto>/ o proyectos_zonachef/<proyecto>/assets/audio/{narration_raw.wav,narration.wav,timeline.json})
Sin rubberband ni cambios de tono/tiempo: solo remuestreo soxr a 44.1 kHz. La cadena de voz y la normalizacion a -14 LUFS / TP <= -2 dB
viven en fabrica_video.py (VOZ_CHAIN, mezclar_audio) y se aplican despues sobre narration_raw.wav."""
import json, re, shutil, subprocess, sys, wave
from pathlib import Path

REPO = Path(__file__).resolve().parents[1]
REF = REPO / "referencia_voz.wav.wav"
GAP_S, GAP_SEC, LEAD, TAIL, SR = 0.28, 0.65, 0.35, 1.2, 44100
GEN = dict(exaggeration=0.5, cfg_weight=0.5, temperature=0.8)
UNI = "cero uno dos tres cuatro cinco seis siete ocho nueve diez once doce trece catorce quince dieciséis diecisiete dieciocho diecinueve veinte veintiuno veintidós veintitrés veinticuatro veinticinco veintiséis veintisiete veintiocho veintinueve".split()
DEC = "_ _ _ treinta cuarenta cincuenta sesenta setenta ochenta noventa".split()
CEN = "_ ciento doscientos trescientos cuatrocientos quinientos seiscientos setecientos ochocientos novecientos".split()


def en_letras(n):
    """Entero 0-999999 a palabras en español (Chatterbox lee mal las cifras: '1995' sale trabado)."""
    if n < 30: return UNI[n]
    if n < 100: return DEC[n // 10] + ("" if n % 10 == 0 else " y " + UNI[n % 10])
    if n < 1000: return "cien" if n == 100 else CEN[n // 100] + ("" if n % 100 == 0 else " " + en_letras(n % 100))
    mil = "mil" if n // 1000 == 1 else en_letras(n // 1000).replace("uno", "un").replace("veintiun", "veintiún") + " mil"
    return mil + ("" if n % 1000 == 0 else " " + en_letras(n % 1000))


# Siglas como se dicen en voz alta: Chatterbox las lee mal si van en mayusculas (impuestos-isr, 2026-10-21: "ISR" sonaba "Elisar", "RFC" sonaba "Turese").
SIGLAS = {"LISR": "ley del i ese erre", "ISR": "i ese erre", "RFC": "erre efe ce", "IMSS": "ims", "ISSSTE": "isste",
          "SAT": "sat", "CAT": "cat", "IVA": "iva", "UMA": "uma", "CURP": "curp", "AFORE": "afore", "INFONAVIT": "infonavit", "MX": "eme equis", "McDonald's": "mac dónalds", "Whittaker": "uítaker", "FIBRAS": "fibras", "FIBRA": "fibra"}


def para_voz(texto):
    """Solo la voz recibe las cifras en letras y las siglas deletreadas; timeline.json conserva el texto original para los subtitulos."""
    texto = re.sub(r"\b(" + "|".join(sorted(SIGLAS, key=len, reverse=True)) + r")\b", lambda m: SIGLAS[m.group()], texto)
    return re.sub(r"\d+", lambda m: en_letras(int(m.group())) if int(m.group()) < 10**6 else m.group(), texto)


def main():
    import torch, soundfile
    from chatterbox.mtl_tts import ChatterboxMultilingualTTS
    proj = REPO / "projects" / sys.argv[1]
    if not proj.exists() and (REPO / "proyectos_zonachef" / sys.argv[1]).exists():   # canal ZonaChef: proyectos en su propia raiz
        proj = REPO / "proyectos_zonachef" / sys.argv[1]
    guion = Path(sys.argv[2]) if len(sys.argv) > 2 else sorted(proj.glob("guion_*.txt"))[0]
    A = proj / "assets/audio"; (A / "sentences").mkdir(parents=True, exist_ok=True)
    ref = A / "referencia_24k.wav"                                  # referencia mono (el modelo la usa a 24 kHz)
    if not ref.exists():
        subprocess.run(["ffmpeg", "-y", "-hide_banner", "-loglevel", "error", "-i", str(REF), "-ac", "1", "-ar", "24000", str(ref)], check=True)
    sents, sec = [], None
    for line in guion.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if line.startswith("## "): sec = line[3:].strip(); continue
        if not line or line.startswith(("FUENTE", "FORMATO")) or sec is None: continue
        sents.append({"section": sec, "text": line})
    dev = "cuda" if torch.cuda.is_available() else "cpu"
    model = None
    # Re-toma de una frase trabada: la semilla es fija (1000 + k), asi que borrar su wav repetiria el mismo audio.
    # assets/audio/semillas.json {"0": 2000} cambia la semilla solo de esa frase (indice desde 0); sin archivo, nada cambia.
    sj = A / "semillas.json"; semillas = json.load(open(sj, encoding="utf-8")) if sj.exists() else {}
    pcm, t = bytearray(b"\x00\x00" * int(SR * LEAD)), LEAD
    for k, s in enumerate(sents):
        raw, fin = A / "sentences" / f"{k:03d}_raw.wav", A / "sentences" / f"{k:03d}.wav"
        if not fin.exists():
            if model is None: model = ChatterboxMultilingualTTS.from_pretrained(device=dev)
            torch.manual_seed(int(semillas.get(str(k), 1000 + k)))
            wav = model.generate(para_voz(s["text"]), language_id="es", audio_prompt_path=str(ref), **GEN)
            soundfile.write(str(raw), wav.squeeze().cpu().numpy(), model.sr)
            subprocess.run(["ffmpeg", "-y", "-hide_banner", "-loglevel", "error", "-i", str(raw), "-ac", "1", "-af", "aresample=resampler=soxr:precision=28", "-ar", str(SR), "-c:a", "pcm_s16le", str(fin)], check=True)
            print(f"  frase {k + 1}/{len(sents)}", flush=True)
        with wave.open(str(fin)) as w:
            d = w.getnframes() / w.getframerate(); data = w.readframes(w.getnframes())
        if k:
            gap = GAP_SEC if s["section"] != sents[k - 1]["section"] else GAP_S
            pcm += b"\x00\x00" * int(SR * gap); t += gap
        s["start"], s["end"] = round(t, 3), round(t + d, 3)
        pcm += data; t += d
    pcm += b"\x00\x00" * int(SR * TAIL); t += TAIL
    mono = A / "narration_raw.wav"
    with wave.open(str(mono), "wb") as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes(bytes(pcm))
    shutil.copyfile(mono, A / "narration.wav")
    json.dump({"duration": round(t, 3), "sentences": sents}, open(A / "timeline.json", "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    print(f"{len(sents)} frases, {t:.1f} s ({t / 60:.1f} min)")


if __name__ == "__main__":
    main()

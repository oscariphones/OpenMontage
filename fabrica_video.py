#!/usr/bin/env python3
"""Fabrica de videos de finanzas v2.0 "premium finance" (fondo tech-grid, subtitulos cineticos, easing GSAP; estilo 2D stick figure, HyperFrames + GSAP, voz clonada Chatterbox, musica lo-fi).

Hace de forma desatendida todo lo mecanico, a partir de un proyecto que ya tiene:
    projects/<proyecto>/guion_*.txt     guion en espanol ("## SECCION" + una frase por linea)
    projects/<proyecto>/film2d/spec.js  plano de escenas (lo disena Claude: ver REGLAS_VIDEO.md)

Etapas (cada una se salta si su resultado ya existe; --force las repite):
  1 plantilla  copia motor/voz/audit desde projects/fondos-indexados si el proyecto no los tiene (y sube el motor a la v2.0 si es viejo)
  2 voz        scripts/voice.py: clon Chatterbox de referencia_voz.wav.wav (voz oficial, sin rubberband) -> assets/audio/narration_raw.wav + timeline.json
  3 build      compone las partes HyperFrames (f1..fN)
  4 auditoria  recorre la linea de tiempo y exige 0 solapes / 0 elementos fuera de su celda
  5 render     UNA parte a la vez, 1 hilo, pausa entre partes y espera de RAM libre
  6 musica     descarga pista lo-fi libre (Pixabay) si falta y mezcla por debajo de la voz
  7 final      une las partes, muxea el audio y verifica la duracion -> renders/final.mp4

Uso:  python fabrica_video.py <proyecto> [--musica "lo-fi chill instrumental"] [--force] [--sin-render]
"""
import argparse, ctypes, json, re, shutil, subprocess, sys, time
from pathlib import Path

REPO = Path(__file__).resolve().parent
PLANTILLA = REPO / "projects/fondos-indexados"
PAUSA_ENTRE_PARTES = 20      # s
RAM_MIN_MB = 1000            # espera hasta tener al menos esta RAM libre antes de cada parte
MUSICA_DB_BAJO_VOZ = 18      # la musica va 18 LUFS por debajo de la voz
LUFS_OBJ, TP_OBJ = -14.0, -2.0   # estandar YouTube y techo de true peak
# Voz OFICIAL: clon Chatterbox (es) de referencia_voz.wav.wav via scripts/voice.py, SIN rubberband. Esta cadena procesa narration_raw.wav.
# Cadena de voz. Historico (2026-10-08, disenada con una voz TTS que salia a 0 dBFS y con modelo de 22 kHz, solo ~1 % de la energia por
# encima de 5 kHz = voz "lejana"). Por eso: -6 dB de margen, adeclip (repara los picos saturados), cuerpo +2 dB a 110 Hz, -2.5 dB a 280 Hz
# (caja), presencia +2.5 dB a 3.2 kHz, aexciter + shelf para reconstruir agudos (~8 % de la energia >5 kHz, natural), de-esser,
# compresion densa tipo radio/podcast en dos etapas (5:1 y 2.5:1) y limitador que solo recorta ~1 dB (level=disabled = no renormaliza).
# Musica: la pista lo-fi trae siseo/crujido de vinilo (suelo ~ -52 dBFS) que se oia en las pausas: afftdn + adeclick.
MUSICA_CHAIN = "adeclick=w=55:o=75:a=2:t=2:b=2,afftdn=nr=18:nf=-48:tn=1"
VOZ_CHAIN = ("highpass=f=70,volume=-6dB,adeclip=w=55:o=75:a=8:t=10:n=1000,"
             "agate=threshold=0.008:ratio=20:attack=3:release=100:range=0.001:knee=2:detection=peak,"
             "highshelf=f=4000:g=3,"
             "acompressor=threshold=-26dB:ratio=5:attack=5:release=110:knee=5:makeup=6,"
             "acompressor=threshold=-14dB:ratio=2.5:attack=2:release=50:knee=3:makeup=2,"
             "alimiter=limit=0.84:attack=6:release=80:level=disabled")


def run(cmd, cwd=None, check=True, **kw):
    print("  $", " ".join(map(str, cmd)) if isinstance(cmd, list) else cmd, flush=True)
    return subprocess.run(cmd, cwd=cwd, check=check, shell=isinstance(cmd, str), **kw)


def ram_libre_mb():
    class M(ctypes.Structure):
        _fields_ = [("l", ctypes.c_ulong), ("load", ctypes.c_ulong), ("tp", ctypes.c_ulonglong), ("ap", ctypes.c_ulonglong),
                    ("tpf", ctypes.c_ulonglong), ("apf", ctypes.c_ulonglong), ("tv", ctypes.c_ulonglong), ("av", ctypes.c_ulonglong), ("ae", ctypes.c_ulonglong)]
    m = M(); m.l = ctypes.sizeof(M); ctypes.windll.kernel32.GlobalMemoryStatusEx(ctypes.byref(m)); return m.ap // 2**20


def ff(args):
    subprocess.run(["ffmpeg", "-y", "-hide_banner", "-loglevel", "error", *args], check=True)


def loudness(path):
    """(LUFS integrado, true peak dBTP) de un archivo."""
    t = subprocess.run(["ffmpeg", "-hide_banner", "-nostats", "-i", str(path), "-af", "ebur128=peak=true", "-f", "null", "-"], capture_output=True, text=True).stderr
    t = t[t.rindex("Summary"):]
    return float(re.search(r"I:\s+(-?[\d.]+) LUFS", t).group(1)), float(re.search(r"Peak:\s+(-?[\d.]+) dBFS", t).group(1))


def _loudnorm_medir_no_usado(path):
    t = subprocess.run(["ffmpeg", "-hide_banner", "-nostats", "-i", str(path), "-af", f"loudnorm=I={LUFS_OBJ}:TP={TP_OBJ}:LRA=11:print_format=json", "-f", "null", "-"], capture_output=True, text=True).stderr
    return json.loads(t[t.rindex("{"):t.rindex("}") + 1])


def dur(path):
    return float(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", str(path)], capture_output=True, text=True).stdout.strip())


def asegurar_musica(P, consulta):
    mus = P / "assets/music/lofi.mp3"
    if not mus.exists():
        mus.parent.mkdir(parents=True, exist_ok=True)
        sys.path.insert(0, str(REPO)); from tools.tool_registry import registry
        registry.discover()
        r = registry._tools["pixabay_music"].execute({"query": consulta, "min_duration": 90, "max_duration": 300, "output_path": str(mus)})
        if not r.success: sys.exit(f"No pude bajar musica: {r.error}")
        (P / "assets/music/CREDITOS.txt").write_text(json.dumps(r.data, ensure_ascii=False, indent=1), encoding="utf-8")
    return mus


def mezclar_audio(AU, mus, total, mix, codec, narracion=None):
    """Voz (desde narration_raw) + musica -> mezcla a -14 LUFS / TP <= -2 dB. total = segundos a mezclar desde el inicio."""
    tmp = AU / ("tmp_" + mix.stem); tmp.mkdir(exist_ok=True)
    voz, musica = tmp / "voz.wav", tmp / "musica.wav"
    # 1) voz DESDE LA LOCUCION SIN PROCESAR: margen, EQ de presencia, de-esser, compresion dinamica y limitador sin renormalizar
    ff(["-t", f"{total:.2f}", "-i", str(narracion or AU / "narration_raw.wav"), "-af", VOZ_CHAIN, "-ar", "48000", str(voz)])
    # 2) pista lo-fi en bucle con fundido cruzado, fundidos de entrada/salida
    ff(["-i", str(mus), "-filter_complex", f"[0:a]asplit=3[x1][x2][x3];[x1][x2]acrossfade=d=3[y];[y][x3]acrossfade=d=3,atrim=0:{total + 1:.2f},{MUSICA_CHAIN}", "-ar", "48000", str(musica)])
    # 3) la musica queda MUSICA_DB_BAJO_VOZ dB por debajo de la voz, medido en LUFS (no a ojo)
    gain = (loudness(voz)[0] - MUSICA_DB_BAJO_VOZ) - loudness(mus)[0]   # sobre la pista completa: igual en prueba y en video final
    print(f"  voz {loudness(voz)[0]:.1f} LUFS, musica {gain:+.1f} dB -> {MUSICA_DB_BAJO_VOZ} dB bajo la voz")
    mezcla = tmp / "mezcla.wav"
    ff(["-i", str(voz), "-i", str(musica), "-filter_complex", f"[0:a]apad=whole_dur={total:.2f}[v];[1:a]volume={gain:.2f}dB,afade=t=in:d=3,afade=t=out:st={total - 5:.2f}:d=5[m];[v][m]amix=inputs=2:duration=first:normalize=0,atrim=0:{total:.2f}", str(mezcla)])
    # 4) -14 LUFS: ganancia medida + limitador de picos (techo -3.2 dB para que el AAC no pase de -2 dBTP)
    li0 = loudness(mezcla)[0]
    ok = False
    for margen in (1.2, 1.7, 2.2):                                      # si el AAC aun pasa de -2 dBTP, se baja el techo del limitador
        techo = 10 ** ((TP_OBJ - margen) / 20)
        for extra in (0.3, 0.8, 1.3, 1.8, 2.3, 2.8):                      # el limitador recorta algo de nivel: se reintenta con mas ganancia
            ff(["-i", str(mezcla), "-af", f"volume={LUFS_OBJ - li0 + extra:.2f}dB,alimiter=limit={techo:.4f}:attack=3:release=50:level=disabled,aresample=48000",
                *codec, str(mix)])
            li, tp = loudness(mix)
            print(f"  techo -{margen + 2.0:.1f} dB, intento +{extra} dB: {li:.2f} LUFS, true peak {tp:+.2f} dBTP")
            if li >= LUFS_OBJ - 0.4 and tp <= TP_OBJ: ok = True; break
            if tp > TP_OBJ: break                                        # mas ganancia no arregla el pico: probar techo mas bajo
        if ok: break
    shutil.rmtree(tmp, ignore_errors=True)
    return loudness(mix)


def main():
    ap = argparse.ArgumentParser(); ap.add_argument("proyecto"); ap.add_argument("--musica", default="lo-fi chill instrumental")
    ap.add_argument("--force", action="store_true"); ap.add_argument("--sin-render", action="store_true")
    ap.add_argument("--prueba-nombre", default="prueba_audio.mp3")
    ap.add_argument("--narracion", help="narration_raw alternativa (solo para pruebas de audio)")
    ap.add_argument("--prueba-audio", type=float, metavar="SEG", help="solo mezcla los primeros SEG segundos de voz+musica en prueba_audio.mp3 y sale (sin build ni render)")
    a = ap.parse_args()
    P = REPO / "projects" / a.proyecto; HF = P / "hyperframes"; R = P / "renders"; AU = P / "assets/audio"
    guiones = sorted(P.glob("guion_*.txt"))
    if not guiones or not (P / "film2d/spec.js").exists():
        sys.exit(f"Falta guion_*.txt o film2d/spec.js en {P}. Pide a Claude que redacte el guion y disene spec.js (ver REGLAS_VIDEO.md).")

    print("[1] plantilla")
    if P != PLANTILLA:
        for f in ["hyperframes/audit_dyn.cjs", "hyperframes/chk_items.cjs", "hyperframes/render_film2d.sh"] + [f"film2d/{x}" for x in ["engine.js", "kitshim.js", "widgets.js", "template.tpl", "gsap.min.js", "props.js", "build.py"]]:
            if not (P / f).exists():
                (P / f).parent.mkdir(parents=True, exist_ok=True); shutil.copy(PLANTILLA / f, P / f)
    vw = P / "voice.py"          # voz oficial: envoltorio de scripts/voice.py (clon Chatterbox de referencia_voz.wav.wav); nunca otro sintetizador
    if P != PLANTILLA and (not vw.exists() or "scripts/voice.py" not in vw.read_text(encoding="utf-8")):
        vw.write_text(chr(10).join(['"""Wrapper: la locucion la hace scripts/voice.py (clonacion de referencia_voz.wav.wav con Chatterbox)."""',
                                 "import subprocess, sys", "from pathlib import Path", "P = Path(__file__).resolve().parent",
                                 f'sys.exit(subprocess.call([sys.executable, str(P.parents[1] / "scripts/voice.py"), P.name, str(P / "{guiones[0].name}")]))', ""]), encoding="utf-8")

    # Motor 2.0 "premium finance" (fondo tech-grid, subtitulos cineticos, easing procedural GSAP): los proyectos con motor viejo se actualizan
    # desde la plantilla (engine.js + template.tpl); ink-grid.js / ink-pose.js los copia film2d/build.py desde ink-theater/ en cada build.
    if P != PLANTILLA:
        for f, marca in (("engine.js", "Film engine V2"), ("template.tpl", "ENGINE_V2")):
            dst = P / "film2d" / f
            if marca not in dst.read_text(encoding="utf-8"):
                print(f"  motor 2.0: actualizo film2d/{f}"); shutil.copy(PLANTILLA / "film2d" / f, dst)

    if a.prueba_audio:
        print(f"[prueba de audio] primeros {a.prueba_audio:.0f} s")
        out = P / a.prueba_nombre
        li, tp = mezclar_audio(AU, asegurar_musica(P, a.musica), a.prueba_audio, out, ["-c:a", "libmp3lame", "-b:a", "192k"], narracion=Path(a.narracion) if a.narracion else None)
        print(f"  {out}  {li:.1f} LUFS, true peak {tp:+.1f} dBTP"); return

    print("[2] voz")
    if a.force or not (AU / "timeline.json").exists():
        run([sys.executable, "voice.py"], cwd=P, env={**__import__("os").environ, "PYTHONIOENCODING": "utf-8"})
    tl = json.load(open(AU / "timeline.json", encoding="utf-8")); print(f"  locucion {tl['duration']:.1f} s")

    print("[3] build")
    run([sys.executable, "film2d/build.py"], cwd=P, env={**__import__("os").environ, "PYTHONIOENCODING": "utf-8"})
    partes = sorted(d.name for d in HF.iterdir() if d.is_dir() and d.name[:1] == "f" and d.name[1:].isdigit())

    print("[4] auditoria de layout")
    for d in partes:
        out = subprocess.run(["node", "audit_dyn.cjs", d, "0.4"], cwd=HF, capture_output=True, text=True).stdout
        print("  " + out.strip().replace("\n", "\n  "))
        if " issues 0 " not in out:
            sys.exit(f"Auditoria con problemas en {d}: corrige spec.js y repite.")
        ck = subprocess.run(["node", "chk_items.cjs", d], cwd=HF, capture_output=True, text=True)
        print("  " + ck.stdout.strip().replace(chr(10), chr(10) + "  "))
        if ck.returncode: sys.exit(f"Hay elementos fuera de su escena en {d} (los tiempos de la voz cambiaron): ajusta spec.js.")

    if not a.sin_render:
        print("[5] render por partes (1 hilo, una a la vez)")
        (R / "parts").mkdir(parents=True, exist_ok=True)
        for i, d in enumerate(partes):
            out = R / "parts" / f"{d}.mp4"
            if out.exists() and out.stat().st_size > 0 and not a.force:
                print(f"  {d} ya existe, salto"); continue
            if i: time.sleep(PAUSA_ENTRE_PARTES)
            while ram_libre_mb() < RAM_MIN_MB:
                print(f"  RAM libre {ram_libre_mb()} MB < {RAM_MIN_MB}: espero 30 s", flush=True); time.sleep(30)
            run(f'npx hyperframes render . --output "{out}" --workers 1 --fps 30', cwd=HF / d)
            if not out.exists() or out.stat().st_size == 0:
                sys.exit(f"Fallo el render de {d}")

    print("[6] musica y mezcla (voz con presencia, -14 LUFS, true peak <= -2 dB)")
    mus = asegurar_musica(P, a.musica); mix = AU / "final_mix.m4a"
    total = tl["duration"]
    if a.force or not mix.exists():
        mezclar_audio(AU, mus, total, mix, ["-c:a", "aac", "-b:a", "192k"])
    li, tp = loudness(mix)
    print(f"  mezcla final: {li:.1f} LUFS, true peak {tp:+.1f} dBTP")
    if abs(li - LUFS_OBJ) > 1.0 or tp > TP_OBJ: sys.exit(f"Mezcla fuera de objetivo ({LUFS_OBJ} LUFS, TP<=-2 dB): {li:.1f} LUFS / {tp:+.1f} dBTP")

    if a.sin_render: return
    print("[7] union final")
    lista = R / "lista.txt"; lista.write_text("".join(f"file 'parts/{d}.mp4'\n" for d in partes), encoding="utf-8")
    final = R / "final.mp4"
    run(["ffmpeg", "-y", "-hide_banner", "-loglevel", "error", "-f", "concat", "-safe", "0", "-i", str(lista), "-i", str(mix), "-map", "0:v:0", "-map", "1:a:0", "-c:v", "copy", "-c:a", "copy", "-shortest", "-movflags", "+faststart", str(final)])
    dv, esperado = dur(final), total
    print(f"  {final}  {dv:.1f} s (locucion {esperado:.1f} s)  {final.stat().st_size / 2**20:.0f} MB")
    if abs(dv - esperado) > 1.5: sys.exit("La duracion final no coincide con la locucion: revisar las partes.")
    print("LISTO")


if __name__ == "__main__":
    main()

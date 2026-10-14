#!/usr/bin/env python3
"""Fabrica de videos de finanzas v2.0 "premium finance" (fondo tech-grid, subtitulos cineticos, easing GSAP; estilo 2D stick figure, HyperFrames + GSAP, voz clonada Chatterbox, musica lo-fi).

Hace de forma desatendida todo lo mecanico, a partir de un proyecto que ya tiene:
    projects/<proyecto>/guion_*.txt     guion en espanol ("## SECCION" + una frase por linea)
    projects/<proyecto>/film2d/spec.js  plano de escenas (lo disena Claude: ver REGLAS_VIDEO.md)

Etapas (cada una se salta si su resultado ya existe; --force las repite):
  1 plantilla  copia motor/voz/audit desde projects/fondos-indexados si el proyecto no los tiene (y sube motor, plantilla, build y auditoria a Layout 2.0 si son viejos)
  2 voz        scripts/voice.py: clon Chatterbox de referencia_voz.wav.wav (voz oficial, sin rubberband) -> assets/audio/narration_raw.wav + timeline.json
  2b efectos   scripts/sfx_sync.py: swish en cada cambio de pose, click en cada vineta, pop en ilustraciones -> assets/audio/sfx.wav
  3 build      compone las partes HyperFrames (f1..fN)
  4 auditoria  recorre la linea de tiempo y exige 0 solapes / 0 elementos fuera de su celda
  5 render     UNA parte a la vez, 1 hilo, pausa entre partes y espera de RAM libre
  6 musica     descarga pista lo-fi libre (Pixabay) si falta y mezcla por debajo de la voz
  7 final      une las partes, muxea el audio y verifica la duracion -> renders/final.mp4
  8 metadatos  agente_metadatos.py: metadata.json (titulos, descripcion, hashtags, etiquetas, Prompt Maestro de miniatura) desde
               metadatos_brief.json (lo redacta Claude) y subida PRIVADA a YouTube si hay credenciales (--sin-subir la evita)

Uso:  python fabrica_video.py <proyecto> [--musica "lo-fi chill instrumental"] [--force] [--sin-render] [--sin-subir]

Canal ZonaChef (--canal zonachef, ver REGLAS_ZONACHEF.md y fabrica_zonachef()): ruta aparte que no toca la de finanzas.
  proyectos_zonachef/<proyecto>/ (guion_*.txt + film/template.html, los redacta Claude desde transcripciones_zonachef/ y zonachef.com.mx)
  -> voz -> film/build.py -> render vertical 1080x1920 (maximo 60 s) -> mezcla -> renders/zonachef/<proyecto>.mp4. NUNCA sube a YouTube.
Uso:  python fabrica_video.py <proyecto> --canal zonachef [--musica "corporate upbeat background"] [--force] [--sin-render]
      python fabrica_video.py --canal zonachef --pendientes        (lista las transcripciones de ZonaChef por procesar)
"""
import argparse, ctypes, json, re, shutil, subprocess, sys, time
from pathlib import Path

REPO = Path(__file__).resolve().parent
PLANTILLA = REPO / "projects/fondos-indexados"
PAUSA_ENTRE_PARTES = 20      # s
RAM_MIN_MB = 1000            # espera hasta tener al menos esta RAM libre antes de cada parte
MUSICA_DB_BAJO_VOZ = 18      # la musica va 18 LUFS por debajo de la voz
# Canal ZonaChef (REGLAS_ZONACHEF.md): raiz, transcripciones y plantilla propias; Short/Reel vertical de 60 s como maximo; sin subida.
ZC_PROYECTOS = REPO / "proyectos_zonachef"
ZC_TRANSCRIPCIONES = REPO / "transcripciones_zonachef"
ZC_PLANTILLA = ZC_PROYECTOS / "zonachef-krups-cafetera"      # film/build.py generico (film/template.html es propio de cada producto)
ZC_SALIDA = REPO / "renders/zonachef"
ZC_ANCHO, ZC_ALTO, ZC_MAX_SEG = 1080, 1920, 60.0
ZC_PALABRAS_POR_SEG, ZC_PAUSA_FRASE = 2.3, 0.3           # medido con la voz clonada (Krups: 100 palabras en 9 frases = 44-47 s)
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
    # Fabrica 2.0: efectos (swish/click/pop de scripts/sfx_sync.py) se suman a nivel fijo ANTES de normalizar, asi quedan bajo la voz
    sfx = AU / "sfx.wav"; con_sfx = sfx.exists() and not narracion
    ent = ["-i", str(voz), "-i", str(musica)] + (["-i", str(sfx)] if con_sfx else [])
    sx = f";[2:a]atrim=0:{total:.2f},apad=whole_dur={total:.2f}[s]" if con_sfx else ""
    ff([*ent, "-filter_complex", f"[0:a]apad=whole_dur={total:.2f}[v];[1:a]volume={gain:.2f}dB,afade=t=in:d=3,afade=t=out:st={total - 5:.2f}:d=5[m]{sx};"
        f"[v][m]{'[s]' if con_sfx else ''}amix=inputs={3 if con_sfx else 2}:duration=first:normalize=0,atrim=0:{total:.2f}", str(mezcla)])
    print(f"  efectos de sonido: {'si' if con_sfx else 'no'}")
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


def zc_pendientes():
    """Transcripciones de ZonaChef por procesar, la mas antigua primero (el link va en la primera linea)."""
    return sorted(ZC_TRANSCRIPCIONES.glob("*.txt"), key=lambda f: f.stat().st_mtime)


def zc_frases(guion):
    sents, sec = [], None
    for line in guion.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if line.startswith("## "): sec = line; continue
        if line and not line.startswith(("FUENTE", "FORMATO")) and sec: sents.append(line)
    return sents


def resolucion(path):
    o = subprocess.run(["ffprobe", "-v", "error", "-select_streams", "v:0", "-show_entries", "stream=width,height", "-of", "csv=p=0", str(path)],
                       capture_output=True, text=True).stdout.strip()
    return tuple(int(x) for x in o.split(",")[:2])


def fabrica_zonachef(a):
    """Canal ZonaChef: Short vertical 1080x1920 de 60 s como maximo, render local a renders/zonachef/. Nunca publica (REGLAS_ZONACHEF.md, regla 5)."""
    pend = zc_pendientes()
    if a.pendientes or not a.proyecto:
        print(f"Transcripciones ZonaChef pendientes en {ZC_TRANSCRIPCIONES.name}/: {len(pend)}")
        for f in pend: print(f"  {f.name}")
        return
    P = ZC_PROYECTOS / a.proyecto; HF = P / "hyperframes"; R = P / "renders"; AU = P / "assets/audio"
    guiones = sorted(P.glob("guion_*.txt"))
    if not guiones or not (P / "film/template.html").exists():
        fuente = f" Siguiente transcripcion: {ZC_TRANSCRIPCIONES.name}/{pend[0].name}." if pend else ""
        sys.exit(f"Falta guion_*.txt o film/template.html en {P}. Claude los redacta (REGLAS_ZONACHEF.md: specs reales de zonachef.com.mx, "
                 f"estilo SaaS claro, vertical {ZC_ANCHO}x{ZC_ALTO}, maximo {ZC_MAX_SEG:.0f} s).{fuente}")

    print("[1] plantilla y guion (maximo 60 s)")
    if P != ZC_PLANTILLA and not (P / "film/build.py").exists():
        shutil.copy(ZC_PLANTILLA / "film/build.py", P / "film/build.py")
    frases = zc_frases(guiones[0]); palabras = sum(len(f.split()) for f in frases)
    est = palabras / ZC_PALABRAS_POR_SEG + len(frases) * ZC_PAUSA_FRASE
    print(f"  {len(frases)} frases, {palabras} palabras -> ~{est:.0f} s estimados")
    if est > ZC_MAX_SEG:                          # se corta ANTES de gastar la voz en CPU
        sys.exit(f"Guion demasiado largo (~{est:.0f} s > {ZC_MAX_SEG:.0f} s): recortalo a ~{int((ZC_MAX_SEG - len(frases) * ZC_PAUSA_FRASE) * ZC_PALABRAS_POR_SEG)} palabras.")

    print("[2] voz")
    if a.force or not (AU / "timeline.json").exists():
        run([sys.executable, str(REPO / "scripts/voice.py"), a.proyecto, str(guiones[0])], env={**__import__("os").environ, "PYTHONIOENCODING": "utf-8"})
    tl = json.load(open(AU / "timeline.json", encoding="utf-8")); total = tl["duration"]
    print(f"  locucion {total:.1f} s")
    if total > ZC_MAX_SEG:
        sys.exit(f"La locucion dura {total:.1f} s (> {ZC_MAX_SEG:.0f} s): acorta el guion, borra assets/audio/sentences/ y corre con --force.")

    print(f"[3] build vertical {ZC_ANCHO}x{ZC_ALTO}")
    run([sys.executable, "film/build.py"], cwd=P, env={**__import__("os").environ, "PYTHONIOENCODING": "utf-8"})
    idx = (HF / "index.html").read_text(encoding="utf-8")
    if f'data-width="{ZC_ANCHO}"' not in idx or f'data-height="{ZC_ALTO}"' not in idx:
        sys.exit(f"hyperframes/index.html no es vertical {ZC_ANCHO}x{ZC_ALTO} (data-width/data-height): revisa film/template.html.")

    mudo = R / "video_mudo.mp4"
    if not a.sin_render:
        print("[4] render (1 hilo)")
        R.mkdir(parents=True, exist_ok=True)
        fuentes = max((P / "film/template.html").stat().st_mtime, (AU / "timeline.json").stat().st_mtime)
        if a.force or not mudo.exists() or mudo.stat().st_size == 0 or mudo.stat().st_mtime < fuentes:   # plantilla o voz nuevas: re-render
            while ram_libre_mb() < RAM_MIN_MB:
                print(f"  RAM libre {ram_libre_mb()} MB < {RAM_MIN_MB}: espero 30 s", flush=True); time.sleep(30)
            run(f'npx hyperframes render . --output "{mudo}" --workers 1 --fps 30', cwd=HF)
        if resolucion(mudo) != (ZC_ANCHO, ZC_ALTO):
            sys.exit(f"El render salio {resolucion(mudo)} y no {ZC_ANCHO}x{ZC_ALTO}.")

    print("[5] musica y mezcla (-14 LUFS, true peak <= -2 dB)")
    mix = AU / "final_mix.m4a"
    if a.force or not mix.exists() or mix.stat().st_mtime < (AU / "timeline.json").stat().st_mtime:   # voz nueva: re-mezcla
        mezclar_audio(AU, asegurar_musica(P, a.musica), total, mix, ["-c:a", "aac", "-b:a", "192k"])
    li, tp = loudness(mix)
    print(f"  mezcla final: {li:.1f} LUFS, true peak {tp:+.1f} dBTP")
    if abs(li - LUFS_OBJ) > 1.0 or tp > TP_OBJ: sys.exit(f"Mezcla fuera de objetivo ({LUFS_OBJ} LUFS, TP<=-2 dB): {li:.1f} LUFS / {tp:+.1f} dBTP")
    if a.sin_render: return

    print("[6] union -> renders/zonachef/ (sin subida: REGLAS_ZONACHEF.md)")
    out = ZC_SALIDA / f"{a.proyecto}.mp4"; out.parent.mkdir(parents=True, exist_ok=True)
    run(["ffmpeg", "-y", "-hide_banner", "-loglevel", "error", "-i", str(mudo), "-i", str(mix), "-map", "0:v:0", "-map", "1:a:0",
         "-c:v", "copy", "-c:a", "copy", "-shortest", "-movflags", "+faststart", str(out)])
    dv = dur(out); w, h = resolucion(out)
    print(f"  {out}  {dv:.1f} s (locucion {total:.1f} s)  {w}x{h}  {out.stat().st_size / 2**20:.0f} MB")
    if abs(dv - total) > 1.5: sys.exit("La duracion final no coincide con la locucion.")
    print("LISTO (no se publica nada)")


def main():
    ap = argparse.ArgumentParser(); ap.add_argument("proyecto", nargs="?"); ap.add_argument("--musica")
    ap.add_argument("--canal", choices=["finanzas", "zonachef"], default="finanzas", help="finanzas (por defecto, flujo de siempre) o zonachef (Short vertical, sin subida)")
    ap.add_argument("--pendientes", action="store_true", help="con --canal zonachef: lista las transcripciones de transcripciones_zonachef/")
    ap.add_argument("--force", action="store_true"); ap.add_argument("--sin-render", action="store_true")
    ap.add_argument("--sin-subir", action="store_true", help="genera metadata.json pero no sube el video a YouTube")
    ap.add_argument("--prueba-nombre", default="prueba_audio.mp3")
    ap.add_argument("--narracion", help="narration_raw alternativa (solo para pruebas de audio)")
    ap.add_argument("--prueba-audio", type=float, metavar="SEG", help="solo mezcla los primeros SEG segundos de voz+musica en prueba_audio.mp3 y sale (sin build ni render)")
    a = ap.parse_args()
    if a.canal == "zonachef":
        a.musica = a.musica or "corporate upbeat background"
        return fabrica_zonachef(a)
    if not a.proyecto: ap.error("falta el nombre del proyecto")
    a.musica = a.musica or "lo-fi chill instrumental"
    P = REPO / "projects" / a.proyecto; HF = P / "hyperframes"; R = P / "renders"; AU = P / "assets/audio"
    guiones = sorted(P.glob("guion_*.txt"))
    if not guiones or not (P / "film2d/spec.js").exists():
        sys.exit(f"Falta guion_*.txt o film2d/spec.js en {P}. Pide a Claude que redacte el guion y disene spec.js (ver REGLAS_VIDEO.md).")

    print("[1] plantilla")
    if P != PLANTILLA:
        for f in ["hyperframes/audit_dyn.cjs", "hyperframes/chk_items.cjs", "hyperframes/cam_check.cjs", "hyperframes/render_film2d.sh"] + [f"film2d/{x}" for x in ["engine.js", "kitshim.js", "widgets.js", "template.tpl", "gsap.min.js", "props.js", "build.py"]]:
            if not (P / f).exists():
                (P / f).parent.mkdir(parents=True, exist_ok=True); shutil.copy(PLANTILLA / f, P / f)
    vw = P / "voice.py"          # voz oficial: envoltorio de scripts/voice.py (clon Chatterbox de referencia_voz.wav.wav); nunca otro sintetizador
    if P != PLANTILLA and (not vw.exists() or "scripts/voice.py" not in vw.read_text(encoding="utf-8")):
        vw.write_text(chr(10).join(['"""Wrapper: la locucion la hace scripts/voice.py (clonacion de referencia_voz.wav.wav con Chatterbox)."""',
                                 "import subprocess, sys", "from pathlib import Path", "P = Path(__file__).resolve().parent",
                                 f'sys.exit(subprocess.call([sys.executable, str(P.parents[1] / "scripts/voice.py"), P.name, str(P / "{guiones[0].name}")]))', ""]), encoding="utf-8")

    # Motor 2.2 "Layout 2.0" (fondo tech-grid, subtitulos cineticos, texto inercial, glow; ilustraciones 2D de assets/ilustraciones/, ventanas
    # flotantes y camara UI que salta entre ventanas): los proyectos con motor viejo se actualizan desde la plantilla por marca de version.
    # ink-grid.js / ink-pose.js los copia film2d/build.py desde ink-theater/ en cada build.
    if P != PLANTILLA:
        for f, marca in (("film2d/engine.js", "FABRICA_2.1"), ("film2d/template.tpl", "LAYOUT_2"), ("film2d/build.py", "ILUS_V1"), ("hyperframes/audit_dyn.cjs", "AUDIT_V2"), ("film2d/widgets.js", "FLAT_V1"), ("hyperframes/cam_check.cjs", "CAM_CHECK_V2")):
            dst = P / f
            if marca not in dst.read_text(encoding="utf-8"):
                print(f"  layout 2.0: actualizo {f}"); shutil.copy(PLANTILLA / f, dst)

    if a.prueba_audio:
        print(f"[prueba de audio] primeros {a.prueba_audio:.0f} s")
        out = P / a.prueba_nombre
        li, tp = mezclar_audio(AU, asegurar_musica(P, a.musica), a.prueba_audio, out, ["-c:a", "libmp3lame", "-b:a", "192k"], narracion=Path(a.narracion) if a.narracion else None)
        print(f"  {out}  {li:.1f} LUFS, true peak {tp:+.1f} dBTP"); return

    print("[2] voz")
    if a.force or not (AU / "timeline.json").exists():
        run([sys.executable, "voice.py"], cwd=P, env={**__import__("os").environ, "PYTHONIOENCODING": "utf-8"})
    tl = json.load(open(AU / "timeline.json", encoding="utf-8")); print(f"  locucion {tl['duration']:.1f} s")

    print("[2b] efectos de sonido (Fabrica 2.0: swish en poses, click en vinetas)")
    run([sys.executable, str(REPO / "scripts/sfx_sync.py"), a.proyecto], env={**__import__("os").environ, "PYTHONIOENCODING": "utf-8"})

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
        # Fabrica 2.0: camara dinamica (zoom al Stickman, sin planos fijos > 5 s, ninguna ventana fuera de cuadro)
        cc = subprocess.run(["node", "cam_check.cjs", d, "0.2"], cwd=HF, capture_output=True, text=True)
        print("  " + cc.stdout.strip().replace(chr(10), chr(10) + "  "))
        if cc.returncode: sys.exit(f"Camara con problemas en {d} (ventana fuera de cuadro o plano fijo largo): revisa spec.js / motor.")

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
    sfx = AU / "sfx.wav"
    if a.force or not mix.exists() or (sfx.exists() and sfx.stat().st_mtime > mix.stat().st_mtime):
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

    print("[8] metadatos y YouTube (privado)")
    import agente_metadatos as am
    if not (P / "metadatos_brief.json").exists():
        print("  falta metadatos_brief.json: pide a Claude que lo redacte y corre  python agente_metadatos.py subir " + a.proyecto)
    else:
        am.generar(a.proyecto)
        if a.sin_subir: print("  --sin-subir: no se sube")
        elif not (am.TOKEN.exists() or am.CLIENT_SECRET.exists()): print(f"  sin credenciales de YouTube en {am.CRED}: no se sube (ver agente_metadatos.py)")
        else: am.subir(a.proyecto)
    print("LISTO")


if __name__ == "__main__":
    main()

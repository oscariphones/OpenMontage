#!/usr/bin/env python3
"""Motor de comerciales cinematograficos ZonaChef, 100 % local y open-source (rembg + librosa + MoviePy/OpenCV + ffmpeg).

Etapas (cada una se salta si su resultado ya existe; --force las repite):
  1 assets  rembg recorta la foto del producto -> producto.png (transparente);
            musica 'phonk' y 3 efectos (whoosh, glitch, bass drop) desde Pixabay (scraping).
            Si Pixabay bloquea (403), usa el cache de trabajo/, --musica <archivo> o, para los efectos, los sintetiza localmente.
  2 beats   librosa: tempo, kicks (onsets de graves), golpes fuertes y drop -> beats.json (tiempos del video, en segundos)
  3 render  MoviePy + OpenCV: fondo casi negro con vineta y paneo lento (parallax), producto con zoom-in lento continuo;
            en cada golpe fuerte de beats.json un efecto agresivo (zoom de escala, camera shake 0.2 s o glitch/aberracion cromatica);
            palabras clave en los golpes de inicio de frase.
  4 mezcla  musica + efectos sincronizados con los mismos tiempos -> -14 LUFS, true peak <= -2 dBTP -> MP4 final.

Uso:
  python zonachef/pipeline_cinematico_os.py --imagen <ruta|url> --nombre krups --formato vertical
         [--palabras "KRUPS,15 BARES,PRE-ORDENA"] [--precio "$5,699.08"] [--web ZONACHEF.COM.MX] [--dur 18]
         [--musica archivo.mp3] [--consulta phonk] [--etapa assets|beats|render|mezcla|todo] [--force] [--prueba SEG]
Salida: renders/zonachef/<nombre>_os_<formato>.mp4   (el pipeline termina al generar el MP4: NO publica ni sube nada).
"""
import argparse, json, re, shutil, subprocess, sys, urllib.parse, urllib.request, wave
from pathlib import Path

import numpy as np

AQUI = Path(__file__).resolve().parent; REPO = AQUI.parent
sys.path.insert(0, str(REPO))
FPS, SR = 30, 48000
FORMATOS = {"vertical": (1080, 1920), "horizontal": (1920, 1080)}
FUENTE = next((f for f in ("C:/Windows/Fonts/seguibl.ttf", "C:/Windows/Fonts/arialbd.ttf") if Path(f).exists()), None)
ROJO, VERDE, BLANCO = (215, 38, 46), (23, 163, 74), (245, 246, 247)


def log(*a): print(*a, flush=True)
def ff(args): subprocess.run(["ffmpeg", "-y", "-hide_banner", "-loglevel", "error", *args], check=True)


# ============================== 1. ASSETS ==============================
def recortar_producto(origen, destino):
    """rembg -> PNG transparente recortado a su caja."""
    from PIL import Image
    from rembg import remove, new_session
    if re.match(r"https?://", str(origen)):
        tmp = destino.with_suffix(".orig" + Path(urllib.parse.urlparse(origen).path).suffix)
        urllib.request.urlretrieve(origen, tmp); origen = tmp
    img = Image.open(origen).convert("RGB")
    out = remove(img, session=new_session("u2net"), post_process_mask=True)
    out = out.crop(out.getchannel("A").point(lambda a: 255 if a > 8 else 0).getbbox())
    out.save(destino); log(f"  producto recortado: {destino.name} {out.size}")


def pixabay_buscar(seccion, consulta, dur_min, dur_max):
    """Busca en Pixabay (music | sound-effects) con el scraper del repo. Devuelve [] si falla (p. ej. 403 anti-bots)."""
    from tools.audio.pixabay_music import PixabayMusic
    t = PixabayMusic()
    slug = urllib.parse.quote(re.sub(r"\s+", "-", consulta.strip().lower()), safe="-")
    url = f"https://pixabay.com/{seccion}/search/{slug}/"
    try:
        op = t._build_opener(); req = urllib.request.Request(url); req.add_header("User-Agent", t._USER_AGENT)
        for k, v in t._BROWSER_HEADERS.items(): req.add_header(k, v)
        html = op.open(req, timeout=30).read().decode("utf-8", "replace")
        pistas = t._parse_bootstrap(html, url, op) or t._parse_tracks_html(html)
    except Exception as e:
        log(f"  Pixabay {seccion} '{consulta}': {e}"); return [], t
    ok = [p for p in pistas if p.get("duration") and dur_min <= p["duration"] <= dur_max]
    return ok or pistas, t


def pixabay_bajar(seccion, consulta, destino, dur_min, dur_max):
    pistas, t = pixabay_buscar(seccion, consulta, dur_min, dur_max)
    if not pistas: return None
    p = pistas[0]
    try:
        t._download(p, {"output_path": str(destino)})
    except Exception as e:
        log(f"  descarga fallida: {e}"); return None
    return {"fuente": "pixabay", "titulo": p.get("title"), "artista": p.get("artist"), "duracion": p.get("duration"),
            "licencia": "Pixabay Content License (uso comercial libre, sin atribucion obligatoria)"}


# --- efectos sintetizados (respaldo local si Pixabay no responde) ---
def _env(n, a, d):
    t = np.arange(n) / SR; return np.minimum(1, t / max(a, 1e-4)) * np.exp(-t / d)
def _lp(x, fc):
    fc = np.broadcast_to(np.asarray(fc, float), x.shape); a = np.exp(-2 * np.pi * fc / SR); y = np.empty_like(x); z = 0.0
    for i in range(len(x)): z = (1 - a[i]) * x[i] + a[i] * z; y[i] = z
    return y
def sintetizar(tipo, rng):
    if tipo == "whoosh":
        d = .45; n = int(d * SR); t = np.arange(n) / SR; ph = t / d; nz = rng.standard_normal(n); fc = 300 + 7000 * np.sin(np.pi * ph) ** 2
        x = (_lp(nz, fc) - _lp(nz, fc * .25)) * np.sin(np.pi * ph) ** 1.5
        for f, g in ((1240, .5), (1873, .35), (2711, .3), (3967, .2)):          # resonancia metalica
            x += g * np.sin(2 * np.pi * f * t * (1 + .015 * ph)) * _env(n, d * .55, .12) * (ph > .45)
    elif tipo == "glitch":
        d = .18; n = int(d * SR); t = np.arange(n) / SR; x = np.zeros(n); seg = int(.012 * SR)
        for i in range(0, n, seg):
            s = np.sign(np.sin(2 * np.pi * rng.choice([180, 420, 880, 1600, 3200]) * t[i:i + seg]))
            x[i:i + seg] = s * (rng.random() > .25) + .6 * rng.standard_normal(len(s)) * (rng.random() > .5)
        x = np.round(x * 4) / 4 * _env(n, .002, d * .8)
    else:  # bass drop
        d = 1.3; n = int(d * SR); t = np.arange(n) / SR; f = 95 * np.exp(-t / .35) + 32
        x = np.tanh(2.2 * np.sin(2 * np.pi * np.cumsum(f) / SR) * _env(n, .004, .6))
        x += np.tanh(1.8 * np.sin(2 * np.pi * np.cumsum(140 * np.exp(-t / .05) + 45) / SR) * _env(n, .001, .16))
    return x / max(np.abs(x).max(), 1e-6)


def escribir_wav(ruta, x, canales=1):
    with wave.open(str(ruta), "wb") as w:
        w.setnchannels(canales); w.setsampwidth(2); w.setframerate(SR)
        w.writeframes((np.clip(x, -1, 1) * 32767).astype("<i2").tobytes())


def etapa_assets(a, W):
    meta_f = W / "assets.json"; meta = json.loads(meta_f.read_text(encoding="utf-8")) if meta_f.exists() else {}
    prod = W / "producto.png"
    if a.force or not prod.exists():
        if not a.imagen: sys.exit("Falta --imagen (foto del producto: ruta local o URL).")
        recortar_producto(a.imagen, prod); meta["producto"] = {"origen": str(a.imagen), "rembg": "u2net"}
    mus = W / "musica.mp3"
    if a.musica:
        shutil.copy(a.musica, mus); meta["musica"] = {"fuente": "local", "archivo": str(a.musica)}
    elif a.force or not mus.exists():
        info = pixabay_bajar("music", a.consulta, mus, 60, 300)
        if not info:
            sys.exit("Pixabay no entrego musica (bloqueo/403). Descarga a mano una pista phonk y usa --musica <archivo>, o reintenta mas tarde.")
        meta["musica"] = info
    (W / "sfx").mkdir(exist_ok=True); rng = np.random.default_rng(7)
    for tipo, consulta in (("whoosh", "whoosh"), ("glitch", "glitch"), ("bassdrop", "bass drop")):
        if not a.force and any((W / "sfx").glob(f"{tipo}.*")): continue
        info = pixabay_bajar("sound-effects", consulta, W / "sfx" / f"{tipo}.mp3", 0.2, 6)
        if not info:
            escribir_wav(W / "sfx" / f"{tipo}.wav", sintetizar(tipo, rng)); info = {"fuente": "sintetizado localmente (respaldo)"}
            (W / "sfx" / f"{tipo}.mp3").unlink(missing_ok=True)
        meta[f"sfx_{tipo}"] = info; log(f"  sfx {tipo}: {info['fuente']}")
    meta_f.write_text(json.dumps(meta, ensure_ascii=False, indent=1), encoding="utf-8")


# ============================== 2. BEATS ==============================
def etapa_beats(a, W):
    import librosa
    y, sr = librosa.load(str(W / "musica.mp3"), sr=22050, mono=True); total = len(y) / sr
    tempo, beats = librosa.beat.beat_track(y=y, sr=sr, units="time"); tempo = float(np.atleast_1d(tempo)[0])
    hop = 256
    # kicks: onsets de la banda grave (< 200 Hz)
    env = librosa.onset.onset_strength(y=y, sr=sr, hop_length=hop, fmax=200, n_mels=32)
    tt = librosa.frames_to_time(np.arange(len(env)), sr=sr, hop_length=hop)
    pk = librosa.util.peak_pick(env, pre_max=6, post_max=6, pre_avg=20, post_avg=20, delta=env.std() * .8, wait=int(.25 * sr / hop))
    kicks = tt[pk]; fuerza = env[pk] / env[pk].max()
    # drop: primer punto donde la energia (RMS suavizado 1 s) salta a > 75 % del maximo desde < 55 %
    rms = librosa.feature.rms(y=y, hop_length=hop)[0]; k = int(sr / hop); rs = np.convolve(rms, np.ones(k) / k, "same")
    drop = None
    for i in range(int(1.5 * k), len(rs)):
        if rs[i] > .75 * rs.max() and rs[i - int(1.5 * k)] < .55 * rs.max():
            # el drop es el primer kick cercano cuyo golpe (0.3 s siguientes) ya suena casi al maximo
            cerca = kicks[(kicks >= tt[i] - 1.2) & (kicks <= tt[i] + .8)]
            golpe = [rms[(tt >= c) & (tt < c + .3)].mean() for c in cerca]
            fuertes_c = [c for c, g in zip(cerca, golpe) if g >= .7 * max(golpe)] if golpe else []
            drop = float(fuertes_c[0]) if fuertes_c else float(tt[i]); break
    offset = max(0.0, min((drop - a.pre_drop) if drop else 0.0, total - a.dur))
    def vid(ts): return [round(float(t - offset), 3) for t in ts if offset <= t < offset + a.dur]
    fuertes = [t for t, f in zip(kicks, fuerza) if f >= a.umbral]
    data = {"tempo_bpm": round(tempo, 2), "beat_s": round(60 / tempo, 4), "offset_pista_s": round(offset, 3), "duracion_s": a.dur,
            "drop_s": round(drop - offset, 3) if drop and offset <= drop < offset + a.dur else None,
            "beats": vid(beats), "kicks": vid(kicks), "fuertes": vid(fuertes)}
    (W / "beats.json").write_text(json.dumps(data, indent=1), encoding="utf-8")
    log(f"  {tempo:.1f} BPM, drop en {drop if drop is None else round(drop, 2)} s de la pista (extracto desde {offset:.2f} s), "
        f"{len(data['kicks'])} kicks / {len(data['fuertes'])} fuertes en el video")


def plan(b, palabras, dur):
    """Efecto por golpe fuerte y momento de cada palabra (inicio de frase de 8 tiempos desde el drop)."""
    t0 = b["drop_s"] if b["drop_s"] is not None else (b["fuertes"] or [0.5])[0]
    frase = 8 * b["beat_s"]; ciclo = ["zoom", "shake", "glitch"]
    def golpe_cercano(t):
        c = [k for k in b["kicks"] if abs(k - t) < b["beat_s"] / 2]; return min(c, key=lambda k: abs(k - t)) if c else round(t, 3)
    pal = []
    for i, w in enumerate(palabras):
        t = golpe_cercano(t0 + i * frase)
        if t < dur - 1.0: pal.append({"t": t, "palabra": w})
    for i, p in enumerate(pal): p["fin"] = pal[i + 1]["t"] - .05 if i + 1 < len(pal) else dur
    fx = []
    for j, t in enumerate(b["fuertes"]):
        if t < t0 - .05: fx.append({"t": t, "tipo": ciclo[j % 3], "k": .5})            # antes del drop: efectos suaves
        else: fx.append({"t": t, "tipo": ciclo[j % 3], "k": 1.0})
    for p in pal: fx.append({"t": p["t"], "tipo": "todo", "k": 1.2})                     # cada palabra cae con todos los efectos
    fx.sort(key=lambda e: e["t"])
    return pal, fx, t0


# ============================== 3. RENDER ==============================
def texto_img(palabra, ancho_max, alto, cta, precio=None, web=None):
    """Palabra clave como imagen RGBA (numero en rojo, CTA en pastilla verde, resto blanco con barra roja)."""
    from PIL import Image, ImageDraw, ImageFont
    fs = int(alto); f = ImageFont.truetype(FUENTE, fs) if FUENTE else ImageFont.load_default()
    m = re.match(r"^(\d[\d.,]*)\s+(.+)$", palabra)
    partes = [(m.group(1), ROJO), (" " + m.group(2), BLANCO)] if m else [(palabra, BLANCO)]
    def medir(ft): return [ft.getbbox(p)[2] for p, _ in partes]
    while sum(medir(f)) > ancho_max * (.78 if cta else 1) and fs > 20:
        fs = int(fs * .92); f = ImageFont.truetype(FUENTE, fs) if FUENTE else f
    anchos = medir(f); asc, desc = f.getmetrics(); pad = int(fs * .32) if cta else 0
    extra = 0; fs2 = int(fs * .3); f2 = ImageFont.truetype(FUENTE, fs2) if FUENTE else f
    lineas = [x for x in (precio, web) if x] if cta else []
    if lineas: extra = int(len(lineas) * fs2 * 1.25 + fs * .25)
    Wd = int(max(sum(anchos) + 2 * pad, max([f2.getbbox(l)[2] for l in lineas] or [0])) + 40); Hd = asc + desc + 2 * pad + int(fs * .22) + extra + 40
    im = Image.new("RGBA", (Wd, Hd), (0, 0, 0, 0)); d = ImageDraw.Draw(im)
    x0 = (Wd - sum(anchos)) // 2; y0 = 20 + pad
    if cta:
        d.rounded_rectangle([x0 - pad, 20, x0 + sum(anchos) + pad, 20 + asc + desc + 2 * pad - int(fs * .1)], radius=int(fs * .28), fill=VERDE + (255,))
    else:
        d.rectangle([Wd // 2 - int(fs * 1.2), y0 + asc + desc - int(fs * .02), Wd // 2 + int(fs * 1.2), y0 + asc + desc + int(fs * .07)], fill=ROJO + (255,))
    x = x0
    for (p, col), w in zip(partes, anchos):
        d.text((x, y0 - int(fs * .06)), p, font=f, fill=(255, 255, 255, 255) if cta else col + (255,)); x += w
    y = 20 + asc + desc + 2 * pad + int(fs * .2)
    for l in lineas:
        d.text(((Wd - f2.getbbox(l)[2]) // 2, y), l, font=f2, fill=BLANCO + (255,)); y += int(fs2 * 1.25)
    return np.array(im)


def etapa_render(a, W, salida_mudo):
    import cv2
    try: from moviepy.editor import VideoClip
    except ImportError: from moviepy import VideoClip
    WW, HH = FORMATOS[a.formato]; vert = a.formato == "vertical"
    b = json.loads((W / "beats.json").read_text(encoding="utf-8")); dur = min(a.prueba or a.dur, a.dur)
    palabras = [p.strip() for p in a.palabras.split(",") if p.strip()]
    pal, fx, t0 = plan(b, palabras, a.dur)
    (W / "plan.json").write_text(json.dumps({"palabras": pal, "efectos": fx, "drop": t0}, indent=1, ensure_ascii=False), encoding="utf-8")
    rng = np.random.default_rng(3)

    # fondo oscuro mas grande que el cuadro (para el paneo), con resplandor tenue y grano; vineta aparte
    BW, BH = int(WW * 1.25), int(HH * 1.25)
    yy, xx = np.mgrid[0:BH, 0:BW].astype(np.float32)
    g = np.exp(-(((xx - BW * .55) / (BW * .45)) ** 2 + ((yy - BH * .45) / (BH * .35)) ** 2))
    fondo = np.zeros((BH, BW, 3), np.float32); fondo[:] = (13, 14, 16)
    fondo += g[..., None] * np.array([34, 12, 12], np.float32) + g[..., None] * 10            # brillo rojizo muy tenue
    fondo += (yy / BH)[..., None] * 8 + rng.normal(0, 2.2, (BH, BW, 1)).astype(np.float32)
    fondo = np.clip(fondo, 0, 255)
    vy, vx = np.mgrid[0:HH, 0:WW].astype(np.float32)
    vin = (1 - .78 * np.clip(np.hypot((vx - WW / 2) / (WW * .62), (vy - HH / 2) / (HH * .62)) - .35, 0, 1) ** 1.6)[..., None].astype(np.float32)

    prod = cv2.imread(str(W / "producto.png"), cv2.IMREAD_UNCHANGED)
    prod = cv2.cvtColor(prod, cv2.COLOR_BGRA2RGBA).astype(np.float32)
    ph, pw = prod.shape[:2]
    base = min(WW * (.82 if vert else .5) / pw, HH * (.52 if vert else .72) / ph)
    pcx, pcy = WW / 2, HH * (.42 if vert else .5)
    # sombra suave bajo el producto
    som = np.zeros((HH, WW), np.float32)
    cv2.ellipse(som, (int(pcx), int(pcy + ph * base / 2)), (int(pw * base * .42), int(ph * base * .04) + 8), 0, 0, 360, 1, -1)
    som = cv2.GaussianBlur(som, (0, 0), 25)[..., None] * .6

    txt = {}
    for i, p in enumerate(pal):
        cta = i == len(pal) - 1 and len(pal) > 1
        txt[p["palabra"]] = texto_img(p["palabra"], WW * .9, (WW * .15 if vert else HH * .19), cta, a.precio if cta else None, a.web if cta else None).astype(np.float32)
    ty = HH * (.78 if vert else .5)

    def efecto(t):
        """Suma de efectos activos en t: escala extra, desplazamiento de camara, intensidad de glitch, flash."""
        esc, dx, dy, gl, fl = 0., 0., 0., 0., 0.
        for e in fx:
            u = t - e["t"]
            if u < 0 or u > .3: continue
            k = e["k"]; todo = e["tipo"] == "todo"
            if e["tipo"] == "zoom" or todo: esc += .14 * k * np.exp(-u / .07)
            if (e["tipo"] == "shake" or todo) and u < .2:
                r = np.random.default_rng(int(e["t"] * 1000) + int(u * FPS)); amp = 34 * k * (1 - u / .2)
                dx += r.uniform(-amp, amp); dy += r.uniform(-amp, amp)
            if (e["tipo"] == "glitch" or todo) and u < .15: gl = max(gl, k * (1 - u / .15))
            if todo and u < .12: fl = max(fl, .55 * (1 - u / .12))
        return esc, dx, dy, gl, fl

    def frame(t):
        p = t / a.dur
        # parallax: fondo hace paneo lento, producto zoom-in lento continuo
        ox, oy = int((BW - WW) * (.15 + .7 * p)), int((BH - HH) * (.6 - .2 * p))
        img = fondo[oy:oy + HH, ox:ox + WW].copy()
        esc, dx, dy, gl, fl = efecto(t)
        s = base * (1 + .14 * p) * (1 + esc); rot = 1.2 * np.sin(t * .6)
        M = cv2.getRotationMatrix2D((pw / 2, ph / 2), rot, s)
        M[0, 2] += pcx - pw / 2 + dx * .6; M[1, 2] += pcy - ph / 2 + dy * .6
        cap = cv2.warpAffine(prod, M, (WW, HH), flags=cv2.INTER_LINEAR, borderMode=cv2.BORDER_CONSTANT, borderValue=(0, 0, 0, 0))
        img = img * (1 - som)
        al = cap[..., 3:4] / 255.
        img = img * (1 - al) + cap[..., :3] * al
        img *= vin
        # palabra activa (entra de golpe: escala 1.7 -> 1 en 0.12 s)
        for q in pal:
            if q["t"] <= t < q["fin"]:
                u = t - q["t"]; z = 1 + .7 * max(0, 1 - u / .12) ** 2
                ti = txt[q["palabra"]]; h, w = ti.shape[:2]
                ti = cv2.resize(ti, (max(1, int(w * z)), max(1, int(h * z))), interpolation=cv2.INTER_LINEAR); h, w = ti.shape[:2]
                x0, y0 = int(WW / 2 - w / 2 + dx), int(ty - h / 2 + dy)
                xa, ya, xb, yb = max(0, x0), max(0, y0), min(WW, x0 + w), min(HH, y0 + h)
                if xb > xa and yb > ya:
                    sub = ti[ya - y0:yb - y0, xa - x0:xb - x0]; al = sub[..., 3:4] / 255. * min(1, u / .05 + .2)
                    img[ya:yb, xa:xb] = img[ya:yb, xa:xb] * (1 - al) + sub[..., :3] * al
        # camera shake del cuadro completo
        if dx or dy:
            img = cv2.warpAffine(img, np.float32([[1, 0, dx * .4], [0, 1, dy * .4]]), (WW, HH), borderMode=cv2.BORDER_REFLECT)
        # glitch: aberracion cromatica + franjas desplazadas
        if gl > 0:
            sh = int(18 * gl); img[..., 0] = np.roll(img[..., 0], sh, axis=1); img[..., 2] = np.roll(img[..., 2], -sh, axis=1)
            r = np.random.default_rng(int(t * FPS))
            for _ in range(4):
                y1 = int(r.uniform(0, HH - 40)); y2 = y1 + int(r.uniform(12, HH * .06))
                img[y1:y2] = np.roll(img[y1:y2], int(r.uniform(-80, 80) * gl), axis=1)
        if fl > 0: img = img * (1 - fl) + 255 * fl
        return np.clip(img, 0, 255).astype(np.uint8)

    log(f"  render {WW}x{HH}, {dur:.1f} s, {len(fx)} efectos, palabras en {[p['t'] for p in pal]}")
    VideoClip(frame, duration=dur).write_videofile(str(salida_mudo), fps=FPS, codec="libx264", audio=False, preset="medium",
                                                   ffmpeg_params=["-crf", "18", "-pix_fmt", "yuv420p"], threads=1, logger=None)


# ============================== 4. MEZCLA ==============================
def cargar_mono(ruta, max_s=2.5):
    tmp = ruta.with_suffix(".tmp.wav")
    ff(["-i", str(ruta), "-t", f"{max_s}", "-ac", "1", "-ar", str(SR), "-af", f"afade=t=out:st={max_s - 0.3:.2f}:d=0.3", "-c:a", "pcm_s16le", str(tmp)])
    with wave.open(str(tmp)) as w: x = np.frombuffer(w.readframes(w.getnframes()), "<i2").astype(np.float32) / 32768
    tmp.unlink(); return x / max(np.abs(x).max(), 1e-6)


def etapa_mezcla(a, W, mudo, salida):
    import fabrica_video as fv
    dur = min(a.prueba or a.dur, a.dur)
    b = json.loads((W / "beats.json").read_text(encoding="utf-8")); pl = json.loads((W / "plan.json").read_text(encoding="utf-8"))
    sfx = {k: cargar_mono(next((W / "sfx").glob(f"{k}.*"))) for k in ("whoosh", "glitch", "bassdrop")}
    n = int((dur + 1) * SR); bus = np.zeros(n)
    def poner(x, t, g):
        i = int(max(t, 0) * SR)
        if i < n: bus[i:i + len(x)] += g * x[:n - i]
    if pl["drop"] is not None: poner(sfx["bassdrop"], pl["drop"], 1.0); poner(sfx["whoosh"], pl["drop"] - .3, .6)
    for p in pl["palabras"]:                                         # cada palabra: whoosh de entrada + bass drop en el golpe
        poner(sfx["whoosh"], p["t"] - .3, .7)
        if abs(p["t"] - (pl["drop"] or -9)) > .05: poner(sfx["bassdrop"], p["t"], .75)
    for e in pl["efectos"]:
        if e["tipo"] == "glitch": poner(sfx["glitch"], e["t"] - .01, .45 * e["k"])
    tmp = W / "mezcla"; tmp.mkdir(exist_ok=True)
    escribir_wav(tmp / "sfx.wav", bus / max(np.abs(bus).max(), 1e-6) * .7)
    mus = tmp / "musica.wav"
    ff(["-ss", f"{b['offset_pista_s']}", "-t", f"{dur}", "-i", str(W / "musica.mp3"), "-af", f"afade=t=out:st={max(0, dur - 2.5):.2f}:d=2.5", "-ar", str(SR), "-ac", "2", str(mus)])
    gs = (fv.loudness(mus)[0] - 4) - fv.loudness(tmp / "sfx.wav")[0]          # efectos 4 LU por debajo de la musica
    mez = tmp / "mezcla.wav"
    ff(["-i", str(mus), "-i", str(tmp / "sfx.wav"), "-filter_complex",
        f"[1:a]volume={gs:.2f}dB,aformat=channel_layouts=stereo,aresample={SR}[s];[0:a][s]amix=inputs=2:duration=first:normalize=0", str(mez)])
    mix, li0 = tmp / "final.m4a", fv.loudness(mez)[0]
    for techo in (-3.2, -3.7, -4.2):                                # -14 LUFS, true peak <= -2 dBTP (alimiter sin renormalizar)
        for extra in (.3, .9, 1.5, 2.1, 2.7):
            ff(["-i", str(mez), "-af", f"volume={fv.LUFS_OBJ - li0 + extra:.2f}dB,alimiter=limit={10 ** (techo / 20):.4f}:attack=3:release=50:level=disabled,aresample={SR}",
                "-c:a", "aac", "-b:a", "256k", str(mix)])
            li, tp = fv.loudness(mix)
            if li >= fv.LUFS_OBJ - .4 and tp <= fv.TP_OBJ: break
            if tp > fv.TP_OBJ: break
        if li >= fv.LUFS_OBJ - .4 and tp <= fv.TP_OBJ: break
    salida.parent.mkdir(parents=True, exist_ok=True)
    ff(["-i", str(mudo), "-i", str(mix), "-map", "0:v:0", "-map", "1:a:0", "-c:v", "copy", "-c:a", "copy", "-shortest", "-movflags", "+faststart", str(salida)])
    log(f"  mezcla {li:.1f} LUFS, true peak {tp:+.1f} dBTP")


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--nombre", required=True); ap.add_argument("--imagen")
    ap.add_argument("--formato", choices=FORMATOS, default="vertical"); ap.add_argument("--dur", type=float, default=18)
    ap.add_argument("--palabras", default="KRUPS,15 BARES,PRE-ORDENA"); ap.add_argument("--precio"); ap.add_argument("--web")
    ap.add_argument("--musica", help="pista local (salta la descarga)"); ap.add_argument("--consulta", default="phonk")
    ap.add_argument("--pre-drop", type=float, default=1.9, help="segundos de musica antes del drop")
    ap.add_argument("--umbral", type=float, default=.45, help="fuerza minima (0-1) de un kick para disparar efecto")
    ap.add_argument("--etapa", choices=["assets", "beats", "render", "mezcla", "todo"], default="todo")
    ap.add_argument("--prueba", type=float, help="renderiza solo los primeros SEG segundos (salida *_prueba.mp4)")
    ap.add_argument("--salida"); ap.add_argument("--force", action="store_true")
    a = ap.parse_args()
    W = AQUI / "trabajo" / a.nombre; W.mkdir(parents=True, exist_ok=True)
    salida = Path(a.salida) if a.salida else REPO / "renders/zonachef" / f"{a.nombre}_os_{a.formato}{'_prueba' if a.prueba else ''}.mp4"
    mudo = W / f"video_mudo_{a.formato}.mp4"
    todo = a.etapa == "todo"
    if todo or a.etapa == "assets": log("[1] assets"); etapa_assets(a, W)
    if todo or a.etapa == "beats":
        if a.force or todo or not (W / "beats.json").exists(): log("[2] beats"); etapa_beats(a, W)
    if todo or a.etapa == "render": log("[3] render"); etapa_render(a, W, mudo)
    if todo or a.etapa == "mezcla": log("[4] mezcla"); etapa_mezcla(a, W, mudo, salida)
    if todo or a.etapa == "mezcla": log(f"LISTO {salida}")


if __name__ == "__main__":
    main()

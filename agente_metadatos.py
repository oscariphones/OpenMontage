#!/usr/bin/env python3
"""Agente de metadatos de la Fabrica 2.0: metadata.json + Prompt Maestro de miniatura + subida PRIVADA a YouTube (Data API v3).

La parte creativa (titulos, descripcion, hashtags, etiquetas, expresion/postura y texto de la miniatura) la redacta SIEMPRE Claude
en projects/<proyecto>/metadatos_brief.json (regla de REGLAS_VIDEO.md). Este script solo valida, ensambla y sube:

    {
      "tema": "finanzas personales basicas",
      "titulos": ["...", "...", "..."],                 # 3 opciones, formula de contraste/clickbait, <= 100 caracteres
      "titulo_elegido": 0,                               # opcional: indice del titulo que se sube (luego se cambia desde el celular)
      "descripcion": "Parrafos sin hashtags...",        # el script anade capitulos, aviso legal y los 5 hashtags
      "hashtags": ["#finanzas", "...5 en total"],
      "etiquetas": ["finanzas personales", "..."],
      "capitulos": {"GANCHO": "Introduccion"},          # opcional: nombre de capitulo por seccion "## X" del guion
      "miniatura": {"expresion": "...", "postura": "...", "objeto": "...", "texto": ["LINEA BLANCA", "LINEA DORADA", "PALABRA GIGANTE"]}
    }

Uso:
    python agente_metadatos.py generar <proyecto>             -> projects/<proyecto>/metadata.json
    python agente_metadatos.py autorizar                      -> login OAuth de YouTube una sola vez (abre el navegador)
    python agente_metadatos.py subir <proyecto> [--titulo N] [--force]
    python agente_metadatos.py miniatura <proyecto>           -> cambia la portada del video ya subido (no lo vuelve a subir)
Credenciales: credenciales/youtube_client_secret.json (cliente OAuth "App de escritorio" de Google Cloud). El token queda en
credenciales/youtube_token.json. Ambos estan en .gitignore. Dependencias: pip install -r requirements-youtube.txt
"""
import argparse, datetime, json, re, sys
from pathlib import Path

REPO = Path(__file__).resolve().parent
CRED = REPO / "credenciales"
CLIENT_SECRET, TOKEN = CRED / "youtube_client_secret.json", CRED / "youtube_token.json"
SCOPES = ["https://www.googleapis.com/auth/youtube.upload"]   # basta para videos.insert y thumbnails.set
CATEGORIA_EDUCACION = "27"
AVISO = "Contenido educativo, no es asesoría financiera. Las cifras son guías generales; tus números serán distintos."
MIN_CAPITULO = 10   # s: YouTube exige >= 10 s por capitulo, >= 3 capitulos y el primero en 0:00

# Prompt Maestro: todo lo que esta fuera de {expresion}/{postura}/{objeto}/{texto} es INAMOVIBLE (replica la miniatura de referencia
# "8 HABITOS PARA NO SER POBRE"). Cambiar estas reglas solo si el usuario lo pide.
PROMPT_MAESTRO = """Miniatura de YouTube 16:9 (1920x1080), render 3D estilo claymation / stop-motion de plastilina, acabado fotográfico, alto contraste.

PERSONAJE (fijo, mismo personaje en todas las miniaturas): hombre de plastilina con cabeza grande y redonda, piel gris-beige mate con textura de arcilla (pequeños poros y hoyuelos de modelado), ojos grandes y redondos con iris café, párpados gruesos, cejas oscuras gruesas en forma de salchicha, ojeras marcadas. Gorra de béisbol gris carbón desgastada con bordes deshilachados, sudadera negra con capucha y cordones, camiseta oscura debajo, reloj de pulsera plateado con correa de cuero en la muñeca izquierda. Encuadre de pecho hacia arriba, ocupa el tercio izquierdo de la imagen (~45 % del ancho), ligeramente girado hacia la derecha.
EXPRESIÓN: {expresion}
POSTURA: {postura}

ILUMINACIÓN (fija): luz de contorno (rim light) cálida naranja-ámbar intensa que dibuja todo el borde de la silueta del personaje con un halo brillante; luz principal suave y tenue de frente; sombras profundas.

FONDO (fijo): tech-grid oscuro, gris carbón casi negro (#141414) con una cuadrícula fina de líneas grises tenues de celdas cuadradas, viñeta suave hacia los bordes. Sin otros objetos ni degradados de color.

OBJETO SECUNDARIO (según el tema; misma posición y escala en todas): en la esquina inferior izquierda, parcialmente fuera de cuadro, del mismo estilo claymation y bañado por la misma luz de contorno: {objeto}. Pequeño y secundario: nunca tapa la cara del personaje ni el texto.

TEXTO GIGANTE (mitad derecha, ocupa ~55 % del ancho): tipografía sans-serif condensada extra negrita (estilo Anton/Impact), en MAYÚSCULAS e inclinada en itálica, con sombra paralela oscura y nítida. {texto}. Ortografía exacta, con tildes, sin texto adicional.

PROHIBIDO: cambiar el estilo del personaje, el fondo, la iluminación o la tipografía; añadir logotipos, marcas de agua, bordes o texto extra."""


def die(msg): sys.exit(f"[metadatos] {msg}")


def texto_miniatura(lineas):
    if not 2 <= len(lineas) <= 3: die("miniatura.texto debe tener 2 o 3 lineas")
    if sum(len(l.split()) for l in lineas) > 7: die("miniatura.texto: maximo 7 palabras en total (debe leerse en el celular)")
    lineas = [l.upper().strip() for l in lineas]
    partes = [f'Línea 1 en blanco puro: "{lineas[0]}"']
    for i, l in enumerate(lineas[1:], 2):
        tam = "la más grande de todas, enorme" if i == len(lineas) else "tamaño grande"
        partes.append(f'Línea {i} con degradado vertical amarillo (#FFD000) arriba a naranja (#FF8A00) abajo, {tam}: "{l}"')
    return "; ".join(partes)


def capitulos(P, nombres):
    tl = P / "assets/audio/timeline.json"
    if not tl.exists(): return []
    caps = []
    for s in json.loads(tl.read_text(encoding="utf-8"))["sentences"]:
        if not caps or caps[-1][1] != s["section"]:
            caps.append([0.0 if not caps else s["start"], s["section"]])
    caps = [c for i, c in enumerate(caps) if i + 1 == len(caps) or caps[i + 1][0] - c[0] >= MIN_CAPITULO]   # fusiona los muy cortos
    if len(caps) < 3: return []
    return [f"{int(t) // 60}:{int(t) % 60:02d} {nombres.get(sec) or sec.capitalize()}" for t, sec in caps]


def generar(proyecto):
    P = REPO / "projects" / proyecto
    brief_f = P / "metadatos_brief.json"
    if not brief_f.exists(): die(f"falta {brief_f}: pide a Claude que lo redacte (ver REGLAS_VIDEO.md, paso 8).")
    b = json.loads(brief_f.read_text(encoding="utf-8"))
    for k in ("tema", "titulos", "descripcion", "hashtags", "etiquetas", "miniatura"):
        if not b.get(k): die(f"metadatos_brief.json: falta '{k}'")
    titulos, tags = [t.strip() for t in b["titulos"]], [t.strip() for t in b["etiquetas"]]
    hashtags = ["#" + h.lstrip("#").replace(" ", "") for h in b["hashtags"]]
    if len(titulos) != 3: die("se necesitan exactamente 3 titulos")
    if len(hashtags) != 5: die("se necesitan exactamente 5 hashtags")
    avisos = []
    for t in titulos:
        if len(t) > 100: die(f"titulo de {len(t)} caracteres (maximo 100): {t}")
        if len(t) > 70: avisos.append(f"titulo de {len(t)} caracteres: se corta en el celular a partir de ~70")
    # YouTube cuenta las etiquetas con espacios como si llevaran comillas
    largo_tags = sum(len(t) + (2 if " " in t else 0) for t in tags) + len(tags) - 1
    if largo_tags > 500: die(f"etiquetas suman {largo_tags} caracteres (maximo 500)")

    caps = capitulos(P, b.get("capitulos", {}))
    desc = b["descripcion"].strip()
    if caps: desc += "\n\nCapítulos:\n" + "\n".join(caps)
    desc += f"\n\n{AVISO}\n\n" + " ".join(hashtags)
    for campo, txt in [("descripcion", desc), *(("titulo", t) for t in titulos), *(("etiqueta", t) for t in tags)]:
        if "<" in txt or ">" in txt: die(f"{campo} contiene '<' o '>' (la API de YouTube los rechaza): {txt[:60]}")
    if len(desc.encode("utf-8")) > 5000: die("la descripcion supera 5000 bytes")

    m = b["miniatura"]
    for k in ("expresion", "postura", "objeto", "texto"):
        if not m.get(k): die(f"miniatura: falta '{k}'")
    elegido = int(b.get("titulo_elegido", 0))
    meta = {
        "proyecto": proyecto, "tema": b["tema"], "generado": datetime.datetime.now().isoformat(timespec="seconds"),
        "video": f"projects/{proyecto}/renders/final.mp4",
        "titulos": titulos, "titulo_elegido": elegido,
        "descripcion": desc, "hashtags": hashtags,
        "etiquetas": ", ".join(tags), "etiquetas_lista": tags,
        "categoria_youtube": CATEGORIA_EDUCACION, "idioma": "es", "privacidad": "private",
        "miniatura": {"expresion": m["expresion"], "postura": m["postura"], "objeto": m["objeto"], "texto": [l.upper() for l in m["texto"]],
                      "prompt_maestro": PROMPT_MAESTRO.format(expresion=m["expresion"], postura=m["postura"], objeto=m["objeto"], texto=texto_miniatura(m["texto"])),
                      "archivo": "miniatura.png o miniatura.jpg en la carpeta del proyecto (se sube si existe)"},
    }
    previo = P / "metadata.json"
    if previo.exists():    # conserva el registro de la subida para no duplicar el video
        yt = json.loads(previo.read_text(encoding="utf-8")).get("youtube")
        if yt: meta["youtube"] = yt
    previo.write_text(json.dumps(meta, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"[metadatos] {previo}  ({len(caps)} capitulos)")
    for a in avisos: print(f"  aviso: {a}")
    return meta


def youtube_api():
    try:
        from google.auth.transport.requests import Request
        from google.oauth2.credentials import Credentials
        from google_auth_oauthlib.flow import InstalledAppFlow
        from googleapiclient.discovery import build
    except ImportError:
        die("faltan dependencias: pip install -r requirements-youtube.txt")
    creds = Credentials.from_authorized_user_file(str(TOKEN), SCOPES) if TOKEN.exists() else None
    if creds and creds.expired and creds.refresh_token:
        try: creds.refresh(Request())
        except Exception: creds = None          # token revocado o vencido (app en modo "Prueba" = 7 dias): volver a autorizar
    if not creds or not creds.valid:
        if not CLIENT_SECRET.exists():
            die(f"falta {CLIENT_SECRET} (Google Cloud > APIs y servicios > Credenciales > ID de cliente OAuth > App de escritorio)")
        creds = InstalledAppFlow.from_client_secrets_file(str(CLIENT_SECRET), SCOPES).run_local_server(port=0)
        CRED.mkdir(exist_ok=True); TOKEN.write_text(creds.to_json(), encoding="utf-8")
    return build("youtube", "v3", credentials=creds)


def subir(proyecto, titulo=None, force=False):
    from googleapiclient.http import MediaFileUpload
    P = REPO / "projects" / proyecto
    mf = P / "metadata.json"
    meta = json.loads(mf.read_text(encoding="utf-8")) if mf.exists() else generar(proyecto)
    if meta.get("youtube") and not force:
        print(f"[youtube] ya subido: {meta['youtube']['url']} (usa --force para subirlo otra vez)"); return meta["youtube"]
    video = REPO / meta["video"]
    if not video.exists(): die(f"no existe {video}")
    idx = meta["titulo_elegido"] if titulo is None else titulo
    yt = youtube_api()
    body = {"snippet": {"title": meta["titulos"][idx], "description": meta["descripcion"], "tags": meta["etiquetas_lista"],
                        "categoryId": meta["categoria_youtube"], "defaultLanguage": meta["idioma"], "defaultAudioLanguage": meta["idioma"]},
            "status": {"privacyStatus": "private", "selfDeclaredMadeForKids": False}}
    req = yt.videos().insert(part="snippet,status", body=body,
                             media_body=MediaFileUpload(str(video), mimetype="video/mp4", chunksize=8 * 2**20, resumable=True))
    print(f"[youtube] subiendo {video.name} en PRIVADO: {body['snippet']['title']}")
    resp = None
    while resp is None:
        estado, resp = req.next_chunk()
        if estado: print(f"  {estado.progress() * 100:.0f} %", flush=True)
    vid = resp["id"]
    info = {"id": vid, "url": f"https://youtu.be/{vid}", "studio": f"https://studio.youtube.com/video/{vid}/edit",
            "titulo": body["snippet"]["title"], "privacidad": "private", "subido": datetime.datetime.now().isoformat(timespec="seconds")}
    meta["youtube"] = info; mf.write_text(json.dumps(meta, ensure_ascii=False, indent=2), encoding="utf-8")   # guardar antes de la miniatura
    poner_miniatura(yt, P, meta, mf)
    print(f"[youtube] listo (privado): {info['studio']}")
    return info


def poner_miniatura(yt, P, meta, mf, estricto=False):
    """Sube miniatura.png/jpg del proyecto al video ya subido (thumbnails.set: no toca ni duplica el video)."""
    from googleapiclient.http import MediaFileUpload
    info = meta["youtube"]
    mini = next((P / f for f in ("miniatura.png", "miniatura.jpg", "miniatura.jpeg") if (P / f).exists()), None)
    if not mini:
        msg = "sin miniatura.png/jpg en el proyecto: genera la imagen con el prompt_maestro"
        if estricto: die(msg)
        print("  " + msg + " y subela desde el celular"); return False
    if mini.stat().st_size > 2 * 2**20: die(f"{mini.name} pesa {mini.stat().st_size / 2**20:.1f} MB (YouTube acepta hasta 2 MB)")
    try:
        yt.thumbnails().set(videoId=info["id"], media_body=MediaFileUpload(str(mini))).execute()
        info["miniatura_subida"] = True; info["miniatura"] = {"archivo": mini.name, "subida": datetime.datetime.now().isoformat(timespec="seconds")}
        print(f"  miniatura {mini.name} subida a {info['id']}")
    except Exception as e:   # requiere canal verificado por telefono y archivo < 2 MB
        info["miniatura_subida"] = False
        if estricto: mf.write_text(json.dumps(meta, ensure_ascii=False, indent=2), encoding="utf-8"); die(f"no se pudo subir la miniatura: {e}")
        print(f"  aviso: no se pudo subir la miniatura ({e})")
    mf.write_text(json.dumps(meta, ensure_ascii=False, indent=2), encoding="utf-8")
    return info["miniatura_subida"]


def miniatura(proyecto):
    P = REPO / "projects" / proyecto; mf = P / "metadata.json"
    meta = json.loads(mf.read_text(encoding="utf-8")) if mf.exists() else {}
    if not meta.get("youtube"): die(f"{proyecto} todavia no esta subido a YouTube: usa  python agente_metadatos.py subir {proyecto}")
    poner_miniatura(youtube_api(), P, meta, mf, estricto=True)
    print(f"[youtube] portada actualizada: {meta['youtube']['studio']}")


def main():
    ap = argparse.ArgumentParser(description=__doc__.split("\n")[0])
    sub = ap.add_subparsers(dest="cmd", required=True)
    sub.add_parser("generar").add_argument("proyecto")
    sub.add_parser("autorizar")
    sub.add_parser("miniatura").add_argument("proyecto")
    s = sub.add_parser("subir"); s.add_argument("proyecto"); s.add_argument("--titulo", type=int, choices=[0, 1, 2]); s.add_argument("--force", action="store_true")
    a = ap.parse_args()
    if a.cmd == "generar": generar(a.proyecto)
    elif a.cmd == "autorizar": youtube_api(); print(f"[youtube] autorizado, token en {TOKEN}")
    elif a.cmd == "miniatura": miniatura(a.proyecto)
    else: subir(a.proyecto, a.titulo, a.force)


if __name__ == "__main__":
    main()

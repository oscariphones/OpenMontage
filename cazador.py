#!/usr/bin/env python3
"""El Cazador - busca un video "outlier" de finanzas/negocios en YouTube y guarda su transcripcion.

Regla estricta
  * Busca videos EN INGLES sobre finanzas, negocios o interes compuesto.
  * Por cada video compara sus VISTAS con los SUSCRIPTORES del canal.
    Si Vistas > Suscriptores  ->  es un video viral "outlier" y es el GANADOR.
  * Con el ganador usa youtube-transcript-api para extraer la transcripcion original en ingles,
    la guarda en transcripciones_pendientes/<id>_<titulo>.txt (el link va en la PRIMERA linea) y se DETIENE.

Para no levantar sospechas
  * Pausa aleatoria de 2 a 5 s (time.sleep) antes de CADA peticion: busqueda, metadatos y transcripcion.
  * Maximo 10 videos examinados por ejecucion.
  * Recuerda los videos ya examinados (transcripciones_pendientes/.vistos.json) para no repetir peticiones.
  * Si YouTube responde con bloqueo / limite de peticiones, el script se detiene en el acto.

Canales (--canal): cada uno con su carpeta, su memoria .vistos.json y sus consultas, para no mezclar IDs.
  finanzas (por defecto)  -> transcripciones_pendientes/  (exactamente el comportamiento original)
  zonachef                -> transcripciones_zonachef/    (cocina profesional / negocio gastronomico, en ingles)

Uso:  python cazador.py                       (elige una consulta al azar)
      python cazador.py --consulta "compound interest explained"
      python cazador.py --canal zonachef [--consulta "..."]
Salida: 0 = ganador encontrado y guardado | 2 = ningun outlier en esta ejecucion | 3 = YouTube bloqueo la peticion
"""
import argparse
import json
import random
import re
import sys
import time
from datetime import datetime
from pathlib import Path

import yt_dlp
from youtube_transcript_api import YouTubeTranscriptApi
from youtube_transcript_api._errors import (
    CouldNotRetrieveTranscript,
    IpBlocked,
    NoTranscriptFound,
    RequestBlocked,
    TranscriptsDisabled,
)

RAIZ = Path(__file__).resolve().parent
CARPETA = RAIZ / "transcripciones_pendientes"
VISTOS = CARPETA / ".vistos.json"

MAX_VIDEOS = 10          # videos examinados por ejecucion (limite duro)
MAX_BUSQUEDAS = 3        # busquedas por ejecucion
RESULTADOS_POR_BUSQUEDA = 12
PAUSA_MIN, PAUSA_MAX = 2.0, 5.0

CONSULTAS_FINANZAS = [  # todas en ingles
    "compound interest explained",
    "personal finance for beginners",
    "how to start investing with little money",
    "small business finance mistakes",
    "how the rich build wealth",
    "index fund investing explained",
    "side hustle business startup money",
    "how compound interest made me rich",
    "budgeting and saving money tips",
    "business cash flow explained",
]
CONSULTAS_ZONACHEF = [  # todas en ingles: cocina profesional y negocio de restaurantes/cafeterias (B2B)
    "commercial kitchen equipment tips",
    "restaurant profit margins explained",
    "how to start a coffee shop business",
    "commercial espresso machine for cafe",
    "restaurant kitchen efficiency tips",
    "food cost control restaurant",
    "food truck business costs",
    "bakery business equipment",
]
IDIOMAS = ["en", "en-US", "en-GB"]

# --canal: carpeta de salida + memoria .vistos.json propia + consultas. "finanzas" conserva las rutas originales.
CANALES = {
    "finanzas": (RAIZ / "transcripciones_pendientes", CONSULTAS_FINANZAS),
    "zonachef": (RAIZ / "transcripciones_zonachef", CONSULTAS_ZONACHEF),
}
CONSULTAS = CONSULTAS_FINANZAS


def pausa(motivo):
    """Pausa humana de 2 a 5 s antes de cada peticion HTTP."""
    s = random.uniform(PAUSA_MIN, PAUSA_MAX)
    print(f"   ... pausa {s:.1f}s antes de {motivo}")
    time.sleep(s)


def cargar_vistos():
    try:
        return set(json.loads(VISTOS.read_text(encoding="utf-8")))
    except Exception:
        return set()


def guardar_vistos(vistos):
    CARPETA.mkdir(exist_ok=True)
    VISTOS.write_text(json.dumps(sorted(vistos)), encoding="utf-8")


def es_bloqueo(exc):
    t = f"{type(exc).__name__} {exc}".lower()
    return any(k in t for k in ("429", "too many requests", "ipblocked", "requestblocked", "sign in to confirm", "captcha"))


def buscar(ydl_plano, consulta):
    pausa(f"buscar '{consulta}'")
    info = ydl_plano.extract_info(f"ytsearch{RESULTADOS_POR_BUSQUEDA}:{consulta}", download=False)
    return [e for e in (info.get("entries") or []) if e and e.get("id")]


def metadatos(ydl, video_id):
    pausa(f"leer metadatos de {video_id}")
    return ydl.extract_info(f"https://www.youtube.com/watch?v={video_id}", download=False)


def transcripcion_ingles(video_id):
    pausa(f"pedir transcripcion de {video_id}")
    api = YouTubeTranscriptApi()
    fetched = api.fetch(video_id, languages=IDIOMAS)
    texto = " ".join(s.text.replace("\n", " ").strip() for s in fetched)
    return re.sub(r"\s+", " ", texto).strip(), fetched.language_code, fetched.is_generated


def slug(texto, n=60):
    s = re.sub(r"[^a-zA-Z0-9]+", "-", texto).strip("-").lower()
    return s[:n].strip("-") or "video"


def guardar(info, texto, idioma, generada):
    CARPETA.mkdir(exist_ok=True)
    vid = info["id"]
    ruta = CARPETA / f"{vid}_{slug(info.get('title', ''))}.txt"
    subs, vistas = info["channel_follower_count"], info["view_count"]
    cabecera = [
        f"https://www.youtube.com/watch?v={vid}",                      # PRIMERA LINEA: el link
        f"Titulo: {info.get('title')}",
        f"Canal: {info.get('channel') or info.get('uploader')}",
        f"Vistas: {vistas:,} | Suscriptores: {subs:,} | Vistas/Suscriptores: {vistas / max(subs, 1):.2f}x",
        f"Transcripcion original: {idioma} ({'autogenerada' if generada else 'manual'})",
        f"Extraido: {datetime.now().isoformat(timespec='seconds')}",
        "",
    ]
    ruta.write_text("\n".join(cabecera) + texto + "\n", encoding="utf-8")
    return ruta


def main():
    ap = argparse.ArgumentParser(description="El Cazador: encuentra un video outlier y guarda su transcripcion.")
    ap.add_argument("--consulta", help="busqueda en ingles (por defecto una al azar)")
    ap.add_argument("--canal", choices=sorted(CANALES), default="finanzas", help="finanzas (por defecto) o zonachef: carpeta y memoria separadas")
    args = ap.parse_args()
    global CARPETA, VISTOS, CONSULTAS
    CARPETA, CONSULTAS = CANALES[args.canal]
    VISTOS = CARPETA / ".vistos.json"

    vistos = cargar_vistos()
    examinados = 0
    busquedas = 0
    consultas = [args.consulta] if args.consulta else random.sample(CONSULTAS, k=len(CONSULTAS))
    base = {"quiet": True, "no_warnings": True, "skip_download": True, "socket_timeout": 20, "retries": 1}
    print(f"El Cazador [{args.canal}] -> {CARPETA.name}/ - max {MAX_VIDEOS} videos por ejecucion, pausas de {PAUSA_MIN:.0f}-{PAUSA_MAX:.0f}s")
    try:
        with yt_dlp.YoutubeDL({**base, "extract_flat": True}) as plano, yt_dlp.YoutubeDL({**base, "check_formats": False}) as completo:
            for consulta in consultas:
                if examinados >= MAX_VIDEOS or busquedas >= MAX_BUSQUEDAS:
                    break
                busquedas += 1
                print(f"\n[busqueda {busquedas}] {consulta}")
                candidatos = [e for e in buscar(plano, consulta) if e["id"] not in vistos]
                print(f"   {len(candidatos)} candidatos nuevos")
                for e in candidatos:
                    if examinados >= MAX_VIDEOS:
                        break
                    examinados += 1
                    vistos.add(e["id"])
                    guardar_vistos(vistos)
                    try:
                        info = metadatos(completo, e["id"])
                    except Exception as exc:
                        if es_bloqueo(exc):
                            raise
                        print(f"   [{examinados}/{MAX_VIDEOS}] {e['id']}: no se pudo leer ({type(exc).__name__}); sigo")
                        continue
                    vistas, subs = info.get("view_count"), info.get("channel_follower_count")
                    titulo = (info.get("title") or "")[:70]
                    if info.get("language") and not str(info["language"]).lower().startswith("en"):
                        print(f"   [{examinados}/{MAX_VIDEOS}] {titulo!r}: idioma {info['language']}, no es ingles; sigo")
                        continue
                    if vistas is None or not subs:
                        print(f"   [{examinados}/{MAX_VIDEOS}] {titulo!r}: sin dato de vistas/suscriptores; sigo")
                        continue
                    outlier = vistas > subs
                    print(f"   [{examinados}/{MAX_VIDEOS}] {titulo!r} | vistas {vistas:,} vs suscriptores {subs:,} -> {'OUTLIER' if outlier else 'no'}")
                    if not outlier:
                        continue
                    try:
                        texto, idioma, generada = transcripcion_ingles(info["id"])
                    except (TranscriptsDisabled, NoTranscriptFound, CouldNotRetrieveTranscript) as exc:
                        if isinstance(exc, (IpBlocked, RequestBlocked)):
                            raise
                        print(f"   sin transcripcion en ingles ({type(exc).__name__}); sigo con el siguiente")
                        continue
                    ruta = guardar(info, texto, idioma, generada)
                    print(f"\nGANADOR: https://www.youtube.com/watch?v={info['id']}")
                    print(f"Transcripcion guardada en {ruta.relative_to(RAIZ)} ({len(texto.split()):,} palabras). Me detengo.")
                    return 0
    except Exception as exc:
        if es_bloqueo(exc):
            print(f"\nYouTube bloqueo/limito la peticion ({type(exc).__name__}). Me detengo para no empeorarlo; reintenta mas tarde.")
            return 3
        raise
    print(f"\nNingun outlier en esta ejecucion ({examinados} videos examinados). Vuelve a correrlo mas tarde.")
    return 2


if __name__ == "__main__":
    sys.exit(main())

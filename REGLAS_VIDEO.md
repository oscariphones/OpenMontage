# Reglas de la fábrica de videos de finanzas (flujo `finanzas-video-factory`)

> **REGLA ESTRICTA (decidida por el usuario, 2026-10-08): la parte creativa la hace SIEMPRE el agente de IA (Claude), nunca el script ni el usuario.**
> Flujo obligatorio en cada video nuevo:
> 1. Leer la transcripción nueva (`transcripciones_pendientes/`).
> 2. **Claude redacta el guion** (`guion_*.txt`), con ideas propias y cifras verificadas.
> 3. **Claude diseña las escenas** (`film2d/spec.js`).
> 4. Solo entonces ejecutar `python fabrica_video.py <proyecto>` para ensamblar (voz, auditoría, render, música, unión).
> No pedir al usuario que escriba el guion ni las escenas, y no esperar confirmación paso a paso.

Flujo exacto del video `fondos-indexados`. Cuando el usuario pida un video nuevo a partir de una transcripción (o de "El Cazador"), se ejecuta de principio a fin sin pedir confirmación paso a paso.

## 0. Fuente
- `python cazador.py` deja la transcripción en `transcripciones_pendientes/` (link en la primera línea).
- Se extraen **ideas**, nunca se traduce ni se copia la redacción. El guion es nuevo, en español, enérgico.
- **Corregir cifras**: las transcripciones automáticas deforman números (ej. "0.2 %" era 0.02 % = $2 por $10,000). Verificar que cada cifra sea coherente antes de usarla. No inventar datos que el original no dé; si algo es dudoso, decirlo en genérico.
- Aclarar siempre que el promedio histórico no es promesa y que es contenido educativo, no asesoría financiera.

## 1. Guion → `projects/<proyecto>/guion_<tema>.txt`
- Cabecera `FUENTE:` y `FORMATO:`; luego secciones `## NOMBRE` y **una frase por línea** (frases cortas, gancho al inicio, cierre con llamada a la acción). ~3-4 min.

## 2. Voz (automático) — VOZ OFICIAL Y OBLIGATORIA
- **Desde 2026-10-09, la única voz permitida en TODOS los proyectos es la clonada con Chatterbox Multilingual (español), generada por `scripts/voice.py` a partir del archivo de referencia `referencia_voz.wav.wav` (raíz del repo; ojo: lleva doble extensión).** Decisión del usuario; no cambiarla sin que lo pida.
- Cada proyecto tiene un `voice.py` que solo es un envoltorio: `python scripts/voice.py <proyecto> projects/<proyecto>/guion_<tema>.txt`. `fabrica_video.py` lo crea solo en los proyectos nuevos y lo ejecuta en la etapa 2. **No usar ningún otro sintetizador.**
- Salida: `assets/audio/narration_raw.wav` (+ `narration.wav` copia) y `timeline.json` con los tiempos reales de cada frase. Parámetros de generación en `scripts/voice.py` (`GEN`: exaggeration 0.5, cfg_weight 0.5, temperature 0.8; semilla fija por frase). Sin GPU corre en CPU y es lento (≈ 2-3 veces la duración del audio o más): no lanzar nada pesado en paralelo.
- **PROHIBIDO `rubberband` / cambios de tono o tiempo** sobre la voz sintetizada: degradan la señal (textura robótica y borrosa). Solo remuestreo soxr a 44.1 kHz. Huecos 0.28 s entre frases, 0.65 s entre secciones.
- La voz clonada habla más lento que una voz de TTS plano: un guion de ~35 frases dura ≈ 2.8 min. Calcular la duración del video con `timeline.json`, no con estimaciones.
- Si cambia la voz o el guion de un proyecto, borrar `assets/audio/sentences/` (las frases se cachean) y correr `fabrica_video.py <proyecto> --force`.

## 3. Escenas → `film2d/spec.js` (lo diseña Claude)
- Muñeco 2D de poses fijas + cuadrícula CSS (celda del personaje / celda de gráficos / subtítulos anclados abajo). **Sin coordenadas**: solo `sc(a, b, "cg", poses, filas)`.
- Una escena por idea (≈1 por 1-3 frases), tiempos reales `S(k)` de las frases. Elementos: `p` props, `w` widgets, `c` chips, `big` texto grande, `sy` símbolos.
- Chips cortos, 1-3 por fila, máximo ~4 filas. Sin mocap, sin movimiento continuo extraño.
- **Motion graphics sutiles (motor V2.1, automáticos):** cada escena hace un zoom digital lento y lineal (100 % → hasta 105 %, máx. 0.6 %/s; `cam: false` en la escena la deja fija, `cam: 1.03` fija otro zoom). Textos (`big`, chips, notas) y páginas de subtítulos entran deslizándose desde abajo con fade e inercia (`fx: "inertia"`); los iconos (`p`: casa, reloj, tarjeta…) se dibujan trazo a trazo (`fx: "draw"`); los widgets mantienen el `pop`. Lo verde y naranja lleva glow (text-shadow/box-shadow, sin `filter` CSS para no subir el costo de render). Cualquier `fx` explícito en `spec.js` manda sobre el efecto por defecto.

## 4. Verificación (obligatoria antes de renderizar)
- `node audit_dyn.cjs fN 0.4` debe dar **0 issues** (sin solapes ni elementos fuera de celda).
- Mirar capturas (`npx hyperframes snapshot . --at ...`) de varias escenas.

## 5. Render
- Partes por sección (el corte cae entre escenas), **una parte a la vez, `--workers 1`, 30 fps**, pausa entre partes y esperar RAM libre (≥1 GB). La RAM de este equipo es baja: no lanzar nada pesado en paralelo.

## 6. Música y mezcla (audio: presencia, -14 LUFS, true peak <= -2 dB)
- Pista lo-fi libre de Pixabay (`tools/audio/pixabay_music.py`), guardada en `assets/music/` con créditos; bucle con fundido cruzado, fade in 3 s / out 5 s.
- **La voz se procesa SIEMPRE desde `narration_raw.wav` (sin procesar), nunca desde `narration.wav`.** `VOZ_CHAIN` en `fabrica_video.py`: filtro de graves 70 Hz, -6 dB de margen, `adeclip` (repara picos saturados de origen), **puerta de ruido `agate`** (los silencios entre palabras quedan en cero digital), high-shelf +3 dB desde 4 kHz (claridad), compresión densa en dos etapas (5:1 y 2.5:1) y limitador (recorta ~1 dB, no aplasta).
- **Sin** de-esser, **sin** EQ agresivo (cortes/subidas en 110/150/250/280/3200 Hz), **sin** `aexciter`, **sin** `afftdn` en la voz (el filtro empasta la voz), **sin** reverb/eco. Todo eso distorsionaba la voz.
- La música pasa por `MUSICA_CHAIN` (`adeclick` + `afftdn`; mejora marginal medida) y va **18 LUFS por debajo de la voz, medido con ebur128** (no por un volumen fijo).
- Mezcla final a **-14 LUFS** (estándar YouTube) con ganancia medida + limitador de picos; el techo del limitador es -3.2 dB para que el AAC deje el **true peak <= -2 dBTP**. El script reintenta con más ganancia y **se detiene** si queda fuera de -14 ±0.4 LUFS o TP > -2 dB.
- **Lección (2026-10-08):** `alimiter` renormaliza el pico por defecto; siempre usar `level=disabled`. Sin eso la locución quedaba en +0.8 dBFS con 4,671 muestras saturadas y 1.7 LU de rango (plana y "lejana"). Nunca encadenar compresor con makeup alto + limitador sin `level=disabled`.

## 7. Final
- Unir partes (concat) + mezcla → `renders/final.mp4`; comprobar que la duración coincide con la locución.

## 8. Metadatos y YouTube → `agente_metadatos.py` (el brief lo redacta Claude)
- Junto con el guion y `spec.js`, **Claude redacta `projects/<proyecto>/metadatos_brief.json`**: 3 títulos con fórmula de contraste/clickbait (≤ 70 caracteres ideal, 100 máx.), descripción, 5 hashtags, etiquetas, nombres de capítulos y, para la miniatura, solo `expresion`, `postura`, `objeto` (objeto secundario de la esquina inferior izquierda, según el tema: sobre "DEUDA", alcancía, gráfica en subida, tarjeta de crédito...) y `texto` (2-3 líneas, ≤ 7 palabras).
- Al terminar el render, `fabrica_video.py` (etapa 8) genera `metadata.json` (capítulos desde `timeline.json`, aviso legal y hashtags al final) y el **Prompt Maestro** de la miniatura: personaje claymation, fondo tech-grid oscuro, rim light naranja, posición/escala del objeto secundario y tipografía son **inamovibles**.
- Si existen credenciales en `credenciales/`, sube `renders/final.mp4` a YouTube **siempre en Privado** (+ `miniatura.png/jpg` si existe); no vuelve a subir si `metadata.json` ya tiene `youtube`. `--sin-subir` lo evita.

## Todo lo mecánico (pasos 2-8) en un comando
`python fabrica_video.py <proyecto>`  (usa `--force`, `--sin-render`, `--sin-subir`, `--musica "..."`).
Claude redacta el guion (1) y diseña `spec.js` (3) — ver la regla estricta de arriba. El script se detiene si falta alguno o si la auditoría no da 0 problemas.

## Honestidad en el reporte
Decir qué se verificó (auditoría, capturas, duración) y qué no (no se vio el video entero en movimiento ni se escuchó la mezcla; palabras de subtítulos proporcionales).

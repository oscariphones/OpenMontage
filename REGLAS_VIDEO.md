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

## 2. Voz (automático)
- Piper `es_ES-davefx-medium` (`~/.piper/models`), `length_scale 0.90, noise_scale 0.90, noise_w 1.0`, rubberband pitch +2.5 st / tempo ×1.09 (formante preservado), cadena broadcast (EQ + compresor + limitador). Huecos 0.28 s entre frases, 0.65 s entre secciones.

## 3. Escenas → `film2d/spec.js` (lo diseña Claude)
- Muñeco 2D de poses fijas + cuadrícula CSS (celda del personaje / celda de gráficos / subtítulos anclados abajo). **Sin coordenadas**: solo `sc(a, b, "cg", poses, filas)`.
- Una escena por idea (≈1 por 1-3 frases), tiempos reales `S(k)` de las frases. Elementos: `p` props, `w` widgets, `c` chips, `big` texto grande, `sy` símbolos.
- Chips cortos, 1-3 por fila, máximo ~4 filas. Sin mocap, sin movimiento continuo extraño.

## 4. Verificación (obligatoria antes de renderizar)
- `node audit_dyn.cjs fN 0.4` debe dar **0 issues** (sin solapes ni elementos fuera de celda).
- Mirar capturas (`npx hyperframes snapshot . --at ...`) de varias escenas.

## 5. Render
- Partes por sección (el corte cae entre escenas), **una parte a la vez, `--workers 1`, 30 fps**, pausa entre partes y esperar RAM libre (≥1 GB). La RAM de este equipo es baja: no lanzar nada pesado en paralelo.

## 6. Música y mezcla (audio: presencia, -14 LUFS, true peak <= -2 dB)
- Pista lo-fi libre de Pixabay (`tools/audio/pixabay_music.py`), guardada en `assets/music/` con créditos; bucle con fundido cruzado, fade in 3 s / out 5 s.
- **La voz se procesa SIEMPRE desde `narration_raw.wav` (sin procesar), nunca desde `narration.wav`.** `VOZ_CHAIN` en `fabrica_video.py`: -4 dB de margen, highpass 80 Hz, +1.5 dB a 150 Hz (cuerpo/cercanía), -2 dB a 250 Hz (quita caja/lejanía), +3 dB a 3 kHz (presencia), de-esser, compresión dinámica 3:1 y limitador.
- La música va **18 LUFS por debajo de la voz, medido con ebur128** (no por un volumen fijo).
- Mezcla final a **-14 LUFS** (estándar YouTube) con ganancia medida + limitador de picos; el techo del limitador es -3.2 dB para que el AAC deje el **true peak <= -2 dBTP**. El script reintenta con más ganancia y **se detiene** si queda fuera de -14 ±0.4 LUFS o TP > -2 dB.
- **Lección (2026-10-08):** `alimiter` renormaliza el pico por defecto; siempre usar `level=disabled`. Sin eso la locución quedaba en +0.8 dBFS con 4,671 muestras saturadas y 1.7 LU de rango (plana y "lejana"). Nunca encadenar compresor con makeup alto + limitador sin `level=disabled`.

## 7. Final
- Unir partes (concat) + mezcla → `renders/final.mp4`; comprobar que la duración coincide con la locución.

## Todo lo mecánico (pasos 2-7) en un comando
`python fabrica_video.py <proyecto>`  (usa `--force`, `--sin-render`, `--musica "..."`).
Claude redacta el guion (1) y diseña `spec.js` (3) — ver la regla estricta de arriba. El script se detiene si falta alguno o si la auditoría no da 0 problemas.

## Honestidad en el reporte
Decir qué se verificó (auditoría, capturas, duración) y qué no (no se vio el video entero en movimiento ni se escuchó la mezcla; palabras de subtítulos proporcionales).

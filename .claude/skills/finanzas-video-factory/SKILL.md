---
name: finanzas-video-factory
description: Convierte una transcripción (de YouTube, de El Cazador o de transcripciones_pendientes/) en un video 2D de finanzas en español con estilo Fábrica 2.0: guion propio, escenas spec.js con Stickman, voz clonada Chatterbox, fondo 2.5D, cámara dinámica, efectos de sonido sincronizados, render local con fabrica_video.py y subida privada a YouTube. Úsala siempre que el usuario pida "haz un video con esta transcripción", "procesa la siguiente transcripción pendiente", "otro video de finanzas", "corre la fábrica", o mencione guion_*.txt, spec.js, fabrica_video.py o un tema de finanzas personales para el canal (deuda, ahorro, inversión, interés compuesto, riqueza, negocio), aunque no diga "fábrica".
---

# Fábrica de videos de finanzas (Fábrica 2.0)

Convierte una transcripción en un video publicado en privado. El reparto de trabajo es la regla central del flujo y la decidió el usuario: **Claude hace todo lo creativo** (guion, escenas, metadatos) y **`fabrica_video.py` solo ensambla** (voz, efectos, build, auditoría, render, mezcla, unión y subida). Nunca le pidas al usuario que escriba el guion o las escenas, y no esperes confirmación entre pasos: corre el flujo completo y al final reporta.

`REGLAS_VIDEO.md` (raíz del repo) tiene los detalles de la voz y la mezcla, y lo que se aprendió de errores pasados. Léelo una vez por sesión antes de empezar. Esta skill añade las reglas visuales y de sonido de Fábrica 2.0, que tienen prioridad donde choquen con él.

## Restricciones del equipo (por qué el flujo es lento a propósito)

- La RAM es baja: **nunca** lances renders, voz u otros procesos pesados en paralelo. `fabrica_video.py` ya renderiza una parte a la vez con 1 hilo y espera RAM libre. No lo "aceleres".
- La voz clonada corre en CPU (≈2-3 veces la duración del audio). Lánzala en segundo plano y no la vigiles en bucle.
- No hagas commit ni push por iniciativa propia. Si el usuario lo pide, `projects/` está en .gitignore: añade con `-f` solo las fuentes (guion, voice.py, film2d/spec.js, metadatos_brief.json); nunca renders ni audio.

## Flujo

### 0. Fuente y proyecto
Toma la transcripción indicada o la más antigua de `transcripciones_pendientes/` (el link va en la primera línea). Elige un nombre de proyecto corto en kebab-case (`projects/<proyecto>/`). Si ya existe un proyecto con ese tema, pregunta antes de pisarlo: es lo único que justifica interrumpir.

### 1. Guion → `projects/<proyecto>/guion_<tema>.txt`
- Extrae **ideas**, no traduzcas ni copies frases. El guion es nuevo, en español neutro y enérgico, de ~3-4 min (≈35-40 frases con la voz clonada).
- **Corrige las cifras.** Las transcripciones automáticas deforman los números ("0.2 %" que en realidad era 0.02 %). Comprueba que cada cifra sea coherente y no inventes datos: si algo es dudoso, dilo en genérico.
- Formato: cabecera `FUENTE:` y `FORMATO:`, luego secciones `## NOMBRE` con **una frase por línea**.
- **Gancho de 15 s:** cero saludos y nada de "en este video te voy a explicar". Empieza clavando el dolor del espectador o con una afirmación polémica. La primera ventana de texto aparece después del gancho.
- Cierra con la aclaración "contenido educativo, no asesoría financiera" (y "el promedio histórico no es promesa" si hay rendimientos) y una llamada a la acción.

### 2. Brief de metadatos → `projects/<proyecto>/metadatos_brief.json`
Sigue la estructura de un brief existente (por ejemplo `projects/riqueza-generacional/metadatos_brief.json`):
- 3 títulos de contraste o clickbait (≤70 caracteres ideal), `titulo_elegido`, descripción, 5 hashtags y etiquetas.
- `capitulos`, con una clave por cada `## SECCION` del guion.
- `miniatura`: solo `expresion`, `postura`, `objeto` (objeto secundario según el tema) y `texto` (2-3 líneas, ≤7 palabras). El estilo del Prompt Maestro es inamovible y lo pone el script.

### 3. Escenas → `projects/<proyecto>/film2d/spec.js`
Lee `references/spec-guia.md`: tiene la sintaxis, las poses, los widgets y una escena de ejemplo. `spec.js` usa índices de frase `S(k)`, no segundos, así que puedes escribirlo antes de tener la voz. Diseña con las reglas de Fábrica 2.0 (abajo) en mente: casi todo el dinamismo sale de cómo escribes `spec.js`.

### 4. Motor Fábrica 2.0
El fondo 2.5D y la cámara dinámica ya los hace el motor (marca `FABRICA_2.1`), y `fabrica_video.py` lo copia a cada proyecto. No hace falta tocarlo. Solo lee `references/motor-fabrica-2.md` si `cam_check.cjs` falla o si vas a ajustar la cámara.

### 5. Ensamblar
```
python fabrica_video.py <proyecto>
```
Lánzalo en segundo plano y guarda el log en `projects/<proyecto>/fabrica.log`. Las etapas son: plantilla → voz → **efectos (2b)** → build → auditoría → render → mezcla → unión → metadatos y subida privada. El script se detiene si la auditoría no da 0 problemas o si la mezcla queda fuera de -14 LUFS / TP ≤ -2 dBTP.
- Si la auditoría falla: corrige `spec.js` (solapes, filas de más, elementos fuera de su escena) y vuelve a correr. Las etapas hechas se saltan solas.
- Si cambian el guion o la voz: borra `assets/audio/sentences/` y corre con `--force`.
- Para probar solo el audio: `--prueba-audio 30`. Para revisar sin render: `--sin-render`.
- Si la voz falla al cargar el modelo con `The paging file is too small` (error 1455), es falta de memoria en ese momento, no un error del guion. Comprueba que no quede nada pesado tuyo corriendo (capturas, auditorías) y reintenta una vez. Si vuelve a fallar, pide al usuario que cierre programas como Chrome.
- Si Pixabay responde `HTTP Error 403` al bajar la música, copia `assets/music/lofi.mp3` y `CREDITOS.txt` de otro proyecto reciente (misma búsqueda por defecto, licencia libre) y vuelve a correr la fábrica; las etapas hechas se saltan solas. Menciónalo en el reporte.

### 6. Verificación y reporte
Antes de dar el video por bueno:
- La auditoría dio 0 issues en todas las partes.
- Capturas (`npx hyperframes snapshot . --at <t>` dentro de `projects/<p>/hyperframes/fN`) de al menos 3 momentos: un cambio de pose (antes, a mitad y después del zoom), una ventana llena y el gancho.
- `assets/audio/sfx_events.json` tiene swish y clicks en número razonable (más o menos uno por pose y uno por viñeta).
- La duración de `renders/final.mp4` coincide con la locución.

En el reporte di qué verificaste y qué no. Normalmente no viste el video entero en movimiento ni escuchaste la mezcla completa, y los tiempos de las palabras de los subtítulos son proporcionales, no medidos. Al terminar, mueve la transcripción usada fuera de `transcripciones_pendientes/` solo si el usuario ya lo hace así; si no, menciónalo.

## Reglas Fábrica 2.0

Estas tres reglas son obligatorias en cada video. Cada una tiene una parte que hace el motor o el script y otra que depende de cómo diseñes `spec.js`. Si diseñas sin pensar en ellas, el motor no tiene con qué trabajar.

### Fondo 2.5D
La cuadrícula tech-grid es el plano de fondo: paneo lento y continuo con parallax (la capa lejana va más lenta que la cercana) y un desenfoque ligero. El Stickman, las ventanas, los chips y los subtítulos van **nítidos** en primer plano. Ese contraste de nitidez es lo que da profundidad.
- Lo hace el motor (ver `references/motor-fabrica-2.md`). El desenfoque se simula con degradados suaves o una textura pre-desenfocada, **no** con `filter: blur` ni `backdrop-filter` sobre una capa a pantalla completa: eso se repinta en cada fotograma y revienta la RAM del render.
- En `spec.js` no hay nada que hacer, salvo no tapar el fondo con ventanas enormes en todas las escenas.

### Cámara dinámica
Un plano fijo largo con un muñeco quieto se siente como diapositiva. La cámara debe acompañar la acción:
- **Zoom al Stickman:** dentro de cada tramo sin cortes, la cámara se acerca al personaje en un cambio de pose o, en los planos largos, en un hueco entre viñetas, y vuelve a la ventana antes de que aparezca la siguiente.
- **Paneo suave hacia la ventana de texto** en cada corte.
- **Sin planos fijos de más de 5 s:** lo que no reciba zoom recibe una deriva lenta de empuje (2.5 %). Esto sustituye la antigua regla "sin zoom lento" de REGLAS_VIDEO.md.

`cam_check.cjs` (etapa 4) hace fallar la fábrica si queda un plano fijo de más de 5 s o una ventana sale de cuadro.

Cómo se traduce en `spec.js`:
- Cada escena con personaje lleva **al menos un cambio de pose**. En escenas de más de ~5 s, pon una segunda pose a mitad (`[[S(5), "point"], [S(6), "worry"]]`).
- No repitas la misma pose en escenas seguidas. Si la pose no cambia, no hay swish.
- Para que el zoom caiga **justo en el cambio de pose** (lo más vistoso), deja ≥1.8 s entre la pose y la siguiente viñeta. Si las viñetas llegan antes, el motor busca otro hueco o se queda en la ventana, porque el texto siempre tiene prioridad.

### Diseño de sonido
El sonido lo pone código, no a mano: `scripts/sfx_sync.py` (etapa 2b de la fábrica) evalúa `spec.js` con los tiempos reales de la voz y coloca:
- **swish** (roce) en cada cambio de pose y en cada caminata;
- **click** de interfaz en cada viñeta de texto (`c`, `big`, notas);
- **pop** suave en ilustraciones y widgets.

La pista `assets/audio/sfx.wav` se suma a nivel fijo, muy por debajo de la voz, antes de normalizar a -14 LUFS. Los sonidos son de la librería Pixabay del repo (`.agents/skills/hyperframes-media/assets/sfx/`, uso libre).

Cómo se traduce en `spec.js`:
- Da a cada viñeta su propio `t`. Varias viñetas al mismo tiempo se funden en un solo click (separación mínima 0.14 s), y una ráfaga de clicks seguidos suena a ametralladora: espacia las apariciones ≥0.4 s.
- Si un video concreto pide otro balance, ajusta con `python scripts/sfx_sync.py <p> --click-db -22 --swish-db -18` (o `--sin-pop`) antes de la mezcla. La fábrica rehace la mezcla sola si `sfx.wav` es más nuevo.

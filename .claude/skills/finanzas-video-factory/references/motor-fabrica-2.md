# Motor Fábrica 2.0: cómo funciona (implementado el 2026-10-12)

La plantilla `projects/fondos-indexados/film2d/engine.js` lleva la marca `FABRICA_2`. `fabrica_video.py` copia el motor a cualquier proyecto que no la tenga. Lee esto solo si vas a tocar el motor o si `cam_check.cjs` falla y necesitas entender por qué.

## Fondo 2.5D: `ink-theater/ink-grid.js`
`film2d/build.py` copia este archivo en cada build.
- Las líneas de la cuadrícula (`.tg-far`, `.tg-near`, `.tg-pulse`) son degradados simétricos de bordes suaves: alfa máximo en el borde de la celda y 0 a 3-4 px. Se leen como desenfocadas sin usar `filter`.
- El paneo lento con parallax (capa lejana a 14 px/s, cercana a 34 px/s) no cambió.
- **Prohibido** `filter: blur()` o `backdrop-filter` sobre capas a pantalla completa: se repintan en cada fotograma y el render con 1 hilo se queda sin RAM.
- El primer plano no se toca: Stickman, ventanas, chips y subtítulos siguen nítidos.

## Cámara: `engine.js`, objeto `CAM` + `E.camera()`
1. **Tomas de ventana** (`E.shots`): paneo y zoom hacia la ventana en cada corte, ahora más suave (`power2.inOut`, 0.95 s).
2. **Zoom al Stickman dentro de cada tramo estático:** cada escena con personaje registra un `E.spots` (sus poses y los tiempos de sus viñetas). `pickSpot` busca dentro del tramo:
   - primero un **cambio de pose** que deje ≥1.75 s libres antes de la siguiente viñeta;
   - si el tramo dura más de `holdMax` (5 s) y no hay pose que sirva, un **hueco entre viñetas**, preferiblemente ~3 s después de empezar el tramo.

   La cámara entra en 0.55 s (`power3.inOut`), se queda hasta 1.3 s y vuelve exactamente al encuadre anterior antes de que caiga la siguiente viñeta. Ninguna viñeta aparece mientras la cámara está sobre el Stickman.
3. **Encuadre del zoom** (`charShot`), relativo al plano actual:
   - **Normal:** ×1.10 (o ×1.08 / ×1.06); el Stickman se desliza un 30 % hacia el centro; el borde inferior queda fijo; ventanas y cabeza enteras en cuadro.
   - **Reacción** (cuando la ventana ya llena el cuadro a 1.14 y el Stickman está en el borde): ×1.06 / ×1.04; la cabeza va al 25 % del ancho; la ventana puede salirse **solo lo que mide su relleno interno (5 %)**, así que el texto nunca se corta.
   - Si nada encaja, no hay zoom en ese momento.
4. **Deriva:** lo que siga estático más de 5 s recibe un empuje lento ×1.025 con 8 px hacia el Stickman y el borde inferior fijo.

Estos parámetros viven en `CAM` (`charPunch`, `charCenter`, `loosePunch`, `looseX`, `looseCrop`, `charGap`, `charHold`, `holdMax`, `drift`, `driftX`). Ajústalos ahí, no con parches en `spec.js`.

## Verificación automática
`fabrica_video.py` (etapa 4) corre `node cam_check.cjs fN 0.2` en cada parte, además de `audit_dyn.cjs` y `chk_items.cjs`. El chequeo recorre el video cada 0.2 s y **falla** si hay:
- una ventana visible fuera de cuadro o encima de los subtítulos fuera de un zoom al Stickman;
- un tramo estático de más de 5 s;
- errores de página.

Los recortes durante un zoom se informan aparte (`recorte_en_zoom`) y no hacen fallar el chequeo: el borde de la ventana sale un máximo del ~5 % de su ancho. Con `--list` muestra todos los movimientos (`win`, `char`, `back`, `drift`) con sus tiempos, que es lo primero que hay que mirar si algo se ve raro.

Referencia en `riqueza-generacional` (2026-10-12): 33 zooms al Stickman en 201 s, 3 derivas, 0 tramos estáticos de más de 5 s, 0 ventanas fuera de cuadro, recorte máximo durante el zoom 4.1 % del ancho, auditoría 0 issues.

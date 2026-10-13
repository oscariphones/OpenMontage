# Biblioteca de ilustraciones 2D (Layout 2.0)

Aquí van las ilustraciones detalladas que el motor usa en lugar de los íconos de líneas blancas.

## Formato
- **PNG con transparencia** (fondo alfa, sin fondo blanco) o **SVG** con `viewBox`.
- Estilo flat / isométrico, colores que combinen con el fondo oscuro (verde #3ddc97, naranja #ff8a1f, rojo #ff5a5f, azul #7fc8ff).
- Encuadre ajustado al objeto (sin márgenes grandes): el motor lo escala para que quepa en su ventana.
- Tamaño recomendado: 800-1200 px en el lado largo. Los PNG más grandes se reducen solos a 1200 px en cada build para no subir la RAM del render.
- Nombre del archivo en minúsculas, sin espacios ni tildes: `house.png`, `tarjeta-oro.svg`.

## Cómo se usan
1. **Reemplazo automático:** un archivo con el mismo nombre que un ícono existente lo sustituye en todos los videos.
   - Objetos que más se usan: `coin` (9), `shield` (7), `hourglass` (6), `card` (5), `house` (4), `doc` (4), `laptop` (3), `jar`, `plane`, `heart`, `cup`, `car`, `stack` (2).
   - Otros: `clock`, `calendar`, `building`, `bed`, `dumbbell`, `play`, `snowball`, `medcross`, `calstack`, `cart`, `phone`, `envelope`, `box`, `bike`, `sofa`, `tv`, `door`, `sun`, `moon`, `desk`, `chair`, `lunchbox`, `traffic`.
   - **No reemplaces `bars` ni `stairs`**: son gráficas con datos animados.
2. **Ilustración nueva:** en `spec.js`, `{ img: "nombre", t: S(3) + 0.5 }` (opcional `ih: 360` = altura base en px). Si el archivo no existe, sale un chip rojo "falta: nombre" y la auditoría lo marca como error.
3. **Solo para un proyecto:** pon el archivo en `projects/<proyecto>/assets/ilustraciones/`; tiene prioridad sobre esta carpeta.
4. Para mantener el ícono de líneas en un elemento concreto: `ill: false`.

Después de añadir archivos, vuelve a correr `python fabrica_video.py <proyecto> --force` (o solo `film2d/build.py` para revisar).

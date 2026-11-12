# Guía rápida de `film2d/spec.js`

`spec.js` describe la película entera como datos. **No hay coordenadas**: cada escena es una cuadrícula (`c` = celda del personaje, `g` = celda de gráficos) y los elementos fluyen dentro de su celda. Los tiempos son segundos reales de la locución, obtenidos con `S(k)` = inicio de la frase k (índice 0 = primera línea del guion, sin contar cabeceras ni `##`).

## Esqueleto (copiar tal cual y rellenar escenas)

```js
/* <Tema>: the whole film as data. Times are REAL seconds of the narration (assets/audio/timeline.json). */
(function (root) {
  "use strict";
  var C = root.KIT.C, GREY = C.grey, SENT = root.SENT;
  var S = function (k) { return SENT[k][0]; };
  function ex(a, b) { for (var k in b) a[k] = b[k]; return a; }
  var p = function (n, t, o) { return ex({ p: n, t: t }, o); };
  var w = function (n, t, o) { return ex({ w: n, t: t }, o); };
  var c = function (x, k, t, o) { return ex({ c: x, k: k, t: t }, o); };
  var big = function (x, k, t, o) { return ex({ big: x, k: k, t: t }, o); };
  var sy = function (n, t, k, o) { return ex({ w: "sym", n: n, t: t, k: k, sc: 0.5 }, o); };
  var SC = [];
  function sc(a, b, L, poses, g, o) { SC.push(ex({ a: a, b: b, L: L, poses: poses, g: g }, o || {})); }
  var END = SENT[SENT.length - 1][1] + 1.2;

  // 1 GANCHO
  sc(0, S(1), "cg", [[S(0), "look"]], [ /* filas */ ]);
  // ...
  sc(S(36), END, "cg", [[S(36), "give"]], [ /* CTA */ ]);

  root.SCENES = SC;
})(window);
```

## `sc(a, b, layout, poses, filas, opciones)`
- `a, b`: inicio y fin de la escena. Las escenas son contiguas: el `b` de una es el `a` de la siguiente, y la última termina en `END`.
- `layout`: `"cg"` (personaje a la izquierda, lo normal), `"gc"`, `"cgg"` (dos ventanas) o `"g"` (sin personaje, solo para momentos puntuales: sin personaje no hay zoom ni swish).
- `poses`: `[[t, "pose"], [t2, "pose2", "slide"]]`. El tercer valor opcional es el efecto: `"bounce"` (por defecto), `"slide"` o `"fade"`.
- `filas`: hasta ~4 filas, con 1-3 elementos por fila.
- Opciones: `wt: "título"` (título de la ventana), `wt2` (segunda ventana en `cgg`), `win: false` (sin ventana), `walk: [t0, t1, xIni, xFin]` (caminata), `side: "right"`.

**Poses:** idle, calm, look, point, worry, shrug, slump, think, phone, give, askHelp, cheer, sitRelaxed, sitStress.

## Elementos
| helper | qué es | ejemplo |
|---|---|---|
| `c(texto, color, t, o)` | chip (viñeta) | `c("fideicomiso", "green", S(7) + 1.8)` |
| `big(texto, color, t)` | texto grande | `big("venta forzada", "red", S(13) + 2.4)` |
| `w(nombre, t, o)` | widget dibujado | `w("stairs", S(2) + 1.4, { n: 4, sc: 0.4 })` |
| `p(nombre, t, o)` | prop (ícono) | `p("shield", S(7) + 1.0, { s: 0.4 })` |
| `sy(nombre, t, color)` | símbolo | `sy("arrow", t, "green")`, `sy("cross", t, "red")` |

- Colores: `green` (positivo), `orange` (alerta/acento), `red` (peligro), `grey` (neutro), `cold`.
- Opciones útiles: `{ x: "strike" }` (tachado), `{ x: "stamp" }` (sello), `{ fx: "stamp" | "drop" | "rise" | "slide" }`, `{ lbl: "texto", lk: "color" }` (etiqueta bajo un gráfico), `img: "nombre"` (ilustración de `assets/ilustraciones/`).
- **Widgets:** jar, leakjar, dots, pipe, bars, coin, bag, tally, stack, phone, statement, clockrev, villain, face, deal, orgchart, race, minis, iceberg, signpost, hourglass, hill, snowball, moon, calstack, poster, eye, chain, balance, palm, timeline, cloud, stairs, blocks, heart, spring, crack, yacht, window, medcross, knot, turn, pen, doc, room, plane, quote, arrowcurve, sym.
- **Props:** house, car, card, cart, shield, dumbbell, cup, box, play, laptop, desk, chair, phone, clock, calendar, envelope, building, hourglass, bike, lunchbox, sun, moon, sofa, tv, bed, door, coffin, traffic, jar, mini, age, dashed.
- Un archivo en `assets/ilustraciones/` con el nombre de un ícono (`house.svg`) lo reemplaza por la ilustración. Ver su `LEEME.md`.

## Escena modelo Fábrica 2.0

```js
sc(S(5), S(7), "cg", [[S(5), "point"], [S(6), "worry"]], [          // dos poses: dos zooms + dos swish
  [c("1", "orange", S(5) + 0.7), c("no todo a tu nombre", "green", S(5) + 1.2)],   // primera viñeta ≥0.6 s tras la pose
  [c("herencia", "red", S(6) + 1.4), c("demandas", "red", S(6) + 2.0), c("divorcios", "red", S(6) + 2.6)]  // clicks espaciados
], { wt: "estructura" });
```

## Errores que hacen fallar la auditoría
- Demasiadas filas o chips muy largos (la celda no cabe y el texto sale de la ventana): parte la idea en dos escenas.
- Un `t` fuera de `[a, b]` de su escena (`chk_items.cjs` lo rechaza). Pasa sobre todo cuando cambia la voz.
- Frases con índice equivocado: cuenta solo las líneas de texto del guion.

## FABRICA_3: formatos visuales que alternan (retención)

El motor (marca `FABRICA_3`, `film2d/modes.js`) tiene, además de la escena clásica (personaje + ventana), estos formatos. Todos los tiempos son absolutos (`S(k) + s`) y deben caer dentro de `[a, b - 0.5]` de su escena (`chk_items.cjs` lo revisa). Las escenas de modo usan layout `"g"`, `poses: []` y `filas: []`.

### Modo Graph: gráfica de línea + contador que sube o baja
```js
sc(S(15), S(17), "g", [], [], { mode: "graph", k: "red", title: "tu deuda con la app", cl: "lo que debes", f: { pre: "$" },
  pts: [[S(15) + 0.6, 5000, "mes 1"], [S(15) + 2.4, 9000, "mes 3"], [S(16) + 0.8, 16000, "mes 6"]],
  cameo: { pos: "right", poses: [[S(15), "worry"], [S(16) + 1.0, "shock"]] } });
```
- `pts`: 2-6 puntos `[t, valor, "etiqueta abajo" opcional]`. El contador grande va de un valor al siguiente mientras la línea se dibuja; puede bajar.
- `f`: formato del número (`pre: "$"`, `suf: " %"`, `dec: 1`). `vals: false` oculta los números sobre cada punto. `min` / `max` fijan la escala.
- Úsalo solo con cifras del guion (deuda que crece, intereses, inflación, comparación de montos).

### Modo Breakdown: desglose 01, 02, 03
```js
sc(S(20), S(24), "g", [], [], { mode: "breakdown", title: "lo que no te dicen", center: ["préstamo", "$5,000"], ck: "orange", t0: S(20) + 0.4,
  parts: [["intereses", "$2,400", "red", S(20) + 2.6], ["comisión", "$600", "red", S(21) + 0.8], ["seguro forzoso", "$350", "red", S(22) + 0.8]],
  total: ["lo que pagas", "$8,350", "red", S(23) + 0.8] });
```
- 2-5 `parts` `[texto, monto o "", color, t]`; cada una llega con su línea conectora y su número. `total` es opcional.
- Ideal para revelar las partes ocultas de una deuda, un impuesto, un recibo de nómina o un negocio. Abarca varias frases (una parte por frase).

### Modo Minimalist-Maze: trampas en geometría limpia
```js
sc(S(1), S(3), "g", [], [], { mode: "maze", kind: "maze", k: "red", title: "la trampa", t0: S(1) + 0.3,
  beats: [[S(1) + 2.4, "parece fácil salir", "orange"], [S(2) + 1.0, "pero la salida está cerrada", "red"]] });
```
- `kind: "maze"`: un punto recorre un laberinto y choca con la salida cerrada. `"rings"`: anillos que se cierran uno por cada beat. `"nodes"`: red de nodos (`nodes: ["tu sueldo", ...]`, `hub: "la app"`) donde puntos brillantes llevan el dinero al centro en cada beat.
- `beats`: hasta 4 frases cortas que aparecen a la derecha con la voz.

### Stick-Action: el personaje se mueve y reacciona (siempre con texto gigante)
```js
sc(S(12), S(13), "c", [[S(12), "look"], [S(12) + 1.6, "shock"]], [], { enter: "left", punch: { text: "$0", k: "red", t: S(12) + 1.6 } });
sc(S(35), S(36), "c", [[S(35), "facepalm"], [S(35) + 2.2, "stop"]], [], { exit: "right", punch: { text: "SI TODOS CUMPLEN", k: "orange", t: S(35) + 0.6 } });
```
- Layout `"c"` = el personaje solo, para reacciones fuertes. **Siempre** lleva `punch`: un texto gigante de alto impacto (1 a 3 palabras clave o una cifra grande, en mayúsculas automáticas) que llena el espacio libre. El motor parte la pantalla en dos celdas (personaje + texto) y lo ajusta solo a su celda, con un 12 % de holgura para el golpe de entrada.
- El texto va del lado contrario a por donde el personaje entra o sale caminando (automático; `punch.side: "left" | "right"` lo fuerza). `audit_dyn.cjs` falla con `PUNCH_OVER_CHAR` si toca la silueta del personaje y con `PUNCH_OVER_CAPS` si baja a los subtítulos; `chk_items.cjs` falla si falta el punch o si tiene más de 3 palabras.
- **Duración: máximo 1 o 2 frases cortas de transición** (`chk_items.cjs` falla si la escena abarca 3 frases o más). Es un respiro con golpe visual entre explicaciones, no una escena para explicar.
- `enter: "left" | "right"`: entra caminando (1.1 s) al inicio de la escena; la primera pose extra va al menos 1.2 s después. `exit: "left" | "right"`: sale caminando al final. Escena de 3 s o más (4.5 s si entra y sale).
- Poses de tensión nuevas: `shock` (se echa para atrás), `facepalm` (mano en la cara), `stop` (palmas al frente: "¡alto!").
- `cameo: { pos, poses }` pone al personaje chico en una esquina de un modo de pantalla completa, reaccionando sin tapar la gráfica.

### Regla de alternancia (obligatoria desde FABRICA_3)
- Cada video usa los 4 formatos: al menos 1 Graph, 1 Breakdown, 1 Maze y 2 escenas Stick-Action (layout `"c"` con su `punch`, de 1 o 2 frases cortas).
- Nunca más de 2 escenas clásicas (personaje + ventana) seguidas; intercala un modo o una escena Stick-Action.
- El gancho puede abrir con un Maze o un Graph (sin ventanas), y la sección SUSCRÍBETE sigue siendo una escena clásica con el sello.
- Elige la pose por la tensión de la frase: dato que asusta, `shock`; error tonto, `facepalm`; advertencia, `stop`; alivio, `cheer`; duda, `think`.

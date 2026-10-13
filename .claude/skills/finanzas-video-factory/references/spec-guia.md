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

/* El engaño de la agencia de autos (México) (FABRICA_3): the whole film as data. Times are REAL seconds of the narration (assets/audio/timeline.json).
 * FABRICA_3: alternates classic scenes (Stickman + window) with Graph, Breakdown, Maze and Stick-Action (punch text); never > 2 classic scenes in a row.
 * Section 3 (SUSCRÍBETE) is the mandatory subscribe reminder after the topic intro. Chips use everyday words. */
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
  sc(0, S(2), "g", [], [], { mode: "maze", kind: "rings", k: "red", title: "la pregunta trampa", t0: 0.3,
    beats: [[S(0) + 1.6, "¿cuánto quieres gastar?", "grey"], [S(1) + 0.8, "¿cuánto pagas al mes?", "red"], [S(1) + 3.4, "decenas de miles", "red"]] });
  sc(S(2), S(3), "c", [[S(2), "look"], [S(2) + 1.6, "stop"]], [], { punch: { text: "EL ENGAÑO", k: "red", t: S(2) + 1.4 } });
  // 2 DE QUÉ VA ESTO
  sc(S(3), S(5), "cg", [[S(3), "look"], [S(3) + 2.2, "point"], [S(4), "think"]], [
    [p("car", S(3) + 0.7, { s: 0.4 }), c("trucos del crédito para coche", "orange", S(3) + 1.3)],
    [c("qué preguntar antes de firmar", "green", S(4) + 1.0)]
  ], { wt: "el tema de hoy" });
  // 3 SUSCRÍBETE (recordatorio obligatorio)
  sc(S(5), S(7), "cg", [[S(5), "point"], [S(5) + 2.0, "cheer"], [S(6), "give"]], [
    [big("SUSCRÍBETE", "red", S(5) + 3.4, { x: "stamp" })],
    [c("activa la campanita", "orange", S(6) + 1.0)]
  ], { wt: "antes de seguir" });
  sc(S(7), S(8), "c", [[S(7), "cheer"], [S(7) + 1.2, "point"]], [], { punch: { text: "A LA AGENCIA", k: "orange", t: S(7) + 0.8 } });
  // 4 EL TRUCO DE LA MENSUALIDAD
  sc(S(8), S(9), "cg", [[S(8), "give"], [S(8) + 2.4, "worry"]], [
    [c("¿cuánto al mes?", "orange", S(8) + 0.8)],
    [c("el vendedor ya sabe", "red", S(8) + 3.6)]
  ], { wt: "la mensualidad" });
  sc(S(9), S(10), "cg", [[S(9), "point"], [S(9) + 2.4, "shrug"]], [
    [c("bajar el precio", "grey", S(9) + 0.8, { x: "strike" })],
    [p("calendar", S(9) + 3.4, { s: 0.4 }), c("más meses", "red", S(9) + 4.0)]
  ], { wt: "si no cabe" });
  sc(S(10), S(11), "c", [[S(10), "think"], [S(10) + 1.8, "shock"]], [], { punch: { text: "MÁS CARO", k: "red", t: S(10) + 2.2 } });
  // 5 LA CUENTA DEL PLAZO
  sc(S(11), S(16), "g", [], [], { mode: "graph", k: "red", title: "intereses por el mismo coche", cl: "financias $280,000", f: { pre: "$" },
    pts: [[S(11) + 1.6, 0, "de contado"], [S(12) + 1.4, 69000, "3 años"], [S(14) + 0.8, 146000, "6 años"]],
    cameo: { pos: "right", poses: [[S(11), "think"], [S(14) + 0.8, "shock"], [S(15) + 0.6, "facepalm"]] } });
  // 6 LOS COSTOS ESCONDIDOS
  sc(S(16), S(20), "g", [], [], { mode: "breakdown", title: "lo que viene pegado", center: ["tu crédito", "$280,000"], ck: "orange", t0: S(16) + 0.4,
    parts: [["comisión por apertura", "", "red", S(17) + 1.0], ["seguro de varios años", "", "red", S(18) + 1.0], ["accesorios", "que no pediste", "red", S(19) + 1.4]] });
  // 7 LA TASA CERO
  sc(S(20), S(21), "cg", [[S(20), "cheer"], [S(20) + 2.0, "think"]], [
    [big("0 %", "green", S(20) + 1.6)]
  ], { wt: "el anuncio" });
  sc(S(21), S(22), "cg", [[S(21), "shrug"], [S(21) + 2.4, "worry"]], [
    [c("sin descuento", "red", S(21) + 1.4)],
    [c("enganche enorme", "red", S(21) + 3.8)]
  ], { wt: "la letra chiquita" });
  sc(S(22), S(23), "c", [[S(22), "think"], [S(22) + 1.8, "point"]], [], { punch: { text: "¿Y DE CONTADO?", k: "orange", t: S(22) + 1.6 } });
  // 8 LA PRISA
  sc(S(23), S(26), "g", [], [], { mode: "maze", kind: "maze", k: "red", title: "la prisa", t0: S(23) + 0.2,
    beats: [[S(23) + 1.6, "solo por hoy", "red"], [S(24) + 0.8, "no comparas", "red"], [S(24) + 2.6, "firmas sin leer", "red"], [S(25) + 1.4, "mañana sigue siendo buena", "green"]] });
  // 9 CÓMO PROTEGERTE
  sc(S(26), S(27), "cg", [[S(26), "point"], [S(26) + 2.2, "give"]], [
    [c("1", "orange", S(26) + 0.7), c("precio total", "green", S(26) + 1.3), c("mensualidad", "grey", S(26) + 2.0, { x: "strike" })]
  ], { wt: "protégete" });
  sc(S(27), S(28), "cg", [[S(27), "give"], [S(27) + 2.4, "point"]], [
    [c("2", "orange", S(27) + 0.8), w("doc", S(27) + 1.4, { sc: 0.35 }), c("el CAT por escrito", "green", S(27) + 2.0)]
  ], { wt: "protégete" });
  sc(S(28), S(29), "c", [[S(28), "think"], [S(28) + 1.8, "stop"]], [], { punch: { text: "TU SEGURO", k: "green", t: S(28) + 1.8 } });
  sc(S(29), S(30), "cg", [[S(29), "point"], [S(29) + 2.2, "cheer"]], [
    [c("4", "orange", S(29) + 0.7), c("otra agencia", "green", S(29) + 1.3), c("tu banco", "green", S(29) + 2.0)]
  ], { wt: "protégete" });
  // 10 LA LECCIÓN
  sc(S(30), S(32), "c", [[S(30), "point"], [S(30) + 2.0, "shrug"], [S(31) + 0.6, "think"]], [], { exit: "left", punch: { text: "DEUDA CARÍSIMA", k: "red", t: S(30) + 2.0 } });
  // 11 CIERRE
  sc(S(32), S(34), "cg", [[S(32), "look"], [S(32) + 2.4, "calm"], [S(33), "give"]], [
    [c("ya sabes por qué preguntan", "orange", S(32) + 0.8)],
    [c("contenido educativo", "grey", S(33) + 0.7), c("no es asesoría", "orange", S(33) + 1.4)]
  ], { wt: "la próxima vez" });
  sc(S(34), END, "cg", [[S(34), "cheer"], [S(34) + 2.4, "give"]], [
    [c("¿qué truco te hicieron?", "orange", S(34) + 0.7)],
    [c("cuéntame en comentarios", "green", S(34) + 4.4)]
  ], { wt: "tu turno" });

  root.SCENES = SC;
})(window);

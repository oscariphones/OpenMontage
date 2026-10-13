/* Presupuesto 50/30/20: the whole film as data. Times are REAL seconds of the narration (assets/audio/timeline.json).
 * No coordinates: scenes are grids (L: c = character cell, g = graphic cell) and items flow inside their cell. */
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
  sc(0, S(1), "cg", [[S(0), "shrug"]], [
    [c("llega fin de mes", "grey", S(0) + 1.0)],
    [big("¿adónde se fue?", "orange", S(0) + 3.0)]
  ]);
  sc(S(1), S(2), "cg", [[S(1), "calm"]], [
    [c("le pasa a millones", "orange", S(1) + 0.7)],
    [c("tranquilo", "green", S(1) + 1.8)]
  ]);
  sc(S(2), S(3), "cg", [[S(2), "point"]], [
    [c("3 números", "orange", S(2) + 0.6)],
    [c("lo arreglan", "green", S(2) + 1.6)]
  ]);
  sc(S(3), S(4), "cg", [[S(3), "cheer"]], [
    [big("50 / 30 / 20", "green", S(3) + 1.4)],
    [c("3 minutos", "grey", S(3) + 2.8)]
  ]);
  // 2 LA REGLA
  sc(S(4), S(5), "cg", [[S(4), "look"]], [
    [c("tu sueldo", "orange", S(4) + 0.8), c("= una pizza", "grey", S(4) + 1.8)]
  ]);
  sc(S(5), S(6), "cg", [[S(5), "point"]], [
    [big("50 %", "green", S(5) + 0.8)],
    [c("necesidades", "grey", S(5) + 2.0)]
  ]);
  sc(S(6), S(7), "cg", [[S(6), "point"]], [
    [big("30 %", "orange", S(6) + 0.6)],
    [c("gustos", "grey", S(6) + 1.5)]
  ]);
  sc(S(7), S(8), "cg", [[S(7), "cheer"]], [
    [big("20 %", "green", S(7) + 0.6)],
    [c("ahorro y deudas", "grey", S(7) + 1.8)]
  ]);
  sc(S(8), S(9), "cg", [[S(8), "calm"]], [
    [w("bars", S(8) + 0.5, { hs: [100, 60, 40], cols: [C.green, C.orange, C.cold], sc: 0.4 })],
    [c("así de simple", "green", S(8) + 1.2), c("el detalle: cómo", "orange", S(8) + 2.4)]
  ]);
  // 3 LA BASE
  sc(S(9), S(10), "cg", [[S(9), "point"]], [
    [c("ingreso neto", "green", S(9) + 1.0)],
    [c("después de impuestos", "grey", S(9) + 3.4)]
  ]);
  sc(S(10), S(11), "cg", [[S(10), "look"]], [
    [c("$3,000 netos", "grey", S(10) + 1.4)],
    [c("$1,500", "green", S(10) + 3.6), c("$900", "orange", S(10) + 4.2), c("$600", "green", S(10) + 4.8)]
  ]);
  sc(S(11), S(12), "cg", [[S(11), "shrug"]], [
    [c("sueldo bruto", "red", S(11) + 0.8, { x: "strike" })],
    [c("nunca llega a tu bolsillo", "grey", S(11) + 2.6)]
  ]);
  // 4 NECESIDADES
  sc(S(12), S(13), "cg", [[S(12), "point"]], [
    [big("necesidades", "green", S(12) + 0.4)],
    [c("no puedes dejar de pagarlas", "grey", S(12) + 1.6)]
  ]);
  sc(S(13), S(14), "cg", [[S(13), "look"]], [
    [p("house", S(13) + 0.6, { s: 0.45 })],
    [c("vivienda", "grey", S(13) + 0.8), c("comida", "grey", S(13) + 1.5)],
    [c("servicios", "grey", S(13) + 2.2), c("seguro médico", "grey", S(13) + 3.0)]
  ]);
  sc(S(14), S(15), "cg", [[S(14), "think"]], [
    [c("¿perderlo", "orange", S(14) + 2.0), c("es grave?", "orange", S(14) + 2.8)],
    [c("entonces es necesidad", "green", S(14) + 4.0)]
  ]);
  sc(S(15), S(16), "cg", [[S(15), "worry"]], [
    [c("más del 50 %", "red", S(15) + 1.0)],
    [c("primera alarma", "orange", S(15) + 2.6)]
  ]);
  // 5 GUSTOS
  sc(S(16), S(17), "cg", [[S(16), "calm"]], [
    [big("gustos", "orange", S(16) + 0.4)],
    [c("mejoran tu vida", "green", S(16) + 1.6), c("pero puedes vivir sin ellos", "grey", S(16) + 3.2)]
  ]);
  sc(S(17), S(18), "cg", [[S(17), "look"]], [
    [c("ropa nueva", "grey", S(17) + 0.4), c("comer fuera", "grey", S(17) + 1.2)],
    [c("suscripciones", "grey", S(17) + 2.2), c("pasatiempos", "grey", S(17) + 3.2)]
  ]);
  sc(S(18), S(19), "cg", [[S(18), "think"]], [
    [c("si lo quitas", "grey", S(18) + 0.6)],
    [c("solo una pequeña molestia", "orange", S(18) + 2.2)]
  ]);
  sc(S(19), S(20), "cg", [[S(19), "cheer"]], [
    [c("un pasatiempo", "green", S(19) + 1.0)],
    [c("es parte de vivir", "green", S(19) + 2.4)]
  ]);
  sc(S(20), S(21), "cg", [[S(20), "worry"]], [
    [c("un gusto", "orange", S(20) + 0.6), sy("arrow", S(20) + 1.3, "red"), c("disfrazado de necesidad", "red", S(20) + 1.9)]
  ]);
  // 6 AHORRO Y DEUDAS
  sc(S(21), S(22), "cg", [[S(21), "point"]], [
    [big("20 %", "green", S(21) + 0.6)],
    [c("construye tu futuro", "orange", S(21) + 2.6)]
  ]);
  sc(S(22), S(23), "cg", [[S(22), "calm"]], [
    [p("shield", S(22) + 0.6, { s: 0.5 })],
    [c("1 fondo de emergencia", "green", S(22) + 1.2)]
  ]);
  sc(S(23), S(24), "cg", [[S(23), "point"]], [
    [big("6 a 12 meses", "orange", S(23) + 1.2)],
    [c("de gastos", "grey", S(23) + 2.6)]
  ]);
  sc(S(24), S(25), "cg", [[S(24), "look"]], [
    [c("gastos $2,000 al mes", "grey", S(24) + 0.8)],
    [c("meta", "grey", S(24) + 3.0), c("$12,000 – $24,000", "green", S(24) + 3.8)]
  ]);
  sc(S(25), S(26), "cg", [[S(25), "point"]], [
    [p("card", S(25) + 0.6, { s: 0.5 })],
    [c("2 pagar deudas", "orange", S(25) + 0.9)],
    [c("tarjetas", "red", S(25) + 2.6), c("préstamos estudiantiles", "red", S(25) + 3.4)]
  ]);
  sc(S(26), S(27), "cg", [[S(26), "cheer"]], [
    [c("3 retiro", "orange", S(26) + 0.6)],
    [c("cuanto antes, mejor", "green", S(26) + 1.8)]
  ]);
  // 7 COMO USARLO
  sc(S(27), S(28), "cg", [[S(27), "point"]], [
    [c("paso 1", "orange", S(27) + 0.3)],
    [c("anota tu ingreso neto", "green", S(27) + 1.4)]
  ]);
  sc(S(28), S(29), "cg", [[S(28), "look"]], [
    [c("paso 2", "orange", S(28) + 0.3)],
    [c("apunta cada dólar", "green", S(28) + 1.4)]
  ]);
  sc(S(29), S(30), "cg", [[S(29), "point"]], [
    [c("paso 3", "orange", S(29) + 0.3)],
    [c("3 cajas", "grey", S(29) + 1.6), c("50 · 30 · 20", "green", S(29) + 3.2)]
  ]);
  sc(S(30), S(31), "cg", [[S(30), "think"]], [
    [c("ni necesidad ni gusto", "grey", S(30) + 0.6)],
    [c("va al 20 %", "green", S(30) + 3.0)]
  ]);
  sc(S(31), S(32), "cg", [[S(31), "shrug"]], [
    [c("te vas a sorprender", "orange", S(31) + 0.6)],
    [c("¿adónde se va tu dinero?", "grey", S(31) + 2.2)]
  ]);
  // 8 CIERRE
  sc(S(32), S(33), "cg", [[S(32), "calm"]], [
    [c("una guía", "green", S(32) + 0.8), c("no una ley", "red", S(32) + 1.8)],
    [c("ajústala a tu vida", "orange", S(32) + 3.2)]
  ]);
  sc(S(33), S(34), "cg", [[S(33), "calm"]], [
    [c("contenido educativo", "grey", S(33) + 0.5)],
    [c("no es asesoría financiera", "grey", S(33) + 1.8)]
  ]);
  sc(S(34), S(35), "cg", [[S(34), "point"]], [
    [c("escríbelo", "green", S(34) + 0.8)],
    [c("lo que no mides", "grey", S(34) + 2.6), c("se te escapa", "red", S(34) + 3.8)]
  ]);
  sc(S(35), END, "cg", [[S(35), "give"]], [
    [c("guárdalo", "green", S(35) + 0.6), c("compártelo", "orange", S(35) + 1.6)],
    [c("¿en qué caja se te va más?", "grey", S(35) + 4.6)]
  ]);

  root.SCENES = SC;
})(window);

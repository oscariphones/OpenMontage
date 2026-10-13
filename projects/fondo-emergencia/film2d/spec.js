/* Fondo de emergencia: the whole film as data. Times are REAL seconds of the narration (assets/audio/timeline.json).
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
  sc(0, S(1), "cg", [[S(0), "worry"]], [
    [p("car", S(0) + 0.8, { s: 0.45 })],
    [c("coche roto", "orange", S(0) + 0.8), c("mascota enferma", "orange", S(0) + 1.9)],
    [c("sin trabajo", "red", S(0) + 3.2)]
  ]);
  sc(S(1), S(2), "cg", [[S(1), "shrug"]], [
    [big("¿de dónde?", "orange", S(1) + 0.4)],
    [c("el mismo día", "grey", S(1) + 1.6)]
  ]);
  sc(S(2), S(3), "cg", [[S(2), "slump"]], [
    [p("card", S(2) + 0.8, { s: 0.5 })],
    [c("¿la tarjeta de crédito?", "red", S(2) + 1.2)]
  ]);
  sc(S(3), S(4), "cg", [[S(3), "point"]], [
    [w("hourglass", S(3) + 0.4, { sc: 0.6 })],
    [c("3 minutos", "orange", S(3) + 0.9), c("tu fondo de emergencia", "green", S(3) + 2.2)]
  ]);
  // 2 POR QUE IMPORTA
  sc(S(4), S(5), "cg", [[S(4), "calm"]], [
    [p("shield", S(4) + 0.6, { s: 0.5 })],
    [c("dinero solo para imprevistos", "green", S(4) + 1.0)]
  ]);
  sc(S(5), S(6), "cg", [[S(5), "point"]], [
    [c("no es para vacaciones", "red", S(5) + 0.4, { x: "strike" })],
    [c("no es para caprichos", "red", S(5) + 1.8, { x: "strike" })]
  ]);
  sc(S(6), S(7), "cg", [[S(6), "cheer"]], [
    [c("un mal día", "grey", S(6) + 0.5), sy("neq", S(6) + 1.3, "red"), c("una deuda de años", "red", S(6) + 2.0)]
  ]);
  // 3 CUANTO CUESTA
  sc(S(7), S(8), "cg", [[S(7), "look"]], [
    [big("imprevistos", "orange", S(7) + 0.4)],
    [c("promedios de EE. UU.", "grey", S(7) + 0.9)]
  ]);
  sc(S(8), S(9), "cg", [[S(8), "worry"]], [
    [w("medcross", S(8) + 0.5, { sc: 0.5 })],
    [c("factura médica", "grey", S(8) + 1.0), c("≈ $500", "orange", S(8) + 2.2)]
  ]);
  sc(S(9), S(10), "cg", [[S(9), "worry"]], [
    [w("heart", S(9) + 0.5, { sc: 0.45 })],
    [c("mascota", "grey", S(9) + 1.0), c("$800 – $1,500", "orange", S(9) + 2.2)]
  ]);
  sc(S(10), S(11), "cg", [[S(10), "shrug"]], [
    [p("car", S(10) + 0.5, { s: 0.45 })],
    [c("reparación", "grey", S(10) + 1.0), c("≈ $400", "orange", S(10) + 2.0)]
  ]);
  sc(S(11), S(12), "cg", [[S(11), "slump"]], [
    [p("house", S(11) + 0.5, { s: 0.45 })],
    [c("techo o aire", "grey", S(11) + 1.0), c("$3,000 – $8,000", "red", S(11) + 3.0)]
  ]);
  sc(S(12), S(13), "cg", [[S(12), "worry"]], [
    [c("2 o 3 a la vez", "red", S(12) + 0.6)],
    [c("miles de dólares", "orange", S(12) + 2.0)]
  ]);
  // 4 CUANTO AHORRAR
  sc(S(13), S(14), "cg", [[S(13), "point"]], [
    [big("3 a 6 meses", "green", S(13) + 0.6)],
    [c("de tus gastos", "grey", S(13) + 1.8)]
  ]);
  sc(S(14), S(15), "cg", [[S(14), "look"]], [
    [c("$5,000 al mes", "grey", S(14) + 0.6)],
    [c("meta", "grey", S(14) + 2.6), c("$15,000 – $30,000", "green", S(14) + 3.4)]
  ]);
  sc(S(15), S(16), "cg", [[S(15), "shrug"]], [
    [c("suena enorme", "orange", S(15) + 0.5)],
    [c("y para muchos lo es", "grey", S(15) + 1.6)]
  ]);
  sc(S(16), S(17), "cg", [[S(16), "point"]], [
    [c("empieza pequeño", "orange", S(16) + 0.6)],
    [c("$500", "green", S(16) + 2.2), c("o $1,000", "green", S(16) + 3.0)]
  ]);
  sc(S(17), S(18), "cg", [[S(17), "cheer"]], [
    [w("stairs", S(17) + 0.5, { n: 3, sc: 0.5 })],
    [c("primera meta", "green", S(17) + 0.9), c("salva la mayoría de sustos", "orange", S(17) + 2.0)]
  ]);
  // 5 COMO EMPEZAR
  sc(S(18), S(19), "cg", [[S(18), "point"]], [
    [p("calendar", S(18) + 0.6, { s: 0.5 })],
    [c("1 automatiza", "orange", S(18) + 0.8), c("cada mes", "green", S(18) + 2.4)]
  ]);
  sc(S(19), S(20), "cg", [[S(19), "calm"]], [
    [c("lo que no ves", "grey", S(19) + 0.3), sy("arrow", S(19) + 0.8, "grey"), c("no lo gastas", "green", S(19) + 1.2)]
  ]);
  sc(S(20), S(21), "cg", [[S(20), "point"]], [
    [c("2 recorta un gasto", "orange", S(20) + 0.6)],
    [c("directo al fondo", "green", S(20) + 2.4)]
  ]);
  sc(S(21), S(22), "cg", [[S(21), "give"]], [
    [c("3 dinero extra", "orange", S(21) + 0.6)],
    [c("reembolso de impuestos", "grey", S(21) + 2.2), c("regalo", "grey", S(21) + 3.8)]
  ]);
  sc(S(22), S(23), "cg", [[S(22), "calm"]], [
    [c("$5 o $10", "green", S(22) + 0.8), c("a la semana", "grey", S(22) + 1.8)],
    [c("empezar ya", "orange", S(22) + 3.0)]
  ]);
  // 6 DONDE GUARDARLO
  sc(S(23), S(24), "cg", [[S(23), "look"]], [
    [big("¿dónde?", "orange", S(23) + 0.4)],
    [c("el lugar importa", "grey", S(23) + 0.6)]
  ]);
  sc(S(24), S(25), "cg", [[S(24), "point"]], [
    [p("laptop", S(24) + 0.6, { s: 0.5 })],
    [c("ahorro en línea", "green", S(24) + 1.0), c("alto rendimiento", "orange", S(24) + 2.4)]
  ]);
  sc(S(25), S(26), "cg", [[S(25), "calm"]], [
    [p("shield", S(25) + 0.6, { s: 0.5, ck: S(25) + 1.4 })],
    [c("asegurada", "green", S(25) + 0.8), c("FDIC en EE. UU.", "grey", S(25) + 2.4)]
  ]);
  sc(S(26), S(27), "cg", [[S(26), "think"]], [
    [c("para tener liquidez", "green", S(26) + 1.0)],
    [c("no para hacerte rico", "grey", S(26) + 2.6)]
  ]);
  sc(S(27), S(28), "cg", [[S(27), "point"]], [
    [c("retiro y largo plazo", "orange", S(27) + 0.6)],
    [c("otra cuenta, más riesgo", "grey", S(27) + 2.2)]
  ]);
  sc(S(28), S(29), "cg", [[S(28), "worry"]], [
    [c("inflación", "red", S(28) + 0.8)],
    [c("se come tu dinero", "red", S(28) + 2.0)]
  ]);
  // 7 CIERRE
  sc(S(29), S(30), "cg", [[S(29), "shrug"]], [
    [c("cifras = ejemplos", "grey", S(29) + 0.6)],
    [c("tu situación es única", "orange", S(29) + 2.2)]
  ]);
  sc(S(30), S(31), "cg", [[S(30), "calm"]], [
    [c("contenido educativo", "grey", S(30) + 0.5)],
    [c("no es asesoría financiera", "grey", S(30) + 1.8)]
  ]);
  sc(S(31), S(32), "cg", [[S(31), "cheer"]], [
    [c("ojalá nunca lo uses", "grey", S(31) + 0.6)],
    [c("tranquilidad", "green", S(31) + 2.6)]
  ]);
  sc(S(32), END, "cg", [[S(32), "give"]], [
    [c("guárdalo", "green", S(32) + 0.6), c("compártelo", "orange", S(32) + 1.6)],
    [c("¿cuánto llevas ahorrado?", "grey", S(32) + 4.0)]
  ]);

  root.SCENES = SC;
})(window);

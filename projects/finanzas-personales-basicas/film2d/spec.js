/* Finanzas personales básicas (8 hábitos): the whole film as data. Times are REAL seconds of the narration (assets/audio/timeline.json).
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
  sc(0, S(1), "cg", [[S(0), "think"]], [
    [w("coin", S(0) + 0.6, { sc: 2.0 })],
    [big("¿a dónde se va?", "orange", S(0) + 2.0)]
  ]);
  sc(S(1), S(2), "cg", [[S(1), "worry"]], [
    [c("¿en qué gastas de más?", "red", S(1) + 0.6)],
    [c("¿hacia dónde vas?", "grey", S(1) + 2.6)]
  ]);
  sc(S(2), S(3), "cg", [[S(2), "shrug"]], [
    [c("sin respuesta", "grey", S(2) + 0.5)],
    [c("no eres el único", "green", S(2) + 1.6)]
  ]);
  sc(S(3), S(4), "cg", [[S(3), "point"]], [
    [big("8 hábitos", "green", S(3) + 1.0)],
    [c("toma el control", "orange", S(3) + 2.4)]
  ]);
  // 2 METAS Y PRESUPUESTO
  sc(S(4), S(6), "cg", [[S(4), "point"], [S(5), "look"]], [
    [c("1", "orange", S(4) + 0.2), c("metas claras", "green", S(4) + 0.6)],
    [p("house", S(5) + 0.8, { s: 0.45 }), w("plane", S(5) + 2.0, { sc: 0.4 })],
    [c("salir de deudas", "grey", S(5) + 0.4)]
  ]);
  sc(S(6), S(7), "cg", [[S(6), "shrug"]], [
    [c("sin objetivo", "grey", S(6) + 0.5)],
    [c("solo improvisas", "red", S(6) + 1.6)]
  ]);
  sc(S(7), S(8), "cg", [[S(7), "think"]], [
    [c("realistas", "green", S(7) + 0.6), sy("check", S(7) + 1.0, "green")],
    [c("o pierdes la motivación", "red", S(7) + 2.2)]
  ]);
  sc(S(8), S(10), "cg", [[S(8), "point"], [S(9), "look"]], [
    [c("2", "orange", S(8) + 0.2), c("presupuesto", "green", S(8) + 0.6)],
    [w("doc", S(9) + 0.3, { sc: 0.45 })],
    [c("lo que entra", "green", S(9) + 0.8), c("lo que sale", "red", S(9) + 2.0)]
  ]);
  sc(S(10), S(11), "cg", [[S(10), "cheer"]], [
    [big("tú decides", "green", S(10) + 0.6)],
    [c("a dónde va tu dinero", "orange", S(10) + 1.8)]
  ]);
  // 3 COLCHON Y DEUDAS
  sc(S(11), S(13), "cg", [[S(11), "point"], [S(12), "calm"]], [
    [c("3", "orange", S(11) + 0.2), c("fondo de emergencia", "green", S(11) + 1.4)],
    [p("shield", S(11) + 2.6, { s: 0.45 })],
    [c("3 a 6 meses de gastos", "orange", S(12) + 0.8)]
  ]);
  sc(S(13), S(14), "cg", [[S(13), "look"]], [
    [w("jar", S(13) + 0.4, { sc: 0.5, lbl: "~20 %", v0: 0.1, lv: [[S(13) + 1.6, 0.4, 1.2]] })],
    [c("de lo que ganas", "green", S(13) + 2.4)]
  ]);
  sc(S(14), S(15), "cg", [[S(14), "calm"]], [
    [w("hourglass", S(14) + 0.4, { sc: 0.5 })],
    [c("lo importante: empezar", "green", S(14) + 2.4)]
  ]);
  sc(S(15), S(17), "cg", [[S(15), "point"], [S(16), "worry"]], [
    [c("4", "orange", S(15) + 0.2), c("controla tus deudas", "green", S(15) + 0.6)],
    [big("gasto < ingreso", "orange", S(16) + 0.6)]
  ]);
  sc(S(17), S(18), "cg", [[S(17), "look"]], [
    [p("house", S(17) + 0.5, { s: 0.45 })],
    [c("hipoteca", "grey", S(17) + 0.9), c("patrimonio", "green", S(17) + 1.9)]
  ]);
  sc(S(18), S(19), "cg", [[S(18), "worry"]], [
    [c("gadgets y lujos", "red", S(18) + 0.8, { x: "strike" })],
    [c("te quitan futuro", "red", S(18) + 2.2)]
  ]);
  // 4 INVERTIR Y TARJETAS
  sc(S(19), S(21), "cg", [[S(19), "point"], [S(20), "cheer"]], [
    [c("5", "orange", S(19) + 0.2), c("invierte", "green", S(19) + 0.5)],
    [w("bars", S(20) + 0.5, { hs: [40, 70, 110, 160], cols: [GREY, C.cold, C.green, C.green], sc: 0.35 })],
    [c("que crezca con el tiempo", "green", S(20) + 1.8)]
  ]);
  sc(S(21), S(22), "cg", [[S(21), "think"]], [
    [c("siempre hay riesgo", "orange", S(21) + 0.5)],
    [c("entiende en qué inviertes", "green", S(21) + 2.0)]
  ]);
  sc(S(22), S(23), "cg", [[S(22), "calm"]], [
    [p("bed", S(22) + 0.6, { s: 0.45 })],
    [c("tu tolerancia al riesgo", "grey", S(22) + 1.6)]
  ]);
  sc(S(23), S(25), "cg", [[S(23), "point"], [S(24), "look"]], [
    [c("6", "orange", S(23) + 0.2), c("tarjeta con cuidado", "orange", S(23) + 0.6)],
    [p("card", S(23) + 1.2, { s: 0.45 })],
    [c("historial", "green", S(24) + 1.0), c("ves tus gastos", "green", S(24) + 2.2)]
  ]);
  sc(S(25), S(26), "cg", [[S(25), "point"]], [
    [c("paga el total", "green", S(25) + 0.5)],
    [big("< 30 %", "orange", S(25) + 2.0)],
    [c("de tu límite", "grey", S(25) + 2.8)]
  ]);
  sc(S(26), S(27), "cg", [[S(26), "shrug"]], [
    [c("¿la tarjeta te gana?", "red", S(26) + 0.5)],
    [c("córtala", "red", S(26) + 1.8), c("usa débito", "green", S(26) + 2.6)]
  ]);
  // 5 FAMILIA Y DESCANSO
  sc(S(27), S(28), "cg", [[S(27), "give"]], [
    [c("7", "orange", S(27) + 0.2), c("protege a tu familia", "green", S(27) + 1.4)],
    [w("heart", S(27) + 2.4, { sc: 0.4 })]
  ]);
  sc(S(28), S(29), "cg", [[S(28), "calm"]], [
    [w("doc", S(28) + 1.0, { sc: 0.4 }), p("shield", S(28) + 2.2, { s: 0.4 })],
    [c("testamento", "grey", S(28) + 2.6), c("seguro", "green", S(28) + 3.4)]
  ]);
  sc(S(29), S(30), "cg", [[S(29), "look"]], [
    [c("revisa tus pólizas", "orange", S(29) + 0.5)],
    [c("cuando tu vida cambie", "grey", S(29) + 1.6)]
  ]);
  sc(S(30), S(32), "cg", [[S(30), "cheer"], [S(31), "worry"]], [
    [c("8", "orange", S(30) + 0.2), c("date un respiro", "green", S(30) + 1.4)],
    [w("calstack", S(31) + 0.4, { n: 5, sc: 0.4 })],
    [c("dura décadas", "grey", S(31) + 1.0), c("sin disfrutar abandonas", "red", S(31) + 2.6)]
  ]);
  sc(S(32), S(33), "cg", [[S(32), "cheer"]], [
    [w("plane", S(32) + 0.5, { sc: 0.4 }), p("cup", S(32) + 1.4, { s: 0.45 })],
    [c("también es parte del plan", "green", S(32) + 2.2)]
  ]);
  // 6 CIERRE
  sc(S(33), S(34), "cg", [[S(33), "shrug"]], [
    [c("la escuela no lo enseña", "grey", S(33) + 0.6)],
    [c("te toca aprenderlo", "orange", S(33) + 2.4)]
  ]);
  sc(S(34), S(35), "cg", [[S(34), "calm"]], [
    [c("contenido educativo", "grey", S(34) + 0.5)],
    [c("no es asesoría financiera", "grey", S(34) + 1.8)]
  ]);
  sc(S(35), S(36), "cg", [[S(35), "point"]], [
    [c("no los 8 hoy", "grey", S(35) + 0.6)],
    [big("empieza por uno", "green", S(35) + 1.8)]
  ]);
  sc(S(36), END, "cg", [[S(36), "give"]], [
    [c("guárdalo", "green", S(36) + 0.6), c("compártelo", "orange", S(36) + 1.6)],
    [c("¿con cuál empiezas?", "grey", S(36) + 4.0)]
  ]);

  root.SCENES = SC;
})(window);

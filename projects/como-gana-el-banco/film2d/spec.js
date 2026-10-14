/* Cómo gana el banco (Fábrica 2.0): the whole film as data. Times are REAL seconds of the narration (assets/audio/timeline.json).
 * No coordinates: scenes are grids (L: c = character cell, g = graphic cell) and items flow inside their cell.
 * Fábrica 2.0: 15 s hook with no windows; every scene changes pose; second poses leave ≥1.9 s before the next bullet (camera punch-in). */
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

  // 1 GANCHO (sin ventanas)
  sc(0, S(1), "cg", [[S(0), "phone"], [S(0) + 2.6, "shrug"]], []);
  sc(S(1), S(2), "cg", [[S(1), "worry"], [S(1) + 2.2, "slump"]], []);
  sc(S(2), S(3), "cg", [[S(2), "look"], [S(2) + 2.2, "point"]], []);
  // 2 LA BOVEDA
  sc(S(3), S(5), "cg", [[S(3), "calm"], [S(4), "point"]], [
    [p("building", S(3) + 0.6, { s: 0.42 }), c("bóveda", "grey", S(3) + 1.2, { x: "strike" })],
    [p("card", S(4) + 1.9, { s: 0.4 }), c("préstamos", "orange", S(4) + 2.4), c("hipotecas", "orange", S(4) + 2.9)]
  ], { wt: "tu depósito" });
  sc(S(5), S(7), "cg", [[S(5), "worry"], [S(6), "think"]], [
    [c("todos a la vez", "orange", S(5) + 0.8), c("no alcanza", "red", S(5) + 1.6)],
    [p("shield", S(6) + 1.9, { s: 0.4 }), c("seguro de depósito", "green", S(6) + 2.5)]
  ]);
  // 3 EL MARGEN
  sc(S(7), S(10), "cg", [[S(7), "point"], [S(8), "calm"], [S(9), "shrug"]], [
    [c("tus ahorros", "grey", S(8) + 0.6), c("$1,000", "green", S(8) + 1.2), c("al 1 %", "grey", S(8) + 1.8)],
    [big("$10 para ti", "grey", S(9) + 0.9)]
  ], { wt: "el margen" });
  sc(S(10), S(13), "cg", [[S(10), "phone"], [S(11), "worry"], [S(12), "point"]], [
    [p("card", S(10) + 0.6, { s: 0.4 }), c("tarjeta al 30 %+", "red", S(10) + 1.3)],
    [big("$300 para el banco", "red", S(11) + 0.9)],
    [c("margen de interés", "orange", S(12) + 1.9)]
  ]);
  // 4 LAS COMISIONES
  sc(S(13), S(16), "cg", [[S(13), "think"], [S(14), "worry"], [S(15), "slump"]], [
    [w("leakjar", S(13) + 0.6, { sc: 0.45 }), c("sin darte cuenta", "orange", S(13) + 1.3)],
    [c("1", "orange", S(14) + 1.9), c("sobregiro", "red", S(14) + 2.4)],
    [c("≈ $35 cada vez", "red", S(15) + 1.5)]
  ], { wt: "las comisiones" });
  sc(S(16), S(18), "cg", [[S(16), "sitStress"], [S(17), "look"]], [
    [w("chain", S(16) + 0.6, { sc: 0.4 }), c("espiral", "red", S(16) + 1.3)],
    [c("2", "orange", S(17) + 1.9), c("cuota de manejo", "red", S(17) + 2.4), c("saldo mínimo", "grey", S(17) + 3.0)]
  ]);
  sc(S(18), S(21), "cg", [[S(18), "point"], [S(19), "phone"], [S(20), "worry"]], [
    [c("3", "orange", S(18) + 0.5), c("cajero ajeno", "red", S(18) + 1.1)],
    [c("4", "orange", S(19) + 1.9), c("≈ 3 % en el extranjero", "red", S(19) + 2.5)],
    [c("5", "orange", S(20) + 1.9), c("pago atrasado", "red", S(20) + 2.4)]
  ]);
  // 5 LO QUE NO VES
  sc(S(21), S(23), "cg", [[S(21), "give"], [S(22), "shrug"]], [
    [p("card", S(21) + 0.6, { s: 0.4 }), p("cart", S(21) + 1.2, { s: 0.4 }), c("comisión a la tienda", "orange", S(21) + 1.9)],
    [c("precios más altos", "red", S(22) + 1.9)]
  ], { wt: "lo que no ves" });
  sc(S(23), S(24), "cg", [[S(23), "think"], [S(23) + 2.6, "look"]], [
    [p("building", S(23) + 0.6, { s: 0.42 }), c("bolsa", "grey", S(23) + 1.2)],
    [c("fusiones", "grey", S(23) + 1.7), c("créditos", "grey", S(23) + 2.2)]
  ]);
  // 6 COMO DEFENDERTE
  sc(S(24), S(26), "cg", [[S(24), "cheer"], [S(25), "phone"]], [
    [big("se puede evitar", "green", S(24) + 0.6)],
    [c("alertas de saldo", "green", S(25) + 1.9), c("ahorro vinculado", "green", S(25) + 2.5)]
  ], { wt: "cómo defenderte" });
  sc(S(26), S(28), "cg", [[S(26), "point"], [S(27), "calm"]], [
    [c("sin cuota de manejo", "green", S(26) + 0.8)],
    [c("tu propio cajero", "green", S(27) + 1.5)]
  ]);
  sc(S(28), S(31), "cg", [[S(28), "look"], [S(29), "give"], [S(30), "cheer"]], [
    [w("plane", S(28) + 0.6, { sc: 0.4 }), c("sin comisión extranjera", "green", S(28) + 1.3)],
    [p("calendar", S(29) + 1.9, { s: 0.4 }), c("pagos domiciliados", "green", S(29) + 2.5)],
    [c("bancos digitales", "green", S(30) + 1.9), c("cooperativas", "green", S(30) + 2.5)]
  ]);
  // 7 CIERRE
  sc(S(31), S(33), "cg", [[S(31), "shrug"], [S(32), "point"]], [
    [c("ni enemigo", "grey", S(31) + 0.6), c("ni amigo", "grey", S(31) + 1.3), c("negocio", "orange", S(31) + 2.0)],
    [w("statement", S(32) + 1.9, { sc: 0.4 }), c("suma tus comisiones", "orange", S(32) + 2.6)]
  ]);
  sc(S(33), S(34), "cg", [[S(33), "think"], [S(33) + 2.4, "calm"]], [
    [c("contenido educativo", "grey", S(33) + 0.5)],
    [c("no es asesoría financiera", "grey", S(33) + 1.3)],
    [c("tasas varían por país", "grey", S(33) + 2.1)]
  ]);
  sc(S(34), END, "cg", [[S(34), "give"], [S(35), "point"]], [
    [c("guárdalo", "green", S(34) + 0.6), c("compártelo", "orange", S(34) + 1.4)],
    [c("¿cuánto te cobró tu banco?", "grey", S(35) + 0.8)]
  ]);

  root.SCENES = SC;
})(window);

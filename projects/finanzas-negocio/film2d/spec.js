/* Finanzas de negocio (4 capas con un solo ejemplo): the whole film as data. Times are REAL seconds of the narration (assets/audio/timeline.json).
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
    [p("cart", S(0) + 0.5, { s: 0.45 }), w("coin", S(0) + 1.4, { sc: 1.2 })],
    [big("¿gana dinero?", "orange", S(0) + 3.0)]
  ], { wt: "tu negocio" });
  sc(S(1), S(2), "cg", [[S(1), "shrug"]], [
    [c("entra", "green", S(1) + 0.3), sy("arrow", S(1) + 0.6, "green"), c("sale", "red", S(1) + 1.0)],
    [c("¿y el control?", "grey", S(1) + 1.8)]
  ]);
  sc(S(2), S(3), "cg", [[S(2), "point"]], [
    [p("building", S(2) + 0.5, { s: 0.45 })],
    [c("un solo ejemplo", "green", S(2) + 1.4)]
  ]);
  sc(S(3), S(4), "cg", [[S(3), "think"]], [
    [big("4 capas", "green", S(3) + 0.5)],
    [c("te saltas una", "grey", S(3) + 1.6), c("se rompe", "red", S(3) + 2.6)]
  ]);
  // 2 VENTAS Y UTILIDAD
  sc(S(4), S(6), "cg", [[S(4), "point"], [S(5), "look"]], [
    [c("ventas al año", "grey", S(4) + 0.4)],
    [big("$500,000", "green", S(4) + 1.4)],
    [c("ingresos", "green", S(5) + 0.3), sy("neq", S(5) + 0.8, "orange"), c("ganancia", "red", S(5) + 1.3)]
  ], { wt: "estado de resultados" });
  sc(S(6), S(8), "cg", [[S(6), "worry"], [S(7), "calm"]], [
    [p("box", S(6) + 0.4, { s: 0.45 }), c("− $300,000", "red", S(6) + 1.2)],
    [c("utilidad bruta", "grey", S(7) + 0.3)],
    [big("$200,000", "green", S(7) + 0.9)]
  ]);
  sc(S(8), S(10), "cg", [[S(8), "look"], [S(9), "point"]], [
    [c("renta", "grey", S(8) + 0.5), c("sueldos", "grey", S(8) + 1.0), c("software", "grey", S(8) + 1.5)],
    [c("− $120,000", "red", S(8) + 3.0)],
    [c("utilidad de operación", "grey", S(9) + 0.4)],
    [big("$80,000", "green", S(9) + 1.4)]
  ]);
  sc(S(10), S(11), "cg", [[S(10), "calm"]], [
    [w("heart", S(10) + 0.4, { sc: 0.45 })],
    [c("¿qué tan sano está?", "green", S(10) + 1.2)]
  ]);
  sc(S(11), S(12), "cg", [[S(11), "look"]], [
    [c("− intereses", "red", S(11) + 0.6), c("− impuestos", "red", S(11) + 1.3)],
    [c("utilidad neta", "green", S(11) + 2.6)]
  ]);
  // 3 UTILIDAD NO ES EFECTIVO
  sc(S(12), S(13), "cg", [[S(12), "worry"]], [
    [c("utilidad", "green", S(12) + 0.6), sy("neq", S(12) + 1.4, "red"), c("efectivo", "orange", S(12) + 1.9)]
  ], { wt: "la trampa" });
  sc(S(13), S(14), "cg", [[S(13), "point"]], [
    [p("card", S(13) + 0.4, { s: 0.45 }), c("$50,000 a crédito", "orange", S(13) + 1.0)],
    [c("la venta ya cuenta", "green", S(13) + 2.2)],
    [c("el banco no lo ve", "red", S(13) + 3.4)]
  ]);
  sc(S(14), S(15), "cg", [[S(14), "shrug"]], [
    [c("con ganancias", "green", S(14) + 0.5)],
    [c("sin pagar la nómina", "red", S(14) + 1.8)]
  ]);
  sc(S(15), S(16), "cg", [[S(15), "think"]], [
    [c("capital de trabajo", "orange", S(15) + 0.5)],
    [c("lo que tienes", "green", S(15) + 2.0), c("− lo que debes", "red", S(15) + 3.2)],
    [c("a corto plazo", "grey", S(15) + 4.0)]
  ]);
  sc(S(16), S(17), "cg", [[S(16), "point"]], [
    [c("$180,000", "green", S(16) + 0.6), c("− $120,000", "red", S(16) + 1.8)],
    [big("$60,000", "green", S(16) + 3.0)]
  ]);
  sc(S(17), S(18), "cg", [[S(17), "worry"]], [
    [c("si es negativo", "red", S(17) + 0.4)],
    [c("préstamos", "grey", S(17) + 1.4), c("sustos", "red", S(17) + 2.2)]
  ]);
  // 4 FLUJO DE CAJA
  sc(S(18), S(19), "cg", [[S(18), "point"]], [
    [p("laptop", S(18) + 0.4, { s: 0.45 })],
    [c("entra", "green", S(18) + 1.6), c("sale", "red", S(18) + 2.2)]
  ], { wt: "flujo de caja" });
  sc(S(19), S(20), "cg", [[S(19), "look"]], [
    [c("cobras $400,000", "green", S(19) + 0.5), c("pagas $300,000", "red", S(19) + 2.0)],
    [big("+$100,000", "green", S(19) + 3.4)]
  ]);
  sc(S(20), S(21), "cg", [[S(20), "point"]], [
    [c("máquina − $40,000", "red", S(20) + 0.8)],
    [c("flujo libre", "orange", S(20) + 2.0)],
    [big("$60,000", "green", S(20) + 2.8)]
  ]);
  sc(S(21), S(22), "cg", [[S(21), "cheer"]], [
    [c("paga deudas", "green", S(21) + 0.6)],
    [c("crea reservas", "green", S(21) + 1.5)],
    [w("bars", S(21) + 2.2, { hs: [40, 70, 110, 160], cols: [GREY, C.cold, C.green, C.green], sc: 0.35 })]
  ]);
  sc(S(22), S(23), "cg", [[S(22), "worry"]], [
    [c("gastas $50,000", "red", S(22) + 0.5), c("entran $30,000", "green", S(22) + 1.8)],
    [c("quemas $20,000 al mes", "red", S(22) + 3.2)]
  ]);
  sc(S(23), S(24), "cg", [[S(23), "worry"]], [
    [w("hourglass", S(23) + 0.3, { sc: 0.45 }), c("$100,000", "grey", S(23) + 0.8)],
    [big("5 meses", "orange", S(23) + 1.8)]
  ]);
  sc(S(24), S(25), "cg", [[S(24), "point"]], [
    [p("calendar", S(24) + 0.4, { s: 0.45 })],
    [c("cada semana", "green", S(24) + 1.2), c("no tarde", "red", S(24) + 2.2)]
  ]);
  // 5 EQUILIBRIO Y BALANCE
  sc(S(25), S(26), "cg", [[S(25), "think"]], [
    [c("punto de equilibrio", "orange", S(25) + 0.5)],
    [c("vender para no perder", "grey", S(25) + 2.0)]
  ], { wt: "equilibrio" });
  sc(S(26), S(27), "cg", [[S(26), "point"]], [
    [c("fijos $100,000", "red", S(26) + 0.6), c("margen 50 %", "green", S(26) + 2.0)],
    [big("vende $200,000", "green", S(26) + 3.6)]
  ]);
  sc(S(27), S(28), "cg", [[S(27), "look"]], [
    [w("doc", S(27) + 0.3, { sc: 0.4 })],
    [c("lo que tiene", "green", S(27) + 1.4), c("lo que debe", "red", S(27) + 2.2)]
  ], { wt: "balance" });
  sc(S(28), S(29), "cg", [[S(28), "point"]], [
    [c("activos $500,000", "green", S(28) + 0.6)],
    [c("deudas $350,000", "red", S(28) + 2.2)],
    [c("vale", "grey", S(28) + 3.6), big("$150,000", "green", S(28) + 4.0)]
  ]);
  sc(S(29), S(30), "cg", [[S(29), "worry"]], [
    [c("deuda > 2×", "red", S(29) + 0.6)],
    [c("una mala racha te tumba", "red", S(29) + 1.8)]
  ]);
  // 6 CIERRE
  sc(S(30), S(31), "cg", [[S(30), "calm"]], [
    [c("no son sensaciones", "grey", S(30) + 0.5, { x: "strike" })],
    [big("un sistema", "green", S(30) + 1.8)]
  ]);
  sc(S(31), S(32), "cg", [[S(31), "calm"]], [
    [c("contenido educativo", "grey", S(31) + 0.5)],
    [c("no es asesoría financiera", "grey", S(31) + 1.8)]
  ]);
  sc(S(32), S(33), "cg", [[S(32), "point"]], [
    [c("esta semana", "orange", S(32) + 0.4)],
    [c("utilidad", "green", S(32) + 1.6), c("flujo libre", "green", S(32) + 2.4)],
    [c("meses de vida", "orange", S(32) + 3.2)]
  ]);
  sc(S(33), END, "cg", [[S(33), "give"]], [
    [c("guárdalo", "green", S(33) + 0.6), c("compártelo", "orange", S(33) + 1.6)],
    [c("¿qué número no conocías?", "grey", S(33) + 4.0)]
  ]);

  root.SCENES = SC;
})(window);

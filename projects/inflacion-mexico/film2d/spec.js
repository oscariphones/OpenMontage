/* Inflación en México (Fábrica 2.0): the whole film as data. Times are REAL seconds of the narration (assets/audio/timeline.json).
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
  // 2 LOS AÑOS TRANQUILOS
  sc(S(3), S(5), "cg", [[S(3), "calm"], [S(4), "sitRelaxed"]], [
    [c("1954 - 1976", "grey", S(3) + 0.6)],
    [big("$12.50 por dólar", "green", S(3) + 1.3)],
    [c("inflación baja", "green", S(4) + 1.9)]
  ], { wt: "los años tranquilos" });
  sc(S(5), S(7), "cg", [[S(5), "think"], [S(6), "worry"]], [
    [c("deuda", "orange", S(5) + 0.6), c("gasto público", "orange", S(5) + 1.2)],
    [c("1976", "grey", S(6) + 1.9), c("dólar × 2", "red", S(6) + 2.5)]
  ]);
  // 3 LA DECADA PERDIDA
  sc(S(7), S(10), "cg", [[S(7), "point"], [S(8), "slump"], [S(9), "worry"]], [
    [c("1982", "grey", S(7) + 0.6), c("\"como un perro\"", "orange", S(7) + 1.3)],
    [big("≈ 100 %", "red", S(8) + 1.9)],
    [c("precios × 2 en un año", "red", S(9) + 1.2)]
  ], { wt: "la década perdida" });
  sc(S(10), S(12), "cg", [[S(10), "look"], [S(11), "sitStress"]], [
    [c("y lo peor...", "grey", S(10) + 0.4)],
    [c("1987", "grey", S(11) + 1.9)],
    [big("159 %", "red", S(11) + 2.5)]
  ]);
  sc(S(12), S(15), "cg", [[S(12), "think"], [S(13), "point"], [S(14), "phone"]], [
    [w("hourglass", S(12) + 0.6, { sc: 0.4 }), c("≈ 8 % al mes", "red", S(12) + 1.3)],
    [c("enero $100", "grey", S(13) + 1.9), sy("arrow", S(13) + 2.5, "grey"), c("diciembre $259", "red", S(13) + 3.1)],
    [c("cobras viernes", "grey", S(14) + 1.9), c("gastas sábado", "orange", S(14) + 2.5)]
  ]);
  // 4 LOS TRES CEROS
  sc(S(15), S(17), "cg", [[S(15), "shrug"], [S(16), "worry"]], [
    [c("cuentas absurdas", "orange", S(15) + 0.6)],
    [p("car", S(16) + 1.9, { s: 0.4 }), c("decenas de millones", "red", S(16) + 2.5)]
  ], { wt: "los tres ceros" });
  sc(S(17), S(20), "cg", [[S(17), "point"], [S(18), "cheer"], [S(19), "shrug"]], [
    [c("1993", "grey", S(17) + 0.6), c("nuevo peso", "green", S(17) + 1.2)],
    [c("$1,000 viejos", "grey", S(18) + 1.2), sy("arrow", S(18) + 1.8, "grey"), c("$1 nuevo", "green", S(18) + 2.4)],
    [c("quitar ceros ≠ curar", "red", S(19) + 1.9)]
  ]);
  // 5 EL ERROR DE DICIEMBRE
  sc(S(20), S(22), "cg", [[S(20), "slump"], [S(21), "sitStress"]], [
    [c("diciembre 1994", "grey", S(20) + 0.6), c("1995: +50 %", "red", S(20) + 1.4)],
    [p("house", S(21) + 1.9, { s: 0.4 }), c("créditos impagables", "red", S(21) + 2.5)]
  ], { wt: "el error de diciembre" });
  // 6 LA CALMA
  sc(S(22), S(24), "cg", [[S(22), "calm"], [S(23), "cheer"]], [
    [p("building", S(22) + 0.6, { s: 0.42 }), c("Banxico autónomo", "green", S(22) + 1.2), c("meta 3 %", "green", S(22) + 1.9)],
    [c("3 a 5 % al año", "green", S(23) + 1.9)]
  ], { wt: "la calma" });
  sc(S(24), S(25), "cg", [[S(24), "worry"], [S(24) + 2.6, "look"]], [
    [c("2022", "grey", S(24) + 0.6), c("pandemia", "orange", S(24) + 1.2)],
    [big("≈ 9 %", "red", S(24) + 3.4)]
  ]);
  // 7 LO QUE SIGNIFICA PARA TI
  sc(S(25), S(27), "cg", [[S(25), "shrug"], [S(26), "point"]], [
    [c("4 % al año", "grey", S(25) + 0.6), c("¿no es nada?", "grey", S(25) + 1.3)],
    [w("jar", S(26) + 1.9, { sc: 0.4 }), c("$100,000 hoy", "green", S(26) + 2.5)],
    [c("en 10 años ≈ $68,000", "red", S(26) + 3.4)]
  ], { wt: "lo que significa para ti" });
  sc(S(27), S(29), "cg", [[S(27), "slump"], [S(28), "think"]], [
    [c("18 años", "grey", S(27) + 0.6)],
    [big("la mitad", "red", S(27) + 1.3)],
    [c("impuesto silencioso", "orange", S(28) + 1.9)]
  ]);
  sc(S(29), S(32), "cg", [[S(29), "point"], [S(30), "worry"], [S(31), "cheer"]], [
    [c("crecer más que los precios", "green", S(29) + 0.8)],
    [c("tasa < inflación", "red", S(30) + 1.9), sy("arrow", S(30) + 2.5, "grey"), c("pierdes", "red", S(30) + 3.1)],
    [c("Cetes", "green", S(31) + 1.9), c("largo plazo", "green", S(31) + 2.5)]
  ]);
  // 8 CIERRE
  sc(S(32), S(33), "cg", [[S(32), "give"], [S(32) + 2.2, "calm"]], [
    [big("el dinero quieto pierde", "orange", S(32) + 0.6)]
  ]);
  sc(S(33), S(34), "cg", [[S(33), "think"], [S(33) + 2.4, "look"]], [
    [c("contenido educativo", "grey", S(33) + 0.5)],
    [c("no es asesoría financiera", "grey", S(33) + 1.3)],
    [c("pasado ≠ futuro", "grey", S(33) + 2.1)]
  ]);
  sc(S(34), END, "cg", [[S(34), "give"], [S(35), "point"]], [
    [c("guárdalo", "green", S(34) + 0.6), c("compártelo", "orange", S(34) + 1.4)],
    [c("¿qué costaba menos?", "grey", S(35) + 0.8)]
  ]);

  root.SCENES = SC;
})(window);

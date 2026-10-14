/* La maldición Getty (Fábrica 2.0): the whole film as data. Times are REAL seconds of the narration (assets/audio/timeline.json).
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
  // 2 EL IMPERIO
  sc(S(3), S(5), "cg", [[S(3), "cheer"], [S(4), "think"]], [
    [c("J. Paul Getty", "orange", S(3) + 0.5), c("1.er millón a los 24", "green", S(3) + 1.1)],
    [c("Gran Depresión", "grey", S(4) + 1.9), c("compra barato", "green", S(4) + 2.5)]
  ], { wt: "el imperio" });
  sc(S(5), S(7), "cg", [[S(5), "point"], [S(6), "cheer"]], [
    [c("Arabia Saudita", "orange", S(5) + 0.6), sy("arrow", S(5) + 1.2, "grey"), c("fortuna multiplicada", "green", S(5) + 1.8)],
    [c("1957", "grey", S(6) + 1.9)],
    [big("el más rico", "green", S(6) + 2.5)]
  ]);
  // 3 EL TACAÑO
  sc(S(7), S(9), "cg", [[S(7), "calm"], [S(8), "phone"]], [
    [p("building", S(7) + 0.6, { s: 0.42 }), c("72 habitaciones", "orange", S(7) + 1.2)],
    [p("phone", S(8) + 1.9, { s: 0.4 }), c("teléfono público", "red", S(8) + 2.5)]
  ], { wt: "la mansión" });
  sc(S(9), S(11), "cg", [[S(9), "think"], [S(10), "slump"]], [
    [w("coin", S(9) + 0.6, { sc: 0.45 }), c("cada dólar", "orange", S(9) + 1.3)],
    [c("5 matrimonios", "grey", S(10) + 1.9), c("5 hijos", "grey", S(10) + 2.5)],
    [p("envelope", S(10) + 3.1, { s: 0.4 }), c("por carta", "red", S(10) + 3.6)]
  ]);
  // 4 LOS HIJOS
  sc(S(11), S(13), "cg", [[S(11), "sitStress"], [S(12), "worry"]], [
    [c("George", "orange", S(11) + 0.5), c("buscaba su aprobación", "grey", S(11) + 1.1)],
    [c("1973", "grey", S(12) + 1.9), c("alcohol + pastillas", "red", S(12) + 2.5)]
  ], { wt: "los hijos" });
  sc(S(13), S(14), "cg", [[S(13), "look"], [S(13) + 2.4, "slump"]], [
    [c("Paul", "orange", S(13) + 0.5), c("Roma", "grey", S(13) + 1.1), c("drogas", "red", S(13) + 1.7)]
  ]);
  // 5 EL SECUESTRO
  sc(S(14), S(16), "cg", [[S(14), "worry"], [S(15), "point"]], [
    [c("Roma, 1973", "grey", S(14) + 0.5), c("nieto de 16 años", "orange", S(14) + 1.1)],
    [big("$17 millones", "red", S(15) + 1.5)]
  ], { wt: "el secuestro" });
  sc(S(16), S(18), "cg", [[S(16), "shrug"], [S(17), "worry"]], [
    [c("14 nietos", "orange", S(16) + 0.8), c("ni un centavo", "red", S(16) + 1.6)],
    [p("envelope", S(17) + 1.9, { s: 0.4 }), c("noviembre", "grey", S(17) + 2.5)]
  ]);
  sc(S(18), S(20), "cg", [[S(18), "give"], [S(19), "think"]], [
    [big("$2.2 millones", "orange", S(18) + 0.8)],
    [c("deducible", "grey", S(19) + 1.9), c("préstamo al hijo", "red", S(19) + 2.5), c("con intereses", "red", S(19) + 3.1)]
  ]);
  sc(S(20), S(22), "cg", [[S(20), "calm"], [S(21), "phone"]], [
    [c("diciembre", "grey", S(20) + 0.6), c("libre", "green", S(20) + 1.2)],
    [p("phone", S(21) + 1.9, { s: 0.4 }), c("no contestó", "red", S(21) + 2.5)]
  ]);
  // 6 EL PRECIO
  sc(S(22), S(23), "cg", [[S(22), "slump"], [S(22) + 2.6, "sitStress"]], [
    [c("1981", "grey", S(22) + 0.6), c("paralizado", "red", S(22) + 1.2), c("casi ciego", "red", S(22) + 1.8)]
  ], { wt: "el precio" });
  sc(S(23), S(25), "cg", [[S(23), "look"], [S(24), "point"]], [
    [c("1976", "grey", S(23) + 0.6), c("+ $2,000 millones", "green", S(23) + 1.2)],
    [p("building", S(24) + 1.9, { s: 0.42 }), c("al museo", "orange", S(24) + 2.5)]
  ]);
  sc(S(25), S(26), "cg", [[S(25), "shrug"], [S(25) + 2.8, "slump"]], [
    [c("1984", "grey", S(25) + 0.6)],
    [big("≈ $10,000 millones", "green", S(25) + 1.3)],
    [c("adiós al negocio", "red", S(25) + 3.4)]
  ]);
  // 7 LA LECCION
  sc(S(26), S(28), "cg", [[S(26), "think"], [S(27), "point"]], [
    [c("fortuna", "green", S(26) + 0.6), c("familia", "red", S(26) + 1.2, { x: "strike" })],
    [c("invertir en personas", "orange", S(27) + 1.9)]
  ], { wt: "la lección" });
  sc(S(28), S(31), "cg", [[S(28), "calm"], [S(29), "look"], [S(30), "worry"]], [
    [c("contar centavos", "grey", S(28) + 0.6), c("≠", "grey", S(28) + 1.2), c("buena relación", "green", S(28) + 1.8)],
    [c("no hace falta ser millonario", "orange", S(29) + 1.9)],
    [w("hourglass", S(30) + 1.9, { sc: 0.4 }), c("tiempo con tu familia", "green", S(30) + 2.6)]
  ]);
  // 8 LA REDENCION
  sc(S(31), S(33), "cg", [[S(31), "cheer"], [S(32), "calm"]], [
    [c("pero...", "grey", S(31) + 0.4)],
    [c("Paul", "orange", S(32) + 1.9), c("deja las drogas", "green", S(32) + 2.5)]
  ], { wt: "la redención" });
  sc(S(33), S(35), "cg", [[S(33), "give"], [S(34), "cheer"]], [
    [c("filántropo", "green", S(33) + 0.6), c("caballero", "orange", S(33) + 1.3)],
    [p("building", S(34) + 1.9, { s: 0.42 }), c("museos", "green", S(34) + 2.5), c("caridad", "green", S(34) + 3.1)]
  ]);
  // 9 CIERRE
  sc(S(35), S(36), "cg", [[S(35), "point"], [S(35) + 2.2, "calm"]], [
    [big("amplifica lo que eres", "green", S(35) + 0.6)]
  ]);
  sc(S(36), S(37), "cg", [[S(36), "think"], [S(36) + 2.0, "look"]], [
    [c("contenido educativo", "grey", S(36) + 0.5)],
    [c("no es asesoría financiera", "grey", S(36) + 1.3)]
  ]);
  sc(S(37), END, "cg", [[S(37), "give"], [S(38), "point"]], [
    [c("suscríbete", "green", S(37) + 0.6), c("más dinastías", "orange", S(37) + 1.4)],
    [c("¿habrías pagado el rescate?", "grey", S(38) + 0.8)]
  ]);

  root.SCENES = SC;
})(window);

/* Cuánto necesitas para retirarte (Fábrica 2.0): the whole film as data. Times are REAL seconds of the narration (assets/audio/timeline.json).
 * No coordinates: scenes are grids (L: c = character cell, g = graphic cell) and items flow inside their cell.
 * Fábrica 2.0: 15 s hook with no windows; every scene changes pose; second poses leave ≥1.8 s before the next bullet (camera punch-in). */
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
  sc(0, S(1), "cg", [[S(0), "shrug"], [S(0) + 2.6, "think"]], []);
  sc(S(1), S(2), "cg", [[S(1), "slump"], [S(1) + 2.4, "worry"]], []);
  sc(S(2), S(3), "cg", [[S(2), "point"], [S(2) + 2.0, "calm"]], []);
  // 2 EL MIEDO
  sc(S(3), S(5), "cg", [[S(3), "worry"], [S(4), "think"]], [
    [c("miedo n.º 1", "red", S(3) + 0.7), c("quedarse sin dinero", "red", S(3) + 1.4)],
    [w("dots", S(4) + 1.9, { sc: 0.4 }), c("6 de cada 10", "orange", S(4) + 2.5)]
  ], { wt: "Goldman Sachs" });
  sc(S(5), S(6), "cg", [[S(5), "sitStress"], [S(5) + 2.2, "slump"]], [
    [c("ahorran de más", "orange", S(5) + 0.6), c("gastan de menos", "orange", S(5) + 1.2)]
  ], { wt: "el costo del miedo" });
  // 3 LO QUE AHORRA LA GENTE
  sc(S(6), S(8), "cg", [[S(6), "point"], [S(7), "worry"]], [
    [w("jar", S(6) + 0.7, { sc: 0.4 }), c("8 de cada 10", "orange", S(6) + 1.3), c("< $100 mil", "red", S(6) + 1.9)],
    [c("muchos: $0", "red", S(7) + 1.9)]
  ], { wt: "cuentas de retiro (EE. UU.)" });
  sc(S(8), S(10), "cg", [[S(8), "look"], [S(9), "give"]], [
    [c("no lo son todo", "grey", S(8) + 0.8)],
    [p("house", S(9) + 1.9, { s: 0.4 }), c("lo que tienes", "green", S(9) + 2.5), c("− lo que debes", "red", S(9) + 3.1)]
  ], { wt: "patrimonio" });
  // 4 EL PATRIMONIO REAL
  sc(S(10), S(12), "cg", [[S(10), "phone"], [S(11), "point"]], [
    [c("55 a 64 años", "grey", S(10) + 0.7), c("~$365 mil", "green", S(10) + 1.4)],
    [c("65 a 74 años", "grey", S(11) + 1.9), c("~$410 mil", "green", S(11) + 2.5)]
  ], { wt: "hogar típico (Reserva Federal)" });
  sc(S(12), S(14), "cg", [[S(12), "cheer"], [S(13), "think"]], [
    [w("stairs", S(12) + 0.7, { n: 3, sc: 0.4 }), c("top 25 %: ~$1.2 millones", "orange", S(12) + 1.4)],
    [c("top 10 %: ~$3 millones", "orange", S(13) + 1.9)]
  ], { wt: "los de arriba" });
  // 5 EL FACTOR QUE NADIE MENCIONA
  sc(S(14), S(15), "cg", [[S(14), "look"], [S(14) + 2.4, "shrug"]], [
    [big("estado civil", "orange", S(14) + 4.4)]
  ], { wt: "el factor oculto" });
  sc(S(15), S(17), "cg", [[S(15), "point"], [S(16), "worry"]], [
    [w("heart", S(15) + 0.7, { sc: 0.4 }), c("casados: ~$650 mil", "green", S(15) + 1.4)],
    [c("recasados: ~$460 mil", "orange", S(16) + 1.9), c("divorciados: ~$167 mil", "red", S(16) + 2.6)]
  ], { wt: "patrimonio por estado civil" });
  sc(S(17), S(18), "cg", [[S(17), "give"], [S(17) + 2.2, "calm"]], [
    [c("dos sueldos", "green", S(17) + 0.6), c("una sola casa", "green", S(17) + 1.2)]
  ], { wt: "por qué" });
  // 6 EL PLAN ESCRITO
  sc(S(18), S(20), "cg", [[S(18), "point"], [S(19), "think"]], [
    [w("doc", S(18) + 0.7, { sc: 0.4 }), big("+27 %", "green", S(18) + 1.4)],
    [c("mismo sueldo", "grey", S(19) + 1.9), c("otra diferencia", "orange", S(19) + 2.5)]
  ], { wt: "plan escrito" });
  sc(S(20), S(21), "cg", [[S(20), "shrug"], [S(20) + 2.2, "cheer"]], [
    [c("más disciplina", "grey", S(20) + 0.6)],
    [c("demasiado grande para ignorar", "green", S(20) + 4.2)]
  ], { wt: "¿sesgo?" });
  // 7 LA PENSIÓN
  sc(S(21), S(22), "cg", [[S(21), "phone"], [S(21) + 2.4, "look"]], [
    [p("envelope", S(21) + 0.7, { s: 0.4 }), c("~$1,976 al mes", "green", S(21) + 1.4)],
    [c("promedio, enero 2025", "grey", S(21) + 4.4)]
  ], { wt: "Seguro Social (EE. UU.)" });
  sc(S(22), S(24), "cg", [[S(22), "worry"], [S(23), "cheer"]], [
    [p("calendar", S(22) + 0.7, { s: 0.4 }), c("a los 62: 70 %", "red", S(22) + 1.4)],
    [c("+8 % por año", "green", S(23) + 1.9), c("a los 70: 124 %", "green", S(23) + 2.6)]
  ], { wt: "¿cuándo pedirla?" });
  // 8 EL MITO DEL MILLÓN
  sc(S(24), S(26), "cg", [[S(24), "point"], [S(25), "shrug"]], [
    [big("$1 millón", "red", S(24) + 0.8, { x: "strike" })],
    [w("dots", S(25) + 1.9, { sc: 0.4 }), c("solo ~3 %", "orange", S(25) + 2.5)]
  ], { wt: "el mito del millón" });
  sc(S(26), S(28), "cg", [[S(26), "sitRelaxed"], [S(27), "look"]], [
    [c("viven bien", "green", S(26) + 0.7), c("o tranquilos", "green", S(26) + 1.4)],
    [c("$100 a $250 mil", "orange", S(27) + 1.9), c("ahorrados", "grey", S(27) + 2.5)]
  ], { wt: "jubilados cómodos" });
  sc(S(28), S(29), "cg", [[S(28), "give"], [S(28) + 2.2, "calm"]], [
    [c("pensión de pareja", "grey", S(28) + 0.6)],
    [c("> 2× línea de pobreza", "green", S(28) + 4.2)]
  ], { wt: "la clave" });
  // 9 EL MITO DEL OCHENTA
  sc(S(29), S(31), "cg", [[S(29), "think"], [S(30), "point"]], [
    [big("80 % del sueldo", "red", S(29) + 0.8, { x: "strike" })],
    [c("50 %", "green", S(30) + 1.9), c("≈ igual de satisfechos", "green", S(30) + 2.5)]
  ], { wt: "el mito del 80 %" });
  sc(S(31), S(32), "cg", [[S(31), "worry"], [S(31) + 2.2, "slump"]], [
    [w("bars", S(31) + 0.7, { sc: 0.4 }), c("< 40 %", "red", S(31) + 1.4), c("aquí duele", "red", S(31) + 2.0)]
  ], { wt: "el límite" });
  // 10 LAS TRES REGLAS
  sc(S(32), S(34), "cg", [[S(32), "look"], [S(33), "phone"]], [
    [c("lo que gastas", "green", S(32) + 0.7), c("> lo que ganas", "grey", S(32) + 1.4)],
    [c("ganan +$300 mil", "orange", S(33) + 1.9), c("4 de 10 viven al día", "red", S(33) + 2.6)]
  ], { wt: "gastar importa más" });
  sc(S(34), S(36), "cg", [[S(34), "point"], [S(35), "cheer"]], [
    [c("1. gasta menos de lo que ganas", "green", S(34) + 0.7)],
    [p("house", S(35) + 1.9, { s: 0.4 }), c("2. una casa", "orange", S(35) + 2.5), c("3. un matrimonio", "orange", S(35) + 3.2)]
  ], { wt: "las tres reglas" });
  // 11 CIERRE
  sc(S(36), S(38), "cg", [[S(36), "think"], [S(37), "give"]], [
    [c("cifra mágica", "grey", S(36) + 0.6, { x: "strike" }), c("plan escrito", "green", S(36) + 1.3)],
    [c("no sacrifiques tus mejores años", "orange", S(37) + 1.9)]
  ], { wt: "la meta" });
  sc(S(38), S(39), "cg", [[S(38), "calm"], [S(38) + 1.8, "look"]], [
    [c("contenido educativo", "grey", S(38) + 0.5)],
    [c("no es asesoría financiera", "grey", S(38) + 1.2)]
  ]);
  sc(S(39), END, "cg", [[S(39), "cheer"], [S(40), "point"]], [
    [c("compártelo", "green", S(39) + 0.6)],
    [c("¿con cuánto te retirarías?", "orange", S(40) + 0.8)]
  ]);

  root.SCENES = SC;
})(window);

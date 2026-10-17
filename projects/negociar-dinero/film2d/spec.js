/* Negociar como en Harvard (Fábrica 2.0): the whole film as data. Times are REAL seconds of the narration (assets/audio/timeline.json).
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
  sc(0, S(1), "cg", [[S(0), "give"], [S(0) + 2.6, "slump"]], []);
  sc(S(1), S(2), "cg", [[S(1), "shrug"], [S(1) + 2.4, "think"]], []);
  sc(S(2), S(3), "cg", [[S(2), "point"], [S(2) + 2.0, "cheer"]], []);
  // 2 LA NARANJA
  sc(S(3), S(5), "cg", [[S(3), "look"], [S(4), "shrug"]], [
    [c("una naranja", "orange", S(3) + 0.6), c("mitad y mitad", "grey", S(3) + 1.3)],
    [c("uno: la pulpa", "orange", S(4) + 1.9), c("otro: la cáscara", "orange", S(4) + 2.6)]
  ], { wt: "la naranja" });
  sc(S(5), S(7), "cg", [[S(5), "think"], [S(6), "point"]], [
    [c("¿para qué la quieres?", "green", S(5) + 0.7)],
    [big("no es partir a la mitad", "orange", S(6) + 1.9)]
  ], { wt: "la lección" });
  // 3 INTERESES
  sc(S(7), S(9), "cg", [[S(7), "calm"], [S(8), "look"]], [
    [c("paso 1", "orange", S(7) + 0.5), c("intereses, no posiciones", "green", S(7) + 1.1)],
    [c("posición: qué pide", "grey", S(8) + 1.9), c("interés: por qué", "green", S(8) + 2.6)]
  ], { wt: "paso 1" });
  sc(S(9), S(11), "cg", [[S(9), "worry"], [S(10), "give"]], [
    [c("\"no hay presupuesto\"", "red", S(9) + 0.6), c("no perderte", "green", S(9) + 2.4)],
    [c("bono", "green", S(10) + 1.9), c("vacaciones", "green", S(10) + 2.5), c("home office", "green", S(10) + 3.1)]
  ], { wt: "tu aumento" });
  sc(S(11), S(12), "cg", [[S(11), "askHelp"], [S(11) + 1.6, "cheer"]], [
    [big("¿por qué es importante?", "orange", S(11) + 3.4)]
  ], { wt: "la pregunta mágica" });
  // 4 CRITERIOS JUSTOS
  sc(S(12), S(14), "cg", [[S(12), "point"], [S(13), "phone"]], [
    [c("paso 2", "orange", S(12) + 0.5), c("criterios objetivos", "green", S(12) + 1.1)],
    [p("house", S(13) + 1.9, { s: 0.4 }), c("rentas de tu zona", "green", S(13) + 2.5)]
  ], { wt: "paso 2" });
  sc(S(14), S(16), "cg", [[S(14), "calm"], [S(15), "think"]], [
    [c("tu palabra", "grey", S(14) + 0.6, { x: "strike" }), c("el mercado", "green", S(14) + 1.3)],
    [p("laptop", S(15) + 1.9, { s: 0.4 }), c("cuánto pagan por tu puesto", "green", S(15) + 2.5)]
  ], { wt: "tu renta y tu sueldo" });
  // 5 OPCIONES
  sc(S(16), S(18), "cg", [[S(16), "cheer"], [S(17), "look"]], [
    [c("paso 3", "orange", S(16) + 0.5), c("opciones donde los dos ganen", "green", S(16) + 1.1)],
    [p("building", S(17) + 1.9, { s: 0.4 }), c("el banco quiere cobrar", "orange", S(17) + 2.5)]
  ], { wt: "paso 3" });
  sc(S(18), S(20), "cg", [[S(18), "give"], [S(19), "think"]], [
    [c("plan de pagos", "green", S(18) + 0.7), c("tasa más baja", "green", S(18) + 1.4)],
    [c("1. todas las ideas", "grey", S(19) + 1.9), c("2. elige", "green", S(19) + 2.6)]
  ], { wt: "tus deudas" });
  // 6 PERSONA Y PROBLEMA
  sc(S(20), S(22), "cg", [[S(20), "calm"], [S(21), "point"]], [
    [c("paso 4", "orange", S(20) + 0.5), c("suave con la persona", "green", S(20) + 1.1), c("firme con el problema", "orange", S(20) + 1.8)],
    [p("car", S(21) + 1.9, { s: 0.4 }), c("amable, pero el precio justo", "green", S(21) + 2.5)]
  ], { wt: "paso 4" });
  sc(S(22), S(23), "cg", [[S(22), "worry"], [S(22) + 1.6, "slump"]], [
    [c("te enojas", "red", S(22) + 0.6)],
    [c("pelean entre ustedes", "red", S(22) + 3.5)]
  ], { wt: "el error" });
  // 7 TU MEJOR ALTERNATIVA
  sc(S(23), S(25), "cg", [[S(23), "cheer"], [S(24), "phone"]], [
    [big("tu mejor alternativa", "orange", S(23) + 0.9)],
    [c("sin nada en la mano", "red", S(24) + 1.9), c("con otra oferta", "green", S(24) + 2.6)]
  ], { wt: "tu arma secreta" });
  sc(S(25), S(27), "cg", [[S(25), "point"], [S(26), "think"]], [
    [p("door", S(25) + 0.6, { s: 0.4 }), c("levantarte = poder", "green", S(25) + 1.3)],
    [c("¿qué harás si dicen que no?", "orange", S(26) + 1.9)]
  ], { wt: "el poder" });
  // 8 LAS TRAMPAS
  sc(S(27), S(29), "cg", [[S(27), "worry"], [S(28), "calm"]], [
    [c("prisas falsas", "red", S(27) + 0.7), c("policía bueno y malo", "red", S(27) + 1.6)],
    [c("nómbralo con calma", "green", S(28) + 1.9)]
  ], { wt: "si juegan sucio" });
  sc(S(29), S(30), "cg", [[S(29), "shrug"], [S(29) + 1.6, "askHelp"]], [
    [c("no te defiendas", "grey", S(29) + 0.6)],
    [c("¿qué harías tú?", "green", S(29) + 3.4)]
  ], { wt: "si te atacan" });
  // 9 CIERRE
  sc(S(30), S(32), "cg", [[S(30), "give"], [S(31), "point"]], [
    [c("lo que necesitas", "green", S(30) + 0.6), c("sin romper la relación", "green", S(30) + 1.3)],
    [c("renta", "orange", S(31) + 1.9), c("celular", "orange", S(31) + 2.5), c("compra grande", "orange", S(31) + 3.1)]
  ], { wt: "esta semana" });
  sc(S(32), S(33), "cg", [[S(32), "calm"], [S(32) + 1.8, "think"]], [
    [c("contenido educativo", "grey", S(32) + 0.5)],
    [c("no es asesoría financiera ni legal", "grey", S(32) + 1.2)]
  ]);
  sc(S(33), END, "cg", [[S(33), "cheer"], [S(34), "point"]], [
    [c("guárdalo", "green", S(33) + 0.6)],
    [c("¿qué vas a negociar?", "orange", S(34) + 0.8)]
  ]);

  root.SCENES = SC;
})(window);

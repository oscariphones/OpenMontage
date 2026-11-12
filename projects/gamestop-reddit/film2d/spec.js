/* GameStop y Reddit (global) (Fábrica 2.0): the whole film as data. Times are REAL seconds of the narration (assets/audio/timeline.json).
 * No coordinates: scenes are grids (L: c = character cell, g = graphic cell) and items flow inside their cell.
 * Fábrica 2.0: 15 s hook with no windows; every scene changes pose; second poses leave ≥1.8 s before the next bullet (camera punch-in).
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

  // 1 GANCHO (sin ventanas)
  sc(0, S(1), "cg", [[S(0), "look"], [S(0) + 3.0, "point"]], []);
  sc(S(1), S(2), "cg", [[S(1), "cheer"], [S(1) + 2.4, "worry"]], []);
  sc(S(2), S(3), "cg", [[S(2), "phone"], [S(2) + 2.6, "give"]], []);
  // 2 DE QUÉ VA ESTO
  sc(S(3), S(4), "cg", [[S(3), "point"], [S(3) + 2.4, "cheer"]], [
    [p("phone", S(3) + 0.8, { s: 0.4 }), c("Reddit contra Wall Street", "orange", S(3) + 1.4)]
  ], { wt: "el tema de hoy" });
  sc(S(4), S(5), "cg", [[S(4), "worry"], [S(4) + 2.2, "slump"]], [
    [c("los que llegaron tarde", "red", S(4) + 0.7)]
  ], { wt: "y además" });
  // 3 SUSCRÍBETE (recordatorio obligatorio)
  sc(S(5), S(6), "cg", [[S(5), "point"], [S(5) + 2.0, "cheer"]], [
    [big("SUSCRÍBETE", "red", S(5) + 3.4, { x: "stamp" })]
  ], { wt: "antes de seguir" });
  sc(S(6), S(7), "cg", [[S(6), "sitRelaxed"], [S(6) + 1.8, "give"]], [
    [c("activa la campanita", "orange", S(6) + 0.6)]
  ], { wt: "cada semana" });
  sc(S(7), S(8), "cg", [[S(7), "calm"], [S(7) + 1.2, "point"]], []);
  // 4 LA TIENDA QUE IBA A MORIR
  sc(S(8), S(9), "cg", [[S(8), "look"], [S(8) + 2.2, "point"]], [
    [p("box", S(8) + 0.7, { s: 0.4 }), c("videojuegos en disco", "grey", S(8) + 1.3)]
  ], { wt: "GameStop" });
  sc(S(9), S(10), "cg", [[S(9), "worry"], [S(9) + 2.4, "slump"]], [
    [p("laptop", S(9) + 0.8, { s: 0.4 }), c("juegos por internet", "orange", S(9) + 1.4)],
    [c("tiendas vacías", "red", S(9) + 4.4)]
  ], { wt: "pero" });
  sc(S(10), S(11), "cg", [[S(10), "think"], [S(10) + 2.2, "shrug"]], [
    [c("va a quebrar", "red", S(10) + 0.7)]
  ], { wt: "los grandes inversionistas" });
  sc(S(11), S(12), "cg", [[S(11), "give"], [S(11) + 2.2, "point"]], [
    [w("stack", S(11) + 0.7, { sc: 0.4 }), c("apostaron a que caería", "orange", S(11) + 1.3)]
  ], { wt: "y apostaron" });
  // 5 APOSTAR A QUE ALGO BAJE
  sc(S(12), S(13), "cg", [[S(12), "point"], [S(12) + 2.4, "calm"]], [
    [big("venta en corto", "orange", S(12) + 0.8)]
  ], { wt: "se llama" });
  sc(S(13), S(14), "cg", [[S(13), "give"], [S(13) + 2.2, "point"]], [
    [c("1", "orange", S(13) + 0.7), c("pides prestada: $100", "grey", S(13) + 1.3)],
    [c("la vendes ya", "green", S(13) + 3.4)]
  ], { wt: "paso a paso" });
  sc(S(14), S(15), "cg", [[S(14), "cheer"], [S(14) + 2.4, "give"]], [
    [c("2", "orange", S(14) + 0.8), c("baja a $60", "grey", S(14) + 1.4)],
    [big("ganas $40", "green", S(14) + 4.4)]
  ], { wt: "si baja" });
  sc(S(15), S(16), "cg", [[S(15), "worry"], [S(15) + 2.2, "slump"]], [
    [c("si sube, compras más caro", "red", S(15) + 0.7)]
  ], { wt: "si sube" });
  sc(S(16), S(17), "cg", [[S(16), "slump"], [S(16) + 2.4, "worry"]], [
    [w("hill", S(16) + 0.8, { sc: 0.4 }), c("pérdida sin límite", "red", S(16) + 1.4)]
  ], { wt: "el peligro" });
  // 6 EL FORO DE REDDIT
  sc(S(17), S(18), "cg", [[S(17), "phone"], [S(17) + 2.0, "think"]], [
    [c("un foro de Reddit", "orange", S(17) + 0.7)]
  ], { wt: "en internet" });
  sc(S(18), S(19), "cg", [[S(18), "look"], [S(18) + 2.4, "point"]], [
    [c("apostadas a la baja", "red", S(18) + 0.8)],
    [c("más que las que existen", "orange", S(18) + 3.6)]
  ], { wt: "algo muy raro" });
  sc(S(19), S(20), "cg", [[S(19), "sitRelaxed"], [S(19) + 2.4, "give"]], [
    [c("la empresa vale más", "green", S(19) + 0.8)],
    [big("≈ $53,000", "green", S(19) + 4.6)]
  ], { wt: "un usuario" });
  sc(S(20), S(21), "cg", [[S(20), "cheer"], [S(20) + 2.4, "point"]], [
    [c("todos compramos", "green", S(20) + 0.8), sy("up", S(20) + 1.4, "green")],
    [c("los grandes pagan más caro", "orange", S(20) + 4.6)]
  ], { wt: "la idea" });
  // 7 LA EXPLOSIÓN
  sc(S(21), S(22), "cg", [[S(21), "point"], [S(21) + 1.6, "cheer"]], [
    [c("y pasó", "orange", S(21) + 0.6)]
  ], { wt: "después" });
  sc(S(22), S(23), "cg", [[S(22), "phone"], [S(22) + 2.4, "cheer"]], [
    [p("phone", S(22) + 0.8, { s: 0.4 }), c("miles compran", "green", S(22) + 1.4)],
    [w("bars", S(22) + 3.8, { sc: 0.4 }), c("sube sin parar", "green", S(22) + 4.4)]
  ], { wt: "la explosión" });
  sc(S(23), S(24), "cg", [[S(23), "worry"], [S(23) + 2.4, "slump"]], [
    [c("tienen que comprar", "red", S(23) + 0.8)],
    [c("y sube todavía más", "orange", S(23) + 4.6)]
  ], { wt: "los fondos" });
  sc(S(24), S(25), "cg", [[S(24), "shrug"], [S(24) + 2.2, "worry"]], [
    [c("todos quieren salir", "red", S(24) + 0.8)]
  ], { wt: "una estampida" });
  sc(S(25), S(26), "cg", [[S(25), "slump"], [S(25) + 2.4, "worry"]], [
    [c("Melvin Capital", "grey", S(25) + 0.8)],
    [big("-50 % en un mes", "red", S(25) + 3.6)]
  ], { wt: "un fondo" });
  // 8 EL BOTÓN DE COMPRAR DESAPARECE
  sc(S(26), S(27), "cg", [[S(26), "look"], [S(26) + 1.6, "worry"]], [
    [c("algo enfureció a todos", "red", S(26) + 0.6)]
  ], { wt: "entonces" });
  sc(S(27), S(28), "cg", [[S(27), "phone"], [S(27) + 2.4, "shrug"]], [
    [c("comprar", "grey", S(27) + 0.8, { x: "strike" })],
    [c("Robinhood lo bloqueó", "red", S(27) + 4.2)]
  ], { wt: "el botón" });
  sc(S(28), S(29), "cg", [[S(28), "slump"], [S(28) + 2.2, "worry"]], [
    [c("solo vender", "red", S(28) + 0.7), sy("down", S(28) + 1.3, "red")]
  ], { wt: "se desplomó" });
  sc(S(29), S(30), "cg", [[S(29), "shrug"], [S(29) + 2.4, "point"]], [
    [c("dinero de garantía", "grey", S(29) + 0.8)],
    [c("¿juego arreglado?", "red", S(29) + 4.6)]
  ], { wt: "la excusa" });
  sc(S(30), S(31), "cg", [[S(30), "calm"], [S(30) + 2.2, "think"]], [
    [p("building", S(30) + 0.7, { s: 0.4 }), c("el Congreso", "orange", S(30) + 1.3)]
  ], { wt: "al final" });
  // 9 QUIÉN GANÓ Y QUIÉN PERDIÓ
  sc(S(31), S(32), "cg", [[S(31), "cheer"], [S(31) + 2.2, "give"]], [
    [c("compraron temprano", "green", S(31) + 0.7), c("vendieron a tiempo", "green", S(31) + 1.3)]
  ], { wt: "ganaron" });
  sc(S(32), S(33), "cg", [[S(32), "point"], [S(32) + 2.4, "cheer"]], [
    [c("de $53,000", "grey", S(32) + 0.8)],
    [big("a decenas de millones", "green", S(32) + 3.8)]
  ], { wt: "en papel" });
  sc(S(33), S(34), "cg", [[S(33), "slump"], [S(33) + 2.4, "worry"]], [
    [c("compraron en la cima", "red", S(33) + 0.8)],
    [c("perdieron mucho", "red", S(33) + 4.0)]
  ], { wt: "perdieron" });
  sc(S(34), S(35), "cg", [[S(34), "think"], [S(34) + 2.2, "point"]], [
    [c("alguien vende caro", "green", S(34) + 0.7), c("alguien compra caro", "red", S(34) + 1.4)]
  ], { wt: "la regla" });
  // 10 LO QUE TE ENSEÑA
  sc(S(35), S(36), "cg", [[S(35), "think"], [S(35) + 1.0, "point"]], []);
  sc(S(36), S(37), "cg", [[S(36), "point"], [S(36) + 2.4, "worry"]], [
    [c("1", "orange", S(36) + 0.8), c("si todos hablan, ya es tarde", "red", S(36) + 1.4)]
  ], { wt: "lección 1" });
  sc(S(37), S(38), "cg", [[S(37), "cheer"], [S(37) + 2.0, "slump"]], [
    [c("2", "orange", S(37) + 0.7), c("sube rápido, baja rápido", "orange", S(37) + 1.3)]
  ], { wt: "lección 2" });
  sc(S(38), S(39), "cg", [[S(38), "give"], [S(38) + 2.4, "think"]], [
    [c("3", "orange", S(38) + 0.8), c("solo lo que puedes perder", "green", S(38) + 1.4)]
  ], { wt: "lección 3" });
  // 11 LA LECCIÓN
  sc(S(39), S(40), "cg", [[S(39), "point"], [S(39) + 2.4, "shrug"]], [
    [c("el mercado es una multitud", "orange", S(39) + 0.8)],
    [c("va en cualquier dirección", "red", S(39) + 4.2)]
  ], { wt: "la lección" });
  sc(S(40), S(41), "cg", [[S(40), "calm"], [S(40) + 2.2, "give"]], [
    [c("calma", "green", S(40) + 0.7), c("emoción", "red", S(40) + 1.4, { x: "strike" })]
  ], { wt: "gana la calma" });
  // 12 CIERRE
  sc(S(41), S(42), "cg", [[S(41), "cheer"], [S(41) + 2.4, "worry"]], [
    [c("la gente mueve el mercado", "green", S(41) + 0.8)],
    [c("y puede salir lastimada", "red", S(41) + 4.2)]
  ], { wt: "GameStop demostró" });
  sc(S(42), S(43), "cg", [[S(42), "calm"], [S(42) + 2.2, "look"]], [
    [c("contenido educativo", "grey", S(42) + 0.7)],
    [c("no es asesoría financiera", "orange", S(42) + 3.8)]
  ], { wt: "aviso" });
  sc(S(43), END, "cg", [[S(43), "cheer"], [S(43) + 2.4, "give"]], [
    [c("¿tú habrías comprado?", "orange", S(43) + 0.7)],
    [c("cuéntame en comentarios", "green", S(43) + 4.4)]
  ], { wt: "tu turno" });

  root.SCENES = SC;
})(window);

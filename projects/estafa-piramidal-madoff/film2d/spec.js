/* Cómo funciona una estafa piramidal: la historia de Madoff (global) (Fábrica 2.0): the whole film as data. Times are REAL seconds of the narration (assets/audio/timeline.json).
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
  sc(0, S(1), "cg", [[S(0), "give"], [S(0) + 3.2, "cheer"]], []);
  sc(S(1), S(2), "cg", [[S(1), "worry"], [S(1) + 3.4, "slump"]], []);
  sc(S(2), S(3), "cg", [[S(2), "point"], [S(2) + 2.6, "think"]], []);
  // 2 DE QUÉ VA ESTO
  sc(S(3), S(4), "cg", [[S(3), "look"], [S(3) + 2.4, "point"]], [
    [c("el truco, con un ejemplo", "green", S(3) + 0.8)],
    [c("la estafa más grande", "red", S(3) + 4.8)]
  ], { wt: "el tema de hoy" });
  sc(S(4), S(5), "cg", [[S(4), "think"], [S(4) + 1.8, "give"]], [
    [c("las señales", "orange", S(4) + 0.6)]
  ], { wt: "al final" });
  // 3 SUSCRÍBETE (recordatorio obligatorio)
  sc(S(5), S(6), "cg", [[S(5), "point"], [S(5) + 1.8, "cheer"]], [
    [big("SUSCRÍBETE", "red", S(5) + 3.8, { x: "stamp" })]
  ], { wt: "antes de seguir" });
  sc(S(6), S(7), "cg", [[S(6), "sitRelaxed"], [S(6) + 1.6, "give"]], [
    [c("activa la campanita", "orange", S(6) + 0.6)]
  ], { wt: "cada semana" });
  sc(S(7), S(8), "cg", [[S(7), "calm"], [S(7) + 1.4, "point"]], []);
  // 4 EL TRUCO
  sc(S(8), S(9), "cg", [[S(8), "give"], [S(8) + 2.4, "point"]], [
    [c("me das $1,000", "orange", S(8) + 0.8), sy("arrow", S(8) + 1.4, "grey"), c("te doy $1,200", "green", S(8) + 2.0)]
  ], { wt: "imagina" });
  sc(S(9), S(10), "cg", [[S(9), "think"], [S(9) + 2.4, "cheer"]], [
    [c("desconfías", "grey", S(9) + 0.8)],
    [w("coin", S(9) + 4.0, { sc: 0.4 }), c("y sí te pago", "green", S(9) + 4.6)]
  ], { wt: "al mes" });
  sc(S(10), S(11), "cg", [[S(10), "cheer"], [S(10) + 1.8, "give"]], [
    [c("más dinero", "green", S(10) + 0.6), c("más amigos", "green", S(10) + 1.2)]
  ], { wt: "te emocionas" });
  sc(S(11), S(12), "cg", [[S(11), "shrug"], [S(11) + 2.2, "worry"]], [
    [c("nunca invertí nada", "red", S(11) + 0.7)],
    [c("$200 de otra persona", "red", S(11) + 3.8)]
  ], { wt: "la verdad" });
  sc(S(12), S(13), "cg", [[S(12), "point"], [S(12) + 2.2, "slump"]], [
    [c("los nuevos", "orange", S(12) + 0.7), sy("arrow", S(12) + 1.3, "grey"), c("pagan a los primeros", "red", S(12) + 1.9)]
  ], { wt: "estafa piramidal" });
  // 5 POR QUÉ SIEMPRE SE CAE
  sc(S(13), S(14), "cg", [[S(13), "look"], [S(13) + 2.0, "think"]], [
    [w("blocks", S(13) + 0.7, { sc: 0.4 }), c("cada vez más gente", "orange", S(13) + 1.3)]
  ], { wt: "el problema" });
  sc(S(14), S(15), "cg", [[S(14), "worry"], [S(14) + 2.4, "slump"]], [
    [c("entran menos", "red", S(14) + 0.8), c("quieren salir más", "red", S(14) + 1.4)],
    [c("se acaba de golpe", "red", S(14) + 4.4)]
  ], { wt: "cuando" });
  sc(S(15), S(16), "cg", [[S(15), "slump"], [S(15) + 2.2, "shrug"]], [
    [c("los últimos pierden casi todo", "red", S(15) + 0.7)]
  ], { wt: "y son la mayoría" });
  sc(S(16), S(17), "cg", [[S(16), "point"], [S(16) + 2.4, "think"]], [
    [c("siempre caen", "red", S(16) + 0.8)],
    [p("clock", S(16) + 3.8, { s: 0.4 }), c("¿cuándo?", "orange", S(16) + 4.4)]
  ], { wt: "por eso" });
  // 6 CHARLES PONZI
  sc(S(17), S(18), "cg", [[S(17), "look"], [S(17) + 2.0, "point"]], [
    [c("esquema Ponzi", "orange", S(17) + 0.7)]
  ], { wt: "otro nombre" });
  sc(S(18), S(19), "cg", [[S(18), "cheer"], [S(18) + 2.4, "give"]], [
    [p("calendar", S(18) + 0.8, { s: 0.4 }), c("1920", "grey", S(18) + 1.4)],
    [big("50 % en 45 días", "orange", S(18) + 4.4)]
  ], { wt: "Charles Ponzi" });
  sc(S(19), S(20), "cg", [[S(19), "give"], [S(19) + 2.2, "think"]], [
    [c("miles de ahorradores", "orange", S(19) + 0.7)],
    [w("doc", S(19) + 3.4, { sc: 0.4 }), c("preguntan los periódicos", "grey", S(19) + 4.0)]
  ], { wt: "hasta que" });
  sc(S(20), S(21), "cg", [[S(20), "slump"], [S(20) + 2.0, "shrug"]], [
    [c("Ponzi, a la cárcel", "red", S(20) + 0.7)]
  ], { wt: "en pocos meses" });
  // 7 BERNIE MADOFF
  sc(S(21), S(22), "cg", [[S(21), "point"], [S(21) + 2.0, "look"]], [
    [big("Bernie Madoff", "red", S(21) + 2.6)]
  ], { wt: "casi 90 años después" });
  sc(S(22), S(23), "cg", [[S(22), "calm"], [S(22) + 2.6, "cheer"]], [
    [p("building", S(22) + 0.8, { s: 0.4 }), c("respetado en Wall Street", "green", S(22) + 1.4)],
    [c("presidió el Nasdaq", "green", S(22) + 5.4)]
  ], { wt: "no parecía estafador" });
  sc(S(23), S(24), "cg", [[S(23), "give"], [S(23) + 2.4, "point"]], [
    [c("nada de ganancias locas", "grey", S(23) + 0.8)],
    [big("≈ 10-12 % al año", "green", S(23) + 4.8)]
  ], { wt: "lo que prometía" });
  sc(S(24), S(25), "cg", [[S(24), "cheer"], [S(24) + 2.2, "sitRelaxed"]], [
    [c("entrar era un privilegio", "orange", S(24) + 0.7)]
  ], { wt: "no aceptaba a cualquiera" });
  sc(S(25), S(26), "cg", [[S(25), "look"], [S(25) + 2.0, "point"]], [
    [c("bancos", "orange", S(25) + 0.7), c("fundaciones", "orange", S(25) + 1.3), c("Hollywood", "orange", S(25) + 1.9)]
  ], { wt: "sus clientes" });
  // 8 LA CAÍDA
  sc(S(26), S(27), "cg", [[S(26), "worry"], [S(26) + 1.4, "slump"]], [
    [c("la crisis de 2008", "red", S(26) + 0.6)]
  ], { wt: "todo se vino abajo" });
  sc(S(27), S(28), "cg", [[S(27), "shrug"], [S(27) + 2.4, "worry"]], [
    [c("todos piden su dinero", "orange", S(27) + 0.8)],
    [c("ya no hay suficiente", "red", S(27) + 4.2)]
  ], { wt: "al mismo tiempo" });
  sc(S(28), S(29), "cg", [[S(28), "slump"], [S(28) + 2.4, "point"]], [
    [c("confiesa a sus hijos", "red", S(28) + 0.8)],
    [c("ellos lo denuncian", "orange", S(28) + 4.6)]
  ], { wt: "diciembre de 2008" });
  sc(S(29), S(30), "cg", [[S(29), "slump"], [S(29) + 2.2, "calm"]], [
    [big("150 años", "red", S(29) + 0.7)]
  ], { wt: "la condena" });
  // 9 POR QUÉ CAE GENTE LISTA
  sc(S(30), S(31), "cg", [[S(30), "think"], [S(30) + 1.2, "shrug"]], [
    [c("¿gente inteligente?", "orange", S(30) + 0.5)]
  ], { wt: "la pregunta" });
  sc(S(31), S(32), "cg", [[S(31), "phone"], [S(31) + 2.4, "cheer"]], [
    [w("statement", S(31) + 0.8, { sc: 0.4 }), c("ganancias en papel", "green", S(31) + 1.4)],
    [c("podían sacar dinero", "green", S(31) + 4.8)]
  ], { wt: "razón 1" });
  sc(S(32), S(33), "cg", [[S(32), "give"], [S(32) + 2.4, "look"]], [
    [c("amigos", "green", S(32) + 0.8), c("familia", "green", S(32) + 1.4), c("comunidad", "green", S(32) + 2.0)]
  ], { wt: "razón 2: confianza" });
  sc(S(33), S(34), "cg", [[S(33), "shrug"], [S(33) + 2.2, "worry"]], [
    [c("nadie pregunta si va ganando", "red", S(33) + 0.7)]
  ], { wt: "razón 3" });
  // 10 LAS SEÑALES
  sc(S(34), S(35), "cg", [[S(34), "phone"], [S(34) + 2.4, "point"]], [
    [c("criptomonedas", "orange", S(34) + 0.8), c("negocios por internet", "orange", S(34) + 1.4)],
    [c("grupos en redes", "orange", S(34) + 5.0)]
  ], { wt: "hoy se disfrazan" });
  sc(S(35), S(36), "cg", [[S(35), "think"], [S(35) + 1.2, "look"]], [
    [c("las mismas señales", "red", S(35) + 0.5)]
  ], { wt: "pero" });
  sc(S(36), S(37), "cg", [[S(36), "point"], [S(36) + 2.2, "worry"]], [
    [c("1", "orange", S(36) + 0.7), c("mucho y sin riesgo", "red", S(36) + 1.3)]
  ], { wt: "señal 1" });
  sc(S(37), S(38), "cg", [[S(37), "give"], [S(37) + 2.2, "shrug"]], [
    [c("2", "orange", S(37) + 0.7), c("ganancias siempre iguales", "red", S(37) + 1.3)]
  ], { wt: "señal 2" });
  sc(S(38), S(39), "cg", [[S(38), "worry"], [S(38) + 2.2, "point"]], [
    [c("3", "orange", S(38) + 0.7), c("trae a más personas", "red", S(38) + 1.3)]
  ], { wt: "señal 3" });
  sc(S(39), S(40), "cg", [[S(39), "shrug"], [S(39) + 2.2, "think"]], [
    [c("4", "orange", S(39) + 0.7), c("¿de dónde sale el dinero?", "red", S(39) + 1.3)]
  ], { wt: "señal 4" });
  // 11 LA LECCIÓN
  sc(S(40), S(41), "cg", [[S(40), "point"], [S(40) + 2.4, "worry"]], [
    [c("no entiendes la ganancia", "orange", S(40) + 0.8)],
    [big("la ganancia eres tú", "red", S(40) + 4.6)]
  ], { wt: "la lección" });
  sc(S(41), S(42), "cg", [[S(41), "give"], [S(41) + 2.2, "calm"]], [
    [w("doc", S(41) + 0.7, { sc: 0.4 }), c("revisa que esté autorizada", "green", S(41) + 1.3)]
  ], { wt: "antes de invertir" });
  // 12 CIERRE
  sc(S(42), S(43), "cg", [[S(42), "calm"], [S(42) + 2.2, "point"]], [
    [c("demasiado bueno = peligro", "red", S(42) + 0.7)]
  ], { wt: "ahora ya sabes" });
  sc(S(43), S(44), "cg", [[S(43), "calm"], [S(43) + 2.2, "look"]], [
    [c("contenido educativo", "grey", S(43) + 0.7)],
    [c("no es asesoría financiera", "orange", S(43) + 3.8)]
  ], { wt: "aviso" });
  sc(S(44), END, "cg", [[S(44), "cheer"], [S(44) + 2.2, "give"]], [
    [c("¿te ofrecieron algo así?", "orange", S(44) + 0.7)],
    [c("cuéntame en comentarios", "green", S(44) + 3.6)]
  ], { wt: "tu turno" });

  root.SCENES = SC;
})(window);

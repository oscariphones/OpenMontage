/* Blockbuster y Netflix (global) (Fábrica 2.0): the whole film as data. Times are REAL seconds of the narration (assets/audio/timeline.json).
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
  sc(0, S(1), "cg", [[S(0), "give"], [S(0) + 3.0, "point"]], []);
  sc(S(1), S(2), "cg", [[S(1), "cheer"], [S(1) + 2.2, "shrug"]], []);
  sc(S(2), S(3), "cg", [[S(2), "worry"], [S(2) + 2.0, "slump"]], []);
  // 2 DE QUÉ VA ESTO
  sc(S(3), S(4), "cg", [[S(3), "look"], [S(3) + 2.2, "point"]], [
    [p("building", S(3) + 0.7, { s: 0.4 }), c("un gigante que desapareció", "red", S(3) + 1.3)]
  ], { wt: "el tema de hoy" });
  sc(S(4), S(5), "cg", [[S(4), "think"], [S(4) + 1.8, "give"]], [
    [c("tu dinero", "green", S(4) + 0.6), c("tu trabajo", "green", S(4) + 1.2)]
  ], { wt: "lo que te enseña" });
  // 3 SUSCRÍBETE (recordatorio obligatorio)
  sc(S(5), S(6), "cg", [[S(5), "point"], [S(5) + 2.0, "cheer"]], [
    [big("SUSCRÍBETE", "red", S(5) + 4.0, { x: "stamp" })]
  ], { wt: "antes de seguir" });
  sc(S(6), S(7), "cg", [[S(6), "sitRelaxed"], [S(6) + 1.8, "give"]], [
    [c("historias reales de negocios", "green", S(6) + 0.6)]
  ], { wt: "cada semana" });
  sc(S(7), S(8), "cg", [[S(7), "calm"], [S(7) + 1.2, "point"]], []);
  // 4 EL GIGANTE
  sc(S(8), S(9), "cg", [[S(8), "look"], [S(8) + 1.8, "cheer"]], [
    [p("calendar", S(8) + 0.6, { s: 0.4 }), c("los noventa", "orange", S(8) + 1.2)]
  ], { wt: "¿te acuerdas?" });
  sc(S(9), S(10), "cg", [[S(9), "sitRelaxed"], [S(9) + 2.4, "cheer"]], [
    [p("tv", S(9) + 0.8, { s: 0.4 }), c("viernes de película", "green", S(9) + 1.4)],
    [c("rentar para el fin de semana", "grey", S(9) + 4.8)]
  ], { wt: "el plan" });
  sc(S(10), S(11), "cg", [[S(10), "point"], [S(10) + 2.2, "give"]], [
    [big("≈ 9,000 tiendas", "green", S(10) + 0.7)]
  ], { wt: "en su mejor momento" });
  sc(S(11), S(12), "cg", [[S(11), "calm"], [S(11) + 1.8, "shrug"]], [
    [c("¿caerse? imposible", "orange", S(11) + 0.6)]
  ], { wt: "parecía" });
  // 5 EL SECRETO DE LAS MULTAS
  sc(S(12), S(13), "cg", [[S(12), "think"], [S(12) + 1.8, "worry"]], [
    [c("un secreto molesto", "orange", S(12) + 0.6)]
  ], { wt: "pero" });
  sc(S(13), S(14), "cg", [[S(13), "worry"], [S(13) + 2.2, "slump"]], [
    [p("clock", S(13) + 0.7, { s: 0.4 }), c("regresas tarde: multa", "red", S(13) + 1.3)]
  ], { wt: "las multas" });
  sc(S(14), S(15), "cg", [[S(14), "cheer"], [S(14) + 2.2, "point"]], [
    [w("stack", S(14) + 0.7, { sc: 0.4 }), big("≈ $800 millones", "green", S(14) + 1.3)]
  ], { wt: "en el año 2000" });
  sc(S(15), S(16), "cg", [[S(15), "shrug"], [S(15) + 2.2, "worry"]], [
    [c("ganar enojando a sus clientes", "red", S(15) + 0.7)]
  ], { wt: "o sea" });
  sc(S(16), S(17), "cg", [[S(16), "point"], [S(16) + 1.6, "look"]], [
    [c("el punto débil", "red", S(16) + 0.6)]
  ], { wt: "y justo ahí" });
  // 6 LA IDEA DE NETFLIX
  sc(S(17), S(18), "cg", [[S(17), "worry"], [S(17) + 2.4, "think"]], [
    [c("Reed Hastings", "orange", S(17) + 0.8)],
    [c("una multa grande", "red", S(17) + 4.4)]
  ], { wt: "cuenta la historia" });
  sc(S(18), S(19), "cg", [[S(18), "shrug"], [S(18) + 2.4, "cheer"]], [
    [c("se discute la historia", "grey", S(18) + 0.8)],
    [big("sin multas", "green", S(18) + 4.2)]
  ], { wt: "la idea" });
  sc(S(19), S(20), "cg", [[S(19), "give"], [S(19) + 2.4, "cheer"]], [
    [p("envelope", S(19) + 0.8, { s: 0.4 }), c("películas por correo", "green", S(19) + 1.4)],
    [c("cuota al mes", "green", S(19) + 5.0)]
  ], { wt: "Netflix" });
  sc(S(20), S(21), "cg", [[S(20), "slump"], [S(20) + 2.2, "think"]], [
    [c("perdía dinero", "red", S(20) + 0.7)],
    [c("buscaron vender", "orange", S(20) + 3.8)]
  ], { wt: "al principio" });
  // 7 LA REUNIÓN
  sc(S(21), S(22), "cg", [[S(21), "point"], [S(21) + 2.0, "give"]], [
    [big("$50 millones", "orange", S(21) + 2.6)]
  ], { wt: "la reunión" });
  sc(S(22), S(23), "cg", [[S(22), "cheer"], [S(22) + 1.8, "shrug"]], [
    [c("pequeñito y sin futuro", "grey", S(22) + 0.6)]
  ], { wt: "dijeron que no" });
  sc(S(23), S(24), "cg", [[S(23), "calm"], [S(23) + 2.2, "think"]], [
    [c("ganaba muchísimo con tiendas", "green", S(23) + 0.7)]
  ], { wt: "tenía sentido" });
  sc(S(24), S(25), "cg", [[S(24), "worry"], [S(24) + 2.4, "slump"]], [
    [c("lo que funciona hoy", "orange", S(24) + 0.8)],
    [c("no deja ver mañana", "red", S(24) + 3.6)]
  ], { wt: "el problema" });
  // 8 EL ÚLTIMO INTENTO
  sc(S(25), S(26), "cg", [[S(25), "look"], [S(25) + 2.4, "point"]], [
    [c("servicio por internet", "green", S(25) + 0.8)],
    [c("sin multas", "green", S(25) + 4.6)]
  ], { wt: "años después" });
  sc(S(26), S(27), "cg", [[S(26), "cheer"], [S(26) + 2.0, "give"]], [
    [c("le quita clientes a Netflix", "green", S(26) + 0.7)]
  ], { wt: "le va bien" });
  sc(S(27), S(28), "cg", [[S(27), "shrug"], [S(27) + 2.2, "worry"]], [
    [c("sin multas: menos dinero", "red", S(27) + 0.7)]
  ], { wt: "a los dueños no les gustó" });
  sc(S(28), S(29), "cg", [[S(28), "slump"], [S(28) + 1.8, "shrug"]], [
    [c("otra vez a las tiendas", "red", S(28) + 0.6)]
  ], { wt: "nuevo director" });
  sc(S(29), S(30), "cg", [[S(29), "phone"], [S(29) + 2.2, "cheer"]], [
    [p("tv", S(29) + 0.7, { s: 0.4 }), c("películas por internet", "green", S(29) + 1.3)]
  ], { wt: "mientras tanto" });
  // 9 LA CAÍDA
  sc(S(30), S(31), "cg", [[S(30), "slump"], [S(30) + 1.4, "worry"]], [
    [big("QUIEBRA", "red", S(30) + 1.8, { x: "stamp" })]
  ], { wt: "en 2010" });
  sc(S(31), S(32), "cg", [[S(31), "worry"], [S(31) + 2.0, "shrug"]], [
    [c("tiendas cerrando, una por una", "red", S(31) + 0.7)]
  ], { wt: "después" });
  sc(S(32), S(33), "cg", [[S(32), "look"], [S(32) + 2.4, "cheer"]], [
    [p("door", S(32) + 0.8, { s: 0.4 }), c("queda una, en Oregón", "orange", S(32) + 1.4)],
    [c("como un museo", "grey", S(32) + 4.8)]
  ], { wt: "hoy" });
  sc(S(33), S(34), "cg", [[S(33), "cheer"], [S(33) + 2.2, "point"]], [
    [c("Netflix: de las más grandes", "green", S(33) + 0.7)]
  ], { wt: "y mientras" });
  // 10 LO QUE TE ENSEÑA
  sc(S(34), S(35), "cg", [[S(34), "think"], [S(34) + 1.0, "point"]], []);
  sc(S(35), S(36), "cg", [[S(35), "point"], [S(35) + 2.2, "give"]], [
    [c("1", "orange", S(35) + 0.7), c("sigue aprendiendo", "green", S(35) + 1.3)]
  ], { wt: "lección 1" });
  sc(S(36), S(37), "cg", [[S(36), "give"], [S(36) + 2.2, "think"]], [
    [c("2", "orange", S(36) + 0.7), c("más de una fuente de ingresos", "green", S(36) + 1.3)]
  ], { wt: "lección 2" });
  sc(S(37), S(38), "cg", [[S(37), "shrug"], [S(37) + 2.2, "point"]], [
    [c("3", "orange", S(37) + 0.7), c("enorme no es seguro", "red", S(37) + 1.3)]
  ], { wt: "lección 3" });
  sc(S(38), S(39), "cg", [[S(38), "worry"], [S(38) + 2.4, "think"]], [
    [c("4", "orange", S(38) + 0.8), c("multas y comisiones", "orange", S(38) + 1.4)],
    [c("el negocio de alguien más", "red", S(38) + 5.0)]
  ], { wt: "lección 4" });
  // 11 LA LECCIÓN
  sc(S(39), S(40), "cg", [[S(39), "point"], [S(39) + 2.4, "worry"]], [
    [c("mal negocio", "grey", S(39) + 0.8, { x: "strike" })],
    [c("uno que hoy va muy bien", "red", S(39) + 4.2)]
  ], { wt: "el mayor peligro" });
  sc(S(40), S(41), "cg", [[S(40), "think"], [S(40) + 1.8, "shrug"]], [
    [c("menos ganas de cambiar", "orange", S(40) + 0.6)]
  ], { wt: "cuando todo funciona" });
  // 12 CIERRE
  sc(S(41), S(42), "cg", [[S(41), "slump"], [S(41) + 2.0, "calm"]], [
    [c("la dejó ir por parecer pequeña", "orange", S(41) + 0.7)]
  ], { wt: "la oportunidad" });
  sc(S(42), S(43), "cg", [[S(42), "calm"], [S(42) + 2.2, "look"]], [
    [c("contenido educativo", "grey", S(42) + 0.7)],
    [c("no es asesoría financiera", "orange", S(42) + 3.8)]
  ], { wt: "aviso" });
  sc(S(43), END, "cg", [[S(43), "cheer"], [S(43) + 2.4, "give"]], [
    [c("¿tu película favorita?", "orange", S(43) + 0.7)],
    [c("cuéntame en comentarios", "green", S(43) + 4.4)]
  ], { wt: "tu turno" });

  root.SCENES = SC;
})(window);

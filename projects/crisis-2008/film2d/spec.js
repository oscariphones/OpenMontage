/* La crisis de 2008 explicada fácil (global) (Fábrica 2.0): the whole film as data. Times are REAL seconds of the narration (assets/audio/timeline.json).
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
  sc(0, S(1), "cg", [[S(0), "worry"], [S(0) + 2.4, "slump"]], []);
  sc(S(1), S(2), "cg", [[S(1), "cheer"], [S(1) + 2.6, "shrug"]], []);
  sc(S(2), S(3), "cg", [[S(2), "point"], [S(2) + 2.6, "think"]], []);
  // 2 DE QUÉ VA ESTO
  sc(S(3), S(4), "cg", [[S(3), "look"], [S(3) + 2.0, "point"]], [
    [p("calendar", S(3) + 0.7, { s: 0.4 }), c("la crisis de 2008", "red", S(3) + 1.3)]
  ], { wt: "el tema de hoy" });
  sc(S(4), S(5), "cg", [[S(4), "give"], [S(4) + 2.0, "cheer"]], [
    [c("paso a paso", "green", S(4) + 0.7), c("sin palabras difíciles", "green", S(4) + 1.3)]
  ], { wt: "como una historia" });
  // 3 SUSCRÍBETE (recordatorio obligatorio)
  sc(S(5), S(6), "cg", [[S(5), "point"], [S(5) + 1.6, "cheer"]], [
    [big("SUSCRÍBETE", "red", S(5) + 3.4, { x: "stamp" })]
  ], { wt: "antes de seguir" });
  sc(S(6), S(7), "cg", [[S(6), "sitRelaxed"], [S(6) + 2.2, "give"]], [
    [c("el dinero sin rollos", "green", S(6) + 0.7)],
    [c("activa la campanita", "orange", S(6) + 4.2)]
  ], { wt: "cada semana" });
  sc(S(7), S(8), "cg", [[S(7), "calm"], [S(7) + 1.2, "point"]], []);
  // 4 DINERO BARATO
  sc(S(8), S(9), "cg", [[S(8), "look"], [S(8) + 2.2, "shrug"]], [
    [p("calendar", S(8) + 0.7, { s: 0.4 }), c("año 2000", "grey", S(8) + 1.3)],
    [c("economía lenta", "orange", S(8) + 4.2)]
  ], { wt: "el comienzo" });
  sc(S(9), S(10), "cg", [[S(9), "point"], [S(9) + 2.4, "give"]], [
    [p("building", S(9) + 0.8, { s: 0.4 }), c("banco central", "grey", S(9) + 1.4)],
    [c("tasas muy bajas", "green", S(9) + 4.4)]
  ], { wt: "la solución" });
  sc(S(10), S(11), "cg", [[S(10), "cheer"], [S(10) + 2.4, "point"]], [
    [c("pedir prestado: barato", "green", S(10) + 0.8)],
    [p("house", S(10) + 4.2, { s: 0.4 }), c("todos compran casa", "green", S(10) + 4.8)]
  ], { wt: "eso significa" });
  sc(S(11), S(12), "cg", [[S(11), "give"], [S(11) + 2.2, "cheer"]], [
    [w("bars", S(11) + 0.7, { sc: 0.4 }), c("las casas suben y suben", "orange", S(11) + 1.3)]
  ], { wt: "con tantos compradores" });
  // 5 PRÉSTAMOS PARA CUALQUIERA
  sc(S(12), S(13), "cg", [[S(12), "point"], [S(12) + 2.2, "give"]], [
    [c("gran negocio", "green", S(12) + 0.7)],
    [c("prestarle a cualquiera", "orange", S(12) + 3.8)]
  ], { wt: "los bancos" });
  sc(S(13), S(14), "cg", [[S(13), "shrug"], [S(13) + 2.0, "worry"]], [
    [c("sin buen historial", "red", S(13) + 0.7), c("sin trabajo fijo", "red", S(13) + 1.3)]
  ], { wt: "les prestaban" });
  sc(S(14), S(15), "cg", [[S(14), "look"], [S(14) + 2.4, "point"]], [
    [big("préstamos ninja", "red", S(14) + 0.8)],
    [c("sin ingresos", "grey", S(14) + 4.2), c("sin trabajo", "grey", S(14) + 4.8), c("sin bienes", "grey", S(14) + 5.4)]
  ], { wt: "tenían un apodo" });
  sc(S(15), S(16), "cg", [[S(15), "think"], [S(15) + 1.8, "shrug"]], [
    [c("¿por qué prestarles?", "orange", S(15) + 0.6)]
  ], { wt: "la pregunta" });
  // 6 EL PAQUETE MÁGICO
  sc(S(16), S(17), "cg", [[S(16), "point"], [S(16) + 1.8, "give"]], [
    [c("no se quedaba el préstamo", "orange", S(16) + 0.6)]
  ], { wt: "porque" });
  sc(S(17), S(18), "cg", [[S(17), "give"], [S(17) + 2.2, "cheer"]], [
    [p("box", S(17) + 0.7, { s: 0.4 }), c("miles de créditos juntos", "orange", S(17) + 1.3)],
    [c("vendidos al mundo", "grey", S(17) + 4.2)]
  ], { wt: "el paquete" });
  sc(S(18), S(19), "cg", [[S(18), "think"], [S(18) + 2.4, "worry"]], [
    [c("manzanas buenas", "green", S(18) + 0.8), sy("plus", S(18) + 1.4, "grey"), c("podridas", "red", S(18) + 2.0)],
    [c("vendidas como frescas", "orange", S(18) + 4.8)]
  ], { wt: "imagina una canasta" });
  sc(S(19), S(20), "cg", [[S(19), "cheer"], [S(19) + 2.4, "point"]], [
    [w("coin", S(19) + 0.8, { sc: 0.4 }), c("cobraba su comisión", "green", S(19) + 1.4)],
    [c("y a buscar más clientes", "orange", S(19) + 4.8)]
  ], { wt: "el banco" });
  // 7 EL SELLO FALSO
  sc(S(20), S(21), "cg", [[S(20), "look"], [S(20) + 1.8, "point"]], [
    [c("necesitaban un sello", "orange", S(20) + 0.6)]
  ], { wt: "para vender" });
  sc(S(21), S(22), "cg", [[S(21), "give"], [S(21) + 2.2, "think"]], [
    [w("doc", S(21) + 0.7, { sc: 0.4 }), c("calificadoras", "grey", S(21) + 1.3)],
    [c("como un examen", "grey", S(21) + 4.0)]
  ], { wt: "quién califica" });
  sc(S(22), S(23), "cg", [[S(22), "shrug"], [S(22) + 2.4, "worry"]], [
    [c("las pagaban los bancos", "red", S(22) + 0.8)]
  ], { wt: "el problema" });
  sc(S(23), S(24), "cg", [[S(23), "slump"], [S(23) + 2.4, "shrug"]], [
    [c("deudas malas", "red", S(23) + 0.8)],
    [big("súper segura", "green", S(23) + 4.6, { x: "stamp" })]
  ], { wt: "la calificación" });
  // 8 LA FIESTA
  sc(S(24), S(25), "cg", [[S(24), "cheer"], [S(24) + 1.4, "give"]], [
    [c("todos felices", "green", S(24) + 0.5)]
  ], { wt: "unos años" });
  sc(S(25), S(26), "cg", [[S(25), "sitRelaxed"], [S(25) + 2.4, "cheer"]], [
    [p("house", S(25) + 0.8, { s: 0.4 }), c("familias con casa", "green", S(25) + 1.4)],
    [c("bancos", "green", S(25) + 4.4), c("inversionistas", "green", S(25) + 5.0)]
  ], { wt: "la fiesta" });
  sc(S(26), S(27), "cg", [[S(26), "point"], [S(26) + 2.2, "think"]], [
    [c("las casas nunca bajan", "orange", S(26) + 0.7)]
  ], { wt: "lo que todos creían" });
  sc(S(27), S(28), "cg", [[S(27), "worry"], [S(27) + 2.2, "look"]], [
    [w("blocks", S(27) + 0.7, { sc: 0.4 }), c("castillo de naipes", "red", S(27) + 1.3)]
  ], { wt: "la idea que sostenía todo" });
  // 9 CUANDO LAS CASAS BAJARON
  sc(S(28), S(29), "cg", [[S(28), "shrug"], [S(28) + 2.4, "worry"]], [
    [p("calendar", S(28) + 0.8, { s: 0.4 }), c("2006 - 2007", "grey", S(28) + 1.4)],
    [c("las casas bajan", "red", S(28) + 4.4)]
  ], { wt: "el cambio" });
  sc(S(29), S(30), "cg", [[S(29), "slump"], [S(29) + 2.2, "worry"]], [
    [c("no pueden pagar", "red", S(29) + 0.7)],
    [p("house", S(29) + 3.6, { s: 0.4 }), c("les quitan la casa", "red", S(29) + 4.2)]
  ], { wt: "mucha gente" });
  sc(S(30), S(31), "cg", [[S(30), "worry"], [S(30) + 2.4, "shrug"]], [
    [c("paquetes súper seguros", "green", S(30) + 0.8, { x: "strike" })],
    [c("deudas que nadie paga", "red", S(30) + 4.4)]
  ], { wt: "de pronto" });
  sc(S(31), S(32), "cg", [[S(31), "look"], [S(31) + 2.4, "think"]], [
    [c("vendidos por todo el mundo", "orange", S(31) + 0.8)],
    [c("¿quién tiene las podridas?", "red", S(31) + 4.6)]
  ], { wt: "el problema" });
  sc(S(32), S(33), "cg", [[S(32), "worry"], [S(32) + 2.0, "slump"]], [
    [c("ya no se prestan entre ellos", "red", S(32) + 0.7)]
  ], { wt: "los bancos, asustados" });
  // 10 EL DÍA QUE CAYÓ LEHMAN
  sc(S(33), S(34), "cg", [[S(33), "look"], [S(33) + 1.8, "worry"]], [
    [p("calendar", S(33) + 0.6, { s: 0.4 }), c("15 de septiembre de 2008", "red", S(33) + 1.2)]
  ], { wt: "el golpe más fuerte" });
  sc(S(34), S(35), "cg", [[S(34), "slump"], [S(34) + 2.4, "shrug"]], [
    [p("building", S(34) + 0.8, { s: 0.4 }), c("Lehman Brothers", "orange", S(34) + 1.4)],
    [big("QUEBRÓ", "red", S(34) + 4.6, { x: "stamp" })]
  ], { wt: "uno de los más grandes" });
  sc(S(35), S(36), "cg", [[S(35), "point"], [S(35) + 2.4, "shrug"]], [
    [c("la quiebra más grande", "red", S(35) + 0.8)],
    [c("sin rescate", "grey", S(35) + 4.4)]
  ], { wt: "en la historia" });
  sc(S(36), S(37), "cg", [[S(36), "worry"], [S(36) + 2.0, "look"]], [
    [c("pánico en todo el mundo", "red", S(36) + 0.7)]
  ], { wt: "al otro día" });
  // 11 EL MUNDO ENTERO
  sc(S(37), S(38), "cg", [[S(37), "slump"], [S(37) + 2.0, "worry"]], [
    [w("bars", S(37) + 0.6, { sc: 0.4 }), c("la bolsa: -50 %", "red", S(37) + 1.2)]
  ], { wt: "en Estados Unidos" });
  sc(S(38), S(39), "cg", [[S(38), "worry"], [S(38) + 2.4, "slump"]], [
    [p("house", S(38) + 0.8, { s: 0.4 }), c("millones sin casa", "red", S(38) + 1.4)],
    [c("desempleo ≈ 10 %", "red", S(38) + 4.4)]
  ], { wt: "las familias" });
  sc(S(39), S(40), "cg", [[S(39), "look"], [S(39) + 2.2, "shrug"]], [
    [c("bancos de Europa", "orange", S(39) + 0.7)],
    [c("se tambalean", "red", S(39) + 3.8)]
  ], { wt: "más allá" });
  sc(S(40), S(41), "cg", [[S(40), "shrug"], [S(40) + 2.0, "worry"]], [
    [c("Islandia", "orange", S(40) + 0.7), c("sus bancos se caen", "red", S(40) + 1.3)]
  ], { wt: "y hasta" });
  // 12 EL RESCATE
  sc(S(41), S(42), "cg", [[S(41), "give"], [S(41) + 2.4, "point"]], [
    [c("rescate a los bancos", "orange", S(41) + 0.8)],
    [big("$700 mil millones", "green", S(41) + 4.4)]
  ], { wt: "para evitar algo peor" });
  sc(S(42), S(43), "cg", [[S(42), "worry"], [S(42) + 2.4, "shrug"]], [
    [c("dinero de todos", "orange", S(42) + 0.8)],
    [c("para los culpables", "red", S(42) + 4.4)]
  ], { wt: "mucha gente se enojó" });
  sc(S(43), S(44), "cg", [[S(43), "point"], [S(43) + 2.4, "calm"]], [
    [w("doc", S(43) + 0.8, { sc: 0.4 }), c("reglas nuevas", "green", S(43) + 1.4)],
    [c("más dinero guardado", "green", S(43) + 5.0)]
  ], { wt: "después" });
  sc(S(44), S(45), "cg", [[S(44), "think"], [S(44) + 2.2, "shrug"]], [
    [p("calendar", S(44) + 0.7, { s: 0.4 }), c("≈ 6 años para recuperarse", "orange", S(44) + 1.3)]
  ], { wt: "aun así" });
  // 13 LA LECCIÓN
  sc(S(45), S(46), "cg", [[S(45), "point"], [S(45) + 2.4, "think"]], [
    [c("complicado", "orange", S(45) + 0.8), sy("neq", S(45) + 1.4, "grey"), c("seguro", "green", S(45) + 2.0)]
  ], { wt: "la gran lección" });
  sc(S(46), S(47), "cg", [[S(46), "think"], [S(46) + 2.4, "worry"]], [
    [c("¿no lo entiendes?", "orange", S(46) + 0.8)],
    [c("el riesgo está escondido", "red", S(46) + 5.0)]
  ], { wt: "cuidado" });
  sc(S(47), S(48), "cg", [[S(47), "give"], [S(47) + 2.4, "point"]], [
    [p("card", S(47) + 0.8, { s: 0.4 }), c("deuda demasiado fácil", "red", S(47) + 1.4)],
    [c("¿quién gana y quién pierde?", "orange", S(47) + 4.6)]
  ], { wt: "pregúntate" });
  // 14 CIERRE
  sc(S(48), S(49), "cg", [[S(48), "calm"], [S(48) + 2.4, "point"]], [
    [c("no fue una sola persona", "grey", S(48) + 0.8)],
    [c("se creyó invencible", "red", S(48) + 4.6)]
  ], { wt: "resumen" });
  sc(S(49), S(50), "cg", [[S(49), "calm"], [S(49) + 2.2, "look"]], [
    [c("contenido educativo", "grey", S(49) + 0.7)],
    [c("no es asesoría financiera", "orange", S(49) + 3.8)]
  ], { wt: "aviso" });
  sc(S(50), END, "cg", [[S(50), "cheer"], [S(50) + 2.4, "give"]], [
    [c("¿la sentiste tú?", "orange", S(50) + 0.7)],
    [c("cuéntame en comentarios", "green", S(50) + 4.4)]
  ], { wt: "tu turno" });

  root.SCENES = SC;
})(window);

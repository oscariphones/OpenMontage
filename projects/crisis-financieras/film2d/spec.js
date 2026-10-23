/* Crisis financieras (global con detalles de México) (Fábrica 2.0): the whole film as data. Times are REAL seconds of the narration (assets/audio/timeline.json).
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
  sc(0, S(1), "cg", [[S(0), "sitStress"], [S(0) + 2.6, "slump"]], []);
  sc(S(1), S(2), "cg", [[S(1), "think"], [S(1) + 2.4, "point"]], []);
  sc(S(2), S(3), "cg", [[S(2), "look"], [S(2) + 2.2, "cheer"]], []);
  // 2 DE QUÉ VA ESTO
  sc(S(3), S(4), "cg", [[S(3), "point"], [S(3) + 2.4, "look"]], [
    [c("flores en Holanda", "grey", S(3) + 0.8), sy("arrow", S(3) + 1.4, "grey"), c("error de diciembre", "orange", S(3) + 2.0)]
  ], { wt: "las crisis más famosas" });
  sc(S(4), S(5), "cg", [[S(4), "think"], [S(4) + 1.4, "give"]], [
    [big("la misma receta", "orange", S(4) + 0.6)]
  ], { wt: "spoiler" });
  // 3 SUSCRÍBETE (recordatorio obligatorio)
  sc(S(5), S(6), "cg", [[S(5), "point"], [S(5) + 2.4, "cheer"]], [
    [big("SUSCRÍBETE", "red", S(5) + 4.4, { x: "stamp" })]
  ], { wt: "antes de seguir" });
  sc(S(6), S(7), "cg", [[S(6), "sitRelaxed"], [S(6) + 2.2, "give"]], [
    [c("historias que cuidan tu dinero", "green", S(6) + 0.7)],
    [c("activa la campanita", "orange", S(6) + 3.8)]
  ], { wt: "cada semana" });
  sc(S(7), S(8), "cg", [[S(7), "calm"], [S(7) + 1.0, "look"]], []);
  // 4 LOS TULIPANES
  sc(S(8), S(9), "cg", [[S(8), "look"], [S(8) + 2.4, "cheer"]], [
    [big("1637", "orange", S(8) + 0.8), c("Holanda", "grey", S(8) + 1.4)],
    [c("tulipán = riqueza", "green", S(8) + 4.6)]
  ], { wt: "los tulipanes" });
  sc(S(9), S(10), "cg", [[S(9), "give"], [S(9) + 2.4, "point"]], [
    [w("doc", S(9) + 0.8, { sc: 0.4 }), c("papel: un tulipán en primavera", "orange", S(9) + 1.4)],
    [c("a precio fijo", "grey", S(9) + 4.6)]
  ], { wt: "el invento" });
  sc(S(10), S(11), "cg", [[S(10), "phone"], [S(10) + 2.2, "shrug"]], [
    [c("ya no compraban flores", "red", S(10) + 0.7)],
    [c("revendían papeles", "orange", S(10) + 3.6), sy("arrow", S(10) + 4.2, "orange")]
  ], { wt: "la fiebre" });
  sc(S(11), S(12), "cg", [[S(11), "cheer"], [S(11) + 2.4, "slump"]], [
    [p("house", S(11) + 0.8, { s: 0.4 }), c("un papel = una casa", "orange", S(11) + 1.4)],
    [c("nadie compra", "red", S(11) + 5.0), c("se desploma", "red", S(11) + 5.6)]
  ], { wt: "el pico" });
  sc(S(12), S(13), "cg", [[S(12), "think"], [S(12) + 2.4, "point"]], [
    [c("el país no se arruinó", "grey", S(12) + 0.8)],
    [c("lección 1: compras porque crees que subirá", "orange", S(12) + 5.0)]
  ], { wt: "la verdad" });
  // 5 EL CRAC DE 1929
  sc(S(13), S(14), "cg", [[S(13), "cheer"], [S(13) + 2.2, "look"]], [
    [c("años veinte", "grey", S(13) + 0.7), c("fiesta económica", "green", S(13) + 1.3)]
  ], { wt: "Estados Unidos" });
  sc(S(14), S(15), "cg", [[S(14), "phone"], [S(14) + 2.2, "give"]], [
    [w("bars", S(14) + 0.7, { sc: 0.4 }), c("la bolsa sube", "green", S(14) + 1.3)],
    [c("gente común compra", "orange", S(14) + 3.8)]
  ], { wt: "la bolsa" });
  sc(S(15), S(16), "cg", [[S(15), "worry"], [S(15) + 1.4, "point"]], [
    [c("con dinero prestado", "red", S(15) + 0.6, { x: "stamp" })]
  ], { wt: "el problema" });
  sc(S(16), S(17), "cg", [[S(16), "give"], [S(16) + 2.4, "think"]], [
    [c("tuyos: $10,000", "green", S(16) + 0.8), c("prestados: $90,000", "red", S(16) + 1.6)],
    [big("$100,000 en acciones", "orange", S(16) + 4.6)]
  ], { wt: "ejemplo" });
  sc(S(17), S(18), "cg", [[S(17), "sitStress"], [S(17) + 2.4, "slump"]], [
    [c("bajan 30 %", "red", S(17) + 0.8)],
    [c("pierdes tus $10,000", "red", S(17) + 4.2), c("y debes $20,000", "red", S(17) + 4.9)]
  ], { wt: "si bajan" });
  sc(S(18), S(19), "cg", [[S(18), "worry"], [S(18) + 2.4, "shrug"]], [
    [big("octubre 1929", "red", S(18) + 0.8)],
    [c("todos venden", "red", S(18) + 4.8), c("nadie compra", "red", S(18) + 5.4)]
  ], { wt: "el crac" });
  sc(S(19), S(20), "cg", [[S(19), "slump"], [S(19) + 2.4, "sitStress"]], [
    [p("building", S(19) + 0.8, { s: 0.4 }), c("miles de bancos quiebran", "red", S(19) + 1.4)],
    [c("1 de cada 4 sin trabajo", "red", S(19) + 4.8)]
  ], { wt: "las consecuencias" });
  // 6 LA CRISIS DE LAS CASAS
  sc(S(20), S(21), "cg", [[S(20), "look"], [S(20) + 1.4, "point"]], [
    [big("2008", "orange", S(20) + 0.6), p("house", S(20) + 1.2, { s: 0.4 })]
  ], { wt: "otra vez" });
  sc(S(21), S(22), "cg", [[S(21), "give"], [S(21) + 2.4, "think"]], [
    [c("préstamos a quien no podía pagar", "red", S(21) + 0.8)],
    [c("“las casas nunca bajan”", "orange", S(21) + 5.0)]
  ], { wt: "los bancos" });
  sc(S(22), S(23), "cg", [[S(22), "point"], [S(22) + 2.4, "phone"]], [
    [p("box", S(22) + 0.8, { s: 0.4 }), c("paquetes de préstamos", "orange", S(22) + 1.4)],
    [c("vendidos como seguros", "red", S(22) + 4.8)]
  ], { wt: "el truco" });
  sc(S(23), S(24), "cg", [[S(23), "calm"], [S(23) + 2.4, "worry"]], [
    [c("pagos bajitos al inicio", "green", S(23) + 0.8)],
    [c("luego suben", "red", S(23) + 4.4), c("millones dejan de pagar", "red", S(23) + 5.0)]
  ], { wt: "la trampa" });
  sc(S(24), S(25), "cg", [[S(24), "slump"], [S(24) + 2.4, "shrug"]], [
    [c("casas sin valor", "red", S(24) + 0.8), c("bancos gigantes quiebran", "red", S(24) + 1.6)],
    [c("crisis mundial", "red", S(24) + 4.8, { x: "stamp" })]
  ], { wt: "el derrumbe" });
  // 7 EL ERROR DE DICIEMBRE
  sc(S(25), S(26), "cg", [[S(25), "point"], [S(25) + 1.4, "look"]], [
    [c("la versión mexicana", "orange", S(25) + 0.6)]
  ], { wt: "en México" });
  sc(S(26), S(27), "cg", [[S(26), "cheer"], [S(26) + 2.4, "think"]], [
    [c("mucho dinero de fuera", "green", S(26) + 0.8)],
    [c("deudas en dólares", "red", S(26) + 5.0)]
  ], { wt: "principios de los noventa" });
  sc(S(27), S(28), "cg", [[S(27), "worry"], [S(27) + 2.4, "slump"]], [
    [big("diciembre 1994", "red", S(27) + 0.8)],
    [c("el peso pierde ~ la mitad", "red", S(27) + 5.4)]
  ], { wt: "la devaluación" });
  sc(S(28), S(29), "cg", [[S(28), "sitStress"], [S(28) + 2.4, "worry"]], [
    [c("tasas por las nubes", "red", S(28) + 0.8)],
    [p("house", S(28) + 4.4, { s: 0.4 }), p("car", S(28) + 4.9, { s: 0.4 }), p("card", S(28) + 5.4, { s: 0.4 })]
  ], { wt: "las familias" });
  sc(S(29), S(30), "cg", [[S(29), "shrug"], [S(29) + 2.4, "point"]], [
    [c("se contagia a otros países", "orange", S(29) + 0.8)],
    [big("efecto tequila", "orange", S(29) + 4.8)]
  ], { wt: "el contagio" });
  // 8 EL PATRÓN
  sc(S(30), S(31), "cg", [[S(30), "think"], [S(30) + 2.2, "point"]], [
    [big("3 ingredientes", "orange", S(30) + 0.7)]
  ], { wt: "la receta" });
  sc(S(31), S(32), "cg", [[S(31), "give"], [S(31) + 2.4, "cheer"]], [
    [c("1", "orange", S(31) + 0.8), c("“solo puede subir”", "orange", S(31) + 1.4)],
    [c("tulipanes", "grey", S(31) + 4.4), c("acciones", "grey", S(31) + 4.9), c("casas", "grey", S(31) + 5.4)]
  ], { wt: "ingrediente 1" });
  sc(S(32), S(33), "cg", [[S(32), "worry"], [S(32) + 2.4, "point"]], [
    [c("2", "orange", S(32) + 0.8), c("mucho dinero prestado", "red", S(32) + 1.4)]
  ], { wt: "ingrediente 2" });
  sc(S(33), S(34), "cg", [[S(33), "shrug"], [S(33) + 2.4, "look"]], [
    [c("3", "orange", S(33) + 0.8)],
    [big("“esta vez es diferente”", "red", S(33) + 3.6)]
  ], { wt: "ingrediente 3" });
  // 9 CÓMO PROTEGERTE
  sc(S(34), S(35), "cg", [[S(34), "cheer"], [S(34) + 2.2, "calm"]], [
    [p("shield", S(34) + 0.7, { s: 0.4 }), c("sí te puedes proteger", "green", S(34) + 1.3)]
  ], { wt: "buena noticia" });
  sc(S(35), S(36), "cg", [[S(35), "point"], [S(35) + 2.4, "give"]], [
    [c("sin dinero prestado", "green", S(35) + 0.8)],
    [c("fondo de emergencia", "green", S(35) + 4.0), c("no todo en una cosa", "green", S(35) + 4.8)]
  ], { wt: "3 reglas" });
  sc(S(36), S(37), "cg", [[S(36), "look"], [S(36) + 2.4, "worry"]], [
    [c("“te hará rico rapidísimo”", "red", S(36) + 0.8)],
    [c("más cuidado", "orange", S(36) + 5.0, { x: "stamp" })]
  ], { wt: "la señal" });
  // 10 CIERRE
  sc(S(37), S(38), "cg", [[S(37), "point"], [S(37) + 2.4, "think"]], [
    [c("no solo los bancos", "grey", S(37) + 0.8)],
    [c("también la emoción", "orange", S(37) + 4.8)]
  ], { wt: "resumen" });
  sc(S(38), S(39), "cg", [[S(38), "give"], [S(38) + 2.4, "cheer"]], [
    [c("la historia se repite", "orange", S(38) + 0.8)],
    [c("ya sabes las señales", "green", S(38) + 4.2)]
  ], { wt: "la lección" });
  sc(S(39), S(40), "cg", [[S(39), "shrug"], [S(39) + 2.2, "look"]], [
    [c("contenido educativo", "grey", S(39) + 0.7)],
    [c("no es asesoría financiera", "orange", S(39) + 3.6)]
  ], { wt: "aviso" });
  sc(S(40), END, "cg", [[S(40), "cheer"], [S(40) + 2.4, "give"]], [
    [c("¿qué crisis te tocó?", "orange", S(40) + 0.7)],
    [c("cuéntame en comentarios", "green", S(40) + 4.4)]
  ], { wt: "tu turno" });

  root.SCENES = SC;
})(window);

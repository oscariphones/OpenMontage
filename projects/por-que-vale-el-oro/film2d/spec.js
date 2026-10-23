/* Por qué vale el oro (global) (Fábrica 2.0): the whole film as data. Times are REAL seconds of the narration (assets/audio/timeline.json).
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
  sc(0, S(1), "cg", [[S(0), "point"], [S(0) + 2.6, "shrug"]], []);
  sc(S(1), S(2), "cg", [[S(1), "phone"], [S(1) + 2.4, "worry"]], []);
  sc(S(2), S(3), "cg", [[S(2), "think"], [S(2) + 2.2, "point"]], []);
  // 2 DE QUÉ VA ESTO
  sc(S(3), S(4), "cg", [[S(3), "look"], [S(3) + 2.2, "give"]], [
    [w("coin", S(3) + 0.7, { sc: 0.4 }), c("¿por qué vale tanto?", "orange", S(3) + 1.3)],
    [c("de dónde viene", "grey", S(3) + 3.8), c("para qué sirve", "grey", S(3) + 4.4)]
  ], { wt: "el oro" });
  sc(S(4), S(5), "cg", [[S(4), "worry"], [S(4) + 2.2, "think"]], [
    [c("crisis", "red", S(4) + 0.7), sy("arrow", S(4) + 1.3, "grey"), c("todos compran oro", "orange", S(4) + 1.9)]
  ], { wt: "y además" });
  // 3 SUSCRÍBETE (recordatorio obligatorio)
  sc(S(5), S(6), "cg", [[S(5), "point"], [S(5) + 2.4, "cheer"]], [
    [big("SUSCRÍBETE", "red", S(5) + 4.4, { x: "stamp" })]
  ], { wt: "antes de seguir" });
  sc(S(6), S(7), "cg", [[S(6), "sitRelaxed"], [S(6) + 2.2, "give"]], [
    [c("misterios del dinero", "green", S(6) + 0.7)],
    [c("activa la campanita", "orange", S(6) + 3.6)]
  ], { wt: "cada semana" });
  sc(S(7), S(8), "cg", [[S(7), "calm"], [S(7) + 1.0, "look"]], []);
  // 4 DE DÓNDE VIENE
  sc(S(8), S(9), "cg", [[S(8), "look"], [S(8) + 1.4, "cheer"]], [
    [c("vino del espacio", "orange", S(8) + 0.6)]
  ], { wt: "origen" });
  sc(S(9), S(10), "cg", [[S(9), "point"], [S(9) + 2.4, "think"]], [
    [c("choques de estrellas", "orange", S(9) + 0.8)],
    [c("metales por el universo", "grey", S(9) + 4.4)]
  ], { wt: "cómo nació" });
  sc(S(10), S(11), "cg", [[S(10), "give"], [S(10) + 2.4, "look"]], [
    [c("agua muy caliente", "red", S(10) + 0.8), sy("arrow", S(10) + 1.4, "grey"), c("vetas de oro", "orange", S(10) + 2.0)]
  ], { wt: "bajo la tierra" });
  sc(S(11), S(12), "cg", [[S(11), "calm"], [S(11) + 2.2, "point"]], [
    [c("lluvia y ríos", "grey", S(11) + 0.7)],
    [c("pedacitos río abajo", "orange", S(11) + 3.6)]
  ], { wt: "a la superficie" });
  // 5 NO SE ARRUINA
  sc(S(12), S(13), "cg", [[S(12), "cheer"], [S(12) + 2.2, "point"]], [
    [c("no se oxida", "green", S(12) + 0.7), c("no se echa a perder", "green", S(12) + 1.3)]
  ], { wt: "razón 1" });
  sc(S(13), S(14), "cg", [[S(13), "look"], [S(13) + 2.2, "give"]], [
    [w("coin", S(13) + 0.7, { sc: 0.4 }), c("2,000 años", "orange", S(13) + 1.3)],
    [c("sigue brillando", "green", S(13) + 3.8)]
  ], { wt: "para siempre" });
  sc(S(14), S(15), "cg", [[S(14), "think"], [S(14) + 2.2, "calm"]], [
    [c("casi todo el oro de la historia", "grey", S(14) + 0.7)],
    [c("sigue existiendo", "green", S(14) + 3.6)]
  ], { wt: "por eso" });
  // 6 PARA QUÉ SE USA
  sc(S(15), S(16), "cg", [[S(15), "point"], [S(15) + 2.2, "look"]], [
    [w("bars", S(15) + 0.7, { sc: 0.4 }), big("≈ 210,000 t", "orange", S(15) + 1.3)]
  ], { wt: "todo el oro" });
  sc(S(16), S(17), "cg", [[S(16), "give"], [S(16) + 2.2, "cheer"]], [
    [big("≈ 50 %", "orange", S(16) + 0.7)],
    [c("joyería", "green", S(16) + 3.4)]
  ], { wt: "¿a dónde se fue?" });
  sc(S(17), S(18), "cg", [[S(17), "phone"], [S(17) + 2.4, "point"]], [
    [c("dentistas", "grey", S(17) + 0.8), c("medicinas", "grey", S(17) + 1.4)],
    [p("phone", S(17) + 4.4, { s: 0.4 }), c("tu celular", "green", S(17) + 5.0)]
  ], { wt: "usos prácticos" });
  sc(S(18), S(19), "cg", [[S(18), "look"], [S(18) + 2.4, "think"]], [
    [c("barras y monedas", "orange", S(18) + 0.8)],
    [p("building", S(18) + 4.4, { s: 0.4 }), c("bóvedas", "grey", S(18) + 5.0)]
  ], { wt: "el resto" });
  sc(S(19), S(20), "cg", [[S(19), "shrug"], [S(19) + 2.2, "give"]], [
    [c("no se usa para nada", "red", S(19) + 0.7)],
    [c("todos creemos que vale", "green", S(19) + 3.8)]
  ], { wt: "ojo" });
  // 7 NO ES TAN RARO
  sc(S(20), S(21), "cg", [[S(20), "cheer"], [S(20) + 2.2, "look"]], [
    [big("¡no es raro!", "orange", S(20) + 0.7)]
  ], { wt: "sorpresa" });
  sc(S(21), S(22), "cg", [[S(21), "point"], [S(21) + 2.4, "think"]], [
    [c("19 veces más pesado que el agua", "orange", S(21) + 0.8)],
    [c("fondo del río", "grey", S(21) + 4.6)]
  ], { wt: "dónde está" });
  sc(S(22), S(23), "cg", [[S(22), "give"], [S(22) + 2.4, "shrug"]], [
    [c("con una batea", "grey", S(22) + 0.8)],
    [c("del tamaño de una pestaña", "red", S(22) + 4.6)]
  ], { wt: "buscarlo" });
  // 8 EL PROBLEMA ES SACARLO
  sc(S(23), S(24), "cg", [[S(23), "worry"], [S(23) + 1.4, "point"]], [
    [c("sacarlo en cantidad", "red", S(23) + 0.6)]
  ], { wt: "el problema" });
  sc(S(24), S(25), "cg", [[S(24), "think"], [S(24) + 2.4, "give"]], [
    [c("1 tonelada de roca", "grey", S(24) + 0.8), sy("arrow", S(24) + 1.4, "grey")],
    [big("≈ 1 gramo", "orange", S(24) + 4.6)]
  ], { wt: "una mina promedio" });
  sc(S(25), S(26), "cg", [[S(25), "slump"], [S(25) + 2.2, "shrug"]], [
    [c("un camión de piedras", "grey", S(25) + 0.7)],
    [c("menos que un anillo", "red", S(25) + 3.8)]
  ], { wt: "imagina" });
  sc(S(26), S(27), "cg", [[S(26), "point"], [S(26) + 2.4, "worry"]], [
    [c("saben dónde hay más", "orange", S(26) + 0.8)],
    [c("sacarlo cuesta más de lo que vale", "red", S(26) + 4.8)]
  ], { wt: "las mineras" });
  sc(S(27), S(28), "cg", [[S(27), "give"], [S(27) + 2.2, "cheer"]], [
    [c("raro", "grey", S(27) + 0.7, { x: "strike" })],
    [big("carísimo de sacar", "orange", S(27) + 3.6)]
  ], { wt: "razón 2" });
  // 9 EL LADO OSCURO
  sc(S(28), S(29), "cg", [[S(28), "look"], [S(28) + 1.2, "worry"]], [
    [c("no solo dinero", "red", S(28) + 0.5)]
  ], { wt: "el costo" });
  sc(S(29), S(30), "cg", [[S(29), "sitStress"], [S(29) + 2.4, "slump"]], [
    [c("cianuro", "red", S(29) + 0.8), c("mercurio", "red", S(29) + 1.4)],
    [c("ríos envenenados", "red", S(29) + 4.6)]
  ], { wt: "químicos" });
  sc(S(30), S(31), "cg", [[S(30), "worry"], [S(30) + 2.4, "shrug"]], [
    [c("millones de mineros", "grey", S(30) + 0.8)],
    [c("minas peligrosas", "red", S(30) + 4.4), c("incluso niños", "red", S(30) + 5.0)]
  ], { wt: "las personas" });
  // 10 EL REFUGIO
  sc(S(31), S(32), "cg", [[S(31), "think"], [S(31) + 1.4, "shrug"]], [
    [c("¿por qué lo queremos?", "orange", S(31) + 0.6)]
  ], { wt: "entonces" });
  sc(S(32), S(33), "cg", [[S(32), "worry"], [S(32) + 2.4, "look"]], [
    [c("la economía tiembla", "red", S(32) + 0.8)],
    [c("billetes", "grey", S(32) + 4.4), c("bancos", "grey", S(32) + 5.0), c("gobiernos", "grey", S(32) + 5.6)]
  ], { wt: "desconfianza" });
  sc(S(33), S(34), "cg", [[S(33), "point"], [S(33) + 2.4, "cheer"]], [
    [w("bars", S(33) + 0.8, { sc: 0.4 }), c("el oro sube", "green", S(33) + 1.4)],
    [c("2008", "orange", S(33) + 4.6), c("pandemia", "orange", S(33) + 5.2)]
  ], { wt: "el refugio" });
  sc(S(34), S(35), "cg", [[S(34), "calm"], [S(34) + 2.4, "give"]], [
    [c("algo que no cambia", "green", S(34) + 0.8)],
    [c("un voto de confianza", "orange", S(34) + 4.8)]
  ], { wt: "razón 3" });
  // 11 CIERRE
  sc(S(35), S(36), "cg", [[S(35), "point"], [S(35) + 2.4, "calm"]], [
    [c("1 no se arruina", "green", S(35) + 0.8)],
    [c("2 carísimo de sacar", "orange", S(35) + 4.0), c("3 todos creemos", "green", S(35) + 4.8)]
  ], { wt: "resumen" });
  sc(S(36), S(37), "cg", [[S(36), "give"], [S(36) + 2.4, "think"]], [
    [c("un metal bonito", "grey", S(36) + 0.8)],
    [big("una idea", "orange", S(36) + 4.6)]
  ], { wt: "en el fondo" });
  sc(S(37), S(38), "cg", [[S(37), "shrug"], [S(37) + 2.2, "look"]], [
    [c("contenido educativo", "grey", S(37) + 0.7)],
    [c("no es asesoría financiera", "orange", S(37) + 3.6)]
  ], { wt: "aviso" });
  sc(S(38), END, "cg", [[S(38), "cheer"], [S(38) + 2.4, "give"]], [
    [c("¿comprarías oro?", "orange", S(38) + 0.7)],
    [c("cuéntame en comentarios", "green", S(38) + 4.4)]
  ], { wt: "tu turno" });

  root.SCENES = SC;
})(window);

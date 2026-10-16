/* Rentar o comprar casa (Fábrica 2.0): the whole film as data. Times are REAL seconds of the narration (assets/audio/timeline.json).
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
  sc(S(1), S(2), "cg", [[S(1), "worry"], [S(1) + 2.4, "point"]], []);
  sc(S(2), S(3), "cg", [[S(2), "look"], [S(2) + 2.0, "calm"]], []);
  // 2 EL EXPERIMENTO
  sc(S(3), S(5), "cg", [[S(3), "point"], [S(4), "give"]], [
    [c("mismo sueldo", "grey", S(3) + 0.6), c("$60 mil ahorrados", "green", S(3) + 1.2)],
    [p("house", S(4) + 1.9, { s: 0.4 }), c("Marcos compra $300 mil", "orange", S(4) + 2.5)]
  ], { wt: "el experimento" });
  sc(S(5), S(7), "cg", [[S(5), "phone"], [S(6), "shrug"]], [
    [p("building", S(5) + 0.6, { s: 0.4 }), c("Javier renta $1,400", "orange", S(5) + 1.2), c("fondo indexado", "green", S(5) + 1.8)],
    [c("ejemplo de EE. UU.", "grey", S(6) + 1.9), c("la lógica es igual", "grey", S(6) + 2.5)]
  ], { wt: "Javier" });
  // 3 LOS PRIMEROS AÑOS
  sc(S(7), S(9), "cg", [[S(7), "worry"], [S(8), "slump"]], [
    [c("Marcos: ~$1,900/mes", "red", S(7) + 0.6), c("+ reparaciones", "red", S(7) + 1.3)],
    [big("85 % a intereses", "red", S(8) + 1.9)]
  ], { wt: "Marcos, año 1" });
  sc(S(9), S(12), "cg", [[S(9), "cheer"], [S(10), "sitRelaxed"], [S(11), "point"]], [
    [c("$500 menos al mes", "green", S(9) + 0.6), c("repara el dueño", "green", S(9) + 1.3)],
    [w("coin", S(10) + 1.9, { sc: 0.4 }), c("$60 mil → $75 mil", "green", S(10) + 2.5)],
    [c("rentar va ganando", "green", S(11) + 1.9)]
  ], { wt: "Javier, años 1 a 3" });
  // 4 EL GIRO
  sc(S(12), S(14), "cg", [[S(12), "think"], [S(13), "worry"]], [
    [c("la renta sube", "red", S(12) + 0.7), sy("arrow", S(12) + 1.3, "red")],
    [c("año 10: ~$1,900", "orange", S(13) + 1.9)]
  ], { wt: "el giro" });
  sc(S(14), S(16), "cg", [[S(14), "slump"], [S(15), "calm"]], [
    [c("año 30: ~$3,400", "red", S(14) + 0.7), c("Marcos: igual", "green", S(14) + 1.6)],
    [c("cuota fija", "green", S(15) + 1.9), c("cada vez más barata", "green", S(15) + 2.5)]
  ], { wt: "renta vs cuota fija" });
  sc(S(16), S(18), "cg", [[S(16), "point"], [S(17), "cheer"]], [
    [big("apalancamiento", "orange", S(16) + 0.8)],
    [c("pone $60 mil", "grey", S(17) + 1.9), c("gana sobre $300 mil", "green", S(17) + 2.5)]
  ], { wt: "la ventaja oculta" });
  // 5 LOS DIEZ AÑOS
  sc(S(18), S(20), "cg", [[S(18), "look"], [S(19), "give"]], [
    [p("house", S(18) + 0.6, { s: 0.4 }), c("vale ~$400 mil", "green", S(18) + 1.3)],
    [c("debe ~$200 mil", "red", S(19) + 1.9), c("patrimonio ~$200 mil", "green", S(19) + 2.5)]
  ], { wt: "Marcos, año 10" });
  sc(S(20), S(22), "cg", [[S(20), "phone"], [S(21), "think"]], [
    [c("fondo de Javier", "grey", S(20) + 0.6), c("~$130 mil", "orange", S(20) + 1.2)],
    [c("¿gana comprar?", "orange", S(21) + 1.9)]
  ], { wt: "el marcador" });
  // 6 LA DIFERENCIA
  sc(S(22), S(24), "cg", [[S(22), "askHelp"], [S(23), "shrug"]], [
    [c("¿y la diferencia?", "orange", S(22) + 0.8)],
    [p("car", S(23) + 1.9, { s: 0.4 }), c("se la gastó", "red", S(23) + 2.5), c("gana comprar", "grey", S(23) + 3.1)]
  ], { wt: "la pregunta clave" });
  sc(S(24), S(26), "cg", [[S(24), "cheer"], [S(25), "slump"]], [
    [c("la invirtió", "green", S(24) + 0.6), c("~$244 mil", "green", S(24) + 1.3), c("vs ~$200 mil", "grey", S(24) + 2.0)],
    [c("casi nadie lo hace", "red", S(25) + 1.9)]
  ], { wt: "si invierte la diferencia" });
  // 7 CUANDO RENTAR GANA
  sc(S(26), S(28), "cg", [[S(26), "point"], [S(27), "worry"]], [
    [p("calendar", S(26) + 0.6, { s: 0.4 }), c("menos de 5 a 7 años", "green", S(26) + 1.3)],
    [c("gastos de compra", "red", S(27) + 1.9), c("comisiones", "red", S(27) + 2.5), c("reparaciones", "red", S(27) + 3.1)]
  ], { wt: "cuándo rentar gana" });
  sc(S(28), S(30), "cg", [[S(28), "look"], [S(29), "shrug"]], [
    [p("building", S(28) + 0.6, { s: 0.4 }), c("ciudades carísimas", "green", S(28) + 1.3)],
    [c("no es dinero a la mano", "orange", S(29) + 1.9)]
  ], { wt: "también gana" });
  // 8 CIERRE
  sc(S(30), S(32), "cg", [[S(30), "think"], [S(31), "point"]], [
    [c("solo el pago del mes", "grey", S(30) + 0.6, { x: "strike" })],
    [c("10 y 30 años", "green", S(31) + 1.9), c("¿invertirías la diferencia?", "orange", S(31) + 2.6)]
  ], { wt: "la trampa" });
  sc(S(32), S(33), "cg", [[S(32), "calm"], [S(32) + 1.8, "give"]], [
    [c("contenido educativo", "grey", S(32) + 0.5)],
    [c("no es asesoría financiera", "grey", S(32) + 1.2)]
  ]);
  sc(S(33), END, "cg", [[S(33), "cheer"], [S(34), "point"]], [
    [c("guárdalo", "green", S(33) + 0.6)],
    [c("¿rentar o comprar?", "orange", S(34) + 0.8)]
  ]);

  root.SCENES = SC;
})(window);

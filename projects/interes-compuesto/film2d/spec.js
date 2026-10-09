/* Interes compuesto: the whole film as data. Times are REAL seconds of the narration (assets/audio/timeline.json).
 * No coordinates: scenes are grids (L: c = character cell, g = graphic cell) and items flow inside their cell. */
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

  // 1 GANCHO
  sc(0, S(1), "cg", [[S(0), "think"]], [
    [big("$10,000", "orange", S(0) + 0.6)],
    [c("40 años quietos", "grey", S(0) + 2.4), c("¿cuánto tendrás?", "orange", S(0) + 4.0)]
  ]);
  sc(S(1), S(2), "cg", [[S(1), "cheer"]], [
    [c("mucho más de lo que imaginas", "green", S(1) + 0.6)]
  ]);
  sc(S(2), S(3), "cg", [[S(2), "point"]], [
    [c("no es magia", "grey", S(2) + 0.3)],
    [big("interés sobre interés", "orange", S(2) + 1.2)]
  ]);
  sc(S(3), S(4), "cg", [[S(3), "calm"]], [
    [w("hourglass", S(3) + 0.4, { sc: 0.6 })],
    [c("3 minutos", "orange", S(3) + 0.9), c("cambia el juego", "green", S(3) + 2.0)]
  ]);
  // 2 INTERES SIMPLE
  sc(S(4), S(5), "cg", [[S(4), "point"]], [
    [big("interés simple", "grey", S(4) + 0.4)]
  ]);
  sc(S(5), S(6), "cg", [[S(5), "look"]], [
    [w("coin", S(5) + 0.5, { sc: 0.55 })],
    [c("$10,000", "orange", S(5) + 0.9), c("5 % anual", "orange", S(5) + 2.4)]
  ]);
  sc(S(6), S(7), "cg", [[S(6), "calm"]], [
    [c("año 1: $500", "grey", S(6) + 0.8), c("año 2: $500", "grey", S(6) + 1.6)],
    [c("año 3: $500", "grey", S(6) + 2.4)]
  ]);
  sc(S(7), S(8), "cg", [[S(7), "shrug"]], [
    [c("3 años", "grey", S(7) + 0.5), sy("arrow", S(7) + 1.2, "grey"), c("$1,500 de interés", "orange", S(7) + 1.8)]
  ]);
  sc(S(8), S(9), "cg", [[S(8), "calm"]], [
    [w("stairs", S(8) + 0.5, { n: 3, sc: 0.5 })],
    [c("línea recta", "grey", S(8) + 0.6), c("lenta", "red", S(8) + 2.0)]
  ]);
  // 3 INTERES COMPUESTO
  sc(S(9), S(10), "cg", [[S(9), "point"]], [
    [big("interés compuesto", "orange", S(9) + 0.4)]
  ]);
  sc(S(10), S(11), "cg", [[S(10), "look"]], [
    [c("mismo depósito", "grey", S(10) + 0.4), c("misma tasa", "grey", S(10) + 1.4)],
    [c("año 1: $500", "orange", S(10) + 3.2)]
  ]);
  sc(S(11), S(12), "cg", [[S(11), "think"]], [
    [c("$500", "orange", S(11) + 0.5), sy("arrow", S(11) + 1.2, "green"), c("se suman al capital", "green", S(11) + 1.8)],
    [c("ahora tienes $10,500", "orange", S(11) + 3.6)]
  ]);
  sc(S(12), S(13), "cg", [[S(12), "point"]], [
    [c("5 % de $10,500", "grey", S(12) + 0.8)],
    [c("año 2: $525", "green", S(12) + 3.0)]
  ]);
  sc(S(13), S(14), "cg", [[S(13), "look"]], [
    [c("parte de $11,025", "grey", S(13) + 0.6)],
    [c("año 3: $551.25", "green", S(13) + 2.8)]
  ]);
  sc(S(14), S(15), "cg", [[S(14), "cheer"]], [
    [big("$1,576.25", "green", S(14) + 0.6)],
    [c("interés total", "grey", S(14) + 1.8)]
  ]);
  sc(S(15), S(16), "cg", [[S(15), "point"]], [
    [c("simple $1,500", "grey", S(15) + 0.5), sy("neq", S(15) + 1.2, "red"), c("compuesto $1,576", "green", S(15) + 1.8)],
    [c("+ $76.25 sin hacer nada", "orange", S(15) + 3.4)]
  ]);
  sc(S(16), S(17), "cg", [[S(16), "cheer"]], [
    [w("coin", S(16) + 0.5, { sc: 0.55 }), w("coin", S(16) + 1.2, { sc: 0.55 })],
    [c("tu dinero trabaja", "green", S(16) + 0.9), c("sus ganancias también", "green", S(16) + 2.8)]
  ]);
  // 4 EL TIEMPO
  sc(S(17), S(18), "cg", [[S(17), "shrug"]], [
    [c("$76 parece poco", "grey", S(17) + 0.5)],
    [c("el efecto crece con el tiempo", "orange", S(17) + 3.0)]
  ]);
  sc(S(18), S(19), "cg", [[S(18), "look"]], [
    [w("stairs", S(18) + 0.5, { n: 4, sc: 0.5 })],
    [c("cada año, base más grande", "green", S(18) + 1.0)]
  ]);
  sc(S(19), S(20), "cg", [[S(19), "point"]], [
    [big("30 años", "orange", S(19) + 0.5)],
    [c("simple: $25,000", "grey", S(19) + 2.4)]
  ]);
  sc(S(20), S(21), "cg", [[S(20), "cheer"]], [
    [w("bars", S(20) + 0.6, { hs: [100, 172], cols: [GREY, C.green], sc: 0.4 })],
    [c("compuesto: ≈ $43,200", "green", S(20) + 1.0)]
  ]);
  sc(S(21), S(22), "cg", [[S(21), "point"]], [
    [big("40 años", "orange", S(21) + 0.4)],
    [c("simple $30,000", "grey", S(21) + 1.8), c("compuesto ≈ $70,400", "green", S(21) + 4.6)]
  ]);
  sc(S(22), S(23), "cg", [[S(22), "calm"]], [
    [c("mismo dinero", "grey", S(22) + 0.4), c("misma tasa", "grey", S(22) + 1.2)],
    [c("la diferencia: el tiempo", "orange", S(22) + 3.2)]
  ]);
  sc(S(23), S(24), "cg", [[S(23), "cheer"]], [
    [w("stairs", S(23) + 0.5, { n: 5, sc: 0.5 })],
    [c("plana…", "grey", S(23) + 1.4), c("y se dispara", "green", S(23) + 3.4)]
  ]);
  // 5 COMO USARLO
  sc(S(24), S(25), "cg", [[S(24), "think"]], [
    [c("¿qué haces con esto?", "orange", S(24) + 0.4)]
  ]);
  sc(S(25), S(26), "cg", [[S(25), "point"]], [
    [c("1 empieza ya", "orange", S(25) + 0.8)],
    [c("cada año de espera cuesta", "red", S(25) + 3.6)]
  ]);
  sc(S(26), S(27), "cg", [[S(26), "point"]], [
    [c("2 sé constante", "orange", S(26) + 0.8)],
    [c("poco, pero siempre", "green", S(26) + 2.4)]
  ]);
  sc(S(27), S(28), "cg", [[S(27), "calm"]], [
    [c("3 no lo toques", "orange", S(27) + 0.8)],
    [c("cada retiro rompe la cadena", "red", S(27) + 2.6)]
  ]);
  sc(S(28), S(29), "cg", [[S(28), "worry"]], [
    [c("4 ojo", "orange", S(28) + 0.6)],
    [c("la deuda de tarjeta", "red", S(28) + 2.8), c("también se compone", "red", S(28) + 4.4)]
  ]);
  // 6 CIERRE
  sc(S(29), S(30), "cg", [[S(29), "shrug"]], [
    [c("5 % = ejemplo", "grey", S(29) + 0.8)],
    [c("nadie garantiza rendimientos", "red", S(29) + 3.2)]
  ]);
  sc(S(30), S(31), "cg", [[S(30), "calm"]], [
    [c("contenido educativo", "grey", S(30) + 0.5)],
    [c("no es asesoría financiera", "grey", S(30) + 1.8)]
  ]);
  sc(S(31), S(32), "cg", [[S(31), "cheer"]], [
    [c("tiempo", "orange", S(31) + 1.4), c("constancia", "orange", S(31) + 2.2), c("paciencia", "green", S(31) + 3.0)]
  ]);
  sc(S(32), END, "cg", [[S(32), "give"]], [
    [c("guárdalo", "green", S(32) + 0.6), c("compártelo", "orange", S(32) + 1.6)],
    [c("¿a qué edad empezaste a ahorrar?", "grey", S(32) + 4.0)]
  ]);

  root.SCENES = SC;
})(window);

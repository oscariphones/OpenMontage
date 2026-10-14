/* 5 ingresos extra realistas (Fábrica 2.0): the whole film as data. Times are REAL seconds of the narration (assets/audio/timeline.json).
 * No coordinates: scenes are grids (L: c = character cell, g = graphic cell) and items flow inside their cell.
 * Fábrica 2.0: 15 s hook with no windows; every scene changes pose; second poses leave ≥1.9 s before the next bullet (camera punch-in). */
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
  sc(0, S(1), "cg", [[S(0), "phone"], [S(0) + 2.6, "shrug"]], []);
  sc(S(1), S(2), "cg", [[S(1), "think"], [S(1) + 2.4, "worry"]], []);
  sc(S(2), S(3), "cg", [[S(2), "look"], [S(2) + 2.2, "point"]], []);
  // 2 LAS REGLAS
  sc(S(3), S(5), "cg", [[S(3), "calm"], [S(4), "sitStress"]], [
    [p("clock", S(3) + 0.6, { s: 0.4 }), c("tu realidad", "orange", S(3) + 1.2)],
    [p("desk", S(4) + 1.9, { s: 0.4 }), c("de 9 a 5", "grey", S(4) + 2.5)]
  ], { wt: "las reglas" });
  sc(S(5), S(7), "cg", [[S(5), "sitRelaxed"], [S(6), "think"]], [
    [w("hourglass", S(5) + 0.6, { sc: 0.45 }), c("1-2 horas", "orange", S(5) + 1.3)],
    [c("poco tiempo", "green", S(6) + 1.9), c("poco desgaste", "green", S(6) + 2.5)]
  ]);
  sc(S(7), S(9), "cg", [[S(7), "shrug"], [S(8), "point"]], [
    [c("reemplazar tu sueldo", "grey", S(7) + 0.8, { x: "strike" })],
    [big("ingreso extra", "green", S(8) + 1.9)]
  ], { wt: "la meta" });
  // 3 ESCRIBIR
  sc(S(9), S(11), "cg", [[S(9), "give"], [S(10), "look"]], [
    [c("1", "orange", S(9) + 0.5), c("escribe artículos", "green", S(9) + 1.0), p("laptop", S(9) + 1.6, { s: 0.4 })],
    [c("$5 al mes", "grey", S(10) + 1.9), sy("arrow", S(10) + 2.5, "grey"), c("autores", "green", S(10) + 3.0)]
  ], { wt: "1: escribir" });
  sc(S(11), S(13), "cg", [[S(11), "think"], [S(12), "cheer"]], [
    [c("10 % de su tiempo", "grey", S(11) + 0.6), c("$0.50", "orange", S(11) + 1.3)],
    [c("500 lectores", "green", S(12) + 1.9)],
    [big("$250 al mes", "green", S(12) + 2.6)]
  ]);
  sc(S(13), S(15), "cg", [[S(13), "calm"], [S(14), "give"]], [
    [w("calstack", S(13) + 0.6, { sc: 0.45 }), c("sigue pagando", "green", S(13) + 1.3)],
    [c("1 por semana", "orange", S(14) + 1.9)],
    [big("52 al año", "green", S(14) + 2.6)]
  ]);
  // 4 COCINAR
  sc(S(15), S(17), "cg", [[S(15), "cheer"], [S(16), "point"]], [
    [c("2", "orange", S(15) + 0.5), c("vende tu comida", "green", S(15) + 1.0), p("lunchbox", S(15) + 1.6, { s: 0.4 })],
    [p("house", S(16) + 1.9, { s: 0.4 }), c("vecinos", "green", S(16) + 2.5), c("por encargo", "grey", S(16) + 3.1)]
  ], { wt: "2: cocinar" });
  sc(S(17), S(20), "cg", [[S(17), "calm"], [S(18), "worry"], [S(19), "point"]], [
    [c("porciones de más", "green", S(17) + 0.8)],
    [p("shield", S(18) + 1.9, { s: 0.4 }), c("permiso sanitario", "orange", S(18) + 2.5)],
    [big("algo que ya haces", "green", S(19) + 1.9)]
  ]);
  // 5 RENTAR
  sc(S(20), S(22), "cg", [[S(20), "look"], [S(21), "point"]], [
    [c("3", "orange", S(20) + 0.5), c("renta lo guardado", "green", S(20) + 1.0), p("box", S(20) + 1.6, { s: 0.4 })],
    [c("cámaras", "grey", S(21) + 1.9), c("herramientas", "grey", S(21) + 2.4), c("campamento", "grey", S(21) + 2.9)]
  ], { wt: "3: rentar" });
  sc(S(22), S(25), "cg", [[S(22), "phone"], [S(23), "think"], [S(24), "sitRelaxed"]], [
    [c("publicas", "green", S(22) + 0.8), sy("arrow", S(22) + 1.3, "grey"), c("entregas", "green", S(22) + 1.8)],
    [p("shield", S(23) + 1.9, { s: 0.4 }), c("con seguro", "orange", S(23) + 2.5)],
    [c("casi sin mantenimiento", "green", S(24) + 1.9)]
  ]);
  // 6 PRODUCTOS DIGITALES
  sc(S(25), S(27), "cg", [[S(25), "point"], [S(26), "phone"]], [
    [c("4", "orange", S(25) + 0.5), c("productos digitales", "green", S(25) + 1.0)],
    [w("doc", S(26) + 1.9, { sc: 0.4 }), c("plantillas de presupuesto", "grey", S(26) + 2.6)]
  ], { wt: "4: Etsy" });
  sc(S(27), S(30), "cg", [[S(27), "think"], [S(28), "cheer"], [S(29), "point"]], [
    [c("3,500 reseñas", "orange", S(27) + 0.6), c("× $10", "grey", S(27) + 1.3)],
    [big("$35,000", "green", S(28) + 1.9)],
    [c("2 años", "grey", S(29) + 1.9), sy("arrow", S(29) + 2.4, "grey"), c("≈ $1,450 al mes", "green", S(29) + 2.9)]
  ]);
  sc(S(30), S(31), "cg", [[S(30), "give"], [S(30) + 2.4, "calm"]], [
    [p("laptop", S(30) + 0.6, { s: 0.4 }), c("Excel", "green", S(30) + 1.2), c("Word", "green", S(30) + 1.7)]
  ]);
  // 7 AFILIADOS
  sc(S(31), S(33), "cg", [[S(31), "point"], [S(32), "think"]], [
    [c("5", "orange", S(31) + 0.5), c("afiliados", "green", S(31) + 1.0), p("phone", S(31) + 1.6, { s: 0.4 })],
    [c("tráfico", "orange", S(32) + 1.9), sy("arrow", S(32) + 2.4, "grey"), c("pocos compran", "grey", S(32) + 2.9)]
  ], { wt: "5: afiliados" });
  sc(S(33), S(35), "cg", [[S(33), "phone"], [S(34), "cheer"]], [
    [c("ofertas", "green", S(33) + 0.8), c("video corto", "orange", S(33) + 1.4), c("enlace", "green", S(33) + 2.0)],
    [big("ya cazas descuentos", "green", S(34) + 1.9)]
  ]);
  // 8 CIERRE
  sc(S(35), S(37), "cg", [[S(35), "calm"], [S(36), "shrug"]], [
    [c("no te hace rico", "grey", S(35) + 0.6), c("empieza esta semana", "green", S(35) + 1.4)],
    [c("cifras = ejemplos", "orange", S(36) + 1.9)]
  ]);
  sc(S(37), S(38), "cg", [[S(37), "think"], [S(37) + 2.2, "calm"]], [
    [c("contenido educativo", "grey", S(37) + 0.5)],
    [c("no es asesoría financiera", "grey", S(37) + 1.3)]
  ]);
  sc(S(38), END, "cg", [[S(38), "give"], [S(39), "point"]], [
    [c("guárdalo", "green", S(38) + 0.6), c("compártelo", "orange", S(38) + 1.4)],
    [c("¿cuál probarías primero?", "grey", S(39) + 0.8)]
  ]);

  root.SCENES = SC;
})(window);

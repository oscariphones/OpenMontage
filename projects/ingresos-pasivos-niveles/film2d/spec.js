/* Ingresos pasivos por niveles (Fábrica 2.0): the whole film as data. Times are REAL seconds of the narration (assets/audio/timeline.json).
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
  sc(0, S(1), "cg", [[S(0), "sitRelaxed"], [S(0) + 2.6, "slump"]], []);
  sc(S(1), S(2), "cg", [[S(1), "think"], [S(1) + 2.4, "point"]], []);
  sc(S(2), S(3), "cg", [[S(2), "cheer"], [S(2) + 2.0, "give"]], []);
  // 2 QUE ES PASIVO
  sc(S(3), S(5), "cg", [[S(3), "look"], [S(4), "point"]], [
    [c("¿de verdad pasivo?", "orange", S(3) + 0.6)],
    [p("clock", S(4) + 1.9, { s: 0.4 }), c("más de 10 h/semana", "red", S(4) + 2.4)],
    [big("otro trabajo", "red", S(4) + 3.0)]
  ], { wt: "la regla de las 10 horas" });
  sc(S(5), S(6), "cg", [[S(5), "think"], [S(5) + 2.2, "shrug"]], [
    [c("5 máquinas", "green", S(5) + 0.6), c("se manejan solas", "green", S(5) + 1.2)],
    [c("100 máquinas", "red", S(5) + 4.1), c("repartidor", "red", S(5) + 4.7)]
  ], { wt: "el tamaño importa" });
  // 3 NIVEL UNO
  sc(S(6), S(8), "cg", [[S(6), "calm"], [S(7), "point"]], [
    [c("nivel 1", "orange", S(6) + 0.5), c("simple y barato", "green", S(6) + 1.1)],
    [p("box", S(7) + 1.9, { s: 0.4 }), c("1. expendedoras", "green", S(7) + 2.5)]
  ], { wt: "nivel 1" });
  sc(S(8), S(9), "cg", [[S(8), "give"], [S(8) + 2.4, "cheer"]], [
    [w("coin", S(8) + 0.6, { sc: 0.4 }), c("$300 al mes", "green", S(8) + 1.2)],
    [big("× 5 = $1,500", "green", S(8) + 4.4)]
  ], { wt: "expendedoras" });
  sc(S(9), S(11), "cg", [[S(9), "phone"], [S(10), "think"]], [
    [c("2. cajeros", "green", S(9) + 0.6), c("comisión por retiro", "orange", S(9) + 1.2)],
    [c("8 retiros al día", "grey", S(10) + 1.9), c("≈ $600/mes", "green", S(10) + 2.5)]
  ], { wt: "cajeros automáticos" });
  sc(S(11), S(13), "cg", [[S(11), "look"], [S(12), "worry"]], [
    [c("3. lavanderías", "green", S(11) + 0.6), c("contratas encargado", "green", S(11) + 1.2)],
    [c("gana poco", "red", S(12) + 1.9), c("crece lento", "red", S(12) + 2.5), c("reparaciones", "red", S(12) + 3.1)]
  ], { wt: "lavanderías" });
  // 4 NIVEL DOS
  sc(S(13), S(14), "cg", [[S(13), "point"], [S(13) + 1.4, "cheer"]], [
    [c("nivel 2", "orange", S(13) + 0.5), c("más capital", "orange", S(13) + 1.0)],
    [c("más pasivo", "green", S(13) + 3.3), c("escala mejor", "green", S(13) + 3.9)]
  ], { wt: "nivel 2" });
  sc(S(14), S(16), "cg", [[S(14), "give"], [S(15), "calm"]], [
    [p("house", S(14) + 0.6, { s: 0.4 }), c("4. renta largo plazo", "green", S(14) + 1.2)],
    [c("$300 × 10", "grey", S(15) + 1.9), c("≈ $3,000/mes", "green", S(15) + 2.5)]
  ], { wt: "renta a largo plazo" });
  sc(S(16), S(17), "cg", [[S(16), "sitRelaxed"], [S(16) + 2.2, "shrug"]], [
    [c("socio capitalista", "green", S(16) + 0.7)],
    [c("un experto administra", "grey", S(16) + 4.1)]
  ], { wt: "sin inquilinos" });
  sc(S(17), S(19), "cg", [[S(17), "point"], [S(18), "worry"]], [
    [p("bed", S(17) + 0.6, { s: 0.4 }), p("car", S(17) + 1.2, { s: 0.4 }), c("5. corto plazo", "green", S(17) + 1.8)],
    [c("gana más", "green", S(18) + 1.9), c("más limpieza", "red", S(18) + 2.4)]
  ], { wt: "renta a corto plazo" });
  sc(S(19), S(21), "cg", [[S(19), "look"], [S(20), "cheer"]], [
    [p("building", S(19) + 0.6, { s: 0.42 }), c("6. bodegas", "green", S(19) + 1.2)],
    [c("~$500 mil", "grey", S(20) + 1.9), sy("arrow", S(20) + 2.5, "grey"), c("$68 mil/año", "green", S(20) + 3.1)]
  ], { wt: "bodegas" });
  sc(S(21), S(22), "cg", [[S(21), "give"], [S(21) + 1.6, "point"]], [
    [c("7. renta para eventos", "green", S(21) + 0.6)],
    [c("sillas", "grey", S(21) + 3.5), c("carpas", "grey", S(21) + 4.0), c("escenarios", "grey", S(21) + 4.5)]
  ], { wt: "equipo para eventos" });
  // 5 NIVEL TRES
  sc(S(22), S(24), "cg", [[S(22), "think"], [S(23), "phone"]], [
    [c("nivel 3", "orange", S(22) + 0.5), c("el que más escala", "green", S(22) + 1.1)],
    [p("laptop", S(23) + 1.9, { s: 0.4 }), c("8. productos digitales", "green", S(23) + 2.5)]
  ], { wt: "nivel 3" });
  sc(S(24), S(25), "cg", [[S(24), "worry"], [S(24) + 2.2, "calm"]], [
    [c("sin audiencia = 0 ventas", "red", S(24) + 0.7)],
    [w("hourglass", S(24) + 4.1, { sc: 0.4 }), c("1 a 3 años", "orange", S(24) + 4.7)]
  ], { wt: "la audiencia" });
  sc(S(25), S(27), "cg", [[S(25), "point"], [S(26), "slump"]], [
    [p("cart", S(25) + 0.6, { s: 0.4 }), c("9. tienda sin inventario", "green", S(25) + 1.2)],
    [c("casi todos fracasan", "red", S(26) + 1.9), c("es marketing", "orange", S(26) + 2.5)]
  ], { wt: "tienda en línea" });
  sc(S(27), S(29), "cg", [[S(27), "shrug"], [S(28), "look"]], [
    [c("10. franquicia", "green", S(27) + 0.6), c("dueño en el local", "red", S(27) + 1.2)],
    [c("contrata un operador", "green", S(28) + 1.9)]
  ], { wt: "franquicias" });
  // 6 DOS PASOS ADELANTE
  sc(S(29), S(31), "cg", [[S(29), "cheer"], [S(30), "slump"]], [
    [c("11. dos pasos adelante", "orange", S(29) + 0.6)],
    [c("contratar tarde", "red", S(30) + 1.9), c("atrapado", "red", S(30) + 2.5)]
  ], { wt: "el número 11" });
  sc(S(31), S(33), "cg", [[S(31), "point"], [S(32), "give"]], [
    [w("stairs", S(31) + 0.6, { n: 3, sc: 0.4 }), c("paso 1: lo de hoy", "green", S(31) + 1.3)],
    [c("paso 2: lo que sigue", "green", S(32) + 1.9)]
  ], { wt: "dos pasos" });
  // 7 CIERRE
  sc(S(33), S(35), "cg", [[S(33), "calm"], [S(34), "think"]], [
    [c("contenido educativo", "grey", S(33) + 0.5)],
    [c("no es asesoría financiera", "grey", S(33) + 1.3)],
    [c("capital + tiempo", "orange", S(34) + 1.9)]
  ]);
  sc(S(35), END, "cg", [[S(35), "give"], [S(36), "point"]], [
    [c("guárdalo", "green", S(35) + 0.6), c("primer ahorro", "orange", S(35) + 1.4)],
    [c("¿cuál empezarías?", "grey", S(36) + 0.8)]
  ]);

  root.SCENES = SC;
})(window);

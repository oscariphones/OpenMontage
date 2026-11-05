/* Coche nuevo vs usado (global con detalles de México) (Fábrica 2.0): the whole film as data. Times are REAL seconds of the narration (assets/audio/timeline.json).
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
  sc(0, S(1), "cg", [[S(0), "cheer"], [S(0) + 2.6, "worry"]], []);
  sc(S(1), S(2), "cg", [[S(1), "point"], [S(1) + 2.6, "slump"]], []);
  sc(S(2), S(3), "cg", [[S(2), "think"], [S(2) + 2.4, "point"]], []);
  // 2 DE QUÉ VA ESTO
  sc(S(3), S(4), "cg", [[S(3), "look"], [S(3) + 2.2, "give"]], [
    [p("car", S(3) + 0.7, { s: 0.4 }), c("nuevo", "orange", S(3) + 1.3), c("vs", "grey", S(3) + 1.9), c("usado", "green", S(3) + 2.5)]
  ], { wt: "el tema de hoy" });
  sc(S(4), S(5), "cg", [[S(4), "think"], [S(4) + 2.2, "cheer"]], [
    [c("¿cuál te conviene?", "orange", S(4) + 0.7)],
    [c("con detalles de México", "green", S(4) + 4.0)]
  ], { wt: "al final" });
  // 3 SUSCRÍBETE (recordatorio obligatorio)
  sc(S(5), S(6), "cg", [[S(5), "point"], [S(5) + 2.0, "cheer"]], [
    [big("SUSCRÍBETE", "red", S(5) + 4.0, { x: "stamp" })]
  ], { wt: "antes de seguir" });
  sc(S(6), S(7), "cg", [[S(6), "sitRelaxed"], [S(6) + 1.8, "give"]], [
    [c("activa la campanita", "orange", S(6) + 0.6)]
  ], { wt: "cada semana" });
  sc(S(7), S(8), "cg", [[S(7), "calm"], [S(7) + 1.0, "point"]], []);
  // 4 LAURA Y DIEGO
  sc(S(8), S(9), "cg", [[S(8), "cheer"], [S(8) + 2.4, "give"]], [
    [p("car", S(8) + 0.8, { s: 0.4 }), c("Laura: nuevo, $400 mil", "orange", S(8) + 1.4)]
  ], { wt: "Laura" });
  sc(S(9), S(10), "cg", [[S(9), "calm"], [S(9) + 2.2, "point"]], [
    [p("car", S(9) + 0.7, { s: 0.4 }), c("Diego: 3 años, $240 mil", "green", S(9) + 1.3)]
  ], { wt: "Diego" });
  sc(S(10), S(11), "cg", [[S(10), "look"], [S(10) + 2.2, "shrug"]], [
    [c("se ven casi iguales", "grey", S(10) + 0.7)],
    [c("llegan al mismo lugar", "grey", S(10) + 4.0)]
  ], { wt: "los dos coches" });
  sc(S(11), S(12), "cg", [[S(11), "point"], [S(11) + 1.2, "think"]], [
    [c("cuentas muy distintas", "orange", S(11) + 0.5)]
  ], { wt: "pero" });
  // 5 LA CAÍDA DEL PRIMER AÑO
  sc(S(12), S(13), "cg", [[S(12), "point"], [S(12) + 2.4, "worry"]], [
    [big("depreciación", "red", S(12) + 0.8)],
    [c("lo que más cuesta", "orange", S(12) + 4.4)]
  ], { wt: "la pérdida de valor" });
  sc(S(13), S(14), "cg", [[S(13), "slump"], [S(13) + 2.4, "worry"]], [
    [w("bars", S(13) + 0.8, { sc: 0.4 }), c("≈ -20 % el primer año", "red", S(13) + 1.4)]
  ], { wt: "un coche nuevo" });
  sc(S(14), S(15), "cg", [[S(14), "worry"], [S(14) + 2.4, "shrug"]], [
    [c("Laura: -$80 mil", "red", S(14) + 0.8)],
    [c("aunque casi no lo use", "grey", S(14) + 4.8)]
  ], { wt: "al año siguiente" });
  sc(S(15), S(16), "cg", [[S(15), "slump"], [S(15) + 2.4, "think"]], [
    [p("calendar", S(15) + 0.8, { s: 0.4 }), c("5 años: la mitad", "red", S(15) + 1.4)]
  ], { wt: "y con el tiempo" });
  sc(S(16), S(17), "cg", [[S(16), "cheer"], [S(16) + 2.4, "point"]], [
    [c("Diego compró después de la caída", "green", S(16) + 0.8)],
    [c("pierde valor más despacio", "green", S(16) + 5.0)]
  ], { wt: "en cambio" });
  // 6 EL CRÉDITO
  sc(S(17), S(18), "cg", [[S(17), "shrug"], [S(17) + 1.4, "point"]], [
    [c("casi nadie paga de contado", "orange", S(17) + 0.5)]
  ], { wt: "el crédito" });
  sc(S(18), S(19), "cg", [[S(18), "worry"], [S(18) + 2.4, "think"]], [
    [c("crédito automotriz", "grey", S(18) + 0.8)],
    [big("≈ 12 a 18 %", "red", S(18) + 4.4)]
  ], { wt: "en México" });
  sc(S(19), S(20), "cg", [[S(19), "slump"], [S(19) + 2.4, "worry"]], [
    [c("pide $300 mil a 5 años", "orange", S(19) + 0.8)],
    [c("+$100 mil de intereses", "red", S(19) + 4.6)]
  ], { wt: "Laura" });
  sc(S(20), S(21), "cg", [[S(20), "cheer"], [S(20) + 2.2, "give"]], [
    [c("pide menos", "green", S(20) + 0.7), c("paga menos intereses", "green", S(20) + 1.3)]
  ], { wt: "Diego" });
  // 7 LOS GASTOS QUE SIGUEN
  sc(S(21), S(22), "cg", [[S(21), "point"], [S(21) + 1.8, "shrug"]], [
    [c("no se acaba al comprarlo", "orange", S(21) + 0.6)]
  ], { wt: "los gastos que siguen" });
  sc(S(22), S(23), "cg", [[S(22), "give"], [S(22) + 2.2, "think"]], [
    [p("shield", S(22) + 0.7, { s: 0.4 }), c("seguro más caro", "red", S(22) + 1.3)]
  ], { wt: "el nuevo" });
  sc(S(23), S(24), "cg", [[S(23), "worry"], [S(23) + 2.4, "shrug"]], [
    [c("verificación", "orange", S(23) + 0.8), c("tenencia o refrendo", "orange", S(23) + 1.4)],
    [c("mantenimiento", "orange", S(23) + 4.6)]
  ], { wt: "también" });
  sc(S(24), S(25), "cg", [[S(24), "think"], [S(24) + 2.4, "worry"]], [
    [c("el usado: más reparaciones", "red", S(24) + 0.8)],
    [c("si nadie lo cuidó", "grey", S(24) + 4.4)]
  ], { wt: "en cambio" });
  // 8 LA VENTAJA DEL NUEVO
  sc(S(25), S(26), "cg", [[S(25), "point"], [S(25) + 1.4, "cheer"]], [
    [c("ventajas reales", "green", S(25) + 0.5)]
  ], { wt: "el coche nuevo" });
  sc(S(26), S(27), "cg", [[S(26), "give"], [S(26) + 2.4, "calm"]], [
    [p("shield", S(26) + 0.8, { s: 0.4 }), c("garantía", "green", S(26) + 1.4)]
  ], { wt: "ventaja 1" });
  sc(S(27), S(28), "cg", [[S(27), "cheer"], [S(27) + 2.2, "point"]], [
    [c("nadie lo maltrató", "green", S(27) + 0.7), c("más seguridad", "green", S(27) + 1.3)]
  ], { wt: "ventaja 2" });
  sc(S(28), S(29), "cg", [[S(28), "think"], [S(28) + 2.2, "give"]], [
    [p("calendar", S(28) + 0.7, { s: 0.4 }), c("10 años o más", "green", S(28) + 1.3)]
  ], { wt: "si lo usas mucho" });
  // 9 LA VENTAJA DEL USADO
  sc(S(29), S(30), "cg", [[S(29), "cheer"], [S(29) + 2.2, "point"]], [
    [c("alguien más pagó la caída", "green", S(29) + 0.7)]
  ], { wt: "el usado" });
  sc(S(30), S(31), "cg", [[S(30), "give"], [S(30) + 2.2, "sitRelaxed"]], [
    [c("pagas menos", "green", S(30) + 0.7), c("debes menos", "green", S(30) + 1.3)],
    [w("jar", S(30) + 3.6, { sc: 0.4 }), c("dinero libre", "green", S(30) + 4.2)]
  ], { wt: "por el mismo coche" });
  sc(S(31), S(32), "cg", [[S(31), "worry"], [S(31) + 2.4, "point"]], [
    [c("problema escondido", "red", S(31) + 0.8)],
    [c("revísalo con un mecánico", "green", S(31) + 4.6)]
  ], { wt: "el riesgo" });
  sc(S(32), S(33), "cg", [[S(32), "look"], [S(32) + 2.4, "give"]], [
    [w("doc", S(32) + 0.8, { sc: 0.4 }), c("sin reporte de robo", "green", S(32) + 1.4)],
    [c("sin adeudos", "green", S(32) + 4.6)]
  ], { wt: "en México" });
  // 10 ENTONCES CUÁL
  sc(S(33), S(34), "cg", [[S(33), "think"], [S(33) + 1.0, "shrug"]], []);
  sc(S(34), S(35), "cg", [[S(34), "point"], [S(34) + 2.2, "give"]], [
    [c("nuevo: buena parte de contado", "orange", S(34) + 0.7)],
    [c("y muchos años", "orange", S(34) + 3.8)]
  ], { wt: "el nuevo conviene si" });
  sc(S(35), S(36), "cg", [[S(35), "give"], [S(35) + 2.4, "cheer"]], [
    [c("usado: cuidar tu dinero", "green", S(35) + 0.8)],
    [c("revísalo bien", "green", S(35) + 4.4)]
  ], { wt: "el usado conviene si" });
  sc(S(36), S(37), "cg", [[S(36), "cheer"], [S(36) + 2.4, "point"]], [
    [p("car", S(36) + 0.8, { s: 0.4 }), big("2 o 3 años", "green", S(36) + 1.4)],
    [c("buen estado y papeles", "green", S(36) + 5.0)]
  ], { wt: "la mejor compra" });
  // 11 LA LECCIÓN
  sc(S(37), S(38), "cg", [[S(37), "point"], [S(37) + 1.6, "think"]], [
    [c("precio ≠ lo que te cuesta", "orange", S(37) + 0.6)]
  ], { wt: "la lección" });
  sc(S(38), S(39), "cg", [[S(38), "give"], [S(38) + 2.4, "worry"]], [
    [c("pérdida de valor", "red", S(38) + 0.8), sy("plus", S(38) + 1.4, "grey"), c("intereses", "red", S(38) + 2.0)],
    [c("+ mantenimiento", "red", S(38) + 5.0)]
  ], { wt: "lo que te cuesta" });
  // 12 CIERRE
  sc(S(39), S(40), "cg", [[S(39), "point"], [S(39) + 2.2, "calm"]], [
    [c("la cuenta completa", "green", S(39) + 0.7)],
    [c("no solo la mensualidad", "grey", S(39) + 3.8)]
  ], { wt: "antes de firmar" });
  sc(S(40), S(41), "cg", [[S(40), "calm"], [S(40) + 2.2, "look"]], [
    [c("contenido educativo", "grey", S(40) + 0.7)],
    [c("compara antes de comprar", "orange", S(40) + 3.8)]
  ], { wt: "aviso" });
  sc(S(41), END, "cg", [[S(41), "cheer"], [S(41) + 2.4, "give"]], [
    [c("¿nuevo o usado?", "orange", S(41) + 0.7)],
    [c("cuéntame en comentarios", "green", S(41) + 4.0)]
  ], { wt: "tu turno" });

  root.SCENES = SC;
})(window);

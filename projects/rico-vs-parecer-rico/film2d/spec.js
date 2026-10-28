/* Ser rico vs parecer rico (global) (Fábrica 2.0): the whole film as data. Times are REAL seconds of the narration (assets/audio/timeline.json).
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
  sc(0, S(1), "cg", [[S(0), "cheer"], [S(0) + 2.6, "give"]], []);
  sc(S(1), S(2), "cg", [[S(1), "point"], [S(1) + 2.0, "shrug"]], []);
  sc(S(2), S(3), "cg", [[S(2), "think"], [S(2) + 2.6, "point"]], []);
  // 2 DE QUÉ VA ESTO
  sc(S(3), S(4), "cg", [[S(3), "look"], [S(3) + 2.0, "point"]], [
    [c("parece rico", "orange", S(3) + 0.7), c("vs", "grey", S(3) + 1.3), c("es rico", "green", S(3) + 1.9)]
  ], { wt: "el tema de hoy" });
  sc(S(4), S(5), "cg", [[S(4), "think"], [S(4) + 1.6, "calm"]], [
    [w("eye", S(4) + 0.6, { sc: 0.4 }), c("casi nunca se nota", "green", S(4) + 1.2)]
  ], { wt: "la riqueza de verdad" });
  // 3 SUSCRÍBETE (recordatorio obligatorio)
  sc(S(5), S(6), "cg", [[S(5), "point"], [S(5) + 2.0, "cheer"]], [
    [big("SUSCRÍBETE", "red", S(5) + 4.0, { x: "stamp" })]
  ], { wt: "antes de seguir" });
  sc(S(6), S(7), "cg", [[S(6), "sitRelaxed"], [S(6) + 1.8, "give"]], [
    [c("una idea del dinero", "green", S(6) + 0.6)],
    [c("activa la campanita", "orange", S(6) + 3.8)]
  ], { wt: "cada semana" });
  sc(S(7), S(8), "cg", [[S(7), "calm"], [S(7) + 1.2, "point"]], []);
  // 4 DOS VECINOS
  sc(S(8), S(9), "cg", [[S(8), "give"], [S(8) + 2.2, "point"]], [
    [c("Carlos", "orange", S(8) + 0.7), c("Pedro", "green", S(8) + 1.3)],
    [c("mismo sueldo", "grey", S(8) + 4.2)]
  ], { wt: "dos vecinos" });
  sc(S(9), S(10), "cg", [[S(9), "cheer"], [S(9) + 2.4, "phone"]], [
    [p("car", S(9) + 0.8, { s: 0.4 }), c("camioneta del año", "orange", S(9) + 1.4)],
    [p("phone", S(9) + 4.6, { s: 0.4 }), c("cenas caras", "orange", S(9) + 5.2)]
  ], { wt: "Carlos" });
  sc(S(10), S(11), "cg", [[S(10), "calm"], [S(10) + 2.0, "shrug"]], [
    [p("car", S(10) + 0.7, { s: 0.4 }), c("coche de hace 10 años", "grey", S(10) + 1.3)]
  ], { wt: "Pedro" });
  sc(S(11), S(12), "cg", [[S(11), "look"], [S(11) + 1.8, "point"]], [
    [c("¿quién tiene más?", "orange", S(11) + 0.6)],
    [c("todos: Carlos", "grey", S(11) + 3.0)]
  ], { wt: "la pregunta" });
  sc(S(12), S(13), "cg", [[S(12), "worry"], [S(12) + 2.4, "slump"]], [
    [p("card", S(12) + 0.8, { s: 0.4 }), c("camioneta a crédito", "red", S(12) + 1.4)],
    [c("el sueldo ya tiene dueño", "red", S(12) + 4.4)]
  ], { wt: "pero Carlos" });
  sc(S(13), S(14), "cg", [[S(13), "give"], [S(13) + 2.4, "cheer"]], [
    [w("jar", S(13) + 0.8, { sc: 0.4 }), c("guarda cada mes", "green", S(13) + 1.4)],
    [c("crece sin que nadie lo vea", "green", S(13) + 4.8)]
  ], { wt: "Pedro, en cambio" });
  // 5 LA RIQUEZA NO SE VE
  sc(S(14), S(15), "cg", [[S(14), "point"], [S(14) + 1.4, "think"]], [
    [c("la idea más importante", "orange", S(14) + 0.5)]
  ], { wt: "atención" });
  sc(S(15), S(16), "cg", [[S(15), "cheer"], [S(15) + 1.6, "point"]], [
    [big("el dinero que no gastaste", "green", S(15) + 0.6)]
  ], { wt: "la riqueza es" });
  sc(S(16), S(17), "cg", [[S(16), "shrug"], [S(16) + 2.4, "worry"]], [
    [c("camioneta", "orange", S(16) + 0.7), c("reloj", "orange", S(16) + 1.3), c("ropa", "orange", S(16) + 1.9)],
    [c("dinero que ya se fue", "red", S(16) + 4.6)]
  ], { wt: "lo que ves" });
  sc(S(17), S(18), "cg", [[S(17), "give"], [S(17) + 2.4, "cheer"]], [
    [w("iceberg", S(17) + 0.8, { sc: 0.4 }), c("ahorros e inversiones", "green", S(17) + 1.4)],
    [c("lo que te hace rico", "green", S(17) + 4.4)]
  ], { wt: "lo que no ves" });
  sc(S(18), S(19), "cg", [[S(18), "think"], [S(18) + 2.4, "look"]], [
    [c("escondido en una cuenta", "green", S(18) + 0.8)],
    [c("no en la calle", "grey", S(18) + 5.0)]
  ], { wt: "por eso" });
  // 6 LA TRAMPA DEL COCHE
  sc(S(19), S(20), "cg", [[S(19), "look"], [S(19) + 1.4, "point"]], [
    [c("algo más curioso", "orange", S(19) + 0.5)]
  ], { wt: "y hay más" });
  sc(S(20), S(21), "cg", [[S(20), "think"], [S(20) + 2.0, "shrug"]], [
    [p("car", S(20) + 0.7, { s: 0.4 }), c("coche de lujo", "orange", S(20) + 1.3)],
    [c("¿qué persona tan admirable?", "grey", S(20) + 3.8, { x: "strike" })]
  ], { wt: "cuando lo ves" });
  sc(S(21), S(22), "cg", [[S(21), "cheer"], [S(21) + 2.2, "think"]], [
    [c("si yo tuviera ese coche…", "orange", S(21) + 0.7)],
    [c("me admirarían a mí", "orange", S(21) + 3.8)]
  ], { wt: "lo que piensas" });
  sc(S(22), S(23), "cg", [[S(22), "point"], [S(22) + 2.2, "slump"]], [
    [c("compra para impresionar", "orange", S(22) + 0.7)],
    [c("no impresiona a nadie", "red", S(22) + 4.2)]
  ], { wt: "o sea" });
  sc(S(23), S(24), "cg", [[S(23), "look"], [S(23) + 2.2, "give"]], [
    [c("se fijan en el coche", "grey", S(23) + 0.7)],
    [c("no en ti", "red", S(23) + 4.0)]
  ], { wt: "la gente" });
  // 7 EL CONSERJE MILLONARIO
  sc(S(24), S(25), "cg", [[S(24), "point"], [S(24) + 1.4, "calm"]], [
    [c("un ejemplo real", "orange", S(24) + 0.5)]
  ], { wt: "la historia" });
  sc(S(25), S(26), "cg", [[S(25), "give"], [S(25) + 2.4, "look"]], [
    [c("Ronald Read", "orange", S(25) + 0.8)],
    [c("gasolinera", "grey", S(25) + 4.6), c("conserje", "grey", S(25) + 5.2)]
  ], { wt: "toda su vida" });
  sc(S(26), S(27), "cg", [[S(26), "sitRelaxed"], [S(26) + 2.2, "calm"]], [
    [p("house", S(26) + 0.7, { s: 0.4 }), c("casa sencilla", "grey", S(26) + 1.3)],
    [c("partía su leña", "grey", S(26) + 4.0)]
  ], { wt: "cómo vivía" });
  sc(S(27), S(28), "cg", [[S(27), "worry"], [S(27) + 2.4, "cheer"]], [
    [p("calendar", S(27) + 0.8, { s: 0.4 }), c("2014", "grey", S(27) + 1.4)],
    [big("≈ 8 millones de dólares", "green", S(27) + 4.6)]
  ], { wt: "la sorpresa" });
  sc(S(28), S(29), "cg", [[S(28), "shrug"], [S(28) + 2.4, "point"]], [
    [c("lotería", "grey", S(28) + 0.8, { x: "strike" })],
    [c("ahorrar", "green", S(28) + 3.8), c("invertir", "green", S(28) + 4.4), c("esperar", "green", S(28) + 5.0)]
  ], { wt: "su secreto" });
  sc(S(29), S(30), "cg", [[S(29), "give"], [S(29) + 2.0, "cheer"]], [
    [p("building", S(29) + 0.7, { s: 0.4 }), c("hospital y biblioteca", "green", S(29) + 1.3)]
  ], { wt: "lo que dejó" });
  // 8 HACERSE RICO VS SEGUIR RICO
  sc(S(30), S(31), "cg", [[S(30), "look"], [S(30) + 1.0, "worry"]], []);
  sc(S(31), S(32), "cg", [[S(31), "point"], [S(31) + 2.2, "slump"]], [
    [c("sueldos enormes", "orange", S(31) + 0.7), p("house", S(31) + 1.3, { s: 0.4 })],
    [c("terminan en la ruina", "red", S(31) + 4.0)]
  ], { wt: "ejecutivos" });
  sc(S(32), S(33), "cg", [[S(32), "shrug"], [S(32) + 2.4, "worry"]], [
    [c("gastaban más de lo que ganaban", "red", S(32) + 0.8)],
    [p("card", S(32) + 4.0, { s: 0.4 }), c("pedían prestado", "red", S(32) + 4.6)]
  ], { wt: "el problema" });
  sc(S(33), S(34), "cg", [[S(33), "think"], [S(33) + 2.2, "point"]], [
    [c("hacerse rico", "orange", S(33) + 0.7), sy("neq", S(33) + 1.3, "grey"), c("seguir rico", "green", S(33) + 1.9)]
  ], { wt: "la clave" });
  sc(S(34), S(35), "cg", [[S(34), "cheer"], [S(34) + 2.2, "give"]], [
    [c("trabajar", "orange", S(34) + 0.7), c("arriesgarse", "orange", S(34) + 1.3), c("paciencia", "orange", S(34) + 1.9)]
  ], { wt: "para hacerse rico" });
  sc(S(35), S(36), "cg", [[S(35), "calm"], [S(35) + 2.4, "point"]], [
    [c("ser humilde", "green", S(35) + 0.8), c("gastar menos", "green", S(35) + 1.4)],
    [c("no apostar todo", "green", S(35) + 4.8)]
  ], { wt: "para seguir rico" });
  // 9 TENER DINERO VS SER LIBRE
  sc(S(36), S(37), "cg", [[S(36), "point"], [S(36) + 2.0, "cheer"]], [
    [big("libertad", "green", S(36) + 3.0)]
  ], { wt: "la diferencia" });
  sc(S(37), S(38), "cg", [[S(37), "worry"], [S(37) + 2.4, "slump"]], [
    [c("coche", "orange", S(37) + 0.8), c("tarjeta", "orange", S(37) + 1.4), c("renta", "orange", S(37) + 2.0)],
    [p("calendar", S(37) + 4.6, { s: 0.4 }), c("mes con mes", "red", S(37) + 5.2)]
  ], { wt: "parecer rico" });
  sc(S(38), S(39), "cg", [[S(38), "sitRelaxed"], [S(38) + 2.4, "cheer"]], [
    [p("clock", S(38) + 0.8, { s: 0.4 }), c("decides qué hacer con tu tiempo", "green", S(38) + 1.4)],
    [c("sin esperar la quincena", "green", S(38) + 5.0)]
  ], { wt: "ser rico de verdad" });
  sc(S(39), S(40), "cg", [[S(39), "worry"], [S(39) + 2.4, "calm"]], [
    [c("Carlos: pánico", "red", S(39) + 0.8)],
    [c("Pedro: meses de calma", "green", S(39) + 4.6)]
  ], { wt: "si pierdes el trabajo" });
  // 10 EL ENEMIGO
  sc(S(40), S(41), "cg", [[S(40), "point"], [S(40) + 1.8, "worry"]], [
    [big("compararte", "red", S(40) + 2.4)]
  ], { wt: "el enemigo #1" });
  sc(S(41), S(42), "cg", [[S(41), "look"], [S(41) + 2.2, "shrug"]], [
    [p("house", S(41) + 0.7, { s: 0.4 }), c("casa más grande", "orange", S(41) + 1.3)],
    [p("car", S(41) + 3.6, { s: 0.4 }), c("coche más caro", "orange", S(41) + 4.2)]
  ], { wt: "siempre habrá" });
  sc(S(42), S(43), "cg", [[S(42), "slump"], [S(42) + 2.4, "worry"]], [
    [c("me quedo atrás", "red", S(42) + 0.8)],
    [c("nunca es suficiente", "red", S(42) + 4.8)]
  ], { wt: "la trampa" });
  sc(S(43), S(44), "cg", [[S(43), "calm"], [S(43) + 2.2, "cheer"]], [
    [c("con esto me alcanza", "green", S(43) + 0.7)],
    [c("y estoy bien", "green", S(43) + 3.8)]
  ], { wt: "los que juntan dinero" });
  // 11 LA LECCIÓN
  sc(S(44), S(45), "cg", [[S(44), "point"], [S(44) + 2.4, "give"]], [
    [c("lo que muestras", "grey", S(44) + 0.8, { x: "strike" })],
    [w("jar", S(44) + 3.6, { sc: 0.4 }), c("lo que guardas", "green", S(44) + 4.2)]
  ], { wt: "la lección" });
  sc(S(45), S(46), "cg", [[S(45), "cheer"], [S(45) + 2.0, "point"]], [
    [w("coin", S(45) + 0.6, { sc: 0.4 }), c("ese dinero trabaja para ti", "green", S(45) + 1.2)]
  ], { wt: "cada vez que no gastas" });
  // 12 CIERRE
  sc(S(46), S(47), "cg", [[S(46), "think"], [S(46) + 2.4, "shrug"]], [
    [p("car", S(46) + 0.8, { s: 0.4 }), c("camioneta de lujo", "orange", S(46) + 1.4)],
    [c("¿cuánto debe?", "red", S(46) + 5.0)]
  ], { wt: "la próxima vez" });
  sc(S(47), S(48), "cg", [[S(47), "calm"], [S(47) + 2.2, "look"]], [
    [c("contenido educativo", "grey", S(47) + 0.7)],
    [c("no es asesoría financiera", "orange", S(47) + 3.8)]
  ], { wt: "aviso" });
  sc(S(48), END, "cg", [[S(48), "cheer"], [S(48) + 2.2, "give"]], [
    [c("¿Carlos o Pedro?", "orange", S(48) + 0.7)],
    [c("cuéntame en comentarios", "green", S(48) + 3.8)]
  ], { wt: "tu turno" });

  root.SCENES = SC;
})(window);

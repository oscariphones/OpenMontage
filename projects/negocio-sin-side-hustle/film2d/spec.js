/* Negocio sin side hustle: the whole film as data. Times are REAL seconds of the narration (assets/audio/timeline.json).
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
  sc(0, S(2), "cg", [[0, "think"], [S(1), "shrug"]], [
    [big("side hustle", "red", 0.8), sy("cross", 1.4, "red")],
    [c("¿rico? no así", "orange", S(1) + 0.2)]
  ]);
  sc(S(2), S(3), "cg", [[S(2), "worry"]], [
    [w("coin", S(2) + 0.5, { sc: 0.55 })],
    [c("unos dólares más", "grey", S(2) + 1.0), c("la misma rueda", "red", S(2) + 2.6)]
  ]);
  sc(S(3), S(4), "cg", [[S(3), "point"]], [
    [big("4 pasos", "orange", S(3) + 0.8)],
    [c("tu tiempo libre", "green", S(3) + 2.4)]
  ]);
  // 2 LA TRAMPA
  sc(S(4), S(6), "cg", [[S(4), "look"], [S(5), "phone"]], [
    [p("laptop", S(5) + 0.5, { s: 0.8 })],
    [c("video tras video", "grey", S(5) + 1.2), c("la idea perfecta", "orange", S(5) + 2.6)]
  ]);
  sc(S(6), S(7), "cg", [[S(6), "slump"]], [
    [c("perdido", "red", S(6) + 0.3), c("abrumado", "red", S(6) + 1.2)],
    [c("cero avance", "grey", S(6) + 2.4)]
  ]);
  sc(S(7), S(8), "cg", [[S(7), "calm"]], [
    [w("hourglass", S(7) + 0.4, { sc: 0.65 })],
    [c("poco dinero", "red", S(7) + 0.9), c("tiempo limitado", "orange", S(7) + 2.2)]
  ]);
  sc(S(8), S(9), "cg", [[S(8), "shrug"]], [
    [c("trabajitos", "grey", S(8) + 0.4), sy("neq", S(8) + 1.4, "red"), c("algo grande", "green", S(8) + 2.2)]
  ]);
  sc(S(9), S(10), "cg", [[S(9), "point"]], [
    [c("1 problema", "orange", S(9) + 1.2), c("2 resolver", "orange", S(9) + 2.4)],
    [c("3 cobrar", "orange", S(9) + 3.6), c("4 mejorar", "orange", S(9) + 4.8)]
  ]);
  // 3 PASO CERO
  sc(S(10), S(12), "cg", [[S(10), "point"], [S(11), "calm"]], [
    [big("paso 0", "orange", S(10) + 0.8)],
    [c("empieza ya", "green", S(10) + 2.4), c("sin buscar ideas sin fin", "grey", S(11) + 1.6)]
  ]);
  sc(S(12), S(14), "cg", [[S(12), "shrug"], [S(13), "worry"]], [
    [c("«todavía no es el momento»", "red", S(12) + 0.4)],
    [c("procrastinar", "red", S(13) + 0.4), c("impulso negativo", "grey", S(13) + 1.2)]
  ]);
  sc(S(14), S(15), "cg", [[S(14), "cheer"]], [
    [c("moverte", "green", S(14) + 0.3), sy("arrow", S(14) + 1.0, "green"), c("impulso positivo", "green", S(14) + 1.6)]
  ]);
  // 4 PASO UNO
  sc(S(15), S(17), "cg", [[S(15), "point"], [S(16), "think"]], [
    [big("1. problema", "orange", S(15) + 0.6)],
    [c("haz una lista", "green", S(16) + 2.4)]
  ]);
  sc(S(17), S(18), "cg", [[S(17), "look"]], [
    [w("doc", S(17) + 0.5, { sc: 0.5 })],
    [c("lo difícil de hacer", "grey", S(17) + 1.2), c("lo difícil de entender", "grey", S(17) + 3.0)]
  ]);
  sc(S(18), S(19), "cg", [[S(18), "calm"]], [
    [c("negocio", "orange", S(18) + 0.4), sy("eq", S(18) + 1.0, "grey"), c("resolver un problema", "green", S(18) + 1.6)]
  ]);
  sc(S(19), S(20), "cg", [[S(19), "point"]], [
    [c("contador → impuestos", "grey", S(19) + 0.6)],
    [c("fitness → rutina", "grey", S(19) + 2.8)]
  ]);
  sc(S(20), S(22), "cg", [[S(20), "look"], [S(21), "cheer"]], [
    [p("cup", S(20) + 0.8, { s: 0.8, lbl: "té premium" })],
    [c("tienda en línea", "orange", S(21) + 0.4), c("clases incluidas", "green", S(21) + 2.2)]
  ]);
  sc(S(22), S(23), "cg", [[S(22), "think"]], [
    [c("gallinas", "grey", S(22) + 0.4), c("abejas", "grey", S(22) + 1.2)],
    [c("pagarían por un curso", "green", S(22) + 3.2)]
  ]);
  sc(S(23), S(25), "cg", [[S(23), "point"], [S(24), "cheer"]], [
    [c("¿cuánta gente?", "orange", S(23) + 0.4), c("¿cuánto pagaría?", "orange", S(23) + 2.2)],
    [c("lo que preguntan los inversionistas", "grey", S(24) + 0.6)]
  ]);
  // 5 PASO DOS
  sc(S(25), S(27), "cg", [[S(25), "point"], [S(26), "think"]], [
    [big("2. resolver", "orange", S(25) + 0.5)],
    [c("enseñar", "grey", S(26) + 0.6), c("servicio", "grey", S(26) + 1.6), c("producto", "grey", S(26) + 2.6)]
  ]);
  sc(S(27), S(29), "cg", [[S(27), "shrug"], [S(28), "look"]], [
    [w("hourglass", S(27) + 0.4, { sc: 0.6 })],
    [c("no busques la perfecta", "red", S(27) + 0.9), c("aún no probaste nada", "grey", S(28) + 1.4)]
  ]);
  sc(S(29), S(30), "cg", [[S(29), "cheer"]], [
    [big("MVP", "green", S(29) + 0.5)],
    [c("lo más simple que resuelva", "orange", S(29) + 1.8)]
  ]);
  sc(S(30), S(31), "cg", [[S(30), "point"]], [
    [c("vende", "orange", S(30) + 0.3), c("escucha", "orange", S(30) + 1.1), c("mejora", "green", S(30) + 2.0)]
  ]);
  sc(S(31), S(33), "cg", [[S(31), "calm"], [S(32), "cheer"]], [
    [p("dumbbell", S(31) + 0.6, { s: 0.8 })],
    [c("rutinas sencillas", "grey", S(31) + 1.4), c("millones de suscriptores", "green", S(32) + 0.6), c("+ contenido premium", "orange", S(32) + 2.6)]
  ]);
  // 6 PASO TRES
  sc(S(33), S(35), "cg", [[S(33), "point"], [S(34), "think"]], [
    [big("3. cobrar", "orange", S(33) + 0.5)],
    [c("tu costo + tu tiempo", "grey", S(34) + 0.8)]
  ]);
  sc(S(35), S(37), "cg", [[S(35), "look"], [S(36), "point"]], [
    [w("bars", S(35) + 0.6, { hs: [120, 200], cols: [GREY, C.green], sc: 0.4 })],
    [c("mira lo que cobran otros", "grey", S(35) + 1.2), c("precio > costo", "green", S(36) + 0.6)]
  ]);
  sc(S(37), S(39), "cg", [[S(37), "shrug"], [S(38), "calm"]], [
    [c("cubre tus costos", "orange", S(37) + 0.8), c("paga tu tiempo", "orange", S(37) + 2.4)],
    [c("vende", "green", S(37) + 4.0)],
    [c("probar y aprender", "grey", S(38) + 0.6)]
  ]);
  sc(S(39), S(41), "cg", [[S(39), "phone"], [S(40), "cheer"]], [
    [p("play", S(39) + 1.0, { s: 0.8 })],
    [c("1 episodio por día", "orange", S(39) + 2.4), c("+100 millones de escuchas", "green", S(40) + 1.4)]
  ]);
  sc(S(41), S(42), "cg", [[S(41), "look"]], [
    [c("oyentes preguntan", "grey", S(41) + 0.4), sy("arrow", S(41) + 1.2, "green"), c("nace un curso", "green", S(41) + 1.8)]
  ]);
  // 7 PASO CUATRO
  sc(S(42), S(44), "cg", [[S(42), "point"], [S(43), "calm"]], [
    [big("4. mejora y repite", "orange", S(42) + 0.5)],
    [c("aquí te haces rico", "green", S(42) + 2.6)]
  ]);
  sc(S(44), S(45), "cg", [[S(44), "look"]], [
    [c("cada cliente", "grey", S(44) + 0.4), sy("arrow", S(44) + 1.0, "green"), c("mejor producto", "green", S(44) + 1.5)]
  ]);
  sc(S(45), S(46), "cg", [[S(45), "cheer"]], [
    [w("stairs", S(45) + 0.6, { n: 4, sc: 0.5 })],
    [c("+ rápido", "orange", S(45) + 1.2), c("+ fácil", "orange", S(45) + 2.2), c("+ barato", "orange", S(45) + 3.2)]
  ]);
  sc(S(46), S(47), "cg", [[S(46), "think"]], [
    [c("qué valoran tus clientes", "grey", S(46) + 0.5)],
    [c("vendes y cobras mejor", "green", S(46) + 2.2)]
  ]);
  sc(S(47), S(49), "cg", [[S(47), "point"], [S(48), "calm"]], [
    [c("tu negocio = fábrica", "orange", S(47) + 0.6)],
    [c("personas", "grey", S(48) + 0.9), c("procesos", "grey", S(48) + 1.8), c("software", "grey", S(48) + 2.6)]
  ]);
  // 8 CIERRE
  sc(S(49), S(50), "cg", [[S(49), "calm"]], [
    [c("problema", "orange", S(49) + 0.3), c("resolver", "orange", S(49) + 1.1), c("cobrar", "orange", S(49) + 1.9), c("mejorar", "green", S(49) + 2.7)]
  ]);
  sc(S(50), S(52), "cg", [[S(50), "look"], [S(51), "point"]], [
    [c("no son más listos", "grey", S(50) + 0.6), c("solo empezaron", "green", S(50) + 3.4)],
    [c("no gastes tu vida en trabajitos", "red", S(51) + 1.0)]
  ]);
  sc(S(52), S(53), "cg", [[S(52), "cheer"]], [
    [big("empieza hoy", "green", S(52) + 0.4)]
  ]);
  sc(S(53), END, "cg", [[S(53), "give"], [S(54), "cheer"]], [
    [c("guárdalo", "green", S(53) + 0.6), c("compártelo", "orange", S(53) + 1.6)],
    [c("¿qué problema vas a resolver?", "grey", S(54) + 0.4)],
    [c("contenido educativo, no es asesoría financiera", "grey", S(55) + 0.4)]
  ]);

  root.SCENES = SC;
})(window);

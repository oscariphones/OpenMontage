/* Fondos indexados: the whole film as data. Times are REAL seconds of the narration (assets/audio/timeline.json).
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
  sc(0, S(2), "cg", [[0, "think"], [S(1), "point"]], [
    [w("coin", 1.0, { sc: 0.55 }), w("coin", 1.4, { sc: 0.55 })],
    [c("la opción más aburrida", "orange", S(1) + 0.3), c("la que más gente común usa", "green", S(1) + 2.6)]
  ]);
  sc(S(2), S(4), "cg", [[S(2), "cheer"], [S(3), "calm"]], [
    [big("fondos indexados", "orange", S(2) + 0.6)],
    [c("sin trucos", "grey", S(3) + 0.1), c("sin jerga", "grey", S(3) + 0.9), c("sin mirar gráficas", "grey", S(3) + 1.7)]
  ]);
  // 2 QUÉ ES
  sc(S(4), S(6), "cg", [[S(4), "calm"], [S(5), "point"]], [
    [p("building", S(5) + 0.6, { s: 0.8, lbl: "una acción" })],
    [c("una sola empresa", "grey", S(5) + 2.2), c("si le va mal, a ti también", "red", S(5) + 3.4)]
  ]);
  sc(S(6), S(9), "cg", [[S(6), "look"], [S(7), "point"], [S(8), "cheer"]], [
    [w("stack", S(6) + 0.8, { n: 5, sc: 0.55 })],
    [c("un fondo indexado", "green", S(6) + 1.0), c("cientos de empresas", "orange", S(6) + 3.0)],
    [c("S&P 500", "orange", S(7) + 0.8), c("las 500 más grandes de EE. UU.", "grey", S(7) + 2.4)],
    [c("1 compra = 500 empresas", "green", S(8) + 0.3)]
  ]);
  // 3 CÓMO FUNCIONA
  sc(S(9), S(11), "cg", [[S(9), "point"]], [
    [c("índice +1 %", "green", S(10) + 0.8), sy("arrow", S(10) + 1.0, "green"), c("tu fondo +1 %", "green", S(10) + 1.8)],
    [c("índice −1 %", "red", S(10) + 3.0), sy("down", S(10) + 3.2, "red"), c("tu fondo −1 %", "red", S(10) + 3.8)]
  ]);
  sc(S(11), S(13), "cg", [[S(11), "look"], [S(12), "worry"]], [
    [big("≈ 10 % al año", "orange", S(11) + 0.8)],
    [c("promedio histórico", "grey", S(11) + 2.4), c("no es una promesa", "red", S(12) + 0.4)],
    [c("hay años en rojo", "red", S(12) + 2.6)]
  ]);
  sc(S(13), S(14), "cg", [[S(13), "cheer"]], [
    [w("coin", S(13) + 0.5, { sc: 0.55 }), w("coin", S(13) + 1.0, { sc: 0.55 })],
    [big("x2", "green", S(13) + 1.6), c("en 6 a 8 años", "orange", S(13) + 2.4)]
  ]);
  // 4 LO BUENO
  sc(S(14), S(16), "cg", [[S(14), "calm"], [S(15), "point"]], [
    [p("shield", S(14) + 0.5, { s: 0.9 })],
    [c("menos riesgo", "green", S(14) + 0.7), c("una cae, 499 compensan", "orange", S(15) + 1.2)]
  ]);
  sc(S(16), S(17), "cg", [[S(16), "look"], [S(16) + 3.5, "cheer"]], [
    [w("stairs", S(16) + 0.8, { n: 4, sc: 0.5 })],
    [c("crece con el tiempo", "green", S(16) + 1.2), c("no es para el viernes", "grey", S(16) + 3.0)]
  ]);
  sc(S(17), S(19), "cg", [[S(17), "sitRelaxed"]], [
    [c("comprar", "orange", S(18) + 0.2), c("esperar", "grey", S(18) + 1.2), c("listo", "green", S(18) + 2.2), sy("check", S(18) + 2.4, "green")],
    [c("sin investigar empresas", "grey", S(18) + 3.0)]
  ]);
  // 5 LO MALO
  sc(S(19), S(20), "cg", [[S(19), "shrug"]], [
    [c("también tiene contras", "red", S(19) + 0.9)]
  ]);
  sc(S(20), S(21), "cg", [[S(20), "calm"]], [
    [w("bars", S(20) + 0.6, { hs: [200, 200], cols: [GREY, C.orange], sc: 0.4 })],
    [c("no le ganas al mercado", "red", S(20) + 1.0), c("obtienes lo que da", "grey", S(20) + 2.6)]
  ]);
  sc(S(21), S(22), "cg", [[S(21), "worry"]], [
    [w("hourglass", S(21) + 0.4, { sc: 0.65 })],
    [c("es lento", "red", S(21) + 0.8), c("décadas", "orange", S(21) + 1.8)]
  ]);
  sc(S(22), S(24), "cg", [[S(22), "slump"], [S(23), "think"]], [
    [big("aburrido", "grey", S(22) + 0.6)],
    [c("sin emoción", "grey", S(22) + 2.0), c("sin apuestas", "grey", S(22) + 2.8)],
    [c("ni los expertos le ganan al mercado", "orange", S(23) + 1.4)]
  ]);
  sc(S(24), S(25), "cg", [[S(24), "cheer"]], [
    [c("aburrido", "grey", S(24) + 0.3), sy("arrow", S(24) + 1.2, "green"), c("funciona", "green", S(24) + 1.8)]
  ]);
  // 6 CÓMO ELEGIR
  sc(S(25), S(26), "cg", [[S(25), "point"]], [
    [big("4 cosas", "orange", S(25) + 0.8)]
  ]);
  sc(S(26), S(27), "cg", [[S(26), "look"]], [
    [p("card", S(26) + 0.5, { s: 0.8, lbl: "1. mínimo" })],
    [c("desde $1", "green", S(26) + 2.0), c("o miles de dólares", "red", S(26) + 3.0)]
  ]);
  sc(S(27), S(29), "cg", [[S(27), "worry"], [S(28), "point"]], [
    [w("doc", S(27) + 0.5, { sc: 0.5 })],
    [c("2. comisión por comprar", "red", S(27) + 1.0), c("decenas de dólares", "red", S(27) + 3.5)],
    [c("misma plataforma = $0", "green", S(28) + 2.2)]
  ]);
  sc(S(29), S(31), "cg", [[S(29), "calm"], [S(30), "point"]], [
    [c("3. costo anual", "orange", S(29) + 0.3)],
    [big("$2 por $10,000", "orange", S(29) + 2.6)],
    [c("más cerca de cero, mejor", "green", S(30) + 0.3)]
  ]);
  sc(S(31), S(32), "cg", [[S(31), "look"]], [
    [c("4. fondo indexado", "green", S(31) + 0.6), sy("eq", S(31) + 2.4, "grey"), c("o ETF", "green", S(31) + 3.0)]
  ]);
  // 7 CÓMO COMPRAR
  sc(S(32), S(34), "cg", [[S(32), "phone"], [S(33), "look"]], [
    [p("laptop", S(33) + 0.5, { s: 0.8 })],
    [c("paso 1: cuenta de inversión", "orange", S(33) + 0.8), c("casa de bolsa regulada", "grey", S(33) + 3.0), c("todo online", "grey", S(33) + 4.4)]
  ]);
  sc(S(34), S(35), "cg", [[S(34), "point"]], [
    [w("jar", S(34) + 0.6, { sc: 0.6, lbl: "tu fondo", v0: 0.1, lv: [[S(34) + 2.4, 0.5, 1.4]] })],
    [c("paso 2: elige y compra", "orange", S(34) + 0.8), c("con $100 basta", "green", S(34) + 3.2)]
  ]);
  sc(S(35), S(37), "cg", [[S(35), "calm"], [S(36), "cheer"]], [
    [w("snowball", S(35) + 0.8, { out: S(37) - 0.3, sc: 0.5 })],
    [c("paso 3: reinvertir dividendos", "green", S(35) + 1.0), c("bola de nieve", "orange", S(36) + 2.0)]
  ]);
  sc(S(37), S(39), "cg", [[S(37), "look"], [S(38), "sitRelaxed"]], [
    [p("clock", S(37) + 0.8, { s: 0.8 })],
    [c("se compra 1 vez al día", "grey", S(37) + 1.4), c("al cierre del mercado", "grey", S(37) + 3.2)],
    [c("sin prisa", "green", S(38) + 0.3)]
  ]);
  // 8 CUÁNDO VENDER
  sc(S(39), S(41), "cg", [[S(39), "point"], [S(40), "calm"]], [
    [big("nunca", "orange", S(39) + 1.6)],
    [c("sube ≠ vender", "grey", S(40) + 0.8), c("baja ≠ vender", "grey", S(40) + 2.0)]
  ]);
  sc(S(41), S(43), "cg", [[S(41), "worry"], [S(42), "calm"]], [
    [c("el miedo", "red", S(41) + 0.5), sy("arrow", S(41) + 1.2, "red"), c("vender en la caída", "red", S(41) + 1.8)],
    [c("pérdida temporal → definitiva", "red", S(41) + 3.4)],
    [c("vende solo si lo necesitas", "green", S(42) + 0.8)]
  ]);
  // 9 CIERRE
  sc(S(43), S(45), "cg", [[S(43), "calm"], [S(44), "point"]], [
    [w("stack", S(44) + 0.6, { n: 5, sc: 0.55 })],
    [c("1 compra, cientos de empresas", "green", S(44) + 1.0), c("rinde lo que el mercado", "orange", S(44) + 3.4)]
  ]);
  sc(S(45), S(47), "cg", [[S(45), "cheer"], [S(46), "look"]], [
    [c("elige uno barato", "orange", S(45) + 0.3), c("invierte cada mes", "orange", S(45) + 1.3), c("reinvierte", "orange", S(45) + 2.3)],
    [c("deja que el tiempo trabaje", "green", S(46) + 0.6)]
  ]);
  sc(S(47), END, "cg", [[S(47), "give"], [S(48), "cheer"]], [
    [c("guárdalo", "green", S(47) + 0.6), c("compártelo", "orange", S(47) + 1.6)],
    [c("¿ya inviertes o es tu primer paso?", "grey", S(48) + 0.4)],
    [c("contenido educativo, no es asesoría financiera", "grey", S(48) + 2.4)]
  ]);

  root.SCENES = SC;
})(window);

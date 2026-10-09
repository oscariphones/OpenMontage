/* Bola de nieve vs avalancha: the whole film as data. Times are REAL seconds of the narration (assets/audio/timeline.json).
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
  sc(0, S(1), "cg", [[S(0), "worry"]], [
    [c("varias deudas", "red", S(0) + 1.0)],
    [big("¿no avanzas?", "orange", S(0) + 2.4)]
  ]);
  sc(S(1), S(2), "cg", [[S(1), "shrug"]], [
    [c("pagas y pagas", "grey", S(1) + 0.6)],
    [c("el saldo no se mueve", "red", S(1) + 1.8)]
  ]);
  sc(S(2), S(3), "cg", [[S(2), "point"]], [
    [c("2 métodos", "orange", S(2) + 0.8)],
    [c("famosos", "green", S(2) + 2.4)]
  ]);
  sc(S(3), S(4), "cg", [[S(3), "look"]], [
    [c("uno es más barato", "green", S(3) + 0.6)],
    [c("otro, más fácil de aguantar", "orange", S(3) + 2.2)]
  ]);
  sc(S(4), S(5), "cg", [[S(4), "think"]], [
    [c("elegir bien", "green", S(4) + 0.8)],
    [c("rendirte o terminar", "orange", S(4) + 2.6)]
  ]);
  // 2 LA BASE COMUN
  sc(S(5), S(6), "cg", [[S(5), "calm"]], [
    [big("empiezan igual", "green", S(5) + 0.5)]
  ]);
  sc(S(6), S(7), "cg", [[S(6), "point"]], [
    [p("card", S(6) + 0.6, { s: 0.5 })],
    [c("mínimos en todas", "green", S(6) + 1.6)]
  ]);
  sc(S(7), S(8), "cg", [[S(7), "cheer"]], [
    [c("el extra", "orange", S(7) + 0.8)],
    [c("contra una sola deuda", "green", S(7) + 2.4)]
  ]);
  sc(S(8), S(9), "cg", [[S(8), "look"]], [
    [c("la diferencia", "grey", S(8) + 0.6)],
    [c("¿cuál atacar primero?", "orange", S(8) + 1.8)]
  ]);
  // 3 AVALANCHA
  sc(S(9), S(10), "cg", [[S(9), "point"]], [
    [big("avalancha", "orange", S(9) + 0.5)],
    [c("interés más alto primero", "green", S(9) + 2.4)]
  ]);
  sc(S(10), S(11), "cg", [[S(10), "look"]], [
    [c("tarjeta 24 %", "red", S(10) + 1.2), c("préstamo 8 %", "grey", S(10) + 3.2)]
  ]);
  sc(S(11), S(12), "cg", [[S(11), "point"]], [
    [c("todo el extra", "orange", S(11) + 0.6)],
    [c("a la tarjeta", "red", S(11) + 1.8)],
    [c("la que más cuesta", "grey", S(11) + 3.0)]
  ]);
  sc(S(12), S(13), "cg", [[S(12), "cheer"]], [
    [c("cae una", "green", S(12) + 0.6)],
    [c("su pago pasa a la siguiente", "orange", S(12) + 1.6)]
  ]);
  sc(S(13), S(14), "cg", [[S(13), "calm"]], [
    [w("bars", S(13) + 0.5, { hs: [100, 70, 40, 15], cols: [C.red, C.orange, C.cold, C.green], sc: 0.4 })],
    [c("hasta cero", "green", S(13) + 2.4)]
  ]);
  sc(S(14), S(15), "cg", [[S(14), "point"]], [
    [c("menos intereses", "green", S(14) + 1.4)],
    [c("la ruta más barata", "orange", S(14) + 3.0)]
  ]);
  // 4 BOLA DE NIEVE
  sc(S(15), S(16), "cg", [[S(15), "point"]], [
    [big("bola de nieve", "green", S(15) + 0.3)],
    [c("ignoras intereses", "grey", S(15) + 1.6)]
  ]);
  sc(S(16), S(17), "cg", [[S(16), "look"]], [
    [c("miras el saldo", "grey", S(16) + 0.8)],
    [c("la más pequeña primero", "green", S(16) + 3.0)]
  ]);
  sc(S(17), S(18), "cg", [[S(17), "cheer"]], [
    [c("la liquidas", "green", S(17) + 0.8)],
    [c("ese dinero pasa a la siguiente", "orange", S(17) + 2.2)]
  ]);
  sc(S(18), S(19), "cg", [[S(18), "cheer"]], [
    [c("tu bola crece", "green", S(18) + 0.6)],
    [w("bars", S(18) + 1.2, { hs: [20, 45, 75, 100], cols: [C.cold, C.orange, C.green, C.green], sc: 0.35 })]
  ]);
  sc(S(19), S(20), "cg", [[S(19), "shrug"]], [
    [c("cuesta un poco más", "orange", S(19) + 0.8)],
    [c("en intereses", "grey", S(19) + 2.4)]
  ]);
  sc(S(20), S(21), "cg", [[S(20), "worry"]], [
    [c("sobre todo con", "grey", S(20) + 0.6)],
    [c("tasas muy altas", "red", S(20) + 1.6)]
  ]);
  // 5 ENTONCES CUAL
  sc(S(21), S(22), "cg", [[S(21), "think"]], [
    [c("si es más barata", "grey", S(21) + 0.8)],
    [c("¿por qué la bola de nieve?", "orange", S(21) + 2.6)]
  ]);
  sc(S(22), S(23), "cg", [[S(22), "point"]], [
    [big("motivación", "green", S(22) + 0.8)],
    [c("una victoria que se ve", "orange", S(22) + 2.6)]
  ]);
  sc(S(23), S(24), "cg", [[S(23), "cheer"]], [
    [p("shield", S(23) + 0.6, { s: 0.5 })],
    [c("combustible para seguir", "green", S(23) + 1.8)]
  ]);
  sc(S(24), S(25), "cg", [[S(24), "calm"]], [
    [c("pagar un poco más", "orange", S(24) + 0.8)],
    [c("vale la pena si no abandonas", "green", S(24) + 2.4)]
  ]);
  sc(S(25), S(26), "cg", [[S(25), "worry"]], [
    [c("avalancha", "orange", S(25) + 0.6), c("exige disciplina", "red", S(25) + 1.6)],
    [c("sin premios pequeños", "grey", S(25) + 3.0)]
  ]);
  sc(S(26), S(27), "cg", [[S(26), "point"]], [
    [c("plan perfecto que abandonas", "red", S(26) + 0.6, { x: "strike" })],
    [c("imperfecto que terminas", "green", S(26) + 2.8)]
  ]);
  // 6 COMO ELEGIR
  sc(S(27), S(28), "cg", [[S(27), "look"]], [
    [c("¿te motivan los números?", "grey", S(27) + 0.6)],
    [c("avalancha", "orange", S(27) + 3.2)]
  ]);
  sc(S(28), S(29), "cg", [[S(28), "think"]], [
    [c("¿necesitas victorias rápidas?", "grey", S(28) + 0.6)],
    [c("bola de nieve", "green", S(28) + 3.4)]
  ]);
  sc(S(29), S(30), "cg", [[S(29), "point"]], [
    [c("paso 1", "orange", S(29) + 0.3)],
    [c("lista de deudas", "green", S(29) + 1.4)],
    [c("saldo", "grey", S(29) + 3.2), c("interés", "grey", S(29) + 3.8), c("mínimo", "grey", S(29) + 4.4)]
  ]);
  sc(S(30), S(31), "cg", [[S(30), "look"]], [
    [c("paso 2", "orange", S(30) + 0.3)],
    [c("elige un método", "green", S(30) + 1.4)],
    [c("define tu extra mensual", "grey", S(30) + 3.2)]
  ]);
  sc(S(31), S(32), "cg", [[S(31), "point"]], [
    [c("paso 3", "orange", S(31) + 0.3)],
    [c("nunca dejes los mínimos", "green", S(31) + 1.6)]
  ]);
  sc(S(32), S(33), "cg", [[S(32), "cheer"]], [
    [c("terminas una deuda", "grey", S(32) + 0.8)],
    [c("no lo gastes", "red", S(32) + 2.8), c("pásalo a la siguiente", "green", S(32) + 3.8)]
  ]);
  // 7 CIERRE
  sc(S(33), S(34), "cg", [[S(33), "calm"]], [
    [c("contenido educativo", "grey", S(33) + 0.5)],
    [c("no es asesoría financiera", "grey", S(33) + 1.8)]
  ]);
  sc(S(34), S(35), "cg", [[S(34), "calm"]], [
    [c("cada situación es distinta", "orange", S(34) + 0.8)],
    [c("revisa tus números", "green", S(34) + 2.6)]
  ]);
  sc(S(35), S(36), "cg", [[S(35), "point"]], [
    [c("el mejor método", "grey", S(35) + 0.6)],
    [c("el que sí sigues", "green", S(35) + 1.8)]
  ]);
  sc(S(36), END, "cg", [[S(36), "give"]], [
    [c("guárdalo", "green", S(36) + 0.6), c("compártelo", "orange", S(36) + 1.6)],
    [c("¿avalancha o bola de nieve?", "grey", S(36) + 4.0)]
  ]);

  root.SCENES = SC;
})(window);

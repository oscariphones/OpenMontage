/* Cómo los bancos crean dinero (global) (Fábrica 2.0): the whole film as data. Times are REAL seconds of the narration (assets/audio/timeline.json).
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
  sc(0, S(1), "cg", [[S(0), "give"], [S(0) + 2.8, "calm"]], []);
  sc(S(1), S(2), "cg", [[S(1), "shrug"], [S(1) + 2.4, "point"]], []);
  sc(S(2), S(3), "cg", [[S(2), "think"], [S(2) + 2.4, "cheer"]], []);
  // 2 DE QUÉ VA ESTO
  sc(S(3), S(4), "cg", [[S(3), "look"], [S(3) + 2.2, "point"]], [
    [p("building", S(3) + 0.6, { s: 0.4 }), c("¿cómo crean dinero los bancos?", "orange", S(3) + 1.2)]
  ], { wt: "el tema de hoy" });
  sc(S(4), S(5), "cg", [[S(4), "think"], [S(4) + 2.2, "give"]], [
    [c("cuenta de ahorro", "green", S(4) + 0.7)],
    [p("card", S(4) + 3.6, { s: 0.4 }), c("tarjeta de crédito", "orange", S(4) + 4.2)]
  ], { wt: "por qué te importa" });
  // 3 SUSCRÍBETE (recordatorio obligatorio)
  sc(S(5), S(6), "cg", [[S(5), "point"], [S(5) + 2.4, "cheer"]], [
    [big("SUSCRÍBETE", "red", S(5) + 4.4, { x: "stamp" })]
  ], { wt: "antes de seguir" });
  sc(S(6), S(7), "cg", [[S(6), "sitRelaxed"], [S(6) + 2.2, "give"]], [
    [c("secretos del dinero", "green", S(6) + 0.7)],
    [c("activa la campanita", "orange", S(6) + 3.6)]
  ], { wt: "cada semana" });
  sc(S(7), S(8), "cg", [[S(7), "calm"], [S(7) + 1.0, "look"]], []);
  // 4 EL NEGOCIO BÁSICO
  sc(S(8), S(9), "cg", [[S(8), "point"], [S(8) + 2.2, "think"]], [
    [p("building", S(8) + 0.7, { s: 0.4 }), c("¿cómo gana un banco?", "orange", S(8) + 1.3)]
  ], { wt: "lo básico" });
  sc(S(9), S(10), "cg", [[S(9), "give"], [S(9) + 2.2, "shrug"]], [
    [w("coin", S(9) + 0.7, { sc: 0.4 }), c("tú depositas", "grey", S(9) + 1.3)],
    [c("te paga poquito", "red", S(9) + 4.0)]
  ], { wt: "tu ahorro" });
  sc(S(10), S(11), "cg", [[S(10), "point"], [S(10) + 2.4, "cheer"]], [
    [c("presta a personas y empresas", "grey", S(10) + 0.8)],
    [c("cobra mucho más", "green", S(10) + 4.4)]
  ], { wt: "el préstamo" });
  sc(S(11), S(12), "cg", [[S(11), "think"], [S(11) + 2.2, "point"]], [
    [c("lo que cobra", "green", S(11) + 0.7), c("−", "grey", S(11) + 1.3), c("lo que te paga", "red", S(11) + 1.9)],
    [big("su ganancia", "green", S(11) + 4.0)]
  ], { wt: "la diferencia" });
  sc(S(12), S(13), "cg", [[S(12), "shrug"], [S(12) + 2.4, "worry"]], [
    [c("comisiones", "orange", S(12) + 0.8)],
    [c("manejo de cuenta", "red", S(12) + 4.6), c("retiros", "red", S(12) + 5.2), c("pagar tarde", "red", S(12) + 5.8)]
  ], { wt: "y además" });
  // 5 NO GUARDAN TU DINERO
  sc(S(13), S(14), "cg", [[S(13), "worry"], [S(13) + 2.2, "think"]], [
    [c("¿y si lo quiero sacar?", "orange", S(13) + 0.7)]
  ], { wt: "pero entonces" });
  sc(S(14), S(15), "cg", [[S(14), "point"], [S(14) + 2.0, "look"]], [
    [big("reserva fraccionaria", "orange", S(14) + 0.6)]
  ], { wt: "así se llama" });
  sc(S(15), S(16), "cg", [[S(15), "give"], [S(15) + 2.4, "point"]], [
    [w("jar", S(15) + 0.8, { sc: 0.4 }), c("guarda una parte pequeña", "orange", S(15) + 1.4)],
    [c("presta el resto", "green", S(15) + 4.8)]
  ], { wt: "qué significa" });
  sc(S(16), S(17), "cg", [[S(16), "look"], [S(16) + 2.4, "think"]], [
    [w("calstack", S(16) + 0.8, { sc: 0.4 }), c("muchos años", "grey", S(16) + 1.4)],
    [big("≈ 10 %", "orange", S(16) + 4.4)]
  ], { wt: "en Estados Unidos" });
  sc(S(17), S(18), "cg", [[S(17), "shrug"], [S(17) + 2.4, "calm"]], [
    [big("2020", "orange", S(17) + 0.8), c("requisito: 0 %", "red", S(17) + 1.4)],
    [c("igual guardan algo", "green", S(17) + 5.0)]
  ], { wt: "desde entonces" });
  // 6 LA MULTIPLICACIÓN
  sc(S(18), S(19), "cg", [[S(18), "cheer"], [S(18) + 1.8, "point"]], [
    [c("lo más interesante", "orange", S(18) + 0.6)]
  ], { wt: "atención" });
  sc(S(19), S(20), "cg", [[S(19), "give"], [S(19) + 2.4, "point"]], [
    [big("$10,000", "green", S(19) + 0.7)],
    [c("guarda $1,000", "grey", S(19) + 4.2), c("presta $9,000", "orange", S(19) + 4.6)]
  ], { wt: "imagina" });
  sc(S(20), S(21), "cg", [[S(20), "look"], [S(20) + 2.4, "give"]], [
    [c("lo gasta", "orange", S(20) + 0.8), sy("arrow", S(20) + 1.4, "grey"), c("otro lo deposita", "green", S(20) + 2.0)],
    [p("building", S(20) + 4.8, { s: 0.4 })]
  ], { wt: "el dinero viaja" });
  sc(S(21), S(22), "cg", [[S(21), "point"], [S(21) + 2.4, "think"]], [
    [c("guarda $900", "grey", S(21) + 0.8), c("presta $8,100", "orange", S(21) + 1.4)],
    [c("y se repite…", "green", S(21) + 4.4)]
  ], { wt: "otra vez" });
  sc(S(22), S(23), "cg", [[S(22), "calm"], [S(22) + 2.2, "cheer"]], [
    [c("tú sigues viendo $10,000", "grey", S(22) + 0.7)],
    [c("hay más dinero que antes", "green", S(22) + 4.2)]
  ], { wt: "magia" });
  sc(S(23), S(24), "cg", [[S(23), "point"], [S(23) + 2.4, "cheer"]], [
    [c("reserva del 10 %", "grey", S(23) + 0.8), w("stairs", S(23) + 1.4, { n: 4, sc: 0.4 })],
    [big("hasta $100,000", "green", S(23) + 5.0)]
  ], { wt: "el resultado" });
  // 7 EL VERDADERO SECRETO
  sc(S(24), S(25), "cg", [[S(24), "think"], [S(24) + 1.8, "point"]], [
    [c("todavía más directo", "orange", S(24) + 0.6)]
  ], { wt: "en realidad" });
  sc(S(25), S(26), "cg", [[S(25), "look"], [S(25) + 2.4, "shrug"]], [
    [w("doc", S(25) + 0.8, { sc: 0.4 }), c("Banco de Inglaterra", "orange", S(25) + 1.4)],
    [c("no saca billetes de una bóveda", "grey", S(25) + 4.8, { x: "strike" })]
  ], { wt: "lo explicó así" });
  sc(S(26), S(27), "cg", [[S(26), "give"], [S(26) + 2.4, "cheer"]], [
    [p("laptop", S(26) + 0.8, { s: 0.4 }), c("escribe un número nuevo", "orange", S(26) + 1.4)],
    [big("nace dinero", "green", S(26) + 4.4)]
  ], { wt: "el truco" });
  sc(S(27), S(28), "cg", [[S(27), "point"], [S(27) + 2.4, "think"]], [
    [c("no lo imprime el gobierno", "grey", S(27) + 0.8)],
    [c("lo crean los bancos al prestar", "green", S(27) + 4.6)]
  ], { wt: "por eso" });
  sc(S(28), S(29), "cg", [[S(28), "calm"], [S(28) + 2.0, "look"]], [
    [c("pagas el préstamo", "green", S(28) + 0.6), sy("arrow", S(28) + 1.2, "grey"), c("desaparece", "orange", S(28) + 1.8)]
  ], { wt: "y al revés" });
  // 8 DINERO DIGITAL
  sc(S(29), S(30), "cg", [[S(29), "point"], [S(29) + 2.2, "look"]], [
    [p("phone", S(29) + 0.7, { s: 0.4 }), c("números en una pantalla", "orange", S(29) + 1.3)]
  ], { wt: "por eso" });
  sc(S(30), S(31), "cg", [[S(30), "give"], [S(30) + 2.2, "shrug"]], [
    [w("coin", S(30) + 0.7, { sc: 0.4 }), c("billetes y monedas", "grey", S(30) + 1.3)],
    [c("una parte pequeña", "orange", S(30) + 4.0)]
  ], { wt: "el efectivo" });
  sc(S(31), S(32), "cg", [[S(31), "think"], [S(31) + 2.4, "calm"]], [
    [p("building", S(31) + 0.8, { s: 0.4 }), c("en las cuentas", "grey", S(31) + 1.4)],
    [big("una promesa", "orange", S(31) + 4.6)]
  ], { wt: "lo demás" });
  // 9 SI TODOS VAN AL BANCO
  sc(S(32), S(33), "cg", [[S(32), "look"], [S(32) + 1.4, "worry"]], [
    [c("el gran riesgo", "red", S(32) + 0.5)]
  ], { wt: "cuidado" });
  sc(S(33), S(34), "cg", [[S(33), "worry"], [S(33) + 2.4, "askHelp"]], [
    [c("todos sacan su dinero", "red", S(33) + 0.8)],
    [c("no alcanza el efectivo", "red", S(33) + 4.6)]
  ], { wt: "al mismo tiempo" });
  sc(S(34), S(35), "cg", [[S(34), "point"], [S(34) + 2.2, "slump"]], [
    [big("corrida bancaria", "red", S(34) + 0.7)],
    [c("cae en días", "orange", S(34) + 4.0)]
  ], { wt: "así se llama" });
  sc(S(35), S(36), "cg", [[S(35), "worry"], [S(35) + 2.4, "point"]], [
    [big("2023", "orange", S(35) + 0.8), c("Silicon Valley Bank", "grey", S(35) + 1.4)],
    [c("≈ $42 mil millones en un día", "red", S(35) + 5.2)]
  ], { wt: "un caso real" });
  sc(S(36), S(37), "cg", [[S(36), "slump"], [S(36) + 1.8, "shrug"]], [
    [c("banco cerrado", "red", S(36) + 0.6, { x: "strike" })]
  ], { wt: "al día siguiente" });
  // 10 EL SEGURO
  sc(S(37), S(38), "cg", [[S(37), "calm"], [S(37) + 2.2, "point"]], [
    [p("shield", S(37) + 0.7, { s: 0.4 }), c("seguro de depósitos", "green", S(37) + 1.3)]
  ], { wt: "contra el pánico" });
  sc(S(38), S(39), "cg", [[S(38), "give"], [S(38) + 2.2, "cheer"]], [
    [c("si tu banco quiebra", "red", S(38) + 0.7)],
    [c("te devuelve tu dinero", "green", S(38) + 4.0)]
  ], { wt: "cómo funciona" });
  sc(S(39), S(40), "cg", [[S(39), "point"], [S(39) + 2.4, "look"]], [
    [c("Estados Unidos", "grey", S(39) + 0.8)],
    [big("hasta $250,000", "green", S(39) + 4.4)]
  ], { wt: "por ejemplo" });
  // 11 LOS LÍMITES
  sc(S(40), S(41), "cg", [[S(40), "think"], [S(40) + 2.0, "shrug"]], [
    [c("¿dinero sin límite?", "orange", S(40) + 0.6)]
  ], { wt: "entonces" });
  sc(S(41), S(42), "cg", [[S(41), "point"], [S(41) + 2.4, "give"]], [
    [c("clientes que paguen", "green", S(41) + 0.8)],
    [p("shield", S(41) + 4.8, { s: 0.4 }), c("dinero propio para pérdidas", "orange", S(41) + 5.4)]
  ], { wt: "no tan rápido" });
  sc(S(42), S(43), "cg", [[S(42), "look"], [S(42) + 2.4, "think"]], [
    [p("building", S(42) + 0.8, { s: 0.4 }), c("banco central", "orange", S(42) + 1.4)],
    [c("sube o baja las tasas", "grey", S(42) + 4.8)]
  ], { wt: "y además" });
  // 12 LA LECCIÓN
  sc(S(43), S(44), "cg", [[S(43), "point"], [S(43) + 2.4, "think"]], [
    [c("gana con tus ahorros", "green", S(43) + 0.8)],
    [c("y con tus deudas", "red", S(43) + 4.6)]
  ], { wt: "la lección" });
  sc(S(44), S(45), "cg", [[S(44), "worry"], [S(44) + 2.2, "slump"]], [
    [p("card", S(44) + 0.7, { s: 0.4 }), c("tú pagas intereses altos", "red", S(44) + 1.3)]
  ], { wt: "si tienes deuda" });
  sc(S(45), S(46), "cg", [[S(45), "give"], [S(45) + 2.4, "cheer"]], [
    [c("1. paga deudas caras", "orange", S(45) + 0.8)],
    [c("2. busca buen interés", "green", S(45) + 4.6)]
  ], { wt: "por eso" });
  sc(S(46), S(47), "cg", [[S(46), "point"], [S(46) + 2.4, "calm"]], [
    [p("shield", S(46) + 0.8, { s: 0.4 }), c("revisa el seguro", "green", S(46) + 1.4)],
    [c("tu dinero = préstamo al banco", "orange", S(46) + 5.2)]
  ], { wt: "y revisa" });
  // 13 CIERRE
  sc(S(47), S(48), "cg", [[S(47), "point"], [S(47) + 2.0, "cheer"]], [
    [big("crean dinero al prestar", "green", S(47) + 0.6)]
  ], { wt: "resumen" });
  sc(S(48), S(49), "cg", [[S(48), "look"], [S(48) + 2.4, "give"]], [
    [p("phone", S(48) + 0.8, { s: 0.4 }), c("tu saldo es una promesa", "orange", S(48) + 1.4)],
    [c("no billetes con tu nombre", "grey", S(48) + 5.0)]
  ], { wt: "la próxima vez" });
  sc(S(49), S(50), "cg", [[S(49), "calm"], [S(49) + 2.2, "look"]], [
    [c("contenido educativo", "grey", S(49) + 0.7)],
    [c("no es asesoría financiera", "orange", S(49) + 3.6)]
  ], { wt: "aviso" });
  sc(S(50), END, "cg", [[S(50), "cheer"], [S(50) + 2.4, "give"]], [
    [c("¿qué tema sigue?", "orange", S(50) + 0.7)],
    [c("cuéntame en comentarios", "green", S(50) + 4.4)]
  ], { wt: "tu turno" });

  root.SCENES = SC;
})(window);

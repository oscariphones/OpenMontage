/* Acciones vs bienes raíces (global con detalles de México) (Fábrica 2.0): the whole film as data. Times are REAL seconds of the narration (assets/audio/timeline.json).
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
  sc(0, S(1), "cg", [[S(0), "point"], [S(0) + 2.6, "give"]], []);
  sc(S(1), S(2), "cg", [[S(1), "cheer"], [S(1) + 2.4, "calm"]], []);
  sc(S(2), S(3), "cg", [[S(2), "think"], [S(2) + 2.6, "shrug"]], []);
  // 2 DE QUÉ VA ESTO
  sc(S(3), S(4), "cg", [[S(3), "look"], [S(3) + 2.2, "point"]], [
    [w("bars", S(3) + 0.7, { sc: 0.4 }), c("acciones", "green", S(3) + 1.2), c("vs", "grey", S(3) + 1.7), p("house", S(3) + 2.2, { s: 0.4 }), c("bienes raíces", "orange", S(3) + 2.7)]
  ], { wt: "el tema de hoy" });
  sc(S(4), S(5), "cg", [[S(4), "think"], [S(4) + 2.4, "give"]], [
    [c("¿cuál te conviene?", "orange", S(4) + 0.8)],
    [c("con detalles de México", "green", S(4) + 4.6)]
  ], { wt: "al final" });
  // 3 SUSCRÍBETE (recordatorio obligatorio)
  sc(S(5), S(6), "cg", [[S(5), "point"], [S(5) + 2.4, "cheer"]], [
    [big("SUSCRÍBETE", "red", S(5) + 4.4, { x: "stamp" })]
  ], { wt: "antes de seguir" });
  sc(S(6), S(7), "cg", [[S(6), "sitRelaxed"], [S(6) + 2.2, "give"]], [
    [c("secretos del dinero", "green", S(6) + 0.7)],
    [c("activa la campanita", "orange", S(6) + 3.6)]
  ], { wt: "cada semana" });
  sc(S(7), S(8), "cg", [[S(7), "calm"], [S(7) + 1.2, "cheer"]], []);
  // 4 LOS DOS CAMINOS
  sc(S(8), S(9), "cg", [[S(8), "give"], [S(8) + 2.4, "point"]], [
    [c("Ana: $50 mil", "orange", S(8) + 0.8), c("Luis: $50 mil", "green", S(8) + 1.4)],
    [c("mismo sueldo", "grey", S(8) + 4.6)]
  ], { wt: "imagina" });
  sc(S(9), S(10), "cg", [[S(9), "point"], [S(9) + 2.4, "think"]], [
    [c("enganche de $50 mil", "orange", S(9) + 0.8)],
    [p("house", S(9) + 4.2, { s: 0.4 }), c("casa de $250 mil", "orange", S(9) + 4.8)]
  ], { wt: "el camino de Ana" });
  sc(S(10), S(11), "cg", [[S(10), "cheer"], [S(10) + 2.4, "give"]], [
    [c("la renta", "green", S(10) + 0.8), sy("arrow", S(10) + 1.4, "grey"), c("paga el crédito", "orange", S(10) + 2.0)]
  ], { wt: "el plan" });
  sc(S(11), S(12), "cg", [[S(11), "look"], [S(11) + 2.4, "point"]], [
    [c("fondo indexado", "green", S(11) + 0.8)],
    [w("blocks", S(11) + 4.6, { sc: 0.4 }), c("pedacito de cientos de empresas", "grey", S(11) + 5.2)]
  ], { wt: "el camino de Luis" });
  sc(S(12), S(13), "cg", [[S(12), "sitRelaxed"], [S(12) + 2.4, "calm"]], [
    [c("nada que arreglar", "green", S(12) + 0.8)],
    [p("phone", S(12) + 4.0, { s: 0.4 }), c("revisa de vez en cuando", "grey", S(12) + 4.5)]
  ], { wt: "su día a día" });
  // 5 EL PRIMER AÑO
  sc(S(13), S(14), "cg", [[S(13), "cheer"], [S(13) + 2.0, "point"]], [
    [c("Ana se siente ganadora", "orange", S(13) + 0.6)]
  ], { wt: "al principio" });
  sc(S(14), S(15), "cg", [[S(14), "give"], [S(14) + 2.4, "cheer"]], [
    [w("coin", S(14) + 0.8, { sc: 0.4 }), c("renta cada mes", "green", S(14) + 1.4)],
    [p("house", S(14) + 4.4, { s: 0.4 }), c("esto es mío", "orange", S(14) + 5.0)]
  ], { wt: "la emoción" });
  sc(S(15), S(16), "cg", [[S(15), "look"], [S(15) + 2.4, "shrug"]], [
    [c("sube", "green", S(15) + 0.8), c("baja", "red", S(15) + 1.4), c("sube", "green", S(15) + 2.0)]
  ], { wt: "Luis" });
  sc(S(16), S(17), "cg", [[S(16), "think"], [S(16) + 2.2, "point"]], [
    [c("una casa: real", "orange", S(16) + 0.7)],
    [c("un número: no tanto", "grey", S(16) + 4.0)]
  ], { wt: "cómo se siente" });
  sc(S(17), S(18), "cg", [[S(17), "point"], [S(17) + 2.0, "calm"]], [
    [c("sentir", "grey", S(17) + 0.6), sy("neq", S(17) + 1.2, "grey"), c("cuentas", "green", S(17) + 1.8)]
  ], { wt: "pero" });
  // 6 LOS GASTOS ESCONDIDOS
  sc(S(18), S(19), "cg", [[S(18), "think"], [S(18) + 2.0, "look"]], [
    [w("doc", S(18) + 0.6, { sc: 0.4 }), c("las cuentas completas", "orange", S(18) + 1.2)]
  ], { wt: "ahora sí" });
  sc(S(19), S(20), "cg", [[S(19), "worry"], [S(19) + 2.4, "slump"]], [
    [c("casa vacía", "red", S(19) + 0.8)],
    [c("el crédito se paga igual", "red", S(19) + 4.2)]
  ], { wt: "gasto 1" });
  sc(S(20), S(21), "cg", [[S(20), "shrug"], [S(20) + 2.4, "worry"]], [
    [c("calentador", "red", S(20) + 0.8), c("goteras", "red", S(20) + 1.4), c("pintura", "red", S(20) + 2.0)],
    [c("de su bolsillo", "orange", S(20) + 4.8)]
  ], { wt: "gasto 2" });
  sc(S(21), S(22), "cg", [[S(21), "give"], [S(21) + 2.2, "think"]], [
    [c("impuesto", "red", S(21) + 0.7), p("shield", S(21) + 1.3, { s: 0.4 }), c("seguro", "red", S(21) + 1.9)],
    [c("administrador", "red", S(21) + 4.0)]
  ], { wt: "gasto 3" });
  sc(S(22), S(23), "cg", [[S(22), "phone"], [S(22) + 2.4, "worry"]], [
    [p("clock", S(22) + 0.8, { s: 0.4 }), c("su tiempo", "orange", S(22) + 1.4)],
    [c("llamadas", "grey", S(22) + 4.6), c("pleitos", "grey", S(22) + 5.2)]
  ], { wt: "el gasto olvidado" });
  sc(S(23), S(24), "cg", [[S(23), "point"], [S(23) + 2.4, "slump"]], [
    [c("ganancia grande", "green", S(23) + 0.8, { x: "strike" })],
    [c("pequeña… o negativa", "red", S(23) + 5.0)]
  ], { wt: "cuando sumas todo" });
  // 7 LA VENTAJA DE LA CASA
  sc(S(24), S(25), "cg", [[S(24), "cheer"], [S(24) + 2.0, "point"]], [
    [big("apalancamiento", "orange", S(24) + 0.6)]
  ], { wt: "el arma de Ana" });
  sc(S(25), S(26), "cg", [[S(25), "give"], [S(25) + 2.2, "cheer"]], [
    [c("controla $250 mil", "green", S(25) + 0.6), c("puso $50 mil", "grey", S(25) + 1.2)]
  ], { wt: "cómo funciona" });
  sc(S(26), S(27), "cg", [[S(26), "point"], [S(26) + 2.4, "think"]], [
    [p("house", S(26) + 0.8, { s: 0.4 }), c("sube 4 % al año", "green", S(26) + 1.4)],
    [c("sobre toda la casa", "orange", S(26) + 5.2)]
  ], { wt: "si sube" });
  sc(S(27), S(28), "cg", [[S(27), "give"], [S(27) + 2.4, "cheer"]], [
    [c("el inquilino paga el crédito", "green", S(27) + 0.8)],
    [c("la casa es más suya", "green", S(27) + 4.6)]
  ], { wt: "cada mes" });
  sc(S(28), S(29), "cg", [[S(28), "point"], [S(28) + 2.4, "worry"]], [
    [c("puede ganarle a la bolsa", "green", S(28) + 0.8)],
    [c("sin sorpresas grandes", "orange", S(28) + 4.6)]
  ], { wt: "por eso" });
  // 8 LA VENTAJA DE LA BOLSA
  sc(S(29), S(30), "cg", [[S(29), "calm"], [S(29) + 2.0, "point"]], [
    [c("las armas de Luis", "green", S(29) + 0.6)]
  ], { wt: "su turno" });
  sc(S(30), S(31), "cg", [[S(30), "look"], [S(30) + 2.4, "point"]], [
    [w("bars", S(30) + 0.8, { sc: 0.4 }), big("≈ 10 % al año", "green", S(30) + 1.4)],
    [c("con años muy malos", "red", S(30) + 5.6)]
  ], { wt: "históricamente" });
  sc(S(31), S(32), "cg", [[S(31), "think"], [S(31) + 2.4, "cheer"]], [
    [c("$50 mil", "grey", S(31) + 0.8), sy("arrow", S(31) + 1.4, "grey"), c("+$300 mil", "green", S(31) + 2.0)],
    [p("calendar", S(31) + 5.0, { s: 0.4 }), c("20 años", "orange", S(31) + 5.6)]
  ], { wt: "si se repitiera" });
  sc(S(32), S(33), "cg", [[S(32), "give"], [S(32) + 2.4, "shrug"]], [
    [c("vende en días", "green", S(32) + 0.8)],
    [p("house", S(32) + 4.6, { s: 0.4 }), c("una casa: meses", "red", S(32) + 5.2)]
  ], { wt: "si necesita dinero" });
  sc(S(33), S(34), "cg", [[S(33), "point"], [S(33) + 2.4, "calm"]], [
    [w("blocks", S(33) + 0.8, { sc: 0.4 }), c("cientos de empresas", "green", S(33) + 1.4)],
    [c("no una sola casa", "grey", S(33) + 4.6)]
  ], { wt: "repartido" });
  // 9 EN MÉXICO
  sc(S(34), S(35), "cg", [[S(34), "look"], [S(34) + 1.8, "point"]], [
    [c("en México cambia", "orange", S(34) + 0.6)]
  ], { wt: "en México" });
  sc(S(35), S(36), "cg", [[S(35), "worry"], [S(35) + 2.4, "think"]], [
    [c("crédito hipotecario", "grey", S(35) + 0.8)],
    [big("≈ 10 a 12 %", "red", S(35) + 5.0)]
  ], { wt: "las tasas" });
  sc(S(36), S(37), "cg", [[S(36), "shrug"], [S(36) + 2.4, "slump"]], [
    [c("pedir prestado cuesta más", "red", S(36) + 0.8)],
    [c("la renta alcanza menos", "red", S(36) + 4.6)]
  ], { wt: "eso significa" });
  sc(S(37), S(38), "cg", [[S(37), "give"], [S(37) + 2.4, "point"]], [
    [w("doc", S(37) + 0.8, { sc: 0.4 }), c("la renta paga impuestos", "orange", S(37) + 1.4)],
    [c("cuéntalos también", "grey", S(37) + 4.6)]
  ], { wt: "y además" });
  sc(S(38), S(39), "cg", [[S(38), "point"], [S(38) + 2.4, "cheer"]], [
    [big("FIBRAS", "green", S(38) + 0.8)],
    [p("building", S(38) + 5.0, { s: 0.4 }), c("plazas, oficinas, bodegas", "orange", S(38) + 5.6)]
  ], { wt: "otra opción" });
  sc(S(39), S(40), "cg", [[S(39), "give"], [S(39) + 2.2, "look"]], [
    [c("Bolsa Mexicana de Valores", "grey", S(39) + 0.7)],
    [w("coin", S(39) + 3.8, { sc: 0.4 }), c("te reparten rentas", "green", S(39) + 4.3)]
  ], { wt: "cómo funcionan" });
  sc(S(40), S(41), "cg", [[S(40), "phone"], [S(40) + 2.4, "cheer"]], [
    [p("phone", S(40) + 0.8, { s: 0.4 }), c("app de casa de bolsa", "orange", S(40) + 1.4)],
    [c("fondos con poco dinero", "green", S(40) + 4.6)]
  ], { wt: "y la bolsa" });
  // 10 ENTONCES CUÁL
  sc(S(41), S(42), "cg", [[S(41), "think"], [S(41) + 1.6, "shrug"]], [
    [c("¿cuál es mejor?", "orange", S(41) + 0.6)]
  ], { wt: "entonces" });
  sc(S(42), S(43), "cg", [[S(42), "point"], [S(42) + 2.4, "give"]], [
    [p("house", S(42) + 0.8, { s: 0.4 }), c("casa: si te gusta administrar", "orange", S(42) + 1.4)],
    [c("colchón", "grey", S(42) + 4.8), c("buena compra", "grey", S(42) + 5.4)]
  ], { wt: "la casa" });
  sc(S(43), S(44), "cg", [[S(43), "give"], [S(43) + 2.4, "cheer"]], [
    [w("bars", S(43) + 0.8, { sc: 0.4 }), c("bolsa: algo sencillo", "green", S(43) + 1.4)],
    [c("poco dinero, poco tiempo", "grey", S(43) + 4.8)]
  ], { wt: "la bolsa" });
  sc(S(44), S(45), "cg", [[S(44), "cheer"], [S(44) + 2.4, "point"]], [
    [c("primero la bolsa", "green", S(44) + 0.8), sy("plus", S(44) + 1.4, "grey"), c("después una casa", "orange", S(44) + 2.0)]
  ], { wt: "o las dos" });
  // 11 LA LECCIÓN
  sc(S(45), S(46), "cg", [[S(45), "point"], [S(45) + 2.4, "think"]], [
    [c("cuentas completas", "green", S(45) + 0.8)],
    [c("no lo que se siente", "grey", S(45) + 4.4, { x: "strike" })]
  ], { wt: "la lección" });
  sc(S(46), S(47), "cg", [[S(46), "give"], [S(46) + 2.4, "worry"]], [
    [c("gastos", "orange", S(46) + 0.8), c("tiempo", "orange", S(46) + 1.4)],
    [c("¿y si sale mal?", "red", S(46) + 4.8)]
  ], { wt: "suma todo" });
  // 12 CIERRE
  sc(S(47), S(48), "cg", [[S(47), "calm"], [S(47) + 2.4, "cheer"]], [
    [c("ninguna es mágica", "grey", S(47) + 0.8)],
    [big("tiempo y entender", "green", S(47) + 4.4)]
  ], { wt: "resumen" });
  sc(S(48), S(49), "cg", [[S(48), "calm"], [S(48) + 2.2, "look"]], [
    [c("contenido educativo", "grey", S(48) + 0.7)],
    [c("no es asesoría financiera", "orange", S(48) + 3.6)]
  ], { wt: "aviso" });
  sc(S(49), END, "cg", [[S(49), "cheer"], [S(49) + 2.4, "give"]], [
    [c("¿casa o bolsa?", "orange", S(49) + 0.7)],
    [c("cuéntame en comentarios", "green", S(49) + 4.4)]
  ], { wt: "tu turno" });

  root.SCENES = SC;
})(window);

/* Las aerolíneas ganan con las millas (global) (Fábrica 2.0): the whole film as data. Times are REAL seconds of the narration (assets/audio/timeline.json).
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
  sc(0, S(1), "cg", [[S(0), "worry"], [S(0) + 2.6, "slump"]], []);
  sc(S(1), S(2), "cg", [[S(1), "give"], [S(1) + 2.6, "point"]], []);
  sc(S(2), S(3), "cg", [[S(2), "cheer"], [S(2) + 2.6, "think"]], []);
  // 2 DE QUÉ VA ESTO
  sc(S(3), S(4), "cg", [[S(3), "look"], [S(3) + 2.2, "point"]], [
    [w("plane", S(3) + 0.7, { sc: 0.4 }), c("un negocio difícil", "orange", S(3) + 1.3)],
    [c("una mina de oro", "green", S(3) + 4.4)]
  ], { wt: "el tema de hoy" });
  sc(S(4), S(5), "cg", [[S(4), "think"], [S(4) + 1.6, "give"]], [
    [c("¿te conviene?", "orange", S(4) + 0.6)]
  ], { wt: "al final" });
  // 3 SUSCRÍBETE (recordatorio obligatorio)
  sc(S(5), S(6), "cg", [[S(5), "point"], [S(5) + 2.0, "cheer"]], [
    [big("SUSCRÍBETE", "red", S(5) + 4.2, { x: "stamp" })]
  ], { wt: "antes de seguir" });
  sc(S(6), S(7), "cg", [[S(6), "sitRelaxed"], [S(6) + 2.0, "give"]], [
    [c("negocios escondidos", "green", S(6) + 0.7)],
    [c("activa la campanita", "orange", S(6) + 3.8)]
  ], { wt: "cada semana" });
  sc(S(7), S(8), "cg", [[S(7), "calm"], [S(7) + 1.0, "cheer"]], []);
  // 4 UN NEGOCIO DIFÍCIL
  sc(S(8), S(9), "cg", [[S(8), "cheer"], [S(8) + 2.0, "shrug"]], [
    [c("boletos caros", "green", S(8) + 0.7)]
  ], { wt: "parece buen negocio" });
  sc(S(9), S(10), "cg", [[S(9), "worry"], [S(9) + 2.4, "slump"]], [
    [c("aviones", "red", S(9) + 0.8), c("gasolina", "red", S(9) + 1.4)],
    [c("pilotos", "red", S(9) + 4.0), c("aeropuertos", "red", S(9) + 4.6)]
  ], { wt: "los gastos" });
  sc(S(10), S(11), "cg", [[S(10), "shrug"], [S(10) + 2.2, "worry"]], [
    [c("una baja", "orange", S(10) + 0.7), sy("arrow", S(10) + 1.3, "grey"), c("todas bajan", "red", S(10) + 1.9)]
  ], { wt: "los precios" });
  sc(S(11), S(12), "cg", [[S(11), "slump"], [S(11) + 2.4, "think"]], [
    [c("le queda muy poquito", "red", S(11) + 0.8)]
  ], { wt: "de cada boleto" });
  sc(S(12), S(13), "cg", [[S(12), "worry"], [S(12) + 2.2, "slump"]], [
    [c("crisis o pandemia", "red", S(12) + 0.7)],
    [c("quiebra", "red", S(12) + 3.6)]
  ], { wt: "cuando llega" });
  // 5 LAS MILLAS
  sc(S(13), S(14), "cg", [[S(13), "give"], [S(13) + 2.2, "point"]], [
    [c("un premio sencillo", "green", S(13) + 0.7)]
  ], { wt: "las millas" });
  sc(S(14), S(15), "cg", [[S(14), "cheer"], [S(14) + 1.8, "give"]], [
    [c("vuelas", "grey", S(14) + 0.6), c("juntas", "grey", S(14) + 1.2), c("boleto gratis", "green", S(14) + 1.8)]
  ], { wt: "cómo funcionaban" });
  sc(S(15), S(16), "cg", [[S(15), "think"], [S(15) + 2.4, "cheer"]], [
    [big("podían venderlas", "green", S(15) + 3.6)]
  ], { wt: "el descubrimiento" });
  // 6 EL NEGOCIO CON LOS BANCOS
  sc(S(16), S(17), "cg", [[S(16), "point"], [S(16) + 1.2, "look"]], [
    [c("el truco", "orange", S(16) + 0.5)]
  ], { wt: "los bancos" });
  sc(S(17), S(18), "cg", [[S(17), "phone"], [S(17) + 1.8, "give"]], [
    [p("card", S(17) + 0.6, { s: 0.4 }), c("cada compra da millas", "green", S(17) + 1.2)]
  ], { wt: "tu tarjeta" });
  sc(S(18), S(19), "cg", [[S(18), "shrug"], [S(18) + 2.2, "point"]], [
    [p("building", S(18) + 0.7, { s: 0.4 }), c("el banco se las compra", "orange", S(18) + 1.3)]
  ], { wt: "pero no son regalo" });
  sc(S(19), S(20), "cg", [[S(19), "cheer"], [S(19) + 2.4, "give"]], [
    [w("stack", S(19) + 0.8, { sc: 0.4 }), big("miles de millones", "green", S(19) + 1.4)],
    [c("cada año", "green", S(19) + 5.2)]
  ], { wt: "los bancos pagan" });
  sc(S(20), S(21), "cg", [[S(20), "calm"], [S(20) + 2.0, "point"]], [
    [c("una milla nueva: casi gratis", "green", S(20) + 0.7)]
  ], { wt: "y a la aerolínea" });
  sc(S(21), S(22), "cg", [[S(21), "cheer"], [S(21) + 1.6, "give"]], [
    [w("coin", S(21) + 0.6, { sc: 0.4 }), c("fabrica su propio dinero", "orange", S(21) + 1.2)]
  ], { wt: "es como si" });
  // 7 EL DÍA QUE SE DESCUBRIÓ
  sc(S(22), S(23), "cg", [[S(22), "look"], [S(22) + 2.0, "think"]], [
    [p("calendar", S(22) + 0.7, { s: 0.4 }), c("la pandemia", "red", S(22) + 1.3)]
  ], { wt: "cuando llegó" });
  sc(S(23), S(24), "cg", [[S(23), "give"], [S(23) + 2.4, "point"]], [
    [c("millas como garantía", "orange", S(23) + 0.8)],
    [big("≈ $6,800 millones", "green", S(23) + 4.4)]
  ], { wt: "United" });
  sc(S(24), S(25), "cg", [[S(24), "cheer"], [S(24) + 1.8, "point"]], [
    [big("≈ $22 mil millones", "green", S(24) + 0.7)]
  ], { wt: "valuaron sus millas" });
  sc(S(25), S(26), "cg", [[S(25), "shrug"], [S(25) + 2.4, "worry"]], [
    [w("plane", S(25) + 0.8, { sc: 0.4 }), c("toda la empresa valía menos", "red", S(25) + 1.4)]
  ], { wt: "en ese momento" });
  sc(S(26), S(27), "cg", [[S(26), "point"], [S(26) + 2.4, "think"]], [
    [c("aviones: el gasto", "red", S(26) + 0.8)],
    [c("millas: el negocio", "green", S(26) + 4.6)]
  ], { wt: "el mercado decía" });
  // 8 LA MONEDA QUE ELLOS CONTROLAN
  sc(S(27), S(28), "cg", [[S(27), "look"], [S(27) + 2.2, "give"]], [
    [w("coin", S(27) + 0.7, { sc: 0.4 }), c("funcionan como moneda", "orange", S(27) + 1.3)]
  ], { wt: "hay algo más" });
  sc(S(28), S(29), "cg", [[S(28), "shrug"], [S(28) + 2.2, "worry"]], [
    [c("ella decide cuánto vale", "red", S(28) + 0.7)]
  ], { wt: "la aerolínea" });
  sc(S(29), S(30), "cg", [[S(29), "think"], [S(29) + 2.4, "slump"]], [
    [c("20 mil millas", "grey", S(29) + 0.8), sy("arrow", S(29) + 1.4, "grey"), c("30 mil", "red", S(29) + 2.0)],
    [c("tus millas valen menos", "red", S(29) + 5.2)]
  ], { wt: "el mismo vuelo" });
  sc(S(30), S(31), "cg", [[S(30), "worry"], [S(30) + 2.2, "shrug"]], [
    [big("devaluación", "red", S(30) + 0.7)]
  ], { wt: "se le llama" });
  sc(S(31), S(32), "cg", [[S(31), "slump"], [S(31) + 2.2, "think"]], [
    [p("calendar", S(31) + 0.7, { s: 0.4 }), c("caducan", "red", S(31) + 1.3), c("nunca se usan", "red", S(31) + 1.9)]
  ], { wt: "además" });
  // 9 ENTONCES, ¿TE CONVIENEN?
  sc(S(32), S(33), "cg", [[S(32), "think"], [S(32) + 1.2, "shrug"]], []);
  sc(S(33), S(34), "cg", [[S(33), "cheer"], [S(33) + 2.4, "give"]], [
    [p("card", S(33) + 0.8, { s: 0.4 }), c("pagas todo cada mes", "green", S(33) + 1.4)],
    [c("un buen regalo", "green", S(33) + 4.8)]
  ], { wt: "no necesariamente" });
  sc(S(34), S(35), "cg", [[S(34), "worry"], [S(34) + 2.0, "slump"]], [
    [c("pagas intereses: pierdes", "red", S(34) + 0.7)]
  ], { wt: "pero" });
  sc(S(35), S(36), "cg", [[S(35), "shrug"], [S(35) + 2.0, "point"]], [
    [c("gastas de más por millas", "red", S(35) + 0.7)],
    [c("gana la aerolínea", "orange", S(35) + 3.4)]
  ], { wt: "y si" });
  sc(S(36), S(37), "cg", [[S(36), "give"], [S(36) + 2.2, "cheer"]], [
    [c("úsalas pronto", "green", S(36) + 0.7)]
  ], { wt: "lo mejor" });
  // 10 LA LECCIÓN
  sc(S(37), S(38), "cg", [[S(37), "point"], [S(37) + 1.8, "think"]], [
    [c("no gana con lo que crees", "orange", S(37) + 0.6)]
  ], { wt: "la lección" });
  sc(S(38), S(39), "cg", [[S(38), "think"], [S(38) + 1.8, "give"]], [
    [c("de dónde sale su dinero", "orange", S(38) + 0.8)],
    [c("dónde pagas tú", "red", S(38) + 3.4)]
  ], { wt: "cuando entiendes" });
  // 11 CIERRE
  sc(S(39), S(40), "cg", [[S(39), "calm"], [S(39) + 2.2, "point"]], [
    [c("alguien ya hizo las cuentas", "orange", S(39) + 0.7)]
  ], { wt: "la próxima vez" });
  sc(S(40), S(41), "cg", [[S(40), "calm"], [S(40) + 2.2, "look"]], [
    [c("contenido educativo", "grey", S(40) + 0.7)],
    [c("cifras aproximadas", "orange", S(40) + 3.6)]
  ], { wt: "aviso" });
  sc(S(41), END, "cg", [[S(41), "cheer"], [S(41) + 2.2, "give"]], [
    [c("¿juntas millas?", "orange", S(41) + 0.7)],
    [c("cuéntame en comentarios", "green", S(41) + 3.8)]
  ], { wt: "tu turno" });

  root.SCENES = SC;
})(window);

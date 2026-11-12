/* Cómo gana dinero Coca-Cola (global con detalles de México) (Fábrica 2.0): the whole film as data. Times are REAL seconds of the narration (assets/audio/timeline.json).
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
  sc(0, S(1), "cg", [[S(0), "shrug"], [S(0) + 2.6, "point"]], []);
  sc(S(1), S(2), "cg", [[S(1), "give"], [S(1) + 2.4, "think"]], []);
  sc(S(2), S(3), "cg", [[S(2), "cheer"], [S(2) + 2.0, "look"]], []);
  // 2 DE QUÉ VA ESTO
  sc(S(3), S(4), "cg", [[S(3), "point"], [S(3) + 2.2, "look"]], [
    [p("cup", S(3) + 0.7, { s: 0.4 }), c("de la farmacia a tu refri", "orange", S(3) + 1.3)]
  ], { wt: "el tema de hoy" });
  sc(S(4), S(5), "cg", [[S(4), "think"], [S(4) + 2.4, "give"]], [
    [w("stack", S(4) + 0.8, { sc: 0.4 }), c("décadas sin vender", "green", S(4) + 1.4)]
  ], { wt: "y el inversionista" });
  // 3 SUSCRÍBETE (recordatorio obligatorio)
  sc(S(5), S(6), "cg", [[S(5), "point"], [S(5) + 2.0, "cheer"]], [
    [big("SUSCRÍBETE", "red", S(5) + 4.0, { x: "stamp" })]
  ], { wt: "antes de seguir" });
  sc(S(6), S(7), "cg", [[S(6), "sitRelaxed"], [S(6) + 1.8, "give"]], [
    [c("activa la campanita", "orange", S(6) + 0.6)]
  ], { wt: "cada semana" });
  sc(S(7), S(8), "cg", [[S(7), "calm"], [S(7) + 1.2, "point"]], []);
  // 4 UNA FARMACIA EN ATLANTA
  sc(S(8), S(9), "cg", [[S(8), "look"], [S(8) + 2.4, "point"]], [
    [p("calendar", S(8) + 0.8, { s: 0.4 }), c("1886", "grey", S(8) + 1.4)],
    [p("building", S(8) + 4.0, { s: 0.4 }), c("una farmacia en Atlanta", "orange", S(8) + 4.6)]
  ], { wt: "así empezó" });
  sc(S(9), S(10), "cg", [[S(9), "give"], [S(9) + 2.4, "think"]], [
    [w("medcross", S(9) + 0.8, { sc: 0.4 }), c("vendida como remedio", "grey", S(9) + 1.4)]
  ], { wt: "un farmacéutico" });
  sc(S(10), S(11), "cg", [[S(10), "shrug"], [S(10) + 2.2, "slump"]], [
    [p("cup", S(10) + 0.7, { s: 0.4 }), big("≈ 9 vasos al día", "orange", S(10) + 1.3)]
  ], { wt: "el primer año" });
  sc(S(11), S(12), "cg", [[S(11), "cheer"], [S(11) + 2.2, "point"]], [
    [c("en casi todos los países", "green", S(11) + 0.7)]
  ], { wt: "nadie imaginaba" });
  // 5 EL JARABE SECRETO
  sc(S(12), S(13), "cg", [[S(12), "point"], [S(12) + 2.2, "shrug"]], [
    [c("no llena la mayoría", "orange", S(12) + 0.7)]
  ], { wt: "el truco" });
  sc(S(13), S(14), "cg", [[S(13), "give"], [S(13) + 2.4, "point"]], [
    [w("jar", S(13) + 0.8, { sc: 0.4 }), c("vende el jarabe", "green", S(13) + 1.4)],
    [c("a otras empresas", "grey", S(13) + 4.4)]
  ], { wt: "el concentrado" });
  sc(S(14), S(15), "cg", [[S(14), "look"], [S(14) + 2.4, "give"]], [
    [c("agua", "grey", S(14) + 0.8), c("gas", "grey", S(14) + 1.4), c("azúcar", "grey", S(14) + 2.0)],
    [c("lo envasan", "orange", S(14) + 4.4)]
  ], { wt: "las embotelladoras" });
  sc(S(15), S(16), "cg", [[S(15), "worry"], [S(15) + 2.2, "slump"]], [
    [c("fábricas", "red", S(15) + 0.6), c("camiones", "red", S(15) + 1.2), c("repartidores", "red", S(15) + 1.8)]
  ], { wt: "ellas pagan" });
  sc(S(16), S(17), "cg", [[S(16), "cheer"], [S(16) + 2.4, "point"]], [
    [c("barato de hacer", "green", S(16) + 0.8), c("lo que más deja", "green", S(16) + 1.4)],
    [big("jarabe + marca", "orange", S(16) + 4.6)]
  ], { wt: "Coca-Cola se queda" });
  // 6 EL CASO DE MÉXICO
  sc(S(17), S(18), "cg", [[S(17), "point"], [S(17) + 2.4, "give"]], [
    [p("building", S(17) + 0.8, { s: 0.4 }), c("Coca-Cola FEMSA", "orange", S(17) + 1.4)]
  ], { wt: "en México" });
  sc(S(18), S(19), "cg", [[S(18), "cheer"], [S(18) + 2.0, "look"]], [
    [c("de las más grandes del mundo", "green", S(18) + 0.7)]
  ], { wt: "de hecho" });
  sc(S(19), S(20), "cg", [[S(19), "worry"], [S(19) + 2.2, "shrug"]], [
    [p("cup", S(19) + 0.7, { s: 0.4 }), c("mucho refresco por persona", "red", S(19) + 1.3)]
  ], { wt: "México" });
  sc(S(20), S(21), "cg", [[S(20), "give"], [S(20) + 2.4, "think"]], [
    [p("cart", S(20) + 0.8, { s: 0.4 }), c("tu Coca en la tiendita", "grey", S(20) + 1.4)],
    [c("el dinero se reparte", "orange", S(20) + 4.4)]
  ], { wt: "por eso" });
  // 7 LA MARCA VALE MÁS QUE LA FÁBRICA
  sc(S(21), S(22), "cg", [[S(21), "point"], [S(21) + 2.2, "cheer"]], [
    [c("la fábrica", "grey", S(21) + 0.7, { x: "strike" }), c("la marca", "green", S(21) + 1.4)]
  ], { wt: "lo que más cuida" });
  sc(S(22), S(23), "cg", [[S(22), "give"], [S(22) + 2.4, "point"]], [
    [p("tv", S(22) + 0.8, { s: 0.4 }), big("miles de millones", "orange", S(22) + 1.4)]
  ], { wt: "publicidad" });
  sc(S(23), S(24), "cg", [[S(23), "cheer"], [S(23) + 2.4, "think"]], [
    [c("sed", "grey", S(23) + 0.8), c("fiesta", "grey", S(23) + 1.4)],
    [c("lo primero que piensas", "orange", S(23) + 4.0)]
  ], { wt: "lo que quiere" });
  sc(S(24), S(25), "cg", [[S(24), "think"], [S(24) + 2.4, "look"]], [
    [w("knot", S(24) + 0.8, { sc: 0.4 }), c("un misterio vende más", "orange", S(24) + 1.4)]
  ], { wt: "la receta secreta" });
  // 8 EL INVERSIONISTA QUE NUNCA VENDE
  sc(S(25), S(26), "cg", [[S(25), "sitRelaxed"], [S(25) + 2.6, "point"]], [
    [c("Warren Buffett", "orange", S(25) + 1.0)],
    [c("compró a finales de los ochenta", "grey", S(25) + 5.0)]
  ], { wt: "el inversionista" });
  sc(S(26), S(27), "cg", [[S(26), "calm"], [S(26) + 2.0, "give"]], [
    [c("décadas sin vender", "green", S(26) + 0.7)]
  ], { wt: "desde entonces" });
  sc(S(27), S(28), "cg", [[S(27), "give"], [S(27) + 2.4, "cheer"]], [
    [w("coin", S(27) + 0.8, { sc: 0.4 }), c("parte de las ganancias", "green", S(27) + 1.4)],
    [big("dividendos", "green", S(27) + 4.4)]
  ], { wt: "cada año" });
  sc(S(28), S(29), "cg", [[S(28), "cheer"], [S(28) + 2.4, "sitRelaxed"]], [
    [w("stack", S(28) + 0.8, { sc: 0.4 }), big("cientos de millones", "green", S(28) + 1.4)]
  ], { wt: "solo en dividendos" });
  sc(S(29), S(30), "cg", [[S(29), "point"], [S(29) + 2.4, "cheer"]], [
    [c("recupera lo que pagó", "green", S(29) + 0.8)],
    [c("sin vender nada", "green", S(29) + 3.8)]
  ], { wt: "en pocos años" });
  // 9 LO QUE TE ENSEÑA
  sc(S(30), S(31), "cg", [[S(30), "think"], [S(30) + 1.0, "point"]], []);
  sc(S(31), S(32), "cg", [[S(31), "point"], [S(31) + 2.2, "give"]], [
    [c("1", "orange", S(31) + 0.7), c("la idea vale más que la fábrica", "green", S(31) + 1.3)]
  ], { wt: "lección 1" });
  sc(S(32), S(33), "cg", [[S(32), "worry"], [S(32) + 2.4, "shrug"]], [
    [c("2", "orange", S(32) + 0.8), c("gasto chico diario", "orange", S(32) + 1.4)],
    [c("mucho al año", "red", S(32) + 4.4)]
  ], { wt: "lección 2" });
  sc(S(33), S(34), "cg", [[S(33), "calm"], [S(33) + 2.2, "cheer"]], [
    [c("3", "orange", S(33) + 0.7), c("paciencia que paga décadas", "green", S(33) + 1.3)]
  ], { wt: "lección 3" });
  // 10 LA LECCIÓN
  sc(S(34), S(35), "cg", [[S(34), "point"], [S(34) + 2.6, "think"]], [
    [c("más trabajo", "grey", S(34) + 1.0, { x: "strike" })],
    [c("controlar lo más valioso", "green", S(34) + 4.6)]
  ], { wt: "el mejor negocio" });
  sc(S(35), S(36), "cg", [[S(35), "give"], [S(35) + 2.2, "cheer"]], [
    [c("lo que solo tú sabes hacer", "green", S(35) + 0.7)]
  ], { wt: "en tu vida" });
  // 11 CIERRE
  sc(S(36), S(37), "cg", [[S(36), "cheer"], [S(36) + 2.4, "think"]], [
    [p("cup", S(36) + 0.8, { s: 0.4 }), c("muchas empresas ganaron", "orange", S(36) + 1.4)]
  ], { wt: "la próxima vez" });
  sc(S(37), S(38), "cg", [[S(37), "calm"], [S(37) + 2.2, "look"]], [
    [c("contenido educativo", "grey", S(37) + 0.7)],
    [c("no es asesoría financiera", "orange", S(37) + 3.8)]
  ], { wt: "aviso" });
  sc(S(38), END, "cg", [[S(38), "cheer"], [S(38) + 2.4, "give"]], [
    [c("¿refresco o agua?", "orange", S(38) + 0.7)],
    [c("cuéntame en comentarios", "green", S(38) + 4.4)]
  ], { wt: "tu turno" });

  root.SCENES = SC;
})(window);

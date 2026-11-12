/* Cómo gana dinero Google (global) (Fábrica 2.0): the whole film as data. Times are REAL seconds of the narration (assets/audio/timeline.json).
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
  sc(0, S(1), "cg", [[S(0), "phone"], [S(0) + 2.4, "shrug"]], []);
  sc(S(1), S(2), "cg", [[S(1), "cheer"], [S(1) + 1.8, "think"]], []);
  sc(S(2), S(3), "cg", [[S(2), "point"], [S(2) + 2.6, "look"]], []);
  // 2 DE QUÉ VA ESTO
  sc(S(3), S(4), "cg", [[S(3), "look"], [S(3) + 2.2, "point"]], [
    [p("laptop", S(3) + 0.7, { s: 0.4 }), c("te regala casi todo", "green", S(3) + 1.3)]
  ], { wt: "el tema de hoy" });
  sc(S(4), S(5), "cg", [[S(4), "think"], [S(4) + 1.8, "give"]], [
    [c("¿qué le das a cambio?", "orange", S(4) + 0.6)]
  ], { wt: "al final" });
  // 3 SUSCRÍBETE (recordatorio obligatorio)
  sc(S(5), S(6), "cg", [[S(5), "point"], [S(5) + 2.0, "cheer"]], [
    [big("SUSCRÍBETE", "red", S(5) + 4.0, { x: "stamp" })]
  ], { wt: "antes de seguir" });
  sc(S(6), S(7), "cg", [[S(6), "sitRelaxed"], [S(6) + 1.8, "give"]], [
    [c("activa la campanita", "orange", S(6) + 0.6)]
  ], { wt: "cada semana" });
  sc(S(7), S(8), "cg", [[S(7), "calm"], [S(7) + 1.2, "point"]], []);
  // 4 TODO GRATIS
  sc(S(8), S(9), "cg", [[S(8), "think"], [S(8) + 1.8, "phone"]], [
    [big("$0", "green", S(8) + 0.6)]
  ], { wt: "lo que usas gratis" });
  sc(S(9), S(10), "cg", [[S(9), "point"], [S(9) + 2.4, "cheer"]], [
    [c("buscador", "green", S(9) + 0.6), c("correo", "green", S(9) + 1.2)],
    [c("mapas", "green", S(9) + 1.8), c("YouTube", "green", S(9) + 2.4)]
  ], { wt: "todo gratis" });
  sc(S(10), S(11), "cg", [[S(10), "worry"], [S(10) + 2.2, "slump"]], [
    [p("building", S(10) + 0.7, { s: 0.4 }), c("cuesta muchísimo", "red", S(10) + 1.3)]
  ], { wt: "mantenerlo" });
  sc(S(11), S(12), "cg", [[S(11), "shrug"], [S(11) + 1.6, "think"]], [
    [c("¿de dónde sale?", "orange", S(11) + 0.6)]
  ], { wt: "entonces" });
  // 5 LOS ANUNCIOS
  sc(S(12), S(13), "cg", [[S(12), "point"], [S(12) + 1.6, "cheer"]], [
    [big("ANUNCIOS", "orange", S(12) + 1.4, { x: "stamp" })]
  ], { wt: "la respuesta" });
  sc(S(13), S(14), "cg", [[S(13), "give"], [S(13) + 2.4, "point"]], [
    [w("bars", S(13) + 0.7, { sc: 0.4 }), big("3 de cada 4 dólares", "green", S(13) + 1.3)]
  ], { wt: "publicidad" });
  sc(S(14), S(15), "cg", [[S(14), "phone"], [S(14) + 2.2, "look"]], [
    [c("patrocinado", "orange", S(14) + 0.8)]
  ], { wt: "los primeros resultados" });
  sc(S(15), S(16), "cg", [[S(15), "shrug"], [S(15) + 1.4, "point"]], [
    [c("no se ganan, se pagan", "red", S(15) + 0.6)]
  ], { wt: "esos lugares" });
  // 6 LA SUBASTA
  sc(S(16), S(17), "cg", [[S(16), "think"], [S(16) + 2.4, "cheer"]], [
    [w("deal", S(16) + 0.8, { sc: 0.4 }), c("una subasta", "orange", S(16) + 1.4)]
  ], { wt: "lo ingenioso" });
  sc(S(17), S(18), "cg", [[S(17), "phone"], [S(17) + 1.6, "look"]], [
    [c("dentista cerca de mí", "grey", S(17) + 0.6)]
  ], { wt: "imagina" });
  sc(S(18), S(19), "cg", [[S(18), "point"], [S(18) + 2.4, "give"]], [
    [c("dentista A: $5", "grey", S(18) + 0.8), c("dentista B: $8", "orange", S(18) + 1.4)],
    [c("gana el que paga más", "green", S(18) + 4.2)]
  ], { wt: "la subasta" });
  sc(S(19), S(20), "cg", [[S(19), "cheer"], [S(19) + 2.4, "point"]], [
    [c("paga solo si das clic", "green", S(19) + 0.8)]
  ], { wt: "lo curioso" });
  sc(S(20), S(21), "cg", [[S(20), "look"], [S(20) + 2.2, "cheer"]], [
    [p("clock", S(20) + 0.7, { s: 0.4 }), c("menos de un segundo", "orange", S(20) + 1.3)],
    [c("miles de millones al día", "green", S(20) + 3.8)]
  ], { wt: "todo esto" });
  // 7 TÚ ERES EL PRODUCTO
  sc(S(21), S(22), "cg", [[S(21), "think"], [S(21) + 2.2, "point"]], [
    [c("saber quién eres", "orange", S(21) + 0.7)]
  ], { wt: "el anuncio vale más" });
  sc(S(22), S(23), "cg", [[S(22), "worry"], [S(22) + 2.2, "phone"]], [
    [w("eye", S(22) + 0.7, { sc: 0.4 }), c("qué buscas", "orange", S(22) + 1.2)],
    [c("a dónde vas", "orange", S(22) + 2.2), c("qué ves", "orange", S(22) + 2.8)]
  ], { wt: "sabe" });
  sc(S(23), S(24), "cg", [[S(23), "give"], [S(23) + 2.2, "cheer"]], [
    [c("anuncio de zapatos", "green", S(23) + 0.7), c("a quien quiere zapatos", "green", S(23) + 1.4)]
  ], { wt: "con eso" });
  sc(S(24), S(25), "cg", [[S(24), "point"], [S(24) + 1.8, "worry"]], [
    [big("el producto eres tú", "red", S(24) + 2.2)]
  ], { wt: "si es gratis" });
  sc(S(25), S(26), "cg", [[S(25), "think"], [S(25) + 2.2, "give"]], [
    [c("tu atención", "orange", S(25) + 0.8)],
    [c("lo que se sabe de ti", "orange", S(25) + 3.8)]
  ], { wt: "más exacto" });
  // 8 YOUTUBE Y LOS CELULARES
  sc(S(26), S(27), "cg", [[S(26), "sitRelaxed"], [S(26) + 2.4, "point"]], [
    [p("play", S(26) + 0.8, { s: 0.4 }), c("compra de 2006", "grey", S(26) + 1.4)],
    [big("≈ $1,650 millones", "green", S(26) + 4.4)]
  ], { wt: "YouTube" });
  sc(S(27), S(28), "cg", [[S(27), "phone"], [S(27) + 2.2, "cheer"]], [
    [p("tv", S(27) + 0.7, { s: 0.4 }), c("anuncios antes del video", "orange", S(27) + 1.3)]
  ], { wt: "hoy" });
  sc(S(28), S(29), "cg", [[S(28), "give"], [S(28) + 2.4, "point"]], [
    [p("phone", S(28) + 0.8, { s: 0.4 }), c("una parte de cada compra", "green", S(28) + 1.4)]
  ], { wt: "en tu celular" });
  // 9 EL PAGO SECRETO A APPLE
  sc(S(29), S(30), "cg", [[S(29), "look"], [S(29) + 1.6, "think"]], [
    [c("un dato sorprendente", "orange", S(29) + 0.6)]
  ], { wt: "y hay más" });
  sc(S(30), S(31), "cg", [[S(30), "give"], [S(30) + 2.4, "point"]], [
    [c("Google le paga a Apple", "orange", S(30) + 0.8)],
    [c("buscador puesto en el iPhone", "grey", S(30) + 3.8)]
  ], { wt: "el pago secreto" });
  sc(S(31), S(32), "cg", [[S(31), "worry"], [S(31) + 2.4, "cheer"]], [
    [w("stack", S(31) + 0.8, { sc: 0.4 }), big("≈ $20 mil millones", "green", S(31) + 1.4)]
  ], { wt: "en un solo año" });
  sc(S(32), S(33), "cg", [[S(32), "think"], [S(32) + 2.2, "point"]], [
    [c("¿cuánto gana con tus búsquedas?", "orange", S(32) + 0.8)]
  ], { wt: "imagina" });
  // 10 LO QUE TE ENSEÑA
  sc(S(33), S(34), "cg", [[S(33), "think"], [S(33) + 1.0, "point"]], []);
  sc(S(34), S(35), "cg", [[S(34), "point"], [S(34) + 2.2, "give"]], [
    [c("1", "orange", S(34) + 0.7), c("lo gratis se paga con datos", "orange", S(34) + 1.3)]
  ], { wt: "lección 1" });
  sc(S(35), S(36), "cg", [[S(35), "worry"], [S(35) + 2.2, "shrug"]], [
    [c("2", "orange", S(35) + 0.7), c("hecho para que compres", "red", S(35) + 1.3)]
  ], { wt: "lección 2" });
  sc(S(36), S(37), "cg", [[S(36), "calm"], [S(36) + 2.4, "point"]], [
    [c("3", "orange", S(36) + 0.8), c("espera un día y compara", "green", S(36) + 1.4)]
  ], { wt: "lección 3" });
  sc(S(37), S(38), "cg", [[S(37), "phone"], [S(37) + 2.4, "think"]], [
    [c("4", "orange", S(37) + 0.8), c("cuida qué datos compartes", "green", S(37) + 1.4)]
  ], { wt: "lección 4" });
  // 11 LA LECCIÓN
  sc(S(38), S(39), "cg", [[S(38), "point"], [S(38) + 2.4, "shrug"]], [
    [c("gratis", "grey", S(38) + 0.8, { x: "strike" })],
    [c("solo cambia quién paga", "orange", S(38) + 3.4)]
  ], { wt: "nada es gratis" });
  sc(S(39), S(40), "cg", [[S(39), "think"], [S(39) + 2.0, "give"]], [
    [c("qué quieren de ti", "orange", S(39) + 0.7)]
  ], { wt: "quién paga" });
  // 12 CIERRE
  sc(S(40), S(41), "cg", [[S(40), "phone"], [S(40) + 2.4, "cheer"]], [
    [c("ya sabes por qué apareció", "green", S(40) + 0.8)]
  ], { wt: "la próxima vez" });
  sc(S(41), S(42), "cg", [[S(41), "calm"], [S(41) + 2.2, "look"]], [
    [c("contenido educativo", "grey", S(41) + 0.7)],
    [c("no es asesoría financiera", "orange", S(41) + 3.8)]
  ], { wt: "aviso" });
  sc(S(42), END, "cg", [[S(42), "cheer"], [S(42) + 2.4, "give"]], [
    [c("¿el anuncio más raro?", "orange", S(42) + 0.7)],
    [c("cuéntame en comentarios", "green", S(42) + 4.4)]
  ], { wt: "tu turno" });

  root.SCENES = SC;
})(window);

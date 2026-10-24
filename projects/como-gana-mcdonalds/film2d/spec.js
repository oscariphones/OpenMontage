/* Cómo gana dinero McDonald's (global) (Fábrica 2.0): the whole film as data. Times are REAL seconds of the narration (assets/audio/timeline.json).
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
  sc(0, S(1), "cg", [[S(0), "cheer"], [S(0) + 2.6, "shrug"]], []);
  sc(S(1), S(2), "cg", [[S(1), "point"], [S(1) + 2.4, "look"]], []);
  sc(S(2), S(3), "cg", [[S(2), "worry"], [S(2) + 2.4, "cheer"]], []);
  // 2 DE QUÉ VA ESTO
  sc(S(3), S(4), "cg", [[S(3), "look"], [S(3) + 1.6, "point"]], [
    [c("¿cómo gana McDonald's?", "orange", S(3) + 0.6)]
  ], { wt: "el tema de hoy" });
  sc(S(4), S(5), "cg", [[S(4), "think"], [S(4) + 2.2, "give"]], [
    [p("house", S(4) + 0.7, { s: 0.4 }), c("bienes raíces", "green", S(4) + 1.3)],
    [c("disfrazada de restaurante", "orange", S(4) + 3.8)]
  ], { wt: "spoiler" });
  // 3 SUSCRÍBETE (recordatorio obligatorio)
  sc(S(5), S(6), "cg", [[S(5), "point"], [S(5) + 2.4, "cheer"]], [
    [big("SUSCRÍBETE", "red", S(5) + 4.6, { x: "stamp" })]
  ], { wt: "antes de seguir" });
  sc(S(6), S(7), "cg", [[S(6), "sitRelaxed"], [S(6) + 2.2, "give"]], [
    [c("secretos del dinero", "green", S(6) + 0.7)],
    [c("activa la campanita", "orange", S(6) + 3.6)]
  ], { wt: "cada semana" });
  sc(S(7), S(8), "cg", [[S(7), "calm"], [S(7) + 1.0, "look"]], []);
  // 4 GANA EN LAS CRISIS
  sc(S(8), S(9), "cg", [[S(8), "worry"], [S(8) + 2.4, "cheer"]], [
    [big("2008", "red", S(8) + 0.8), c("miles de negocios cierran", "red", S(8) + 1.4)],
    [c("McDonald's abre cientos", "green", S(8) + 5.0)]
  ], { wt: "la crisis" });
  sc(S(9), S(10), "cg", [[S(9), "give"], [S(9) + 2.4, "think"]], [
    [c("menos dinero", "grey", S(9) + 0.8), sy("arrow", S(9) + 1.4, "grey"), c("comida barata", "green", S(9) + 2.0)]
  ], { wt: "razón fácil" });
  sc(S(10), S(11), "cg", [[S(10), "look"], [S(10) + 2.2, "point"]], [
    [c("una razón más poderosa", "orange", S(10) + 0.7)]
  ], { wt: "pero…" });
  // 5 LA FRASE
  sc(S(11), S(12), "cg", [[S(11), "point"], [S(11) + 2.6, "cheer"]], [
    [c("hamburguesas", "grey", S(11) + 0.8, { x: "strike" })],
    [big("bienes raíces", "green", S(11) + 5.0)]
  ], { wt: "la frase famosa" });
  sc(S(12), S(13), "cg", [[S(12), "give"], [S(12) + 2.4, "think"]], [
    [w("bars", S(12) + 0.8, { sc: 0.4 }), c("propiedades y equipo", "grey", S(12) + 1.4)],
    [big("≈ $39 mil millones", "green", S(12) + 5.0)]
  ], { wt: "hace unos años" });
  // 6 LAS FRANQUICIAS
  sc(S(13), S(14), "cg", [[S(13), "shrug"], [S(13) + 2.4, "point"]], [
    [c("la mayoría no son de McDonald's", "orange", S(13) + 0.8)],
    [c("son de franquiciatarios", "green", S(13) + 4.4)]
  ], { wt: "las franquicias" });
  sc(S(14), S(15), "cg", [[S(14), "give"], [S(14) + 2.4, "look"]], [
    [c("empresario local", "grey", S(14) + 0.8)],
    [c("nombre", "orange", S(14) + 4.4), c("recetas", "orange", S(14) + 5.0), c("método", "orange", S(14) + 5.6)]
  ], { wt: "¿qué es?" });
  sc(S(15), S(16), "cg", [[S(15), "think"], [S(15) + 2.4, "worry"]], [
    [c("cuota de entrada", "grey", S(15) + 0.8), c("% de las ventas", "grey", S(15) + 1.4)],
    [c("y algo más…", "orange", S(15) + 4.6)]
  ], { wt: "lo que paga" });
  sc(S(16), S(17), "cg", [[S(16), "point"], [S(16) + 2.4, "cheer"]], [
    [big("la renta", "orange", S(16) + 0.8)],
    [p("house", S(16) + 3.8, { s: 0.4 }), c("el terreno es de McDonald's", "green", S(16) + 4.4)]
  ], { wt: "lo que lo cambia todo" });
  // 7 EL TERRENO
  sc(S(17), S(18), "cg", [[S(17), "think"], [S(17) + 2.2, "look"]], [
    [c("décadas escogiendo lugares", "orange", S(17) + 0.7)]
  ], { wt: "el terreno" });
  sc(S(18), S(19), "cg", [[S(18), "point"], [S(18) + 2.4, "give"]], [
    [c("esquina con mucho tráfico", "green", S(18) + 0.8)],
    [p("traffic", S(18) + 4.4, { s: 0.4 }), c("semáforo", "grey", S(18) + 5.0), p("car", S(18) + 5.6, { s: 0.4 })]
  ], { wt: "la receta" });
  sc(S(19), S(20), "cg", [[S(19), "calm"], [S(19) + 2.4, "point"]], [
    [c("compra el terreno", "orange", S(19) + 0.8)],
    [c("préstamo largo y barato", "green", S(19) + 4.6)]
  ], { wt: "la compra" });
  sc(S(20), S(21), "cg", [[S(20), "give"], [S(20) + 2.4, "cheer"]], [
    [c("tu restaurante va aquí", "orange", S(20) + 0.8)],
    [c("y la renta me la pagas a mí", "red", S(20) + 4.2)]
  ], { wt: "el trato" });
  // 8 LA RENTA
  sc(S(21), S(22), "cg", [[S(21), "cheer"], [S(21) + 2.4, "calm"]], [
    [c("inquilino seguro", "green", S(21) + 0.8)],
    [p("calendar", S(21) + 4.4, { s: 0.4 }), c("≈ 20 años", "orange", S(21) + 5.0)]
  ], { wt: "el contrato" });
  sc(S(22), S(23), "cg", [[S(22), "worry"], [S(22) + 2.4, "point"]], [
    [c("no es renta barata", "red", S(22) + 0.8)],
    [c("más que el promedio", "red", S(22) + 5.0)]
  ], { wt: "el precio" });
  sc(S(23), S(24), "cg", [[S(23), "point"], [S(23) + 2.4, "look"]], [
    [big("≈ 2/3 es renta", "green", S(23) + 0.8)],
    [c("no hamburguesas", "grey", S(23) + 5.0, { x: "strike" })]
  ], { wt: "2019" });
  sc(S(24), S(25), "cg", [[S(24), "shrug"], [S(24) + 2.4, "give"]], [
    [c("¿no funciona?", "red", S(24) + 0.8)],
    [c("otro franquiciatario", "grey", S(24) + 4.6), c("o vende más caro", "green", S(24) + 5.4)]
  ], { wt: "si falla" });
  // 9 POR QUÉ ACEPTAN
  sc(S(25), S(26), "cg", [[S(25), "think"], [S(25) + 1.6, "shrug"]], [
    [c("¿quién acepta esto?", "orange", S(25) + 0.6)]
  ], { wt: "entonces" });
  sc(S(26), S(27), "cg", [[S(26), "worry"], [S(26) + 2.4, "slump"]], [
    [big("$1 a $2 millones", "red", S(26) + 0.8)],
    [c("la marca controla casi todo", "red", S(26) + 5.0)]
  ], { wt: "el costo" });
  sc(S(27), S(28), "cg", [[S(27), "cheer"], [S(27) + 2.4, "give"]], [
    [p("shield", S(27) + 0.8, { s: 0.4 }), c("inversión muy segura", "green", S(27) + 1.4)],
    [c("fórmula probada", "green", S(27) + 5.0)]
  ], { wt: "a cambio" });
  sc(S(28), S(29), "cg", [[S(28), "point"], [S(28) + 2.4, "cheer"]], [
    [p("building", S(28) + 0.8, { s: 0.4 }), c("Universidad de la Hamburguesa", "orange", S(28) + 1.4)]
  ], { wt: "hasta escuela" });
  // 10 POR QUÉ ES MEJOR NEGOCIO
  sc(S(29), S(30), "cg", [[S(29), "give"], [S(29) + 2.2, "point"]], [
    [c("renta", "green", S(29) + 0.7), c(">", "grey", S(29) + 1.3), c("papas fritas", "grey", S(29) + 1.9)]
  ], { wt: "mejor negocio" });
  sc(S(30), S(31), "cg", [[S(30), "shrug"], [S(30) + 2.4, "worry"]], [
    [c("vende poco", "red", S(30) + 0.8)],
    [c("igual paga la renta", "green", S(30) + 4.4)]
  ], { wt: "el riesgo" });
  sc(S(31), S(32), "cg", [[S(31), "think"], [S(31) + 2.4, "cheer"]], [
    [c("crisis", "red", S(31) + 0.8), sy("arrow", S(31) + 1.4, "grey"), c("terrenos baratos", "green", S(31) + 2.0)],
    [c("compra más", "green", S(31) + 4.6)]
  ], { wt: "la oportunidad" });
  sc(S(32), S(33), "cg", [[S(32), "point"], [S(32) + 2.4, "cheer"]], [
    [big("2008", "orange", S(32) + 0.8), w("bars", S(32) + 1.4, { sc: 0.4 })],
    [c("de las poquísimas que subieron", "green", S(32) + 4.8)]
  ], { wt: "sus acciones" });
  // 11 LA LECCIÓN
  sc(S(33), S(34), "cg", [[S(33), "think"], [S(33) + 2.4, "give"]], [
    [c("lo que se vende", "grey", S(33) + 0.8)],
    [c("lo que se renta", "green", S(33) + 4.6)]
  ], { wt: "la lección" });
  sc(S(34), S(35), "cg", [[S(34), "point"], [S(34) + 2.2, "look"]], [
    [p("house", S(34) + 0.7, { s: 0.4 }), c("dueños de terrenos", "green", S(34) + 1.3)]
  ], { wt: "los grandes" });
  sc(S(35), S(36), "cg", [[S(35), "shrug"], [S(35) + 2.4, "calm"]], [
    [c("franquicia: seguridad", "green", S(35) + 0.8)],
    [c("a cambio de control", "red", S(35) + 4.6)]
  ], { wt: "si quieres una" });
  // 12 CIERRE
  sc(S(36), S(37), "cg", [[S(36), "point"], [S(36) + 2.4, "cheer"]], [
    [c("no solo hamburguesas", "grey", S(36) + 0.8)],
    [big("dueño de terrenos", "green", S(36) + 4.6)]
  ], { wt: "resumen" });
  sc(S(37), S(38), "cg", [[S(37), "look"], [S(37) + 2.4, "give"]], [
    [c("arcos dorados", "orange", S(37) + 0.8)],
    [c("el negocio es el suelo", "green", S(37) + 4.6)]
  ], { wt: "la próxima vez" });
  sc(S(38), S(39), "cg", [[S(38), "calm"], [S(38) + 2.2, "look"]], [
    [c("contenido educativo", "grey", S(38) + 0.7)],
    [c("no es asesoría financiera", "orange", S(38) + 3.6)]
  ], { wt: "aviso" });
  sc(S(39), END, "cg", [[S(39), "cheer"], [S(39) + 2.4, "give"]], [
    [c("¿qué empresa sigue?", "orange", S(39) + 0.7)],
    [c("cuéntame en comentarios", "green", S(39) + 4.4)]
  ], { wt: "tu turno" });

  root.SCENES = SC;
})(window);

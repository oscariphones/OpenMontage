/* Por qué los diamantes son caros (global) (Fábrica 2.0): the whole film as data. Times are REAL seconds of the narration (assets/audio/timeline.json).
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
  sc(0, S(1), "cg", [[S(0), "point"], [S(0) + 2.0, "shrug"]], []);
  sc(S(1), S(2), "cg", [[S(1), "give"], [S(1) + 2.6, "worry"]], []);
  sc(S(2), S(3), "cg", [[S(2), "think"], [S(2) + 2.4, "point"]], []);
  // 2 DE QUÉ VA ESTO
  sc(S(3), S(4), "cg", [[S(3), "look"], [S(3) + 2.2, "point"]], [
    [c("caros", "orange", S(3) + 0.7), c("pero no tan escasos", "red", S(3) + 1.4)]
  ], { wt: "el tema de hoy" });
  sc(S(4), S(5), "cg", [[S(4), "think"], [S(4) + 2.0, "give"]], [
    [c("tus compras grandes", "green", S(4) + 0.7)]
  ], { wt: "y tu dinero" });
  // 3 SUSCRÍBETE (recordatorio obligatorio)
  sc(S(5), S(6), "cg", [[S(5), "point"], [S(5) + 2.0, "cheer"]], [
    [big("SUSCRÍBETE", "red", S(5) + 3.6, { x: "stamp" })]
  ], { wt: "antes de seguir" });
  sc(S(6), S(7), "cg", [[S(6), "sitRelaxed"], [S(6) + 1.8, "give"]], [
    [c("activa la campanita", "orange", S(6) + 0.6)]
  ], { wt: "cada semana" });
  sc(S(7), S(8), "cg", [[S(7), "calm"], [S(7) + 1.2, "point"]], []);
  // 4 CUANDO SÍ ERAN RAROS
  sc(S(8), S(9), "cg", [[S(8), "look"], [S(8) + 2.4, "cheer"]], [
    [c("rarísimos", "orange", S(8) + 0.8)],
    [c("solo reyes y ricos", "grey", S(8) + 4.2)]
  ], { wt: "hace siglos" });
  sc(S(9), S(10), "cg", [[S(9), "point"], [S(9) + 2.4, "worry"]], [
    [p("building", S(9) + 0.8, { s: 0.4 }), c("minas enormes en Sudáfrica", "orange", S(9) + 1.4)]
  ], { wt: "siglo XIX" });
  sc(S(10), S(11), "cg", [[S(10), "worry"], [S(10) + 2.0, "slump"]], [
    [c("demasiados diamantes", "red", S(10) + 0.7), sy("down", S(10) + 1.3, "red")]
  ], { wt: "de pronto" });
  sc(S(11), S(12), "cg", [[S(11), "slump"], [S(11) + 1.8, "think"]], [
    [c("problema para los dueños", "red", S(11) + 0.6)]
  ], { wt: "el problema" });
  // 5 LA EMPRESA QUE CONTROLÓ TODO
  sc(S(12), S(13), "cg", [[S(12), "point"], [S(12) + 2.4, "give"]], [
    [c("De Beers", "orange", S(12) + 0.8)],
    [c("compra mina tras mina", "grey", S(12) + 3.6)]
  ], { wt: "así nació" });
  sc(S(13), S(14), "cg", [[S(13), "cheer"], [S(13) + 2.4, "point"]], [
    [w("bars", S(13) + 0.8, { sc: 0.4 }), c("la mayoría del mundo", "orange", S(13) + 1.4)]
  ], { wt: "siglo XX" });
  sc(S(14), S(15), "cg", [[S(14), "give"], [S(14) + 2.4, "think"]], [
    [p("box", S(14) + 0.8, { s: 0.4 }), c("guardados en bodegas", "orange", S(14) + 1.4)],
    [c("para que parezcan escasos", "red", S(14) + 4.4)]
  ], { wt: "el truco" });
  sc(S(15), S(16), "cg", [[S(15), "point"], [S(15) + 2.0, "cheer"]], [
    [c("poquito", "grey", S(15) + 0.6), sy("arrow", S(15) + 1.2, "orange"), c("precio alto", "green", S(15) + 1.8)]
  ], { wt: "la regla" });
  // 6 UN DIAMANTE ES PARA SIEMPRE
  sc(S(16), S(17), "cg", [[S(16), "think"], [S(16) + 2.2, "look"]], [
    [c("que lo sientas necesario", "orange", S(16) + 0.7)]
  ], { wt: "faltaba algo" });
  sc(S(17), S(18), "cg", [[S(17), "point"], [S(17) + 2.4, "cheer"]], [
    [w("quote", S(17) + 0.8, { sc: 0.4 }), big("un diamante es para siempre", "orange", S(17) + 3.4)]
  ], { wt: "años cuarenta" });
  sc(S(18), S(19), "cg", [[S(18), "give"], [S(18) + 2.2, "cheer"]], [
    [w("heart", S(18) + 0.7, { sc: 0.4 }), c("amor = diamante", "red", S(18) + 1.3)]
  ], { wt: "la idea" });
  sc(S(19), S(20), "cg", [[S(19), "shrug"], [S(19) + 2.4, "point"]], [
    [c("nadie lo vende", "orange", S(19) + 0.8)],
    [c("el precio no baja", "green", S(19) + 4.2)]
  ], { wt: "para siempre" });
  sc(S(20), S(21), "cg", [[S(20), "phone"], [S(20) + 2.4, "cheer"]], [
    [p("tv", S(20) + 0.8, { s: 0.4 }), c("casi obligatorio", "red", S(20) + 1.4)]
  ], { wt: "películas y anuncios" });
  // 7 CUÁNTO DEBES GASTAR
  sc(S(21), S(22), "cg", [[S(21), "look"], [S(21) + 2.0, "worry"]], [
    [c("cuánto gastar", "orange", S(21) + 0.7)]
  ], { wt: "después" });
  sc(S(22), S(23), "cg", [[S(22), "worry"], [S(22) + 2.4, "slump"]], [
    [p("calendar", S(22) + 0.8, { s: 0.4 }), c("1 mes de sueldo", "orange", S(22) + 1.4)],
    [big("2 meses", "red", S(22) + 4.0)]
  ], { wt: "la regla" });
  sc(S(23), S(24), "cg", [[S(23), "shrug"], [S(23) + 2.2, "point"]], [
    [c("tradición", "grey", S(23) + 0.7, { x: "strike" }), c("publicidad", "red", S(23) + 1.4)]
  ], { wt: "de dónde salió" });
  // 8 EL PROBLEMA DE VENDERLO
  sc(S(24), S(25), "cg", [[S(24), "think"], [S(24) + 1.6, "look"]], [
    [c("lo que nadie cuenta", "orange", S(24) + 0.6)]
  ], { wt: "y aquí viene" });
  sc(S(25), S(26), "cg", [[S(25), "give"], [S(25) + 2.4, "slump"]], [
    [c("vender uno usado", "grey", S(25) + 0.8)],
    [c("te ofrecen mucho menos", "red", S(25) + 3.8)]
  ], { wt: "al venderlo" });
  sc(S(26), S(27), "cg", [[S(26), "shrug"], [S(26) + 2.2, "worry"]], [
    [p("building", S(26) + 0.7, { s: 0.4 }), c("prefieren vender nuevos", "orange", S(26) + 1.3)]
  ], { wt: "las joyerías" });
  sc(S(27), S(28), "cg", [[S(27), "point"], [S(27) + 2.4, "shrug"]], [
    [c("para siempre…", "grey", S(27) + 0.8)],
    [c("porque nadie te lo compra", "red", S(27) + 3.8)]
  ], { wt: "o sea" });
  // 9 LOS DIAMANTES DE LABORATORIO
  sc(S(28), S(29), "cg", [[S(28), "look"], [S(28) + 2.4, "point"]], [
    [c("diamantes de laboratorio", "green", S(28) + 0.8)]
  ], { wt: "hoy" });
  sc(S(29), S(30), "cg", [[S(29), "cheer"], [S(29) + 2.2, "give"]], [
    [c("igual de reales", "green", S(29) + 0.7), c("mucho más baratos", "green", S(29) + 1.4)]
  ], { wt: "de verdad" });
  sc(S(30), S(31), "cg", [[S(30), "point"], [S(30) + 2.2, "cheer"]], [
    [w("bars", S(30) + 0.7, { sc: 0.4 }), c("precio bajando", "orange", S(30) + 1.3), sy("down", S(30) + 1.9, "orange")]
  ], { wt: "por eso" });
  sc(S(31), S(32), "cg", [[S(31), "shrug"], [S(31) + 2.4, "think"]], [
    [c("ya no tiene el mismo poder", "red", S(31) + 0.8)]
  ], { wt: "la empresa" });
  // 10 LO QUE TE ENSEÑA
  sc(S(32), S(33), "cg", [[S(32), "think"], [S(32) + 1.0, "point"]], []);
  sc(S(33), S(34), "cg", [[S(33), "point"], [S(33) + 2.2, "shrug"]], [
    [c("1", "orange", S(33) + 0.7), c("caro no es igual a escaso", "orange", S(33) + 1.3)]
  ], { wt: "lección 1" });
  sc(S(34), S(35), "cg", [[S(34), "think"], [S(34) + 2.2, "give"]], [
    [c("2", "orange", S(34) + 0.7), c("tradiciones que fueron anuncios", "red", S(34) + 1.3)]
  ], { wt: "lección 2" });
  sc(S(35), S(36), "cg", [[S(35), "give"], [S(35) + 2.4, "point"]], [
    [c("3", "orange", S(35) + 0.8), c("¿cuánto valdrá al venderlo?", "green", S(35) + 1.4)]
  ], { wt: "lección 3" });
  // 11 LA LECCIÓN
  sc(S(36), S(37), "cg", [[S(36), "point"], [S(36) + 2.6, "think"]], [
    [c("lo que son", "grey", S(36) + 1.0, { x: "strike" })],
    [c("lo que te hicieron creer", "red", S(36) + 4.4)]
  ], { wt: "el valor" });
  sc(S(37), S(38), "cg", [[S(37), "cheer"], [S(37) + 2.0, "give"]], [
    [c("tú decides cuánto vale", "green", S(37) + 0.7)]
  ], { wt: "cuando lo entiendes" });
  // 12 CIERRE
  sc(S(38), S(39), "cg", [[S(38), "give"], [S(38) + 2.4, "cheer"]], [
    [w("heart", S(38) + 0.8, { sc: 0.4 }), c("no tiene que costar una fortuna", "green", S(38) + 1.4)]
  ], { wt: "un anillo" });
  sc(S(39), S(40), "cg", [[S(39), "calm"], [S(39) + 2.2, "look"]], [
    [c("contenido educativo", "grey", S(39) + 0.7)],
    [c("no es asesoría financiera", "orange", S(39) + 3.8)]
  ], { wt: "aviso" });
  sc(S(40), END, "cg", [[S(40), "cheer"], [S(40) + 2.4, "give"]], [
    [c("¿2 meses de sueldo?", "orange", S(40) + 0.7)],
    [c("cuéntame en comentarios", "green", S(40) + 4.4)]
  ], { wt: "tu turno" });

  root.SCENES = SC;
})(window);

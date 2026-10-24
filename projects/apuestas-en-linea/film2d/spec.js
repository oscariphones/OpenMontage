/* Apuestas en línea: por qué la casa siempre gana (global con ejemplos de México) (Fábrica 2.0): the whole film as data. Times are REAL seconds of the narration (assets/audio/timeline.json).
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
  sc(0, S(1), "cg", [[S(0), "phone"], [S(0) + 2.6, "cheer"]], []);
  sc(S(1), S(2), "cg", [[S(1), "look"], [S(1) + 2.4, "worry"]], []);
  sc(S(2), S(3), "cg", [[S(2), "shrug"], [S(2) + 2.2, "point"]], []);
  // 2 DE QUÉ VA ESTO
  sc(S(3), S(4), "cg", [[S(3), "look"], [S(3) + 2.2, "point"]], [
    [c("apuestas deportivas", "orange", S(3) + 0.7), c("casinos en línea", "orange", S(3) + 1.3)],
    [c("¿cómo ganan?", "grey", S(3) + 3.6)]
  ], { wt: "el tema de hoy" });
  sc(S(4), S(5), "cg", [[S(4), "give"], [S(4) + 2.2, "think"]], [
    [c("ejemplos en pesos", "green", S(4) + 0.7)],
    [c("¿quién se queda tu dinero?", "red", S(4) + 3.4)]
  ], { wt: "con números" });
  // 3 SUSCRÍBETE (recordatorio obligatorio)
  sc(S(5), S(6), "cg", [[S(5), "point"], [S(5) + 2.4, "cheer"]], [
    [big("SUSCRÍBETE", "red", S(5) + 4.4, { x: "stamp" })]
  ], { wt: "antes de seguir" });
  sc(S(6), S(7), "cg", [[S(6), "sitRelaxed"], [S(6) + 2.2, "give"]], [
    [c("el dinero en tu vida diaria", "green", S(6) + 0.7)],
    [c("activa la campanita", "orange", S(6) + 3.6)]
  ], { wt: "cada semana" });
  sc(S(7), S(8), "cg", [[S(7), "calm"], [S(7) + 1.0, "look"]], []);
  // 4 DE TODOS LADOS
  sc(S(8), S(9), "cg", [[S(8), "think"], [S(8) + 2.4, "calm"]], [
    [c("antes: casino o hipódromo", "grey", S(8) + 0.8)],
    [c("lejos de tu casa", "grey", S(8) + 4.4)]
  ], { wt: "hace unos años" });
  sc(S(9), S(10), "cg", [[S(9), "phone"], [S(9) + 2.4, "point"]], [
    [c("decenas de casas de apuestas", "orange", S(9) + 0.8)],
    [w("doc", S(9) + 4.4, { sc: 0.4 }), c("permiso de Gobernación", "grey", S(9) + 5.0)],
    [p("phone", S(9) + 6.0, { s: 0.4 }), c("todas con app", "orange", S(9) + 6.6)]
  ], { wt: "hoy en México" });
  sc(S(10), S(11), "cg", [[S(10), "cheer"], [S(10) + 2.4, "look"]], [
    [c("camisetas de la Liga MX", "orange", S(10) + 0.8)],
    [c("anuncios en el Mundial", "orange", S(10) + 4.8)]
  ], { wt: "en todos lados" });
  // 5 LA CASA
  sc(S(11), S(12), "cg", [[S(11), "point"], [S(11) + 2.4, "give"]], [
    [p("building", S(11) + 0.8, { s: 0.4 }), big("la casa", "orange", S(11) + 1.4)],
    [c("organiza", "grey", S(11) + 4.6), c("cobra", "grey", S(11) + 5.2), c("paga", "grey", S(11) + 5.8)]
  ], { wt: "¿quién es?" });
  sc(S(12), S(13), "cg", [[S(12), "think"], [S(12) + 1.6, "point"]], [
    [big("3 formas de ganar", "green", S(12) + 0.6)]
  ], { wt: "la casa" });
  // 6 LAS APUESTAS DEPORTIVAS
  sc(S(13), S(14), "cg", [[S(13), "look"], [S(13) + 2.4, "think"]], [
    [c("1", "orange", S(13) + 0.8), c("la casa pone el precio", "orange", S(13) + 1.4)],
    [c("comisión escondida", "red", S(13) + 4.8)]
  ], { wt: "apuestas deportivas" });
  sc(S(14), S(15), "cg", [[S(14), "give"], [S(14) + 2.4, "point"]], [
    [c("$100 al América", "orange", S(14) + 0.8), c("$100 a las Chivas", "orange", S(14) + 1.6)]
  ], { wt: "ejemplo" });
  sc(S(15), S(16), "cg", [[S(15), "calm"], [S(15) + 2.4, "worry"]], [
    [c("justo: $200", "green", S(15) + 0.8, { x: "strike" })],
    [big("la casa paga $190", "red", S(15) + 4.0)]
  ], { wt: "el pago" });
  sc(S(16), S(17), "cg", [[S(16), "shrug"], [S(16) + 2.4, "slump"]], [
    [big("$10 para la casa", "orange", S(16) + 0.8)],
    [c("gane quien gane", "red", S(16) + 4.4)]
  ], { wt: "sin arriesgar" });
  // 7 ENTRE JUGADORES
  sc(S(17), S(18), "cg", [[S(17), "point"], [S(17) + 2.4, "look"]], [
    [c("2", "orange", S(17) + 0.8), c("póker", "grey", S(17) + 1.4), c("carreras de caballos", "grey", S(17) + 2.0)],
    [c("jugadores contra jugadores", "orange", S(17) + 4.6)]
  ], { wt: "entre jugadores" });
  sc(S(18), S(19), "cg", [[S(18), "give"], [S(18) + 2.4, "cheer"]], [
    [w("bag", S(18) + 0.8, { sc: 0.4 }), c("la casa toma su parte", "orange", S(18) + 1.4)],
    [c("el resto a los ganadores", "green", S(18) + 4.6)]
  ], { wt: "cómo gana" });
  // 8 EL CASINO
  sc(S(19), S(20), "cg", [[S(19), "worry"], [S(19) + 2.4, "point"]], [
    [c("3", "orange", S(19) + 0.8), c("tú contra la casa", "red", S(19) + 1.4)]
  ], { wt: "el casino" });
  sc(S(20), S(21), "cg", [[S(20), "think"], [S(20) + 2.2, "give"]], [
    [c("cada juego", "grey", S(20) + 0.7), c("ventaja para la casa", "red", S(20) + 1.3)]
  ], { wt: "el diseño" });
  sc(S(21), S(22), "cg", [[S(21), "look"], [S(21) + 2.4, "worry"]], [
    [c("blackjack: 1-2 %", "orange", S(21) + 0.8)],
    [c("tragamonedas: mucho más", "red", S(21) + 4.6)]
  ], { wt: "la ventaja" });
  sc(S(22), S(23), "cg", [[S(22), "shrug"], [S(22) + 2.4, "slump"]], [
    [c("ganar", "green", S(22) + 0.8), w("balance", S(22) + 1.4, { sc: 0.4 }), c("perder", "red", S(22) + 2.0)],
    [c("un poquito más perder", "red", S(22) + 4.6)]
  ], { wt: "cada jugada" });
  // 9 LOS GRANDES NÚMEROS
  sc(S(23), S(24), "cg", [[S(23), "cheer"], [S(23) + 2.4, "think"]], [
    [c("tú: una noche", "green", S(23) + 0.8)],
    [c("el casino: millones de jugadas", "orange", S(23) + 4.6)]
  ], { wt: "la clave" });
  sc(S(24), S(25), "cg", [[S(24), "point"], [S(24) + 2.4, "calm"]], [
    [w("stairs", S(24) + 0.8, { n: 4, sc: 0.4 }), c("pequeña ventaja", "grey", S(24) + 1.4)],
    [big("ganancia segura", "orange", S(24) + 4.6)]
  ], { wt: "grandes números" });
  sc(S(25), S(26), "cg", [[S(25), "worry"], [S(25) + 2.4, "shrug"]], [
    [c("¿ganas demasiado?", "green", S(25) + 0.8)],
    [c("te sacan", "red", S(25) + 4.4), c("te limitan", "red", S(25) + 5.2, { x: "stamp" })]
  ], { wt: "y si ganas" });
  // 10 EL CASINO EN TU BOLSILLO
  sc(S(26), S(27), "cg", [[S(26), "phone"], [S(26) + 2.4, "look"]], [
    [p("phone", S(26) + 0.8, { s: 0.4 }), c("abierto 24 horas", "orange", S(26) + 1.4)],
    [c("sin salir de casa", "red", S(26) + 4.6)]
  ], { wt: "en tu celular" });
  sc(S(27), S(28), "cg", [[S(27), "give"], [S(27) + 2.4, "point"]], [
    [c("sin edificio", "grey", S(27) + 0.8), c("sin meseros", "grey", S(27) + 1.4)],
    [c("miles de juegos", "orange", S(27) + 4.4)]
  ], { wt: "el negocio" });
  sc(S(28), S(29), "cg", [[S(28), "think"], [S(28) + 2.4, "worry"]], [
    [c("publicidad", "orange", S(28) + 0.8), c("bonos de bienvenida", "orange", S(28) + 1.4)],
    [c("lo recuperan contigo", "red", S(28) + 4.6)]
  ], { wt: "¿por qué regalan?" });
  sc(S(29), S(30), "cg", [[S(29), "phone"], [S(29) + 2.4, "sitStress"]], [
    [c("apuestas en vivo", "red", S(29) + 0.8), c("cada gol", "grey", S(29) + 1.4)],
    [p("card", S(29) + 4.8, { s: 0.4 }), c("depósito en segundos", "red", S(29) + 5.4)]
  ], { wt: "más rápido" });
  // 11 LOS TRUCOS
  sc(S(30), S(31), "cg", [[S(30), "look"], [S(30) + 2.4, "think"]], [
    [c("diseñadas para que sigas", "red", S(30) + 0.8)],
    [p("clock", S(30) + 4.4, { s: 0.4 }), c("sin relojes", "grey", S(30) + 5.0)]
  ], { wt: "los trucos" });
  sc(S(31), S(32), "cg", [[S(31), "phone"], [S(31) + 2.4, "cheer"]], [
    [c("notificaciones", "orange", S(31) + 0.8), c("celebran poquito", "orange", S(31) + 1.4)],
    [c("“casi ganaste”", "red", S(31) + 4.8)]
  ], { wt: "en la app" });
  sc(S(32), S(33), "cg", [[S(32), "worry"], [S(32) + 2.4, "slump"]], [
    [c("apostar para recuperar", "red", S(32) + 0.8, { x: "stamp" })]
  ], { wt: "el más peligroso" });
  // 12 CÓMO PROTEGERTE
  sc(S(33), S(34), "cg", [[S(33), "give"], [S(33) + 2.4, "calm"]], [
    [c("gasto de diversión", "green", S(33) + 0.8), p("play", S(33) + 1.4, { s: 0.4 })],
    [c("no una forma de ganar", "red", S(33) + 5.0)]
  ], { wt: "si apuestas" });
  sc(S(34), S(35), "cg", [[S(34), "point"], [S(34) + 2.4, "think"]], [
    [c("límite fijo al mes", "green", S(34) + 0.8)],
    [c("sin dinero prestado", "green", S(34) + 4.4), c("no recuperar", "green", S(34) + 5.0)]
  ], { wt: "3 reglas" });
  sc(S(35), S(36), "cg", [[S(35), "calm"], [S(35) + 2.4, "give"]], [
    [c("¿no puedes parar?", "orange", S(35) + 0.8)],
    [c("busca ayuda profesional", "green", S(35) + 4.4)]
  ], { wt: "importante" });
  // 13 CIERRE
  sc(S(36), S(37), "cg", [[S(36), "point"], [S(36) + 2.4, "think"]], [
    [c("no es suerte", "grey", S(36) + 0.8, { x: "strike" })],
    [big("son matemáticas", "orange", S(36) + 4.6)]
  ], { wt: "resumen" });
  sc(S(37), S(38), "cg", [[S(37), "shrug"], [S(37) + 2.4, "look"]], [
    [c("anuncios y bonos", "orange", S(37) + 0.8)],
    [c("los pagan los que pierden", "red", S(37) + 4.0)]
  ], { wt: "¿quién paga?" });
  sc(S(38), S(39), "cg", [[S(38), "calm"], [S(38) + 2.2, "look"]], [
    [c("contenido educativo", "grey", S(38) + 0.7)],
    [c("no promueve las apuestas", "orange", S(38) + 3.4)]
  ], { wt: "aviso" });
  sc(S(39), END, "cg", [[S(39), "cheer"], [S(39) + 2.4, "give"]], [
    [c("¿has apostado?", "orange", S(39) + 0.7)],
    [c("cuéntame en comentarios", "green", S(39) + 4.4)]
  ], { wt: "tu turno" });

  root.SCENES = SC;
})(window);

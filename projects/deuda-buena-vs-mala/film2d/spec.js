/* Deuda buena vs deuda mala: cómo usan los ricos el dinero prestado (global) (Fábrica 2.0): the whole film as data. Times are REAL seconds of the narration (assets/audio/timeline.json).
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
  sc(0, S(1), "cg", [[S(0), "point"], [S(0) + 2.8, "give"]], []);
  sc(S(1), S(2), "cg", [[S(1), "slump"], [S(1) + 2.4, "cheer"]], []);
  sc(S(2), S(3), "cg", [[S(2), "think"], [S(2) + 2.4, "point"]], []);
  // 2 DE QUÉ VA ESTO
  sc(S(3), S(4), "cg", [[S(3), "look"], [S(3) + 2.4, "point"]], [
    [c("ricos: deudas para ganar", "green", S(3) + 0.8)],
    [c("la mayoría: para perder", "red", S(3) + 4.6)]
  ], { wt: "el tema de hoy" });
  sc(S(4), S(5), "cg", [[S(4), "think"], [S(4) + 2.2, "give"]], [
    [c("¿te ayuda o te hunde?", "orange", S(4) + 0.7)]
  ], { wt: "la pregunta" });
  // 3 SUSCRÍBETE (recordatorio obligatorio)
  sc(S(5), S(6), "cg", [[S(5), "point"], [S(5) + 2.4, "cheer"]], [
    [big("SUSCRÍBETE", "red", S(5) + 4.6, { x: "stamp" })]
  ], { wt: "antes de seguir" });
  sc(S(6), S(7), "cg", [[S(6), "sitRelaxed"], [S(6) + 2.2, "give"]], [
    [c("secretos del dinero", "green", S(6) + 0.7)],
    [c("activa la campanita", "orange", S(6) + 3.6)]
  ], { wt: "cada semana" });
  sc(S(7), S(8), "cg", [[S(7), "calm"], [S(7) + 1.2, "look"]], []);
  // 4 RENTAR DINERO
  sc(S(8), S(9), "cg", [[S(8), "shrug"], [S(8) + 1.8, "think"]], [
    [c("olvida lo que te dijeron", "grey", S(8) + 0.6)]
  ], { wt: "un momento" });
  sc(S(9), S(10), "cg", [[S(9), "give"], [S(9) + 2.4, "point"]], [
    [w("coin", S(9) + 0.8, { sc: 0.4 }), c("préstamo = rentar dinero", "orange", S(9) + 1.4)],
    [p("calendar", S(9) + 4.8, { s: 0.4 }), c("lo usas un tiempo", "grey", S(9) + 5.4)]
  ], { wt: "en el fondo" });
  sc(S(10), S(11), "cg", [[S(10), "point"], [S(10) + 2.2, "look"]], [
    [big("tasa de interés", "orange", S(10) + 0.7)]
  ], { wt: "la renta" });
  sc(S(11), S(12), "cg", [[S(11), "think"], [S(11) + 2.4, "point"]], [
    [c("lo que te deja", "green", S(11) + 0.8), c(">", "grey", S(11) + 1.4), c("lo que pagas", "red", S(11) + 2.0)],
    [c("¿sí o no?", "orange", S(11) + 5.0)]
  ], { wt: "la pregunta" });
  // 5 LA DIFERENCIA
  sc(S(12), S(13), "cg", [[S(12), "give"], [S(12) + 2.4, "point"]], [
    [c("pides al 5 %", "red", S(12) + 0.8)],
    [c("te deja 8 %", "green", S(12) + 4.4)]
  ], { wt: "imagina" });
  sc(S(13), S(14), "cg", [[S(13), "cheer"], [S(13) + 2.4, "give"]], [
    [c("pagas la renta", "grey", S(13) + 0.8)],
    [big("+3 % para ti", "green", S(13) + 4.2)]
  ], { wt: "la diferencia" });
  sc(S(14), S(15), "cg", [[S(14), "worry"], [S(14) + 2.4, "shrug"]], [
    [p("card", S(14) + 0.8, { s: 0.4 }), c("tarjeta al 30 %", "red", S(14) + 1.4)],
    [c("para comprar ropa", "orange", S(14) + 4.4)]
  ], { wt: "lo contrario" });
  sc(S(15), S(16), "cg", [[S(15), "slump"], [S(15) + 2.2, "worry"]], [
    [c("no te deja nada", "red", S(15) + 0.7)],
    [c("pagas toda la renta", "red", S(15) + 3.9)]
  ], { wt: "el resultado" });
  sc(S(16), S(17), "cg", [[S(16), "point"], [S(16) + 2.4, "cheer"]], [
    [c("ricos: cosas que producen", "green", S(16) + 0.8)],
    [c("mayoría: cosas que gastan", "red", S(16) + 5.6)]
  ], { wt: "el secreto" });
  // 6 DEUDA BUENA VS DEUDA MALA
  sc(S(17), S(18), "cg", [[S(17), "give"], [S(17) + 2.0, "point"]], [
    [c("deuda buena", "green", S(17) + 0.6), c("vs", "grey", S(17) + 1.1), c("deuda mala", "red", S(17) + 1.6)]
  ], { wt: "por eso" });
  sc(S(18), S(19), "cg", [[S(18), "cheer"], [S(18) + 2.4, "give"]], [
    [c("deuda buena: te genera ingresos", "green", S(18) + 0.8)],
    [p("building", S(18) + 5.0, { s: 0.4 }), p("house", S(18) + 5.6, { s: 0.4 }), p("laptop", S(18) + 6.2, { s: 0.4 })]
  ], { wt: "la buena" });
  sc(S(19), S(20), "cg", [[S(19), "worry"], [S(19) + 2.4, "shrug"]], [
    [c("deuda mala: pierde valor", "red", S(19) + 0.8)],
    [c("ropa", "grey", S(19) + 4.6), c("viajes", "grey", S(19) + 5.2), p("phone", S(19) + 5.8, { s: 0.4 })]
  ], { wt: "la mala" });
  sc(S(20), S(21), "cg", [[S(20), "think"], [S(20) + 2.4, "point"]], [
    [p("car", S(20) + 0.8, { s: 0.4 }), c("para trabajar: buena", "green", S(20) + 1.4)],
    [c("para presumir: mala", "red", S(20) + 5.2)]
  ], { wt: "¿y el carro?" });
  // 7 EL APALANCAMIENTO
  sc(S(21), S(22), "cg", [[S(21), "point"], [S(21) + 2.4, "cheer"]], [
    [big("apalancamiento", "orange", S(21) + 0.8)]
  ], { wt: "la palabra favorita" });
  sc(S(22), S(23), "cg", [[S(22), "give"], [S(22) + 2.4, "look"]], [
    [c("dinero prestado", "grey", S(22) + 0.8), sy("arrow", S(22) + 1.4, "grey"), c("controlas algo grande", "green", S(22) + 2.0)]
  ], { wt: "qué significa" });
  sc(S(23), S(24), "cg", [[S(23), "point"], [S(23) + 2.4, "give"]], [
    [c("$20 mil tuyos", "green", S(23) + 0.8), c("+ préstamo", "grey", S(23) + 1.4)],
    [p("house", S(23) + 4.4, { s: 0.4 }), c("casa de $100 mil", "orange", S(23) + 5.0)]
  ], { wt: "por ejemplo" });
  sc(S(24), S(25), "cg", [[S(24), "cheer"], [S(24) + 2.4, "point"]], [
    [c("la casa sube 10 %", "green", S(24) + 0.8)],
    [c("ganas $10 mil", "green", S(24) + 4.4)]
  ], { wt: "si sube" });
  sc(S(25), S(26), "cg", [[S(25), "think"], [S(25) + 2.4, "cheer"]], [
    [c("sin intereses ni gastos", "grey", S(25) + 0.8)],
    [big("+50 % tu dinero", "green", S(25) + 4.6)]
  ], { wt: "o sea" });
  // 8 EL LADO PELIGROSO
  sc(S(26), S(27), "cg", [[S(26), "worry"], [S(26) + 2.4, "point"]], [
    [c("una lupa", "orange", S(26) + 0.8)],
    [c("también agranda las pérdidas", "red", S(26) + 4.6)]
  ], { wt: "pero ojo" });
  sc(S(27), S(28), "cg", [[S(27), "slump"], [S(27) + 2.4, "worry"]], [
    [c("la casa baja 20 %", "red", S(27) + 0.8)],
    [big("pierdes tus $20 mil", "red", S(27) + 5.0)]
  ], { wt: "si baja" });
  sc(S(28), S(29), "cg", [[S(28), "askHelp"], [S(28) + 2.2, "slump"]], [
    [w("doc", S(28) + 0.7, { sc: 0.4 }), c("la deuda sigue ahí", "red", S(28) + 1.3)]
  ], { wt: "y además" });
  sc(S(29), S(30), "cg", [[S(29), "look"], [S(29) + 2.4, "worry"]], [
    [big("2008", "red", S(29) + 0.8)],
    [p("house", S(29) + 4.8, { s: 0.4 }), c("debían más de lo que valía", "red", S(29) + 5.4)]
  ], { wt: "ya pasó" });
  sc(S(30), S(31), "cg", [[S(30), "calm"], [S(30) + 2.4, "point"]], [
    [c("no se endeudan al máximo", "orange", S(30) + 0.8)],
    [p("shield", S(30) + 4.2, { s: 0.4 }), c("dejan un colchón", "green", S(30) + 4.8)]
  ], { wt: "los que duran" });
  // 9 CÓMO LO USAN LOS RICOS
  sc(S(31), S(32), "cg", [[S(31), "point"], [S(31) + 2.2, "think"]], [
    [c("varias formas", "grey", S(31) + 0.7)],
    [c("una misma idea", "orange", S(31) + 4.0)]
  ], { wt: "los ricos" });
  sc(S(32), S(33), "cg", [[S(32), "give"], [S(32) + 2.2, "cheer"]], [
    [p("building", S(32) + 0.7, { s: 0.4 }), c("1. hacer crecer negocios", "green", S(32) + 1.3)]
  ], { wt: "forma 1" });
  sc(S(33), S(34), "cg", [[S(33), "point"], [S(33) + 2.4, "give"]], [
    [p("house", S(33) + 0.8, { s: 0.4 }), c("2. casas que se pagan solas", "green", S(33) + 1.4)],
    [c("con la renta", "grey", S(33) + 4.4)]
  ], { wt: "forma 2" });
  sc(S(34), S(35), "cg", [[S(34), "think"], [S(34) + 2.4, "look"]], [
    [w("bars", S(34) + 0.8, { sc: 0.4 }), c("3. no venden sus inversiones", "green", S(34) + 1.4)],
    [c("piden prestado con garantía", "orange", S(34) + 5.4)]
  ], { wt: "forma 3" });
  sc(S(35), S(36), "cg", [[S(35), "point"], [S(35) + 2.4, "cheer"]], [
    [big("¿me deja más de lo que cuesta?", "orange", S(35) + 0.8)]
  ], { wt: "siempre la misma pregunta" });
  // 10 LA LECCIÓN
  sc(S(36), S(37), "cg", [[S(36), "give"], [S(36) + 2.4, "point"]], [
    [c("no es endeudarte", "grey", S(36) + 0.8, { x: "strike" })],
    [c("mirar las deudas como un rico", "green", S(36) + 4.4)]
  ], { wt: "la lección" });
  sc(S(37), S(38), "cg", [[S(37), "think"], [S(37) + 2.4, "look"]], [
    [c("¿qué me va a dejar?", "green", S(37) + 0.8)],
    [c("¿cuánto me va a costar?", "red", S(37) + 4.4)]
  ], { wt: "antes de pedir" });
  sc(S(38), S(39), "cg", [[S(38), "shrug"], [S(38) + 2.4, "give"]], [
    [c("¿solo un gusto?", "orange", S(38) + 0.8)],
    [w("jar", S(38) + 4.2, { sc: 0.4 }), c("junta y paga de contado", "green", S(38) + 4.8)]
  ], { wt: "si no deja nada" });
  sc(S(39), S(40), "cg", [[S(39), "point"], [S(39) + 2.4, "cheer"]], [
    [p("card", S(39) + 0.8, { s: 0.4 }), c("deudas de tarjeta", "red", S(39) + 1.4)],
    [c("pagarlas = gran inversión", "green", S(39) + 5.0)]
  ], { wt: "si ya tienes" });
  sc(S(40), S(41), "cg", [[S(40), "give"], [S(40) + 2.4, "cheer"]], [
    [c("dejas de pagar 30 %", "red", S(40) + 0.8)],
    [big("= ganas 30 % seguro", "green", S(40) + 4.4)]
  ], { wt: "porque" });
  // 11 CIERRE
  sc(S(41), S(42), "cg", [[S(41), "point"], [S(41) + 2.2, "calm"]], [
    [c("ni buena ni mala", "grey", S(41) + 0.7)],
    [big("una herramienta", "orange", S(41) + 3.8)]
  ], { wt: "resumen" });
  sc(S(42), S(43), "cg", [[S(42), "cheer"], [S(42) + 2.2, "worry"]], [
    [c("bien usada: construye", "green", S(42) + 0.7)],
    [c("mal usada: destruye", "red", S(42) + 3.9)]
  ], { wt: "en tus manos" });
  sc(S(43), S(44), "cg", [[S(43), "calm"], [S(43) + 2.2, "look"]], [
    [c("contenido educativo", "grey", S(43) + 0.7)],
    [c("no es asesoría financiera", "orange", S(43) + 3.6)]
  ], { wt: "aviso" });
  sc(S(44), END, "cg", [[S(44), "cheer"], [S(44) + 2.4, "give"]], [
    [c("¿tu deuda es buena o mala?", "orange", S(44) + 0.7)],
    [c("cuéntame en comentarios", "green", S(44) + 4.4)]
  ], { wt: "tu turno" });

  root.SCENES = SC;
})(window);

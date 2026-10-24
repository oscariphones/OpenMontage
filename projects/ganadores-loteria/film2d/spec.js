/* Por qué los ganadores de la lotería pierden su dinero (global) (Fábrica 2.0): the whole film as data. Times are REAL seconds of the narration (assets/audio/timeline.json).
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
  sc(S(1), S(2), "cg", [[S(1), "point"], [S(1) + 2.4, "worry"]], []);
  sc(S(2), S(3), "cg", [[S(2), "think"], [S(2) + 2.4, "point"]], []);
  // 2 DE QUÉ VA ESTO
  sc(S(3), S(4), "cg", [[S(3), "look"], [S(3) + 1.8, "point"]], [
    [c("¿por qué pierden su dinero?", "orange", S(3) + 0.6)]
  ], { wt: "el tema de hoy" });
  sc(S(4), S(5), "cg", [[S(4), "think"], [S(4) + 2.2, "give"]], [
    [c("lo que puedes aprender", "green", S(4) + 0.7)],
    [c("aunque nunca compres un boleto", "orange", S(4) + 3.8)]
  ], { wt: "lo importante" });
  // 3 SUSCRÍBETE (recordatorio obligatorio)
  sc(S(5), S(6), "cg", [[S(5), "point"], [S(5) + 2.4, "cheer"]], [
    [big("SUSCRÍBETE", "red", S(5) + 4.4, { x: "stamp" })]
  ], { wt: "antes de seguir" });
  sc(S(6), S(7), "cg", [[S(6), "sitRelaxed"], [S(6) + 2.2, "give"]], [
    [c("secretos del dinero", "green", S(6) + 0.7)],
    [c("activa la campanita", "orange", S(6) + 3.6)]
  ], { wt: "cada semana" });
  sc(S(7), S(8), "cg", [[S(7), "calm"], [S(7) + 1.0, "look"]], []);
  // 4 EL MITO
  sc(S(8), S(9), "cg", [[S(8), "look"], [S(8) + 2.4, "shrug"]], [
    [big("70 %", "red", S(8) + 0.8), c("¿se quedan en quiebra?", "red", S(8) + 1.4)],
    [c("lo dicen en todos lados", "grey", S(8) + 4.6)]
  ], { wt: "lo que dicen" });
  sc(S(9), S(10), "cg", [[S(9), "shrug"], [S(9) + 2.4, "point"]], [
    [c("sin fuente seria", "red", S(9) + 0.8)],
    [big("MITO", "red", S(9) + 4.4, { x: "stamp" })]
  ], { wt: "la verdad" });
  sc(S(10), S(11), "cg", [[S(10), "think"], [S(10) + 2.2, "look"]], [
    [w("doc", S(10) + 0.7, { sc: 0.4 }), c("estudio en Florida", "orange", S(10) + 1.3)]
  ], { wt: "lo que sí existe" });
  sc(S(11), S(12), "cg", [[S(11), "give"], [S(11) + 2.4, "worry"]], [
    [c("premios de hasta $150 mil", "green", S(11) + 0.8)],
    [c("quiebra casi igual", "red", S(11) + 5.0), c("que premios chiquitos", "grey", S(11) + 5.6)]
  ], { wt: "el resultado" });
  sc(S(12), S(13), "cg", [[S(12), "point"], [S(12) + 2.4, "slump"]], [
    [c("el premio", "green", S(12) + 0.8), sy("arrow", S(12) + 1.4, "grey"), c("solo retrasa", "orange", S(12) + 2.0)],
    [c("no resuelve", "red", S(12) + 4.8)]
  ], { wt: "o sea" });
  // 5 EL PREMIO ES MÁS CHICO
  sc(S(13), S(14), "cg", [[S(13), "worry"], [S(13) + 2.2, "look"]], [
    [p("calendar", S(13) + 0.6, { s: 0.4 }), c("el día de cobrar", "orange", S(13) + 1.2)]
  ], { wt: "el primer golpe" });
  sc(S(14), S(15), "cg", [[S(14), "point"], [S(14) + 2.4, "think"]], [
    [big("premio anunciado", "orange", S(14) + 0.8)],
    [w("calstack", S(14) + 4.4, { sc: 0.4 }), c("pagos durante años", "grey", S(14) + 5.0)]
  ], { wt: "el anuncio" });
  sc(S(15), S(16), "cg", [[S(15), "give"], [S(15) + 2.2, "shrug"]], [
    [c("todo de una vez", "orange", S(15) + 0.7)],
    [big("≈ la mitad", "red", S(15) + 4.0)]
  ], { wt: "cobrar todo junto" });
  sc(S(16), S(17), "cg", [[S(16), "worry"], [S(16) + 2.4, "slump"]], [
    [w("doc", S(16) + 0.6, { sc: 0.4 }), c("impuestos", "red", S(16) + 1.2), c("otra buena parte", "red", S(16) + 1.8)]
  ], { wt: "y luego" });
  sc(S(17), S(18), "cg", [[S(17), "shrug"], [S(17) + 2.4, "point"]], [
    [c("gastan la cifra del anuncio", "red", S(17) + 0.8)],
    [c("no lo que les quedó", "orange", S(17) + 4.4)]
  ], { wt: "el error" });
  // 6 DINERO FÁCIL
  sc(S(18), S(19), "cg", [[S(18), "think"], [S(18) + 1.6, "point"]], [
    [c("en la cabeza", "orange", S(18) + 0.6)]
  ], { wt: "segundo problema" });
  sc(S(19), S(20), "cg", [[S(19), "give"], [S(19) + 2.4, "cheer"]], [
    [w("coin", S(19) + 0.8, { sc: 0.4 }), c("dinero sin esfuerzo", "green", S(19) + 1.4)],
    [c("se gasta más fácil", "red", S(19) + 4.4)]
  ], { wt: "dinero de juego" });
  sc(S(20), S(21), "cg", [[S(20), "think"], [S(20) + 2.4, "look"]], [
    [big("contabilidad mental", "orange", S(20) + 0.8)],
    [c("según de dónde vino", "grey", S(20) + 4.2)]
  ], { wt: "así se llama" });
  sc(S(21), S(22), "cg", [[S(21), "cheer"], [S(21) + 2.4, "worry"]], [
    [p("house", S(21) + 0.7, { s: 0.4 }), p("car", S(21) + 1.2, { s: 0.4 }), c("fiestas", "orange", S(21) + 1.7)],
    [c("más rápido que un sueldo", "red", S(21) + 4.2)]
  ], { wt: "por eso" });
  // 7 LOS GASTOS QUE SIGUEN
  sc(S(22), S(23), "cg", [[S(22), "look"], [S(22) + 1.4, "point"]], [
    [c("una trampa", "red", S(22) + 0.5)]
  ], { wt: "cuidado" });
  sc(S(23), S(24), "cg", [[S(23), "point"], [S(23) + 2.4, "worry"]], [
    [p("house", S(23) + 0.8, { s: 0.4 }), c("una mansión", "green", S(23) + 1.4)],
    [c("impuestos", "red", S(23) + 5.0), c("mantenimiento", "red", S(23) + 5.6), c("luz", "red", S(23) + 6.2)]
  ], { wt: "no se paga una vez" });
  sc(S(24), S(25), "cg", [[S(24), "give"], [S(24) + 2.4, "shrug"]], [
    [p("car", S(24) + 0.8, { s: 0.4 }), c("lujos y viajes", "orange", S(24) + 1.4)],
    [c("gastos de cada mes", "red", S(24) + 4.4)]
  ], { wt: "los gustos" });
  sc(S(25), S(26), "cg", [[S(25), "slump"], [S(25) + 2.4, "point"]], [
    [c("gastos de millonario", "red", S(25) + 0.8)],
    [c("sueldo de millonario", "grey", S(25) + 4.6, { x: "strike" })]
  ], { wt: "la trampa" });
  // 8 FAMILIA Y AMIGOS
  sc(S(26), S(27), "cg", [[S(26), "look"], [S(26) + 2.2, "worry"]], [
    [c("las personas", "orange", S(26) + 0.6)]
  ], { wt: "tercer problema" });
  sc(S(27), S(28), "cg", [[S(27), "worry"], [S(27) + 2.4, "askHelp"]], [
    [c("familiares", "grey", S(27) + 0.8), c("amigos", "grey", S(27) + 1.4), c("conocidos", "grey", S(27) + 2.0)],
    [p("envelope", S(27) + 5.0, { s: 0.4 }), c("¿me prestas?", "orange", S(27) + 5.6)]
  ], { wt: "la noticia se sabe" });
  sc(S(28), S(29), "cg", [[S(28), "shrug"], [S(28) + 2.4, "slump"]], [
    [c("decir que no cuesta", "orange", S(28) + 0.8)],
    [c("préstamos que no regresan", "red", S(28) + 4.2)]
  ], { wt: "el problema" });
  sc(S(29), S(30), "cg", [[S(29), "worry"], [S(29) + 2.4, "point"]], [
    [c("estafadores", "red", S(29) + 0.8), c("malos consejeros", "red", S(29) + 1.4)],
    [c("mucho dinero, poca experiencia", "orange", S(29) + 4.6)]
  ], { wt: "y además" });
  // 9 EL CASO WHITTAKER
  sc(S(30), S(31), "cg", [[S(30), "point"], [S(30) + 2.2, "look"]], [
    [c("Jack Whittaker", "orange", S(30) + 0.6)]
  ], { wt: "un caso real" });
  sc(S(31), S(32), "cg", [[S(31), "cheer"], [S(31) + 2.4, "point"]], [
    [big("2002", "orange", S(31) + 0.8), c("$315 millones", "green", S(31) + 1.4)],
    [c("de los más grandes", "green", S(31) + 4.6)]
  ], { wt: "el premio" });
  sc(S(32), S(33), "cg", [[S(32), "calm"], [S(32) + 2.4, "think"]], [
    [p("building", S(32) + 0.8, { s: 0.4 }), c("ya era empresario", "green", S(32) + 1.4)],
    [c("igual se complicó todo", "red", S(32) + 4.4)]
  ], { wt: "y aun así" });
  sc(S(33), S(34), "cg", [[S(33), "worry"], [S(33) + 2.4, "slump"]], [
    [p("car", S(33) + 0.8, { s: 0.4 }), c("robo de medio millón", "red", S(33) + 1.4)],
    [c("demandas", "red", S(33) + 5.0), c("tragedias", "red", S(33) + 5.6)]
  ], { wt: "lo que vino" });
  sc(S(34), S(35), "cg", [[S(34), "slump"], [S(34) + 2.4, "calm"]], [
    [c("ojalá hubieran roto el boleto", "orange", S(34) + 0.8)]
  ], { wt: "su esposa" });
  // 10 NO TODOS QUIEBRAN
  sc(S(35), S(36), "cg", [[S(35), "point"], [S(35) + 1.6, "cheer"]], [
    [c("no todos terminan mal", "green", S(35) + 0.6)]
  ], { wt: "ojo" });
  sc(S(36), S(37), "cg", [[S(36), "give"], [S(36) + 2.4, "look"]], [
    [w("doc", S(36) + 0.8, { sc: 0.4 }), c("estudio en Suecia", "orange", S(36) + 1.4)],
    [c("conservan buena parte", "green", S(36) + 4.6)]
  ], { wt: "otro estudio" });
  sc(S(37), S(38), "cg", [[S(37), "think"], [S(37) + 2.2, "point"]], [
    [c("tener un plan", "green", S(37) + 0.8)],
    [c("antes del primer billete", "orange", S(37) + 4.2)]
  ], { wt: "la diferencia" });
  // 11 LA LECCIÓN
  sc(S(38), S(39), "cg", [[S(38), "point"], [S(38) + 2.2, "give"]], [
    [c("aunque nunca juegues", "orange", S(38) + 0.7)]
  ], { wt: "la lección" });
  sc(S(39), S(40), "cg", [[S(39), "look"], [S(39) + 2.4, "think"]], [
    [c("herencia", "green", S(39) + 0.8), c("bono", "green", S(39) + 1.4), c("liquidación", "green", S(39) + 2.0)],
    [p("clock", S(39) + 5.0, { s: 0.4 }), c("no lo gastes de inmediato", "red", S(39) + 5.6)]
  ], { wt: "dinero inesperado" });
  sc(S(40), S(41), "cg", [[S(40), "point"], [S(40) + 2.4, "cheer"]], [
    [c("1. paga deudas caras", "orange", S(40) + 0.8)],
    [c("2. fondo de emergencias", "green", S(40) + 4.6)],
    [c("3. un gustito pequeño", "grey", S(40) + 5.8)]
  ], { wt: "el orden" });
  sc(S(41), S(42), "cg", [[S(41), "give"], [S(41) + 2.0, "calm"]], [
    [c("no subas tus gastos", "red", S(41) + 0.7)],
    [c("por dinero de una vez", "grey", S(41) + 3.9)]
  ], { wt: "y sobre todo" });
  // 12 CIERRE
  sc(S(42), S(43), "cg", [[S(42), "point"], [S(42) + 2.2, "cheer"]], [
    [c("ganar dinero", "grey", S(42) + 0.7)],
    [big("saber cuidarlo", "green", S(42) + 4.0)]
  ], { wt: "resumen" });
  sc(S(43), S(44), "cg", [[S(43), "look"], [S(43) + 2.4, "give"]], [
    [c("sueldo normal y tranquilo", "green", S(43) + 0.8)],
    [c("millonarios sin nada", "red", S(43) + 4.4)]
  ], { wt: "por eso" });
  sc(S(44), S(45), "cg", [[S(44), "calm"], [S(44) + 2.2, "look"]], [
    [c("contenido educativo", "grey", S(44) + 0.7)],
    [c("no es asesoría financiera", "orange", S(44) + 3.6)]
  ], { wt: "aviso" });
  sc(S(45), END, "cg", [[S(45), "cheer"], [S(45) + 2.4, "give"]], [
    [c("¿qué harías tú?", "orange", S(45) + 0.7)],
    [c("cuéntame en comentarios", "green", S(45) + 4.4)]
  ], { wt: "tu turno" });

  root.SCENES = SC;
})(window);

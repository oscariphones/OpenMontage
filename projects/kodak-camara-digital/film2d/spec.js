/* Kodak y la cámara digital (global) (Fábrica 2.0): the whole film as data. Times are REAL seconds of the narration (assets/audio/timeline.json).
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
  sc(0, S(1), "cg", [[S(0), "cheer"], [S(0) + 2.8, "slump"]], []);
  sc(S(1), S(2), "cg", [[S(1), "give"], [S(1) + 2.6, "shrug"]], []);
  sc(S(2), S(3), "cg", [[S(2), "point"], [S(2) + 2.2, "worry"]], []);
  // 2 DE QUÉ VA ESTO
  sc(S(3), S(4), "cg", [[S(3), "look"], [S(3) + 2.2, "point"]], [
    [p("building", S(3) + 0.7, { s: 0.4 }), c("hundido por su invento", "red", S(3) + 1.3)]
  ], { wt: "el tema de hoy" });
  sc(S(4), S(5), "cg", [[S(4), "think"], [S(4) + 2.0, "give"]], [
    [c("tu trabajo", "green", S(4) + 0.7), c("tu dinero", "green", S(4) + 1.3)]
  ], { wt: "lo que te enseña" });
  // 3 SUSCRÍBETE (recordatorio obligatorio)
  sc(S(5), S(6), "cg", [[S(5), "point"], [S(5) + 2.0, "cheer"]], [
    [big("SUSCRÍBETE", "red", S(5) + 3.4, { x: "stamp" })]
  ], { wt: "antes de seguir" });
  sc(S(6), S(7), "cg", [[S(6), "sitRelaxed"], [S(6) + 1.8, "give"]], [
    [c("activa la campanita", "orange", S(6) + 0.6)]
  ], { wt: "cada semana" });
  sc(S(7), S(8), "cg", [[S(7), "cheer"], [S(7) + 1.4, "calm"]], []);
  // 4 EL REY DE LAS FOTOS
  sc(S(8), S(9), "cg", [[S(8), "look"], [S(8) + 2.2, "cheer"]], [
    [c("foto = Kodak", "orange", S(8) + 0.7)]
  ], { wt: "casi un siglo" });
  sc(S(9), S(10), "cg", [[S(9), "point"], [S(9) + 2.2, "give"]], [
    [c("tú aprietas el botón", "grey", S(9) + 0.7)],
    [c("ellos hacen lo demás", "green", S(9) + 3.0)]
  ], { wt: "su idea" });
  sc(S(10), S(11), "cg", [[S(10), "give"], [S(10) + 2.4, "cheer"]], [
    [c("cámaras baratas", "grey", S(10) + 0.8)],
    [c("rollos", "green", S(10) + 3.6), c("revelado", "green", S(10) + 4.2)]
  ], { wt: "el negocio" });
  sc(S(11), S(12), "cg", [[S(11), "cheer"], [S(11) + 2.2, "point"]], [
    [w("coin", S(11) + 0.7, { sc: 0.4 }), c("cada foto, dinero", "green", S(11) + 1.3)]
  ], { wt: "una y otra vez" });
  // 5 EL INVENTO
  sc(S(12), S(13), "cg", [[S(12), "think"], [S(12) + 2.4, "cheer"]], [
    [p("calendar", S(12) + 0.8, { s: 0.4 }), c("1975", "grey", S(12) + 1.4)],
    [c("un joven ingeniero", "orange", S(12) + 4.0)]
  ], { wt: "el invento" });
  sc(S(13), S(14), "cg", [[S(13), "point"], [S(13) + 2.4, "give"]], [
    [p("box", S(13) + 0.8, { s: 0.4 }), c("la primera cámara digital", "green", S(13) + 1.4)],
    [c("casi 4 kilos", "orange", S(13) + 4.2)]
  ], { wt: "era" });
  sc(S(14), S(15), "cg", [[S(14), "worry"], [S(14) + 2.2, "shrug"]], [
    [p("clock", S(14) + 0.7, { s: 0.4 }), c("más de 20 segundos por foto", "orange", S(14) + 1.3)]
  ], { wt: "lentísima" });
  sc(S(15), S(16), "cg", [[S(15), "shrug"], [S(15) + 2.0, "point"]], [
    [c("juguete", "grey", S(15) + 0.7, { x: "strike" }), c("el futuro", "green", S(15) + 1.4)]
  ], { wt: "parecía" });
  // 6 LA DECISIÓN
  sc(S(16), S(17), "cg", [[S(16), "give"], [S(16) + 2.2, "slump"]], [
    [c("sin emoción", "red", S(16) + 0.7)]
  ], { wt: "los directivos" });
  sc(S(17), S(18), "cg", [[S(17), "shrug"], [S(17) + 2.4, "worry"]], [
    [c("bonita…", "grey", S(17) + 0.8)],
    [big("no se lo cuentes a nadie", "red", S(17) + 3.6)]
  ], { wt: "cuenta la historia" });
  sc(S(18), S(19), "cg", [[S(18), "think"], [S(18) + 2.4, "point"]], [
    [c("sin rollo", "red", S(18) + 0.8), sy("arrow", S(18) + 1.4, "red"), c("menos dinero", "red", S(18) + 2.0)]
  ], { wt: "la razón" });
  sc(S(19), S(20), "cg", [[S(19), "calm"], [S(19) + 2.2, "shrug"]], [
    [c("seguir con rollos", "orange", S(19) + 0.7)],
    [c("lo digital, para después", "grey", S(19) + 3.2)]
  ], { wt: "así que" });
  // 7 EL MUNDO NO ESPERÓ
  sc(S(20), S(21), "cg", [[S(20), "look"], [S(20) + 2.2, "point"]], [
    [c("otras empresas sin miedo", "orange", S(20) + 0.7)]
  ], { wt: "pero" });
  sc(S(21), S(22), "cg", [[S(21), "phone"], [S(21) + 2.4, "cheer"]], [
    [c("mejores", "green", S(21) + 0.8), c("más baratas", "green", S(21) + 1.4)],
    [p("phone", S(21) + 3.8, { s: 0.4 }), c("dentro del celular", "green", S(21) + 4.4)]
  ], { wt: "las cámaras digitales" });
  sc(S(22), S(23), "cg", [[S(22), "phone"], [S(22) + 2.2, "shrug"]], [
    [c("miles de fotos", "green", S(22) + 0.7), c("casi nada revelado", "red", S(22) + 1.4)]
  ], { wt: "de pronto" });
  sc(S(23), S(24), "cg", [[S(23), "worry"], [S(23) + 2.2, "slump"]], [
    [w("crack", S(23) + 0.7, { sc: 0.4 }), c("se desplomó", "red", S(23) + 1.3)]
  ], { wt: "los rollos" });
  // 8 LA CAÍDA
  sc(S(24), S(25), "cg", [[S(24), "slump"], [S(24) + 2.0, "worry"]], [
    [big("QUIEBRA", "red", S(24) + 2.4, { x: "stamp" })]
  ], { wt: "en 2012" });
  sc(S(25), S(26), "cg", [[S(25), "phone"], [S(25) + 2.4, "cheer"]], [
    [c("una app de fotos", "grey", S(25) + 0.8)],
    [big("$1,000 millones", "green", S(25) + 4.0)]
  ], { wt: "ese mismo año" });
  sc(S(26), S(27), "cg", [[S(26), "point"], [S(26) + 2.0, "shrug"]], [
    [c("Instagram", "orange", S(26) + 0.7), c("un puñado de empleados", "grey", S(26) + 1.4)]
  ], { wt: "esa app" });
  // 9 LO QUE TE ENSEÑA
  sc(S(27), S(28), "cg", [[S(27), "think"], [S(27) + 1.0, "point"]], []);
  sc(S(28), S(29), "cg", [[S(28), "point"], [S(28) + 2.4, "worry"]], [
    [c("1", "orange", S(28) + 0.8), c("proteger hoy puede costarte mañana", "red", S(28) + 1.4)]
  ], { wt: "lección 1" });
  sc(S(29), S(30), "cg", [[S(29), "think"], [S(29) + 2.4, "give"]], [
    [c("2", "orange", S(29) + 0.8), c("aprende lo nuevo a tiempo", "green", S(29) + 1.4)]
  ], { wt: "lección 2" });
  sc(S(30), S(31), "cg", [[S(30), "shrug"], [S(30) + 2.2, "point"]], [
    [c("3", "orange", S(30) + 0.7), c("famosa no es segura", "red", S(30) + 1.3)]
  ], { wt: "lección 3" });
  // 10 LA LECCIÓN
  sc(S(31), S(32), "cg", [[S(31), "point"], [S(31) + 2.0, "calm"]], [
    [c("el cambio va a llegar", "orange", S(31) + 0.7)]
  ], { wt: "la lección" });
  sc(S(32), S(33), "cg", [[S(32), "think"], [S(32) + 2.2, "cheer"]], [
    [c("súbete a tiempo", "green", S(32) + 0.7), c("o te pasa por encima", "red", S(32) + 1.4)]
  ], { wt: "la pregunta" });
  // 11 CIERRE
  sc(S(33), S(34), "cg", [[S(33), "slump"], [S(33) + 2.2, "point"]], [
    [c("no ver el futuro", "grey", S(33) + 0.7, { x: "strike" }), c("tenerle miedo", "red", S(33) + 1.4)]
  ], { wt: "por qué perdió" });
  sc(S(34), S(35), "cg", [[S(34), "calm"], [S(34) + 1.8, "look"]], [
    [c("contenido educativo", "grey", S(34) + 0.6)],
    [c("no es asesoría financiera", "orange", S(34) + 1.4)]
  ], { wt: "aviso" });
  sc(S(35), END, "cg", [[S(35), "cheer"], [S(35) + 2.4, "give"]], [
    [c("¿fotos en papel?", "orange", S(35) + 0.7)],
    [c("cuéntame en comentarios", "green", S(35) + 4.4)]
  ], { wt: "tu turno" });

  root.SCENES = SC;
})(window);

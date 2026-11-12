/* Tanda vs banco (México) (Fábrica 2.0): the whole film as data. Times are REAL seconds of the narration (assets/audio/timeline.json).
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
  sc(0, S(1), "cg", [[S(0), "give"], [S(0) + 2.4, "cheer"]], []);
  sc(S(1), S(2), "cg", [[S(1), "calm"], [S(1) + 2.2, "worry"]], []);
  sc(S(2), S(3), "cg", [[S(2), "think"], [S(2) + 2.2, "shrug"]], []);
  // 2 DE QUÉ VA ESTO
  sc(S(3), S(4), "cg", [[S(3), "look"], [S(3) + 2.4, "point"]], [
    [w("jar", S(3) + 0.8, { sc: 0.4 }), c("quién gana y quién pierde", "orange", S(3) + 1.4)]
  ], { wt: "el tema de hoy" });
  sc(S(4), S(5), "cg", [[S(4), "point"], [S(4) + 2.2, "give"]], [
    [c("tanda", "orange", S(4) + 0.7), c("vs", "grey", S(4) + 1.2), c("cuenta", "green", S(4) + 1.7)]
  ], { wt: "la comparación" });
  // 3 SUSCRÍBETE (recordatorio obligatorio)
  sc(S(5), S(6), "cg", [[S(5), "point"], [S(5) + 2.0, "cheer"]], [
    [big("SUSCRÍBETE", "red", S(5) + 3.8, { x: "stamp" })]
  ], { wt: "antes de seguir" });
  sc(S(6), S(7), "cg", [[S(6), "sitRelaxed"], [S(6) + 1.8, "give"]], [
    [c("activa la campanita", "orange", S(6) + 0.6)]
  ], { wt: "cada semana" });
  sc(S(7), S(8), "cg", [[S(7), "calm"], [S(7) + 1.2, "point"]], []);
  // 4 CÓMO FUNCIONA UNA TANDA
  sc(S(8), S(9), "cg", [[S(8), "give"], [S(8) + 2.0, "point"]], [
    [w("dots", S(8) + 0.7, { sc: 0.4 }), c("10 amigos × $1,000", "orange", S(8) + 1.3)]
  ], { wt: "imagina" });
  sc(S(9), S(10), "cg", [[S(9), "cheer"], [S(9) + 2.2, "give"]], [
    [w("bag", S(9) + 0.7, { sc: 0.4 }), big("$10,000", "green", S(9) + 1.3)]
  ], { wt: "cada semana, uno" });
  sc(S(10), S(11), "cg", [[S(10), "point"], [S(10) + 2.4, "calm"]], [
    [c("pusieron $10,000", "grey", S(10) + 0.8)],
    [c("recibieron $10,000", "grey", S(10) + 3.6)]
  ], { wt: "al final" });
  sc(S(11), S(12), "cg", [[S(11), "shrug"], [S(11) + 2.2, "think"]], [
    [c("0 intereses", "grey", S(11) + 0.7)],
    [c("solo cambia cuándo te toca", "orange", S(11) + 3.0)]
  ], { wt: "o sea" });
  // 5 EL PRIMERO Y EL ÚLTIMO
  sc(S(12), S(13), "cg", [[S(12), "think"], [S(12) + 2.0, "point"]], [
    [c("primer número", "green", S(12) + 0.7), c("último número", "red", S(12) + 1.4)]
  ], { wt: "no es lo mismo" });
  sc(S(13), S(14), "cg", [[S(13), "cheer"], [S(13) + 2.4, "give"]], [
    [c("recibe todo de golpe", "green", S(13) + 0.8)],
    [c("paga poco a poco", "grey", S(13) + 3.6)]
  ], { wt: "el primero" });
  sc(S(14), S(15), "cg", [[S(14), "give"], [S(14) + 2.2, "cheer"]], [
    [big("préstamo sin intereses", "green", S(14) + 0.8)]
  ], { wt: "es como" });
  sc(S(15), S(16), "cg", [[S(15), "slump"], [S(15) + 2.4, "shrug"]], [
    [c("prestó todo el tiempo", "orange", S(15) + 0.8)],
    [c("sin ganar nada", "red", S(15) + 4.0)]
  ], { wt: "el último" });
  sc(S(16), S(17), "cg", [[S(16), "worry"], [S(16) + 2.4, "slump"]], [
    [p("cart", S(16) + 0.8, { s: 0.4 }), c("inflación: alcanza para menos", "red", S(16) + 1.4)]
  ], { wt: "y además" });
  // 6 EL GRAN RIESGO
  sc(S(17), S(18), "cg", [[S(17), "worry"], [S(17) + 2.4, "point"]], [
    [big("que alguien deje de pagar", "red", S(17) + 2.8)]
  ], { wt: "el gran riesgo" });
  sc(S(18), S(19), "cg", [[S(18), "slump"], [S(18) + 2.2, "worry"]], [
    [p("door", S(18) + 0.7, { s: 0.4 }), c("el primero desaparece", "red", S(18) + 1.3)]
  ], { wt: "si pasa" });
  sc(S(19), S(20), "cg", [[S(19), "shrug"], [S(19) + 2.2, "slump"]], [
    [w("doc", S(19) + 0.7, { sc: 0.4 }), c("sin contrato", "red", S(19) + 1.3)]
  ], { wt: "recuperarlo" });
  sc(S(20), S(21), "cg", [[S(20), "worry"], [S(20) + 2.4, "shrug"]], [
    [c("el organizador se va", "red", S(20) + 0.8)],
    [c("nadie te protege", "red", S(20) + 4.0)]
  ], { wt: "además" });
  // 7 LO BUENO DE LA TANDA
  sc(S(21), S(22), "cg", [[S(21), "point"], [S(21) + 2.4, "cheer"]], [
    [big("disciplina", "green", S(21) + 3.0)]
  ], { wt: "lo bueno" });
  sc(S(22), S(23), "cg", [[S(22), "give"], [S(22) + 2.2, "calm"]], [
    [c("te esperan", "green", S(22) + 0.7), c("difícil saltarte una semana", "green", S(22) + 1.4)]
  ], { wt: "el compromiso" });
  sc(S(23), S(24), "cg", [[S(23), "cheer"], [S(23) + 2.4, "point"]], [
    [c("sin cuenta de banco", "grey", S(23) + 0.8)],
    [c("juntar una cantidad grande", "green", S(23) + 4.0)]
  ], { wt: "para muchos" });
  // 8 EL BANCO
  sc(S(24), S(25), "cg", [[S(24), "look"], [S(24) + 2.0, "point"]], [
    [p("building", S(24) + 0.7, { s: 0.4 }), c("guardar en una cuenta", "green", S(24) + 1.3)]
  ], { wt: "la otra opción" });
  sc(S(25), S(26), "cg", [[S(25), "give"], [S(25) + 2.4, "cheer"]], [
    [c("intereses, aunque pocos", "green", S(25) + 0.8)],
    [c("lo sacas cuando quieras", "green", S(25) + 4.0)]
  ], { wt: "en la cuenta" });
  sc(S(26), S(27), "cg", [[S(26), "point"], [S(26) + 2.6, "calm"]], [
    [p("shield", S(26) + 1.0, { s: 0.4 }), c("protegido por un seguro", "green", S(26) + 1.6)],
    [c("hasta varios millones", "grey", S(26) + 5.0)]
  ], { wt: "en México" });
  sc(S(27), S(28), "cg", [[S(27), "cheer"], [S(27) + 2.4, "point"]], [
    [c("si quiebra, no pierdes", "green", S(27) + 0.8)],
    [c("la tanda no te lo asegura", "red", S(27) + 4.0)]
  ], { wt: "o sea" });
  sc(S(28), S(29), "cg", [[S(28), "phone"], [S(28) + 2.4, "shrug"]], [
    [c("más fácil gastarlo", "red", S(28) + 0.8)]
  ], { wt: "pero" });
  // 9 ENTONCES, ¿CUÁL CONVIENE?
  sc(S(29), S(30), "cg", [[S(29), "think"], [S(29) + 2.4, "give"]], [
    [c("te cuesta la disciplina", "orange", S(29) + 0.8)],
    [c("tanda con gente de confianza", "green", S(29) + 4.0)]
  ], { wt: "si" });
  sc(S(30), S(31), "cg", [[S(30), "point"], [S(30) + 2.4, "cheer"]], [
    [c("quieres seguridad", "orange", S(30) + 0.8)],
    [c("cuenta protegida", "green", S(30) + 4.0)]
  ], { wt: "si" });
  sc(S(31), S(32), "cg", [[S(31), "give"], [S(31) + 2.4, "point"]], [
    [p("calendar", S(31) + 0.8, { s: 0.4 }), c("depósito automático semanal", "green", S(31) + 1.4)]
  ], { wt: "lo mejor de los dos" });
  sc(S(32), S(33), "cg", [[S(32), "cheer"], [S(32) + 2.2, "calm"]], [
    [c("disciplina", "green", S(32) + 0.7), c("sin riesgo", "green", S(32) + 1.4)]
  ], { wt: "así tienes" });
  // 10 LA LECCIÓN
  sc(S(33), S(34), "cg", [[S(33), "point"], [S(33) + 2.6, "think"]], [
    [c("dónde lo guardas", "grey", S(33) + 1.0)],
    [c("cómo te obligas a guardarlo", "orange", S(33) + 4.4)]
  ], { wt: "la lección" });
  sc(S(34), S(35), "cg", [[S(34), "give"], [S(34) + 2.2, "cheer"]], [
    [c("que te ayude a ahorrar", "green", S(34) + 0.7), c("sin riesgo", "green", S(34) + 1.4)]
  ], { wt: "elige" });
  // 11 CIERRE
  sc(S(35), S(36), "cg", [[S(35), "shrug"], [S(35) + 2.4, "point"]], [
    [c("mientras todos cumplan", "orange", S(35) + 0.8)]
  ], { wt: "una tanda funciona" });
  sc(S(36), S(37), "cg", [[S(36), "calm"], [S(36) + 2.2, "look"]], [
    [c("contenido educativo", "grey", S(36) + 0.7)],
    [c("no es asesoría financiera", "orange", S(36) + 3.8)]
  ], { wt: "aviso" });
  sc(S(37), END, "cg", [[S(37), "cheer"], [S(37) + 2.4, "give"]], [
    [c("¿te quedaron mal en una tanda?", "orange", S(37) + 0.7)],
    [c("cuéntame en comentarios", "green", S(37) + 4.4)]
  ], { wt: "tu turno" });

  root.SCENES = SC;
})(window);

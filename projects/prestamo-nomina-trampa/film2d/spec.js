/* El engaño del préstamo de nómina (México) (FABRICA_3): the whole film as data. Times are REAL seconds of the narration (assets/audio/timeline.json).
 * FABRICA_3: alternates classic scenes (Stickman + window) with Graph, Breakdown, Maze and Stick-Action (punch text); never > 2 classic scenes in a row.
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

  // 1 GANCHO
  sc(0, S(1), "c", [[S(0), "phone"], [S(0) + 2.2, "cheer"]], [], { punch: { text: "PREAPROBADO", k: "green", t: S(0) + 2.4 } });
  sc(S(1), S(3), "g", [], [], { mode: "maze", kind: "maze", k: "red", title: "la deuda que no se acaba", t0: S(1) + 0.2,
    beats: [[S(1) + 1.0, "parece un premio", "green"], [S(1) + 3.2, "deuda sin final", "red"], [S(2) + 1.6, "tu sueldo es la garantía", "orange"]] });
  // 2 DE QUÉ VA ESTO
  sc(S(3), S(5), "cg", [[S(3), "look"], [S(3) + 2.2, "point"], [S(4), "think"]], [
    [p("card", S(3) + 0.7, { s: 0.4 }), c("3 trampas de tu nómina", "orange", S(3) + 1.3)],
    [c("¿te ayuda o te hunde?", "green", S(4) + 1.0)]
  ], { wt: "el tema de hoy" });
  // 3 SUSCRÍBETE (recordatorio obligatorio)
  sc(S(5), S(7), "cg", [[S(5), "point"], [S(5) + 2.0, "cheer"], [S(6), "give"]], [
    [big("SUSCRÍBETE", "red", S(5) + 3.4, { x: "stamp" })],
    [c("activa la campanita", "orange", S(6) + 1.0)]
  ], { wt: "antes de seguir" });
  sc(S(7), S(8), "c", [[S(7), "phone"], [S(7) + 1.2, "point"]], [], { punch: { text: "TU NÓMINA", k: "orange", t: S(7) + 0.8 } });
  // 4 POR QUÉ AL BANCO LE ENCANTA
  sc(S(8), S(9), "cg", [[S(8), "think"], [S(8) + 2.2, "shrug"]], [
    [p("building", S(8) + 0.7, { s: 0.4 }), c("casi sin riesgo", "orange", S(8) + 1.3)]
  ], { wt: "para el banco" });
  sc(S(9), S(12), "g", [], [], { mode: "maze", kind: "nodes", k: "orange", title: "tu sueldo pasa primero por el banco", t0: S(9) + 0.2, hub: "el banco",
    nodes: ["quincena 1", "quincena 2", "quincena 3", "quincena 4", "quincena 5", "quincena 6"],
    beats: [[S(9) + 1.4, "se descuenta solito", "orange"], [S(10) + 1.2, "un solo clic", "orange"], [S(11) + 1.6, "no sientes lo que cuesta", "red"]] });
  // 5 TRAMPA UNO: EL DESCUENTO INVISIBLE
  sc(S(12), S(16), "g", [], [], { mode: "graph", k: "red", title: "lo que te descuentan", cl: "por un préstamo de $30,000", f: { pre: "$" },
    pts: [[S(12) + 1.6, 0, "hoy"], [S(13) + 0.8, 15300, "año 1"], [S(13) + 3.0, 30600, "año 2"], [S(14) + 1.2, 45900, "año 3"]],
    cameo: { pos: "right", poses: [[S(12), "calm"], [S(14) + 1.2, "shock"], [S(15) + 0.4, "slump"]] } });
  // 6 TRAMPA DOS: LA AMPLIACIÓN
  sc(S(16), S(21), "g", [], [], { mode: "breakdown", title: "la ampliación", center: ["te prestan", "$40,000"], ck: "orange", t0: S(16) + 0.6,
    parts: [["liquidan tu deuda", "-$22,800", "red", S(18) + 0.8], ["en tu mano", "$17,200", "orange", S(19) + 1.0], ["vuelves a deber", "$40,000", "red", S(19) + 3.0]],
    total: ["el plazo", "otra vez 3 años", "red", S(20) + 0.8] });
  // 7 TRAMPA TRES: EL ADELANTO DE NÓMINA
  sc(S(21), S(22), "c", [[S(21), "shrug"], [S(21) + 1.6, "think"]], [], { punch: { text: "TU PROPIO SUELDO", k: "orange", t: S(21) + 1.4 } });
  sc(S(22), S(23), "cg", [[S(22), "give"], [S(22) + 2.4, "worry"]], [
    [c("adelantas $2,000", "grey", S(22) + 0.8)],
    [c("comisión ≈ $100", "red", S(22) + 3.6)]
  ], { wt: "el adelanto" });
  sc(S(23), S(24), "cg", [[S(23), "shrug"], [S(23) + 2.2, "point"]], [
    [big("5 % en una semana", "red", S(23) + 1.4)]
  ], { wt: "parece poquito" });
  sc(S(24), S(25), "c", [[S(24), "worry"], [S(24) + 1.8, "facepalm"]], [], { punch: { text: "CADA QUINCENA", k: "red", t: S(24) + 2.0 } });
  // 8 CUÁNDO SÍ Y CUÁNDO NO
  sc(S(25), S(26), "cg", [[S(25), "calm"], [S(25) + 2.4, "give"]], [
    [c("no siempre es malo", "green", S(25) + 0.8)],
    [p("card", S(25) + 3.6, { s: 0.4 }), c("tasa menor que tarjeta", "green", S(25) + 4.2)]
  ], { wt: "cuándo sí" });
  sc(S(26), S(27), "cg", [[S(26), "point"], [S(26) + 2.4, "stop"]], [
    [c("pagar una deuda más cara", "green", S(26) + 0.8)],
    [c("sin volver a usar la tarjeta", "orange", S(26) + 3.4)]
  ], { wt: "puede servir" });
  sc(S(27), S(28), "c", [[S(27), "worry"], [S(27) + 1.8, "slump"]], [], { punch: { text: "NO ALCANZA", k: "red", t: S(27) + 2.2 } });
  // 9 CÓMO PROTEGERTE
  sc(S(28), S(31), "g", [], [], { mode: "breakdown", title: "protégete", center: ["antes del clic", ""], ck: "green", t0: S(28) + 0.3,
    parts: [["pide el CAT y el total", "", "green", S(28) + 2.0], ["calcula la ampliación", "", "green", S(29) + 1.4], ["arma un fondo pequeño", "", "green", S(30) + 1.6]] });
  // 10 LA LECCIÓN
  sc(S(31), S(33), "c", [[S(31), "point"], [S(31) + 2.0, "shrug"], [S(32) + 0.6, "worry"]], [], { exit: "left", punch: { text: "LO INVISIBLE CRECE", k: "red", t: S(31) + 2.0 } });
  // 11 CIERRE
  sc(S(33), S(35), "cg", [[S(33), "phone"], [S(33) + 2.4, "calm"], [S(34), "look"]], [
    [c("haz la cuenta antes del clic", "orange", S(33) + 0.8)],
    [c("contenido educativo", "grey", S(34) + 0.7), c("no es asesoría", "orange", S(34) + 1.4)]
  ], { wt: "la próxima vez" });
  sc(S(35), END, "cg", [[S(35), "cheer"], [S(35) + 2.4, "give"]], [
    [c("¿te ofrecieron una ampliación?", "orange", S(35) + 0.7)],
    [c("cuéntame en comentarios", "green", S(35) + 4.4)]
  ], { wt: "tu turno" });

  root.SCENES = SC;
})(window);

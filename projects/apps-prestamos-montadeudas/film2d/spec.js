/* El engaño de las apps de préstamos (México) (FABRICA_3): the whole film as data. Times are REAL seconds of the narration (assets/audio/timeline.json).
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
  sc(0, S(1), "c", [[S(0), "phone"], [S(0) + 2.4, "shock"]], [], { punch: { text: "$2,100", k: "red", t: S(0) + 2.6 } });
  sc(S(1), S(3), "g", [], [], { mode: "maze", kind: "nodes", k: "red", title: "la app ya tiene a tu gente", t0: S(1) + 0.2, hub: "la app",
    nodes: ["mamá", "tu jefe", "amigos", "pareja", "primos", "vecinos"],
    beats: [[S(1) + 0.9, "te exigen casi $4,000", "red"], [S(1) + 3.0, "le llaman a tu mamá", "red"], [S(2) + 1.2, "miles en México", "orange"]] });
  // 2 DE QUÉ VA ESTO
  sc(S(3), S(5), "cg", [[S(3), "look"], [S(3) + 2.2, "point"], [S(4), "think"]], [
    [p("phone", S(3) + 0.7, { s: 0.4 }), c("apps de préstamos fáciles", "orange", S(3) + 1.3)],
    [c("¿seria o trampa?", "green", S(4) + 1.0)]
  ], { wt: "el tema de hoy" });
  // 3 SUSCRÍBETE (recordatorio obligatorio)
  sc(S(5), S(7), "cg", [[S(5), "point"], [S(5) + 2.0, "cheer"], [S(6), "give"]], [
    [big("SUSCRÍBETE", "red", S(5) + 3.4, { x: "stamp" })],
    [c("activa la campanita", "orange", S(6) + 1.0)]
  ], { wt: "antes de seguir" });
  sc(S(7), S(8), "c", [[S(7), "phone"], [S(7) + 1.2, "point"]], [], { punch: { text: "DINERO FÁCIL", k: "orange", t: S(7) + 0.8 } });
  // 4 EL ANZUELO
  sc(S(8), S(9), "cg", [[S(8), "cheer"], [S(8) + 2.2, "phone"]], [
    [c("en minutos", "green", S(8) + 0.7), c("sin revisar nada", "green", S(8) + 1.4)],
    [c("sin papeles", "green", S(8) + 2.1)]
  ], { wt: "la promesa" });
  sc(S(9), S(10), "cg", [[S(9), "give"], [S(9) + 2.4, "worry"]], [
    [c("tu identificación", "grey", S(9) + 0.8), c("una foto tuya", "grey", S(9) + 1.5)],
    [c("tus contactos", "red", S(9) + 3.6)]
  ], { wt: "lo que te pide" });
  sc(S(10), S(12), "c", [[S(10), "look"], [S(10) + 1.6, "shock"], [S(11) + 0.6, "facepalm"]], [], { enter: "left", punch: { text: "TUS CONTACTOS", k: "red", t: S(10) + 1.6 } });
  // 5 LA LETRA CHIQUITA
  sc(S(12), S(17), "g", [], [], { mode: "breakdown", title: "la letra chiquita", center: ["pides", "$3,000"], ck: "orange", t0: S(12) + 0.4,
    parts: [["comisión", "-$900", "red", S(13) + 1.2], ["te depositan", "$2,100", "orange", S(13) + 3.0], ["debes completo", "$3,000", "red", S(14) + 0.8], ["plazo", "7 días", "red", S(15) + 1.0]],
    total: ["en una semana", "≈ $3,600", "red", S(16) + 1.0] });
  // 6 LA CUENTA REAL
  sc(S(17), S(21), "g", [], [], { mode: "graph", k: "red", title: "lo que debes en una semana", cl: "recibiste solo $2,100", f: { pre: "$" },
    pts: [[S(18) + 0.4, 2100, "recibes"], [S(18) + 3.0, 3600, "día 7"], [S(20) + 1.2, 6100, "si se repite"]],
    cameo: { pos: "right", poses: [[S(17), "think"], [S(19) + 0.4, "shock"], [S(20) + 1.2, "slump"]] } });
  // 7 LA EXTORSIÓN
  sc(S(21), S(22), "cg", [[S(21), "worry"], [S(21) + 2.2, "slump"]], [
    [p("calendar", S(21) + 0.7, { s: 0.4 }), c("1 día de atraso", "red", S(21) + 1.3)]
  ], { wt: "si te atrasas" });
  sc(S(22), S(23), "cg", [[S(22), "phone"], [S(22) + 2.2, "sitStress"]], [
    [p("phone", S(22) + 0.7, { s: 0.4 }), c("a todas horas", "red", S(22) + 1.3)],
    [c("amenazas", "red", S(22) + 3.2)]
  ], { wt: "las llamadas" });
  sc(S(23), S(25), "g", [], [], { mode: "maze", kind: "rings", k: "red", title: "la extorsión", t0: S(23) + 0.2,
    beats: [[S(23) + 1.2, "mensajes a tus contactos", "red"], [S(23) + 3.4, "te llaman ladrón", "red"], [S(24) + 1.0, "montajes con tu foto", "red"]] });
  sc(S(25), S(26), "c", [[S(25), "stop"], [S(25) + 2.0, "facepalm"]], [], { punch: { text: "MONTADEUDAS", k: "red", t: S(25) + 2.4 } });
  // 8 EL CÍRCULO SIN SALIDA
  sc(S(26), S(30), "g", [], [], { mode: "maze", kind: "maze", k: "red", title: "el círculo sin salida", t0: S(26) + 0.2,
    beats: [[S(26) + 1.4, "app 2 para pagar la 1", "red"], [S(27) + 0.8, "app 3 para pagar la 2", "red"], [S(28) + 1.4, "bola de nieve", "red"], [S(29) + 1.0, "nunca terminas", "red"]] });
  // 9 CÓMO PROTEGERTE
  sc(S(30), S(31), "cg", [[S(30), "point"], [S(30) + 2.4, "give"]], [
    [c("1", "orange", S(30) + 0.8), c("registrada en la CONDUSEF", "green", S(30) + 1.4)]
  ], { wt: "protégete" });
  sc(S(31), S(32), "cg", [[S(31), "stop"], [S(31) + 2.2, "point"]], [
    [c("2", "orange", S(31) + 0.7), c("contactos", "grey", S(31) + 1.3, { x: "strike" }), c("fotos", "grey", S(31) + 1.9, { x: "strike" })]
  ], { wt: "protégete" });
  sc(S(32), S(33), "c", [[S(32), "think"], [S(32) + 1.8, "stop"]], [], { punch: { text: "ES TRAMPA", k: "red", t: S(32) + 2.2 } });
  sc(S(33), S(34), "cg", [[S(33), "give"], [S(33) + 2.4, "point"]], [
    [c("4", "orange", S(33) + 0.8), c("guarda las pruebas", "green", S(33) + 1.4)],
    [c("denuncia la extorsión", "green", S(33) + 3.8)]
  ], { wt: "protégete" });
  // 10 LA LECCIÓN
  sc(S(34), S(36), "c", [[S(34), "point"], [S(34) + 2.0, "shrug"], [S(35) + 0.6, "think"]], [], { exit: "left", punch: { text: "SALE CARÍSIMO", k: "orange", t: S(34) + 1.8 } });
  // 11 CIERRE
  sc(S(36), S(38), "cg", [[S(36), "phone"], [S(36) + 2.4, "calm"], [S(37), "look"]], [
    [c("el anzuelo se ve bonito", "orange", S(36) + 0.8)],
    [c("contenido educativo", "grey", S(37) + 0.7), c("no es asesoría", "orange", S(37) + 1.4)]
  ], { wt: "antes de descargar" });
  sc(S(38), END, "cg", [[S(38), "cheer"], [S(38) + 2.4, "give"]], [
    [c("¿te pasó a ti?", "orange", S(38) + 0.7)],
    [c("cuéntame en comentarios", "green", S(38) + 4.4)]
  ], { wt: "tu turno" });

  root.SCENES = SC;
})(window);

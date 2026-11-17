/* El engaño de la llamada del banco (México) (FABRICA_3): the whole film as data. Times are REAL seconds of the narration (assets/audio/timeline.json).
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
  sc(0, S(1), "c", [[S(0), "phone"], [S(0) + 2.2, "look"]], [], { punch: { text: "TU BANCO", k: "orange", t: S(0) + 2.0 } });
  sc(S(1), S(3), "g", [], [], { mode: "graph", k: "red", title: "tu cuenta durante la llamada", cl: "en menos de 5 minutos", f: { pre: "$" },
    pts: [[S(1) + 0.6, 48000, "minuto 0"], [S(1) + 3.6, 33000, "minuto 2"], [S(2) + 1.2, 12000, "minuto 4"], [S(2) + 2.8, 0, "minuto 5"]] });
  // 2 DE QUÉ VA ESTO
  sc(S(3), S(5), "cg", [[S(3), "look"], [S(3) + 2.2, "point"], [S(4), "stop"]], [
    [p("phone", S(3) + 0.7, { s: 0.4 }), c("la llamada del banco", "orange", S(3) + 1.3)],
    [c("una regla que te protege", "green", S(4) + 1.0)]
  ], { wt: "el tema de hoy" });
  // 3 SUSCRÍBETE (recordatorio obligatorio)
  sc(S(5), S(7), "cg", [[S(5), "point"], [S(5) + 2.0, "cheer"], [S(6), "give"]], [
    [big("SUSCRÍBETE", "red", S(5) + 3.4, { x: "stamp" })],
    [c("comparte con tu familia", "orange", S(6) + 1.0)]
  ], { wt: "antes de seguir" });
  sc(S(7), S(8), "c", [[S(7), "phone"], [S(7) + 1.4, "stop"]], [], { punch: { text: "CON CUIDADO", k: "orange", t: S(7) + 1.0 } });
  // 4 EL GUION DEL ESTAFADOR
  sc(S(8), S(12), "g", [], [], { mode: "breakdown", title: "el guion del estafador", center: ["la llamada", "«de tu banco»"], ck: "red", t0: S(8) + 0.3,
    parts: [["te asustan", "cargo falso", "red", S(8) + 1.6], ["te tranquilizan", "", "orange", S(9) + 1.0], ["«confirma tus datos»", "", "red", S(10) + 1.6], ["código, NIP, tarjeta", "", "red", S(11) + 1.6]] });
  // 5 POR QUÉ FUNCIONA
  sc(S(12), S(13), "cg", [[S(12), "worry"], [S(12) + 2.2, "sitStress"]], [
    [c("miedo", "red", S(12) + 1.2), sy("plus", S(12) + 1.8, "grey"), c("prisa", "red", S(12) + 2.4)]
  ], { wt: "la fórmula" });
  sc(S(13), S(14), "c", [[S(13), "worry"], [S(13) + 1.6, "facepalm"]], [], { punch: { text: "NADIE PIENSA", k: "red", t: S(13) + 1.6 } });
  sc(S(14), S(16), "g", [], [], { mode: "maze", kind: "nodes", k: "red", title: "por eso suena real", t0: S(14) + 0.2, hub: "estafador",
    nodes: ["tu nombre", "tu tarjeta", "tu banco", "tu número", "tu correo", "tu ciudad"],
    beats: [[S(14) + 1.2, "sabe tu nombre", "red"], [S(14) + 3.4, "tus últimos números", "red"], [S(15) + 1.4, "número del banco falso", "red"]] });
  // 6 EL CÓDIGO ES LA LLAVE
  sc(S(16), S(20), "g", [], [], { mode: "maze", kind: "rings", k: "red", title: "el código es la llave", t0: S(16) + 0.2,
    beats: [[S(16) + 1.2, "el código del mensaje", "orange"], [S(17) + 1.0, "autoriza, no cancela", "red"], [S(18) + 1.4, "tú abres la puerta", "red"], [S(19) + 1.0, "tu dinero se va", "red"]] });
  // 7 OTRAS VERSIONES
  sc(S(20), S(21), "c", [[S(20), "think"], [S(20) + 1.2, "point"]], [], { punch: { text: "MÁS TRAMPAS", k: "orange", t: S(20) + 1.0 } });
  sc(S(21), S(22), "cg", [[S(21), "give"], [S(21) + 2.4, "stop"]], [
    [w("jar", S(21) + 0.8, { sc: 0.35 }), c("«cuenta segura»", "red", S(21) + 1.4)],
    [c("no existe", "red", S(21) + 4.0)]
  ], { wt: "versión 1" });
  sc(S(22), S(23), "cg", [[S(22), "phone"], [S(22) + 2.4, "worry"]], [
    [p("phone", S(22) + 0.8, { s: 0.4 }), c("instala esta app", "orange", S(22) + 1.4)],
    [c("controlan tu celular", "red", S(22) + 4.0)]
  ], { wt: "versión 2" });
  sc(S(23), S(24), "c", [[S(23), "phone"], [S(23) + 1.8, "stop"]], [], { punch: { text: "NO DES CLIC", k: "red", t: S(23) + 2.0 } });
  // 8 LA REGLA DE ORO
  sc(S(24), S(25), "cg", [[S(24), "point"], [S(24) + 2.6, "stop"]], [
    [c("tu banco nunca pide", "green", S(24) + 1.0)],
    [c("NIP", "red", S(24) + 3.4, { x: "strike" }), c("contraseñas", "red", S(24) + 4.0, { x: "strike" }), c("códigos", "red", S(24) + 4.6, { x: "strike" })]
  ], { wt: "la regla de oro" });
  sc(S(25), S(26), "cg", [[S(25), "shrug"], [S(25) + 2.4, "point"]], [
    [big("ES ESTAFA", "red", S(25) + 1.2, { x: "stamp" })],
    [c("aunque suene real", "orange", S(25) + 3.6)]
  ], { wt: "si te los piden" });
  sc(S(26), S(27), "c", [[S(26), "stop"], [S(26) + 1.4, "phone"]], [], { punch: { text: "¡CUELGA!", k: "red", t: S(26) + 0.6 } });
  // 9 SI YA CAÍSTE
  sc(S(27), S(30), "g", [], [], { mode: "breakdown", title: "si ya caíste", center: ["actúa rápido", ""], ck: "green", t0: S(27) + 0.3,
    parts: [["llama a tu banco", "bloquea", "green", S(27) + 1.6], ["cambia contraseñas", "", "green", S(28) + 0.8], ["pide un folio", "por escrito", "green", S(28) + 2.8], ["acude a la CONDUSEF", "", "green", S(29) + 1.2]] });
  // 10 LA LECCIÓN
  sc(S(30), S(32), "c", [[S(30), "point"], [S(30) + 2.4, "shrug"], [S(31) + 0.6, "stop"]], [], { exit: "left", punch: { text: "TE CONVENCEN", k: "red", t: S(30) + 2.6 } });
  // 11 CIERRE
  sc(S(32), S(34), "cg", [[S(32), "give"], [S(32) + 2.4, "cheer"], [S(33), "calm"]], [
    [c("compártelo con tus papás", "green", S(32) + 0.8)],
    [c("contenido educativo", "grey", S(33) + 0.7), c("no es asesoría", "orange", S(33) + 1.4)]
  ], { wt: "protege a tu familia" });
  sc(S(34), END, "cg", [[S(34), "cheer"], [S(34) + 2.4, "give"]], [
    [c("¿te han llamado así?", "orange", S(34) + 0.7)],
    [c("cuéntame en comentarios", "green", S(34) + 4.4)]
  ], { wt: "tu turno" });

  root.SCENES = SC;
})(window);

/* Seguro de gastos médicos en México (Fábrica 2.0): the whole film as data. Times are REAL seconds of the narration (assets/audio/timeline.json).
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
  sc(0, S(1), "cg", [[S(0), "sitStress"], [S(0) + 2.6, "worry"]], []);
  sc(S(1), S(2), "cg", [[S(1), "phone"], [S(1) + 2.4, "slump"]], []);
  sc(S(2), S(3), "cg", [[S(2), "shrug"], [S(2) + 2.2, "point"]], []);
  // 2 DE QUÉ VA ESTO
  sc(S(3), S(4), "cg", [[S(3), "look"], [S(3) + 2.2, "point"]], [
    [w("doc", S(3) + 0.7, { sc: 0.4 }), c("idioma raro", "red", S(3) + 1.3)],
    [sy("arrow", S(3) + 3.4, "grey"), c("palabras normales", "green", S(3) + 3.9)]
  ], { wt: "el tema de hoy" });
  sc(S(4), S(5), "cg", [[S(4), "give"], [S(4) + 2.2, "think"]], [
    [c("prima", "orange", S(4) + 0.7), c("deducible", "orange", S(4) + 1.3), c("coaseguro", "orange", S(4) + 1.9)],
    [c("ejemplo en pesos", "green", S(4) + 3.8)]
  ], { wt: "3 palabras" });
  // 3 SUSCRÍBETE (recordatorio obligatorio)
  sc(S(5), S(6), "cg", [[S(5), "point"], [S(5) + 2.4, "cheer"]], [
    [big("SUSCRÍBETE", "red", S(5) + 4.4, { x: "stamp" })]
  ], { wt: "antes de seguir" });
  sc(S(6), S(7), "cg", [[S(6), "sitRelaxed"], [S(6) + 2.2, "give"]], [
    [p("cup", S(6) + 0.7, { s: 0.4 }), c("como en un café", "green", S(6) + 1.3)],
    [c("activa la campanita", "orange", S(6) + 4.0)]
  ], { wt: "cada semana" });
  sc(S(7), S(8), "cg", [[S(7), "calm"], [S(7) + 1.0, "look"]], []);
  // 4 QUÉ ES UN SEGURO
  sc(S(8), S(9), "cg", [[S(8), "point"], [S(8) + 2.2, "look"]], [
    [w("dots", S(8) + 0.7, { sc: 0.4 }), c("1,000 personas", "grey", S(8) + 1.3)],
    [w("bag", S(8) + 3.6, { sc: 0.4 }), c("una sola bolsa", "green", S(8) + 4.1)]
  ], { wt: "imagina" });
  sc(S(9), S(10), "cg", [[S(9), "calm"], [S(9) + 1.6, "worry"]], [
    [c("casi nadie se enferma", "green", S(9) + 0.7)],
    [c("alguien sí", "red", S(9) + 3.2)]
  ], { wt: "este año" });
  sc(S(10), S(11), "cg", [[S(10), "sitStress"], [S(10) + 2.2, "cheer"]], [
    [p("building", S(10) + 0.7, { s: 0.4 }), c("cuenta del hospital", "red", S(10) + 1.3)],
    [c("la paga la bolsa", "green", S(10) + 3.6)]
  ], { wt: "cuando pasa" });
  sc(S(11), S(12), "cg", [[S(11), "give"], [S(11) + 2.4, "point"]], [
    [c("muchos pagan poquito", "green", S(11) + 0.7)],
    [c("nadie paga una fortuna", "green", S(11) + 4.4)]
  ], { wt: "eso es un seguro" });
  // 5 LA PRIMA
  sc(S(12), S(13), "cg", [[S(12), "phone"], [S(12) + 2.2, "look"]], [
    [big("PRIMA", "orange", S(12) + 0.7)],
    [p("tv", S(12) + 3.6, { s: 0.4 }), c("como tu plataforma", "grey", S(12) + 4.2)]
  ], { wt: "palabra 1" });
  sc(S(13), S(14), "cg", [[S(13), "think"], [S(13) + 2.2, "give"]], [
    [p("calendar", S(13) + 0.7, { s: 0.4 }), c("una vez al año", "grey", S(13) + 1.3)],
    [c("o en mensualidades", "green", S(13) + 4.4)]
  ], { wt: "cómo se paga" });
  sc(S(14), S(15), "cg", [[S(14), "worry"], [S(14) + 2.2, "slump"]], [
    [c("dejas de pagar", "red", S(14) + 0.7)],
    [c("sin seguro", "red", S(14) + 3.8, { x: "stamp" })]
  ], { wt: "ojo" });
  // 6 LA SUMA ASEGURADA
  sc(S(15), S(16), "cg", [[S(15), "point"], [S(15) + 2.2, "calm"]], [
    [p("shield", S(15) + 0.7, { s: 0.4 }), c("lo máximo que paga", "green", S(15) + 1.3)]
  ], { wt: "suma asegurada" });
  sc(S(16), S(17), "cg", [[S(16), "think"], [S(16) + 2.4, "shrug"]], [
    [c("tope: $5 millones", "green", S(16) + 0.7), c("cuenta: $6 millones", "red", S(16) + 1.6)],
    [big("$1 millón: tú", "red", S(16) + 4.4)]
  ], { wt: "ejemplo" });
  // 7 EL DEDUCIBLE
  sc(S(17), S(18), "cg", [[S(17), "cheer"], [S(17) + 1.8, "worry"]], [
    [c("tener seguro", "green", S(17) + 0.7), c("≠ no pagar nada", "red", S(17) + 3.0)]
  ], { wt: "sorpresa 1" });
  sc(S(18), S(19), "cg", [[S(18), "point"], [S(18) + 2.2, "look"]], [
    [big("DEDUCIBLE", "orange", S(18) + 0.7)],
    [c("la primera parte: tú", "red", S(18) + 3.6)]
  ], { wt: "palabra 2" });
  sc(S(19), S(20), "cg", [[S(19), "give"], [S(19) + 2.4, "slump"]], [
    [c("deducible", "grey", S(19) + 0.7), big("$20,000", "orange", S(19) + 1.3)],
    [c("de tu bolsillo", "red", S(19) + 4.6)]
  ], { wt: "ejemplo" });
  sc(S(20), S(21), "cg", [[S(20), "think"], [S(20) + 2.2, "point"]], [
    [c("deducible alto", "orange", S(20) + 0.7), sy("arrow", S(20) + 1.3, "grey"), c("prima barata", "green", S(20) + 1.9)],
    [c("deducible bajo", "green", S(20) + 4.0), sy("arrow", S(20) + 4.5, "grey"), c("prima cara", "orange", S(20) + 5.0)]
  ], { wt: "la balanza" });
  // 8 EL COASEGURO
  sc(S(21), S(22), "cg", [[S(21), "shrug"], [S(21) + 2.2, "worry"]], [
    [big("COASEGURO", "orange", S(21) + 3.4)]
  ], { wt: "sorpresa 2" });
  sc(S(22), S(23), "cg", [[S(22), "point"], [S(22) + 2.4, "look"]], [
    [c("lo que sigue de la cuenta", "grey", S(22) + 0.7)],
    [c("tú pagas", "red", S(22) + 4.4), big("10 %", "orange", S(22) + 5.0)]
  ], { wt: "palabra 3" });
  sc(S(23), S(24), "cg", [[S(23), "cheer"], [S(23) + 2.2, "calm"]], [
    [c("buena noticia", "green", S(23) + 0.7)],
    [c("tope de coaseguro", "green", S(23) + 3.6)]
  ], { wt: "uf" });
  sc(S(24), S(25), "cg", [[S(24), "give"], [S(24) + 2.2, "think"]], [
    [p("shield", S(24) + 0.7, { s: 0.4 }), c("lo máximo que pagas", "green", S(24) + 1.3)],
    [c("aunque la cuenta sea enorme", "grey", S(24) + 4.0)]
  ], { wt: "el tope" });
  // 9 LA CUENTA DE TRESCIENTOS MIL
  sc(S(25), S(26), "cg", [[S(25), "look"], [S(25) + 2.2, "point"]], [
    [p("building", S(25) + 0.7, { s: 0.4 }), big("$300,000", "red", S(25) + 1.3)]
  ], { wt: "la cuenta" });
  sc(S(26), S(27), "cg", [[S(26), "give"], [S(26) + 2.2, "think"]], [
    [c("1", "orange", S(26) + 0.7), c("deducible $20,000", "red", S(26) + 1.3)],
    [c("quedan $280,000", "grey", S(26) + 4.0)]
  ], { wt: "paso 1" });
  sc(S(27), S(28), "cg", [[S(27), "point"], [S(27) + 2.2, "worry"]], [
    [c("2", "orange", S(27) + 0.7), c("10 % de $280,000", "grey", S(27) + 1.3)],
    [c("coaseguro $28,000", "red", S(27) + 3.6)]
  ], { wt: "paso 2" });
  sc(S(28), S(29), "cg", [[S(28), "calm"], [S(28) + 2.4, "cheer"]], [
    [c("tú: $48,000", "red", S(28) + 0.7)],
    [c("seguro: $252,000", "green", S(28) + 4.4)]
  ], { wt: "resultado" });
  sc(S(29), S(30), "cg", [[S(29), "think"], [S(29) + 2.4, "give"]], [
    [c("cuenta de $1 millón", "red", S(29) + 0.7), c("tope $40,000", "green", S(29) + 1.4)],
    [big("máx. $60,000", "green", S(29) + 4.6)]
  ], { wt: "con tope" });
  // 10 LA LETRA CHICA
  sc(S(30), S(31), "cg", [[S(30), "look"], [S(30) + 2.2, "worry"]], [
    [w("doc", S(30) + 0.7, { sc: 0.4 }), big("3 trampas", "red", S(30) + 1.3)]
  ], { wt: "la letra chica" });
  sc(S(31), S(32), "cg", [[S(31), "point"], [S(31) + 2.4, "think"]], [
    [c("1", "orange", S(31) + 0.7), p("hourglass", S(31) + 1.3, { s: 0.4 }), c("tiempo de espera", "orange", S(31) + 1.9)],
    [c("cirugías", "grey", S(31) + 4.6), c("parto", "grey", S(31) + 5.2)]
  ], { wt: "trampa 1" });
  sc(S(32), S(33), "cg", [[S(32), "slump"], [S(32) + 2.4, "shrug"]], [
    [c("2", "orange", S(32) + 0.7), c("lo que ya tenías", "red", S(32) + 1.3)],
    [c("no se cubre", "red", S(32) + 4.8, { x: "stamp" })]
  ], { wt: "trampa 2" });
  sc(S(33), S(34), "cg", [[S(33), "worry"], [S(33) + 2.4, "point"]], [
    [c("3", "orange", S(33) + 0.7), p("building", S(33) + 1.3, { s: 0.4 }), c("hospital más caro", "red", S(33) + 1.9)],
    [c("pagas más", "red", S(33) + 4.8)]
  ], { wt: "trampa 3" });
  // 11 CÓMO ELEGIR
  sc(S(34), S(35), "cg", [[S(34), "cheer"], [S(34) + 2.2, "think"]], [
    [c("joven con ahorros", "green", S(34) + 0.7)],
    [c("deducible alto", "orange", S(34) + 3.8), c("prima barata", "green", S(34) + 4.4)]
  ], { wt: "si eres..." });
  sc(S(35), S(36), "cg", [[S(35), "worry"], [S(35) + 2.2, "give"]], [
    [c("sin ahorros", "red", S(35) + 0.7)],
    [c("deducible bajo", "green", S(35) + 3.6)]
  ], { wt: "si no..." });
  sc(S(36), S(37), "cg", [[S(36), "phone"], [S(36) + 2.4, "calm"]], [
    [c("con contrato", "grey", S(36) + 0.7), c("ya tienes IMSS", "green", S(36) + 1.4)],
    [c("seguro privado = respaldo", "orange", S(36) + 4.6)]
  ], { wt: "recuerda" });
  // 12 CIERRE
  sc(S(37), S(38), "cg", [[S(37), "point"], [S(37) + 2.4, "calm"]], [
    [c("no es pagar cero", "red", S(37) + 0.7, { x: "strike" })],
    [c("es no quedar en la ruina", "green", S(37) + 4.6)]
  ], { wt: "resumen" });
  sc(S(38), S(39), "cg", [[S(38), "give"], [S(38) + 2.2, "think"]], [
    [c("¿deducible?", "orange", S(38) + 0.7), c("¿coaseguro?", "orange", S(38) + 1.4), c("¿tope?", "orange", S(38) + 2.1)]
  ], { wt: "antes de firmar" });
  sc(S(39), S(40), "cg", [[S(39), "shrug"], [S(39) + 2.2, "look"]], [
    [c("contenido educativo", "grey", S(39) + 0.7)],
    [c("no es asesoría financiera", "orange", S(39) + 3.6)]
  ], { wt: "aviso" });
  sc(S(40), END, "cg", [[S(40), "cheer"], [S(40) + 2.4, "give"]], [
    [c("¿tienes seguro?", "orange", S(40) + 0.7)],
    [c("cuéntame en comentarios", "green", S(40) + 4.4)]
  ], { wt: "tu turno" });

  root.SCENES = SC;
})(window);

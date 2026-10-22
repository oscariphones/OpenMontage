/* Impuestos: cómo funciona el ISR en México (Fábrica 2.0): the whole film as data. Times are REAL seconds of the narration (assets/audio/timeline.json).
 * No coordinates: scenes are grids (L: c = character cell, g = graphic cell) and items flow inside their cell.
 * Fábrica 2.0: 15 s hook with no windows; every scene changes pose; second poses leave ≥1.8 s before the next bullet (camera punch-in).
 * Section 3 (SUSCRÍBETE) is the mandatory subscribe reminder after the topic intro. */
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
  sc(0, S(1), "cg", [[S(0), "phone"], [S(0) + 2.6, "worry"]], []);
  sc(S(1), S(2), "cg", [[S(1), "shrug"], [S(1) + 2.4, "think"]], []);
  sc(S(2), S(3), "cg", [[S(2), "point"], [S(2) + 2.2, "slump"]], []);
  // 2 DE QUÉ VA ESTO
  sc(S(3), S(4), "cg", [[S(3), "look"], [S(3) + 2.2, "point"]], [
    [w("doc", S(3) + 0.7, { sc: 0.4 }), big("ISR", "orange", S(3) + 1.3)],
    [c("impuesto sobre la renta", "grey", S(3) + 4.0)]
  ], { wt: "el tema de hoy" });
  sc(S(4), S(5), "cg", [[S(4), "give"], [S(4) + 2.2, "think"]], [
    [c("cómo se calcula", "green", S(4) + 0.7)],
    [c("cuánto te quitan", "orange", S(4) + 3.2)],
    [c("cómo recuperarlo", "green", S(4) + 4.4)]
  ], { wt: "hoy" });
  // 3 SUSCRÍBETE (recordatorio obligatorio)
  sc(S(5), S(6), "cg", [[S(5), "point"], [S(5) + 2.4, "cheer"]], [
    [big("SUSCRÍBETE", "red", S(5) + 4.6, { x: "stamp" })]
  ], { wt: "antes de seguir" });
  sc(S(6), S(7), "cg", [[S(6), "phone"], [S(6) + 2.2, "give"]], [
    [c("el dinero sin rodeos", "green", S(6) + 0.7)],
    [c("activa la campanita", "orange", S(6) + 4.0)]
  ], { wt: "cada semana" });
  sc(S(7), S(8), "cg", [[S(7), "calm"], [S(7) + 1.0, "look"]], []);
  // 4 LOS ESCALONES
  sc(S(8), S(9), "cg", [[S(8), "shrug"], [S(8) + 2.2, "think"]], [
    [c("un solo %", "red", S(8) + 0.7, { x: "strike" })]
  ], { wt: "el ISR" });
  sc(S(9), S(10), "cg", [[S(9), "point"], [S(9) + 2.2, "look"]], [
    [w("stairs", S(9) + 0.7, { n: 4, sc: 0.4 })],
    [c("rango de ingreso", "grey", S(9) + 3.6), c("su propia tasa", "orange", S(9) + 4.2)]
  ], { wt: "una escalera" });
  sc(S(10), S(11), "cg", [[S(10), "calm"], [S(10) + 2.2, "give"]], [
    [c("primeros pesos", "grey", S(10) + 0.7)],
    [big("≈ 2 %", "green", S(10) + 3.0)]
  ], { wt: "escalón 1" });
  sc(S(11), S(12), "cg", [[S(11), "worry"], [S(11) + 2.4, "point"]], [
    [c("más ingreso", "grey", S(11) + 0.7), sy("arrow", S(11) + 1.3, "grey"), c("tasa más alta", "orange", S(11) + 1.9)],
    [big("máx. 35 %", "red", S(11) + 4.8)]
  ], { wt: "hacia arriba" });
  sc(S(12), S(13), "cg", [[S(12), "think"], [S(12) + 2.2, "point"]], [
    [c("cada tasa", "orange", S(12) + 0.7), c("solo su escalón", "green", S(12) + 1.3)],
    [c("no todo tu sueldo", "red", S(12) + 4.2, { x: "stamp" })]
  ], { wt: "la clave" });
  // 5 EL MITO DEL AUMENTO
  sc(S(13), S(14), "cg", [[S(13), "shrug"], [S(13) + 1.4, "look"]], [
    [big("MITO", "red", S(13) + 0.7, { x: "stamp" })]
  ], { wt: "el aumento" });
  sc(S(14), S(15), "cg", [[S(14), "cheer"], [S(14) + 2.2, "think"]], [
    [w("stairs", S(14) + 0.7, { n: 5, sc: 0.4 }), c("escalón nuevo", "orange", S(14) + 1.3)],
    [c("solo los pesos nuevos", "green", S(14) + 4.4)]
  ], { wt: "te suben el sueldo" });
  sc(S(15), S(16), "cg", [[S(15), "give"], [S(15) + 2.2, "cheer"]], [
    [c("lo de antes: igual", "grey", S(15) + 0.7)],
    [big("+ dinero", "green", S(15) + 4.4)]
  ], { wt: "resultado" });
  // 6 UN SUELDO DE VEINTE MIL
  sc(S(16), S(17), "cg", [[S(16), "point"], [S(16) + 2.2, "calm"]], [
    [p("building", S(16) + 0.7, { s: 0.4 }), big("$20,000", "orange", S(16) + 1.3)],
    [c("brutos al mes", "grey", S(16) + 3.6)]
  ], { wt: "el ejemplo" });
  sc(S(17), S(18), "cg", [[S(17), "look"], [S(17) + 2.2, "think"]], [
    [w("doc", S(17) + 0.7, { sc: 0.4 }), c("tabla del SAT", "grey", S(17) + 1.3)],
    [c("escalón de 21.36 %", "orange", S(17) + 4.2)]
  ], { wt: "su escalón" });
  sc(S(18), S(19), "cg", [[S(18), "worry"], [S(18) + 2.2, "shrug"]], [
    [c("¿21 % de todo?", "red", S(18) + 0.7)],
    [c("$4,272", "red", S(18) + 3.4, { x: "strike" })]
  ], { wt: "lo que creen" });
  sc(S(19), S(20), "cg", [[S(19), "give"], [S(19) + 2.4, "point"]], [
    [c("retención de ISR", "grey", S(19) + 0.7)],
    [big("≈ $2,600", "green", S(19) + 4.6)]
  ], { wt: "lo real" });
  sc(S(20), S(21), "cg", [[S(20), "cheer"], [S(20) + 2.2, "calm"]], [
    [big("≈ 13 %", "green", S(20) + 0.7)],
    [c("tasa real", "green", S(20) + 3.4), c("no 21 %", "red", S(20) + 4.0)]
  ], { wt: "tasa efectiva" });
  // 7 BRUTO CONTRA NETO
  sc(S(21), S(22), "cg", [[S(21), "phone"], [S(21) + 2.2, "look"]], [
    [c("bruto", "orange", S(21) + 0.7), sy("arrow", S(21) + 1.3, "grey"), c("neto", "green", S(21) + 1.9)]
  ], { wt: "tu sueldo" });
  sc(S(22), S(23), "cg", [[S(22), "point"], [S(22) + 2.2, "think"]], [
    [p("building", S(22) + 0.7, { s: 0.4 }), c("te retiene", "grey", S(22) + 1.3)],
    [c("ISR", "red", S(22) + 3.8), c("IMSS", "red", S(22) + 4.4)]
  ], { wt: "en medio" });
  sc(S(23), S(24), "cg", [[S(23), "phone"], [S(23) + 2.2, "give"]], [
    [w("statement", S(23) + 0.7, { sc: 0.4 })],
    [c("recibo de nómina", "orange", S(23) + 3.4)]
  ], { wt: "revísalo" });
  // 8 LAS DEDUCCIONES
  sc(S(24), S(25), "cg", [[S(24), "look"], [S(24) + 2.2, "cheer"]], [
    [big("deducciones", "green", S(24) + 0.7)]
  ], { wt: "casi nadie las usa" });
  sc(S(25), S(26), "cg", [[S(25), "think"], [S(25) + 2.2, "point"]], [
    [c("ingresos del año", "grey", S(25) + 0.7), c("− gastos", "green", S(25) + 1.3)],
    [c("impuesto sobre menos", "green", S(25) + 4.2)]
  ], { wt: "cómo funcionan" });
  sc(S(26), S(27), "cg", [[S(26), "give"], [S(26) + 2.4, "calm"]], [
    [c("médico", "green", S(26) + 0.8), c("dentista", "green", S(26) + 1.4), c("psicólogo", "green", S(26) + 2.0)],
    [c("lentes", "green", S(26) + 4.4), c("colegiaturas", "green", S(26) + 5.0)],
    [c("crédito hipotecario", "green", S(26) + 6.0), c("ahorro para el retiro", "green", S(26) + 6.6)]
  ], { wt: "por ejemplo" });
  sc(S(27), S(28), "cg", [[S(27), "phone"], [S(27) + 2.2, "point"]], [
    [w("doc", S(27) + 0.7, { sc: 0.4 }), c("factura con tu RFC", "orange", S(27) + 1.3)],
    [p("card", S(27) + 3.6, { s: 0.4 }), c("tarjeta o transferencia", "green", S(27) + 4.2)],
    [c("efectivo", "red", S(27) + 5.0, { x: "strike" })]
  ], { wt: "la condición" });
  sc(S(28), S(29), "cg", [[S(28), "shrug"], [S(28) + 1.4, "worry"]], [
    [c("tienen tope", "orange", S(28) + 0.7, { x: "stamp" })]
  ], { wt: "ojo" });
  // 9 LA DECLARACIÓN ANUAL
  sc(S(29), S(30), "cg", [[S(29), "look"], [S(29) + 2.2, "phone"]], [
    [p("calendar", S(29) + 0.7, { s: 0.4 }), c("abril", "orange", S(29) + 1.3)],
    [p("laptop", S(29) + 3.6, { s: 0.4 }), c("portal del SAT", "grey", S(29) + 4.1)]
  ], { wt: "declaración anual" });
  sc(S(30), S(31), "cg", [[S(30), "point"], [S(30) + 2.4, "think"]], [
    [c("obligatoria si:", "grey", S(30) + 0.7)],
    [c("más de $400,000 al año", "orange", S(30) + 4.0)],
    [c("dos patrones a la vez", "orange", S(30) + 5.4)]
  ], { wt: "¿estás obligado?" });
  sc(S(31), S(32), "cg", [[S(31), "give"], [S(31) + 2.2, "cheer"]], [
    [c("no obligado", "grey", S(31) + 0.7)],
    [c("con facturas: hazla", "green", S(31) + 3.4)]
  ], { wt: "te conviene" });
  sc(S(32), S(33), "cg", [[S(32), "calm"], [S(32) + 2.4, "cheer"]], [
    [c("te retuvieron de más", "orange", S(32) + 0.7)],
    [big("saldo a favor", "green", S(32) + 4.4)],
    [c("te lo devuelven", "green", S(32) + 5.4)]
  ], { wt: "el premio" });
  // 10 CIERRE
  sc(S(33), S(34), "cg", [[S(33), "point"], [S(33) + 2.2, "calm"]], [
    [w("stairs", S(33) + 0.7, { n: 4, sc: 0.4 }), c("es una escalera", "orange", S(33) + 1.3)],
    [c("sin miedo al aumento", "green", S(33) + 4.0)]
  ], { wt: "resumen" });
  sc(S(34), S(35), "cg", [[S(34), "give"], [S(34) + 2.2, "think"]], [
    [c("factura todo el año", "green", S(34) + 0.7)],
    [c("abril: recupera", "green", S(34) + 3.6)]
  ], { wt: "tu plan" });
  sc(S(35), S(36), "cg", [[S(35), "shrug"], [S(35) + 2.2, "look"]], [
    [c("contenido educativo", "grey", S(35) + 0.7)],
    [c("no es asesoría fiscal", "orange", S(35) + 3.4)],
    [c("SAT o contador", "grey", S(35) + 4.6)]
  ], { wt: "aviso" });
  sc(S(36), END, "cg", [[S(36), "cheer"], [S(36) + 2.4, "give"]], [
    [c("¿saldo a favor?", "orange", S(36) + 0.7)],
    [c("cuéntame en comentarios", "green", S(36) + 4.4)]
  ], { wt: "tu turno" });

  root.SCENES = SC;
})(window);

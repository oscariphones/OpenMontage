/* Por qué los más ricos casi no pagan impuestos (global) (Fábrica 2.0): the whole film as data. Times are REAL seconds of the narration (assets/audio/timeline.json).
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
  sc(0, S(1), "cg", [[S(0), "slump"], [S(0) + 2.4, "worry"]], []);
  sc(S(1), S(2), "cg", [[S(1), "point"], [S(1) + 2.6, "shrug"]], []);
  sc(S(2), S(3), "cg", [[S(2), "think"], [S(2) + 2.4, "look"]], []);
  // 2 DE QUÉ VA ESTO
  sc(S(3), S(4), "cg", [[S(3), "point"], [S(3) + 2.0, "give"]], [
    [c("el truco de 3 pasos", "orange", S(3) + 0.7)]
  ], { wt: "el tema de hoy" });
  sc(S(4), S(5), "cg", [[S(4), "think"], [S(4) + 2.2, "cheer"]], [
    [c("sin palabras de contador", "green", S(4) + 0.7)],
    [c("lo que sí puedes usar", "green", S(4) + 4.0)]
  ], { wt: "al final" });
  // 3 SUSCRÍBETE (recordatorio obligatorio)
  sc(S(5), S(6), "cg", [[S(5), "point"], [S(5) + 2.0, "cheer"]], [
    [big("SUSCRÍBETE", "red", S(5) + 4.0, { x: "stamp" })]
  ], { wt: "antes de seguir" });
  sc(S(6), S(7), "cg", [[S(6), "sitRelaxed"], [S(6) + 1.8, "give"]], [
    [c("activa la campanita", "orange", S(6) + 0.6)]
  ], { wt: "cada semana" });
  sc(S(7), S(8), "cg", [[S(7), "calm"], [S(7) + 1.4, "point"]], []);
  // 4 EL SUELDO VS LAS ACCIONES
  sc(S(8), S(9), "cg", [[S(8), "worry"], [S(8) + 2.4, "shrug"]], [
    [w("statement", S(8) + 0.8, { sc: 0.4 }), c("el sueldo paga impuestos", "red", S(8) + 1.4)],
    [c("antes de llegar a ti", "grey", S(8) + 4.6)]
  ], { wt: "la mayoría" });
  sc(S(9), S(10), "cg", [[S(9), "point"], [S(9) + 1.8, "think"]], [
    [c("casi no viven de un sueldo", "orange", S(9) + 0.6)]
  ], { wt: "los más ricos" });
  sc(S(10), S(11), "cg", [[S(10), "give"], [S(10) + 2.4, "point"]], [
    [w("blocks", S(10) + 0.8, { sc: 0.4 }), c("acciones", "green", S(10) + 1.4)],
    [c("pedacitos de empresas", "grey", S(10) + 4.2)]
  ], { wt: "su riqueza" });
  sc(S(11), S(12), "cg", [[S(11), "cheer"], [S(11) + 2.2, "give"]], [
    [w("bars", S(11) + 0.7, { sc: 0.4 }), c("la empresa sube", "green", S(11) + 1.3), c("ellos también", "green", S(11) + 1.9)]
  ], { wt: "cuando valen más" });
  // 5 EL PASO UNO: COMPRA Y NO VENDAS
  sc(S(12), S(13), "cg", [[S(12), "point"], [S(12) + 1.4, "look"]], [
    [c("paso 1", "orange", S(12) + 0.5)]
  ], { wt: "compra y no vendas" });
  sc(S(13), S(14), "cg", [[S(13), "think"], [S(13) + 2.4, "point"]], [
    [c("impuesto solo al vender", "orange", S(13) + 0.8)],
    [c("y si ganas dinero", "grey", S(13) + 4.6)]
  ], { wt: "en muchos países" });
  sc(S(14), S(15), "cg", [[S(14), "cheer"], [S(14) + 2.4, "shrug"]], [
    [c("$1,000", "grey", S(14) + 0.8), sy("arrow", S(14) + 1.4, "grey"), c("$1 millón", "green", S(14) + 2.0)],
    [c("sin vender: $0 de impuesto", "green", S(14) + 5.0)]
  ], { wt: "por ejemplo" });
  sc(S(15), S(16), "cg", [[S(15), "give"], [S(15) + 2.0, "calm"]], [
    [c("casi nunca venden", "orange", S(15) + 0.7)]
  ], { wt: "por eso" });
  sc(S(16), S(17), "cg", [[S(16), "cheer"], [S(16) + 2.4, "shrug"]], [
    [c("en papel: riquísimos", "green", S(16) + 0.8)],
    [c("para el fisco: nada", "grey", S(16) + 4.4)]
  ], { wt: "el resultado" });
  // 6 EL PASO DOS: PIDE PRESTADO
  sc(S(17), S(18), "cg", [[S(17), "think"], [S(17) + 1.8, "shrug"]], [
    [c("¿de qué viven?", "orange", S(17) + 0.6)]
  ], { wt: "paso 2" });
  sc(S(18), S(19), "cg", [[S(18), "give"], [S(18) + 2.4, "point"]], [
    [p("building", S(18) + 0.8, { s: 0.4 }), c("acciones como garantía", "orange", S(18) + 1.4)],
    [c("piden un préstamo", "green", S(18) + 4.2)]
  ], { wt: "van con un banco" });
  sc(S(19), S(20), "cg", [[S(19), "cheer"], [S(19) + 2.2, "look"]], [
    [c("cliente perfecto", "green", S(19) + 0.7)],
    [c("si no paga, se las queda", "grey", S(19) + 3.8)]
  ], { wt: "para el banco" });
  sc(S(20), S(21), "cg", [[S(20), "point"], [S(20) + 2.4, "cheer"]], [
    [c("préstamo = deuda", "orange", S(20) + 0.8)],
    [c("no paga impuestos", "green", S(20) + 4.4)]
  ], { wt: "la clave" });
  sc(S(21), S(22), "cg", [[S(21), "sitRelaxed"], [S(21) + 2.4, "cheer"]], [
    [p("house", S(21) + 0.8, { s: 0.4 }), w("plane", S(21) + 1.4, { sc: 0.4 }), c("lo que quieran", "green", S(21) + 2.0)],
    [c("a tasas bajas", "green", S(21) + 4.6)]
  ], { wt: "así compran" });
  // 7 ¿Y CÓMO PAGAN EL PRÉSTAMO?
  sc(S(22), S(23), "cg", [[S(22), "think"], [S(22) + 2.2, "worry"]], [
    [c("la deuda crece", "red", S(22) + 0.7)]
  ], { wt: "¿y los intereses?" });
  sc(S(23), S(24), "cg", [[S(23), "calm"], [S(23) + 2.2, "cheer"]], [
    [c("las acciones suben más rápido", "green", S(23) + 0.7)]
  ], { wt: "no les preocupa" });
  sc(S(24), S(25), "cg", [[S(24), "give"], [S(24) + 2.2, "shrug"]], [
    [c("préstamo nuevo", "orange", S(24) + 0.7), sy("arrow", S(24) + 1.3, "grey"), c("paga el anterior", "orange", S(24) + 1.9)]
  ], { wt: "cuando crece" });
  // 8 EL PASO TRES: LA HERENCIA
  sc(S(25), S(26), "cg", [[S(25), "point"], [S(25) + 1.2, "worry"]], [
    [c("paso 3", "orange", S(25) + 0.5)]
  ], { wt: "el más polémico" });
  sc(S(26), S(27), "cg", [[S(26), "slump"], [S(26) + 2.4, "look"]], [
    [c("los herederos reciben las acciones", "grey", S(26) + 0.8)],
    [p("calendar", S(26) + 4.4, { s: 0.4 }), c("con el precio de ese día", "orange", S(26) + 5.0)]
  ], { wt: "en Estados Unidos" });
  sc(S(27), S(28), "cg", [[S(27), "shrug"], [S(27) + 2.2, "point"]], [
    [c("la ganancia de su vida", "grey", S(27) + 0.7, { x: "strike" })]
  ], { wt: "es como si" });
  sc(S(28), S(29), "cg", [[S(28), "give"], [S(28) + 2.4, "cheer"]], [
    [c("venden", "orange", S(28) + 0.8), c("pagan deudas", "orange", S(28) + 1.4)],
    [c("casi sin impuesto", "green", S(28) + 4.8)]
  ], { wt: "los herederos" });
  sc(S(29), S(30), "cg", [[S(29), "point"], [S(29) + 1.8, "shrug"]], [
    [c("compra, pide prestado y muere", "orange", S(29) + 0.6)]
  ], { wt: "le dicen" });
  // 9 LO QUE ENCONTRARON
  sc(S(30), S(31), "cg", [[S(30), "look"], [S(30) + 2.4, "think"]], [
    [p("calendar", S(30) + 0.8, { s: 0.4 }), c("2021", "grey", S(30) + 1.4)],
    [w("doc", S(30) + 4.4, { sc: 0.4 }), c("investigación periodística", "orange", S(30) + 5.0)]
  ], { wt: "lo que encontraron" });
  sc(S(31), S(32), "cg", [[S(31), "worry"], [S(31) + 2.4, "shrug"]], [
    [c("años sin impuesto federal", "red", S(31) + 0.8)],
    [c("de los más ricos del mundo", "grey", S(31) + 4.4)]
  ], { wt: "encontró" });
  sc(S(32), S(33), "cg", [[S(32), "point"], [S(32) + 2.2, "slump"]], [
    [big("legal", "orange", S(32) + 2.6, { x: "stamp" })]
  ], { wt: "lo más polémico" });
  // 10 NO ES IGUAL EN TODOS LADOS
  sc(S(33), S(34), "cg", [[S(33), "calm"], [S(33) + 2.4, "point"]], [
    [c("las reglas cambian por país", "orange", S(33) + 0.8)],
    [c("gobiernos discuten cerrar huecos", "grey", S(33) + 4.6)]
  ], { wt: "ojo" });
  sc(S(34), S(35), "cg", [[S(34), "shrug"], [S(34) + 2.4, "think"]], [
    [c("solo con cantidades enormes", "red", S(34) + 0.8)],
    [p("building", S(34) + 4.6, { s: 0.4 }), c("y bancos dispuestos", "grey", S(34) + 5.2)]
  ], { wt: "además" });
  sc(S(35), S(36), "cg", [[S(35), "worry"], [S(35) + 2.0, "calm"]], [
    [c("no se copia al pie de la letra", "grey", S(35) + 0.7)]
  ], { wt: "así que" });
  // 11 LO QUE SÍ PUEDES COPIAR
  sc(S(36), S(37), "cg", [[S(36), "point"], [S(36) + 2.4, "cheer"]], [
    [c("lo que ganan", "grey", S(36) + 0.8, { x: "strike" })],
    [c("lo que poseen", "green", S(36) + 4.4)]
  ], { wt: "los ricos viven de" });
  sc(S(37), S(38), "cg", [[S(37), "give"], [S(37) + 2.4, "cheer"]], [
    [w("jar", S(37) + 0.8, { sc: 0.4 }), c("más dinero invertido", "green", S(37) + 1.4)],
    [c("menos dependes del sueldo", "green", S(37) + 4.2)]
  ], { wt: "para ti" });
  sc(S(38), S(39), "cg", [[S(38), "think"], [S(38) + 2.4, "point"]], [
    [w("doc", S(38) + 0.8, { sc: 0.4 }), c("cuentas para el retiro", "green", S(38) + 1.4)],
    [c("pagas menos impuestos", "green", S(38) + 4.6)]
  ], { wt: "y además" });
  // 12 LA LECCIÓN
  sc(S(39), S(40), "cg", [[S(39), "point"], [S(39) + 2.4, "think"]], [
    [c("dueño de cosas", "green", S(39) + 0.8), sy("arrow", S(39) + 1.4, "grey"), c("gana más", "green", S(39) + 2.0)],
    [c("solo sueldo: gana menos", "red", S(39) + 4.6)]
  ], { wt: "la lección" });
  sc(S(40), S(41), "cg", [[S(40), "shrug"], [S(40) + 2.4, "cheer"]], [
    [c("puede no gustarte", "grey", S(40) + 0.8)],
    [c("entenderlo te ayuda", "green", S(40) + 4.0)]
  ], { wt: "pero" });
  // 13 CIERRE
  sc(S(41), S(42), "cg", [[S(41), "calm"], [S(41) + 2.2, "point"]], [
    [c("ricos vs enfermera", "orange", S(41) + 0.7)]
  ], { wt: "ahora ya sabes" });
  sc(S(42), S(43), "cg", [[S(42), "calm"], [S(42) + 2.4, "look"]], [
    [c("contenido educativo", "grey", S(42) + 0.8)],
    [c("consulta a un experto", "orange", S(42) + 4.4)]
  ], { wt: "aviso" });
  sc(S(43), END, "cg", [[S(43), "cheer"], [S(43) + 2.4, "give"]], [
    [c("¿debería cambiar?", "orange", S(43) + 0.7)],
    [c("cuéntame en comentarios", "green", S(43) + 4.0)]
  ], { wt: "tu turno" });

  root.SCENES = SC;
})(window);

/* Compra ahora, paga después (Fábrica 2.0, México): the whole film as data. Times are REAL seconds of the narration (assets/audio/timeline.json).
 * No coordinates: scenes are grids (L: c = character cell, g = graphic cell) and items flow inside their cell.
 * Fábrica 2.0: 15 s hook with no windows; every scene changes pose; second poses leave ≥1.8 s before the next bullet (camera punch-in). */
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
  sc(0, S(1), "cg", [[S(0), "phone"], [S(0) + 2.6, "shrug"]], []);
  sc(S(1), S(2), "cg", [[S(1), "point"], [S(1) + 2.4, "worry"]], []);
  sc(S(2), S(3), "cg", [[S(2), "think"], [S(2) + 2.2, "slump"]], []);
  // 2 QUÉ ES ESTO
  sc(S(3), S(4), "cg", [[S(3), "look"], [S(3) + 2.2, "point"]], [
    [p("cart", S(3) + 0.7, { s: 0.4 }), c("compra ahora", "green", S(3) + 1.3)],
    [c("paga después", "orange", S(3) + 4.2)]
  ], { wt: "al pagar" });
  sc(S(4), S(5), "cg", [[S(4), "phone"], [S(4) + 2.2, "give"]], [
    [c("meses sin intereses", "orange", S(4) + 0.7)],
    [c("Kueski Pay", "grey", S(4) + 4.0), c("Aplazo", "grey", S(4) + 4.6), c("Mercado Pago", "grey", S(4) + 5.2)]
  ], { wt: "en México" });
  sc(S(5), S(6), "cg", [[S(5), "cheer"], [S(5) + 2.2, "calm"]], [
    [p("phone", S(5) + 0.7, { s: 0.4 }), big("$20,000", "orange", S(5) + 1.3)],
    [c("5 quincenas × $4,000", "green", S(5) + 4.2)]
  ], { wt: "el ejemplo" });
  // 3 NO ES NUEVO
  sc(S(6), S(8), "cg", [[S(6), "shrug"], [S(7), "think"]], [
    [c("app bonita", "grey", S(6) + 0.8), c("idea vieja", "orange", S(6) + 1.4)],
    [p("sofa", S(7) + 1.9, { s: 0.4 }), c("abonos semanales", "orange", S(7) + 2.5)]
  ], { wt: "no es nuevo" });
  sc(S(8), S(10), "cg", [[S(8), "worry"], [S(9), "cheer"]], [
    [p("card", S(8) + 0.7, { s: 0.4 }), c("al instante", "green", S(8) + 1.3), c("con intereses", "red", S(8) + 1.9)],
    [c("al instante", "green", S(9) + 1.9), c("0 % intereses", "green", S(9) + 2.5)]
  ], { wt: "tarjeta vs app" });
  // 4 LA LETRA CHICA
  sc(S(10), S(11), "cg", [[S(10), "point"], [S(10) + 2.2, "look"]], [
    [big("0 %", "green", S(10) + 0.8)],
    [c("solo si pagas a tiempo", "orange", S(10) + 4.2)]
  ], { wt: "la letra chica" });
  sc(S(11), S(12), "cg", [[S(11), "sitStress"], [S(11) + 2.2, "worry"]], [
    [p("clock", S(11) + 0.7, { s: 0.4 }), c("comisión por atraso", "red", S(11) + 1.3)],
    [c("reporte al Buró", "red", S(11) + 4.4, { x: "stamp" })]
  ], { wt: "si te atrasas" });
  sc(S(12), S(14), "cg", [[S(12), "slump"], [S(13), "point"]], [
    [c("tarjetas departamentales", "grey", S(12) + 0.7), big("CAT > 100 %", "red", S(12) + 1.4)],
    [w("doc", S(13) + 1.9, { sc: 0.4 }), c("costo anual total", "orange", S(13) + 2.5)]
  ], { wt: "el CAT" });
  // 5 QUIÉN GANA DE VERDAD
  sc(S(14), S(15), "cg", [[S(14), "think"], [S(14) + 2.4, "shrug"]], [
    [big("¿quién paga?", "orange", S(14) + 4.4)]
  ], { wt: "sin intereses..." });
  sc(S(15), S(17), "cg", [[S(15), "point"], [S(16), "worry"]], [
    [c("1", "orange", S(15) + 0.7), p("building", S(15) + 1.3, { s: 0.4 }), c("comisión alta a la tienda", "green", S(15) + 1.9)],
    [c("2", "orange", S(16) + 1.9), c("comisiones por atraso", "red", S(16) + 2.5)],
    [c("EE. UU.: 1 de cada 3 falló", "red", S(16) + 4.6)]
  ], { wt: "cómo ganan" });
  sc(S(17), S(18), "cg", [[S(17), "look"], [S(17) + 2.2, "phone"]], [
    [c("3", "orange", S(17) + 0.7), w("eye", S(17) + 1.3, { sc: 0.4 })],
    [c("tus datos valen", "orange", S(17) + 4.2)]
  ], { wt: "cómo ganan" });
  sc(S(18), S(19), "cg", [[S(18), "slump"], [S(18) + 2.2, "shrug"]], [
    [c("pagas a tiempo: ganan", "green", S(18) + 0.7)],
    [c("te atrasas: ganan", "red", S(18) + 4.0)],
    [c("tus datos: ganan", "orange", S(18) + 4.8)]
  ], { wt: "siempre ganan" });
  // 6 EL CELULAR DE VEINTE MIL
  sc(S(19), S(20), "cg", [[S(19), "give"], [S(19) + 2.2, "think"]], [
    [p("phone", S(19) + 0.7, { s: 0.4 }), big("$20,000", "orange", S(19) + 1.3)],
    [w("signpost", S(19) + 4.0, { sc: 0.4 })]
  ], { wt: "tres caminos" });
  sc(S(20), S(21), "cg", [[S(20), "cheer"], [S(20) + 2.2, "calm"]], [
    [c("1", "green", S(20) + 0.7), c("de contado", "green", S(20) + 1.3)],
    [c("¿descuento?", "orange", S(20) + 4.2)]
  ], { wt: "camino 1" });
  sc(S(21), S(23), "cg", [[S(21), "phone"], [S(22), "sitStress"]], [
    [c("2", "red", S(21) + 0.7), p("card", S(21) + 1.3, { s: 0.4 }), c("45 % + IVA", "red", S(21) + 1.9)],
    [c("$1,000 al mes", "grey", S(21) + 3.4)],
    [c("~4 años", "orange", S(22) + 1.9), big("~$48,000", "red", S(22) + 2.6)]
  ], { wt: "camino 2 (ejemplo)" });
  sc(S(23), S(24), "cg", [[S(23), "point"], [S(23) + 2.2, "think"]], [
    [c("3", "orange", S(23) + 0.7), c("quincenas sin intereses", "green", S(23) + 1.3)],
    [c("solo si tienes el dinero", "orange", S(23) + 4.4)]
  ], { wt: "camino 3" });
  // 7 LOS CUATRO TRUCOS
  sc(S(24), S(25), "cg", [[S(24), "look"], [S(24) + 2.2, "point"]], [
    [p("laptop", S(24) + 0.7, { s: 0.4 }), big("4 trucos", "orange", S(24) + 1.3)]
  ], { wt: "pantalla de pago" });
  sc(S(25), S(26), "cg", [[S(25), "give"], [S(25) + 2.2, "shrug"]], [
    [c("1", "orange", S(25) + 0.7), c("partir el precio", "orange", S(25) + 1.3)],
    [c("$4,000", "green", S(25) + 4.0), c("$20,000", "red", S(25) + 4.6)]
  ], { wt: "truco 1" });
  sc(S(26), S(27), "cg", [[S(26), "cheer"], [S(26) + 2.2, "worry"]], [
    [c("2", "orange", S(26) + 0.7), c("lo quiero hoy", "green", S(26) + 1.3)],
    [c("lo sufro después", "red", S(26) + 4.4)]
  ], { wt: "truco 2" });
  sc(S(27), S(28), "cg", [[S(27), "phone"], [S(27) + 2.2, "look"]], [
    [c("3", "orange", S(27) + 0.7), p("clock", S(27) + 1.3, { s: 0.4 }), c("¡se acaba!", "red", S(27) + 1.9)],
    [c("quedan pocas piezas", "red", S(27) + 4.4)]
  ], { wt: "truco 3" });
  sc(S(28), S(29), "cg", [[S(28), "point"], [S(28) + 2.4, "think"]], [
    [c("4", "orange", S(28) + 0.7), c("botón brillante", "orange", S(28) + 1.3)],
    [c("ya seleccionado", "red", S(28) + 4.8)]
  ], { wt: "truco 4" });
  // 8 LA BOLA DE MENSUALIDADES
  sc(S(29), S(30), "cg", [[S(29), "shrug"], [S(29) + 2.2, "worry"]], [
    [c("refri", "green", S(29) + 0.8), sy("arrow", S(29) + 1.4, "grey"), c("comida a domicilio", "red", S(29) + 4.2)]
  ], { wt: "¿para qué?" });
  sc(S(30), S(31), "cg", [[S(30), "phone"], [S(30) + 2.2, "sitStress"]], [
    [w("stack", S(30) + 0.7, { sc: 0.4 }), c("1", "grey", S(30) + 1.3)],
    [c("5", "orange", S(30) + 4.2), c("8", "red", S(30) + 4.8)]
  ], { wt: "a la vez" });
  sc(S(31), S(32), "cg", [[S(31), "point"], [S(31) + 2.4, "slump"]], [
    [big("apilar deudas", "red", S(31) + 0.8)],
    [w("dots", S(31) + 4.4, { sc: 0.4 }), c("EE. UU.: +6 de cada 10", "orange", S(31) + 5.0)]
  ], { wt: "la bola" });
  sc(S(32), S(33), "cg", [[S(32), "worry"], [S(32) + 2.2, "sitStress"]], [
    [c("chiquitas", "green", S(32) + 0.7), c("juntas", "red", S(32) + 1.3)],
    [w("leakjar", S(32) + 4.0, { sc: 0.4, lbl: "tu quincena", lk: "red" })]
  ], { wt: "tu quincena" });
  // 9 LAS TRES REGLAS
  sc(S(33), S(34), "cg", [[S(33), "think"], [S(33) + 2.2, "calm"]], [
    [c("¿borrar las apps?", "grey", S(33) + 0.7, { x: "strike" })],
    [c("usarlas con reglas", "green", S(33) + 4.0)]
  ], { wt: "¿qué hacer?" });
  sc(S(34), S(35), "cg", [[S(34), "point"], [S(34) + 2.2, "give"]], [
    [c("1", "green", S(34) + 0.7), c("sin dinero en tu cuenta", "orange", S(34) + 1.3)],
    [big("no lo compres", "red", S(34) + 4.2)]
  ], { wt: "regla 1" });
  sc(S(35), S(36), "cg", [[S(35), "shrug"], [S(35) + 2.2, "point"]], [
    [c("2", "green", S(35) + 0.7), c("se acaba antes que los pagos", "orange", S(35) + 1.3)],
    [p("cup", S(35) + 4.2, { s: 0.4 }), c("no a plazos", "red", S(35) + 4.8)]
  ], { wt: "regla 2" });
  sc(S(36), S(37), "cg", [[S(36), "phone"], [S(36) + 2.2, "think"]], [
    [c("3", "green", S(36) + 0.7), w("tally", S(36) + 1.3, { sc: 0.4 }), c("suma tus mensualidades", "green", S(36) + 1.9)],
    [c("¿ya no sabes? para", "red", S(36) + 4.6)]
  ], { wt: "regla 3" });
  // 10 CIERRE
  sc(S(37), S(39), "cg", [[S(37), "cheer"], [S(38), "worry"]], [
    [c("con cabeza", "green", S(37) + 0.7), c("tu dinero trabaja", "green", S(37) + 1.3)],
    [c("sin control", "red", S(38) + 1.9), c("deuda invisible", "red", S(38) + 2.5)]
  ], { wt: "la diferencia" });
  sc(S(39), S(40), "cg", [[S(39), "calm"], [S(39) + 2.4, "look"]], [
    [c("contenido educativo", "grey", S(39) + 0.7)],
    [c("revisa el CAT", "orange", S(39) + 4.6)]
  ], { wt: "aviso" });
  sc(S(40), END, "cg", [[S(40), "give"], [S(40) + 2.4, "cheer"]], [
    [c("¿cuántas mensualidades pagas?", "orange", S(40) + 0.7)],
    [c("suscríbete", "green", S(40) + 4.6)]
  ], { wt: "cuéntame" });

  root.SCENES = SC;
})(window);

/* Cómo gana dinero tu tarjeta de crédito (global con detalles de México) (Fábrica 2.0): the whole film as data. Times are REAL seconds of the narration (assets/audio/timeline.json).
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
  sc(0, S(1), "cg", [[S(0), "give"], [S(0) + 2.4, "point"]], []);
  sc(S(1), S(2), "cg", [[S(1), "shrug"], [S(1) + 2.0, "worry"]], []);
  sc(S(2), S(3), "cg", [[S(2), "point"], [S(2) + 2.4, "think"]], []);
  // 2 DE QUÉ VA ESTO
  sc(S(3), S(4), "cg", [[S(3), "look"], [S(3) + 2.0, "point"]], [
    [p("card", S(3) + 0.7, { s: 0.4 }), c("el negocio por dentro", "orange", S(3) + 1.3)]
  ], { wt: "el tema de hoy" });
  sc(S(4), S(5), "cg", [[S(4), "think"], [S(4) + 2.0, "cheer"]], [
    [c("que no te gane el banco", "green", S(4) + 0.7)]
  ], { wt: "al final" });
  // 3 SUSCRÍBETE (recordatorio obligatorio)
  sc(S(5), S(6), "cg", [[S(5), "point"], [S(5) + 1.6, "cheer"]], [
    [big("SUSCRÍBETE", "red", S(5) + 3.4, { x: "stamp" })]
  ], { wt: "antes de seguir" });
  sc(S(6), S(7), "cg", [[S(6), "sitRelaxed"], [S(6) + 1.8, "give"]], [
    [c("activa la campanita", "orange", S(6) + 0.6)]
  ], { wt: "cada semana" });
  sc(S(7), S(8), "cg", [[S(7), "calm"], [S(7) + 1.0, "point"]], []);
  // 4 LA COMISIÓN ESCONDIDA
  sc(S(8), S(9), "cg", [[S(8), "give"], [S(8) + 1.4, "point"]], [
    [p("card", S(8) + 0.5, { s: 0.4 }), c("tenis de $1,000", "grey", S(8) + 1.1)]
  ], { wt: "forma 1: la comisión" });
  sc(S(9), S(10), "cg", [[S(9), "look"], [S(9) + 2.2, "shrug"]], [
    [c("la tienda recibe ≈ $970", "orange", S(9) + 0.7)]
  ], { wt: "la tienda" });
  sc(S(10), S(11), "cg", [[S(10), "point"], [S(10) + 2.4, "think"]], [
    [w("coin", S(10) + 0.8, { sc: 0.4 }), c("$30 para el banco", "red", S(10) + 1.4)],
    [c("y para quien mueve el pago", "grey", S(10) + 4.4)]
  ], { wt: "los otros $30" });
  sc(S(11), S(12), "cg", [[S(11), "shrug"], [S(11) + 2.2, "give"]], [
    [c("en cada compra", "orange", S(11) + 0.7), c("todos los días", "orange", S(11) + 1.3)]
  ], { wt: "la paga la tienda" });
  sc(S(12), S(13), "cg", [[S(12), "worry"], [S(12) + 2.4, "slump"]], [
    [c("sube sus precios", "red", S(12) + 0.8)],
    [c("la pagamos todos", "red", S(12) + 4.6)]
  ], { wt: "y luego" });
  // 5 LOS INTERESES
  sc(S(13), S(14), "cg", [[S(13), "point"], [S(13) + 1.8, "give"]], [
    [big("los intereses", "red", S(13) + 0.6)]
  ], { wt: "forma 2" });
  sc(S(14), S(15), "cg", [[S(14), "think"], [S(14) + 2.4, "worry"]], [
    [p("calendar", S(14) + 0.8, { s: 0.4 }), c("no pagas todo a tiempo", "orange", S(14) + 1.4)],
    [c("intereses sobre lo que quedó", "red", S(14) + 4.4)]
  ], { wt: "cuándo cobran" });
  sc(S(15), S(16), "cg", [[S(15), "slump"], [S(15) + 2.4, "worry"]], [
    [c("en México", "grey", S(15) + 0.8)],
    [big("+50 % al año", "red", S(15) + 4.0)]
  ], { wt: "las tasas" });
  sc(S(16), S(17), "cg", [[S(16), "give"], [S(16) + 2.4, "shrug"]], [
    [c("pides $10,000", "grey", S(16) + 0.8), sy("arrow", S(16) + 1.4, "grey"), c("debes +$15,000", "red", S(16) + 2.0)]
  ], { wt: "para que te des una idea" });
  sc(S(17), S(18), "cg", [[S(17), "cheer"], [S(17) + 2.2, "point"]], [
    [c("clientes que deben un poco", "orange", S(17) + 0.7)]
  ], { wt: "el cliente favorito" });
  // 6 LA TRAMPA DEL PAGO MÍNIMO
  sc(S(18), S(19), "cg", [[S(18), "point"], [S(18) + 1.6, "worry"]], [
    [big("pago mínimo", "orange", S(18) + 0.6)]
  ], { wt: "la trampa" });
  sc(S(19), S(20), "cg", [[S(19), "look"], [S(19) + 2.2, "calm"]], [
    [w("statement", S(19) + 0.7, { sc: 0.4 }), c("una cantidad cómoda", "green", S(19) + 1.3)]
  ], { wt: "el estado de cuenta" });
  sc(S(20), S(21), "cg", [[S(20), "worry"], [S(20) + 2.2, "slump"]], [
    [c("casi solo intereses", "red", S(20) + 0.7)],
    [c("la deuda casi no baja", "red", S(20) + 3.6)]
  ], { wt: "pero" });
  sc(S(21), S(22), "cg", [[S(21), "shrug"], [S(21) + 2.4, "worry"]], [
    [p("calendar", S(21) + 0.8, { s: 0.4 }), c("de meses a años", "red", S(21) + 1.4)]
  ], { wt: "si solo pagas el mínimo" });
  sc(S(22), S(23), "cg", [[S(22), "point"], [S(22) + 2.2, "think"]], [
    [c("no te engaña", "grey", S(22) + 0.7)],
    [c("te muestra lo que le conviene", "orange", S(22) + 3.6)]
  ], { wt: "el banco" });
  // 7 LAS CUOTAS
  sc(S(23), S(24), "cg", [[S(23), "point"], [S(23) + 1.2, "give"]], [
    [c("forma 3: las cuotas", "orange", S(23) + 0.5)]
  ], { wt: "la tercera" });
  sc(S(24), S(25), "cg", [[S(24), "look"], [S(24) + 2.2, "shrug"]], [
    [p("calendar", S(24) + 0.7, { s: 0.4 }), c("anualidad", "red", S(24) + 1.3)]
  ], { wt: "por tener la tarjeta" });
  sc(S(25), S(26), "cg", [[S(25), "worry"], [S(25) + 2.4, "slump"]], [
    [c("pagar tarde", "red", S(25) + 0.8), c("sacar efectivo", "red", S(25) + 1.4)],
    [c("pasarte del límite", "red", S(25) + 4.4)]
  ], { wt: "comisiones" });
  sc(S(26), S(27), "cg", [[S(26), "give"], [S(26) + 2.2, "point"]], [
    [w("stack", S(26) + 0.7, { sc: 0.4 }), c("juntas suman muchísimo", "orange", S(26) + 1.3)]
  ], { wt: "cada una pequeña" });
  // 8 LOS MESES SIN INTERESES
  sc(S(27), S(28), "cg", [[S(27), "think"], [S(27) + 1.6, "shrug"]], [
    [c("¿meses sin intereses?", "orange", S(27) + 0.6)]
  ], { wt: "¿y aquí?" });
  sc(S(28), S(29), "cg", [[S(28), "point"], [S(28) + 2.4, "give"]], [
    [p("cart", S(28) + 0.8, { s: 0.4 }), c("la tienda paga más comisión", "orange", S(28) + 1.4)]
  ], { wt: "quién paga" });
  sc(S(29), S(30), "cg", [[S(29), "cheer"], [S(29) + 2.2, "think"]], [
    [c("vende más", "green", S(29) + 0.7)],
    [c("ya está en el precio", "orange", S(29) + 3.8)]
  ], { wt: "la tienda acepta" });
  sc(S(30), S(31), "cg", [[S(30), "give"], [S(30) + 2.4, "worry"]], [
    [c("paga cada mes completo", "green", S(30) + 0.8)],
    [c("que no se te junten", "red", S(30) + 5.0)]
  ], { wt: "para ti" });
  // 9 EL CLIENTE QUE EL BANCO NO QUIERE
  sc(S(31), S(32), "cg", [[S(31), "look"], [S(31) + 1.8, "point"]], [
    [c("el cliente que no deja nada", "orange", S(31) + 0.6)]
  ], { wt: "ahora" });
  sc(S(32), S(33), "cg", [[S(32), "cheer"], [S(32) + 2.4, "give"]], [
    [big("totalero", "green", S(32) + 0.8)],
    [c("paga todo, cada mes", "green", S(32) + 4.4)]
  ], { wt: "en México" });
  sc(S(33), S(34), "cg", [[S(33), "sitRelaxed"], [S(33) + 2.2, "calm"]], [
    [c("dinero gratis unas semanas", "green", S(33) + 0.7)],
    [c("cero intereses", "green", S(33) + 3.8)]
  ], { wt: "el totalero" });
  sc(S(34), S(35), "cg", [[S(34), "cheer"], [S(34) + 2.4, "point"]], [
    [w("coin", S(34) + 0.8, { sc: 0.4 }), c("puntos y reembolsos", "green", S(34) + 1.4)],
    [c("recupera parte de la comisión", "green", S(34) + 5.0)]
  ], { wt: "y encima" });
  // 10 CÓMO USARLA A TU FAVOR
  sc(S(35), S(36), "cg", [[S(35), "think"], [S(35) + 1.6, "point"]], [
    [c("¿cómo usarla bien?", "orange", S(35) + 0.6)]
  ], { wt: "entonces" });
  sc(S(36), S(37), "cg", [[S(36), "point"], [S(36) + 1.8, "cheer"]], [
    [c("1", "orange", S(36) + 0.6), c("paga el total", "green", S(36) + 1.2)]
  ], { wt: "regla 1" });
  sc(S(37), S(38), "cg", [[S(37), "give"], [S(37) + 2.2, "point"]], [
    [c("2", "orange", S(37) + 0.6), c("sin cobro anual", "green", S(37) + 1.2)]
  ], { wt: "regla 2" });
  sc(S(38), S(39), "cg", [[S(38), "calm"], [S(38) + 2.0, "cheer"]], [
    [c("3", "orange", S(38) + 0.6), c("solo lo que ya puedes pagar", "green", S(38) + 1.2)]
  ], { wt: "regla 3" });
  // 11 LA LECCIÓN
  sc(S(39), S(40), "cg", [[S(39), "point"], [S(39) + 2.0, "think"]], [
    [c("dinero extra", "grey", S(39) + 0.6, { x: "strike" }), c("dinero prestado", "orange", S(39) + 1.2)]
  ], { wt: "la lección" });
  sc(S(40), S(41), "cg", [[S(40), "worry"], [S(40) + 2.4, "cheer"]], [
    [c("préstamo caro: más pobre", "red", S(40) + 0.8)],
    [c("herramienta: trabaja para ti", "green", S(40) + 4.6)]
  ], { wt: "tú decides" });
  // 12 CIERRE
  sc(S(41), S(42), "cg", [[S(41), "calm"], [S(41) + 2.0, "point"]], [
    [p("card", S(41) + 0.6, { s: 0.4 }), c("un negocio enorme", "orange", S(41) + 1.2)]
  ], { wt: "detrás de cada pago" });
  sc(S(42), S(43), "cg", [[S(42), "calm"], [S(42) + 2.2, "look"]], [
    [c("contenido educativo", "grey", S(42) + 0.7)],
    [c("revisa tu tarjeta", "orange", S(42) + 3.8)]
  ], { wt: "aviso" });
  sc(S(43), END, "cg", [[S(43), "cheer"], [S(43) + 2.4, "give"]], [
    [c("¿totalero o pago mínimo?", "orange", S(43) + 0.7)],
    [c("cuéntame en comentarios", "green", S(43) + 4.4)]
  ], { wt: "tu turno" });

  root.SCENES = SC;
})(window);

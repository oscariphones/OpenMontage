/* Por qué ahora todo es suscripción (global) (Fábrica 2.0): the whole film as data. Times are REAL seconds of the narration (assets/audio/timeline.json).
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
  sc(0, S(1), "cg", [[S(0), "point"], [S(0) + 2.6, "think"]], []);
  sc(S(1), S(2), "cg", [[S(1), "phone"], [S(1) + 2.6, "worry"]], []);
  sc(S(2), S(3), "cg", [[S(2), "shrug"], [S(2) + 2.2, "slump"]], []);
  // 2 DE QUÉ VA ESTO
  sc(S(3), S(4), "cg", [[S(3), "look"], [S(3) + 2.4, "point"]], [
    [c("música", "grey", S(3) + 0.8), c("programas", "grey", S(3) + 1.4), p("car", S(3) + 2.0, { s: 0.4 })],
    [big("todo es suscripción", "orange", S(3) + 4.6)]
  ], { wt: "el tema de hoy" });
  sc(S(4), S(5), "cg", [[S(4), "think"], [S(4) + 2.2, "worry"]], [
    [c("no ser dueño", "red", S(4) + 0.7)],
    [c("sale más caro", "red", S(4) + 3.8)]
  ], { wt: "y además" });
  // 3 SUSCRÍBETE (recordatorio obligatorio)
  sc(S(5), S(6), "cg", [[S(5), "point"], [S(5) + 2.4, "cheer"]], [
    [big("SUSCRÍBETE", "red", S(5) + 4.2, { x: "stamp" })]
  ], { wt: "esta sí es gratis" });
  sc(S(6), S(7), "cg", [[S(6), "sitRelaxed"], [S(6) + 2.2, "give"]], [
    [c("trucos que nadie te cuenta", "green", S(6) + 0.7)],
    [c("activa la campanita", "orange", S(6) + 3.6)]
  ], { wt: "cada semana" });
  sc(S(7), S(8), "cg", [[S(7), "calm"], [S(7) + 1.0, "look"]], []);
  // 4 NO ES NUEVO
  sc(S(8), S(9), "cg", [[S(8), "calm"], [S(8) + 2.4, "point"]], [
    [w("doc", S(8) + 0.8, { sc: 0.4 }), c("periódico", "grey", S(8) + 1.4), p("cup", S(8) + 2.0, { s: 0.4 }), c("leche", "grey", S(8) + 2.6)],
    [c("hace 100 años", "orange", S(8) + 5.0)]
  ], { wt: "no es nuevo" });
  sc(S(9), S(10), "cg", [[S(9), "give"], [S(9) + 2.4, "think"]], [
    [p("door", S(9) + 0.8, { s: 0.4 }), c("algo físico en tu puerta", "green", S(9) + 1.4)],
    [c("sabías qué pagabas", "green", S(9) + 4.6)]
  ], { wt: "antes" });
  sc(S(10), S(11), "cg", [[S(10), "look"], [S(10) + 2.4, "shrug"]], [
    [p("tv", S(10) + 0.8, { s: 0.4 }), c("televisión de paga", "orange", S(10) + 1.4)],
    [c("pagas sin recibir nada", "red", S(10) + 5.0)]
  ], { wt: "el cambio" });
  // 5 INTERNET Y EL CELULAR
  sc(S(11), S(12), "cg", [[S(11), "point"], [S(11) + 2.4, "cheer"]], [
    [p("laptop", S(11) + 0.8, { s: 0.4 }), c("cobrar cada mes", "orange", S(11) + 1.4)],
    [c("no una sola vez", "red", S(11) + 4.8, { x: "strike" })]
  ], { wt: "internet" });
  sc(S(12), S(13), "cg", [[S(12), "give"], [S(12) + 2.4, "look"]], [
    [c("programas", "grey", S(12) + 0.8), c("música", "grey", S(12) + 1.4), c("videojuegos", "grey", S(12) + 2.0)],
    [c("ahora se rentan", "red", S(12) + 4.6)]
  ], { wt: "antes los comprabas" });
  sc(S(13), S(14), "cg", [[S(13), "phone"], [S(13) + 2.4, "worry"]], [
    [p("phone", S(13) + 0.8, { s: 0.4 }), c("cada app cobra", "orange", S(13) + 1.4)],
    [c("un poquito cada mes", "red", S(13) + 4.6)]
  ], { wt: "el celular" });
  // 6 POR QUÉ LES ENCANTA
  sc(S(14), S(15), "cg", [[S(14), "cheer"], [S(14) + 2.4, "point"]], [
    [c("pagas cada mes", "orange", S(14) + 0.8)],
    [c("aunque no lo uses", "red", S(14) + 4.8, { x: "stamp" })]
  ], { wt: "para la empresa" });
  sc(S(15), S(16), "cg", [[S(15), "shrug"], [S(15) + 1.8, "look"]], [
    [c("cobro automático", "grey", S(15) + 0.6), c("nadie cancela", "red", S(15) + 1.2)]
  ], { wt: "el truco" });
  sc(S(16), S(17), "cg", [[S(16), "think"], [S(16) + 2.4, "point"]], [
    [c("decidir activamente", "green", S(16) + 0.8)],
    [big("4 veces más cancelan", "green", S(16) + 4.6)]
  ], { wt: "un estudio" });
  sc(S(17), S(18), "cg", [[S(17), "worry"], [S(17) + 2.4, "slump"]], [
    [c("clientes que olvidan", "red", S(17) + 0.8)],
    [big("hasta el triple", "orange", S(17) + 4.2)]
  ], { wt: "la ganancia" });
  // 7 EL CASO DE ADOBE
  sc(S(18), S(19), "cg", [[S(18), "look"], [S(18) + 1.6, "point"]], [
    [c("Adobe: Photoshop", "orange", S(18) + 0.6)]
  ], { wt: "un ejemplo" });
  sc(S(19), S(20), "cg", [[S(19), "give"], [S(19) + 2.4, "shrug"]], [
    [c("compra una vez", "green", S(19) + 0.8, { x: "strike" })],
    [big("2012", "orange", S(19) + 4.6), c("suscripción", "red", S(19) + 5.2)]
  ], { wt: "el cambio" });
  sc(S(20), S(21), "cg", [[S(20), "cheer"], [S(20) + 2.4, "think"]], [
    [w("bars", S(20) + 0.8, { sc: 0.4 }), big("+$21 mil millones", "green", S(20) + 1.4)],
    [c("5 veces más que antes", "orange", S(20) + 5.0)]
  ], { wt: "2024" });
  // 8 LA CUENTA QUE NADIE HACE
  sc(S(21), S(22), "cg", [[S(21), "point"], [S(21) + 2.4, "think"]], [
    [c("mensualidad pequeña", "green", S(21) + 0.8)],
    [c("nadie hace la cuenta", "red", S(21) + 4.4)]
  ], { wt: "el truco" });
  sc(S(22), S(23), "cg", [[S(22), "phone"], [S(22) + 2.2, "give"]], [
    [p("laptop", S(22) + 0.7, { s: 0.4 }), big("$129 al mes", "orange", S(22) + 1.3)]
  ], { wt: "computadora rentada" });
  sc(S(23), S(24), "cg", [[S(23), "worry"], [S(23) + 1.8, "slump"]], [
    [p("calendar", S(23) + 0.6, { s: 0.4 }), c("15 meses: ya la pagaste", "red", S(23) + 1.2)]
  ], { wt: "la cuenta" });
  sc(S(24), S(25), "cg", [[S(24), "sitStress"], [S(24) + 2.4, "shrug"]], [
    [c("5 años", "grey", S(24) + 0.8), big("≈ $7,700", "red", S(24) + 1.4)],
    [c("¡4 computadoras!", "red", S(24) + 4.8)]
  ], { wt: "a la larga" });
  // 9 CANCELAR ES UN LABERINTO
  sc(S(25), S(26), "cg", [[S(25), "cheer"], [S(25) + 1.8, "worry"]], [
    [c("suscribirte: 1 clic", "green", S(25) + 0.6), c("cancelar: laberinto", "red", S(25) + 2.6)]
  ], { wt: "la salida" });
  sc(S(26), S(27), "cg", [[S(26), "phone"], [S(26) + 2.4, "sitStress"]], [
    [c("botón escondido", "red", S(26) + 0.8), c("llama por teléfono", "red", S(26) + 1.4)],
    [c("multa por salirte", "red", S(26) + 4.8)]
  ], { wt: "los trucos" });
  sc(S(27), S(28), "cg", [[S(27), "point"], [S(27) + 2.4, "look"]], [
    [p("building", S(27) + 0.8, { s: 0.4 }), c("demanda del gobierno", "orange", S(27) + 1.4)],
    [c("Amazon", "grey", S(27) + 4.8), c("Adobe", "grey", S(27) + 5.4)]
  ], { wt: "en Estados Unidos" });
  // 10 YA NO ERES DUEÑO
  sc(S(28), S(29), "cg", [[S(28), "think"], [S(28) + 2.4, "worry"]], [
    [c("no es el dinero", "grey", S(28) + 0.8, { x: "strike" })],
    [big("ya no eres dueño", "red", S(28) + 4.6)]
  ], { wt: "lo más grave" });
  sc(S(29), S(30), "cg", [[S(29), "look"], [S(29) + 2.4, "point"]], [
    [c("impresoras", "grey", S(29) + 0.8), c("cámaras", "grey", S(29) + 1.4), p("car", S(29) + 2.0, { s: 0.4 })],
    [c("funciones bloqueadas", "red", S(29) + 5.2)]
  ], { wt: "hoy" });
  sc(S(30), S(31), "cg", [[S(30), "shrug"], [S(30) + 2.4, "slump"]], [
    [p("chair", S(30) + 0.8, { s: 0.4 }), c("asientos con calefacción", "orange", S(30) + 1.4)],
    [c("ya instalados, pero de paga", "red", S(30) + 5.0)]
  ], { wt: "en algunos coches" });
  sc(S(31), S(32), "cg", [[S(31), "give"], [S(31) + 2.4, "worry"]], [
    [c("sin copia", "red", S(31) + 0.8)],
    [c("no prestas", "red", S(31) + 4.6), c("no vendes", "red", S(31) + 5.2), c("no heredas", "red", S(31) + 5.8)]
  ], { wt: "música y películas" });
  // 11 LA RESISTENCIA
  sc(S(32), S(33), "cg", [[S(32), "cheer"], [S(32) + 1.8, "look"]], [
    [c("regreso a lo físico", "green", S(32) + 0.6)]
  ], { wt: "la resistencia" });
  sc(S(33), S(34), "cg", [[S(33), "sitRelaxed"], [S(33) + 2.4, "point"]], [
    [w("coin", S(33) + 0.8, { sc: 0.4 }), c("vinilos al alza", "green", S(33) + 1.4)],
    [c("tiendas de películas en disco", "green", S(33) + 5.0)]
  ], { wt: "lo físico vuelve" });
  sc(S(34), S(35), "cg", [[S(34), "give"], [S(34) + 2.4, "cheer"]], [
    [c("pago único", "green", S(34) + 0.8)],
    [c("y les va muy bien", "green", S(34) + 4.6)]
  ], { wt: "algunas empresas" });
  // 12 CÓMO DEFENDERTE
  sc(S(35), S(36), "cg", [[S(35), "phone"], [S(35) + 2.4, "think"]], [
    [c("1", "orange", S(35) + 0.8), w("doc", S(35) + 1.4, { sc: 0.4 }), c("lista de suscripciones", "green", S(35) + 2.0)]
  ], { wt: "regla 1" });
  sc(S(36), S(37), "cg", [[S(36), "point"], [S(36) + 2.4, "give"]], [
    [c("2", "orange", S(36) + 0.8), c("mensualidad × 12", "orange", S(36) + 1.4)],
    [c("el costo real al año", "green", S(36) + 4.4)]
  ], { wt: "regla 2" });
  sc(S(37), S(38), "cg", [[S(37), "think"], [S(37) + 2.4, "calm"]], [
    [c("3", "orange", S(37) + 0.8), c("lo usarás años", "grey", S(37) + 1.4)],
    [c("mejor cómpralo", "green", S(37) + 4.6)]
  ], { wt: "regla 3" });
  sc(S(38), S(39), "cg", [[S(38), "phone"], [S(38) + 2.4, "cheer"]], [
    [c("4", "orange", S(38) + 0.8), c("prueba gratis", "grey", S(38) + 1.4)],
    [p("clock", S(38) + 4.6, { s: 0.4 }), c("alarma para cancelar", "green", S(38) + 5.2)]
  ], { wt: "regla 4" });
  // 13 CIERRE
  sc(S(39), S(40), "cg", [[S(39), "point"], [S(39) + 2.4, "calm"]], [
    [c("no son malas", "grey", S(39) + 0.8)],
    [c("pagar lo que no usas", "red", S(39) + 4.6), c("nunca tuyo", "red", S(39) + 5.4)]
  ], { wt: "resumen" });
  sc(S(40), S(41), "cg", [[S(40), "shrug"], [S(40) + 2.4, "think"]], [
    [c("la comodidad cuesta", "orange", S(40) + 0.8)],
    [c("haz la cuenta", "green", S(40) + 4.0)]
  ], { wt: "la lección" });
  sc(S(41), S(42), "cg", [[S(41), "calm"], [S(41) + 2.2, "look"]], [
    [c("contenido educativo", "grey", S(41) + 0.7)],
    [c("no es asesoría financiera", "orange", S(41) + 3.6)]
  ], { wt: "aviso" });
  sc(S(42), END, "cg", [[S(42), "cheer"], [S(42) + 2.4, "give"]], [
    [c("¿cuántas pagas?", "orange", S(42) + 0.7)],
    [c("cuéntame en comentarios", "green", S(42) + 4.4)]
  ], { wt: "tu turno" });

  root.SCENES = SC;
})(window);

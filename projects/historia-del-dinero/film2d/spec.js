/* La historia del dinero (global, con detalles de México) (Fábrica 2.0): the whole film as data. Times are REAL seconds of the narration (assets/audio/timeline.json).
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
  sc(0, S(1), "cg", [[S(0), "look"], [S(0) + 2.6, "shrug"]], []);
  sc(S(1), S(2), "cg", [[S(1), "give"], [S(1) + 2.6, "think"]], []);
  sc(S(2), S(3), "cg", [[S(2), "point"], [S(2) + 2.6, "cheer"]], []);
  // 2 DE QUÉ VA ESTO
  sc(S(3), S(4), "cg", [[S(3), "look"], [S(3) + 2.2, "point"]], [
    [c("conchas", "grey", S(3) + 0.7), sy("arrow", S(3) + 1.3, "grey"), p("phone", S(3) + 1.9, { s: 0.4 })]
  ], { wt: "la historia del dinero" });
  sc(S(4), S(5), "cg", [[S(4), "think"], [S(4) + 2.2, "give"]], [
    [c("¿por qué vale un papel?", "orange", S(4) + 0.7)],
    [c("¿quién decide cuánto hay?", "orange", S(4) + 3.6)]
  ], { wt: "hoy" });
  // 3 SUSCRÍBETE (recordatorio obligatorio)
  sc(S(5), S(6), "cg", [[S(5), "point"], [S(5) + 2.4, "cheer"]], [
    [big("SUSCRÍBETE", "red", S(5) + 4.6, { x: "stamp" })]
  ], { wt: "antes de arrancar" });
  sc(S(6), S(7), "cg", [[S(6), "sitRelaxed"], [S(6) + 2.2, "give"]], [
    [c("el dinero con palabras normales", "green", S(6) + 0.7)],
    [c("activa la campanita", "orange", S(6) + 3.8)]
  ], { wt: "cada semana" });
  sc(S(7), S(8), "cg", [[S(7), "calm"], [S(7) + 1.0, "look"]], []);
  // 4 ANTES DEL DINERO
  sc(S(8), S(9), "cg", [[S(8), "calm"], [S(8) + 2.4, "think"]], [
    [w("tally", S(8) + 0.7, { sc: 0.4 }), c("todos se conocían", "grey", S(8) + 1.3)],
    [c("¿quién le debe a quién?", "orange", S(8) + 4.6)]
  ], { wt: "al principio" });
  sc(S(9), S(10), "cg", [[S(9), "worry"], [S(9) + 2.2, "shrug"]], [
    [c("pueblos más grandes", "grey", S(9) + 0.7)],
    [c("demasiadas deudas", "red", S(9) + 3.2)]
  ], { wt: "problema" });
  sc(S(10), S(11), "cg", [[S(10), "give"], [S(10) + 2.4, "point"]], [
    [c("conchas", "green", S(10) + 0.8), c("plumas", "green", S(10) + 1.4), c("sal", "green", S(10) + 2.0)],
    [c("dientes de ballena", "orange", S(10) + 4.6)]
  ], { wt: "objetos como pago" });
  sc(S(11), S(12), "cg", [[S(11), "cheer"], [S(11) + 2.4, "look"]], [
    [big("cacao", "orange", S(11) + 0.8)],
    [c("la moneda mexica", "green", S(11) + 4.6)]
  ], { wt: "en México" });
  // 5 LAS MONEDAS
  sc(S(12), S(13), "cg", [[S(12), "point"], [S(12) + 2.2, "cheer"]], [
    [w("coin", S(12) + 0.7, { sc: 0.4 }), c("oro y plata", "orange", S(12) + 1.3)],
    [c("con el sello del rey", "green", S(12) + 3.8)]
  ], { wt: "las monedas" });
  sc(S(13), S(14), "cg", [[S(13), "give"], [S(13) + 2.2, "calm"]], [
    [c("el sello promete", "grey", S(13) + 0.7)],
    [c("todos confían", "green", S(13) + 3.6)]
  ], { wt: "el sello" });
  sc(S(14), S(15), "cg", [[S(14), "look"], [S(14) + 2.2, "point"]], [
    [c("el metal vale solo", "green", S(14) + 0.7)],
    [c("comercio con pueblos lejanos", "green", S(14) + 3.8)]
  ], { wt: "la ventaja" });
  sc(S(15), S(16), "cg", [[S(15), "worry"], [S(15) + 2.4, "shrug"]], [
    [c("monedas más delgadas", "red", S(15) + 0.8)],
    [c("metales baratos", "red", S(15) + 4.6, { x: "stamp" })]
  ], { wt: "la trampa" });
  // 6 LA PLATA DE MÉXICO
  sc(S(16), S(17), "cg", [[S(16), "cheer"], [S(16) + 2.4, "point"]], [
    [p("building", S(16) + 0.8, { s: 0.4 }), c("Casa de Moneda de México", "orange", S(16) + 1.4)],
    [big("1535", "orange", S(16) + 4.6), c("la primera de América", "green", S(16) + 5.4)]
  ], { wt: "México entra" });
  sc(S(17), S(18), "cg", [[S(17), "give"], [S(17) + 2.4, "look"]], [
    [w("coin", S(17) + 0.8, { sc: 0.4 }), c("el peso de plata", "orange", S(17) + 1.4)],
    [c("Europa", "green", S(17) + 4.2), c("China", "green", S(17) + 4.7), c("medio mundo", "green", S(17) + 5.2)]
  ], { wt: "moneda mundial" });
  sc(S(18), S(19), "cg", [[S(18), "point"], [S(18) + 2.4, "cheer"]], [
    [c("el dólar", "grey", S(18) + 0.8), c("se copió del peso", "orange", S(18) + 1.4)],
    [c("legal en Estados Unidos", "green", S(18) + 4.8)]
  ], { wt: "¿sabías?" });
  sc(S(19), S(20), "cg", [[S(19), "think"], [S(19) + 2.4, "worry"]], [
    [c("mucha plata a España", "orange", S(19) + 0.8)],
    [c("los precios suben", "red", S(19) + 4.6), c("nadie más rico", "red", S(19) + 5.4)]
  ], { wt: "efecto raro" });
  sc(S(20), S(21), "cg", [[S(20), "point"], [S(20) + 2.4, "look"]], [
    [big("INFLACIÓN", "red", S(20) + 0.8)],
    [c("mucho dinero", "orange", S(20) + 4.6), c("pocas cosas", "grey", S(20) + 5.2), c("todo sube", "red", S(20) + 5.8)]
  ], { wt: "se descubrió" });
  // 7 EL PAPEL
  sc(S(21), S(22), "cg", [[S(21), "slump"], [S(21) + 2.2, "cheer"]], [
    [w("bag", S(21) + 0.7, { sc: 0.4 }), c("costales de monedas", "red", S(21) + 1.3)],
    [c("China: papel moneda", "green", S(21) + 3.8)]
  ], { wt: "el papel" });
  sc(S(22), S(23), "cg", [[S(22), "think"], [S(22) + 2.2, "give"]], [
    [c("el papel no vale", "grey", S(22) + 0.7)],
    [c("se cambia por oro o plata", "green", S(22) + 3.8)]
  ], { wt: "confianza" });
  sc(S(23), S(24), "cg", [[S(23), "calm"], [S(23) + 2.2, "point"]], [
    [c("billetes", "grey", S(23) + 0.7), w("chain", S(23) + 1.3, { sc: 0.4 }), c("oro guardado", "orange", S(23) + 1.9)]
  ], { wt: "amarrados al oro" });
  sc(S(24), S(25), "cg", [[S(24), "shrug"], [S(24) + 2.4, "look"]], [
    [big("1971", "orange", S(24) + 0.8), c("se rompe el amarre", "red", S(24) + 1.4, { x: "stamp" })],
    [c("hoy: solo confianza", "green", S(24) + 4.6)]
  ], { wt: "el gran cambio" });
  // 8 LOS BANCOS
  sc(S(25), S(26), "cg", [[S(25), "point"], [S(25) + 2.2, "calm"]], [
    [p("building", S(25) + 0.7, { s: 0.4 }), c("guarda y presta", "grey", S(25) + 1.3)],
    [c("cobra intereses", "orange", S(25) + 3.8)]
  ], { wt: "los bancos" });
  sc(S(26), S(27), "cg", [[S(26), "think"], [S(26) + 2.4, "give"]], [
    [c("prestan más de lo que tienen", "orange", S(26) + 0.8)],
    [c("no todos sacan su dinero", "grey", S(26) + 4.8)]
  ], { wt: "el truco" });
  sc(S(27), S(28), "cg", [[S(27), "sitStress"], [S(27) + 2.4, "worry"]], [
    [c("todos el mismo día", "red", S(27) + 0.8)],
    [big("corrida bancaria", "red", S(27) + 4.8)]
  ], { wt: "el peligro" });
  sc(S(28), S(29), "cg", [[S(28), "calm"], [S(28) + 2.2, "cheer"]], [
    [p("shield", S(28) + 0.7, { s: 0.4 }), c("seguro de tus ahorros", "green", S(28) + 1.3)],
    [c("también en México", "green", S(28) + 4.0)]
  ], { wt: "hoy" });
  // 9 EL REY DÓLAR
  sc(S(29), S(30), "cg", [[S(29), "look"], [S(29) + 2.2, "point"]], [
    [big("$ dólar", "green", S(29) + 0.7)],
    [c("todos lo quieren guardar", "orange", S(29) + 3.6)]
  ], { wt: "el rey" });
  sc(S(30), S(31), "cg", [[S(30), "shrug"], [S(30) + 2.4, "give"]], [
    [c("sin oro detrás", "red", S(30) + 0.8, { x: "strike" })],
    [c("confianza compartida", "green", S(30) + 4.6)]
  ], { wt: "¿por qué vale?" });
  // 10 LOS CEROS DEL PESO
  sc(S(31), S(32), "cg", [[S(31), "think"], [S(31) + 2.2, "worry"]], [
    [c("cuando se pierde la confianza", "red", S(31) + 0.7)]
  ], { wt: "en México" });
  sc(S(32), S(33), "cg", [[S(32), "sitStress"], [S(32) + 2.4, "slump"]], [
    [c("crisis de los ochenta", "red", S(32) + 0.8)],
    [w("stairs", S(32) + 4.6, { n: 5, sc: 0.4 }), c("billetes de miles", "red", S(32) + 5.2)]
  ], { wt: "los precios suben" });
  sc(S(33), S(34), "cg", [[S(33), "point"], [S(33) + 2.4, "cheer"]], [
    [big("1993", "orange", S(33) + 0.8), c("adiós tres ceros", "orange", S(33) + 1.4)],
    [c("$1,000 viejos = $1 nuevo", "green", S(33) + 4.8)]
  ], { wt: "nuevos pesos" });
  // 11 EL FUTURO
  sc(S(34), S(35), "cg", [[S(34), "phone"], [S(34) + 2.2, "give"]], [
    [c("menos efectivo", "grey", S(34) + 0.7)],
    [p("card", S(34) + 3.6, { s: 0.4 }), p("phone", S(34) + 4.2, { s: 0.4 })]
  ], { wt: "hoy" });
  sc(S(35), S(36), "cg", [[S(35), "look"], [S(35) + 2.4, "think"]], [
    [big("bitcoin", "orange", S(35) + 0.8)],
    [c("nadie lo imprime", "grey", S(35) + 4.2), c("cantidad limitada", "green", S(35) + 4.7)]
  ], { wt: "monedas digitales" });
  sc(S(36), S(37), "cg", [[S(36), "shrug"], [S(36) + 2.4, "point"]], [
    [c("¿impuestos con bitcoin?", "red", S(36) + 0.8)],
    [c("como las conchas", "grey", S(36) + 4.6)]
  ], { wt: "todavía no" });
  // 12 CIERRE
  sc(S(37), S(38), "cg", [[S(37), "give"], [S(37) + 2.4, "calm"]], [
    [c("cacao", "orange", S(37) + 0.8), sy("arrow", S(37) + 1.4, "grey"), c("celular", "green", S(37) + 2.0)],
    [big("una promesa", "green", S(37) + 4.8)]
  ], { wt: "resumen" });
  sc(S(38), S(39), "cg", [[S(38), "point"], [S(38) + 2.2, "cheer"]], [
    [big("$500", "green", S(38) + 0.7)],
    [c("millones creen que los vale", "green", S(38) + 3.6)]
  ], { wt: "tu billete" });
  sc(S(39), S(40), "cg", [[S(39), "think"], [S(39) + 2.4, "point"]], [
    [c("la inflación se come tus ahorros", "red", S(39) + 0.8)],
    [c("ponlos a trabajar", "green", S(39) + 4.6)]
  ], { wt: "para ti" });
  sc(S(40), S(41), "cg", [[S(40), "shrug"], [S(40) + 2.2, "look"]], [
    [c("contenido educativo", "grey", S(40) + 0.7)],
    [c("no es asesoría financiera", "orange", S(40) + 3.6)]
  ], { wt: "aviso" });
  sc(S(41), END, "cg", [[S(41), "cheer"], [S(41) + 2.4, "give"]], [
    [c("¿qué no conocías?", "orange", S(41) + 0.7)],
    [c("cuéntame en comentarios", "green", S(41) + 4.4)]
  ], { wt: "tu turno" });

  root.SCENES = SC;
})(window);

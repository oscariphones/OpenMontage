/* Los trucos del supermercado (global) (Fábrica 2.0): the whole film as data. Times are REAL seconds of the narration (assets/audio/timeline.json).
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
  sc(0, S(1), "cg", [[S(0), "cheer"], [S(0) + 2.8, "shrug"]], []);
  sc(S(1), S(2), "cg", [[S(1), "calm"], [S(1) + 1.8, "point"]], []);
  sc(S(2), S(3), "cg", [[S(2), "look"], [S(2) + 2.4, "think"]], []);
  // 2 DE QUÉ VA ESTO
  sc(S(3), S(4), "cg", [[S(3), "point"], [S(3) + 1.8, "give"]], [
    [p("cart", S(3) + 0.6, { s: 0.4 }), c("los trucos, uno por uno", "orange", S(3) + 1.2)]
  ], { wt: "el tema de hoy" });
  sc(S(4), S(5), "cg", [[S(4), "think"], [S(4) + 2.2, "cheer"]], [
    [c("salir solo con lo necesario", "green", S(4) + 0.7)]
  ], { wt: "al final" });
  // 3 SUSCRÍBETE (recordatorio obligatorio)
  sc(S(5), S(6), "cg", [[S(5), "point"], [S(5) + 1.8, "cheer"]], [
    [big("SUSCRÍBETE", "red", S(5) + 3.6, { x: "stamp" })]
  ], { wt: "antes de seguir" });
  sc(S(6), S(7), "cg", [[S(6), "sitRelaxed"], [S(6) + 1.8, "give"]], [
    [c("activa la campanita", "orange", S(6) + 0.6)]
  ], { wt: "cada semana" });
  sc(S(7), S(8), "cg", [[S(7), "calm"], [S(7) + 1.4, "cheer"]], []);
  // 4 LA LECHE HASTA EL FONDO
  sc(S(8), S(9), "cg", [[S(8), "think"], [S(8) + 2.4, "look"]], [
    [c("leche", "orange", S(8) + 0.8), c("huevos", "orange", S(8) + 1.4)],
    [c("¿por qué hasta el fondo?", "red", S(8) + 4.2)]
  ], { wt: "la pregunta" });
  sc(S(9), S(10), "cg", [[S(9), "point"], [S(9) + 1.8, "give"]], [
    [c("lo que más se busca", "green", S(9) + 0.6)]
  ], { wt: "porque" });
  sc(S(10), S(11), "cg", [[S(10), "shrug"], [S(10) + 1.4, "point"]], [
    [c("en la entrada: compras y te vas", "grey", S(10) + 0.5)]
  ], { wt: "si no fuera así" });
  sc(S(11), S(12), "cg", [[S(11), "give"], [S(11) + 2.2, "think"]], [
    [c("atraviesas toda la tienda", "orange", S(11) + 0.7)],
    [p("cart", S(11) + 3.4, { s: 0.4 }), c("cientos de productos", "orange", S(11) + 4.0)]
  ], { wt: "al ponerlas lejos" });
  sc(S(12), S(13), "cg", [[S(12), "cheer"], [S(12) + 1.4, "worry"]], [
    [c("algo se te antoja", "red", S(12) + 0.5)]
  ], { wt: "en el camino" });
  // 5 EL CARRITO GRANDE
  sc(S(13), S(14), "cg", [[S(13), "point"], [S(13) + 1.4, "give"]], [
    [p("cart", S(13) + 0.5, { s: 0.4 }), c("truco 2: el carrito", "orange", S(13) + 1.1)]
  ], { wt: "en tus manos" });
  sc(S(14), S(15), "cg", [[S(14), "look"], [S(14) + 2.0, "shrug"]], [
    [c("más grande, se siente más vacío", "orange", S(14) + 0.7)]
  ], { wt: "el tamaño" });
  sc(S(15), S(16), "cg", [[S(15), "worry"], [S(15) + 2.0, "think"]], [
    [c("«me falta algo»", "red", S(15) + 0.7)]
  ], { wt: "la sensación" });
  sc(S(16), S(17), "cg", [[S(16), "give"], [S(16) + 2.0, "point"]], [
    [c("carritos enormes", "red", S(16) + 0.7), c("canastas", "grey", S(16) + 1.3, { x: "strike" })]
  ], { wt: "por eso" });
  // 6 LOS ESTANTES
  sc(S(17), S(18), "cg", [[S(17), "look"], [S(17) + 1.2, "point"]], [
    [c("truco 3: los estantes", "orange", S(17) + 0.5)]
  ], { wt: "ahora mira" });
  sc(S(18), S(19), "cg", [[S(18), "point"], [S(18) + 2.2, "think"]], [
    [w("eye", S(18) + 0.7, { sc: 0.4 }), c("lo que les conviene", "red", S(18) + 1.3)]
  ], { wt: "a la altura de tus ojos" });
  sc(S(19), S(20), "cg", [[S(19), "give"], [S(19) + 2.4, "cheer"]], [
    [c("lo más barato", "green", S(19) + 0.8)],
    [c("más abajo o hasta arriba", "green", S(19) + 4.4)]
  ], { wt: "donde casi nadie mira" });
  sc(S(20), S(21), "cg", [[S(20), "shrug"], [S(20) + 2.2, "worry"]], [
    [c("dulces y juguetes", "orange", S(20) + 0.7)],
    [c("a la altura de los niños", "red", S(20) + 3.8)]
  ], { wt: "y más bajito" });
  sc(S(21), S(22), "cg", [[S(21), "cheer"], [S(21) + 1.6, "point"]], [
    [c("mira arriba y abajo", "green", S(21) + 0.6)]
  ], { wt: "así ahorras" });
  // 7 EL PRECIO QUE TE ENGAÑA
  sc(S(22), S(23), "cg", [[S(22), "point"], [S(22) + 1.0, "look"]], []);
  sc(S(23), S(24), "cg", [[S(23), "think"], [S(23) + 2.4, "shrug"]], [
    [c("$99", "green", S(23) + 0.8), sy("neq", S(23) + 1.4, "grey"), c("$100", "red", S(23) + 2.0)],
    [c("solo cambia un peso", "grey", S(23) + 4.8)]
  ], { wt: "el truco del 99" });
  sc(S(24), S(25), "cg", [[S(24), "worry"], [S(24) + 2.2, "slump"]], [
    [big("2 × 1", "orange", S(24) + 0.7)],
    [c("¿necesitabas dos?", "red", S(24) + 3.8)]
  ], { wt: "la oferta" });
  sc(S(25), S(26), "cg", [[S(25), "shrug"], [S(25) + 2.2, "point"]], [
    [c("gastas más para ahorrar poco", "red", S(25) + 0.7)]
  ], { wt: "muchas veces" });
  sc(S(26), S(27), "cg", [[S(26), "give"], [S(26) + 2.4, "cheer"]], [
    [c("compara por kilo o litro", "green", S(26) + 0.8)],
    [w("doc", S(26) + 4.4, { sc: 0.4 }), c("las letras pequeñas", "grey", S(26) + 5.0)]
  ], { wt: "por eso" });
  // 8 LA SEDUCCIÓN DE LOS SENTIDOS
  sc(S(27), S(28), "cg", [[S(27), "look"], [S(27) + 1.2, "point"]], [
    [c("no solo con los ojos", "orange", S(27) + 0.5)]
  ], { wt: "los sentidos" });
  sc(S(28), S(29), "cg", [[S(28), "cheer"], [S(28) + 1.8, "think"]], [
    [c("olor a pan", "orange", S(28) + 0.6), c("más hambre", "red", S(28) + 1.2)]
  ], { wt: "el olor" });
  sc(S(29), S(30), "cg", [[S(29), "calm"], [S(29) + 2.2, "sitRelaxed"]], [
    [c("música tranquila", "green", S(29) + 0.7)],
    [c("caminas despacio, miras más", "orange", S(29) + 4.2)]
  ], { wt: "la música" });
  sc(S(30), S(31), "cg", [[S(30), "give"], [S(30) + 2.4, "cheer"]], [
    [c("frutas en la entrada", "green", S(30) + 0.8)],
    [c("fresco y sano", "green", S(30) + 4.2)]
  ], { wt: "los colores" });
  // 9 LA ÚLTIMA TRAMPA
  sc(S(31), S(32), "cg", [[S(31), "point"], [S(31) + 1.8, "worry"]], [
    [c("la caja", "red", S(31) + 2.6)]
  ], { wt: "la última trampa" });
  sc(S(32), S(33), "cg", [[S(32), "slump"], [S(32) + 2.4, "shrug"]], [
    [c("cerebro cansado", "red", S(32) + 0.8)],
    [c("más fácil decir que sí", "red", S(32) + 4.2)]
  ], { wt: "después de decidir tanto" });
  sc(S(33), S(34), "cg", [[S(33), "give"], [S(33) + 2.4, "point"]], [
    [c("chicles", "orange", S(33) + 0.8), c("chocolates", "orange", S(33) + 1.4), c("revistas", "orange", S(33) + 2.0)]
  ], { wt: "a un paso de tu mano" });
  sc(S(34), S(35), "cg", [[S(34), "think"], [S(34) + 1.8, "worry"]], [
    [w("stack", S(34) + 0.6, { sc: 0.4 }), c("cada semana se suman", "red", S(34) + 1.2)]
  ], { wt: "compras pequeñas" });
  // 10 TU PLAN
  sc(S(35), S(36), "cg", [[S(35), "think"], [S(35) + 1.4, "point"]], [
    [c("¿cómo te defiendes?", "orange", S(35) + 0.5)]
  ], { wt: "tu plan" });
  sc(S(36), S(37), "cg", [[S(36), "point"], [S(36) + 2.4, "give"]], [
    [w("doc", S(36) + 0.8, { sc: 0.4 }), c("1. haz una lista", "green", S(36) + 1.4)],
    [c("sin agregar nada", "grey", S(36) + 4.4)]
  ], { wt: "regla 1" });
  sc(S(37), S(38), "cg", [[S(37), "cheer"], [S(37) + 1.4, "worry"]], [
    [c("2. nunca con hambre", "green", S(37) + 0.5)]
  ], { wt: "regla 2" });
  sc(S(38), S(39), "cg", [[S(38), "give"], [S(38) + 2.2, "calm"]], [
    [p("cart", S(38) + 0.7, { s: 0.4 }), c("3. usa una canasta", "green", S(38) + 1.3)]
  ], { wt: "regla 3" });
  sc(S(39), S(40), "cg", [[S(39), "phone"], [S(39) + 2.4, "point"]], [
    [w("statement", S(39) + 0.8, { sc: 0.4 }), c("4. revisa la cuenta", "green", S(39) + 1.4)],
    [c("¿cuánto en antojos?", "orange", S(39) + 4.4)]
  ], { wt: "regla 4" });
  // 11 LA LECCIÓN
  sc(S(40), S(41), "cg", [[S(40), "point"], [S(40) + 2.2, "think"]], [
    [c("no te engaña", "grey", S(40) + 0.7)],
    [c("quiere venderte más", "orange", S(40) + 3.8)]
  ], { wt: "la lección" });
  sc(S(41), S(42), "cg", [[S(41), "cheer"], [S(41) + 2.2, "give"]], [
    [c("tú decides tu dinero", "green", S(41) + 0.7)]
  ], { wt: "cuando conoces los trucos" });
  // 12 CIERRE
  sc(S(42), S(43), "cg", [[S(42), "calm"], [S(42) + 2.0, "point"]], [
    [c("ya sabes por qué está ahí", "green", S(42) + 0.7)]
  ], { wt: "la próxima vez" });
  sc(S(43), S(44), "cg", [[S(43), "calm"], [S(43) + 2.2, "look"]], [
    [c("contenido educativo", "grey", S(43) + 0.7)],
    [c("cada tienda es distinta", "orange", S(43) + 3.8)]
  ], { wt: "aviso" });
  sc(S(44), END, "cg", [[S(44), "cheer"], [S(44) + 2.2, "give"]], [
    [c("¿cuál te hizo caer?", "orange", S(44) + 0.7)],
    [c("cuéntame en comentarios", "green", S(44) + 3.8)]
  ], { wt: "tu turno" });

  root.SCENES = SC;
})(window);

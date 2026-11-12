/* Cómo gana dinero un cine (global) (Fábrica 2.0): the whole film as data. Times are REAL seconds of the narration (assets/audio/timeline.json).
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
  sc(0, S(1), "cg", [[S(0), "give"], [S(0) + 3.0, "shrug"]], []);
  sc(S(1), S(2), "cg", [[S(1), "point"], [S(1) + 2.0, "cheer"]], []);
  sc(S(2), S(3), "cg", [[S(2), "worry"], [S(2) + 2.2, "think"]], []);
  // 2 DE QUÉ VA ESTO
  sc(S(3), S(4), "cg", [[S(3), "look"], [S(3) + 1.8, "point"]], [
    [p("tv", S(3) + 0.6, { s: 0.4 }), c("cómo gana un cine", "orange", S(3) + 1.2)]
  ], { wt: "el tema de hoy" });
  sc(S(4), S(5), "cg", [[S(4), "think"], [S(4) + 2.4, "give"]], [
    [c("el mediano es una trampa", "red", S(4) + 0.8)]
  ], { wt: "y además" });
  // 3 SUSCRÍBETE (recordatorio obligatorio)
  sc(S(5), S(6), "cg", [[S(5), "point"], [S(5) + 2.0, "cheer"]], [
    [big("SUSCRÍBETE", "red", S(5) + 4.0, { x: "stamp" })]
  ], { wt: "antes de seguir" });
  sc(S(6), S(7), "cg", [[S(6), "sitRelaxed"], [S(6) + 1.8, "give"]], [
    [c("activa la campanita", "orange", S(6) + 0.6)]
  ], { wt: "cada semana" });
  sc(S(7), S(8), "cg", [[S(7), "phone"], [S(7) + 1.8, "sitRelaxed"]], []);
  // 4 EL BOLETO NO ES PARA EL CINE
  sc(S(8), S(9), "cg", [[S(8), "give"], [S(8) + 2.2, "point"]], [
    [c("tu boleto", "grey", S(8) + 0.7), c("se reparte con el estudio", "orange", S(8) + 1.3)]
  ], { wt: "el boleto" });
  sc(S(9), S(10), "cg", [[S(9), "worry"], [S(9) + 2.4, "slump"]], [
    [p("calendar", S(9) + 0.8, { s: 0.4 }), c("primeras semanas", "grey", S(9) + 1.4)],
    [big("más de la mitad", "red", S(9) + 4.0)]
  ], { wt: "el estudio se lleva" });
  sc(S(10), S(11), "cg", [[S(10), "sitStress"], [S(10) + 2.4, "worry"]], [
    [c("renta", "red", S(10) + 0.8), c("luz", "red", S(10) + 1.4)],
    [c("aire acondicionado", "red", S(10) + 2.0), c("empleados", "red", S(10) + 2.6)]
  ], { wt: "con lo que queda" });
  sc(S(11), S(12), "cg", [[S(11), "slump"], [S(11) + 2.0, "shrug"]], [
    [c("casi no alcanza", "red", S(11) + 0.7)]
  ], { wt: "solo con boletos" });
  // 5 LA MINA DE ORO DE LA DULCERÍA
  sc(S(12), S(13), "cg", [[S(12), "cheer"], [S(12) + 2.4, "point"]], [
    [p("cup", S(12) + 0.8, { s: 0.4 }), c("casi todo para el cine", "green", S(12) + 1.4)]
  ], { wt: "la dulcería" });
  sc(S(13), S(14), "cg", [[S(13), "give"], [S(13) + 2.2, "think"]], [
    [c("maíz", "grey", S(13) + 0.7), c("aceite", "grey", S(13) + 1.2), c("sal", "grey", S(13) + 1.7)],
    [big("cuesta muy poquito", "green", S(13) + 3.4)]
  ], { wt: "un bote de palomitas" });
  sc(S(14), S(15), "cg", [[S(14), "cheer"], [S(14) + 2.2, "point"]], [
    [w("stairs", S(14) + 0.7, { n: 4, sc: 0.4 }), c("muchas veces su costo", "orange", S(14) + 1.3)]
  ], { wt: "y te lo vende" });
  sc(S(15), S(16), "cg", [[S(15), "point"], [S(15) + 2.2, "give"]], [
    [w("stack", S(15) + 0.7, { sc: 0.4 }), c("gran parte de las ganancias", "green", S(15) + 1.3)]
  ], { wt: "por eso" });
  // 6 UNA HISTORIA CURIOSA
  sc(S(16), S(17), "cg", [[S(16), "think"], [S(16) + 2.0, "shrug"]], [
    [c("no querían palomitas", "red", S(16) + 0.7)]
  ], { wt: "lo curioso" });
  sc(S(17), S(18), "cg", [[S(17), "look"], [S(17) + 2.4, "worry"]], [
    [c("lugares elegantes", "grey", S(17) + 0.8)],
    [c("ensuciaban todo", "red", S(17) + 4.0)]
  ], { wt: "hace un siglo" });
  sc(S(18), S(19), "cg", [[S(18), "slump"], [S(18) + 2.6, "cheer"]], [
    [c("poco dinero", "red", S(18) + 1.0)],
    [c("un antojo baratísimo", "green", S(18) + 4.6)]
  ], { wt: "la Gran Depresión" });
  sc(S(19), S(20), "cg", [[S(19), "cheer"], [S(19) + 2.4, "give"]], [
    [c("sobrevivieron mejor", "green", S(19) + 0.8)]
  ], { wt: "los que las vendieron" });
  // 7 EL TRUCO DEL TAMAÑO MEDIANO
  sc(S(20), S(21), "cg", [[S(20), "look"], [S(20) + 1.8, "point"]], [
    [c("chico", "grey", S(20) + 0.6), c("mediano", "orange", S(20) + 1.2), c("grande", "green", S(20) + 1.8)]
  ], { wt: "los tamaños" });
  sc(S(21), S(22), "cg", [[S(21), "think"], [S(21) + 2.4, "point"]], [
    [c("chico: caro para lo que trae", "red", S(21) + 0.8)],
    [c("grande: solo un poco más", "green", S(21) + 4.4)]
  ], { wt: "fíjate" });
  sc(S(22), S(23), "cg", [[S(22), "point"], [S(22) + 2.0, "cheer"]], [
    [c("el grande parece ganga", "orange", S(22) + 0.7)]
  ], { wt: "el mediano" });
  sc(S(23), S(24), "cg", [[S(23), "give"], [S(23) + 2.2, "think"]], [
    [big("efecto señuelo", "orange", S(23) + 0.8)]
  ], { wt: "se llama" });
  sc(S(24), S(25), "cg", [[S(24), "sitStress"], [S(24) + 2.2, "slump"]], [
    [p("cart", S(24) + 0.7, { s: 0.4 }), c("compras el grande", "red", S(24) + 1.3)]
  ], { wt: "así terminas" });
  // 8 POR QUÉ NO TE DEJAN METER COMIDA
  sc(S(25), S(26), "cg", [[S(25), "worry"], [S(25) + 2.4, "think"]], [
    [p("lunchbox", S(25) + 0.8, { s: 0.4 }), c("comida de fuera", "grey", S(25) + 1.4, { x: "strike" })]
  ], { wt: "ahora entiendes" });
  sc(S(26), S(27), "cg", [[S(26), "point"], [S(26) + 2.4, "give"]], [
    [c("no solo limpieza", "grey", S(26) + 0.8)],
    [c("la dulcería mantiene el negocio", "orange", S(26) + 3.8)]
  ], { wt: "la razón" });
  sc(S(27), S(28), "cg", [[S(27), "shrug"], [S(27) + 2.6, "worry"]], [
    [c("palomitas propias", "grey", S(27) + 1.0)],
    [c("boleto mucho más caro", "red", S(27) + 4.4)]
  ], { wt: "si todos llevaran" });
  // 9 LO QUE TE ENSEÑA
  sc(S(28), S(29), "cg", [[S(28), "think"], [S(28) + 1.0, "point"]], []);
  sc(S(29), S(30), "cg", [[S(29), "point"], [S(29) + 2.4, "give"]], [
    [c("1", "orange", S(29) + 0.8), c("ganan con lo que viene después", "orange", S(29) + 1.4)]
  ], { wt: "lección 1" });
  sc(S(30), S(31), "cg", [[S(30), "think"], [S(30) + 2.4, "point"]], [
    [c("2", "orange", S(30) + 0.8), c("compara precio por cantidad", "green", S(30) + 1.4)]
  ], { wt: "lección 2" });
  sc(S(31), S(32), "cg", [[S(31), "worry"], [S(31) + 2.2, "shrug"]], [
    [c("3", "orange", S(31) + 0.7), c("antojos chicos suman mucho", "red", S(31) + 1.3)]
  ], { wt: "lección 3" });
  // 10 LA LECCIÓN
  sc(S(32), S(33), "cg", [[S(32), "point"], [S(32) + 2.4, "think"]], [
    [c("lo que te atrae", "grey", S(32) + 0.8)],
    [c("no siempre paga las cuentas", "orange", S(32) + 3.6)]
  ], { wt: "la lección" });
  sc(S(33), S(34), "cg", [[S(33), "give"], [S(33) + 2.2, "cheer"]], [
    [c("ahí cuida tu dinero", "green", S(33) + 0.7)]
  ], { wt: "dónde gana de verdad" });
  // 11 CIERRE
  sc(S(34), S(35), "cg", [[S(34), "sitRelaxed"], [S(34) + 2.4, "cheer"]], [
    [p("cup", S(34) + 0.8, { s: 0.4 }), c("ya sabes quién ganó", "orange", S(34) + 1.4)]
  ], { wt: "la próxima vez" });
  sc(S(35), S(36), "cg", [[S(35), "calm"], [S(35) + 2.2, "look"]], [
    [c("contenido educativo", "grey", S(35) + 0.7)],
    [c("no es asesoría financiera", "orange", S(35) + 3.8)]
  ], { wt: "aviso" });
  sc(S(36), END, "cg", [[S(36), "cheer"], [S(36) + 2.4, "give"]], [
    [c("¿qué compras en el cine?", "orange", S(36) + 0.7)],
    [c("cuéntame en comentarios", "green", S(36) + 4.4)]
  ], { wt: "tu turno" });

  root.SCENES = SC;
})(window);

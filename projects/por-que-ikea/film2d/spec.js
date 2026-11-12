/* Por qué IKEA te hace armar tus muebles (global) (Fábrica 2.0): the whole film as data. Times are REAL seconds of the narration (assets/audio/timeline.json).
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
  sc(0, S(1), "cg", [[S(0), "give"], [S(0) + 3.0, "sitStress"]], []);
  sc(S(1), S(2), "cg", [[S(1), "shrug"], [S(1) + 2.0, "cheer"]], []);
  sc(S(2), S(3), "cg", [[S(2), "point"], [S(2) + 2.2, "think"]], []);
  // 2 DE QUÉ VA ESTO
  sc(S(3), S(4), "cg", [[S(3), "look"], [S(3) + 2.2, "point"]], [
    [p("box", S(3) + 0.7, { s: 0.4 }), c("muebles que armas tú", "orange", S(3) + 1.3)]
  ], { wt: "el tema de hoy" });
  sc(S(4), S(5), "cg", [[S(4), "think"], [S(4) + 2.0, "give"]], [
    [p("cart", S(4) + 0.7, { s: 0.4 }), c("compras de más", "red", S(4) + 1.3)]
  ], { wt: "y los trucos" });
  // 3 SUSCRÍBETE (recordatorio obligatorio)
  sc(S(5), S(6), "cg", [[S(5), "point"], [S(5) + 2.0, "cheer"]], [
    [big("SUSCRÍBETE", "red", S(5) + 4.0, { x: "stamp" })]
  ], { wt: "antes de seguir" });
  sc(S(6), S(7), "cg", [[S(6), "sitRelaxed"], [S(6) + 1.8, "give"]], [
    [c("activa la campanita", "orange", S(6) + 0.6)]
  ], { wt: "cada semana" });
  sc(S(7), S(8), "cg", [[S(7), "calm"], [S(7) + 1.2, "point"]], []);
  // 4 UNA MESA QUE NO CABÍA
  sc(S(8), S(9), "cg", [[S(8), "look"], [S(8) + 2.4, "point"]], [
    [p("calendar", S(8) + 0.8, { s: 0.4 }), c("Suecia, 1943", "grey", S(8) + 1.4)],
    [c("un joven de 17 años", "green", S(8) + 4.6)]
  ], { wt: "así empezó" });
  sc(S(9), S(10), "cg", [[S(9), "worry"], [S(9) + 2.4, "think"]], [
    [p("car", S(9) + 0.8, { s: 0.4 }), c("la mesa no cabe", "red", S(9) + 1.4)]
  ], { wt: "cuenta la historia" });
  sc(S(10), S(11), "cg", [[S(10), "give"], [S(10) + 2.0, "cheer"]], [
    [c("sin patas: sí cabe", "green", S(10) + 0.7)]
  ], { wt: "la solución" });
  sc(S(11), S(12), "cg", [[S(11), "point"], [S(11) + 2.2, "cheer"]], [
    [c("cambió cómo se venden muebles", "orange", S(11) + 0.7)]
  ], { wt: "una idea simple" });
  // 5 EL SECRETO DE LA CAJA PLANA
  sc(S(12), S(13), "cg", [[S(12), "shrug"], [S(12) + 2.2, "think"]], [
    [p("sofa", S(12) + 0.7, { s: 0.4 }), c("casi todo es aire", "red", S(12) + 1.3)]
  ], { wt: "un mueble armado" });
  sc(S(13), S(14), "cg", [[S(13), "point"], [S(13) + 2.2, "cheer"]], [
    [w("blocks", S(13) + 0.7, { sc: 0.4 }), c("muchos más por camión", "green", S(13) + 1.3)]
  ], { wt: "cajas planas" });
  sc(S(14), S(15), "cg", [[S(14), "give"], [S(14) + 2.0, "point"]], [
    [c("menos camiones", "green", S(14) + 0.6), c("menos bodegas", "green", S(14) + 1.2)],
    [c("menos roturas", "green", S(14) + 1.8)]
  ], { wt: "el ahorro" });
  sc(S(15), S(16), "cg", [[S(15), "cheer"], [S(15) + 2.0, "give"]], [
    [big("más barato", "green", S(15) + 1.6)]
  ], { wt: "por eso" });
  // 6 TÚ ERES EL EMPLEADO
  sc(S(16), S(17), "cg", [[S(16), "think"], [S(16) + 1.8, "point"]], [
    [big("TÚ", "orange", S(16) + 2.0, { x: "stamp" })]
  ], { wt: "el ahorro más grande" });
  sc(S(17), S(18), "cg", [[S(17), "give"], [S(17) + 2.4, "sitStress"]], [
    [c("escoges", "grey", S(17) + 0.7), c("cargas", "grey", S(17) + 1.3)],
    [c("transportas", "grey", S(17) + 2.0), c("armas", "orange", S(17) + 2.8)]
  ], { wt: "tu trabajo" });
  sc(S(18), S(19), "cg", [[S(18), "shrug"], [S(18) + 2.2, "think"]], [
    [c("otras tiendas pagan empleados", "grey", S(18) + 0.7)]
  ], { wt: "en otras tiendas" });
  sc(S(19), S(20), "cg", [[S(19), "slump"], [S(19) + 2.0, "shrug"]], [
    [c("trabajas gratis", "red", S(19) + 0.6), c("y pagas", "red", S(19) + 1.4)]
  ], { wt: "en IKEA" });
  // 7 EL EFECTO IKEA
  sc(S(20), S(21), "cg", [[S(20), "think"], [S(20) + 2.2, "look"]], [
    [c("lo que pasa en tu cabeza", "orange", S(20) + 0.7)]
  ], { wt: "lo más curioso" });
  sc(S(21), S(22), "cg", [[S(21), "point"], [S(21) + 2.4, "give"]], [
    [c("lo que armas tú", "green", S(21) + 0.8)],
    [c("lo valoras más", "green", S(21) + 4.2)]
  ], { wt: "los investigadores" });
  sc(S(22), S(23), "cg", [[S(22), "give"], [S(22) + 2.4, "cheer"]], [
    [p("box", S(22) + 0.8, { s: 0.4 }), c("pagaban más por su caja", "orange", S(22) + 1.4)]
  ], { wt: "el experimento" });
  sc(S(23), S(24), "cg", [[S(23), "cheer"], [S(23) + 1.6, "point"]], [
    [big("efecto IKEA", "orange", S(23) + 1.8)]
  ], { wt: "se llama" });
  sc(S(24), S(25), "cg", [[S(24), "sitRelaxed"], [S(24) + 2.4, "shrug"]], [
    [c("librero chueco", "grey", S(24) + 0.8)],
    [c("te parece el mejor", "green", S(24) + 4.0)]
  ], { wt: "por eso" });
  // 8 LA TIENDA LABERINTO
  sc(S(25), S(26), "cg", [[S(25), "look"], [S(25) + 1.8, "worry"]], [
    [c("pensada para que gastes", "red", S(25) + 0.6)]
  ], { wt: "la tienda" });
  sc(S(26), S(27), "cg", [[S(26), "point"], [S(26) + 2.4, "look"]], [
    [w("signpost", S(26) + 0.8, { sc: 0.4 }), c("un camino marcado", "orange", S(26) + 1.4)],
    [c("todas las secciones", "grey", S(26) + 4.4)]
  ], { wt: "el laberinto" });
  sc(S(27), S(28), "cg", [[S(27), "sitStress"], [S(27) + 2.2, "slump"]], [
    [p("door", S(27) + 0.7, { s: 0.4 }), c("miles de productos después", "orange", S(27) + 1.3)]
  ], { wt: "la salida" });
  sc(S(28), S(29), "cg", [[S(28), "give"], [S(28) + 2.4, "worry"]], [
    [c("velas", "grey", S(28) + 0.8), c("vasos", "grey", S(28) + 1.4)],
    [p("cart", S(28) + 4.0, { s: 0.4 }), c("sin planearlo", "red", S(28) + 4.6)]
  ], { wt: "en el camino" });
  // 9 LA COMIDA BARATA
  sc(S(29), S(30), "cg", [[S(29), "cheer"], [S(29) + 2.2, "sitRelaxed"]], [
    [p("lunchbox", S(29) + 0.7, { s: 0.4 }), c("comida muy barata", "green", S(29) + 1.3)]
  ], { wt: "al final" });
  sc(S(30), S(31), "cg", [[S(30), "think"], [S(30) + 2.4, "point"]], [
    [c("ganar mucho", "grey", S(30) + 0.8, { x: "strike" })],
    [c("que te quedes más", "orange", S(30) + 3.6)]
  ], { wt: "el objetivo" });
  sc(S(31), S(32), "cg", [[S(31), "cheer"], [S(31) + 2.0, "give"]], [
    [c("es probable que vuelvas", "green", S(31) + 0.7)]
  ], { wt: "buen sabor de boca" });
  // 10 LO QUE TE ENSEÑA
  sc(S(32), S(33), "cg", [[S(32), "think"], [S(32) + 1.0, "point"]], []);
  sc(S(33), S(34), "cg", [[S(33), "point"], [S(33) + 2.2, "give"]], [
    [c("1", "orange", S(33) + 0.7), c("barato = tú trabajas", "orange", S(33) + 1.3)]
  ], { wt: "lección 1" });
  sc(S(34), S(35), "cg", [[S(34), "calm"], [S(34) + 2.2, "point"]], [
    [c("2", "orange", S(34) + 0.7), c("lleva una lista", "green", S(34) + 1.3)]
  ], { wt: "lección 2" });
  sc(S(35), S(36), "cg", [[S(35), "shrug"], [S(35) + 2.2, "think"]], [
    [c("3", "orange", S(35) + 0.7), c("armarlo no lo hace valer más", "red", S(35) + 1.3)]
  ], { wt: "lección 3" });
  // 11 LA LECCIÓN
  sc(S(36), S(37), "cg", [[S(36), "point"], [S(36) + 2.4, "sitStress"]], [
    [c("vender más caro", "grey", S(36) + 0.8, { x: "strike" })],
    [c("ponerte a trabajar", "orange", S(36) + 4.2)]
  ], { wt: "la lección" });
  sc(S(37), S(38), "cg", [[S(37), "give"], [S(37) + 2.4, "cheer"]], [
    [c("aprovecha lo barato", "green", S(37) + 0.8)],
    [c("sin comprar de más", "green", S(37) + 3.8)]
  ], { wt: "si entiendes el truco" });
  // 12 CIERRE
  sc(S(38), S(39), "cg", [[S(38), "sitStress"], [S(38) + 2.4, "cheer"]], [
    [c("hiciste el trabajo de alguien", "orange", S(38) + 0.8)]
  ], { wt: "la próxima vez" });
  sc(S(39), S(40), "cg", [[S(39), "calm"], [S(39) + 1.8, "look"]], [
    [c("contenido educativo", "grey", S(39) + 0.6)],
    [c("no es asesoría financiera", "orange", S(39) + 1.4)]
  ], { wt: "aviso" });
  sc(S(40), END, "cg", [[S(40), "cheer"], [S(40) + 2.4, "give"]], [
    [c("¿el mueble más difícil?", "orange", S(40) + 0.7)],
    [c("cuéntame en comentarios", "green", S(40) + 4.4)]
  ], { wt: "tu turno" });

  root.SCENES = SC;
})(window);

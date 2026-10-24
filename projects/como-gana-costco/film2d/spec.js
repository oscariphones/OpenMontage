/* Cómo gana dinero Costco (global con detalles de México) (Fábrica 2.0): the whole film as data. Times are REAL seconds of the narration (assets/audio/timeline.json).
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
  sc(0, S(1), "cg", [[S(0), "think"], [S(0) + 2.0, "shrug"]], []);
  sc(S(1), S(2), "cg", [[S(1), "point"], [S(1) + 2.6, "cheer"]], []);
  sc(S(2), S(3), "cg", [[S(2), "look"], [S(2) + 2.2, "point"]], []);
  // 2 DE QUÉ VA ESTO
  sc(S(3), S(4), "cg", [[S(3), "look"], [S(3) + 2.2, "point"]], [
    [p("building", S(3) + 0.7, { s: 0.4 }), c("¿cómo gana Costco?", "orange", S(3) + 1.3)],
    [c("¿por qué es tan barato?", "grey", S(3) + 3.6)]
  ], { wt: "el tema de hoy" });
  sc(S(4), S(5), "cg", [[S(4), "think"], [S(4) + 2.2, "worry"]], [
    [p("cart", S(4) + 0.7, { s: 0.4 }), c("los trucos", "red", S(4) + 1.3)],
    [c("compras más de lo planeado", "red", S(4) + 3.8)]
  ], { wt: "y además" });
  // 3 SUSCRÍBETE (recordatorio obligatorio)
  sc(S(5), S(6), "cg", [[S(5), "point"], [S(5) + 2.4, "cheer"]], [
    [big("SUSCRÍBETE", "red", S(5) + 4.6, { x: "stamp" })]
  ], { wt: "antes de seguir" });
  sc(S(6), S(7), "cg", [[S(6), "sitRelaxed"], [S(6) + 2.2, "give"]], [
    [c("secretos del dinero", "green", S(6) + 0.7)],
    [c("activa la campanita", "orange", S(6) + 3.6)]
  ], { wt: "cada semana" });
  sc(S(7), S(8), "cg", [[S(7), "calm"], [S(7) + 1.0, "look"]], []);
  // 4 CÓMO EMPEZÓ
  sc(S(8), S(9), "cg", [[S(8), "look"], [S(8) + 2.4, "think"]], [
    [c("Sol Price", "orange", S(8) + 0.8), c("abogado", "grey", S(8) + 1.4)],
    [c("nunca tuvo una tienda", "grey", S(8) + 4.6)]
  ], { wt: "cómo empezó" });
  sc(S(9), S(10), "cg", [[S(9), "point"], [S(9) + 2.4, "give"]], [
    [p("building", S(9) + 0.8, { s: 0.4 }), c("bodega barata", "green", S(9) + 1.4)],
    [c("solo para socios", "orange", S(9) + 4.6)]
  ], { wt: "los años cincuenta" });
  sc(S(10), S(11), "cg", [[S(10), "cheer"], [S(10) + 2.4, "shrug"]], [
    [c("tan buena idea que…", "green", S(10) + 0.8)],
    [c("Walmart la copió", "orange", S(10) + 4.6)]
  ], { wt: "el éxito" });
  sc(S(11), S(12), "cg", [[S(11), "give"], [S(11) + 2.2, "calm"]], [
    [c("Price Club", "grey", S(11) + 0.7), c("Costco", "grey", S(11) + 1.3)],
    [big("1993: se unen", "orange", S(11) + 3.8)]
  ], { wt: "nace Costco" });
  // 5 EL SECRETO
  sc(S(12), S(13), "cg", [[S(12), "point"], [S(12) + 2.2, "look"]], [
    [c("casi no gana con productos", "red", S(12) + 0.7)]
  ], { wt: "el secreto" });
  sc(S(13), S(14), "cg", [[S(13), "think"], [S(13) + 2.2, "give"]], [
    [c("margen muy pequeño", "orange", S(13) + 0.7)],
    [c("menor que un súper", "grey", S(13) + 3.6)]
  ], { wt: "en cada producto" });
  sc(S(14), S(15), "cg", [[S(14), "cheer"], [S(14) + 2.2, "point"]], [
    [p("card", S(14) + 0.7, { s: 0.4 }), big("la membresía", "green", S(14) + 1.3)],
    [c("pagas por entrar", "orange", S(14) + 4.0)]
  ], { wt: "la ganancia real" });
  sc(S(15), S(16), "cg", [[S(15), "give"], [S(15) + 2.4, "calm"]], [
    [c("casi toda la ganancia", "green", S(15) + 0.8)],
    [c("cobrarla no cuesta nada", "green", S(15) + 4.6)]
  ], { wt: "durante años" });
  // 6 POR QUÉ ES TAN BARATO
  sc(S(16), S(17), "cg", [[S(16), "think"], [S(16) + 1.6, "shrug"]], [
    [c("¿barato y aun así gana?", "orange", S(16) + 0.6)]
  ], { wt: "entonces" });
  sc(S(17), S(18), "cg", [[S(17), "point"], [S(17) + 2.4, "look"]], [
    [c("1", "orange", S(17) + 0.8), c("Costco: ~4,000 productos", "green", S(17) + 1.4)],
    [c("súper gigante: +100,000", "grey", S(17) + 5.0)]
  ], { wt: "pocos productos" });
  sc(S(18), S(19), "cg", [[S(18), "give"], [S(18) + 2.4, "cheer"]], [
    [c("2", "orange", S(18) + 0.8), w("stack", S(18) + 1.4, { sc: 0.4 }), c("compra enorme", "orange", S(18) + 2.0)],
    [c("precios más bajos", "green", S(18) + 4.8)]
  ], { wt: "poder de compra" });
  sc(S(19), S(20), "cg", [[S(19), "calm"], [S(19) + 2.4, "point"]], [
    [c("3", "orange", S(19) + 0.8), c("bodegas", "grey", S(19) + 1.4), p("box", S(19) + 2.0, { s: 0.4 })],
    [c("casi sin decoración", "green", S(19) + 4.8)]
  ], { wt: "ahorra en todo" });
  // 7 EL HOT DOG
  sc(S(20), S(21), "cg", [[S(20), "cheer"], [S(20) + 2.4, "look"]], [
    [c("hot dog + refresco", "orange", S(20) + 0.8)],
    [big("$1.50", "green", S(20) + 4.6), c("desde 1985", "grey", S(20) + 5.4)]
  ], { wt: "el más famoso" });
  sc(S(21), S(22), "cg", [[S(21), "think"], [S(21) + 2.2, "give"]], [
    [c("no gana con él", "red", S(21) + 0.7)],
    [c("“aquí todo es barato”", "green", S(21) + 3.6)]
  ], { wt: "el mensaje" });
  sc(S(22), S(23), "cg", [[S(22), "point"], [S(22) + 2.2, "shrug"]], [
    [c("entras por el hot dog", "green", S(22) + 0.7)],
    [p("cart", S(22) + 3.2, { s: 0.4 }), c("sales con el carrito lleno", "red", S(22) + 3.8)]
  ], { wt: "el gancho" });
  // 8 KIRKLAND
  sc(S(23), S(24), "cg", [[S(23), "look"], [S(23) + 2.2, "point"]], [
    [big("Kirkland", "orange", S(23) + 0.7)],
    [c("del papel de baño al vino", "grey", S(23) + 3.8)]
  ], { wt: "su propia marca" });
  sc(S(24), S(25), "cg", [[S(24), "give"], [S(24) + 2.4, "cheer"]], [
    [c("no es la versión barata", "grey", S(24) + 0.8, { x: "strike" })],
    [c("buena calidad", "green", S(24) + 4.6), c("confías en ella", "green", S(24) + 5.2)]
  ], { wt: "la clave" });
  sc(S(25), S(26), "cg", [[S(25), "point"], [S(25) + 2.4, "think"]], [
    [c("gran parte de sus ventas", "orange", S(25) + 0.8)],
    [c("solo ahí la encuentras", "green", S(25) + 4.6)]
  ], { wt: "hoy" });
  // 9 LA BÚSQUEDA DEL TESORO
  sc(S(26), S(27), "cg", [[S(26), "worry"], [S(26) + 1.6, "point"]], [
    [c("el truco que te afecta", "red", S(26) + 0.6)]
  ], { wt: "ojo" });
  sc(S(27), S(28), "cg", [[S(27), "look"], [S(27) + 2.4, "shrug"]], [
    [c("productos que aparecen", "green", S(27) + 0.8), c("y desaparecen", "red", S(27) + 1.6)],
    [p("calendar", S(27) + 4.6, { s: 0.4 }), c("¿el próximo mes?", "orange", S(27) + 5.2)]
  ], { wt: "inventario que rota" });
  sc(S(28), S(29), "cg", [[S(28), "cheer"], [S(28) + 2.4, "worry"]], [
    [big("búsqueda del tesoro", "orange", S(28) + 0.8)],
    [c("compras sin planear", "red", S(28) + 4.8)]
  ], { wt: "cada visita" });
  sc(S(29), S(30), "cg", [[S(29), "give"], [S(29) + 2.4, "slump"]], [
    [c("entras por papel de baño", "grey", S(29) + 0.8)],
    [p("tv", S(29) + 3.6, { s: 0.4 }), c("sales con una tele", "red", S(29) + 4.2)]
  ], { wt: "resultado" });
  // 10 EMPLEADOS FELICES
  sc(S(30), S(31), "cg", [[S(30), "cheer"], [S(30) + 2.2, "calm"]], [
    [c("pagan mejor", "green", S(30) + 0.7)],
    [c("que muchas tiendas", "grey", S(30) + 3.6)]
  ], { wt: "sus empleados" });
  sc(S(31), S(32), "cg", [[S(31), "point"], [S(31) + 2.4, "give"]], [
    [c("empleados contentos", "green", S(31) + 0.8), sy("arrow", S(31) + 1.4, "grey")],
    [c("clientes que renuevan", "green", S(31) + 4.6)]
  ], { wt: "la idea" });
  // 11 EN MÉXICO
  sc(S(32), S(33), "cg", [[S(32), "look"], [S(32) + 2.4, "point"]], [
    [big("1992", "orange", S(32) + 0.8), c("llega a México", "grey", S(32) + 1.4)],
    [c("~40 tiendas", "green", S(32) + 4.8)]
  ], { wt: "en México" });
  sc(S(33), S(34), "cg", [[S(33), "think"], [S(33) + 2.4, "shrug"]], [
    [c("Costco", "orange", S(33) + 0.8), c("vs", "grey", S(33) + 1.4), c("Sam's Club", "orange", S(33) + 2.0)],
    [c("la misma fórmula", "grey", S(33) + 5.0)]
  ], { wt: "la competencia" });
  sc(S(34), S(35), "cg", [[S(34), "sitRelaxed"], [S(34) + 2.4, "cheer"]], [
    [p("calendar", S(34) + 0.8, { s: 0.4 }), c("la vuelta mensual", "green", S(34) + 1.4)],
    [c("casi una tradición", "orange", S(34) + 4.4)]
  ], { wt: "en casa" });
  // 12 CÓMO APROVECHARLO
  sc(S(35), S(36), "cg", [[S(35), "point"], [S(35) + 2.4, "give"]], [
    [c("1", "orange", S(35) + 0.8), w("doc", S(35) + 1.4, { sc: 0.4 }), c("ve con lista", "green", S(35) + 2.0)]
  ], { wt: "regla 1" });
  sc(S(36), S(37), "cg", [[S(36), "think"], [S(36) + 2.4, "calm"]], [
    [c("2", "orange", S(36) + 0.8), c("mayoreo solo si lo usas", "green", S(36) + 1.4)],
    [c("antes de que se eche a perder", "grey", S(36) + 4.4)]
  ], { wt: "regla 2" });
  sc(S(37), S(38), "cg", [[S(37), "give"], [S(37) + 2.4, "worry"]], [
    [c("3", "orange", S(37) + 0.8), c("ahorro del año", "green", S(37) + 1.4), c("vs membresía", "orange", S(37) + 2.0)],
    [c("si ahorras menos, no conviene", "red", S(37) + 5.0)]
  ], { wt: "regla 3" });
  sc(S(38), S(39), "cg", [[S(38), "look"], [S(38) + 2.4, "point"]], [
    [c("4", "orange", S(38) + 0.8), p("clock", S(38) + 1.4, { s: 0.4 }), c("ofertas de un rato", "red", S(38) + 2.0)],
    [c("para comprar sin pensar", "red", S(38) + 4.8)]
  ], { wt: "regla 4" });
  // 13 CIERRE
  sc(S(39), S(40), "cg", [[S(39), "point"], [S(39) + 2.4, "think"]], [
    [c("no es una tienda barata", "grey", S(39) + 0.8, { x: "strike" })],
    [big("es un club", "orange", S(39) + 4.6)]
  ], { wt: "resumen" });
  sc(S(40), S(41), "cg", [[S(40), "give"], [S(40) + 2.4, "cheer"]], [
    [c("aprovecha los precios", "green", S(40) + 0.8)],
    [c("evita los trucos", "green", S(40) + 3.8)]
  ], { wt: "la lección" });
  sc(S(41), S(42), "cg", [[S(41), "calm"], [S(41) + 2.2, "look"]], [
    [c("contenido educativo", "grey", S(41) + 0.7)],
    [c("no es asesoría financiera", "orange", S(41) + 3.6)]
  ], { wt: "aviso" });
  sc(S(42), END, "cg", [[S(42), "cheer"], [S(42) + 2.4, "give"]], [
    [c("¿Costco o Sam's?", "orange", S(42) + 0.7)],
    [c("cuéntame en comentarios", "green", S(42) + 4.4)]
  ], { wt: "tu turno" });

  root.SCENES = SC;
})(window);

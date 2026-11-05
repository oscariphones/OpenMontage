/* Starbucks es un banco disfrazado de cafetería (global) (Fábrica 2.0): the whole film as data. Times are REAL seconds of the narration (assets/audio/timeline.json).
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
  sc(0, S(1), "cg", [[S(0), "point"], [S(0) + 2.2, "cheer"]], []);
  sc(S(1), S(2), "cg", [[S(1), "shrug"], [S(1) + 1.6, "worry"]], []);
  sc(S(2), S(3), "cg", [[S(2), "think"], [S(2) + 2.6, "point"]], []);
  // 2 DE QUÉ VA ESTO
  sc(S(3), S(4), "cg", [[S(3), "look"], [S(3) + 2.2, "point"]], [
    [p("cup", S(3) + 0.7, { s: 0.4 }), c("de dónde sale el dinero", "orange", S(3) + 1.3)],
    [c("por qué es tan buen negocio", "green", S(3) + 4.2)]
  ], { wt: "el tema de hoy" });
  sc(S(4), S(5), "cg", [[S(4), "think"], [S(4) + 2.0, "give"]], [
    [c("el mismo truco en todas partes", "orange", S(4) + 0.7)]
  ], { wt: "al final" });
  // 3 SUSCRÍBETE (recordatorio obligatorio)
  sc(S(5), S(6), "cg", [[S(5), "point"], [S(5) + 1.8, "cheer"]], [
    [big("SUSCRÍBETE", "red", S(5) + 3.8, { x: "stamp" })]
  ], { wt: "antes de seguir" });
  sc(S(6), S(7), "cg", [[S(6), "sitRelaxed"], [S(6) + 2.0, "give"]], [
    [c("negocios escondidos", "green", S(6) + 0.7)],
    [c("activa la campanita", "orange", S(6) + 3.8)]
  ], { wt: "cada semana" });
  sc(S(7), S(8), "cg", [[S(7), "calm"], [S(7) + 1.0, "cheer"]], []);
  // 4 LA TARJETA Y LA APP
  sc(S(8), S(9), "cg", [[S(8), "phone"], [S(8) + 2.2, "look"]], [
    [p("phone", S(8) + 0.7, { s: 0.4 }), c("pagan con la app", "green", S(8) + 1.3)]
  ], { wt: "en Starbucks" });
  sc(S(9), S(10), "cg", [[S(9), "give"], [S(9) + 2.4, "point"]], [
    [c("cargas $25", "orange", S(9) + 0.8)],
    [c("y gastas poco a poco", "grey", S(9) + 4.4)]
  ], { wt: "primero" });
  sc(S(10), S(11), "cg", [[S(10), "cheer"], [S(10) + 2.4, "phone"]], [
    [c("estrellas", "green", S(10) + 0.8), c("bebidas gratis", "green", S(10) + 1.4), c("ofertas", "green", S(10) + 2.0)],
    [c("para que regreses", "orange", S(10) + 5.2)]
  ], { wt: "los premios" });
  sc(S(11), S(12), "cg", [[S(11), "think"], [S(11) + 2.0, "point"]], [
    [c("¿buen trato?", "orange", S(11) + 0.7)]
  ], { wt: "pero mira" });
  // 5 EL DINERO POR ADELANTADO
  sc(S(12), S(13), "cg", [[S(12), "give"], [S(12) + 2.4, "point"]], [
    [w("coin", S(12) + 0.8, { sc: 0.4 }), c("el dinero llega hoy", "green", S(12) + 1.4)],
    [p("cup", S(12) + 4.0, { s: 0.4 }), c("el café, después", "grey", S(12) + 4.6)]
  ], { wt: "cuando cargas" });
  sc(S(13), S(14), "cg", [[S(13), "look"], [S(13) + 2.2, "cheer"]], [
    [c("× millones de clientes", "orange", S(13) + 0.7)]
  ], { wt: "ahora multiplica" });
  sc(S(14), S(15), "cg", [[S(14), "point"], [S(14) + 2.4, "cheer"]], [
    [w("stack", S(14) + 0.8, { sc: 0.4 }), big("+$1,500 millones", "green", S(14) + 1.4)],
    [c("cargados y sin gastar", "orange", S(14) + 5.4)]
  ], { wt: "en sus reportes" });
  sc(S(15), S(16), "cg", [[S(15), "give"], [S(15) + 2.0, "shrug"]], [
    [c("como un préstamo de sus clientes", "orange", S(15) + 0.7)]
  ], { wt: "es como si" });
  // 6 UN PRÉSTAMO SIN INTERESES
  sc(S(16), S(17), "cg", [[S(16), "point"], [S(16) + 1.2, "think"]], [
    [c("lo interesante", "orange", S(16) + 0.5)]
  ], { wt: "aquí está" });
  sc(S(17), S(18), "cg", [[S(17), "worry"], [S(17) + 2.0, "shrug"]], [
    [p("building", S(17) + 0.6, { s: 0.4 }), c("banco: pagas intereses", "red", S(17) + 1.2)]
  ], { wt: "si tú pides prestado" });
  sc(S(18), S(19), "cg", [[S(18), "cheer"], [S(18) + 2.4, "point"]], [
    [p("cup", S(18) + 0.8, { s: 0.4 }), c("Starbucks: 0 intereses", "green", S(18) + 1.4)]
  ], { wt: "pero Starbucks" });
  sc(S(19), S(20), "cg", [[S(19), "give"], [S(19) + 2.4, "look"]], [
    [c("lo usa para operar", "green", S(19) + 0.8)],
    [w("bars", S(19) + 3.8, { sc: 0.4 }), c("o para invertir", "green", S(19) + 4.4)]
  ], { wt: "mientras tanto" });
  sc(S(20), S(21), "cg", [[S(20), "cheer"], [S(20) + 2.0, "point"]], [
    [c("ajeno", "orange", S(20) + 0.7), c("gratis", "green", S(20) + 1.3), c("por adelantado", "green", S(20) + 1.9)]
  ], { wt: "el sueño de un negocio" });
  // 7 EL DINERO QUE NADIE USA
  sc(S(21), S(22), "cg", [[S(21), "look"], [S(21) + 1.2, "cheer"]], [
    [c("algo mejor", "green", S(21) + 0.5)]
  ], { wt: "todavía hay más" });
  sc(S(22), S(23), "cg", [[S(22), "shrug"], [S(22) + 2.2, "think"]], [
    [w("coin", S(22) + 0.7, { sc: 0.4 }), c("centavos que nadie gasta", "orange", S(22) + 1.3)]
  ], { wt: "mucha gente" });
  sc(S(23), S(24), "cg", [[S(23), "worry"], [S(23) + 2.2, "shrug"]], [
    [p("card", S(23) + 0.7, { s: 0.4 }), c("tarjetas de regalo perdidas", "red", S(23) + 1.3)]
  ], { wt: "otros" });
  sc(S(24), S(25), "cg", [[S(24), "point"], [S(24) + 2.4, "cheer"]], [
    [c("saldo olvidado", "grey", S(24) + 0.8)],
    [c("ganancia sin vender nada", "green", S(24) + 4.4)]
  ], { wt: "con el tiempo" });
  sc(S(25), S(26), "cg", [[S(25), "cheer"], [S(25) + 2.4, "give"]], [
    [big("cientos de millones", "green", S(25) + 0.8)]
  ], { wt: "cada año" });
  // 8 EL ARMA SECRETA: TU HÁBITO
  sc(S(26), S(27), "cg", [[S(26), "point"], [S(26) + 1.4, "think"]], [
    [c("no solo es el dinero", "orange", S(26) + 0.5)]
  ], { wt: "y además" });
  sc(S(27), S(28), "cg", [[S(27), "phone"], [S(27) + 2.4, "look"]], [
    [c("tienes saldo", "grey", S(27) + 0.8), sy("arrow", S(27) + 1.4, "grey"), c("regresas", "green", S(27) + 2.0)]
  ], { wt: "el hábito" });
  sc(S(28), S(29), "cg", [[S(28), "think"], [S(28) + 2.4, "phone"]], [
    [w("eye", S(28) + 0.8, { sc: 0.4 }), c("qué, a qué hora, dónde", "orange", S(28) + 1.4)],
    [c("la oferta perfecta", "green", S(28) + 4.6)]
  ], { wt: "la app sabe" });
  sc(S(29), S(30), "cg", [[S(29), "worry"], [S(29) + 2.2, "shrug"]], [
    [w("chain", S(29) + 0.7, { sc: 0.4 }), c("te amarra como cliente", "red", S(29) + 1.3)]
  ], { wt: "así que" });
  // 9 NO SOLO ES STARBUCKS
  sc(S(30), S(31), "cg", [[S(30), "point"], [S(30) + 1.4, "look"]], [
    [c("no es exclusivo", "orange", S(30) + 0.5)]
  ], { wt: "este truco" });
  sc(S(31), S(32), "cg", [[S(31), "give"], [S(31) + 2.4, "point"]], [
    [c("tarjetas de regalo", "grey", S(31) + 0.8), c("apps de comida", "grey", S(31) + 1.4)],
    [p("play", S(31) + 4.2, { s: 0.4 }), c("monedas de videojuegos", "grey", S(31) + 4.8)]
  ], { wt: "funcionan igual" });
  sc(S(32), S(33), "cg", [[S(32), "shrug"], [S(32) + 2.4, "worry"]], [
    [c("pagas hoy", "orange", S(32) + 0.8), c("usan tu dinero", "orange", S(32) + 1.4)],
    [c("una parte nunca se gasta", "red", S(32) + 4.8)]
  ], { wt: "en todos los casos" });
  // 10 CÓMO NO REGALAR TU DINERO
  sc(S(33), S(34), "cg", [[S(33), "think"], [S(33) + 1.4, "point"]], [
    [c("¿qué puedes hacer?", "orange", S(33) + 0.5)]
  ], { wt: "entonces" });
  sc(S(34), S(35), "cg", [[S(34), "give"], [S(34) + 2.4, "point"]], [
    [c("carga solo lo que gastarás pronto", "green", S(34) + 0.8)]
  ], { wt: "regla 1" });
  sc(S(35), S(36), "cg", [[S(35), "phone"], [S(35) + 2.4, "cheer"]], [
    [c("busca saldos olvidados", "green", S(35) + 0.8)],
    [c("y úsalos", "green", S(35) + 4.0)]
  ], { wt: "regla 2" });
  sc(S(36), S(37), "cg", [[S(36), "think"], [S(36) + 2.2, "calm"]], [
    [p("cup", S(36) + 0.7, { s: 0.4 }), c("¿un café o un hábito?", "orange", S(36) + 1.3)]
  ], { wt: "regla 3" });
  // 11 LA LECCIÓN
  sc(S(37), S(38), "cg", [[S(37), "point"], [S(37) + 2.4, "think"]], [
    [c("ganan con lo que venden", "grey", S(37) + 0.8)],
    [c("y con tu dinero adelantado", "orange", S(37) + 4.6)]
  ], { wt: "la lección" });
  sc(S(38), S(39), "cg", [[S(38), "give"], [S(38) + 2.0, "shrug"]], [
    [c("préstamo gratis", "red", S(38) + 0.7)]
  ], { wt: "cuando pagas antes" });
  // 12 CIERRE
  sc(S(39), S(40), "cg", [[S(39), "phone"], [S(39) + 2.4, "point"]], [
    [c("recargas", "grey", S(39) + 0.8), sy("arrow", S(39) + 1.4, "grey"), c("prestas sin intereses", "orange", S(39) + 2.0)]
  ], { wt: "la próxima vez" });
  sc(S(40), S(41), "cg", [[S(40), "calm"], [S(40) + 2.2, "look"]], [
    [c("contenido educativo", "grey", S(40) + 0.7)],
    [c("cifras aproximadas", "orange", S(40) + 3.8)]
  ], { wt: "aviso" });
  sc(S(41), END, "cg", [[S(41), "cheer"], [S(41) + 2.4, "give"]], [
    [c("¿dinero olvidado en una app?", "orange", S(41) + 0.7)],
    [c("cuéntame en comentarios", "green", S(41) + 4.0)]
  ], { wt: "tu turno" });

  root.SCENES = SC;
})(window);

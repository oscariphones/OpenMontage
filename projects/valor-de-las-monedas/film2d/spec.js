/* Por qué cada moneda vale distinto (global con detalles de México) (Fábrica 2.0): the whole film as data. Times are REAL seconds of the narration (assets/audio/timeline.json).
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
  sc(0, S(1), "cg", [[S(0), "give"], [S(0) + 2.6, "shrug"]], []);
  sc(S(1), S(2), "cg", [[S(1), "point"], [S(1) + 2.6, "think"]], []);
  sc(S(2), S(3), "cg", [[S(2), "worry"], [S(2) + 2.4, "look"]], []);
  // 2 DE QUÉ VA ESTO
  sc(S(3), S(4), "cg", [[S(3), "point"], [S(3) + 2.2, "give"]], [
    [w("coin", S(3) + 0.7, { sc: 0.4 }), c("sube", "green", S(3) + 1.2), c("baja", "red", S(3) + 1.8)]
  ], { wt: "el tema de hoy" });
  sc(S(4), S(5), "cg", [[S(4), "think"], [S(4) + 2.4, "cheer"]], [
    [c("el peso mexicano", "orange", S(4) + 0.8)],
    [c("¿por qué se pone fuerte?", "green", S(4) + 4.4)]
  ], { wt: "al final" });
  // 3 SUSCRÍBETE (recordatorio obligatorio)
  sc(S(5), S(6), "cg", [[S(5), "point"], [S(5) + 1.6, "cheer"]], [
    [big("SUSCRÍBETE", "red", S(5) + 3.6, { x: "stamp" })]
  ], { wt: "antes de seguir" });
  sc(S(6), S(7), "cg", [[S(6), "sitRelaxed"], [S(6) + 2.2, "give"]], [
    [c("el dinero sin rollos", "green", S(6) + 0.7)],
    [c("activa la campanita", "orange", S(6) + 4.2)]
  ], { wt: "cada semana" });
  sc(S(7), S(8), "cg", [[S(7), "calm"], [S(7) + 1.2, "point"]], []);
  // 4 LOS CEROS NO IMPORTAN
  sc(S(8), S(9), "cg", [[S(8), "point"], [S(8) + 2.4, "shrug"]], [
    [c("muchos ceros", "grey", S(8) + 0.8), sy("neq", S(8) + 1.4, "grey"), c("país pobre", "red", S(8) + 2.0)],
    [c("¡no es lo mismo!", "orange", S(8) + 4.8)]
  ], { wt: "lo más importante" });
  sc(S(9), S(10), "cg", [[S(9), "think"], [S(9) + 2.4, "give"]], [
    [p("calendar", S(9) + 0.8, { s: 0.4 }), c("depende de su historia", "orange", S(9) + 1.4)],
    [c("empezó caro o barato", "grey", S(9) + 4.6)]
  ], { wt: "el número" });
  sc(S(10), S(11), "cg", [[S(10), "cheer"], [S(10) + 1.8, "point"]], [
    [c("¿sube o baja con el tiempo?", "green", S(10) + 0.6)]
  ], { wt: "lo que importa" });
  // 5 UN PRECIO COMO CUALQUIER OTRO
  sc(S(11), S(12), "cg", [[S(11), "look"], [S(11) + 2.4, "give"]], [
    [w("coin", S(11) + 0.8, { sc: 0.4 }), c("dinero amarrado al oro", "orange", S(11) + 1.4)],
    [c("billete = pedacito de oro", "grey", S(11) + 4.8)]
  ], { wt: "hace muchos años" });
  sc(S(12), S(13), "cg", [[S(12), "point"], [S(12) + 2.4, "shrug"]], [
    [p("calendar", S(12) + 0.8, { s: 0.4 }), c("1971", "orange", S(12) + 1.4)],
    [c("el dólar dejó el oro", "red", S(12) + 4.8)]
  ], { wt: "hasta que" });
  sc(S(13), S(14), "cg", [[S(13), "calm"], [S(13) + 2.0, "cheer"]], [
    [big("confianza", "green", S(13) + 0.7)]
  ], { wt: "hoy vale por" });
  sc(S(14), S(15), "cg", [[S(14), "give"], [S(14) + 2.4, "think"]], [
    [c("mucha gente lo quiere", "green", S(14) + 0.8), sy("arrow", S(14) + 1.4, "grey"), c("sube", "green", S(14) + 2.0)],
    [c("nadie lo quiere → baja", "red", S(14) + 5.0)]
  ], { wt: "como los aguacates" });
  sc(S(15), S(16), "cg", [[S(15), "think"], [S(15) + 2.0, "point"]], [
    [c("¿qué hace que la quieran?", "orange", S(15) + 0.7)]
  ], { wt: "la pregunta" });
  // 6 RAZÓN 1: LA INFLACIÓN
  sc(S(16), S(17), "cg", [[S(16), "point"], [S(16) + 2.4, "worry"]], [
    [c("razón 1", "orange", S(16) + 0.7), c("inflación", "red", S(16) + 1.3)],
    [p("cart", S(16) + 4.4, { s: 0.4 }), c("alcanza para menos", "red", S(16) + 5.0)]
  ], { wt: "la primera" });
  sc(S(17), S(18), "cg", [[S(17), "shrug"], [S(17) + 2.4, "slump"]], [
    [w("stack", S(17) + 0.8, { sc: 0.4 }), c("demasiados billetes", "red", S(17) + 1.4)],
    [c("sopa con mucha agua", "grey", S(17) + 4.6)]
  ], { wt: "si imprimen de más" });
  sc(S(18), S(19), "cg", [[S(18), "worry"], [S(18) + 1.8, "look"]], [
    [c("nadie la quiere guardar", "red", S(18) + 0.6)]
  ], { wt: "por eso" });
  sc(S(19), S(20), "cg", [[S(19), "slump"], [S(19) + 2.2, "shrug"]], [
    [c("Zimbabue", "orange", S(19) + 0.7)],
    [big("100 billones", "red", S(19) + 3.4)]
  ], { wt: "un billete de" });
  sc(S(20), S(21), "cg", [[S(20), "give"], [S(20) + 2.4, "calm"]], [
    [c("mejor usar dólares", "green", S(20) + 0.8)],
    [c("adiós moneda propia", "red", S(20) + 4.4, { x: "strike" })]
  ], { wt: "al final" });
  // 7 RAZÓN 2: LAS TASAS DE INTERÉS
  sc(S(21), S(22), "cg", [[S(21), "point"], [S(21) + 2.4, "think"]], [
    [c("razón 2", "orange", S(21) + 0.7), c("tasas de interés", "green", S(21) + 1.3)],
    [w("coin", S(21) + 4.4, { sc: 0.4 }), c("lo que te pagan por prestar", "grey", S(21) + 5.0)]
  ], { wt: "la segunda" });
  sc(S(22), S(23), "cg", [[S(22), "give"], [S(22) + 2.4, "point"]], [
    [p("building", S(22) + 0.8, { s: 0.4 }), c("banco central", "grey", S(22) + 1.4)],
    [c("en México: Banxico", "orange", S(22) + 4.4)]
  ], { wt: "quién la decide" });
  sc(S(23), S(24), "cg", [[S(23), "cheer"], [S(23) + 2.4, "look"]], [
    [c("intereses altos", "green", S(23) + 0.8)],
    [c("llega dinero del mundo", "green", S(23) + 4.8)]
  ], { wt: "si pagan más" });
  sc(S(24), S(25), "cg", [[S(24), "give"], [S(24) + 2.2, "cheer"]], [
    [c("compran la moneda", "orange", S(24) + 0.7), sy("arrow", S(24) + 1.3, "grey"), c("sube", "green", S(24) + 1.9)]
  ], { wt: "para invertir" });
  sc(S(25), S(26), "cg", [[S(25), "worry"], [S(25) + 2.4, "slump"]], [
    [c("créditos caros", "red", S(25) + 0.8)],
    [c("la economía se frena", "red", S(25) + 4.8)]
  ], { wt: "pero ojo" });
  // 8 RAZÓN 3: LA CONFIANZA
  sc(S(26), S(27), "cg", [[S(26), "point"], [S(26) + 1.2, "calm"]], [
    [c("razón 3: confianza", "orange", S(26) + 0.5)]
  ], { wt: "la tercera" });
  sc(S(27), S(28), "cg", [[S(27), "think"], [S(27) + 2.4, "look"]], [
    [p("building", S(27) + 0.8, { s: 0.4 }), c("una fábrica nueva", "grey", S(27) + 1.4)],
    [c("reglas que no cambian", "green", S(27) + 4.6)]
  ], { wt: "las empresas" });
  sc(S(28), S(29), "cg", [[S(28), "give"], [S(28) + 2.4, "cheer"]], [
    [c("compran moneda local", "green", S(28) + 0.8)],
    [c("terrenos", "grey", S(28) + 4.6), c("sueldos", "grey", S(28) + 5.2), c("materiales", "grey", S(28) + 5.8)]
  ], { wt: "cuando llegan" });
  sc(S(29), S(30), "cg", [[S(29), "worry"], [S(29) + 2.4, "slump"]], [
    [c("crisis", "red", S(29) + 0.8), c("pleitos", "red", S(29) + 1.4), c("deudas", "red", S(29) + 2.0)],
    [c("el dinero se va", "red", S(29) + 5.2)]
  ], { wt: "en cambio" });
  // 9 RAZÓN 4: LO QUE LE VENDES AL MUNDO
  sc(S(30), S(31), "cg", [[S(30), "point"], [S(30) + 1.6, "give"]], [
    [c("razón 4: lo que vendes", "orange", S(30) + 0.6)]
  ], { wt: "la cuarta" });
  sc(S(31), S(32), "cg", [[S(31), "look"], [S(31) + 2.4, "cheer"]], [
    [p("car", S(31) + 0.8, { s: 0.4 }), c("Japón vende un coche", "grey", S(31) + 1.4)],
    [c("el comprador necesita yenes", "green", S(31) + 5.0)]
  ], { wt: "ejemplo" });
  sc(S(32), S(33), "cg", [[S(32), "think"], [S(32) + 2.4, "point"]], [
    [c("el petróleo", "orange", S(32) + 0.8)],
    [c("se vende en dólares", "green", S(32) + 4.4)]
  ], { wt: "el caso más fuerte" });
  sc(S(33), S(34), "cg", [[S(33), "give"], [S(33) + 2.4, "cheer"]], [
    [c("todos necesitan dólares", "green", S(33) + 0.8)],
    [big("la moneda #1", "green", S(33) + 5.2)]
  ], { wt: "por eso" });
  // 10 EN MÉXICO
  sc(S(34), S(35), "cg", [[S(34), "look"], [S(34) + 1.8, "point"]], [
    [c("la historia del peso", "orange", S(34) + 0.6)]
  ], { wt: "en México" });
  sc(S(35), S(36), "cg", [[S(35), "worry"], [S(35) + 2.4, "shrug"]], [
    [c("mucha inflación", "red", S(35) + 0.8)],
    [p("calendar", S(35) + 4.2, { s: 0.4 }), c("1993: tres ceros menos", "orange", S(35) + 4.8)]
  ], { wt: "los años ochenta" });
  sc(S(36), S(37), "cg", [[S(36), "give"], [S(36) + 2.4, "think"]], [
    [c("$1,000 viejos", "grey", S(36) + 0.8), sy("arrow", S(36) + 1.4, "grey"), c("$1 nuevo", "green", S(36) + 2.0)],
    [c("mismos precios", "grey", S(36) + 4.8)]
  ], { wt: "el nuevo peso" });
  sc(S(37), S(38), "cg", [[S(37), "slump"], [S(37) + 2.4, "worry"]], [
    [c("crisis de 1994", "red", S(37) + 0.8)],
    [big("perdió más de la mitad", "red", S(37) + 4.6)]
  ], { wt: "y luego" });
  sc(S(38), S(39), "cg", [[S(38), "point"], [S(38) + 2.4, "think"]], [
    [c("tasas de Banxico", "orange", S(38) + 0.8), c("confianza", "green", S(38) + 1.4)],
    [c("lo que vende a EE. UU.", "orange", S(38) + 5.6)]
  ], { wt: "hoy depende de" });
  sc(S(39), S(40), "cg", [[S(39), "phone"], [S(39) + 2.4, "give"]], [
    [p("envelope", S(39) + 0.8, { s: 0.4 }), c("remesas", "green", S(39) + 1.4)],
    [c("miles de millones de dólares", "green", S(39) + 5.2)]
  ], { wt: "además" });
  sc(S(40), S(41), "cg", [[S(40), "cheer"], [S(40) + 2.2, "point"]], [
    [c("dólares → pesos", "orange", S(40) + 0.7)],
    [c("el peso se mantiene fuerte", "green", S(40) + 4.2)]
  ], { wt: "y eso" });
  // 11 ¿FUERTE ES MEJOR?
  sc(S(41), S(42), "cg", [[S(41), "think"], [S(41) + 2.0, "shrug"]], [
    [c("¿fuerte = bueno?", "orange", S(41) + 0.7)],
    [c("no para todos", "red", S(41) + 4.2)]
  ], { wt: "pero ojo" });
  sc(S(42), S(43), "cg", [[S(42), "cheer"], [S(42) + 1.8, "give"]], [
    [w("plane", S(42) + 0.6, { sc: 0.4 }), c("viajar sale más barato", "green", S(42) + 1.2)]
  ], { wt: "si el peso sube" });
  sc(S(43), S(44), "cg", [[S(43), "worry"], [S(43) + 2.4, "slump"]], [
    [c("quien recibe dólares", "red", S(43) + 0.8)],
    [c("quien vende al extranjero", "red", S(43) + 4.8)]
  ], { wt: "recibe menos pesos" });
  sc(S(44), S(45), "cg", [[S(44), "look"], [S(44) + 2.4, "shrug"]], [
    [c("Ecuador", "grey", S(44) + 0.8), c("El Salvador", "grey", S(44) + 1.4)],
    [c("usan el dólar", "green", S(44) + 4.8), c("no deciden nada", "red", S(44) + 5.4)]
  ], { wt: "otros países" });
  // 12 LA LECCIÓN
  sc(S(45), S(46), "cg", [[S(45), "point"], [S(45) + 2.4, "think"]], [
    [c("precio de la moneda", "orange", S(45) + 0.8)],
    [c("termómetro de confianza", "green", S(45) + 4.6)]
  ], { wt: "la lección" });
  sc(S(46), S(47), "cg", [[S(46), "give"], [S(46) + 2.4, "cheer"]], [
    [c("cuántos ceros", "grey", S(46) + 0.8, { x: "strike" })],
    [c("¿se mantiene estable?", "green", S(46) + 4.4)]
  ], { wt: "fíjate en" });
  // 13 CIERRE
  sc(S(47), S(48), "cg", [[S(47), "calm"], [S(47) + 2.2, "cheer"]], [
    [w("coin", S(47) + 0.7, { sc: 0.4 }), c("ya sabes por qué", "green", S(47) + 1.3)]
  ], { wt: "resumen" });
  sc(S(48), S(49), "cg", [[S(48), "calm"], [S(48) + 2.2, "look"]], [
    [c("contenido educativo", "grey", S(48) + 0.7)],
    [c("no es asesoría financiera", "orange", S(48) + 3.8)]
  ], { wt: "aviso" });
  sc(S(49), END, "cg", [[S(49), "cheer"], [S(49) + 2.4, "give"]], [
    [c("¿a cuánto viste el dólar?", "orange", S(49) + 0.7)],
    [c("cuéntame en comentarios", "green", S(49) + 4.4)]
  ], { wt: "tu turno" });

  root.SCENES = SC;
})(window);

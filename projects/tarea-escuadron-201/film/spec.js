/* Escuadrón 201: documental minimalista. Fondo negro puro, textos gigantes blancos y rojos, sin imágenes.
   Tiempos REALES de la locución (assets/audio/timeline.json): S(k) = inicio de la frase k, P(k, f) = punto f (0-1) dentro de la frase k.
   card(t, filas): una pantalla que dura hasta la siguiente card. fila = [texto, color, t, tamaño]  (tamaño: xl | l | m). */
(function (root) {
  "use strict";
  var SENT = root.SENT;
  var S = function (k) { return SENT[k][0]; };
  var P = function (k, f) { return SENT[k][0] + f * (SENT[k][1] - SENT[k][0]); };
  var W = "white", R = "red";
  var CARDS = [];
  function card(t, filas) { CARDS.push({ t: t, rows: filas }); }

  // GANCHO
  card(S(0), [["MAYO", W, P(0, 0.05), "l"], ["1942", R, P(0, 0.25), "xl"]]);
  card(P(0, 0.62), [["MÉXICO", W, P(0, 0.62), "xl"], ["LEJOS DE LA GUERRA", W, P(0, 0.8), "m"]]);
  card(S(1), [["O ESO CREÍA.", R, S(1), "xl"]]);
  card(S(2), [["UN SUBMARINO", W, P(2, 0.2), "l"], ["ALEMÁN", R, P(2, 0.45), "xl"]]);

  // LOS BUQUES
  card(S(3), [["POTRERO", W, P(3, 0.1), "xl"], ["DEL LLANO", W, P(3, 0.3), "xl"], ["HUNDIDO", R, P(3, 0.6), "l"]]);
  card(S(4), [["13", R, P(4, 0.3), "xl"], ["MARINOS MEXICANOS", W, P(4, 0.6), "m"]]);
  card(S(5), [["FAJA DE ORO", W, P(5, 0.55), "xl"], ["HUNDIDO", R, P(5, 0.8), "l"]]);
  card(S(6), [["SIN RESPUESTAS", W, P(6, 0.4), "l"]]);
  card(S(7), [["22 DE MAYO", W, P(7, 0.1), "l"], ["GUERRA", R, P(7, 0.45), "xl"], ["CONTRA EL EJE", W, P(7, 0.75), "m"]]);
  card(S(8), [["POR PRIMERA VEZ", W, P(8, 0.05), "m"], ["FUERA DE", W, P(8, 0.55), "l"], ["SU TERRITORIO", R, P(8, 0.7), "l"]]);

  // LOS VOLUNTARIOS
  card(S(9), [["NADIE FUE OBLIGADO", W, P(9, 0.2), "l"]]);
  card(S(10), [["VOLUNTARIOS", R, P(10, 0.3), "xl"]]);
  card(S(11), [["300", R, P(11, 0.25), "xl"], ["HOMBRES", W, P(11, 0.4), "l"], ["PILOTOS · MECÁNICOS · ARMEROS", W, P(11, 0.65), "m"]]);
  card(S(12), [["APENAS", W, P(12, 0.4), "m"], ["20 AÑOS", R, P(12, 0.55), "xl"]]);
  card(S(13), [["TEXAS", W, P(13, 0.55), "xl"], ["IDAHO", W, P(13, 0.75), "xl"]]);
  card(S(14), [["UN CAZA PESADO", W, P(14, 0.55), "l"]]);
  card(S(15), [["THUNDERBOLT", W, P(15, 0.05), "xl"], ["P-47", R, P(15, 0.5), "xl"]]);
  card(S(16), [["7 TONELADAS", W, P(16, 0.05), "l"], ["1 MOTOR", W, P(16, 0.45), "l"], ["8 AMETRALLADORAS", R, P(16, 0.7), "l"]]);
  card(S(17), [["FUERZA AÉREA", W, P(17, 0.35), "l"], ["EXPEDICIONARIA", W, P(17, 0.55), "l"], ["MEXICANA", R, P(17, 0.75), "l"]]);
  card(S(18), [["LOS COLORES", W, P(18, 0.35), "l"], ["DE MÉXICO", R, P(18, 0.55), "xl"]]);
  card(S(19), [["ESCUADRÓN", W, P(19, 0.6), "l"], ["201", R, P(19, 0.8), "xl"]]);

  // FILIPINAS
  card(S(20), [["1945", R, P(20, 0.2), "xl"], ["FILIPINAS", W, P(20, 0.55), "xl"]]);
  card(S(21), [["LUZÓN", W, P(21, 0.3), "xl"], ["CADA DÍA", R, P(21, 0.7), "l"]]);
  card(S(22), [["SELVA", W, P(22, 0.55), "l"], ["MONTAÑAS", W, P(22, 0.8), "l"]]);
  card(S(23), [["CALOR", W, P(23, 0.45), "l"], ["LLUVIA", W, P(23, 0.6), "l"], ["FUEGO ANTIAÉREO", R, P(23, 0.78), "l"]]);
  card(S(24), [["DECENAS", R, P(24, 0.15), "xl"], ["DE MISIONES", W, P(24, 0.35), "l"]]);
  card(S(25), [["FORMOSA", W, P(25, 0.2), "xl"], ["MAR ABIERTO", W, P(25, 0.45), "m"], ["SIN MARGEN DE ERROR", R, P(25, 0.75), "m"]]);
  card(S(26), [["ALGUNO", W, P(26, 0.6), "l"], ["PODÍA NO VOLVER", R, P(26, 0.75), "l"]]);

  // LOS CAÍDOS
  card(S(27), [["5", R, P(27, 0.05), "xl"], ["PILOTOS", W, P(27, 0.2), "xl"], ["MURIERON", R, P(27, 0.55), "l"]]);
  card(S(28), [["EN COMBATE", W, P(28, 0.4), "l"]]);
  card(S(29), [["EN EL MAR", W, P(29, 0.3), "l"], ["EN EL AIRE", W, P(29, 0.7), "l"]]);
  card(S(30), [["NOMBRE", W, P(30, 0.1), "l"], ["FAMILIA", W, P(30, 0.3), "l"], ["UN PAÍS", R, P(30, 0.55), "l"]]);
  card(S(31), [["NO REGRESARON.", R, P(31, 0.1), "xl"]]);
  card(S(32), [["FIN DE LA GUERRA", W, P(32, 0.3), "l"]]);
  card(S(33), [["NOVIEMBRE 1945", W, P(33, 0.15), "m"], ["ZÓCALO", R, P(33, 0.6), "xl"]]);
  card(S(34), [["ÁGUILAS", W, P(34, 0.4), "xl"], ["AZTECAS", R, P(34, 0.6), "xl"]]);

  // REFLEXIÓN
  card(S(35), [["OLVIDADOS", W, P(35, 0.5), "xl"]]);
  card(S(36), [["NI FAMA", W, P(36, 0.2), "l"], ["NI DINERO", W, P(36, 0.45), "l"], ["NI MEDALLAS", R, P(36, 0.75), "l"]]);
  card(S(37), [["ELLOS LO ENTENDIERON", W, P(37, 0.4), "m"]]);
  card(S(38), [["LA LIBERTAD", W, P(38, 0.05), "xl"], ["NO ES UN REGALO", R, P(38, 0.5), "l"]]);
  card(S(39), [["ALGUIEN", W, P(39, 0.05), "xl"], ["LA DEFIENDE", R, P(39, 0.3), "xl"]]);
  card(S(40), [["300", W, P(40, 0.05), "xl"], ["VOLUNTARIOS", W, P(40, 0.2), "l"], ["CRUZARON EL OCÉANO", R, P(40, 0.45), "m"]]);
  card(S(41), [["5", R, P(41, 0.05), "xl"], ["NO VOLVIERON", W, P(41, 0.35), "l"]]);
  card(S(42), [["ESCUADRÓN 201", W, P(42, 0.2), "xl"], ["1945", R, P(42, 0.6), "l"]]);
  card(S(43), [["COMPÁRTELA", R, P(43, 0.35), "xl"], ["QUE NO SE OLVIDE", W, P(43, 0.65), "m"]]);

  root.CARDS = CARDS;
})(typeof window !== "undefined" ? window : globalThis);

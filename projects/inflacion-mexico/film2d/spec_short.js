/* Inflación en México — SHORT vertical 1080x1920 (short/build_short.py): los primeros ~45 s del guion (gancho + los años tranquilos,
 * frases 0-6) y una tarjeta final "Video completo en el canal". Mismos tiempos reales de la narración que spec.js (assets/audio/timeline.json).
 * En vertical la plantilla apila la ventana arriba y el Stickman abajo; el layout "cg" se conserva para que el motor no cambie. */
(function (root) {
  "use strict";
  var C = root.KIT.C, SENT = root.SENT;
  var S = function (k) { return SENT[k][0]; };
  function ex(a, b) { for (var k in b) a[k] = b[k]; return a; }
  var c = function (x, k, t, o) { return ex({ c: x, k: k, t: t }, o); };
  var big = function (x, k, t, o) { return ex({ big: x, k: k, t: t }, o); };
  var SC = [];
  function sc(a, b, L, poses, g, o) { SC.push(ex({ a: a, b: b, L: L, poses: poses, g: g }, o || {})); }
  var CUT = SENT[6][1] + 0.38;          // fin de la frase 6 ("...casi el doble") + respiro: aquí entra la tarjeta final
  var FIN = root.SHORT_FIN || CUT + 4.1; // duración total del short (la fija build_short.py)

  // 1 GANCHO (sin ventanas)
  sc(0, S(1), "cg", [[S(0), "phone"], [S(0) + 2.6, "shrug"]], []);
  sc(S(1), S(2), "cg", [[S(1), "worry"], [S(1) + 2.2, "slump"]], []);
  sc(S(2), S(3), "cg", [[S(2), "look"], [S(2) + 2.2, "point"]], []);
  // 2 LOS AÑOS TRANQUILOS
  sc(S(3), S(5), "cg", [[S(3), "calm"], [S(4), "sitRelaxed"]], [
    [c("1954 - 1976", "grey", S(3) + 0.6)],
    [big("$12.50", "green", S(3) + 1.3)],
    [c("por dólar", "green", S(3) + 1.9)],
    [c("inflación baja", "green", S(4) + 1.9)]
  ], { wt: "los años tranquilos" });
  sc(S(5), CUT, "cg", [[S(5), "think"], [S(6), "worry"]], [
    [c("deuda", "orange", S(5) + 0.6), c("gasto público", "orange", S(5) + 1.2)],
    [c("1976", "grey", S(6) + 1.9), c("dólar × 2", "red", S(6) + 2.5)]
  ]);
  // TARJETA FINAL
  sc(CUT, FIN, "cg", [[CUT, "cheer"], [CUT + 1.7, "point"]], [
    [big("Video completo", "orange", CUT + 0.4)],
    [big("en el canal", "green", CUT + 0.9)]
  ], { wt: "inflación en México" });

  root.SCENES = SC;
})(window);

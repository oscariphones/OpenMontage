/* Props: every function draws around local origin (0,0) = bottom-centre, and returns the inner group
 * (opacity 0 — the caller reveals it with KIT.pop / KIT.vis / KIT.slideIn). */
(function (root) {
  "use strict";
  var K = root.KIT, C = K.C;
  var P = {};
  function mk(parent, x, y, s, name) { return K.place(parent, x, y, s, name); }
  function figOk(g) { g._wrap._figOk = true; return g; }
  var L = K.line, R = K.rect, O = K.circ, PL = K.poly;

  P.house = function (parent, x, y, s) { var g = mk(parent, x, y, s); PL(g, [[-60, 0], [-60, -70], [0, -125], [60, -70], [60, 0]]); L(g, [[-60, 0], [60, 0]]); R(g, -14, -52, 28, 52); return g; };
  P.car = function (parent, x, y, s) {
    var g = mk(parent, x, y, s);
    PL(g, [[-78, -18], [-72, -52], [-36, -60], [-14, -92], [34, -92], [56, -60], [78, -50], [80, -18]]);
    L(g, [[-14, -86], [-14, -60]]); L(g, [[-60, -60], [50, -60]], { w: 4 });
    O(g, -42, -12, 17, { fill: C.paper }); O(g, 44, -12, 17, { fill: C.paper }); return g;
  };
  P.card = function (parent, x, y, s) { var g = mk(parent, x, y, s); R(g, -64, -86, 128, 82); L(g, [[-64, -62], [64, -62]], { w: 12 }); L(g, [[-46, -28], [-6, -28]]); L(g, [[14, -28], [34, -28]]); return g; };
  P.cart = function (parent, x, y, s) { var g = mk(parent, x, y, s); L(g, [[-66, -108], [-40, -108], [-22, -44], [50, -44], [62, -90], [-36, -90]]); O(g, -10, -18, 11, { fill: C.paper }); O(g, 38, -18, 11, { fill: C.paper }); return g; };
  P.shield = function (parent, x, y, s) { var g = mk(parent, x, y, s); PL(g, [[-46, -100], [46, -100], [46, -46], [0, 0], [-46, -46]]); L(g, [[-18, -52], [-2, -36], [24, -70]]); return g; };
  P.dumbbell = function (parent, x, y, s) { var g = mk(parent, x, y, s); L(g, [[-56, -30], [56, -30]], { w: 7 }); L(g, [[-64, -62], [-64, -2]], { w: 16 }); L(g, [[64, -62], [64, -2]], { w: 16 }); L(g, [[-84, -48], [-84, -14]], { w: 10 }); L(g, [[84, -48], [84, -14]], { w: 10 }); return g; };
  P.cup = function (parent, x, y, s) { var g = mk(parent, x, y, s); PL(g, [[-40, -76], [30, -76], [24, -4], [-34, -4]]); ink2(g, "M30 -60 q32 4 24 30 q-8 14 -30 12"); L(g, [[-20, -104], [-14, -88]], { w: 4 }); L(g, [[2, -106], [8, -88]], { w: 4 }); return g; };
  function ink2(g, d) { return K.ink(g, d); }
  P.box = function (parent, x, y, s) { var g = mk(parent, x, y, s); R(g, -52, -72, 104, 72); L(g, [[0, -72], [0, 0]]); L(g, [[-52, -40], [52, -40]], { w: 4 }); return g; };
  P.play = function (parent, x, y, s) { var g = mk(parent, x, y, s); R(g, -64, -84, 128, 82); K.ink(g, "M-14 -64 L24 -43 L-14 -22 Z", { fill: C.ink }); return g; };
  P.laptop = function (parent, x, y, s) { var g = figOk(mk(parent, x, y, s, "laptop")); PL(g, [[-86, 0], [-70, -112], [70, -112], [86, 0]], { fill: C.paper }); L(g, [[-96, 0], [96, 0]], { w: 6 }); return g; };
  P.desk = function (parent, x, y, s) { var g = figOk(mk(parent, x, y, s, "desk")); L(g, [[-160, -262], [160, -262]], { w: 6 }); L(g, [[-130, -262], [-130, 0]]); L(g, [[20, -262], [20, 0]]); return g; };
  P.chair = function (parent, x, y, s) { var g = figOk(mk(parent, x, y, s, "chair")); L(g, [[-50, -250], [52, -250]], { w: 6 }); L(g, [[52, -250], [56, -370]], { w: 6 }); L(g, [[-36, -250], [-40, 0]]); L(g, [[40, -250], [44, 0]]); return g; };
  P.phone = function (parent, x, y, s) { var g = mk(parent, x, y, s); R(g, -34, -120, 68, 120); L(g, [[-10, -104], [10, -104]], { w: 4 }); O(g, 0, -16, 6); return g; };
  P.clock = function (parent, x, y, s) { var g = mk(parent, x, y - 60 * (s || 1), s); O(g, 0, 0, 58); L(g, [[0, 0], [0, -34]], { w: 5 }); L(g, [[0, 0], [26, 8]], { w: 5 }); return g; };
  P.calendar = function (parent, x, y, s, txt) { var g = mk(parent, x, y, s); R(g, -56, -96, 112, 96); L(g, [[-56, -68], [56, -68]], { w: 4 }); L(g, [[-32, -108], [-32, -86]], { w: 8 }); L(g, [[32, -108], [32, -86]], { w: 8 }); return g; };
  P.envelope = function (parent, x, y, s) { var g = mk(parent, x, y, s); R(g, -64, -86, 128, 86); L(g, [[-64, -86], [0, -40], [64, -86]]); return g; };
  P.building = function (parent, x, y, s) { var g = mk(parent, x, y, s); R(g, -90, -300, 180, 300); for (var r = 0; r < 5; r++) for (var c = 0; c < 3; c++) R(g, -66 + c * 52, -270 + r * 54, 30, 32, { w: 3 }); return g; };
  P.hourglass = function (parent, x, y, s) { var g = mk(parent, x, y, s); L(g, [[-44, -140], [44, -140]], { w: 6 }); L(g, [[-44, 0], [44, 0]], { w: 6 }); PL(g, [[-36, -140], [36, -140], [0, -70]]); PL(g, [[0, -70], [36, 0], [-36, 0]]); return g; };
  P.bike = function (parent, x, y, s) { var g = mk(parent, x, y, s); O(g, -54, -40, 40); O(g, 54, -40, 40); PL(g, [[-54, -40], [-8, -100], [40, -100], [54, -40]]); L(g, [[-8, -100], [-16, -122]]); L(g, [[40, -100], [34, -126], [56, -130]]); return g; };
  P.lunchbox = function (parent, x, y, s) { var g = mk(parent, x, y, s); R(g, -56, -70, 112, 70); L(g, [[-56, -44], [56, -44]], { w: 4 }); K.ink(g, "M-22 -70 q22 -30 44 0"); return g; };
  P.sun = function (parent, x, y, s) { var g = mk(parent, x, y - 50 * (s || 1), s); O(g, 0, 0, 40); for (var i = 0; i < 10; i++) { var a = i * Math.PI / 5; L(g, [[Math.cos(a) * 56, Math.sin(a) * 56], [Math.cos(a) * 84, Math.sin(a) * 84]], { w: 5 }); } return g; };
  P.moon = function (parent, x, y, s) { var g = mk(parent, x, y, s); K.ink(g, "M30 -60 a46 46 0 1 0 0 90 a36 36 0 1 1 0 -90 z"); return g; };
  P.sofa = function (parent, x, y, s) { var g = mk(parent, x, y, s); R(g, -130, -80, 260, 80); R(g, -130, -150, 260, 70); R(g, -154, -100, 34, 100); R(g, 120, -100, 34, 100); return g; };
  P.tv = function (parent, x, y, s) { var g = mk(parent, x, y, s); R(g, -110, -190, 220, 140); L(g, [[-40, -40], [40, -40]], { w: 6 }); L(g, [[0, -50], [0, -40]]); K.ink(g, "M-10 -142 L-10 -98", { w: 8 }); K.ink(g, "M10 -142 L10 -98", { w: 8 }); return g; };
  P.bed = function (parent, x, y, s) { var g = mk(parent, x, y, s); R(g, -150, -70, 300, 50); L(g, [[-150, -20], [-150, 0]]); L(g, [[150, -20], [150, 0]]); R(g, -150, -130, 60, 60); return g; };
  P.door = function (parent, x, y, s) { var g = mk(parent, x, y, s); R(g, -50, -190, 100, 190); O(g, 28, -96, 6); return g; };
  P.coffin = null;
  P.traffic = function (parent, x, y, s) { var g = mk(parent, x, y, s); L(g, [[0, 0], [0, -200]], { w: 6 }); R(g, -22, -290, 44, 90); O(g, 0, -272, 8, { fill: C.red, c: C.red, w: 2 }); O(g, 0, -246, 8); O(g, 0, -220, 8); return g; };
  P.jar = function (parent, x, y, s, w, h) {
    w = w || 220; h = h || 340;
    var g = mk(parent, x, y, s);
    var cid = "jc" + Math.round(Math.abs(x * 7 + y * 3 + w + h)) + Math.round((s || 1) * 100);
    var cp = K.el("clipPath", { id: cid }, g); K.el("rect", { x: -w / 2, y: -h, width: w, height: h, rx: 22 }, cp);
    var lg = K.el("g", { "clip-path": "url(#" + cid + ")" }, g);
    var liq = K.el("rect", { x: -w / 2, y: 0, width: w, height: 0, fill: C.orange, opacity: 0.9 }, lg);
    K.ink(g, "M" + (-w / 2 - 4) + " " + (-h - 4) + " L" + (-w / 2 - 4) + " -22 Q" + (-w / 2 - 4) + " 0 " + (-w / 2 + 18) + " 0 L" + (w / 2 - 18) + " 0 Q" + (w / 2 + 4) + " 0 " + (w / 2 + 4) + " -22 L" + (w / 2 + 4) + " " + (-h - 4), { w: 6 });
    L(g, [[-w / 2 - 20, -h - 4], [w / 2 + 20, -h - 4]], { w: 6 });
    g._liq = liq; g._h = h; g._w = w;
    g._level = function (t, v, d) { var hh = h * v; K.K.tl.to(liq, { attr: { y: -hh, height: hh }, duration: d || 0.7, ease: "power2.inOut" }, K.L(t)); };
    return g;
  };
  // another (anonymous) person: a tiny static stick figure. pose: stand | run | arms | box | sad
  P.mini = function (parent, x, y, s, pose, col) {
    var g = mk(parent, x, y, s), c = col || C.ink, w = 7;
    O(g, 0, -150, 22, { c: c, w: w });
    L(g, [[0, -128], [0, -60]], { c: c, w: w });
    var arms = { stand: [[-4, -112], [-30, -70], [-34, -50]], run: [[-4, -112], [-36, -96], [-48, -120]] };
    if (pose === "run") { L(g, [[0, -116], [-34, -92], [-52, -118]], { c: c, w: w }); L(g, [[0, -116], [34, -88], [50, -64]], { c: c, w: w }); L(g, [[0, -60], [-30, -34], [-52, -6]], { c: c, w: w }); L(g, [[0, -60], [26, -30], [46, -2]], { c: c, w: w }); }
    else if (pose === "arms") { L(g, [[0, -116], [-34, -146], [-44, -176]], { c: c, w: w }); L(g, [[0, -116], [34, -146], [44, -176]], { c: c, w: w }); L(g, [[0, -60], [-22, 0]], { c: c, w: w }); L(g, [[0, -60], [22, 0]], { c: c, w: w }); }
    else if (pose === "box") { L(g, [[0, -116], [-28, -84], [-10, -70]], { c: c, w: w }); L(g, [[0, -116], [28, -84], [10, -70]], { c: c, w: w }); R(g, -34, -88, 68, 50, { c: c, w: 5 }); L(g, [[0, -60], [-20, 0]], { c: c, w: w }); L(g, [[0, -60], [20, 0]], { c: c, w: w }); }
    else { L(g, [[0, -116], [-30, -74], [-30, -46]], { c: c, w: w }); L(g, [[0, -116], [30, -74], [30, -46]], { c: c, w: w }); L(g, [[0, -60], [-22, 0]], { c: c, w: w }); L(g, [[0, -60], [22, 0]], { c: c, w: w }); }
    return g;
  };
  P.age = function (parent, age, t0, t1) {
    var cal = P.calendar(parent, 190, 360, 1.1); K.pop(cal, t0);
    K.label(parent, age + " años", 190, 400, 46, C.orange, t0 + 0.2, t1);
  };
  P.dashed = function (g) { Array.prototype.slice.call(g.querySelectorAll("path,rect")).forEach(function (n) { n.setAttribute("stroke-dasharray", "12 10"); }); return g; };
  root.PROPS = P;
})(window);

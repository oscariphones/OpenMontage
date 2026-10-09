/* Widgets: each draws a self-contained graphic into its own <svg> (auto-fitted to its bbox by the engine)
 * and may add its own GSAP animation through X = { tl, T(oldTime)->local, C }.
 * Nothing here knows about screen coordinates: the CSS grid places the finished svg. */
(function (root) {
  "use strict";
  var K = root.KIT, C = K.C, P = root.PROPS, W = {};
  var L = K.line, PL = K.poly, R = K.rect, O = K.circ, TX = K.text, el = K.el;
  var GS = function () { return root.gsap; };

  function pop(X, node, t, o) { o = o || {}; X.tl.fromTo(node, { opacity: 0, scale: o.from || 0.4, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: o.dur || 0.45, ease: "back.out(1.8)", transformOrigin: "50% 50%", immediateRender: false }, X.T(t)); }
  function fade(X, node, t, d) { X.tl.fromTo(node, { opacity: 0 }, { opacity: 1, duration: d || 0.4, ease: "power2.out", immediateRender: false }, X.T(t)); }
  function hide(X, node, t, d) { X.tl.to(node, { opacity: 0, duration: d || 0.35, ease: "power2.out" }, X.T(t)); }
  function hidden(n) { n.setAttribute("opacity", 0); return n; }

  // ---------- money ----------
  W.jar = function (svg, it, X) {
    var w = it.jw || 200, h = it.jh || 300, g = P.jar(svg, w / 2 + 20, h + 10, 1, w, h), liq = g._liq, v0 = it.v0 || 0;
    liq.setAttribute("y", -h * v0); liq.setAttribute("height", h * v0);
    (it.lv || []).forEach(function (c) { X.tl.to(liq, { attr: { y: -h * c[1], height: h * c[1] }, duration: c[2] || 0.8, ease: "power2.inOut" }, X.T(c[0])); });
    (it.marks || []).forEach(function (m) { L(svg, [[20 - 14, 10 + h - h * m], [20 + 24, 10 + h - h * m]], { c: C.grey, w: 4 }); });
  };
  W.leakjar = function (svg, it, X) {   // jar with a red hole, a magnifier and finite drips
    var w = 200, h = 300, g = P.jar(svg, w / 2 + 30, h + 10, 1, w, h), liq = g._liq;
    liq.setAttribute("y", -h * 0.1); liq.setAttribute("height", h * 0.1);
    var hole = el("ellipse", { cx: 36, cy: h + 2, rx: 14, ry: 8, fill: C.red, opacity: 0 }, svg); pop(X, hole, it.t + 0.8);
    var mag = el("g", { opacity: 0 }, svg); O(mag, 60, h - 14, 70, { w: 7 }); L(mag, [[110, h + 36], [168, h + 92]], { w: 13 }); fade(X, mag, it.t + 0.2, 0.5);
    var n = Math.max(1, Math.floor(((it.end || it.out) - it.t - 2) / 0.9));
    for (var i = 0; i < n; i++) {
      var d = el("path", { d: "M36 " + (h + 10) + " q-7 14 0 22 q7 -8 0 -22", fill: C.orange, opacity: 0 }, svg), t0 = X.T(it.t + 1.4 + i * 0.9);
      X.tl.set(d, { opacity: 1, y: 0 }, t0); X.tl.to(d, { y: 36, opacity: 0, duration: 0.7, ease: "power1.in" }, t0);
    }
    var pud = el("ellipse", { cx: 36, cy: h + 50, rx: 4, ry: 2, fill: C.orange, opacity: 0 }, svg);
    X.tl.set(pud, { opacity: 0.85 }, X.T(it.t + 1.4)); X.tl.to(pud, { attr: { rx: 70, ry: 6 }, duration: Math.max(1, X.T((it.end || it.out)) - X.T(it.t) - 1.6), ease: "none" }, X.T(it.t + 1.4));
    X.tl.to(liq, { attr: { y: -h * 0.03, height: h * 0.03 }, duration: Math.max(1, X.T((it.end || it.out)) - X.T(it.t) - 1.4), ease: "none" }, X.T(it.t + 1.4));
  };
  W.dots = function (svg, it, X) {      // rows x cols of small orange dots appearing in sequence
    var rows = it.rows || 4, cols = it.cols || 10, k = 0;
    for (var r = 0; r < rows; r++) for (var c = 0; c < cols; c++, k++) { var d = O(svg, 20 + c * 34, 20 + r * 34, 10, { fill: C.orange, c: C.orange, w: 1 }); d.setAttribute("opacity", 0); pop(X, d, it.t + k * (it.dur || 2.4) / (rows * cols), { dur: 0.3 }); }
  };
  W.pipe = function (svg, it, X) {       // jar -> gear -> jar, coins travelling in monthly pulses
    var h = 240, a = P.jar(svg, 90, h + 10, 1, 150, h), b = P.jar(svg, 700, h + 10, 1, 170, h + 20), liq = b._liq, la = a._liq;
    la.setAttribute("y", -h * 0.8); la.setAttribute("height", h * 0.8);
    L(svg, [[90, 20], [90, -60], [700, -60], [700, 40]], { c: C.grey, w: 8 });
    var gear = el("g", {}, svg); O(gear, 395, -60, 34, { w: 6 }); for (var i = 0; i < 8; i++) { var an = i * Math.PI / 4; L(gear, [[395 + Math.cos(an) * 34, -60 + Math.sin(an) * 34], [395 + Math.cos(an) * 48, -60 + Math.sin(an) * 48]], { w: 8 }); }
    hidden(gear); fade(X, gear, it.t + 0.8); X.tl.to(gear, { rotation: 360, svgOrigin: "395 -60", duration: Math.max(2, X.T((it.end || it.out)) - X.T(it.t)), ease: "none" }, X.T(it.t + 0.8));
    var n = it.n || 6;
    for (var j = 0; j < n; j++) {
      var t0 = X.T(it.t + 1.0 + j * (it.gap || 1.35)), c = O(svg, 0, 0, 13, { fill: C.orange, c: C.orange, w: 2 });
      X.tl.set(c, { opacity: 0, x: 90, y: 60 }, 0); X.tl.set(c, { opacity: 1 }, t0);
      X.tl.to(c, { y: -60, duration: 0.35, ease: "power1.out" }, t0); X.tl.to(c, { x: 700, duration: 0.8, ease: "none" }, t0 + 0.35); X.tl.to(c, { y: 90, duration: 0.35, ease: "power1.in" }, t0 + 1.15); X.tl.to(c, { opacity: 0, duration: 0.1 }, t0 + 1.5);
      X.tl.to(liq, { attr: { y: -(h + 20) * (0.1 + (j + 1) * 0.13), height: (h + 20) * (0.1 + (j + 1) * 0.13) }, duration: 0.5 }, t0 + 1.4);
    }
  };
  W.bars = function (svg, it, X) {       // simple bar chart: it.h = heights, it.cols = colors
    var hs = it.hs || [90, 210], base = 300, i;
    L(svg, [[0, base], [it.hs.length * 150, base]], { c: C.grey, w: 4 });
    hs.forEach(function (h, k) { var b = el("rect", { x: 20 + k * 150, y: base - h, width: 100, height: h, rx: 6, fill: (it.cols || [])[k] || C.faint, stroke: C.ink, "stroke-width": 4, opacity: 0 }, svg); X.tl.fromTo(b, { opacity: 0, scaleY: 0.1, transformOrigin: "50% 100%" }, { opacity: 1, scaleY: 1, duration: 0.6, ease: "back.out(1.4)", transformOrigin: "50% 100%", immediateRender: false }, X.T(it.t + k * 0.3)); });
    if (it.inc) { var k2 = hs.length - 1, ih = it.inc, b2 = el("rect", { x: 20 + k2 * 150, y: base - hs[k2], width: 100, height: ih, rx: 6, fill: C.orange, stroke: C.ink, "stroke-width": 4, opacity: 0 }, svg); pop(X, b2, it.incT || it.t + 1.2); }
  };
  W.coin = function (svg, it, X) { O(svg, 30, 30, 28, { fill: C.orange, c: C.orange, w: 3 }); TX(svg, 30, 44, "$", 40, C.paper); };
  W.bag = function (svg, it, X) { R(svg, 0, 40, 220, 150, {}); L(svg, [[70, 40], [70, 8], [150, 8], [150, 40]], { w: 7 }); };
  W.tally = function (svg, it, X) { for (var i = 0; i < (it.n || 12); i++) { var l = L(svg, [[10 + (i % 6) * 30, 10 + Math.floor(i / 6) * 64], [10 + (i % 6) * 30, 60 + Math.floor(i / 6) * 64]], { w: 7 }); l.setAttribute("opacity", 0); fade(X, l, it.t + i * 0.25, 0.25); } };
  W.stack = function (svg, it, X) { for (var i = 0; i < (it.n || 6); i++) { var c = O(svg, 20 + (i % 3) * 38, 60 - Math.floor(i / 3) * 26, 17, { fill: C.orange, c: C.orange, w: 2 }); c.setAttribute("opacity", 0); fade(X, c, it.t + i * 0.3, 0.3); } };

  // ---------- phone ----------
  W.phone = function (svg, it, X) {
    var defs = el("defs", {}, svg), cid = "scr" + (W._n = (W._n || 0) + 1), cp = el("clipPath", { id: cid }, defs); el("rect", { x: 26, y: 54, width: 208, height: 352, rx: 14 }, cp);
    var body = el("g", {}, svg);
    el("rect", { x: 8, y: 8, width: 244, height: 454, rx: 34, fill: C.paper, stroke: C.ink, "stroke-width": 7 }, body);
    el("rect", { x: 26, y: 54, width: 208, height: 352, rx: 14, fill: "none", stroke: C.grey, "stroke-width": 3 }, body);
    O(body, 130, 432, 12, { w: 4 }); el("line", { x1: 108, y1: 30, x2: 152, y2: 30, stroke: C.grey, "stroke-width": 5, "stroke-linecap": "round" }, body);
    var scr = el("g", { "clip-path": "url(#" + cid + ")" }, svg), layers = {};
    var list = layers.list = el("g", {}, scr);
    for (var i = 0; i < 16; i++) { var yy = 70 + i * 34, w1 = 70 + ((i * 37) % 70); L(list, [[44, yy], [44 + w1, yy]], { c: C.grey, w: 5 }); L(list, [[176, yy], [214, yy]], { c: i % 5 === 2 ? C.red : C.grey, w: 5 }); }
    var apps = layers.apps = hidden(el("g", {}, scr)), boxes = [];
    for (var r = 0; r < 3; r++) for (var c = 0; c < 3; c++) boxes.push(el("rect", { x: 46 + c * 62, y: 80 + r * 84, width: 48, height: 56, rx: 12, fill: "none", stroke: C.ink, "stroke-width": 5 }, apps));
    var bars = layers.bars = hidden(el("g", {}, scr)); [150, 128, 104, 78, 52].forEach(function (h, k) { el("rect", { x: 44 + k * 38, y: 380 - h, width: 24, height: h, rx: 4, fill: C.red, opacity: 0.9 }, bars); });
    var chart = layers.chart = hidden(el("g", {}, scr)); L(chart, [[44, 360], [90, 330], [130, 345], [170, 270], [214, 200]], { c: C.green, w: 9 });
    var fillL = layers.fill = hidden(el("g", {}, scr)); R(fillL, 50, 220, 160, 26, {}); var fb = el("rect", { x: 52, y: 222, width: 0, height: 22, fill: C.green }, fillL);
    var cur = "list";
    (it.modes || []).forEach(function (m) {
      var t = X.T(m[0]); if (m[1] === cur) return;
      X.tl.to(layers[cur], { opacity: 0, duration: 0.3 }, t); X.tl.fromTo(layers[m[1]], { opacity: 0, scale: 0.94, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.5)", transformOrigin: "50% 50%", immediateRender: false }, t + 0.05); cur = m[1];
      if (m[1] === "fill") X.tl.to(fb, { attr: { width: 156 }, duration: 1.6, ease: "power2.out" }, t + 0.3);
    });
    if (it.scroll) X.tl.fromTo(list, { y: -170 }, { y: 80, duration: Math.max(0.5, X.T(it.scroll[1]) - X.T(it.scroll[0])), ease: "none", immediateRender: true }, X.T(it.scroll[0]));
    (it.badges || []).forEach(function (t, i) { var b = boxes[[4, 1, 7][i]], bx = +b.getAttribute("x") + 48, by = +b.getAttribute("y"), g = hidden(el("g", {}, apps)); el("circle", { cx: bx, cy: by, r: 13, fill: C.red }, g); X.tl.fromTo(g, { opacity: 0, scale: 0.2, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.45, ease: "back.out(2)", transformOrigin: "50% 50%", immediateRender: false }, X.T(t)); X.tl.to(b, { attr: { stroke: C.red }, duration: 0.25 }, X.T(t)); });
    if (it.ring) { var t0 = X.T(it.ring[0]), n = Math.floor((it.ring[1] - it.ring[0]) / 0.18); for (var q = 0; q < n; q++) X.tl.to(svg, { rotation: q % 2 ? -3 : 3, transformOrigin: "50% 100%", duration: 0.09, ease: "sine.inOut" }, t0 + q * 0.18); X.tl.to(svg, { rotation: 0, duration: 0.1 }, t0 + n * 0.18); }
  };
  W.statement = function (svg, it, X) { R(svg, 0, 0, 200, 270, {}); for (var i = 0; i < 7; i++) { var l = L(svg, [[22, 40 + i * 30], [178, 40 + i * 30]], { c: i === 3 ? C.red : C.grey, w: 5 }); l.setAttribute("opacity", 0); fade(X, l, it.t + 0.2 + i * 0.12, 0.3); } };
  W.clockrev = function (svg, it, X) { O(svg, 80, 80, 66, { w: 7 }); for (var i = 0; i < 12; i++) { var a = i * Math.PI / 6; L(svg, [[80 + Math.cos(a) * 54, 80 + Math.sin(a) * 54], [80 + Math.cos(a) * 62, 80 + Math.sin(a) * 62]], { w: 4 }); } var hand = L(svg, [[80, 80], [80, 36]], { w: 7 }); X.tl.to(hand, { rotation: -720, svgOrigin: "80 80", duration: Math.max(1, X.T((it.end || it.out)) - X.T(it.t)), ease: "power1.inOut" }, X.T(it.t)); };

  // ---------- characters / people ----------
  W.villain = function (svg, it, X) { O(svg, 100, 130, 80, {}); PL(svg, [[30, 80], [100, -30], [170, 80]], { w: 6 }); L(svg, [[50, 120], [86, 136]], { w: 7 }); L(svg, [[150, 120], [114, 136]], { w: 7 }); L(svg, [[70, 180], [100, 164], [130, 180]], { w: 6 }); };
  W.face = function (svg, it, X) { var col = it.k === "red" ? C.red : C.green; O(svg, 80, 80, 74, { c: col, w: 7 }); O(svg, 56, 66, 6, { fill: col, c: col, w: 1 }); O(svg, 104, 66, 6, { fill: col, c: col, w: 1 }); K.ink(svg, it.sad ? "M50 118 q30 -30 60 0" : "M50 100 q30 34 60 0", { c: col, w: 7 }); };
  W.deal = function (svg, it, X) { var a = P.mini(svg, 70, 220, 1.2, "stand"), b = P.mini(svg, 290, 220, 1.2, "stand"); L(svg, [[100, 118], [180, 140], [260, 118]], { w: 8 }); var c = O(svg, 180, 80, 20, { fill: C.orange, c: C.orange, w: 2 }); c.setAttribute("opacity", 0); pop(X, c, it.t + 0.4); };
  W.orgchart = function (svg, it, X) { var bx = [[210, 30], [90, 120], [330, 120], [20, 210], [160, 210], [300, 210], [420, 210]]; bx.forEach(function (b, i) { var r = R(svg, b[0] - 50, b[1] - 24, 100, 48, { w: 4 }); r.setAttribute("opacity", 0); fade(X, r, it.t + i * 0.3, 0.3); }); [[0, 1], [0, 2], [1, 3], [1, 4], [2, 5], [2, 6]].forEach(function (e, i) { var l = L(svg, [[bx[e[0]][0], bx[e[0]][1] + 24], [bx[e[1]][0], bx[e[1]][1] - 24]], { c: C.grey, w: 4 }); l.setAttribute("opacity", 0); fade(X, l, it.t + 0.5 + i * 0.3, 0.3); }); };
  W.race = function (svg, it, X) {
    L(svg, [[0, 260], [960, 260]], { c: C.grey, w: 4 }); L(svg, [[40, 160], [40, 260]], { c: C.orange, w: 6 });
    for (var i = 0; i < 4; i++) { var m = P.mini(svg, 330 + i * 110, 260, 1.0, "run", C.grey); m.setAttribute("opacity", 0); fade(X, m, it.t + i * 0.1, 0.3); X.tl.to(m, { x: 220 - i * 10, duration: Math.max(2, X.T((it.end || it.out) || it.t + 8) - X.T(it.t)), ease: "power1.inOut" }, X.T(it.t + 0.4)); }
    for (var d = 0; d < 6; d++) { var ds = L(svg, [[520 + d * 30, 260], [540 + d * 30, 260]], { c: C.grey, w: 6 }); ds.setAttribute("opacity", 0); fade(X, ds, (it.far || it.t + 6) + d * 0.2, 0.2); }
  };
  W.minis = function (svg, it, X) { (it.who || ["stand", "stand"]).forEach(function (w, i) { var m = P.mini(svg, 60 + i * 130, 220, 1.1, w, (it.cols || [])[i] || C.ink); m.setAttribute("opacity", 0); fade(X, m, it.t + i * 0.2, 0.3); if (it.leave && it.leave.indexOf(i) >= 0) { X.tl.to(m, { x: 260, duration: 2.6, ease: "power1.in" }, X.T(it.leaveT)); X.tl.to(m, { opacity: 0, duration: 0.7 }, X.T(it.leaveT) + 1.9); } }); };

  // ---------- metaphors ----------
  W.iceberg = function (svg, it, X) { var wl = L(svg, [[0, 120], [260, 124], [520, 120]], { c: C.cold, w: 4 }); X.tl.fromTo(wl, { strokeDasharray: 600, strokeDashoffset: 600 }, { strokeDashoffset: 0, duration: 1.2, immediateRender: false }, X.T(it.t)); var tip = PL(svg, [[200, 120], [270, 20], [330, 80], [370, 120]], { w: 6 }); tip.setAttribute("opacity", 0); fade(X, tip, it.t + 0.4); var big = PL(svg, [[110, 124], [40, 230], [130, 360], [290, 410], [450, 360], [520, 230], [450, 124]], { c: C.red, w: 5 }); big.setAttribute("opacity", 0); fade(X, big, it.t + 1.5, 0.8); };
  W.signpost = function (svg, it, X) { L(svg, [[160, 330], [160, 0]], { w: 8 }); var b1 = PL(svg, [[160, 40], [10, 40], [-20, 84], [10, 128], [160, 128]], { w: 5 }), b2 = PL(svg, [[160, 160], [310, 160], [340, 204], [310, 248], [160, 248]], { w: 5 }); TX(svg, 62, 96, "tarde", 38, C.ink); TX(svg, 240, 216, "temprano", 36, C.ink); [b1, b2].forEach(function (b, i) { b.setAttribute("opacity", 0); fade(X, b, it.t + i * 0.4); }); };
  W.hourglass = function (svg, it, X) { var g = P.hourglass(svg, 100, 200, 1.4); var sand = L(svg, [[100, 100], [100, 190]], { c: C.orange, w: 4 }); sand.setAttribute("opacity", 0); X.tl.fromTo(sand, { opacity: 0 }, { opacity: 1, duration: 0.5, immediateRender: false }, X.T(it.t + 0.6)); var pile = PL(svg, [[60, 200], [100, 150], [140, 200]], { c: C.orange, fill: C.orange, w: 3 }); pile.setAttribute("opacity", 0); X.tl.fromTo(pile, { opacity: 0, scaleY: 0.1, transformOrigin: "50% 100%" }, { opacity: 1, scaleY: 1, duration: Math.max(1, X.T((it.end || it.out) || it.t + 3) - X.T(it.t) - 1), ease: "none", transformOrigin: "50% 100%", immediateRender: false }, X.T(it.t + 1.2)); };
  W.hill = function (svg, it, X) { var h = L(svg, [[0, 20], [300, 160], [640, 300]], { w: 5 }); var big = O(svg, 560, 200, 80, {}), sm = O(svg, 40, -8, 26, {}); big.setAttribute("opacity", 0); sm.setAttribute("opacity", 0); fade(X, big, it.t); fade(X, sm, it.t + 0.4); X.tl.to(big, { rotation: 360, svgOrigin: "560 200", duration: 5, ease: "none" }, X.T(it.t + 0.6)); var tr = L(svg, [[520, 190], [590, 170]], { w: 4 }); tr.setAttribute("opacity", 0); fade(X, tr, it.t + 0.8); };
  W.snowball = function (svg, it, X) { L(svg, [[0, 200], [440, 200]], { c: C.grey, w: 4 }); var b = O(svg, 40, 170, 26, {}); b.setAttribute("opacity", 0); fade(X, b, it.t); X.tl.to(b, { attr: { r: 90, cx: 340, cy: 110 }, duration: Math.max(2, X.T((it.end || it.out) || it.t + 5) - X.T(it.t)), ease: "power1.in" }, X.T(it.t + 0.4)); };
  W.moon = function (svg, it, X) { var g = P.moon(svg, 80, 150, 1.6); for (var i = 0; i < 6; i++) { var s = O(svg, 180 + i * 34, 20 + (i % 3) * 44, 5, { fill: C.ink, c: C.ink, w: 1 }); s.setAttribute("opacity", 0); fade(X, s, it.t + 0.2 + i * 0.2, 0.3); } };
  W.calstack = function (svg, it, X) { for (var i = 0; i < (it.n || 10); i++) { var c = P.calendar(svg, 50 + (i % 5) * 96, 100 + Math.floor(i / 5) * 120, 0.7); c.setAttribute("opacity", 0); X.tl.fromTo(c, { opacity: 0, y: -14 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", immediateRender: false }, X.T(it.t + i * 0.45)); } };
  W.poster = function (svg, it, X) { R(svg, 0, 0, 280, 190, {}); PL(svg, [[140, 40], [156, 84], [204, 88], [166, 118], [180, 164], [140, 138], [100, 164], [114, 118], [76, 88], [124, 84]], { c: C.orange, w: 4 }); };
  W.eye = function (svg, it, X) { PL(svg, [[0, 60], [80, 14], [160, 60], [80, 106]], { w: 5 }); O(svg, 80, 60, 18, { fill: C.ink }); };
  W.chain = function (svg, it, X) { var ls = [0, 1, 2].map(function (i) { return O(svg, 54 + i * 100, 60, 54, { w: 7 }); }); var cr = L(svg, [[104, 20], [124, 60], [104, 100]], { c: C.red, w: 6 }); cr.setAttribute("opacity", 0); fade(X, cr, it.t + 1.4, 0.2); X.tl.to(ls[0], { x: -34, duration: 0.5, ease: "power2.out" }, X.T(it.t + 2.4)); X.tl.to(ls[1], { y: -22, duration: 0.5 }, X.T(it.t + 2.4)); X.tl.to(ls[2], { x: 34, duration: 0.5 }, X.T(it.t + 2.4)); };
  W.balance = function (svg, it, X) {
    L(svg, [[300, 330], [300, 70]], { w: 8 }); var beam = el("g", {}, svg); L(beam, [[40, 70], [560, 70]], { w: 8 });
    [[100, 70, 60, 230], [100, 70, 140, 230], [500, 70, 460, 230], [500, 70, 540, 230]].forEach(function (s) { L(beam, [[s[0], s[1]], [s[2], s[3]]], { c: C.grey, w: 3 }); });
    L(beam, [[30, 230], [170, 230]], { w: 6 }); L(beam, [[430, 230], [570, 230]], { w: 6 }); P.box(beam, 100, 230, 0.9); P.mini(beam, 500, 230, 0.9, "stand");
    X.tl.set(beam, { rotation: -8, svgOrigin: "300 70" }, 0); X.tl.to(beam, { rotation: 9, duration: 1.3, ease: "back.out(1.2)", svgOrigin: "300 70" }, X.T(it.t));
  };
  W.palm = function (svg, it, X) { L(svg, [[100, 220], [112, 120], [130, 40]], { w: 9 }); [[-70, 10], [-30, -40], [40, -50], [90, -10], [60, 40]].forEach(function (d, i) { var l = L(svg, [[130, 40], [130 + d[0], 40 + d[1] + 40]], { w: 6 }); l.setAttribute("opacity", 0); fade(X, l, it.t + i * 0.1, 0.3); }); };
  W.timeline = function (svg, it, X) { L(svg, [[0, 100], [600, 100]], { w: 6 }); for (var i = 0; i < 10; i++) L(svg, [[i * 60 + 30, 88], [i * 60 + 30, 112]], { c: C.grey, w: 4 }); var old = el("g", { opacity: 0 }, svg); L(old, [[600, 100], [600, 20]], { c: C.grey, w: 5 }); PL(old, [[600, 20], [660, 40], [600, 60]], { c: C.grey, w: 4 }); old.setAttribute("stroke-dasharray", "10 8"); fade(X, old, it.t); var nw = el("g", { opacity: 0 }, svg); L(nw, [[600, 100], [600, 20]], { c: C.green, w: 6 }); PL(nw, [[600, 20], [660, 40], [600, 60]], { c: C.green, fill: C.green, w: 4 }); fade(X, nw, it.t + 0.2); X.tl.to(nw, { x: -240, duration: 2.2, ease: "back.out(1.1)" }, X.T(it.t + 2)); };
  W.cloud = function (svg, it, X) { PL(svg, [[0, 120], [60, 50], [160, 50], [210, 0], [330, 10], [380, 80], [470, 100], [490, 160], [0, 160]], { w: 6 }); if (it.rain) for (var i = 0; i < 8; i++) { var r = L(svg, [[40 + i * 55, 190], [24 + i * 55, 236]], { c: C.cold, w: 4 }); r.setAttribute("opacity", 0); fade(X, r, it.t + 0.4 + i * 0.1, 0.25); } if (it.bolt) { var b = PL(svg, [[300, 170], [260, 260], [320, 260], [270, 380]], { c: C.orange, w: 7 }); b.setAttribute("opacity", 0); X.tl.fromTo(b, { opacity: 0 }, { opacity: 1, duration: 0.1, immediateRender: false }, X.T(it.t + 1.4)); X.tl.to(b, { opacity: 0, duration: 0.3 }, X.T(it.t + 1.8)); X.tl.fromTo(b, { opacity: 0 }, { opacity: 1, duration: 0.1, immediateRender: false }, X.T(it.t + 3.4)); X.tl.to(b, { opacity: 0, duration: 0.3 }, X.T(it.t + 3.8)); } if (it.drift) X.tl.to(svg, { x: it.drift, duration: Math.max(2, X.T((it.end || it.out) || it.t + 3) - X.T(it.t)), ease: "power1.in" }, X.T(it.t)); };
  W.stairs = function (svg, it, X) { var n = it.n || 4; for (var i = 0; i < n; i++) { var s = L(svg, [[i * 110, 330 - i * 90], [i * 110 + 110, 330 - i * 90], [i * 110 + 110, 330 - (i + 1) * 90]], { w: 7 }); s.setAttribute("opacity", 0); fade(X, s, it.t + i * 0.25, 0.3); } };
  W.blocks = function (svg, it, X) {   // stacked blocks: it.items = [[text,color,t,widthRatio]]
    var y = 0; (it.items || []).forEach(function (b, i) { var wd = 440 * (b[3] || 1 - i * 0.2), r = R(svg, (440 - wd) / 2, 330 - 100 * (i + 1), wd, 92, { c: b[1] || C.ink, w: 6 }); r.setAttribute("opacity", 0); fade(X, r, b[2], 0.4); var tx = TX(svg, 220, 330 - 100 * i - 36, b[0], 38, b[1] || C.ink); tx.setAttribute("opacity", 0); fade(X, tx, b[2] + 0.1, 0.4); });
  };
  W.heart = function (svg, it, X) { K.ink(svg, "M100 180 C-40 70 -40 -40 100 20 C240 -40 240 70 100 180 Z", { fill: C.green, c: C.green, w: 5 }); };
  W.spring = function (svg, it, X) { var sp = K.ink(svg, "M100 400 l60 -30 l-120 -30 l120 -30 l-120 -30 l120 -30 l-120 -30 l60 -30", { c: C.green, w: 9 }); X.tl.to(sp, { scaleY: 0.7, transformOrigin: "50% 100%", duration: 0.4 }, X.T(it.t + 0.8)); X.tl.to(sp, { scaleY: 1.08, transformOrigin: "50% 100%", duration: 0.5, ease: "back.out(2)" }, X.T(it.t + 1.3)); };
  W.crack = function (svg, it, X) { L(svg, [[0, 100], [260, 100]], { c: C.green, w: 12 }); TX(svg, 130, 150, "tu piso", 36, C.green); L(svg, [[330, 100], [380, 80], [350, 140], [430, 110], [400, 170], [470, 130]], { c: C.red, w: 6 }); L(svg, [[540, 100], [600, 100]], { c: C.red, w: 6 }); };
  W.yacht = function (svg, it, X) { PL(svg, [[0, 100], [260, 100], [200, 170], [60, 170]], { w: 5 }); L(svg, [[130, 100], [130, -60]], { w: 5 }); PL(svg, [[130, -60], [210, 90], [130, 90]], { w: 4 }); };
  W.window = function (svg, it, X) { var win = R(svg, 0, 0, 380, 250, {}); L(svg, [[0, 60], [380, 60]], { w: 5 }); var tab = R(svg, 14, 8, 130, 44, { w: 4 }); L(svg, [[112, 22], [128, 40]], { c: C.red, w: 5 }); L(svg, [[128, 22], [112, 40]], { c: C.red, w: 5 }); X.tl.to(tab, { scale: 0.05, opacity: 0, transformOrigin: "50% 50%", duration: 0.5 }, X.T(it.t + 0.8)); };
  W.medcross = function (svg, it, X) { O(svg, 80, 80, 70, { c: C.red, w: 8 }); L(svg, [[80, 36], [80, 124]], { c: C.red, w: 13 }); L(svg, [[36, 80], [124, 80]], { c: C.red, w: 13 }); };
  W.knot = function (svg, it, X) { var k = K.ink(svg, "M0 60 q60 -70 80 0 t -40 70 t 90 -30 t -70 -60 t 60 30", { c: C.red, w: 6 }); var ln = L(svg, [[0, 60], [160, 60]], { c: C.green, w: 7 }); ln.setAttribute("opacity", 0); X.tl.to(k, { opacity: 0, duration: 0.5 }, X.T(it.t + 1.0)); X.tl.fromTo(ln, { opacity: 0 }, { opacity: 1, duration: 0.5, immediateRender: false }, X.T(it.t + 1.0)); };
  W.turn = function (svg, it, X) { var g = el("g", {}, svg); L(g, [[0, 330], [0, 60]], { w: 8 }); PL(g, [[0, 20], [110, 20], [150, 60], [110, 100], [0, 100]], { w: 5 }); X.tl.set(g, { rotation: 70, svgOrigin: "0 330" }, 0); X.tl.to(g, { rotation: 0, duration: 1.0, ease: "back.out(1.4)", svgOrigin: "0 330" }, X.T(it.t)); };
  W.pen = function (svg, it, X) { var p = L(svg, [[120, 0], [10, 110]], { c: C.orange, w: 9 }); X.tl.to(p, { x: -20, y: 20, duration: 1.0, ease: "power2.in" }, X.T(it.t)); X.tl.to(p, { x: 40, y: -30, duration: 0.7, ease: "power2.out" }, X.T(it.t + 1.6)); };
  W.doc = function (svg, it, X) { R(svg, 0, 0, 240, 320, {}); for (var i = 0; i < 7; i++) L(svg, [[24, 50 + i * 36], [216, 50 + i * 36]], { c: C.grey, w: 4 }); L(svg, [[30, 290], [130, 290]], { w: 4 }); };
  W.room = function (svg, it, X) { R(svg, 0, 0, 200, 180, {}); L(svg, [[0, 150], [200, 150]], { c: C.grey, w: 3 }); };
  W.plane = function (svg, it, X) { PL(svg, [[0, 60], [150, 50], [90, 20]], { w: 6 }); L(svg, [[60, 56], [20, 104]], { w: 6 }); L(svg, [[60, 56], [86, 0]], { w: 6 }); };
  W.quote = function (svg, it, X) { PL(svg, [[0, 0], [140, 0], [140, 190], [0, 190]], { w: 5 }); TX(svg, 70, 120, "$$$", 64, C.red); };
  W.arrowcurve = function (svg, it, X) { var p = K.ink(svg, "M0 120 Q120 -20 240 80", { c: it.k === "green" ? C.green : C.orange, w: 8 }); X.tl.fromTo(p, { strokeDasharray: 400, strokeDashoffset: 400 }, { strokeDashoffset: 0, duration: 0.8, immediateRender: false }, X.T(it.t)); K.ink(svg, "M215 62 L242 82 L212 100", { c: it.k === "green" ? C.green : C.orange, w: 8 }); };

  // ---------- inline symbols ----------
  W.sym = function (svg, it, X) {
    var col = { red: C.red, green: C.green, orange: C.orange, grey: C.grey }[it.k] || C.ink, n = it.n;
    if (n === "arrow") { L(svg, [[0, 30], [90, 30]], { c: col, w: 8 }); L(svg, [[66, 8], [92, 30], [66, 52]], { c: col, w: 8 }); }
    else if (n === "down") { L(svg, [[30, 0], [30, 90]], { c: col, w: 8 }); L(svg, [[8, 66], [30, 92], [52, 66]], { c: col, w: 8 }); }
    else if (n === "up") { L(svg, [[30, 92], [30, 2]], { c: col, w: 8 }); L(svg, [[8, 26], [30, 0], [52, 26]], { c: col, w: 8 }); }
    else if (n === "eq") { L(svg, [[0, 14], [70, 14]], { c: col, w: 9 }); L(svg, [[0, 46], [70, 46]], { c: col, w: 9 }); }
    else if (n === "neq") { L(svg, [[0, 14], [70, 14]], { c: col, w: 9 }); L(svg, [[0, 46], [70, 46]], { c: col, w: 9 }); L(svg, [[50, -4], [20, 64]], { c: col, w: 9 }); }
    else if (n === "plus") { L(svg, [[0, 30], [60, 30]], { c: col, w: 9 }); L(svg, [[30, 0], [30, 60]], { c: col, w: 9 }); }
    else if (n === "cross") { L(svg, [[0, 0], [70, 70]], { c: C.red, w: 10 }); L(svg, [[70, 0], [0, 70]], { c: C.red, w: 10 }); }
    else if (n === "check") { L(svg, [[0, 40], [28, 70], [80, 0]], { c: C.green, w: 11 }); }
    else if (n === "q") { TX(svg, 30, 70, "?", 100, col); }
    else if (n === "dots") { TX(svg, 50, 70, "...", 100, col); }
    else if (n === "snow") { for (var i = 0; i < 4; i++) { var a = i * Math.PI / 4; L(svg, [[40 + Math.cos(a) * 26, 40 + Math.sin(a) * 26], [40 - Math.cos(a) * 26, 40 - Math.sin(a) * 26]], { c: C.cold, w: 5 }); } }
    else if (n === "note") { TX(svg, 30, 60, "♫", 80, C.orange); }
    else if (n === "z") { TX(svg, 60, 60, "Zzz", 70, C.cold); }
  };
  root.WIDGETS = W;
})(window);

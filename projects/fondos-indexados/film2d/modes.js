/* FABRICA_3 MODES_V1: full-stage scene modes for the finance film (retention: the film alternates these with the classic
 * Stickman + window scenes).
 *   graph      animated line chart + a big numeric counter that climbs / falls to each value of the script
 *   breakdown  a central block with connector lines to numbered parts 01, 02, 03 ... (the hidden pieces of a debt / tax / business)
 *   maze       clean geometry for financial traps: kind "maze" (a dot trapped in a labyrinth), "rings" (concentric rings closing in)
 *              or "nodes" (a network where glowing dots carry the money to a hub)
 *   punch      Stick-Action giant text (1-3 key words or one big figure) next to the Stickman alone
 * Each mode draws into one SVG (viewBox 1700 x 760 = the scene area above the subtitles) and adds its own GSAP tweens.
 * RAM: glows are small radial gradients (no CSS / SVG blur filters, no backdrop-filter); the svg is class "flat" (no ink boil);
 * every tween is finite and positioned on the timeline (seek-safe, deterministic: no clocks, no Math.random).
 * Counters use a GSAP function setter (not onUpdate) so they render correctly on every seeked frame.
 * Text that the audit must see (titles, labels, numbers, parts, beats) carries class "item". */
(function (root) {
  "use strict";
  var K = root.KIT, C = K.C, el = K.el, M = {}, UID = 0;
  var VW = 1700, VH = 760, PANEL = "#0f151e", FAINT = "#243041", COL = function (k, d) { return C[k] || C[d] || C.orange; };

  // ---------- helpers ----------
  function uid(p) { return p + (++UID); }
  function defs(svg) { return svg.querySelector("defs") || el("defs", {}, svg); }
  function rgrad(svg, col, a) {
    var id = uid("mg"), g = el("radialGradient", { id: id }, defs(svg));
    el("stop", { offset: 0, "stop-color": col, "stop-opacity": a == null ? 0.85 : a }, g);
    el("stop", { offset: 0.38, "stop-color": col, "stop-opacity": (a == null ? 0.85 : a) * 0.35 }, g);
    el("stop", { offset: 1, "stop-color": col, "stop-opacity": 0 }, g);
    return "url(#" + id + ")";
  }
  function lgrad(svg, col, a) {
    var id = uid("ml"), g = el("linearGradient", { id: id, x1: 0, y1: 0, x2: 0, y2: 1 }, defs(svg));
    el("stop", { offset: 0, "stop-color": col, "stop-opacity": a }, g); el("stop", { offset: 1, "stop-color": col, "stop-opacity": 0 }, g);
    return "url(#" + id + ")";
  }
  function txt(p, x, y, s, size, col, anchor, cls) {
    var t = el("text", { x: x, y: y, "font-family": "InkHand, cursive", "font-size": size, fill: col || C.ink, "text-anchor": anchor || "start" }, p);
    t.textContent = s; if (cls) t.setAttribute("class", cls); return t;
  }
  function seg(p, d, col, w, o) { return el("path", Object.assign({ d: d, fill: "none", stroke: col, "stroke-width": w, "stroke-linecap": "round", "stroke-linejoin": "round" }, o || {}), p); }
  // glowing dot = soft radial halo + solid core + white highlight (all flat fills)
  function glowDot(svg, p, col, r) {
    var g = el("g", {}, p);
    el("circle", { cx: 0, cy: 0, r: r * 3.4, fill: rgrad(svg, col) }, g);
    el("circle", { cx: 0, cy: 0, r: r, fill: col }, g);
    el("circle", { cx: -r * 0.28, cy: -r * 0.28, r: r * 0.38, fill: "#ffffff", opacity: 0.85 }, g);
    return g;
  }
  function at(X, t) { return X.T(t); }
  // reveal: opacity + small rise, static start state so the item is hidden before its time
  function show(X, node, t, o) {
    o = o || {}; node.style.opacity = 0;
    X.tl.fromTo(node, { opacity: 0, y: o.dy != null ? o.dy : 18, x: o.dx || 0 }, { opacity: 1, y: 0, x: 0, duration: o.d || 0.5, ease: o.ease || "power3.out", immediateRender: false }, at(X, t));
  }
  function popIn(X, node, t, o) {
    o = o || {}; node.style.opacity = 0;
    X.tl.fromTo(node, { opacity: 0, scale: o.from || 0.3, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: o.d || 0.5, ease: "back.out(2)", transformOrigin: "50% 50%", immediateRender: false }, at(X, t));
  }
  // stroke draw-on: hidden (full dash offset) until t, then drawn in d seconds
  function drawOn(X, node, t, d, ease) {
    var len = node.getTotalLength ? node.getTotalLength() : 1000; len = Math.max(1, len);
    node.style.strokeDasharray = len + " " + (len + 2); node.style.strokeDashoffset = len;
    X.tl.fromTo(node, { strokeDashoffset: len }, { strokeDashoffset: 0, duration: d, ease: ease || "power2.inOut", immediateRender: false }, at(X, t));
    return len;
  }
  function fmt(v, f) {
    f = f || {}; var dec = f.dec || 0, neg = v < 0, n = Math.abs(v), s = n.toFixed(dec), parts = s.split("."), i = parts[0], o = "";
    while (i.length > 3) { o = "," + i.slice(-3) + o; i = i.slice(0, -3); }
    return (neg ? "-" : "") + (f.pre || "") + i + o + (dec ? "." + parts[1] : "") + (f.suf || "");
  }
  // deterministic pseudo-random generator (seeded by the scene start time)
  function rng(seed) { var a = Math.floor(seed * 1000) + 7; return function () { a |= 0; a = a + 0x6D2B79F5 | 0; var t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  function region(X) { return { L: 110 + (X.camL ? 250 : 0), R: VW - 60 - (X.camR ? 250 : 0) }; }
  function title(X, svg, sc, L) { if (!sc.title) return; var t = txt(svg, L, 86, sc.title, 54, C.ink, "start", "item"); show(X, t, sc.t0 != null ? sc.t0 : sc.a + 0.25); }
  // text column of "beats" (short phrases that land with the voice): rounded panel + text, revealed one by one
  function beats(X, svg, list, x0, x1, y0, gap) {
    (list || []).forEach(function (b, i) {
      var y = y0 + i * gap, col = COL(b[2], "orange"), g = el("g", { "class": "item" }, svg);
      el("rect", { x: x0, y: y - 46, width: x1 - x0, height: 74, rx: 22, fill: PANEL, stroke: col, "stroke-width": 3, opacity: 0.95 }, g);
      el("circle", { cx: x0 + 34, cy: y - 9, r: 8, fill: col }, g);
      txt(g, x0 + 60, y + 4, b[1], 42, col);
      show(X, g, b[0], { dx: 40, dy: 0 });
    });
  }

  // ---------- GRAPH ----------
  // sc.pts = [[t, value, "x label"?], ...]  (t = absolute narration seconds; the first point appears at its t)
  // sc.k = line color, sc.f = { pre: "$", suf: "", dec: 0 }, sc.title, sc.cl = small label under the counter, sc.min / sc.max
  M.graph = function (svg, sc, X) {
    var R = region(X), pts = sc.pts || [], col = COL(sc.k, "red"), f = sc.f || { pre: "$" }, n = pts.length;
    if (n < 2) return;
    var x0 = R.L + 10, x1 = R.R - 40, yT = 320, yB = 640;
    var vals = pts.map(function (p) { return p[1]; }), mx = sc.max != null ? sc.max : Math.max.apply(null, vals) * 1.1, mn = sc.min != null ? sc.min : Math.min(0, Math.min.apply(null, vals));
    var X_ = function (i) { return x0 + (x1 - x0) * i / (n - 1); }, Y_ = function (v) { return yB - (yB - yT) * (v - mn) / ((mx - mn) || 1); };
    title(X, svg, sc, R.L);
    // grid + baseline (faint, drawn in at the start)
    var t0 = pts[0][0], gridT = Math.max(sc.a + 0.1, t0 - 0.6);
    for (var g = 0; g < 4; g++) { var gy = yT + (yB - yT) * g / 3, ln = seg(svg, "M" + x0 + " " + gy + " L" + x1 + " " + gy, FAINT, 2, { "stroke-dasharray": "6 10" }); ln.style.opacity = 0; X.tl.fromTo(ln, { opacity: 0 }, { opacity: 1, duration: 0.5, immediateRender: false }, at(X, gridT + g * 0.06)); }
    drawOn(X, seg(svg, "M" + x0 + " " + yB + " L" + x1 + " " + yB, C.grey, 4), gridT, 0.6);
    // area under the line, revealed by a clip rect that follows the line
    var cid = uid("mc"), cp = el("clipPath", { id: cid }, defs(svg)), cr = el("rect", { x: x0 - 10, y: 0, width: 0, height: VH }, cp);
    var area = "M" + X_(0) + " " + yB + pts.map(function (p, i) { return " L" + X_(i) + " " + Y_(p[1]); }).join("") + " L" + X_(n - 1) + " " + yB + " Z";
    el("path", { d: area, fill: lgrad(svg, col, 0.30), "clip-path": "url(#" + cid + ")" }, svg);
    // big counter (top right) + its label
    var cnt = txt(svg, x1, 140, fmt(vals[0], f), 120, col, "end", "item"); show(X, cnt, t0, { dy: 26 });
    if (sc.cl) { var cl = txt(svg, x1, 240, sc.cl, 36, C.grey, "end", "item"); show(X, cl, t0 + 0.15); }
    var cur = vals[0], setter = { v: function (x) { if (!arguments.length) return cur; cur = x; cnt.textContent = fmt(x, f); } };
    // the travelling glow dot
    var dot = glowDot(svg, svg, col, 13); dot.style.opacity = 0; root.gsap.set(dot, { x: X_(0), y: Y_(vals[0]) });
    X.tl.fromTo(dot, { opacity: 0 }, { opacity: 1, duration: 0.3, immediateRender: false }, at(X, t0));
    var marker = function (i, t) {
      var mk = el("circle", { cx: X_(i), cy: Y_(vals[i]), r: 10, fill: col, stroke: C.paper, "stroke-width": 4 }, svg); popIn(X, mk, t, { d: 0.4 });
      if (sc.vals !== false) { var lb = txt(svg, X_(i), Y_(vals[i]) - 30, fmt(vals[i], f), 38, C.ink, "middle", "item"); show(X, lb, t + 0.1, { dy: 10 }); }
      if (pts[i][2]) { var xl = txt(svg, X_(i), yB + 46, pts[i][2], 34, C.grey, "middle", "item"); show(X, xl, t, { dy: 10 }); }
    };
    X.tl.fromTo(cr, { attr: { width: 0 } }, { attr: { width: 10 }, duration: 0.2, immediateRender: false }, at(X, t0));
    marker(0, t0);
    for (var i = 1; i < n; i++) {
      var ta = pts[i][0], d = Math.max(0.5, Math.min(1.1, (pts[i][0] - pts[i - 1][0]) * 0.75)), ts = ta - d;
      ts = Math.max(ts, pts[i - 1][0] + 0.15); d = ta - ts;
      var s = seg(svg, "M" + X_(i - 1) + " " + Y_(vals[i - 1]) + " L" + X_(i) + " " + Y_(vals[i]), col, 7);
      drawOn(X, s, ts, d, "power1.inOut");
      X.tl.to(cr, { attr: { width: X_(i) - x0 + 10 }, duration: d, ease: "power1.inOut" }, at(X, ts));
      X.tl.to(dot, { x: X_(i), y: Y_(vals[i]), duration: d, ease: "power1.inOut" }, at(X, ts));
      X.tl.fromTo(setter, { v: vals[i - 1] }, { v: vals[i], duration: d, ease: "power1.inOut", immediateRender: false }, at(X, ts));
      marker(i, ta);
    }
  };

  // ---------- BREAKDOWN ----------
  // sc.center = ["préstamo", "$5,000"], sc.ck = its color, sc.t0 = when the block appears
  // sc.parts = [["intereses", "$2,400", "red", t], ...] (2-5 parts, numbered 01, 02 ...), sc.total = ["lo que pagas", "$9,100", "red", t]
  M.breakdown = function (svg, sc, X) {
    var R = region(X), parts = sc.parts || [], n = parts.length, ck = COL(sc.ck, "orange"), t0 = sc.t0 != null ? sc.t0 : sc.a + 0.3;
    title(X, svg, sc, R.L);
    var bw = 470, bh = 210, cx = R.L + bw / 2 + 10, cy = sc.total ? 360 : 400, xL = Math.max(cx + bw / 2 + 200, R.R - 640), xR = R.R;
    var halo = el("ellipse", { cx: cx, cy: cy, rx: bw * 0.72, ry: bh * 0.9, fill: rgrad(svg, ck, 0.22) }, svg);   // decorative: not an audited item
    popIn(X, halo, t0, { from: 0.6, d: 0.6 });
    var box = el("g", { "class": "item" }, svg);
    el("rect", { x: cx - bw / 2, y: cy - bh / 2, width: bw, height: bh, rx: 30, fill: PANEL, stroke: ck, "stroke-width": 5 }, box);
    var c = sc.center || ["", ""];
    txt(box, cx, cy - 18, c[0], 50, C.ink, "middle"); txt(box, cx, cy + 62, c[1], 72, ck, "middle");
    popIn(X, box, t0, { from: 0.6, d: 0.6 });
    var top = 150, bot = 680, gap = n > 1 ? Math.min(150, (bot - top) / (n - 1)) : 0, ys = parts.map(function (p, i) { return (top + bot) / 2 + (i - (n - 1) / 2) * gap; });
    parts.forEach(function (p, i) {
      var y = ys[i], col = COL(p[2], "red"), t = p[3];
      var path = "M" + (cx + bw / 2) + " " + cy + " C" + (cx + bw / 2 + 140) + " " + cy + " " + (xL - 150) + " " + y + " " + (xL - 6) + " " + y;
      drawOn(X, seg(svg, path, col, 4, { opacity: 0.85 }), t - 0.35, 0.5);
      var end = el("circle", { cx: xL - 6, cy: y, r: 7, fill: col }, svg); popIn(X, end, t - 0.05, { d: 0.3 });
      var g = el("g", { "class": "item" }, svg);
      el("rect", { x: xL + 6, y: y - 52, width: xR - xL - 6, height: 104, rx: 24, fill: PANEL, stroke: FAINT, "stroke-width": 2 }, g);
      el("circle", { cx: xL + 62, cy: y, r: 36, fill: "none", stroke: col, "stroke-width": 4 }, g);
      txt(g, xL + 62, y + 14, (i < 9 ? "0" : "") + (i + 1), 40, col, "middle");
      txt(g, xL + 118, y + 14, p[0], 44, C.ink, "start");
      if (p[1]) txt(g, xR - 26, y + 16, p[1], 50, col, "end");
      show(X, g, t, { dx: 50, dy: 0, d: 0.55 });
    });
    if (sc.total) {
      var tt = sc.total, tc = COL(tt[2], "red"), g2 = el("g", { "class": "item" }, svg);
      el("line", { x1: cx - bw / 2, y1: cy + bh / 2 + 60, x2: cx + bw / 2, y2: cy + bh / 2 + 60, stroke: C.grey, "stroke-width": 3, "stroke-dasharray": "8 10" }, g2);
      txt(g2, cx, cy + bh / 2 + 120, tt[0], 40, C.grey, "middle"); txt(g2, cx, cy + bh / 2 + 210, tt[1], 92, tc, "middle");
      show(X, g2, tt[3], { dy: 30 });
    }
  };

  // ---------- MAZE (minimalist geometry for traps) ----------
  // sc.kind = "maze" | "rings" | "nodes"; sc.k = trap color; sc.t0 = when the geometry draws in
  // sc.beats = [[t, "frase corta", "color"], ...] (up to 4, right column); nodes: sc.nodes = ["tu sueldo", ...] (outer labels), sc.hub = "la app"
  M.maze = function (svg, sc, X) {
    var R = region(X), col = COL(sc.k, "red"), t0 = sc.t0 != null ? sc.t0 : sc.a + 0.3, list = sc.beats || [];
    var hasB = list.length > 0, gR = hasB ? R.L + (R.R - R.L) * 0.56 : R.R, gcx = (R.L + gR) / 2, gcy = 410;
    title(X, svg, sc, R.L);
    var tEnd = list.length ? list[list.length - 1][0] : sc.b - 1, kind = sc.kind || "maze";
    if (kind === "maze") maze(svg, sc, X, R.L, gR, gcy, col, t0, tEnd);
    else if (kind === "rings") rings(svg, sc, X, gcx, gcy, col, t0, list);
    else nodes(svg, sc, X, gcx, gcy, gR - R.L, col, t0, list);
    if (hasB) beats(X, svg, list, gR + 70, R.R, 250, 120);
  };
  function maze(svg, sc, X, L, Rr, cy, col, t0, tEnd) {
    var cols = 10, rows = 7, cs = Math.min(78, (Rr - L - 40) / cols), w = cols * cs, h = rows * cs, ox = (L + Rr) / 2 - w / 2, oy = cy - h / 2 + 20;
    var R = rng(sc.a), seen = {}, walls = {}, k = function (c, r) { return c + "," + r; };
    // perfect maze: iterative recursive backtracker (seeded); walls[cell] = {N,S,E,W}
    for (var c = 0; c < cols; c++) for (var r = 0; r < rows; r++) walls[k(c, r)] = { N: 1, S: 1, E: 1, W: 1 };
    var stack = [[0, 0]], D = [["N", 0, -1, "S"], ["S", 0, 1, "N"], ["E", 1, 0, "W"], ["W", -1, 0, "E"]]; seen[k(0, 0)] = 1;
    while (stack.length) {
      var cur = stack[stack.length - 1], opts = D.filter(function (d) { var nc = cur[0] + d[1], nr = cur[1] + d[2]; return nc >= 0 && nr >= 0 && nc < cols && nr < rows && !seen[k(nc, nr)]; });
      if (!opts.length) { stack.pop(); continue; }
      var d = opts[Math.floor(R() * opts.length)], nc = cur[0] + d[1], nr = cur[1] + d[2];
      walls[k(cur[0], cur[1])][d[0]] = 0; walls[k(nc, nr)][d[3]] = 0; seen[k(nc, nr)] = 1; stack.push([nc, nr]);
    }
    var dw = "";
    for (c = 0; c < cols; c++) for (r = 0; r < rows; r++) {
      var x = ox + c * cs, y = oy + r * cs, wl = walls[k(c, r)];
      if (wl.N && !(c === 0 && r === 0)) dw += "M" + x + " " + y + " h" + cs;
      if (wl.W && !(c === 0 && r === 0)) dw += "M" + x + " " + y + " v" + cs;
      if (r === rows - 1) dw += "M" + x + " " + (y + cs) + " h" + cs;
      if (c === cols - 1) dw += "M" + (x + cs) + " " + y + " v" + cs;
    }
    var wallP = seg(svg, dw, "#5b6574", 5); drawOn(X, wallP, t0, 1.4, "power1.inOut");
    // path from the entrance (top left) to the exit cell (bottom right): BFS on open walls
    var prev = {}, q = [[0, 0]], goal = k(cols - 1, rows - 1); prev[k(0, 0)] = null;
    while (q.length) { var u = q.shift(); if (k(u[0], u[1]) === goal) break; D.forEach(function (d) { if (walls[k(u[0], u[1])][d[0]]) return; var v = [u[0] + d[1], u[1] + d[2]], kv = k(v[0], v[1]); if (kv in prev) return; prev[kv] = u; q.push(v); }); }
    var path = [], node = [cols - 1, rows - 1]; while (node) { path.unshift(node); node = prev[k(node[0], node[1])]; }
    var P = function (cell) { return [ox + (cell[0] + 0.5) * cs, oy + (cell[1] + 0.5) * cs]; };
    var trail = seg(svg, "M" + path.map(function (p) { return P(p).join(" "); }).join(" L"), col, 6, { opacity: 0.75 });
    var tA = t0 + 1.5, dur = Math.max(1.5, tEnd - tA + 0.6);
    drawOn(X, trail, tA, dur, "none");
    var dot = glowDot(svg, svg, col, 12), st = P(path[0]); dot.style.opacity = 0; root.gsap.set(dot, { x: st[0], y: st[1] });
    X.tl.fromTo(dot, { opacity: 0 }, { opacity: 1, duration: 0.3, immediateRender: false }, at(X, tA - 0.2));
    var step = dur / Math.max(1, path.length - 1);
    for (var i = 1; i < path.length; i++) { var p2 = P(path[i]); X.tl.to(dot, { x: p2[0], y: p2[1], duration: step, ease: "none" }, at(X, tA + (i - 1) * step)); }
    // the exit is locked: red bar + cross at the end of the run
    var ex = ox + w, ey = oy + h - cs, lock = el("g", {}, svg);
    el("line", { x1: ex, y1: ey + 8, x2: ex, y2: ey + cs - 8, stroke: C.red, "stroke-width": 10, "stroke-linecap": "round" }, lock);
    el("path", { d: "M" + (ex + 22) + " " + (ey + cs / 2 - 18) + " l36 36 M" + (ex + 58) + " " + (ey + cs / 2 - 18) + " l-36 36", stroke: C.red, "stroke-width": 8, "stroke-linecap": "round", fill: "none" }, lock);
    popIn(X, lock, tA + dur - 0.1, { d: 0.45 });
  }
  function rings(svg, sc, X, cx, cy, col, t0, list) {
    // transforms are tweened as SVG attributes ("rotate(a cx cy)", "translate scale translate"): the pivot is explicit, never inferred
    var n = 5, rr = [], T0 = at(X, t0), T1 = at(X, sc.b), D = Math.max(1, T1 - T0), c = cx + " " + cy;
    var g = el("g", { transform: "translate(" + c + ") scale(1) translate(" + (-cx) + " " + (-cy) + ")" }, svg);
    el("circle", { cx: cx, cy: cy, r: 330, fill: rgrad(svg, col, 0.16) }, g);
    for (var i = 0; i < n; i++) {
      var r = 70 + i * 58, circ = +(2 * Math.PI * r).toFixed(1), a0 = i * 47, a1 = a0 + (i % 2 ? -140 : 160);
      var rg = el("g", { transform: "rotate(" + a0 + " " + c + ")" }, g);
      var ring = el("circle", { cx: cx, cy: cy, r: r, fill: "none", stroke: i % 2 ? "#5b6574" : C.grey, "stroke-width": 7, "stroke-linecap": "round",
        "stroke-dasharray": (circ * 0.8).toFixed(1) + " " + (circ * 0.2).toFixed(1) }, rg);
      rr.push({ el: ring, c: circ });
      ring.style.opacity = 0;
      X.tl.fromTo(ring, { opacity: 0, attr: { r: r * 1.25 } }, { opacity: 1, attr: { r: r }, duration: 0.6, ease: "power3.out", immediateRender: false }, at(X, t0 + i * 0.12));
      X.tl.fromTo(rg, { attr: { transform: "rotate(" + a0 + " " + c + ")" } }, { attr: { transform: "rotate(" + a1 + " " + c + ")" }, duration: D, ease: "none", immediateRender: false }, T0);
    }
    var core = glowDot(svg, g, col, 16); core.setAttribute("transform", "translate(" + c + ")"); popIn(X, core, t0 + 0.3, { d: 0.5 });
    // each beat closes the gap of one ring (outermost first) and turns it to the trap color
    list.forEach(function (b, j) {
      var o = rr[n - 1 - (j % n)];
      X.tl.to(o.el, { attr: { "stroke-dasharray": o.c + " 0.01", stroke: col }, duration: 0.7, ease: "power2.inOut" }, at(X, b[0]));
    });
    X.tl.fromTo(g, { attr: { transform: "translate(" + c + ") scale(1) translate(" + (-cx) + " " + (-cy) + ")" } },
      { attr: { transform: "translate(" + c + ") scale(0.9) translate(" + (-cx) + " " + (-cy) + ")" } , duration: D, ease: "sine.inOut", immediateRender: false }, T0);
  }
  function nodes(svg, sc, X, cx, cy, gw, col, t0, list) {
    var names = sc.nodes || [], n = Math.max(5, names.length || 6), rx = Math.min(gw / 2 - 70, 330), ry = 225; cy += 25; var hub = [cx, cy], pos = [];
    for (var i = 0; i < n; i++) { var a = -Math.PI / 2 + i * 2 * Math.PI / n; pos.push([cx + rx * Math.cos(a), cy + ry * Math.sin(a)]); }
    pos.forEach(function (p, i) {
      var e = seg(svg, "M" + p[0] + " " + p[1] + " L" + hub[0] + " " + hub[1], FAINT, 4); drawOn(X, e, t0 + i * 0.08, 0.6);
      var nd = el("g", {}, svg); el("circle", { cx: p[0], cy: p[1], r: 26, fill: PANEL, stroke: C.grey, "stroke-width": 4 }, nd); popIn(X, nd, t0 + 0.2 + i * 0.08, { d: 0.4 });
      if (names[i]) { var below = p[1] > cy + 10, lb = txt(svg, p[0], p[1] + (below ? 70 : -44), names[i], 34, C.ink, "middle", "item"); show(X, lb, t0 + 0.3 + i * 0.08, { dy: 8 }); }
    });
    var dots = el("g", {}, svg);                     // money pulses travel UNDER the hub (never over its label)
    var hubG = el("g", {}, svg); el("circle", { cx: hub[0], cy: hub[1], r: 140, fill: rgrad(svg, col, 0.35) }, hubG);
    el("circle", { cx: hub[0], cy: hub[1], r: 66, fill: PANEL, stroke: col, "stroke-width": 6 }, hubG);
    popIn(X, hubG, t0 + 0.4, { from: 0.5, d: 0.6 });
    if (sc.hub) { var hl = txt(svg, hub[0], hub[1] + 14, sc.hub, 34, col, "middle", "item"); show(X, hl, t0 + 0.5, { dy: 0 }); }
    // money pulses: at every beat (and at the start), a glowing dot travels from each outer node into the hub; the hub swells
    var waves = [t0 + 1.0].concat(list.map(function (b) { return b[0]; }));
    waves.forEach(function (t, w) {
      pos.forEach(function (p, i) {
        var d = glowDot(svg, dots, col, 8), ts = t + i * 0.07; d.style.opacity = 0; root.gsap.set(d, { x: p[0], y: p[1] });
        X.tl.fromTo(d, { opacity: 0, x: p[0], y: p[1] }, { opacity: 1, duration: 0.15, immediateRender: false }, at(X, ts));
        X.tl.to(d, { x: hub[0], y: hub[1], duration: 0.9, ease: "power1.in" }, at(X, ts));
        X.tl.to(d, { opacity: 0, duration: 0.15 }, at(X, ts + 0.85));
      });
      X.tl.fromTo(hubG, { scale: 1 + w * 0.06, svgOrigin: hub[0] + " " + hub[1] }, { scale: 1.06 + w * 0.06, svgOrigin: hub[0] + " " + hub[1], duration: 0.4, ease: "back.out(3)", immediateRender: false }, at(X, t + 0.9));
    });
  }

  // ---------- STICK-ACTION punch text ----------
  // the Stickman alone never leaves the screen empty: a giant high-impact text (1-3 key words or one big figure) fills the free
  // cell next to him. sc.punch = { text: "$0", k: "red", t: S(12) + 1.2 }. It is auto-fitted to its own cell by the engine, so it
  // can never cover the Stickman (separate grid cell) nor the subtitles (scene area ends above them); audit_dyn.cjs re-checks both.
  M.punch = function (cell, sc, X) {
    var p = sc.punch, e = document.createElement("div");
    e.className = "ig-punch item " + (p.k || "orange"); e.textContent = p.text; cell.appendChild(e);
    var t = X.T(p.t != null ? p.t : sc.a + 0.5);
    X.tl.fromTo(e, { opacity: 0, scale: 1.12, rotation: -5, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, rotation: -2, duration: 0.5, ease: "back.out(1.6)", immediateRender: false }, t);   // stamp in (fits: 12 % headroom)
    X.tl.fromTo(e, { scale: 1 }, { scale: 1.03, duration: Math.max(0.6, X.T(sc.b) - t - 0.9), ease: "sine.inOut", immediateRender: false }, t + 0.6);   // slow push: never a frozen word
    return e;
  };

  root.MODES = M;
})(window);

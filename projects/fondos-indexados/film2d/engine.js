/* Film engine: turns the declarative SCENES spec into strict CSS-grid scenes + one GSAP timeline.
 * Scene = grid of cells (character | graphic cell(s)); items are laid out in flow (flex rows), auto-fitted to
 * their cell, and revealed with GSAP (pop / slide / fade). Subtitles live in their own grid row. */
(function (root) {
  "use strict";
  var K = root.KIT, C = K.C, P = root.PROPS, W = root.WIDGETS, G = root.InkGrid;
  var E = { audit: [] }, U = 760 / 560;      // px per drawing unit for a life-size prop (scene row height / pose box height)
  var tl, an, na, PA, PB, scenesEl;

  function mapRaw(a, t) { if (t <= a[0][0]) return a[0][1] - (a[0][0] - t); for (var i = 1; i < a.length; i++) if (t <= a[i][0]) { var p = a[i - 1], q = a[i]; return p[1] + (q[1] - p[1]) * (t - p[0]) / ((q[0] - p[0]) || 1); } var l = a[a.length - 1]; return l[1] + (t - l[0]); }
  function T(t) { return Math.max(0, mapRaw(an, t) - na); }
  E.T = T;

  E.init = function (cfg) { tl = cfg.tl; an = cfg.anchors; PA = cfg.a; PB = cfg.b; na = mapRaw(an, PA); scenesEl = cfg.scenesEl; E.dur = mapRaw(an, PB) - na; };

  // ---------- svg items ----------
  function svgItem(drawFn) {
    var s = K.el("svg", { preserveAspectRatio: "xMidYMid meet" }); s.style.overflow = "visible"; return s;
  }
  function fitBox(svg, pad) {
    var bb = svg.getBBox(); pad = pad == null ? 10 : pad;
    svg.setAttribute("viewBox", [bb.x - pad, bb.y - pad, bb.width + 2 * pad, bb.height + 2 * pad].join(" "));
    svg._nat = { w: bb.width + 2 * pad, h: bb.height + 2 * pad };
  }
  function sizeSvg(svg, scale) {
    var n = svg._nat, w = n.w * U * scale, h = n.h * U * scale;
    svg.style.width = "calc(var(--k,1) * " + w.toFixed(1) + "px)"; svg.style.height = "calc(var(--k,1) * " + h.toFixed(1) + "px)";
  }
  var DEF_S = { house: 0.5, car: 0.5, card: 0.5, cart: 0.5, shield: 0.5, dumbbell: 0.5, cup: 0.5, box: 0.55, play: 0.5, laptop: 0.55, desk: 0.8, chair: 0.8, phone: 0.5, clock: 0.6, calendar: 0.6, envelope: 0.55, building: 0.6, hourglass: 0.8, bike: 0.55, lunchbox: 0.6, sun: 0.7, moon: 0.7, sofa: 0.6, tv: 0.7, bed: 0.6, door: 0.6, traffic: 0.6, mini: 0.75 };

  function makeItem(it, host, ctx) {
    var wrap, svg;
    if (it.row || it.col) {
      wrap = document.createElement("div"); wrap.className = it.col ? "ig-stack item-group" : "ig-row item-group";
      (it.row || it.col).forEach(function (c) { makeItem(c, wrap, ctx); });
      host.appendChild(wrap); return wrap;
    }
    if (it.c != null) { wrap = G.chip(it.c, it.k || "", it.x === "strike" || it.x === "stamp" ? it.x : ""); }
    else if (it.big != null) { wrap = document.createElement("span"); wrap.className = "ig-big item " + (it.k || ""); wrap.textContent = it.big; }
    else if (it.n != null && it.w == null && it.p == null) { wrap = document.createElement("span"); wrap.className = "ig-note item " + (it.k || ""); wrap.textContent = it.n; }
    else {
      wrap = document.createElement("div"); wrap.className = "ig-wrap item";
      svg = K.el("svg", { preserveAspectRatio: "xMidYMid meet" }); svg.style.overflow = "visible"; wrap.appendChild(svg); host.appendChild(wrap);
      var scale = it.s;
      if (it.p) { var g = P[it.p].apply(null, [svg, 0, 0, 1].concat(it.a || [])); scale = scale || DEF_S[it.p] || 0.5; if (g && g.setAttribute) g.setAttribute("opacity", 1); }
      else if (it.w) { W[it.w](svg, it, { tl: tl, T: T, C: C }); scale = scale || it.sc || 0.6; }
      fitBox(svg, it.pad); sizeSvg(svg, scale);
      if (it.x != null && it.x !== "strike" && it.x !== "stamp") overlay(wrap, "cross", it.x === true ? it.t : it.x);
      if (it.ck != null) overlay(wrap, "check", it.ck);
      if (it.lbl) { var col = document.createElement("div"); col.className = "ig-stack item-group"; col.style.alignItems = "center"; host.removeChild(wrap); col.appendChild(wrap); var nt = document.createElement("span"); nt.className = "ig-note item " + (it.lk || ""); nt.textContent = it.lbl; col.appendChild(nt); host.appendChild(col); reveal(nt, { t: it.t, fx: "fade" }); reveal(wrap, it); return col; }
      host.appendChild(wrap); reveal(wrap, it); return wrap;
    }
    host.appendChild(wrap); reveal(wrap, it); return wrap;
  }
  function overlay(wrap, kind, t) {
    var o = K.el("svg", { viewBox: "0 0 100 100", preserveAspectRatio: "none" }); o.className.baseVal = "ig-ov";
    if (kind === "cross") { K.line(o, [[12, 12], [88, 88]], { c: C.red, w: 6 }); K.line(o, [[88, 12], [12, 88]], { c: C.red, w: 6 }); }
    else K.line(o, [[16, 56], [40, 82], [86, 20]], { c: C.green, w: 7 });
    o.style.opacity = 0; wrap.appendChild(o);
    tl.fromTo(o, { opacity: 0, scale: 0.4, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.45, ease: "back.out(2)", transformOrigin: "50% 50%", immediateRender: false }, T(t));
  }
  function reveal(node, it) {
    var t = T(it.t == null ? E.cur.a : it.t), fx = it.fx || "pop";
    if (fx === "pop") G.pop(tl, node, t, { y: 14 });
    else if (fx === "drop") G.pop(tl, node, t, { y: -50 });
    else if (fx === "rise") G.pop(tl, node, t, { y: 50 });
    else if (fx === "stamp") tl.fromTo(node, { opacity: 0, scale: 1.7, rotation: -8, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, rotation: it.rot == null ? -3 : it.rot, duration: 0.4, ease: "back.out(2)", immediateRender: false }, t);
    else if (fx === "slide") G.slide(tl, node, t, { x: it.dx != null ? it.dx : 90, y: it.dy || 0 });
    else tl.fromTo(node, { opacity: 0 }, { opacity: 1, duration: it.d || 0.45, ease: "power2.out", immediateRender: false }, t);
    if (it.out != null) tl.to(node, { opacity: 0, duration: 0.35, ease: "power2.out" }, T(it.out));
  }

  // ---------- fit: shrink a cell's content until it fits (no overflow in either axis) ----------
  function overflows(cell) {
    if (cell.scrollHeight > cell.clientHeight + 1 || cell.scrollWidth > cell.clientWidth + 1) return true;
    var rows = cell.querySelectorAll(".ig-row,.ig-stack"); for (var i = 0; i < rows.length; i++) if (rows[i].scrollWidth > rows[i].clientWidth + 1) return true;
    return false;
  }
  // start large and shrink until the content fits: graphics grow to fill their cell, text is capped in CSS
  function fit(cell) { var k = 2.2; for (var i = 0; i < 30; i++) { cell.style.setProperty("--k", k.toFixed(3)); if (!overflows(cell)) return k; k *= 0.93; } return k; }

  // ---------- scene ----------
  E.scene = function (sc) {
    if (!(sc.a >= PA - 1e-6 && sc.b <= PB + 1e-6)) return;
    E.cur = sc;
    var el = document.createElement("div"), lay = sc.L || "cg"; el.className = "ig-scene L-" + lay; el.dataset.id = sc.id || (sc.a + ""); scenesEl.appendChild(el);
    var cells = [], hasChar = lay.indexOf("c") >= 0, order = lay.split("");
    var gIdx = 0, charCell = null, gfxCells = [];
    order.forEach(function (ch) {
      var cell = document.createElement("div");
      if (ch === "c") { cell.className = "ig-cell end char"; charCell = cell; }
      else { cell.className = "ig-cell gfx"; gfxCells.push(cell); }
      el.appendChild(cell);
    });
    // character
    var fig = null;
    if (charCell) {
      var svg = K.el("svg", { viewBox: "0 0 360 560", preserveAspectRatio: "xMidYMax meet" }); charCell.appendChild(svg);
      if (sc.side === "right" || lay.charAt(0) !== "c") svg.style.transform = "scaleX(-1)";
      var names = {}; (sc.poses || [[sc.a, "idle"]]).forEach(function (p) { names[p[1]] = 1; }); if (sc.walk) { names.walkA = names.walkP = names.walkB = 1; }
      fig = root.InkPose.create(svg, { poses: root.InkPose.pick(Object.keys(names)), color: C.ink, stroke: 8 });
      var ps = sc.poses || [[sc.a, "idle"]];
      fig.set(ps[0][1]);
      // chronological events (poses + the walk cycle) so the figure's state is tracked in time order
      var ev = ps.slice(1).map(function (q) { return { t: q[0], pose: q[1], fx: q[2] }; });
      if (sc.walk) ev.push({ t: sc.walk[0], walk: sc.walk });
      ev.sort(function (x, y) { return x.t - y.t; });
      var base = ps[0][1];
      ev.forEach(function (e) {
        if (e.walk) {
          var w0 = T(e.walk[0]), w1 = T(e.walk[1]), cl = function (v, d) { return Math.max(-30, Math.min(26, v == null ? d : v)); };
          fig.walk(tl, w0, w1);
          tl.fromTo(svg, { xPercent: cl(e.walk[2], -20) }, { xPercent: cl(e.walk[3], 25), duration: w1 - w0, ease: "sine.inOut", immediateRender: false }, w0);
          tl.set(svg, { xPercent: cl(e.walk[2], -20) }, 0);
          fig.cut(tl, base, w1);                       // stop walking in the scene's base pose
        } else { fig.to(tl, e.pose, T(e.t), { fx: e.fx || "bounce" }); base = e.pose; }
      });
      fig.breathe(tl, T(sc.a), T(sc.b));
      if (sc.ice) { var ice = K.el("rect", { x: 40, y: 20, width: 280, height: 540, rx: 26, fill: "rgba(127,200,255,0.10)", stroke: C.cold, "stroke-width": 6, opacity: 0 }, svg); tl.fromTo(ice, { opacity: 0 }, { opacity: 1, duration: 1.2, immediateRender: false }, T(sc.ice)); }
    }
    // graphic cells
    var gspec = [sc.g || [], sc.g2 || []];
    gfxCells.forEach(function (cell, gi) {
      (gspec[gi] || []).forEach(function (row) {
        var rowEl = document.createElement("div"); rowEl.className = "ig-row"; if (row.length === 1 && (row[0].col)) rowEl.className = "ig-row";
        cell.appendChild(rowEl); row.forEach(function (it) { makeItem(it, rowEl, {}); });
      });
    });
    gfxCells.forEach(fit);
    // scene show/hide on the timeline (display toggled so only the active scene costs layout/paint)
    var t0 = T(sc.a), t1 = T(sc.b), last = sc.b >= PB - 1e-3;
    var audit = G.audit(el); audit.scene = sc.id || sc.a; E.audit.push(audit);
    tl.set(el, { display: "grid", autoAlpha: 0 }, Math.max(0, t0 - 0.05));
    tl.to(el, { autoAlpha: 1, duration: 0.3, ease: "power2.out" }, Math.max(0, t0 - 0.05));
    if (!last) { tl.to(el, { autoAlpha: 0, duration: 0.3, ease: "power2.in" }, Math.max(0, t1 - 0.3)); tl.set(el, { display: "none" }, t1 + 0.03); }
    el.style.display = "none";
  };
  E.build = function (SCENES) { SCENES.forEach(E.scene); };

  E.captions = function (words, capsEl) {
    var page = [], pages = [];
    words.forEach(function (w) { page.push(w); if (page.length >= 7 || w.pageBreakAfter) { pages.push(page); page = []; } });
    if (page.length) pages.push(page);
    pages.forEach(function (pw, pi) {
      var div = document.createElement("div"); div.className = "ig-page";
      pw.forEach(function (w, i) { var s = document.createElement("span"); s.className = "ig-w"; s.textContent = w.word + (i < pw.length - 1 ? " " : ""); div.appendChild(s); w._s = s; });
      capsEl.appendChild(div);
      var t0 = pw[0].startMs / 1000, t1 = pw[pw.length - 1].endMs / 1000, nxt = pages[pi + 1] ? pages[pi + 1][0].startMs / 1000 : 1e9;
      tl.fromTo(div, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.1, immediateRender: false }, Math.max(0, t0 - 0.05));
      pw.forEach(function (w) { tl.to(w._s, { color: "#ffffff", duration: 0.12 }, w.startMs / 1000); });
      tl.to(div, { opacity: 0, duration: 0.1 }, Math.max(t0 + 0.1, Math.min(t1 + 0.12, nxt - 0.14)));
    });
  };
  root.FILM = E;
})(window);

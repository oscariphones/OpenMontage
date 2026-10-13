/* Film engine V2.2 "Layout 2.0" + FABRICA_2 (camera punch-in on the Stickman at each pose change, softer window pans, slow push-in drift
 *   on holds longer than CAM.holdMax so there are no long static shots; the soft defocused backdrop lives in ink-grid.js). (premium finance: tech-grid backdrop, kinetic captions, procedural eases, inertial text, glow on green/orange;
 *   2.0 = full 2D illustrations from the asset library (window.ILUS, built by film2d/build.py), floating windows that group each graphic cell,
 *   and a UI camera that jumps between windows with aggressive ease-in-out pans/zooms). Turns the declarative SCENES spec into strict CSS-grid scenes + one GSAP timeline.
 * Scene = grid of cells (character | graphic cell(s)); items are laid out in flow (flex rows), auto-fitted to
 * their cell, and revealed with GSAP (pop / slide / fade). Subtitles live in their own grid row. */
(function (root) {
  "use strict";
  var K = root.KIT, C = K.C, P = root.PROPS, W = root.WIDGETS, G = root.InkGrid;
  var E = { audit: [], missing: [], shots: [], spots: [] }, U = 760 / 560;      // px per drawing unit for a life-size prop (scene row height / pose box height)
  var tl, an, na, PA, PB, scenesEl;

  function mapRaw(a, t) { if (t <= a[0][0]) return a[0][1] - (a[0][0] - t); for (var i = 1; i < a.length; i++) if (t <= a[i][0]) { var p = a[i - 1], q = a[i]; return p[1] + (q[1] - p[1]) * (t - p[0]) / ((q[0] - p[0]) || 1); } var l = a[a.length - 1]; return l[1] + (t - l[0]); }
  function T(t) { return Math.max(0, mapRaw(an, t) - na); }
  E.T = T;

  E.init = function (cfg) { tl = cfg.tl; an = cfg.anchors; PA = cfg.a; PB = cfg.b; na = mapRaw(an, PA); scenesEl = cfg.scenesEl; E.dur = mapRaw(an, PB) - na; };

  // dark tech-grid backdrop; beats = absolute times (s) of sentence starts, so the grid pulses with the voice
  E.backdrop = function (host, beats) {
    var rel = (beats || []).filter(function (b) { return b >= PA - 1e-3 && b <= PB; }).map(T);
    return G.techGrid(host, tl, E.dur, { beats: rel });
  };

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
    else if (illus(it)) {      // Layout 2.0: full 2D illustration (PNG with alpha / detailed SVG) instead of the line icon
      var il = illus(it), hpx = it.ih || ILL_H, wpx = Math.min(hpx * il.w / il.h, hpx * 2.2); hpx = wpx * il.h / il.w;
      wrap = document.createElement("div"); wrap.className = "ig-wrap ig-ill item";
      var im = document.createElement("img"); im.src = il.src; im.alt = ""; im.decoding = "sync"; wrap.appendChild(im);
      wrap.style.width = "calc(var(--k,1) * " + wpx.toFixed(1) + "px)"; wrap.style.height = "calc(var(--k,1) * " + hpx.toFixed(1) + "px)";
      return finishGraphic(wrap, it, host);
    }
    else if (it.img) {         // asked for an illustration that is not in the library: visible red placeholder + audit issue
      E.missing.push(it.img); wrap = G.chip("falta: " + it.img, "red");
    }
    else {
      wrap = document.createElement("div"); wrap.className = "ig-wrap item";
      svg = K.el("svg", { preserveAspectRatio: "xMidYMid meet" }); svg.style.overflow = "visible"; wrap.appendChild(svg); host.appendChild(wrap);
      var scale = it.s;
      if (it.p) { var g = P[it.p].apply(null, [svg, 0, 0, 1].concat(it.a || [])); scale = scale || DEF_S[it.p] || 0.5; if (g && g.setAttribute) g.setAttribute("opacity", 1); }
      else if (it.w) { W[it.w](svg, it, { tl: tl, T: T, C: C }); scale = scale || it.sc || 0.6; }
      fitBox(svg, it.pad); sizeSvg(svg, scale); host.removeChild(wrap);
      return finishGraphic(wrap, it, host);
    }
    host.appendChild(wrap); reveal(wrap, it, "inertia"); return wrap;      // chips, big text, notes
  }
  // illustration for an item: explicit img, or a library file named like the prop/widget (house.png replaces p:"house"; ill:false opts out)
  var ILL_H = 300;              // base height (px) of an illustration before the cell fit scales it
  function illus(it) { var L = root.ILUS || {}, k = it.img || it.p || it.w; return k && L[k] && (it.img || it.ill !== false) ? L[k] : null; }
  function finishGraphic(wrap, it, host) {
    if (it.x != null && it.x !== "strike" && it.x !== "stamp") overlay(wrap, "cross", it.x === true ? it.t : it.x);
    if (it.ck != null) overlay(wrap, "check", it.ck);
    if (it.lbl) { var col = document.createElement("div"); col.className = "ig-stack item-group"; col.style.alignItems = "center"; col.appendChild(wrap); var nt = document.createElement("span"); nt.className = "ig-note item " + (it.lk || ""); nt.textContent = it.lbl; col.appendChild(nt); host.appendChild(col); reveal(nt, { t: it.t, fx: "inertia" }); reveal(wrap, it, "pop"); return col; }
    host.appendChild(wrap); reveal(wrap, it, "pop"); return wrap;
  }
  function overlay(wrap, kind, t) {
    var o = K.el("svg", { viewBox: "0 0 100 100", preserveAspectRatio: "none" }); o.className.baseVal = "ig-ov";
    if (kind === "cross") { K.line(o, [[12, 12], [88, 88]], { c: C.red, w: 6 }); K.line(o, [[88, 12], [12, 88]], { c: C.red, w: 6 }); }
    else K.line(o, [[16, 56], [40, 82], [86, 20]], { c: C.green, w: 7 });
    o.style.opacity = 0; wrap.appendChild(o);
    tl.fromTo(o, { opacity: 0, scale: 0.4, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.55, ease: G.ease("ink.springHard", "back.out(2)"), transformOrigin: "50% 50%", immediateRender: false }, T(t));
  }
  // default effect by item kind (spec.js can still force any fx): text -> "inertia", illustration / icon / widget -> "pop"
  function reveal(node, it, def) {
    var t = T(it.t == null ? E.cur.a : it.t), fx = it.fx || def || "pop";
    if (fx === "inertia") G.inertia(tl, node, t);
    else if (fx === "pop") G.pop(tl, node, t, { y: 14 });
    else if (fx === "drop") G.pop(tl, node, t, { y: -50 });
    else if (fx === "rise") G.pop(tl, node, t, { y: 50 });
    else if (fx === "stamp") tl.fromTo(node, { opacity: 0, scale: 1.7, rotation: -8, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, rotation: it.rot == null ? -3 : it.rot, duration: 0.55, ease: G.ease("ink.springHard", "back.out(2)"), immediateRender: false }, t);
    else if (fx === "slide") G.slide(tl, node, t, { x: it.dx != null ? it.dx : 90, y: it.dy || 0 });
    else tl.fromTo(node, { opacity: 0 }, { opacity: 1, duration: it.d || 0.45, ease: G.ease("ink.glide", "power2.out"), immediateRender: false }, t);
    if (it.out != null) tl.to(node, { opacity: 0, duration: 0.35, ease: G.ease("ink.glide", "power2.out") }, T(it.out));
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
    var gIdx = 0, charCell = null, gfxCells = [], side = hasChar ? (lay.charAt(0) === "c" ? 1 : -1) : 0;   // side: where the camera drifts (toward the Stickman)
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
          tl.fromTo(svg, { xPercent: cl(e.walk[2], -20) }, { xPercent: cl(e.walk[3], 25), duration: w1 - w0, ease: G.ease("ink.glide", "sine.inOut"), immediateRender: false }, w0);
          tl.set(svg, { xPercent: cl(e.walk[2], -20) }, 0);
          fig.cut(tl, base, w1);                       // stop walking in the scene's base pose
        } else { fig.to(tl, e.pose, T(e.t), { fx: e.fx || "bounce" }); base = e.pose; }
      });
      fig.breathe(tl, T(sc.a), T(sc.b));
      if (sc.ice) { var ice = K.el("rect", { x: 40, y: 20, width: 280, height: 540, rx: 26, fill: "rgba(127,200,255,0.10)", stroke: C.cold, "stroke-width": 6, opacity: 0 }, svg); tl.fromTo(ice, { opacity: 0 }, { opacity: 1, duration: 1.2, immediateRender: false }, T(sc.ice)); }
    }
    // graphic cells
    // Layout 2.0: each graphic cell is a floating window (sc.win === false keeps the old loose layout; sc.wt / sc.wt2 = window titles)
    var gspec = [sc.g || [], sc.g2 || []], wins = [];
    var tOf = function (list) { return Math.min.apply(null, flat(list).map(function (it) { return it.t == null ? sc.a : it.t; })); };
    gfxCells.forEach(function (cell, gi) {
      var rows = gspec[gi] || [], host = cell, w = null;
      if (rows.length && sc.win !== false) {
        host = document.createElement("div"); host.className = "ig-win";
        var bar = document.createElement("div"); bar.className = "ig-win-bar"; bar.innerHTML = "<i></i><i></i><i></i>";
        var title = gi ? sc.wt2 : sc.wt; if (title) { var sp = document.createElement("span"); sp.textContent = title; bar.appendChild(sp); }
        host.appendChild(bar); cell.appendChild(host);
        // the window floats in just before its first item; the camera still cuts to the 1st window on the scene change
        var first = tOf(rows);
        w = { el: host, t: Math.max(sc.a, first - 0.35), shotT: gi ? Math.max(sc.a, first - 0.35) : sc.a, rows: [] }; wins.push(w);
      }
      rows.forEach(function (row) {
        var rowEl = document.createElement("div"); rowEl.className = "ig-row";
        host.appendChild(rowEl); row.forEach(function (it) { makeItem(it, rowEl, {}); });
        if (w) w.rows.push({ el: rowEl, t: tOf([row]) });
      });
    });
    gfxCells.forEach(fit);
    var t0 = T(sc.a), t1 = T(sc.b), last = sc.b >= PB - 1e-3;
    var audit = G.audit(el); audit.scene = sc.id || sc.a; E.audit.push(audit);   // measured on the final (fully grown) layout
    wins.forEach(function (w) {
      var t = T(w.t); tl.fromTo(w.el, { opacity: 0, y: 46, scale: 0.96 }, { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power3.out", immediateRender: false }, Math.max(0, t - 0.05));
      w.r = rel(w.el); E.shots.push({ t: T(w.shotT), r: w.r, dx: side });   // camera frames the FINAL window size, so it never has to re-aim while it grows
      grow(w, t);
    });
    var charR = fig ? figBox(svg) : null, nItems = flat(gspec[0]).length + flat(gspec[1]).length;
    // no window: wide shot, or straight onto the Stickman when the scene is only the character
    if (!wins.length) E.shots.push(charR && !nItems ? { t: T(sc.a), r: charR, kind: "char" } : { t: T(sc.a), r: null });
    // FABRICA_2: the camera planner (E.camera) punches in on this Stickman inside static stretches: at a pose change when possible,
    // otherwise in a gap between bullets on any hold longer than CAM.holdMax. It never covers a bullet landing (text must be readable).
    if (charR) E.spots.push({ a: T(sc.a), b: T(sc.b), r: charR, dx: side, wins: wins.map(function (w) { return w.r; }),
      poses: (sc.poses || []).map(function (q) { return T(q[0]); }),
      items: flat(gspec[0]).concat(flat(gspec[1])).map(function (it) { return T(it.t == null ? sc.a : it.t); }).sort(function (x, y) { return x - y; }) });
    // scene show/hide on the timeline (display toggled so only the active scene costs layout/paint)
    tl.set(el, { display: "grid", autoAlpha: 0 }, Math.max(0, t0 - 0.05));
    tl.to(el, { autoAlpha: 1, duration: 0.4, ease: G.ease("ink.snap", "power2.out") }, Math.max(0, t0 - 0.05));
    if (!last) { tl.to(el, { autoAlpha: 0, duration: 0.3, ease: "power2.in" }, Math.max(0, t1 - 0.3)); tl.set(el, { display: "none" }, t1 + 0.03); }
    el.style.display = "none";
  };
  // ---------- responsive window: rows that arrive later start collapsed; the window grows (height + width) just before each row ----------
  var GROW = { lead: 0.42, dur: 0.38, gap: 24 };
  function grow(w, tWin) {
    // fractional sizes + 2 px slack: an integer-rounded width can be 0.x px short and wrap a row of two illustrations
    var bw = function (e) { return e.getBoundingClientRect().width; }, bh = function (e) { return e.getBoundingClientRect().height; };
    var fullW = Math.ceil(bw(w.el)) + 2, pad = fullW - Math.max.apply(null, w.rows.map(function (r) { return bw(r.el); })), minW = 300;
    var rows = w.rows.map(function (r, i) { return { el: r.el, h: Math.ceil(bh(r.el)), w: bw(r.el), t: Math.max(T(r.t) - GROW.lead, tWin), gap: i ? GROW.gap : 0 }; });
    rows.sort(function (a, b) { return a.t - b.t; });
    var now = rows.filter(function (r) { return r.t <= tWin + 0.05; }), wide = function (list) { return Math.max(minW, Math.max.apply(null, list.map(function (r) { return r.w; }).concat([0])) + pad); };
    var curW = Math.min(fullW, wide(now));
    if (now.length === rows.length) return;                      // everything is there from the start: nothing to grow
    w.el.style.width = curW.toFixed(1) + "px"; w.el.style.overflow = "hidden";
    rows.forEach(function (r) {
      if (r.t <= tWin + 0.05) return;
      gsap.set(r.el, { height: 0, marginTop: 0, overflow: "hidden" });
      tl.fromTo(r.el, { height: 0, marginTop: 0 }, { height: r.h, marginTop: r.gap, duration: GROW.dur, ease: "power3.inOut", immediateRender: false }, r.t);
      tl.set(r.el, { overflow: "visible", height: "auto" }, r.t + GROW.dur + 0.01);   // open row: natural height, glows / pop overshoot not clipped
      now.push(r); var nw = Math.min(fullW, wide(now));
      if (nw > curW + 1) { tl.fromTo(w.el, { width: curW }, { width: nw, duration: GROW.dur, ease: "power3.inOut", immediateRender: false }, r.t); curW = nw; }
    });
    tl.set(w.el, { overflow: "visible" }, rows[rows.length - 1].t + GROW.dur + 0.01);
  }
  function flat(rows) { var o = []; rows.forEach(function (r) { r.forEach(function (it) { if (it.row || it.col) o = o.concat(flat([it.row || it.col])); else o.push(it); }); }); return o; }
  function rel(el) { var a = el.getBoundingClientRect(), b = scenesEl.getBoundingClientRect(); return { x: a.left - b.left, y: a.top - b.top, w: a.width, h: a.height, W: b.width, H: b.height, top: b.top }; }

  // ---------- UI camera: pans/zooms between floating windows, punches in on the Stickman at pose changes, drifts on long holds ----------
  // FABRICA_2: softer window moves (power2, 0.95 s), char punch-in (x1.10 over the hold framing, 0.55 s, lands with the pose bounce),
  // and a slow push-in drift (x1.025 + 8 px toward the Stickman, bottom edge pinned over the subtitles) on any hold longer than holdMax.
  var CAM = { zMax: 1.14, fill: 0.84, pull: 0.62, panX: 170, dur: 0.95, ease: "power2.inOut",
              zChar: 1.08, charPull: 0.7, charDur: 0.55, charLead: 0.15, charEase: "power3.inOut", charGap: 0.6, charHold: 1.3,
              charPunch: [1.10, 1.08, 1.06], charCenter: 0.3, loosePunch: [1.06, 1.04], looseX: 0.25, looseCrop: 0.05,
              holdMax: 5, drift: 1.025, driftX: 8 };
  function figBox(svg) {   // drawn area of the pose box (viewBox 360x560, xMidYMax meet) inside its svg
    var r = rel(svg), k = Math.min(r.w / 360, r.h / 560), w = 360 * k, h = 560 * k;
    return { x: r.x + (r.w - w) / 2, y: r.y + r.h - h, w: w, h: h, W: r.W, H: r.H, top: r.top };
  }
  function shot(r, kind) {
    if (!r) return { x: 0, y: 0, s: 1 };
    var ch = kind === "char", z = ch ? CAM.zChar : Math.max(1, Math.min(CAM.zMax, Math.min(r.W * CAM.fill / r.w, r.H * CAM.fill / r.h)));
    var pull = ch ? CAM.charPull : CAM.pull, cx = r.x + r.w / 2, cy = r.y + r.h * (ch ? 0.38 : 0.5);   // char: aim at head + arms (where the pose reads)
    var x = (r.W / 2 - cx) * z * pull, y = (r.H / 2 - cy) * z * pull;
    x = Math.max(-CAM.panX, Math.min(CAM.panX, x));
    // the window (or the Stickman's head) must stay in frame (20 px margin) and the stage must not slide down over the subtitles;
    // on a char punch-in the feet may leave the frame, a window may not
    var top = r.H / 2 + (r.y - r.H / 2) * z, bot = r.H / 2 + (r.y + r.h - r.H / 2) * z;
    y = Math.min(y, 0, 12 - (r.H / 2) * (z - 1)); y = Math.max(y, 20 - r.top - top); if (!ch && bot + y > r.H + 10) y = r.H + 10 - bot;
    return { x: Math.round(x), y: Math.round(y), s: +z.toFixed(4) };
  }
  // punch-in RELATIVE to the hold framing fr: scale x1.10 (or less), the Stickman slides 30 % toward the centre, the bottom edge stays put
  // (never over the subtitles), and every window of the scene + the Stickman's head stay fully in frame. null if it cannot be done.
  function charShot(fr, sp) {
    var r = sp.r, W = r.W, H = r.H, fx = r.x + r.w / 2, hy = r.y + r.h * 0.06, L0 = (1920 - W) / 2;   // stage is centred: frame = [-L0, W + L0]
    var sx = function (px, s, x) { return W / 2 + (px - W / 2) * s + x; }, sy = function (py, s, y) { return r.top + H / 2 + (py - H / 2) * s + y; };
    for (var i = 0; i < CAM.charPunch.length; i++) {
      var s2 = +(fr.s * CAM.charPunch[i]).toFixed(4), y2 = Math.round(fr.y - (H / 2) * (s2 - fr.s));
      var head = sx(fx, fr.s, fr.x), x2 = head + (W / 2 - head) * CAM.charCenter - W / 2 - (fx - W / 2) * s2, lo = -1e9, hi = 1e9, ok = true;
      sp.wins.forEach(function (w) {
        hi = Math.min(hi, W + L0 - 12 - sx(w.x + w.w, s2, 0)); lo = Math.max(lo, 12 - L0 - sx(w.x, s2, 0));
        if (sy(w.y, s2, y2) < 8) ok = false;
      });
      if (!ok || lo > hi) continue;
      x2 = Math.round(Math.max(lo, Math.min(hi, x2)));
      var hx = sx(fx, s2, x2);
      if (hx < 120 - L0 || hx > W + L0 - 120 || sy(hy, s2, y2) < 8) continue;
      return { x: x2, y: y2, s: s2 };
    }
    // reaction shot fallback (window framed tight, Stickman at the edge): head to 25 % of the width; a window may leave the frame
    // by up to 5 % of its width (its inner padding: text is never cut) for this ~1 s shot; no bullet lands meanwhile
    for (i = 0; i < CAM.loosePunch.length; i++) {
      // vertical: lift only as much as the windows' title bars and the head need; the stage may slip a little behind the subtitles
      // (they are drawn on top) for this short shot
      s2 = +(fr.s * CAM.loosePunch[i]).toFixed(4); lo = -1e9; hi = 1e9; ok = true;
      y2 = Math.max(8 - sy(hy, s2, 0), Math.min(fr.y, 12 - (H / 2) * (s2 - 1) + 60));
      sp.wins.forEach(function (w) { y2 = Math.max(y2, 8 - sy(w.y, s2, 0)); }); y2 = Math.ceil(y2);
      x2 = 1920 * CAM.looseX - L0 - W / 2 - (fx - W / 2) * s2;
      sp.wins.forEach(function (w) {
        var c = CAM.looseCrop * w.w * s2;
        hi = Math.min(hi, W + L0 - 12 - sx(w.x + w.w, s2, 0) + c); lo = Math.max(lo, 12 - L0 - sx(w.x, s2, 0) - c);
        if (sy(w.y, s2, y2) < 8) ok = false;
      });
      if (!ok || lo > hi) continue;
      x2 = Math.round(Math.max(lo, Math.min(hi, x2))); hx = sx(fx, s2, x2);
      if (hx < 120 - L0 || hx > W + L0 - 120 || sy(hy, s2, y2) < 8) continue;
      return { x: x2, y: y2, s: s2, loose: true };
    }
    return null;
  }
  // candidate punch-in in [s0, s1]: a pose change if one fits, else (long holds only) a quiet moment between bullets
  function pickSpot(s0, s1, gaps, fr) {
    var best = null;
    E.spots.forEach(function (sp) {
      if (sp.b <= s0 || sp.a >= s1) return;
      var cands = sp.poses.map(function (t) { return { t: t, pose: 1 }; });
      if (gaps) [sp.a].concat(sp.items).forEach(function (t) { cands.push({ t: t + 0.5, pose: 0 }); });
      cands.forEach(function (c) {
        var tp = c.t; if (tp < s0 + 0.3 || tp < sp.a + 0.2) return;
        var nx = sp.items.filter(function (x) { return x > tp - 0.2; })[0];
        if (nx != null && nx - tp < CAM.charGap + 1.15) return;                          // zoom in + read the pose + return before the bullet
        var tr = Math.min(tp + CAM.charHold, nx == null ? 1e9 : nx - 0.55, sp.b - 0.6, s1 - 0.55);
        if (tr - tp < 0.9) return;
        var score = c.pose ? tp - s0 : 100 + Math.abs(tp - (s0 + 3));                   // poses first (earliest), else ~3 s into the hold
        if (best && score >= best.score) return;
        var to = charShot(fr, sp); if (to) best = { tp: tp, tr: tr, to: to, score: score };
      });
    });
    return best;
  }
  E.camera = function () {
    var shots = E.shots.slice().sort(function (a, b) { return a.t - b.t; }), prev = { x: 0, y: 0, s: 1 }, base = [], moves = [];
    var H = scenesEl.getBoundingClientRect().height;
    gsap.set(scenesEl, { transformOrigin: "50% 50%", force3D: false });
    shots.forEach(function (sh, i) {
      var to = shot(sh.r, sh.kind), nxt = shots[i + 1] ? shots[i + 1].t : 1e9, ch = sh.kind === "char";
      if (Math.abs(to.x - prev.x) < 4 && Math.abs(to.y - prev.y) < 4 && Math.abs(to.s - prev.s) < 0.006) return;   // same framing: hold
      var d = Math.min(ch ? CAM.charDur : CAM.dur, Math.max(0.3, nxt - sh.t - 0.1));
      var t0 = Math.max(0, sh.t - (ch ? Math.min(CAM.charLead, d / 2) : d / 2));   // window move centred on the cut; char move lands just after
      if (i === 0 && sh.t < 0.2) { base.push({ t0: 0, d: 0, to: to, dx: sh.dx || 0, kind: "set" }); prev = to; return; }
      base.push({ t0: t0, d: d, to: to, ease: ch ? CAM.charEase : CAM.ease, dx: sh.dx || 0, kind: sh.kind || "win" });
      prev = to;
    });
    if (!base.length || base[0].t0 > 0) base.unshift({ t0: 0, d: 0, to: { x: 0, y: 0, s: 1 }, dx: 0, kind: "set" });
    var drift = function (fr, dx, t0, t1) {
      var s2 = +(fr.s * CAM.drift).toFixed(4);
      moves.push({ t0: t0, d: t1 - t0, to: { x: fr.x + dx * CAM.driftX, y: Math.round(fr.y - (H / 2) * (s2 - fr.s)), s: s2 }, ease: "sine.inOut", kind: "drift" });
    };
    base.forEach(function (m, i) {
      moves.push(m);
      var s0 = m.t0 + m.d, s1 = base[i + 1] ? base[i + 1].t0 : E.dur, fr = m.to;
      for (var guard = 0; guard < 20; guard++) {
        var c = pickSpot(s0, s1, s1 - s0 > CAM.holdMax, fr); if (!c) break;
        var t0 = c.tp - CAM.charLead, rd = CAM.dur;
        if (t0 - s0 > CAM.holdMax) drift(fr, m.dx, s0, t0);
        moves.push({ t0: t0, d: CAM.charDur, to: c.to, ease: CAM.charEase, kind: "char" });
        moves.push({ t0: c.tr - rd / 2, d: rd, to: fr, ease: CAM.ease, kind: "back" });   // back to the exact framing of the hold
        s0 = c.tr + rd / 2;
      }
      if (s1 - s0 > CAM.holdMax) drift(fr, m.dx, s0, s1);
    });
    var cur = null;
    moves.forEach(function (m) {
      if (!m.d) tl.set(scenesEl, { x: m.to.x, y: m.to.y, scale: m.to.s }, m.t0);
      else tl.fromTo(scenesEl, { x: cur.x, y: cur.y, scale: cur.s }, { x: m.to.x, y: m.to.y, scale: m.to.s, duration: m.d, ease: m.ease, force3D: false, immediateRender: false }, m.t0);
      cur = m.to;
    });
    E.moves = moves;
  };
  E.build = function (SCENES) { SCENES.forEach(E.scene); E.camera(); root.__filmMissing = E.missing; };

  E.captions = function (words, capsEl) { G.captions(tl, words, capsEl); };   // kinetic typography: keywords pop + glow green/orange
  root.FILM = E;
})(window);

/*
 * Ink Grid — strict, flow-based layout for hand-authored scenes (no loose absolute coordinates).
 *
 * A scene is a CSS grid: the character lives in its own cell, each graphic in another, and the
 * subtitles are anchored in their own bottom row. Inside a cell, items stack with flexbox, so two
 * things can never occupy the same box; cells clip their content (overflow:hidden) and SVGs scale
 * to fit their cell (preserveAspectRatio "meet"). Nothing is positioned with x/y.
 *
 *   InkGrid.css()                       -> the base stylesheet (inject once)
 *   InkGrid.chip(text, "red")           -> hand-drawn label chip element (in-flow)
 *   InkGrid.pop(tl, el, t)              -> reveal with a soft back.out pop
 *   InkGrid.hide(tl, el, t)             -> fade out
 *   InkGrid.audit(sceneEl)              -> {items, overlaps:[...], clipped:[...]}  (must be empty)
 *
 * v2.0 "premium finance":
 *   InkGrid.techGrid(host, tl, dur, {beats})   -> dark tech-grid backdrop with endless procedural drift (deterministic)
 *   InkGrid.captions(tl, words, capsEl)        -> kinetic subtitles: pages glide up with inertia, keywords pop elastically and glow green/orange
 *   InkGrid.camera(tl, el, t0, t1)             -> slow digital push-in (100 % -> <=105 %) so no shot is ever fully static
 *   InkGrid.inertia(tl, el, t) / draw(tl, svg, t) -> text glides up + fades in; line icons draw their strokes, then fill
 *   Procedural GSAP eases (registered once): ink.spring, ink.springHard, ink.snap, ink.glide
 */
(function (root) {
  "use strict";
  var CSS = [
    ":root{--paper:#0b0f14;--ink:#eaeef3;--orange:#ff8a1f;--red:#ff5a5f;--green:#3ddc97;--grey:#7d8797;--cold:#7fc8ff}",
    ".ig-frame{position:absolute;inset:0;padding:60px 110px 0;display:grid;grid-template-rows:1fr 230px;color:var(--ink);font-family:'InkHand',cursive}",
    ".ig-scenes{position:relative;grid-row:1;min-height:0}",
    ".ig-scene{position:absolute;inset:0;display:grid;gap:56px;align-items:stretch;padding-bottom:30px;opacity:0}",
    ".ig-scene::after{content:'';position:absolute;left:0;right:0;bottom:30px;border-bottom:3px solid var(--grey);opacity:.8;border-radius:2px}",   /* ground line */
    ".ig-cell{position:relative;min-width:0;min-height:0;overflow:hidden;display:flex;flex-direction:column}",
    ".ig-cell.end{justify-content:flex-end;align-items:center}",
    ".ig-cell svg{display:block;width:100%;height:100%;overflow:visible}",
    ".ig-row{display:flex;gap:28px;align-items:center;justify-content:center;flex-wrap:wrap;min-width:0}",
    ".ig-stack{display:flex;flex-direction:column;gap:18px;align-items:flex-start;justify-content:center;min-width:0}",
    ".ig-chip{font-size:50px;line-height:1.1;padding:6px 26px 10px;border:4px solid var(--ink);color:var(--ink);white-space:nowrap;opacity:0;",
    "  border-radius:22px 26px 20px 28px / 26px 20px 28px 22px;background:var(--paper)}",
    ".ig-chip.red{border-color:var(--red);color:var(--red)}.ig-chip.orange{border-color:var(--orange);color:var(--orange)}",
    ".ig-chip.green{border-color:var(--green);color:var(--green)}.ig-chip.grey{border-color:var(--grey);color:var(--grey)}",
    ".ig-chip.strike{text-decoration:line-through;text-decoration-thickness:5px}",
    ".ig-big.green,.ig-note.green,.ig-chip.green{text-shadow:0 0 22px rgba(61,220,151,.55),0 0 6px rgba(61,220,151,.35)}",
    ".ig-big.orange,.ig-note.orange,.ig-chip.orange{text-shadow:0 0 22px rgba(255,138,31,.55),0 0 6px rgba(255,138,31,.35)}",
    ".ig-chip.green{box-shadow:0 0 22px rgba(61,220,151,.28),inset 0 0 14px rgba(61,220,151,.12)}",
    ".ig-chip.orange{box-shadow:0 0 22px rgba(255,138,31,.28),inset 0 0 14px rgba(255,138,31,.12)}",
    ".ig-caps{grid-row:2;position:relative;min-height:0}",
    ".ig-page{position:absolute;left:0;right:0;top:34px;text-align:center;font-size:42px;line-height:1.25;opacity:0}",
    ".ig-w{color:#6f7a8a}",
    ".ig-page{text-shadow:0 3px 14px rgba(0,0,0,.65)}",
    ".ig-key{display:inline-block;margin:0 .16em;transform-origin:50% 80%;will-change:transform}",
    ".ig-tech{position:absolute;inset:0;overflow:hidden;background:radial-gradient(ellipse at 50% 38%,#131c27 0%,#0b0f14 62%,#070a0e 100%)}",
    ".ig-tech .tg{position:absolute;inset:0}",
    ".tg-far{background-image:linear-gradient(rgba(125,135,151,.075) 1px,transparent 1px),linear-gradient(90deg,rgba(125,135,151,.075) 1px,transparent 1px);background-size:48px 48px}",
    ".tg-near{background-image:linear-gradient(rgba(61,220,151,.14) 2px,transparent 2px),linear-gradient(90deg,rgba(61,220,151,.14) 2px,transparent 2px);background-size:192px 192px}",
    ".tg-pulse{opacity:0;background-image:linear-gradient(rgba(61,220,151,.55) 2px,transparent 2px),linear-gradient(90deg,rgba(61,220,151,.55) 2px,transparent 2px);background-size:192px 192px}",
    ".tg-orb{position:absolute;width:1000px;height:1000px;border-radius:50%}",
    ".tg-orb.g{left:-200px;top:-260px;background:radial-gradient(circle,rgba(61,220,151,.16) 0%,rgba(61,220,151,0) 66%)}",
    ".tg-orb.o{right:-260px;bottom:-320px;background:radial-gradient(circle,rgba(255,138,31,.13) 0%,rgba(255,138,31,0) 66%)}",
    ".tg-vig{background:radial-gradient(ellipse at 50% 45%,rgba(0,0,0,0) 45%,rgba(0,0,0,.6) 100%)}",
    ".ig-debug .ig-cell{outline:2px dashed #3a4a63}.ig-debug .ig-caps{outline:2px dashed #63503a}"
  ].join("\n");

  function css() { return CSS; }
  function chip(text, kind, extra) { var s = document.createElement("span"); s.className = "ig-chip item " + (kind || "") + (extra ? " " + extra : ""); s.textContent = text; return s; }
  // ---- procedural eases: closed-form, deterministic, seek-safe (no clocks, no randomness) ----
  function spring(decay, freq) {              // damped spring; freq in half-cycles so f(1) is exactly 1
    var end = 1 - Math.exp(-decay) * Math.cos(2 * Math.PI * freq);
    return function (t) { if (t <= 0) return 0; if (t >= 1) return 1; return 1 - Math.exp(-decay * t) * Math.cos(2 * Math.PI * freq * t) + (1 - end) * t; };
  }
  function registerEases() {
    var g = root.gsap; if (!g || !g.registerEase || root.__inkEases) return; root.__inkEases = true;
    g.registerEase("ink.spring", spring(5.5, 1.25));                 // one soft overshoot (~11 %)
    g.registerEase("ink.springHard", spring(5, 1.75));               // two rebounds (~24 %, then ~1 %)
    g.registerEase("ink.snap", function (t) { return t >= 1 ? 1 : 1 - Math.pow(2, -10 * t); });                              // expo out
    g.registerEase("ink.inertia", function (t) { return t >= 1 ? 1 : 1 - Math.pow(1 - t, 4); });                                // quartic out: fast start, long soft landing
    g.registerEase("ink.glide", function (t) { return t < 0.5 ? 16 * t * t * t * t * t : 1 - Math.pow(-2 * t + 2, 5) / 2; }); // quintic in-out
  }
  registerEases();
  function E(name, fallback) { return root.__inkEases ? name : fallback; }

  function pop(tl, el, t, o) {
    o = o || {};
    tl.fromTo(el, { y: o.y != null ? o.y : 16, scale: 0.78, rotation: o.rot || 0, transformOrigin: "50% 100%" },
      { y: 0, scale: 1, rotation: 0, duration: o.dur || 0.6, ease: o.ease || E("ink.spring", "back.out(1.7)"), immediateRender: false }, t);
    tl.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.16, ease: "power2.out", immediateRender: false }, t);   // opacity leads so the rebound never ghosts
  }
  function slide(tl, el, t, o) {
    o = o || {};
    tl.fromTo(el, { opacity: 0, x: o.x != null ? o.x : 70, y: o.y || 0 }, { opacity: 1, x: 0, y: 0, duration: o.dur || 0.75, ease: o.ease || E("ink.snap", "power2.out"), immediateRender: false }, t);
  }
  // inertial text: glides up from below while fading in (no scale => text never looks rubbery)
  function inertia(tl, el, t, o) {
    o = o || {};
    tl.fromTo(el, { opacity: 0, y: o.y != null ? o.y : 38 }, { opacity: 1, y: 0, duration: o.dur || 0.7, ease: E("ink.inertia", "power4.out"), immediateRender: false }, t);
  }
  // line icon draws itself: every stroke unrolls (dashoffset), fills fade in behind, plus a light scale pop of the whole icon
  function draw(tl, wrap, t, o) {
    o = o || {}; var dur = o.dur || 0.75;
    tl.fromTo(wrap, { opacity: 0, scale: 0.9, transformOrigin: "50% 60%" }, { opacity: 1, scale: 1, duration: 0.5, ease: E("ink.spring", "back.out(1.7)"), immediateRender: false }, t);
    Array.prototype.slice.call(wrap.querySelectorAll("path,line,polyline,polygon,rect,circle,ellipse")).forEach(function (n) {
      if (n.closest(".ig-ov") || n.getAttribute("stroke-dasharray")) return;           // overlays and dashed props keep their own look
      var st = n.getAttribute("stroke"), len = 0;
      if (st && st !== "none" && n.getTotalLength) { try { len = n.getTotalLength(); } catch (e) { len = 0; } }
      if (len > 1) {
        n.setAttribute("stroke-dasharray", len.toFixed(1) + " " + (len + 2).toFixed(1));
        tl.fromTo(n, { attr: { "stroke-dashoffset": len + 1 } }, { attr: { "stroke-dashoffset": 0 }, duration: dur, ease: E("ink.glide", "power2.inOut"), immediateRender: false }, t);
        tl.set(n, { attr: { "stroke-dasharray": "none" } }, t + dur + 0.02);          // back to a plain stroke once drawn
      }
      var f = n.getAttribute("fill");
      if (f && f !== "none") {
        var fo = parseFloat(n.getAttribute("fill-opacity") || "1");
        tl.fromTo(n, { attr: { "fill-opacity": 0 } }, { attr: { "fill-opacity": fo }, duration: dur * 0.6, ease: "power2.out", immediateRender: false }, t + dur * 0.35);
      }
    });
  }
  // digital camera: very slow, linear push-in on a scene; rate-limited so short scenes do not zoom fast.
  // force3D:false keeps text/SVG crisp and avoids a GPU layer per scene (keeps render memory flat).
  function camera(tl, el, t0, t1, o) {
    o = o || {}; var d = Math.max(t1 - t0, 0.1), z = o.max || Math.min(1.05, 1 + 0.006 * d);
    tl.fromTo(el, { scale: 1, transformOrigin: o.origin || "50% 46%" }, { scale: z, duration: d, ease: "none", force3D: false, immediateRender: false }, t0);
  }
  function hide(tl, el, t, d) { tl.to(el, { opacity: 0, duration: d || 0.35, ease: E("ink.glide", "power2.out") }, t); }

  // ---- tech-grid backdrop: linear drift on 2 parallax layers + two wandering glow orbs + a pulse on every sentence ----
  function techGrid(host, tl, dur, o) {
    o = o || {};
    var bg = document.createElement("div"); bg.className = "ig-tech";
    function layer(cls) { var d = document.createElement("div"); d.className = cls; bg.appendChild(d); return d; }
    var orbG = layer("tg-orb g"), orbO = layer("tg-orb o"), far = layer("tg tg-far"), near = layer("tg tg-near"), pulse = layer("tg tg-pulse"); layer("tg tg-vig");
    host.insertBefore(bg, host.firstChild);
    var T = Math.max(dur, 1);
    // endless drift: one linear tween over the whole part (background-position, so there is no seam to loop)
    tl.fromTo(far, { backgroundPosition: "0px 0px" }, { backgroundPosition: "-" + Math.round(14 * T) + "px -" + Math.round(8 * T) + "px", ease: "none", duration: T }, 0);
    tl.fromTo([near, pulse], { backgroundPosition: "0px 0px" }, { backgroundPosition: "-" + Math.round(34 * T) + "px -" + Math.round(19 * T) + "px", ease: "none", duration: T }, 0);
    // glow orbs wander on slow sines (finite yoyo => deterministic, ends exactly at T)
    tl.fromTo(orbG, { x: 0, y: 0 }, { x: 520, y: 300, duration: T / 2, ease: "sine.inOut", yoyo: true, repeat: 1 }, 0);
    tl.fromTo(orbO, { x: 0, y: 0 }, { x: -480, y: -240, duration: T / 3, ease: "sine.inOut", yoyo: true, repeat: 2 }, 0);
    // the grid lights up on each sentence start: the backdrop breathes with the voice
    (o.beats || []).forEach(function (b) {
      if (b < 0 || b > T - 0.8) return;
      tl.fromTo(pulse, { opacity: 0 }, { opacity: 0.55, duration: 0.12, ease: "power2.out", immediateRender: false }, b);
      tl.to(pulse, { opacity: 0, duration: 0.7, ease: E("ink.glide", "power2.inOut") }, b + 0.12);
    });
    return bg;
  }

  // ---- kinetic subtitles ----
  function norm(w) { return w.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9$%\u20ac]/g, ""); }
  var GREEN = ("dinero ganar gana ganas ganancia ganancias ahorro ahorros ahorra ahorrar invertir inversion inversiones invierte crece crecer crecimiento rentabilidad libertad riqueza rico ricos ingresos ingreso " +
    "interes intereses compuesto pasivo futuro exito millon millones fortuna beneficio gratis multiplica rendimiento patrimonio indexados").split(" ");
  var ORANGE = ("deuda deudas riesgo riesgos perder pierdes pierde perdida perdidas caida caidas crisis inflacion impuestos comision comisiones cuidado ojo error errores nunca jamas miedo gasto gastos gastar " +
    "pobre quiebra trampa caro cara cuesta peligro ruina problema estafa tarjeta credito hipoteca volatilidad").split(" ");
  var SET = {}; GREEN.forEach(function (w) { SET[w] = "green"; }); ORANGE.forEach(function (w) { SET[w] = "orange"; });
  var RGB = { green: [61, 220, 151], orange: [255, 138, 31] };
  function keyKind(word) {
    var n = norm(word); if (!n) return "";
    if (root.KEYWORDS && root.KEYWORDS[n]) return root.KEYWORDS[n];   // optional per-video override: window.KEYWORDS = {palabra: "green"|"orange"}
    if (/[0-9]/.test(n)) return "green";
    return SET[n] || "";
  }
  function captions(tl, words, capsEl, o) {
    o = o || {}; var maxKeys = o.maxKeys || 2, page = [], pages = [], elastic = "elastic.out(1,0.42)";
    words.forEach(function (w) { page.push(w); if (page.length >= 7 || w.pageBreakAfter) { pages.push(page); page = []; } });
    if (page.length) pages.push(page);
    pages.forEach(function (pw, pi) {
      var div = document.createElement("div"); div.className = "ig-page";
      // at most maxKeys highlights per page (numbers first) so the emphasis stays meaningful
      var kinds = pw.map(function (w) { return keyKind(w.word); }), rank = [], keep = {};
      kinds.forEach(function (k, i) { if (k) rank.push({ i: i, p: /[0-9]/.test(pw[i].word) ? 0 : 1 }); });
      rank.sort(function (a, b) { return a.p - b.p || a.i - b.i; }); rank.slice(0, maxKeys).forEach(function (r) { keep[r.i] = 1; });
      pw.forEach(function (w, i) {
        var s = document.createElement("span"); s.className = "ig-w" + (keep[i] ? " ig-key " + kinds[i] : ""); s.textContent = w.word; div.appendChild(s);
        if (i < pw.length - 1) div.appendChild(document.createTextNode(" "));
        w._s = s; w._k = keep[i] ? kinds[i] : "";
      });
      capsEl.appendChild(div);
      var t0 = pw[0].startMs / 1000, t1 = pw[pw.length - 1].endMs / 1000, nxt = pages[pi + 1] ? pages[pi + 1][0].startMs / 1000 : 1e9;
      tl.fromTo(div, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.42, ease: E("ink.inertia", "power4.out"), immediateRender: false }, Math.max(0, t0 - 0.16));   // inertial glide-up
      pw.forEach(function (w) {
        var ts = w.startMs / 1000, c = RGB[w._k];
        if (!c) { tl.to(w._s, { color: "#ffffff", duration: 0.14, ease: "power2.out" }, ts); return; }
        var rgb = c.join(",");
        tl.to(w._s, { color: "rgb(" + rgb + ")", duration: 0.12, ease: "power2.out" }, ts);
        tl.fromTo(w._s, { scale: 0.55, y: 16 }, { scale: 1.08, y: 0, duration: 0.8, ease: elastic, immediateRender: false }, ts);      // elastic pop
        tl.fromTo(w._s, { textShadow: "0 0 0px rgba(" + rgb + ",0)" }, { textShadow: "0 0 36px rgba(" + rgb + ",1), 0 0 12px rgba(" + rgb + ",.85)", duration: 0.14, ease: "power2.out", immediateRender: false }, ts);   // glow flash
        tl.to(w._s, { textShadow: "0 0 20px rgba(" + rgb + ",.5)", duration: 0.55, ease: "sine.out" }, ts + 0.14);                   // settles to a soft halo
      });
      tl.to(div, { opacity: 0, y: -6, duration: 0.14, ease: E("ink.glide", "power2.in") }, Math.max(t0 + 0.1, Math.min(t1 + 0.12, nxt - 0.16)));
    });
  }

  function rectOf(e) { var r = e.getBoundingClientRect(); return { x: r.left, y: r.top, w: r.width, h: r.height, r: r.right, b: r.bottom }; }
  function audit(sceneEl) {
    var items = Array.prototype.slice.call(sceneEl.querySelectorAll(".item")), out = { items: items.length, overlaps: [], clipped: [] };
    var rects = items.map(function (e) { return { e: e, r: rectOf(e) }; });
    for (var i = 0; i < rects.length; i++) for (var j = i + 1; j < rects.length; j++) {
      var a = rects[i].r, b = rects[j].r;
      if (rects[i].e.contains(rects[j].e) || rects[j].e.contains(rects[i].e)) continue;
      var w = Math.min(a.r, b.r) - Math.max(a.x, b.x), h = Math.min(a.b, b.b) - Math.max(a.y, b.y);
      if (w > 1 && h > 1) out.overlaps.push([rects[i].e.className.toString() + ":" + (rects[i].e.textContent || "").slice(0, 16), rects[j].e.className.toString() + ":" + (rects[j].e.textContent || "").slice(0, 16), Math.round(w * h)]);
    }
    rects.forEach(function (o) {
      var cell = o.e.closest(".ig-cell"); if (!cell) return; var c = rectOf(cell);
      if (o.r.x < c.x - 3 || o.r.y < c.y - 3 || o.r.r > c.r + 3 || o.r.b > c.b + 3) out.clipped.push((o.e.textContent || o.e.className.toString()).slice(0, 20));
    });
    return out;
  }
  root.InkGrid = { css: css, chip: chip, pop: pop, slide: slide, inertia: inertia, draw: draw, camera: camera, hide: hide, audit: audit, techGrid: techGrid, captions: captions, keyKind: keyKind, ease: E };
})(window);

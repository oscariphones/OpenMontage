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
    ".ig-caps{grid-row:2;position:relative;min-height:0}",
    ".ig-page{position:absolute;left:0;right:0;top:34px;text-align:center;font-size:42px;line-height:1.25;opacity:0}",
    ".ig-w{color:#6f7a8a}",
    ".ig-debug .ig-cell{outline:2px dashed #3a4a63}.ig-debug .ig-caps{outline:2px dashed #63503a}"
  ].join("\n");

  function css() { return CSS; }
  function chip(text, kind, extra) { var s = document.createElement("span"); s.className = "ig-chip item " + (kind || "") + (extra ? " " + extra : ""); s.textContent = text; return s; }
  function pop(tl, el, t, o) {
    o = o || {};
    tl.fromTo(el, { opacity: 0, y: o.y != null ? o.y : 16, scale: 0.86, transformOrigin: "50% 100%" },
      { opacity: 1, y: 0, scale: 1, duration: o.dur || 0.5, ease: o.ease || "back.out(1.7)", immediateRender: false }, t);
  }
  function slide(tl, el, t, o) {
    o = o || {};
    tl.fromTo(el, { opacity: 0, x: o.x != null ? o.x : 70, y: o.y || 0 }, { opacity: 1, x: 0, y: 0, duration: o.dur || 0.7, ease: o.ease || "power2.out", immediateRender: false }, t);
  }
  function hide(tl, el, t, d) { tl.to(el, { opacity: 0, duration: d || 0.35, ease: "power2.out" }, t); }

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
  root.InkGrid = { css: css, chip: chip, pop: pop, slide: slide, hide: hide, audit: audit };
})(window);

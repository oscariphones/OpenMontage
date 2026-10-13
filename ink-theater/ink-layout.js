/*
 * Ink Layout — a tiny, deterministic collision/spacing engine for hand-authored HyperFrames scenes.
 *
 * Every visible thing registers a bounding box and the time window in which it is visible.
 * resolve() then guarantees that, at any moment, movable items (labels, optionally props) never sit
 * on top of immovable ones (the figure, props, crosses/checks, captions band) or on each other,
 * and that everything stays inside the safe area (above the caption band, inside the side margins).
 *
 *   var L = InkLayout.create({ bounds: {x0:60, y0:170, x1:1860, y1:945}, pad: 14 });
 *   L.add({ id:"fig", kind:"figure", box:{x:400,y:430,w:260,h:480}, t0:0, t1:99, movable:false });
 *   L.add({ id:"lbl1", kind:"label", box:{x:300,y:500,w:240,h:50}, t0:2, t1:6, movable:true, apply:function(dx,dy){...} });
 *   var report = L.resolve();   // moves movable items, returns what moved and what still collides
 *
 * Pure geometry, no DOM, no clocks, no Math.random — same input => same layout, every render.
 */
(function (root) {
  "use strict";

  function overlapT(a, b) { return a.t0 < b.t1 - 1e-6 && b.t0 < a.t1 - 1e-6; }
  function inflate(b, p) { return { x: b.x - p, y: b.y - p, w: b.w + 2 * p, h: b.h + 2 * p }; }
  function overlapArea(a, b) {
    var w = Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x), h = Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y);
    return w > 0 && h > 0 ? w * h : 0;
  }
  // hollow items (outlined shapes) only conflict where the other box crosses the rim, not when it sits fully inside
  function pairArea(a, b, pad) {
    var ar = overlapArea(inflate(a.box, pad), inflate(b.box, pad));
    if (!ar) return 0;
    var h = b.hollow ? b : a.hollow ? a : null;
    if (h) {
      var o = h === b ? a : b, rim = h.rim || 14, inn = inflate(h.box, -rim);
      if (inn.w > 0 && inn.h > 0 && o.box.x >= inn.x && o.box.y >= inn.y && o.box.x + o.box.w <= inn.x + inn.w && o.box.y + o.box.h <= inn.y + inn.h) return 0;
    }
    return ar;
  }
  function shifted(b, dx, dy) { return { x: b.x + dx, y: b.y + dy, w: b.w, h: b.h }; }
  function outside(b, B) { return Math.max(0, B.x0 - b.x) + Math.max(0, b.x + b.w - B.x1) + Math.max(0, B.y0 - b.y) + Math.max(0, b.y + b.h - B.y1); }

  function create(opt) {
    opt = opt || {};
    var bounds = opt.bounds || { x0: 40, y0: 40, x1: 1880, y1: 1040 }, pad = opt.pad != null ? opt.pad : 12;
    var items = [];

    function add(it) {
      it.t0 = it.t0 == null ? 0 : it.t0; it.t1 = it.t1 == null ? 1e9 : it.t1;
      it.kind = it.kind || "prop"; it.group = it.group || it.id; it.moves = 0; it.dx = 0; it.dy = 0;
      items.push(it); return it;
    }

    // do two items conflict? (same group, or an explicit allow-list, never conflicts)
    function conflicts(a, b) {
      if (a === b || a.group === b.group) return false;
      if (!overlapT(a, b)) return false;
      if (a.ignore && a.ignore.indexOf(b.kind) >= 0) return false;
      if (b.ignore && b.ignore.indexOf(a.kind) >= 0) return false;
      return true;
    }
    function cost(it, box, placed) {
      var c = outside(box, it.bounds || bounds) * 50, probe = { box: box, hollow: it.hollow, rim: it.rim };
      for (var i = 0; i < placed.length; i++) { var o = placed[i]; if (conflicts(it, o)) c += pairArea(probe, o, pad); }
      return c;
    }
    // deterministic ring of candidate offsets, cheapest displacement first
    function candidates(it) {
      var w = it.box.w, h = it.box.h, max = it.maxShift || 1e9, out = [];
      var fx = [0, 0.35, -0.35, 0.7, -0.7, 1.1, -1.1, 1.6, -1.6, 2.2, -2.2], fy = [0, 0.9, -0.9, 1.8, -1.8, 2.7, -2.7, 3.6, -3.6, 5, -5];
      for (var i = 0; i < fx.length; i++) for (var j = 0; j < fy.length; j++) {
        var dx = Math.round(fx[i] * w), dy = Math.round(fy[j] * h);
        if (Math.abs(dx) > max || Math.abs(dy) > max) continue;
        out.push([dx, dy, Math.sqrt(dx * dx * 1.3 + dy * dy) + (i + j) * 1e-3]);   // real pixel distance (horizontal moves cost a bit more)
      }
      out.sort(function (a, b) { return a[2] - b[2]; });
      return out;
    }

    function resolve() {
      var order = items.slice().sort(function (a, b) { return (a.movable ? 1 : 0) - (b.movable ? 1 : 0) || (a.rank || 0) - (b.rank || 0); });
      var placed = [], report = { moved: [], unresolved: [] };
      order.forEach(function (it) {
        if (!it.movable) { placed.push(it); return; }
        var best = null, cs = candidates(it);
        for (var k = 0; k < cs.length; k++) {
          var c = cost(it, shifted(it.box, cs[k][0], cs[k][1]), placed);
          if (best === null || c < best.c - 1e-9) best = { c: c, dx: cs[k][0], dy: cs[k][1] };
          if (c === 0) break;
        }
        if (best && (best.dx || best.dy)) {
          it.box = shifted(it.box, best.dx, best.dy); it.dx += best.dx; it.dy += best.dy; it.moves++;
          if (it.apply) it.apply(best.dx, best.dy);
          report.moved.push({ id: it.id, kind: it.kind, dx: best.dx, dy: best.dy });
        }
        if (best && best.c > 0) report.unresolved.push({ id: it.id, kind: it.kind, overlap: Math.round(best.c) });
        placed.push(it);
      });
      return report;
    }

    // residual check (also used by the audit): every conflicting pair after resolve()
    function audit() {
      var out = [];
      for (var i = 0; i < items.length; i++) for (var j = i + 1; j < items.length; j++) {
        var a = items[i], b = items[j];
        if (!conflicts(a, b)) continue;
        var ar = pairArea(a, b, 0);
        if (ar > 0) out.push({ a: a.id, ak: a.kind, b: b.id, bk: b.kind, area: Math.round(ar) });
      }
      items.forEach(function (it) { var o = it.movable ? outside(it.box, it.bounds || bounds) : 0; if (o > 0) out.push({ a: it.id, ak: it.kind, b: "bounds", bk: "bounds", area: Math.round(o) }); });
      return out;
    }

    return { add: add, resolve: resolve, audit: audit, items: items, bounds: bounds, pad: pad };
  }

  root.InkLayout = { create: create, overlapArea: overlapArea };
})(typeof window !== "undefined" ? window : this);

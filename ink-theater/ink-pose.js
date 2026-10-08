/*
 * Ink Pose — clean 2D vector character built from a few FIXED, hand-authored key poses.
 *
 * No motion capture, no per-frame joint simulation. Each pose is a drawn SVG group; the character
 * "acts" by cutting between poses with GSAP transitions (quick cross-cut, slide, scale, a soft
 * back.out rebound). The result is crisp, readable and never jittery.
 *
 *   var fig = InkPose.create(svgEl, { poses: InkPose.pick(["idle","look","worry"]), color: "#eaeef3", stroke: 8 });
 *   fig.set("idle");                                   // initial pose (no animation)
 *   fig.to(tl, "look",  1.2, { fx: "bounce" });        // at t=1.2 s cut to "look" with a soft rebound
 *   fig.to(tl, "worry", 6.0, { fx: "slide", dx: -18 });
 *   fig.walk(tl, 8, 12);                               // simple 4-key walk cycle (A, passing, B, passing)
 *   fig.breathe(tl, 0, 14);                            // subtle idle breathing (finite, seek-safe)
 *
 * Poses live in a 360x560 box (ground at y=548) and face RIGHT (toward the graphic cell).
 * Every pose has the same six strokes (head, spine, armL, armR, legL, legR) so the silhouette stays
 * consistent; seated poses also carry their chair as `extra` strokes.
 * Deterministic: GSAP tweens only, no clocks, no Math.random.
 */
(function (root) {
  "use strict";
  var NS = "http://www.w3.org/2000/svg";
  function el(tag, a, parent) { var n = document.createElementNS(NS, tag); for (var k in a) n.setAttribute(k, a[k]); if (parent) parent.appendChild(n); return n; }

  var LEGS = { legL: [[176, 340], [160, 442], [150, 540]], legR: [[184, 340], [204, 442], [214, 540]] };
  var CHAIR = [[[118, 398], [226, 398]], [[120, 398], [112, 236]], [[134, 398], [130, 546]], [[212, 398], [216, 546]]];   // seat, back, two legs
  var POSES = {
    idle:  { head: [180, 118, 44], spine: [[180, 162], [180, 206], [180, 340]],
             armL: [[180, 210], [140, 284], [130, 356]], armR: [[180, 210], [220, 284], [230, 356]], legL: LEGS.legL, legR: LEGS.legR },
    calm:  { head: [182, 120, 44], spine: [[182, 164], [181, 208], [180, 340]],
             armL: [[180, 212], [130, 292], [100, 352]], armR: [[180, 212], [230, 292], [260, 352]], legL: LEGS.legL, legR: LEGS.legR },
    look:  { head: [200, 126, 44], spine: [[192, 168], [186, 208], [178, 340]],
             armL: [[184, 212], [146, 286], [136, 358]], armR: [[186, 212], [238, 262], [284, 282]], legL: LEGS.legL, legR: LEGS.legR },
    point: { head: [192, 116, 44], spine: [[184, 160], [182, 206], [178, 340]],
             armL: [[182, 212], [142, 286], [132, 358]], armR: [[184, 208], [250, 220], [326, 208]], legL: LEGS.legL, legR: LEGS.legR },
    worry: { head: [180, 128, 44], spine: [[180, 172], [180, 210], [180, 340]],
             armL: [[176, 214], [124, 198], [136, 142]], armR: [[184, 214], [236, 198], [224, 142]],
             legL: [[176, 340], [156, 440], [146, 540]], legR: [[184, 340], [208, 440], [218, 540]] },
    shrug: { head: [180, 138, 44], spine: [[180, 180], [180, 214], [180, 340]],
             armL: [[180, 218], [118, 256], [78, 232]], armR: [[180, 218], [242, 256], [282, 232]], legL: LEGS.legL, legR: LEGS.legR },
    slump: { head: [196, 150, 44], spine: [[190, 192], [186, 224], [176, 340]],
             armL: [[184, 226], [160, 300], [158, 372]], armR: [[188, 226], [218, 300], [224, 372]], legL: LEGS.legL, legR: LEGS.legR },
    think: { head: [188, 120, 44], spine: [[182, 164], [180, 208], [178, 340]],
             armL: [[178, 214], [148, 268], [206, 292]], armR: [[184, 212], [232, 240], [202, 172]], legL: LEGS.legL, legR: LEGS.legR },
    phone: { head: [186, 122, 44], spine: [[182, 166], [181, 208], [178, 340]],
             armL: [[180, 212], [142, 286], [132, 356]], armR: [[184, 210], [240, 196], [224, 130]], legL: LEGS.legL, legR: LEGS.legR },
    give:  { head: [194, 122, 44], spine: [[188, 166], [184, 208], [176, 340]],
             armL: [[182, 216], [244, 250], [304, 272]], armR: [[186, 212], [250, 238], [314, 252]], legL: LEGS.legL, legR: LEGS.legR },
    askHelp: { head: [186, 112, 44], spine: [[182, 158], [181, 204], [178, 340]],
             armL: [[178, 212], [134, 266], [104, 298]], armR: [[184, 208], [252, 148], [272, 58]], legL: LEGS.legL, legR: LEGS.legR },
    cheer: { head: [180, 108, 44], spine: [[180, 152], [180, 200], [180, 340]],
             armL: [[176, 206], [122, 148], [90, 70]], armR: [[184, 206], [238, 148], [270, 70]],
             legL: [[176, 340], [148, 440], [128, 540]], legR: [[184, 340], [212, 440], [232, 540]] },
    // simple walk cycle: stride A, passing, stride B, passing
    walkA: { head: [188, 118, 44], spine: [[184, 162], [182, 206], [178, 340]],
             armL: [[180, 210], [216, 274], [244, 324]], armR: [[184, 210], [156, 276], [134, 330]],
             legR: [[182, 340], [222, 438], [262, 538]], legL: [[174, 340], [150, 446], [112, 532]] },
    walkP: { head: [188, 112, 44], spine: [[184, 156], [182, 200], [178, 338]],
             armL: [[180, 206], [172, 282], [176, 340]], armR: [[184, 206], [190, 282], [186, 340]],
             legL: [[174, 338], [170, 440], [168, 540]], legR: [[182, 338], [194, 424], [180, 500]] },
    walkB: { head: [188, 118, 44], spine: [[184, 162], [182, 206], [178, 340]],
             armL: [[180, 210], [152, 276], [132, 332]], armR: [[184, 210], [220, 274], [246, 326]],
             legL: [[174, 340], [222, 438], [262, 538]], legR: [[182, 340], [156, 446], [116, 532]] },
    // seated (the chair is part of the pose)
    sitRelaxed: { extra: CHAIR, head: [186, 168, 44], spine: [[188, 214], [186, 262], [180, 392]],
             armL: [[186, 266], [178, 330], [212, 380]], armR: [[188, 266], [222, 326], [258, 378]],
             legR: [[186, 394], [266, 394], [274, 540]], legL: [[178, 394], [250, 398], [252, 540]] },
    sitStress:  { extra: CHAIR, head: [214, 218, 44], spine: [[204, 262], [192, 296], [180, 392]],
             armL: [[196, 300], [240, 372], [232, 262]], armR: [[200, 300], [266, 368], [248, 254]],
             legR: [[186, 394], [262, 396], [270, 540]], legL: [[178, 394], [244, 400], [248, 540]] }
  };

  function pick(names) { var o = {}; names.forEach(function (n) { if (POSES[n]) o[n] = POSES[n]; }); return o; }

  function path(pts, o) {
    var d = root.InkTheater ? root.InkTheater.inkPath(pts, { wobble: 1.1, step: 30, seed: o.seed }) : "M" + pts.map(function (p) { return p.join(" "); }).join(" L");
    return el("path", { d: d, fill: "none", stroke: o.color, "stroke-width": o.stroke, "stroke-linecap": "round", "stroke-linejoin": "round" });
  }
  function drawPose(parent, name, P, o, seed) {
    var g = el("g", { "data-pose": name, opacity: 0 }, parent);
    (P.extra || []).forEach(function (pts, i) { g.appendChild(path(pts, { color: o.dim, stroke: Math.max(4, o.stroke - 2), seed: seed + 40 + i })); });
    el("circle", { cx: P.head[0], cy: P.head[1], r: P.head[2], fill: "none", stroke: o.color, "stroke-width": o.stroke }, g);
    ["spine", "armL", "armR", "legL", "legR"].forEach(function (k, i) { g.appendChild(path(P[k], { color: o.color, stroke: o.stroke, seed: seed + i })); });
    return g;
  }

  function create(svg, opt) {
    opt = opt || {};
    var poses = opt.poses || POSES, o = { color: opt.color || "#eaeef3", dim: opt.dim || "#7d8797", stroke: opt.stroke || 8 };
    var stage = el("g", { "class": "ink-figure" }, svg), groups = {}, n = 0;
    Object.keys(poses).forEach(function (name) { groups[name] = drawPose(stage, name, poses[name], o, 11 + 7 * (n++)); });
    var fig = { stage: stage, groups: groups, cur: null, names: Object.keys(poses) };

    fig.set = function (name) { if (fig.cur) groups[fig.cur].setAttribute("opacity", 0); groups[name].setAttribute("opacity", 1); fig.cur = name; return fig; };

    // Cut to a pose at time t (seconds on the timeline) with a GSAP transition.
    //   fx: "bounce" (soft back.out rebound, default) | "slide" (slides in from dx,dy) | "fade"
    fig.to = function (tl, name, t, o2) {
      o2 = o2 || {};
      var prev = fig.cur, next = groups[name], fx = o2.fx || "bounce", dur = o2.dur || 0.42;
      if (!next || prev === name) return fig;
      if (prev) tl.to(groups[prev], { opacity: 0, duration: 0.1, ease: "power2.out" }, t);   // quick cut-away: no ghosting
      // opacity and motion are separate tweens so the soft rebound does not drag the cross-fade out
      tl.fromTo(next, { opacity: 0 }, { opacity: 1, duration: 0.12, ease: "power2.out", immediateRender: false }, t);
      var from = { x: 0, y: 0, scale: 1, transformOrigin: "50% 100%" }, to = { x: 0, y: 0, scale: 1, duration: dur, transformOrigin: "50% 100%", immediateRender: false };
      if (fx === "bounce") { from.y = o2.dy != null ? o2.dy : 12; from.scale = 0.96; to.ease = "back.out(1.7)"; }
      else if (fx === "slide") { from.x = o2.dx != null ? o2.dx : -26; from.y = o2.dy || 0; to.ease = "power2.out"; }
      else { to.ease = "power2.out"; }
      tl.fromTo(next, from, to, t);
      fig.cur = name; return fig;
    };

    // Hard cut (no transition): used by the walk cycle.
    fig.cut = function (tl, name, t) {
      var prev = fig.cur; if (prev === name) return fig;
      if (prev) tl.set(groups[prev], { opacity: 0 }, t);
      tl.set(groups[name], { opacity: 1, x: 0, y: 0, scale: 1 }, t);
      fig.cur = name; return fig;
    };

    // Simple walk cycle between t0 and t1: A, passing, B, passing ... Needs walkA/walkP/walkB.
    fig.walk = function (tl, t0, t1, o2) {
      o2 = o2 || {};
      var step = o2.step || 0.17, seq = ["walkA", "walkP", "walkB", "walkP"], i = 0;
      for (var t = t0; t < t1 - 0.02; t += step, i++) fig.cut(tl, seq[i % 4], t);
      return fig;
    };

    // Slow breathing on the whole figure between t0 and t1 (finite repeats => deterministic).
    fig.breathe = function (tl, t0, t1, amp) {
      var period = 2.6, reps = Math.max(0, Math.floor((t1 - t0) / period) - 1);
      tl.fromTo(stage, { scaleY: 1, transformOrigin: "50% 100%" }, { scaleY: 1 + (amp || 0.014), duration: period / 2, ease: "sine.inOut", yoyo: true, repeat: reps * 2 + 1, transformOrigin: "50% 100%" }, t0);
      return fig;
    };
    return fig;
  }

  root.InkPose = { create: create, pick: pick, POSES: POSES };
})(window);

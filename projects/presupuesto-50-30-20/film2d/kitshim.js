/* Minimal drawing helpers so the existing props library (props.js) can draw into stand-alone SVGs.
 * Colors are FINAL dark-theme colors now (no inversion filter in the 2D film). */
(function (root) {
  "use strict";
  var NS = "http://www.w3.org/2000/svg";
  var C = { paper: "#0b0f14", ink: "#eaeef3", orange: "#ff8a1f", red: "#ff5a5f", green: "#3ddc97", grey: "#7d8797", faint: "#2a3340", white: "#ffffff", text: "#eaeef3", cold: "#7fc8ff" };
  function el(tag, a, parent) { var n = document.createElementNS(NS, tag); for (var k in a) n.setAttribute(k, a[k]); if (parent) parent.appendChild(n); return n; }
  function ip(pts, o) { return root.InkTheater.inkPath(pts, o || { wobble: 1.3, step: 36 }); }
  function ink(parent, d, o) { o = o || {}; return el("path", { d: d, fill: o.fill || "none", stroke: o.c || C.ink, "stroke-width": o.w || 5, "stroke-linecap": "round", "stroke-linejoin": "round" }, parent); }
  function line(parent, pts, o) { return ink(parent, ip(pts, (o && o.ip) || undefined), o); }
  function poly(parent, pts, o) { return ink(parent, ip(pts.concat([pts[0]])), o); }
  function rect(parent, x, y, w, h, o) { return poly(parent, [[x, y], [x + w, y], [x + w, y + h], [x, y + h]], o); }
  function circ(parent, x, y, r, o) { o = o || {}; return el("circle", { cx: x, cy: y, r: r, fill: o.fill || "none", stroke: o.c || C.ink, "stroke-width": o.w || 5 }, parent); }
  function place(parent, x, y, s) { var w = el("g", { transform: "translate(" + x + " " + y + ") scale(" + (s || 1) + ")" }, parent); var i = el("g", { opacity: 1 }, w); i._wrap = w; return i; }
  function text(parent, x, y, str, size, color, anchor) { var t = el("text", { x: x, y: y, "font-family": "InkHand, cursive", "font-size": size || 40, fill: color || C.ink, "text-anchor": anchor || "middle" }, parent); t.textContent = str; return t; }
  root.KIT = { C: C, K: {}, el: el, ip: ip, ink: ink, line: line, poly: poly, rect: rect, circ: circ, place: place, text: text };
})(window);

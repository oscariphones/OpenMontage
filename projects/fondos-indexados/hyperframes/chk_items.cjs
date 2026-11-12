// Comprueba que cada item de spec.js aparece dentro de su escena: a <= t <= b - 0.5 (usa los tiempos reales de sent.js).
// CHK_V2 (FABRICA_3): tambien revisa los tiempos de los modos (graph pts, breakdown parts/total, maze beats, t0), las poses del cameo,
// que el modo exista, y que una escena con entrada + salida caminando dure lo suficiente.
// Stick-Action (layout "c"): siempre con texto gigante punch (1 a 3 palabras o una cifra) y como maximo 2 frases de transicion.
const fs = require("fs"), path = require("path"), vm = require("vm");
const dir = process.argv[2] || "f1", ctx = { window: {} }; ctx.window = ctx;
vm.createContext(ctx);
vm.runInContext("var KIT={C:{grey:1,orange:1,red:1,green:1,faint:1,cold:1}};", ctx);
vm.runInContext(fs.readFileSync(path.join(dir, "sent.js"), "utf8"), ctx);
vm.runInContext(fs.readFileSync(path.join(dir, "spec.js"), "utf8"), ctx);
const MODOS = ["graph", "breakdown", "maze", "stick"];
let bad = 0, n = 0;
const fuera = (s, i, lbl, t) => { n++; if (t == null) return; if (t < s.a - 0.05 || t > s.b - 0.5) { bad++; console.log(`escena ${i} [${s.a.toFixed(1)}-${s.b.toFixed(1)}] "${lbl}" aparece en t=${(+t).toFixed(1)}`); } };
const flat = (rows) => { const o = []; (rows || []).forEach((r) => r.forEach((it) => { if (it.row || it.col) o.push(...flat([it.row || it.col])); else o.push(it); })); return o; };
ctx.SCENES.forEach((s, i) => {
  flat(s.g).concat(flat(s.g2)).forEach((it) => fuera(s, i, it.c || it.big || it.p || it.w, it.t));
  if (s.mode && !MODOS.includes(s.mode)) { bad++; console.log(`escena ${i}: modo desconocido "${s.mode}"`); }
  if (s.t0 != null) fuera(s, i, "t0", s.t0);
  (s.pts || []).forEach((p, k) => fuera(s, i, `punto ${k + 1}`, p[0]));
  (s.parts || []).forEach((p, k) => fuera(s, i, `parte 0${k + 1}`, p[3]));
  if (s.total) fuera(s, i, "total", s.total[3]);
  (s.beats || []).forEach((b) => fuera(s, i, b[1], b[0]));
  ((s.cameo && s.cameo.poses) || []).forEach((p) => fuera(s, i, "cameo " + p[1], p[0]));
  if (s.mode === "graph" && (s.pts || []).length < 2) { bad++; console.log(`escena ${i}: graph necesita al menos 2 puntos`); }
  if (s.mode === "breakdown" && !((s.parts || []).length >= 2 && s.parts.length <= 5)) { bad++; console.log(`escena ${i}: breakdown necesita 2 a 5 partes`); }
  if ((s.enter || s.exit) && s.b - s.a < (s.enter && s.exit ? 4.5 : 3)) { bad++; console.log(`escena ${i}: muy corta para entrar/salir caminando (${(s.b - s.a).toFixed(1)} s)`); }
  if (s.L === "c" || s.punch) {
    const p = s.punch, words = p && p.text ? String(p.text).trim().split(/\s+/).length : 0;
    if (!p || !p.text) { bad++; console.log(`escena ${i}: Stick-Action (personaje solo) sin texto gigante punch`); }
    else if (words > 3) { bad++; console.log(`escena ${i}: punch "${p.text}" tiene ${words} palabras (maximo 3 o una cifra)`); }
    if (p) fuera(s, i, "punch " + p.text, p.t);
    const frases = ctx.SENT.filter((x) => x[0] >= s.a - 0.05 && x[0] < s.b - 0.05).length;
    if (frases > 2) { bad++; console.log(`escena ${i}: Stick-Action dura ${frases} frases (maximo 2 frases cortas de transicion)`); }
  }
  if (s.enter) (s.poses || []).slice(1).forEach((p) => { if (p[0] < s.a + 1.2) { bad++; console.log(`escena ${i}: pose "${p[1]}" antes de terminar la entrada caminando`); } });
});
console.log(dir, "items", n, "fuera de escena", bad);
process.exit(bad ? 1 : 0);

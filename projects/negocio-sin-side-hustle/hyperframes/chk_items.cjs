// Comprueba que cada item de spec.js aparece dentro de su escena: a <= t <= b - 0.5 (usa los tiempos reales de sent.js).
const fs = require("fs"), path = require("path"), vm = require("vm");
const dir = process.argv[2] || "f1", ctx = { window: {} }; ctx.window = ctx;
vm.createContext(ctx);
vm.runInContext("var KIT={C:{grey:1,orange:1,red:1,green:1,faint:1,cold:1}};", ctx);
vm.runInContext(fs.readFileSync(path.join(dir, "sent.js"), "utf8"), ctx);
vm.runInContext(fs.readFileSync(path.join(dir, "spec.js"), "utf8"), ctx);
let bad = 0, n = 0;
ctx.SCENES.forEach((s, i) => (s.g || []).forEach((row) => row.forEach((it) => {
  n++; const lbl = it.c || it.big || it.p || it.w;
  if (it.t < s.a - 0.05 || it.t > s.b - 0.5) { bad++; console.log(`escena ${i} [${s.a.toFixed(1)}-${s.b.toFixed(1)}] "${lbl}" aparece en t=${it.t.toFixed(1)}`); }
})));
console.log(dir, "items", n, "fuera de escena", bad);
process.exit(bad ? 1 : 0);

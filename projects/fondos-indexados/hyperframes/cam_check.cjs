// FABRICA_2 camera check: lists the camera moves (window pans, Stickman punch-ins, hold drifts) and seeks the timeline every STEP s
// verifying that every visible floating window stays inside the frame and above the subtitles while the camera moves
// (a window cropped during a Stickman punch-in is reported apart: it is intentional and short).
// Usage: node cam_check.cjs <dir> [step=0.2] [--list]  -> exit code 1 if a window leaves the frame (outside a punch-in) or a static shot lasts > 5 s
const path = require("path");
const puppeteer = require("C:/Users/oslem/AppData/Local/npm-cache/_npx/702923228c2ce1e6/node_modules/puppeteer-core");
const EXE = "C:/Users/oslem/.cache/hyperframes/chrome/chrome-headless-shell/win64-152.0.7977.30/chrome-headless-shell-win64/chrome-headless-shell.exe";
(async () => {
  const dir = process.argv[2], step = parseFloat(process.argv[3] || "0.2");
  const browser = await puppeteer.launch({ executablePath: EXE, headless: "shell", args: ["--no-sandbox", "--allow-file-access-from-files", "--disable-gpu"] });
  const page = await browser.newPage(); await page.setViewport({ width: 1920, height: 1080 });
  const errors = []; page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("file:///" + path.resolve(dir, "index.html").split(path.sep).join("/"), { waitUntil: "load", timeout: 60000 });
  await new Promise((r) => setTimeout(r, 1200));
  const res = await page.evaluate((step) => {
    const tl = window.__timelines.main, dur = tl.duration(), moves = (window.FILM && window.FILM.moves) || [], bad = [];
    const caps = document.getElementById("caps"), vis = (e) => { for (let n = e; n && n.nodeType === 1; n = n.parentElement) { const cs = getComputedStyle(n); if (cs.display === "none" || cs.visibility === "hidden" || parseFloat(cs.opacity) < 0.35) return false; } return true; };
    for (let t = 0; t <= dur; t += step) {
      tl.seek(t, false);
      const capTop = Math.min(1080, ...[...caps.querySelectorAll(".ig-page")].filter(vis).map((p) => p.getBoundingClientRect().top));
      document.querySelectorAll(".ig-win").forEach((w) => {
        if (!vis(w)) return; const r = w.getBoundingClientRect();
        const zoom = moves.some((m, i) => m.kind === "char" && moves[i + 1] && t >= m.t0 && t <= moves[i + 1].t0 + moves[i + 1].d);
        if (r.left < -2 || r.right > 1922 || r.top < -2 || r.bottom > Math.min(1082, capTop + 8)) bad.push({ zoom, t: +t.toFixed(2), l: Math.round(r.left), r: Math.round(r.right), top: Math.round(r.top), bot: Math.round(r.bottom), capTop: Math.round(capTop) });
      });
    }
    const holds = []; moves.forEach((m, i) => { const h0 = m.t0 + m.d, h1 = moves[i + 1] ? moves[i + 1].t0 : dur; if (h1 - h0 > 5) holds.push([+h0.toFixed(2), +h1.toFixed(2)]); });
    return { dur, moves: moves.map((m) => ({ t0: +m.t0.toFixed(2), d: +m.d.toFixed(2), kind: m.kind || "set", s: m.to.s, x: m.to.x, y: m.to.y, })), bad, holds };
  }, step);
  await browser.close();
  const n = (k) => res.moves.filter((m) => m.kind === k).length, hard = res.bad.filter((b) => !b.zoom), soft = res.bad.filter((b) => b.zoom);
  console.log(`${dir} dur ${res.dur.toFixed(1)}  ventana ${n("win")}  stickman ${n("char")}  derivas ${n("drift")}  fuera_de_cuadro ${hard.length}  recorte_en_zoom ${soft.length}  planos_fijos_largos ${res.holds.length}  errores ${errors.length}`);
  if (process.argv.includes("--list")) res.moves.forEach((m) => console.log("  ", JSON.stringify(m)));
  hard.slice(0, 10).forEach((b) => console.log("   FUERA", JSON.stringify(b)));
  soft.slice(0, 10).forEach((b) => console.log("   recorte (zoom al Stickman)", JSON.stringify(b)));
  res.holds.forEach((h) => console.log("   FIJO", JSON.stringify(h)));
  errors.forEach((e) => console.log("   [pageerror]", e));
  process.exit(hard.length || res.holds.length || errors.length ? 1 : 0);
})();

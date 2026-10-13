// Dynamic layout audit: seeks the GSAP timeline every STEP seconds and checks the REAL visible geometry.
// Reports overlaps between visible items (union of their drawn shapes / chip box) and items leaving their cell.
// Usage: node audit_dyn.cjs <dir> [step=0.4]
const path = require("path");
const puppeteer = require("C:/Users/oslem/AppData/Local/npm-cache/_npx/702923228c2ce1e6/node_modules/puppeteer-core");
const EXE = "C:/Users/oslem/.cache/hyperframes/chrome/chrome-headless-shell/win64-152.0.7977.30/chrome-headless-shell-win64/chrome-headless-shell.exe";
(async () => {
  const dir = process.argv[2], step = parseFloat(process.argv[3] || "0.4");
  const browser = await puppeteer.launch({ executablePath: EXE, headless: "shell", args: ["--no-sandbox", "--allow-file-access-from-files", "--disable-gpu"] });
  const page = await browser.newPage(); await page.setViewport({ width: 1920, height: 1080 });
  page.on("pageerror", (e) => console.log("[pageerror]", e.message));
  await page.goto("file:///" + path.resolve(dir, "index.html").split(path.sep).join("/"), { waitUntil: "load", timeout: 60000 });
  await new Promise((r) => setTimeout(r, 1200));
  const res = await page.evaluate((step) => {
    const tl = window.__timelines.main, dur = tl.duration(), out = { dur, samples: 0, issues: [] };
    const vis = (e) => { for (let n = e; n && n.nodeType === 1; n = n.parentElement) { const cs = getComputedStyle(n); if (cs.display === "none" || cs.visibility === "hidden" || parseFloat(cs.opacity) < 0.35) return false; } return true; };
    const unionOf = (wrap) => {
      const leaves = [...wrap.querySelectorAll("svg:not(.ig-ov) path, svg:not(.ig-ov) circle, svg:not(.ig-ov) rect, svg:not(.ig-ov) ellipse, svg:not(.ig-ov) text")].filter((l) => { const sw = parseFloat(getComputedStyle(l).strokeWidth) || 0; return vis(l); });
      if (!leaves.length) return null; let x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9;
      leaves.forEach((l) => { const r = l.getBoundingClientRect(); if (r.width * r.height === 0 && r.width + r.height === 0) return; x0 = Math.min(x0, r.left); y0 = Math.min(y0, r.top); x1 = Math.max(x1, r.right); y1 = Math.max(y1, r.bottom); });
      return x1 > x0 ? { x0, y0, x1, y1 } : null;
    };
    for (let t = 0.3; t < dur - 0.2; t += step) {
      tl.time(t, false); out.samples++;
      { let shown = 0; document.querySelectorAll(".ig-scene").forEach((sc) => { const cs = getComputedStyle(sc); if (cs.display !== "none" && parseFloat(cs.opacity) > 0.05) shown++; });
        if (!shown) out.issues.push({ t: +t.toFixed(2), scene: "NO_SCENE", a: "empty frame", b: "no scene displayed" }); }
      document.querySelectorAll(".ig-scene").forEach((sc) => {
        if (!vis(sc)) return;
        const boxes = [];
        sc.querySelectorAll(".item").forEach((e) => {
          if (e.closest(".item") !== e) return;       // skip nested
          if (!vis(e)) return;
          let b; if (e.classList.contains("ig-wrap")) b = unionOf(e); else { const r = e.getBoundingClientRect(); b = { x0: r.left, y0: r.top, x1: r.right, y1: r.bottom }; }
          if (b) boxes.push({ e, b, name: (e.textContent || e.className.toString()).slice(0, 18) || "svg" });
        });
        for (let i = 0; i < boxes.length; i++) for (let j = i + 1; j < boxes.length; j++) {
          const a = boxes[i].b, c = boxes[j].b, w = Math.min(a.x1, c.x1) - Math.max(a.x0, c.x0), h = Math.min(a.y1, c.y1) - Math.max(a.y0, c.y0);
          if (w > 6 && h > 6) out.issues.push({ t: +t.toFixed(2), scene: sc.dataset.id, a: boxes[i].name, b: boxes[j].name, area: Math.round(w * h) });
        }
        const cells = [...sc.querySelectorAll(".ig-cell")];
        boxes.forEach((o) => { const cell = o.e.closest(".ig-cell"); if (!cell) return; const cr = cell.getBoundingClientRect(); if (o.b.x0 < cr.left - 6 || o.b.x1 > cr.right + 6 || o.b.y0 < cr.top - 6 || o.b.y1 > cr.bottom + 6) out.issues.push({ t: +t.toFixed(2), scene: sc.dataset.id, a: o.name, b: "OUT_OF_CELL" }); });
      });
    }
    return out;
  }, step);
  const byScene = {}; res.issues.forEach((i) => { (byScene[i.scene] = byScene[i.scene] || []).push(i); });
  console.log(dir, "duration", res.dur.toFixed(1), "samples", res.samples, "issues", res.issues.length, "in scenes", Object.keys(byScene).length);
  Object.keys(byScene).forEach((s) => console.log("  scene", s, "n=" + byScene[s].length, JSON.stringify(byScene[s].slice(0, 2))));
  await browser.close();
})().catch((e) => { console.error("AUDIT_FAIL", e.message); process.exit(1); });

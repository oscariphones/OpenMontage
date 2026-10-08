// Usage: node dbg_scene.cjs <dir> <t>  -> lists scenes and their visibility/opacity at time t
const path = require("path");
const puppeteer = require("C:/Users/oslem/AppData/Local/npm-cache/_npx/702923228c2ce1e6/node_modules/puppeteer-core");
const EXE = "C:/Users/oslem/.cache/hyperframes/chrome/chrome-headless-shell/win64-152.0.7977.30/chrome-headless-shell-win64/chrome-headless-shell.exe";
(async () => {
  const b = await puppeteer.launch({ executablePath: EXE, headless: "shell", args: ["--no-sandbox", "--allow-file-access-from-files", "--disable-gpu"] });
  const pg = await b.newPage(); await pg.setViewport({ width: 1920, height: 1080 });
  pg.on("pageerror", (e) => console.log("[pageerror]", e.message)); pg.on("console", (m) => console.log("[console]", m.text()));
  await pg.goto("file:///" + path.resolve(process.argv[2], "index.html").split(path.sep).join("/"), { waitUntil: "load" });
  await new Promise((r) => setTimeout(r, 1000));
  const r = await pg.evaluate((t) => { window.__timelines.main.time(t, false);
    return [...document.querySelectorAll(".ig-scene")].map((s) => { const cs = getComputedStyle(s); return s.dataset.id + " disp=" + cs.display + " op=" + cs.opacity + " items=" + s.querySelectorAll(".item").length + " svg=" + s.querySelectorAll("svg").length; }).filter((x) => !x.includes("disp=none")); }, parseFloat(process.argv[3]));
  console.log(JSON.stringify(r, null, 1)); await b.close();
})();

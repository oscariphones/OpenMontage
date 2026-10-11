"""Assemble the fondos-indexados film as HyperFrames compositions f1..fN from the shared 2D kit.
   python film2d/build.py [f1 f2 ...]   (times are real narration seconds: identity retime)
   ILUS_V1: 2D illustrations (PNG with alpha / SVG) from assets/ilustraciones/ (repo library) and projects/<p>/assets/ilustraciones/
   (per-project override) are copied into each part, downscaled if huge (render RAM), and listed in ilus.js for the engine."""
import json, re, shutil, struct, subprocess, sys
from pathlib import Path

H = Path(__file__).resolve().parent            # .../fondos-indexados/film2d
PROJ = H.parent
HF = PROJ / "hyperframes"
REPO = PROJ.parents[1]
IT = REPO / "ink-theater"
TL = json.load(open(PROJ / "assets/audio/timeline.json", encoding="utf-8"))
SENT = TL["sentences"]; TOTAL = TL["duration"]
# part boundary = start of the section closest to the middle (cut falls between scenes)
_starts = [s["start"] for k, s in enumerate(SENT) if k and s["section"] != SENT[k - 1]["section"]]
SPLIT = min(_starts, key=lambda t: abs(t - TOTAL / 2))   # exact: scenes must fit inside a part
PARTS = {"f1": (0.0, SPLIT), "f2": (SPLIT, TOTAL)}
an = [[0.0, 0.0], [TOTAL, TOTAL]]

words = []
for k, s in enumerate(SENT):
    toks = s["text"].split(); d = s["end"] - s["start"]
    wt = [max(len(re.sub(r"\W", "", x)), 1) + (2.5 if x[-1:] in ",;:" else 0) + (4 if x[-1:] in ".?!…" else 0) for x in toks]
    tot = sum(wt); tt = s["start"]
    for i, (tok, x) in enumerate(zip(toks, wt)):
        dd = d * x / tot
        words.append({"word": tok, "k": k, "startMs": int(round(tt * 1000)), "endMs": int(round((tt + dd) * 1000)), "pageBreakAfter": i == len(toks) - 1 or tok[-1:] in ".?!"}); tt += dd

grid_css = subprocess.run(["node", "-e", "global.window={};require(process.argv[1]);process.stdout.write(window.InkGrid.css())", str(IT / "ink-grid.js")],
                          capture_output=True, text=True, encoding="utf-8").stdout
# ---- illustration library: only the names spec.js mentions are copied (a file named like a prop, e.g. house.png, replaces that line icon) ----
ILL_MAX = 1200          # px, longest side: bigger PNGs are downscaled in the part copy (decoded images live in RAM on every frame)
def ill_size(f):
    if f.suffix.lower() == ".png":
        b = f.read_bytes()[:24]
        if b[:8] != b"\x89PNG\r\n\x1a\n": sys.exit(f"{f} no es un PNG valido")
        return struct.unpack(">II", b[16:24])
    t = f.read_text(encoding="utf-8", errors="ignore")[:4000]
    m = re.search(r'viewBox="\s*[-\d.]+[\s,]+[-\d.]+[\s,]+([\d.]+)[\s,]+([\d.]+)', t)
    if not m: m = re.search(r'<svg[^>]*\swidth="([\d.]+)(?:px)?"[^>]*\sheight="([\d.]+)(?:px)?"', t)
    if not m: sys.exit(f"{f}: el SVG necesita viewBox (o width/height) para saber su proporcion")
    return float(m.group(1)), float(m.group(2))
lib = {}
for d in (REPO / "assets/ilustraciones", PROJ / "assets/ilustraciones"):          # project files win over the shared library
    for f in sorted(d.glob("*")) if d.exists() else []:
        if f.suffix.lower() in (".png", ".svg"): lib[f.stem] = f
used = set(re.findall(r'"([A-Za-z0-9_\-]+)"', (H / "spec.js").read_text(encoding="utf-8"))) & set(lib)

tpl = (H / "template.tpl").read_text(encoding="utf-8")
for name in (sys.argv[1:] or list(PARTS)):
    a, b = PARTS[name]; d = HF / name; (d / "assets").mkdir(parents=True, exist_ok=True)
    for f in ["ink-theater.js", "ink-pose.js", "ink-grid.js"]: shutil.copy(IT / f, d / f)
    for f in ["props.js", "kitshim.js", "widgets.js", "engine.js", "spec.js", "gsap.min.js"]: shutil.copy(H / f, d / f)
    shutil.copy(IT / "assets/patrickhand.ttf", d / "assets/patrickhand.ttf"); shutil.copy(IT / "assets/OFL.txt", d / "assets/OFL.txt")
    ilus, ad = {}, d / "assets/ilus"
    if ad.exists(): shutil.rmtree(ad)
    for nm in sorted(used):
        f = lib[nm]; ad.mkdir(parents=True, exist_ok=True); dst = ad / f.name; iw, ih = ill_size(f)
        if f.suffix.lower() == ".png" and max(iw, ih) > ILL_MAX:
            k = ILL_MAX / max(iw, ih); iw, ih = round(iw * k), round(ih * k)
            subprocess.run(["ffmpeg", "-y", "-hide_banner", "-loglevel", "error", "-i", str(f), "-vf", f"scale={iw}:{ih}:flags=lanczos", "-pix_fmt", "rgba", str(dst)], check=True)
        else: shutil.copy(f, dst)
        ilus[nm] = {"src": f"assets/ilus/{f.name}", "w": iw, "h": ih}
    (d / "ilus.js").write_text("window.ILUS=" + json.dumps(ilus, ensure_ascii=False) + ";", encoding="utf-8")
    (d / "sent.js").write_text("window.SENT=" + json.dumps([[round(s["start"], 3), round(s["end"], 3)] for s in SENT]) + ";", encoding="utf-8")
    w = [dict(x, startMs=int(x["startMs"] - a * 1000), endMs=int(x["endMs"] - a * 1000)) for x in words if a * 1000 - 20 <= x["startMs"] <= b * 1000 + 20]
    data = {"a": a, "b": b, "anchors": an, "words": w}
    html = tpl.replace("/*__GRIDCSS__*/", grid_css).replace("__DUR__", f"{b - a:.3f}").replace("__DATA__", json.dumps(data, ensure_ascii=False))
    (d / "index.html").write_text(html, encoding="utf-8")
    print(name, round(a, 2), "->", round(b, 2), "dur", round(b - a, 2), "s, words", len(w), "ilustraciones", len(ilus))

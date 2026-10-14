"""Compone hyperframes/index.html (1080x1920) desde film/template.html + assets/audio/timeline.json. Estilo: REGLAS_ZONACHEF.md."""
import json, shutil
from pathlib import Path

P = Path(__file__).resolve().parents[1]; REPO = P.parents[1]
HF = P / "hyperframes"; (HF / "assets").mkdir(parents=True, exist_ok=True)
tl = json.load(open(P / "assets/audio/timeline.json", encoding="utf-8"))
data = {"dur": tl["duration"], "sents": [{"start": s["start"], "end": s["end"], "text": s["text"]} for s in tl["sentences"]]}
html = (P / "film/template.html").read_text(encoding="utf-8")
html = html.replace("__DUR__", f'{tl["duration"]:.3f}').replace("__DATA__", json.dumps(data, ensure_ascii=False))
(HF / "index.html").write_text(html, encoding="utf-8")
shutil.copy(REPO / "projects/fondos-indexados/film2d/gsap.min.js", HF / "gsap.min.js")
for img in sorted((P / "assets/img").glob("*.*")):          # fotos del producto (bajadas de zonachef.com.mx)
    shutil.copy(img, HF / "assets" / img.name)
print(f"index.html: {len(data['sents'])} frases, {tl['duration']:.1f} s")

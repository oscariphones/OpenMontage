<!doctype html>
<html lang="es" data-resolution="landscape">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=1920, height=1080" />
    <script src="gsap.min.js"></script>
    <script src="ink-theater.js"></script>
    <script src="ink-pose.js"></script>
    <script src="ink-grid.js"></script>
    <script src="sent.js"></script>
    <script src="kitshim.js"></script>
    <script src="props.js"></script>
    <script src="widgets.js"></script>
    <script src="engine.js"></script>
    <script src="spec.js"></script>
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      @font-face { font-family: "InkHand"; src: url("assets/patrickhand.ttf") format("truetype"); font-display: block; }
      html, body { width: 1920px; height: 1080px; overflow: hidden; background: #0b0f14; }
      #root { position: relative; width: 1920px; height: 1080px; overflow: hidden; background: #0b0f14; }
      /*__GRIDCSS__*/
      .ig-scene { display: grid; grid-template-columns: var(--cols, 0.9fr 1.3fr); }
      .L-cg { --cols: 0.9fr 1.3fr; } .L-gc { --cols: 1.3fr 0.9fr; } .L-cgg { --cols: 0.8fr 1fr 1fr; } .L-g { --cols: 1fr; }
      .ig-cell.gfx { align-items: center; justify-content: center; gap: 26px; padding-bottom: 36px; --k: 1; }
      .ig-row, .ig-stack { flex: 0 0 auto; max-width: 100%; }
      .ig-wrap { position: relative; flex: 0 0 auto; }
      .ig-wrap > svg { display: block; }
      .ig-ov { position: absolute; inset: 0; width: 100% !important; height: 100% !important; pointer-events: none; }
      .item { opacity: 0; }
      .ig-chip { font-size: calc(min(var(--k, 1), 1.2) * 54px); }
      .ig-chip.cold { border-color: var(--cold); color: var(--cold); }
      .ig-big { font-size: calc(min(var(--k, 1), 1.25) * 130px); line-height: 1; white-space: nowrap; color: var(--ink); }
      .ig-note { font-size: calc(min(var(--k, 1), 1.2) * 42px); line-height: 1.1; color: var(--grey); white-space: nowrap; }
      .ig-big.orange, .ig-note.orange { color: var(--orange); } .ig-big.red, .ig-note.red { color: var(--red); }
      .ig-big.green, .ig-note.green { color: var(--green); } .ig-big.grey, .ig-note.grey { color: var(--grey); } .ig-big.cold, .ig-note.cold { color: var(--cold); }
      .stamp { border-width: 6px; letter-spacing: 2px; }
      svg, .ig-chip { filter: url(#boil); }
    </style>
  </head>
  <body>
    <div id="root" data-composition-id="main" data-start="0" data-duration="__DUR__" data-width="1920" data-height="1080">
      <section id="sc" class="clip" data-start="0" data-duration="__DUR__" data-track-index="1">
        <svg width="0" height="0" style="position:absolute"><defs>
          <filter id="boil" x="-10%" y="-10%" width="120%" height="120%"><feTurbulence id="boilTurb" type="fractalNoise" baseFrequency="0.012" numOctaves="1" seed="1" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="2.4"/></filter>
        </defs></svg>
        <div class="ig-frame" id="frame">
          <div class="ig-scenes" id="scenes"></div>
          <div class="ig-caps" id="caps"></div>
        </div>
      </section>
    </div>
    <script>
      window.__timelines = window.__timelines || {};
      if (document.fonts && document.fonts.load) { document.fonts.load("42px InkHand"); }
      var DATA = __DATA__;
      var tl = gsap.timeline({ paused: true }); window.__timelines["main"] = tl;
      FILM.init({ tl: tl, anchors: DATA.anchors, a: DATA.a, b: DATA.b, scenesEl: document.getElementById("scenes") });
      FILM.build(SCENES);
      FILM.captions(DATA.words, document.getElementById("caps"));
      InkTheater.boil(document.getElementById("boilTurb"), tl, { duration: FILM.dur, fps: 10 });
      window.__filmAudit = FILM.audit;
    </script>
  </body>
</html>

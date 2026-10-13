import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export type KineticStyle =
  | "word_pop"
  | "line_slide"
  | "highlight_sweep"
  | "stack_reveal"
  | "scale_punch";

interface KineticTextProps {
  text: string;
  kineticStyle?: KineticStyle;
  /** Word that receives the accent treatment (matched case/punctuation-insensitively). */
  emphasis?: string;
  color?: string;
  accentColor?: string;
  fontSize?: number;
  fontFamily?: string;
}

const norm = (w: string) =>
  w.toLowerCase().replace(/[^\p{L}\p{N}]/gu, "");

const autoSize = (text: string) =>
  text.length > 44 ? 72 : text.length > 30 ? 84 : text.length > 18 ? 96 : 112;

/** Greedy line wrap by character budget so lines stay balanced. */
const wrapWords = (words: string[], maxChars: number): string[][] => {
  const lines: string[][] = [];
  let cur: string[] = [];
  let len = 0;
  for (const w of words) {
    if (cur.length && len + w.length + 1 > maxChars) {
      lines.push(cur);
      cur = [];
      len = 0;
    }
    cur.push(w);
    len += w.length + 1;
  }
  if (cur.length) lines.push(cur);
  return lines;
};

export const KineticText: React.FC<KineticTextProps> = ({
  text,
  kineticStyle = "word_pop",
  emphasis,
  color = "#F5F7FA",
  accentColor = "#F5B942",
  fontSize,
  fontFamily = "Space Grotesk, Inter, system-ui, sans-serif",
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const size = fontSize ?? autoSize(text);
  const words = text.split(/\s+/).filter(Boolean);
  const emph = emphasis ? norm(emphasis) : "";
  const isEmph = (w: string) => emph !== "" && norm(w) === emph;

  // Fade out over the last 6 frames so hard cuts between scenes feel intentional
  const exit = interpolate(frame, [durationInFrames - 6, durationInFrames], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const wordColor = (w: string) => (isEmph(w) ? accentColor : color);

  const container: React.CSSProperties = {
    position: "absolute",
    left: "8%",
    right: "8%",
    top: "18%",
    height: "44%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    fontFamily,
    fontWeight: 800,
    fontSize: size,
    lineHeight: 1.12,
    letterSpacing: "-0.02em",
    color,
    opacity: exit,
  };

  // ---- word_pop: words spring in one by one -------------------------------
  if (kineticStyle === "word_pop") {
    return (
      <AbsoluteFill>
        <div style={{ ...container, flexDirection: "row", flexWrap: "wrap", gap: `0 ${size * 0.28}px`, alignContent: "center" }}>
          {words.map((w, i) => {
            const s = spring({ frame: frame - i * 4, fps, config: { damping: 12, stiffness: 160 } });
            return (
              <span
                key={i}
                style={{
                  display: "inline-block",
                  opacity: interpolate(s, [0, 0.4], [0, 1], { extrapolateRight: "clamp" }),
                  transform: `translateY(${interpolate(s, [0, 1], [36, 0])}px) scale(${interpolate(s, [0, 1], [0.6, 1])})`,
                  color: wordColor(w),
                }}
              >
                {w}
              </span>
            );
          })}
        </div>
      </AbsoluteFill>
    );
  }

  // ---- line_slide: lines slide in from alternating sides ------------------
  if (kineticStyle === "line_slide") {
    const lines = wrapWords(words, Math.max(12, Math.round(1900 / size) ));
    return (
      <AbsoluteFill>
        <div style={container}>
          {lines.map((line, li) => {
            const s = spring({ frame: frame - li * 7, fps, config: { damping: 18, stiffness: 110 } });
            const dir = li % 2 === 0 ? -1 : 1;
            return (
              <div
                key={li}
                style={{
                  opacity: s,
                  transform: `translateX(${interpolate(s, [0, 1], [dir * 220, 0])}px)`,
                  whiteSpace: "nowrap",
                }}
              >
                {line.map((w, wi) => (
                  <span key={wi} style={{ color: wordColor(w) }}>
                    {w}
                    {wi < line.length - 1 ? " " : ""}
                  </span>
                ))}
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    );
  }

  // ---- highlight_sweep: text fades in, accent bar sweeps behind emphasis --
  if (kineticStyle === "highlight_sweep") {
    const appear = spring({ frame, fps, config: { damping: 20, stiffness: 100 } });
    const sweep = interpolate(frame, [10, 28], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
    const lines = wrapWords(words, Math.max(12, Math.round(1900 / size)));
    return (
      <AbsoluteFill>
        <div style={{ ...container, opacity: exit * appear }}>
          {lines.map((line, li) => (
            <div key={li} style={{ whiteSpace: "nowrap" }}>
              {line.map((w, wi) => (
                <span
                  key={wi}
                  style={{
                    position: "relative",
                    display: "inline-block",
                    marginRight: wi < line.length - 1 ? size * 0.26 : 0,
                    color: isEmph(w) ? "#0B0F14" : color,
                  }}
                >
                  {isEmph(w) && (
                    <span
                      style={{
                        position: "absolute",
                        left: -10,
                        right: -10,
                        top: "8%",
                        bottom: "2%",
                        background: accentColor,
                        borderRadius: 10,
                        transformOrigin: "left center",
                        transform: `scaleX(${sweep})`,
                      }}
                    />
                  )}
                  <span style={{ position: "relative" }}>{w}</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </AbsoluteFill>
    );
  }

  // ---- stack_reveal: one word per line, masked rise ------------------------
  if (kineticStyle === "stack_reveal") {
    const stackWords = words.length > 5 ? wrapWords(words, 18).map((l) => l.join(" ")) : words;
    const stackSize = Math.min(size, Math.floor(430 / Math.max(stackWords.length, 1)));
    return (
      <AbsoluteFill>
        <div style={{ ...container, fontSize: Math.max(stackSize, 52) }}>
          {stackWords.map((w, i) => {
            const s = spring({ frame: frame - i * 6, fps, config: { damping: 16, stiffness: 140 } });
            return (
              <div key={i} style={{ overflow: "hidden", lineHeight: 1.08 }}>
                <div
                  style={{
                    transform: `translateY(${interpolate(s, [0, 1], [110, 0])}%)`,
                    color: w.split(" ").some(isEmph) ? accentColor : color,
                  }}
                >
                  {w}
                </div>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    );
  }

  // ---- scale_punch: big overshoot entrance, emphasis word punches harder ---
  const punch = spring({ frame, fps, config: { damping: 9, stiffness: 150, mass: 0.8 } });
  const lines = wrapWords(words, Math.max(12, Math.round(1900 / size)));
  return (
    <AbsoluteFill>
      <div
        style={{
          ...container,
          opacity: exit * interpolate(punch, [0, 0.3], [0, 1], { extrapolateRight: "clamp" }),
          transform: `scale(${interpolate(punch, [0, 1], [1.35, 1])})`,
        }}
      >
        {lines.map((line, li) => (
          <div key={li} style={{ whiteSpace: "nowrap" }}>
            {line.map((w, wi) => {
              const e = isEmph(w);
              const extra = e
                ? spring({ frame: frame - 8, fps, config: { damping: 8, stiffness: 180 } })
                : 0;
              return (
                <span
                  key={wi}
                  style={{
                    display: "inline-block",
                    marginRight: wi < line.length - 1 ? size * 0.26 : 0,
                    color: e ? accentColor : color,
                    transform: `scale(${1 + extra * 0.14})`,
                    textShadow: e ? `0 0 40px ${accentColor}66` : undefined,
                  }}
                >
                  {w}
                </span>
              );
            })}
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

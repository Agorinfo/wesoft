import type { ReactElement } from "react";

export type OgVariant = "home" | "contact" | "resources" | "legal" | "article" | "page";

const palettes: Record<OgVariant, { background: string; accent: string; glow: string; text: string }> = {
  home: { background: "linear-gradient(135deg, #003c7d 0%, #07589f 56%, #0ca4df 100%)", accent: "#8fd8ff", glow: "rgba(255,255,255,.16)", text: "#ffffff" },
  contact: { background: "linear-gradient(135deg, #00366f 0%, #0068b4 58%, #42b8e9 100%)", accent: "#c6efff", glow: "rgba(255,255,255,.18)", text: "#ffffff" },
  resources: { background: "linear-gradient(135deg, #eef7ff 0%, #d8ecff 100%)", accent: "#07589f", glow: "rgba(7,88,159,.12)", text: "#003c7d" },
  legal: { background: "linear-gradient(135deg, #f2f6fa 0%, #dce9f6 100%)", accent: "#004288", glow: "rgba(0,66,136,.1)", text: "#003c7d" },
  article: { background: "linear-gradient(135deg, #004288 0%, #07589f 64%, #eaf7ff 64%, #eaf7ff 100%)", accent: "#9bdcff", glow: "rgba(255,255,255,.16)", text: "#ffffff" },
  page: { background: "linear-gradient(135deg, #f4f5ff 0%, #e4efff 100%)", accent: "#004288", glow: "rgba(0,66,136,.1)", text: "#003c7d" },
};

function clampTitle(value: string) {
  return value.length > 96 ? `${value.slice(0, 93).trimEnd()}…` : value;
}

export function OgImageCard({ title, eyebrow, variant = "page" }: { title: string; eyebrow?: string; variant?: OgVariant }): ReactElement {
  const palette = palettes[variant];
  const lightText = variant === "home" || variant === "contact" || variant === "article";

  return <div style={{
    width: "100%", height: "100%", display: "flex", position: "relative", overflow: "hidden",
    padding: "72px 82px", boxSizing: "border-box", background: palette.background, color: palette.text,
    fontFamily: "Arial, sans-serif",
  }}>
    <div style={{ position: "absolute", right: "-88px", top: "-78px", width: "420px", height: "420px", borderRadius: "999px", background: palette.glow }} />
    <div style={{ position: "absolute", right: "104px", bottom: "-165px", width: "390px", height: "390px", border: `38px solid ${palette.accent}`, borderRadius: "999px", opacity: lightText ? 0.26 : 0.44 }} />
    <div style={{ position: "absolute", right: "93px", top: "148px", width: "112px", height: "112px", border: `10px solid ${palette.accent}`, opacity: lightText ? 0.36 : 0.55 }} />
    <div style={{ position: "absolute", left: "0", bottom: "0", width: "100%", height: "9px", background: palette.accent, opacity: 0.85 }} />
    <div style={{ position: "relative", display: "flex", flexDirection: "column", width: "760px", justifyContent: "space-between" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "16px", fontSize: "26px", fontWeight: 700, letterSpacing: "0.12em" }}>
        <div style={{ display: "flex", width: "20px", height: "20px", background: palette.accent, borderRadius: "4px" }} />
        WESOFT
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {eyebrow && <div style={{ display: "flex", marginBottom: "22px", color: lightText ? "#d8f1ff" : palette.accent, fontSize: "22px", fontWeight: 700, letterSpacing: "0.1em" }}>{eyebrow.toUpperCase()}</div>}
        <div style={{ display: "flex", fontSize: "62px", lineHeight: 1.12, fontWeight: 700, letterSpacing: "-0.035em" }}>{clampTitle(title)}</div>
      </div>
      <div style={{ display: "flex", marginTop: "32px", fontSize: "23px", color: lightText ? "#d8f1ff" : "#35688e" }}>Éditeurs de logiciels verticaux</div>
    </div>
  </div>;
}

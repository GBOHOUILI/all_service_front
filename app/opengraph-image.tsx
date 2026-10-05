import { ImageResponse } from "next/og";
import { BRAND } from "@/lib/brand";

export const alt = `${BRAND.name} | ${BRAND.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 90px",
          background: "radial-gradient(circle at 78% 35%, #4a3a35 0%, #142219 55%)",
          color: "#f7f4ec",
        }}
      >
        <div style={{ fontSize: 22, letterSpacing: 8, textTransform: "uppercase", color: "#b8935a", marginBottom: 28 }}>
          {`${BRAND.tagline} · ${BRAND.city}`}
        </div>
        <div style={{ fontSize: 96, fontWeight: 700, letterSpacing: -3, lineHeight: 1 }}>{BRAND.name}</div>
        <div style={{ width: 140, height: 2, background: "#b8935a", margin: "36px 0" }} />
        <div style={{ fontSize: 38, color: "#e3b9ac", maxWidth: 820, lineHeight: 1.25 }}>
          Des compositions florales élégantes, pensées pour durer.
        </div>
      </div>
    ),
    size
  );
}

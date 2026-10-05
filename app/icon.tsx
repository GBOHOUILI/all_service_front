import { ImageResponse } from "next/og";
import { BRAND } from "@/lib/brand";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

// Generated from BRAND so the favicon follows a rename until a real logo exists.
export default function Icon() {
  const initials = BRAND.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#1e3328",
          color: "#f7f4ec",
          borderRadius: 16,
          fontSize: 30,
          fontWeight: 700,
          letterSpacing: -1,
        }}
      >
        {initials}
      </div>
    ),
    size
  );
}

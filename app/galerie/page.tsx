import Image from "next/image";
import { GALLERY_ITEMS } from "@/lib/data";

export default function GaleriePage() {
  return (
    <section className="section">
      <div className="wrap">
        <span className="eyebrow center" style={{ display: "block" }}>Notre univers</span>
        <h1 className="center" style={{ fontSize: 36, margin: "10px 0 30px" }}>Galerie</h1>
        <div className="cols-4" style={{ gap: 20 }}>
          {GALLERY_ITEMS.map((item, i) => (
            <div
              key={i}
              style={{
                position: "relative",
                borderRadius: 16,
                overflow: "hidden",
                border: "1px solid var(--line)",
                aspectRatio: "4/5",
                background: item.accent, // reste comme fallback pendant le chargement
              }}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="25vw"
                style={{ objectFit: "cover" }}
              />
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  bottom: 0,
                  padding: 14,
                  background: "linear-gradient(0deg, rgba(15,25,18,0.75), transparent)",
                  color: "#fff",
                  zIndex: 1,
                }}
              >
                <b style={{ display: "block", fontFamily: "var(--font-display)", fontSize: 14 }}>
                  {item.title}
                </b>
                <span style={{ fontSize: 11, opacity: 0.85 }}>{item.caption}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

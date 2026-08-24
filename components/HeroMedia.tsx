import Image from "next/image";

export default function HeroMedia({
  image = "/images/hero/hero-fleurs.jpg",
}: {
  image?: string;
}) {
  return (
    <div className="hero-media-bg">
      <div className="hero-kenburns" style={{ position: "absolute", inset: 0 }}>
        <Image src={image} alt="" fill priority sizes="100vw" style={{ objectFit: "cover" }} />
      </div>
      <div className="hero-media-overlay" />
    </div>
  );
}

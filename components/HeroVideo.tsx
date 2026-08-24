"use client";
export default function HeroVideo() {
  return (
    <div className="hero-media-bg">
      <video
        className="hero-video"
        autoPlay
        muted
        loop
        playsInline
        poster="/images/hero/hero-poster.jpg"
      >
        <source src="/videos/hero-fleurs.mp4" type="video/mp4" />
      </video>
      <div className="hero-media-overlay" />
    </div>
  );
}

"use client";

import { useEffect, useRef } from "react";

type Particle = {
  angle: number;
  radius: number;
  size: number;
  speed: number;
  twinklePhase: number;
  twinkleSpeed: number;
};

export default function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let center = { x: 0, y: 0 };
    let rotation = 0;
    let frameId = 0;

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Centre du tourbillon : décalé à droite, comme sur la référence.
      center = { x: width * 0.62, y: height * 0.42 };

      // Densité proportionnelle à la surface, plafonnée pour rester fluide.
      const count = Math.min(220, Math.round((width * height) / 9000));
      const goldenAngle = 2.399963; // répartition en spirale dorée

      particles = Array.from({ length: count }).map((_, i) => ({
        angle: i * goldenAngle,
        radius: Math.sqrt(i / count) * Math.max(width, height) * 0.62,
        size: Math.random() * 1.8 + 0.4,
        speed: (Math.random() * 0.06 + 0.02) * (Math.random() < 0.5 ? -1 : 1),
        twinklePhase: Math.random() * Math.PI * 2,
        twinkleSpeed: Math.random() * 0.02 + 0.01,
      }));
    }

    function draw(time: number) {
      ctx!.clearRect(0, 0, width, height);

      for (const p of particles) {
        const a = p.angle + rotation * p.speed;
        const x = center.x + Math.cos(a) * p.radius;
        const y = center.y + Math.sin(a) * p.radius * 0.72; // aplati en ellipse
        if (x < -20 || x > width + 20 || y < -20 || y > height + 20) continue;

        const twinkle = 0.35 + Math.sin(time * p.twinkleSpeed + p.twinklePhase) * 0.35;
        ctx!.beginPath();
        ctx!.arc(x, y, p.size, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(247, 244, 236, ${Math.max(0.08, twinkle)})`;
        ctx!.fill();
      }

      rotation += 0.0016;
      frameId = requestAnimationFrame(draw);
    }

    resize();
    frameId = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-particles-canvas" />;
}

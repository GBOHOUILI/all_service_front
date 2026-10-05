"use client";

import { useEffect, useRef } from "react";

type Petal = {
  x: number;
  y: number;
  size: number;
  vx: number;
  vy: number;
  fall: number;
  rot: number;
  rotSpeed: number;
  tumble: number;
  tumbleSpeed: number;
  sway: number;
  color: string;
  alpha: number;
};

// Petal colors come from the CSS tokens so a rebrand only touches globals.css.
const COLOR_TOKENS = ["--blush", "--blush", "--ivory", "--brass", "--sage"];
const REPEL_RADIUS = 130;

export default function PetalsCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const styles = getComputedStyle(document.documentElement);
    const palette = COLOR_TOKENS.map((t) => styles.getPropertyValue(t).trim() || "#e3b9ac");

    let width = 0;
    let height = 0;
    let petals: Petal[] = [];
    let frameId = 0;
    let running = false;
    const pointer = { x: -9999, y: -9999 };

    function spawn(p: Partial<Petal> = {}): Petal {
      const size = Math.random() * 7 + 5;
      return {
        x: Math.random() * width,
        // First wave starts above the viewport so petals rain in after the intro.
        y: -Math.random() * height - 20,
        size,
        vx: 0,
        vy: 0,
        fall: Math.random() * 0.5 + 0.35 + size * 0.02,
        rot: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.03,
        tumble: Math.random() * Math.PI * 2,
        tumbleSpeed: Math.random() * 0.04 + 0.015,
        sway: Math.random() * Math.PI * 2,
        color: palette[Math.floor(Math.random() * palette.length)],
        alpha: Math.random() * 0.35 + 0.55,
        ...p,
      };
    }

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.round(Math.min(80, Math.max(22, width / 18)));
      if (petals.length === 0) petals = Array.from({ length: count }, () => spawn());
      else if (petals.length > count) petals.length = count;
      else while (petals.length < count) petals.push(spawn());
    }

    function drawPetal(p: Petal) {
      const s = p.size;
      ctx!.save();
      ctx!.translate(p.x, p.y);
      ctx!.rotate(p.rot);
      // Squashing one axis fakes a petal tumbling in 3D.
      ctx!.scale(1, Math.cos(p.tumble) * 0.75 + 0.25);
      ctx!.globalAlpha = p.alpha;
      ctx!.fillStyle = p.color;
      ctx!.beginPath();
      ctx!.moveTo(0, -s);
      ctx!.bezierCurveTo(s * 0.95, -s * 0.55, s * 0.6, s * 0.75, 0, s);
      ctx!.bezierCurveTo(-s * 0.6, s * 0.75, -s * 0.95, -s * 0.55, 0, -s);
      ctx!.fill();
      ctx!.globalAlpha = p.alpha * 0.35;
      ctx!.strokeStyle = "#ffffff";
      ctx!.lineWidth = 0.6;
      ctx!.beginPath();
      ctx!.moveTo(0, -s * 0.7);
      ctx!.quadraticCurveTo(s * 0.12, 0, 0, s * 0.7);
      ctx!.stroke();
      ctx!.restore();
    }

    function tick() {
      ctx!.clearRect(0, 0, width, height);

      for (const p of petals) {
        const dx = p.x - pointer.x;
        const dy = p.y - pointer.y;
        const dist = Math.hypot(dx, dy);
        if (dist < REPEL_RADIUS && dist > 0.1) {
          const force = (1 - dist / REPEL_RADIUS) * 1.4;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
          p.rotSpeed += (Math.random() - 0.5) * 0.01;
        }
        p.vx *= 0.93;
        p.vy *= 0.93;
        p.sway += 0.012;
        p.x += p.vx + Math.sin(p.sway) * 0.6;
        p.y += p.vy + p.fall;
        p.rot += p.rotSpeed;
        p.tumble += p.tumbleSpeed;

        if (p.y > height + 20 || p.x < -40 || p.x > width + 40) {
          Object.assign(p, spawn({ y: -20 - Math.random() * 60 }));
        }
        drawPetal(p);
      }

      frameId = requestAnimationFrame(tick);
    }

    function start() {
      if (running) return;
      running = true;
      frameId = requestAnimationFrame(tick);
    }

    function stop() {
      running = false;
      cancelAnimationFrame(frameId);
    }

    function onPointerMove(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
    }

    function onPointerLeave() {
      pointer.x = -9999;
      pointer.y = -9999;
    }

    // No point burning frames once the hero is scrolled away.
    const observer = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()));

    resize();
    observer.observe(canvas);
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onPointerLeave);

    return () => {
      stop();
      observer.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-petals" aria-hidden="true" />;
}

"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

// Elements that turn the ring into a "Voir" bubble.
const VIEW_TARGETS = ".cat-card, .p-media, .blog-teaser-grid .card, .collage-item";
const RING_IDLE = 0.32;

export default function Cursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return;

    const mm = gsap.matchMedia();
    mm.add("(pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      const root = document.documentElement;
      root.classList.add("has-cursor");
      gsap.set([ring, dot], { xPercent: -50, yPercent: -50, autoAlpha: 0 });
      // The ring is drawn at its largest size and scaled down, so the label stays crisp.
      gsap.set(ring, { scale: RING_IDLE });

      const ringX = gsap.quickTo(ring, "x", { duration: 0.55, ease: "power3.out" });
      const ringY = gsap.quickTo(ring, "y", { duration: 0.55, ease: "power3.out" });
      const dotX = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power3.out" });
      const dotY = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power3.out" });
      let mode = "";
      let visible = false;
      const last = { x: -1, y: -1 };

      const setMode = (next: string) => {
        if (next === mode) return;
        mode = next;
        ring.classList.toggle("is-view", next === "view");
        gsap.to(ring, { scale: next === "view" ? 1 : next === "link" ? 0.6 : RING_IDLE, duration: 0.45, ease: "power3.out" });
        gsap.to(dot, { scale: next ? 0 : 1, duration: 0.3 });
      };

      const onMove = (e: PointerEvent) => {
        if (!visible) {
          visible = true;
          gsap.to([ring, dot], { autoAlpha: 1, duration: 0.3 });
        }
        ringX(e.clientX);
        ringY(e.clientY);
        dotX(e.clientX);
        dotY(e.clientY);
        last.x = e.clientX;
        last.y = e.clientY;
        refreshMode();
      };
      // Scrolling moves content under a still pointer, so the hovered element is re-read.
      const refreshMode = () => {
        const target = document.elementFromPoint(last.x, last.y);
        setMode(target?.closest(VIEW_TARGETS) ? "view" : target?.closest("a, button, input") ? "link" : "");
      };
      const onLeave = () => {
        visible = false;
        gsap.to([ring, dot], { autoAlpha: 0, duration: 0.3 });
      };

      // Magnetic buttons: they lean toward the pointer, then spring back.
      const magnets = gsap.utils.toArray<HTMLElement>("main .btn").map((el) => {
        const x = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
        const y = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });
        const move = (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          x((e.clientX - (r.left + r.width / 2)) * 0.35);
          y((e.clientY - (r.top + r.height / 2)) * 0.45);
        };
        const leave = () => {
          x(0);
          y(0);
        };
        el.addEventListener("pointermove", move);
        el.addEventListener("pointerleave", leave);
        return () => {
          el.removeEventListener("pointermove", move);
          el.removeEventListener("pointerleave", leave);
          gsap.set(el, { clearProps: "transform" });
        };
      });

      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("scroll", refreshMode, { passive: true });
      root.addEventListener("pointerleave", onLeave);
      return () => {
        root.classList.remove("has-cursor");
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("scroll", refreshMode);
        root.removeEventListener("pointerleave", onLeave);
        magnets.forEach((off) => off());
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden="true">
        <span>Voir</span>
      </div>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>
  );
}

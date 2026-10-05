"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

// Scroll choreography for the home sections below the hero. Markup opts in
// through data attributes so page.tsx stays a server component:
//   data-reveal          fade + rise when entering the viewport
//   data-reveal-group    same, staggered on direct children
//   data-count="500"     counter (+ data-prefix, data-suffix, data-decimals)
//   data-split           heading revealed line by line
//   data-marquee="1|-1"  infinite row whose speed and skew follow scroll velocity
export default function HomeReveals({ children }: { children: React.ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const q = gsap.utils.selector(root);
    const mm = gsap.matchMedia();

    // Desktop: categories become a pinned horizontal gallery.
    mm.add(
      "(prefers-reduced-motion: no-preference) and (min-width: 900px)",
      () => {
        const section = q(".cat-section")[0];
        const grid = section?.querySelector<HTMLElement>(".cat-grid");
        if (!section || !grid) return;
        section.classList.add("cat-horizontal");

        const distance = () => grid.scrollWidth - (window.innerWidth - grid.getBoundingClientRect().left) + 80;
        const slide = gsap.to(grid, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        gsap.utils.toArray<HTMLElement>(grid.children).forEach((card) => {
          gsap.from(card, {
            yPercent: 18,
            rotation: 5,
            autoAlpha: 0.2,
            ease: "none",
            scrollTrigger: { trigger: card, containerAnimation: slide, start: "left 100%", end: "left 55%", scrub: true },
          });
          const img = card.querySelector("img");
          if (img) {
            gsap.fromTo(
              img,
              // Stays within the 12% overhang the CSS gives the image on each side.
              { xPercent: -8 },
              {
                xPercent: 8,
                ease: "none",
                scrollTrigger: { trigger: card, containerAnimation: slide, start: "left right", end: "right left", scrub: true },
              }
            );
          }
        });

        return () => section.classList.remove("cat-horizontal");
      },
      root
    );

    // Mobile: categories unveil like a curtain while the photo settles.
    mm.add(
      "(prefers-reduced-motion: no-preference) and (max-width: 899px)",
      () => {
        const cats = q(".cat-card");
        if (!cats.length) return;
        const tl = gsap.timeline({ scrollTrigger: { trigger: cats[0], start: "top 85%", once: true } });
        tl.fromTo(
          cats,
          { clipPath: "inset(100% 0% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.3, ease: "expo.inOut", stagger: 0.12 }
        )
          .from(cats.map((c) => c.querySelector("img")), { scale: 1.35, duration: 1.8, ease: "expo.out", stagger: 0.12 }, 0.3)
          .from(cats.map((c) => c.querySelector(".cat-card-overlay > *")), { autoAlpha: 0, y: 20, duration: 0.8, stagger: 0.12 }, 0.8);
      },
      root
    );

    mm.add(
      "(prefers-reduced-motion: no-preference)",
      () => {
        q("[data-split]").forEach((el) => {
          SplitText.create(el, {
            type: "lines",
            mask: "lines",
            autoSplit: true,
            // Returning the tween lets SplitText kill and rebuild it when fonts or width change.
            onSplit: (self) =>
              gsap.from(self.lines, {
                yPercent: 110,
                duration: 1.2,
                ease: "expo.out",
                stagger: 0.12,
                scrollTrigger: { trigger: el, start: "top 88%", once: true },
              }),
          });
        });

        let settle: ReturnType<typeof setTimeout> | undefined;
        const band = q(".marquee-band")[0];
        if (band) {
          const rows = q("[data-marquee]").map((row) => {
            const dir = Number(row.dataset.marquee) || 1;
            const loop = gsap.to(row.querySelector(".marquee-track"), { xPercent: -50, duration: 38, ease: "none", repeat: -1 });
            if (dir < 0) loop.timeScale(-1);
            // Start deep into the loop so a negative timeScale never hits time 0 and stalls.
            loop.totalTime(loop.duration() * 200);
            return { dir, loop, skew: gsap.quickTo(row, "skewX", { duration: 0.6, ease: "power3.out" }) };
          });
          ScrollTrigger.create({
            trigger: band,
            start: "top bottom",
            end: "bottom top",
            onUpdate: (self) => {
              const v = self.getVelocity();
              const boost = 1 + Math.min(Math.abs(v) / 300, 7);
              rows.forEach((r) => {
                gsap.to(r.loop, { timeScale: r.dir * self.direction * boost, duration: 0.25, overwrite: true });
                r.skew(gsap.utils.clamp(-14, 14, -v / 140));
              });
              clearTimeout(settle);
              settle = setTimeout(() => {
                rows.forEach((r) => {
                  gsap.to(r.loop, { timeScale: r.dir * self.direction, duration: 1.2, overwrite: true });
                  r.skew(0);
                });
              }, 140);
            },
          });
        }

        q("[data-reveal]").forEach((el) => {
          gsap.from(el, {
            autoAlpha: 0,
            y: 50,
            duration: 1.1,
            ease: "expo.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          });
        });

        // Testimonials is shared with other pages, so it is targeted by class here.
        q("[data-reveal-group], .testimonial-grid").forEach((group) => {
          gsap.from(group.children, {
            autoAlpha: 0,
            y: 60,
            duration: 1.1,
            ease: "expo.out",
            stagger: 0.12,
            scrollTrigger: { trigger: group, start: "top 85%", once: true },
          });
        });

        // Process: the line draws itself with the scroll, each step lights up as it passes.
        const track = q(".steps-track")[0];
        if (track) {
          gsap.fromTo(
            q(".steps-line-fill"),
            { scaleX: 0 },
            { scaleX: 1, ease: "none", scrollTrigger: { trigger: track, start: "top 75%", end: "bottom 55%", scrub: 0.5 } }
          );
          q(".step-card").forEach((card, i) => {
            gsap
              .timeline({ scrollTrigger: { trigger: track, start: `top+=${i * 40} 75%`, once: true } })
              .from(card.querySelector(".step-num"), { scale: 0, rotation: -90, duration: 0.9, ease: "back.out(2)", delay: i * 0.18 })
              .from(card.querySelectorAll("h3, p"), { autoAlpha: 0, y: 16, duration: 0.7, stagger: 0.08, ease: "power3.out" }, "-=0.5");
          });
        }

        q("[data-count]").forEach((el) => {
          const target = parseFloat(el.dataset.count ?? "0");
          const decimals = parseInt(el.dataset.decimals ?? "0", 10);
          const format = (v: number) => `${el.dataset.prefix ?? ""}${v.toFixed(decimals)}${el.dataset.suffix ?? ""}`;
          const counter = { v: 0 };
          el.textContent = format(0);
          gsap.to(counter, {
            v: target,
            duration: 2.2,
            ease: "power3.out",
            onUpdate: () => {
              el.textContent = format(counter.v);
            },
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
          });
        });

        // Next/Image can shift layout after load; recompute trigger positions once settled.
        const refresh = () => ScrollTrigger.refresh();
        window.addEventListener("load", refresh);
        return () => {
          clearTimeout(settle);
          window.removeEventListener("load", refresh);
        };
      },
      root
    );

    return () => mm.revert();
  }, []);

  return <div ref={rootRef}>{children}</div>;
}

"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BRAND } from "@/lib/brand";
import PetalsCanvas from "./PetalsCanvas";

gsap.registerPlugin(ScrollTrigger);

const INTRO_KEY = "as-intro-seen";

const TITLE: { text: string; accent?: boolean }[] = [
  { text: "Des" },
  { text: "compositions" },
  { text: "florales", accent: true },
  { text: "élégantes,", accent: true },
  { text: "pensées" },
  { text: "pour" },
  { text: "durer." },
];

// Parallax depth per collage photo: higher = moves more, feels closer.
const DEPTHS = [1, 1.6, 2, 1.3, 2.4];
// Where each collage photo flies when the hero is dived through (unit vectors + spin).
const FLY_OUT = [
  { x: 0, y: -0.6, r: -6 },
  { x: -1, y: 0.8, r: -18 },
  { x: 1, y: -0.8, r: 16 },
  { x: 1, y: 0.8, r: 14 },
  { x: -1, y: -0.8, r: -14 },
];
const STATEMENT = "Chaque fleur est choisie une à une, pour vous.";

export default function HeroMotion({ avg }: { avg: string }) {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const q = gsap.utils.selector(root);
    const intro = q(".hero-intro")[0] as HTMLElement | undefined;
    // JS is alive: GSAP now owns visibility, the CSS failsafe reveal is disabled.
    root.classList.add("motion-on");

    const mm = gsap.matchMedia();

    mm.add(
      "(prefers-reduced-motion: reduce)",
      () => {
        gsap.set(intro ?? [], { display: "none" });
        gsap.set(q("[data-h], .word, .collage-item"), { autoAlpha: 1 });
        gsap.set(q(".collage-ring circle"), { strokeDashoffset: 0 });
      },
      root
    );

    mm.add(
      "(prefers-reduced-motion: no-preference)",
      () => {
        let seen = false;
        try {
          seen = sessionStorage.getItem(INTRO_KEY) === "1";
          sessionStorage.setItem(INTRO_KEY, "1");
        } catch {}

        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

        if (intro && !seen) {
          document.documentElement.style.overflow = "hidden";
          tl.set(".intro-inner", { autoAlpha: 1 })
            .from(".intro-letter", { yPercent: 110, duration: 1, stagger: 0.045 })
            .from(".intro-rule", { scaleX: 0, duration: 0.9, ease: "power3.inOut" }, "-=0.6")
            .from(".intro-tagline", { autoAlpha: 0, y: 12, duration: 0.6 }, "-=0.5")
            .to(".intro-inner", { yPercent: -40, autoAlpha: 0, duration: 0.8, ease: "power3.in" }, "+=0.35")
            .to(intro, { clipPath: "inset(0% 0% 100% 0%)", duration: 1.1, ease: "expo.inOut" }, "-=0.45")
            .add(() => {
              document.documentElement.style.overflow = "";
              gsap.set(intro, { display: "none" });
            })
            // Hero entrance starts while the curtain is still lifting.
            .addLabel("hero", "-=0.7");
        } else {
          gsap.set(intro ?? [], { display: "none" });
          tl.addLabel("hero", 0.1);
        }

        tl.fromTo(
          ".collage-item",
          { autoAlpha: 0, y: 140, scale: 0.7, rotation: (i: number) => (i % 2 ? 8 : -8) },
          { autoAlpha: 1, y: 0, scale: 1, rotation: 0, duration: 1.6, stagger: 0.09 },
          "hero"
        )
          .from(".collage-inner", { scale: 1.45, duration: 2, stagger: 0.09 }, "hero")
          .to(".collage-ring circle", { strokeDashoffset: 0, duration: 2.4, ease: "power2.inOut" }, "hero+=0.2")
          .fromTo(".word", { autoAlpha: 1, yPercent: 115 }, { yPercent: 0, duration: 1.2, stagger: 0.07 }, "hero+=0.15")
          .fromTo("[data-h]", { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 1, stagger: 0.1 }, "hero+=0.65");

        return () => {
          document.documentElement.style.overflow = "";
        };
      },
      root
    );

    // Desktop: the hero pins and the visitor "dives" through it. The copy
    // leaves, the photos fly out and a portal opens on a full-bleed image.
    mm.add(
      "(prefers-reduced-motion: no-preference) and (min-width: 900px)",
      () => {
        const pin = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: root, start: "top top", end: "+=180%", pin: true, scrub: 1, anticipatePin: 1 },
        });
        pin
          .to(".hero-copy", { y: -90, autoAlpha: 0, duration: 0.3, ease: "power2.in" }, 0)
          .to(".hero-scroll-hint", { autoAlpha: 0, duration: 0.1 }, 0)
          .to(".collage-ring", { scale: 2.8, rotation: 160, autoAlpha: 0, duration: 0.5, ease: "power2.in" }, 0);
        q(".collage-scroll").forEach((el, i) => {
          const f = FLY_OUT[i] ?? FLY_OUT[0];
          pin.to(
            el,
            { xPercent: f.x * 180, yPercent: f.y * 180, rotation: f.r, scale: 1.35, autoAlpha: 0, duration: 0.45, ease: "power2.in" },
            0.04 + i * 0.03
          );
        });
        pin
          .fromTo(
            ".hero-portal",
            { clipPath: "inset(50% 50% 50% 50% round 40px)" },
            { clipPath: "inset(0% 0% 0% 0% round 0px)", duration: 0.6, ease: "power3.inOut" },
            0.18
          )
          .fromTo(".hero-portal-img", { scale: 1.7 }, { scale: 1, duration: 0.8, ease: "power2.out" }, 0.18)
          .from(".portal-eyebrow", { autoAlpha: 0, y: 24, duration: 0.2 }, 0.62)
          .from(".portal-word", { yPercent: 115, duration: 0.3, stagger: 0.035, ease: "power3.out" }, 0.66)
          // Short hold so the statement can be read before the pin releases.
          .to({}, { duration: 0.25 });
      },
      root
    );

    // Mobile: no pin, the copy drifts up while the collage bursts outward.
    mm.add(
      "(prefers-reduced-motion: no-preference) and (max-width: 899px)",
      () => {
        const scrub = { trigger: root, start: "top top", end: "bottom top", scrub: 0.6 };
        gsap.to(".hero-copy", { y: -110, autoAlpha: 0.15, ease: "none", scrollTrigger: scrub });
        q(".collage-scroll").forEach((el, i) => {
          const d = DEPTHS[i] ?? 1;
          gsap.to(el, { y: -d * 130, x: (i % 2 ? 1 : -1) * d * 40, scale: 1 + d * 0.09, ease: "none", scrollTrigger: scrub });
        });
        gsap.to(".collage-ring", { rotation: 120, ease: "none", scrollTrigger: scrub });
      },
      root
    );

    // Mouse parallax only where there is a real pointer.
    mm.add(
      "(prefers-reduced-motion: no-preference) and (pointer: fine)",
      () => {
        const movers = q(".collage-parallax").map((el, i) => ({
          d: DEPTHS[i] ?? 1,
          x: gsap.quickTo(el, "x", { duration: 1.2, ease: "power3.out" }),
          y: gsap.quickTo(el, "y", { duration: 1.2, ease: "power3.out" }),
        }));
        const copyX = gsap.quickTo(q(".hero-title"), "x", { duration: 1.4, ease: "power3.out" });

        const onMove = (e: PointerEvent) => {
          const nx = (e.clientX / window.innerWidth) * 2 - 1;
          const ny = (e.clientY / window.innerHeight) * 2 - 1;
          movers.forEach((m) => {
            m.x(nx * m.d * 18);
            m.y(ny * m.d * 14);
          });
          copyX(nx * -8);
        };
        window.addEventListener("pointermove", onMove, { passive: true });
        return () => window.removeEventListener("pointermove", onMove);
      },
      root
    );

    return () => mm.revert();
  }, []);

  return (
    <section ref={rootRef} className="hero-motion">
      <div className="hero-glow" aria-hidden="true" />

      <div className="wrap hero-grid">
        <div className="hero-copy">
          <span className="eyebrow hero-eyebrow" data-h>
            {BRAND.tagline} · {BRAND.city}
          </span>
          <h1 className="hero-title">
            {TITLE.map((w, i) => (
              <span key={i}>
                <span className="word-mask">
                  <span className={w.accent ? "word word-accent" : "word"}>{w.text}</span>
                </span>{" "}
              </span>
            ))}
          </h1>
          <p className="hero-lede" data-h>
            Chaque bouquet est assemblé à la main dans notre atelier de {BRAND.city}, à partir de fleurs de saison choisies une
            à une, pour célébrer vos instants les plus précieux.
          </p>
          <div className="hero-ctas" data-h>
            <Link href="/boutique" className="btn btn-light">Découvrir la boutique</Link>
            <Link href="/sur-mesure" className="btn btn-outline-light">Composer sur-mesure</Link>
          </div>
          <div className="hero-badges" data-h>
            <span className="hero-badge"><b>{avg}/5</b> note moyenne</span>
            <span className="hero-badge"><b>+500</b> commandes livrées</span>
            <span className="hero-badge"><b>100%</b> fait main</span>
          </div>
        </div>

        <div className="hero-collage" aria-hidden="true">
          <svg className="collage-ring" viewBox="0 0 420 420">
            <circle cx="210" cy="210" r="200" pathLength={1300} strokeDasharray="1300" />
          </svg>
          {BRAND.heroImages.slice(0, 5).map((src, i) => (
            <div key={src} className={`collage-item collage-item-${i}`}>
              <div className="collage-scroll">
                <div className="collage-parallax">
                  <div className="collage-frame">
                    <div className="collage-inner">
                      <Image src={src} alt="" fill priority={i < 2} sizes="(max-width: 900px) 50vw, 30vw" style={{ objectFit: "cover" }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="hero-portal" aria-hidden="true">
        <div className="hero-portal-img">
          <Image src={BRAND.heroImages[0]} alt="" fill sizes="100vw" style={{ objectFit: "cover" }} />
        </div>
        <div className="hero-portal-shade" />
        <div className="wrap hero-portal-copy">
          <span className="eyebrow portal-eyebrow">L&apos;atelier · {BRAND.city}</span>
          <p className="portal-statement">
            {STATEMENT.split(" ").map((w, i) => (
              <span key={i}>
                <span className="word-mask">
                  <span className="portal-word">{w}</span>
                </span>{" "}
              </span>
            ))}
          </p>
        </div>
      </div>

      <PetalsCanvas />

      <div className="hero-scroll-hint" data-h>
        <span>Défiler</span>
        <i />
      </div>

      <div className="hero-intro">
        <div className="intro-inner">
          <div className="intro-name">
            {BRAND.name.split("").map((c, i) => (
              <span key={i} className="intro-letter-mask">
                <span className="intro-letter">{c === " " ? " " : c}</span>
              </span>
            ))}
          </div>
          <span className="intro-rule" />
          <span className="intro-tagline">{BRAND.tagline}</span>
        </div>
      </div>
    </section>
  );
}

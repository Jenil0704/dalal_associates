"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

/* ─── Card Data ──────────────────────────────────────────── */
const CARDS = [
  { src: "/plywood.jpg", alt: "Premium Plywood", rotation: -15 },
  { src: "/laminates.jpg", alt: "Laminates & Surfaces", rotation: 8 },
  { src: "/veneer.jpg", alt: "Natural Veneers", rotation: -5 },
  { src: "/construction.jpg", alt: "Construction Materials", rotation: 20, dark: true },
  { src: "/plywood_2.jpg", alt: "Plywood Collection", rotation: -10 },
  { src: "/laminates_2.jpg", alt: "Laminate Textures", rotation: 3, accent: true },
];

const SUBTITLES = ["PREMIUM PLYWOOD", "LUXURY LAMINATES", "NATURAL VENEERS", "EXOTIC WOODS"];

/* ─── Component ──────────────────────────────────────────── */
export default function HeroGsap() {
  const containerRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const bodyTextRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [animationDone, setAnimationDone] = useState(false);

  /* Lock scroll during animation */
  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, []);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        onComplete: () => {
          document.documentElement.style.overflow = "";
          document.body.style.overflow = "";
          cardRefs.current.forEach((card) => {
            if (!card) return;
            // Clear GSAP's inline transform so CSS :hover can take over
            gsap.set(card, { clearProps: "transform,zIndex" });
            card.classList.add("hero-card-interactive");
          });
          // Wake Lenis back up after the overflow lock is removed
          window.dispatchEvent(new Event("resize"));
          setAnimationDone(true);
        },
      });

      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;

      /* ──────────────────────────────────────────────────────
       *  PHASE 1 — Initial State
       * ────────────────────────────────────────────────────── */
      // Fade the wrapper in gently so the stacked cards appear softly
      gsap.set(wrapperRef.current, { opacity: 0 });
      tl.to(wrapperRef.current, { opacity: 1, duration: 0.25, ease: "power1.out" }, 0);

      // Cards: move to center, rotated, scaled down
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const cardCx = rect.left + rect.width / 2;
        const cardCy = rect.top + rect.height / 2;

        gsap.set(card, {
          x: cx - cardCx,
          y: cy - cardCy - 60,
          rotation: CARDS[i].rotation,
          scale: 0.7,
          opacity: 1,
          zIndex: CARDS.length - i,
        });
      });

      // Headline hidden below clip mask
      if (headlineRef.current) {
        gsap.set(headlineRef.current, { yPercent: 120, scale: 0.85, opacity: 0 });
      }

      // Subtitles hidden
      subtitleRefs.current.forEach((el) => {
        if (el) gsap.set(el, { y: 20, opacity: 0 });
      });

      // Body text hidden
      if (bodyTextRef.current) gsap.set(bodyTextRef.current, { opacity: 0, y: 10 });

      // CTA hidden and scaled
      if (ctaRef.current) gsap.set(ctaRef.current, { scale: 0.6, opacity: 0 });

      // HOLD — cards sit stacked in center for 0.7s so the user can register the pile
      // Use a zero-duration tween at t=0 as an anchor, then all scatter starts at t=0.7
      const HOLD = 0.7;

      /* ──────────────────────────────────────────────────────
       *  PHASE 2 — Scatter & Expand (starts after hold)
       *  Cards fly from center cluster to their bottom positions
       * ────────────────────────────────────────────────────── */
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        tl.to(
          card,
          {
            x: 0,
            y: 0,
            rotation: 0,
            scale: 1,
            duration: 0.9,
            ease: "power3.out",
          },
          HOLD + i * 0.06
        );
      });

      /* ──────────────────────────────────────────────────────
       *  PHASE 3 — Headline Entrance (starts at HOLD + 0.3s)
       * ────────────────────────────────────────────────────── */
      if (headlineRef.current) {
        tl.to(
          headlineRef.current,
          {
            yPercent: 0,
            scale: 1,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
          },
          HOLD + 0.3
        );
      }

      // Subtitles stagger in after headline begins
      subtitleRefs.current.forEach((el, i) => {
        if (!el) return;
        tl.to(
          el,
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
          },
          HOLD + 0.8 + i * 0.1
        );
      });

      /* ──────────────────────────────────────────────────────
       *  PHASE 4 — Body Text & CTA (starts at HOLD + 0.9s)
       * ────────────────────────────────────────────────────── */
      if (bodyTextRef.current) {
        tl.to(
          bodyTextRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
          },
          HOLD + 0.9
        );
      }

      if (ctaRef.current) {
        tl.to(
          ctaRef.current,
          {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            ease: "back.out(1.4)",
          },
          HOLD + 0.9
        );
      }
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative w-full overflow-hidden flex flex-col"
      style={{
        height: "100svh",
        minHeight: "680px",
        backgroundColor: "#F5F5F3",
      }}
    >
      {/* ── Paper Texture Overlay ── */}
      <div className="hero-paper-texture" />

      {/* Wrapper — opacity 0 until GSAP paints */}
      <div ref={wrapperRef} className="opacity-0 flex flex-col h-full flex-1">

        {/* ══ MAIN CONTENT AREA ═════════════════════════════════ */}
        <div className="relative z-20 flex-1 flex flex-col justify-center px-6 lg:px-14 pt-24">
          {/* Headline container (clip mask) */}
          <div className="overflow-hidden mb-2 lg:mb-4">
            <h1
              ref={headlineRef}
              className="text-[#1a1a1a] leading-[0.88] tracking-[-0.04em] select-none"
              style={{
                fontFamily: "var(--font-dm-sans), var(--font-manrope), sans-serif",
                fontSize: "clamp(60px, 18vw, 280px)",
                fontWeight: 900,
              }}
            >
              SURFACES
            </h1>
          </div>

          {/* Subtitles + Body Text Row */}
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 lg:gap-12">
            {/* Subtitle phrases */}
            <div className="flex flex-wrap items-center gap-x-6 lg:gap-x-10 flex-1 gap-y-1">
              {SUBTITLES.map((word, i) => (
                <span
                  key={word}
                  ref={(el) => { subtitleRefs.current[i] = el; }}
                  className="text-[#1a1a1a]/60 text-[10px] lg:text-[11px] font-semibold tracking-[0.22em] uppercase"
                  style={{ fontFamily: "var(--font-dm-sans), var(--font-manrope), sans-serif" }}
                >
                  {word}
                </span>
              ))}
            </div>

            {/* Body paragraph */}
            <p
              ref={bodyTextRef}
              className="text-[#1a1a1a]/50 text-[12px] lg:text-[13px] leading-[1.8] max-w-[260px] lg:max-w-[280px]"
              style={{ fontFamily: "var(--font-manrope), sans-serif" }}
            >
              Dalal & Associates brings decades of expertise in premium plywood,
              laminates, and veneers. We curate the finest materials to help you
              create spaces that are both beautiful and enduring.
            </p>
          </div>
        </div>

        {/* ══ BOTTOM STRIP — Product Cards ══════════════════════ */}
        <div className="relative z-20 px-3 lg:px-8 pb-5 lg:pb-7 mt-auto">
          <div className="flex items-end gap-2.5 lg:gap-3.5 justify-center">
            {CARDS.map((card, i) => {
              const elements = [];

              elements.push(
                <div
                  key={`card-${i}`}
                  ref={(el) => { cardRefs.current[i] = el; }}
                  className="hero-card flex-shrink-0"
                  style={{ width: "clamp(130px, 16vw, 230px)" }}
                >
                  <div
                    className="relative w-full overflow-hidden"
                    style={{
                      aspectRatio: "3/4",
                      padding: "10px",
                      backgroundColor: "#fff",
                      boxShadow: "0 2px 12px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04)",
                    }}
                  >
                    <div
                      className="relative w-full h-full overflow-hidden"
                      style={{
                        filter: "none",
                      }}
                    >
                      <Image
                        src={card.src}
                        alt={card.alt}
                        fill
                        className="object-cover"
                        sizes="200px"
                        priority={i < 3}
                      />
                      {card.dark && (
                        <div className="absolute inset-0 bg-black/20" />
                      )}
                    </div>
                  </div>
                  <span
                    className="block text-[8px] lg:text-[9px] text-[#1a1a1a]/40 tracking-[0.15em] uppercase mt-2 text-center font-medium transition-opacity duration-300"
                    style={{
                      fontFamily: "var(--font-dm-sans), var(--font-manrope), sans-serif",
                      opacity: animationDone ? 1 : 0,
                    }}
                  >
                    {card.alt}
                  </span>
                </div>
              );

              // CTA circle after 4th card (index 3)
              if (i === 3) {
                elements.push(
                  <div
                    key="cta-circle"
                    ref={ctaRef}
                    className="flex-shrink-0 hidden lg:flex"
                  >
                    <a
                      href="#products"
                      className="hero-cta-circle group flex items-center justify-center rounded-full bg-[#1a1a1a] hover:bg-[#C0392B] transition-colors duration-500 cursor-pointer"
                      style={{ width: "130px", height: "130px" }}
                    >
                      <span
                        className="text-[#F5F5F3] text-[10px] font-bold tracking-[0.14em] uppercase text-center leading-snug px-3"
                        style={{ fontFamily: "var(--font-dm-sans), var(--font-manrope), sans-serif" }}
                      >
                        SEE OUR
                        <br />
                        PRODUCTS
                      </span>
                    </a>
                  </div>
                );
              }

              return elements;
            })}
          </div>
        </div>

      </div>
    </section>
    // hii
  );
}

"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

/* ─── Types ──────────────────────────────────────────────── */
type Slide = {
  id: number;
  image: string | null;
  bg: string;
  glow: string;
  accentTop: string;
  category: string;
  headline: [string, string];
  description: string;
};

/* ─── Slide Data ─────────────────────────────────────────── */
/*
 * To add real background images:
 *   1. Place images in /public/images/ (recommended: 1920×1080, WebP/JPG)
 *   2. Set  image: "/images/your-file.jpg"  for the relevant slide
 */
const SLIDES: Slide[] = [
  {
    id: 0,
    image: "/plywood.jpg",
    bg: "#1c1208",
    glow: "radial-gradient(ellipse 70% 55% at 25% 60%, rgba(140,80,30,0.35) 0%, transparent 65%)",
    accentTop: "rgba(180,120,50,0.12)",
    category: "Premium Plywood",
    headline: ["Built on Strength,", "Crafted for Life."],
    description:
      "Industry-grade plywood for construction, interiors & furniture. Available in bulk for contractors, builders and designers across Pune.",
  },
  {
    id: 1,
    image: "/laminates.jpg",
    bg: "#0d1510",
    glow: "radial-gradient(ellipse 70% 55% at 70% 45%, rgba(80,130,90,0.28) 0%, transparent 65%)",
    accentTop: "rgba(120,180,130,0.10)",
    category: "Laminates & Surfaces",
    headline: ["Surfaces That", "Define Every Space."],
    description:
      "A curated range of laminates — including Greenlam — for walls, furniture and cabinetry. Endless textures, patterns and finishes.",
  },
  {
    id: 2,
    image: "/veneer.jpg",
    bg: "#1e1008",
    glow: "radial-gradient(ellipse 70% 55% at 40% 55%, rgba(180,100,40,0.30) 0%, transparent 65%)",
    accentTop: "rgba(200,130,60,0.10)",
    category: "Natural Veneers",
    headline: ["Real Wood Grain,", "Real Character."],
    description:
      "Natural veneers that bring the warmth and beauty of solid wood to every surface. Premium quality for luxury interiors and fine furniture.",
  },
  {
    id: 3,
    image: "/construction.jpg",
    bg: "#111018",
    glow: "radial-gradient(ellipse 70% 55% at 55% 50%, rgba(90,80,160,0.22) 0%, transparent 65%)",
    accentTop: "rgba(120,110,200,0.08)",
    category: "Trusted Since Decades",
    headline: ["Pune's Most Trusted", "Material Partner."],
    description:
      "Wholesale and retail supply of plywood, laminates, particle boards, armor plates & more. Serving contractors, designers and builders.",
  },
];

const DURATION = 5000;

/* Shared easing */
const ease: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

/* Helper — staggered text motion props */
function textMotion(delay: number) {
  return {
    initial: { opacity: 0, y: 26 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease, delay } },
    exit:    { opacity: 0, y: -14, transition: { duration: 0.25, ease: "easeIn" as const } },
  };
}

/* ─── Component ──────────────────────────────────────────── */
export default function Hero() {
  const [current, setCurrent]     = useState(0);
  const [paused, setPaused]       = useState(false);
  const [progressKey, setProgressKey] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback((idx: number) => {
    setCurrent(idx);
    setProgressKey((k) => k + 1);
  }, []);

  const next = useCallback(() => goTo((current + 1) % SLIDES.length), [current, goTo]);
  const prev = useCallback(() => goTo((current - 1 + SLIDES.length) % SLIDES.length), [current, goTo]);

  /* Auto-advance */
  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(next, DURATION);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [paused, next]);

  /* Keyboard nav */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft")  prev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [next, prev]);

  const slide = SLIDES[current];

  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden"
      style={{ height: "100svh", minHeight: "620px" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label="Hero slideshow"
    >
      {/* ══ BACKGROUND ══════════════════════════════════════ */}
      <AnimatePresence mode="sync">
        <motion.div
          key={`bg-${slide.id}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.85, ease: "easeInOut" } }}
          exit={{ opacity: 0, transition: { duration: 0.45, ease: "easeIn" } }}
          className="absolute inset-0 z-0"
          style={{ background: slide.bg }}
        >
          {/* Ken Burns zoom on the bg */}
          <div key={`kb-${slide.id}`} className="absolute inset-0 ken-burns">
            {slide.image && (
              <Image
                src={slide.image}
                alt={slide.category}
                fill
                priority={slide.id <= 1}
                quality={85}
                className="object-cover object-center"
              />
            )}
          </div>

          {/* Colour glow per slide */}
          <div className="absolute inset-0 pointer-events-none" style={{ background: slide.glow }} />
          <div
            className="absolute top-0 left-0 w-full h-64 pointer-events-none"
            style={{
              background: `radial-gradient(ellipse at top left, ${slide.accentTop} 0%, transparent 60%)`,
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Persistent dark overlay — heavier over real photos */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.52) 0%, rgba(0,0,0,0.30) 35%, rgba(0,0,0,0.62) 70%, rgba(0,0,0,0.90) 100%)",
        }}
      />
      {/* Side vignette to keep arrows readable */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, rgba(0,0,0,0.35) 0%, transparent 18%, transparent 82%, rgba(0,0,0,0.35) 100%)",
        }}
      />

      {/* Grain texture */}
      <div className="absolute inset-0 z-[2] hero-grain pointer-events-none" />

      {/* Gold top rule */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-amber/50 to-transparent z-[3]" />

      {/* ══ SLIDE CONTENT ═══════════════════════════════════ */}
      <div className="relative z-10 h-full flex flex-col">

        {/* Main text — vertically centred */}
        <div className="flex-1 flex items-center pt-10">
          <div className="w-full max-w-screen-xl mx-auto px-6">

            <AnimatePresence mode="wait">
              <div key={`content-${slide.id}`} className="max-w-3xl">

                {/* Category pill */}
                <motion.div {...textMotion(0.0)} className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/8 backdrop-blur-sm px-4 py-1.5 mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-amber" />
                  <span className="text-white/80 text-xs font-medium tracking-[0.18em] uppercase">
                    {slide.category}
                  </span>
                </motion.div>

                {/* Business name */}
                <motion.p
                  {...textMotion(0.08)}
                  className="text-brand-amber/80 text-sm font-semibold tracking-[0.22em] uppercase mb-4"
                >
                  Dalal &amp; Associates
                </motion.p>

                {/* Headline */}
                <h1
                  className="text-white leading-[1.08] mb-6"
                  style={{
                    fontFamily: "var(--font-playfair)",
                    fontSize: "clamp(2.8rem, 6vw, 5rem)",
                    fontWeight: 700,
                  }}
                >
                  <motion.span {...textMotion(0.16)} className="block">
                    {slide.headline[0]}
                  </motion.span>
                  <motion.span {...textMotion(0.26)} className="block text-brand-amber">
                    {slide.headline[1]}
                  </motion.span>
                </h1>

                {/* Description */}
                <motion.p
                  {...textMotion(0.36)}
                  className="text-white/55 text-base lg:text-lg leading-relaxed mb-10 max-w-xl"
                >
                  {slide.description}
                </motion.p>

                {/* CTA Buttons */}
                <motion.div {...textMotion(0.46)} className="flex flex-wrap gap-4">
                  <Button
                    render={<a href="#quote" />}
                    className="inline-flex items-center gap-2.5 rounded-full bg-brand-amber hover:bg-brand-gold text-white border-0 px-8 py-3.5 h-auto text-sm font-semibold shadow-lg shadow-brand-amber/25 hover:shadow-brand-gold/30 hover:scale-[1.03] transition-all duration-300 group"
                  >
                    Get a Quote
                    <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-200" />
                  </Button>

                  <Button
                    render={<a href="#products" />}
                    variant="outline"
                    className="inline-flex items-center gap-2.5 rounded-full border border-white/30 text-white bg-white/8 hover:bg-white/15 hover:border-white/50 px-8 py-3.5 h-auto text-sm font-semibold backdrop-blur-sm hover:scale-[1.03] transition-all duration-300 group"
                  >
                    View Products
                    <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                  </Button>
                </motion.div>

              </div>
            </AnimatePresence>
          </div>
        </div>

      </div>

      {/* ── Left Arrow ── */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-20 group flex items-center justify-center w-11 h-11 rounded-full border border-white/20 bg-black/25 backdrop-blur-sm text-white/60 hover:text-white hover:border-white/50 hover:bg-black/40 transition-all duration-250"
      >
        <ChevronLeft size={20} className="group-hover:-translate-x-0.5 transition-transform duration-200" />
      </button>

      {/* ── Right Arrow ── */}
      <button
        onClick={next}
        aria-label="Next slide"
        className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-20 group flex items-center justify-center w-11 h-11 rounded-full border border-white/20 bg-black/25 backdrop-blur-sm text-white/60 hover:text-white hover:border-white/50 hover:bg-black/40 transition-all duration-250"
      >
        <ChevronRight size={20} className="group-hover:translate-x-0.5 transition-transform duration-200" />
      </button>

      {/* ── Dot Indicators (bottom-center) ── */}
      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5">
        {SLIDES.map((s, i) => (
          <button
            key={s.id}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`relative rounded-full overflow-hidden transition-all duration-300 ${
              i === current
                ? "w-10 h-[5px] bg-white/20"
                : "w-[5px] h-[5px] bg-white/35 hover:bg-white/65"
            }`}
          >
            {i === current && (
              <span
                key={progressKey}
                className="absolute inset-y-0 left-0 bg-brand-amber rounded-full hero-progress"
                style={{
                  animationDuration: `${DURATION}ms`,
                  animationPlayState: paused ? "paused" : "running",
                }}
              />
            )}
          </button>
        ))}
      </div>

    </section>
  );
}

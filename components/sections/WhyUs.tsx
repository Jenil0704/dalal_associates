"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { useInView } from "framer-motion";
import { TextRotate, type TextRotateRef } from "@/components/ui/text-rotate";

/* ─── Data ───────────────────────────────────────────────── */
const REASONS = [
  {
    num: "01",
    title: "Quality You Can Verify.",
    desc: "ISI-marked materials sourced from certified manufacturers — consistent grade, consistent finish, across every single batch. We don't stock what we wouldn't use ourselves.",
    detail: "Every sheet tested.",
  },
  {
    num: "02",
    title: "Wholesale Rates. No Minimums.",
    desc: "Contractor-grade pricing for every buyer. Whether you're fitting out one room or sourcing for a 50-unit project, the number doesn't change. No volume games.",
    detail: "Same price, any quantity.",
  },
  {
    num: "03",
    title: "Deep Stock. Ready to Dispatch.",
    desc: "One of Pune's largest standing inventories of plywood, laminates and veneers. No waiting, no backorders, no mid-project surprises when you need it most.",
    detail: "Always in stock.",
  },
  {
    num: "04",
    title: "Every Material. One Address.",
    desc: "Structural boards to specialty flameproof panels — fewer vendors, faster projects, simpler logistics. One call handles it all.",
    detail: "7 categories under one roof.",
  },
];

/* ─── Reason Item ────────────────────────────────────────── */
function ReasonItem({
  reason,
  index,
  isActive,
  onInView,
}: {
  reason: (typeof REASONS)[0];
  index: number;
  isActive: boolean;
  onInView: (index: number, inView: boolean) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  /* Fires when the item occupies the center 10% of the viewport */
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });

  useEffect(() => {
    onInView(index, inView);
  }, [inView, index, onInView]);

  return (
    <div
      ref={ref}
      className="min-h-[65vh] flex items-center border-t py-14"
      style={{ borderColor: isActive ? "rgba(193,154,107,0.35)" : "rgba(255,255,255,0.08)" }}
    >
      <div
        className="grid grid-cols-[auto_1fr] gap-8 w-full transition-opacity duration-500"
        style={{ opacity: isActive ? 1 : 0.35 }}
      >
        {/* Large faded number */}
        <span
          className="font-bold leading-none select-none transition-colors duration-500"
          style={{
            fontFamily: "var(--font-playfair)",
            fontSize: "clamp(3rem, 6vw, 5rem)",
            color: isActive ? "rgba(193,154,107,0.55)" : "rgba(255,255,255,0.10)",
            lineHeight: 1,
          }}
        >
          {reason.num}
        </span>
{/* hhi */}
        {/* Content */}
        <div>
          <h3
            className="text-white font-normal leading-snug mb-4 transition-colors duration-300"
            style={{
              fontFamily: "var(--font-manrope)",
              fontSize: "clamp(1.15rem, 2vw, 1.5rem)",
            }}
          >
            {reason.title}
          </h3>
          <p
            className="leading-[1.85] mb-5 transition-colors duration-300 max-w-[52ch]"
            style={{
              fontSize: "14.5px",
              color: isActive ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.25)",
            }}
          >
            {reason.desc}
          </p>
          {/* Detail tag */}
          <span
            className="inline-flex items-center gap-2 transition-all duration-300"
            style={{ opacity: isActive ? 1 : 0 }}
          >
            <span
              className="w-1 h-1 rounded-full"
              style={{ background: "#C19A6B" }}
            />
            <span
              className="text-[11px] tracking-[0.18em] uppercase font-medium"
              style={{ color: "#C19A6B", fontFamily: "var(--font-inter)" }}
            >
              {reason.detail}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Section ───────────────────────────────────────── */
export default function WhyUs() {
  const textRotateRef = useRef<TextRotateRef>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleInView = useCallback((index: number, inView: boolean) => {
    if (inView) {
      setActiveIndex(index);
      textRotateRef.current?.jumpTo(index);
    }
  }, []);

  return (
    <section
      id="why-us"
      className="relative"
      style={{
        background: `
          radial-gradient(ellipse 65% 60% at 12% 50%, rgba(93,64,55,0.28) 0%, transparent 60%),
          #222222
        `,
      }}
    >
      {/* Top rule */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-amber/25 to-transparent" />

      <div className="w-full mx-auto px-12">
        <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-0 items-start">

          {/* ── LEFT: Sticky anchor ── */}
          <div className="hidden lg:flex sticky top-0 h-screen flex-col justify-center pr-12 border-r border-white/8">

            {/* Label */}
            <p
              className="text-brand-amber text-[11px] tracking-[0.30em] uppercase font-medium mb-10"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Why Choose Us
            </p>

            {/* Setup line */}
            <p
              className="text-white/35 text-sm leading-relaxed mb-5"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              The reason Pune&rsquo;s builders keep coming back:
            </p>

            {/* Rotating text — the key "answer" */}
            <div className="overflow-hidden mb-10">
              <TextRotate
                ref={textRotateRef}
                texts={REASONS.map((r) => r.title)}
                auto={false}
                loop={false}
                splitBy="characters"
                staggerFrom="first"
                staggerDuration={0.018}
                animatePresenceMode="wait"
                animatePresenceInitial={false}
                initial={{ y: "105%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "-105%", opacity: 0 }}
                transition={{ type: "spring", damping: 28, stiffness: 320 }}
                mainClassName="flex-col items-start"
                splitLevelClassName="overflow-hidden leading-[1.18]"
                elementLevelClassName="text-white"
                style={{
                  fontFamily: "var(--font-manrope)",
                  fontSize: "clamp(1.6rem, 2.8vw, 2.4rem)",
                  fontWeight: 600,
                  lineHeight: 1.18,
                }}
              />
            </div>

            {/* Progress indicator */}
            <div className="flex flex-col gap-3">
              {/* Thin progress track */}
              <div className="flex items-center gap-2">
                {REASONS.map((_, i) => (
                  <div
                    key={i}
                    className="h-[2px] flex-1 rounded-full transition-all duration-500"
                    style={{
                      background:
                        i === activeIndex
                          ? "#C19A6B"
                          : i < activeIndex
                          ? "rgba(193,154,107,0.30)"
                          : "rgba(255,255,255,0.10)",
                    }}
                  />
                ))}
              </div>
              {/* Counter */}
              <p
                className="text-white/30 text-xs tabular-nums"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                {String(activeIndex + 1).padStart(2, "0")}&nbsp;&nbsp;/&nbsp;&nbsp;{String(REASONS.length).padStart(2, "0")}
              </p>
            </div>
          </div>

          {/* ── RIGHT: Scrollable reasons ── */}
          <div className="lg:pl-14">
            {/* Mobile heading */}
            <div className="lg:hidden pt-16 pb-8">
              <p
                className="text-brand-amber text-[11px] tracking-[0.30em] uppercase font-medium mb-4"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Why Choose Us
              </p>
              <h2
                className="text-white leading-[1.15]"
                style={{
                  fontFamily: "var(--font-playfair)",
                  fontSize: "clamp(1.7rem, 5vw, 2.4rem)",
                  fontWeight: 600,
                }}
              >
                The reason Pune&rsquo;s builders keep coming back.
              </h2>
            </div>

            {/* Reason items */}
            {REASONS.map((reason, i) => (
              <ReasonItem
                key={reason.num}
                reason={reason}
                index={i}
                isActive={activeIndex === i}
                onInView={handleInView}
              />
            ))}

            {/* Final bottom rule */}
            <div
              className="border-t pb-20"
              style={{ borderColor: "rgba(255,255,255,0.08)" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const ease: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.8, ease, delay },
  };
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Card container parallax movements (y-axis offsets dynamically tied to scroll)
  const yLargeCard = useTransform(scrollYProgress, [0, 1], [30, -60]);
  const ySmallCard = useTransform(scrollYProgress, [0, 1], [90, -150]);

  // Internal image parallax movements (moves within the overflow-hidden boundaries)
  const yImageLarge = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const yImageSmall = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  // Horizontal text marquee transform
  const textX = useTransform(scrollYProgress, [0, 1], ["0%", "-35%"]);

  return (
    <section ref={sectionRef} id="about" className="overflow-hidden bg-brand-linen">
      {/* Container aligned slightly to left like the image */}
      <div className="w-full px-12 mx-auto min-h-screen py-24 flex flex-col lg:flex-row items-center gap-12 lg:gap-0">

        {/* ── LEFT: Overlapping Images ── */}
        <div className="w-full lg:w-[48%] relative min-h-[600px] lg:min-h-[800px] flex items-center pr-10 lg:pr-16 z-20">

          <motion.div
            {...fadeUp(0)}
            style={{ y: yLargeCard }}
            className="relative w-full h-[550px] lg:h-[750px] shadow-2xl overflow-hidden"
          >
            {/* The main background building/exterior image */}
            <motion.div className="w-full h-[115%] absolute top-0 left-0" style={{ y: yImageLarge }}>
              <Image
                src="/construction.jpg" // Dark structured image
                alt="Dalal & Associates — Modern Structure"
                fill
                quality={90}
                className="object-cover object-center"
              />
            </motion.div>
          </motion.div>

          {/* The smaller overlapping interior/wood image */}
          <motion.div
            {...fadeUp(0.2)}
            style={{ y: ySmallCard }}
            className="absolute top-[35%] right-0 lg:right-4 w-[45%] lg:w-[42%] aspect-[3/4] shadow-2xl bg-white border-[12px] border-transparent overflow-hidden"
          >
            <motion.div className="w-full h-[125%] absolute top-0 left-0" style={{ y: yImageSmall }}>
              <Image
                src="/veneer.jpg" // Interior wood texture
                alt="Dalal & Associates — Premium Interior Wood"
                fill
                quality={90}
                className="object-cover object-center"
              />
            </motion.div>
          </motion.div>

        </div>

        {/* ── RIGHT: Typography Content ── */}
        <div className="w-full lg:w-[52%] flex flex-col justify-center px-6 lg:pl-12 xl:pl-20 2xl:pl-28 relative z-10">

          <motion.div {...fadeUp(0.3)} className="flex flex-col select-none whitespace-nowrap">
            {/* Line 1: We believe in */}
            <h2
              className="text-brand-charcoal font-normal leading-[1] tracking-tight -ml-1 text-center lg:text-left"
              style={{
                fontFamily: "var(--font-manrope)",
                fontSize: "clamp(3rem, 5.5vw, 5.5rem)",
              }}
            >
              We believe in
            </h2>

            {/* Line 2: timeless — luxurious — sustainable */}
            <motion.h2
              className="text-brand-amber italic font-normal leading-[1.1] tracking-[-0.02em] whitespace-nowrap text-center lg:text-left"
              style={{
                fontFamily: "var(--font-noto-serif)",
                fontSize: "clamp(2.5rem, 4.8vw, 5rem)",
                marginTop: "0.2rem",
                marginLeft: "clamp(-1rem, -3vw, -3rem)", // Pull it left dynamically
                x: textX
              }}
            >
              timeless <span className="text-brand-amber/60 mx-1">—</span> luxurious <span className="text-brand-amber/60 mx-1">—</span> sustainable
            </motion.h2>

            {/* Line 3: Materials (Instead of Design) */}
            <h2
              className="text-brand-charcoal font-normal leading-[1] tracking-tight text-center lg:text-left"
              style={{
                fontFamily: "var(--font-manrope)",
                fontSize: "clamp(3rem, 5.5vw, 5.5rem)",
                marginTop: "0.3rem",
              }}
            >
              Materials
            </h2>
          </motion.div>

          {/* Description Paragraph */}
          <motion.div {...fadeUp(0.5)} className="mt-12 max-w-[34rem] mx-auto lg:mx-0">
            <p
              className="text-brand-muted font-medium leading-[1.6] text-[14px] lg:text-[16px] text-center lg:text-left whitespace-normal"
              style={{ fontFamily: "var(--font-manrope)" }}
            >
              Our materials are sourced to guide you through every step of the
              construction process, ensuring that your project is not only
              structurally robust but also aesthetically refined and built to last.
            </p>
          </motion.div>

          {/* CTA Button */}
          <motion.div {...fadeUp(0.6)} className="mt-10 flex justify-center lg:justify-start">
            <a
              href="#about"
              className="inline-flex items-center justify-center rounded-md border border-brand-walnut/30 px-8 py-3.5 text-[11px] uppercase tracking-[0.16em] text-brand-walnut hover:bg-brand-walnut hover:text-white transition-all duration-400 font-medium disabled:opacity-50 disabled:pointer-events-none whitespace-normal"
              style={{ fontFamily: "var(--font-manrope)" }}
            >
              MORE ABOUT US
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

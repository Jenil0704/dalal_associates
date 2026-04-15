"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  Tag,
  PackageOpen,
  Award,
} from "lucide-react";

/* ─── Types ──────────────────────────────────────────────── */
type Card = {
  id: string;
  name: string;
  subtitle: string;
  image: string | null;
  bg: string;
  /* CSS grid placement */
  col: string;
  row: string;
};

/* ─── Bento card data ────────────────────────────────────── */
/*
 * Replace  image: null  with  image: "/images/card-name.jpg"
 * Recommended: 1200×900 px, WebP/JPG, stored in /public/images/
 */
const CARDS: Card[] = [
  {
    id: "structural-plywood",
    name: "Structural Plywood",
    subtitle: "MARINE GRADE / FLEXIBLE / COMMERCIAL",
    image: '/plywood_3.jpg',
    bg: `
      repeating-linear-gradient(
        179deg,
        transparent 0px, transparent 7px,
        rgba(170,110,30,0.09) 7px, rgba(170,110,30,0.09) 8px,
        transparent 8px, transparent 16px,
        rgba(150,90,20,0.06) 16px, rgba(150,90,20,0.06) 18px
      ),
      linear-gradient(160deg, #d4a860 0%, #c49050 25%, #ddb870 50%, #c49858 75%, #d4a860 100%)
    `,
    col: "col-start-1 col-end-3",
    row: "row-start-1 row-end-2",
  },
  {
    id: "natural-veneers",
    name: "Natural Veneers",
    subtitle: "EXOTIC & INDIGENOUS SPECIES",
    image: '/venner_2.jpg',
    bg: `
      repeating-linear-gradient(
        180deg,
        transparent 0px, transparent 5px,
        rgba(20,8,2,0.18) 5px, rgba(20,8,2,0.18) 6px,
        transparent 6px, transparent 14px,
        rgba(15,5,1,0.12) 14px, rgba(15,5,1,0.12) 16px
      ),
      linear-gradient(175deg, #2a1408 0%, #3d1e0a 30%, #1e0c04 55%, #4a2810 80%, #1a0e06 100%)
    `,
    col: "col-start-3 col-end-4",
    row: "row-start-1 row-end-3",
  },
  {
    id: "luxury-laminates",
    name: "Luxury Laminates",
    subtitle: "MATTE / HIGH GLOSS / TEXTURED",
    image: "/laminates_2.jpg",
    bg: `
      repeating-linear-gradient(
        174deg,
        transparent 0px, transparent 4px,
        rgba(130,80,20,0.13) 4px, rgba(130,80,20,0.13) 6px,
        transparent 6px, transparent 12px,
        rgba(110,65,15,0.08) 12px, rgba(110,65,15,0.08) 14px
      ),
      linear-gradient(165deg, #9a6838 0%, #b07840 25%, #8a5c2e 55%, #a87238 80%, #8a5c2e 100%)
    `,
    col: "col-start-1 col-end-2",
    row: "row-start-2 row-end-3",
  },
  {
    id: "adhesives-finishes",
    name: "Adhesives & Finishes",
    subtitle: "INDUSTRIAL STRENGTH BONDINGS",
    image: "/adhesive.jpg",
    bg: `
      radial-gradient(ellipse 70% 60% at 55% 45%, rgba(193,154,107,0.18) 0%, transparent 65%),
      linear-gradient(160deg, #1a1008 0%, #2e1e0c 40%, #181008 70%, #241808 100%)
    `,
    col: "col-start-2 col-end-3",
    row: "row-start-2 row-end-3",
  },
];

/* ─── Features data ──────────────────────────────────────── */
const FEATURES = [
  {
    Icon: ShieldCheck,
    title: "Unrivaled Quality",
    desc: "Every sheet undergoes strict quality inspection to guarantee structural integrity and finish consistency.",
  },
  {
    Icon: Tag,
    title: "Competitive Pricing",
    desc: "Direct-from-source relationships allow us to provide wholesale rates to contractors and retailers.",
  },
  {
    Icon: PackageOpen,
    title: "Bulk Logistics",
    desc: "Efficient supply chain management ensuring zero delays for large-scale construction orders.",
  },
  {
    Icon: Award,
    title: "Trusted Legacy",
    desc: "Decades of partnership with Pune's leading contractors, designers and real estate developers.",
  },
];

/* ─── Shared ease ────────────────────────────────────────── */
const ease: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

function inView(delay = 0) {
  return {
    initial: { opacity: 0, y: 22 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.6, ease, delay },
  };
}

/* ─── Bento Card ─────────────────────────────────────────── */
function BentoCard({ card, delay }: { card: Card; delay: number }) {
  return (
    <motion.a
      href={`#${card.id}`}
      {...inView(delay)}
      className={`group relative overflow-hidden rounded-[4px] flex flex-col justify-end cursor-pointer ${card.col} ${card.row}`}
    >
      {/* Background */}
      <div
        className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.035]"
        style={{
          background: card.bg,
          ...(card.image
            ? {
                backgroundImage: `url(${card.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : {}),
        }}
      />

      {/* Persistent bottom overlay for text readability */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.28) 45%, transparent 100%)",
        }}
      />

      {/* Hover brighten */}
      <div className="absolute inset-0 bg-white/0 group-hover:bg-white/[0.04] transition-colors duration-400 pointer-events-none" />

      {/* Text */}
      <div className="relative z-10 p-5">
        <h3
          className="text-white text-xl font-semibold leading-snug mb-1"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          {card.name}
        </h3>
        <p
          className="text-white/55 text-[10px] tracking-[0.18em] uppercase font-medium"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {card.subtitle}
        </p>
      </div>
    </motion.a>
  );
}

/* ─── Feature Item ───────────────────────────────────────── */
function FeatureItem({
  Icon,
  title,
  desc,
  delay,
}: (typeof FEATURES)[0] & { delay: number }) {
  return (
    <motion.div {...inView(delay)} className="flex flex-col gap-4">
      {/* Diamond icon container */}
      <div className="relative w-9 h-9 shrink-0">
        <div
          className="absolute inset-0 rounded-[4px] rotate-45"
          style={{ background: "rgba(193,154,107,0.18)", border: "1px solid rgba(193,154,107,0.30)" }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <Icon size={15} className="text-brand-amber" />
        </div>
      </div>

      <div>
        <p
          className="text-brand-walnut font-semibold text-[15px] mb-2 leading-snug"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {title}
        </p>
        <p className="text-brand-muted text-[13px] leading-[1.75]">{desc}</p>
      </div>
    </motion.div>
  );
}

/* ─── Main Section ───────────────────────────────────────── */
export default function Portfolio() {
  return (
    <section id="portfolio" className="overflow-hidden">

      {/* ── Portfolio Grid ── */}
      <div className="bg-brand-linen py-20 lg:py-24">
        <div className="w-full mx-auto px-12">

          {/* Header */}
          <motion.div
            {...inView(0)}
            className="flex items-end justify-between mb-8"
          >
            <div>
              <p
                className="text-brand-muted text-[11px] tracking-[0.28em] uppercase font-medium mb-3"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Our Portfolio
              </p>
              <h2
                className="text-brand-walnut leading-none"
                style={{
                  fontFamily: "var(--font-manrope)",
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  fontWeight: 600,
                }}
              >
                Premium Materials
              </h2>
            </div>

            <a
              href="#products"
              className="text-brand-amber hover:text-brand-walnut text-[11px] tracking-[0.22em] uppercase font-semibold transition-colors duration-200 shrink-0 hidden sm:block underline underline-offset-4 decoration-brand-amber/40 hover:decoration-brand-walnut/40"
            >
              View All Collections
            </a>
          </motion.div>

          {/* Bento Grid */}
          <div
            className="grid gap-2.5"
            style={{
              gridTemplateColumns: "1.45fr 1fr 1.45fr",
              gridTemplateRows: "260px 260px",
            }}
          >
            {CARDS.map((card, i) => (
              <BentoCard key={card.id} card={card} delay={0.06 * i} />
            ))}
          </div>

        </div>
      </div>

      {/* ── Features Strip ── */}
      <div
        className="py-16 lg:py-20"
        style={{ background: "#EDEAE4" }}
      >
        <div className="w-full mx-auto px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8">
            {FEATURES.map((feat, i) => (
              <FeatureItem key={feat.title} {...feat} delay={0.08 * i} />
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}

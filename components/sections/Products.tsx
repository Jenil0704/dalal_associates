"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

/* ─── Data ───────────────────────────────────────────────── */

/*
 * To add real images set  image: "/images/product-plywood.jpg"
 * Recommended: 800×600 px, JPG/WebP, placed in /public/images/
 */

const CORE_CATEGORIES = [
  {
    id: "plywood",
    name: "Plywood",
    tagline: "Structural & Commercial Grades",
    description:
      "BWR, BWP, Marine and commercial grades. Thickness 3 mm – 25 mm for construction, furniture and interiors.",
    image: "/plywood.jpg",
    bg: "linear-gradient(165deg, #2a1508 0%, #4a2c15 45%, #1c1007 100%)",
    accent: "#C17D3C",
  },
  {
    id: "laminates",
    name: "Laminates",
    tagline: "Including Greenlam Range",
    description:
      "High-pressure laminates across hundreds of textures, wood grains, solids and metallic finishes.",
    image: "/laminates.jpg",
    bg: "linear-gradient(165deg, #101010 0%, #242424 45%, #0a0a0a 100%)",
    accent: "#D4A853",
  },
  {
    id: "veneers",
    name: "Veneers",
    tagline: "Natural Wood Faces",
    description:
      "Raw and paper-backed veneers in teak, walnut, oak, maple and exotic species.",
    image: "/veneer.jpg",
    bg: "linear-gradient(165deg, #3d1e0a 0%, #6b3820 45%, #2a1508 100%)",
    accent: "#C17D3C",
  },
  {
    id: "particle-boards",
    name: "Particle Boards",
    tagline: "Pre-laminated & Plain",
    description:
      "E0, E1 emission-grade boards for modular furniture, cabinetry and interior fit-outs.",
    image: "/construction.jpg",
    bg: "linear-gradient(165deg, #1e1c12 0%, #38321e 45%, #161410 100%)",
    accent: "#D4A853",
  },
];

const SPECIALTY_PRODUCTS = [
  {
    id: "armor-plates",
    name: "Armor Plates",
    tagline: "Impact-resistant boards",
    description:
      "Heavy-duty boards engineered for commercial flooring, countertops and high-traffic applications.",
    image: "/armor_plate.jpg",
    bg: "linear-gradient(165deg, #0c160c 0%, #182618 45%, #080e08 100%)",
  },
  {
    id: "flameproof",
    name: "Flameproof Materials",
    tagline: "Fire-rated & IS-certified",
    description:
      "IS 5509 certified fire-retardant boards for public buildings, hospitality and commercial interiors.",
    image: "/armor_plate.jpg",
    bg: "linear-gradient(165deg, #160808 0%, #281212 45%, #0e0505 100%)",
  },
  {
    id: "floor-coverings",
    name: "Floor Coverings",
    tagline: "Durable, all-purpose",
    description:
      "Vinyl planks, laminate flooring and hardwood options for residential and commercial spaces.",
    image: "floor_coverings.jpg",
    bg: "linear-gradient(165deg, #1c1608 0%, #302814 45%, #141008 100%)",
  },
  {
    id: "decorative-panels",
    name: "Decorative Panels",
    tagline: "Wall cladding & accents",
    description:
      "Grooved, textured and printed panels for feature walls, retail fit-outs and reception areas.",
    image: "/decorative_panel.jpg",
    bg: "linear-gradient(165deg, #0e0e14 0%, #1a1a24 45%, #09090e 100%)",
  },
];

/* ─── Shared animation helper ────────────────────────────── */
const ease: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

function inView(delay = 0) {
  return {
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.6, ease, delay },
  };
}

/* ─── Sub-component: Core category card ─────────────────── */
function CategoryCard({
  item,
  index,
}: {
  item: (typeof CORE_CATEGORIES)[0];
  index: number;
}) {
  return (
    <motion.a
      href={`#${item.id}`}
      {...inView(0.08 * index)}
      className="group relative flex flex-col justify-end overflow-hidden rounded-xl cursor-pointer"
      style={{ minHeight: "400px" }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease }}
    >
      {/* Background image / gradient */}
      <div
        className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        style={{
          background: item.bg,
          backgroundSize: "cover",
          backgroundPosition: "center",
          ...(item.image ? { backgroundImage: `url(${item.image})` } : {}),
        }}
      />

      {/* Persistent dark overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.28) 55%, transparent 100%)",
        }}
      />

      {/* Hover tint */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-400" />

      {/* Accent top-left bar */}
      <div
        className="absolute top-0 left-0 w-0 h-[3px] group-hover:w-12 transition-all duration-500"
        style={{ background: item.accent }}
      />

      {/* Content */}
      <div className="relative z-10 p-6">
        <p
          className="text-white/45 text-[10px] tracking-[0.22em] uppercase mb-2 font-medium"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          {item.tagline}
        </p>
        <h3
          className="text-white text-2xl font-semibold mb-2 leading-tight"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          {item.name}
        </h3>
        <p className="text-white/50 text-sm leading-relaxed mb-5 max-w-[28ch]">
          {item.description}
        </p>

        {/* CTA */}
        <span className="inline-flex items-center gap-2 text-white text-sm font-medium border-b border-white/0 group-hover:border-white/40 pb-0.5 transition-all duration-300">
          <span
            className="text-white/0 group-hover:text-white transition-colors duration-300"
            style={{ color: item.accent }}
          >
            Explore
          </span>
          <ArrowRight
            size={14}
            className="translate-x-0 group-hover:translate-x-1 transition-transform duration-300 opacity-0 group-hover:opacity-100"
            style={{ color: item.accent }}
          />
        </span>
      </div>
    </motion.a>
  );
}

/* ─── Sub-component: Specialty product card ─────────────── */
function SpecialtyCard({ item }: { item: (typeof SPECIALTY_PRODUCTS)[0] }) {
  return (
    <a
      href={`#${item.id}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-brand-walnut/8 bg-white cursor-pointer h-full transition-shadow duration-300 hover:shadow-lg hover:shadow-black/8"
    >
      {/* Image area */}
      <div
        className="relative overflow-hidden"
        style={{ height: "220px" }}
      >
        <div
          className="absolute inset-0 transition-transform duration-600 ease-out group-hover:scale-[1.05]"
          style={{
            background: item.bg,
            ...(item.image ? { backgroundImage: `url(${item.image})`, backgroundSize: "cover", backgroundPosition: "center" } : {}),
          }}
        />
        {/* Subtle noise grain on cards */}
        <div className="absolute inset-0 hero-grain opacity-40" />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300" />

        {/* Top-right arrow badge */}
        <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-x-2 group-hover:translate-x-0">
          <ArrowUpRight size={14} className="text-white" />
        </div>
      </div>

      {/* Text content */}
      <div className="flex flex-col flex-1 p-5">
        <p className="text-brand-amber text-[10px] tracking-[0.2em] uppercase font-medium mb-1.5">
          {item.tagline}
        </p>
        <h3
          className="text-brand-walnut text-lg font-semibold mb-2 leading-snug"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          {item.name}
        </h3>
        <p className="text-brand-muted text-sm leading-relaxed flex-1">
          {item.description}
        </p>
        <div className="mt-4 pt-4 border-t border-brand-walnut/8 flex items-center justify-between">
          <span className="text-brand-walnut text-xs font-medium">Get Quote</span>
          <ArrowRight
            size={13}
            className="text-brand-amber translate-x-0 group-hover:translate-x-1 transition-transform duration-200"
          />
        </div>
      </div>
    </a>
  );
}

/* ─── Main Section ───────────────────────────────────────── */
export default function Products() {
  return (
    <section id="products" className="overflow-hidden">

      {/* ══ SECTION A: Core Categories ════════════════════════ */}
      <div className="bg-white py-24 lg:py-24">
        <div className="w-full mx-auto px-6 lg:px-16">

          {/* Header */}
          <motion.div
            {...inView(0)}
            className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-14"
          >
            <div className="max-w-xl">
              {/* Label */}
              <div className="flex items-center gap-4 mb-5">
                <span className="text-brand-muted text-[11px] tracking-[0.28em] uppercase font-medium">
                  What We Stock
                </span>
                <div className="w-8 h-px bg-brand-walnut/15" />
              </div>
              <h2
                className="text-brand-walnut leading-[1.12] mb-3"
                style={{
                  fontFamily: "var(--font-manrope)",
                  fontSize: "clamp(1.9rem, 3.5vw, 2.8rem)",
                  fontWeight: 600,
                }}
              >
                Our Core Materials
              </h2>
              <p className="text-brand-muted text-sm leading-relaxed max-w-md">
                Four categories that form the backbone of every build — stocked
                in depth, priced competitively, available in wholesale quantities.
              </p>
            </div>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 text-brand-amber hover:text-brand-walnut text-sm font-medium transition-colors duration-200 group shrink-0"
            >
              View all products
              <ArrowUpRight
                size={14}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
              />
            </a>
          </motion.div>

          {/* 4-column card grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CORE_CATEGORIES.map((item, i) => (
              <CategoryCard key={item.id} item={item} index={i} />
            ))}
          </div>

        </div>
      </div>

      {/* ══ SECTION B: Specialty Materials ═══════════════════ */}
      <div className="bg-brand-linen py-24">
        <div className="w-full mx-auto px-6 lg:px-16">

          {/* Header */}
          <motion.div
            {...inView(0)}
            className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-14"
          >
            <div className="max-w-xl">
              <div className="flex items-center gap-4 mb-5">
                <span className="text-brand-muted text-[11px] tracking-[0.28em] uppercase font-medium">
                  Beyond the Basics
                </span>
                <div className="w-8 h-px bg-brand-walnut/15" />
              </div>
              <h2
                className="text-brand-walnut leading-[1.12] mb-3"
                style={{
                  fontFamily: "var(--font-manrope)",
                  fontSize: "clamp(1.9rem, 3.5vw, 2.8rem)",
                  fontWeight: 600,
                }}
              >
                Specialty &amp; Safety Materials
              </h2>
              <p className="text-brand-muted text-sm leading-relaxed max-w-md">
                From fire-rated boards to impact-resistant armor plates — the
                harder-to-source materials, always in stock.
              </p>
            </div>

            {/* Carousel arrows — top right, matching reference design */}
            <div className="flex items-center gap-2 shrink-0">
              {/* These are wired via CarouselPrevious / CarouselNext inside */}
            </div>
          </motion.div>

          {/* Carousel */}
          <motion.div {...inView(0.1)}>
            <Carousel
              opts={{ align: "start", loop: false, dragFree: true }}
              className="w-full"
            >
              {/* Custom arrow placement — top-right style like reference */}
              <div className="flex justify-end gap-2 mb-6 -mt-20 relative z-10">
                <CarouselPrevious className="static translate-y-0 w-10 h-10 rounded-full border border-brand-walnut/20 bg-white text-brand-walnut hover:bg-brand-walnut hover:text-white hover:border-brand-walnut transition-all duration-200 shadow-sm" />
                <CarouselNext className="static translate-y-0 w-10 h-10 rounded-full border border-brand-walnut/20 bg-white text-brand-walnut hover:bg-brand-walnut hover:text-white hover:border-brand-walnut transition-all duration-200 shadow-sm" />
              </div>

              <CarouselContent className="-ml-4">
                {SPECIALTY_PRODUCTS.map((item) => (
                  <CarouselItem
                    key={item.id}
                    className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                  >
                    <SpecialtyCard item={item} />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </motion.div>

          {/* Bottom CTA strip */}
          <motion.div
            {...inView(0.2)}
            className="mt-14 pt-10 border-t border-brand-walnut/10 flex flex-col sm:flex-row items-center justify-between gap-5"
          >
            <p className="text-brand-muted text-sm">
              Need something not listed? We source on request.
            </p>
            <a
              href="#quote"
              className="inline-flex items-center gap-2.5 rounded-full bg-brand-walnut hover:bg-brand-charcoal text-white px-7 py-3 text-sm font-semibold transition-all duration-300 group"
            >
              Request a Custom Quote
              <ArrowRight
                size={14}
                className="group-hover:translate-x-1 transition-transform duration-200"
              />
            </a>
          </motion.div>

        </div>
      </div>

    </section>
  );
}

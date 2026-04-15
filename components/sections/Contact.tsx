"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Clock, Mail } from "lucide-react";

/* ─── Ease ───────────────────────────────────────────────── */
const ease: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.65, ease, delay },
  };
}

/* ─── Contact info ───────────────────────────────────────── */
const INFO = [
  {
    Icon: MapPin,
    label: "Visit Us",
    lines: ["Dalal & Associates", "Timber Market, Pune — 411001", "Maharashtra, India"],
  },
  {
    Icon: Phone,
    label: "Call / WhatsApp",
    lines: ["+91 99999 99999", "+91 98888 88888"],
    href: "tel:+919999999999",
  },
  {
    Icon: Mail,
    label: "Email",
    lines: ["info@dalalassociates.in"],
    href: "mailto:info@dalalassociates.in",
  },
  {
    Icon: Clock,
    label: "Business Hours",
    lines: ["Mon – Sat:  9:00 AM – 7:00 PM", "Sunday:  Closed"],
  },
];

/* ─── Main Section ───────────────────────────────────────── */
export default function Contact() {
  return (
    <section
      id="contact"
      className="bg-brand-linen overflow-hidden"
    >
      {/* Top rule */}
      <div className="h-px w-full" style={{ background: "linear-gradient(to right, transparent, rgba(93,64,55,0.18), transparent)" }} />

      <div className="w-full mx-auto px-12 py-24">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
          <div>
            <motion.p
              {...fadeUp(0)}
              className="text-brand-muted text-[11px] tracking-[0.28em] uppercase font-medium mb-4"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Find Us
            </motion.p>
            <motion.h2
              {...fadeUp(0.07)}
              className="text-brand-walnut leading-none"
              style={{
                fontFamily: "var(--font-manrope)",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 600,
              }}
            >
              Come visit our warehouse.
            </motion.h2>
          </div>
          <motion.a
            {...fadeUp(0.1)}
            href="https://maps.google.com/?q=Pune+Timber+Market"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 text-brand-amber hover:text-brand-walnut text-[11px] tracking-[0.22em] uppercase font-semibold transition-colors duration-200 underline underline-offset-4 decoration-brand-amber/40 hover:decoration-brand-walnut/40 hidden lg:inline-flex"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            Open in Maps
          </motion.a>
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[7fr_5fr] gap-10 lg:gap-14">

          {/* ── Map ── */}
          <motion.div
            {...fadeUp(0.05)}
            className="relative overflow-hidden rounded-[4px] shadow-lg shadow-black/8"
            style={{ height: "clamp(320px, 45vw, 480px)" }}
          >
            <iframe
              title="Dalal & Associates Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.4543!2d73.8567!3d18.5204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c0!2sPune+Timber+Market!5e0!3m2!1sen!2sin!4v1700000000000"
              className="absolute inset-0 w-full h-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              style={{ filter: "saturate(0.65) contrast(1.05)" }}
            />
            {/* Subtle amber tint overlay */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: "rgba(193,154,107,0.04)", mixBlendMode: "multiply" }}
            />
          </motion.div>

          {/* ── Info cards ── */}
          <div className="flex flex-col gap-5">
            {INFO.map(({ Icon, label, lines, href }, i) => (
              <motion.div
                key={label}
                {...fadeUp(0.08 + i * 0.06)}
                className="flex gap-5 p-5 rounded-[4px]"
                style={{
                  background: "rgba(93,64,55,0.04)",
                  border: "1px solid rgba(93,64,55,0.08)",
                }}
              >
                {/* Icon diamond */}
                <div className="relative w-9 h-9 shrink-0 mt-0.5">
                  <div
                    className="absolute inset-0 rounded-[3px] rotate-45"
                    style={{ background: "rgba(193,154,107,0.15)", border: "1px solid rgba(193,154,107,0.25)" }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Icon size={15} className="text-brand-amber" />
                  </div>
                </div>

                {/* Text */}
                <div>
                  <p
                    className="text-[10.5px] tracking-[0.20em] uppercase font-medium mb-2"
                    style={{ color: "#C19A6B", fontFamily: "var(--font-inter)" }}
                  >
                    {label}
                  </p>
                  {lines.map((line, j) =>
                    href && j === 0 ? (
                      <a
                        key={j}
                        href={href}
                        className="block text-[14px] font-medium leading-[1.7] text-brand-walnut hover:text-brand-amber transition-colors duration-200"
                        style={{ fontFamily: "var(--font-inter)" }}
                      >
                        {line}
                      </a>
                    ) : (
                      <p
                        key={j}
                        className="text-[13.5px] leading-[1.7] text-brand-muted"
                        style={{ fontFamily: "var(--font-inter)" }}
                      >
                        {line}
                      </p>
                    )
                  )}
                </div>
              </motion.div>
            ))}

            {/* Mobile maps link */}
            <motion.a
              {...fadeUp(0.32)}
              href="https://maps.google.com/?q=Pune+Timber+Market"
              target="_blank"
              rel="noopener noreferrer"
              className="lg:hidden flex items-center justify-center gap-2 py-3 rounded-[3px] border text-brand-amber text-[11px] tracking-[0.18em] uppercase font-semibold transition-colors duration-200 hover:border-brand-amber hover:bg-brand-amber/5"
              style={{ borderColor: "rgba(193,154,107,0.30)", fontFamily: "var(--font-inter)" }}
            >
              <MapPin size={13} />
              Open in Maps
            </motion.a>
          </div>

        </div>
      </div>
    </section>
  );
}

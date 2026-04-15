"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

/* ─── Data ───────────────────────────────────────────────── */
const QUICK_LINKS = [
  { label: "About Us", href: "#about" },
  { label: "Our Portfolio", href: "#portfolio" },
  { label: "Products", href: "#products" },
  { label: "Why Choose Us", href: "#why-us" },
  { label: "Get a Quote", href: "#quote" },
  { label: "Contact", href: "#contact" },
];

const PRODUCTS = [
  "Structural Plywood",
  "Commercial Plywood",
  "Natural Veneers",
  "Decorative Laminates",
  "Particle Boards / MDF",
  "Armor Boards",
  "Floor Coverings",
  "Adhesives & Finishes",
];

/* Inline SVG paths for brand icons (lucide-react excludes brand icons) */
const SOCIALS = [
  {
    label: "LinkedIn",
    href: "#",
    svg: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
        <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "#",
    svg: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
      </svg>
    ),
  },
];

const ease: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

/* ─── Footer link ────────────────────────────────────────── */
function FooterLink({ label, href }: { label: string; href: string }) {
  return (
    <a
      href={href}
      className="block text-[13px] leading-[1.6] transition-colors duration-200 hover:text-white"
      style={{ color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-inter)" }}
    >
      {label}
    </a>
  );
}

/* ─── Main Footer ────────────────────────────────────────── */
export default function Footer() {
  return (
    <footer
      className="relative overflow-hidden"
      style={{ background: "#111110" }}
    >
      {/* Top rule */}
      <div className="h-px w-full" style={{ background: "linear-gradient(to right, transparent, rgba(193,154,107,0.18), transparent)" }} />

      {/* ── Main content ── */}
      <div className="w-full mx-auto px-12 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[3fr_2fr_3fr_2fr] gap-12 lg:gap-8 mb-16">

          {/* Brand block */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease }}
          >
            {/* Logo mark */}
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-9 h-9 rounded-[4px] flex items-center justify-center shrink-0"
                style={{ background: "rgba(193,154,107,0.18)", border: "1px solid rgba(193,154,107,0.30)" }}
              >
                <span
                  className="text-brand-amber font-bold text-[13px]"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  D&A
                </span>
              </div>
              <div>
                <p
                  className="text-white font-semibold text-[15px] leading-none"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  Dalal & Associates
                </p>
                <p
                  className="text-[10px] tracking-[0.14em] uppercase mt-1"
                  style={{ color: "rgba(255,255,255,0.28)", fontFamily: "var(--font-inter)" }}
                >
                  Est. Pune, 1999
                </p>
              </div>
            </div>

            <p
              className="text-[13.5px] leading-[1.85] mb-8"
              style={{ color: "rgba(255,255,255,0.32)", maxWidth: "30ch", fontFamily: "var(--font-inter)" }}
            >
              Pune&rsquo;s trusted wholesale supplier of plywood, laminates,
              veneers and specialty boards — quality you can verify, pricing
              that makes sense.
            </p>

            {/* Social icons */}
            <div className="flex gap-3">
              {SOCIALS.map(({ svg, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-[3px] flex items-center justify-center transition-all duration-200 hover:bg-white/10"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "rgba(255,255,255,0.40)",
                  }}
                >
                  {svg}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease, delay: 0.06 }}
          >
            <p
              className="text-[10.5px] tracking-[0.24em] uppercase font-semibold mb-5"
              style={{ color: "#C19A6B", fontFamily: "var(--font-inter)" }}
            >
              Quick Links
            </p>
            <div className="flex flex-col gap-2.5">
              {QUICK_LINKS.map(({ label, href }) => (
                <FooterLink key={label} label={label} href={href} />
              ))}
            </div>
          </motion.div>

          {/* Products */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease, delay: 0.10 }}
          >
            <p
              className="text-[10.5px] tracking-[0.24em] uppercase font-semibold mb-5"
              style={{ color: "#C19A6B", fontFamily: "var(--font-inter)" }}
            >
              Our Products
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2.5">
              {PRODUCTS.map((product) => (
                <FooterLink key={product} label={product} href="#products" />
              ))}
            </div>
          </motion.div>

          {/* Contact CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease, delay: 0.14 }}
          >
            <p
              className="text-[10.5px] tracking-[0.24em] uppercase font-semibold mb-5"
              style={{ color: "#C19A6B", fontFamily: "var(--font-inter)" }}
            >
              Get In Touch
            </p>

            <div className="flex flex-col gap-4 mb-8">
              <a
                href="tel:+919999999999"
                className="text-[13.5px] leading-[1.6] transition-colors duration-200 hover:text-white"
                style={{ color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-inter)" }}
              >
                +91 99999 99999
              </a>
              <a
                href="mailto:info@dalalassociates.in"
                className="text-[13.5px] leading-[1.6] transition-colors duration-200 hover:text-white"
                style={{ color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-inter)" }}
              >
                info@dalalassociates.in
              </a>
              <p
                className="text-[13px] leading-[1.6]"
                style={{ color: "rgba(255,255,255,0.25)", fontFamily: "var(--font-inter)" }}
              >
                Timber Market, Pune – 411001
              </p>
            </div>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/919999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[3px] text-[11px] tracking-[0.14em] uppercase font-semibold transition-all duration-250"
              style={{
                background: "rgba(193,154,107,0.12)",
                border: "1px solid rgba(193,154,107,0.25)",
                color: "#C19A6B",
                fontFamily: "var(--font-inter)",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = "rgba(193,154,107,0.20)";
                el.style.borderColor = "rgba(193,154,107,0.45)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = "rgba(193,154,107,0.12)";
                el.style.borderColor = "rgba(193,154,107,0.25)";
              }}
            >
              <ArrowUpRight size={13} />
              WhatsApp Us
            </a>
          </motion.div>

        </div>

        {/* ── Bottom bar ── */}
        <div
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-8"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <p
            className="text-[11px]"
            style={{ color: "rgba(255,255,255,0.18)", fontFamily: "var(--font-inter)" }}
          >
            © {new Date().getFullYear()} Dalal & Associates. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            {["Privacy Policy", "Terms of Service"].map((link) => (
              <a
                key={link}
                href="#"
                className="text-[11px] transition-colors duration-200 hover:text-white/50"
                style={{ color: "rgba(255,255,255,0.18)", fontFamily: "var(--font-inter)" }}
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

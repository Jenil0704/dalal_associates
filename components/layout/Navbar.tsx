"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { motion } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";

gsap.registerPlugin(ScrollTrigger);

const NAV_LINKS = [
  { label: "Products",  href: "#products" },
  { label: "About",    href: "#about"    },
  { label: "Why Us",   href: "#why-us"   },
  { label: "Contact",  href: "#contact"  },
];

export default function Navbar() {
  const navRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const nav = navRef.current;
    if (!nav) return;

    ScrollTrigger.create({
      start: "top+=80 top",
      onEnter: () => {
        gsap.to(nav, {
          backgroundColor: "rgba(28, 25, 23, 0.97)",
          backdropFilter: "blur(12px)",
          boxShadow: "0 1px 24px rgba(0,0,0,0.35)",
          duration: 0.4,
          ease: "power2.out",
        });
      },
      onLeaveBack: () => {
        gsap.to(nav, {
          backgroundColor: "transparent",
          backdropFilter: "blur(0px)",
          boxShadow: "none",
          duration: 0.4,
          ease: "power2.out",
        });
      },
    });
  }, []);

  return (
    <motion.div
      ref={navRef}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="fixed top-0 left-0 right-0 z-50 px-6 lg:px-12 py-7 flex items-center justify-between"
      style={{ backgroundColor: "transparent" }}
    >
      {/* ── Logo ── */}
      <a href="#" className="flex items-center gap-3 group" aria-label="Dalal & Associates home">
        <div className="w-9 h-9 rounded bg-brand-amber flex items-center justify-center shrink-0 shadow-lg group-hover:bg-brand-gold transition-colors duration-300">
          <span
            className="text-white font-bold text-sm leading-none"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            D&amp;A
          </span>
        </div>
        <div className="flex flex-col leading-none">
          <span
            className="text-white text-base font-semibold tracking-wide"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Dalal &amp; Associates
          </span>
          <span className="text-brand-amber text-[10px] tracking-[0.18em] uppercase font-medium mt-0.5">
            Plywood &amp; Laminates
          </span>
        </div>
      </a>

      {/* ── Desktop Nav Links ── */}
      <nav className="hidden md:flex items-center gap-8">
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="text-white/80 hover:text-brand-gold text-sm font-medium tracking-wide transition-colors duration-200 relative group"
          >
            {link.label}
            <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-brand-gold group-hover:w-full transition-all duration-300" />
          </a>
        ))}
      </nav>

      {/* ── Desktop CTA ── */}
      <div className="hidden md:flex items-center gap-3">
        <a
          href="tel:+91XXXXXXXXXX"
          className="flex items-center gap-1.5 text-white/70 hover:text-brand-gold text-sm transition-colors duration-200"
        >
          <Phone size={14} />
          <span>Call Us</span>
        </a>
        <Button
          render={<a href="#quote" />}
          className="bg-brand-amber hover:bg-brand-gold text-white border-0 rounded-full px-6 py-2 text-sm font-semibold shadow-lg hover:shadow-brand-amber/30 transition-all duration-300"
        >
          Get a Quote
        </Button>
      </div>

      {/* ── Mobile Menu ── */}
      <Sheet>
        <SheetTrigger
          render={
            <button
              aria-label="Open menu"
              className="md:hidden text-white hover:text-brand-gold transition-colors"
            />
          }
        >
          <Menu size={24} />
        </SheetTrigger>

        <SheetContent
          side="right"
          showCloseButton={false}
          className="w-72 bg-brand-charcoal border-l border-white/10 p-0"
        >
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded bg-brand-amber flex items-center justify-center">
                  <span
                    className="text-white font-bold text-xs"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    D&amp;A
                  </span>
                </div>
                <span
                  className="text-white font-semibold text-sm"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  Dalal &amp; Associates
                </span>
              </div>
              <SheetClose
                render={
                  <button className="text-white/60 hover:text-white transition-colors" />
                }
              >
                <X size={20} />
              </SheetClose>
            </div>

            {/* Links */}
            <nav className="flex flex-col px-6 py-8 gap-1 flex-1">
              {NAV_LINKS.map((link, i) => (
                <SheetClose
                  key={link.href}
                  render={
                    <a
                      href={link.href}
                      className="text-white/75 hover:text-brand-gold text-base font-medium py-3 border-b border-white/5 hover:border-brand-amber/30 transition-all duration-200 flex items-center justify-between group"
                      style={{ transitionDelay: `${i * 40}ms` }}
                    />
                  }
                >
                  {link.label}
                  <span className="text-brand-amber/0 group-hover:text-brand-amber transition-colors duration-200">
                    ›
                  </span>
                </SheetClose>
              ))}
            </nav>

            {/* Mobile CTA */}
            <div className="px-6 pb-8 flex flex-col gap-3">
              <SheetClose
                render={
                  <Button
                    render={<a href="#quote" />}
                    className="w-full bg-brand-amber hover:bg-brand-gold text-white rounded-full py-3 font-semibold transition-all duration-300"
                  />
                }
              >
                Get a Quote
              </SheetClose>
              <a
                href="tel:+91XXXXXXXXXX"
                className="flex items-center justify-center gap-2 text-white/60 hover:text-brand-gold text-sm transition-colors"
              >
                <Phone size={14} />
                Call Us Now
              </a>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </motion.div>
  );
}

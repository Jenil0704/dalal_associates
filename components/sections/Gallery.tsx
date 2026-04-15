"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";

const galleryItems = [
    {
        id: 1,
        title: "The Sullivans' Home",
        desc: "Aesthetic and modern design — the Sullivan family home is a cool example of premium materials at work.",
        image: "/laminates_2.jpg"
    },
    {
        id: 2,
        title: "Modern Offices",
        desc: "Contemporary spaces crafted with premium veneers for a professional, timeless aesthetic.",
        image: "/veneer.jpg"
    },
    {
        id: 3,
        title: "Luxury Residences",
        desc: "Built with the highest grade plywood and elegant finishes that stand the test of time.",
        image: "/plywood_2.jpg"
    },
    {
        id: 4,
        title: "Minimalist Structures",
        desc: "Combining clean lines and architectural precision with durable, quality materials.",
        image: "/construction.jpg"
    },
    {
        id: 5,
        title: "Aesthetic Interiors",
        desc: "Custom decorative panels to bring an unforgettable aesthetic experience to every room.",
        image: "/decorative_panel.jpg"
    },
    {
        id: 6,
        title: "Timeless Flooring",
        desc: "Elegant and versatile floor coverings that blend smoothly with any design language.",
        image: "/floor_coverings.jpg"
    }
];

export default function Gallery() {
    const [activeIndex, setActiveIndex] = useState(0);
    const trackRef = useRef<HTMLDivElement>(null);

    const scrollPrev = () => setActiveIndex((i) => Math.max(0, i - 1));
    const scrollNext = () => setActiveIndex((i) => Math.min(galleryItems.length - 1, i + 1));

    return (
        <section id="gallery" className="bg-white py-24 pb-32 overflow-hidden">
            {/* Header */}
            <div className="w-full mx-auto px-6 lg:px-12 2xl:px-0 w-full">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-8 lg:gap-0 pl-0 2xl:pl-12">
                    <h2
                        className="text-[#1A1A1A] text-[2.5rem] md:text-5xl lg:text-[4.5rem] font-medium leading-[1.05] tracking-[-0.02em] max-w-[28ch]"
                        style={{ fontFamily: "var(--font-manrope)",
                            fontSize: "clamp(1.9rem, 3.5vw, 2.8rem)"
                         }}
                    >
                        Bring an unforgettable{" "}
                        aesthetic experience
                    </h2>

                    <div className="flex flex-col items-start lg:items-end gap-10 max-w-sm 2xl:pr-12">
                        <p
                            className="text-[#666666] text-[15px] lg:text-[16px] leading-[1.6] max-w-[34ch] mr-auto lg:mr-0"
                            style={{ fontFamily: "var(--font-manrope)" }}
                        >
                            Presents an elegant and contemporary atmosphere, with a blend of minimalist design
                        </p>

                        <div className="flex items-center gap-3">
                            <button
                                onClick={scrollPrev}
                                disabled={activeIndex === 0}
                                className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center text-gray-400 hover:text-gray-800 hover:border-gray-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
                                aria-label="Previous"
                            >
                                <ArrowLeft className="w-5 h-5" strokeWidth={1} />
                            </button>
                            <button
                                onClick={scrollNext}
                                disabled={activeIndex === galleryItems.length - 1}
                                className="w-12 h-12 rounded-full border border-[#1A1A1A] flex items-center justify-center text-[#1A1A1A] hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
                                aria-label="Next"
                            >
                                <ArrowRight className="w-5 h-5" strokeWidth={1} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Accordion carousel — pure CSS flex, no scroll library */}
            <div className="pl-6 lg:pl-12">
                <div
                    ref={trackRef}
                    className="flex gap-2 lg:gap-3"
                    // Prevent layout shift during transition by keeping total width stable
                    style={{ alignItems: "stretch" }}
                >
                    {galleryItems.map((item, index) => {
                        const isActive = activeIndex === index;

                        return (
                            <div
                                key={item.id}
                                onClick={() => setActiveIndex(index)}
                                className="relative overflow-hidden shrink-0 cursor-pointer"
                                style={{
                                    height: "clamp(380px, 55vw, 640px)",
                                    // Active card: wide. Inactive: narrow strip.
                                    // transition on width (not flex-basis) is more reliable cross-browser
                                    width: isActive ? "clamp(300px, 52vw, 780px)" : "clamp(60px, 9vw, 130px)",
                                    transition: "width 0.65s cubic-bezier(0.77, 0, 0.175, 1)",
                                }}
                            >
                                {/* Image */}
                                <div className="absolute inset-0">
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        className="object-cover"
                                        style={{
                                            transform: isActive ? "scale(1.0)" : "scale(1.1)",
                                            transition: "transform 1.2s cubic-bezier(0.77, 0, 0.175, 1)",
                                        }}
                                        sizes="(max-width: 768px) 90vw, 60vw"
                                        priority={index === 0}
                                    />
                                </div>

                                {/* Dark gradient — active only */}
                                <div
                                    className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent"
                                    style={{
                                        opacity: isActive ? 1 : 0,
                                        transition: "opacity 0.5s ease 0.1s",
                                    }}
                                />

                                {/* Inactive dim overlay */}
                                <div
                                    className="absolute inset-0 bg-black/30"
                                    style={{
                                        opacity: isActive ? 0 : 1,
                                        transition: "opacity 0.5s ease",
                                    }}
                                />

                                {/* Active: bottom text content */}
                                <div
                                    className="absolute bottom-0 left-0 w-full p-8 md:p-10 flex justify-between items-end"
                                    style={{
                                        opacity: isActive ? 1 : 0,
                                        transform: isActive ? "translateY(0)" : "translateY(12px)",
                                        transition: "opacity 0.45s ease 0.2s, transform 0.45s ease 0.2s",
                                        pointerEvents: isActive ? "auto" : "none",
                                    }}
                                >
                                    <div className="text-white" style={{ maxWidth: "75%" }}>
                                        <h3
                                            className="text-[1.2rem] md:text-[1.5rem] font-normal mb-1.5 leading-snug"
                                            style={{ fontFamily: "var(--font-manrope)" }}
                                        >
                                            {item.title}
                                        </h3>
                                        <p
                                            className="text-white/70 text-[12px] md:text-[13px] leading-relaxed font-light line-clamp-2"
                                            style={{ fontFamily: "var(--font-manrope)" }}
                                        >
                                            {item.desc}
                                        </p>
                                    </div>
                                    <div className="w-9 h-9 md:w-10 md:h-10 rounded-full border border-white/50 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300 shrink-0">
                                        <ArrowUpRight className="w-4 h-4" strokeWidth={1.5} />
                                    </div>
                                </div>

                                {/* Inactive: vertical rotated label */}
                                <div
                                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                                    style={{
                                        opacity: isActive ? 0 : 1,
                                        transition: "opacity 0.4s ease",
                                    }}
                                >
                                    <span
                                        className="text-white/80 font-semibold tracking-[0.18em] uppercase whitespace-nowrap"
                                        style={{
                                            writingMode: "vertical-rl",
                                            fontSize: "clamp(8px, 0.9vw, 11px)",
                                            fontFamily: "var(--font-manrope)",
                                        }}
                                    >
                                        {item.title}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Dot indicators */}
                <div className="flex items-center gap-2 mt-6 pl-1">
                    {galleryItems.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setActiveIndex(i)}
                            className="rounded-full transition-all duration-500"
                            style={{
                                width: activeIndex === i ? "24px" : "6px",
                                height: "6px",
                                backgroundColor: activeIndex === i ? "#1A1A1A" : "#D1D1D1",
                            }}
                            aria-label={`Go to slide ${i + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

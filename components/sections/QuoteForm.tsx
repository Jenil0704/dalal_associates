"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Send, Upload, CheckCircle, X } from "lucide-react";

/* ─── Schema ─────────────────────────────────────────────── */
const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z
    .string()
    .min(10, "Enter a valid 10-digit mobile number")
    .max(10, "Enter a valid 10-digit mobile number")
    .regex(/^\d+$/, "Only digits allowed"),
  city: z.string().min(2, "City is required"),
  category: z.string().min(1, "Please select a product category"),
  message: z.string().min(10, "Please describe your requirement (min 10 characters)"),
});

type FormData = z.infer<typeof schema>;

/* ─── Product categories ─────────────────────────────────── */
const CATEGORIES = [
  "Structural Plywood",
  "Commercial Plywood",
  "Marine Plywood",
  "Natural Veneers",
  "Decorative Laminates",
  "Particle Boards / MDF",
  "Armor Boards (Flameproof)",
  "Floor Coverings",
  "Adhesives & Finishes",
  "Multiple / Other",
];

/* ─── Ease ───────────────────────────────────────────────── */
const ease: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.65, ease, delay },
  };
}

/* ─── Input component ────────────────────────────────────── */
function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        className="text-[11px] tracking-[0.20em] uppercase font-medium"
        style={{ color: "#C19A6B", fontFamily: "var(--font-inter)" }}
      >
        {label}
      </label>
      {children}
      {error && (
        <p className="text-[11px] text-red-400" style={{ fontFamily: "var(--font-inter)" }}>
          {error}
        </p>
      )}
    </div>
  );
}

const inputClass =
  "w-full bg-white/[0.04] border border-white/10 rounded-[3px] px-4 py-3 text-white/80 text-[14px] outline-none transition-all duration-200 placeholder:text-white/20 focus:border-brand-amber focus:bg-white/[0.07]";

/* ─── Main Section ───────────────────────────────────────── */
export default function QuoteForm() {
  const [submitted, setSubmitted] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  function buildWhatsAppMsg(data: FormData) {
    return encodeURIComponent(
      `*New Quote Request — Dalal & Associates*\n\n` +
        `*Name:* ${data.name}\n` +
        `*Phone:* ${data.phone}\n` +
        `*City:* ${data.city}\n` +
        `*Category:* ${data.category}\n` +
        `*Requirement:* ${data.message}` +
        (fileName ? `\n*Attachment note:* ${fileName}` : "")
    );
  }

  function onSubmit(data: FormData) {
    const msg = buildWhatsAppMsg(data);
    /* Replace 91XXXXXXXXXX with the actual WhatsApp business number */
    window.open(`https://wa.me/919999999999?text=${msg}`, "_blank");
    setSubmitted(true);
    reset();
    setFileName(null);
  }

  return (
    <section
      id="quote"
      className="relative overflow-hidden"
      style={{
        background: `
          radial-gradient(ellipse 70% 55% at 90% 50%, rgba(93,64,55,0.22) 0%, transparent 60%),
          #1C1917
        `,
      }}
    >
      {/* Top rule */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-amber/20 to-transparent" />

      <div className="w-full mx-auto px-12 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-16 lg:gap-24 items-start">

          {/* ── LEFT: Copy ── */}
          <div className="lg:sticky lg:top-24">
            <motion.p
              {...fadeUp(0)}
              className="text-brand-amber text-[11px] tracking-[0.30em] uppercase font-medium mb-8"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Get a Quote
            </motion.p>

            <motion.h2
              {...fadeUp(0.07)}
              className="text-white leading-[1.15] mb-6"
              style={{
                fontFamily: "var(--font-manrope)",
                fontSize: "clamp(2rem, 3.8vw, 3rem)",
                fontWeight: 600,
              }}
            >
              Tell us what you need.{" "}
              <span style={{ color: "#C19A6B" }}>We&rsquo;ll handle the rest.</span>
            </motion.h2>

            <motion.p
              {...fadeUp(0.13)}
              className="leading-[1.85] mb-10"
              style={{
                color: "rgba(255,255,255,0.40)",
                fontSize: "14.5px",
                maxWidth: "38ch",
                fontFamily: "var(--font-inter)",
              }}
            >
              Whether you&rsquo;re a contractor sourcing for a single project or a
              dealer placing a bulk order — fill in your requirement and we&rsquo;ll
              reach out within hours via WhatsApp or phone.
            </motion.p>

            {/* Info cards */}
            <motion.div {...fadeUp(0.18)} className="flex flex-col gap-4">
              {[
                { label: "Response Time", value: "Within 4 hours" },
                { label: "Minimum Order", value: "No minimums" },
                { label: "Delivery", value: "Pan-Pune & nearby" },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center justify-between py-3 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                  <span
                    className="text-[11px] tracking-[0.16em] uppercase"
                    style={{ color: "rgba(255,255,255,0.30)", fontFamily: "var(--font-inter)" }}
                  >
                    {label}
                  </span>
                  <span
                    className="text-[13px] font-medium"
                    style={{ color: "rgba(255,255,255,0.70)", fontFamily: "var(--font-inter)" }}
                  >
                    {value}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT: Form ── */}
          <motion.div {...fadeUp(0.1)}>
            {submitted ? (
              /* Success state */
              <div
                className="flex flex-col items-center justify-center gap-5 py-20 px-8 rounded-[4px] text-center"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(193,154,107,0.20)" }}
              >
                <CheckCircle size={44} className="text-brand-amber" />
                <h3
                  className="text-white text-xl font-semibold"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  Request Sent!
                </h3>
                <p
                  className="text-[13.5px] max-w-[30ch] leading-relaxed"
                  style={{ color: "rgba(255,255,255,0.40)", fontFamily: "var(--font-inter)" }}
                >
                  Your WhatsApp message has been pre-filled and sent. Our team will
                  respond shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-2 text-[11px] tracking-[0.16em] uppercase text-brand-amber hover:text-white transition-colors duration-200"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  Submit Another
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="rounded-[4px] p-8 flex flex-col gap-6"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
              >
                {/* Row 1: Name + Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field label="Full Name" error={errors.name?.message}>
                    <input
                      {...register("name")}
                      placeholder="e.g. Rahul Sharma"
                      className={inputClass}
                      style={{ fontFamily: "var(--font-inter)" }}
                    />
                  </Field>
                  <Field label="Mobile Number" error={errors.phone?.message}>
                    <input
                      {...register("phone")}
                      placeholder="10-digit number"
                      inputMode="numeric"
                      maxLength={10}
                      className={inputClass}
                      style={{ fontFamily: "var(--font-inter)" }}
                    />
                  </Field>
                </div>

                {/* Row 2: City + Category */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field label="City" error={errors.city?.message}>
                    <input
                      {...register("city")}
                      placeholder="e.g. Pune"
                      className={inputClass}
                      style={{ fontFamily: "var(--font-inter)" }}
                    />
                  </Field>

                  <Field label="Product Category" error={errors.category?.message}>
                    <div className="relative">
                      <select
                        {...register("category")}
                        className={inputClass + " appearance-none pr-10 cursor-pointer"}
                        style={{
                          fontFamily: "var(--font-inter)",
                          background: "rgba(255,255,255,0.04)",
                          color: "rgba(255,255,255,0.80)",
                        }}
                      >
                        <option value="" style={{ background: "#1C1917" }}>Select category</option>
                        {CATEGORIES.map((c) => (
                          <option key={c} value={c} style={{ background: "#1C1917" }}>
                            {c}
                          </option>
                        ))}
                      </select>
                      {/* Chevron icon */}
                      <span
                        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2"
                        style={{ color: "rgba(255,255,255,0.25)" }}
                      >
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                          <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                    </div>
                  </Field>
                </div>

                {/* Requirement */}
                <Field label="Your Requirement" error={errors.message?.message}>
                  <textarea
                    {...register("message")}
                    rows={4}
                    placeholder="e.g. Need 200 sheets of 19mm commercial plywood for a residential project in Kothrud…"
                    className={inputClass + " resize-none"}
                    style={{ fontFamily: "var(--font-inter)" }}
                  />
                </Field>

                {/* File upload */}
                <div className="flex flex-col gap-1.5">
                  <label
                    className="text-[11px] tracking-[0.20em] uppercase font-medium"
                    style={{ color: "#C19A6B", fontFamily: "var(--font-inter)" }}
                  >
                    Attach File{" "}
                    <span style={{ color: "rgba(255,255,255,0.20)", textTransform: "none", letterSpacing: 0 }}>
                      (optional — drawings, BOQ, etc.)
                    </span>
                  </label>

                  <label
                    className="flex items-center gap-3 px-4 py-3 rounded-[3px] border border-dashed cursor-pointer transition-all duration-200 hover:border-brand-amber/40 hover:bg-white/[0.04]"
                    style={{
                      borderColor: "rgba(255,255,255,0.12)",
                      fontFamily: "var(--font-inter)",
                    }}
                  >
                    <Upload size={15} className="text-brand-amber shrink-0" />
                    {fileName ? (
                      <span className="flex-1 text-[13px] truncate" style={{ color: "rgba(255,255,255,0.60)" }}>
                        {fileName}
                      </span>
                    ) : (
                      <span className="text-[13px]" style={{ color: "rgba(255,255,255,0.25)" }}>
                        Click to upload (PDF, JPG, PNG — max 10 MB)
                      </span>
                    )}
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png,.dwg"
                      className="sr-only"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        setFileName(file ? file.name : null);
                      }}
                    />
                    {fileName && (
                      <button
                        type="button"
                        onClick={(e) => { e.preventDefault(); setFileName(null); }}
                        className="shrink-0 text-white/30 hover:text-white/60 transition-colors"
                      >
                        <X size={13} />
                      </button>
                    )}
                  </label>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center justify-center gap-2.5 w-full py-3.5 rounded-[3px] font-semibold text-[13px] tracking-[0.10em] uppercase transition-all duration-300 disabled:opacity-50"
                  style={{
                    background: "linear-gradient(135deg, #C19A6B 0%, #A8845A 100%)",
                    color: "#fff",
                    fontFamily: "var(--font-inter)",
                    boxShadow: "0 4px 20px rgba(193,154,107,0.25)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.boxShadow =
                      "0 6px 28px rgba(193,154,107,0.40)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.boxShadow =
                      "0 4px 20px rgba(193,154,107,0.25)";
                  }}
                >
                  <Send size={14} />
                  Send via WhatsApp
                </button>

                <p
                  className="text-center text-[11px]"
                  style={{ color: "rgba(255,255,255,0.18)", fontFamily: "var(--font-inter)" }}
                >
                  Your details are only shared with our team. No spam, ever.
                </p>
              </form>
            )}
          </motion.div>

        </div>
      </div>

      {/* Bottom rule */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-amber/15 to-transparent" />
    </section>
  );
}

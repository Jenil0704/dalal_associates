import type { Metadata } from "next";
import { Noto_Serif, Manrope, Geist_Mono, DM_Sans } from "next/font/google";
import LenisProvider from "@/components/providers/LenisProvider";
import "./globals.css";

/* ── Noto Serif → headings (var(--font-playfair) is aliased to this) ── */
const notoSerif = Noto_Serif({
  variable: "--font-noto-serif",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

/* ── Manrope → body / UI (var(--font-inter) is aliased to this) ── */
const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Dalal & Associates — Plywood, Laminates & Veneers | Pune",
  description:
    "Pune's trusted wholesale and retail supplier of premium plywood, laminates, veneers, particle boards, and construction materials. Serving contractors, interior designers & builders since decades.",
  keywords: [
    "plywood supplier Pune",
    "laminates dealer Pune",
    "veneers wholesale Pune",
    "Greenlam laminates Pune",
    "construction materials Pune",
    "Dalal Associates",
    "bulk plywood order",
    "interior materials Pune",
  ],
  openGraph: {
    title: "Dalal & Associates — Premium Building Materials, Pune",
    description:
      "Wholesale & retail supplier of plywood, laminates, veneers and construction materials in Pune, Maharashtra.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${notoSerif.variable} ${manrope.variable} ${geistMono.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}

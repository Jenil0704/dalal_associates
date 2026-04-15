import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroGsap from "@/components/sections/HeroGsap";
import About from "@/components/sections/About";
import Gallery from "@/components/sections/Gallery";
import Products from "@/components/sections/Products";
import Portfolio from "@/components/sections/Portfolio";
import WhyUs from "@/components/sections/WhyUs";
import QuoteForm from "@/components/sections/QuoteForm";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Navbar />
      <HeroGsap />
      <About />
      <Portfolio />
      <Products />
      <WhyUs />
      <Gallery />
      <QuoteForm />
      <Contact />
      <Footer />
    </main>
  );
}

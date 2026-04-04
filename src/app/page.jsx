// No "use client" — this is a Server Component.
// All section markup is now rendered to HTML on the server,
// making it fully readable by search crawlers.
// Client-side hooks are isolated in <ClientEffects />.
// Lenis smooth scroll is handled by <SmoothScroll /> in layout.jsx.

import ClientEffects from "@/components/ClientEffects";
import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import ClientsBar from "@/components/sections/ClientsBar";
import Breakthrough from "@/components/sections/Breakthrough";
import Pillars from "@/components/sections/Pillars";
import OmniSection from "@/components/sections/OmniSection";
import Stats from "@/components/sections/Stats";
import Domains from "@/components/sections/Domains";
import Services from "@/components/sections/Services";
import CaseStudies from "@/components/sections/CaseStudies";
import Partners from "@/components/sections/Partners";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import Overlays from "@/components/ui/Overlays";

export default function Home() {
  return (
    <>
      <ClientEffects />
      <Overlays />
      <Navbar />
      <main>
        <Hero />
        <ClientsBar />
        <Breakthrough />
        <Pillars />
        <OmniSection />
        <Stats />
        <Domains />
        <Services />
        <CaseStudies />
        <Partners />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

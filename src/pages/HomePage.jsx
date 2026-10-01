import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Atmosphere from "../components/Atmosphere";
import { scrollToSection } from "../lib/scrollToSection";
import Nav from "../components/Nav";
import Hero from "../components/Hero";
import AboutSection from "../components/AboutSection";
import ResearchSection from "../components/ResearchSection";
import ApplySection from "../components/ApplySection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";

export default function HomePage() {
  const location = useLocation();

  useEffect(() => {
    const id = location.hash.replace("#", "");
    if (!id) return;

    const timer = setTimeout(() => scrollToSection(id), 150);
    return () => clearTimeout(timer);
  }, [location.hash]);

  // The photon-swarm intro is gone: it held the page back for several seconds
  // before showing a single word, which is the opposite of a clean first
  // impression.
  return (
    <div className="relative min-h-screen bg-void text-fg">
      <Atmosphere />
      <Nav />
      <main className="relative z-10">
        <Hero />
        <AboutSection />
        <ResearchSection />
        <ApplySection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

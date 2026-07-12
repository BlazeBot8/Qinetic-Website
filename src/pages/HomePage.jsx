import { useEffect, useRef, useState } from "react";
import Atmosphere from "../components/Atmosphere";
import Nav from "../components/Nav";
import Hero from "../components/Hero";
import WhatSection from "../components/WhatSection";
import AboutSection from "../components/AboutSection";
import ResearchSection from "../components/ResearchSection";
import ApplySection from "../components/ApplySection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";
import QuantumIntro from "../components/QuantumIntro";

export default function HomePage() {
  const logoRef = useRef(null);
  const [intro, setIntro] = useState(true);

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;
    const id = setTimeout(() => {
      document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
    }, 100);
    return () => clearTimeout(id);
  }, []);

  return (
    <div className="relative min-h-screen bg-void text-fg">
      <Atmosphere />
      <Nav logoRef={logoRef} logoHidden={intro} />
      <main className="relative z-10">
        <Hero />
        <WhatSection />
        <AboutSection />
        <ResearchSection />
        <ApplySection />
        <ContactSection />
      </main>
      <Footer />
      {intro && (
        <QuantumIntro logoRef={logoRef} onDone={() => setIntro(false)} />
      )}
    </div>
  );
}

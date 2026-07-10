import { useRef, useState } from "react";
import Atmosphere from "./components/Atmosphere";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import WhatSection from "./components/WhatSection";
import AboutSection from "./components/AboutSection";
import ApplySection from "./components/ApplySection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import QuantumIntro from "./components/QuantumIntro";

export default function App() {
  const logoRef = useRef(null);
  const [intro, setIntro] = useState(true);

  return (
    <div className="relative min-h-screen bg-void text-fg">
      <Atmosphere />
      <Nav logoRef={logoRef} logoHidden={intro} />
      <main className="relative z-10">
        <Hero />
        <WhatSection />
        <AboutSection />
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

import { Reveal, RevealGroup, RevealItem } from "./Reveal";

const features = [
  {
    index: "01",
    title: "Rigorous & Reproducible Output",
    description:
      "Every result ships with code and a written record. Working implementations paired with full writeups, not just conclusions. If a result can't be rerun by someone outside the project, it isn't finished.",
  },
  {
    index: "02",
    title: "Cross-Disciplinary Review",
    description:
      "Every project gets read by someone outside its subfield. Physics-trained researchers check the ML, ML-trained researchers check the physics, before anything goes out the door.",
  },
  {
    index: "03",
    title: "Top-Tier or Nothing",
    description:
      "We target PRA, PRX Quantum, npj Quantum Information, and IEEE — not volume. Work is scoped and reviewed internally against the bar those venues require, rather than optimized for a fast publication count.",
  },
];

export default function WhatSection() {
  return (
    <section
      id="what"
      className="relative z-10 mx-auto max-w-[1200px] px-[clamp(1.25rem,5vw,3rem)] py-[clamp(4.375rem,10vw,8.125rem)]"
    >
      <div className="max-w-[660px]">
        <Reveal>
          <p className="section-index mb-5">[ 01 ]&nbsp;What we do</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="font-display text-[clamp(1.75rem,4.4vw,3.125rem)] font-bold leading-[1.05] tracking-[-0.02em] text-fg-hi">
            Research across the quantum–ML boundary
          </h2>
        </Reveal>
      </div>

      <RevealGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <RevealItem key={feature.index}>
            <article className="card-feature h-full">
              <p className="mb-2.5 font-display text-[0.6875rem] tracking-[0.2em] text-fg-faint">
                {feature.index}
              </p>
              <h3 className="mb-2.5 font-display text-[1.1875rem] font-bold tracking-[-0.01em] text-fg-hi">
                {feature.title}
              </h3>
              <p className="text-[0.9375rem] leading-relaxed text-[#9c93b4]">
                {feature.description}
              </p>
            </article>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}

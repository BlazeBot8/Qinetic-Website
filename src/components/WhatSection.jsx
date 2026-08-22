import { Reveal, RevealGroup, RevealItem } from "./Reveal";
import { Parallax } from "./Parallax";

// Original copy, restored verbatim from the repo's committed version.
const features = [
  {
    title: "Rigorous & Reproducible Output",
    description:
      "Every result ships with code and a written record. Working implementations paired with full writeups, not just conclusions. If a result can't be rerun by someone outside the project, it isn't finished.",
  },
  {
    title: "Cross-Disciplinary Review",
    description:
      "Every project gets read by someone outside its subfield. Physics-trained researchers check the ML, ML-trained researchers check the physics, before anything goes out the door.",
  },
  {
    title: "Top tier venues",
    description:
      "We target PRA, PRX Quantum, npj Quantum Information, and IEEE — not volume. Work is scoped and reviewed internally against the bar those venues require, rather than optimized for a fast publication count.",
  },
];

export default function WhatSection() {
  return (
    <section
      id="what"
      className="relative z-10 mx-auto max-w-[1200px] border-t border-violet-glow/10 px-[clamp(1.25rem,5vw,3rem)] py-[clamp(2.75rem,6vw,5rem)]"
    >
      <Parallax distance={34} className="max-w-[820px]">
        <Reveal>
          <p className="section-index mb-5">What we do</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="font-serif text-[clamp(1.875rem,4.4vw,3.125rem)] font-normal leading-[1.1] tracking-[-0.02em] text-fg-hi">
            How the work runs
          </h2>
        </Reveal>
      </Parallax>

      {/* full-width rule under the title, the divider from the reference layout */}
      <Reveal delay={0.12}>
        <span className="section-rule mt-[clamp(1.125rem,2.2vw,1.625rem)]" />
      </Reveal>

      <Parallax distance={-14}>
      <RevealGroup className="mt-[clamp(1.75rem,3.4vw,2.5rem)]">
        {features.map((feature) => (
          <RevealItem key={feature.title}>
            <article className="entry group grid gap-x-[clamp(1.5rem,4vw,3.5rem)] gap-y-3 py-[clamp(1.5rem,2.6vw,2rem)] md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
              <div>
                <h3 className="font-serif text-[clamp(1.25rem,2.2vw,1.5rem)] font-normal leading-snug tracking-[-0.015em] text-fg-hi transition-colors duration-300 group-hover:text-white">
                  {feature.title}
                </h3>
              </div>
              <p className="max-w-[62ch] text-[0.9375rem] leading-[1.75] text-fg-muted">
                {feature.description}
              </p>
            </article>
          </RevealItem>
        ))}
      </RevealGroup>
      </Parallax>
    </section>
  );
}

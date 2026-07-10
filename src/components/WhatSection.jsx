import { Reveal, RevealGroup, RevealItem } from "./Reveal";

const features = [
  {
    index: "01",
    title: "Quantum algorithms",
    description:
      "Designing and analyzing algorithms that exploit quantum advantage for real problems.",
    icon: (
      <svg width="46" height="46" viewBox="0 0 46 46" fill="none" aria-hidden>
        <circle cx="23" cy="23" r="6" fill="#C026D3" />
        <ellipse cx="23" cy="23" rx="20" ry="8" stroke="#8B5CF6" strokeWidth="1.5" />
        <ellipse
          cx="23"
          cy="23"
          rx="20"
          ry="8"
          stroke="#8B5CF6"
          strokeWidth="1.5"
          transform="rotate(60 23 23)"
        />
        <ellipse
          cx="23"
          cy="23"
          rx="20"
          ry="8"
          stroke="#8B5CF6"
          strokeWidth="1.5"
          transform="rotate(120 23 23)"
        />
      </svg>
    ),
  },
  {
    index: "02",
    title: "Machine intelligence",
    description:
      "Learning methods that scale — from representation to reasoning under uncertainty.",
    icon: (
      <svg width="46" height="46" viewBox="0 0 46 46" fill="none" aria-hidden>
        <circle cx="10" cy="12" r="4" fill="#8B5CF6" />
        <circle cx="36" cy="12" r="4" fill="#8B5CF6" />
        <circle cx="23" cy="34" r="4" fill="#C026D3" />
        <path
          d="M10 12L23 34L36 12M10 12H36"
          stroke="#8B5CF6"
          strokeWidth="1.5"
        />
      </svg>
    ),
  },
  {
    index: "03",
    title: "Hybrid systems",
    description:
      "Bridging classical and quantum compute into pipelines that ship and reproduce.",
    icon: (
      <svg width="46" height="46" viewBox="0 0 46 46" fill="none" aria-hidden>
        <rect x="7" y="7" width="14" height="14" rx="3" stroke="#8B5CF6" strokeWidth="1.5" />
        <rect x="25" y="25" width="14" height="14" rx="3" stroke="#C026D3" strokeWidth="1.5" />
        <path d="M21 14H32V25M25 32H14V21" stroke="#8B5CF6" strokeWidth="1.5" />
      </svg>
    ),
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
              <div className="mb-[1.375rem]">{feature.icon}</div>
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

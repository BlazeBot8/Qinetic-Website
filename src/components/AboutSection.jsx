import { Reveal } from "./Reveal";

const stats = [
  { value: "25+", label: "Researchers" },
  { value: "10", label: "Time zones" },
  { value: "30+", label: "Partner orgs / institutions" },
];

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative z-10 mx-auto max-w-[1200px] px-[clamp(1.25rem,5vw,3rem)] py-[clamp(3.125rem,8vw,6.875rem)]"
    >
      <div className="grid items-start gap-[clamp(1.875rem,5vw,4.5rem)] md:grid-cols-2">
        <div>
          <Reveal>
            <p className="section-index mb-5">[ 02 ]&nbsp;About us</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="font-display text-[clamp(1.625rem,4vw,2.875rem)] font-bold leading-[1.08] tracking-[-0.02em] text-fg-hi">
              A small lab with an outsized ambition
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-[1.625rem] max-w-[46ch] text-[clamp(0.9375rem,2vw,1.125rem)] leading-[1.65] text-fg-muted text-pretty">
              We&apos;re a distributed team of researchers and engineers pushing
              on the hardest questions in computation.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.12}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-gradient-stat font-display text-[clamp(1.75rem,4.6vw,2.625rem)] font-extrabold tracking-[-0.02em]">
                  {stat.value}
                </p>
                <p className="mt-1.5 font-display text-[0.6875rem] uppercase tracking-[0.14em] text-fg-dim">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

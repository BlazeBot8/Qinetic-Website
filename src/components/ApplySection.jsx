import { Arrow } from "./Brand";
import { Reveal } from "./Reveal";

const tags = [
  "Quantum information",
  "Deep learning",
  "Numerical methods",
  "Distributed systems",
  "Open source",
];

export default function ApplySection() {
  return (
    <section
      id="apply"
      className="relative z-10 mx-auto max-w-[1200px] px-[clamp(1.25rem,5vw,3rem)] py-[clamp(3.125rem,8vw,6.875rem)]"
    >
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-violet-glow/20 bg-[linear-gradient(160deg,rgba(124,58,237,0.16),rgba(192,38,211,0.06))] px-[clamp(2.25rem,6vw,4.5rem)] py-[clamp(2.25rem,6vw,4.5rem)] text-center backdrop-blur-xl">
          <div className="pointer-events-none absolute left-1/2 top-[-40%] h-[120%] w-[70%] -translate-x-1/2 bg-[radial-gradient(circle,rgba(192,38,211,0.35),transparent_65%)] blur-[50px]" />

          <div className="relative">
            <p className="section-index mb-5 text-[#d8b4fe]">[ 03 ]&nbsp;Apply</p>
            <h2 className="mx-auto max-w-[20ch] font-display text-[clamp(1.75rem,4.8vw,3.375rem)] font-extrabold uppercase leading-[1.04] tracking-[-0.02em] text-[#fbf9ff]">
              Join the next cohort
            </h2>
            <p className="mx-auto mt-[1.375rem] max-w-[50ch] text-[clamp(0.9375rem,2vw,1.125rem)] leading-relaxed text-[#c9bee0] text-pretty">
              Applications open on a rolling basis. If you think about hard
              problems for fun, we should talk.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-2.5">
              {tags.map((tag) => (
                <span key={tag} className="chip">
                  {tag}
                </span>
              ))}
            </div>

            <a
              href="#contact"
              className="btn-primary mt-9 px-9 py-[1.0625rem] text-[0.90625rem]"
            >
              Start application <Arrow />
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

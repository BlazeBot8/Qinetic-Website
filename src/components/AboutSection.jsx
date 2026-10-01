import { Reveal } from "./Reveal";
import { Parallax } from "./Parallax";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative z-10 mx-auto max-w-[1200px] px-[clamp(1.25rem,5vw,3rem)] pb-[clamp(1.75rem,4vw,3rem)] pt-[clamp(0.5rem,2vw,1.5rem)]"
    >
      {/* Same two-column rhythm as the entry rows below: title left, prose
          right. A single 860px column inside a 1200px container left the
          right third empty for no reason. */}
      <Parallax
        distance={26}
        className="grid gap-x-[clamp(1.5rem,4vw,3.5rem)] gap-y-4 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]"
      >
        <div>
        <Reveal>
          <p className="section-index mb-5">About</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="font-serif text-[clamp(1.875rem,4.4vw,3.125rem)] font-normal leading-[1.1] tracking-[-0.02em] text-fg-hi">
            Who we are
          </h2>
        </Reveal>
        </div>

        <div>
        {/* The figures read as prose rather than as a row of oversized numbers.
            A stat strip is one of the more recognisable filler patterns, and
            these are small enough to just say out loud. */}
        <Reveal delay={0.16}>
          <p className="max-w-[58ch] text-[clamp(0.9375rem,2vw,1.0625rem)] leading-[1.7] text-fg-muted md:mt-[2.375rem]">
            We are a distributed team of researchers and engineers working on
            the hardest questions in computation. Our team is made up of 25+
            members, split across 10 time zones.
          </p>
        </Reveal>
        </div>
      </Parallax>
    </section>
  );
}

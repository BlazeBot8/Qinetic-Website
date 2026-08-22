import { Reveal } from "./Reveal";
import { HeroScrub } from "./Parallax";
import { scrollToSection } from "../lib/scrollToSection";
import { TARGET_VENUES } from "../data/links";
import CircuitFigure from "./CircuitFigure";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative z-10 flex min-h-[80vh] items-center px-[clamp(1.25rem,5vw,4rem)] pb-[clamp(3rem,6vw,4.5rem)] pt-[clamp(6.5rem,13vh,9rem)]"
    >
      <HeroScrub className="w-full">
        <div className="mx-auto grid w-full max-w-[1200px] items-center gap-x-[clamp(2rem,5vw,4.5rem)] lg:grid-cols-[minmax(0,1fr)_minmax(0,0.58fr)]">
          <div>
          <Reveal>
            <p className="hero-eyebrow mb-[clamp(1.25rem,2.4vw,1.75rem)]">
              Remote QML research lab
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            {/* Serif, sentence case, no letterspacing. Set large, because in
                the reference layouts the headline is the only thing on screen
                that is allowed to be big. */}
            <h1 className="max-w-[20ch] font-serif text-[clamp(2.25rem,5.6vw,4.25rem)] font-normal leading-[1.08] tracking-[-0.02em] text-fg-hi">
              A remote lab working on quantum machine learning
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mt-[clamp(1.5rem,2.8vw,2rem)] max-w-[56ch] text-[clamp(1rem,2vw,1.125rem)] leading-[1.7] text-fg-muted">
              Our work sits where quantum information meets machine learning:
              simulation, noise on real hardware, and the way classical data is
              encoded into circuits. Whatever we find, the code that produced it
              goes out alongside it.
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-[clamp(1.75rem,3.4vw,2.5rem)] border-t border-violet-glow/15 pt-6">
              <p className="font-display text-[0.6875rem] uppercase tracking-[0.22em] text-fg-dim">
                Work targeted at
              </p>
              <ul className="mt-3.5 flex flex-wrap items-center gap-x-[clamp(1.25rem,3vw,2.5rem)] gap-y-3">
                {TARGET_VENUES.map((venue) => (
                  <li key={venue.name}>
                    <a
                      href={venue.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[clamp(0.875rem,1.5vw,0.9375rem)] text-fg underline decoration-white/20 underline-offset-[6px] transition-colors hover:text-violet-soft hover:decoration-violet-soft"
                    >
                      {venue.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.32}>
            <div className="mt-[clamp(1.75rem,3.4vw,2.5rem)] flex flex-wrap items-center gap-x-5 gap-y-3">
              {/* Occupies the slot a CTA would, but points at the section that
                  explains the closure instead of doing nothing at all. */}
              <a
                href="/#apply"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("apply");
                }}
                className="btn-closed"
              >
                Applications Closed
              </a>
              <p className="text-[0.9375rem] text-fg-dim">Check back soon.</p>
            </div>
          </Reveal>
          </div>

          {/* Fills the right half of the fold with figure linework rather than
              ornament: the ansatz shape the circuit work actually uses. */}
          <Reveal delay={0.4}>
            <CircuitFigure className="hidden lg:block" />
          </Reveal>
        </div>
      </HeroScrub>
    </section>
  );
}

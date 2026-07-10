import { motion } from "framer-motion";
import { Arrow } from "./Brand";
import { Reveal } from "./Reveal";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative z-10 flex min-h-screen flex-col items-center justify-center px-[clamp(1.25rem,5vw,2.5rem)] pb-[5.625rem] pt-[7.5rem] text-center"
    >
      <Reveal>
        <div className="hero-badge mb-8">
          <span className="h-[7px] w-[7px] animate-q-pulse rounded-full bg-magenta shadow-[0_0_10px_#C026D3]" />
          <span className="font-display text-[0.71875rem] uppercase tracking-[0.24em] text-violet-soft">
            Remote-first research lab
          </span>
        </div>
      </Reveal>

      <Reveal delay={0.08}>
        <h1 className="text-gradient mx-auto max-w-[18ch] font-display text-[clamp(2.125rem,6.4vw,5rem)] font-extrabold uppercase leading-[1.02] tracking-[-0.02em] text-balance">
          Computing at the edge of the quantum frontier
        </h1>
      </Reveal>

      <Reveal delay={0.16}>
        <p className="mx-auto mt-[1.875rem] max-w-[56ch] text-[clamp(1rem,2.2vw,1.25rem)] leading-relaxed text-fg-muted text-pretty">
          Where quantum information meets machine intelligence. We build the
          models, methods, and infrastructure for computation&apos;s next era.
        </p>
      </Reveal>

      <Reveal delay={0.24}>
        <div className="mt-[2.625rem] flex flex-wrap items-center justify-center gap-3.5">
          <a href="#apply" className="btn-primary">
            Apply Now <Arrow />
          </a>
          <a href="#what" className="btn-ghost">
            See our work
          </a>
        </div>
      </Reveal>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.9 }}
        className="absolute bottom-9 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-fg-faint"
      >
        <span className="font-display text-[0.65625rem] uppercase tracking-[0.3em]">
          Scroll
        </span>
        <span className="h-[34px] w-px bg-gradient-to-b from-violet to-transparent" />
      </motion.div>
    </section>
  );
}

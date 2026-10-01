import { Reveal } from "./Reveal";
import { Parallax } from "./Parallax";
import { APPLY_FORM_URL } from "../data/links";

export default function ApplySection() {
  return (
    <section
      id="apply"
      className="relative z-10 mx-auto max-w-[1200px] border-t border-violet-glow/10 px-[clamp(1.25rem,5vw,3rem)] py-[clamp(2.5rem,5.5vw,4.5rem)]"
    >
      <Parallax distance={24}>
        <div className="max-w-[54ch]">
          <Reveal>
            <p className="section-index mb-5">Applications</p>
          </Reveal>

          <Reveal delay={0.08}>
            <h2 className="font-serif text-[clamp(1.875rem,4.4vw,3.125rem)] font-normal leading-[1.1] tracking-[-0.02em] text-fg-hi">
              Applications are rolling
            </h2>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mt-[1.125rem] text-[clamp(0.9375rem,2vw,1.0625rem)] leading-[1.7] text-fg-muted">
              We review applications as they come in, with no fixed deadline.{" "}
              <a
                href={APPLY_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-fg underline decoration-violet-glow/40 underline-offset-4 transition-colors hover:decoration-violet-glow"
              >
                Apply here
              </a>
              .
            </p>
          </Reveal>
        </div>
      </Parallax>
    </section>
  );
}

import { Link } from "react-router-dom";
import { Reveal } from "./Reveal";
import { Parallax } from "./Parallax";
import { COHORTS, CURRENT_COHORT } from "../data/links";

export default function ApplySection() {
  return (
    <section
      id="apply"
      className="relative z-10 mx-auto max-w-[1200px] border-t border-violet-glow/10 px-[clamp(1.25rem,5vw,3rem)] py-[clamp(2.5rem,5.5vw,4.5rem)]"
    >
      <Parallax distance={24}>
        <div className="grid gap-[clamp(1.75rem,5vw,4rem)] md:grid-cols-[minmax(0,1fr)_auto]">
          <div className="max-w-[54ch]">
            <Reveal>
              <p className="section-index mb-5">Applications</p>
            </Reveal>

            <Reveal delay={0.08}>
              <h2 className="font-serif text-[clamp(1.875rem,4.4vw,3.125rem)] font-normal leading-[1.1] tracking-[-0.02em] text-fg-hi">
                Cohort {CURRENT_COHORT} is closed
              </h2>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="mt-[1.125rem] text-[clamp(0.9375rem,2vw,1.0625rem)] leading-[1.7] text-fg-muted">
                We are no longer taking applications. There is no date set for
                the next round yet. If you want to hear when it opens,{" "}
                <Link
                  to="/contact/email"
                  className="text-fg underline decoration-violet-glow/40 underline-offset-4 transition-colors hover:decoration-violet-glow"
                >
                  send us a note
                </Link>
                .
              </p>
            </Reveal>
          </div>

          {/* Both cohorts side by side: one number alone invites the question
              of what the other one was. */}
          <Reveal delay={0.24}>
            <dl className="min-w-[15rem] border-t border-violet-glow/15 pt-5 md:border-l md:border-t-0 md:pl-8 md:pt-0">
              <p className="font-display text-[0.6875rem] uppercase tracking-[0.22em] text-fg-dim">
                Acceptance rate
              </p>
              {COHORTS.map((cohort) => (
                <div
                  key={cohort.number}
                  className="mt-4 flex items-baseline justify-between gap-8 border-b border-violet-glow/10 pb-3"
                >
                  <dt className="font-display text-[0.875rem] tracking-[0.06em] text-fg-muted">
                    Cohort {cohort.number}
                  </dt>
                  <dd className="font-sans text-[1.375rem] font-bold tracking-[-0.02em] text-fg-hi">
                    {cohort.acceptanceRate}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </Parallax>
    </section>
  );
}

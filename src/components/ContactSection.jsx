import { Reveal } from "./Reveal";

const socials = [
  { label: "Email", content: "✉\u00a0Email", wide: true },
  { label: "X", content: "X", wide: false },
  { label: "LinkedIn", content: "in", wide: false },
  { label: "GitHub", content: "gh", wide: false },
];

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="relative z-10 mx-auto max-w-[1200px] px-[clamp(1.25rem,5vw,3rem)] pb-[clamp(2.5rem,6vw,4.375rem)] pt-[clamp(3.125rem,8vw,6.875rem)] text-center"
    >
      <Reveal>
        <p className="section-index mb-5">[ 04 ]&nbsp;Contact</p>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="mx-auto max-w-[16ch] font-display text-[clamp(1.75rem,4.6vw,3.125rem)] font-bold leading-[1.05] tracking-[-0.02em] text-fg-hi">
          Let&apos;s talk
        </h2>
      </Reveal>
      <Reveal delay={0.16}>
        <div className="mt-[2.125rem] flex flex-wrap justify-center gap-3">
          {socials.map(({ label, content, wide }) =>
            wide ? (
              <button
                key={label}
                type="button"
                aria-label={label}
                className="contact-pill"
              >
                {content}
              </button>
            ) : (
              <button
                key={label}
                type="button"
                aria-label={label}
                className="contact-icon"
              >
                {content}
              </button>
            )
          )}
        </div>
      </Reveal>
    </section>
  );
}

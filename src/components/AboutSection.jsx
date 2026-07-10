import { Reveal, RevealGroup, RevealItem } from "./Reveal";

const stats = [
  { value: "'24", label: "Founded" },
  { value: "12", label: "Researchers" },
  { value: "9", label: "Time zones" },
];

const team = [
  {
    initials: "AM",
    name: "A. Mercer",
    role: "Quantum algorithms",
    gradient: "from-violet to-magenta",
  },
  {
    initials: "KO",
    name: "K. Osei",
    role: "ML systems",
    gradient: "from-indigo to-violet",
  },
  {
    initials: "LF",
    name: "L. Faro",
    role: "Theory",
    gradient: "from-magenta to-violet",
  },
  {
    initials: "MR",
    name: "M. Reyes",
    role: "Infrastructure",
    gradient: "from-indigo to-magenta",
  },
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
              We&apos;re a distributed team of researchers and engineers pushing on
              the hardest questions in computation — organized around curiosity,
              open output, and deep focus rather than geography.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.12}>
          <div className="grid grid-cols-3 gap-4">
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

      <RevealGroup className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {team.map((member) => (
          <RevealItem key={member.name}>
            <article className="card-team">
              <div
                className={`mb-[1.125rem] flex h-[52px] w-[52px] items-center justify-center rounded-xl bg-gradient-to-br ${member.gradient} font-display text-base font-bold text-white`}
              >
                {member.initials}
              </div>
              <h3 className="font-display text-[0.9375rem] font-bold text-fg-hi">
                {member.name}
              </h3>
              <p className="mt-1 text-[0.84375rem] text-[#9c93b4]">{member.role}</p>
            </article>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}

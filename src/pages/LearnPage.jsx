import { Link } from "react-router-dom";
import LearnLayout, { PageTitle } from "../components/LearnLayout";
import Badge from "../components/Badge";
import SignInCard from "../components/SignInCard";
import { useAuth } from "../lib/auth";
import { useProgress } from "../hooks/useProgress";
import { MODULES } from "../data/learnContent";

function StatusLabel({ children, tone }) {
  return (
    <span
      className={`font-display text-[0.6875rem] uppercase tracking-[0.2em] ${
        tone === "done" ? "text-violet-soft" : "text-fg-dim"
      }`}
    >
      {children}
    </span>
  );
}

export default function LearnPage() {
  const { user, loading } = useAuth();
  const { badges, certificate } = useProgress();
  const earned = new Set(badges);
  const allDone = earned.size === MODULES.length;

  return (
    <LearnLayout>
      <PageTitle eyebrow="Learn" title="Qinetic Learn">
        Anyone can learn.
      </PageTitle>

      {!loading && !user && (
        <div className="mb-10">
          <SignInCard note="Sign in to save your progress, earn badges, and get your certificate." />
        </div>
      )}

      <span className="section-rule" />
      <div>
        {MODULES.map((m) => {
          const done = earned.has(m.id);
          const unlocked = Boolean(user) && (m.id === 1 || earned.has(m.id - 1));
          const inner = (
            <article className="entry group flex items-center gap-[clamp(1rem,3vw,2rem)] py-6">
              <Badge module={m.id} earned={done} size={72} />
              <div className="min-w-0 flex-1">
                <StatusLabel tone={done ? "done" : "idle"}>
                  Module {m.id}
                  {done ? " · Badge earned" : !unlocked ? " · Locked" : ""}
                </StatusLabel>
                <h3 className="mt-1 font-serif text-[clamp(1.25rem,2.4vw,1.5rem)] leading-snug text-fg-hi">
                  {m.title}
                </h3>
                <p className="mt-1 max-w-[56ch] text-[0.9375rem] leading-[1.7] text-fg-muted">
                  {m.blurb}
                </p>
              </div>
              {unlocked && (
                <span className="hidden font-display text-[0.8125rem] text-violet-soft sm:block">
                  {done ? "Review" : "Start"} →
                </span>
              )}
            </article>
          );
          return unlocked ? (
            <Link
              key={m.id}
              to={`/learn/module/${m.id}`}
              className="block no-underline"
            >
              {inner}
            </Link>
          ) : (
            <div key={m.id} className="opacity-70">
              {inner}
            </div>
          );
        })}

        <div className={allDone ? "" : "opacity-70"}>
          {(() => {
            const body = (
              <article className="entry flex items-center gap-[clamp(1rem,3vw,2rem)] py-6">
                <div
                  className={`flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-full border text-[1.5rem] ${
                    certificate
                      ? "border-violet-soft text-violet-soft"
                      : "border-white/15 text-fg-faint"
                  }`}
                  aria-hidden
                >
                  ★
                </div>
                <div className="min-w-0 flex-1">
                  <StatusLabel tone={certificate ? "done" : "idle"}>
                    Final assessment
                    {certificate ? " · Certified" : !allDone ? " · Locked" : ""}
                  </StatusLabel>
                  <h3 className="mt-1 font-serif text-[clamp(1.25rem,2.4vw,1.5rem)] leading-snug text-fg-hi">
                    Certificate exam
                  </h3>
                  <p className="mt-1 max-w-[56ch] text-[0.9375rem] leading-[1.7] text-fg-muted">
                    35 questions across all five modules. Pass to earn your
                    certificate.
                  </p>
                </div>
              </article>
            );
            if (certificate) {
              return (
                <Link to={`/certificate/${certificate.code}`} className="block no-underline">
                  {body}
                </Link>
              );
            }
            return allDone ? (
              <Link to="/learn/final" className="block no-underline">
                {body}
              </Link>
            ) : (
              body
            );
          })()}
        </div>
      </div>

      {user && (
        <p className="mt-8 text-[0.9375rem] text-fg-dim">
          <Link
            to="/learn/me"
            className="text-fg underline decoration-violet-glow/40 underline-offset-4 hover:decoration-violet-glow"
          >
            Your profile and badges
          </Link>
        </p>
      )}
    </LearnLayout>
  );
}

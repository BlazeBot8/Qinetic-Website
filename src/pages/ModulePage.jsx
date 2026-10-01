import { Link, Navigate, useParams } from "react-router-dom";
import LearnLayout, { PageTitle } from "../components/LearnLayout";
import QuizRunner from "../components/QuizRunner";
import Badge from "../components/Badge";
import SignInCard from "../components/SignInCard";
import { useAuth } from "../lib/auth";
import { useProgress } from "../hooks/useProgress";
import {
  MODULES,
  MODULE_PASS,
  MODULE_TOTAL,
  toEmbedUrl,
} from "../data/learnContent";

export default function ModulePage() {
  const { n } = useParams();
  const { user, loading } = useAuth();
  const progress = useProgress();

  const id = Number(n);
  const module = MODULES.find((m) => m.id === id);
  if (!module) return <Navigate to="/learn" replace />;

  const earned = new Set(progress.badges);
  const done = earned.has(id);
  const locked = id > 1 && !earned.has(id - 1);
  const embed = toEmbedUrl(module.videoUrl);
  const next = MODULES.find((m) => m.id === id + 1);

  if (loading || (user && progress.loading)) {
    return (
      <LearnLayout>
        <p className="text-fg-muted">Loading...</p>
      </LearnLayout>
    );
  }

  if (!user) {
    return (
      <LearnLayout>
        <PageTitle eyebrow={`Module ${id}`} title={module.title} />
        <SignInCard note="Sign in to watch this module and take the quiz." />
      </LearnLayout>
    );
  }

  if (locked) {
    return (
      <LearnLayout>
        <PageTitle eyebrow={`Module ${id}`} title={module.title}>
          This module is locked. Pass the Module {id - 1} quiz first.
        </PageTitle>
        <Link to={`/learn/module/${id - 1}`} className="btn-primary">
          Go to Module {id - 1}
        </Link>
      </LearnLayout>
    );
  }

  return (
    <LearnLayout>
      <div className="mb-3">
        <Link
          to="/learn"
          className="font-display text-[0.75rem] uppercase tracking-[0.18em] text-fg-dim no-underline hover:text-fg"
        >
          ← All modules
        </Link>
      </div>
      <div className="flex items-start justify-between gap-6">
        <PageTitle eyebrow={`Module ${id}`} title={module.title} />
        <div className="hidden sm:block">
          <Badge module={id} earned={done} size={88} />
        </div>
      </div>

      <div className="aspect-video w-full overflow-hidden border border-violet-glow/20 bg-void-deep">
        {embed ? (
          <iframe
            src={embed}
            title={`${module.title} video`}
            className="h-full w-full"
            allow="accelerometer; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        ) : (
          <div className="flex h-full items-center justify-center font-display text-[0.75rem] uppercase tracking-[0.22em] text-fg-dim">
            Video coming soon
          </div>
        )}
      </div>

      <section className="mt-[clamp(2rem,4vw,3rem)]">
        <p className="section-index mb-4">In this module</p>
        <ol className="space-y-2 text-[0.9375rem] text-fg-muted">
          {module.lessons.map((lesson, i) => (
            <li key={lesson} className="flex gap-3">
              <span className="font-display text-fg-dim">{String(i + 1).padStart(2, "0")}</span>
              <span>{lesson}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-[clamp(2rem,4vw,3rem)]">
        <p className="section-index mb-4">Summary</p>
        <span className="section-rule mb-6" />
        <div className="max-w-[62ch] space-y-4 text-[1rem] leading-[1.8] text-fg-muted">
          {module.summary.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </section>

      <section className="mt-[clamp(2rem,4vw,3rem)]">
        <p className="section-index mb-4">Quiz</p>
        <span className="section-rule mb-6" />
        <QuizRunner
          kind="module"
          module={id}
          passMark={MODULE_PASS}
          total={MODULE_TOTAL}
          startLabel={done ? "Retake quiz" : "Take the quiz"}
          onFinished={() => progress.refresh()}
          renderAfter={(result) =>
            result.badge ? (
              <div className="my-6 flex items-center gap-5 border border-violet-glow/30 bg-violet/10 p-4">
                <Badge module={result.badge} earned size={96} />
                <div>
                  <p className="font-display text-[0.6875rem] uppercase tracking-[0.22em] text-violet-soft">
                    Badge earned
                  </p>
                  <p className="mt-1 font-serif text-[1.25rem] text-fg-hi">
                    {module.badgeName}
                  </p>
                </div>
              </div>
            ) : null
          }
        />
        {done && next && (
          <p className="mt-8">
            <Link
              to={`/learn/module/${next.id}`}
              className="text-fg underline decoration-violet-glow/40 underline-offset-4 hover:decoration-violet-glow"
            >
              Continue to Module {next.id} →
            </Link>
          </p>
        )}
        {done && !next && (
          <p className="mt-8">
            <Link
              to="/learn/final"
              className="text-fg underline decoration-violet-glow/40 underline-offset-4 hover:decoration-violet-glow"
            >
              On to the final assessment →
            </Link>
          </p>
        )}
      </section>
    </LearnLayout>
  );
}

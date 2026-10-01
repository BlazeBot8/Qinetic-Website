import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LearnLayout, { PageTitle } from "../components/LearnLayout";
import Badge from "../components/Badge";
import SignInCard from "../components/SignInCard";
import { useAuth } from "../lib/auth";
import { supabase } from "../lib/supabase";
import { useProgress } from "../hooks/useProgress";
import { MODULES } from "../data/learnContent";

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const progress = useProgress();
  const [name, setName] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setName(progress.name);
  }, [progress.name]);

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
        <PageTitle eyebrow="Learn" title="Your profile" />
        <SignInCard />
      </LearnLayout>
    );
  }

  const earned = new Set(progress.badges);

  const saveName = async (e) => {
    e.preventDefault();
    await supabase
      .from("profiles")
      .update({ display_name: name.trim() })
      .eq("id", user.id);
    setSaved(true);
    progress.refresh();
  };

  return (
    <LearnLayout>
      <PageTitle eyebrow="Learn" title="Your profile">
        Signed in as {user.email}.
      </PageTitle>

      <section>
        <p className="section-index mb-4">Badges</p>
        <span className="section-rule mb-6" />
        <div className="flex flex-wrap gap-[clamp(1rem,3vw,2rem)]">
          {MODULES.map((m) => (
            <div key={m.id} className="text-center">
              <Badge module={m.id} earned={earned.has(m.id)} size={92} />
              <p className="mt-2 font-display text-[0.6875rem] uppercase tracking-[0.18em] text-fg-dim">
                Module {m.id}
              </p>
            </div>
          ))}
        </div>
        {progress.certificate && (
          <p className="mt-8">
            <Link to={`/certificate/${progress.certificate.code}`} className="btn-primary">
              View your certificate
            </Link>
          </p>
        )}
      </section>

      <section className="mt-[clamp(2rem,4vw,3rem)]">
        <p className="section-index mb-4">Name on certificate</p>
        <span className="section-rule mb-6" />
        {progress.certificate ? (
          <p className="text-fg-muted">
            Your certificate has been issued to{" "}
            <span className="text-fg">{progress.name}</span>.
          </p>
        ) : (
          <form onSubmit={saveName} className="flex max-w-[30rem] flex-wrap gap-3">
            <input
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setSaved(false);
              }}
              placeholder="Full name"
              aria-label="Full name"
              maxLength={80}
              className="min-w-[12rem] flex-1 rounded-[2px] border border-white/15 bg-void-deep px-4 py-3 text-fg outline-none focus:border-violet-soft"
            />
            <button type="submit" className="btn-primary">
              {saved ? "Saved" : "Save"}
            </button>
          </form>
        )}
      </section>

      <section className="mt-[clamp(2rem,4vw,3rem)]">
        <p className="section-index mb-4">Recent attempts</p>
        <span className="section-rule" />
        {progress.attempts.length === 0 ? (
          <p className="mt-5 text-fg-muted">No attempts yet.</p>
        ) : (
          progress.attempts.map((a) => (
            <div
              key={a.id}
              className="entry flex items-center justify-between gap-4 py-3 text-[0.9375rem]"
            >
              <span className="text-fg">
                {a.kind === "final" ? "Final assessment" : `Module ${a.module}`}
              </span>
              <span className="text-fg-muted">
                {a.score}/{a.total} · {a.passed ? "Passed" : "Not passed"}
              </span>
              <span className="hidden text-fg-dim sm:block">
                {new Date(a.created_at).toLocaleDateString()}
              </span>
            </div>
          ))
        )}
      </section>

      <button
        type="button"
        className="btn-closed mt-10"
        onClick={() => supabase.auth.signOut()}
      >
        Sign out
      </button>
    </LearnLayout>
  );
}

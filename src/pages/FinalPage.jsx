import { useState } from "react";
import { Link } from "react-router-dom";
import LearnLayout, { PageTitle } from "../components/LearnLayout";
import QuizRunner from "../components/QuizRunner";
import SignInCard from "../components/SignInCard";
import { useAuth } from "../lib/auth";
import { supabase } from "../lib/supabase";
import { useProgress } from "../hooks/useProgress";
import { FINAL_PASS, FINAL_TOTAL, MODULES } from "../data/learnContent";

export default function FinalPage() {
  const { user, loading } = useAuth();
  const progress = useProgress();
  const [nameDraft, setNameDraft] = useState("");
  const [saving, setSaving] = useState(false);
  // Keeps the result screen up after passing, instead of jumping straight to
  // the "you are certified" page the moment the certificate row appears.
  const [ran, setRan] = useState(false);

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
        <PageTitle eyebrow="Final assessment" title="Certificate exam" />
        <SignInCard note="Sign in to take the final assessment." />
      </LearnLayout>
    );
  }

  if (progress.certificate && !ran) {
    return (
      <LearnLayout>
        <PageTitle eyebrow="Final assessment" title="You are certified">
          You have already passed the final assessment.
        </PageTitle>
        <Link
          to={`/certificate/${progress.certificate.code}`}
          className="btn-primary"
        >
          View your certificate
        </Link>
      </LearnLayout>
    );
  }

  if (progress.badges.length < MODULES.length) {
    return (
      <LearnLayout>
        <PageTitle eyebrow="Final assessment" title="Certificate exam">
          Earn all five module badges to unlock the final assessment. You have{" "}
          {progress.badges.length} of {MODULES.length}.
        </PageTitle>
        <Link to="/learn" className="btn-primary">
          Back to modules
        </Link>
      </LearnLayout>
    );
  }

  const saveName = async (e) => {
    e.preventDefault();
    setSaving(true);
    await supabase
      .from("profiles")
      .update({ display_name: nameDraft.trim() })
      .eq("id", user.id);
    await progress.refresh();
    setSaving(false);
  };

  return (
    <LearnLayout>
      <PageTitle eyebrow="Final assessment" title="Certificate exam">
        {FINAL_TOTAL} questions drawn from all five modules. You need{" "}
        {FINAL_PASS} correct to pass.
      </PageTitle>

      {!progress.name ? (
        <form onSubmit={saveName} className="glass max-w-[30rem] rounded-[2px] p-6">
          <p className="text-[0.9375rem] leading-[1.7] text-fg-muted">
            Enter your full name exactly as it should appear on the
            certificate.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <input
              required
              value={nameDraft}
              onChange={(e) => setNameDraft(e.target.value)}
              placeholder="Full name"
              aria-label="Full name"
              maxLength={80}
              className="min-w-[12rem] flex-1 rounded-[2px] border border-white/15 bg-void-deep px-4 py-3 text-fg outline-none focus:border-violet-soft"
            />
            <button type="submit" disabled={saving} className="btn-primary">
              {saving ? "Saving..." : "Save name"}
            </button>
          </div>
        </form>
      ) : (
        <>
          <p className="mb-6 text-[0.9375rem] text-fg-dim">
            Certificate will be issued to <span className="text-fg">{progress.name}</span>.{" "}
            <Link
              to="/learn/me"
              className="underline decoration-violet-glow/40 underline-offset-4"
            >
              Change
            </Link>
          </p>
          <QuizRunner
            kind="final"
            passMark={FINAL_PASS}
            total={FINAL_TOTAL}
            startLabel="Start the final assessment"
            onFinished={() => {
              setRan(true);
              progress.refresh();
            }}
            renderAfter={(result) =>
              result.certificate ? (
                <div className="my-6 border border-violet-glow/30 bg-violet/10 p-4">
                  <p className="font-display text-[0.6875rem] uppercase tracking-[0.22em] text-violet-soft">
                    Certificate issued
                  </p>
                  <Link
                    to={`/certificate/${result.certificate}`}
                    className="btn-primary mt-3"
                  >
                    View your certificate
                  </Link>
                </div>
              ) : null
            }
          />
        </>
      )}
    </LearnLayout>
  );
}

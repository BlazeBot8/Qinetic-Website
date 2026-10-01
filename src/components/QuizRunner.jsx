import { useState } from "react";
import { callFunction } from "../lib/supabase";

// Start -> answer one at a time -> submit -> review. The server draws the
// questions and does all grading; this component never sees an answer key
// until the attempt is submitted.
export default function QuizRunner({
  kind,
  module,
  startLabel = "Start quiz",
  passMark,
  total,
  onFinished,
  renderAfter,
  disabled = false,
}) {
  const [phase, setPhase] = useState("idle");
  const [error, setError] = useState("");
  const [session, setSession] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [index, setIndex] = useState(0);
  const [result, setResult] = useState(null);

  const start = async () => {
    setError("");
    setPhase("loading");
    const { data, error: err } = await callFunction("learn-start", {
      kind,
      module,
    });
    if (err) {
      setError(err);
      setPhase("idle");
      return;
    }
    setSession(data.session_id);
    setQuestions(data.questions);
    setAnswers({});
    setIndex(0);
    setResult(null);
    setPhase("taking");
  };

  const submit = async () => {
    setPhase("submitting");
    const { data, error: err } = await callFunction("learn-submit", {
      session_id: session,
      answers,
    });
    if (err) {
      setError(err);
      setPhase("taking");
      return;
    }
    setResult(data);
    setPhase("done");
    onFinished?.(data);
  };

  if (phase === "idle" || phase === "loading") {
    return (
      <div>
        <p className="mb-5 text-[0.9375rem] leading-[1.7] text-fg-muted">
          {total} questions. You need {passMark} correct to pass. You can retake
          as many times as you like, with new questions each time.
        </p>
        <button
          type="button"
          className="btn-primary"
          onClick={start}
          disabled={disabled || phase === "loading"}
        >
          {phase === "loading" ? "Loading..." : startLabel}
        </button>
        {error && <p className="mt-4 text-[0.9375rem] text-[#e58a8a]">{error}</p>}
      </div>
    );
  }

  if (phase === "taking" || phase === "submitting") {
    const q = questions[index];
    const last = index === questions.length - 1;
    const chosen = answers[q.id];
    const answered = Object.keys(answers).length;

    return (
      <div>
        <div className="mb-6 flex items-center justify-between gap-4">
          <p className="font-display text-[0.6875rem] uppercase tracking-[0.22em] text-fg-dim">
            Question {index + 1} of {questions.length}
          </p>
          <div className="h-[3px] w-40 bg-white/10" aria-hidden>
            <div
              className="h-full bg-violet-soft transition-all"
              style={{ width: `${((index + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        <h3 className="font-serif text-[clamp(1.25rem,2.6vw,1.625rem)] leading-snug text-fg-hi">
          {q.prompt}
        </h3>

        <div className="mt-6 flex flex-col gap-3" role="radiogroup">
          {q.options.map((option, i) => (
            <button
              key={i}
              type="button"
              role="radio"
              aria-checked={chosen === i}
              onClick={() => setAnswers((a) => ({ ...a, [q.id]: i }))}
              className={`rounded-[2px] border px-4 py-3.5 text-left text-[0.9375rem] leading-[1.6] transition-colors ${
                chosen === i
                  ? "border-violet-soft bg-violet/30 text-fg-hi"
                  : "border-white/12 bg-white/[0.02] text-fg-muted hover:border-violet-glow/60 hover:text-fg"
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <button
            type="button"
            className="btn-closed"
            onClick={() => setIndex((i) => i - 1)}
            disabled={index === 0}
          >
            Back
          </button>
          {last ? (
            <button
              type="button"
              className="btn-primary"
              onClick={submit}
              disabled={phase === "submitting" || answered === 0}
            >
              {phase === "submitting" ? "Grading..." : "Submit"}
            </button>
          ) : (
            <button
              type="button"
              className="btn-primary"
              onClick={() => setIndex((i) => i + 1)}
            >
              Next
            </button>
          )}
          {last && answered < questions.length && (
            <span className="text-[0.875rem] text-fg-dim">
              {questions.length - answered} unanswered
            </span>
          )}
        </div>
        {error && <p className="mt-4 text-[0.9375rem] text-[#e58a8a]">{error}</p>}
      </div>
    );
  }

  const byId = new Map(result.results.map((r) => [r.id, r]));
  return (
    <div>
      <p className="font-display text-[0.6875rem] uppercase tracking-[0.22em] text-fg-dim">
        Result
      </p>
      <p className="mt-3 font-serif text-[clamp(2rem,5vw,3rem)] text-fg-hi">
        {result.score} / {result.total}
      </p>
      <p
        className={`mt-1 text-[1.0625rem] ${result.passed ? "text-violet-soft" : "text-fg-muted"}`}
      >
        {result.passed
          ? "Passed."
          : `Not quite. You need ${passMark} to pass.`}
      </p>
      {renderAfter?.(result)}

      <div className="mt-8">
        {questions.map((q, n) => {
          const r = byId.get(q.id);
          return (
            <article key={q.id} className="entry py-5">
              <p className="text-[0.9375rem] leading-[1.7] text-fg-hi">
                <span className="mr-2 font-display text-fg-dim">{n + 1}.</span>
                {q.prompt}
              </p>
              <p
                className={`mt-2 text-[0.875rem] ${r.ok ? "text-violet-soft" : "text-[#e58a8a]"}`}
              >
                Your answer:{" "}
                {r.chosen === null ? "none" : q.options[r.chosen]}
              </p>
              {!r.ok && (
                <p className="mt-1 text-[0.875rem] text-fg-muted">
                  Correct answer: {q.options[r.correct]}
                </p>
              )}
              {r.explanation && (
                <p className="mt-1 text-[0.875rem] leading-[1.7] text-fg-dim">
                  {r.explanation}
                </p>
              )}
            </article>
          );
        })}
      </div>

      <button type="button" className="btn-primary mt-6" onClick={start}>
        {result.passed ? "Take it again" : "Retake with new questions"}
      </button>
    </div>
  );
}

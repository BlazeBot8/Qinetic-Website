import { useState } from "react";
import { isSupabaseConfigured, supabase } from "../lib/supabase";

export default function SignInCard({ note }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  if (!isSupabaseConfigured) {
    return (
      <p className="text-fg-muted">
        Sign-in is not configured on this build yet.
      </p>
    );
  }

  const submit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    setError("");
    const { error: err } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: {
        emailRedirectTo: window.location.origin + window.location.pathname,
      },
    });
    if (err) {
      setError(err.message);
      setStatus("idle");
    } else {
      setStatus("sent");
    }
  };

  return (
    <div className="glass max-w-[30rem] rounded-[2px] p-6">
      <p className="font-display text-[0.6875rem] uppercase tracking-[0.22em] text-fg-dim">
        Sign in
      </p>
      <p className="mt-3 text-[0.9375rem] leading-[1.7] text-fg-muted">
        {note ??
          "Enter your email and we will send you a sign-in link. No password needed."}
      </p>

      {status === "sent" ? (
        <p className="mt-5 text-fg-hi">
          Check your inbox for the link. You can close this tab.
        </p>
      ) : (
        <form onSubmit={submit} className="mt-5 flex flex-wrap gap-3">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            aria-label="Email address"
            className="min-w-[12rem] flex-1 rounded-[2px] border border-white/15 bg-void-deep px-4 py-3 text-fg outline-none focus:border-violet-soft"
          />
          <button
            type="submit"
            disabled={status === "sending"}
            className="btn-primary"
          >
            {status === "sending" ? "Sending..." : "Email me a link"}
          </button>
        </form>
      )}
      {error && <p className="mt-3 text-[0.875rem] text-[#e58a8a]">{error}</p>}
    </div>
  );
}

import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import emailjs from "@emailjs/browser";
import Atmosphere from "../components/Atmosphere";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { Arrow } from "../components/Brand";
import {
  CONTACT_EMAIL,
  emailjsConfig,
  isEmailJsConfigured,
} from "../lib/emailjsConfig";
import {
  MAX_SENDS,
  checkQuota,
  formatRetryAfter,
  recordSend,
} from "../lib/spamGuard";

// a form completed faster than this was almost certainly not typed by a person
const MIN_FILL_MS = 2500;

export default function ContactEmailPage() {
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [quota, setQuota] = useState({ remaining: MAX_SENDS, retryAfterMs: 0 });

  // honeypot: hidden from people, tempting to bots that fill every input
  const [website, setWebsite] = useState("");
  const openedAt = useRef(Date.now());

  useEffect(() => {
    if (isEmailJsConfigured()) {
      emailjs.init(emailjsConfig.publicKey);
    }
  }, []);

  useEffect(() => {
    let active = true;
    checkQuota().then((result) => {
      if (active) setQuota(result);
    });
    return () => {
      active = false;
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Honeypot hit: report success without sending, so the bot has no signal to
    // adapt to. A person cannot reach this field.
    if (website.trim() !== "") {
      setStatus("success");
      return;
    }

    if (Date.now() - openedAt.current < MIN_FILL_MS) {
      setStatus("error");
      setError("That was quick. Give it a moment and send again.");
      return;
    }

    const gate = await checkQuota();
    setQuota(gate);
    if (!gate.allowed) {
      setStatus("error");
      setError(
        `You've sent ${MAX_SENDS} messages in the last 24 hours. You can send another in ${formatRetryAfter(
          gate.retryAfterMs
        )}.`
      );
      return;
    }

    if (!isEmailJsConfigured()) {
      setStatus("error");
      setError(
        "Email could not be sent. Check your connection and try again, or reach out via LinkedIn or GitHub."
      );
      return;
    }

    setStatus("sending");

    try {
      await emailjs.send(
        emailjsConfig.serviceId,
        emailjsConfig.templateId,
        {
          from_name: name.trim(),
          subject: subject.trim(),
          message: message.trim(),
          to_email: CONTACT_EMAIL,
        },
        { publicKey: emailjsConfig.publicKey }
      );
      await recordSend();
      setQuota(await checkQuota());
      setStatus("success");
      setName("");
      setSubject("");
      setMessage("");
    } catch (err) {
      setStatus("error");
      const raw =
        typeof err?.text === "string"
          ? err.text
          : err instanceof Error
            ? err.message
            : "Something went wrong. Please try again.";

      const templateMissing = /template id not found/i.test(raw);
      setError(
        templateMissing
          ? `${raw} Your app is sending template_y2fv8cb with public key ${emailjsConfig.publicKey.slice(0, 6)}… — that usually means the Template ID and Public Key are from different EmailJS accounts. In one dashboard session, recopy Public Key, Service ID, and Template ID from Account → API Keys, Email Services, and Email Templates, then update .env and restart.`
          : raw
      );
    }
  };

  return (
    <div className="relative min-h-screen bg-void text-fg">
      <Atmosphere />
      <Nav />

      <main className="relative z-10 flex min-h-screen items-center px-[clamp(1.25rem,5vw,3rem)] pb-16 pt-28">
        <div className="mx-auto w-full max-w-xl">
          <Link
            to="/#contact"
            className="font-display text-xs uppercase tracking-[0.18em] text-fg-dim no-underline transition-colors hover:text-white"
          >
            ← Back
          </Link>

          <p className="section-index mb-5 mt-8">Contact</p>
          <h1 className="font-serif text-[clamp(1.875rem,4.2vw,2.75rem)] font-normal tracking-[-0.02em] text-fg-hi">
            Send us a message
          </h1>

          {status === "success" ? (
            <div className="glass mt-10 rounded-2xl p-8 text-center">
              <p className="font-display text-lg font-bold text-fg-hi">
                Message sent
              </p>
              <p className="mt-3 text-sm text-fg-muted">
                Someone will read it and get back to you.
              </p>
              <Link to="/" className="btn-primary mt-8 inline-flex">
                Back to home <Arrow />
              </Link>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="glass mt-10 space-y-6 rounded-2xl p-8"
            >
              {/* honeypot — off-screen rather than display:none, which some bots
                  detect and skip. Never focusable, never announced. */}
              <div
                aria-hidden
                className="pointer-events-none absolute left-[-9999px] h-px w-px overflow-hidden opacity-0"
              >
                <label htmlFor="website">Website</label>
                <input
                  id="website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </div>

              <div className="form-field">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-input"
                  placeholder="Your name"
                  disabled={status === "sending"}
                />
              </div>

              <div className="form-field">
                <label htmlFor="subject" className="form-label">
                  Subject
                </label>
                <input
                  id="subject"
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="form-input"
                  placeholder="What's this about?"
                  disabled={status === "sending"}
                />
              </div>

              <div className="form-field">
                <label htmlFor="message" className="form-label">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={6}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="form-input form-textarea"
                  placeholder="Your message..."
                  disabled={status === "sending"}
                />
              </div>

              {status === "error" && error && (
                <p className="text-sm text-[#f0a0b8]" role="alert">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="btn-primary"
                disabled={status === "sending" || quota.remaining === 0}
              >
                {status === "sending" ? "Sending…" : "Send message"}
              </button>

              <p className="text-center font-display text-[0.6875rem] uppercase tracking-[0.14em] text-fg-faint">
                {quota.remaining === 0
                  ? `Limit reached. Try again in ${formatRetryAfter(quota.retryAfterMs)}`
                  : `${quota.remaining} of ${MAX_SENDS} messages left today`}
              </p>
            </form>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

import { useEffect, useState } from "react";
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

export default function ContactEmailPage() {
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    if (isEmailJsConfigured()) {
      emailjs.init(emailjsConfig.publicKey);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!isEmailJsConfigured()) {
      setStatus("error");
      setError(
        "Email could not be sent. Check your connection and try again, or reach out via LinkedIn or GitHub."
      );
      return;
    }

    setStatus("sending");

    const runtimeConfig = {
      serviceId: emailjsConfig.serviceId,
      templateId: emailjsConfig.templateId,
      publicKey: emailjsConfig.publicKey,
      envServiceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
      envTemplateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      envPublicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
    };

    if (import.meta.env.DEV) {
      console.log("[EmailJS] runtime config:", runtimeConfig);
      window.__emailjsDebug = runtimeConfig;
    }

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
          <h1 className="font-display text-[clamp(1.75rem,4vw,2.5rem)] font-bold tracking-[-0.02em] text-fg-hi">
            Send us a message
          </h1>

          {status === "success" ? (
            <div className="glass mt-10 rounded-2xl p-8 text-center">
              <p className="font-display text-lg font-bold text-fg-hi">
                Message sent
              </p>
              <p className="mt-3 text-sm text-fg-muted">
                Thanks for reaching out. We&apos;ll reply as soon as we can.
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
                className="btn-primary w-full justify-center disabled:cursor-not-allowed disabled:opacity-60"
                disabled={status === "sending"}
              >
                {status === "sending" ? "Sending…" : "Send message"}
              </button>
            </form>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

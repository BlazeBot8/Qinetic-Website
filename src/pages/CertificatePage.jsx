import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LearnLayout from "../components/LearnLayout";
import { supabase } from "../lib/supabase";
import { COURSE_NAME } from "../data/learnContent";

function Atom() {
  return (
    <svg viewBox="0 0 100 100" className="cert-atom-svg" aria-hidden>
      <g fill="none" stroke="#a8842f" strokeWidth="3.4">
        <ellipse cx="50" cy="50" rx="34" ry="12.5" />
        <ellipse cx="50" cy="50" rx="34" ry="12.5" transform="rotate(60 50 50)" />
        <ellipse cx="50" cy="50" rx="34" ry="12.5" transform="rotate(120 50 50)" />
      </g>
      <circle cx="50" cy="50" r="5.5" fill="#a8842f" />
    </svg>
  );
}

function Corner({ position }) {
  return (
    <svg viewBox="0 0 40 40" className={`cert-corner cert-corner-${position}`} aria-hidden>
      <path d="M3,36 V3 H36" fill="none" stroke="#8a8794" strokeWidth="3" />
      <circle cx="3" cy="36" r="3" fill="#8a8794" />
      <circle cx="36" cy="3" r="3" fill="#8a8794" />
    </svg>
  );
}

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

// Public page: anyone with the ID can view and verify a certificate. Everything
// shown comes from the verify_certificate() database function, which returns
// only the name, date and score.
export default function CertificatePage() {
  const { code: rawCode } = useParams();
  const code = rawCode.replace(/^QID[·.\s-]*/i, "").trim().toUpperCase();
  const [state, setState] = useState({ status: "loading", cert: null });
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let active = true;
    supabase.rpc("verify_certificate", { p_code: code }).then(({ data, error }) => {
      if (!active) return;
      const cert = data?.[0] ?? null;
      setState({ status: error || !cert ? "invalid" : "ok", cert });
    });
    return () => {
      active = false;
    };
  }, [code]);

  const cert = state.cert;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked: the address bar still has the link */
    }
  };

  return (
    <LearnLayout width={1100}>
      {state.status === "loading" && (
        <p className="text-fg-muted">Checking certificate...</p>
      )}

      {state.status === "invalid" && (
        <div>
          <p className="section-index mb-4">Verification</p>
          <h1 className="font-serif text-[clamp(1.75rem,4vw,2.5rem)] text-fg-hi">
            No certificate found
          </h1>
          <p className="mt-4 text-fg-muted">
            We have no record of the ID {code}. Check it and try again.
          </p>
        </div>
      )}

      {state.status === "ok" && (
        <>
          <div className="cert-wrap">
            <div className="cert">
              <div className="cert-frame" />
              <Corner position="tl" />
              <Corner position="tr" />
              <Corner position="bl" />
              <Corner position="br" />
              <div className="cert-medallion">
                <Atom />
              </div>

              <p className="cert-eyebrow">QINETIC RESEARCH LAB · FULL CURRICULUM</p>
              <h1 className="cert-title">Passing the Course</h1>
              <p className="cert-certifies">This certifies that</p>
              <p className="cert-name">{cert.holder_name}</p>
              <p className="cert-course">{COURSE_NAME}</p>
              <p className="cert-body">
                for achieving a <strong>passing score of 70% or higher</strong> on
                every module examination and the cumulative final assessment
              </p>

              <div className="cert-meta">
                <span>Issued {formatDate(cert.issued_at)}</span>
                <span>QID·{code}</span>
              </div>

              <div className="cert-sign cert-sign-left">
                <span className="cert-script">{cert.holder_name}</span>
                <span className="cert-sign-line" />
                <span className="cert-sign-label">Recipient</span>
              </div>
              <div className="cert-sign cert-sign-right">
                <span className="cert-script">Parv</span>
                <span className="cert-sign-line" />
                <span className="cert-sign-label">Director</span>
              </div>
            </div>
          </div>

          <div className="no-print mt-6 flex flex-wrap items-center gap-4">
            <button type="button" className="btn-primary" onClick={() => window.print()}>
              Print or save as PDF
            </button>
            <button type="button" className="btn-closed" onClick={copyLink}>
              {copied ? "Link copied" : "Copy verification link"}
            </button>
            <p className="text-[0.875rem] text-violet-soft">
              ✓ Verified by Qinetic Research Lab
            </p>
          </div>
        </>
      )}
    </LearnLayout>
  );
}

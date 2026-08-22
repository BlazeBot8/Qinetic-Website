import { Link } from "react-router-dom";
import { Reveal } from "./Reveal";
import { Parallax } from "./Parallax";

function GitHubIcon({ size = 18 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.26.82-.577 0-.285-.01-1.04-.016-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.09-.745.083-.73.083-.73 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.76-1.605-2.665-.304-5.466-1.332-5.466-5.93 0-1.31.468-2.382 1.236-3.222-.124-.303-.536-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.5 11.5 0 0 1 3.003-.404c1.02.005 2.047.138 3.003.404 2.29-1.552 3.297-1.23 3.297-1.23.655 1.653.243 2.873.12 3.176.77.84 1.235 1.912 1.235 3.222 0 4.61-2.807 5.624-5.48 5.921.43.372.814 1.102.814 2.222 0 1.606-.015 2.902-.015 3.293 0 .32.216.694.825.576C20.565 21.796 24 17.297 24 12 24 5.37 18.627 0 12 0z" />
    </svg>
  );
}

function LinkedInIcon({ size = 18 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 4.126 0 2.065 2.065 0 0 1-2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="relative z-10 mx-auto max-w-[1200px] border-t border-violet-glow/10 px-[clamp(1.25rem,5vw,3rem)] pb-[clamp(2.5rem,5vw,3.75rem)] pt-[clamp(2.75rem,6vw,5rem)] text-center"
    >
      <Parallax distance={26}>
      <Reveal>
        <p className="section-index mb-5">Contact</p>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="mx-auto max-w-[16ch] font-serif text-[clamp(1.875rem,4.4vw,3.125rem)] font-normal leading-[1.1] tracking-[-0.02em] text-fg-hi">
          Get in touch
        </h2>
      </Reveal>
      <Reveal delay={0.16}>
        <div className="mt-[1.625rem] flex flex-wrap justify-center gap-3">
          <Link to="/contact/email" className="contact-pill">
            ✉&nbsp;Email
          </Link>
          <a
            href="https://www.linkedin.com/company/qinetic-research-lab/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="contact-icon"
          >
            <LinkedInIcon />
          </a>
          <a
            href="https://github.com/Qinetic-Research-Lab"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="contact-icon"
          >
            <GitHubIcon />
          </a>
        </div>
      </Reveal>
      </Parallax>
    </section>
  );
}

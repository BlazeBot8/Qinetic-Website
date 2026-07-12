import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { navLinks } from "../data/navLinks";
import { useActiveSection } from "../hooks/useActiveSection";
import { Wordmark } from "./Brand";

const sectionIds = navLinks.map((link) => link.id);
const MOBILE_BREAKPOINT = 860;

export default function Nav({ logoRef, logoHidden = false }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const activeId = useActiveSection(sectionIds);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`);
    const onMq = () => {
      setIsMobile(mq.matches);
      if (!mq.matches) setOpen(false);
    };
    onMq();
    mq.addEventListener("change", onMq);
    return () => mq.removeEventListener("change", onMq);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between px-[clamp(1.25rem,5vw,4rem)] py-[1.125rem] transition-all duration-300 ${
          scrolled
            ? "border-b border-violet-glow/14 bg-void/72 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <Link
          ref={logoRef}
          to="/"
          className="text-white no-underline"
          style={{ opacity: logoHidden ? 0 : 1 }}
        >
          <Wordmark />
        </Link>

        {!isMobile && (
          <div className="flex items-center gap-[clamp(0.375rem,1.6vw,1.375rem)]">
            {navLinks
              .filter((link) => link.id !== "apply")
              .map((link) => (
              <Link
                key={link.id}
                to={`/#${link.id}`}
                className={`font-display text-[0.8125rem] font-medium uppercase tracking-[0.18em] no-underline transition-colors duration-250 px-0.5 py-1.5 ${
                  activeId === link.id
                    ? "text-white shadow-[inset_0_-2px_0_#C026D3]"
                    : "text-fg-dim hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link to="/#apply" className="btn-nav-join">
              Apply
            </Link>
          </div>
        )}

        {isMobile && (
          <button
            type="button"
            aria-label="Toggle navigation menu"
            onClick={() => setOpen((v) => !v)}
            className="flex h-11 w-11 flex-col items-center justify-center gap-[5px] rounded-lg border border-violet-glow/24 bg-white/[0.03]"
          >
            <span className="h-0.5 w-[18px] bg-fg" />
            <span className="h-0.5 w-[18px] bg-fg" />
            <span className="h-0.5 w-[18px] bg-fg" />
          </button>
        )}
      </header>

      <AnimatePresence>
        {open && isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] flex flex-col bg-void-deep/80 px-[clamp(1.25rem,6vw,2.5rem)] py-[1.625rem] backdrop-blur-xl"
          >
            <div className="flex items-center justify-between">
              <span className="font-display text-[1.125rem] font-extrabold tracking-[0.16em] text-white">
                QINETIC
              </span>
              <button
                type="button"
                aria-label="Close menu"
                onClick={closeMenu}
                className="flex h-11 w-11 items-center justify-center rounded-lg border border-violet-glow/24 bg-white/[0.03] text-[1.375rem] leading-none text-fg"
              >
                ×
              </button>
            </div>

            <nav className="mt-11 flex flex-col gap-0.5">
              {navLinks.map((link) => (
                <Link
                  key={link.id}
                  to={`/#${link.id}`}
                  onClick={closeMenu}
                  className="border-b border-violet-glow/10 px-1 py-4 font-display text-[1.625rem] font-bold uppercase tracking-[0.04em] text-fg no-underline"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <Link
              to="/#apply"
              onClick={closeMenu}
              className="btn-primary mt-auto justify-center py-[1.0625rem] text-[0.9375rem] tracking-[0.12em]"
            >
              Apply Now
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

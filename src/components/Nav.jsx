import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { navLinks } from "../data/navLinks";
import { useActiveSection } from "../hooks/useActiveSection";
import { scrollToSection } from "../lib/scrollToSection";
import { Wordmark } from "./Brand";

const sectionIds = navLinks.map((link) => link.id);
const MOBILE_BREAKPOINT = 860;

export default function Nav({ logoRef, logoHidden = false }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const activeId = useActiveSection(sectionIds);

  const goToSection = (id, onNavigate) => {
    onNavigate?.();
    if (location.pathname === "/") {
      scrollToSection(id);
      return;
    }
    navigate(`/#${id}`);
  };

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
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`/#${link.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  goToSection(link.id);
                }}
                className={`px-0.5 py-1.5 font-sans text-[0.9375rem] font-medium no-underline transition-colors duration-250 ${
                  activeId === link.id && location.pathname === "/"
                    ? "text-white"
                    : "text-fg-dim hover:text-white"
                }`}
              >
                {link.label}
              </a>
            ))}
            <Link
              to="/learn"
              className={`ml-1 rounded-[2px] border px-3.5 py-1.5 font-sans text-[0.9375rem] font-semibold no-underline transition-colors duration-250 ${
                location.pathname.startsWith("/learn")
                  ? "border-violet-soft bg-violet text-white"
                  : "border-violet-glow/60 bg-violet/35 text-[#d4c2f5] hover:border-violet-soft hover:bg-violet/60 hover:text-white"
              }`}
            >
              Learn
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
                <a
                  key={link.id}
                  href={`/#${link.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    goToSection(link.id, closeMenu);
                  }}
                  className="border-b border-violet-glow/10 px-1 py-4 font-serif text-[1.625rem] font-normal text-fg no-underline"
                >
                  {link.label}
                </a>
              ))}
              <Link
                to="/learn"
                onClick={closeMenu}
                className="border-b border-violet-glow/10 px-1 py-4 font-serif text-[1.625rem] font-normal text-violet-soft no-underline"
              >
                Learn
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

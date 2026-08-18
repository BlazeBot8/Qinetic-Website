import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/**
 * Scroll-linked vertical drift. Unlike Reveal (which fires once on entry), this
 * stays tied to scroll position for the whole time the element crosses the
 * viewport, so foreground content moves against the particle field behind it.
 *
 * Parallax owns the outer element's `y`; Reveal owns the inner one's. Keep them
 * on separate elements — nest Reveal inside Parallax, never merge the two.
 *
 * `distance` is the travel in px in each direction across the full pass.
 */
export function Parallax({ children, distance = 40, className = "" }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);

  if (reduced) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

/**
 * Hero-specific scrub: content drifts up and dissolves as the hero leaves.
 * Measured against the hero block itself, so every child shares one timeline
 * instead of drifting apart.
 */
export function HeroScrub({ children, className = "" }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -110]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  if (reduced) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div ref={ref} style={{ y, opacity }} className={className}>
      {children}
    </motion.div>
  );
}

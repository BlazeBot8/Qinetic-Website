# Qinetic — Research Lab Website

A single-page, scroll-based marketing site for **Qinetic**, a placeholder research lab
working at the intersection of quantum computing and machine learning. This is a
**design-first template pass**: the visual system, layout, and motion are the point —
all copy is short, generic placeholder text.

## Stack

- [React 19](https://react.dev/) + [Vite](https://vite.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/) (via `@tailwindcss/vite`, CSS-first theme in `src/index.css`)
- [Framer Motion](https://motion.dev/) for entry/scroll animations
- [Lucide](https://lucide.dev/) for icons

No backend, no router — everything lives on one scrollable page with anchor-based navigation.

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL (defaults to `http://localhost:5173`).

Other scripts:

```bash
npm run build    # production build to dist/
npm run preview  # preview the production build locally
npm run lint      # oxlint
```

## Project structure

```
src/
  components/
    Nav.jsx            sticky nav, scroll-spy, mobile drawer
    Hero.jsx            full-viewport hero with animated gradient/particle background
    WhatSection.jsx      "What We Do" feature grid
    AboutSection.jsx      mission blurb, stat row, team cards
    ApplySection.jsx      apply CTA card with placeholder tag chips
    ContactSection.jsx    minimal contact headline + icon row
    Footer.jsx            wordmark, nav repeat, copyright
  assets/
    logo.png               brand mark (neon violet "Q"), background keyed to transparent
  data/
    navLinks.js           shared nav link config (id + label)
  hooks/
    useActiveSection.js   IntersectionObserver-based scroll-spy hook
  App.jsx
  index.css              Tailwind import + theme tokens + shared component classes
```

## Design system notes

- Color tokens, fonts, and keyframe animations are defined once via Tailwind's
  `@theme` block in [`src/index.css`](src/index.css) (e.g. `--color-void`, `--color-violet`,
  `--color-accent`, `--animate-drift`).
- Shared visual patterns (glassmorphism cards, gradient buttons, pill chips, noise overlay,
  gradient text) are implemented as reusable classes in the `@layer components` block of the
  same file, rather than repeated Tailwind utility strings.
- All content is intentionally placeholder — names, stats, team bios, and copy should be
  replaced before shipping.

## Branding

`src/assets/logo.png` is the official Qinetic mark (neon violet "Q" with an orbital motif),
processed so its black backdrop is transparent — it composites cleanly over the nav (both
transparent and glass states), the hero background accent, and `public/favicon.png` /
`public/apple-touch-icon.png`.

## Requirements

- Node.js 20+

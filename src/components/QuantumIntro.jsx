import { useEffect, useRef } from "react";

const PHASE = { A: 1150, B: 2050, C: 2700, D: 3980, E: 4600 };

const PALETTE = ["#7C3AED", "#C026D3", "#4F46E5", "#A855F7", "#C7AAFF", "#E043C6"];

const clamp01 = (x) => (x < 0 ? 0 : x > 1 ? 1 : x);
const easeOut = (x) => 1 - Math.pow(1 - x, 3);
const easeInOut = (x) =>
  x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
const lerp = (a, b, k) => a + (b - a) * k;

function hexToRgb(hex) {
  const h = hex.replace("#", "");
  const n = parseInt(
    h.length === 3
      ? h
          .split("")
          .map((c) => c + c)
          .join("")
      : h,
    16
  );
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function rgba(color, a) {
  const [r, g, b] = Array.isArray(color) ? color : hexToRgb(color);
  return `rgba(${r},${g},${b},${a})`;
}

function buildLogoPoints() {
  const off = document.createElement("canvas");
  const ctx = off.getContext("2d");

  const markSize = 64;
  const gap = 18;
  const fontPx = 54;
  const font = `800 ${fontPx}px "JetBrains Mono", ui-monospace, monospace`;
  const text = "QINETIC";

  ctx.font = font;
  const textW = ctx.measureText(text).width;
  const boxW = Math.ceil(markSize + gap + textW);
  const boxH = Math.ceil(Math.max(markSize, fontPx));

  off.width = boxW;
  off.height = boxH;

  // rounded-square gradient mark
  const grad = ctx.createLinearGradient(0, 0, markSize, markSize);
  grad.addColorStop(0, "#7C3AED");
  grad.addColorStop(0.5, "#C026D3");
  grad.addColorStop(1, "#4F46E5");
  const markY = (boxH - markSize) / 2;
  ctx.fillStyle = grad;
  ctx.beginPath();
  const r = 14;
  if (ctx.roundRect) {
    ctx.roundRect(0, markY, markSize, markSize, r);
  } else {
    ctx.rect(0, markY, markSize, markSize);
  }
  ctx.fill();

  // wordmark
  ctx.font = font;
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#EDE4FF";
  ctx.fillText(text, markSize + gap, boxH / 2 + 2);

  const { data } = ctx.getImageData(0, 0, boxW, boxH);
  const step = 3;
  const points = [];
  for (let y = 0; y < boxH; y += step) {
    for (let x = 0; x < boxW; x += step) {
      const idx = (y * boxW + x) * 4;
      if (data[idx + 3] > 110) {
        points.push({ lx: x, ly: y });
      }
    }
  }

  return { points, boxW, boxH };
}

export default function QuantumIntro({ logoRef, onDone }) {
  const canvasRef = useRef(null);
  const doneRef = useRef(false);

  useEffect(() => {
    const finish = () => {
      if (doneRef.current) return;
      doneRef.current = true;
      if (logoRef?.current) logoRef.current.style.opacity = "1";
      document.body.style.overflow = "";
      onDone();
    };

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced) {
      finish();
      return;
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    document.body.style.overflow = "hidden";
    window.scrollTo(0, 0);

    let raf = 0;
    let start = 0;
    let W = 0;
    let H = 0;
    let dpr = 1;
    let screenC = { x: 0, y: 0 };
    let navC = { x: 0, y: 0 };

    const { points, boxW, boxH } = buildLogoPoints();

    const photons = points.map((pt) => ({
      lx: pt.lx,
      ly: pt.ly,
      color: PALETTE[(Math.random() * PALETTE.length) | 0],
      fx: Math.random(),
      fy: Math.random(),
      seed: Math.random(),
      size: 0.8 + Math.random() * 1.4,
      delay: Math.random() * 0.35,
      ctrl: (Math.random() * 2 - 1) * (60 + Math.random() * 150),
      px: 0,
      py: 0,
      hx: 0,
      hy: 0,
      cx: 0,
      cy: 0,
      nx: 0,
      ny: 0,
    }));

    const blobs = [
      { fx: 0.3, fy: 0.4, r: 320, color: "#7C3AED" },
      { fx: 0.68, fy: 0.55, r: 300, color: "#C026D3" },
      { fx: 0.5, fy: 0.3, r: 280, color: "#4F46E5" },
    ];

    const layout = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.floor(W * dpr);
      canvas.height = Math.floor(H * dpr);
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const navRect = logoRef?.current?.getBoundingClientRect() ?? {
        left: 24,
        top: 20,
        width: 150,
        height: 28,
      };
      const navScale = navRect.width / boxW;
      const centerW = Math.min(W * 0.62, 720);
      const centerScale = centerW / boxW;
      const cxLeft = W / 2 - (boxW * centerScale) / 2;
      const cyTop = H / 2 - (boxH * centerScale) / 2;
      const nxLeft = navRect.left;
      const nyTop = navRect.top + (navRect.height - boxH * navScale) / 2;

      for (const p of photons) {
        p.hx = p.fx * W;
        p.hy = p.fy * H;
        p.cx = cxLeft + p.lx * centerScale;
        p.cy = cyTop + p.ly * centerScale;
        p.nx = nxLeft + p.lx * navScale;
        p.ny = nyTop + p.ly * navScale;
      }

      screenC = { x: W / 2, y: H / 2 };
      navC = {
        x: navRect.left + navRect.width / 2,
        y: navRect.top + navRect.height / 2,
      };
    };

    const drawGlow = (x, y, radius, color, a) => {
      const g = ctx.createRadialGradient(x, y, 0, x, y, radius);
      g.addColorStop(0, rgba(color, a));
      g.addColorStop(1, rgba(color, 0));
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    };

    const frame = (now) => {
      if (!start) start = now;
      const t = now - start;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "#0A0612";
      ctx.fillRect(0, 0, W, H);
      ctx.globalCompositeOperation = "lighter";

      // interference blobs (fade in cloud, fade out during teleport)
      const blobAlpha =
        t < PHASE.A
          ? easeOut(clamp01(t / (PHASE.A * 0.85))) * 0.5
          : t < PHASE.C
            ? 0.5
            : 0.5 * clamp01(1 - (t - PHASE.C) / (PHASE.D - PHASE.C));
      if (blobAlpha > 0.001) {
        for (let i = 0; i < blobs.length; i++) {
          const b = blobs[i];
          const bx = b.fx * W + Math.sin(t * 0.0006 + i * 2) * 40;
          const by = b.fy * H + Math.cos(t * 0.0007 + i * 2) * 40;
          drawGlow(bx, by, b.r, b.color, blobAlpha * 0.5);
        }
      }

      // central bloom during glow + early teleport
      if (t >= PHASE.B && t < PHASE.D) {
        const bp =
          t < PHASE.C
            ? easeOut(clamp01((t - PHASE.B) / (PHASE.C - PHASE.B)))
            : clamp01(1 - (t - PHASE.C) / (PHASE.D - PHASE.C));
        drawGlow(screenC.x, screenC.y, 220, "#C7AAFF", bp * 0.55);
        drawGlow(screenC.x, screenC.y, 90, "#E043C6", bp * 0.5);
      }

      const teleporting = t >= PHASE.C && t < PHASE.D;

      for (const p of photons) {
        let x;
        let y;
        let alpha;
        let size = p.size;

        if (t < PHASE.A) {
          const k = easeOut(clamp01(t / (PHASE.A * 0.85)));
          const shimmer = 0.55 + 0.45 * Math.sin(t * 0.008 + p.seed * 6.283);
          x = p.hx + Math.sin(t * 0.001 + p.seed * 10) * 6;
          y = p.hy + Math.cos(t * 0.0012 + p.seed * 10) * 6;
          alpha = k * shimmer * 0.85;
        } else if (t < PHASE.B) {
          const k = easeInOut(clamp01((t - PHASE.A) / (PHASE.B - PHASE.A)));
          x = lerp(p.hx, p.cx, k);
          y = lerp(p.hy, p.cy, k);
          alpha = 0.9;
        } else if (t < PHASE.C) {
          x = p.cx + (Math.random() - 0.5) * 2.4;
          y = p.cy + (Math.random() - 0.5) * 2.4;
          alpha = 0.95;
          size = p.size * 1.1;
        } else if (t < PHASE.D) {
          const raw = (t - PHASE.C) / (PHASE.D - PHASE.C);
          const local = clamp01((raw - p.delay) / (1 - p.delay));
          const k = easeInOut(local);
          const mx = (p.cx + p.nx) / 2;
          const my = (p.cy + p.ny) / 2;
          const dx = p.nx - p.cx;
          const dy = p.ny - p.cy;
          const len = Math.hypot(dx, dy) || 1;
          const ctrlX = mx + (-dy / len) * p.ctrl;
          const ctrlY = my + (dx / len) * p.ctrl;
          const u = 1 - k;
          x = u * u * p.cx + 2 * u * k * ctrlX + k * k * p.nx;
          y = u * u * p.cy + 2 * u * k * ctrlY + k * k * p.ny;
          alpha = 0.95;
        } else {
          x = p.nx;
          y = p.ny;
          alpha = 1;
        }

        if (teleporting && (p.px || p.py)) {
          ctx.strokeStyle = rgba(p.color, alpha * 0.5);
          ctx.lineWidth = size * 0.9;
          ctx.beginPath();
          ctx.moveTo(p.px, p.py);
          ctx.lineTo(x, y);
          ctx.stroke();
        }

        ctx.fillStyle = rgba(p.color, alpha);
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();

        p.px = x;
        p.py = y;
      }

      // reconstruct: entanglement line, navbar bloom, cross-fade
      if (t >= PHASE.D) {
        const f = clamp01((t - PHASE.D) / (PHASE.E - PHASE.D));

        ctx.save();
        ctx.globalCompositeOperation = "lighter";
        ctx.strokeStyle = rgba("#C7AAFF", (1 - f) * 0.6);
        ctx.lineWidth = 1.2;
        ctx.setLineDash([6, 8]);
        ctx.beginPath();
        ctx.moveTo(screenC.x, screenC.y);
        ctx.lineTo(navC.x, navC.y);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.restore();

        drawGlow(navC.x, navC.y, 70 + f * 20, "#C026D3", (1 - f) * 0.6);

        if (logoRef?.current)
          logoRef.current.style.opacity = String(easeOut(f));
        canvas.style.opacity = String(1 - easeInOut(f));
      }

      if (t >= PHASE.E) {
        finish();
        return;
      }
      raf = requestAnimationFrame(frame);
    };

    const onResize = () => layout();

    let cancelled = false;
    Promise.race([
      document.fonts?.ready ?? Promise.resolve(),
      new Promise((r) => setTimeout(r, 1500)),
    ]).then(() => {
      if (cancelled) return;
      layout();
      if (logoRef?.current) logoRef.current.style.opacity = "0";
      window.addEventListener("resize", onResize);
      raf = requestAnimationFrame(frame);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      document.body.style.overflow = "";
    };
  }, [logoRef, onDone]);

  return (
    <div
      className="fixed inset-0 z-[200] bg-[#0A0612]"
      aria-hidden
      style={{ pointerEvents: "none" }}
    >
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
}

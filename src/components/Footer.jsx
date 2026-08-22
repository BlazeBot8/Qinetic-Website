import { Wordmark } from "./Brand";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-violet-glow/12 bg-void-deep/50">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-5 px-[clamp(1.25rem,5vw,3rem)] py-8">
        <Wordmark className="[&_img]:h-[18px] [&_img]:w-[18px] [&_span]:text-[0.9375rem]" />

        <p className="font-display text-[0.71875rem] tracking-[0.08em] text-[#5e5675]">
          &copy; 2026 Qinetic Labs
        </p>
      </div>
    </footer>
  );
}

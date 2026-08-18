export default function Atmosphere() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      {/* Flat near-black, and that is the whole background. Every violet wash
          and gradient is gone: the reference sites hold a single ground colour
          and let type, rules and links carry the accent. */}
      <div className="absolute inset-0 bg-void" />
      <div className="noise-overlay" />
    </div>
  );
}

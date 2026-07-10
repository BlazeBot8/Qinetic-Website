import logo from "../assets/logo.png";

export function Wordmark({ className = "" }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <img
        src={logo}
        alt=""
        className="h-7 w-7 drop-shadow-[0_0_14px_rgba(168,85,247,0.65)]"
      />
      <span className="font-display text-[1.125rem] font-extrabold tracking-[0.16em] text-white">
        QINETIC
      </span>
    </span>
  );
}

export function Arrow() {
  return <span className="font-sans">→</span>;
}

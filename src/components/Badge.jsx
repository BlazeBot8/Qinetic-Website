import { useId } from "react";

const VIOLET = "#8f2dff";
const FONT = "'Orbitron', 'JetBrains Mono', ui-monospace, monospace";

// One icon per module, drawn in a 100x100 space around (50, 38).
function Icon({ module, stroke }) {
  const common = {
    fill: "none",
    stroke,
    strokeWidth: 3.6,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };
  switch (module) {
    case 1:
      return (
        <g {...common}>
          <circle cx="50" cy="38" r="8.5" />
          <ellipse cx="50" cy="38" rx="19" ry="6.5" transform="rotate(-22 50 38)" />
        </g>
      );
    case 2:
      return <path {...common} d="M31,36 C35,18 43,18 47,36 S59,56 63,40" />;
    case 3:
      return (
        <g {...common}>
          <circle cx="43" cy="38" r="11" />
          <circle cx="57" cy="38" r="11" />
        </g>
      );
    case 4:
      return <path {...common} d="M31,40 q6.5,-15 13,0 t13,0 t13,0" />;
    default:
      return (
        <g {...common}>
          <path d="M50,22 L66,28 V40 C66,50 59,56 50,60 C41,56 34,50 34,40 V28 Z" />
          <path d="M43,41 L48.5,46.5 L58,35" />
        </g>
      );
  }
}

// Earned badges are full colour; locked ones are the same disc in grey with a
// lock where the icon goes.
export default function Badge({ module, earned = false, size = 96 }) {
  const uid = useId().replace(/:/g, "");
  const label = String(module).padStart(2, "0");

  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      role="img"
      aria-label={`Module ${module} badge, ${earned ? "earned" : "locked"}`}
      style={
        earned
          ? { filter: "drop-shadow(0 0 7px rgba(143,45,255,0.45))" }
          : { filter: "grayscale(1)", opacity: 0.45 }
      }
    >
      <defs>
        <linearGradient id={`ring${uid}`} x1="0.15" y1="0" x2="0.85" y2="1">
          <stop offset="0" stopColor="#9aa1b3" />
          <stop offset="0.5" stopColor="#5d6273" />
          <stop offset="1" stopColor="#2c2f3b" />
        </linearGradient>
        <radialGradient id={`disc${uid}`} cx="0.5" cy="0.66" r="0.62">
          <stop offset="0" stopColor="#4a1a96" />
          <stop offset="0.55" stopColor="#1c1432" />
          <stop offset="1" stopColor="#101015" />
        </radialGradient>
        <path id={`arc${uid}`} d="M 16.5,50 A 33.5,33.5 0 0 1 83.5,50" />
      </defs>

      <circle cx="50" cy="50" r="48.5" fill={`url(#ring${uid})`} />
      <circle cx="50" cy="50" r="42.5" fill="#1b1d26" />
      <circle cx="50" cy="50" r="40.5" fill={`url(#disc${uid})`} />
      <circle cx="50" cy="50" r="40.5" fill="none" stroke="#6a7084" strokeWidth="0.6" />

      <text
        fontFamily={FONT}
        fontSize="4.6"
        letterSpacing="1.15"
        fill="#8d92a4"
        textAnchor="middle"
      >
        <textPath href={`#arc${uid}`} startOffset="50%">
          QINETIC RESEARCH LAB
        </textPath>
      </text>

      {earned ? (
        <Icon module={module} stroke={VIOLET} />
      ) : (
        <g fill="none" stroke="#9097aa" strokeWidth="3.2" strokeLinecap="round">
          <rect x="41" y="36" width="18" height="14" rx="2.5" fill="#9097aa" />
          <path d="M44.5,36 v-5 a5.5,5.5 0 0 1 11,0 v5" />
        </g>
      )}

      <text
        x="50"
        y="67.5"
        textAnchor="middle"
        fontFamily={FONT}
        fontSize="5.4"
        letterSpacing="1.4"
        fill="#8d92a4"
      >
        MODULE {label}
      </text>
      <text
        x="50"
        y="76.5"
        textAnchor="middle"
        fontFamily={FONT}
        fontSize="7.6"
        fontWeight="700"
        letterSpacing="0.6"
        fill="#f4f2f7"
      >
        MOD {module}
      </text>
    </svg>
  );
}

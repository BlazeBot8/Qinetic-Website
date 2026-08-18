import { useRef, useState } from "react";

/**
 * RealAmplitudes(3, reps=1, entanglement="linear") followed by measurement.
 *
 * A real circuit rather than notation-shaped decoration: RealAmplitudes is the
 * ansatz qiskit-machine-learning's VQC falls back on when none is supplied.
 * reps=1 gives two RY layers over three qubits — six trained parameters,
 * theta[0..5] — with a linear CX chain between them, CX(0,1) then CX(1,2).
 *
 * Drawn at reps=1 with entanglement="linear" for legibility. The library's own
 * defaults are reps=3 and entanglement="reverse_linear", so the prose below
 * claims only the ansatz itself as the default, not this configuration.
 *
 * Nothing moves on its own. Hovering lifts the strokes under the cursor and
 * names whichever gate is beneath it; leaving returns it to a still diagram.
 */
const WIRES = [50, 120, 190];
const X_START = 44;
const X_END = 396;
const VB_W = 420;
const VB_H = 240;
const SUB = ["₀", "₁", "₂", "₃", "₄", "₅"];

const RY1_X = 96;
const RY2_X = 292;
const CX1_X = 168;
const CX2_X = 222;
const M_X = 362;

/** Hit targets, one per gate. Geometry is in viewBox units. */
const PARTS = [
  ...WIRES.map((y, i) => ({
    id: `ry1-${i}`,
    x: RY1_X,
    y,
    w: 62,
    h: 32,
    name: `RY θ${SUB[i]}`,
    description: `Rotates qubit ${i} about the Y axis by the trained angle θ${SUB[i]}.`,
  })),
  {
    id: "cx1",
    x: CX1_X,
    y: (WIRES[0] + WIRES[1]) / 2,
    w: 30,
    h: WIRES[1] - WIRES[0] + 28,
    name: "CX (0, 1)",
    description:
      "Flips qubit 1 whenever qubit 0 is |1⟩. This is what entangles them.",
  },
  {
    id: "cx2",
    x: CX2_X,
    y: (WIRES[1] + WIRES[2]) / 2,
    w: 30,
    h: WIRES[2] - WIRES[1] + 28,
    name: "CX (1, 2)",
    description:
      "Extends the chain, carrying the entanglement onto qubit 2.",
  },
  ...WIRES.map((y, i) => ({
    id: `ry2-${i}`,
    x: RY2_X,
    y,
    w: 62,
    h: 32,
    name: `RY θ${SUB[i + 3]}`,
    description: `Second layer. Qubit ${i} turns by θ${SUB[i + 3]}, this time after entanglement.`,
  })),
  ...WIRES.map((y, i) => ({
    id: `m-${i}`,
    x: M_X,
    y,
    w: 34,
    h: 32,
    name: "Measurement",
    description: `Collapses qubit ${i} into a single classical bit.`,
  })),
];

function Target({ x, y }) {
  return (
    <g>
      <circle cx={x} cy={y} r="11" />
      <line x1={x - 11} y1={y} x2={x + 11} y2={y} />
      <line x1={x} y1={y - 11} x2={x} y2={y + 11} />
    </g>
  );
}

function RyLayer({ x, from }) {
  return (
    <g>
      <g stroke="currentColor" strokeWidth="1" fill="none">
        {WIRES.map((y) => (
          <rect key={y} x={x - 31} y={y - 16} width="62" height="32" rx="1" />
        ))}
      </g>
      <g
        fill="currentColor"
        fontFamily="var(--font-display)"
        fontSize="12"
        textAnchor="middle"
        dominantBaseline="central"
      >
        {WIRES.map((y, i) => (
          <text key={y} x={x} y={y}>
            {`RY θ${SUB[from + i]}`}
          </text>
        ))}
      </g>
    </g>
  );
}

/** The drawing itself, rendered twice: once as the base, once as the brighter
    copy that the cursor mask reveals. */
function CircuitArt() {
  return (
    <>
      <g className="qc-wire" stroke="currentColor" strokeWidth="1">
        {WIRES.map((y) => (
          <line key={y} x1={X_START} y1={y} x2={X_END} y2={y} />
        ))}
      </g>

      <g
        className="qc-register"
        fill="currentColor"
        fontFamily="var(--font-display)"
        fontSize="12"
        textAnchor="end"
        dominantBaseline="central"
      >
        {WIRES.map((y) => (
          <text key={y} x="32" y={y}>
            {"|0⟩"}
          </text>
        ))}
      </g>

      <g className="qc-gate">
        <RyLayer x={RY1_X} from={0} />

        {/* CX(0,1) — control dots are the only filled marks, per notation */}
        <g stroke="currentColor" strokeWidth="1" fill="none">
          <line x1={CX1_X} y1={WIRES[0]} x2={CX1_X} y2={WIRES[1]} />
          <Target x={CX1_X} y={WIRES[1]} />
        </g>
        <circle cx={CX1_X} cy={WIRES[0]} r="3.5" fill="currentColor" />

        {/* CX(1,2) */}
        <g stroke="currentColor" strokeWidth="1" fill="none">
          <line x1={CX2_X} y1={WIRES[1]} x2={CX2_X} y2={WIRES[2]} />
          <Target x={CX2_X} y={WIRES[2]} />
        </g>
        <circle cx={CX2_X} cy={WIRES[1]} r="3.5" fill="currentColor" />

        <RyLayer x={RY2_X} from={3} />

        {/* measurement */}
        <g stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round">
          {WIRES.map((y) => (
            <g key={y}>
              <rect x={M_X - 17} y={y - 16} width="34" height="32" rx="1" />
              <path d={`M ${M_X - 9} ${y + 7} A 9 9 0 0 1 ${M_X + 9} ${y + 7}`} />
              <line x1={M_X} y1={y + 7} x2={M_X + 7} y2={y - 6} />
            </g>
          ))}
        </g>
      </g>
    </>
  );
}

export default function CircuitFigure({ className = "" }) {
  const stageRef = useRef(null);
  const [active, setActive] = useState(null);

  // Written straight to the element as custom properties. Pointer position
  // held in React state would re-render the whole figure on every move.
  const trackCursor = (event) => {
    const stage = stageRef.current;
    if (!stage) return;
    const box = stage.getBoundingClientRect();
    stage.style.setProperty("--qc-x", `${event.clientX - box.left}px`);
    stage.style.setProperty("--qc-y", `${event.clientY - box.top}px`);
  };

  const clearCursor = () => {
    const stage = stageRef.current;
    if (stage) {
      stage.style.removeProperty("--qc-x");
      stage.style.removeProperty("--qc-y");
    }
    setActive(null);
  };

  return (
    <figure className={className}>
      <div
        ref={stageRef}
        className="qc-stage"
        onPointerMove={trackCursor}
        onPointerLeave={clearCursor}
      >
        <svg
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          role="img"
          aria-label="Quantum circuit: RealAmplitudes ansatz on three qubits with one repetition and linear entanglement, followed by measurement."
          className="qc-svg qc-base"
        >
          <CircuitArt />
        </svg>

        {/* Brighter duplicate, revealed only through a soft mask that follows
            the cursor. Masking the strokes rather than overlaying a lit disc
            keeps the background flat — only the drawing lifts. */}
        <svg
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          aria-hidden="true"
          className="qc-svg qc-glow"
        >
          <CircuitArt />
        </svg>

        <svg
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          aria-hidden="true"
          className="qc-svg qc-hit"
        >
          {PARTS.map((part) => (
            <rect
              key={part.id}
              x={part.x - part.w / 2 - 5}
              y={part.y - part.h / 2 - 5}
              width={part.w + 10}
              height={part.h + 10}
              fill="transparent"
              onPointerEnter={() => setActive(part)}
            />
          ))}
        </svg>

        {active && (
          <div
            className="qc-tip"
            style={{
              left: `${(active.x / VB_W) * 100}%`,
              top: `${((active.y - active.h / 2) / VB_H) * 100}%`,
              // Nudged in at the edges so the panel never leaves the column.
              transform: `translate(${
                active.x / VB_W > 0.72
                  ? "-88%"
                  : active.x / VB_W < 0.2
                    ? "-12%"
                    : "-50%"
              }, calc(-100% - 10px))`,
            }}
          >
            <span className="qc-tip-name">{active.name}</span>
            <span className="qc-tip-desc">{active.description}</span>
          </div>
        )}
      </div>

      {/* Native disclosure: keyboard-operable, and no JS state to keep in sync. */}
      <details className="qc-details mt-6">
        <summary className="qc-summary">What this circuit is</summary>
        <div className="qc-details-body">
          <p>
            RealAmplitudes on three qubits — the ansatz Qiskit&rsquo;s VQC falls
            back on when none is supplied. Drawn here at one repetition with
            linear entanglement; the library&rsquo;s own defaults are three
            repetitions and reverse-linear.
          </p>
          <p>
            Each qubit starts in <span className="qc-ket">{"|0⟩"}</span>. A
            layer of RY rotations applies the first three trained parameters, two
            CX gates entangle the register in a chain, 0&rarr;1 then 1&rarr;2,
            and a second RY layer applies the remaining three. The name describes
            what it produces: with only Y rotations and CX gates, the prepared
            state has real amplitudes and no imaginary component. The final
            column measures each qubit into a classical bit, and{" "}
            {"θ₀–θ₅"} are what training adjusts.
          </p>
        </div>
      </details>
    </figure>
  );
}

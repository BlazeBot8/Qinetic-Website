// Course content. Each module has a list of lessons (one embedded video each),
// a short reading, and a quiz. Questions are NOT here: they live in the
// database so the answer key never ships to the browser.
//
// videoUrl: a YouTube or Vimeo link. Empty shows a "coming soon" panel.
export const MODULES = [
  {
    id: 1,
    title: "Foundations",
    badgeName: "Foundations",
    blurb: "Qubits, superposition, Bloch sphere",
    lessons: [
      {
        title: "What Is a Qubit | How Quantum Computers Actually Work",
        videoUrl: "https://www.youtube.com/watch?v=3Vjuuna4GmA",
      },
      {
        title: "What Is the Wave Function (Ψ)",
        videoUrl: "https://www.youtube.com/watch?v=gCrMvmoNLto",
      },
      {
        title: "Quantum States | Density Matrices and Bra-Kets",
        videoUrl: "https://www.youtube.com/watch?v=g7NctIX87Hg",
      },
      {
        title: "What Is the Hamiltonian",
        videoUrl: "https://www.youtube.com/watch?v=AMQ93xxmJdE",
      },
    ],
    summary: [
      "A classical bit is always exactly 0 or 1. A qubit can also be in a superposition, written α|0⟩ + β|1⟩, where α and β are complex numbers called amplitudes. Superposition doesn't mean the qubit is secretly 0 or 1, or flipping fast between them. When you measure it you get just 0 or 1, with probability equal to the squared magnitude of that outcome's amplitude, and the state collapses to match the result. So one qubit only ever gives you one classical bit when read. A single qubit's state can be drawn as a point on the Bloch sphere, with |0⟩ at the north pole and |1⟩ at the south. Real qubits are built from superconducting circuits, trapped ions, photons and more, and most are cooled close to absolute zero so heat doesn't scramble them. Describing n qubits takes 2^n amplitudes, but you can't read them all out. Quantum algorithms work by interference instead, arranging amplitudes so wrong answers cancel and right ones build up.",
      "The wave function Ψ is the complete description of a quantum state. Its values are complex numbers, and |Ψ|² gives the probability of each outcome (the Born rule). That's why it has to be normalized so all probabilities add to 1. You never see Ψ directly; each measurement gives one outcome, and the probabilities only show up over many runs.",
      "Bra-ket notation is the shorthand for all of this. A ket |ψ⟩ is a state, a bra ⟨ψ| is its conjugate transpose, and ⟨φ|ψ⟩ is their overlap, which is 0 for orthogonal states. Multi-qubit states are built with the tensor product, so |01⟩ means the first qubit is 0 and the second is 1. The state (|0⟩ + |1⟩)/√2 is called |+⟩, and (|0⟩ − |1⟩)/√2 is |−⟩. A global phase on the whole state can't be detected, but a relative phase like the one separating |+⟩ from |−⟩ can, by measuring in the X basis. When there's classical uncertainty about which state you have, you use a density matrix. For a pure state it's |ψ⟩⟨ψ|. Every density matrix has trace 1 and no negative eigenvalues. Its diagonal entries (populations) are outcome probabilities and its off-diagonal entries are called coherences. Pure states have purity Tr(ρ²) = 1 and sit on the Bloch sphere's surface, while mixed states sit inside it, down to the maximally mixed state I/2 at the center.",
      "The Hamiltonian H is the operator for a system's total energy. Its eigenvalues are the allowed energy levels: the lowest is the ground state and the rest are excited states. Through the Schrödinger equation, H decides how a state changes over time. For a closed system that change is the unitary U = e^(−iHt/ħ), and an energy eigenstate just picks up a harmless global phase. Like every observable, H is Hermitian, and the average of many measurements of an observable A is the expectation value ⟨ψ|A|ψ⟩.",
    ],
  },
  {
    id: 2,
    title: "Operations and Dynamics",
    badgeName: "Operations & Dynamics",
    blurb: "Gates, evolution, decoherence",
    lessons: [
      {
        title: "What Do These Quantum Operators Actually Do? | Entangling, Kraus, and Choi",
        videoUrl: "https://www.youtube.com/watch?v=9nTAwllfSEA",
      },
      {
        title: "What Is Quantum Decoherence?",
        videoUrl: "https://www.youtube.com/watch?v=VXjMoCo89BY",
      },
      {
        title: "What Is Quantum Tunnelling?",
        videoUrl: "https://www.youtube.com/watch?v=MXF_wJIQ-LE",
      },
      {
        title: "The Computer That Doesn't Calculate (Quantum Tunneling Explained)",
        videoUrl: "https://www.youtube.com/watch?v=_ebVVZ4D82U",
      },
    ],
    summary: [
      "In an ideal, isolated system, quantum gates are unitary operators, which means every gate is reversible: applying U† undoes U. The Pauli-X gate flips |0⟩ to |1⟩, Z multiplies |1⟩ by −1, and Y does both at once. The Hadamard turns a basis state into an equal superposition, and applying it twice gets you back where you started. Two-qubit gates are where entanglement comes from. The CNOT flips its target only when the control is |1⟩, so a control in superposition produces an entangled pair. Single-qubit gates alone can never do that. SWAP exchanges two qubits, and the Toffoli flips a target only when both controls are 1. A universal gate set is one that can approximate any quantum operation. Measurement is the odd one out: it collapses the state, so it isn't reversible and isn't unitary.",
      "Real qubits aren't isolated. Once a qubit leaks information into its environment, its own evolution stops being unitary, so we describe it with a quantum channel. A channel maps density matrices to density matrices, and it has to be CPTP: completely positive and trace preserving. Kraus operators are one way to write a channel; they must satisfy Σ Kᵢ†Kᵢ = I so probabilities still add to 1, and a perfect unitary needs only one. The Choi matrix is another way: apply the channel to half of a maximally entangled state and the result encodes the entire channel in a single matrix. Any noisy channel can also be pictured as a unitary on the qubit plus its environment, after which the environment is ignored.",
      "Decoherence is that leakage in action. Stray fields, heat and material defects cause a qubit to lose its quantum behavior, and no human observer is needed. Dephasing shrinks the off-diagonal coherences of the density matrix, so |+⟩ slowly becomes a 50/50 classical coin. Amplitude damping models energy loss, |1⟩ decaying to |0⟩. T1 is how long relaxation takes and T2 is how long phase coherence lasts. Together they cap how many gates you can run, which is why gate fidelity matters so much. Decoherence is also why we never see everyday objects in superposition.",
      "Tunneling comes from particles acting like waves. The wave function doesn't drop to zero at an energy barrier, so there's some chance of finding the particle on the far side, and that chance falls fast as the barrier gets thicker. Tunneling powers fusion in the Sun, the scanning tunneling microscope and the Josephson junctions inside superconducting qubits. It also causes current leakage in shrinking transistors. Quantum annealers, the \"computers that don't calculate,\" use it on purpose. The answer to an optimization problem, usually written in QUBO or Ising form, is encoded as the ground state of a Hamiltonian. The machine starts in an easy ground state and changes slowly, so by the adiabatic theorem it stays in the ground state; go too fast and it lands in a worse, higher-energy answer. Tunneling lets it pass through thin barriers that would trap classical simulated annealing. D-Wave builds these machines, and they are specialized for optimization rather than general gate-based computing.",
    ],
  },
  {
    id: 3,
    title: "Entanglement",
    badgeName: "Entanglement",
    blurb: "Bell states, non-locality",
    lessons: [
      {
        title: "The Entanglement Game | CHSH, Superdense Coding, and Quantum Entanglement",
        videoUrl: "https://www.youtube.com/watch?v=aLKQzmG3HLQ",
      },
    ],
    summary: [
      "Two qubits are entangled when their joint state can't be split into a product of two separate single-qubit states. (|00⟩ + |01⟩)/√2 isn't entangled, because it factors into |0⟩ ⊗ |+⟩. (|00⟩ + |11⟩)/√2 is entangled. It's one of the four Bell states, which together form a complete basis for two qubits, and you make it from |00⟩ with a Hadamard and then a CNOT. Measure the first qubit and get 0, and the second will give 0 too. Measured on its own, though, each half looks like a fair coin, so entanglement can't send messages faster than light. You only see the correlation after comparing results through ordinary communication. The singlet (|01⟩ − |10⟩)/√2 always gives opposite results along any shared axis. Entanglement extends to more qubits too, as in the GHZ state (|000⟩ + |111⟩)/√2. It is monogamous: a maximally entangled pair can't share entanglement with a third qubit. It also doesn't weaken with distance, only with noise, and decoherence destroys it easily. Schrödinger coined the word, and one Bell pair is counted as one ebit.",
      "Why is this different from ordinary correlation, like two gloves split into two boxes? Einstein called it \"spooky action at a distance,\" and the 1935 EPR paper argued quantum mechanics might be incomplete. The alternative was local hidden variables, where outcomes are fixed in advance and nothing travels faster than light. In 1964 John Bell showed this idea makes predictions that differ from quantum mechanics. The CHSH game puts that to a test. Alice gets a random bit x and Bob a random bit y, they can't talk, and they win if a XOR b equals x AND y. Only x = y = 1 needs different answers. The best classical strategy is to both always answer 0, which wins 75% of the time. With a shared Bell pair, Alice and Bob pick their measurement angles based on their inputs and win about 85%. In inequality form, any local hidden variable theory obeys |S| ≤ 2, while quantum mechanics reaches 2√2 (Tsirelson's bound). Experiments violate the classical bound, and 2015 tests closed the main loopholes. The 2022 Nobel Prize recognized this work, which also underpins protocols like E91 key distribution.",
      "Superdense coding turns entanglement into a resource. Alice and Bob share a Bell pair in advance. To send two classical bits, Alice applies I, X, Z or both X and Z to her qubit, which switches the pair into one of four Bell states. She then mails just that one qubit. Bob applies a CNOT and a Hadamard and measures both qubits to read all four possible messages; identity gives 00. No rule is broken, since Bob ends up holding two qubits, one delivered earlier. An eavesdropper grabbing Alice's qubit sees only randomness. Each pair is used up per message. Teleportation runs the trade in reverse: a shared pair plus two classical bits moves a qubit's state from one place to another.",
    ],
  },
  {
    id: 4,
    title: "Algorithms",
    badgeName: "Algorithms",
    blurb: "Grover, Shor, QFT",
    lessons: [
      {
        title: "What Really Is the Quantum Fourier Transform?",
        videoUrl: "https://www.youtube.com/watch?v=-mgbrn6-IR8",
      },
      {
        title: "What Is Grover's and Shor's Algorithm?",
        videoUrl: "https://www.youtube.com/watch?v=uSnmgLMA23M",
      },
      {
        title: "Classical Computing May Have Been Beaten | QAOA Algorithm",
        videoUrl: "https://www.youtube.com/watch?v=bFphIw8S2ms",
      },
    ],
    summary: [
      "The quantum Fourier transform (QFT) is the quantum version of the discrete Fourier transform. It maps basis states into superpositions whose relative phases encode frequency, which makes it great at exposing hidden periodicity. The circuit uses only Hadamards and controlled phase rotations, plus SWAPs at the end to fix qubit order. That's about n² gates on n qubits, versus roughly n·2^n steps for a classical FFT on 2^n numbers. An approximate QFT drops the tiniest rotations with little loss. The catch is that you can't read out all the Fourier coefficients, since measurement gives a single outcome. So the QFT works as a step inside bigger algorithms. In phase estimation, the inverse QFT turns phase information into a basis state you can measure, revealing an eigenvalue's phase. Applied to |00...0⟩, the QFT just gives an equal superposition.",
      "Grover's algorithm searches an unstructured list of N items in about √N queries instead of N. An oracle marks the target by flipping the sign of its amplitude. A diffusion step then reflects all amplitudes about their average, which boosts the marked one. Repeat about (π/4)√N times; for 4 items, one round finds the answer with certainty. Overshoot and the success chance drops again. Grover is a special case of amplitude amplification. Its speedup is only quadratic because the problem has no structure to exploit, so it doesn't make NP-complete problems easy. Against AES it roughly halves key strength, which longer keys fix.",
      "Shor's algorithm factors integers with an exponential speedup over the best classical method, the general number field sieve. It turns factoring into finding the period of a modular exponentiation function, uses the QFT to find that period, and leaves the rest (random choices, greatest common divisors, post-processing) to a classical computer. Because RSA and elliptic curve cryptography rely on problems like this being hard, Shor is a real security threat. That's what drives post-quantum cryptography and fears of \"harvest now, decrypt later.\" Today's hardware has only factored tiny numbers like 15 and 21, so real RSA keys are safe for now. The gap between Grover and Shor comes down to structure: Shor exploits periodicity, Grover has nothing to grab.",
      "QAOA, the Quantum Approximate Optimization Algorithm, is a hybrid variational method built for noisy near-term (NISQ) devices. It alternates a cost operator for the problem with a mixer operator, for p layers. A classical optimizer tunes the angles γ and β, estimating the cost by averaging many shots. More layers can give better answers, and as p goes to infinity QAOA approaches adiabatic computing and the exact optimum. \"Approximate\" means it aims for good answers, not guaranteed best ones. The classic test is MaxCut: split a graph's nodes into two groups to cut as many edges as possible. Its cousin VQE estimates molecular ground-state energies. Despite the hype, QAOA hasn't proven quantum advantage. It still has to beat strong classical methods like Goemans-Williamson, and dequantized classical algorithms keep catching up to claimed quantum speedups.",
    ],
  },
  {
    id: 5,
    title: "Error Correction and Hardware Reality",
    badgeName: "Error Correction",
    blurb: "Stabilizer codes, fault tolerance",
    lessons: [
      {
        title: "What Happens When Qubits Break? | Quantum Error Correction",
        videoUrl: "https://www.youtube.com/watch?v=EkczEHUZg5o",
      },
      {
        title: "Surface Codes | The Closest We've Ever Gotten to Fault-Tolerance",
        videoUrl: "https://www.youtube.com/watch?v=QEu86XPkuNU",
      },
      {
        title: "Build Your First Quantum Program in 6 Minutes (Qiskit)",
        videoUrl: "https://www.youtube.com/watch?v=TUZY-DNe8QU",
      },
    ],
    summary: [
      "Qubits are fragile, and noise builds up over a computation, so useful quantum computers need error correction. Classical machines can just keep backup copies, but the no-cloning theorem forbids copying an unknown quantum state. Directly measuring the data would also collapse it. Quantum error correction gets around both problems by spreading one logical qubit across several entangled physical qubits. It then measures only syndromes: parity checks that reveal which error happened without revealing the data. Most codes target two error types, bit flips (X) and phase flips (Z). The three-qubit bit-flip code encodes logical |0⟩ as |000⟩ and fixes a flip on any one qubit, and the phase-flip code does the same in the |+⟩/|−⟩ basis. Shor's original code combined both with 9 qubits, and 5 is the minimum for correcting any single-qubit error. Real errors are small and continuous, but syndrome measurement snaps them into discrete errors the code can fix. The threshold theorem is the payoff: if physical error rates are below a threshold, adding more correction can push logical errors as low as you want, which is what fault tolerance means.",
      "The surface code is the leading practical design. Qubits sit on a 2D grid, split into data qubits and measurement qubits, and each one only talks to its nearest neighbors, which suits real chips. Stabilizer measurements check X and Z parities of neighboring data qubits, catching both error types. They're repeated over many rounds because the checks can fail too. A classical decoder reads the syndromes and infers the likeliest errors, and it has to keep pace in real time. The code tolerates error rates around 1%. Its distance is the smallest number of physical errors that can cause an undetected logical error, usually a chain stretching across the grid. Below threshold, raising the distance lowers the logical error rate, at the cost of many more physical qubits. That overhead is why breaking RSA-2048 is estimated to need hundreds of thousands to millions of physical qubits. In 2024 Google's Willow chip showed logical errors dropping as distance grew, a key below-threshold milestone. Correlated errors from things like cosmic rays and leakage out of the qubit's two levels remain hard problems. Today's machines are NISQ (Noisy Intermediate-Scale Quantum) and lean on error mitigation, which reduces noise's impact without full encoding.",
      "Qiskit, IBM's open-source framework, is where you put this into practice. You create a QuantumCircuit; QuantumCircuit(2, 2) has 2 qubits and 2 classical bits, and all qubits start in |0⟩. qc.h(0) adds a Hadamard, qc.cx(0, 1) adds a CNOT with qubit 0 as control, and measurements (or qc.measure_all()) turn qubit states into readable bits. qc.draw() shows the circuit. Transpiling rewrites it for a backend's native gates and connections, and the backend (a simulator or real device) runs it for a set number of shots. result.get_counts() returns a dictionary of bitstrings, where qubit 0 is the rightmost bit. A Bell circuit gives about half 00 and half 11 on an ideal simulator, while real hardware adds a few 01 and 10 from noise.",
    ],
  },
];

export const COURSE_NAME = "Qinetic Quantum Computing Curriculum";
export const MODULE_PASS = 7;
export const MODULE_TOTAL = 10;
export const FINAL_PASS = 28;
export const FINAL_TOTAL = 35;

// Accepts a normal YouTube/Vimeo link and returns the embeddable URL.
export function toEmbedUrl(url) {
  if (!url) return "";
  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^www\./, "");
    if (host === "youtu.be") {
      return `https://www.youtube-nocookie.com/embed/${u.pathname.slice(1)}`;
    }
    if (host === "youtube.com" || host === "m.youtube.com") {
      if (u.pathname.startsWith("/embed/")) {
        return `https://www.youtube-nocookie.com${u.pathname}`;
      }
      const id = u.searchParams.get("v");
      if (id) return `https://www.youtube-nocookie.com/embed/${id}`;
    }
    if (host === "vimeo.com") {
      return `https://player.vimeo.com/video/${u.pathname.split("/").filter(Boolean)[0]}`;
    }
    return url;
  } catch {
    return "";
  }
}

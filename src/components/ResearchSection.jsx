import { Reveal, RevealGroup, RevealItem } from "./Reveal";

const projects = [
  {
    title: "Wavefunction Super-Resolution via Physics-Informed CNNs",
    description:
      "We pair cheap, low-resolution quantum simulations with a 1D CNN trained as a super-resolution operator, reconstructing fine-grained wavefunctions and energy levels without the cost of running high-resolution solvers directly. The goal is HPC-grade accuracy at a fraction of the compute.",
  },
  {
    title: "Quantum Neural Networks for Credit Risk",
    description:
      "We're testing whether a Variational Quantum Classifier, built in Qiskit and run on a local simulator, can match or beat classical baselines like logistic regression and random forest on credit-risk prediction, especially as training data shrinks toward the small-sample regime.",
  },
  {
    title: "Noise-Aware Learning on NISQ Hardware",
    description:
      "Current quantum hardware is noisy, and that noise isn't random, it's structured. We're training classical ML models to characterize and predict a given quantum device's error patterns, then using those predictions to correct or reweight circuit outputs, aiming for cleaner results without new hardware.",
  },
  {
    title: "Learned Quantum Feature Embeddings",
    description:
      "How you encode classical data into a quantum circuit often matters more than the circuit itself. We're treating the encoding as a trainable component rather than a fixed choice, optimizing embeddings directly against downstream task performance instead of relying on standard, hand-picked feature maps.",
  },
  {
    title: "Tensor Networks as a Simulation Bridge",
    description:
      "Quantum circuits are expensive to simulate classically, but tensor networks can approximate them efficiently under the right structure. We're using tensor network methods to probe what small quantum models are actually learning, offering an interpretability lens that quantum hardware alone can't provide.",
  },
];

export default function ResearchSection() {
  return (
    <section
      id="research"
      className="relative z-10 mx-auto max-w-[1200px] px-[clamp(1.25rem,5vw,3rem)] py-[clamp(3.125rem,8vw,6.875rem)]"
    >
      <div className="max-w-[720px]">
        <Reveal>
          <p className="section-index mb-5">[ 03 ]&nbsp;Research</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="font-display text-[clamp(1.75rem,4.4vw,3.125rem)] font-bold leading-[1.05] tracking-[-0.02em] text-fg-hi">
            Active lines of inquiry
          </h2>
        </Reveal>
      </div>

      <RevealGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
        {projects.map((project, i) => (
          <RevealItem
            key={project.title}
            className={
              i < 3
                ? "lg:col-span-2"
                : i === 3
                  ? "lg:col-span-2 lg:col-start-2"
                  : "lg:col-span-2 lg:col-start-4"
            }
          >
            <article className="card-feature h-full">
              <p className="mb-2.5 font-display text-[0.6875rem] tracking-[0.2em] text-fg-faint">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mb-3 font-display text-[1.0625rem] font-bold leading-snug tracking-[-0.01em] text-fg-hi">
                {project.title}
              </h3>
              <p className="text-[0.875rem] leading-relaxed text-[#9c93b4]">
                {project.description}
              </p>
            </article>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}

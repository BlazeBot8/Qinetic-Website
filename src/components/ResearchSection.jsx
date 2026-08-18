import { Reveal, RevealGroup, RevealItem } from "./Reveal";
import { Parallax } from "./Parallax";

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
      className="relative z-10 mx-auto max-w-[1200px] border-t border-violet-glow/10 px-[clamp(1.25rem,5vw,3rem)] py-[clamp(2.75rem,6vw,5rem)]"
    >
      <Parallax distance={34} className="max-w-[720px]">
        <Reveal>
          <p className="section-index mb-5">Research</p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="font-serif text-[clamp(1.875rem,4.4vw,3.125rem)] font-normal leading-[1.1] tracking-[-0.02em] text-fg-hi">
            What we are working on
          </h2>
        </Reveal>
      </Parallax>

      <Reveal delay={0.12}>
        <span className="section-rule mt-[clamp(1.125rem,2.2vw,1.625rem)]" />
      </Reveal>

      <Parallax distance={-16}>
      <RevealGroup className="mt-[clamp(1.75rem,3.4vw,2.5rem)]">
        {projects.map((project) => (
          <RevealItem key={project.title}>
            <article className="entry group grid gap-x-[clamp(1.5rem,4vw,3.5rem)] gap-y-3 py-[clamp(1.5rem,2.6vw,2rem)] md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
              <div>
                <h3 className="font-serif text-[clamp(1.25rem,2.2vw,1.5rem)] font-normal leading-snug tracking-[-0.015em] text-fg-hi transition-colors duration-300 group-hover:text-white">
                  {project.title}
                </h3>
              </div>
              <p className="max-w-[62ch] text-[0.9375rem] leading-[1.75] text-fg-muted">
                {project.description}
              </p>
            </article>
          </RevealItem>
        ))}
      </RevealGroup>
      </Parallax>
    </section>
  );
}

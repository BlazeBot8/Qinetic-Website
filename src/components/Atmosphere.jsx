import ParticleCanvas from "./ParticleCanvas";

export default function Atmosphere() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      <div className="absolute -left-[8vw] top-[-18vh] h-[60vw] max-h-[840px] w-[60vw] max-w-[840px] animate-q-float-a rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(124,58,237,0.55),rgba(124,58,237,0)_62%)] blur-[60px]" />
      <div className="absolute -right-[14vw] top-[8vh] h-[58vw] max-h-[780px] w-[58vw] max-w-[780px] animate-q-float-b rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(192,38,211,0.42),rgba(192,38,211,0)_60%)] blur-[70px]" />
      <div className="absolute bottom-[-22vh] left-[22vw] h-[52vw] max-h-[720px] w-[52vw] max-w-[720px] animate-q-float-c rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(79,70,229,0.4),rgba(79,70,229,0)_60%)] blur-[75px]" />

      <ParticleCanvas />

      <div className="noise-overlay" />
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_0%,rgba(10,6,18,0)_55%,rgba(10,6,18,0.9)_100%)]" />
    </div>
  );
}

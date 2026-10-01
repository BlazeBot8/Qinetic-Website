import Atmosphere from "./Atmosphere";
import Nav from "./Nav";
import Footer from "./Footer";

export default function LearnLayout({ children, width = 960 }) {
  return (
    <div className="relative min-h-screen bg-void text-fg">
      <Atmosphere />
      <Nav />
      <main
        className="relative z-10 mx-auto px-[clamp(1.25rem,5vw,3rem)] pb-[clamp(3rem,7vw,5rem)] pt-[clamp(6.5rem,13vh,8.5rem)]"
        style={{ maxWidth: width }}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
}

export function PageTitle({ eyebrow, title, children }) {
  return (
    <header className="mb-[clamp(1.75rem,3.4vw,2.5rem)]">
      <p className="section-index mb-4">{eyebrow}</p>
      <h1 className="font-serif text-[clamp(2rem,4.8vw,3.25rem)] font-normal leading-[1.1] tracking-[-0.02em] text-fg-hi">
        {title}
      </h1>
      {children && (
        <p className="mt-4 max-w-[58ch] text-[clamp(0.9375rem,2vw,1.0625rem)] leading-[1.7] text-fg-muted">
          {children}
        </p>
      )}
    </header>
  );
}

import { useEffect, useState } from "react";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-all duration-700"
      style={{
        background: scrolled ? "color-mix(in oklab, var(--ink) 88%, transparent)" : "transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
        padding: scrolled ? "0.85rem 0" : "1.75rem 0",
      }}
    >
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 md:px-12">
        <a href="#top" className="font-serif text-xl tracking-tight md:text-2xl">
          Paper <span style={{ color: "var(--gold)" }}>&</span> Pencil
        </a>
        <nav className="hidden gap-10 text-xs uppercase tracking-[0.28em] text-grey-soft md:flex">
          <a className="link-underline" href="#studio">Studio</a>
          <a className="link-underline" href="#services">Services</a>
          <a className="link-underline" href="#projects">Projects</a>
          <a className="link-underline" href="#process">Process</a>
          <a className="link-underline" href="#contact">Contact</a>
        </nav>
        <a href="#contact" className="hidden text-xs uppercase tracking-[0.28em] md:inline-flex" style={{ color: "var(--gold)" }}>
          <span className="link-underline">Enquire →</span>
        </a>
      </div>
    </header>
  );
}

import { useEffect, useRef } from "react";
import aboutImg from "@/assets/about.jpg";

export function About() {
  const ref = useRef<HTMLImageElement>(null);
  useEffect(() => {
    const onScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const offset = (rect.top - window.innerHeight / 2) * -0.08;
      ref.current.style.transform = `translate3d(0, ${offset}px, 0)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="studio" className="relative overflow-hidden py-32 md:py-44">
      <span className="ghost-numeral absolute -left-4 top-10 text-[16vw] md:left-6">02</span>
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-16 px-6 md:grid-cols-12 md:gap-20 md:px-12">
        <div className="reveal md:col-span-5">
          <div className="aspect-[4/5] overflow-hidden">
            <img ref={ref} src={aboutImg} alt="Studio desk" loading="lazy" width={1200} height={1500} className="h-[115%] w-full object-cover will-change-transform" />
          </div>
        </div>
        <div className="md:col-span-7 md:pl-12">
          <p className="reveal eyebrow">The Studio</p>
          <h2 className="reveal reveal-delay-1 mt-8 font-serif text-[clamp(2.25rem,5vw,4.5rem)] leading-[1.05]">
            We design with restraint, <span className="italic" style={{ color: "var(--gold)" }}>and resolve</span> with care.
          </h2>
          <div className="reveal reveal-delay-2 mt-10 grid gap-8 text-base font-light leading-relaxed md:grid-cols-2" style={{ color: "var(--grey-soft)" }}>
            <p>
              Paper & Pencil is a London-based interior architecture studio working across hospitality, residence, retail and the
              occasional cultural commission. We begin every project the same way — with a blank sheet, a sharpened pencil, and a long
              conversation.
            </p>
            <p>
              Our work is quiet. We favour proportion over ornament, material over motif. We believe a space should reveal itself
              slowly, like a good book, and stay relevant for longer than a season.
            </p>
          </div>
          <div className="reveal reveal-delay-3 mt-14 grid grid-cols-3 gap-6 border-t pt-10" style={{ borderColor: "var(--border)" }}>
            {[
              ["18", "Years practising"],
              ["94", "Projects delivered"],
              ["27", "Industry awards"],
            ].map(([n, l]) => (
              <div key={l}>
                <div className="font-serif text-4xl md:text-5xl" style={{ color: "var(--gold)" }}>{n}</div>
                <div className="mt-2 text-[10px] uppercase tracking-[0.28em]" style={{ color: "var(--grey)" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const services = [
  { n: "01", title: "Hospitality", desc: "Hotels, restaurants and members' clubs designed for return visits.", color: "oklch(0.45 0.18 25)" },
  { n: "02", title: "Residential", desc: "Private homes shaped around the rhythms of the people who live in them.", color: "oklch(0.32 0.12 295)" },
  { n: "03", title: "Retail", desc: "Brand environments that move at the speed of considered shopping.", color: "oklch(0.38 0.14 235)" },
  { n: "04", title: "Workspace", desc: "Studios and offices that quietly reward concentration.", color: "oklch(0.55 0.14 75)" },
];

export function Services() {
  return (
    <section id="services" className="relative border-t py-32 md:py-44" style={{ borderColor: "var(--border)", background: "var(--navy-deep)" }}>
      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div className="reveal max-w-xl">
            <p className="eyebrow">Disciplines</p>
            <h2 className="mt-6 font-serif text-[clamp(2.25rem,5vw,4.5rem)] leading-[1.05]">
              Four practices, <span className="italic" style={{ color: "var(--gold)" }}>one hand.</span>
            </h2>
          </div>
          <p className="reveal reveal-delay-1 max-w-sm text-sm font-light leading-relaxed" style={{ color: "var(--grey-soft)" }}>
            Every commission begins on paper. From sketch to specification, the same studio team carries the drawing to site.
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-px md:grid-cols-2" style={{ background: "var(--border)" }}>
          {services.map((s, i) => (
            <article
              key={s.n}
              className="reveal group relative overflow-hidden p-10 transition-colors duration-700 md:p-14"
              style={{ background: "var(--ink)", transitionDelay: `${i * 80}ms` }}
              data-cursor="hover"
            >
              <span
                className="pointer-events-none absolute inset-0 origin-bottom scale-y-0 transition-transform duration-700 ease-[var(--ease-luxury)] group-hover:scale-y-100"
                style={{ background: s.color }}
              />
              <div className="relative flex min-h-[280px] flex-col justify-between">
                <div className="flex items-start justify-between">
                  <span className="font-serif text-sm" style={{ color: "var(--gold)" }}>{s.n}</span>
                  <span className="text-xs uppercase tracking-[0.28em] opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ color: "var(--cream)" }}>
                    Discover →
                  </span>
                </div>
                <div>
                  <h3 className="font-serif text-4xl transition-transform duration-700 ease-[var(--ease-luxury)] group-hover:-translate-y-1 md:text-5xl">
                    {s.title}
                  </h3>
                  <p className="mt-5 max-w-md text-sm font-light leading-relaxed transition-colors duration-500" style={{ color: "var(--grey-soft)" }}>
                    {s.desc}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Marquee() {
  const items = ["Hospitality", "Residential", "Retail", "Workspace", "Concept Design", "Bespoke Joinery", "Art Direction"];
  const row = [...items, ...items, ...items];
  return (
    <section aria-hidden className="relative overflow-hidden border-y" style={{ borderColor: "var(--border)", background: "var(--navy-deep)" }}>
      <div className="flex animate-marquee gap-16 whitespace-nowrap py-8">
        {row.map((s, i) => (
          <span key={i} className="flex items-center gap-16 font-serif text-4xl italic md:text-6xl" style={{ color: "var(--dust)" }}>
            {s}
            <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: "var(--gold)" }} />
          </span>
        ))}
      </div>
    </section>
  );
}

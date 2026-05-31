const steps = [
  { n: "01", title: "Listen", text: "We begin with a long, unhurried conversation to understand the brief beneath the brief." },
  { n: "02", title: "Sketch", text: "Concepts emerge on paper before pixels — proportion, light and material drawn by hand." },
  { n: "03", title: "Resolve", text: "Drawings are refined to specification: every joint, finish and threshold detailed." },
  { n: "04", title: "Deliver", text: "We remain on site through completion, attending to the final tenth of one percent." },
];

export function Process() {
  return (
    <section id="process" className="relative border-y py-32 md:py-44" style={{ borderColor: "var(--border)", background: "var(--navy-deep)" }}>
      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        <div className="reveal max-w-2xl">
          <p className="eyebrow">The Process</p>
          <h2 className="mt-6 font-serif text-[clamp(2.25rem,5vw,4.5rem)] leading-[1.05]">
            A method, <span className="italic" style={{ color: "var(--gold)" }}>not a formula.</span>
          </h2>
        </div>

        <ol className="mt-20 grid grid-cols-1 gap-px md:grid-cols-4" style={{ background: "var(--border)" }}>
          {steps.map((s, i) => (
            <li
              key={s.n}
              className="reveal group relative p-10 md:p-12"
              style={{ background: "var(--navy-deep)", transitionDelay: `${i * 80}ms` }}
            >
              <div className="font-serif text-sm" style={{ color: "var(--gold)" }}>{s.n}</div>
              <h3 className="mt-12 font-serif text-3xl md:text-4xl">{s.title}</h3>
              <p className="mt-5 text-sm font-light leading-relaxed" style={{ color: "var(--grey-soft)" }}>{s.text}</p>
              <span className="mt-10 block h-px w-10 transition-all duration-700 group-hover:w-24" style={{ background: "var(--gold)" }} />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

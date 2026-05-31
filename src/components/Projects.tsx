import p1 from "@/assets/project1.jpg";
import p2 from "@/assets/project2.jpg";
import p3 from "@/assets/project3.jpg";
import p4 from "@/assets/project4.jpg";

const projects = [
  { img: p1, title: "The Cloister Hotel", tag: "Hospitality · 2024", place: "Marylebone, London" },
  { img: p2, title: "Maison Verre", tag: "Restaurant · 2024", place: "Soho, London" },
  { img: p3, title: "House on the Heath", tag: "Residential · 2023", place: "Hampstead, London" },
  { img: p4, title: "Atelier Nord", tag: "Retail · 2023", place: "Mayfair, London" },
];

export function Projects() {
  return (
    <section id="projects" className="relative py-32 md:py-44">
      <span className="ghost-numeral absolute right-2 top-12 text-[18vw] md:right-8">03</span>
      <div className="mx-auto max-w-[1600px] px-6 md:px-12">
        <div className="reveal flex items-end justify-between">
          <div>
            <p className="eyebrow">Selected Work</p>
            <h2 className="mt-6 font-serif text-[clamp(2.25rem,5vw,4.5rem)] leading-[1.05]">
              Recent <span className="italic" style={{ color: "var(--gold)" }}>drawings.</span>
            </h2>
          </div>
          <a href="#" className="link-underline hidden text-xs uppercase tracking-[0.3em] md:inline-block" style={{ color: "var(--gold)" }}>
            All projects →
          </a>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-x-10 gap-y-24 md:grid-cols-12">
          {projects.map((p, i) => {
            const layout = i % 2 === 0 ? "md:col-span-7" : "md:col-span-5 md:mt-32";
            return (
              <a key={p.title} href="#" className={`reveal group block ${layout}`} data-cursor="hover">
                <div className="relative overflow-hidden">
                  <div className="aspect-[4/5] overflow-hidden">
                    <img
                      src={p.img}
                      alt={p.title}
                      loading="lazy"
                      width={1200}
                      height={1500}
                      className="h-full w-full object-cover transition-all duration-[1400ms] ease-[var(--ease-luxury)] group-hover:scale-105 group-hover:saturate-0"
                    />
                  </div>
                  <span
                    className="absolute left-6 top-6 -translate-y-3 px-3 py-1.5 text-[10px] uppercase tracking-[0.3em] opacity-0 transition-all duration-700 ease-[var(--ease-luxury)] group-hover:translate-y-0 group-hover:opacity-100"
                    style={{ background: "var(--gold)", color: "var(--ink)" }}
                  >
                    {p.tag}
                  </span>
                </div>
                <div className="mt-6 flex items-end justify-between">
                  <div>
                    <h3 className="font-serif text-3xl md:text-4xl">{p.title}</h3>
                    <p className="mt-2 text-xs uppercase tracking-[0.28em]" style={{ color: "var(--grey)" }}>{p.place}</p>
                  </div>
                  <span className="font-serif text-sm" style={{ color: "var(--gold)" }}>0{i + 1}</span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

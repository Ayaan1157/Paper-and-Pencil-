export function Quote() {
  return (
    <section className="relative py-36 md:py-56">
      <span className="ghost-numeral absolute left-1/2 top-10 -translate-x-1/2 text-[24vw]">"</span>
      <div className="mx-auto max-w-5xl px-6 text-center md:px-12">
        <blockquote className="reveal font-serif text-[clamp(2rem,4.4vw,4rem)] leading-[1.15]">
          “They did not design a hotel for us. They drew the room we always wanted to walk into, and then handed us the key.”
        </blockquote>
        <div className="reveal reveal-delay-2 mt-12 flex items-center justify-center gap-4">
          <span className="block h-px w-12" style={{ background: "var(--gold)" }} />
          <p className="text-xs uppercase tracking-[0.32em]" style={{ color: "var(--grey-soft)" }}>
            Eleanor Hart · The Cloister Hotel
          </p>
        </div>
      </div>
    </section>
  );
}

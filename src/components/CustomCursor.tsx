import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;
    setEnabled(true);
    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ringPos = { x: target.x, y: target.y };
    const dotPos = { x: target.x, y: target.y };
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
    };
    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const interactive = t.closest("a,button,input,textarea,[data-cursor='hover']");
      if (ring.current) {
        ring.current.style.width = interactive ? "60px" : "36px";
        ring.current.style.height = interactive ? "60px" : "36px";
        ring.current.style.borderColor = interactive ? "var(--gold)" : "color-mix(in oklab, var(--gold) 60%, transparent)";
      }
    };
    const tick = () => {
      dotPos.x += (target.x - dotPos.x) * 0.6;
      dotPos.y += (target.y - dotPos.y) * 0.6;
      ringPos.x += (target.x - ringPos.x) * 0.14;
      ringPos.y += (target.y - ringPos.y) * 0.14;
      if (dot.current) dot.current.style.transform = `translate(${dotPos.x}px, ${dotPos.y}px) translate(-50%, -50%)`;
      if (ring.current) ring.current.style.transform = `translate(${ringPos.x}px, ${ringPos.y}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;
  return (
    <>
      <div
        ref={ring}
        className="pointer-events-none fixed left-0 top-0 z-[100] hidden h-9 w-9 rounded-full border md:block"
        style={{ borderColor: "color-mix(in oklab, var(--gold) 60%, transparent)", transition: "width 0.4s var(--ease-luxury), height 0.4s var(--ease-luxury), border-color 0.4s var(--ease-luxury)" }}
      />
      <div
        ref={dot}
        className="pointer-events-none fixed left-0 top-0 z-[101] hidden h-1.5 w-1.5 rounded-full md:block"
        style={{ background: "var(--gold)" }}
      />
    </>
  );
}

import { useEffect, useRef, useState } from "react";

export function ScrollVideo() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [progress, setProgress] = useState(0);

  // rAF loop driving currentTime from scroll with 30fps hardware throttle
  useEffect(() => {
    let running = true;
    let primed = false;
    let lastSeekTime = 0;
    const SEEK_THROTTLE_MS = 33; // Seek at most 30 times per second to prevent GPU decoder lag

    const tick = (now: number) => {
      if (!running) return;
      const el = sectionRef.current;
      const v = videoRef.current;
      if (el && v) {
        const d = v.duration;

        // Try to prime the video once the duration is available (enables inline scrubbing)
        if (isFinite(d) && d > 0 && !primed) {
          primed = true;
          const attemptPrime = async () => {
            try {
              await v.play();
              v.pause();
              v.currentTime = 0.0001;
            } catch (e) {
              // Ignore safely
            }
          };
          attemptPrime();
        }

        const rect = el.getBoundingClientRect();
        const total = el.offsetHeight - window.innerHeight;
        const scrolled = Math.min(Math.max(-rect.top, 0), Math.max(total, 1));
        const p = total > 0 ? scrolled / total : 0;
        setProgress(p);

        if (isFinite(d) && d > 0) {
          // Fallback to total duration if seekable range is not yet fully populated
          const seekableEnd = v.seekable && v.seekable.length > 0 ? v.seekable.end(v.seekable.length - 1) : 0;
          const limit = seekableEnd > 0 ? seekableEnd : d;
          
          const maxTime = Math.min(d, limit) - 0.05;
          const targetTime = Math.min(Math.max(maxTime, 0), Math.max(0, p * d));

          // Throttled seeking to match video decode hardware refresh rate (30fps)
          if (now - lastSeekTime >= SEEK_THROTTLE_MS) {
            if (Math.abs(v.currentTime - targetTime) > 0.01) {
              try {
                v.currentTime = targetTime;
                lastSeekTime = now;
              } catch {}
            }
          }
        }
      }
      requestAnimationFrame(tick);
    };

    const id = requestAnimationFrame(tick);
    return () => {
      running = false;
      cancelAnimationFrame(id);
    };
  }, []);

  // Text opacities — fade in & out across three thirds
  const fade = (start: number, end: number) => {
    const mid = (start + end) / 2;
    const half = (end - start) / 2;
    const d = Math.abs(progress - mid);
    if (d > half) return 0;
    const band = half * 0.55;
    if (d < half - band) return 1;
    const t = (half - d) / band;
    return Math.max(0, Math.min(1, t));
  };

  const o1 = fade(0, 0.33);
  const o2 = fade(0.33, 0.66);
  const o3 = fade(0.66, 1);

  return (
    <section
      ref={sectionRef}
      className="relative w-full"
      style={{ height: "300vh", fontFamily: "'Cormorant Garamond', serif" }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <video
          ref={videoRef}
          src="/scroll-house-faststart.mp4?v=2"
          muted
          playsInline
          preload="auto"
          crossOrigin="anonymous"
          // @ts-ignore
          disableRemotePlayback
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: "rgba(26,23,20,0.15)" }} />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3"
          style={{ background: "linear-gradient(to top, rgba(26,23,20,0.85), rgba(26,23,20,0))" }}
        />

        <div className="absolute inset-0 flex items-center justify-center px-6">
          <h2
            className="absolute text-center font-serif text-[clamp(2.75rem,8vw,7rem)] leading-[1] tracking-tight text-white transition-opacity duration-700 ease-out"
            style={{ opacity: o1, fontFamily: "'Cormorant Garamond', serif" }}
          >
            We are Paper <span className="italic">and</span> Pencil
          </h2>

          <p
            className="absolute max-w-3xl text-center italic transition-opacity duration-700 ease-out"
            style={{
              opacity: o2,
              color: "#F5F0E8",
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(1.5rem,3.2vw,2.75rem)",
              lineHeight: 1.25,
              fontWeight: 300,
            }}
          >
            A multidisciplinary studio crafting spaces that endure — across architecture, interiors, and art.
          </p>

          <p
            className="absolute text-center transition-opacity duration-700 ease-out"
            style={{
              opacity: o3,
              color: "#B8935A",
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(0.7rem,1vw,0.85rem)",
              letterSpacing: "0.45em",
              textTransform: "uppercase",
            }}
          >
            Bengaluru · Est. since · Art · Architecture · Interiors
          </p>
        </div>
      </div>
    </section>
  );
}

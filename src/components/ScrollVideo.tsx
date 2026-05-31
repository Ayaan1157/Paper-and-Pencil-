import { useEffect, useRef, useState } from "react";

export function ScrollVideo() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [progress, setProgress] = useState(0);
  
  // Start with the direct URL for instant playback/caching, then swap to blob URL in background
  const [videoSrc, setVideoSrc] = useState<string>("/scroll-house-faststart.mp4?v=2");

  // Preload video into memory (Blob URL) in the background to completely bypass HTTP range requests and eliminate seek lag!
  useEffect(() => {
    let active = true;
    let objectUrl = "";

    fetch("/scroll-house-faststart.mp4?v=2")
      .then((res) => res.blob())
      .then((blob) => {
        if (!active) return;
        objectUrl = URL.createObjectURL(blob);
        setVideoSrc(objectUrl);
      })
      .catch(() => {
        // Safe fallback already set to direct URL
      });

    return () => {
      active = false;
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, []);

  // Keep track of section layout offsets to completely bypass layout-thrashing getBoundingClientRect calls inside rAF
  const dimensionsRef = useRef({ top: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      const el = sectionRef.current;
      if (el) {
        // Read these layout properties once during mount/resize (safe)
        dimensionsRef.current = {
          top: el.offsetTop,
          height: el.offsetHeight
        };
      }
    };

    updateDimensions();
    // Delay slightly to let image assets load and occupy their true heights
    const timer = setTimeout(updateDimensions, 400);

    window.addEventListener("resize", updateDimensions);
    window.addEventListener("load", updateDimensions);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updateDimensions);
      window.removeEventListener("load", updateDimensions);
    };
  }, []);

  // Outstanding seek manager to completely prevent overloading the H.264 hardware decoder
  const isSeekingRef = useRef(false);
  const pendingTimeRef = useRef<number | null>(null);

  // Set up standard non-blocking seek synchronization via browser event listeners
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const handleSeeked = () => {
      isSeekingRef.current = false;
      // If a new seek request arrived while we were seeking, perform it now!
      if (pendingTimeRef.current !== null) {
        const nextTime = pendingTimeRef.current;
        pendingTimeRef.current = null;
        isSeekingRef.current = true;
        v.currentTime = nextTime;
      }
    };

    const handleSeeking = () => {
      isSeekingRef.current = true;
    };

    v.addEventListener("seeked", handleSeeked);
    v.addEventListener("seeking", handleSeeking);

    return () => {
      v.removeEventListener("seeked", handleSeeked);
      v.removeEventListener("seeking", handleSeeking);
    };
  }, [videoSrc]);

  // rAF loop driving currentTime from scroll with zero-reflow layout calculations and throttled seeks
  useEffect(() => {
    let running = true;
    let easedP = 0;
    let primed = false;

    const tick = () => {
      if (!running) return;
      const el = sectionRef.current;
      const v = videoRef.current;
      if (el && v) {
        const d = v.duration;

        // Prime the video once the duration is available (enables instant inline scrubbing)
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

        // Extremely fast, layout-safe offset calculation using cached values and cheap window.scrollY
        const { top: offsetTop, height: offsetHeight } = dimensionsRef.current;
        const total = offsetHeight - window.innerHeight;
        const scrollY = window.scrollY;
        const scrolled = Math.min(Math.max(scrollY - offsetTop, 0), Math.max(total, 1));
        const rawP = total > 0 ? scrolled / total : 0;

        // Eased progress LERP (0.3) for extremely responsive, fluid scroll-driven video timeline
        easedP += (rawP - easedP) * 0.3;
        setProgress(easedP);

        if (isFinite(d) && d > 0) {
          const seekableEnd = v.seekable && v.seekable.length > 0 ? v.seekable.end(v.seekable.length - 1) : 0;
          const limit = seekableEnd > 0 ? seekableEnd : d;
          
          const maxTime = Math.min(d, limit) - 0.05;
          const targetTime = Math.min(Math.max(maxTime, 0), Math.max(0, easedP * d));

          // Only perform a seek if the difference is meaningful (> 0.005 seconds)
          if (Math.abs(v.currentTime - targetTime) > 0.005) {
            // Native seek check combined with our tracker prevents decoder choking/blocking
            if (!v.seeking && !isSeekingRef.current) {
              isSeekingRef.current = true;
              v.currentTime = targetTime;
            } else {
              // Store target time to seek to immediately once the current seek finishes
              pendingTimeRef.current = targetTime;
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
          src={videoSrc || undefined}
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
            className="absolute text-center font-serif text-[clamp(2.75rem,8vw,7rem)] leading-[1] tracking-tight text-white"
            style={{ opacity: o1, fontFamily: "'Cormorant Garamond', serif" }}
          >
            We are Paper <span className="italic">and</span> Pencil
          </h2>

          <p
            className="absolute max-w-3xl text-center italic"
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
            className="absolute text-center"
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

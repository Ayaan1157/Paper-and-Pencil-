import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Initializes Lenis smooth scrolling globally.
 * Features customizable easing, wheel support, and auto-disabling on mobile touch devices.
 */
export function useSmoothScroll() {
  useEffect(() => {
    // Only initialize on the client
    if (typeof window === "undefined") return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Elegant exponential ease-out
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      infinite: false,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    // Store globally for components that might want to trigger scroll events (e.g. Nav clicks)
    (window as any).lenis = lenis;

    // Smoothly handle hash link jumps
    const handleHashClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest("a");
      if (link && link.hash && link.origin === window.location.origin) {
        e.preventDefault();
        const element = document.querySelector(link.hash);
        if (element) {
          lenis.scrollTo(element, {
            offset: 0,
            duration: 1.2,
            immediate: false,
          });
          // Update URL hash without causing viewport jump
          history.pushState(null, "", link.hash);
        }
      }
    };

    document.addEventListener("click", handleHashClick);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      (window as any).lenis = undefined;
      document.removeEventListener("click", handleHashClick);
    };
  }, []);
}

import * as React from "react";

type UseMarqueeScrollOptions = {
  /** Pixels per second */
  speed?: number;
};

/**
 * Smooth, constant marquee that scrolls via scrollLeft (crisper on mobile than transform-based animation).
 *
 * Usage: duplicate the content once; `contentRef` should point to the *first* set.
 */
export function useMarqueeScroll(options: UseMarqueeScrollOptions = {}) {
  const { speed = 40 } = options;

  const viewportRef = React.useRef<HTMLDivElement>(null);
  const contentRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const viewport = viewportRef.current;
    const content = contentRef.current;
    if (!viewport || !content) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (prefersReducedMotion.matches) return;

    let contentWidth = 0;
    let raf = 0;
    let lastTs = 0;

    const updateWidth = () => {
      contentWidth = content.scrollWidth;
    };

    updateWidth();
    viewport.scrollLeft = 0;

    const ro = new ResizeObserver(() => updateWidth());
    ro.observe(content);

    const step = (ts: number) => {
      if (!lastTs) lastTs = ts;
      const dt = (ts - lastTs) / 1000;
      lastTs = ts;

      if (contentWidth > 0) {
        viewport.scrollLeft += speed * dt;
        // seamless loop (because we render 2 identical sets)
        if (viewport.scrollLeft >= contentWidth) {
          viewport.scrollLeft -= contentWidth;
        }
      }

      raf = window.requestAnimationFrame(step);
    };

    raf = window.requestAnimationFrame(step);

    return () => {
      window.cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [speed]);

  return { viewportRef, contentRef };
}

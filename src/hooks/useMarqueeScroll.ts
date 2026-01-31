import * as React from "react";

type UseMarqueeScrollOptions = {
  /** Pixels per second */
  speed?: number;
};

/**
 * Smooth, constant marquee that scrolls via scrollLeft (crisper on mobile than transform-based animation).
 * Optimized to avoid forced reflows by batching layout reads.
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
    let needsWidthUpdate = true;

    // Use ResizeObserver to track width changes without forcing reflow
    const ro = new ResizeObserver((entries) => {
      // Read layout in the observer callback (already batched)
      for (const entry of entries) {
        if (entry.target === content) {
          contentWidth = entry.contentRect.width * 2; // *2 because we have duplicate content
        }
      }
    });
    ro.observe(content);

    // Defer initial width read to next frame to avoid forced reflow
    const initRaf = requestAnimationFrame(() => {
      contentWidth = content.scrollWidth;
      viewport.scrollLeft = 0;
      needsWidthUpdate = false;
    });

    const step = (ts: number) => {
      if (!lastTs) lastTs = ts;
      const dt = (ts - lastTs) / 1000;
      lastTs = ts;

      if (contentWidth > 0 && !needsWidthUpdate) {
        // Only write to scrollLeft - no layout reads in animation loop
        const newScrollLeft = viewport.scrollLeft + speed * dt;
        
        // Seamless loop (because we render 2 identical sets)
        if (newScrollLeft >= contentWidth) {
          viewport.scrollLeft = newScrollLeft - contentWidth;
        } else {
          viewport.scrollLeft = newScrollLeft;
        }
      }

      raf = window.requestAnimationFrame(step);
    };

    raf = window.requestAnimationFrame(step);

    return () => {
      window.cancelAnimationFrame(initRaf);
      window.cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [speed]);

  return { viewportRef, contentRef };
}

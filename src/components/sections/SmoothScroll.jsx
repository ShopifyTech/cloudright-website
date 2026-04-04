"use client";

import { useEffect } from "react";

export default function SmoothScroll() {
  useEffect(() => {
    let lenis = null;
    let rafId = null;

    function initLenis() {
      // Dynamic import — browser only fetches lenis.mjs when this runs,
      // well after first paint and interactivity.
      import("lenis").then(({ default: Lenis }) => {
        lenis = new Lenis({
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
        });

        function raf(time) {
          lenis.raf(time);
          rafId = requestAnimationFrame(raf);
        }
        rafId = requestAnimationFrame(raf);
      });
    }

    // Strategy: init on first interaction OR after 3s idle — whichever comes first.
    // This ensures lenis is always ready quickly but never blocks first paint.
    const events = ["pointerdown", "wheel", "keydown", "touchstart"];
    let initialized = false;

    function onInteraction() {
      if (initialized) return;
      initialized = true;
      events.forEach((e) => window.removeEventListener(e, onInteraction));
      clearTimeout(idleTimer);
      initLenis();
    }

    const idleTimer = setTimeout(() => {
      if (!initialized) {
        initialized = true;
        events.forEach((e) => window.removeEventListener(e, onInteraction));
        initLenis();
      }
    }, 3000);

    events.forEach((e) =>
      window.addEventListener(e, onInteraction, { passive: true, once: false }),
    );

    return () => {
      clearTimeout(idleTimer);
      events.forEach((e) => window.removeEventListener(e, onInteraction));
      if (rafId) cancelAnimationFrame(rafId);
      if (lenis) lenis.destroy();
    };
  }, []);

  return null;
}

"use client";
import { useEffect, useRef } from "react";
import { easeIO } from "../utils";

export function useCountUp() {
  const observerRef = useRef(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          const target = parseInt(el.dataset.target);
          const suffix = el.dataset.suffix || "";
          if (!target) return;
          const dur = 1600;
          const start = performance.now();
          const step = (now) => {
            const p = Math.min((now - start) / dur, 1);
            el.textContent = Math.round(easeIO(p) * target) + suffix;
            if (p < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
          observerRef.current?.unobserve(el);
        });
      },
      { threshold: 0.5 },
    );

    document.querySelectorAll("[data-target]").forEach((el) => {
      observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);
}

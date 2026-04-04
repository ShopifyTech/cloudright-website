"use client";
import { useEffect } from "react";

export function useScrollProgress() {
  useEffect(() => {
    const bar = document.getElementById("scroll-progress");
    if (!bar) return;

    let ticking = false;
    const handler = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const s = document.documentElement.scrollTop;
          const h = document.documentElement.scrollHeight - window.innerHeight;
          bar.style.transform = `scaleX(${h > 0 ? s / h : 0})`;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);
}

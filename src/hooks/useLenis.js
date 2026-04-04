"use client";
import { useEffect } from "react";

export function useLenis() {
  useEffect(() => {
    let lenis;
    import("lenis").then(({ default: Lenis }) => {
      lenis = new Lenis({
        autoRaf: true,
        duration: 1.1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    });
    return () => lenis?.destroy();
  }, []);
}

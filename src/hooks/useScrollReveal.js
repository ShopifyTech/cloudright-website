"use client";
import { useEffect } from "react";

export function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          el.style.willChange = "transform, opacity";
          el.classList.add("visible");
          el.addEventListener(
            "transitionend",
            () => {
              el.style.willChange = "auto";
            },
            { once: true },
          );
          observer.unobserve(el);
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -32px 0px" },
    );

    document
      .querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-bounce")
      .forEach((el) => {
        observer.observe(el);
      });

    return () => observer.disconnect();
  }, []);
}

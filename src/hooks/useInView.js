"use client";
import { useEffect, useRef, useState } from "react";

export function useInView(options = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect(); // mount once, never unmount
        }
      },
      { rootMargin: "200px", ...options },
    ); // 200px early trigger

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, inView };
}

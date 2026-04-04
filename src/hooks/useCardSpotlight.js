"use client";
import { useEffect } from "react";

export function useCardSpotlight(selector = ".bt-card, .pillar") {
  useEffect(() => {
    const cards = document.querySelectorAll(selector);
    const handlers = [];

    cards.forEach((card) => {
      let rafId = null;
      let rect = null;

      // Cache rect on mouse enter
      const onEnter = () => {
        rect = card.getBoundingClientRect();
      };

      const onMove = (e) => {
        if (!rect) return;

        card.style.setProperty("--x", `${e.clientX - rect.left}px`);
        card.style.setProperty("--y", `${e.clientY - rect.top}px`);

        if (!rafId) {
          rafId = requestAnimationFrame(() => {
            card.style.setProperty(
              "--mx",
              (((e.clientX - rect.left) / rect.width) * 100).toFixed(1) + "%",
            );
            card.style.setProperty(
              "--my",
              (((e.clientY - rect.top) / rect.height) * 100).toFixed(1) + "%",
            );
            rafId = null;
          });
        }
      };

      card.addEventListener("mouseenter", onEnter);
      card.addEventListener("mousemove", onMove);

      handlers.push({ card, onEnter, onMove });
    });

    return () => {
      handlers.forEach(({ card, onEnter, onMove }) => {
        card.removeEventListener("mouseenter", onEnter);
        card.removeEventListener("mousemove", onMove);
      });
    };
  }, [selector]);
}

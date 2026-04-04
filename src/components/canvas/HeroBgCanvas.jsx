"use client";
import { useEffect, useRef } from "react";

const COLS = ["0,212,255", "79,125,249", "167,139,250"];

export default function HeroBgCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");

    const resize = () => {
      c.width = c.offsetWidth;
      c.height = c.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Reduced from 75 → 45 particles — cuts the O(n²) connection loop
    // from 2,775 to 990 checks per frame (~64% reduction).
    const pts = Array.from({ length: 45 }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.6 + 0.4,
      col: COLS[Math.floor(Math.random() * 3)],
      a: Math.random() * 0.5 + 0.15,
    }));

    const D = 130;
    let rafId;
    let isVisible = true;

    // Pause the RAF loop when the hero section scrolls out of view.
    const io = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !rafId) {
          rafId = requestAnimationFrame(frame);
        }
      },
      { threshold: 0 },
    );
    io.observe(c);

    function frame() {
      rafId = null;
      if (!isVisible) return;

      const w = c.width;
      const h = c.height;
      ctx.clearRect(0, 0, w, h);

      [
        [0.15, 0.25, "rgba(0,80,180,.06)"],
        [0.85, 0.7, "rgba(80,0,180,.05)"],
        [0.5, 0.5, "rgba(0,180,180,.04)"],
      ].forEach(([rx, ry, col]) => {
        const g = ctx.createRadialGradient(
          w * rx,
          h * ry,
          0,
          w * rx,
          h * ry,
          w * 0.4,
        );
        g.addColorStop(0, col);
        g.addColorStop(1, "transparent");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);
      });

      pts.forEach((p) => {
        p.x += p.vx / w;
        p.y += p.vy / h;
        if (p.x < 0 || p.x > 1) p.vx *= -1;
        if (p.y < 0 || p.y > 1) p.vy *= -1;
      });

      for (let i = 0; i < pts.length; i++)
        for (let j = i + 1; j < pts.length; j++) {
          const dx = (pts[i].x - pts[j].x) * w,
            dy = (pts[i].y - pts[j].y) * h;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < D) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${pts[i].col},${(1 - d / D) * 0.28})`;
            ctx.lineWidth = 0.6;
            ctx.moveTo(pts[i].x * w, pts[i].y * h);
            ctx.lineTo(pts[j].x * w, pts[j].y * h);
            ctx.stroke();
          }
        }

      pts.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x * w, p.y * h, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.col},${p.a})`;
        ctx.fill();
      });

      rafId = requestAnimationFrame(frame);
    }

    rafId = requestAnimationFrame(frame);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      io.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="hero-bg-canvas"
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}

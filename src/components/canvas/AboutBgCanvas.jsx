"use client";
import { useEffect, useRef } from "react";

const COLS = 60;
const ROWS = 40;

export default function AboutBgCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let w, h;

    function resize() {
      const parent = canvas.parentElement;
      const dpr = window.devicePixelRatio || 1;

      w = parent.offsetWidth;
      h = parent.offsetHeight;

      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement);
    resize();

    let time = 0;
    let mouse = { x: -9999, y: -9999 };
    let isVisible = false;
    let rafId;

    const io = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0 },
    );
    io.observe(canvas.parentElement);

    const onMove = (e) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };

    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);

    function render() {
      rafId = requestAnimationFrame(render);
      if (!isVisible) return;

      ctx.clearRect(0, 0, w, h);

      const spacingX = w / COLS;
      const spacingY = h / ROWS;

      for (let y = 0; y < ROWS; y++) {
        for (let x = 0; x < COLS; x++) {
          let px = x * spacingX;
          let py = y * spacingY;

          const cx = w * 0.5;
          const cy = h * 0.5;

          const dist = Math.hypot(px - cx, py - cy);

          let z =
            Math.sin(dist * 0.008 - time) * 28 + Math.cos(x * 0.5 + time) * 12;

          const mDist = Math.hypot(px - mouse.x, py - mouse.y);

          let alpha = 0.22;
          let radius = 1.1;

          if (mDist < 220) {
            const force = (220 - mDist) / 220;

            z -= force * 35;
            alpha += force * 0.5;
            radius += force * 1.2;

            const angle = Math.atan2(py - mouse.y, px - mouse.x);
            px += Math.cos(angle) * force * 16;
            py += Math.sin(angle) * force * 16;
          }

          // softer fade → no dead zones
          alpha *= Math.max(0.25, 1 - dist / (w * 1.2));

          if (alpha <= 0) continue;

          ctx.beginPath();
          ctx.arc(px, py + z, radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0,212,255,${alpha})`;
          ctx.fill();

          if (mDist < 100 && x < COLS - 1) {
            const nx = (x + 1) * spacingX;

            const nz =
              Math.sin(Math.hypot(nx - cx, py - cy) * 0.008 - time) * 28 +
              Math.cos((x + 1) * 0.5 + time) * 12;

            ctx.beginPath();
            ctx.moveTo(px, py + z);
            ctx.lineTo(nx, py + nz);
            ctx.strokeStyle = `rgba(0,212,255,${alpha * 0.7})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      time += 0.03;
    }

    render();

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      io.disconnect();
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
        transform: "translateZ(0)",
      }}
    />
  );
}

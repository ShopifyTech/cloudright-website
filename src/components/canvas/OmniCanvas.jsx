"use client";
import { useEffect, useRef } from "react";
import { hexRgba, easeIO } from "../../utils";

const SPOKES = [
  { label: "Retail", color: "#00d4ff", angle: -90 },
  { label: "Online", color: "#4f7df9", angle: -18 },
  { label: "CRM", color: "#a78bfa", angle: 54 },
  { label: "ERP", color: "#f04438", angle: 126 },
  { label: "AI", color: "#f59e0b", angle: 198 },
];

export default function OmniCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");

    function resize() {
      const w = c.parentElement.offsetWidth;
      c.width = c.height = w;
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(c.parentElement);

    const pkts = SPOKES.map(() => ({
      t: Math.random(),
      speed: 0.005 + Math.random() * 0.003,
      inbound: Math.random() > 0.5,
      trail: [],
    }));

    let T2 = 0,
      rafId;
    let isVisible = true;

    // Pause animation when the section is off-screen
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
      const W = c.width,
        cx = W / 2,
        cy = W / 2;
      const spokeR = W * 0.37,
        hubR = W * 0.13,
        nodeR = W * 0.075;

      ctx.clearRect(0, 0, W, W);

      const bg = ctx.createRadialGradient(cx, cy, 0, cx, cy, W * 0.55);
      bg.addColorStop(0, "rgba(0,20,40,.38)");
      bg.addColorStop(1, "transparent");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, W);

      const hg = ctx.createRadialGradient(cx, cy, 0, cx, cy, hubR * 2.2);
      hg.addColorStop(0, "rgba(0,212,255,.15)");
      hg.addColorStop(1, "transparent");
      ctx.beginPath();
      ctx.arc(cx, cy, hubR * 2.2, 0, Math.PI * 2);
      ctx.fillStyle = hg;
      ctx.fill();

      SPOKES.forEach((s) => {
        const rad = (s.angle * Math.PI) / 180;
        const nx = cx + Math.cos(rad) * spokeR,
          ny = cy + Math.sin(rad) * spokeR;
        const sg = ctx.createLinearGradient(cx, cy, nx, ny);
        sg.addColorStop(0, "transparent");
        sg.addColorStop(1, hexRgba(s.color, 0.22));
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(nx, ny);
        ctx.strokeStyle = sg;
        ctx.lineWidth = 1.2;
        ctx.stroke();

        const ng = ctx.createRadialGradient(nx, ny, 0, nx, ny, nodeR * 2);
        ng.addColorStop(0, hexRgba(s.color, 0.22));
        ng.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(nx, ny, nodeR * 2, 0, Math.PI * 2);
        ctx.fillStyle = ng;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(nx, ny, nodeR, 0, Math.PI * 2);
        ctx.fillStyle = "#0c0c20";
        ctx.fill();
        ctx.strokeStyle = s.color;
        ctx.lineWidth = 1.8;
        ctx.stroke();

        ctx.fillStyle = s.color;
        ctx.font = `700 ${W * 0.034}px 'Space Mono',monospace`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(s.label, nx, ny);
      });

      pkts.forEach((p, i) => {
        const s = SPOKES[i],
          rad = (s.angle * Math.PI) / 180;
        const nx = cx + Math.cos(rad) * spokeR,
          ny = cy + Math.sin(rad) * spokeR;
        p.t += p.speed;
        if (p.t > 1) {
          p.t = 0;
          p.inbound = !p.inbound;
        }
        const Tp = p.inbound ? easeIO(p.t) : 1 - easeIO(p.t);
        const px = cx + (nx - cx) * Tp,
          py = cy + (ny - cy) * Tp;
        p.trail.push({ x: px, y: py });
        if (p.trail.length > 12) p.trail.shift();
        p.trail.forEach((pt, ti) => {
          ctx.beginPath();
          ctx.arc(
            pt.x,
            pt.y,
            W * 0.013 * (ti / p.trail.length),
            0,
            Math.PI * 2,
          );
          ctx.fillStyle = hexRgba(s.color, (ti / p.trail.length) * 0.38);
          ctx.fill();
        });
        ctx.beginPath();
        ctx.arc(px, py, W * 0.017, 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.fill();
        const ph = ctx.createRadialGradient(px, py, 0, px, py, W * 0.028);
        ph.addColorStop(0, hexRgba(s.color, 0.55));
        ph.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(px, py, W * 0.028, 0, Math.PI * 2);
        ctx.fillStyle = ph;
        ctx.fill();
      });

      for (let i = 0; i < 3; i++) {
        const ph = (T2 * 0.5 + i / 3) % 1;
        ctx.beginPath();
        ctx.arc(cx, cy, hubR * (0.9 + ph * 1.8), 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0,212,255,${0.32 * (1 - ph)})`;
        ctx.lineWidth = 1.1 * (1 - ph);
        ctx.stroke();
      }

      ctx.beginPath();
      ctx.arc(cx, cy, hubR, 0, Math.PI * 2);
      ctx.fillStyle = "#090918";
      ctx.fill();
      ctx.strokeStyle = "rgba(0,212,255,.78)";
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = "#00d4ff";
      ctx.font = `700 ${W * 0.038}px 'Space Mono',monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("CORE", cx, cy);

      T2 += 0.016;
      if (isVisible) {
        rafId = requestAnimationFrame(frame);
      } else {
        rafId = null;
      }
    }

    rafId = requestAnimationFrame(frame);
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: "100%",
        height: "100%",
        display: "block",
        transform: "translateZ(0)",
      }}
    />
  );
}

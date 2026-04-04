"use client";
import { useEffect, useRef, useState } from "react";
import { hexRgba, easeIO } from "../../utils";
import { ORBITAL_NODES } from "../../constants/data";

export default function OrbitalCanvas() {
  const canvasRef = useRef(null);
  // Cache bounding rect in a ref — updated only on resize, never mid-frame
  const rectRef = useRef({ left: 0, top: 0 });

  const [tooltip, setTooltip] = useState({
    visible: false,
    title: "",
    desc: "",
    color: "",
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");

    function resize(entry) {
      const s = entry ? Math.round(entry.contentRect.width) : 0;
      if (s > 0) {
        c.width = c.height = s;
      }
      rectRef.current = c.getBoundingClientRect();
    }

    const ro = new ResizeObserver((entries) => {
      resize(entries[0]);
    });
    ro.observe(c.parentElement);

    const nodes = ORBITAL_NODES.map((n) => ({
      ...n,
      angle: n.startAngle,
      nx: 0,
      ny: 0,
    }));
    const packets = nodes.map(() => ({
      t: Math.random(),
      speed: 0.006 + Math.random() * 0.004,
      inbound: Math.random() > 0.5,
      size: 2.5 + Math.random() * 1.5,
      trail: [],
    }));

    let T = 0;
    let hoveredNode = null;
    const mouse = { x: -9999, y: -9999 };
    let pendingPos = null;
    let rafId;

    function hexPts(cx, cy, r) {
      return Array.from({ length: 6 }, (_, i) => {
        const a = (Math.PI / 180) * (60 * i - 30);
        return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
      });
    }

    const onMouseMove = (e) => {
      const { left, top } = rectRef.current;
      mouse.x = e.clientX - left;
      mouse.y = e.clientY - top;
      pendingPos = { x: e.clientX + 18, y: e.clientY - 10 };
    };

    const onMouseLeave = () => {
      mouse.x = mouse.y = -9999;
      pendingPos = null;
      setTooltip((prev) => ({ ...prev, visible: false }));
    };

    c.addEventListener("mousemove", onMouseMove);
    c.addEventListener("mouseleave", onMouseLeave);

    function frame() {
      const W = c.width,
        H = c.height;
      const cx = W / 2,
        cy = H / 2;
      const base = Math.min(W, H) * 0.46;
      const ringR = [base * 0.55, base * 0.88];
      const nodeR = base * 0.09;

      ctx.clearRect(0, 0, W, H);

      // BG gradient
      const bgG = ctx.createRadialGradient(cx, cy, 0, cx, cy, base * 1.1);
      bgG.addColorStop(0, "rgba(0,20,40,.55)");
      bgG.addColorStop(0.6, "rgba(0,5,15,.35)");
      bgG.addColorStop(1, "transparent");
      ctx.beginPath();
      ctx.arc(cx, cy, base * 1.1, 0, Math.PI * 2);
      ctx.fillStyle = bgG;
      ctx.fill();

      // Stars
      for (let i = 0; i < 40; i++) {
        const sx = cx + Math.sin(i * 137.5) * base * 1.05;
        const sy = cy + Math.cos(i * 97.3) * base * 1.05;
        ctx.beginPath();
        ctx.arc(sx, sy, 0.8 + (i % 2) * 0.6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${0.1 + 0.2 * Math.abs(Math.sin(i + T * 0.5))})`;
        ctx.fill();
      }

      // Grid
      ctx.save();
      ctx.globalAlpha = 0.03;
      ctx.strokeStyle = "#00d4ff";
      ctx.lineWidth = 0.5;
      const gs = 32;
      for (let gx = cx - base; gx < cx + base; gx += gs) {
        ctx.beginPath();
        ctx.moveTo(gx, cy - base);
        ctx.lineTo(gx, cy + base);
        ctx.stroke();
      }
      for (let gy = cy - base; gy < cy + base; gy += gs) {
        ctx.beginPath();
        ctx.moveTo(cx - base, gy);
        ctx.lineTo(cx + base, gy);
        ctx.stroke();
      }
      ctx.restore();

      // Compute positions
      nodes.forEach((n) => {
        n.angle = n.startAngle + T * n.speed;
        const r = ringR[n.ring - 1];
        n.nx = cx + Math.cos(n.angle) * r;
        n.ny = cy + Math.sin(n.angle) * r;
      });

      // Hover detection — batched with position update into one setState call
      let newHover = null;
      nodes.forEach((n) => {
        if (Math.hypot(n.nx - mouse.x, n.ny - mouse.y) < nodeR * 1.6)
          newHover = n;
      });

      if (newHover !== hoveredNode) {
        hoveredNode = newHover;
        if (hoveredNode) {
          const h = hoveredNode;
          setTooltip((prev) => ({
            ...prev,
            ...(pendingPos ?? {}),
            visible: true,
            title: h.label,
            desc: h.desc,
            color: h.color,
          }));
        } else {
          setTooltip((prev) => ({ ...prev, visible: false }));
        }
        pendingPos = null;
      } else if (pendingPos) {
        // Only position changed — avoid spreading all fields for minimal re-render
        const pos = pendingPos;
        pendingPos = null;
        setTooltip((prev) =>
          prev.visible ? { ...prev, x: pos.x, y: pos.y } : prev,
        );
      }

      // Rings
      ringR.forEach((r, ri) => {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(T * 0.003 * (ri === 0 ? 1 : -1));
        const segs = ri === 0 ? 36 : 54;
        for (let i = 0; i < segs; i++) {
          const a0 = (i / segs) * Math.PI * 2,
            a1 = ((i + 0.55) / segs) * Math.PI * 2;
          const pulse = 0.24 + 0.14 * Math.sin(T * 2 + i * 0.5);
          ctx.beginPath();
          ctx.arc(0, 0, r, a0, a1);
          ctx.strokeStyle = `rgba(0,212,255,${pulse * (ri === 0 ? 0.38 : 0.2)})`;
          ctx.lineWidth = ri === 0 ? 1.5 : 1;
          ctx.stroke();
        }
        ctx.restore();
      });

      // Spokes
      nodes.forEach((n) => {
        const g = ctx.createLinearGradient(cx, cy, n.nx, n.ny);
        g.addColorStop(0, "transparent");
        g.addColorStop(0.55, hexRgba(n.color, 0.1));
        g.addColorStop(1, hexRgba(n.color, 0.28));
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(n.nx, n.ny);
        ctx.strokeStyle = g;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // Inner ring connections
      const inner = nodes.filter((n) => n.ring === 1);
      for (let i = 0; i < inner.length; i++) {
        const a = inner[i],
          b = inner[(i + 1) % inner.length];
        const mx2 = (a.nx + b.nx) / 2,
          my2 = (a.ny + b.ny) / 2,
          pull = 0.38;
        const cpx = cx + (mx2 - cx) * pull,
          cpy = cy + (my2 - cy) * pull;
        ctx.beginPath();
        ctx.moveTo(a.nx, a.ny);
        ctx.quadraticCurveTo(cpx, cpy, b.nx, b.ny);
        ctx.strokeStyle = `rgba(0,212,255,${0.06 + 0.04 * Math.sin(T * 1.2 + i)})`;
        ctx.lineWidth = 0.9;
        ctx.stroke();
      }

      // Packets
      packets.forEach((p, i) => {
        const n = nodes[i];
        p.t += p.speed;
        if (p.t > 1) {
          p.t = 0;
          p.inbound = !p.inbound;
        }
        const Tp = p.inbound ? easeIO(p.t) : 1 - easeIO(p.t);
        const px = cx + (n.nx - cx) * Tp,
          py = cy + (n.ny - cy) * Tp;
        p.trail.push({ x: px, y: py });
        if (p.trail.length > 14) p.trail.shift();
        p.trail.forEach((pt, ti) => {
          ctx.beginPath();
          ctx.arc(
            pt.x,
            pt.y,
            p.size * (ti / p.trail.length) * 0.7,
            0,
            Math.PI * 2,
          );
          ctx.fillStyle = hexRgba(n.color, (ti / p.trail.length) * 0.4);
          ctx.fill();
        });
        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fillStyle = n.color;
        ctx.fill();
        const hg = ctx.createRadialGradient(px, py, 0, px, py, p.size * 4);
        hg.addColorStop(0, hexRgba(n.color, 0.5));
        hg.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(px, py, p.size * 4, 0, Math.PI * 2);
        ctx.fillStyle = hg;
        ctx.fill();
      });

      // Core hexagons
      const cR = base * 0.19;
      for (let ri = 4; ri >= 1; ri--) {
        const hr = cR * (ri * 0.42 + 0.32),
          pts6 = hexPts(cx, cy, hr);
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(T * 0.0035 * (ri % 2 === 0 ? 1 : -1));
        ctx.translate(-cx, -cy);
        ctx.beginPath();
        ctx.moveTo(pts6[0][0], pts6[0][1]);
        for (let k = 1; k < 6; k++) ctx.lineTo(pts6[k][0], pts6[k][1]);
        ctx.closePath();
        const ha = (0.03 + 0.018 * Math.sin(T * 1.5 + ri)) * (ri / 4);
        ctx.strokeStyle = `rgba(0,212,255,${ha * 4})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
        ctx.fillStyle = `rgba(0,212,255,${ha})`;
        ctx.fill();
        ctx.restore();
      }

      // Pulse rings
      for (let i = 0; i < 3; i++) {
        const ph = (T * 0.5 + i / 3) % 1,
          pr = cR * (0.85 + ph * 2.4);
        ctx.beginPath();
        ctx.arc(cx, cy, pr, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0,212,255,${0.4 * (1 - ph)})`;
        ctx.lineWidth = 1.2 * (1 - ph);
        ctx.stroke();
      }

      // Inner glow layers
      for (let i = 3; i >= 0; i--) {
        const pulse = Math.sin(T * 2 - i * 0.8) * 0.5 + 0.5;
        const pr = cR * (0.58 + i * 0.32) + pulse * 6;
        const rg2 = ctx.createRadialGradient(cx, cy, pr * 0.7, cx, cy, pr);
        rg2.addColorStop(0, `rgba(0,212,255,${0.2 * (1 - i / 4) * pulse})`);
        rg2.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(cx, cy, pr, 0, Math.PI * 2);
        ctx.fillStyle = rg2;
        ctx.fill();
      }

      // Sweep
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, cR * 0.92, 0, Math.PI * 2);
      ctx.clip();
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(T * 1.8);
      const swg = ctx.createLinearGradient(0, 0, cR * 0.92, 0);
      swg.addColorStop(0, "transparent");
      swg.addColorStop(0.75, "rgba(0,212,255,0)");
      swg.addColorStop(0.93, "rgba(0,212,255,.14)");
      swg.addColorStop(1, "rgba(0,212,255,.28)");
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, cR * 0.92, -0.5, 0);
      ctx.closePath();
      ctx.fillStyle = swg;
      ctx.fill();
      ctx.restore();
      ctx.restore();

      // Core circle
      const cgr = ctx.createRadialGradient(cx, cy, 0, cx, cy, cR * 0.92);
      cgr.addColorStop(0, "rgba(0,25,45,.98)");
      cgr.addColorStop(0.65, "rgba(0,15,35,.96)");
      cgr.addColorStop(1, "rgba(0,212,255,.03)");
      ctx.beginPath();
      ctx.arc(cx, cy, cR * 0.92, 0, Math.PI * 2);
      ctx.fillStyle = cgr;
      ctx.fill();
      ctx.strokeStyle = `rgba(0,212,255,${0.35 + 0.12 * Math.sin(T * 2)})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Core text
      ctx.fillStyle = "rgba(255,255,255,.92)";
      ctx.font = `700 ${cR * 0.27}px 'Space Mono',monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("BUSINESS", cx, cy - cR * 0.18);
      ctx.fillStyle = "rgba(0,212,255,.9)";
      ctx.font = `700 ${cR * 0.21}px 'Space Mono',monospace`;
      ctx.fillText("AT CORE", cx, cy + cR * 0.16);

      // Nodes
      nodes.forEach((n) => {
        const isH = n === hoveredNode,
          scale = isH ? 1.2 : 1,
          r = nodeR * scale,
          haloR = r * 3;
        const halo = ctx.createRadialGradient(
          n.nx,
          n.ny,
          r * 0.4,
          n.nx,
          n.ny,
          haloR,
        );
        halo.addColorStop(0, hexRgba(n.color, isH ? 0.38 : 0.15));
        halo.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(n.nx, n.ny, haloR, 0, Math.PI * 2);
        ctx.fillStyle = halo;
        ctx.fill();

        ctx.save();
        ctx.translate(n.nx, n.ny);
        ctx.rotate(T * 0.012 * (n.ring === 1 ? 1 : -1));
        for (let a = 0; a < 3; a++) {
          const as = a * ((Math.PI * 2) / 3) + T * 0.025;
          ctx.beginPath();
          ctx.arc(0, 0, r * 1.35, as, as + 0.82);
          ctx.strokeStyle = hexRgba(n.color, 0.48);
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
        ctx.restore();

        const nfg = ctx.createRadialGradient(
          n.nx - r * 0.3,
          n.ny - r * 0.3,
          0,
          n.nx,
          n.ny,
          r,
        );
        nfg.addColorStop(0, hexRgba(n.color, 0.28));
        nfg.addColorStop(1, "rgba(5,5,18,.95)");
        ctx.beginPath();
        ctx.arc(n.nx, n.ny, r, 0, Math.PI * 2);
        ctx.fillStyle = nfg;
        ctx.fill();
        ctx.strokeStyle = hexRgba(n.color, isH ? 0.9 : 0.6);
        ctx.lineWidth = isH ? 2 : 1.5;
        ctx.stroke();

        ctx.fillStyle = n.color;
        ctx.font = `700 ${r * 0.42}px 'Space Mono',monospace`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        const lbl =
          r < 20 && n.label.length > 4 ? n.label.slice(0, 2) : n.label;
        ctx.fillText(lbl, n.nx, n.ny);
      });

      T += 0.016;
      rafId = requestAnimationFrame(frame);
    }

    frame();

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      c.removeEventListener("mousemove", onMouseMove);
      c.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          cursor: "crosshair",
          transform: "translateZ(0)",
        }}
      />
      {tooltip.visible && (
        <div
          style={{
            position: "fixed",
            left: tooltip.x,
            top: tooltip.y,
            zIndex: 600,
            background: "rgba(2,2,12,0.92)",
            border: `1px solid ${tooltip.color}55`,
            borderRadius: 12,
            padding: "1rem 1.2rem",
            width: 210,
            pointerEvents: "none",
          }}
        >
          <h4
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "0.72rem",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: "0.4rem",
              color: tooltip.color,
            }}
          >
            {tooltip.title}
          </h4>
          <p
            style={{
              fontSize: "0.72rem",
              lineHeight: 1.55,
              color: "rgba(255,255,255,0.55)",
            }}
          >
            {tooltip.desc}
          </p>
        </div>
      )}
    </>
  );
}

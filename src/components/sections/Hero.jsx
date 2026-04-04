// src/components/sections/Hero.jsx
import { lazy, Suspense } from "react";
import { HeroBgCanvas, OrbitalCanvas } from "../canvas";

export default function Hero() {
  return (
    <section
      style={{
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        alignItems: "center",
        padding: "100px 5vw 80px",
        position: "relative",
        overflow: "hidden",
        gap: "2rem",
      }}
      className="hero-section"
    >
      <HeroBgCanvas />

      {/* Left */}
      <div style={{ position: "relative", zIndex: 2 }}>
        {/* Eyebrow */}
        <div
          className="hero-eyebrow"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            background: "rgba(0,212,255,0.08)",
            border: "1px solid rgba(0,212,255,0.28)",
            borderRadius: 100,
            padding: "0.35rem 1rem",
            fontFamily: "'Space Mono', monospace",
            fontSize: "0.68rem",
            fontWeight: 700,
            color: "var(--cyan)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: "1.8rem",
          }}
        >
          <span
            className="e-dot"
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "var(--cyan)",
              display: "inline-block",
            }}
          />
          Technology-First · Business-Core · Omnichannel-Native
        </div>

        {/* H1 */}
        <h1
          className="hero-h1"
          style={{
            fontSize: "clamp(2.6rem, 4.8vw, 5rem)",
            fontWeight: 700,
            lineHeight: 1.04,
            letterSpacing: "-2.5px",
            marginBottom: "1.4rem",
          }}
        >
          Where <span className="grad">Retail</span> Meets
          <br />
          Its <span className="grad">Digital Twin</span>.
        </h1>

        {/* Tagline */}
        <p
          className="hero-tagline"
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "clamp(0.82rem, 1.2vw, 1rem)",
            fontWeight: 700,
            color: "var(--off-white)",
            letterSpacing: "0.03em",
            marginBottom: "1.4rem",
            borderLeft: "3px solid var(--cyan)",
            paddingLeft: "1rem",
          }}
        >
          "We stitch retail and online into one seamless truth."
        </p>

        {/* Description */}
        <p
          className="hero-desc"
          style={{
            color: "var(--muted)",
            fontSize: "0.98rem",
            lineHeight: 1.8,
            maxWidth: 500,
            marginBottom: "2.4rem",
          }}
        >
          CloudRight engineers end-to-end business transformation — unifying
          omnichannel commerce, CRM, ERP, and AI into a single coherent system
          where your business logic sits at the centre and technology revolves
          around it.
        </p>

        {/* Buttons */}
        <div
          className="hero-btns"
          style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}
        >
          <a
            href="#breakthrough"
            className="hero-btn-primary"
            style={{
              background: "var(--cyan)",
              color: "#020208",
              padding: "1rem 2rem",
              borderRadius: 8,
              textDecoration: "none",
              fontWeight: 700,
              fontSize: "0.9rem",
              fontFamily: "'Space Mono', monospace",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              transition:
                "transform 0.25s cubic-bezier(0.22,1,0.36,1), box-shadow 0.25s",
            }}
          >
            Explore Solutions →
          </a>
          <a
            href="#contact"
            className="hero-btn-secondary"
            style={{
              background: "transparent",
              color: "var(--off-white)",
              padding: "1rem 2rem",
              borderRadius: 8,
              textDecoration: "none",
              fontWeight: 600,
              fontSize: "0.9rem",
              border: "1px solid rgba(255,255,255,0.18)",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              transition:
                "transform 0.25s cubic-bezier(0.22,1,0.36,1), border-color 0.2s, color 0.2s, background 0.2s",
            }}
          >
            Talk to Us
          </a>
        </div>
      </div>

      {/* Right — Orbital */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        className="hero-right-wrap"
      >
        <div
          style={{
            position: "relative",
            width: "min(500px, 46vw)",
            aspectRatio: "1",
          }}
        >
          <Suspense fallback={null}>
            <OrbitalCanvas />
          </Suspense>
        </div>
      </div>

      <style>{`
        @media (max-width: 1100px) {
          .hero-section { grid-template-columns: 1fr !important; padding-top: 110px !important; }
        }
        @media (max-width: 768px) {
          .hero-right-wrap { display: none !important; }
        }
      `}</style>
    </section>
  );
}

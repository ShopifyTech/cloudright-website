"use client";
import { memo } from "react";
import { CASES } from "../../constants/data";

// ── Card ─────────────────────────────────────────────────────────────────────
const CaseCard = memo(({ c }) => (
  <div
    className={`case-card ${c.id} reveal ${c.delay}${c.big ? " big" : ""}`}
    style={{
      borderRadius: 20,
      padding: "2.5rem",
      position: "relative",
      overflow: "hidden",
      border: "1px solid rgba(255,255,255,0.08)",
      background: "var(--surface)",
      transition:
        "border-color 0.3s, transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s",
      cursor: "default",
      contain: "layout",
      gridColumn: c.big ? "1 / -1" : "auto",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.borderColor = "rgba(255,255,255,0.14)";
      e.currentTarget.style.transform = "translateY(-4px)";
      e.currentTarget.style.boxShadow = "0 24px 48px rgba(0,0,0,0.4)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
      e.currentTarget.style.transform = "none";
      e.currentTarget.style.boxShadow = "none";
    }}
  >
    <div style={{ position: "relative", zIndex: 1 }}>
      <span
        style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: "0.65rem",
          fontWeight: 700,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          marginBottom: "0.75rem",
          display: "block",
          color: c.coColor,
        }}
      >
        {c.company}
      </span>
      <h3
        style={{
          fontSize: c.big ? "1.3rem" : "1.1rem",
          fontWeight: 600,
          marginBottom: "0.75rem",
          color: "var(--white)",
          lineHeight: 1.4,
        }}
      >
        {c.title}
      </h3>
      <p style={{ color: "#b0aec8", fontSize: "0.88rem", lineHeight: 1.75 }}>
        {c.desc}
      </p>
      <div
        style={{
          marginTop: "1.5rem",
          padding: "0.85rem 1rem",
          borderRadius: 8,
          fontSize: "0.82rem",
          display: "flex",
          alignItems: "center",
          gap: "0.6rem",
          background: c.outcomeBg,
          border: `1px solid ${c.outcomeBorder}`,
          color: c.outcomeColor,
          transition: "background 0.25s, border-color 0.25s",
        }}
      >
        <span
          style={{ fontFamily: "'Space Mono', monospace", fontWeight: 700 }}
        >
          →
        </span>
        {c.outcome}
      </div>
    </div>
  </div>
));

// ── Section ───────────────────────────────────────────────────────────────────
export default function CaseStudies() {
  return (
    <section
      id="cases"
      style={{ background: "var(--black)", padding: "4.5rem 5vw" }}
    >
      <span
        className="label reveal"
        style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: "0.67rem",
          fontWeight: 700,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: "var(--cyan)",
          marginBottom: "1.2rem",
          display: "block",
        }}
      >
        Case Studies
      </span>
      <h2
        className="reveal delay-1"
        style={{
          fontSize: "clamp(2rem, 3.8vw, 3.2rem)",
          fontWeight: 700,
          letterSpacing: "-1.5px",
          lineHeight: 1.08,
          marginBottom: "1.2rem",
          color: "var(--white)",
        }}
      >
        Builders. Platforms.
        <br />
        Enterprise brands.
      </h2>
      <p
        className="reveal delay-2"
        style={{
          color: "var(--muted)",
          fontSize: "1rem",
          lineHeight: 1.78,
          maxWidth: 560,
          marginBottom: "3.5rem",
        }}
      >
        Real business problems. Real engineering solutions. Here's how we've
        helped modern businesses build for scale.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1.5rem",
        }}
        className="cases-grid-layout"
      >
        {CASES.map((c) => (
          <CaseCard key={c.id} c={c} />
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .cases-grid-layout { grid-template-columns: 1fr !important; }
          .case-card.big { grid-column: auto !important; }
        }
      `}</style>
    </section>
  );
}

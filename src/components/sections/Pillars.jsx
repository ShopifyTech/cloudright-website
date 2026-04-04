"use client";
import { memo } from "react";
import { PILLARS, CHIP_STYLES } from "../../constants/data";

const Chip = memo(({ chip }) => {
  const s = CHIP_STYLES[chip.variant] ?? CHIP_STYLES.default;
  return (
    <span
      style={{
        background: s.bg,
        border: `1px solid ${s.border}`,
        borderRadius: 4,
        padding: "0.22rem 0.6rem",
        fontFamily: "'Space Mono', monospace",
        fontSize: "0.65rem",
        fontWeight: 700,
        letterSpacing: "0.05em",
        color: s.color,
        transition: "background 0.2s, border-color 0.2s",
        cursor: "default",
      }}
    >
      {chip.label}
    </span>
  );
});

const PillarCard = memo(({ pillar, index }) => (
  <div
    className={`pillar ${pillar.accent} reveal delay-${index + 1}`}
    style={{
      background: "var(--surface)",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: 16,
      padding: "2rem",
      position: "relative",
      overflow: "hidden",
      transition:
        "border-color 0.3s, transform 0.3s cubic-bezier(0.22,1,0.36,1), box-shadow 0.3s",
      cursor: "default",
      contain: "layout",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)";
      e.currentTarget.style.transform = "translateY(-5px)";
      e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.35)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
      e.currentTarget.style.transform = "none";
      e.currentTarget.style.boxShadow = "none";
    }}
  >
    <div
      style={{
        fontFamily: "'Space Mono', monospace",
        fontSize: "3.5rem",
        fontWeight: 700,
        color: "rgba(255,255,255,0.5)",
        lineHeight: 1,
        marginBottom: "1.5rem",
        letterSpacing: "-3px",
      }}
    >
      {pillar.num}
    </div>
    <h3
      style={{
        fontSize: "1.05rem",
        fontWeight: 600,
        marginBottom: "0.75rem",
        color: "var(--white)",
      }}
    >
      {pillar.title}
    </h3>
    <p
      style={{
        color: "#b0aec8",
        fontSize: "0.88rem",
        lineHeight: 1.7,
        marginBottom: "1.5rem",
      }}
    >
      {pillar.desc}
    </p>
    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
      {pillar.chips.map((chip) => (
        <Chip key={chip.label} chip={chip} />
      ))}
    </div>
  </div>
));

export default function Pillars() {
  return (
    <section
      id="pillars"
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
        Core Solution Pillars
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
        Critical systems.
        <br />
        Engineered end-to-end.
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
        We focus on the platforms that matter most to modern businesses — and we
        make them talk to each other.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1.5rem",
        }}
        className="pillars-grid-layout"
      >
        {PILLARS.map((pillar, i) => (
          <PillarCard key={pillar.num} pillar={pillar} index={i} />
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .pillars-grid-layout { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

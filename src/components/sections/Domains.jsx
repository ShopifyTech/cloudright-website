"use client";
import { memo } from "react";
import { DOMAINS } from "../../constants/data";

const DOMAIN_ICONS = {
  "#00d4ff": (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <path
        d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"
        stroke="#00d4ff"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line x1="3" y1="6" x2="21" y2="6" stroke="#00d4ff" strokeWidth="1.8" />
      <path
        d="M16 10a4 4 0 01-8 0"
        stroke="#00d4ff"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  "#4f7df9": (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <rect
        x="5"
        y="2"
        width="14"
        height="20"
        rx="2"
        stroke="#4f7df9"
        strokeWidth="1.8"
      />
      <path
        d="M12 18h.01"
        stroke="#4f7df9"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  ),
  "#a78bfa": (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <rect
        x="2"
        y="5"
        width="20"
        height="14"
        rx="2"
        stroke="#a78bfa"
        strokeWidth="1.8"
      />
      <path d="M2 10h20" stroke="#a78bfa" strokeWidth="1.8" />
    </svg>
  ),
  "#f59e0b": (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="#f59e0b" strokeWidth="1.8" />
      <path
        d="M12 8v4l3 3"
        stroke="#f59e0b"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  ),
  "#10b981": (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <polyline
        points="16 3 21 3 21 8"
        stroke="#10b981"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line
        x1="4"
        y1="20"
        x2="21"
        y2="3"
        stroke="#10b981"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <polyline
        points="21 16 21 21 16 21"
        stroke="#10b981"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line
        x1="15"
        y1="15"
        x2="21"
        y2="21"
        stroke="#10b981"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  ),
  "#f04438": (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <path
        d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.21 10.9 19.79 19.79 0 01.14 2.34a2 2 0 012-2.18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.47a16 16 0 006.62 6.62l1.52-1.52a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7a2 2 0 011.72 2z"
        stroke="#f04438"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
};

const DomainCard = memo(({ domain }) => (
  <div
    className={`domain-card reveal ${domain.delay}`}
    style={{
      background: "var(--surface)",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: 12,
      padding: "1.75rem",
      transition:
        "border-color 0.3s, background 0.3s, transform 0.3s cubic-bezier(0.22,1,0.36,1), box-shadow 0.3s",
      cursor: "default",
      position: "relative",
      overflow: "hidden",
      contain: "layout",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)";
      e.currentTarget.style.background = "var(--surface2)";
      e.currentTarget.style.transform = "translateY(-4px)";
      e.currentTarget.style.boxShadow = "0 14px 32px rgba(0,0,0,0.3)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
      e.currentTarget.style.background = "var(--surface)";
      e.currentTarget.style.transform = "none";
      e.currentTarget.style.boxShadow = "none";
    }}
  >
    <span
      style={{
        marginBottom: "1rem",
        display: "block",
        transition: "transform 0.25s cubic-bezier(0.22,1,0.36,1)",
        transformOrigin: "left center",
      }}
    >
      {DOMAIN_ICONS[domain.iconColor]}
    </span>
    <h3
      style={{
        fontSize: "0.95rem",
        fontWeight: 600,
        marginBottom: "0.6rem",
        color: "var(--white)",
      }}
    >
      {domain.title}
    </h3>
    <p style={{ color: "#b0aec8", fontSize: "0.82rem", lineHeight: 1.7 }}>
      {domain.desc}
    </p>
  </div>
));

export default function Domains() {
  return (
    <section
      id="domains"
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
        Our Domains
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
        Six domains.
        <br />
        One engineering philosophy.
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
        Built for performance, extensibility, and long-term maintainability. We
        don't operate in templates — we operate in systems.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1rem",
        }}
        className="domains-grid-layout"
      >
        {DOMAINS.map((d) => (
          <DomainCard key={d.title} domain={d} />
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .domains-grid-layout { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

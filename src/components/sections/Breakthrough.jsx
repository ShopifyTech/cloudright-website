"use client";
import { memo } from "react";
import {
  BREAKTHROUGH_CARDS,
  IC_STYLES,
  BADGE_STYLES,
} from "../../constants/data";

const ICON_MAP = {
  cyan: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"
        stroke="#00d4ff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"
        stroke="#00d4ff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  red: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <rect
        x="2"
        y="7"
        width="20"
        height="14"
        rx="2"
        stroke="#f04438"
        strokeWidth="2"
      />
      <path
        d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"
        stroke="#f04438"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="12"
        y1="12"
        x2="12"
        y2="16"
        stroke="#f04438"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="10"
        y1="14"
        x2="14"
        y2="14"
        stroke="#f04438"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  ),
  blue: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="3" stroke="#4f7df9" strokeWidth="2" />
      <path
        d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"
        stroke="#4f7df9"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  ),
  purple: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2L2 7l10 5 10-5-10-5z"
        stroke="#a78bfa"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2 17l10 5 10-5"
        stroke="#a78bfa"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2 12l10 5 10-5"
        stroke="#a78bfa"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
};

const BtCard = memo(({ card }) => {
  const ic = IC_STYLES[card.color];

  return (
    <div
      className={`bt-card reveal ${card.delay}`}
      style={{
        background: "var(--surface)",
        padding: "2.5rem",
        cursor: "default",
        transition: "background 0.3s",
        position: "relative",
        overflow: "hidden",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.background = "var(--surface2)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.background = "var(--surface)")
      }
    >
      <div
        className="bt-icon"
        style={{
          width: 46,
          height: 46,
          borderRadius: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "1.5rem",
          background: ic.bg,
          border: `1px solid ${ic.border}`,
          transition: "transform 0.25s cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        {ICON_MAP[card.color]}
      </div>

      <h3
        style={{
          fontSize: "1.1rem",
          fontWeight: 600,
          marginBottom: "0.75rem",
          color: "var(--white)",
          letterSpacing: "-0.2px",
        }}
      >
        {card.title}
      </h3>
      <p style={{ color: "#b0aec8", fontSize: "0.9rem", lineHeight: 1.75 }}>
        {card.desc}
      </p>

      {card.badge &&
        (() => {
          const bs = BADGE_STYLES[card.badge.variant];
          return (
            <span
              style={{
                display: "inline-block",
                marginTop: "1.2rem",
                borderRadius: 4,
                padding: "0.28rem 0.7rem",
                fontFamily: "'Space Mono', monospace",
                fontSize: "0.62rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                background: bs.bg,
                border: `1px solid ${bs.border}`,
                color: bs.color,
              }}
            >
              {card.badge.text}
            </span>
          );
        })()}
    </div>
  );
});

// ── Section ───────────────────────────────────────────────────────────────────
export default function Breakthrough() {
  return (
    <section
      id="breakthrough"
      style={{
        background: "var(--dark)",
        padding: "4.5rem 5vw",
        position: "relative",
      }}
    >
      {/* Watermark */}
      <div
        style={{
          position: "absolute",
          top: "2rem",
          left: "5vw",
          zIndex: 1,
          fontFamily: "'Space Mono', monospace",
          fontSize: "clamp(5rem, 12vw, 12rem)",
          fontWeight: 700,
          letterSpacing: "-8px",
          lineHeight: 1,
          whiteSpace: "nowrap",
          background:
            "linear-gradient(120deg, rgba(0,212,255,0.12), rgba(0,212,255,0.35))",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          opacity: 0.8,
          textShadow: "0 0 60px rgba(0,212,255,0.12)",
          backgroundClip: "text",
          pointerEvents: "none",
        }}
      >
        SYNC
      </div>

      <div style={{ position: "relative", zIndex: 2 }}>
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
          The Breakthrough
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
          We solved the hardest problem
          <br />
          in modern commerce.
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
          Retail and online — finally in sync. End-to-end business problems
          solved through seamless omnichannel architecture, CRM, ERP, and AI
          working as one unified system.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1px",
            background: "rgba(255,255,255,0.08)",
            borderRadius: 16,
            overflow: "hidden",
            contain: "layout",
          }}
          className="bt-cards-grid"
        >
          {BREAKTHROUGH_CARDS.map((card) => (
            <BtCard key={card.title} card={card} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .bt-cards-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

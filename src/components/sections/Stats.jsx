"use client";
import { STATS } from "../../constants/data";

export default function Stats() {
  return (
    <div
      style={{
        background:
          "linear-gradient(135deg, #060618 0%, #020208 50%, #060612 100%)",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
      }}
      className="stats-grid-layout"
    >
      {STATS.map((stat, i) => (
        <div
          key={stat.label}
          style={{
            textAlign: "center",
            padding: "2.8rem 1rem",
            borderRight:
              i < STATS.length - 1
                ? "1px solid rgba(255,255,255,0.08)"
                : "none",
            position: "relative",
            overflow: "hidden",
            transition: "background 0.3s",
            cursor: "default",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = "rgba(0,212,255,0.03)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = "transparent")
          }
        >
          <span
            data-target={stat.target || undefined}
            data-suffix={stat.suffix || undefined}
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "3rem",
              fontWeight: 700,
              letterSpacing: "-2px",
              display: "block",
              background: "linear-gradient(135deg, #00d4ff, #4f7df9)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              transition: "transform 0.25s cubic-bezier(0.22,1,0.36,1)",
            }}
          >
            {stat.symbol || (stat.target ? `0${stat.suffix}` : "")}
          </span>
          <span
            style={{
              fontSize: "0.78rem",
              color: "var(--off-white)",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              marginTop: "0.3rem",
              display: "block",
            }}
          >
            {stat.label}
          </span>
        </div>
      ))}

      <style>{`
        @media (max-width: 768px) {
          .stats-grid-layout { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 480px) {
          .stats-grid-layout span[data-target] { font-size: 2.2rem !important; }
        }
      `}</style>
    </div>
  );
}

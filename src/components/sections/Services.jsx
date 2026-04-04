"use client";
import { memo } from "react";
import { SERVICES, IC_STYLES } from "../../constants/data";

const SVC_ICONS = {
  cyan_home: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"
        stroke="#00d4ff"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <polyline
        points="9 22 9 12 15 12 15 22"
        stroke="#00d4ff"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  blue_cloud: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z"
        stroke="#4f7df9"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  red_sun: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="3" stroke="#f04438" strokeWidth="1.8" />
      <path
        d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"
        stroke="#f04438"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  ),
  purple_layers: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2L2 7l10 5 10-5-10-5z"
        stroke="#a78bfa"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2 17l10 5 10-5"
        stroke="#a78bfa"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2 12l10 5 10-5"
        stroke="#a78bfa"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  cyan_dollar: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <line
        x1="12"
        y1="1"
        x2="12"
        y2="23"
        stroke="#00d4ff"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"
        stroke="#00d4ff"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  blue_code: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <polyline
        points="16 18 22 12 16 6"
        stroke="#4f7df9"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <polyline
        points="8 6 2 12 8 18"
        stroke="#4f7df9"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
};

// ── Card ─────────────────────────────────────────────────────────────────────
const SvcCard = memo(({ svc }) => {
  const ic = IC_STYLES[svc.color];
  return (
    <div
      className={`svc reveal ${svc.delay}`}
      style={{
        background: "var(--surface)",
        padding: "2rem 2.25rem",
        display: "flex",
        gap: "1.25rem",
        alignItems: "flex-start",
        transition: "background 0.25s",
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
        className="svc-ic"
        style={{
          width: 42,
          height: 42,
          borderRadius: 8,
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: ic.bg,
          border: `1px solid ${ic.border}`,
          transition: "transform 0.25s cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        {SVC_ICONS[svc.iconKey]}
      </div>
      <div>
        <h3
          style={{
            fontSize: "0.9rem",
            fontWeight: 600,
            marginBottom: "0.4rem",
            color: "var(--white)",
          }}
        >
          {svc.title}
        </h3>
        <p style={{ color: "#b0aec8", fontSize: "0.82rem", lineHeight: 1.7 }}>
          {svc.desc}
        </p>
      </div>
    </div>
  );
});

// ── Section ───────────────────────────────────────────────────────────────────
export default function Services() {
  return (
    <section
      id="services"
      style={{ background: "var(--dark)", padding: "4.5rem 5vw" }}
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
        Our Services
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
        Systems engineered with
        <br />
        intent and resilience.
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
        Whether launching a platform, automating compliance, integrating
        enterprise data layers, or building commerce infrastructure — our
        engineering delivers clarity at scale.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1px",
          background: "rgba(255,255,255,0.08)",
          borderRadius: 16,
          overflow: "hidden",
        }}
        className="svcs-grid-layout"
      >
        {SERVICES.map((svc) => (
          <SvcCard key={svc.title} svc={svc} />
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .svcs-grid-layout { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

"use client";
import dynamic from "next/dynamic";
import { useInView } from "@/hooks/useInView";

const OmniCanvas = dynamic(() => import("@/components/canvas/OmniCanvas"), {
  ssr: false,
  loading: () => null,
});

const FEATURES = [
  {
    title: "Real-time data synchronisation",
    desc: "Inventory, orders, and customer data flow in real-time across every system",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path
          d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
          stroke="#00d4ff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "AI at every node",
    desc: "Intelligence embedded in CRM automation, ERP workflows, and omnichannel decisions",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2L2 7l10 5 10-5-10-5z"
          stroke="#00d4ff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2 17l10 5 10-5M2 12l10 5 10-5"
          stroke="#00d4ff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Business logic always first",
    desc: "Technology is configured around how you operate — not the other way around",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <rect
          x="3"
          y="3"
          width="18"
          height="18"
          rx="2"
          stroke="#00d4ff"
          strokeWidth="2"
        />
        <path d="M3 9h18M9 21V9" stroke="#00d4ff" strokeWidth="2" />
      </svg>
    ),
  },
];

export default function OmniSection() {
  const { ref, inView } = useInView();

  return (
    <section
      ref={ref}
      style={{
        background: "var(--dark)",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "5rem",
        alignItems: "center",
        padding: "4.5rem 5vw",
      }}
      className="omni-layout"
    >
      {/* Canvas — only mounted when in view */}
      <div
        className="reveal-left omni-canvas-outer"
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 460,
          aspectRatio: "1",
        }}
      >
        {inView && <OmniCanvas />}
      </div>

      {/* Text */}
      <div className="reveal-right">
        <span
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
          How It Works
        </span>
        <h2
          style={{
            fontSize: "clamp(2rem, 3.8vw, 3.2rem)",
            fontWeight: 700,
            letterSpacing: "-1.5px",
            lineHeight: 1.08,
            marginBottom: "1.2rem",
            color: "var(--white)",
          }}
        >
          Every system.
          <br />
          One gravitational truth.
        </h2>
        <p
          style={{
            color: "var(--muted)",
            fontSize: "1rem",
            lineHeight: 1.78,
            marginBottom: "3.5rem",
          }}
        >
          Your business logic sits at the centre. CRM, ERP, AI, Retail, and
          Online channels revolve around it — continuously synced, always
          coherent.
        </p>

        {FEATURES.map((f) => (
          <div
            key={f.title}
            className="omni-feature"
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "1rem",
              marginBottom: "1.4rem",
            }}
          >
            <div
              className="omni-feature-icon"
              style={{
                width: 40,
                height: 40,
                borderRadius: 8,
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(0,212,255,0.1)",
                border: "1px solid rgba(0,212,255,0.22)",
                transition:
                  "transform 0.25s cubic-bezier(0.22,1,0.36,1), background 0.2s, border-color 0.2s",
              }}
            >
              {f.icon}
            </div>
            <div>
              <h4
                style={{
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  marginBottom: "0.25rem",
                  color: "var(--white)",
                }}
              >
                {f.title}
              </h4>
              <p
                style={{
                  color: "#b0aec8",
                  fontSize: "0.82rem",
                  lineHeight: 1.65,
                }}
              >
                {f.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 1100px) {
          .omni-layout { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
          .omni-canvas-outer { margin: 0 auto; max-width: 360px !important; }
        }
        @media (max-width: 768px) {
          .omni-layout { gap: 2rem !important; padding: 3rem 5vw !important; }
          .omni-canvas-outer { max-width: 280px !important; }
        }
      `}</style>
    </section>
  );
}

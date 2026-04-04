"use client";
import { CLIENTS } from "../../constants/data";

export default function ClientsBar() {
  const doubled = [...CLIENTS, ...CLIENTS];

  return (
    <div
      style={{
        padding: "2.5rem 0",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        background: "var(--dark)",
        overflow: "hidden",
        position: "relative",
        contain: "layout paint",
      }}
    >
      {/* Fade edges */}
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          width: 120,
          zIndex: 2,
          pointerEvents: "none",
          background: "linear-gradient(90deg, var(--dark) 30%, transparent)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          right: 0,
          width: 120,
          zIndex: 2,
          pointerEvents: "none",
          background: "linear-gradient(-90deg, var(--dark) 30%, transparent)",
        }}
      />

      <p
        style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: "0.6rem",
          color: "var(--cyan)",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          textAlign: "center",
          marginBottom: "1.6rem",
        }}
      >
        Trusted by leading brands
      </p>

      <div style={{ overflow: "hidden", width: "100%" }}>
        <div className="marquee-track">
          {doubled.map((client, i) => (
            <span
              key={i}
              className="marquee-card"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: 72,
                padding: "0 3rem",
                whiteSpace: "nowrap",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 8,
                marginRight: "1.5rem",
                flexShrink: 0,
                cursor: "default",
              }}
            >
              <div
                className="marquee-card-inner"
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <img
                  src={client.src}
                  alt={client.alt}
                  loading="lazy"
                  style={{
                    height: 42,
                    width: "auto",
                    maxWidth: 200,
                    objectFit: "contain",
                    display: "block",
                    opacity: 1,
                  }}
                />
              </div>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

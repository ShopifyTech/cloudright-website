"use client";
import { PARTNERS } from "../../constants/data";

const DELAYS = ["delay-1", "delay-2", "delay-3"];

export default function Partners() {
  return (
    <section
      id="partners"
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
        Partners & Clients
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
        Trusted by builders.
        <br />
        Preferred by platforms.
      </h2>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.75rem",
          marginTop: "2.5rem",
        }}
      >
        {PARTNERS.map((name, i) => (
          <span
            key={name}
            className={`reveal partner-chip ${DELAYS[i % 3]}`}
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.18)",
              borderRadius: 8,
              padding: "0.75rem 1.3rem",
              fontFamily: "'Space Mono', monospace",
              fontSize: "0.78rem",
              fontWeight: 700,
              color: "var(--off-white)",
              letterSpacing: "0.07em",
              textTransform: "uppercase",
              cursor: "default",
            }}
          >
            {name}
          </span>
        ))}
      </div>
    </section>
  );
}

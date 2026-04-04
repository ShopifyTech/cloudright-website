"use client";
import { useState, useRef } from "react";
import { TECH_STACK } from "../../constants/data";

const CHIP_STYLES = {
  default: {
    bg: "rgba(255,255,255,0.07)",
    border: "rgba(255,255,255,0.18)",
    color: "var(--off-white)",
  },
  ai: {
    bg: "rgba(0,212,255,0.1)",
    border: "rgba(0,212,255,0.25)",
    color: "var(--cyan)",
  },
  purple: {
    bg: "rgba(167,139,250,0.1)",
    border: "rgba(167,139,250,0.25)",
    color: "var(--purple)",
  },
};

const inputBase = {
  background: "var(--surface)",
  border: "1px solid rgba(255,255,255,0.18)",
  borderRadius: 8,
  padding: "0.85rem 1rem",
  color: "var(--white)",
  fontFamily: "'Space Grotesk', sans-serif",
  fontSize: "0.95rem",
  outline: "none",
  transition: "border-color 0.2s, box-shadow 0.2s",
  width: "100%",
  boxSizing: "border-box",
};

const LABEL_STYLE = {
  fontFamily: "'Space Mono',monospace",
  fontSize: "0.67rem",
  fontWeight: 700,
  letterSpacing: "0.09em",
  textTransform: "uppercase",
  color: "var(--muted)",
};

const FIELD_WRAP = {
  display: "flex",
  flexDirection: "column",
  gap: "0.4rem",
};

function FocusInput({ as: Tag = "input", style: extraStyle, ...props }) {
  return (
    <Tag
      {...props}
      suppressHydrationWarning
      style={{ ...inputBase, ...extraStyle }}
      onFocus={(e) => {
        e.currentTarget.style.borderColor = "var(--cyan)";
        e.currentTarget.style.boxShadow = "0 0 0 3px rgba(0,212,255,0.1)";
      }}
      onBlur={(e) => {
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)";
        e.currentTarget.style.boxShadow = "none";
      }}
    />
  );
}

function ContactRow({ href, label, icon }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        marginBottom: "0.85rem",
        cursor: "default",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span
        style={{
          width: 36,
          height: 36,
          background: hovered ? "rgba(0,212,255,0.1)" : "var(--surface2)",
          border: `1px solid ${hovered ? "var(--cyan)" : "rgba(255,255,255,0.18)"}`,
          borderRadius: 8,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "border-color 0.2s, background 0.2s, transform 0.2s",
          transform: hovered ? "scale(1.06)" : "none",
          flexShrink: 0,
        }}
      >
        {icon}
      </span>
      <a
        href={href}
        style={{
          color: hovered ? "var(--cyan)" : "var(--off-white)",
          textDecoration: "none",
          fontSize: "0.9rem",
          transition: "color 0.2s",
        }}
      >
        {label}
      </a>
    </div>
  );
}

function useContactForm() {
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const formRef = useRef(null);

  async function handleSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = data.get("name")?.toString().trim();
    const email = data.get("email")?.toString().trim();
    const message = data.get("message")?.toString().trim();

    if (!name || !email || !message) {
      setStatus("error");
      setErrorMsg("Please fill in all fields.");
      return;
    }

    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Something went wrong.");
      setStatus("success");
      formRef.current?.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message || "Failed to send. Please try again.");
    }
  }

  return { status, errorMsg, handleSubmit, formRef };
}

export default function Contact() {
  const { status, errorMsg, handleSubmit, formRef } = useContactForm();

  return (
    <section
      id="contact"
      style={{ background: "var(--dark)", padding: "4.5rem 5vw" }}
    >
      <span
        className="label reveal"
        style={{
          fontFamily: "'Space Mono',monospace",
          fontSize: "0.67rem",
          fontWeight: 700,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: "var(--red)",
          marginBottom: "1.2rem",
          display: "block",
        }}
      >
        Get In Touch
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
        Let's solve your hardest
        <br />
        business problems.
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
        Whether unifying retail and online, implementing CRM/ERP, or embedding
        AI across your stack — we're ready to engineer it.
      </p>

      <div
        className="contact-grid-layout"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "5rem",
          alignItems: "start",
        }}
      >
        {/* ── Form ── */}
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="reveal delay-1"
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          noValidate
        >
          <div style={FIELD_WRAP}>
            <label style={LABEL_STYLE}>Full Name</label>
            <FocusInput
              type="text"
              name="name"
              placeholder="Your name"
              required
            />
          </div>

          <div style={FIELD_WRAP}>
            <label style={LABEL_STYLE}>Email</label>
            <FocusInput
              type="email"
              name="email"
              placeholder="you@company.com"
              required
            />
          </div>

          <div style={FIELD_WRAP}>
            <label style={LABEL_STYLE}>What are you looking to solve?</label>
            <FocusInput
              as="textarea"
              name="message"
              placeholder="Tell us about your challenge — omnichannel, CRM, ERP, AI, or all of the above..."
              style={{ minHeight: 120, resize: "vertical" }}
              required
            />
          </div>

          {/* Error */}
          {status === "error" && (
            <p
              style={{
                color: "var(--red)",
                fontSize: "0.82rem",
                fontFamily: "'Space Mono',monospace",
                margin: 0,
              }}
            >
              ✕ {errorMsg}
            </p>
          )}

          {/* Success */}
          {status === "success" && (
            <p
              style={{
                color: "var(--cyan)",
                fontSize: "0.82rem",
                fontFamily: "'Space Mono',monospace",
                margin: 0,
              }}
            >
              ✓ Message sent — we'll be in touch shortly.
            </p>
          )}

          <button
            type="submit"
            suppressHydrationWarning
            disabled={status === "sending"}
            style={{
              background:
                status === "sending" ? "rgba(0,212,255,0.5)" : "var(--cyan)",
              color: "#020208",
              border: "none",
              padding: "1rem 2rem",
              borderRadius: 8,
              fontFamily: "'Space Mono',monospace",
              fontWeight: 700,
              fontSize: "0.85rem",
              letterSpacing: "0.05em",
              cursor: status === "sending" ? "not-allowed" : "pointer",
              alignSelf: "flex-start",
              transition:
                "transform 0.25s cubic-bezier(0.22,1,0.36,1), box-shadow 0.25s, background 0.2s",
              minWidth: 160,
            }}
            onMouseEnter={(e) => {
              if (status === "sending") return;
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow =
                "0 8px 24px rgba(0,212,255,0.35)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "none";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            {status === "sending" ? "Sending…" : "Send Message →"}
          </button>
        </form>

        {/* ── Info panel ── */}
        <div className="reveal delay-2">
          <p
            style={{
              color: "#b0aec8",
              fontSize: "1rem",
              lineHeight: 1.8,
              marginBottom: "2rem",
            }}
          >
            We partner with businesses that demand more than deliverables. If
            you're looking to bind your retail and online worlds with technology
            that actually works — we should talk.
          </p>

          <ContactRow
            href="tel:919611056454"
            label="+91 96110-56454"
            icon={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.21 10.9 19.79 19.79 0 01.14 2.34a2 2 0 012-2.18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.47a16 16 0 006.62 6.62l1.52-1.52a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7a2 2 0 011.72 2z"
                  stroke="#9896b0"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            }
          />

          <ContactRow
            href="mailto:tech@cloudright.in"
            label="tech@cloudright.in"
            icon={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                  stroke="#9896b0"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <polyline
                  points="22,6 12,13 2,6"
                  stroke="#9896b0"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            }
          />

          <span
            style={{
              fontFamily: "'Space Mono',monospace",
              fontSize: "0.65rem",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--muted)",
              marginTop: "2.5rem",
              marginBottom: "1rem",
              display: "block",
            }}
          >
            Technology Stack
          </span>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
            {TECH_STACK.map((chip) => {
              const s = CHIP_STYLES[chip.variant] || CHIP_STYLES.default;
              return (
                <span
                  key={chip.label}
                  style={{
                    background: s.bg,
                    border: `1px solid ${s.border}`,
                    borderRadius: 4,
                    padding: "0.22rem 0.6rem",
                    fontFamily: "'Space Mono',monospace",
                    fontSize: "0.65rem",
                    fontWeight: 700,
                    letterSpacing: "0.05em",
                    color: s.color,
                    cursor: "default",
                  }}
                >
                  {chip.label}
                </span>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1100px) {
          .contact-grid-layout {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
        }
      `}</style>
    </section>
  );
}

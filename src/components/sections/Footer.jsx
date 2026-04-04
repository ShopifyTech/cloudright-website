"use client";
// src/components/sections/Footer.jsx
import Image from "next/image";
export default function Footer() {
  return (
    <footer
      style={{
        background: "var(--black)",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        padding: "2rem 5vw",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "1rem",
      }}
    >
      <a
        href="#"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          textDecoration: "none",
        }}
      >
        <Image
          src="/assets/cloudright-logo.png"
          alt="CloudRight logo"
          width={61}
          height={50}
          style={{ height: 40, width: "auto", display: "block" }}
        />
      </a>

      <span style={{ fontSize: "0.8rem", color: "var(--muted)" }}>
        © 2026 CloudRight. All Rights Reserved.
      </span>

      <div>
        <a
          href="mailto:tech@cloudright.in"
          style={{
            fontSize: "0.8rem",
            color: "var(--muted)",
            textDecoration: "none",
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--cyan)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
        >
          tech@cloudright.in
        </a>
      </div>
    </footer>
  );
}

"use client";
import { useState, useEffect } from "react";
import { NAV_LINKS } from "../../constants/data";
import Image from "next/image";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handler = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 40);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 500,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 5vw",
          height: 68,
          background: scrolled ? "rgba(2,2,8,0.97)" : "rgba(2,2,8,0.90)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          transform: "translateZ(0)",
          transition: "box-shadow 0.3s, background 0.3s",
          boxShadow: scrolled ? "0 4px 32px rgba(0,212,255,0.05)" : "none",
        }}
      >
        {/* Logo */}
        <a
          href="#"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            textDecoration: "none",
            zIndex: 10,
          }}
        >
          <Image
            src="/assets/cloudright-logo.png"
            alt="CloudRight logo"
            width={61}
            height={50}
            priority
            style={{ height: 40, width: "auto" }}
          />
        </a>

        {/* Desktop Links */}
        <ul
          className="nav-desktop"
          style={{
            display: "flex",
            gap: "2.2rem",
            listStyle: "none",
            margin: 0,
            padding: 0,
          }}
        >
          {/* {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="nav-link-item"
                style={{
                  textDecoration: "none",
                  color: "var(--muted)",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  transition: "color 0.2s",
                  position: "relative",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--muted)")
                }
              >
                {link.label}
              </a>
            </li>
          ))} */}
        </ul>

        {/* Right side: CTA + Hamburger */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <a
            href="#contact"
            className="nav-cta"
            style={{
              background: "var(--cyan)",
              color: "#020208",
              padding: "0.55rem 1.4rem",
              borderRadius: 6,
              textDecoration: "none",
              fontSize: "0.85rem",
              fontWeight: 700,
              fontFamily: "'Space Mono', monospace",
              letterSpacing: "0.03em",
              transition:
                "transform 0.2s cubic-bezier(0.22,1,0.36,1), box-shadow 0.2s",
              display: "inline-block",
            }}
          >
            Book A Call →
          </a>

          {/* Hamburger Button */}
          <button
            className="nav-hamburger"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            style={{
              display: "none",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: 5,
              width: 40,
              height: 40,
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 8,
              borderRadius: 6,
            }}
          >
            <span
              style={{
                display: "block",
                width: 22,
                height: 1.5,
                background: "#fff",
                borderRadius: 2,
                transition: "transform 0.25s, opacity 0.25s",
                transform: menuOpen
                  ? "translateY(6.5px) rotate(45deg)"
                  : "none",
              }}
            />
            <span
              style={{
                display: "block",
                width: 22,
                height: 1.5,
                background: "#fff",
                borderRadius: 2,
                transition: "opacity 0.2s",
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              style={{
                display: "block",
                width: menuOpen ? 22 : 14,
                height: 1.5,
                background: "#fff",
                borderRadius: 2,
                transition: "transform 0.25s, width 0.25s",
                transform: menuOpen
                  ? "translateY(-6.5px) rotate(-45deg)"
                  : "none",
                alignSelf: "flex-start",
              }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div
        style={{
          position: "fixed",
          top: 68,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 499,
          background: "rgba(2,2,8,0.98)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          transform: menuOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.35s cubic-bezier(0.22,1,0.36,1)",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          padding: "2rem 5vw 3rem",
        }}
      >
        {/* <ul style={{ listStyle: "none", margin: 0, padding: 0, flex: 1 }}>
          {NAV_LINKS.map((link, i) => (
            <li
              key={link.href}
              style={{
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                transform: menuOpen ? "translateX(0)" : "translateX(24px)",
                opacity: menuOpen ? 1 : 0,
                transition: `transform 0.35s cubic-bezier(0.22,1,0.36,1) ${i * 0.05}s, opacity 0.3s ease ${i * 0.05}s`,
              }}
            >
              <a
                href={link.href}
                onClick={closeMenu}
                style={{
                  display: "block",
                  padding: "1.1rem 0",
                  textDecoration: "none",
                  color: "rgba(255,255,255,0.75)",
                  fontSize: "1.15rem",
                  fontWeight: 500,
                  letterSpacing: "0.01em",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "rgba(255,255,255,0.75)")
                }
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul> */}

        <a
          href="#contact"
          onClick={closeMenu}
          style={{
            marginTop: "2rem",
            background: "var(--cyan)",
            color: "#020208",
            padding: "0.9rem 1.4rem",
            borderRadius: 6,
            textDecoration: "none",
            fontSize: "0.95rem",
            fontWeight: 700,
            fontFamily: "'Space Mono', monospace",
            letterSpacing: "0.03em",
            textAlign: "center",
            display: "block",
          }}
        >
          Book A Call →
        </a>
      </div>

      <style>{`
        @media (max-width: 1100px) {
          .nav-desktop { display: none !important; }
          .nav-cta { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
      `}</style>
    </>
  );
}

"use client";
import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import { ABOUT_VALUES } from "@/constants/data";
import { useInView } from "@/hooks/useInView";

// ssr:false is legal here — this IS a "use client" file
const AboutBgCanvas = dynamic(
  () => import("@/components/canvas/AboutBgCanvas"),
  { ssr: false, loading: () => null },
);

const CR_CHIPS = ["Commerce", "CRM", "ERP", "AI-First", "Omnichannel"];

export default function About() {
  const wrapRef = useRef(null);
  const { ref: sectionRef, inView } = useInView();

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const crObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            wrap.classList.add("revealed");
            crObs.unobserve(wrap);
          }
        });
      },
      { threshold: 0.25 },
    );
    crObs.observe(wrap);

    let tRX = 0,
      tRY = 0,
      cRX = 0,
      cRY = 0,
      parallaxY = 0;
    let rafId = null;

    function animLoop() {
      cRX += (tRX - cRX) * 0.08;
      cRY += (tRY - cRY) * 0.08;
      wrap.style.transform = `perspective(1000px) rotateX(${cRX}deg) rotateY(${cRY}deg) translateY(${parallaxY}px)`;
      const settled = Math.abs(tRX - cRX) < 0.02 && Math.abs(tRY - cRY) < 0.02;
      rafId = settled ? null : requestAnimationFrame(animLoop);
    }

    const onMouseMove = (e) => {
      const rect = wrap.getBoundingClientRect();
      const dx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      const dy = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
      tRY = dx * 7;
      tRX = -dy * 4;
      if (!rafId) rafId = requestAnimationFrame(animLoop);
    };

    const onMouseLeave = () => {
      tRX = 0;
      tRY = 0;
      if (!rafId) rafId = requestAnimationFrame(animLoop);
    };

    // ← Only the left card listens, not the whole section
    wrap.addEventListener("mousemove", onMouseMove);
    wrap.addEventListener("mouseleave", onMouseLeave);

    const scrollHandler = () => {
      const rect = wrap.getBoundingClientRect();
      if (rect.bottom > 0 && rect.top < window.innerHeight) {
        const progress =
          (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
        parallaxY = (progress - 0.5) * 50;
        if (!rafId) rafId = requestAnimationFrame(animLoop);
      }
    };
    window.addEventListener("scroll", scrollHandler, { passive: true });

    return () => {
      crObs.disconnect();
      cancelAnimationFrame(rafId);
      wrap.removeEventListener("mousemove", onMouseMove); // ← updated
      wrap.removeEventListener("mouseleave", onMouseLeave); // ← updated
      window.removeEventListener("scroll", scrollHandler);
    };
  }, [inView]);

  const textFontSize = "clamp(4rem, 12vw, 9.5rem)";
  const letterSpacing = "-5px";

  return (
    <section
      id="about"
      ref={sectionRef}
      className="about-section-el"
      style={{
        background: "var(--black)",
        overflow: "hidden",
        position: "relative",
        padding: "4.5rem 5vw",
      }}
    >
      {/* Canvas only mounts when section is in view */}
      {inView && <AboutBgCanvas />}

      <div
        style={{
          position: "relative",
          zIndex: 10,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "6rem",
          alignItems: "center",
        }}
        className="about-inner-grid"
      >
        {/* Left: CloudRight display */}
        <div>
          <div
            ref={wrapRef}
            id="cr-display"
            className="cr-display-wrap"
            style={{
              position: "relative",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: 0,
              perspective: "1000px",
              userSelect: "none",
              transformStyle: "preserve-3d",
            }}
          >
            {["CLOUD", "RIGHT"].map((word, wi) => (
              <div
                key={word}
                className="cr-line"
                style={{
                  position: "relative",
                  display: "block",
                  lineHeight: 0.88,
                  overflow: "visible",
                }}
              >
                <div
                  className="cr-word"
                  style={{
                    position: "relative",
                    display: "inline-block",
                    cursor: "default",
                  }}
                >
                  {/* Shadow layer */}
                  <span
                    style={{
                      position: "absolute",
                      inset: 0,
                      fontFamily: "'Space Mono',monospace",
                      fontSize: textFontSize,
                      fontWeight: 700,
                      letterSpacing,
                      lineHeight: 0.88,
                      color: "transparent",
                      WebkitTextStroke: "1px rgba(0,212,255,0.07)",
                      transform: "translate(6px,8px)",
                      filter: "blur(3px)",
                      pointerEvents: "none",
                      zIndex: 0,
                    }}
                  >
                    {word}
                  </span>
                  {/* Outline layer */}
                  <span
                    style={{
                      position: "relative",
                      display: "block",
                      fontFamily: "'Space Mono',monospace",
                      fontSize: textFontSize,
                      fontWeight: 700,
                      letterSpacing,
                      lineHeight: 0.88,
                      color: "transparent",
                      WebkitTextStroke: "1.5px rgba(255,255,255,0.11)",
                      zIndex: 1,
                    }}
                  >
                    {word}
                  </span>
                  {/* Gradient fill */}
                  <span
                    className={`cr-word-fill word-${word.toLowerCase()}`}
                    style={{
                      position: "absolute",
                      inset: 0,
                      display: "block",
                      fontFamily: "'Space Mono',monospace",
                      fontSize: textFontSize,
                      fontWeight: 700,
                      letterSpacing,
                      lineHeight: 0.88,
                      zIndex: 2,
                      background:
                        wi === 0
                          ? "linear-gradient(135deg,#fff 0%,#a8d4ff 40%,#00d4ff 75%,#4f7df9 100%)"
                          : "linear-gradient(135deg,#00d4ff 0%,#a78bfa 50%,#fff 100%)",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      pointerEvents: "none",
                    }}
                  >
                    {word}
                  </span>
                </div>
              </div>
            ))}

            <div className="cr-rule" />

            <div
              className="cr-chips"
              style={{
                display: "flex",
                gap: "0.5rem",
                flexWrap: "wrap",
                marginTop: "1.2rem",
              }}
            >
              {CR_CHIPS.map((chip) => (
                <span
                  key={chip}
                  className="cr-chip"
                  style={{
                    fontFamily: "'Space Mono',monospace",
                    fontSize: "0.58rem",
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    padding: "0.25rem 0.65rem",
                    borderRadius: 4,
                    border: "1px solid rgba(0,212,255,0.22)",
                    color: "rgba(0,212,255,0.7)",
                    background: "rgba(0,212,255,0.06)",
                    transition:
                      "border-color 0.2s, color 0.2s, background 0.2s, transform 0.2s",
                    cursor: "default",
                  }}
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="reveal-right">
          <span
            style={{
              fontFamily: "'Space Mono',monospace",
              fontSize: "0.67rem",
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--cyan)",
              marginBottom: "1.2rem",
              display: "block",
            }}
          >
            Who We Are
          </span>
          <h2
            style={{
              fontSize: "clamp(2rem, 3.8vw, 3.2rem)",
              fontWeight: 700,
              letterSpacing: "-1.5px",
              lineHeight: 1.08,
              marginBottom: "1rem",
              color: "var(--white)",
            }}
          >
            Technology-first.
            <br />
            Business-core. Always.
          </h2>
          <p
            style={{
              color: "#b0aec8",
              fontSize: "0.95rem",
              lineHeight: 1.8,
              marginBottom: "2rem",
            }}
          >
            Cloudright is a technology-first commerce engineering firm
            purpose-built for the modern stack. We architect resilient systems,
            engineer zero-friction integrations, and design digital products
            that scale without compromise.
          </p>

          <ul
            style={{
              listStyle: "none",
              margin: 0,
              padding: 0,
              marginTop: "2rem",
            }}
          >
            {ABOUT_VALUES.map((v) => (
              <li
                key={v.lbl}
                className="v-item"
                style={{
                  padding: "1rem 0",
                  borderBottom: "1px solid rgba(255,255,255,0.08)",
                  display: "flex",
                  gap: "1rem",
                  alignItems: "flex-start",
                  transition: "padding-left 0.25s cubic-bezier(0.22,1,0.36,1)",
                  cursor: "default",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Space Mono',monospace",
                    fontSize: "0.6rem",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--cyan)",
                    minWidth: 24,
                    paddingTop: 3,
                  }}
                >
                  {v.lbl}
                </span>
                <span
                  style={{
                    fontSize: "0.9rem",
                    color: "#b0aec8",
                    lineHeight: 1.65,
                  }}
                  dangerouslySetInnerHTML={{
                    __html: v.text.replace(
                      "<strong>",
                      '<strong style="color:var(--off-white);font-weight:600;">',
                    ),
                  }}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <style>{`
        @media (max-width: 1100px) {
          .about-inner-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
        }
        .cr-chip:hover {
          border-color: rgba(0,212,255,0.55) !important;
          color: var(--cyan) !important;
          background: rgba(0,212,255,0.12) !important;
          transform: translateY(-2px);
        }
      `}</style>
    </section>
  );
}

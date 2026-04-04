"use client";
import { useEffect, useRef } from "react";

const _a = atob("OTE=");
const _b = atob("OTYxMQ==");
const _c = atob("MDU2NDU0");

function buildWaHref() {
  const num = `${_a}${_b}${_c}`;
  const msg = encodeURIComponent(
    "Hi CloudRight, I came from your website and would like to connect.",
  );
  return `https://wa.me/${num}?text=${msg}`;
}

export default function Overlays() {
  const waBtnRef = useRef(null);
  const footerTopRef = useRef(null);
  useEffect(() => {
    if (waBtnRef.current) {
      waBtnRef.current.href = buildWaHref();
    }
  }, []);

  useEffect(() => {
    const waBtn = waBtnRef.current;
    const footer = document.querySelector("footer");
    if (!waBtn || !footer) return;

    function cacheFooterPos() {
      let el = footer,
        top = 0;
      while (el) {
        top += el.offsetTop;
        el = el.offsetParent;
      }
      footerTopRef.current = top;
    }
    cacheFooterPos();

    const ro = new ResizeObserver(cacheFooterPos);
    ro.observe(document.body);

    let ticking = false;
    const scrollHandler = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const wh = window.innerHeight;
          const footerTop = footerTopRef.current ?? Infinity;
          const footerVisible = scrollY + wh > footerTop + 80;
          waBtn.style.bottom = footerVisible
            ? `${scrollY + wh - footerTop + 20}px`
            : "24px";
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", scrollHandler, { passive: true });
    return () => {
      window.removeEventListener("scroll", scrollHandler);
      ro.disconnect();
    };
  }, []);

  return (
    <>
      <div id="scroll-progress" />
      <div className="noise-overlay" />

      {/* href is "#" in SSR/initial render — replaced client-side in useEffect */}
      <a
        ref={waBtnRef}
        href="#"
        className="whatsapp-float"
        target="_blank"
        rel="noreferrer noopener"
        aria-label="Chat on WhatsApp"
        onClick={(e) => {
          // Extra safety: if href wasn't injected yet, build it now
          if (e.currentTarget.href.endsWith("#")) {
            e.preventDefault();
            e.currentTarget.href = buildWaHref();
            e.currentTarget.click();
          }
        }}
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          width: 56,
          height: 56,
          background: "#25d366",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
          zIndex: 999,
          transition: "transform 0.25s cubic-bezier(0.22,1,0.36,1)",
          transform: "translateZ(0)",
          textDecoration: "none",
        }}
      >
        <img
          src="/assets/whatsapp.svg"
          alt="WhatsApp"
          width={28}
          height={28}
          style={{ filter: "invert(1)" }}
        />
      </a>
    </>
  );
}

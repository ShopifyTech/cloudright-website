"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { useCountUp } from "@/hooks/useCountUp";
import { useCardSpotlight } from "@/hooks/useCardSpotlight";

// This component exists solely to run client-side hooks.
// Keeping it separate lets page.jsx remain a Server Component,
// which means all section markup is server-rendered HTML —
// improving SEO and first-paint performance.
export default function ClientEffects() {
  useScrollReveal();
  useScrollProgress();
  useCountUp();
  useCardSpotlight(".bt-card, .pillar");
  return null;
}

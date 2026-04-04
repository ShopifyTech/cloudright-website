"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { useCountUp } from "@/hooks/useCountUp";
import { useCardSpotlight } from "@/hooks/useCardSpotlight";

export default function PageEffects() {
  useScrollReveal();
  useScrollProgress();
  useCountUp();
  useCardSpotlight(".bt-card, .pillar");
  return null;
}

import dynamic from "next/dynamic";

export const HeroBgCanvas = dynamic(() => import("./HeroBgCanvas"), {
  ssr: false,
  loading: () => null,
});

export const OrbitalCanvas = dynamic(() => import("./OrbitalCanvas"), {
  ssr: false,
  loading: () => null,
});

export const OmniCanvas = dynamic(() => import("./OmniCanvas"), {
  ssr: false,
  loading: () => null,
});

export const AboutBgCanvas = dynamic(() => import("./AboutBgCanvas"), {
  ssr: false,
  loading: () => null,
});

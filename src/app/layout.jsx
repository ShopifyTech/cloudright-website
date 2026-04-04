import dynamic from "next/dynamic";
import { Space_Grotesk, Space_Mono } from "next/font/google";
import "@/app/globals.css";
import SmoothScroll from "@/components/sections/SmoothScroll";
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-grotesk",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono-custom",
  display: "swap",
});
export const metadata = {
  metadataBase: new URL("https://cloudright.in"),

  title: {
    default: "CloudRight — Omnichannel Commerce, CRM, ERP & AI Engineering India",
    template: "%s | CloudRight",
  },

  description:
    "CloudRight engineers end-to-end business transformation — unifying omnichannel commerce, Salesforce CRM, SAP ERP, and AI into one coherent system. Trusted by LEGO, Redington, Apple & more.",

  keywords: [
    "omnichannel commerce engineering",
    "Salesforce CRM integration",
    "SAP ERP integration",
    "Shopify enterprise development",
    "AI-powered CRM automation",
    "retail digital transformation",
    "omnichannel ERP sync",
    "Shopify Salesforce integration",
    "headless commerce India",
    "B2B commerce technology",
    "CloudRight",
    "enterprise Shopify partner India",
    "AI ERP automation",
    "digital twin retail",
    "CRM ERP AI integration",
    "Shopify Hydrogen development",
    "commerce infrastructure India",
    "GST compliance automation",
    "predictive inventory AI",
    "document intelligence AI",
  ],

  authors: [{ name: "CloudRight", url: "https://cloudright.in" }],
  creator: "CloudRight",
  publisher: "CloudRight",

  alternates: {
    canonical: "https://cloudright.in",
  },

  openGraph: {
    title:
      "CloudRight — Where Retail Meets Its Digital Twin | Omnichannel, CRM, ERP & AI",
    description:
      "We stitch retail and online into one seamless truth. CloudRight engineers omnichannel commerce, Salesforce CRM, SAP ERP, and AI systems for enterprise brands across India.",
    url: "https://cloudright.in",
    siteName: "CloudRight",
    images: [
      {
        url: "/assets/cloudright-logo.png",
        width: 1536,
        height: 1256,
        alt: "CloudRight — Omnichannel Commerce & AI Engineering",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title:
      "CloudRight — Omnichannel Commerce, CRM, ERP & AI Engineering for Enterprise",
    description:
      "We stitch retail and online into one seamless truth. Salesforce, SAP, Shopify, and AI — unified around your business logic. Trusted by LEGO, Redington & more.",
    images: ["/assets/cloudright-logo.png"],
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: "/assets/favicon.ico",
    shortcut: "/assets/favicon.ico",
    apple: "/assets/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://cloudright.in/#organization",
        name: "CloudRight",
        url: "https://cloudright.in",
        logo: {
          "@type": "ImageObject",
          url: "https://cloudright.in/assets/cloudright-logo.png",
        },
        description:
          "CloudRight engineers end-to-end business transformation — unifying omnichannel commerce, Salesforce CRM, SAP ERP, and AI into one coherent system.",
        address: {
          "@type": "PostalAddress",
          addressCountry: "IN",
        },
        sameAs: [],
      },
      {
        "@type": "WebSite",
        "@id": "https://cloudright.in/#website",
        url: "https://cloudright.in",
        name: "CloudRight",
        publisher: { "@id": "https://cloudright.in/#organization" },
      },
    ],
  };

  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${spaceMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {" "}
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}

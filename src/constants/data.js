export const NAV_LINKS = [
  { href: "#breakthrough", label: "Solutions" },
  { href: "#pillars", label: "Pillars" },
  { href: "#services", label: "Services" },
  { href: "#cases", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

// CLIENTS
export const CLIENTS = [
  { src: "/assets/lego.svg", alt: "LEGO India" },
  { src: "/assets/Ample.svg", alt: "Ample" },
  { src: "/assets/redington.svg", alt: "Redington" },
  { src: "/assets/DV.svg", alt: "DoubleVerify" },
  { src: "/assets/Pinelabs.svg", alt: "Pine Labs" },
  { src: "/assets/vayana.svg", alt: "Vayana" },
  { src: "/assets/broadcom.svg", alt: "Broadcom" },
  { src: "/assets/Apple.svg", alt: "Apple" },
  { src: "/assets/Soundscape.svg", alt: "Bose" },
  { src: "/assets/quess.svg", alt: "Quess" },
];

// SHARED ICON STYLES
export const IC_STYLES = {
  cyan: { bg: "rgba(0,212,255,0.1)", border: "rgba(0,212,255,0.2)" },
  blue: { bg: "rgba(79,125,249,0.12)", border: "rgba(79,125,249,0.22)" },
  red: { bg: "rgba(240,68,56,0.1)", border: "rgba(240,68,56,0.2)" },
  purple: { bg: "rgba(167,139,250,0.1)", border: "rgba(167,139,250,0.2)" },
};

export const BADGE_STYLES = {
  cyan: {
    bg: "rgba(0,212,255,0.1)",
    border: "rgba(0,212,255,0.25)",
    color: "var(--cyan)",
  },
  red: {
    bg: "rgba(240,68,56,0.1)",
    border: "rgba(240,68,56,0.25)",
    color: "var(--red)",
  },
};

// BREAKTHROUGH
export const BREAKTHROUGH_CARDS = [
  {
    color: "cyan",
    title: "Retail ↔ Online: One Unified Truth",
    desc:
      "We synchronise physical stores and digital platforms in real-time. Inventory, orders, customer profiles, and loyalty programmes move as one unified data layer — not parallel universes.",
    badge: { text: "Major Breakthrough", variant: "cyan" },
    delay: "delay-1",
  },
  {
    color: "red",
    title: "End-to-End Business Problem Solving",
    desc:
      "We map your entire business challenge — from the customer experience layer to backend systems — and engineer a coherent solution that holds together at scale and adapts as you grow.",
    badge: { text: "Our Approach", variant: "red" },
    delay: "delay-2",
  },
  {
    color: "blue",
    title: "Business at the Core, Tech in Orbit",
    desc:
      "Your business logic is the gravitational centre. CRM, ERP, AI, and cloud infrastructure revolve around it — configured to serve your processes, not the other way around.",
    delay: "delay-3",
  },
  {
    color: "purple",
    title: "AI Embedded Across Every Layer — Not Bolted On",
    desc:
      "AI-powered CRM automation. Intelligent ERP workflows. Predictive inventory. Document intelligence. AI is not an afterthought at CloudRight — it is woven into every solution from the ground up.",
    badge: { text: "AI-First by Design", variant: "cyan" },
    delay: "delay-4",
  },
];

// PILLARS
export const PILLARS = [
  {
    num: "01",
    title: "CRM — Customer at Centre",
    desc:
      "Implement, customise, and deeply integrate CRM solutions that turn your customer lifecycle into a growth engine. From lead pipelines to service automation, fully AI-powered.",
    chips: [
      { label: "Salesforce", variant: "default" },
      { label: "ZOHO", variant: "default" },
      { label: "+ more", variant: "default" },
      { label: "AI Powered", variant: "ai" },
    ],
    accent: "pc",
  },
  {
    num: "02",
    title: "ERP — Operations in Harmony",
    desc:
      "Inventory synced with sales, finance integrated with operations, every department on a single version of truth. ERPs that actually work for your business logic.",
    chips: [
      { label: "SAP", variant: "default" },
      { label: "LOGIC", variant: "default" },
      { label: "+ more", variant: "default" },
      { label: "AI Powered", variant: "red" },
    ],
    accent: "pr",
  },
  {
    num: "03",
    title: "Omnichannel — One Commerce",
    desc:
      "The bridge between your stores and your digital platforms. Sync inventory, orders, loyalty, and customer data so every channel feels like one brand — because it is.",
    chips: [
      { label: "Shopify", variant: "default" },
      { label: "POS", variant: "default" },
      { label: "ERP Sync", variant: "default" },
      { label: "AI Powered", variant: "purple" },
    ],
    accent: "pp",
  },
];

export const CHIP_STYLES = {
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
  red: {
    bg: "rgba(240,68,56,0.1)",
    border: "rgba(240,68,56,0.25)",
    color: "#ff8f86",
  },
  purple: {
    bg: "rgba(167,139,250,0.1)",
    border: "rgba(167,139,250,0.25)",
    color: "var(--purple)",
  },
};

// SERVICES
export const SERVICES = [
  {
    color: "cyan",
    iconKey: "cyan_home",
    title: "Omnichannel Commerce Architecture",
    desc:
      "Unify retail and digital into a single, coherent commerce system. Real-time inventory, unified customer profiles, and cross-channel order management — all in sync.",
    delay: "delay-1",
  },
  {
    color: "blue",
    iconKey: "blue_cloud",
    title: "Salesforce CRM Integration",
    desc:
      "Deep, real-time sync between Salesforce and Shopify, ERPs, and internal tools. End-to-end automation across Marketing Cloud, Service Cloud, and beyond.",
    delay: "delay-2",
  },
  {
    color: "red",
    iconKey: "red_sun",
    title: "ERP Integration & Automation",
    desc:
      "Custom APIs, data pipelines, and orchestration logic to bridge ERP systems — SAP, LOGIC, and more — with your commerce and CRM layers.",
    delay: "delay-3",
  },
  {
    color: "purple",
    iconKey: "purple_layers",
    title: "AI-Powered Automation Systems",
    desc:
      "From document intelligence to predictive inventory and NLP workflows — AI deployed as a force multiplier across CRM, ERP, and omnichannel.",
    delay: "delay-4",
  },
  {
    color: "cyan",
    iconKey: "cyan_dollar",
    title: "Finance Tech & Regulatory Engineering",
    desc:
      "GST, compliance, and finance automation at national scale. Real-time tax validation, automated filing, and back-office reconciliation.",
    delay: "delay-5",
  },
  {
    color: "blue",
    iconKey: "blue_code",
    title: "Infrastructure & DevOps",
    desc:
      "CI/CD pipelines with rollback safety, GitOps workflows, telemetry-driven observability, and canary deploys — engineered to ship confidently.",
    delay: "delay-6",
  },
];

// DOMAINS
export const DOMAINS = [
  {
    title: "Full-Stack Shopify Engineering",
    desc:
      "Headless builds, Hydrogen frameworks, custom storefront APIs, schema-driven themes — all optimised for speed, conversion, and modularity.",
    iconColor: "#00d4ff",
    delay: "delay-1",
  },
  {
    title: "Custom App Ecosystems",
    desc:
      "Embedded Shopify Admin apps, App Bridge integrations, secure OAuth2 architectures, and event-driven systems leveraging Shopify's extensibility framework.",
    iconColor: "#4f7df9",
    delay: "delay-2",
  },
  {
    title: "Payments & Checkout Logic",
    desc:
      "Shopify Functions, tokenised gateways, dynamic bundling logic, and PCI-compliant checkout orchestration built for scale and fault tolerance.",
    iconColor: "#a78bfa",
    delay: "delay-3",
  },
  {
    title: "Component-Based UI Systems",
    desc:
      "Tailwind CSS, React, state-aware UX, WCAG-compliant accessibility, and design systems engineered for atomic reusability across device layers.",
    iconColor: "#f59e0b",
    delay: "delay-1",
  },
  {
    title: "Enterprise Data Layer Integrations",
    desc:
      "Deep CRM and ERP integrations, Salesforce API orchestration, multi-system sync with GraphQL/REST, and real-time customer lifecycle automation.",
    iconColor: "#10b981",
    delay: "delay-2",
  },
  {
    title: "Infrastructure, CI/CD & Observability",
    desc:
      "GitOps pipelines, rollback-safe deploys, Lighthouse CI, telemetry hooks, uptime monitoring, and ISO-aligned engineering hygiene from sprint zero.",
    iconColor: "#f04438",
    delay: "delay-3",
  },
];

// CASE STUDIES
export const CASES = [
  {
    id: "lego",
    big: true,
    company: "LEGO India — Flagship Launch",
    title:
      "Engineered India's LEGO ecommerce platform — retail and digital, completely unified.",
    desc:
      "Launched LEGO India's flagship ecommerce platform with Shopify, tightly integrated with Salesforce CRM. Built for enterprise-grade performance, scale, and stability — bringing retail and digital into complete omnichannel alignment for one of the world's most iconic brands.",
    outcome:
      "End-to-end omnichannel system unifying retail and digital commerce at national scale",
    coColor: "#ffd200",
    outcomeBg: "rgba(255,210,0,0.06)",
    outcomeBorder: "rgba(255,210,0,0.18)",
    outcomeColor: "#ffd200",
    outcomeHoverBg: "rgba(255,210,0,0.1)",
    outcomeHoverBorder: "rgba(255,210,0,0.28)",
    delay: "delay-1",
  },
  {
    id: "redington",
    big: false,
    company: "Redington — AI Supply Chain",
    title:
      "Transformed inventory from static records into living AI intelligence.",
    desc:
      "Real-time stock data linked with manufacturers, building an AI ordering engine that predicts demand, synchronises suppliers, and places orders autonomously.",
    outcome: "Supply chain moved from monitoring to autonomous mastery",
    coColor: "#4da8e8",
    outcomeBg: "rgba(0,110,200,0.07)",
    outcomeBorder: "rgba(0,110,200,0.22)",
    outcomeColor: "#4da8e8",
    outcomeHoverBg: "rgba(0,110,200,0.12)",
    outcomeHoverBorder: "rgba(0,110,200,0.36)",
    delay: "delay-2",
  },
  {
    id: "dv",
    big: false,
    company: "DoubleVerify — Document AI",
    title:
      "AI-driven PDF comparison engine — hours of manual effort to seconds.",
    desc:
      "Built a document intelligence system that reads, detects, and analyses PDFs at a depth far beyond manual review. Zero errors, infinite scalability, enterprise precision.",
    outcome: "Manual validation replaced with AI precision at lightning speed",
    coColor: "#00d4ff",
    outcomeBg: "rgba(0,212,255,0.06)",
    outcomeBorder: "rgba(0,212,255,0.18)",
    outcomeColor: "#00d4ff",
    outcomeHoverBg: "rgba(0,212,255,0.1)",
    outcomeHoverBorder: "rgba(0,212,255,0.28)",
    delay: "delay-3",
  },
];

// STATS
export const STATS = [
  { target: 3, suffix: "+", label: "Years Experience" },
  { target: 20, suffix: "+", label: "Clients Served" },
  { target: 120, suffix: "+", label: "Projects Delivered" },
  { target: 15, suffix: "+", label: "Open Source" },
];

// PARTNERS
export const PARTNERS = [
  "LEGO India",
  "Ample",
  "Redington",
  "DoubleVerify",
  "Pine Labs",
  "Vayana",
  "Broadcom",
  "Apple",
  "Bose",
  "Quess",
  "Salesforce",
  "SAP",
  "ZOHO",
  "LOGIC",
  "Shopify",
];

// ABOUT
export const ABOUT_VALUES = [
  {
    lbl: "M",
    text:
      "<strong>Mission:</strong> To craft platforms with the elegance of design and the endurance of engineering — replacing friction with fluidity, transforming ambition into architecture.",
  },
  {
    lbl: "V",
    text:
      "<strong>Vision:</strong> A world where commerce is not constructed but composed. Where technology dissolves into experience and every system becomes an unseen architecture of possibility.",
  },
  {
    lbl: "P",
    text:
      "<strong>Purpose:</strong> Technology that endures beyond trends, performs without compromise, and inspires confidence in those who dare to build.",
  },
];

export const TECH_STACK = [
  { label: "Salesforce", variant: "default" },
  { label: "ZOHO", variant: "default" },
  { label: "SAP", variant: "default" },
  { label: "LOGIC", variant: "default" },
  { label: "Shopify", variant: "default" },
  { label: "React", variant: "default" },
  { label: "Hydrogen", variant: "default" },
  { label: "AI/ML", variant: "ai" },
  { label: "GraphQL", variant: "purple" },
  { label: "GST APIs", variant: "default" },
];

// OMNI SECTION
export const OMNI_FEATURES = [
  {
    title: "Real-time data synchronisation",
    desc:
      "Inventory, orders, and customer data flow in real-time across every system",
    iconPath: "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
  },
  {
    title: "AI at every node",
    desc:
      "Intelligence embedded in CRM automation, ERP workflows, and omnichannel decisions",
    iconPaths: ["M12 2L2 7l10 5 10-5-10-5z", "M2 17l10 5 10-5M2 12l10 5 10-5"],
  },
  {
    title: "Business logic always first",
    desc:
      "Technology is configured around how you operate — not the other way around",
    iconPaths: ["rect:3 3 18 18 2", "M3 9h18M9 21V9"],
  },
];

// ORBITAL CANVAS
export const ORBITAL_NODES = [
  {
    label: "Retail",
    color: "#00d4ff",
    ring: 1,
    startAngle: 0,
    speed: 0.0055,
    desc:
      "Physical retail unified with digital commerce. Inventory, POS and customer data — one single truth.",
  },
  {
    label: "Online",
    color: "#4f7df9",
    ring: 1,
    startAngle: Math.PI * 0.4,
    speed: 0.0055,
    desc:
      "Shopify storefronts, headless commerce and digital experiences synced with every backend system.",
  },
  {
    label: "CRM",
    color: "#a78bfa",
    ring: 1,
    startAngle: Math.PI * 0.8,
    speed: 0.0055,
    desc:
      "Salesforce, ZOHO and more — fully integrated, AI-powered CRM turning your lifecycle into a growth engine.",
  },
  {
    label: "ERP",
    color: "#f04438",
    ring: 1,
    startAngle: Math.PI * 1.2,
    speed: 0.0055,
    desc:
      "SAP, LOGIC and beyond — ERPs that run in harmony with your commerce, finance and operations layers.",
  },
  {
    label: "Omni",
    color: "#10b981",
    ring: 1,
    startAngle: Math.PI * 1.6,
    speed: 0.0055,
    desc:
      "The breakthrough — retail and online finally in sync. Seamless omnichannel is our defining engineering achievement.",
  },
  {
    label: "AI",
    color: "#f59e0b",
    ring: 2,
    startAngle: 0,
    speed: -0.004,
    desc:
      "AI embedded at every node — not bolted on. Predictive inventory, intelligent CRM, automated ERP workflows.",
  },
  {
    label: "SAP",
    color: "#00d4ff",
    ring: 2,
    startAngle: Math.PI * 0.5,
    speed: -0.004,
    desc:
      "Deep SAP integration connecting enterprise resource planning directly to commerce and customer platforms.",
  },
  {
    label: "Salesforce",
    color: "#4f7df9",
    ring: 2,
    startAngle: Math.PI,
    speed: -0.004,
    desc:
      "Real-time Salesforce ↔ Shopify sync. Customers, orders, inventory automated across Marketing & Service Cloud.",
  },
  {
    label: "ZOHO",
    color: "#a78bfa",
    ring: 2,
    startAngle: Math.PI * 1.5,
    speed: -0.004,
    desc:
      "ZOHO CRM integration delivering unified customer intelligence across every touchpoint of your business.",
  },
];

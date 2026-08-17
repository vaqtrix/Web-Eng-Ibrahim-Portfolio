import type { IconKey } from "@/lib/icons";

export type Social = {
  label: string;
  icon: IconKey;
  href: string;
};

export const profile = {
  name: "Ibrahim Ahmed Siddiqui",
  shortName: "Ibrahim Siddiqui",
  role: "Data & AI Engineer",
  callsign: "IAS-01",

  headline: "I turn raw signal into systems that decide.",
  headlineWords: ["raw signal", "systems that decide"],

  subline:
    "Data & AI engineer building from Karachi. Founder of Infineteck and Vaqtrix.",

  statusLines: [
    "Building AI-assisted products at Infineteck",
    "Shipping Vaqtrix out of early access",
    "Final semester, Software Engineering @ Iqra University",
    "Open to data and AI roles worldwide",
  ],

  bio: "I work at the point where data stops being a spreadsheet and starts making a call. Soil sensors deciding when a field needs water, sales data deciding what to buy, engagement data deciding what to publish next. Five years of that, two companies built around it, and a silver medal for the one that runs on hardware.",

  longBio:
    "I started with Amazon wholesale research in 2021 — two years of pricing, competitor and margin analysis, which is where I learned that a model is worthless if nobody can act on it. Since then I have moved deeper into engineering: Python and ML for the analysis, Flutter and Firebase for the product, and ESP32 hardware when the data has to come off a real field. AgroSense, my final-year system, took a silver medal at IIEEEP. Alongside the degree I run two companies, Infineteck and Vaqtrix, where the same loop repeats — measure, model, ship.",

  location: "Karachi, Pakistan",
  coordinates: "24.8607° N, 67.0011° E",
  timezone: "Asia/Karachi",

  email: "siddiqui.ibrahim003@gmail.com",
  phone: "+92 301 2804426",
  phoneHref: "+923012804426",
  resumePath: "/resume.pdf",

  portrait: "/images/ibrahim-avatar.webp",
  portraitFull: "/images/ibrahim-full.webp",

  availability: "Open to work · Remote or Karachi",

  socials: [
    { label: "GitHub", icon: "github", href: "https://github.com/Ibrahim-Siddiqui" },
    {
      label: "LinkedIn",
      icon: "linkedin",
      href: "https://pk.linkedin.com/in/ibrahim-ahmed-siddiqui-750702230",
    },
    { label: "Email", icon: "mail", href: "mailto:siddiqui.ibrahim003@gmail.com" },
  ],

  metrics: [
    { label: "Missions shipped", value: 4, suffix: "" },
    { label: "Companies founded", value: 2, suffix: "" },
    { label: "Years in data", value: 5, suffix: "+" },
    { label: "Silver medals", value: 1, suffix: "" },
  ],

  education: {
    degree: "Bachelor of Software Engineering",
    school: "Iqra University, Main Campus",
    period: "2022 — 2026",
    detail: "CGPA 3.41 · Final semester",
    note: "Final-year system, AgroSense, took a silver medal at IIEEEP.",
  },
} as const;

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

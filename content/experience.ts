import type { IconKey } from "@/lib/icons";

export type Role = {
  company: string;
  icon: IconKey;
  title: string;
  period: string;
  years: string;
  summary: string;
  points: string[];
  stack: string[];
};

export const experience: Role[] = [
  {
    company: "Bayer",
    icon: "briefcase",
    title: "IT Intern",
    period: "Mar 2025 — May 2025",
    years: "2025",
    summary:
      "Three months inside a multinational IT function, working across teams rather than inside one.",
    points: [
      "Supported development activities and kept project information organised across a cross-functional team.",
      "Coordinated task tracking so work in progress stayed visible to everyone who needed it.",
      "Learned how process discipline works at enterprise scale — documentation, handovers, access control.",
    ],
    stack: ["Excel", "Project tooling", "Documentation"],
  },
  {
    company: "Iqra University — Digital Learning Innovation Center",
    icon: "school",
    title: "Data Intern",
    period: "Nov 2024 — Jan 2025",
    years: "2024",
    summary:
      "Engagement analysis that changed what the centre published, and when.",
    points: [
      "Analysed engagement and performance data across the learning platform to find which content actually held attention.",
      "Built recurring reports that turned raw platform metrics into decisions about scheduling and format.",
      "Interpreted trends for non-technical staff, so the findings survived past the meeting they were presented in.",
    ],
    stack: ["Python", "Excel", "Power BI", "Reporting"],
  },
  {
    company: "Amazon Wholesale",
    icon: "cart",
    title: "Product Research Analyst",
    period: "Jan 2021 — Jan 2023",
    years: "2021",
    summary:
      "Two years of commercial research — the longest and most formative stretch of my work so far.",
    points: [
      "Researched products and categories to identify buying opportunities with real margin behind them.",
      "Tracked pricing, sales velocity and competitor behaviour to support purchasing decisions.",
      "Maintained supplier and pricing datasets, and produced the market summaries the team bought against.",
    ],
    stack: ["Excel", "Market research", "Pricing analysis"],
  },
];

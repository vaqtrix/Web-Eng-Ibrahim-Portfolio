import type { IconKey } from "@/lib/icons";

export type SkillGroup = {
  group: string;
  code: string;
  icon: IconKey;
  blurb: string;
  items: string[];
};

export const skills: SkillGroup[] = [
  {
    group: "Data",
    code: "DAT",
    icon: "database",
    blurb: "Getting it, cleaning it, and trusting it afterwards.",
    items: ["Python", "Pandas", "NumPy", "SciPy", "PySpark", "SQL"],
  },
  {
    group: "Analysis",
    code: "ANL",
    icon: "chart",
    blurb: "Turning a table into something someone can act on.",
    items: ["Power BI", "Matplotlib", "Excel — Pivot, VLookup", "Reporting"],
  },
  {
    group: "Machine learning",
    code: "MLX",
    icon: "brain",
    blurb: "Classical models first, sequence models when time matters.",
    items: [
      "Random Forest",
      "Gradient Boosting",
      "LSTM",
      "Feature engineering",
      "Model evaluation",
    ],
  },
  {
    group: "Build",
    code: "BLD",
    icon: "blocks",
    blurb: "The part where the analysis becomes a product.",
    items: ["Flutter", "Firebase", "PostgreSQL", "ESP32 / IoT", "REST APIs"],
  },
  {
    group: "Workflow",
    code: "WFL",
    icon: "workflow",
    blurb: "How the work actually gets shipped.",
    items: [
      "AI-assisted development",
      "Git",
      "Technical documentation",
      "Presenting to non-technical teams",
    ],
  },
];

export const skillTicker = skills.flatMap((group) => group.items);

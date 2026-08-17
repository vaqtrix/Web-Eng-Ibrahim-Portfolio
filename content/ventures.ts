import type { IconKey } from "@/lib/icons";

export type Venture = {
  slug: string;
  icon: IconKey;
  name: string;
  role: string;
  founded: string;
  status: string;
  oneLiner: string;
  description: string;
  services: string[];
  focus: string;
  href: string;
};

export const ventures: Venture[] = [
  {
    slug: "infineteck",
    icon: "building",
    name: "Infineteck",
    role: "Founder",
    founded: "2024",
    status: "Building",
    oneLiner: "A software studio for teams that have data but no system around it.",
    description:
      "Infineteck builds the layer between a business and its numbers: web applications, internal dashboards and the automation that keeps them fed. Most clients arrive with the data already sitting in spreadsheets and inboxes — the work is turning that into something a team can open every morning and act on.",
    services: [
      "Web applications",
      "Analytics dashboards",
      "Workflow automation",
      "Data pipelines",
    ],
    focus: "Small and mid-sized teams in Pakistan and the Gulf",
    href: "https://infineteck.com",
  },
  {
    slug: "vaqtrix",
    icon: "rocket",
    name: "Vaqtrix",
    role: "Founder",
    founded: "2024",
    status: "Early access",
    oneLiner: "AI-assisted tooling for the operations work nobody wants to do twice.",
    description:
      "Vaqtrix is the product side of the same idea. Instead of building a system per client, it packages the repetitive parts — reporting, reconciliation, research summaries — into tools that run on their own. It is early, deliberately narrow, and being shaped by the first users rather than a roadmap written in advance.",
    services: [
      "Product design",
      "AI integration",
      "Reporting automation",
      "Analytics",
    ],
    focus: "Operations and research teams",
    href: "https://vaqtrix.com",
  },
];

import type { IconKey } from "@/lib/icons";

export type Beacon = {
  title: string;
  icon: IconKey;
  issuer: string;
  year: string;
  detail: string;
  kind: "Award" | "Academic" | "Role";
};

export const beacons: Beacon[] = [
  {
    title: "Silver Medal — AgroSense",
    icon: "award",
    issuer: "IIEEEP",
    year: "2025",
    kind: "Award",
    detail:
      "Recognised at the IIEEEP exhibition for AgroSense: an AI-based crop health monitoring and smart irrigation system built on ESP32 sensors.",
  },
  {
    title: "CGPA 3.41",
    icon: "graduation",
    issuer: "Iqra University",
    year: "2026",
    kind: "Academic",
    detail:
      "Bachelor of Software Engineering, final semester, maintained alongside running two companies.",
  },
  {
    title: "Two companies founded before graduating",
    icon: "rocket",
    issuer: "Infineteck · Vaqtrix",
    year: "2024",
    kind: "Role",
    detail:
      "Both started in 2024 and still running — client software at Infineteck, product work at Vaqtrix.",
  },
];

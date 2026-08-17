export function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function pad(value: number, width = 2) {
  return String(value).padStart(width, "0");
}

/** Sections the mission rail tracks, in page order. */
export const sections = [
  { id: "hero", label: "Origin", code: "ORG" },
  { id: "ventures", label: "Ventures", code: "VEN" },
  { id: "work", label: "Missions", code: "MSN" },
  { id: "experience", label: "Trajectory", code: "TRJ" },
  { id: "toolkit", label: "Systems", code: "SYS" },
  { id: "recognition", label: "Beacons", code: "BCN" },
  { id: "contact", label: "Uplink", code: "UPL" },
] as const;

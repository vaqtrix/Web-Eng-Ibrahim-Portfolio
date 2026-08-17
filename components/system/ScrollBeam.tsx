"use client";

import { useScrollProgress } from "@/components/hooks/useScrollProgress";

/** Thin progress beam across the top of the viewport. */
export function ScrollBeam() {
  const progress = useScrollProgress();

  return (
    <div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-50 h-px"
      style={{ background: "var(--line)" }}
    >
      <div
        className="h-px origin-left"
        style={{
          transform: `scaleX(${progress})`,
          background:
            "linear-gradient(90deg, var(--plasma), var(--violet), var(--solar))",
          boxShadow: "0 0 12px color-mix(in srgb, var(--plasma) 70%, transparent)",
          transition: "transform 120ms linear",
        }}
      />
    </div>
  );
}

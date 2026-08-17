"use client";

import { useEffect, useState } from "react";
import { pad, sections } from "@/lib/utils";
import { profile } from "@/content/profile";
import { useActiveSection } from "@/components/hooks/useActiveSection";
import { useScrollProgress } from "@/components/hooks/useScrollProgress";

/**
 * A flight-instrument panel pinned to the left of the viewport: where the
 * reader is, how far through, and two live readings from Karachi so the
 * panel is reporting something real rather than decorating the page.
 */
export function MissionRail() {
  const index = useActiveSection();
  const progress = useScrollProgress();
  const [clock, setClock] = useState<string | null>(null);
  const [temp, setTemp] = useState<string | null>(null);

  useEffect(() => {
    const format = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: profile.timezone,
    });

    const tick = () => setClock(format.format(new Date()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=24.86&longitude=67.01&current=temperature_2m",
      { signal: controller.signal },
    )
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error("no data"))))
      .then((data) => {
        const value = data?.current?.temperature_2m;
        if (typeof value === "number") setTemp(`${value.toFixed(1)}°C`);
      })
      .catch(() => setTemp(null));

    return () => controller.abort();
  }, []);

  const active = sections[index];

  return (
    <>
      {/* Desktop instrument panel */}
      <aside
        aria-hidden="true"
        className="pointer-events-none fixed left-6 top-1/2 z-30 hidden -translate-y-1/2 xl:block"
      >
        <div className="flex gap-4">
          <div className="relative w-px bg-line">
            <div
              className="comet absolute left-0 w-px bg-plasma transition-[height] duration-300 ease-out"
              style={{ height: `${Math.max(progress * 100, 3)}%` }}
            />
          </div>

          <div className="mono w-44 text-[0.68rem] leading-6 text-dim">
            <div className="text-plasma">
              {active.code} · {pad(index + 1)}/{pad(sections.length)}
            </div>
            <div className="text-ink uppercase">{active.label}</div>

            <div className="mt-3 flex flex-col gap-1">
              {sections.map((section, i) => (
                <span
                  key={section.id}
                  className="h-px transition-all duration-500"
                  style={{
                    width: i === index ? "2.75rem" : "1.25rem",
                    background:
                      i === index
                        ? "var(--plasma)"
                        : i < index
                          ? "var(--violet)"
                          : "var(--line)",
                  }}
                />
              ))}
            </div>

            <div className="mt-6 space-y-1">
              <div>
                ALT <span className="text-solar">{pad(Math.round(progress * 100), 3)}%</span>
              </div>
              {temp && (
                <div>
                  KHI <span className="text-solar">{temp}</span>
                </div>
              )}
              {clock && (
                <div>
                  UTC+5 <span className="text-solar">{clock}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile strip */}
      <div
        aria-hidden="true"
        className="glass-bar fixed inset-x-0 top-16 z-30 xl:hidden"
      >
        <div className="mono flex items-center justify-between px-5 py-1.5 text-[0.62rem] uppercase text-dim">
          <span className="text-plasma">
            {active.code} {pad(index + 1)}/{pad(sections.length)} · {active.label}
          </span>
          <span className="text-solar">
            {temp ? `${temp} · ` : ""}
            {clock ?? ""}
          </span>
        </div>
      </div>
    </>
  );
}

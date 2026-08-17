"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Leaf, Building2, Rocket, type LucideIcon } from "lucide-react";
import { profile } from "@/content/profile";

type Body = {
  label: string;
  detail: string;
  href: string;
  Icon: LucideIcon;
  radius: number;
  duration: number;
  size: number;
  color: string;
  offset: number;
};

/**
 * The signature element. Three real things — one system, two companies —
 * orbiting the person who built them. Hovering a body pauses its orbit and
 * names it; clicking goes to its page. The rings are the site's navigation
 * disguised as an instrument.
 */
const bodies: Body[] = [
  {
    label: "AgroSense",
    detail: "IIEEEP Silver · ESP32 + ML",
    href: "/work/agrosense",
    Icon: Leaf,
    radius: 92,
    duration: 26,
    size: 13,
    color: "var(--plasma)",
    offset: 0,
  },
  {
    label: "Infineteck",
    detail: "Software studio · Founded 2024",
    href: "/ventures",
    Icon: Building2,
    radius: 130,
    duration: 38,
    size: 11,
    color: "var(--violet)",
    offset: -12,
  },
  {
    label: "Vaqtrix",
    detail: "AI product · Early access",
    href: "/ventures",
    Icon: Rocket,
    radius: 168,
    duration: 52,
    size: 9,
    color: "var(--solar)",
    offset: -30,
  },
];

export function OrbitSystem() {
  const [active, setActive] = useState<Body | null>(null);

  return (
    <div className="relative aspect-square w-full select-none">
      {/* Rings */}
      {bodies.map((body) => (
        <span
          key={`ring-${body.label}`}
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 rounded-full border transition-colors duration-500"
          style={{
            width: `${body.radius * 2}px`,
            height: `${body.radius * 2}px`,
            marginLeft: `-${body.radius}px`,
            marginTop: `-${body.radius}px`,
            borderColor:
              active?.label === body.label ? body.color : "var(--line)",
          }}
        />
      ))}

      {/* Core — the portrait everything else orbits */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <span
          aria-hidden="true"
          className="portrait-glow absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
        />
        <span
          aria-hidden="true"
          className="portrait-ring absolute left-1/2 top-1/2 h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full"
        />
        <span
          aria-hidden="true"
          className="portrait-ring-2 absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full"
        />
        <span className="relative block h-28 w-28 overflow-hidden rounded-full border border-line bg-deep shadow-[0_0_50px_-12px_var(--violet)]">
          <Image
            src={profile.portrait}
            alt={`${profile.name}, ${profile.role}`}
            width={320}
            height={320}
            priority
            className="h-full w-full object-cover object-top"
          />
        </span>
      </div>

      {/* Orbiting bodies */}
      {bodies.map((body) => (
        <div
          key={body.label}
          className="spin-slow absolute inset-0"
          style={{
            ["--dur" as string]: `${body.duration}s`,
            transform: `rotate(${body.offset}deg)`,
            animationPlayState: active?.label === body.label ? "paused" : "running",
          }}
        >
          <Link
            href={body.href}
            onPointerEnter={() => setActive(body)}
            onPointerLeave={() => setActive(null)}
            onFocus={() => setActive(body)}
            onBlur={() => setActive(null)}
            aria-label={`${body.label} — ${body.detail}`}
            className="absolute left-1/2 top-1/2 flex items-center justify-center rounded-full border transition-transform duration-300 hover:scale-125"
            style={{
              width: "34px",
              height: "34px",
              marginLeft: `${body.radius - 17}px`,
              marginTop: "-17px",
              borderColor: body.color,
              background: "var(--deep)",
              color: body.color,
              boxShadow: `0 0 16px -2px ${body.color}`,
            }}
          >
            <body.Icon size={15} aria-hidden="true" />
          </Link>
        </div>
      ))}

      {/* Readout under the system */}
      <div className="absolute inset-x-0 bottom-0 text-center">
        <p
          className="mono text-xs uppercase transition-colors duration-300"
          style={{ color: active ? "var(--ink)" : "var(--dim)" }}
        >
          {active ? active.label : `${profile.callsign} · Karachi`}
        </p>
        <p className="mono mt-1 text-[0.68rem] text-dim">
          {active ? active.detail : "Hover a body to identify"}
        </p>
      </div>
    </div>
  );
}

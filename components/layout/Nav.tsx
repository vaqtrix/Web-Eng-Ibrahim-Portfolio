"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { profile } from "@/content/profile";
import { ThemeToggle } from "@/components/system/Theme";

const links = [
  { href: "/#work", label: "Missions" },
  { href: "/ventures", label: "Ventures" },
  { href: "/#experience", label: "Trajectory" },
  { href: "/resume", label: "Resume" },
  { href: "/#contact", label: "Uplink" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="glass-bar fixed inset-x-0 top-0 z-40">
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:px-8"
      >
        <Link
          href="/"
          className="group flex items-center gap-3"
          onClick={() => setOpen(false)}
        >
          <span
            aria-hidden="true"
            className="relative flex h-7 w-7 items-center justify-center"
          >
            <span className="absolute inset-0 rounded-full border border-line" />
            <span
              className="spin-slow absolute inset-0 rounded-full border border-transparent"
              style={{
                ["--dur" as string]: "9s",
                borderTopColor: "var(--plasma)",
              }}
            />
            <span className="h-1.5 w-1.5 rounded-full bg-violet" />
          </span>
          <span className="display text-sm tracking-tight text-ink transition-colors group-hover:text-plasma">
            {profile.shortName}
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <ul className="mono hidden items-center gap-6 text-xs uppercase text-dim md:flex">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="relative transition-colors hover:text-ink after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-plasma after:transition-all hover:after:w-full"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <ThemeToggle />

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="rounded-full border border-line p-2 text-ink transition-colors hover:border-plasma md:hidden"
          >
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </nav>

      {/* Mobile panel */}
      <div
        className="overflow-hidden border-b border-line transition-[max-height,opacity] duration-500 md:hidden"
        style={{ maxHeight: open ? "20rem" : 0, opacity: open ? 1 : 0 }}
      >
        <ul className="mx-auto max-w-6xl space-y-1 px-5 pb-6 pt-2">
          {links.map((link, i) => (
            <li
              key={link.href}
              style={{
                transform: open ? "none" : "translateY(-8px)",
                opacity: open ? 1 : 0,
                transition: `all 400ms ${i * 60}ms cubic-bezier(0.16,1,0.3,1)`,
              }}
            >
              <Link
                href={link.href}
                onClick={() => setOpen(false)}
                className="display block py-2 text-lg text-ink"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}

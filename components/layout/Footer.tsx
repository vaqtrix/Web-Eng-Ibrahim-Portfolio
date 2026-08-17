import Link from "next/link";
import { profile } from "@/content/profile";
import { getIcon } from "@/lib/icons";

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-12 md:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="display text-xl text-ink">{profile.name}</p>
            <p className="mono mt-2 text-xs text-dim">
              {profile.coordinates} · {profile.location}
            </p>
          </div>

          <div className="flex flex-wrap gap-6">
            {profile.socials.map((social) => {
              const Icon = getIcon(social.icon);
              return (
                <Link
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="mono flex items-center gap-2 text-xs uppercase text-dim transition-colors hover:text-plasma"
                >
                  <Icon size={14} aria-hidden="true" />
                  {social.label}
                </Link>
              );
            })}
            <Link
              href="/resume"
              className="mono text-xs uppercase text-dim transition-colors hover:text-plasma"
            >
              Resume
            </Link>
          </div>
        </div>

        <div className="hairline my-8" />

        <p className="mono text-[0.68rem] uppercase text-dim">
          Built with Next.js · No animation libraries · {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}

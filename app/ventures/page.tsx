import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ventures } from "@/content/ventures";
import { getIcon } from "@/lib/icons";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Ventures",
  description:
    "Infineteck and Vaqtrix — the two companies Ibrahim Ahmed Siddiqui founded and runs from Karachi.",
  alternates: { canonical: "/ventures" },
};

export default function VenturesPage() {
  return (
    <div className="py-32">
      <Reveal variant="up">
        <p className="mono text-xs uppercase text-plasma">VEN · Briefing</p>
        <h1 className="display mt-6 max-w-3xl text-2xl text-ink md:text-3xl">
          Two companies, run alongside a final semester.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-dim">
          One takes client work, the other builds product. Both started in 2024
          and both are still small on purpose — I would rather ship narrow and
          finished than wide and half-built.
        </p>
      </Reveal>

      <div className="mt-16 space-y-8">
        {ventures.map((venture, i) => {
          const Icon = getIcon(venture.icon);
          return (
          <Reveal key={venture.slug} variant="up" delay={i * 110}>
            <article className="panel group p-8 md:p-12">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <span className="icon-tile h-12 w-12">
                    <Icon size={21} aria-hidden="true" />
                  </span>
                  <h2 className="display text-xl text-ink md:text-2xl">
                    {venture.name}
                  </h2>
                </div>
                <span className="mono rounded-full border border-line px-3 py-1 text-[0.62rem] uppercase text-plasma">
                  {venture.status} · Founded {venture.founded}
                </span>
              </div>

              <p className="mt-6 max-w-2xl text-lg text-ink/90">
                {venture.oneLiner}
              </p>
              <p className="mt-4 max-w-2xl text-dim">{venture.description}</p>

              <dl className="mt-10 grid gap-6 sm:grid-cols-3">
                <div>
                  <dt className="eyebrow">My role</dt>
                  <dd className="mono mt-2 text-sm text-ink">{venture.role}</dd>
                </div>
                <div>
                  <dt className="eyebrow">Who it is for</dt>
                  <dd className="mono mt-2 text-sm text-ink">{venture.focus}</dd>
                </div>
                <div>
                  <dt className="eyebrow">What we do</dt>
                  <dd className="mono mt-2 text-sm text-ink">
                    {venture.services.join(" · ")}
                  </dd>
                </div>
              </dl>

              <Link
                href={venture.href}
                target="_blank"
                rel="noreferrer"
                className="group mt-10 inline-flex items-center gap-2 text-sm text-plasma"
              >
                Visit {venture.name}
                <ArrowUpRight
                  size={15}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </article>
          </Reveal>
          );
        })}
      </div>
    </div>
  );
}

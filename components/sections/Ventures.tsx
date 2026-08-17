import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ventures } from "@/content/ventures";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { TiltCard } from "@/components/ui/TiltCard";
import { getIcon } from "@/lib/icons";

export function Ventures() {
  return (
    <section id="ventures" className="py-28">
      <SectionHeading
        code="VEN"
        index="02"
        title="Two companies, started before the degree finished"
        intro="Infineteck takes the client work, Vaqtrix takes the product work. Both came out of the same habit — building the thing rather than writing a report about it."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        {ventures.map((venture, i) => {
          const Icon = getIcon(venture.icon);
          return (
          <Reveal key={venture.slug} variant="scale" delay={i * 120}>
            <TiltCard className="group h-full p-8 md:p-10">
              <div className="relative flex h-full flex-col">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <span className="icon-tile h-12 w-12">
                      <Icon size={21} aria-hidden="true" />
                    </span>
                    <h3 className="display text-xl text-ink">{venture.name}</h3>
                  </div>
                  <span className="mono rounded-full border border-line px-3 py-1 text-[0.62rem] uppercase text-plasma">
                    {venture.status}
                  </span>
                </div>

                <p className="mt-4 text-lg text-ink/90">{venture.oneLiner}</p>
                <p className="mt-4 text-dim">{venture.description}</p>

                <dl className="mono mt-8 grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <dt className="eyebrow">Role</dt>
                    <dd className="mt-1 text-ink">{venture.role}</dd>
                  </div>
                  <div>
                    <dt className="eyebrow">Founded</dt>
                    <dd className="mt-1 text-solar">{venture.founded}</dd>
                  </div>
                </dl>

                <ul className="mt-6 flex flex-wrap gap-2">
                  {venture.services.map((service) => (
                    <li
                      key={service}
                      className="mono rounded-full border border-line px-3 py-1 text-[0.68rem] text-dim"
                    >
                      {service}
                    </li>
                  ))}
                </ul>

                <Link
                  href={venture.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group mt-auto inline-flex items-center gap-2 pt-8 text-sm text-plasma"
                >
                  Visit {venture.name}
                  <ArrowUpRight
                    size={15}
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </Link>
              </div>
            </TiltCard>
          </Reveal>
          );
        })}
      </div>

      <Reveal variant="fade" delay={120}>
        <Link
          href="/ventures"
          className="mono mt-10 inline-block text-xs uppercase text-dim transition-colors hover:text-plasma"
        >
          Full venture briefing →
        </Link>
      </Reveal>
    </section>
  );
}

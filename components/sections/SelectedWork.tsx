import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/content/work";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { TiltCard } from "@/components/ui/TiltCard";
import { ProjectArt } from "@/components/ui/ProjectArt";
import { getIcon } from "@/lib/icons";

export function SelectedWork() {
  const featured = projects.find((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section id="work" className="py-28">
      <SectionHeading
        code="MSN"
        index="03"
        title="Missions"
        intro="Four builds, each solving a problem I actually ran into — in a field, in a purchasing sheet, in a pile of public data, and on this page."
      />

      {featured && (
        <Reveal variant="scale">
          <TiltCard className="p-8 md:p-12" max={4}>
            <div className="relative grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
              <div>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <span className="mono text-xs text-plasma">
                  {featured.codename} · Featured
                </span>
                <span className="mono text-xs text-solar">{featured.year}</span>
              </div>

              <div className="group mt-6 flex items-center gap-4">
                <span className="icon-tile h-12 w-12">
                  {(() => {
                    const Icon = getIcon(featured.icon);
                    return <Icon size={21} aria-hidden="true" />;
                  })()}
                </span>
                <h3 className="display text-2xl text-ink md:text-3xl">
                  {featured.title}
                </h3>
              </div>
              <p className="mt-4 max-w-2xl text-lg text-dim">
                {featured.tagline}
              </p>

              <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-line pt-8 sm:grid-cols-4">
                {featured.readout.map((item) => (
                  <div key={item.label}>
                    <dt className="eyebrow">{item.label}</dt>
                    <dd className="mono mt-1 text-sm text-solar">{item.value}</dd>
                  </div>
                ))}
              </dl>

              <Link
                href={`/work/${featured.slug}`}
                className="group mt-10 inline-flex items-center gap-2 text-sm text-plasma"
              >
                Open mission log
                <ArrowUpRight
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
              </div>

              <div className="h-48 rounded-2xl border border-line bg-deep/40 p-3 lg:h-56">
                <ProjectArt art={featured.art} />
              </div>
            </div>
          </TiltCard>
        </Reveal>
      )}

      <div className="mt-6 grid gap-6 md:grid-cols-3">
        {rest.map((project, i) => {
          const Icon = getIcon(project.icon);
          return (
          <Reveal key={project.slug} variant="up" delay={i * 110}>
            <Link href={`/work/${project.slug}`} className="block h-full">
              <TiltCard className="group flex h-full flex-col p-7">
                <div className="relative flex h-full flex-col">
                  <div className="flex items-center justify-between">
                    <span className="mono text-[0.68rem] text-plasma">
                      {project.codename}
                    </span>
                    <span className="mono text-[0.68rem] text-dim">
                      {project.status}
                    </span>
                  </div>

                  <div className="mt-5 h-28 rounded-xl border border-line bg-deep/40 p-2">
                    <ProjectArt art={project.art} />
                  </div>

                  <div className="mt-5 flex items-center gap-3">
                    <span className="icon-tile h-9 w-9">
                      <Icon size={15} aria-hidden="true" />
                    </span>
                    <h3 className="display text-lg text-ink">
                      {project.title}
                    </h3>
                  </div>
                  <p className="mt-3 text-sm text-dim">{project.tagline}</p>

                  <ul className="mono mt-auto flex flex-wrap gap-x-3 gap-y-1 pt-6 text-[0.68rem] text-dim">
                    {project.stack.slice(0, 3).map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </TiltCard>
            </Link>
          </Reveal>
          );
        })}
      </div>
    </section>
  );
}

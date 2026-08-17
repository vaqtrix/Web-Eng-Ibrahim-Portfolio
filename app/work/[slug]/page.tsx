import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getProject, projects } from "@/content/work";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectArt } from "@/components/ui/ProjectArt";
import { getIcon } from "@/lib/icons";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) return { title: "Mission not found" };

  return {
    title: project.title,
    description: project.tagline,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      title: project.title,
      description: project.tagline,
      type: "article",
    },
  };
}

export default async function WorkPage({ params }: Params) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  const others = projects.filter((p) => p.slug !== project.slug).slice(0, 2);
  const Icon = getIcon(project.icon);

  return (
    <article className="py-32">
      <Link
        href="/#work"
        className="mono inline-flex items-center gap-2 text-xs uppercase text-dim transition-colors hover:text-plasma"
      >
        <ArrowLeft size={14} />
        All missions
      </Link>

      <header className="mt-10 border-b border-line pb-12">
        <Reveal variant="up">
          <p className="mono text-xs text-plasma">
            {project.codename} · {project.role} · {project.year}
          </p>
          <div className="group mt-6 flex items-center gap-4">
            <span className="icon-tile h-14 w-14">
              <Icon size={24} aria-hidden="true" />
            </span>
            <h1 className="display text-2xl text-ink md:text-3xl">
              {project.title}
            </h1>
          </div>
          <p className="mt-6 max-w-2xl text-lg text-dim">{project.tagline}</p>

          <div className="panel mt-10 h-52 p-4 md:h-64">
            <ProjectArt art={project.art} />
          </div>
        </Reveal>

        <dl className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4">
          {project.readout.map((item, i) => (
            <Reveal key={item.label} variant="up" delay={i * 80}>
              <dt className="eyebrow">{item.label}</dt>
              <dd className="mono mt-1 text-sm text-solar">{item.value}</dd>
            </Reveal>
          ))}
        </dl>
      </header>

      <div className="mt-16 grid gap-16 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-14">
          {project.sections.map((section, i) => (
            <Reveal key={section.heading} variant="up" delay={i * 60}>
              <section>
                <h2 className="mono text-xs uppercase text-plasma">
                  {section.heading}
                </h2>
                <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink/90">
                  {section.body}
                </p>
                {section.bullets && (
                  <ul className="mt-6 max-w-2xl space-y-3 text-dim">
                    {section.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-3">
                        <span
                          aria-hidden="true"
                          className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-violet"
                        />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            </Reveal>
          ))}
        </div>

        <aside className="lg:sticky lg:top-28 lg:h-fit">
          <div className="panel p-6">
            <h2 className="eyebrow">Stack</h2>
            <ul className="mono mt-4 space-y-2 text-sm text-ink/90">
              {project.stack.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 border-b border-line pb-2 last:border-0"
                >
                  <span
                    aria-hidden="true"
                    className="h-1 w-1 rounded-full bg-plasma"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      {project.gallery && project.gallery.length > 0 && (
        <div className="mt-20 grid gap-6 sm:grid-cols-2">
          {project.gallery.map((image) => (
            <figure key={image.src} className="panel overflow-hidden">
              <Image
                src={image.src}
                alt={image.alt}
                width={1200}
                height={800}
                className="h-auto w-full"
              />
              <figcaption className="mono border-t border-line px-4 py-2 text-xs text-dim">
                {image.alt}
              </figcaption>
            </figure>
          ))}
        </div>
      )}

      <nav aria-label="Other missions" className="mt-24">
        <p className="eyebrow">Other missions</p>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {others.map((other) => (
            <Link
              key={other.slug}
              href={`/work/${other.slug}`}
              className="panel block p-6"
            >
              <span className="mono text-[0.68rem] text-plasma">
                {other.codename}
              </span>
              <h3 className="display mt-3 text-lg text-ink">{other.title}</h3>
              <p className="mt-2 text-sm text-dim">{other.tagline}</p>
            </Link>
          ))}
        </div>
      </nav>
    </article>
  );
}

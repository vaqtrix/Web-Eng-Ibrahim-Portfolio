import type { Metadata } from "next";
import Image from "next/image";
import { Download } from "lucide-react";
import { profile } from "@/content/profile";
import { experience } from "@/content/experience";
import { skills } from "@/content/skills";
import { beacons } from "@/content/recognition";
import { projects } from "@/content/work";
import { ventures } from "@/content/ventures";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Resume",
  description: `Resume of ${profile.name} — ${profile.role} in Karachi, Pakistan.`,
  alternates: { canonical: "/resume" },
};

function Block({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-line py-10">
      <h2 className="eyebrow">{title}</h2>
      <div className="mt-6 space-y-8">{children}</div>
    </section>
  );
}

export default function ResumePage() {
  return (
    <div className="py-32">
      <Reveal variant="up">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="flex items-center gap-5">
            <span className="relative block h-20 w-20 shrink-0 overflow-hidden rounded-full border border-line bg-deep">
              <Image
                src={profile.portrait}
                alt={`${profile.name}, ${profile.role}`}
                width={240}
                height={240}
                className="h-full w-full object-cover object-top"
              />
            </span>
            <div>
            <h1 className="display text-2xl text-ink md:text-3xl">
              {profile.name}
            </h1>
            <p className="mono mt-3 text-sm uppercase text-plasma">
              {profile.role} · {profile.location}
            </p>
            <p className="mono mt-1 text-sm text-dim">
              {profile.email} · {profile.phone}
            </p>
            </div>
          </div>

          <a
            href={profile.resumePath}
            download
            className="cta inline-flex items-center gap-2 px-7 py-3.5 text-sm"
          >
            <Download size={15} />
            Download PDF
          </a>
        </div>

        <p className="mt-10 max-w-3xl text-lg text-dim">{profile.longBio}</p>
      </Reveal>

      <Block title="Experience">
        {experience.map((role) => (
          <div key={role.company}>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="display text-lg text-ink">{role.company}</h3>
              <span className="mono text-xs text-solar">{role.period}</span>
            </div>
            <p className="eyebrow mt-1">{role.title}</p>
            <ul className="mt-3 space-y-1.5 text-sm text-dim">
              {role.points.map((point) => (
                <li key={point} className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-2 h-1 w-1 shrink-0 rounded-full bg-plasma"
                  />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Block>

      <Block title="Ventures">
        {ventures.map((venture) => (
          <div key={venture.slug}>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="display text-lg text-ink">{venture.name}</h3>
              <span className="mono text-xs text-solar">
                {venture.role} · {venture.founded}
              </span>
            </div>
            <p className="mt-2 text-sm text-dim">{venture.oneLiner}</p>
          </div>
        ))}
      </Block>

      <Block title="Projects">
        {projects.map((project) => (
          <div key={project.slug}>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="display text-lg text-ink">{project.title}</h3>
              <span className="mono text-xs text-solar">{project.year}</span>
            </div>
            <p className="mt-2 text-sm text-dim">{project.tagline}</p>
            <p className="mono mt-2 text-xs text-dim">
              {project.stack.join(" · ")}
            </p>
          </div>
        ))}
      </Block>

      <Block title="Toolkit">
        <dl className="grid gap-6 sm:grid-cols-2">
          {skills.map((group) => (
            <div key={group.group}>
              <dt className="eyebrow">{group.group}</dt>
              <dd className="mono mt-2 text-sm text-ink/90">
                {group.items.join(" · ")}
              </dd>
            </div>
          ))}
        </dl>
      </Block>

      <Block title="Education">
        <div>
          <h3 className="display text-lg text-ink">
            {profile.education.school}
          </h3>
          <p className="eyebrow mt-1">{profile.education.degree}</p>
          <p className="mono mt-2 text-sm text-solar">
            {profile.education.period} · {profile.education.detail}
          </p>
          <p className="mt-2 text-sm text-dim">{profile.education.note}</p>
        </div>
      </Block>

      <Block title="Recognition">
        {beacons.map((beacon) => (
          <div key={beacon.title}>
            <h3 className="display text-lg text-ink">{beacon.title}</h3>
            <p className="mono mt-1 text-xs text-solar">
              {beacon.issuer} · {beacon.year}
            </p>
            <p className="mt-2 text-sm text-dim">{beacon.detail}</p>
          </div>
        ))}
      </Block>
    </div>
  );
}

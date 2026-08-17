import { experience } from "@/content/experience";
import { getIcon } from "@/lib/icons";
import { profile } from "@/content/profile";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function Experience() {
  return (
    <section id="experience" className="py-28">
      <SectionHeading
        code="TRJ"
        index="04"
        title="Trajectory"
        intro="Backwards from now: enterprise IT, university data, and before that two years of commercial research that taught me more than any course did."
      />

      <ol className="relative border-l border-line pl-8 md:pl-12">
        {experience.map((role, i) => {
          const Icon = getIcon(role.icon);
          return (
          <li key={role.company} className="relative pb-14">
            <Reveal variant="right" delay={i * 90}>
              <span
                aria-hidden="true"
                className="absolute -left-[2.05rem] top-2 h-2.5 w-2.5 rounded-full md:-left-[3.3rem]"
                style={{
                  background: i === 0 ? "var(--plasma)" : "var(--violet)",
                  boxShadow: `0 0 14px 2px ${i === 0 ? "var(--plasma)" : "var(--violet)"}`,
                }}
              />
              <span
                aria-hidden="true"
                className="mono absolute -left-[5.2rem] top-1 hidden text-[0.68rem] text-dim md:block"
              >
                {role.years}
              </span>

              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="group flex items-center gap-3">
                  <span className="icon-tile h-10 w-10">
                    <Icon size={17} aria-hidden="true" />
                  </span>
                  <h3 className="display text-lg text-ink md:text-xl">
                    {role.company}
                  </h3>
                </div>
                <span className="mono text-xs text-solar">{role.period}</span>
              </div>

              <p className="eyebrow mt-2">{role.title}</p>
              <p className="mt-4 max-w-2xl text-lg text-ink/90">{role.summary}</p>

              <ul className="mt-4 max-w-2xl space-y-2 text-dim">
                {role.points.map((point) => (
                  <li key={point} className="flex gap-3">
                    <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 rounded-full bg-plasma" />
                    {point}
                  </li>
                ))}
              </ul>

              <ul className="mono mt-5 flex flex-wrap gap-2">
                {role.stack.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-line px-3 py-1 text-[0.62rem] uppercase text-dim"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </li>
          );
        })}

        <li className="relative">
          <Reveal variant="right">
            <span
              aria-hidden="true"
              className="absolute -left-[2.05rem] top-2 h-2.5 w-2.5 rounded-full border border-line bg-deep md:-left-[3.3rem]"
            />
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h3 className="display text-lg text-ink md:text-xl">
                {profile.education.school}
              </h3>
              <span className="mono text-xs text-solar">
                {profile.education.period}
              </span>
            </div>
            <p className="eyebrow mt-2">{profile.education.degree}</p>
            <p className="mt-4 text-dim">
              {profile.education.detail} · {profile.education.note}
            </p>
          </Reveal>
        </li>
      </ol>
    </section>
  );
}

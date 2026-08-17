import { skills, skillTicker } from "@/content/skills";
import { getIcon } from "@/lib/icons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Marquee } from "@/components/ui/Marquee";

export function Toolkit() {
  return (
    <section id="toolkit" className="py-28">
      <SectionHeading
        code="SYS"
        index="05"
        title="Onboard systems"
        intro="Grouped by what each one is for, because a flat list of thirty tools tells you nothing about how someone works."
      />

      <Reveal variant="fade">
        <div className="panel mb-8 py-2">
          <Marquee items={skillTicker} duration={46} />
        </div>
      </Reveal>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {skills.map((group, i) => {
          const Icon = getIcon(group.icon);
          return (
          <Reveal key={group.group} variant="up" delay={i * 90}>
            <div className="panel group h-full p-7">
              <div className="flex items-center justify-between">
                <span className="icon-tile h-11 w-11">
                  <Icon size={19} aria-hidden="true" />
                </span>
                <span className="mono text-[0.62rem] text-plasma">
                  {group.code}
                </span>
              </div>
              <h3 className="display mt-5 text-lg text-ink">{group.group}</h3>

              <p className="mt-3 text-sm text-dim">{group.blurb}</p>

              <ul className="mt-6 space-y-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="mono flex items-center gap-3 text-sm text-ink/90"
                  >
                    <span
                      aria-hidden="true"
                      className="h-px w-4 bg-line transition-all duration-500 group-hover:w-7 group-hover:bg-plasma"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          );
        })}
      </div>
    </section>
  );
}

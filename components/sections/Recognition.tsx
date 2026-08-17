import { beacons } from "@/content/recognition";
import { getIcon } from "@/lib/icons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function Recognition() {
  return (
    <section id="recognition" className="py-28">
      <SectionHeading
        code="BCN"
        index="06"
        title="Beacons"
        intro="The markers worth pointing at."
      />

      <div className="grid gap-6 md:grid-cols-3">
        {beacons.map((beacon, i) => {
          const Icon = getIcon(beacon.icon);
          return (
          <Reveal key={beacon.title} variant="scale" delay={i * 110}>
            <article className="panel group relative h-full overflow-hidden p-7">
              <span
                aria-hidden="true"
                className="float-slow absolute -right-8 -top-8 h-24 w-24 rounded-full blur-2xl"
                style={{
                  background:
                    "radial-gradient(circle, color-mix(in srgb, var(--solar) 45%, transparent), transparent 70%)",
                }}
              />
              <div className="flex items-center justify-between">
                <span className="icon-tile h-11 w-11">
                  <Icon size={19} aria-hidden="true" />
                </span>
                <span className="mono text-[0.62rem] uppercase text-plasma">
                  {beacon.kind}
                </span>
              </div>
              <h3 className="display mt-4 text-lg text-ink">{beacon.title}</h3>
              <p className="mono mt-2 text-[0.68rem] uppercase text-solar">
                {beacon.issuer} · {beacon.year}
              </p>
              <p className="mt-4 text-sm text-dim">{beacon.detail}</p>
            </article>
          </Reveal>
          );
        })}
      </div>
    </section>
  );
}

import { Reveal } from "@/components/ui/Reveal";

type Props = {
  code: string;
  index: string;
  title: string;
  intro?: string;
};

export function SectionHeading({ code, index, title, intro }: Props) {
  return (
    <div className="mb-14">
      <Reveal variant="left">
        <div className="flex items-center gap-4">
          <span className="mono text-xs text-plasma">
            {code} · {index}
          </span>
          <span className="hairline w-24" />
        </div>
      </Reveal>

      <Reveal variant="up" delay={80}>
        <h2 className="display mt-5 text-xl text-ink sm:text-2xl">{title}</h2>
      </Reveal>

      {intro && (
        <Reveal variant="up" delay={160}>
          <p className="mt-4 max-w-2xl text-lg text-dim">{intro}</p>
        </Reveal>
      )}
    </div>
  );
}

"use client";

type Props = {
  items: string[];
  duration?: number;
  reverse?: boolean;
};

/** Infinite ticker. The list is duplicated so the loop never shows a seam. */
export function Marquee({ items, duration = 38, reverse = false }: Props) {
  const row = [...items, ...items];

  return (
    <div className="marquee-mask overflow-hidden py-3">
      <div
        className="marquee-track flex w-max gap-8"
        style={{
          ["--dur" as string]: `${duration}s`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {row.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="mono flex shrink-0 items-center gap-8 text-sm text-dim"
          >
            {item}
            <span aria-hidden="true" className="text-plasma">
              ✦
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

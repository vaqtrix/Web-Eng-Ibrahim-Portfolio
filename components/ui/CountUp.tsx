"use client";

import { useEffect, useRef, useState } from "react";
import { pad } from "@/lib/utils";

type Props = {
  value: number;
  width?: number;
  duration?: number;
  delay?: number;
  suffix?: string;
};

/**
 * Server-renders the final number so the page reads correctly without JS,
 * then counts up from zero once it is on screen.
 */
export function CountUp({
  value,
  width = 2,
  duration = 1400,
  delay = 0,
  suffix = "",
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);
  const frame = useRef(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    setDisplay(0);
    let timeout = 0;

    const run = () => {
      let start: number | null = null;
      const step = (now: number) => {
        if (start === null) start = now;
        const t = Math.min((now - start) / duration, 1);
        setDisplay(Math.round(value * (1 - Math.pow(1 - t, 4))));
        if (t < 1) frame.current = requestAnimationFrame(step);
      };
      frame.current = requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          timeout = window.setTimeout(run, delay);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      window.clearTimeout(timeout);
      cancelAnimationFrame(frame.current);
    };
  }, [value, duration, delay]);

  return (
    <span ref={ref} className="mono tabular-nums">
      {pad(display, width)}
      {suffix}
    </span>
  );
}

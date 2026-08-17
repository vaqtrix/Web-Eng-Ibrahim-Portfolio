"use client";

import { useEffect, useState } from "react";

type Props = {
  lines: string[];
  className?: string;
};

/** Cycles through short status lines, typing and deleting each one. */
export function TypeLine({ lines, className }: Props) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [instant, setInstant] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setInstant(true);
      setText(lines[0]);
    }
  }, [lines]);

  useEffect(() => {
    if (instant) return;

    const full = lines[index % lines.length];
    const done = text === full;

    const timeout = window.setTimeout(
      () => {
        if (!deleting) {
          if (done) {
            setDeleting(true);
          } else {
            setText(full.slice(0, text.length + 1));
          }
        } else if (text.length === 0) {
          setDeleting(false);
          setIndex((i) => (i + 1) % lines.length);
        } else {
          setText(full.slice(0, text.length - 1));
        }
      },
      deleting ? 26 : done ? 2200 : 42,
    );

    return () => window.clearTimeout(timeout);
  }, [text, deleting, index, lines, instant]);

  return (
    <span className={`${className ?? ""} ${instant ? "" : "caret"}`}>
      {text}
    </span>
  );
}

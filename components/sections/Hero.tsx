import Image from "next/image";
import Link from "next/link";
import { ArrowDownRight, Download } from "lucide-react";
import { profile } from "@/content/profile";
import { CountUp } from "@/components/ui/CountUp";
import { TypeLine } from "@/components/ui/TypeLine";
import { Magnetic } from "@/components/ui/Magnetic";
import { OrbitSystem } from "@/components/sections/OrbitSystem";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] flex-col justify-center pb-16 pt-32"
    >
      <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <p className="step mono flex items-center gap-3 text-xs uppercase text-dim" style={{ ["--d" as string]: "150ms" }}>
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-plasma opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-plasma" />
            </span>
            {profile.availability}
          </p>

          <h1
            className="step display mt-8 text-2xl text-ink sm:text-3xl lg:text-4xl"
            style={{ ["--d" as string]: "300ms" }}
          >
            I turn raw signal
            <br />
            into <span className="gradient-text">systems that decide</span>.
          </h1>

          <p
            className="step mt-8 max-w-xl text-lg text-dim"
            style={{ ["--d" as string]: "450ms" }}
          >
            {profile.subline}
          </p>

          <p
            className="step mono mt-4 text-sm text-plasma"
            style={{ ["--d" as string]: "600ms" }}
          >
            <span className="text-dim">$ status —</span>{" "}
            <TypeLine lines={[...profile.statusLines]} />
          </p>

          <div
            className="step mt-10 flex flex-wrap gap-4"
            style={{ ["--d" as string]: "750ms" }}
          >
            <Magnetic>
              <Link
                href="#work"
                className="cta group inline-flex items-center gap-2 px-7 py-3.5 text-sm"
              >
                See the missions
                <ArrowDownRight
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5"
                />
              </Link>
            </Magnetic>

            <Magnetic>
              <a
                href={profile.resumePath}
                download
                className="inline-flex items-center gap-2 rounded-full border border-line px-7 py-3.5 text-sm text-ink transition-colors hover:border-plasma hover:text-plasma"
              >
                <Download size={15} />
                Download resume
              </a>
            </Magnetic>
          </div>

          <dl
            className="step mt-14 grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-4"
            style={{ ["--d" as string]: "900ms" }}
          >
            {profile.metrics.map((metric, i) => (
              <div key={metric.label}>
                <dd className="display text-xl text-ink">
                  <CountUp
                    value={metric.value}
                    suffix={metric.suffix}
                    delay={i * 140}
                  />
                </dd>
                <dt className="eyebrow mt-1">{metric.label}</dt>
              </div>
            ))}
          </dl>
        </div>

        <div
          className="step relative mx-auto w-full max-w-md"
          style={{ ["--d" as string]: "500ms" }}
        >
          <OrbitSystem />
        </div>
      </div>

      <div className="mono absolute bottom-6 left-0 hidden items-center gap-3 text-[0.68rem] uppercase text-dim lg:flex">
        <span className="h-8 w-px bg-line" />
        Scroll to begin descent
      </div>
    </section>
  );
}

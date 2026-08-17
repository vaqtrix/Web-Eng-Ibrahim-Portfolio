"use client";

import { useState } from "react";
import Image from "next/image";
import { Send, Check, Mail, Phone, MapPin, Radio } from "lucide-react";
import { profile } from "@/content/profile";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Magnetic } from "@/components/ui/Magnetic";

type Status = "idle" | "sending" | "sent" | "error";

const fieldClass =
  "peer w-full rounded-xl border border-line bg-panel px-4 py-3 text-ink outline-none transition-colors placeholder:text-transparent focus:border-plasma";

const labelClass =
  "mono pointer-events-none absolute left-4 top-3 text-sm uppercase text-dim transition-all duration-300 peer-focus:-top-2.5 peer-focus:left-3 peer-focus:bg-void peer-focus:px-1 peer-focus:text-[0.62rem] peer-focus:text-plasma peer-[:not(:placeholder-shown)]:-top-2.5 peer-[:not(:placeholder-shown)]:left-3 peer-[:not(:placeholder-shown)]:bg-void peer-[:not(:placeholder-shown)]:px-1 peer-[:not(:placeholder-shown)]:text-[0.62rem]";

export function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState("");

  async function send() {
    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus("error");
      setFeedback("Add your name, email and message before transmitting.");
      return;
    }

    setStatus("sending");
    setFeedback("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setFeedback(data?.error ?? "Transmission failed. Email me directly.");
        return;
      }

      setStatus("sent");
      setFeedback("Received. I usually reply within a day.");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setStatus("error");
      setFeedback("Transmission failed. Email me directly.");
    }
  }

  return (
    <section id="contact" className="py-28">
      <SectionHeading
        code="UPL"
        index="07"
        title="Open uplink"
        intro="Hiring, collaborating, or bringing work to Infineteck or Vaqtrix — all three land in the same inbox."
      />

      <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
        <Reveal variant="left">
          <div className="panel relative h-full overflow-hidden p-8">
            {/* The portrait, standing on the horizon glow */}
            <div className="relative mb-8 flex justify-center">
              <span
                aria-hidden="true"
                className="portrait-glow absolute bottom-0 h-40 w-40 rounded-full blur-2xl"
              />
              <Image
                src={profile.portraitFull}
                alt={`${profile.name}, ${profile.role}, standing`}
                width={420}
                height={560}
                className="relative h-56 w-auto object-contain drop-shadow-[0_18px_40px_rgba(0,0,0,0.45)]"
              />
              <span
                aria-hidden="true"
                className="absolute bottom-1 h-2 w-40 rounded-[50%]"
                style={{
                  background:
                    "radial-gradient(circle, color-mix(in srgb, var(--plasma) 55%, transparent), transparent 70%)",
                }}
              />
            </div>

            <dl className="space-y-6">
              <div>
                <dt className="eyebrow flex items-center gap-2">
                  <Mail size={13} aria-hidden="true" />
                  Email
                </dt>
                <dd className="mt-1">
                  <a
                    href={`mailto:${profile.email}`}
                    className="text-ink transition-colors hover:text-plasma"
                  >
                    {profile.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="eyebrow flex items-center gap-2">
                  <Phone size={13} aria-hidden="true" />
                  Phone
                </dt>
                <dd className="mt-1">
                  <a
                    href={`tel:${profile.phoneHref}`}
                    className="text-ink transition-colors hover:text-plasma"
                  >
                    {profile.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="eyebrow flex items-center gap-2">
                  <MapPin size={13} aria-hidden="true" />
                  Ground station
                </dt>
                <dd className="mono mt-1 text-sm text-ink">
                  {profile.location}
                  <span className="block text-dim">{profile.coordinates}</span>
                </dd>
              </div>
              <div>
                <dt className="eyebrow flex items-center gap-2">
                  <Radio size={13} aria-hidden="true" />
                  Status
                </dt>
                <dd className="mt-1 flex items-center gap-2 text-ink">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-plasma opacity-70" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-plasma" />
                  </span>
                  {profile.availability}
                </dd>
              </div>
            </dl>
          </div>
        </Reveal>

        <Reveal variant="right" delay={90}>
          <div className="panel space-y-5 p-8">
            <div className="relative">
              <input
                id="uplink-name"
                placeholder="Name"
                className={fieldClass}
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
              />
              <label htmlFor="uplink-name" className={labelClass}>
                Your name
              </label>
            </div>

            <div className="relative">
              <input
                id="uplink-email"
                type="email"
                placeholder="Email"
                className={fieldClass}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
              <label htmlFor="uplink-email" className={labelClass}>
                Email
              </label>
            </div>

            <div className="relative">
              <textarea
                id="uplink-message"
                rows={5}
                placeholder="Message"
                className={`${fieldClass} resize-y`}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <label htmlFor="uplink-message" className={labelClass}>
                Message
              </label>
            </div>

            <div className="flex flex-wrap items-center gap-5">
              <Magnetic>
                <button
                  type="button"
                  onClick={send}
                  disabled={status === "sending"}
                  className="cta inline-flex items-center gap-2 px-7 py-3.5 text-sm disabled:opacity-60"
                >
                  {status === "sent" ? <Check size={15} /> : <Send size={15} />}
                  {status === "sending"
                    ? "Transmitting…"
                    : status === "sent"
                      ? "Transmitted"
                      : "Transmit message"}
                </button>
              </Magnetic>

              <p
                aria-live="polite"
                className="mono min-h-5 text-xs"
                style={{
                  color: status === "error" ? "var(--solar)" : "var(--plasma)",
                }}
              >
                {feedback}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

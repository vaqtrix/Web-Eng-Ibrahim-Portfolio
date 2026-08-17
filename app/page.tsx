import { Hero } from "@/components/sections/Hero";
import { Ventures } from "@/components/sections/Ventures";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { Experience } from "@/components/sections/Experience";
import { Toolkit } from "@/components/sections/Toolkit";
import { Recognition } from "@/components/sections/Recognition";
import { Contact } from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Ventures />
      <SelectedWork />
      <Experience />
      <Toolkit />
      <Recognition />
      <Contact />
    </>
  );
}

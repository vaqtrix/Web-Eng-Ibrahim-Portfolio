import type { Metadata } from "next";
import "./globals.css";
import { fontVariables } from "@/lib/fonts";
import { profile, siteUrl } from "@/content/profile";
import { ventures } from "@/content/ventures";
import { ThemeProvider, themeScript } from "@/components/system/Theme";
import { SpaceScene } from "@/components/system/SpaceScene";
import { CursorGlow } from "@/components/system/CursorGlow";
import { ScrollBeam } from "@/components/system/ScrollBeam";
import { Nav } from "@/components/layout/Nav";
import { MissionRail } from "@/components/layout/MissionRail";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.name} — ${profile.role}`,
    template: `%s · ${profile.shortName}`,
  },
  description: profile.bio,
  keywords: [
    profile.name,
    "data analyst Karachi",
    "AI engineer Pakistan",
    "machine learning Karachi",
    "AgroSense",
    "Infineteck",
    "Vaqtrix",
  ],
  authors: [{ name: profile.name, url: siteUrl }],
  creator: profile.name,
  openGraph: {
    type: "profile",
    title: `${profile.name} — ${profile.role}`,
    description: profile.bio,
    url: siteUrl,
    siteName: profile.name,
    locale: "en_PK",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — ${profile.role}`,
    description: profile.bio,
  },
  alternates: { canonical: "/" },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  description: profile.bio,
  email: `mailto:${profile.email}`,
  telephone: profile.phone,
  url: siteUrl,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Karachi",
    addressCountry: "PK",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Iqra University",
  },
  award: "IIEEEP Silver Medal — AgroSense",
  knowsAbout: [
    "Data analysis",
    "Machine learning",
    "Power BI",
    "IoT",
    "Python",
  ],
  sameAs: [
    ...profile.socials
      .map((s) => s.href)
      .filter((href) => href.startsWith("http")),
    ...ventures.map((v) => v.href),
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="night" className={fontVariables}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <ThemeProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:border focus:border-plasma focus:bg-deep focus:px-5 focus:py-2 focus:text-plasma"
          >
            Skip to content
          </a>

          <SpaceScene />
          <CursorGlow />
          <ScrollBeam />
          <Nav />
          <MissionRail />

          <main id="main" className="mx-auto max-w-6xl px-5 md:px-8">
            {children}
          </main>

          <Footer />
        </ThemeProvider>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </body>
    </html>
  );
}

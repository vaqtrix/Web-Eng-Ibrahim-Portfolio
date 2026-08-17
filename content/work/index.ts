export type CaseSection = {
  heading: string;
  body: string;
  bullets?: string[];
};

import type { IconKey } from "@/lib/icons";

export type ArtKey = "field" | "pipeline" | "dashboard" | "orbit";

export type Project = {
  slug: string;
  icon: IconKey;
  art: ArtKey;
  title: string;
  codename: string;
  tagline: string;
  year: string;
  role: string;
  status: "Shipped" | "Live" | "Ongoing";
  stack: string[];
  featured?: boolean;
  readout: { label: string; value: string }[];
  sections: CaseSection[];
  gallery?: { src: string; alt: string }[];
};

export const projects: Project[] = [
  {
    slug: "agrosense",
    icon: "leaf",
    art: "field",
    title: "AgroSense",
    codename: "MSN-01",
    tagline:
      "Crop health monitoring and smart irrigation, running on ESP32 sensors and three models.",
    year: "2025",
    role: "Data & ML lead",
    status: "Shipped",
    featured: true,
    stack: [
      "Python",
      "Random Forest",
      "Gradient Boosting",
      "LSTM",
      "Flutter",
      "Firebase",
      "PostgreSQL",
      "ESP32",
    ],
    readout: [
      { label: "Recognition", value: "IIEEEP SILVER" },
      { label: "Models", value: "03" },
      { label: "Sensor streams", value: "03" },
      { label: "Delivery", value: "MOBILE APP" },
    ],
    sections: [
      {
        heading: "The problem",
        body: "Irrigation across most of Pakistan runs on a schedule and on instinct. Water goes onto a field because it is Tuesday, not because the soil asked for it, and crop stress is usually noticed only once it is visible in the leaves. Anything built to fix that has to survive a real field first: unreliable power, patchy connectivity, and a farmer who is never going to sit in front of a dashboard.",
      },
      {
        heading: "How it works",
        body: "A small ESP32 node sits in the field reading soil moisture, temperature and humidity, and pushes those readings to Firebase over Wi-Fi. From there the data lands in a Python pipeline that cleans it, fills gaps, resamples everything to a fixed interval, and feeds two different kinds of models — one reading the present, one predicting what comes next. The output goes to a Flutter app, because a phone is the only screen that reliably reaches the person making the decision.",
        bullets: [
          "ESP32 node with soil moisture, temperature and humidity sensors",
          "Firebase as the ingest layer, PostgreSQL as the analysis store",
          "Python pipeline for cleaning, resampling and feature engineering",
          "Flutter app delivering the irrigation call in plain language",
        ],
      },
      {
        heading: "Three models, three jobs",
        body: "Each model earned its place by doing something the others did worse.",
        bullets: [
          "Random Forest — the baseline crop health classifier. Fast to train, easy to explain, and honest about which sensor features were actually carrying the signal.",
          "Gradient Boosting — the accuracy step up on the same tabular features, brought in once the baseline proved the signal was real rather than noise.",
          "LSTM — a sequence model over the sensor timeline, because irrigation need depends on the last several days of moisture behaviour, not the last reading.",
        ],
      },
      {
        heading: "What it changed",
        body: "The system moved irrigation from a fixed calendar to a predicted one: the field is watered when the moisture trend says it will need water, not after it already needed it. Feature importance from the tree models also turned out to be useful on its own — it showed which sensor readings actually drove the health signal, which is the difference between a black box and something a farmer will keep switched on. AgroSense was recognised with a Silver Medal at the IIEEEP exhibition.",
      },
      {
        heading: "What I would do differently",
        body: "The node depended on Wi-Fi, which is the wrong assumption for most farmland. A LoRa link with local buffering would survive a real deployment far better. The LSTM was also trained on a short window of collected data — the honest limit of a final-year project, and the first thing I would extend given a full season of readings.",
      },
    ],
    gallery: [],
  },

  {
    slug: "product-research-pipeline",
    icon: "workflow",
    art: "pipeline",
    title: "Product Research Pipeline",
    codename: "MSN-02",
    tagline:
      "Two years of manual Amazon wholesale research, rebuilt as a scoring pipeline.",
    year: "2024",
    role: "Solo build",
    status: "Shipped",
    stack: ["Python", "Pandas", "NumPy", "SQL", "Matplotlib"],
    readout: [
      { label: "Origin", value: "AMAZON, 2021-23" },
      { label: "Stage", value: "SCORED" },
      { label: "Output", value: "RANKED LIST" },
    ],
    sections: [
      {
        heading: "The problem",
        body: "For two years I researched wholesale products by hand: pull the category, check pricing history, read the competition, estimate margin, decide. It worked, and it did not scale. Every decision took the same forty minutes whether the product was obviously wrong or genuinely interesting, and none of the reasoning was reusable the next week.",
      },
      {
        heading: "The approach",
        body: "I rebuilt the loop as a pipeline. Product and pricing data goes in as structured tables, gets cleaned and normalised in Pandas, and each candidate comes out with a score built from the same factors I used to weigh in my head — margin after fees, price stability, competitive density and sales consistency.",
        bullets: [
          "Ingest and normalisation layer for messy product and pricing exports",
          "Feature layer: margin, volatility, competitor count, velocity",
          "Weighted scoring model, tuned against products I already knew the outcome of",
          "Ranked shortlist plus the chart that explains why each one ranked there",
        ],
      },
      {
        heading: "What it changed",
        body: "The forty-minute decision became a filter. Obviously weak candidates fall out before a human sees them, and the time goes to the shortlist instead. More usefully, the criteria became explicit — a scoring weight can be argued about and adjusted, which an instinct cannot.",
      },
    ],
  },

  {
    slug: "pakistan-agriculture-dashboard",
    icon: "chart",
    art: "dashboard",
    title: "Pakistan Agriculture Dashboard",
    codename: "MSN-03",
    tagline:
      "Public crop and yield data, read as one Power BI report instead of forty spreadsheets.",
    year: "2025",
    role: "Solo build",
    status: "Live",
    stack: ["Power BI", "SQL", "Excel", "Python"],
    readout: [
      { label: "Source", value: "PUBLIC DATA" },
      { label: "Views", value: "04" },
      { label: "Refresh", value: "SCHEDULED" },
    ],
    sections: [
      {
        heading: "The problem",
        body: "Pakistan publishes a lot of agricultural data — production, area under cultivation, yield per hectare, province by province, year by year. It is almost all distributed as separate tables, which means the questions people actually have (which province improved, which crop is stagnating, where yield and area disagree) require joining files by hand before you can even start.",
      },
      {
        heading: "The approach",
        body: "I modelled the data properly first — a clean star schema with crop, region and year dimensions — then built the report on top of it. Four views, each answering one question rather than showing everything at once.",
        bullets: [
          "Cleaning and reshaping in Python, loaded into a modelled schema",
          "Yield trends by crop and province over time",
          "Area versus output, to separate growing more from growing better",
          "Year-on-year change view for spotting reversals early",
        ],
      },
      {
        heading: "Why this one matters to me",
        body: "It is the desk-side companion to AgroSense. One project measures a single field with sensors; this one looks at the same problem from national statistics. Both are asking where water and land are being spent without a return.",
      },
    ],
  },

  {
    slug: "orbit-portfolio",
    icon: "orbit",
    art: "orbit",
    title: "This Site",
    codename: "MSN-04",
    tagline:
      "A space-themed portfolio where every animation is CSS or canvas — no animation library.",
    year: "2026",
    role: "Design & build",
    status: "Live",
    stack: ["Next.js 16", "TypeScript", "Tailwind CSS v4", "Canvas API"],
    readout: [
      { label: "Framework", value: "NEXT 16" },
      { label: "Animation deps", value: "NONE" },
      { label: "Themes", value: "DAY / NIGHT" },
      { label: "Contrast floor", value: "4.5:1" },
    ],
    sections: [
      {
        heading: "The brief I set myself",
        body: "Most developer portfolios pick one side: heavy motion that takes four seconds to become usable, or a fast page with nothing to look at. I wanted the animated version without the weight — a starfield, an orbital hero, scroll reveals, tilt cards and a day/night switch, none of which should cost a single animation dependency.",
      },
      {
        heading: "How it holds together",
        body: "Every effect is CSS or a small piece of canvas work. There is no animation library in the dependency list.",
        bullets: [
          "One canvas draws the whole sky: parallax star layers, constellation lines that form as stars drift together, tumbling asteroids, dust, a passing satellite and meteor showers",
          "The scene answers to both scroll and pointer, and pauses entirely when the tab is hidden",
          "Nebulae, the ringed planet and the orbiting moon are CSS gradients and transforms, not images",
          "Scroll reveals through IntersectionObserver and CSS transitions, not a scroll library",
          "Themes are CSS custom properties swapped on one attribute, applied before first paint so nothing flashes",
          "Most sections are Server Components — only the interactive parts ship JavaScript",
        ],
      },
      {
        heading: "The constraints that shaped it",
        body: "Two rules did most of the design work. First, everything animated respects prefers-reduced-motion, which means the page has to be complete and readable with every effect switched off — if a section only made sense once it moved, it was not designed properly yet. Second, both themes had to clear a 4.5:1 contrast floor, which is what forced the day palette away from the bright cyan I started with. The honest cost of the whole thing is about 190 KB of gzipped JavaScript on first load, and almost all of that is React and the framework rather than anything on this page — the entire background scene adds under 10 KB.",
      },
    ],
  },
];

export const publishedProjects = projects;

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

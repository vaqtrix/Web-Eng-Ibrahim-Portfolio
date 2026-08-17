# Portfolio — Ibrahim Ahmed Siddiqui

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4.
Design direction: **deep space / mission control**, with a day and a night theme.

---

## Run it

Node.js 20 or newer (`node -v` to check).

```bash
npm install
npm run dev
```

Open **http://localhost:3000**.

The first `npm run dev` or `npm run build` downloads three Google Fonts, so stay online for that run.

| Command | What it does |
|---|---|
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Production build |
| `npm start` | Serve the production build (run `build` first) |
| `npm run typecheck` | TypeScript check, no build |

---

## What's in it

**Signature element — the orbit system.** In the hero, AgroSense, Infineteck and Vaqtrix orbit a core. Hovering a body pauses its orbit and names it; clicking opens its page. It is the site's navigation, built as an instrument.

**Day / night.** The toggle sits in the nav. Theme is applied by an inline script before first paint, so there is no flash, and the choice is remembered in `localStorage`. Both palettes clear a 4.5:1 text contrast ratio.

**A background that is actually alive.** One canvas (`components/system/SpaceScene.tsx`) draws parallax star layers that react to scroll *and* pointer, twinkling, constellation lines that form and fade as stars drift together, tumbling asteroids, floating dust, a satellite that crosses now and then, single meteors and occasional meteor showers. Around it, CSS handles two drifting nebula clouds, a ringed planet, an orbiting moon and a pulsing horizon. It all pauses when the tab is hidden.

**Everything else that moves.** Scroll reveals through `IntersectionObserver`, 3D tilt cards, magnetic buttons, cursor glow, typing status line, count-up metrics, skills marquee, scroll beam, comet timeline, rotating icon tiles. No Framer Motion, no GSAP — no animation library at all.

**Your photo, cut out.** The background was removed from `IMG_0763.heic` and exported as two transparent WebP files in `public/images/`: a head crop used as the core of the hero orbit and on the resume page, and the full-body cutout standing in the contact panel. To swap in a new photo, replace those two files and keep the names.

**Icons and illustrations everywhere.** Every skill group, venture, role, project and beacon carries a Lucide icon, resolved through `lib/icons.ts` so content files stay free of imports. Each project also has its own drawn SVG illustration in `components/ui/ProjectArt.tsx` — a sensor node transmitting from a field, a scoring pipeline, a live dashboard, an orbiting browser window.

**Reduced motion is real.** Every effect is switched off under `prefers-reduced-motion`, and the page stays complete and readable without them.

---

## Where to edit things

All content is in `content/` — you should not need to open a component.

| File | Holds |
|---|---|
| `content/profile.ts` | Name, headline, status lines, contact, socials, hero metrics, education |
| `content/ventures.ts` | Infineteck + Vaqtrix |
| `content/experience.ts` | Bayer, Iqra DLIC, Amazon |
| `content/skills.ts` | Toolkit groups + the marquee ticker |
| `content/recognition.ts` | Medal, CGPA, founder note |
| `content/work/index.ts` | All four case studies |

Icon keys (`icon: "database"`, `icon: "rocket"`, …) come from `lib/icons.ts`. Add a new icon there first, then reference it from content.

Colours, fonts and type scale are CSS custom properties at the top of `app/globals.css`. Night theme lives under `:root, [data-theme="night"]`, day theme under `[data-theme="day"]`.

### Adding a project

Add an object to the `projects` array in `content/work/index.ts`. The route, the sitemap entry, the resume page and the card grid all pick it up automatically.

### Adding images

Drop files into `public/images/`, then add them to a project's `gallery` array as `/images/your-file.jpg`. AgroSense has an empty gallery waiting — hardware photos and app screenshots will do more for that page than any copy edit.

---

## Contact form

Works with no setup: messages are logged to the terminal in dev. For real email:

1. Create an API key at [resend.com](https://resend.com).
2. `cp .env.example .env.local`
3. Fill in `RESEND_API_KEY` and `CONTACT_TO_EMAIL`.
4. Restart the dev server.

Leave `CONTACT_FROM_EMAIL=onboarding@resend.dev` until you verify your own domain with Resend.

---

## Two things to check before going live

Everything is written — no placeholder copy anywhere. But two items came from me rather than from your CV:

1. **Social URLs** in `content/profile.ts` are my best guess at your handles. Correct them if they differ.
2. **Venture descriptions** in `content/ventures.ts` are written from what you told me about Infineteck and Vaqtrix. Read both paragraphs and adjust anything that overstates where the companies are today.

Also worth doing: replace `public/resume.pdf` with your latest PDF, and set `NEXT_PUBLIC_SITE_URL` to your real domain.

---

## Deploy

```bash
npx vercel
```

Or push to GitHub and import at [vercel.com/new](https://vercel.com/new). Add the same environment variables in the Vercel project settings, then attach your domain.

---

## Notes on the build

- **Next 16, not 15.** npm flagged a security advisory against the 15.x line during setup, so this is on 16.3.1. `npm audit` reports zero vulnerabilities.
- **Case studies are typed TypeScript, not MDX.** Everything a case study needs is structured data, so MDX would add tooling without adding capability. `@next/mdx` slots in later without changing the routes.
- **First-load JavaScript is about 190 KB gzipped**, nearly all of it React and the framework — the whole background scene accounts for under 10 KB. The original plan targeted under 120 KB; that was written against Next 15, whose baseline was smaller. Nothing on the page adds a rendering dependency.
- **Images are WebP only** (112 KB total). Delete `public/images/*.webp` and drop in replacements with the same filenames to change the portrait.
"# Ibrahim-Portfolio" 
"# Ibrahim-Portfolio" 

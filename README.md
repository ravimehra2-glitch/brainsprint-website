# BrainSprint — Marketing Website

Production implementation of the BrainSprint landing page, built on the approved
Brand Strategy, Master Brand Bible, Information Architecture, Experience Direction,
and High-Fidelity Design Specification.

## Stack
React + TypeScript + Vite + Tailwind CSS v4 + Framer Motion + Lucide Icons

## Run locally
```
npm install
npm run dev
```

## Build for production
```
npm run build
npm run preview
```

## Structure
All 14 sections are separate components under `src/components/`:
Nav, Hero, AttentionCrisis, CognitiveFitness, MeetBrainSprint, FivePillars,
DailyWorkout, Dashboard, Progress, HabitFormation, PersonalizedInsights,
Testimonials, FAQ, FinalCTA, Footer — plus shared `MagneticButton` and
`ParticleField` utilities.

## Known follow-ups (carried over from the design spec)
1. **Dashboard sample data** (`src/components/Dashboard.tsx`) uses illustrative
   placeholder numbers for the "early days / months later" toggle — swap in
   real or realistic data before this goes live.
2. **Design tokens** in `src/index.css` (`@theme` block) are a proposed system,
   not inherited from an existing BrainSprint brand file — replace if you have
   locked colors/type from the live app.
3. Particle canvas density is reduced on mobile for performance; test on a
   real low-end device before shipping, per the performance flag raised
   during design.

## Routing & deployment
The site now uses `react-router-dom` for `/about`, `/privacy`, `/terms`,
and `/cookies`. Both `public/_redirects` (Netlify) and `vercel.json`
(Vercel) are included so deep links to those routes resolve correctly on
static hosting — if you deploy elsewhere, make sure your host rewrites
unmatched paths to `/index.html`.

## Production Polish Sprint — what changed
- All primary CTAs now link to `https://app.brainsprint.online` (`src/lib/constants.ts`)
- Added CTAs after Hero, Dashboard, Personalized Insights, Testimonials, and Final CTA
- Progress section now triggers on viewport entry (not scroll-linked), dark background, glow, staged achievement reveals
- Testimonials moved to a dark background, data model now supports photo/role/country/stat
- Personalized Insights redesigned as floating cards with trend indicators
- Footer trimmed to About / Privacy / Terms / Cookie Policy only, each with a real (placeholder-content) page
- Added `TrustStrip` ("10 minutes a day / Personalized insights / Track measurable progress") under the Hero
- Added a sticky floating CTA that appears after scrolling past the Hero

### Still placeholder — needs real content before launch
`Privacy.tsx`, `Terms.tsx`, and `Cookies.tsx` contain structural placeholders,
not final legal copy — have counsel review before these go live.

## Production Readiness Pass — what was added

**SEO**
- Per-page `<title>`, meta description, canonical URL, and OG/Twitter tags via `src/components/Seo.tsx`
- `public/robots.txt` and `public/sitemap.xml` (update the domain if it ever changes)
- Full Open Graph + Twitter Card tags in `index.html`, including a generated `og-image.png` (1200×630)

**Icons**
- `favicon.svg`, `favicon.ico`, `icon-16/32/180/192/512.png`, `apple-touch-icon.png`, `site.webmanifest`
- All generated from `src/assets/brand/mark.svg` — a placeholder mark built from the site's existing
  particle/orbital motif and color tokens, **not an official BrainSprint logo**. Swap this out for real
  brand icon files the moment they exist.

**Performance**
- `/about`, `/contact`, `/privacy`, `/terms`, `/cookies`, and the 404 page are now code-split via
  `React.lazy` — the homepage bundle no longer includes their code
- Confirmed zero unused imports/vars (`tsc --noUnusedLocals`) and zero lint warnings (`npm run lint`)

**Accessibility**
- Verified exactly one `<h1>` per page and a clean heading hierarchy throughout
- Existing focus-visible states, aria-labels, and alt text audited — no gaps found beyond what was
  already fixed in earlier passes

**Routing**
- Added a real 404 page (`src/pages/NotFound.tsx`) and a wildcard route
- Added `public/404.html` as a fallback redirect for static hosts that don't support SPA rewrites
  (e.g. GitHub Pages); `_redirects` (Netlify) and `vercel.json` (Vercel) handle it properly on those hosts

**Analytics (not wired to real IDs)**
- `src/lib/analytics.ts` + `.env.example` — copy `.env.example` to `.env` and set
  `VITE_GA4_MEASUREMENT_ID` / `VITE_CLARITY_PROJECT_ID` to enable GA4 and Microsoft Clarity
- No tracking ID has been invented; both stay inactive until real IDs are supplied

## Known limitation: social preview cards on non-Home pages
This is a client-rendered SPA. `Seo.tsx` updates title/description/canonical/OG tags correctly for
Google (which executes JS), but some link-preview bots (e.g. some Slack/Twitter/iMessage previewers)
don't run JavaScript and will only ever see the static tags baked into `index.html` — meaning shared
links to `/about`, `/contact`, etc. may show the homepage's preview card instead of their own. Fixing
this properly requires server-side rendering or prerendering, which is out of scope for this pass.

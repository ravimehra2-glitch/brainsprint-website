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

## Android Chrome rendering fix — Cognitive Fitness section

**Symptom:** horizontal graphical artifacts / corrupted rendering in the
"Physical Fitness → Cognitive Fitness" section on Android Chrome only.
Desktop (Chrome/Edge) and the rest of the mobile layout were unaffected.

**Root cause (diagnosed via code review — see limitations below):**
`src/components/CognitiveFitness.tsx` was the only section combining, at the
exact same instant:
1. A Framer Motion `pathLength: 0 → 1` animation on an SVG `<path>`, which
   Framer implements by computing `getTotalLength()` and mutating
   `stroke-dasharray`/`stroke-dashoffset` via inline styles on every frame.
2. That SVG being CSS-scaled responsively (`w-40 sm:w-48` against a fixed
   `viewBox`), so the rendered size never matches the coordinate space 1:1.
3. Six sibling elements (the metric cards) animating `scale` transforms via
   Framer Motion at the same trigger instant, each getting promoted to its
   own compositor layer.

This specific combination — per-frame SVG attribute mutation, on a
CSS-scaled SVG, while several sibling transform animations fire
simultaneously in a CSS Grid — lands in a known problem area for Android's
Blink compositor/rasterizer (particularly on Mali/Adreno GPUs), where
tile rasterization for the scaled, attribute-mutating SVG can composite
stale or partial tiles, visible as horizontal banding/corruption. No other
section pairs a `pathLength` draw animation with multiple concurrent
sibling transform animations at the same instant, which is consistent with
why this was the only section affected.

**Fix:** replaced the `pathLength` draw-on animation with a plain opacity
crossfade between two fully-drawn, static `<path>` elements (no
stroke-dasharray manipulation, no per-frame attribute mutation), and
dropped the `scale` transform on the metric cards during the morph
(opacity-only now). The visual concept — pulse line fades out, trend line
fades in, metric cards swap emphasis — is unchanged; only the underlying
animation primitive changed, from "many concurrent attribute/transform
mutations" to "a small number of simple opacity transitions," which is
about as reliable as browser rendering gets.

**Important limitation:** this diagnosis and fix were produced through code
review and knowledge of known Android/Blink SVG-compositing issues, not by
reproducing the bug on a physical Android Chrome device from this
environment (no such device/browser is available here). Before closing
this out, please verify the fix on at least one real Android Chrome device
per the QA checklist below.

## Android Chrome fix #2 — Memory Recall / Sustained Focus / Reaction Speed cards

**Symptom:** the three "mind metric" cards (Memory Recall, Sustained Focus,
Reaction Speed) duplicated, left text/icon ghosting trails, and showed
stale previous frames on Android Chrome. The three "body metric" cards
right next to them, animated the same way, were fine. Desktop was fine.

**Root cause:** the mind-metric cards were the only element on the page
combining two things the body-metric cards don't have:
1. A **translucent, alpha-blended** background and border
   (`bg-[var(--color-growth)]/[0.06]`, `border-[var(--color-growth-soft)]/50`)
   — i.e. the card's own paint already requires alpha compositing against
   whatever is behind it.
2. Framer Motion animating that same element's `opacity` (1 → 0.35 → 1
   across the mount and morph phases) — a *second*, independent alpha
   channel layered on top of the first.

Compositing two independent alpha channels on the same GPU-promoted layer
is a known problem area for Android's Blink/Skia tile rasterizer on some
GPU drivers: instead of cleanly re-blending, the previous frame's tile can
be left partially in place under the new one — which is exactly what
"duplicates," "trails," and "previous frames remain visible" describe. The
opaque body-metric cards (`bg-[var(--color-paper-dim)]`, solid border) only
ever have Framer's single opacity channel to composite, so they never hit
this path — which is why only the translucent cards were affected while
their neighbors, animated identically, were not.

**Fix (`src/components/CognitiveFitness.tsx`):**
1. Replaced the translucent background/border with pre-flattened solid
   colors (`#edf3f0` / `#bde6da` — the same visual result as the old
   6%/50% blends against the page background, computed ahead of time, with
   no alpha math left for the browser to do at runtime).
2. Split the animation across two elements instead of one: an outer
   `motion.div` now controls only the `x` slide-in transform, and a plain
   inner `<div>` controls opacity via a Tailwind class + `transition-opacity`
   — not Framer. This removes the specific pattern of "Framer re-invoking
   `animate` with a new opacity target on an element whose GPU layer was
   already committed from a prior animation phase," and it also avoids a
   second bug I caught while implementing this: my first attempt kept
   Framer's `opacity: 1` in the same `animate` call, which — being an
   inline style — would have permanently overridden the CSS class doing
   the dim/highlight toggle. Separating the two onto different elements
   avoids that collision entirely.

**Verification performed:**
- Real headless desktop Chrome (v131, this environment) screenshot — clean.
- Chrome with an Android/Pixel 7 user agent + mobile viewport + 2.625 DPR —
  clean. **This is viewport/UA emulation on the same Linux Chrome binary,
  not a real Android device or GPU driver.** It confirms layout and
  functional behavior under Android-like conditions, but it cannot
  reproduce or disprove a GPU-driver-specific compositor bug, because it's
  still using desktop Chrome's rendering pipeline underneath.
- **A real Android Chrome device has not been tested from this
  environment** — none is available here. This is the one QA item that
  still needs a human with a physical device (or a service like
  BrowserStack) before this can be marked fully verified.

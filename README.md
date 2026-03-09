# Vibe Coding Club Website (Next.js Migration)


## Project overview
This repository was migrated from a working Vite + React single-page site into a production-oriented **Next.js App Router** app while preserving the same visual layout, sections, animation behavior, and copy.

The original app had one route with in-page anchor navigation:
- `#about`
- `#activities`
- `#projects`
- `#leadership`
- `#contact`

The migrated app keeps this as a single Next.js page at `/` and preserves the same section structure.

## Tech stack
- Next.js 14 (App Router)
- React 18 + TypeScript
- Tailwind CSS
- GSAP (existing animation dependency, preserved)
- `motion/react` (existing motion API, preserved)
- `lucide-react`
- npm

## Route map (Vite -> Next.js)
Original Vite structure:
- Single SPA entry (`src/main.tsx` -> `src/app/App.tsx`)
- No React Router route segmentation

Next.js App Router structure:
- `/` -> [`src/app/page.tsx`](/Users/kylemorgan/Documents/Computer Science/Website Development/Vibe Coding Club Website/src/app/page.tsx)
- Global metadata + font + styles in [`src/app/layout.tsx`](/Users/kylemorgan/Documents/Computer Science/Website Development/Vibe Coding Club Website/src/app/layout.tsx)

## Setup
### Recommended Node version
- Node.js `>=20.11.0`

### Install and run
```bash
npm install
npm run dev
```
Open `http://localhost:3000`.

### Production build
```bash
npm run build
npm run start
```

## Build and deploy notes
- Static/remote images are rendered with `next/image`.
- Unsplash remote domain is enabled in [`next.config.ts`](/Users/kylemorgan/Documents/Computer Science/Website Development/Vibe Coding Club Website/next.config.ts).
- Fonts are loaded with `next/font/google` in layout for optimized loading.
- The project is ready for Vercel or any Node host supporting Next.js.

## Folder structure
```text
src/
  app/
    layout.tsx
    page.tsx
  components/
    layout/
      sticky-header.tsx
    sections/
      fresh-reveal.tsx
      home-page.tsx
      info-section.tsx
      leadership-section.tsx
      projects-section.tsx
    ui/
      adaptive-image.tsx
      button.tsx
      canvas-3d-scene.tsx
      card.tsx
      magnetic-button.tsx
      marquee.tsx
      text-scramble.tsx
      tilt-card.tsx
      wireframe-bg.tsx
  lib/
    constants.ts
    utils.ts
  styles/
    globals.css
public/
  assets/
```

## Style system
Tailwind tokens live in [`tailwind.config.ts`](/Users/kylemorgan/Documents/Computer Science/Website Development/Vibe Coding Club Website/tailwind.config.ts):
- Colors: `primary`, `secondary`, `neutral` scale + semantic `success/warning/danger`
- Font families: `sans`, `mono` (bound to `next/font` CSS variables)
- Radius scale: `sm`..`2xl`
- Shadows: `soft`, `card`, `glass`

Reusable patterns in [`src/styles/globals.css`](/Users/kylemorgan/Documents/Computer Science/Website Development/Vibe Coding Club Website/src/styles/globals.css):
- `@layer base`: typography defaults, focus rings, body defaults
- `@layer components`:
  - `.container`
  - `.section`
  - `.card`
  - `.btn`, `.btn-primary`, `.btn-secondary`, `.btn-ghost`
  - `.type-muted`, `.type-display`
- `@layer utilities`:
  - `.line-clamp-2`

## Accessibility notes
- Semantic sectioning is preserved (`section`, heading hierarchy).
- Navigation has `aria-label` and mobile toggle uses `aria-expanded` + `aria-controls`.
- Focus-visible ring styles are globally defined.
- CTA buttons and links remain keyboard-focusable.

## Migration details
- Removed Vite-specific files:
  - `index.html`
  - `vite.config.ts`
- Replaced SPA entry with Next.js `src/app/layout.tsx` + `src/app/page.tsx`.
- Moved source code into `src/` for a conventional Next.js project layout.
- Kept GSAP and motion-based animations in client components (`"use client"`).
- Replaced raw image rendering with `next/image` via reusable `AdaptiveImage` component.
- Introduced shared content/data constants in [`src/lib/constants.ts`](/Users/kylemorgan/Documents/Computer Science/Website Development/Vibe Coding Club Website/src/lib/constants.ts) to reduce duplication.

## Assumptions
- The original project is a single-page website (no hidden multi-route React Router setup).
- No local font files were present in the source, so Google fonts were used via `next/font/google`.
- No local static image assets were present; existing remote Unsplash image URLs were retained.
- Existing text placeholders in leadership/project content were kept as-is to preserve source fidelity.

## Deviations from original behavior
- `next/image` introduces optimized loading behavior while preserving appearance.
- Global typographic defaults are slightly systematized via Tailwind base layer for maintainability.

## Future improvements
1. Add real external URLs for project demo/source/social links.
2. Add lightweight visual regression snapshots to protect parity during future edits.
3. Add unit tests for animation triggers and section visibility thresholds.
4. Introduce optional dark mode token set if product requirements expand.

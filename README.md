# Vibe Coding Club Website

Official website for Vibe Coding Club, built with Next.js App Router and Tailwind CSS.

## Overview

This project is a single-page site for the club with anchored sections for:

- About
- Projects
- Leadership
- Contact

The app focuses on a polished visual experience with motion, interactive UI components, and responsive layout behavior.

## Tech Stack

- Next.js 16 (App Router)
- React 18 + TypeScript
- Tailwind CSS
- Motion + GSAP
- Lucide React
- Vercel Analytics + Speed Insights

## Getting Started

### Prerequisites

- Node.js 20+
- npm

### Install

```bash
npm install
```

### Run locally

```bash
npm run dev
```

Open `http://localhost:3000`.

## Scripts

- `npm run dev` - Start the local development server
- `npm run build` - Create a production build
- `npm run start` - Run the production server

## Project Structure

```text
src/
  app/            # Next.js App Router entry files
  components/     # Reusable UI, layout, and page sections
  lib/            # Shared constants and utilities
  styles/         # Global styles
public/
  assets/         # Static images and logos
```

## Content and Configuration

- Core site content (navigation, activities, leadership, project cards):
  - `src/lib/constants.ts`
- Global metadata, fonts, and analytics providers:
  - `src/app/layout.tsx`
- Home route entry:
  - `src/app/page.tsx`
- Image host allowlist and framework config:
  - `next.config.ts`

## Deployment

This project is ready to deploy on Vercel or any Node.js host that supports Next.js.

For a production run:

```bash
npm run build
npm run start
```

## Attribution

See `ATTRIBUTIONS.md` for external assets and credits.

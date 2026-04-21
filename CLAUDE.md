# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install          # Install dependencies
npm run dev          # Start dev server (http://localhost:5173)
npm run build        # Build static site to /build
npm run preview      # Serve the built site locally
npm run test:e2e     # Run Playwright E2E tests (requires built site)
```

E2E tests run against `npm run preview` (the built static output, not the dev server). Build first.

## Architecture

SvelteKit 2 + Svelte 5 portfolio configured as a **fully static site** via `@sveltejs/adapter-static`. No backend, no SSR — `prerender = true` everywhere.

### Single-page active-view model

The root `+page.svelte` renders one section at a time, driven by the `activeSection` value in `src/lib/stores.svelte.js`. Sections live in `src/lib/components/sections/` and are conditionally mounted with a custom `cyberWarp` transition (holographic glitch effect). Navigation (TopNav, MobileNav, CommandPalette) writes to `activeSection` to switch views.

### Global state (`src/lib/stores.svelte.js`)

Uses Svelte 5 `$state` runes directly — no external store library. Key values:

- `activeSection` — which section panel is visible
- `bootComplete` — gates rendering of the main UI until the boot animation finishes
- `executiveMode` — toggles a CSS class on `<body>` for a cleaner display mode
- `audioEnabled` — Tone.js audio is lazy-loaded on first user interaction (see `src/lib/utils/audio.js`)
- `isIdle` — set after 3 minutes of inactivity; triggers visual effects

### Layout (`src/routes/+layout.svelte`)

Mounts persistent chrome: TopBar, TopNav, MobileNav, CommandPalette, BootSequence, and ParticleBackground (Three.js, lazy after boot). Sets up idle detection, easter eggs, and audio unlock handlers. `executiveMode` and `isIdle` toggle CSS classes on `<body>` via `$effect`.

### Styling

- `src/lib/styles/variables.css` — all CSS custom properties (colors, spacing, fonts)
- `src/lib/styles/global.css` — layout and base styles
- Three Google fonts loaded in `src/app.html`: Chakra Petch, Space Grotesk, JetBrains Mono
- Mobile breakpoint: 768px
- ParticleBackground uses 40 particles on mobile, 120 on desktop

### Heavy dependencies

- **Three.js** — WebGL particle background in `ParticleBackground.svelte`
- **Tone.js** — Web audio, lazy-loaded only after user interaction
- **D3.js** — Data visualization in section components

## Deployment

Static output goes to `/build`. Target host is Cloudflare Pages. Before shipping:
- Update external links in section components
- Sync certificate images in `static/assets/`
- Update the `LAST_UPDATE` timestamp in `Footer.svelte`

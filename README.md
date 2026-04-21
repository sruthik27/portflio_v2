# NOC Portfolio

Interactive SvelteKit portfolio for Sruthik Issac, designed as a network operations center interface rather than a conventional resume site.

## Stack

- SvelteKit 2 with static prerendering
- Vite 7
- Playwright for browser smoke tests
- Three.js for the particle background
- Tone.js for optional UI audio

## How it works

- The app is built as a static site and outputs to [`build`](/Users/sruthiki/Projects/noc_portfolio/build).
- Navigation is an active-view model, not a long scrolling page. The top nav, mobile nav, command palette, and guided tour all switch the current section in place.
- Audio is loaded lazily on interaction so the initial bundle stays smaller and the page does not pay the Tone.js cost up front.
- The boot sequence no longer depends on third-party IP geolocation. Production deployments stay HTTPS-safe and avoid rate-limited external calls during first paint.

## Local development

```bash
npm install
npm run dev
```

Preview the production build locally:

```bash
npm run build
npm run preview -- --host 0.0.0.0 --port 4173
```

## Tests

Run the Playwright suite:

```bash
npm run test:e2e
```

There is also a manual screenshot helper in [`tests/capture_phase3.spec.js`](/Users/sruthiki/Projects/noc_portfolio/tests/capture_phase3.spec.js). It is skipped by default and only runs when `CAPTURE_PHASE3=1` is set.

## Deployment

This repo is configured for [`@sveltejs/adapter-static`](https://svelte.dev/docs/kit/adapter-static). Any static host will work.

Recommended flow:

```bash
npm install
npm run build
```

Deploy the contents of [`build`](/Users/sruthiki/Projects/noc_portfolio/build).

Cloudflare Pages is the most natural fit because the project is already fully static.

## Production checklist

- Replace placeholder external links in the Projects section if any destinations change.
- Keep certificate images under [`static/assets/certificates`](/Users/sruthiki/Projects/noc_portfolio/static/assets/certificates) in sync with the featured cert list.
- Update [`src/lib/components/Footer.svelte`](/Users/sruthiki/Projects/noc_portfolio/src/lib/components/Footer.svelte) when you want the visible `LAST_UPDATE` stamp to change.
- Run `npm run build` and `npm run test:e2e` before publishing.

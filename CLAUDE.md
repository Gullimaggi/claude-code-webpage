# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Single-page Icelandic landing page for "Tjaldsvæði Ólafsfjörður" (campground), deployed to Vercel. Stack: React 19 + Vite + TypeScript (strict, `noUnusedLocals/Parameters`) + Tailwind v4 + `motion` + `lucide-react`. All user-facing copy is Icelandic.

## Commands

- `npm run dev` — Vite dev server
- `npm run build` — `tsc --noEmit && vite build` (output in `dist/`)
- `npm run lint` — type-check only (there is no ESLint)
- `npm test` — Playwright; its `webServer` runs `npm run build && npm run preview` on port 4173 (reuses a running server, so a stale `preview` can serve an old build)
- Single test: `npx playwright test -g "Calculator"` (or `-g "3\."` for a numbered test)
- First run on a machine needs `npx playwright install chromium`

## Architecture

- `src/App.tsx` owns all cross-section state: `lang` (`'is' | 'en'`) and `preset` (a `BookingPreset | null`; non-null means the `BookingModal` is open). Sections never open the modal themselves — they call the `onBook(preset?)` callback, which is how pricing cards and the calculator pre-fill the modal.
- `src/data/campsiteData.ts` is the single source of truth for prices, amenities, copy and contact info, **and** for `calculatePrice()`. Both `PricingCalculator` and `BookingModal` use it, so pricing rules live only there: tents are charged per adult per night; caravans/motorhomes per vehicle; 16A electricity (+1.000 ISK/night) only for non-tent categories; Keyrum.is discount is 10% of the subtotal.
- `formatISK` hand-rolls the `.` thousands separator on purpose — `toLocaleString('is-IS')` depends on the runtime's ICU data and renders differently across environments.
- `src/data/i18n.ts` translates only the announcement bar, nav and hero. Everything else is Icelandic only.
- `BookingModal` has no backend: submit validates, then sets `window.location.href` to a `mailto:` link and shows a confirmation with the same link as fallback. Real delivery would need an API route.
- Tailwind tokens (`pine-*`, `amber-warm`, `fog-slate`, `border-soft`) are defined in `tailwind.config.ts` and loaded from `src/styles/globals.css` via `@config` (v4 compat), not via `@theme`.
- Media lives in `public/assets/` (`ich1.jpg`, `ich2.jpg`, `video-stock-animation.mp4`, ~64 MB). `VideoShowcaseSection` plays/pauses via IntersectionObserver (threshold 0.3), respecting a manual user pause.

## Test constraints (e2e/landing-page.spec.ts)

The suite uses loose role/text locators with Playwright strict mode, so changes can break it silently:
- Only one link may match `/Aðstaða/i` (the desktop nav link); avoid that word in other link text.
- The modal heading must stay exactly "Taka frá pláss á Tjaldsvæði Ólafsfjörður", and no other element may contain that full text.
- Every `<button>` needs visible text or `aria-label` (icon-only buttons included).
- Every `a[href*="keyrum.is"]` must have `target="_blank"` and `rel` containing `noopener`.
- Test IDs use the `data-test` attribute (configured via `testIdAttribute`), not `data-testid`; showcase images use `data-test="showcase-img"`.

`style reference.ai` and the original source files (`ich1.jpg`, `ich2.jpg`, `video (stock animation).mp4`) are kept in the repo root; the app only serves copies from `public/assets/`.

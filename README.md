# Aiyanar Beach & Dive Resort: website

New aiyanar.com. Next.js 16 + React 19 + TypeScript + Tailwind CSS v4, deployed on Netlify.
Plan: `6 - Final Documentation/Aiyanar Website Build Plan - 2026-10-16/Aiyanar_Website_Build_Plan.xlsx` (BRD = intake Document 05).

## Decisions in force
- Content lives in the repo (typed TS in `src/content/`), no CMS, no database (D1, 2026-10-16).
- Lead capture is deferred: no forms, newsletter or CRM. `site.leadCapture=false` and the content guard blocks `<form>`.
- Booking: Phase 1 deep link to the Hotellink engine (`src/lib/booking.ts`). Dates pre-fill as `check_in` / `check_out`
  in `DD Mon YYYY`; promo codes and currency are not accepted by URL (verified 2026-10-16).
- Contact details come only from `src/content/site.ts` (+63 917 883 1428, +63 917 866 6332).

## Develop
```bash
npm install
npm run dev          # http://localhost:3000
npm run check        # lint + typecheck + content guard + build
npm run test:e2e     # Playwright (run `npm run build` first)
```
Internal styleguide: `/styleguide/` (noindex).

## Deploy (Netlify)
Connect the GitHub repo; build settings come from `netlify.toml` (Next.js Runtime declared explicitly, Node 22).
Environment variables (none are secret):
- `NEXT_PUBLIC_SITE_URL`: `https://aiyanar.com` after DNS cutover
- `ALLOW_INDEXING`: `true` only on the real domain (previews stay noindex)
- `NEXT_PUBLIC_GTM_ID`: added in batch B10

Launch gate: `REQUIRE_FINAL_ASSETS=true npm run build` fails while interim web-capture photos remain.

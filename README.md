# Naomi Jon HQ

Official website for Naomi Jon — Discord hub, perfume catalog, album/tour pages, newsletter, and redirect system.

Built with **Next.js 16** (App Router) and **Tailwind CSS v4**, powered by **Sanity CMS** and **Upstash Redis**.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Styling | Tailwind CSS v4, PostCSS |
| CMS | Sanity (perfumes, concerts, socials, redirects) |
| Cache | Upstash Redis (redirect rules) |
| Email | Resend (contact form), Klaviyo (newsletter) |
| Analytics | Vemetric |
| Testing | Vitest + @testing-library/react, Playwright |
| Linting | ESLint (eslint-config-next) |
| Formatting | Prettier (prettier-plugin-tailwindcss) |
| Validation | Zod, @t3-oss/env-nextjs |
| Package Manager | pnpm |

---

## Scripts

| Script | Command | Description |
|---|---|---|
| `pnpm dev` | `next dev` | Development server |
| `pnpm build` | `next build` | Production build |
| `pnpm start` | `next start` | Start production server |
| `pnpm lint` | `eslint .` | Lint all source files |
| `pnpm lint:fix` | `eslint . --fix` | Lint and auto-fix |
| `pnpm format` | `prettier --write 'src/**/*.{ts,tsx}'` | Format all source files |
| `pnpm test` | `vitest run` | Run unit tests |
| `pnpm test:watch` | `vitest` | Run unit tests in watch mode |
| `pnpm test:e2e` | `playwright test` | Run E2E tests |
| `pnpm docs` | `typedoc --out docs src` | Generate TypeDoc documentation |
| `ANALYZE=true pnpm build` | — | Build with bundle analysis |

---

## Environment Variables

All vars are validated at runtime by `src/env.mjs` using `@t3-oss/env-nextjs` + `zod`.

### Client (`NEXT_PUBLIC_*`)

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity project ID |
| `NEXT_PUBLIC_SANITY_DATASET` | Sanity dataset name (e.g. `production`) |
| `NEXT_PUBLIC_VEMETRIC_TOKEN` | Vemetric analytics token |
| `NEXT_PUBLIC_SITE_URL` | Site URL for sitemap and OG tags |

### Server

| Variable | Description |
|---|---|
| `KLAVIYO_PRIVATE_API_KEY` | Klaviyo API key for newsletter subscription |
| `KLAVIYO_LIST_ID` | Klaviyo list ID |
| `RESEND_API_KEY` | Resend API key for contact form emails |
| `TO_EMAIL` | Recipient email for contact form |
| `KV_REST_API_TOKEN` | Upstash Redis REST API token |
| `KV_REST_API_READ_ONLY_TOKEN` | Upstash read-only token |
| `KV_REST_API_URL` | Upstash REST API URL |
| `KV_URL` | Upstash Redis connection URL |
| `REDIS_URL` | Alias for KV_URL |
| `SYNC_SECRET` | Secret for Sanity webhook HMAC verification |

---

## Routes

| Route | Description |
|---|---|
| `/` | Home — Discord landing with hero, community socials, newsletter |
| `/perfumes` | Perfume catalog from Sanity |
| `/perfumes/[slug]` | Perfume detail page |
| `/strawberry` | Strawberry album release (with video) |
| `/strawberry-album` | Strawberry album release (no video) |
| `/strawberry-tour` | Tour archive with concert dates |
| `/newsletter` | Dedicated newsletter signup |
| `/contact` | Contact form (sends via Resend) |
| `/legal-notice` | Legal notice (markdown) |
| `/privacy-policy` | Privacy policy (markdown) |
| `/redirect` | Safe redirect gateway |
| `/api/discord` | Discord server stats (GET) |
| `/api/sync-redirects` | Sanity webhook: sync redirects to Redis (POST) |

Intercepting modals (open legal/privacy on top of current page):
- `/(.)privacy-policy`
- `/(.)legal-notice`

---

## Project Structure

```
src/
  app/                    # Next.js App Router pages
    @modal/               # Parallel route modals
    api/                  # API routes (discord, sync-redirects)
    _components/          # Page-specific components
    perfumes/
      _components/        # Perfume-specific components
    strawberry-tour/
      _components/        # Tour-specific components
  components/
    ui/                   # Reusable UI primitives (Button, Card, Modal, etc.)
  config/
    routes.ts             # Per-page visibility toggles
  content/                # Markdown files (legal notice, privacy policy)
  lib/
    sanity/               # Sanity query helpers (redirects, concerts, socials)
    logger.ts             # Structured logger (info/warn/error)
    result.ts             # Result<T, E> utility type
  sanity/
    client.ts             # Sanity client instance
    imageUrl.ts           # Sanity image URL builder
  __tests__/              # Vitest unit tests
e2e/                      # Playwright E2E tests
```

---

## Sanity CMS

Content types queried from Sanity:

| Type | Fields | Used By |
|---|---|---|
| `redirect` | source, destination, meta fields | Metadata per page, redis cache |
| `perfume` | title, slug, image, notes, store links | `/perfumes`, `/perfumes/[slug]` |
| `social` | name, url, platform, order | Footer icons, community section |
| `concert` | date, city, location, country, buyUrl | `/strawberry-tour` |

Queries use `next: { revalidate: 60 }` for ISR-based caching.

---

## Redirect System

Redirects use a multi-layered approach:

1. **Sanity webhook** (`POST /api/sync-redirects`) — On publish, Sanity sends redirect documents to this endpoint. HMAC-signed payloads are verified with `@sanity/webhook`, then written to Upstash Redis as `redirect:{source}` keys.
2. **Safe gateway** (`/redirect?to=...&source=...`) — Client-side validation checks the target against a static allowlist and Sanity data before redirecting.
3. **404 page** — Custom not-found page auto-redirects to `/` after 3 seconds.

---

## Component Conventions

- **Exports:** Named exports (`export function Component`) preferred over default exports.
- **Client components:** Use `"use client"` directive only when interactivity is needed (hooks, event handlers).
- **Styling:** Tailwind CSS v4 with custom theme tokens defined in `globals.css` (`@theme`).
- **UI primitives** live in `src/components/ui/`; page-specific components live in `src/app/*/_components/`.
- **Path alias:** `@/` maps to `src/`.
- **Formatting:** Prettier with `prettier-plugin-tailwindcss` for consistent class ordering.

---

## Development

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm test         # unit tests
pnpm test:e2e     # requires dev server running
```

---

## License

Private — all rights reserved.

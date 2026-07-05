# Fix blog images + speed + country SEO + Supabase safety

Four things, in this order.

## 1. Blog images → Supabase Storage

**Why they're broken on www.intorza.com:** cover images live at `/__l5e/assets-v1/...` (Lovable's asset serving path). That prefix only resolves on Lovable-hosted domains. If `www.intorza.com` is pointed anywhere else (or hasn't picked up the latest deploy), those paths 404.

**Fix:**
- Create a public bucket `blog-images`.
- Server route `/api/public/migrate-blog-images?key=...` that:
  - Downloads each unique `cover_image` from the current Lovable CDN URL
  - Uploads to `blog-images/<slug>.webp`
  - Updates `blog_posts.cover_image` to the Supabase public URL
- After running once, remove the endpoint.
- All future references become absolute HTTPS URLs on the Supabase CDN — they work on any domain, including social crawlers.

RLS: public SELECT on the bucket, no insert/update from client.

## 2. Speed pass

**LCP / first paint:**
- Move Google Fonts from a runtime `<link>` in `__root.tsx` to `@fontsource` packages loaded in `src/main.tsx` (no render-blocking CSS request to fonts.googleapis.com).
- Add `<link rel="preload">` for the hero image on `/` only.
- Add `fetchpriority="high"` + `loading="eager"` on the hero `<img>`; keep `loading="lazy"` on everything below the fold (already done for blog cards).
- Add `width`/`height` on all images so the browser reserves layout space (prevents CLS).

**Blog list & post pages:**
- Add `<link rel="preconnect">` to the Supabase Storage origin.
- Cache headers on the Supabase-fetched posts via `Cache-Control: public, s-maxage=300, stale-while-revalidate=3600` on the server-fn response.
- Serve blog list with a `changefreq=hourly` public cache header.
- Use `sizes` + `srcset` where the image render size differs from source (pillar card vs card grid).

**Navigation:**
- TanStack Router already prefetches on hover — verify `defaultPreload="intent"` is set; enable it if not.
- Confirm `defaultPreloadStaleTime` is sensible so hovering doesn't re-fetch on every intent.

## 3. Country-wise SEO on `/$country` and `/$country/$city`

Both routes exist. Add per-route meta and JSON-LD keyed by the params:

- Per-country/city `title`, `description`, `og:title`, `og:description`, `og:url`, `canonical`.
- Localised copy (e.g. GST/HSN for India, VAT for UAE, sales tax for US).
- `hreflang` links on `/$country` pages (`en-in`, `en-us`, `en-ae`, etc. + `x-default`).
- JSON-LD:
  - `LocalBusiness` / `Service` schema per country page with `areaServed` = country name.
  - `Service` + `BreadcrumbList` on city pages.
- Add each `/$country` and `/$country/$city` to the sitemap.

## 4. Supabase pause protection

Free-tier Supabase projects pause after **7 days of no activity** — not usage-related. Two safeguards:

- The blog list SSR query already runs on every visit, so a live site with traffic won't pause. But for insurance:
- Add pg_cron in a migration to run a lightweight `SELECT 1 FROM blog_posts LIMIT 1` weekly.
- Enable `pg_cron` extension in the migration.

If the user is on a paid plan this is unnecessary but harmless.

## Technical notes

- **Migration endpoint** uses `supabaseAdmin` inside the handler, guarded by a shared secret in the query string. Deleted after successful run.
- **Bucket policies:** `public: true`, read-only from client (RLS on storage.objects blocks anon writes — default).
- **Font swap:** removes external CSS request, saves ~150–300ms on first paint on cold connections.
- **Cache-Control on server fns:** implemented with `setResponseHeader` from `@tanstack/react-start/server`.
- **hreflang:** added via `links` in each `/$country` route's `head()`, generated from `src/data/countries.ts`.

## Confirmations before I start

- **Fonts:** currently Outfit + Plus Jakarta Sans. I'll swap to `@fontsource/outfit` + `@fontsource/plus-jakarta-sans` — same fonts, faster load. OK?
- **Country list:** I'll use whatever is already in `src/data/countries.ts` (India, US, UAE, UK, etc.).
- **Migration endpoint secret:** I'll reuse the pattern already used by `/api/public/seed-blog` (query-string key). OK.

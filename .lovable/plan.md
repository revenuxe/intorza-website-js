# Migrate Intorza public pages to TanStack Start

Source: Intorza Landing Page project (Vite + React Router + react-helmet, Tailwind v3, HSL tokens). Target: this TanStack Start app (Tailwind v4 + oklch). Migration is public-facing only — admin pages are skipped.

## Open questions (please confirm)

1. **Supabase blog data**: source uses project ref `rehioexyiybgrxepajnb`. Two options:
   - **(A) Reuse the existing Supabase project read-only** — set `SUPABASE_URL` / `SUPABASE_PUBLISHABLE_KEY` as env in this project and call `blog_posts` from server functions. No data copy. Recommended.
   - **(B) Enable Lovable Cloud here and re-create `blog_posts` table** — clean separation but requires data import.
2. **Design tokens**: convert Tailwind v3 HSL tokens (`--primary: 14 56% 49%`) to Tailwind v4 `oklch()` in `src/styles.css`, keeping the same Intorza palette (orange/navy/cream). OK?
3. **Domain for canonical/og/hreflang**: source hardcodes `https://intorza.com`. I'll keep that as the canonical domain. Confirm.

## What gets migrated

### Routes (TanStack file-based)
```
src/routes/
  __root.tsx               header/footer shell, global meta + Organization JSON-LD
  index.tsx                Home (Intorza landing)
  about.tsx                /about
  contact.tsx              /contact
  careers.tsx              /careers
  privacy.tsx, terms.tsx, cookies.tsx, refund.tsx
  blog.tsx                 layout w/ <Outlet/>
  blog.index.tsx           /blog — server-loaded list
  blog.$slug.tsx           /blog/:slug — server-loaded detail
  $country.tsx             /:country layout
  $country.index.tsx       country landing
  $country.$city.tsx       city landing
  sitemap[.]xml.ts         dynamic sitemap (home, statics, all countries × cities, all published posts)
```

### Data & components copied from source
- `src/data/countries.ts`, `src/data/cities.ts`, `src/data/cityBlogStrategy.ts` (verbatim)
- Components: `Header`, `Footer`, `HeroSection`, `FeaturesSection`, `HowItWorksSection`, `TestimonialsSection`, `CTASection`, `ProCTA`, `FeedbackCTA`, `GeoRedirectBanner`, `NavLink`
- Country components: `CountryHeroSection`, `CountryCTASection`, `CountryProCTA`, `CountryTestimonialsSection`
- SEO components: `Breadcrumbs`, `SchemaMarkup`, `CountrySEOSchema`, `CitySEOSchema` (refactored — see below)
- Assets under `src/assets/` (logo + screenshots)

### SEO model (TanStack-native, replaces react-helmet-async)
- Per-route `head()` returns `meta`, `links` (canonical + **hreflang** for all 50+ country codes on home + country/city), and `scripts` (JSON-LD).
- `og:image` only on leaf routes; never on `__root.tsx`.
- Drop `SEOHead` / `<Helmet>` wrappers — emit tags through `head()`.
- Schemas: Organization on root, WebSite on home, Article on blog detail, Service+LocalBusiness on country/city, BreadcrumbList where applicable.

### Data loading (SSR)
- `src/lib/blog.functions.ts` — `listPosts` / `getPostBySlug` server fns using server publishable Supabase client (anon, RLS-respecting reads of `published=true`).
- Route loaders use `context.queryClient.ensureQueryData(...)`; components use `useSuspenseQuery`.
- Country/city data is static (imported from `src/data`) — no fetch needed; loader just resolves params and 404s on unknown slugs.

### Style migration
- Translate source `index.css` palette to `src/styles.css` `@theme inline` + `:root`/`.dark` blocks in `oklch()`.
- Port custom utilities: `.text-gradient`, `.card-elevated`, `.section-padding`, `.container-custom`, blog rich-text styles, animations, gradients, shadows.
- Add Outfit + Plus Jakarta Sans via `<link>` in `__root.tsx` head (Tailwind v4 can't `@import` remote in CSS).
- Map `font-display` → Outfit, `font-sans` → Plus Jakarta Sans.

### Replacements
- `react-router-dom` `<Link to>` / `useNavigate` → `@tanstack/react-router`.
- `react-helmet-async` `<Helmet>` / `<SEOHead>` → route `head()`.
- `supabase` browser client direct-fetch in components → server fn + suspense query.
- `useEffect` data fetching → loader + suspense.

### Out of scope
Admin routes (`/admin/*`), auth, `useAuth`, `Toaster`, contact form submission backend (form will display but POST stays no-op unless you ask).

## Technical notes

- Auth-protected server fns are NOT used — all reads are public via server publishable client with narrow `TO anon` policy on `blog_posts` (already in place on source).
- 404s on unknown country/city/slug throw `notFound()`; route declares `notFoundComponent` and `errorComponent`.
- Sitemap entries: `/`, statics, every `countries[].code`, every `cities[]` entry, every published post slug.
- hreflang: country home + city emit `<link rel="alternate" hreflang="<locale>" href="https://intorza.com/<code>">` for every country, plus `x-default` → `/`.

Reply with answers to the 3 questions and I'll execute.

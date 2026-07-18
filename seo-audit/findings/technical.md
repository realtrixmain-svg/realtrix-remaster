# Realtrix Remaster — Technical SEO Audit

Site: `repos/realtrix-remaster` (pre-launch, target domain `realtrix.org`)
Method: code-level static analysis (React/Vite SPA, react-router-dom, react-helmet-async). Dev server at `http://localhost:54257` was not reachable at analysis time, so findings are drawn from source inspection — for a client-only React SPA the initial HTML payload is identical to what's in the source regardless of dev-server state, so this does not weaken the findings below.

Score: **38 / 100** — dominated by one systemic Critical issue (missing per-route SEO metadata on two-thirds of routes) plus a canonical/route mismatch and CSR-only rendering with no fallback.

---

## CRITICAL

### C1. 23 of 34 routes render with zero unique `<title>`/description/canonical — they silently inherit the homepage's static tags from `index.html`
**Evidence:** `src/App.tsx` defines 34 routes. Only 11 page components import and render the `<SEO>` component (`src/components/SEO.tsx`, which wraps `react-helmet-async`'s `<Helmet>`):
```
src/pages/services/DoneForYou.tsx, ColdEmailAutomationSetup.tsx, DeliverabilityConsulting.tsx,
B2BLeadGen.tsx, MultiTouchOutreach.tsx, tools/ROICalculator.tsx, tools/BenchmarkChecker.tsx,
tools/TAMEstimator.tsx, Tools.tsx, Pricing.tsx, About.tsx
```
The following 23 routed pages have **no** `SEO`/`Helmet` usage anywhere in the component or its layout wrapper (confirmed via `grep -rn "Helmet" src/pages` returning zero matches for these files):
- `Home.tsx` (`/`) — acceptable only because `index.html`'s static tags happen to describe the homepage
- `ReadinessQuiz.tsx` (`/readiness-quiz`)
- `outreach/OutreachHub.tsx` (`/outreach`) and all 13 tip pages under `outreach/tips/*` (`ColdEmailSubjectLines.tsx`, `FollowUpTiming.tsx`, `PersonalizationAtScale.tsx`, `HandlingReplies.tsx`, `InboxPlacement.tsx`, `BadData.tsx`, `FirstLineRule.tsx`, `SignalsOverGuessing.tsx`, `CampaignDecay.tsx`, `PersonalizationBoundaries.tsx`, `ReplyTriageSystem.tsx`, `DomainWarmup.tsx`, `WhenToKillALead.tsx`, `AuthenticAutomation.tsx`)
- `legal/LegalHub.tsx` (`/legal`) and all 6 legal docs (`PrivacyPolicy.tsx`, `TermsOfService.tsx`, `AcceptableUsePolicy.tsx`, `BillingPolicy.tsx`, `AIPolicy.tsx`, `CookiePolicy.tsx`)

Their shared layouts (`src/pages/outreach/ArticleLayout.tsx`, `src/pages/legal/LegalLayout.tsx`) render a per-page `<h1>` and description as visible copy but never touch `<Helmet>`.

**Impact:** Because `react-helmet-async` only overrides `document.head` tags when a `<Helmet>` instance mounts, all 23 of these routes will be indexed with the exact same `<title>`, meta description, and — critically — the exact same `<link rel="canonical" href="https://realtrix.org/">` hard-coded in `index.html` (line 11). This tells Google that all 14 outreach articles, all 6 legal pages, the outreach hub, the legal hub, and the readiness quiz canonicalize to the homepage. Best case, Google ignores the canonical and indexes them with duplicate homepage title/description (poor CTR, duplicate-content signals); worst case, Google honors it and these pages never get indexed independently at all — this is Realtrix's actual content-marketing footprint (14 SEO tip articles) being told not to exist.

**Fix:** Add `<SEO title=... description=... canonical="/outreach/tips/..." />` to every one of the 23 files, or — better, given the pattern repeats across `ArticleLayout`/`LegalLayout` — accept `title`/`description`/`canonical`/`schema` props on those two layout components and render `<SEO>` once inside the layout, then pass per-article values from each of the 20 call sites. This also fixes C2 below in the same pass by forcing every article to declare its own canonical explicitly rather than relying on copy-paste.

---

### C2. Canonical URL mismatch on the Deliverability Consulting page — canonical points to a route that doesn't exist
**Evidence:** `src/pages/services/DeliverabilityConsulting.tsx:34` sets
```
canonical="/services/deliverability-consulting"
```
and the JSON-LD `Service.url` at line 42 repeats `https://realtrix.org/services/deliverability-consulting`. But the actual registered route in `src/App.tsx` is:
```
<Route path="/services/email-deliverability-consulting" element={<Deliverability />} />
```
(also the URL used in `public/sitemap.xml`). `/services/deliverability-consulting` is not a route, so it falls through to the catch-all `<Route path="*" element={<Navigate to="/" replace />} />` in `App.tsx` and client-side redirects to the homepage.

**Impact:** The page canonicalizes itself to a URL that immediately bounces to `/`. Google will either treat this as a broken self-canonical (page gets no ranking credit) or, if it ever crawls `/services/deliverability-consulting` directly (e.g. via the JSON-LD `url` field), it hits a redirect-to-homepage, which reads as a soft-404 on a real service page.

**Fix:** Change line 34 to `canonical="/services/email-deliverability-consulting"` and line 42's `url` to match. Grep the whole repo for the string `deliverability-consulting` after the fix to confirm no other stale reference remains (nav links, internal `<Link>`s, sitemap).

---

## HIGH

### H1. No server-side rendering / static generation — this is a pure client-side-rendered SPA
**Evidence:** `vite.config.ts` contains only `react()` — no `vite-react-ssg`, `vite-plugin-ssr`, prerender plugin, or SSR entry. `index.html`'s `<body>` is `<div id="root"></div>` plus `<script type="module" src="/src/main.tsx">` with no server-rendered content. `src/main.tsx` mounts `<HelmetProvider><App/></HelmetProvider>` client-side only, wrapped in `BrowserRouter` (not a static-router used in an SSR build step). `package.json` has no `build:ssg`/prerender script.

**Impact:** Every route's actual content — headings, body copy, the 14 outreach articles' text — only exists after JS executes. Googlebot does now render JS via its second-wave indexing, but this still (a) delays indexing of new content by the second-wave crawl queue, (b) means any crawler/tool that doesn't execute JS (many SEO auditors, some social-share unfurlers, and non-Google bots) sees only the empty `<div id="root">` shell, and (c) compounds directly with C1 — because `<Helmet>` tags are injected client-side, any crawler that only reads the initial HTML response for title/description/canonical (view-source, most third-party SEO tools, link-preview bots) will see the static `index.html` tags on literally every URL, not just the 23 unpatched ones.

**Fix:** Given this is a content-marketing-heavy marketing site (34 routes, 14 articles), adopt a prerendering step for the production build — `vite-react-ssg` is the lowest-effort path since the app already uses `react-router-dom` route definitions that can be reused directly, or a `vite-plugin-prerender`/`vite-plugin-ssg` pass at build time that crawls the route list from `App.tsx`/`sitemap.xml` and emits static HTML per route with correct `<head>` tags baked in. This is now more urgent than a nice-to-have because C1 means most routes have no per-page `<head>` content at all today, client or server side.

### H2. No `lastmod` dates in sitemap.xml
**Evidence:** `public/sitemap.xml` — all 33 `<url>` entries include `<changefreq>` and `<priority>` but zero `<lastmod>` tags (`grep -c "lastmod" public/sitemap.xml` → 0).

**Impact:** `lastmod` is one of the few sitemap signals Google actually uses to prioritize re-crawl of changed pages. Without it, freshly-updated articles/pricing don't get a recrawl priority boost, and Search Console's sitemap report can't validate freshness claims.

**Fix:** Add `<lastmod>` (ISO 8601 date) to every `<url>` entry, generated from each page's actual last-edit date if this repo automates sitemap generation, or at minimum set to the deploy date and update on real content changes (don't blanket-refresh on every deploy — that trains Google to ignore the signal).

### H3. No HTTP security headers configured anywhere in the repo
**Evidence:** No `vercel.json`, `netlify.toml`, `_headers`, or any header-setting config found at repo root (`find . -maxdepth 1 -iname "vercel.json" -o -iname "netlify.toml" -o -iname "_headers"` → no results). No `<meta http-equiv="Content-Security-Policy">` or similar in `index.html`.

**Impact:** Not a direct ranking factor, but Google's security/UX signals (and any manual review) will flag absent `Strict-Transport-Security`, `X-Content-Type-Options`, `X-Frame-Options`/`frame-ancestors`, `Referrer-Policy`, and CSP once this ships to a real host. Since this hasn't launched yet, this is the correct moment to bake headers into deploy config before it's a retrofit.

**Fix:** Once hosting platform is chosen (Vercel/Netlify/etc.), add the platform-native headers file (`vercel.json` `headers` array or Netlify `_headers`) setting at minimum: `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, and a CSP scoped to the fonts/analytics domains actually in use (`fonts.googleapis.com`, `fonts.gstatic.com`, `cal.com` per the `CAL_LINK` embeds seen in `ArticleLayout.tsx`/`DeliverabilityConsulting.tsx`).

### H4. Referenced OG/Twitter image and Organization logo files don't exist in `public/`
**Evidence:** `public/` contains only `ai.txt`, `hero-paper-planes-transparent.png`, `robots.txt`, `sitemap.xml`. But:
- `index.html:19,27` reference `https://realtrix.org/og-image.jpg`
- `index.html:36` and `src/components/SEO.tsx:25` reference `https://realtrix.org/logo.png`
- `src/components/SEO.tsx:18` defaults `ogImage` to `/og-default.png` for every page using `<SEO>` without an explicit `ogImage` prop (checked: none of the 11 `<SEO>` call sites pass `ogImage`, so all 11 use this missing default)

None of `og-image.jpg`, `logo.png`, or `og-default.png` exist in `public/`.

**Impact:** Every social share (Slack, LinkedIn, X, iMessage link preview — high-traffic channel for a B2B outbound company sharing its own content) will render with a broken image or platform-default blank card. The Organization JSON-LD `logo` field pointing to a 404 also risks Google Business/Knowledge Panel logo eligibility.

**Fix:** Add actual `og-image.jpg` (1200x630), `logo.png` (square, ≥112x112 per Google's logo schema guidance), and `og-default.png` to `public/` before launch. Verify with a direct fetch of each URL post-deploy (200 + correct `Content-Type`).

---

## MEDIUM

### M1. No favicon declared
**Evidence:** `index.html` `<head>` has no `<link rel="icon">`/`<link rel="apple-touch-icon">` of any kind (grep for `favicon|icon"` in `index.html` returns no matches).

**Impact:** Browser tab, bookmark, and Google SERP favicon will be blank/default. Minor but visible trust signal, cheap to fix pre-launch.

**Fix:** Add a favicon set (`favicon.ico`, `favicon-32x32.png`, `apple-touch-icon.png`) to `public/` and reference them in `index.html`.

### M2. Structured data limited to `Organization` (default) + `Service` (5 service pages only) — no `Article`/`BreadcrumbList`/`FAQPage` anywhere
**Evidence:** `src/components/SEO.tsx:20-37` defines `DEFAULT_SCHEMA` as `Organization` only, used whenever a page passes no explicit `schema` prop. Grepping all `schema={{` usages shows only the 5 `services/*` pages pass a custom `Service` schema (e.g. `DeliverabilityConsulting.tsx:36-43`). None of the 14 outreach tip articles, the tools pages, or legal pages define `Article`, `HowTo`, `FAQPage`, or `BreadcrumbList` schema — and per C1, most of them render no schema at all since they never mount `<SEO>`.

**Impact:** The outreach tips are exactly the content type (short how-to/advice articles) that benefits most from `Article` schema for rich results and from `BreadcrumbList` for SERP breadcrumb display given the nested `/outreach/tips/*` URL structure.

**Fix:** Once C1 is fixed and every article mounts `<SEO>`, extend the `schema` prop passed from each tip page to `Article` type (`headline`, `datePublished`, `author`, `publisher`) and add a shared `BreadcrumbList` schema in `ArticleLayout.tsx`/`LegalLayout.tsx` reflecting the `/outreach → /outreach/tips/x` and `/legal → /legal/x` hierarchies.

### M3. `robots.txt` blocks query-string variants that don't exist on this SPA
**Evidence:** `public/robots.txt` lines 4-5: `Disallow: /*?sort=` and `Disallow: /*?filter=`. Nothing in `src/App.tsx`'s route table or any page component reads `sort`/`filter` query params (no `useSearchParams` usage for these keys found in `src/pages`).

**Impact:** Low-risk dead rules, but they suggest this `robots.txt` may have been copy-pasted from another project (e.g. an e-commerce/listing site) rather than authored for this marketing site's actual URL space. Not harmful, but worth auditing against real query-param usage (e.g. any `?utm_*`, `?ref=` tracking params this site's marketing actually uses) rather than leaving stale/speculative rules.

**Fix:** Confirm intended query-param behavior and either remove the two dead rules or replace them with the params actually in use (if any UTM/tracking dedup is needed, prefer canonical tags over `robots.txt` blocking).

---

## LOW

### L1. `index.html` meta description duplicates the `SEO.tsx` `DEFAULT_DESC` with a trivial wording difference
**Evidence:** `index.html:6` — "Realtrix runs your entire cold email operation — infrastructure, sourcing, sequencing, and AI-qualified replies. You pay infra at cost, and a fee only when a real reply lands." vs. `src/components/SEO.tsx:17` `DEFAULT_DESC` — "Realtrix runs your entire cold email operation — infrastructure, sourcing, sequencing, and AI-qualified replies. Pay infra at cost, and a fee only when a real reply lands." (near-identical, "You pay" vs "Pay").

**Impact:** Purely a maintenance smell — two sources of truth for the same homepage description that will drift. Not a ranking issue today since Home.tsx never mounts `<SEO>`, so only `index.html`'s copy is ever live.

**Fix:** If Home.tsx is later given an `<SEO>` instance (recommended for consistency once C1 is fixed elsewhere), make `index.html`'s static tags and `SEO.tsx`'s defaults reference one canonical string, or drop the static `index.html` description/title once Home.tsx sets it via `<SEO>` so there's a single source of truth.

### L2. `og:locale` set to `en_US` for a South Africa–addressed company
**Evidence:** `index.html:20` — `<meta property="og:locale" content="en_US" />`; Organization JSON-LD `addressCountry: "ZA"` (`index.html:32`, also `src/components/SEO.tsx:30`).

**Impact:** Minor — affects Facebook/LinkedIn locale-based rendering only, not core SEO. Worth a conscious decision rather than a default.

**Fix:** If the target audience is genuinely US/global English-speaking buyers, `en_US` is a reasonable choice to keep — just confirm it's intentional rather than an unedited Vite/template default, since the business is registered/addressed in ZA.

---

## PASS (verified, no action needed)

- **Sitemap ↔ route parity:** All 33 non-wildcard routes in `src/App.tsx` have exact matching `<loc>` entries in `public/sitemap.xml`, and vice versa (diffed programmatically — zero mismatches beyond the intentional `*` catch-all, which correctly has no sitemap entry).
- **robots.txt structure:** Valid syntax, correctly allows `/`, disallows sensible admin/api/private paths, references `Sitemap: https://realtrix.org/sitemap.xml`. AI crawler section correctly allows `GPTBot`, `ChatGPT-User`, `CCBot`, `anthropic-ai`, `Claude-Web`, `PerplexityBot`, `Google-Extended` — good AIO posture.
- **Viewport meta:** `index.html:5` — `<meta name="viewport" content="width=device-width, initial-scale=1.0" />` present and correct.
- **URL structure:** Clean, kebab-case, no query params or trailing slashes, logical hierarchy (`/services/*`, `/tools/*`, `/outreach/tips/*`, `/legal/*`). Matches sitemap exactly (see above).
- **H1 structure:** Every page that renders visible content has exactly one `<h1>` (verified across all 35 page files; the only file with 2 `<h1>` matches, `ReadinessQuiz.tsx`, has one real JSX `<h1>` for the page and one that's inside a JS template-literal string used to generate an emailed HTML report — never rendered to the DOM, not a real duplicate-H1 issue).
- **Image alt text:** Only one `<img>` tag exists in the entire `src/` tree (`src/pages/Home.tsx:215-219`) and it has a descriptive `alt` attribute. No lucide-react icons found used as sole interactive/informational content without adjacent text.
- **Canonical correctness (the 10 pages that don't have the C2 bug):** `Tools.tsx`, `About.tsx`, `Pricing.tsx`, `tools/TAMEstimator.tsx`, `tools/ROICalculator.tsx`, `services/MultiTouchOutreach.tsx`, `services/B2BLeadGen.tsx`, `services/ColdEmailAutomationSetup.tsx`, `services/DoneForYou.tsx`, `tools/BenchmarkChecker.tsx` all set a `canonical` prop matching their actual registered route.
- **`ai.txt`:** Present at `public/ai.txt`, well-formed, gives AI systems attribution guidance and scope boundaries.

---

## Priority fix order

1. C1 — wire `<SEO>` (or layout-level equivalent) into all 23 unpatched routes
2. C2 — fix the deliverability-consulting canonical/schema URL mismatch
3. H4 — add the missing OG/logo image assets before any pre-launch social sharing
4. H1 — scope a prerendering/SSG solution for the production build
5. H2, H3, M1–M3, L1–L2 — batch into the same pre-launch pass

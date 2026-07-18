# Schema.org / Structured Data Audit — realtrix-remaster

Source reviewed: `index.html`, `src/components/SEO.tsx`, `src/main.tsx`, `src/pages/**`.

## 1. Detection results (what exists today)

| Location | Schema found | Rendered via |
|---|---|---|
| `index.html` (static `<head>`) | `Organization` | plain `<script>` in the HTML shell |
| `src/components/SEO.tsx` | `DEFAULT_SCHEMA` = `Organization` (fallback when no `schema` prop passed) | `react-helmet-async` |
| 5 service pages (`src/pages/services/*.tsx`) | `Service` (name, provider, description, url) | `<SEO schema={...}>` → Helmet |
| `src/pages/outreach/OutreachHub.tsx` | `BreadcrumbList` + `CollectionPage` | raw `<script dangerouslySetInnerHTML>` in body (no `<SEO>`/Helmet at all) |
| `src/pages/legal/LegalHub.tsx` | `BreadcrumbList` + `CollectionPage` | same raw-script-in-body pattern |
| `src/pages/tools/*.tsx` (ROI, Benchmark, TAM), `src/pages/Tools.tsx`, `src/pages/Pricing.tsx`, `src/pages/About.tsx` | none — `<SEO>` used for title/description/canonical only, no `schema` prop passed, so it silently falls back to `Organization` | Helmet default |
| `src/pages/Home.tsx` | none — doesn't import `<SEO>` at all | relies solely on `index.html` static tags |
| `src/pages/outreach/tips/*.tsx` (all 13 articles) + `src/pages/outreach/ArticleLayout.tsx` | **none** — no `<SEO>` import anywhere in the article chain | none |

## 2. Validation results

**FAIL — Duplicate Organization schema on every non-Service page.** `index.html` always ships a static `Organization` block, and `SEO.tsx`'s `DEFAULT_SCHEMA` is *also* `Organization` and fires via Helmet whenever a page doesn't pass its own `schema` prop (Home, Pricing, About, Tools hub, all 3 tool pages). Result: two `Organization` JSON-LD blocks in the rendered DOM on those routes. Not a hard Google error, but redundant and worth collapsing to one canonical `Organization`/`ProfessionalService` block that only lives in `index.html`, with `SEO.tsx`'s default changed to `null` (emit nothing) rather than a second Organization copy.

**FAIL — All 13 outreach/tips articles have zero SEO metadata and zero schema.** `ArticleLayout.tsx` (the shared wrapper every tip renders through) never imports or renders `SEO`. Consequences: no per-article `<title>`, no meta description, no canonical URL, and no `Article`/`BlogPosting` schema — the single biggest structured-data gap on the site, and it's your largest content section (13 of ~25 total routes).

**FAIL — OutreachHub and LegalHub bypass the SEO component entirely.** Their `BreadcrumbList`/`CollectionPage` JSON-LD is hand-injected via `dangerouslySetInnerHTML` inside the page body, not through Helmet. Functionally Google will still parse it (structured data is valid anywhere in the rendered DOM), but it means these two pages have no `<title>`/meta description/canonical override — SPA client-side nav will leave whatever the previously-visited page's Helmet tags were in place. Recommend converting both to use `<SEO title=... description=... canonical=... schema=[...]>` for consistency (SEO.tsx already accepts an array via `schema` since `JSON.stringify` handles arrays fine — confirm/adjust typing to `Record<string, unknown> | Record<string, unknown>[]` if you want both Breadcrumb + CollectionPage passed together).

**PASS — Service schema on the 5 service pages** is syntactically valid (`@context`, `@type: Service`, `provider`, `description`, `url` all present) but **incomplete**: missing `areaServed`, `serviceType`, and — critically — no `offers`/`Offer` block despite Pricing.tsx having concrete, publishable numbers ($150 Base / $300 Growth infra + $0/$30/$40/$60/$100 per-reply fees). Adding `Offer` data here and on Pricing.tsx materially helps AI answer-engine citation (Realtrix's actual GEO goal per the pricing/positioning docs).

**MISSING — No schema at all on:**
- `Pricing.tsx` — should carry `Service`/`OfferCatalog` with `Offer` entries for the two infra tiers + reply-fee tiers.
- `src/pages/tools/*.tsx` (ROICalculator, BenchmarkChecker, TAMEstimator) and `Tools.tsx` — free interactive calculators are a textbook `WebApplication`/`SoftwareApplication` (`applicationCategory: BusinessApplication`) opportunity; currently they inherit the generic `Organization` fallback instead.
- `About.tsx` — has 3 named founders with roles/bios (Trevor Ryan, Brendon Barnard, Tristan Newton) that could be `Person` entries under `Organization.employee`/`founder`, and the page itself would benefit from `AboutPage`.
- All FAQ-shaped content (if any exists in service/tips copy) — per current Google policy (FAQ rich results retired sitewide May 7 2026), do **not** add `FAQPage` for SERP purposes. If any page has genuine Q&A blocks, `FAQPage` markup is still worth keeping/adding as an **Info-priority, AI/LLM-citation aid only** — not a ranking play. No `HowTo` recommended anywhere (deprecated Sept 2023) even though several tip articles are structured as numbered steps/frameworks.
- Site-wide `BreadcrumbList` — only OutreachHub and LegalHub have it. Service pages, tool pages, and article pages have none.
- `WebSite` schema with `SearchAction` — not present anywhere (optional, low priority, only matters if the site has real on-site search).

## 3. Missing-schema recommendation matrix

| Page type | Add | Priority |
|---|---|---|
| Service pages (5) | Extend existing `Service` with `offers`, `areaServed`, `serviceType`; add `BreadcrumbList` | High |
| Outreach tips articles (13) | `Article`/`BlogPosting` + per-article title/description/canonical via `<SEO>`; `BreadcrumbList` | Critical (currently zero coverage) |
| OutreachHub / LegalHub | Move existing schema into `<SEO>`/Helmet for consistency; keep `BreadcrumbList` + `CollectionPage` | Medium |
| Tools hub + 3 tool pages | `WebApplication` (or `SoftwareApplication`) per tool, `BreadcrumbList` on hub | High (GEO/AI-citation value for free tools) |
| Pricing | `Service` + `OfferCatalog`/`Offer` array with real numbers | High |
| About | `AboutPage`, `Person` entries for founders | Low/Medium |
| Home | Keep single `Organization` (in `index.html` only); dedupe against `SEO.tsx` default | Medium (fix duplication) |
| Any genuine Q&A page | `QAPage` (not `FAQPage`) if built | Low |
| Any existing/future FAQ content | `FAQPage` acceptable only as AI-citation aid, not for SERP — Info priority | Info |

---

## 4. Generated JSON-LD

### 4a. Service page — `src/pages/services/DoneForYou.tsx`

Enhances the existing `Service` block with `Offer`/`areaServed`/`serviceType`, using real numbers from `src/pages/Pricing.tsx` (Base tier $150/mo infra, Growth tier $300/mo infra, per-reply fees $30–$100, $0 for non-billable). Drop this into the `schema` prop of `<SEO>`:

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Done-For-You Cold Email Systems",
  "serviceType": "Managed cold email outbound",
  "provider": {
    "@type": "Organization",
    "name": "Realtrix",
    "url": "https://realtrix.org"
  },
  "description": "Full-service cold email infrastructure, sourcing, sequencing, and AI-qualified reply management. We handle domain setup, list building, copywriting, and inbox management.",
  "url": "https://realtrix.org/services/done-for-you-cold-email",
  "areaServed": {
    "@type": "Country",
    "name": "Worldwide"
  },
  "audience": {
    "@type": "BusinessAudience",
    "audienceType": "B2B SaaS and automation companies"
  },
  "offers": {
    "@type": "AggregateOffer",
    "priceCurrency": "USD",
    "lowPrice": "150",
    "highPrice": "300",
    "offerCount": "2",
    "offers": [
      {
        "@type": "Offer",
        "name": "Base infrastructure tier",
        "price": "150",
        "priceCurrency": "USD",
        "priceSpecification": {
          "@type": "UnitPriceSpecification",
          "price": "150",
          "priceCurrency": "USD",
          "unitText": "MONTH"
        },
        "description": "Domains ($20), mailboxes & warmup ($50), sending platform ($40), sourcing & verification ($25), AI reply processing ($15)."
      },
      {
        "@type": "Offer",
        "name": "Growth infrastructure tier",
        "price": "300",
        "priceCurrency": "USD",
        "priceSpecification": {
          "@type": "UnitPriceSpecification",
          "price": "300",
          "priceCurrency": "USD",
          "unitText": "MONTH"
        },
        "description": "Domains ($40), mailboxes & warmup ($100), sending platform ($80), sourcing & verification ($50), AI reply processing ($30)."
      }
    ]
  }
}
```

Also add a `BreadcrumbList` alongside it (Helmet accepts multiple `<script>` tags, so add a second block or pass an array — see note in section 2):

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://realtrix.org" },
    { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://realtrix.org/services" },
    { "@type": "ListItem", "position": 3, "name": "Done-For-You Cold Email Systems", "item": "https://realtrix.org/services/done-for-you-cold-email" }
  ]
}
```

(Note: there is no `/services` index route in `App.tsx` — either add one or drop that intermediate breadcrumb level and go straight Home → page.)

### 4b. Blog article — `src/pages/outreach/tips/ColdEmailSubjectLines.tsx`

Requires wiring `ArticleLayout.tsx` (or each tip file) to render `<SEO>` with a schema prop. Recommended `Article` block using the real title/description/TL;DR from the file:

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "How to Write Cold Email Subject Lines",
  "description": "Subject lines that get opened — patterns, anti-patterns, and the data behind what works.",
  "url": "https://realtrix.org/outreach/tips/cold-email-subject-lines",
  "author": {
    "@type": "Organization",
    "name": "Realtrix",
    "url": "https://realtrix.org"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Realtrix",
    "logo": {
      "@type": "ImageObject",
      "url": "https://realtrix.org/logo.png"
    }
  },
  "articleSection": "Cold Email",
  "keywords": ["cold email subject lines", "email open rates", "cold outreach copywriting"],
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://realtrix.org/outreach/tips/cold-email-subject-lines"
  }
}
```

Note: the article files have no visible publish/update date anywhere in the source (no `datePublished`/`dateModified` field, no CMS timestamp). Do **not** invent one — add `datePublished`/`dateModified` in ISO 8601 (e.g. `"2026-07-18"`) once a real date source exists (git log commit date for the file, or a CMS field), then include it here. Shipping this schema without a date is valid; shipping a fabricated date is not.

Pair with a `BreadcrumbList`:

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://realtrix.org" },
    { "@type": "ListItem", "position": 2, "name": "Outreach Hub", "item": "https://realtrix.org/outreach" },
    { "@type": "ListItem", "position": 3, "name": "How to Write Cold Email Subject Lines", "item": "https://realtrix.org/outreach/tips/cold-email-subject-lines" }
  ]
}
```

**Implementation note:** the cleanest fix is to extend `ArticleLayoutProps` with an optional `path: string` (route path) and `keywords?: string[]`, then have `ArticleLayout.tsx` itself render one `<SEO>` call generating `Article` + `BreadcrumbList` from `title`/`description`/`path` — this fixes all 13 articles in one file edit instead of 13.

### 4c. Tools pages — `src/pages/tools/ROICalculator.tsx`, `BenchmarkChecker.tsx`, `TAMEstimator.tsx`, and `Tools.tsx` hub

`WebApplication` for each calculator (free, in-browser, no login — `BusinessApplication` category, `price: 0`):

**ROICalculator.tsx:**
```json
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Cold Email ROI Calculator",
  "url": "https://realtrix.org/tools/roi-calculator",
  "description": "Calculate your projected meetings, pipeline value, and ROI from cold email outreach.",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Any (web browser)",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "provider": {
    "@type": "Organization",
    "name": "Realtrix",
    "url": "https://realtrix.org"
  }
}
```

**BenchmarkChecker.tsx:**
```json
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Cold Email Benchmark Checker",
  "url": "https://realtrix.org/tools/benchmark-checker",
  "description": "Compare your cold email open rate, bounce rate, and reply rate against Realtrix industry benchmarks.",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Any (web browser)",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "provider": {
    "@type": "Organization",
    "name": "Realtrix",
    "url": "https://realtrix.org"
  }
}
```

**TAMEstimator.tsx:**
```json
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "TAM Estimator",
  "url": "https://realtrix.org/tools/tam-estimator",
  "description": "Estimate your total addressable market for cold email outreach by industry, company size, and region.",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Any (web browser)",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "provider": {
    "@type": "Organization",
    "name": "Realtrix",
    "url": "https://realtrix.org"
  }
}
```

**Tools.tsx hub** — `CollectionPage`/`ItemList` referencing the 3 tools (mirrors the pattern already used in `OutreachHub.tsx`):
```json
{
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "Tools & Track Record",
  "description": "Free tools to evaluate your cold email performance: ROI calculator, benchmark checker, and TAM estimator.",
  "url": "https://realtrix.org/tools",
  "mainEntity": {
    "@type": "ItemList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "ROI Calculator", "url": "https://realtrix.org/tools/roi-calculator" },
      { "@type": "ListItem", "position": 2, "name": "Benchmark Checker", "url": "https://realtrix.org/tools/benchmark-checker" },
      { "@type": "ListItem", "position": 3, "name": "TAM Estimator", "url": "https://realtrix.org/tools/tam-estimator" }
    ]
  }
}
```

### 4d. Pricing page — `src/pages/Pricing.tsx`

`Service` + `OfferCatalog` covering both the infra tiers and the per-reply fee schedule (`TIERS`, `FEE_ROWS` in the source — no placeholder values, all real):

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Realtrix Cold Email Infrastructure",
  "provider": {
    "@type": "Organization",
    "name": "Realtrix",
    "url": "https://realtrix.org"
  },
  "description": "Transparent pricing for cold email infrastructure. Pay infrastructure at cost, and a performance fee only when a classified reply lands.",
  "url": "https://realtrix.org/pricing",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Realtrix Pricing",
    "itemListElement": [
      {
        "@type": "Offer",
        "name": "Base infrastructure tier",
        "price": "150",
        "priceCurrency": "USD",
        "priceSpecification": { "@type": "UnitPriceSpecification", "price": "150", "priceCurrency": "USD", "unitText": "MONTH" }
      },
      {
        "@type": "Offer",
        "name": "Growth infrastructure tier",
        "price": "300",
        "priceCurrency": "USD",
        "priceSpecification": { "@type": "UnitPriceSpecification", "price": "300", "priceCurrency": "USD", "unitText": "MONTH" }
      },
      {
        "@type": "Offer",
        "name": "Meeting Request fee",
        "price": "100",
        "priceCurrency": "USD",
        "description": "Qualified meeting booked"
      },
      {
        "@type": "Offer",
        "name": "Interested reply fee",
        "price": "60",
        "priceCurrency": "USD",
        "description": "Positive reply, not yet a meeting"
      },
      {
        "@type": "Offer",
        "name": "Info Request fee",
        "price": "40",
        "priceCurrency": "USD",
        "description": "Asks for details, pricing, or a one-pager"
      },
      {
        "@type": "Offer",
        "name": "Contact Later fee",
        "price": "30",
        "priceCurrency": "USD",
        "description": "Replied but deferred"
      },
      {
        "@type": "Offer",
        "name": "OOO / Not Interested",
        "price": "0",
        "priceCurrency": "USD",
        "description": "Not billable — auto-replies, negatives, OOO"
      }
    ]
  }
}
```

---

## 5. Priority summary

1. **Critical:** Wire `<SEO>` (title/description/canonical + `Article` schema) into `ArticleLayout.tsx` — currently zero metadata on 13 pages.
2. **High:** Add `WebApplication` schema to the 3 tool pages + `Tools.tsx` hub.
3. **High:** Add `Offer`/`OfferCatalog` to Pricing.tsx and enhance the 5 existing `Service` blocks with real offer data.
4. **Medium:** Fix the duplicate-`Organization` issue between `index.html` and `SEO.tsx`'s `DEFAULT_SCHEMA`.
5. **Medium:** Move OutreachHub/LegalHub schema from raw body scripts into the `<SEO>`/Helmet pattern; add site-wide `BreadcrumbList` to service, tool, and article pages.
6. **Low:** `AboutPage`/`Person` schema for the 3 named founders on About.tsx.
7. **Info only:** If FAQ-style content exists or is added, use `FAQPage` purely as an AI/LLM-citation aid (no SERP benefit post-May 2026); use `QAPage` instead for genuine user Q&A. No `HowTo` anywhere (deprecated).

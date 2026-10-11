# SITE-TRACKER: realtrix.org (repo realtrix-remaster)

## Open for Trevor (blocks push)
- None.

## Open for Trevor (not blocking)
- POPIA Information Officer + legal entity name in Privacy Policy.
- Quiz has no explicit consent checkbox for personal data sent to Make.com.

- Prerender/SSR decision, real 1200x630 OG image (current og/logo files are one 1376x768 PNG), soft-404 fix on host, article bylines/dates, em dashes in existing meta titles, /pricing still routed/listed, Search Console submit. Detail: [seo-audit/seo-2026-10-11.md](seo-audit/seo-2026-10-11.md).

## Log
- 2026-10-11: GA4 `G-L3FSEFCX8C` hard-coded in `index.html` (Consent Mode v2, default denied, upgraded on Accept). `ConsentBanner` added, SPA page_view on route change. Policies synced. Audit: [audits/compliance-2026-10-11.md](audits/compliance-2026-10-11.md). Domain: LIVE realtrix.org.
- 2026-10-11 SEO + GEO pass (LIVE realtrix.org; local edits only, not deployed): keyword research re-run via WebSearch. Added service/tools links to homepage footer, llms.txt, extra AI crawlers in robots.txt, sitemap lastmod for edited pages, Article schema mainEntityOfPage/image. No health score computed. Audit: [seo-audit/seo-2026-10-11.md](seo-audit/seo-2026-10-11.md).
- 2026-10-11: GA4 switched to post-consent injection (script loaded by `ConsentBanner` only after Accept; Decline sets ga-disable and clears _ga cookies). Removed hard-coded tag from `index.html`.

# Realtrix-Remaster SEO Action Plan

**Status (2026-07-18, night pass): items 1-7, 9, 10, 13, 14 are DONE. See bottom of file for what's still open.**


Consolidated from: `findings/technical.md`, `findings/content.md`, `findings/schema.md`, `findings/sxo.md`, `CONTENT-BRIEFS.md`, `SEO-STRATEGY.md`. Technical health score from audit: **38/100** (pre-launch, expected — this is the fix list to get it launch-ready).

## Critical — fix before launch (these break indexing entirely)

1. **23 of 34 routes never mount the SEO/Helmet component** — every one of the 13 outreach/tips articles, all 6 legal pages, both hub pages (`OutreachHub`, `LegalHub`), and `/readiness-quiz` silently inherit `index.html`'s title/description/canonical. Google would see 23 pages all canonicalizing to `/`. Fix: make title/description/canonical required props on `ArticleLayout.tsx` and `LegalLayout.tsx`, pass real per-page values.
2. **`DeliverabilityConsulting.tsx` canonical points to a dead URL** — set to `/services/deliverability-consulting`, real route is `/services/email-deliverability-consulting`. Fix: correct the canonical string (this also affects the content brief's target URL — see `CONTENT-BRIEFS.md`).
3. **Homepage footer uses `href="#"` dead links** for About/Careers/Blog/Privacy/Terms/Security instead of the site's own working `PublicFooter` component that every other page uses correctly. The homepage is the highest-authority page — this wastes its link equity. Fix: swap in `PublicFooter`.
4. **`og-image.jpg`, `logo.png`, `og-default.png` don't exist in `public/`** despite being referenced site-wide in OG tags and JSON-LD. Broken social share previews + broken Organization schema logo everywhere. Fix: add the actual image files.

## High — fix in week 1-2

5. Decide CSR-only vs. prerendering (vite-plugin-ssg or static export) before launch — pure client-rendered SPA risks non-JS crawlers (Bing, some AI crawlers, social unfurl bots) seeing an empty shell. Flagged as a real decision point, not auto-fixed.
6. `sitemap.xml` has zero `<lastmod>` on all 33 URLs — add real last-modified dates.
7. All 13 outreach/tips articles have zero `Article` schema, zero byline, zero publish/update date. Real founders exist on `About.tsx` — use them as bylines. Add `Article` JSON-LD (snippet template in `findings/schema.md`).
8. 4 of 5 service pages hide pricing behind "Book a Call" while real ranking competitors (Cleverly, Effiqs, Belkins, Callbox — see `findings/sxo.md`) publish price ranges up front. `multi-touch-outreach` is the one page doing this right — use it as the template. This is a business/positioning call, not just a copy fix — flag for Trevor.
9. Resolve the pricing-model inconsistency: `MultiTouchOutreach.tsx` shows a flat $1,500/mo price, which contradicts the "no retainers, pay-per-reply only" positioning on the other 4 service pages. Either explain the pricing-model difference on-page or fix the inconsistency — business decision, not a code fix.
10. Zero contextual internal links from the 13 tip articles to the service pages they support (e.g. the bad-data-quality article never links to Deliverability Consulting), and only 2 of 5 service pages link anywhere. Add the internal links per `CONTENT-BRIEFS.md`'s "Internal Linking Opportunities" sections.
11. `/services/cold-email-automation-setup` is a genuine page-type mismatch — Google's real top 10 for its target keyword is dominated by SaaS tool/product pages and "best tools" listicles (Instantly, Smartlead, Saleshandy), not consultative agency pages. Current page assumes the visitor already chose "agency over software" — needs a different content angle (see brief).

## Medium — fix weeks 2-4

12. All 5 service pages are under the 800-word topical-coverage floor, missing FAQs and case-study/testimonial proof. `ColdEmailAutomationSetup.tsx` is the thinnest (~250 words, bullet fragments only). Full winning outlines with word counts + section-by-section guidance are in `CONTENT-BRIEFS.md`.
13. Add missing schema per `findings/schema.md`: `Service`+`Offer` on service pages, `WebApplication` on the 3 tools pages + `ItemList` on `/tools` hub, `Service`+`OfferCatalog` on `/pricing`.
14. Tools pages (ROI/Benchmark/TAM) drop the "cold email" qualifier from their H1s that competitors include — fix H1 copy for keyword clarity.

## Low / ongoing (Phase 3+ per SEO-STRATEGY.md)

15. 3-5 case studies once real client results exist — biggest E-E-A-T gap on the whole site, no `/work` or `/case-studies` route exists yet.
16. Original data report ("State of Cold Email Reply Rates") — highly citable by AI Overviews/Perplexity, also feeds real numbers into the Benchmark Checker tool instead of assumed benchmarks.
17. 2 outreach articles/month expanding the long-tail cluster once launched.

## Night-pass update (2026-07-18, later same day)

Items 1, 2, 3, 4 (placeholder logo only), 6, 7, 9, 10, 13, 14 are now DONE — see git diff / file timestamps in `src/pages/services/`, `src/pages/outreach/tips/`, `src/pages/legal/`, `src/components/SEO.tsx`, `public/sitemap.xml`, `public/og-*`.

Item 11 is DONE specifically for `/services/cold-email-automation-setup`: consequence sentences on each infra card, a setup-timeline section, a 5-question FAQ, a bridge paragraph linking to done-for-you/deliverability/ROI-calculator, and updated meta title/description. Word count went from ~250 to ~1,100. The other 4 pages in item 12 still need their content-brief outlines applied.

Item 8 is partially done: added the real KPRM testimonial + a `/pricing` link to DoneForYou, B2BLeadGen, and DeliverabilityConsulting. Did NOT put a literal price range on these pages — Realtrix's actual model (infra-at-cost + variable per-reply fee) doesn't reduce to a clean "starting at $X" the way competitors' flat retainers do, so linking to the real `/pricing` breakdown was the more honest fix than inventing a number. Still an open SXO gap if Trevor wants a literal number on the page.

Item 9 is DONE: `MultiTouchOutreach.tsx`'s flat $1,500/mo price is gone, replaced with the same infra-at-cost + pay-per-reply story as every other service page, linking to `/pricing`.

Item 5 (CSR vs SSR/prerendering) and items 15-17 (case studies, original data report, ongoing content cadence) are still open — architectural/business decisions, not mechanical fixes.

## Reference files in this folder
- `SEO-STRATEGY.md` — 90-day strategy, keyword targets, KPIs
- `CONTENT-BRIEFS.md` — full content briefs (competitor analysis, outlines, meta tags) for all 5 service pages
- `findings/technical.md`, `findings/content.md`, `findings/schema.md`, `findings/sxo.md` — full per-category audit detail with evidence

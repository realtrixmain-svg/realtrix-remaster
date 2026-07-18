# Realtrix SEO Strategy (90-Day)

Business: Realtrix — managed B2B cold-email outbound agency, pay-per-reply pricing. Target buyer: B2B SaaS/automation founders and sales leaders who care about deliverability, reply rates, pipeline. Site: pre-launch remaster (repos/realtrix-remaster), canonical domain realtrix.org.

## Competitors (category, not scraped — no live SERP data available this pass)
Direct: Instantly, Smartlead, Reply.io "managed" tiers, Lemlist, boutique cold-email agencies (e.g. Belkins, SalesRoads clones). Indirect: general B2B lead-gen agencies. Realtrix's differentiators to lean on in copy/schema: **pay-per-reply pricing** (most competitors charge flat retainer regardless of results) and **AI-qualified replies** (most competitors just book any reply as a "lead"). These two facts are the wedge — every service page and the homepage should say them in the first 100 words, because they're the actual answer to "why Realtrix vs X" searches and the thing worth citing in an AI Overview.

## Site architecture (already built — matches agency.md template well)
```
/                          Home
/about
/pricing
/services/
  done-for-you-cold-email
  cold-email-automation-setup
  email-deliverability-consulting
  b2b-lead-generation
  multi-touch-outreach
/tools/
  roi-calculator
  benchmark-checker
  tam-estimator
/outreach/                (blog/insights hub — ~13 tip articles)
/readiness-quiz
/legal/*
```
Gap vs template: no `/case-studies` or `/work`, no `/industries` vertical pages, no team/author bios. These are the highest-leverage additions (see Content Strategy).

## Keyword targets by page (primary intent, no live volume data — validate with GSC/DataForSEO once site is live)
| Page | Primary target | Intent |
|---|---|---|
| Home | "managed cold email outbound", "cold email agency pay per reply" | Navigational/brand + comparison |
| /services/done-for-you-cold-email | "done for you cold email service" | Transactional |
| /services/cold-email-automation-setup | "cold email automation setup" | Transactional |
| /services/email-deliverability-consulting | "email deliverability consulting", "cold email deliverability agency" | Transactional |
| /services/b2b-lead-generation | "b2b lead generation service" | Transactional |
| /services/multi-touch-outreach | "multi touch outreach agency" | Transactional |
| /tools/roi-calculator | "cold email roi calculator" | Tool/informational (link-bait) |
| /tools/benchmark-checker | "cold email benchmarks", "cold email reply rate benchmark" | Tool/informational |
| /tools/tam-estimator | "tam estimator tool b2b" | Tool/informational |
| /outreach articles | long-tail how-to ("cold email subject lines", "domain warmup", "inbox placement") | Informational, top-of-funnel |

## Phase 1 — Foundation (Weeks 1-4)
- Fix technical findings from audit (canonical per-route, per-page meta, sitemap accuracy) — see seo-audit/findings/technical.md
- Add per-page JSON-LD: ProfessionalService (home), Service (each service page), Article (each outreach tip) — see seo-audit/findings/schema.md
- Google Search Console + GA4 wired up at launch (not yet possible pre-deploy, flag for launch checklist)
- Confirm SSR/prerendering plan — plain client-rendered Vite SPA is a real indexability risk (see technical findings); decide before launch whether to add prerendering (e.g. vite-plugin-ssg or a static export) rather than shipping pure CSR

## Phase 2 — Expansion (Weeks 5-12)
- Write/expand thin service pages to 800+ words each with methodology, deliverables, CTA (content audit will flag which are thin)
- Add 3-5 case studies once real client results exist (`/work`) — biggest E-E-A-T gap, do this as soon as first client results land, don't wait for "enough" of them
- Add author identity to /outreach articles (byline + short bio with real credibility — Trevor's name/LinkedIn) — currently anonymous-feeling per content audit
- Internal linking pass: every service page → relevant tool + 2-3 relevant outreach articles; every outreach article → the service page it supports

## Phase 3 — Scale (Weeks 13-24)
- Publish 2 outreach articles/month expanding the long-tail cluster (subject lines, deliverability, personalization already covered — add: cold email compliance/CAN-SPAM, outbound vs inbound cost comparison, agency vs in-house SDR cost breakdown)
- Original data: aggregate anonymized client reply-rate data into one "State of Cold Email Reply Rates" report — highly citable by AI Overviews/Perplexity, and feeds the benchmark-checker tool as real data instead of assumed benchmarks
- Light backlink outreach: guest posts on B2B SaaS/growth blogs, directory listings (Clutch, G2 if applicable)

## Phase 4 — Authority (Months 7-12)
- Thought leadership: original research updated quarterly, contributed articles
- Expand /industries if a vertical (e.g. B2B SaaS specifically) shows disproportionate traffic/conversion
- Continuous CWV + content refresh cycle

## KPI targets
| Metric | Baseline (pre-launch) | 3mo | 6mo | 12mo |
|---|---|---|---|---|
| Indexed pages | 0 | 25+ | 35+ | 45+ |
| Organic sessions/mo | 0 | 200-500 | 1,000-2,000 | 4,000-8,000 |
| Ranking keywords (any position) | 0 | 30-50 | 100-150 | 300+ |
| Organic form/booking conversions | 0 | 2-5/mo | 10-15/mo | 30+/mo |

These are directional, not data-backed — recalibrate after 30 days of real GSC data.

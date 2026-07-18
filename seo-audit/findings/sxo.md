# Search Experience Optimization (SXO) Findings — Realtrix

Scope: 5 service pages + Tools hub + 3 calculator tools. Source read directly from
`src/pages/services/*.tsx` and `src/pages/tools/*.tsx` (dev server not reachable via
the SSRF-safe renderer from this sandbox, so analysis is based on parsed JSX/SEO
component output rather than a rendered DOM capture — see Limitations).

SERP analysis via live web search (WebSearch tool), 6 keyword clusters, ~8-10 results
each. Page-type taxonomy: `skills/seo-sxo/references/page-type-taxonomy.md` (via
claude-seo plugin cache).

---

## Executive Summary — Lead Finding

**The core SXO problem is not page-type mismatch, it's proof-and-pricing mismatch.**
4 of 5 service pages are correctly typed as **Service Pages** (matches SERP dominant
type for their keywords) but every single one fails the taxonomy's "required elements"
test for that type: **none have a case study, testimonial, client logo, or reviewer
quote**, and **4 of 5 hide price entirely** behind "Book a Call" / "Contact for
Pricing" — while the actual page-1 competitors for these exact keywords
(Cleverly, Effiqs, Maildoso, Belkins, Callbox, MailAdept) publish price ranges,
timelines, or "starting at" anchors up front. One page (`cold-email-automation-setup`)
has a genuine page-type mismatch: the SERP is dominated by SaaS tool/product pages
(Instantly, Smartlead, Saleshandy) and instructional blog content, not consultative
agency service pages.

---

## Page-by-Page Analysis

### 1. `/services/done-for-you-cold-email` — target: "done for you cold email"

- **SERP dominant type:** Service Page (Effiqs, Cleverly, Maildoso, Reachly, DFYmeetings)
  — all show pricing ranges ($1,500–$5,000+/mo), timelines (2–4 weeks to first replies,
  3–4 weeks warmup), and case-study/proof sections. Confidence: ~85%.
- **Target page type:** Service Page. **ALIGNED on type.**
- **Mismatch severity: MEDIUM (content-depth, not type)**
- Evidence: page has "Why Companies Fail at DIY" (pain points) + "What's Included"
  (6 items) + CTA — solid structure — but **zero pricing** anywhere on page (competitors
  anchor at $1,500–$5,000/mo), **zero timeline** (SERP consensus: 2–4 weeks to
  replies), and **zero case studies/testimonials/client logos**.
- User story: *As a budget-conscious SaaS founder, I want to know roughly what this
  costs before booking a call, because I don't want to waste 30 minutes on a sales
  pitch I can't afford, but I'm blocked by price sensitivity — no cost anchor anywhere
  on the page.* (Source: SERP pricing consistently shown by Cleverly/Effiqs/Maildoso)

### 2. `/services/cold-email-automation-setup` — target: "cold email automation setup"

- **SERP dominant type:** mixed **Tool/Product pages** (Instantly.ai, Smartlead,
  Saleshandy — software that includes DFY setup as an add-on) + **Blog/Hybrid**
  instructional content ("Cold Email Setup Process" guide, "18 Best Cold Email
  Automation Tools" listicles). Confidence: ~70% Product/Tool, ~30% Blog.
- **Target page type:** pure **Service Page** (methodology cards, no software, no
  comparison, no listicle framing).
- **Mismatch severity: HIGH — this is the primary finding for this page.**
- The keyword pulls searchers who are evaluating *software with setup included*
  (Saleshandy sells domains + auto-configures SPF/DKIM/DMARC inside its product) or
  comparing tools. A pure consultative service page with no tool comparison, no
  software walkthrough, and no "vs DIY-with-a-tool" framing under-serves that intent.
  The on-page CTA to `/readiness-quiz` is the right instinct (an interactive,
  tool-like artifact) but the quiz lives off-page — it should be embedded/previewed
  above the fold to capture Tool-seeking searchers, not just linked twice as text CTAs.
- User story: *As a technical evaluator comparing DIY software (Instantly/Smartlead)
  vs. a managed setup, I want to see how a done-for-you setup differs from just buying
  the tool myself, because I don't know if I need a person or just better software,
  but I'm blocked by the page assuming I've already decided to hire an agency.*
  (Source: SERP mix of tool platforms + "DFY vs DIY" framing in results)

### 3. `/services/email-deliverability-consulting` — target: "email deliverability consulting"

- **SERP dominant type:** Service Page, several tool-backed (ZeroBounce sells a
  verification product wrapped in consulting; MailAdept/Unspam are pure consulting).
  Confidence: ~75%.
- **Target page type:** Service Page. **ALIGNED on type.**
- **Mismatch severity: LOW-MEDIUM**
- Strongest of the 5 structurally (6-item "What We Audit" grid maps well to PAA-style
  evaluative intent), but the "Pricing" section literally says "Audit pricing depends
  on your current infrastructure size... Contact us for a custom quote" — zero
  anchor, zero range. No case study / before-after metric (e.g., "open rate 12% → 41%
  in 3 weeks") despite the page's own copy promising "measurable improvement within
  2–4 weeks" — that claim is unsubstantiated without a linked proof point.
- User story: *As a risk-averse decision maker whose emails are already in spam, I
  want proof this actually gets fixed, because I've likely already tried a DIY fix
  that failed, but I'm blocked by a trust gap — no before/after case study anywhere
  on the page.* (Source: PAA-style evaluative framing dominant on competitor pages;
  taxonomy requires "at least one case study or testimonial" for Service Page.)

### 4. `/services/b2b-lead-generation` — target: "b2b lead generation service"

- **SERP dominant type:** Service Page (Belkins, Callbox, SalesRoads, MarketJoy,
  memoryBlue) — agency homepages with process + dedicated-team framing.
  Confidence: ~90%.
- **Target page type:** Service Page. **ALIGNED on type.**
- **Mismatch severity: MEDIUM**
- 5-step process ("How It Works") is on-brand for the SERP pattern and the
  "what counts as a qualified lead" section is a genuinely strong differentiator
  (directly answers a likely PAA: "how do lead-gen services define a qualified
  lead"). But again: no testimonials, no client logos, no pricing (not even a
  "starting at" figure), and CTA is a single generic "Book a Call" — no lower-friction
  option (e.g., see sample lead report, view pricing tiers) for earlier-stage
  visitors.
- User story: *As an SMB owner evaluating outsourced lead-gen vs. hiring an SDR, I
  want evidence this isn't vaporware, because I've been burned by "leads" that were
  just contact-list dumps, because trust in this category is low, but I'm blocked by
  zero social proof on the page.* (Source: category-wide emphasis on "dedicated SDR
  teams" / "qualified meetings" as trust language across Belkins/Callbox/SalesRoads)

### 5. `/services/multi-touch-outreach` — target: "multi-touch outreach" / "multi-channel B2B outreach"

- **SERP dominant type:** Service Page + long-form educational guides ("Ultimate
  Guide to Multi-Touch Cadence"). Confidence: ~65% Service, ~35% Hybrid/Blog.
- **Target page type:** **Hybrid (Service + Content)** — cadence table doubles as
  educational content, pricing tiers shown. **Best-aligned page in the set.**
- **Mismatch severity: ALIGNED / LOW**
- This is the only page that does what competitors do: shows a concrete price
  ($1,500/mo Standard, Enterprise on request), a literal day-by-day cadence table
  (matches the "how to build a multi-touch cadence" educational intent), and a
  2-tier comparison (Standard vs Enterprise) — close to a lightweight Comparison
  Page pattern. Still missing: testimonials/case studies (same systemic gap as
  every other service page) and no FAQ addressing likely PAA ("does multi-touch
  outreach work for cold outbound," "how many touches before a lead converts" —
  SERP snippet literally states "6–8 touchpoints" and "8–12 touches over 4–6 weeks,"
  a stat this page could own but doesn't state anywhere in visible copy).
- **Use this page's structure (pricing tiers + concrete cadence table) as the
  template to retrofit onto the other 4 service pages.**

### 6. `/tools`, `/tools/roi-calculator`, `/tools/benchmark-checker`, `/tools/tam-estimator`

- **SERP dominant type for "cold email ROI calculator":** functional **Tool** pages
  (ListKit, ScaledMail, ColdMail, Beanstalk, Reachoutly) — all interactive
  calculators, several paired with a "how to measure ROI" explainer directly below
  the tool. Confidence: ~90% Tool.
- **Target page type:** Tool. **ALIGNED on type** — all 3 calculators are genuinely
  functional, above-the-fold, no login wall. This is the strongest-typed cluster on
  the site.
- **Mismatch severity: LOW, but real content-depth and schema gaps:**
  1. **No WebApplication/SoftwareApplication schema** on any of the 3 tool pages
     (checked `<SEO schema={...}>` prop — only `services/*.tsx` pass a schema
     object; all 3 tools pages call `<SEO title description canonical />` with no
     `schema` prop at all). This is a required element in the Tool taxonomy and a
     clear, cheap fix.
  2. **No supporting content or FAQ below the tool.** Competitor tool pages
     (ListKit, ColdMail) pair the calculator with a short methodology/FAQ block —
     Realtrix's 3 tools go straight from output card to disclaimer to footer, with
     no "how this is calculated" or "what's a good reply rate" content that would
     also capture longer-tail informational queries.
  3. **Weak keyword-to-H1 match:** `/tools/roi-calculator`'s H1 is "ROI Calculator"
     (generic) vs. the target keyword "cold email ROI calculator" — every top-10
     competitor result includes the qualifier ("Cold Email ROI Calculator",
     "Email Marketing ROI Calculator") in title/H1. Same pattern on Benchmark
     Checker and TAM Estimator — titles/H1s drop the "cold email" qualifier that
     the SEO `description` prop does include.
  4. Tools hub (`/tools`) itself is a reasonable index page, but the "Track Record"
     stats block (200+ meetings, 40%+ open rate) sits on the calculator index
     without linking to any source/proof — same trust-signal gap as the service
     pages.

---

## SERP Consensus Summary

| Keyword cluster | Dominant page type | Confidence | Target page | Verdict |
|---|---|---|---|---|
| done for you cold email | Service Page | ~85% | DoneForYou.tsx | Aligned type / depth gap |
| cold email automation setup | Tool/Product + Blog | ~70/30% | ColdEmailAutomationSetup.tsx | **HIGH mismatch** |
| email deliverability consulting | Service Page | ~75% | DeliverabilityConsulting.tsx | Aligned / depth gap |
| b2b lead generation service | Service Page | ~90% | B2BLeadGen.tsx | Aligned / depth gap |
| multi-touch outreach | Hybrid (Service+Content) | ~65% | MultiTouchOutreach.tsx | Aligned — best in class |
| cold email ROI calculator | Tool | ~90% | ROICalculator.tsx (+2 others) | Aligned type / schema+content gap |

SERP features observed across all 6 searches: no classic featured snippets surfaced
in the fetched result sets, heavy "best X" listicle presence (esp. automation-setup
and DFY clusters), review/comparison framing dominant for the agency-service
clusters (Belkins/Callbox/Cleverly all lead with differentiation claims), and
consistent price-anchoring by competitors across every commercial-intent cluster.

---

## Systemic Gap Analysis (applies to all 5 service pages, 100-pt scale, illustrative)

Representative page-type score pattern seen across DoneForYou / DeliverabilityConsulting
/ B2BLeadGen (the 3 weakest):

| Dimension | Score | Evidence |
|---|---|---|
| Page Type (0-15) | 12/15 | Correct Service Page type, matches SERP consensus |
| Content Depth (0-15) | 9/15 | Process/audit-item grids present but shallow (1-2 sentences/item), no depth beyond surface bullets |
| UX Signals (0-15) | 10/15 | Clear CTA, hover states, single-column focus; but only one CTA type per page (no low-friction alt) |
| Schema (0-15) | 10/15 | Service schema present and correct; missing FAQPage, Review/AggregateRating |
| Media (0-15) | 3/15 | No images, no video, no diagrams — pure text/color-block design |
| Authority (0-15) | 2/15 | **No testimonials, no case studies, no client logos, no named results anywhere** |
| Freshness (0-10) | 5/10 | No dateModified signal, no visible "updated" content |
| **Total** | **~51/100** | **"Needs Work"** |

MultiTouchOutreach scores meaningfully higher (~68/100) primarily on Content Depth
(cadence table) and UX Signals (pricing tiers) — same Authority gap still applies.

ColdEmailAutomationSetup scores lowest on Page Type dimension specifically (~7/15)
because of the tool/product mismatch described above.

---

## Persona Scores (derived from SERP signal clusters, not assumptions)

| Persona | Journey Stage | SERP Evidence | Relevance | Clarity | Trust | Action | Total | Rating |
|---|---|---|---|---|---|---|---|---|
| Budget-Conscious SaaS Founder | Consideration | Pricing anchors across DFY/lead-gen competitors | 18/25 | 15/25 | 8/25 | 14/25 | 55/100 | Needs Work |
| Technical Evaluator (DIY-vs-managed) | Awareness | Tool/product SERP mix for "automation setup" | 12/25 | 14/25 | 10/25 | 12/25 | 48/100 | Needs Work |
| Risk-Averse Decision Maker (deliverability) | Consideration | "Is X safe/legitimate," trust-badge pattern on competitor pages | 17/25 | 18/25 | 6/25 | 15/25 | 56/100 | Needs Work |
| Comparison Shopper (agency vs agency) | Decision | Belkins/Callbox/SalesRoads differentiation-first framing | 14/25 | 16/25 | 5/25 | 13/25 | 48/100 | Needs Work |
| Data-Driven Analyst (tool user) | Awareness/Consideration | Tool-first SERP for calculator queries | 20/25 | 16/25 | 12/25 | 16/25 | 64/100 | Good |

**Weakest personas (tied): Comparison Shopper (48/100) and Technical Evaluator (48/100).**
- **Comparison Shopper top issue:** no differentiation claim, no named result, no
  proof point anywhere on any service page — this persona bounces to a competitor
  that states a number.
  **Fix:** add one quantified proof line per service page near the hero (e.g., the
  Home.tsx stats — "200+ meetings booked," "40%+ open rate," "0.8% bounce" — already
  exist on Home/Tools but are never repeated on the service pages that actually rank
  for commercial-intent keywords).
- **Technical Evaluator top issue:** ColdEmailAutomationSetup page assumes the
  visitor has already chosen "agency" over "software," per the type mismatch above.
  **Fix:** add a short "Setup service vs. buying a tool" comparison block up top —
  even 3-4 rows (You configure it yourself vs. we configure it for you; $/mo tool
  cost vs. one-time setup fee; time to launch) would close this gap without a full
  rebuild.

### Systemic Issues
- **Trust dimension is the lowest score across every persona (5-12/25)** — the single
  highest-leverage fix on the whole site is adding testimonials/case studies/proof
  points to the 5 service pages and 3 tool pages.
- **Action dimension is uniformly single-path** (one CTA per page, always "Book a
  Call" except the automation-setup page's quiz) — no lower-friction alternate path
  for earlier-journey-stage visitors.

### Priority Actions
1. Add 1 quantified proof line + 1 short testimonial/logo row to all 5 service pages
   (fixes weakest dimension across every persona).
2. Add a DIY-tool-vs-managed-setup comparison block to
   `/services/cold-email-automation-setup` (fixes the one real page-type mismatch).
3. Add price anchors ("starting at $X/mo" or a range) to DoneForYou, B2BLeadGen,
   and DeliverabilityConsulting, matching the MultiTouchOutreach page's pattern.
4. Add WebApplication schema + a short FAQ/methodology block to all 3 `/tools/*`
   pages; tighten H1s to include the full target keyword ("Cold Email ROI
   Calculator" not "ROI Calculator").

---

## Limitations

- The live dev server (localhost:54257) was not fetched with the SSRF-safe renderer
  (`render_page.py`) in this pass — analysis is based on direct reads of the page
  source (`.tsx`) and the `<SEO>` component props (title/description/canonical/schema),
  which is a reliable proxy for rendered `<head>` output for this codebase but does
  not confirm actual rendered DOM, client-side hydration behavior, Core Web Vitals,
  or visual above-the-fold cutoff on real viewports.
- SERP snapshots came from WebSearch (text-summarized results), not a full rendered
  Google SERP capture — exact PAA question text, live ad copy, featured-snippet
  presence, and AI Overview citation were not directly observable and are inferred
  from aggregate result patterns instead of literal SERP screenshots.
- Search volume / ranking-difficulty data was not pulled (no DataForSEO/GSC access
  in this pass) — SERP-consensus confidence percentages above are qualitative
  estimates from the fetched result sets, not statistically derived.
- Wireframes (IST/SOLL) were not generated — not requested for this pass.

---

## Cross-Skill Recommendations

- Trust/E-E-A-T gap (no testimonials/case studies anywhere) → run `/seo content`
  for a deeper content-authority audit.
- Missing WebApplication schema on 3 tool pages, missing FAQPage/Review schema on
  5 service pages → run `/seo schema` to generate the missing JSON-LD.
- Thin content depth on audit-item / included-item grids → run `/seo page` for a
  page-level content-depth audit on the 3 weakest service pages.

Offer: Generate a PDF report? Use `/seo google report`.

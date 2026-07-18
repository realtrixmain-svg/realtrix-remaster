# Content Quality Audit — Realtrix Remaster
Source analyzed: `src/pages/**/*.tsx` (legal pages excluded per scope). Dev server at `localhost:54257` was unreachable from the audit environment (connection refused), so this is a source-level audit; recommend a manual rendered spot-check separately.

---

## 1. Site-wide structural findings (highest priority)

### 1.1 No unique `<title>`/meta description/schema on 15 of ~24 non-legal pages
`grep` for `import SEO` across `src/pages` shows the following pages **never import the `SEO` component** (which is the only thing that writes per-route `<title>`, meta description, canonical, and JSON-LD via `react-helmet-async`):

- `Home.tsx` (partially mitigated — `index.html` has static tags that happen to match the homepage)
- `outreach/OutreachHub.tsx`
- `outreach/ArticleLayout.tsx` (the shared wrapper for all 13 tip articles)
- All 13 files in `outreach/tips/*.tsx`
- `ReadinessQuiz.tsx` (sets `document.title` manually via `useEffect`, but has no meta description/canonical/schema at all)

**Impact:** Every one of the 13 tip articles plus the Outreach Hub renders with the **exact same `<title>` and meta description as the homepage** (`"Realtrix — Managed Cold Email Outbound, Priced on Replies"` / the homepage description, from `index.html`). This is a textbook duplicate-title/duplicate-meta-description problem across 14 URLs, no canonical tags on any of them, and — critically for AI citation readiness — **no `Article`/`BlogPosting`/`FAQPage` schema anywhere on educational content**, no `datePublished`/`dateModified`, and no `author` field. LLM answer engines and Google's helpful-content signals both lean heavily on structured authorship/freshness metadata for exactly this content type; right now these pages are structurally indistinguishable from the homepage to a crawler reading `<head>`.

**Fix:** Have `ArticleLayout.tsx` accept `canonical`/`schema` props and render an `<SEO>` block (title = article title, description = article description, canonical = `/outreach/tips/<slug>`, schema = `Article`/`BlogPosting` with `headline`, `description`, `datePublished`, `dateModified`, `author: {"@type":"Organization","name":"Realtrix"}` or a named author). Do the same for `OutreachHub.tsx` (it already builds `BREADCRUMB_SCHEMA`/`PAGE_SCHEMA` as raw `<script>` tags but never sets title/description via Helmet — add `<SEO>` there too). Add `<SEO>` to `Home.tsx` explicitly rather than relying on `index.html` fallback (fragile — any future route added to the SPA without its own `SEO` call will silently inherit the homepage's tags).

### 1.2 No author bylines or publish/update dates anywhere on the outreach content
None of the 13 tip articles, nor `ArticleLayout.tsx`, render an author name, avatar, or publish/last-updated date in the visible UI (not just missing from schema — genuinely absent from the page). Per Sept 2025 QRG, this is a direct Experience/Expertise/Trustworthiness gap: a reader (or an AI crawler) has no way to attribute the advice to a real practitioner or judge its currency. Combined with 1.1's missing `datePublished`, the content has **zero freshness signal** — Google and AI engines can't tell if this is current or three years stale.

**Fix:** Add a byline row to `ArticleLayout.tsx` (e.g. "By [Founder Name], Realtrix — Updated [date]") pulling from the three real founders already profiled on `About.tsx` (Trevor Ryan, Brendon Barnard, Tristan Newton). This is cheap and immediately fixes both the visible-trust gap and pairs with the schema `author` fix above.

### 1.3 Zero contextual internal links from tip articles into service/pricing pages
`grep -rn "Link to=\|<a href=" src/pages/outreach/tips/*.tsx` returns **no matches**. All 13 articles end at the generic `ArticleLayout` "Book a Call" CTA block and never link out to the specific service page their topic maps to. Examples of missed, obvious links:
- `BadData.tsx` (data hygiene) → should link to `DeliverabilityConsulting.tsx` or `B2BLeadGen.tsx` (sourcing/verification)
- `DomainWarmup.tsx` → should link to `ColdEmailAutomationSetup.tsx` (warmup is literally card #2 on that page) or `DeliverabilityConsulting.tsx`
- `ReplyTriageSystem.tsx` / `HandlingReplies.tsx` / `SignalsOverGuessing.tsx` → should link to the AI reply-classification angle on `Home.tsx`/`DoneForYou.tsx`
- `PersonalizationAtScale.tsx` / `PersonalizationBoundaries.tsx` / `FirstLineRule.tsx` / `ColdEmailSubjectLines.tsx` → should link to `DoneForYou.tsx` ("Custom Copywriting")

This is a real topical-authority and PageRank-flow miss: 13 pages of content exist and none of it passes internal link equity to the money pages it's topically adjacent to, and users reading a tip get zero contextual path to the relevant paid service.

**Fix:** Add 1–2 in-body contextual links per article to the matching service page, using descriptive anchor text (not "click here"/"learn more").

### 1.4 Broken/dead footer links on the homepage only
`Home.tsx` does **not** use the shared `PublicFooter` component that every other page uses (which has correct `<Link to="/about">`, `/pricing`, `/outreach`, `/legal/privacy`, etc.). Instead `Home.tsx` hand-rolls its own footer with `href="#"` placeholders for **About, Careers, Blog, Privacy, Terms, and Security** (lines ~496–500 of `Home.tsx`). These links go nowhere. This is the highest-traffic page on the site linking to six dead anchors instead of real internal pages — a crawlability and trust defect, and it means the homepage (the page with the most inbound authority) passes zero internal link equity to About, Pricing, Outreach, or Legal.

**Fix:** Replace `Home.tsx`'s inline footer with `<PublicFooter />` (already built, already used everywhere else) or wire the existing `href="#"` items to real routes.

### 1.5 Pricing content duplicated verbatim between `Home.tsx` and `Pricing.tsx`
The `TIERS`, `FEE_ROWS`, and surrounding copy ("You pay infra. You pay for what lands. Nothing else." / infra-at-cost card / performance-fee card) in `Home.tsx` (lines 56–85, 396–447) are near-identical to `Pricing.tsx` (lines 8–46, 61–116) — same numbers, same labels, largely same sentence structure. This isn't classic duplicate-content penalty territory (different URLs, embedded in different page contexts) but it is redundant topical coverage that dilutes what `Pricing.tsx` could otherwise use to go deeper (FAQ, examples, objection-handling) instead of re-stating the homepage section.

**Fix:** Keep the compact pricing teaser on `Home.tsx` (fine — it's a snippet with a "See the cost model" link), but expand `Pricing.tsx` itself with unique content: an FAQ block (schema-eligible `FAQPage` — good AI-citation target), 1–2 worked examples ("if you send 3,000 emails/mo and get a 3% reply rate, expect ~$X/mo total"), and a link out to the ROI Calculator tool (currently not cross-linked from Pricing at all).

---

## 2. Page-by-page assessment

### Home (`src/pages/Home.tsx`)
- Word count: ~900–1,000 words of visible copy — clears the 500-word homepage floor.
- E-E-A-T: has one real testimonial with a named person and company (Kopano Mashona, KPRM Media) plus concrete stats (21 meetings, 20 days, 33% open rate, 0.8% bounce rate) — this is the single strongest experience/proof signal on the entire site. It is not repeated or reinforced anywhere else (not on About, not on the service pages, not in the outreach hub sidebar).
- Issues: missing `<SEO>` (see 1.1), broken footer links (see 1.4), pricing duplication (see 1.5).
- Fix: reuse the KPRM Media proof point (or add 1–2 more) as a case-study snippet on at least the service pages and Pricing — right now a single testimonial does all the trust-signal work for the whole site.

### About (`src/pages/About.tsx`)
- Word count: ~430 words — thin relative to typical about-page expectations, though QRG doesn't set a hard floor for About pages specifically.
- E-E-A-T: genuinely good — three named founders with specific roles and bios (Trevor Ryan/Systems Architect, Brendon Barnard/Operations, Tristan Newton/AI Strategy), a specific origin story ("failed twice"). This is real first-person/experience signal, better than most competitor about pages.
- Gaps: no photos, no LinkedIn/credential links for the founders (currently just initials in a circle), no external validation (press mentions, client logos, certifications). No links to case studies or a "how we work" service page.
- Fix: link founder names to LinkedIn (authorship verification is a direct E-E-A-T lever), add 1–2 client logos or the KPRM testimonial here too.

### Pricing (`src/pages/Pricing.tsx`)
- Word count: ~300 words of prose (rest is numeric table data) — light, but pricing pages are legitimately numbers-heavy; the QRG note that word count isn't a ranking factor applies well here.
- Gaps: no FAQ ("what counts as a classified reply," "what happens if I don't like the results," "is there a contract") despite this being exactly the kind of page prospects and AI assistants query for direct-answer facts. No links to the ROI Calculator or Benchmark Checker tools, which would be a natural pairing. Duplicated with Home (see 1.5).
- Fix: add an FAQ section with `FAQPage` schema — cheap, high AI-citation value, and directly answers the objections a performance-fee model raises.

### Service pages (`src/pages/services/*.tsx`) — B2B Lead Gen, Cold Email Automation Setup, Deliverability Consulting, Done-For-You, Multi-Touch Outreach
All five carry a `Service` schema block via `<SEO>` (good), but content depth varies sharply and **none reach the 800-word service-page floor**:

| Page | Approx. word count | Notes |
|---|---|---|
| `MultiTouchOutreach.tsx` | ~550 | Richest of the five — has a concrete 13-day/7-touch cadence table, a checklist, and two pricing tiers. Closest to adequate topical coverage. |
| `DoneForYou.tsx` | ~450 | Has a "why DIY fails" pain-point section with specific scenarios (blacklisted IP, missing SPF/DKIM/DMARC) — decent specificity. |
| `B2BLeadGen.tsx` | ~350 | Mostly a 5-step process list; "qualified lead" definition section is good but short. |
| `DeliverabilityConsulting.tsx` | ~350 | Audit checklist is credible/technical (SPF/DKIM/DMARC, Google Postmaster, SNDS) but no case example, no pricing shown ("contact for custom quote" — acceptable but thin). |
| `ColdEmailAutomationSetup.tsx` | **~250** | **Thinnest page on the site.** Content is almost entirely four bullet-list cards (16 short line items total) with no explanatory prose paragraphs at all — no "why this matters," no process narrative, no FAQ. |

**Common gaps across all five service pages:**
- No FAQ sections (a direct AI-citation and long-tail-query miss for commercial-intent pages).
- No case studies / before-after data specific to that service (the one testimonial on Home isn't reused here).
- Near-identical structural pattern (hero → 4-6 cards → CTA) with very similar sentence rhythms — not egregious AI-slop, but it is the kind of "repetitive structure across pages" the Sept 2025 QRG flags as a low-quality-AI-content marker if it goes further. Currently borderline; would tip into a real problem if more service pages are added without varying structure/depth.
- Weak cross-linking: only `B2BLeadGen.tsx` (→ Multi-Touch) and `ColdEmailAutomationSetup.tsx` (→ Readiness Quiz, ×2) contain any in-body `<Link>` at all. `DeliverabilityConsulting.tsx`, `DoneForYou.tsx`, and `MultiTouchOutreach.tsx` link to nothing but their own CTA button.

**Fix priority:** Rewrite `ColdEmailAutomationSetup.tsx` first — it needs 400-500 words of real explanatory prose (why DNS/warmup/CRM setup fails when done in-house, what "launch ready" actually means, a short FAQ) to get anywhere near topical-coverage parity with the other four. Then add one FAQ block + one proof point to each of the remaining four, and cross-link services to each other and to the relevant outreach tips (e.g., `DeliverabilityConsulting.tsx` → `InboxPlacement.tsx`/`DomainWarmup.tsx` tips).

### Tools (`src/pages/tools/ROICalculator.tsx`, `BenchmarkChecker.tsx`, `TAMEstimator.tsx`)
- All three have `<SEO>` with title/description/canonical (good — better covered than the outreach section).
- Word count: ~150-200 words of surrounding copy each; the interactive calculator is the actual content, which is legitimate for a tool page, but:
  - No methodology explanation (where do the benchmark numbers — 33% open rate, 0.8% bounce, 3.5% reply rate — actually come from beyond "Realtrix-managed campaigns"? No sample size, no date range, no link to a methodology page).
  - No links from the tools back to the relevant service pages or outreach tips (e.g., `BenchmarkChecker.tsx` should link to `InboxPlacement.tsx` or `DeliverabilityConsulting.tsx` when a user's numbers come back below benchmark).
  - No FAQ / no "what do I do if I'm below benchmark" guidance — a missed AI-citation opportunity since "what's a good cold email reply rate" is a common query these tools are implicitly targeting.
- Fix: add a short methodology/sourcing note under each calculator (turns an unverifiable claim into a citable, trustworthy stat), and add contextual "next step" links into services/tips based on the tool's output.

### Outreach Hub (`src/pages/outreach/OutreachHub.tsx`)
- Filterable index of the 13 tips, has `BreadcrumbList`/`CollectionPage` JSON-LD (good instinct) but **no `<SEO>` call**, so title/description aren't actually set via Helmet (see 1.1).
- Content itself (card titles/descriptions) is fine and well-organized by topic tag.

### Outreach tips (`src/pages/outreach/tips/*.tsx` — 13 articles)
- Word count: consistently ~500-700 words per article (verified by reading `ColdEmailSubjectLines.tsx`, `WhenToKillALead.tsx`, `HandlingReplies.tsx`, `BadData.tsx` in full) — this clears a reasonable blog-post floor for short-form tips, though it's below the 1,500-word blog-post guideline in the skill's table. Given these are explicitly positioned as quick "Tips" (vs. "Playbook," per the `type` prop in `ArticleLayout`), 500-700 words is defensible for the format, but it means none of these can realistically compete for a broad, high-volume head term — they're built for long-tail/AI-citation capture instead, which makes the missing schema (1.1) and missing dates/authors (1.2) doubly costly, since that's the exact mechanism these pieces would need to get cited.
- Structure quality: genuinely good — consistent TL;DR summary, H2/H3 hierarchy, bulleted frameworks, pull-quote blockquotes. This is well-formed for AI extraction *if* the missing schema/metadata problem (1.1/1.2) is fixed.
- Content quality / AI-slop assessment: **not egregious AI-slop, but generic-expertise rather than first-hand-Realtrix-experience.** The articles contain real tactical specificity (e.g., "5 unanswered touches over 14 days," "ACK-Q-O framework," "bounce rate above 2%," "$0.50-$1.00 per verified contact") which reads as competent domain knowledge, but:
  - None of it is attributed to an actual Realtrix campaign, client, or dataset — it's phrased as general industry wisdom ("CRM data across high-performing outbound teams shows...") without a citation or source, which is a trust/verifiability gap and also a missed opportunity given Realtrix's actual pitch is "we test niches with rigor" and "every reply is AI-classified" — they have the real data to make these specific claims first-party and don't.
  - Structural repetition across all 13 (intro pain point → typology/framework list → cost-of-inaction math → pull-quote) is a genuine "repetitive structure across pages" pattern per the Sept 2025 QRG's low-quality-AI-content markers. Not disqualifying on its own, but combined with zero bylines/dates, it reads as templated rather than authored.
  - Zero internal links to services (see 1.3) or to each other (no "related tips" module) despite an obvious topic graph (e.g., `DomainWarmup.tsx` and `InboxPlacement.tsx` and `BadData.tsx` are all deliverability-adjacent and never reference each other).
- Fix: (a) add real Realtrix-sourced data points where the claims are currently generic ("across the campaigns we run, the average..." with an actual number), (b) add a "Related reading" module linking 2-3 sibling tips + 1 service page at the bottom of `ArticleLayout.tsx`, (c) fix 1.1/1.2 (schema + byline/date) since this content type is exactly what benefits most from it.

---

## 3. Readability / keyword notes
- Copy voice is consistently plain, declarative, short-sentence — reads well, no keyword stuffing observed anywhere (natural density, descriptive service names used as H1s which is fine).
- Keyword targeting is clear per service page (`keywords` prop on `SEO` matches page intent, e.g., `DeliverabilityConsulting.tsx` targets "email deliverability consulting," "spam folder fix," "email reputation repair" — sensible, not stuffed) — but this metadata only exists on the 5 service pages + 3 tools + About + Pricing; it's entirely absent on the 15 pages listed in 1.1, so keyword targeting effectively doesn't exist for a third of the site's URLs.

---

## Summary of fixes by effort/impact

**High impact, low effort:**
1. Add `<SEO>` (title/description/canonical/schema) to `ArticleLayout.tsx`, `OutreachHub.tsx`, `Home.tsx`, `ReadinessQuiz.tsx` — fixes duplicate titles across 14+ URLs and unlocks Article schema.
2. Swap `Home.tsx`'s dead `href="#"` footer for the existing `<PublicFooter />`.
3. Add author byline + date to `ArticleLayout.tsx`, sourced from the three real founders already on `About.tsx`.

**Medium impact, medium effort:**
4. Add 1-2 contextual internal links per tip article into the matching service page, plus a "related tips" module.
5. Add FAQ blocks (with `FAQPage` schema) to `Pricing.tsx` and each service page.
6. Rewrite `ColdEmailAutomationSetup.tsx` with real explanatory prose — currently the thinnest, weakest page on the site.

**Lower urgency:**
7. Add methodology sourcing notes to the three tools' benchmark numbers.
8. Replace generic "industry data shows" claims in the tip articles with first-party Realtrix numbers where possible, given the AI-reply-classification pitch means this data plausibly already exists internally.

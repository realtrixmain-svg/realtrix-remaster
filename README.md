# Realtrix — Remaster

New homepage build for the Realtrix marketing site, sourced from the Claude Design file
`Realtrix Homepage.dc.html` (design-system project `f1b50bce-3050-40e9-8e7f-fee9e1a12468`).
This is a **from-scratch repo**, not a fork of the live site — it exists to prove out the
new design direction on the homepage + the two interactive funnel pieces (quiz, popup)
before the rest of the site gets rebuilt in this style.

## What's built here

- **`src/pages/Home.tsx`** — full homepage, faithfully implemented from the `.dc.html` design.
  No redesign liberties taken beyond fixing obvious asset paths.
- **`src/components/DiagnosticModal.tsx`** — the floating/modal diagnostic quiz popup, ported
  from the live repo's `components/DiagnosticModal.tsx`. Auto-surfaces once via
  `IntersectionObserver` on the `#how` section, or can be force-opened by dispatching a
  `window` event: `window.dispatchEvent(new Event('open-diagnostic-modal'))`.
- **`src/pages/ReadinessQuiz.tsx`** — the full 20-question `/readiness-quiz` page, ported from
  the live repo's `pages/ReadinessQuiz.tsx`, including the Make.com webhook submission and
  scored report generation.
- **Cal.com booking**: every "Book a call" / CTA button that used to point at an internal
  booking flow now does `window.open('https://cal.com/trevorryan/30min', '_blank')`.
- **Design tokens** (`tailwind.config.ts`): `font-display` = Playfair Display (headings),
  `font-sans` = Work Sans (body/UI), colors `cream` / `creamHi` / `creamDim` (oklch off-whites)
  for backgrounds, `accent` = `#FFD400`, `ink` = `#000000`. Reuse these tokens, don't
  hand-roll new hex values or fonts anywhere else in the site.

## What's NOT built (still lives only on the live repo)

The live repo is `repos/realtrixapp-google-made-UI-compylebackend` (route map is
`App.tsx`). Everything below still needs to be rebuilt in this repo's design system.
Route path → live-repo source component → suggested new file:

### Core pages
| Route | Live source | New file |
|---|---|---|
| `/about` | `pages/About.tsx` | `src/pages/About.tsx` |
| `/tools` | `pages/Tools.tsx` | `src/pages/Tools.tsx` |
| `/tools/roi-calculator` | `pages/RoiCalculator.tsx` | `src/pages/RoiCalculator.tsx` |
| `/tools/benchmark-checker` | `pages/BenchmarkChecker.tsx` | `src/pages/BenchmarkChecker.tsx` |
| `/tools/tam-estimator` | `pages/TamEstimator.tsx` | `src/pages/TamEstimator.tsx` |

### Services (5 pages)
| Route | Live source |
|---|---|
| `/services/done-for-you-cold-email` | `pages/DoneForYou.tsx` |
| `/services/cold-email-automation-setup` | `pages/AutomationSetup.tsx` |
| `/services/email-deliverability-consulting` | `pages/Deliverability.tsx` |
| `/services/b2b-lead-generation` | `pages/LeadGeneration.tsx` |
| `/services/multi-touch-outreach` | `pages/MultiTouchOutreach.tsx` |

New files: `src/pages/services/<Name>.tsx`.

### Outreach hub (1 hub + 1 pillar + 14 articles)
| Route | Live source |
|---|---|
| `/outreach` | `pages/OutreachHub.tsx` |
| `/outreach/cold-email-systems` | `pages/ColdEmailSystems.tsx` |
| `/outreach/tips/cold-email-subject-lines` | `pages/ColdEmailSubjectLines.tsx` |
| `/outreach/tips/follow-up-timing` | `pages/FollowUpTiming.tsx` |
| `/outreach/tips/personalization-at-scale` | `pages/PersonalizationAtScale.tsx` |
| `/outreach/tips/handling-cold-email-replies` | `pages/HandlingReplies.tsx` |
| `/outreach/tips/inbox-placement` | `pages/InboxPlacement.tsx` |
| `/outreach/tips/bad-data-silent-killer` | `pages/BadData.tsx` |
| `/outreach/tips/first-line-rule` | `pages/FirstLineRule.tsx` |
| `/outreach/tips/signals-over-guessing` | `pages/SignalsOverGuessing.tsx` |
| `/outreach/tips/campaign-decay` | `pages/CampaignDecay.tsx` |
| `/outreach/tips/personalization-boundaries` | `pages/PersonalizationBoundaries.tsx` |
| `/outreach/tips/reply-triage-system` | `pages/ReplyTriageSystem.tsx` |
| `/outreach/tips/domain-warmup` | `pages/DomainWarmup.tsx` |
| `/outreach/tips/when-to-kill-a-lead` | `pages/WhenToKillALead.tsx` |
| `/outreach/tips/authentic-automation` | `pages/AuthenticAutomation.tsx` |

New files: `src/pages/outreach/<Name>.tsx`. These are SEO content pages — copy can be
carried over near-verbatim from the live repo, just re-skinned in the new design system
(article layout: cream/creamHi background, Playfair Display headline, Work Sans body,
`accent` used sparingly for links/highlights, not as a background wash).

### Legal (1 hub + 6 policies)
| Route | Live source |
|---|---|
| `/legal` | `pages/LegalHub.tsx` |
| `/legal/privacy` | `pages/PrivacyPolicy.tsx` |
| `/legal/terms` | `pages/TermsOfService.tsx` |
| `/legal/aup` | `pages/AcceptableUsePolicy.tsx` |
| `/legal/billing` | `pages/BillingPolicy.tsx` |
| `/legal/ai-policy` | `pages/AIUsagePolicy.tsx` |
| `/legal/cookies` | `pages/CookiePolicy.tsx` |

New files: `src/pages/legal/<Name>.tsx`. Plain text-document layout — no need for heavy
motion/animation here, just correct typography tokens and a simple `creamHi` background.

### Catch-all
`path="*"` → `<Navigate to="/" replace />` — add this last, once other routes exist.

## How to continue this build (for whichever tool picks it up next)

1. **Do not redesign.** The homepage in `src/pages/Home.tsx` is the design source of truth —
   copy its section conventions (card treatment, spacing scale, reveal-on-scroll animation
   timing/easing, button styles) onto every new page rather than inventing new patterns.
2. **Reuse the live repo's copy and logic wholesale.** These are functioning SEO/legal pages
   already — the job is re-skinning them in Playfair Display / Work Sans / cream+accent
   tokens, not rewriting content or business logic.
3. **Reuse `DiagnosticModal.tsx` as-is.** It's a global floating popup — mount it once at the
   app root (or per-page, matching how the live repo does it) rather than duplicating it.
4. **Any "Book a call" CTA** → `window.open('https://cal.com/trevorryan/30min', '_blank')`.
   Never link to an internal `/book` route.
5. **Nav/footer**: this repo currently has only minimal inline nav/footer stubs in
   `ReadinessQuiz.tsx`. Before adding more pages, promote these into a shared
   `src/components/Nav.tsx` / `src/components/Footer.tsx` (matching `Home.tsx`'s real
   header/footer, not the quiz page's stub) and use them across every new page — don't
   keep re-inlining nav/footer markup per page.
6. **Fonts/colors**: always pull from `tailwind.config.ts` tokens (`font-display`,
   `font-sans`, `bg-cream`/`bg-creamHi`/`bg-creamDim`, `text-accent`/`bg-accent`, `ink`).
   Never hardcode a new hex color or font-family.
7. Register each new page's route in `src/App.tsx` as it's built.

## Stack

Vite 5 + React 18 + TypeScript + react-router-dom v6 + Tailwind CSS v3.
`npm install && npm run dev` to run locally. `npm run build` to verify before shipping.

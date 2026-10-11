# Compliance audit: realtrix.org (GDPR + POPIA)

Date: 2026-10-11. Tier: brochure + one lead form (quiz) = cookie banner. Not attorney-reviewed.

## What the site actually stores / sends
| Item | Where | When | Disclosed |
|---|---|---|---|
| Google Analytics `_ga`, `_ga_L3FSEFCX8C` (G-L3FSEFCX8C) | cookie | only after Accept (Consent Mode v2, default denied) | Cookie + Privacy Policy |
| `realtrix_consent` | localStorage | on banner choice | Cookie Policy |
| `realtrix_diagnostic_dismissed` | sessionStorage | on modal close | Cookie Policy |
| Quiz name/email/company/answers | POST to Make.com webhook | on quiz submit | Privacy Policy (added) |
| Diagnostic modal | mailto draft only, nothing sent by site | n/a | Privacy Policy (added) |
| Google Fonts | IP to Google on page load, no cookie | every load | Cookie Policy (added) |

## Gaps found and fixed (2026-10-11)
- Cookie Policy listed HubSpot, Calendly, CSRF, session ID, marketing cookies, DNT handling. None exist. Rewritten to match reality.
- Privacy Policy had no mention of the quiz/Make.com, GA by consent, or Fonts. Added.
- Policy contact addresses were `@realtrix.io`; site uses `@realtrix.org`. Standardised on trevor@realtrix.org (privacy/ai) and abuse@realtrix.org.
- No consent mechanism existed. Added `ConsentBanner` (Accept/Decline equal weight, Cookie Settings footer link to reopen).

## Open (needs Trevor)
- Privacy Policy has no POPIA Information Officer / Information Regulator wording or named legal entity. Left as-is, flagged.
- Terms/Billing/AUP/AI policy not re-audited this pass.
- Quiz form collects personal data with no explicit consent checkbox (brochure-tier banner does not cover it). Consider clickwrap on the quiz.

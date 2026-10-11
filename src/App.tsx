import React, { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import ConsentBanner from './components/ConsentBanner'
import Home from './pages/Home'

const About = lazy(() => import('./pages/About'))
const Pricing = lazy(() => import('./pages/Pricing'))
const Tools = lazy(() => import('./pages/Tools'))
const ROICalculator = lazy(() => import('./pages/tools/ROICalculator'))
const BenchmarkChecker = lazy(() => import('./pages/tools/BenchmarkChecker'))
const TAMEstimator = lazy(() => import('./pages/tools/TAMEstimator'))
const ReadinessQuiz = lazy(() => import('./pages/ReadinessQuiz'))

const DoneForYou = lazy(() => import('./pages/services/DoneForYou'))
const AutomationSetup = lazy(() => import('./pages/services/ColdEmailAutomationSetup'))
const Deliverability = lazy(() => import('./pages/services/DeliverabilityConsulting'))
const LeadGeneration = lazy(() => import('./pages/services/B2BLeadGen'))
const MultiTouchOutreach = lazy(() => import('./pages/services/MultiTouchOutreach'))

const OutreachHub = lazy(() => import('./pages/outreach/OutreachHub'))
const ColdEmailSubjectLines = lazy(() => import('./pages/outreach/tips/ColdEmailSubjectLines'))
const FollowUpTiming = lazy(() => import('./pages/outreach/tips/FollowUpTiming'))
const PersonalizationAtScale = lazy(() => import('./pages/outreach/tips/PersonalizationAtScale'))
const HandlingReplies = lazy(() => import('./pages/outreach/tips/HandlingReplies'))
const InboxPlacement = lazy(() => import('./pages/outreach/tips/InboxPlacement'))
const BadData = lazy(() => import('./pages/outreach/tips/BadData'))
const FirstLineRule = lazy(() => import('./pages/outreach/tips/FirstLineRule'))
const SignalsOverGuessing = lazy(() => import('./pages/outreach/tips/SignalsOverGuessing'))
const CampaignDecay = lazy(() => import('./pages/outreach/tips/CampaignDecay'))
const PersonalizationBoundaries = lazy(() => import('./pages/outreach/tips/PersonalizationBoundaries'))
const ReplyTriageSystem = lazy(() => import('./pages/outreach/tips/ReplyTriageSystem'))
const DomainWarmup = lazy(() => import('./pages/outreach/tips/DomainWarmup'))
const WhenToKillALead = lazy(() => import('./pages/outreach/tips/WhenToKillALead'))
const AuthenticAutomation = lazy(() => import('./pages/outreach/tips/AuthenticAutomation'))

const LegalHub = lazy(() => import('./pages/legal/LegalHub'))
const PrivacyPolicy = lazy(() => import('./pages/legal/PrivacyPolicy'))
const TermsOfService = lazy(() => import('./pages/legal/TermsOfService'))
const AcceptableUsePolicy = lazy(() => import('./pages/legal/AcceptableUsePolicy'))
const BillingPolicy = lazy(() => import('./pages/legal/BillingPolicy'))
const AIPolicy = lazy(() => import('./pages/legal/AIPolicy'))
const CookiePolicy = lazy(() => import('./pages/legal/CookiePolicy'))

const RouteFallback = () => (
  <div style={{ minHeight: '100vh', background: 'oklch(97% 0.01 75)' }} />
)

const AnimatedRoutes: React.FC = () => {
  const location = useLocation()
  return (
    <div key={location.pathname} className="page-transition">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/tools/roi-calculator" element={<ROICalculator />} />
        <Route path="/tools/benchmark-checker" element={<BenchmarkChecker />} />
        <Route path="/tools/tam-estimator" element={<TAMEstimator />} />
        <Route path="/readiness-quiz" element={<ReadinessQuiz />} />

        <Route path="/services/done-for-you-cold-email" element={<DoneForYou />} />
        <Route path="/services/cold-email-automation-setup" element={<AutomationSetup />} />
        <Route path="/services/email-deliverability-consulting" element={<Deliverability />} />
        <Route path="/services/b2b-lead-generation" element={<LeadGeneration />} />
        <Route path="/services/multi-touch-outreach" element={<MultiTouchOutreach />} />

        <Route path="/outreach" element={<OutreachHub />} />
        <Route path="/outreach/tips/cold-email-subject-lines" element={<ColdEmailSubjectLines />} />
        <Route path="/outreach/tips/follow-up-timing" element={<FollowUpTiming />} />
        <Route path="/outreach/tips/personalization-at-scale" element={<PersonalizationAtScale />} />
        <Route path="/outreach/tips/handling-cold-email-replies" element={<HandlingReplies />} />
        <Route path="/outreach/tips/inbox-placement" element={<InboxPlacement />} />
        <Route path="/outreach/tips/bad-data-silent-killer" element={<BadData />} />
        <Route path="/outreach/tips/first-line-rule" element={<FirstLineRule />} />
        <Route path="/outreach/tips/signals-over-guessing" element={<SignalsOverGuessing />} />
        <Route path="/outreach/tips/campaign-decay" element={<CampaignDecay />} />
        <Route path="/outreach/tips/personalization-boundaries" element={<PersonalizationBoundaries />} />
        <Route path="/outreach/tips/reply-triage-system" element={<ReplyTriageSystem />} />
        <Route path="/outreach/tips/domain-warmup" element={<DomainWarmup />} />
        <Route path="/outreach/tips/when-to-kill-a-lead" element={<WhenToKillALead />} />
        <Route path="/outreach/tips/authentic-automation" element={<AuthenticAutomation />} />

        <Route path="/legal" element={<LegalHub />} />
        <Route path="/legal/privacy" element={<PrivacyPolicy />} />
        <Route path="/legal/terms" element={<TermsOfService />} />
        <Route path="/legal/aup" element={<AcceptableUsePolicy />} />
        <Route path="/legal/billing" element={<BillingPolicy />} />
        <Route path="/legal/ai-policy" element={<AIPolicy />} />
        <Route path="/legal/cookies" element={<CookiePolicy />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}

const App: React.FC = () => (
  <BrowserRouter>
    <ScrollToTop />
    <ConsentBanner />
    <Suspense fallback={<RouteFallback />}>
      <AnimatedRoutes />
    </Suspense>
  </BrowserRouter>
)

export default App

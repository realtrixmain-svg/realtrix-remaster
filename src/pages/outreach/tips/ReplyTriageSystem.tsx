import React from 'react'
import { Link } from 'react-router-dom'
import ArticleLayout from '../ArticleLayout'

const ReplyTriageSystem: React.FC = () => (
  <ArticleLayout
    title="The Reply Triage System Top SDRs Use"
    description="How elite teams sort, score, and route replies in under 60 seconds."
    canonical="/outreach/tips/reply-triage-system"
    type="Tip"
    tldr="Build a reply classification system with 4 categories: Meeting, Interested, Info Request, and Not Now. Classify every reply within 5 minutes, route qualified replies immediately, and schedule follow-ups for 'later' responses."
  >
    <h2>Why Reply Speed Matters</h2>
    <p>A prospect who replies to your cold email is at peak interest — they took time out of their day to respond. Every minute you delay in classifying and responding to that reply reduces the chance of booking a meeting. Data shows that responding to a qualified reply within 5 minutes increases meeting conversion by 40% compared to responding within 30 minutes.</p>
    <p>Yet most teams treat replies as a batch process — checking shared inboxes periodically, manually sorting through responses, and losing critical hours in the gap between "reply received" and "meeting booked."</p>

    <h2>The 4-Category Classification System</h2>
    <p>Every reply should be classified into exactly one of four categories. This classification drives everything that happens next:</p>
    <ul>
      <li><strong>Meeting:</strong> The prospect explicitly wants to talk — suggested a time, asked to book, or said "let's do it." Route immediately to the calendar link. Priority: highest.</li>
      <li><strong>Interested:</strong> The prospect is interested but has questions — pricing, scope, timing, or process. Respond within 5 minutes with the answers and a clear next step. Priority: high.</li>
      <li><strong>Info Request:</strong> The prospect wants more information before deciding — case studies, one-pagers, documentation. Send the materials and schedule a follow-up for 3 days later. Priority: medium.</li>
      <li><strong>Not Now / Not Interested:</strong> The prospect is not ready or not a fit. Acknowledge, schedule a revisit for 90 days, and move on. Priority: low.</li>
    </ul>
    <p>Each category has a different response protocol, response time target, and follow-up schedule. The goal is to never let a reply sit unclassified for more than 5 minutes.</p>

    <h2>The Triage Process</h2>
    <h3>Step 1: Auto-Classify</h3>
    <p>Use AI to pre-classify every incoming reply based on keywords, sentiment, and intent signals. "Let's book a time" is clearly a Meeting. "What does pricing look like?" is Interested. "Can you send me more info?" is Info Request. AI classification handles 80-90% of replies accurately.</p>

    <h3>Step 2: Human Verify</h3>
    <p>A human reviews the AI classification in under 30 seconds. Confirm the category, check for nuances the AI missed (sarcasm, multi-part replies, forwarded threads), and approve. This human-in-the-loop step catches the 10-20% of replies that need manual judgment.</p>

    <h3>Step 3: Route and Respond</h3>
    <p>Based on the classification:</p>
    <ul>
      <li><strong>Meeting:</strong> Send calendar link immediately — no human needed</li>
      <li><strong>Interested:</strong> Human responds with answers and a meeting link within 5 minutes</li>
      <li><strong>Info Request:</strong> Auto-send requested materials, human schedules follow-up</li>
      <li><strong>Not Now:</strong> Auto-send acknowledgment, human schedules 90-day revisit</li>
    </ul>

    <h2>The CRM Integration</h2>
    <p>Every classification should be logged in your CRM with a timestamp and category tag. This data is gold: it tells you which campaigns generate which types of replies, which segments are most responsive, and where the bottlenecks are in your conversion funnel.</p>
    <p>Track: reply rate by campaign, classification distribution, time-to-response by category, and meeting conversion rate by classification. These metrics reveal more about campaign health than open rates or click rates.</p>

    <blockquote>
      <p>Speed to response is the most underrated competitive advantage in cold email. Build a triage system, measure response times, and optimize relentlessly. The team that responds fastest wins the meeting.</p>
    </blockquote>

    <p>Our <Link to="/services/b2b-lead-generation">B2B lead generation service</Link> runs this exact triage system for you — every reply classified and routed within minutes.</p>
  </ArticleLayout>
)

export default ReplyTriageSystem

import React from 'react'
import { Link } from 'react-router-dom'
import ArticleLayout from '../ArticleLayout'

const WhenToKillALead: React.FC = () => (
  <ArticleLayout
    title="When to Kill a Lead"
    description="Holding on too long costs more than letting go. Here is how to decide."
    canonical="/outreach/tips/when-to-kill-a-lead"
    type="Tip"
    tldr="Kill a lead after 5 unanswered touches, a hard bounce, an explicit opt-out, or when enrichment reveals they are not your ICP. Holding onto dead leads wastes resources and skews your campaign metrics."
  >
    <h2>The Sunk Cost Trap in Outbound</h2>
    <p>You have sent 4 emails to a prospect. You have invested time researching their company, writing personalized copy, and crafting follow-ups. They have not replied. The temptation is strong: "Maybe the 5th email will work. Maybe the timing just was not right yet."</p>
    <p>This is the sunk cost trap — and it is one of the most expensive mistakes in cold email. Every additional email to a non-responsive lead has a cost: it burns sender reputation, wastes resources, and distorts your campaign metrics by inflating your send count without adding pipeline.</p>

    <h2>The Kill Criteria</h2>
    <p>Build explicit, objective kill criteria into your outbound process. This removes emotion from the decision and keeps your pipeline clean:</p>
    <ul>
      <li><strong>5 unanswered touches:</strong> If a prospect has not replied after 5 well-crafted messages over 14 days, they are not interested — or not reachable. Move on.</li>
      <li><strong>Hard bounce:</strong> The email address is invalid. Kill immediately. Do not retry.</li>
      <li><strong>Explicit opt-out:</strong> "Please remove me" or "Not interested" — respect it immediately. Compliance is non-negotiable.</li>
      <li><strong>Enrichment reveals wrong fit:</strong> If post-send research reveals the prospect is not your ICP — wrong role, wrong company size, wrong industry — stop sending. They were never going to convert.</li>
      <li><strong>Spam complaint:</strong> If a prospect marks you as spam, something went wrong. Investigate, do not resend.</li>
    </ul>
    <p>These criteria are not suggestions — they are rules. Build them into your CRM automation so they happen automatically, not when someone remembers.</p>

    <h2>The Cost of Holding On</h2>
    <p>Consider the math: each email you send to a dead lead has a cost — not just in sending infrastructure, but in domain reputation. Every non-engaged recipient tells email providers your content is not valuable. Across hundreds of dead leads, this adds up to measurable deliverability degradation for your entire campaign.</p>
    <p>The opportunity cost is even larger. The time and resources spent on dead leads could be spent on new prospects who might actually convert. Every minute spent crafting a 6th email to a non-responder is a minute not spent on a warm lead.</p>

    <h2>The 90-Day Revisit Rule</h2>
    <p>Killing a lead does not mean forgetting them. Tag killed leads with a 90-day revisit date. B2B buying cycles are long — a prospect who was not ready in January might be ready in April. The revisit is not a re-send of the same campaign. It is a fresh outreach with new context, new value, and new timing.</p>
    <p>Set the reminder, forget about the lead, and focus your energy on prospects who are actively engaged today.</p>

    <h2>Killing Campaigns, Not Just Leads</h2>
    <p>Sometimes the right move is not just killing individual leads — it is killing the entire campaign. If your reply rate drops below 1% across the campaign, if bounce rates climb above 3%, or if spam complaints exceed 0.1%, the campaign itself is the problem. Kill it, diagnose the issue, and start fresh with better targeting and messaging.</p>

    <blockquote>
      <p>The discipline to kill a lead is the same discipline that keeps your pipeline healthy. Every dead lead you release frees resources for a live one. Let go faster, measure honestly, and move forward.</p>
    </blockquote>

    <p>Our <Link to="/services/b2b-lead-generation">B2B lead generation service</Link> applies these exact kill criteria automatically, so dead leads stop skewing your metrics.</p>
  </ArticleLayout>
)

export default WhenToKillALead

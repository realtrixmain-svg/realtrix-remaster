import React from 'react'
import { Link } from 'react-router-dom'
import ArticleLayout from '../ArticleLayout'

const ColdEmailSubjectLines: React.FC = () => (
  <ArticleLayout
    title="How to Write Cold Email Subject Lines"
    description="Subject lines that get opened — patterns, anti-patterns, and the data behind what works."
    canonical="/outreach/tips/cold-email-subject-lines"
    type="Tip"
    tldr="Keep subject lines under 6 words, avoid spam triggers, personalize with a specific detail, and A/B test relentlessly. The subject line's only job is to earn the open — nothing else."
  >
    <h2>Why Subject Lines Make or Break Your Campaign</h2>
    <p>Your subject line is the single highest-leverage element in any cold email. A perfectly crafted body means nothing if it never gets read. Industry data consistently shows open rates varying by 40%+ based solely on subject line quality — and in cold email, where you are already fighting for attention in a crowded inbox, that margin is the difference between pipeline and silence.</p>
    <p>The good news: subject line writing is one of the few areas in outbound where small, testable changes produce measurable results fast.</p>

    <h2>The 6-Word Rule</h2>
    <p>The highest-performing cold email subject lines tend to be short — often under 6 words. This is not arbitrary. Short subject lines:</p>
    <ul>
      <li>Display fully on mobile (where 60%+ of opens happen)</li>
      <li>Create curiosity without being deceptive</li>
      <li>Feel like a personal note, not a marketing blast</li>
      <li>Force you to be specific rather than vague</li>
    </ul>
    <p>Examples that work: "Quick question about Q3", "Noticed your hiring", "Idea for [Company]", "Following up on [trigger]". Each is specific, short, and signals relevance.</p>

    <h2>Patterns That Earn Opens</h2>
    <h3>1. The Trigger Reference</h3>
    <p>Reference something the prospect actually did — a funding round, a job post, a podcast appearance, a company expansion. This signals you did homework, not that you are blasting a list. "Loved your podcast on PLG" outperforms "Thoughts on your growth strategy" every time.</p>

    <h3>2. The Question Format</h3>
    <p>Questions create an open loop. The brain wants to close it. "Struggling with deliverability?" works because it names a pain and implies a solution exists. The key: the question must be relevant to the recipient's actual situation, not generic.</p>

    <h3>3. The Lowercase Personal Note</h3>
    <p>Subject lines that read like a Slack message from a colleague — lowercase, casual, specific — consistently outperform polished alternatives. "hey [first name]" or "saw this and thought of you" feel like a person, not a campaign.</p>

    <h3>4. The Number Hook</h3>
    <p>Specific numbers signal specificity and credibility. "3 ideas for [Company]'s outbound" beats "Some ideas for your outbound." The number implies a concrete, scannable, time-efficient email.</p>

    <h2>Anti-Patterns That Kill Deliverability</h2>
    <p>Some subject line habits do not just underperform — they actively damage your inbox placement:</p>
    <ul>
      <li><strong>ALL CAPS:</strong> Triggers spam filters and feels aggressive</li>
      <li><strong>Excessive punctuation!!!:</strong> Multiple exclamation marks or question marks are spam signals</li>
      <li><strong>Re: / Fwd: trickery:</strong> Fake reply indicators erode trust when the body does not match</li>
      <li><strong>Clickbait without substance:</strong> "You won't believe this" gets opens but destroys reply rates</li>
      <li><strong>Generic value props:</strong> "Grow your revenue 3x" reads like every other sales email in the inbox</li>
      <li><strong>Emoji overload:</strong> One relevant emoji can stand out. Five emojis scream marketing automation.</li>
    </ul>

    <h2>The A/B Testing Framework</h2>
    <p>Do not guess — test. Send your top 2 subject line candidates to a 10% slice of your list, wait 24 hours, then send the winner to the remaining 90%. Over time, this compound testing builds a subject line playbook specific to your audience.</p>
    <p>Track open rates, but more importantly, track reply rates. A subject line that gets opens but no replies is clickbait — it attracted the wrong readers.</p>

    <blockquote>
      <p>The subject line's only job is to get the email opened. If it does that without being deceptive, it has done its job. The body does the rest.</p>
    </blockquote>

    <h2>Subject Line Formulas You Can Steal</h2>
    <ul>
      <li><strong>[First name] + [trigger]:</strong> "Sarah, saw the Series B"</li>
      <li><strong>Question about [specific thing]:</strong> "Question about your sales team"</li>
      <li><strong>Quick idea for [Company]:</strong> "Quick idea for Arcline"</li>
      <li><strong>[Mutual connection] suggested I reach out:</strong> "Dave suggested I reach out"</li>
      <li><strong>Noticed [specific observation]:</strong> "Noticed you expanded to EMEA"</li>
    </ul>

    <p>Each formula works because it signals relevance, effort, and specificity — the three things that separate a cold email from spam.</p>

    <p>Our <Link to="/services/done-for-you-cold-email">Realtrix's done-for-you service</Link> writes and tests every subject line for you as part of a fully managed cold email operation.</p>
  </ArticleLayout>
)

export default ColdEmailSubjectLines

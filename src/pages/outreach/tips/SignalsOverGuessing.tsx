import React from 'react'
import { Link } from 'react-router-dom'
import ArticleLayout from '../ArticleLayout'

const SignalsOverGuessing: React.FC = () => (
  <ArticleLayout
    title="Signals > Guessing: When to Follow Up"
    description="Stop spraying follow-ups on a timer. Start reading buying signals instead."
    canonical="/outreach/tips/signals-over-guessing"
    type="Tip"
    tldr="Stop following up on a fixed schedule. Use engagement signals — email opens, link clicks, website visits, social activity — to trigger follow-ups. Signals-based outreach converts 3-5x better than timer-based cadences."
  >
    <h2>The Timer Problem</h2>
    <p>Most follow-up cadences are based on time: "Follow up 3 days after the first email, then 5 days after that, then 7." This is the industry standard, and it is fundamentally flawed. Time-based cadences treat every prospect the same — whether they opened your email 10 times or never saw it at all.</p>
    <p>The result: you follow up with people who are not interested (wasting their patience and your reputation) while missing people who are actively engaged but just have not replied yet.</p>

    <h2>The Signal-Based Alternative</h2>
    <p>Instead of following up on a timer, follow up on signals. A signal is any behavioral indicator that the prospect has engaged with your outreach or shown buying intent. Common signals include:</p>
    <ul>
      <li><strong>Email opens:</strong> Multiple opens indicate curiosity — the prospect is interested but may not have time to reply</li>
      <li><strong>Link clicks:</strong> Clicking a link in your email is a strong buying signal — they want more information</li>
      <li><strong>Website visits:</strong> If you have tracking, a website visit after an email means they are researching you</li>
      <li><strong>Social engagement:</strong> Liking, commenting, or connecting on LinkedIn after receiving your email</li>
      <li><strong>Reply but no meeting:</strong> A reply that asks a question is a buying signal that needs a follow-up answer</li>
    </ul>
    <p>Each signal tells you something different about where the prospect is in their decision process — and each calls for a different follow-up approach.</p>

    <h2>The Signal-Based Cadence</h2>
    <h3>Signal: Multiple Opens (3+)</h3>
    <p>The prospect is reading your email repeatedly but has not replied. They are likely interested but busy, or sharing the email internally. Your move: a short, value-adding follow-up that makes it easy to respond. "Wanted to make this easy — here's a 2-minute overview." Lower the friction.</p>

    <h3>Signal: Link Click</h3>
    <p>They clicked a link — meaning they wanted more information. Your move: a follow-up that references the specific link they clicked and offers the next logical step. "Saw you checked out the case study — happy to walk through how that applies to your team."</p>

    <h3>Signal: Website Visit</h3>
    <p>They visited your site after receiving your email. This is one of the strongest buying signals in cold outreach. Your move: a direct, confident follow-up. "Looks like you were checking us out — any questions I can answer?"</p>

    <h3>Signal: Social Engagement</h3>
    <p>They liked or commented on your LinkedIn post after receiving your email. They are paying attention. Your move: a LinkedIn message that references the email without being pushy. "Hey — saw you engaged with my post. Wanted to make sure you saw the email I sent last week."</p>

    <h2>Building a Signal-Based System</h2>
    <p>Implementing signal-based follow-ups requires two things: tracking and automation. Track email opens, link clicks, and website visits through your sending platform. Set up automation rules that trigger follow-ups based on specific signals — not timers.</p>
    <p>This is more complex than a timer-based cadence, but the payoff is significant: signals-based outreach converts 3-5x better because you are following up with people who are actively engaged, not just waiting for a calendar reminder.</p>

    <blockquote>
      <p>The best time to follow up is when the prospect is thinking about you — not when your calendar says it has been 3 days. Signals tell you when they are thinking about you. Timers just tell you what day it is.</p>
    </blockquote>

    <p>Our <Link to="/services/b2b-lead-generation">B2B lead generation service</Link> tracks engagement signals across your funnel so follow-ups are triggered by real buying intent, not a timer.</p>
  </ArticleLayout>
)

export default SignalsOverGuessing

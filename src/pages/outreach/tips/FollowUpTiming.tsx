import React from 'react'
import { Link } from 'react-router-dom'
import ArticleLayout from '../ArticleLayout'

const FollowUpTiming: React.FC = () => (
  <ArticleLayout
    title="Follow-Up Timing: The Golden Cadence"
    description="The science of when to follow up, and why most cadences die before they work."
    canonical="/outreach/tips/follow-up-timing"
    type="Tip"
    tldr="Most replies come after day 3. A 5-touch cadence over 14 days is the baseline. Follow up on value, not just reminders. Stop after 5 touches — persistence has diminishing returns."
  >
    <h2>Why Follow-Up Is Where the Real Pipeline Lives</h2>
    <p>Most cold email replies do not come from the first message. Data across millions of cold emails consistently shows that 50-60% of positive replies come after the first follow-up, and a meaningful chunk comes after the second or third. The first email opens the door. The follow-ups walk through it.</p>
    <p>Yet most teams send one email, get no reply, and move on. This is not a targeting problem — it is a patience problem.</p>

    <h2>The Golden Cadence: Timing Between Touches</h2>
    <p>Research across B2B cold email campaigns reveals a consistent pattern:</p>
    <ul>
      <li><strong>Day 0:</strong> Initial outreach</li>
      <li><strong>Day 2-3:</strong> First follow-up (highest reply rate of any follow-up)</li>
      <li><strong>Day 5-6:</strong> Second follow-up (still strong — many prospects are just busy)</li>
      <li><strong>Day 9-10:</strong> Third follow-up (last high-converting touch)</li>
      <li><strong>Day 14:</strong> Final breakup email (creates urgency, often gets "actually, let's talk")</li>
    </ul>
    <p>This 14-day window is not arbitrary. It aligns with how B2B buyers process inbound requests — they see it, bookmark it, get busy, forget, see a reminder, consider it, and either engage or consciously opt out.</p>

    <h2>Why Day 3 Matters Most</h2>
    <p>The first follow-up at day 2-3 has the highest conversion rate of any touch in the sequence. This is because the prospect saw your email, was interested enough not to delete it, but did not have time (or urgency) to reply. A well-crafted follow-up — not a "just bumping this" — reminds them and provides a new reason to engage.</p>
    <p>The key is that your follow-up must add value, not just repeat the ask. Share a relevant insight, a case study snippet, or a specific idea for their business. Every touch should stand on its own.</p>

    <h2>The Follow-Up Framework: Value, Not Reminders</h2>
    <h3>Touch 1: The Value Add</h3>
    <p>Follow up with something genuinely useful — an insight about their market, a relevant case study, a quick idea for their team. "Wanted to share this since it reminded me of our conversation" is infinitely better than "just following up."</p>

    <h3>Touch 2: The Social Proof</h3>
    <p>Share a quick win from a similar company. "Thought you'd find this interesting — we helped [similar company] reduce their reply handling time by 80%." Specificity and relevance beat volume every time.</p>

    <h3>Touch 3: The New Angle</h3>
    <p>If the original message did not resonate, try a different hook. Maybe the value prop was wrong for their stage, or the timing was off. A new angle gives them a reason to reconsider without feeling like you are nagging.</p>

    <h3>Touch 4: The Breakup</h3>
    <p>The final email is the "I'll stop reaching out" message. Counterintuitively, this often generates the highest reply rate of the entire sequence. It creates urgency and gives the prospect permission to say yes or no — both of which are outcomes you want.</p>

    <h2>Why Most Cadences Die Too Early</h2>
    <p>Teams abandon sequences after 2-3 touches because they interpret silence as rejection. But silence usually means one of three things: the email landed in spam, the prospect is busy, or the timing is off. None of these are permanent conditions.</p>
    <p>The cost of giving up too early is enormous. If your reply rate on touch 3 is 5%, and you stop at touch 2, you are leaving a 5% conversion rate on the table — and those replies are often from the highest-intent prospects, because they needed multiple signals before engaging.</p>

    <blockquote>
      <p>Silence is not rejection. It is a prospect waiting for the right moment, the right message, or the right reason. Your job is to provide all three.</p>
    </blockquote>

    <h2>When to Stop: The 5-Touch Rule</h2>
    <p>After 5 touches over 14 days, further emails have diminishing returns and increasing risk of spam complaints. Respect the prospect's inbox. If they have not replied after 5 well-crafted messages, the lead is either not ready or not a fit. Mark it, revisit in 90 days, and focus your energy on warmer leads.</p>

    <p>Our <Link to="/services/multi-touch-outreach">multi-touch outreach service</Link> builds the exact cadence — email, call, and LinkedIn — so follow-up timing is never left to guesswork.</p>
  </ArticleLayout>
)

export default FollowUpTiming

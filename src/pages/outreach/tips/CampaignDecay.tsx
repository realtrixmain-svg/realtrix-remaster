import React from 'react'
import { Link } from 'react-router-dom'
import ArticleLayout from '../ArticleLayout'

const CampaignDecay: React.FC = () => (
  <ArticleLayout
    title="Why Your Best Campaign Loses After Day 14"
    description="Campaign decay is real — and most teams never see it coming."
    canonical="/outreach/tips/campaign-decay"
    type="Tip"
    tldr="Every cold email campaign degrades over time. After day 14, open rates drop, reply rates fall, and deliverability suffers. Build decay monitoring into your workflow and kill campaigns before they damage your domain."
  >
    <h2>The Lifecycle of a Campaign</h2>
    <p>Every cold email campaign follows the same pattern: a strong start, a brief plateau, and a steady decline. The best campaigns peak around days 3-7, hold steady through day 10-14, and then begin degrading. By day 21, most campaigns are actively hurting your domain reputation more than they are generating pipeline.</p>
    <p>This is not a failure of the campaign — it is the natural lifecycle of any outreach effort. The problem is that most teams do not monitor for decay, so they keep sending long past the point of diminishing returns.</p>

    <h2>What Causes Campaign Decay</h2>
    <h3>Prospect Fatigue</h3>
    <p>The same prospects seeing your emails repeatedly start to tune them out. Even if they did not unsubscribe, their engagement drops — fewer opens, fewer clicks, zero replies. This non-engagement signals to email providers that your content is not valuable, which degrades deliverability.</p>

    <h3>Domain Reputation Erosion</h3>
    <p>As engagement drops across your campaign, your domain reputation suffers. Email providers track engagement rates across your sending domain — if your open rates and reply rates decline, they assume your content is lower quality and start routing more emails to spam. This affects not just the decaying campaign but all campaigns on that domain.</p>

    <h3>List Quality Degradation</h3>
    <p>Your best prospects respond early. By day 14, the remaining list is disproportionately composed of people who are not interested, not relevant, or not engaged. Continuing to send to this list generates negative signals with no positive offset.</p>

    <h2>How to Detect Decay</h2>
    <p>Monitor these metrics weekly during a campaign:</p>
    <ul>
      <li><strong>Open rate trend:</strong> If open rates drop below 15% (from a baseline of 30%+), the campaign is decaying</li>
      <li><strong>Reply rate trend:</strong> If reply rates drop below 1% (from a baseline of 3-5%), the campaign has run its course</li>
      <li><strong>Bounce rate trend:</strong> If bounce rates climb above 2%, the remaining list has quality issues</li>
      <li><strong>Unsubscribe rate:</strong> If unsubscribe rates spike, you have overstayed your welcome</li>
    </ul>
    <p>The key is trend analysis, not absolute numbers. A campaign that starts at 35% open rate and drops to 20% is decaying, even though 20% is still decent in isolation.</p>

    <h2>The Kill Criteria</h2>
    <p>Build explicit kill criteria into your campaign management process:</p>
    <ul>
      <li>Open rate drops below 50% of its peak: start planning the next campaign</li>
      <li>Reply rate drops below 25% of its peak: stop new sends, continue follow-ups only for engaged contacts</li>
      <li>Bounce rate exceeds 3%: pause immediately, clean the list before resuming</li>
      <li>Spam complaints exceed 0.1%: kill the campaign, investigate targeting</li>
    </ul>
    <p>Killing a campaign early is not failure — it is discipline. The resources saved by stopping a decaying campaign can be redirected to a fresh one with better targeting and higher engagement.</p>

    <blockquote>
      <p>The graveyard of cold email campaigns is full of messages that should have stopped at day 14 but kept going until they burned a domain. Monitor decay, set kill criteria, and act on them.</p>
    </blockquote>

    <p>Our <Link to="/services/cold-email-automation-setup">cold email automation setup</Link> includes decay monitoring baked into the infrastructure, so degrading campaigns get caught before they damage your domain.</p>
  </ArticleLayout>
)

export default CampaignDecay

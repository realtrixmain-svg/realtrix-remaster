import React from 'react'
import { Link } from 'react-router-dom'
import ArticleLayout from '../ArticleLayout'

const DomainWarmup: React.FC = () => (
  <ArticleLayout
    title="Domain Warm-Up Isn't Optional"
    description="Skipping warm-up is the fastest way to land in spam. Here is how to do it right."
    canonical="/outreach/tips/domain-warmup"
    type="Tip"
    tldr="Warm up every new domain for 2-4 weeks before sending cold email. Start at 5 emails/day, increase by 3-5 per day, and monitor inbox placement. Skipping warm-up destroys domain reputation before you send your first real campaign."
  >
    <h2>What Warm-Up Actually Does</h2>
    <p>When you register a new domain, email providers have zero data on your sending behavior. You have no reputation — which, to a spam filter, looks suspicious. A brand new domain suddenly sending 100 emails per day is the digital equivalent of a stranger walking into a party and shouting.</p>
    <p>Warm-up gradually builds your domain's reputation by sending small, consistent volumes over time. During warm-up, your emails are sent to a mix of real (opted-in) recipients and simulated inboxes. The goal: build open rates, reply rates, and engagement patterns that signal legitimacy to email providers.</p>

    <h2>The Warm-Up Timeline</h2>
    <p>A proper warm-up takes 2-4 weeks, depending on your target sending volume:</p>
    <ul>
      <li><strong>Week 1 (Days 1-7):</strong> 5-10 emails per day. Focus on engagement — replies, opens, and forwards. This builds the foundation.</li>
      <li><strong>Week 2 (Days 8-14):</strong> 15-30 emails per day. Increase volume gradually. Monitor for any deliverability issues.</li>
      <li><strong>Week 3 (Days 15-21):</strong> 30-50 emails per day. Your domain should have established a positive reputation by now.</li>
      <li><strong>Week 4 (Days 22-28):</strong> 50-100 emails per day. Ramp to your target daily volume. Continue monitoring.</li>
    </ul>
    <p>The exact numbers depend on your target volume and email provider. The principle is consistent: start small, increase gradually, and never skip a step.</p>

    <h2>Warm-Up Best Practices</h2>
    <h3>Consistency Over Volume</h3>
    <p>Sending 10 emails every day is better than sending 70 once a week. Email providers reward consistent daily sending patterns. Spikes in volume — even if the total weekly volume is reasonable — trigger spam filters because they look like automated blasts.</p>

    <h3>Engagement Is the Goal</h3>
    <p>Warm-up is not just about sending emails. It is about generating engagement. Use warm-up tools that simulate opens, replies, and forwards. The engagement signals are what build reputation — the sending volume is just the vehicle.</p>

    <h3>Monitor Inbox Placement</h3>
    <p>During warm-up, use inbox placement testing tools to verify where your emails are landing. Check daily. If your emails start landing in spam during warm-up, something is wrong — slow down, investigate, and do not proceed until placement is stable.</p>

    <h3>Do Not Send Cold Email During Warm-Up</h3>
    <p>Resist the temptation to start sending real cold emails before warm-up is complete. If your warm-up engagement is weak and you start cold emailing, you will damage your domain reputation before it is established. The 2-4 weeks of patience saves months of deliverability recovery.</p>

    <h2>Common Warm-Up Mistakes</h2>
    <ul>
      <li><strong>Too fast:</strong> Jumping to 50+ emails on day 3 is the number one warm-up mistake</li>
      <li><strong>Inconsistent:</strong> Sending 20 emails on Monday, 0 on Tuesday, 40 on Wednesday looks erratic</li>
      <li><strong>No monitoring:</strong> Running warm-up without checking inbox placement is flying blind</li>
      <li><strong>Wrong content:</strong> Sending marketing-heavy HTML during warm-up triggers spam filters — use plain text</li>
      <li><strong>Cold email too early:</strong> Starting real campaigns before warm-up is complete negates the entire process</li>
    </ul>

    <blockquote>
      <p>Warm-up is not a hurdle to get past. It is an investment in your domain's long-term health. A domain with strong reputation delivers better, lands higher, and converts more — every campaign, indefinitely.</p>
    </blockquote>

    <p>Our <Link to="/services/email-deliverability-consulting">deliverability consulting service</Link> manages domain warm-up and monitors inbox placement so you never send on a cold domain.</p>
  </ArticleLayout>
)

export default DomainWarmup

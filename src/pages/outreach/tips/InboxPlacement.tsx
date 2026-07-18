import React from 'react'
import { Link } from 'react-router-dom'
import ArticleLayout from '../ArticleLayout'

const InboxPlacement: React.FC = () => (
  <ArticleLayout
    title="Inbox Placement: Why Great Emails Fail"
    description="Your message is perfect — but nobody sees it. Here is why."
    canonical="/outreach/tips/inbox-placement"
    type="Tip"
    tldr="Even great emails fail if they land in spam. Inbox placement depends on domain reputation, sender authentication, sending patterns, and content signals. Fix infrastructure before you fix copy."
  >
    <h2>The Invisible Problem</h2>
    <p>You have written a perfect cold email. The subject line is compelling, the copy is personalized, the offer is relevant. You hit send — and the reply rate is 0%. Not because the email was bad, but because it never reached the inbox.</p>
    <p>Inbox placement is the most overlooked problem in cold email. Most teams spend 90% of their time optimizing copy and 10% on deliverability. The reality should be reversed — because no amount of great copy matters if the email lands in spam.</p>

    <h2>The Deliverability Stack</h2>
    <p>Inbox placement depends on five layers, all of which must be healthy:</p>
    <ul>
      <li><strong>Domain reputation:</strong> Your sending domain's trust score with Gmail, Outlook, and other providers</li>
      <li><strong>Authentication:</strong> SPF, DKIM, and DMARC records that prove you own the domain</li>
      <li><strong>Sending patterns:</strong> Volume, frequency, and consistency that look natural</li>
      <li><strong>Content quality:</strong> Email body and subject line signals that do not trigger spam filters</li>
      <li><strong>List quality:</strong> Sending to valid, engaged contacts who do not mark you as spam</li>
    </ul>
    <p>A failure in any one layer can tank your deliverability across the entire campaign.</p>

    <h2>Domain Reputation: The Foundation</h2>
    <p>Every domain has a reputation score with each email provider. This score is built over time through sending behavior — consistent volume, low spam complaints, high engagement. New domains start with no reputation, which is why warm-up is essential before sending any cold email.</p>
    <p>Key signals that build reputation: consistent daily sending volume, recipients opening and replying, low bounce rates, and zero spam complaints. Key signals that destroy it: sudden volume spikes, high bounce rates, spam reports, and sending to invalid addresses.</p>

    <h2>Authentication: Proving You Are Legitimate</h2>
    <p>SPF, DKIM, and DMARC are DNS records that tell email providers you are authorized to send from your domain. Without them, your emails look like spoofing — and spam filters will treat them accordingly.</p>
    <ul>
      <li><strong>SPF:</strong> Lists the IP addresses authorized to send on behalf of your domain</li>
      <li><strong>DKIM:</strong> Adds a cryptographic signature that proves the email was not tampered with</li>
      <li><strong>DMARC:</strong> Tells providers what to do with emails that fail SPF or DKIM checks</li>
    </ul>
    <p>All three must be correctly configured before you send a single cold email. This is not optional — it is the baseline for getting to the inbox at all.</p>

    <h2>Content Signals That Trigger Spam Filters</h2>
    <p>Spam filters analyze your email content for patterns associated with spam. Red flags include:</p>
    <ul>
      <li>ALL CAPS in subject lines or body</li>
      <li>Excessive punctuation (!!!, ???)</li>
      <li>Trigger words like "free," "guarantee," "no obligation"</li>
      <li>Image-heavy emails with little text</li>
      <li>Links to recently registered or low-reputation domains</li>
      <li>HTML formatting that looks like marketing templates</li>
    </ul>
    <p>The fix: write plain-text emails, avoid formatting, keep links minimal, and write like a human — not a marketer.</p>

    <blockquote>
      <p>Deliverability is not a one-time setup. It is an ongoing practice. Monitor your inbox placement weekly, not monthly. By the time you notice a problem, you may have already burned a domain.</p>
    </blockquote>

    <h2>The Warm-Up Non-Negotiable</h2>
    <p>New domains must be warmed up before sending cold email. This means sending gradually increasing volumes over 2-4 weeks, building reputation through consistent, low-volume sending. Skipping warm-up is the number one reason new campaigns fail — and the fix is simple patience.</p>

    <p>Our <Link to="/services/email-deliverability-consulting">email deliverability consulting</Link> audits and fixes inbox placement issues at the infrastructure level.</p>
  </ArticleLayout>
)

export default InboxPlacement

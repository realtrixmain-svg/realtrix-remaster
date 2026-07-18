import React from 'react'
import { Link } from 'react-router-dom'
import ArticleLayout from '../ArticleLayout'

const PersonalizationBoundaries: React.FC = () => (
  <ArticleLayout
    title="Personalization Without Being Creepy"
    description="There is a line between thoughtful and invasive. Here is where it is."
    canonical="/outreach/tips/personalization-boundaries"
    type="Tip"
    tldr="Personalize with public, professional information — not private details. Reference company activity, public content, and professional milestones. Never reference personal life details, private social media, or information you should not reasonably have."
  >
    <h2>The Creepiness Spectrum</h2>
    <p>Personalization in cold email exists on a spectrum. On one end: "I saw your company just raised a Series A — congratulations." On the other end: "I saw your vacation photos from Cabo last week — looks like you had fun." Both are personal. One builds trust. The other builds fear.</p>
    <p>The line between thoughtful and invasive is not always obvious — but it exists, and crossing it can damage your brand, trigger spam complaints, and even create legal liability. Understanding where the line is matters.</p>

    <h2>The Public/Private Framework</h2>
    <p>A simple rule: <strong>if the information is public and professional, it is fair game. If it is private or personal, it is off-limits.</strong></p>
    <h3>Fair Game (Public + Professional)</h3>
    <ul>
      <li>Company blog posts, press releases, and public announcements</li>
      <li>LinkedIn posts and professional activity</li>
      <li>Podcast appearances and public speaking engagements</li>
      <li>Job postings and team expansion announcements</li>
      <li>Funding rounds and M&A activity</li>
      <li>Conference attendance and industry awards</li>
      <li>Published case studies and company milestones</li>
    </ul>
    <p>These are things the prospect has chosen to make public. Referencing them shows you did your research without overstepping.</p>

    <h3>Off-Limits (Private or Personal)</h3>
    <ul>
      <li>Personal social media posts (Instagram, Facebook, personal Twitter)</li>
      <li>Family details, relationship status, or personal life events</li>
      <li>Private LinkedIn activity (posts only visible to connections)</li>
      <li>Information from paid databases or scraped private profiles</li>
      <li>Physical location tracking or office visits</li>
      <li>Personal email content or private messages</li>
    </ul>
    <p>Even if you can access this information, using it in a cold email crosses the trust boundary. The prospect did not consent to you using their personal data for outreach.</p>

    <h2>The "Newspaper Test"</h2>
    <p>Before using a personalization detail, ask: "Would this feel appropriate if it appeared in a newspaper article about how I found the prospect?" If the answer is no, do not use it. This test forces you to consider how the prospect would feel if they knew how you obtained the information.</p>
    <p>"I saw your LinkedIn post about hiring" passes the newspaper test. "I noticed you were at the same conference as me last week" passes if the conference was public. "I saw your Instagram post from last weekend" does not pass.</p>

    <h2>When in Doubt, Default to Company</h2>
    <p>If you are unsure whether a detail is appropriate, default to company-level personalization rather than individual-level. Company news, public statements, and professional milestones are always safe. Individual personal details — even public ones — require more judgment.</p>
    <p>A safe hierarchy: company activity &gt; professional content &gt; public role &gt; individual activity. The further you move toward the individual, the more carefully you should vet the appropriateness.</p>

    <blockquote>
      <p>The goal of personalization is to show relevance, not surveillance. If the prospect would feel impressed that you noticed, it is good personalization. If they would feel watched, it is not.</p>
    </blockquote>

    <p>Our <Link to="/services/done-for-you-cold-email">done-for-you cold email service</Link> keeps personalization professional and public-signal-based as a matter of process, not just policy.</p>
  </ArticleLayout>
)

export default PersonalizationBoundaries

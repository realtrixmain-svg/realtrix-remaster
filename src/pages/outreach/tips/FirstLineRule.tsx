import React from 'react'
import { Link } from 'react-router-dom'
import ArticleLayout from '../ArticleLayout'

const FirstLineRule: React.FC = () => (
  <ArticleLayout
    title="The First Line Rule: Earn the Read"
    description="Your first sentence does all the work. Make it count."
    canonical="/outreach/tips/first-line-rule"
    type="Tip"
    tldr="The first line of your cold email determines whether the rest gets read. It must be specific, relevant, and about the prospect — not about you. Reference something real, ask a question, or make a bold observation."
  >
    <h2>Why the First Line Is Everything</h2>
    <p>Your cold email has roughly 2 seconds to earn the next 10 seconds of attention. In those first 2 seconds, the prospect reads the first line — and decides whether to keep reading or archive. The first line is not just the beginning of your email. It is the entire email.</p>
    <p>Most cold emails fail in the first line. They open with "I hope this email finds you well" (delete), "I'm reaching out because..." (delete), or "My name is..." (delete). These openings tell the prospect nothing — and in a crowded inbox, nothing gets deleted.</p>

    <h2>The Three Types of Strong First Lines</h2>
    <h3>1. The Observation</h3>
    <p>Reference something specific you noticed about the prospect or their company. This works because it proves you did research and signals relevance. Examples:</p>
    <ul>
      <li>"Saw you just expanded the sales team to 12 — congrats on the growth."</li>
      <li>"Noticed you're hiring for 3 SDR roles right now."</li>
      <li>"Your recent piece on PLG in B2B SaaS hit on something we see constantly."</li>
    </ul>
    <p>The key: the observation must be real and verifiable. Fake observations destroy trust instantly.</p>

    <h3>2. The Question</h3>
    <p>Open with a question that names a pain you know the prospect has. Questions create an open loop — the brain wants to close it. Examples:</p>
    <ul>
      <li>"How much time is your team spending on manual reply classification?"</li>
      <li>"Are your cold email domains still landing in spam after warm-up?"</li>
      <li>"What would your pipeline look like if every reply was qualified before it hit your inbox?"</li>
    </ul>
    <p>The question must be relevant to the prospect's role and company size. Generic questions feel like spam.</p>

    <h3>3. The Bold Statement</h3>
    <p>Make a specific, slightly provocative claim that the prospect wants to engage with. This works because it creates curiosity and positions you as someone with an opinion, not just a pitch. Examples:</p>
    <ul>
      <li>"Your cold email reply rate is probably 30% lower than it should be."</li>
      <li>"Most companies waste 40% of their outreach budget on bad data."</li>
      <li>"The best SDRs don't write their own follow-ups anymore."</li>
    </ul>
    <p>The statement must be backed by data or experience you can reference in the body. Empty boldness is just noise.</p>

    <h2>First Lines to Never Use</h2>
    <ul>
      <li>"I hope this email finds you well" — the most deleted opening in cold email history</li>
      <li>"I'm the [title] at [Company]" — nobody cares who you are yet</li>
      <li>"I'll keep this brief" — just keep it brief, do not announce it</li>
      <li>"We help companies like yours..." — generic and clearly templated</li>
      <li>"Not sure if you're the right person..." — shows you did not research</li>
    </ul>

    <h2>The First Line Test</h2>
    <p>Before sending any cold email, read only the first line. Ask: would a busy executive keep reading? If the answer is not an immediate yes, rewrite it. The first line must earn the right to exist — and the rest of the email must earn the right to be replied to.</p>

    <blockquote>
      <p>The first line is the only line that matters. If it does not earn the read, the rest of your email is wasted. Spend 80% of your writing time on the first line, and 20% on everything else.</p>
    </blockquote>

    <p>Our <Link to="/services/done-for-you-cold-email">done-for-you cold email service</Link> writes every first line for you, tuned to earn the read.</p>
  </ArticleLayout>
)

export default FirstLineRule

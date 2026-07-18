import React, { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import PublicNav from '../../components/PublicNav'
import PublicFooter from '../../components/PublicFooter'
import SEO from '../../components/SEO'
import { useIsMobile } from '../../hooks/useIsMobile'

const CAL_LINK = 'https://cal.com/trevorryan/30min'
const bookCall = () => window.open(CAL_LINK, '_blank')

const TOPICS = ['Cold Email', 'Deliverability', 'AI Sales', 'Data Hygiene', 'CRM', 'Copywriting', 'Execution', 'Strategy'] as const

interface TipCard {
  title: string
  desc: string
  path: string
  tags: string[]
}

const TIPS: TipCard[] = [
  { title: 'How to Write Cold Email Subject Lines', desc: 'Subject lines that get opened — patterns, anti-patterns, and the data behind what works.', path: '/outreach/tips/cold-email-subject-lines', tags: ['Cold Email', 'Copywriting'] },
  { title: 'Follow-Up Timing: The Golden Cadence', desc: 'The science of when to follow up, and why most cadences die before they work.', path: '/outreach/tips/follow-up-timing', tags: ['Cold Email', 'AI Sales'] },
  { title: 'Personalization at Scale', desc: 'How to make every email feel hand-written without actually writing every one.', path: '/outreach/tips/personalization-at-scale', tags: ['AI Sales', 'Copywriting', 'Data Hygiene'] },
  { title: "Handling 'Not Interested' Replies", desc: 'The response framework that turns objections into opportunities.', path: '/outreach/tips/handling-cold-email-replies', tags: ['CRM', 'AI Sales'] },
  { title: 'Inbox Placement: Why Great Emails Fail', desc: 'Your message is perfect — but nobody sees it. Here is why.', path: '/outreach/tips/inbox-placement', tags: ['Cold Email', 'Deliverability'] },
  { title: 'Bad Data Is the Silent Campaign Killer', desc: 'How dirty data poisons every metric downstream — and how to fix it.', path: '/outreach/tips/bad-data-silent-killer', tags: ['AI Sales', 'Data Hygiene'] },
  { title: 'The First Line Rule: Earn the Read', desc: 'Your first sentence does all the work. Make it count.', path: '/outreach/tips/first-line-rule', tags: ['Copywriting', 'Cold Email'] },
  { title: 'Signals > Guessing: When to Follow Up', desc: 'Stop spraying follow-ups on a timer. Start reading buying signals instead.', path: '/outreach/tips/signals-over-guessing', tags: ['AI Sales', 'CRM'] },
  { title: 'Why Your Best Campaign Loses After Day 14', desc: 'Campaign decay is real — and most teams never see it coming.', path: '/outreach/tips/campaign-decay', tags: ['Cold Email', 'Execution'] },
  { title: 'Personalization Without Being Creepy', desc: 'There is a line between thoughtful and invasive. Here is where it is.', path: '/outreach/tips/personalization-boundaries', tags: ['AI Sales', 'Copywriting'] },
  { title: 'The Reply Triage System Top SDRs Use', desc: 'How elite teams sort, score, and route replies in under 60 seconds.', path: '/outreach/tips/reply-triage-system', tags: ['CRM', 'Execution'] },
  { title: "Domain Warm-Up Isn't Optional", desc: 'Skipping warm-up is the fastest way to land in spam. Here is how to do it right.', path: '/outreach/tips/domain-warmup', tags: ['Cold Email', 'Deliverability'] },
  { title: 'When to Kill a Lead', desc: 'Holding on too long costs more than letting go. Here is how to decide.', path: '/outreach/tips/when-to-kill-a-lead', tags: ['AI Sales', 'Strategy'] },
  { title: 'Automation vs. Laziness', desc: 'Good automation compounds. Lazy automation burns domains.', path: '/outreach/tips/authentic-automation', tags: ['Execution', 'AI Sales'] },
]

const BREADCRUMB_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://realtrix.org' },
    { '@type': 'ListItem', position: 2, name: 'Outreach Hub', item: 'https://realtrix.org/outreach' },
  ],
}

const PAGE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Outreach Hub — The playbook library for SaaS and automation teams building outbound',
  description: 'Filterable library of cold email, AI sales, deliverability, and outbound strategy tips for SaaS and automation teams.',
  url: 'https://realtrix.org/outreach',
}

const OutreachHub: React.FC = () => {
  const [activeFilters, setActiveFilters] = useState<Set<string>>(new Set())
  const m = useIsMobile()

  const toggleFilter = (topic: string) => {
    setActiveFilters((prev) => {
      const next = new Set(prev)
      if (next.has(topic)) next.delete(topic)
      else next.add(topic)
      return next
    })
  }

  const filteredTips = useMemo(() => {
    if (activeFilters.size === 0) return TIPS
    return TIPS.filter((t) => t.tags.some((tag) => activeFilters.has(tag)))
  }, [activeFilters])

  return (
    <div style={{ fontFamily: "'Work Sans', sans-serif", color: '#000', background: 'oklch(97% 0.01 75)', minHeight: '100vh' }}>
      <SEO
        title="Outreach Hub"
        description="Filterable library of cold email, AI sales, deliverability, and outbound strategy tips for SaaS and automation teams."
        canonical="/outreach"
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(PAGE_SCHEMA) }} />

      <PublicNav />

      <section style={{ padding: `${m ? '60px 20px 32px' : '80px 32px 48px'}`, maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, color: '#D9A600', textTransform: 'uppercase', marginBottom: 16, textShadow: '0 1px 0 rgba(0,0,0,0.12)' }}>Outreach Hub</div>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(36px, 4.5vw, 56px)', fontWeight: 600, lineHeight: 1.05, margin: '0 0 16px', letterSpacing: -0.5 }}>The playbook library</h1>
        <p style={{ fontSize: 19, lineHeight: 1.55, color: '#444', maxWidth: 560, margin: 0 }}>Filterable tips and strategies for SaaS and automation teams building outbound that actually converts.</p>
      </section>

      <section style={{ padding: `${m ? '0 20px 50px' : '0 32px 80px'}`, maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: m ? '1fr' : '1fr 260px', gap: m ? 32 : 48 }}>
        <div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 32 }}>
            {TOPICS.map((topic) => {
              const active = activeFilters.has(topic)
              return (
                <button key={topic} onClick={() => toggleFilter(topic)} style={{ padding: '8px 16px', borderRadius: 999, border: active ? '1px solid transparent' : '1px solid oklch(85% 0.01 70)', background: active ? '#000' : 'transparent', color: active ? '#fff' : '#333', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: "'Work Sans', sans-serif", transition: 'all .2s ease' }}>{topic}</button>
              )
            })}
            {activeFilters.size > 0 && (
              <button onClick={() => setActiveFilters(new Set())} style={{ padding: '8px 16px', borderRadius: 999, border: '1px solid oklch(85% 0.01 70)', background: 'transparent', color: '#888', fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: "'Work Sans', sans-serif" }}>Clear all</button>
            )}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
            {filteredTips.map((tip) => (
              <Link key={tip.path} to={tip.path} style={{ textDecoration: 'none', padding: '24px 24px', borderRadius: 8, border: '1px solid oklch(88% 0.01 70)', background: 'oklch(99% 0.005 75)', transition: 'all .2s ease', display: 'block' }}>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
                  {tip.tags.map((tag) => (
                    <span key={tag} style={{ fontSize: 11, fontWeight: 600, padding: '3px 8px', borderRadius: 3, background: 'oklch(95% 0.015 90)', color: '#7a5f00' }}>{tag}</span>
                  ))}
                </div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 19, fontWeight: 600, margin: '0 0 8px', color: '#000', lineHeight: 1.3 }}>{tip.title}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.55, color: '#555', margin: 0 }}>{tip.desc}</p>
                <div style={{ marginTop: 14, fontSize: 13, fontWeight: 600, color: '#000' }}>Read more →</div>
              </Link>
            ))}
          </div>

          {filteredTips.length === 0 && (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: '#888', fontSize: 16 }}>No tips match the selected filters.</div>
          )}
        </div>

        <aside style={{ paddingTop: 40 }}>
          <div style={{ position: 'sticky', top: 100 }}>
            <div style={{ padding: '24px', borderRadius: 8, border: '1px solid oklch(88% 0.01 70)', background: 'oklch(99% 0.005 75)', marginBottom: 20 }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 600, marginBottom: 10 }}>Filter by Topic</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {TOPICS.map((topic) => {
                  const count = TIPS.filter((t) => t.tags.includes(topic)).length
                  return (
                    <button key={topic} onClick={() => toggleFilter(topic)} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', borderRadius: 6, border: 'none', background: activeFilters.has(topic) ? '#000' : 'transparent', color: activeFilters.has(topic) ? '#fff' : '#333', fontSize: 14, fontWeight: 500, cursor: 'pointer', fontFamily: "'Work Sans', sans-serif", textAlign: 'left', transition: 'all .15s ease' }}>
                      <span>{topic}</span>
                      <span style={{ opacity: 0.5 }}>{count}</span>
                    </button>
                  )
                })}
              </div>
            </div>
            <div style={{ padding: '24px', borderRadius: 8, background: '#000', color: '#fff' }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 600, marginBottom: 8 }}>Deploy Instead of Studying</div>
              <p style={{ fontSize: 14, lineHeight: 1.5, color: '#b3b3b3', margin: '0 0 16px' }}>We run this entire system for you — infrastructure, sourcing, and AI-qualified replies.</p>
              <button onClick={bookCall} style={{ width: '100%', padding: '12px 20px', borderRadius: 4, border: 'none', background: '#FFD400', color: '#000', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: "'Work Sans', sans-serif" }}>Book a Call →</button>
            </div>
          </div>
        </aside>
      </section>

      <PublicFooter />
    </div>
  )
}

export default OutreachHub

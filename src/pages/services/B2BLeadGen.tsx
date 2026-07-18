import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../../components/SEO'
import PublicNav from '../../components/PublicNav'
import PublicFooter from '../../components/PublicFooter'

const CAL_LINK = 'https://cal.com/trevorryan/30min'
const bookCall = () => window.open(CAL_LINK, '_blank')

const STEPS = [
  { num: '01', title: 'ICP Definition', desc: 'We define your ideal customer profile — industry, company size, title, geography, tech stack — before a single email is written.' },
  { num: '02', title: 'Prospect Sourcing', desc: 'Verified contacts sourced from LinkedIn, Apollo, and proprietary databases. Every record validated for accuracy and deliverability.' },
  { num: '03', title: 'Data Cleaning & Enrichment', desc: 'Names, titles, company data, LinkedIn URLs — enriched and deduplicated so every touchpoint is personal.' },
  { num: '04', title: 'Campaign Launch', desc: 'Sequences deployed across authenticated domains with proper warmup, A/B testing, and send-time optimization.' },
  { num: '05', title: 'Reply Management & Handoff', desc: 'Every reply classified by AI. Meetings and qualified leads routed to your inbox or CRM. Noise filtered out.' },
]

const B2BLeadGen: React.FC = () => {
  const [vw, setVw] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200)
  const [hoverStep, setHoverStep] = useState<number | null>(null)
  const isMobile = vw < 760
  const sidePad = isMobile ? '20px' : '64px'

  React.useEffect(() => {
    const onResize = () => setVw(window.innerWidth)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <div style={{ fontFamily: "'Work Sans', sans-serif", color: '#000', background: 'oklch(97% 0.01 75)', overflowX: 'hidden', minHeight: '100vh' }}>
      <SEO
        title="B2B Lead Generation"
        description="Managed B2B lead generation — ICP definition, prospect sourcing, data enrichment, campaign launch, and AI-qualified reply management."
        canonical="/services/b2b-lead-generation"
        keywords="b2b lead generation, b2b leads, lead generation service, managed lead generation, b2b outreach"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'B2B Lead Generation',
          serviceType: 'B2B lead generation',
          provider: { '@type': 'Organization', name: 'Realtrix', url: 'https://realtrix.org' },
          description: 'Full-cycle B2B lead generation from ICP definition to qualified reply handoff.',
          url: 'https://realtrix.org/services/b2b-lead-generation',
          areaServed: { '@type': 'Country', name: 'Worldwide' },
          audience: { '@type': 'BusinessAudience', audienceType: 'B2B SaaS and automation companies' },
          offers: {
            '@type': 'AggregateOffer',
            priceCurrency: 'USD',
            lowPrice: '150',
            highPrice: '300',
            offerCount: '2',
            offers: [
              { '@type': 'Offer', name: 'Base infrastructure tier', price: '150', priceCurrency: 'USD', priceSpecification: { '@type': 'UnitPriceSpecification', price: '150', priceCurrency: 'USD', unitText: 'MONTH' }, description: 'Domains ($20), mailboxes & warmup ($50), sending platform ($40), sourcing & verification ($25), AI reply processing ($15).' },
              { '@type': 'Offer', name: 'Growth infrastructure tier', price: '300', priceCurrency: 'USD', priceSpecification: { '@type': 'UnitPriceSpecification', price: '300', priceCurrency: 'USD', unitText: 'MONTH' }, description: 'Domains ($40), mailboxes & warmup ($100), sending platform ($80), sourcing & verification ($50), AI reply processing ($30).' },
            ],
          },
        }}
      />
      <PublicNav />

      <section style={{ padding: `${isMobile ? '100px' : '140px'} ${sidePad} ${isMobile ? '60px' : '80px'}`, maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
        <div style={{ display: 'inline-block', fontSize: 11, fontWeight: 700, letterSpacing: 1, color: '#000', textTransform: 'uppercase', marginBottom: 20, padding: '6px 14px', borderRadius: 999, background: 'rgba(255,212,0,0.25)' }}>
          Managed Campaign Package
        </div>
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(36px,5vw,68px)', lineHeight: 0.98, fontWeight: 600, margin: '0 0 28px', letterSpacing: -1 }}>
          B2B Lead Generation
        </h1>
        <p style={{ fontSize: 20, lineHeight: 1.55, color: '#333', maxWidth: 600, margin: '0 auto 44px' }}>
          From ICP to qualified reply — a complete managed outbound pipeline. We find the right people, write the right messages, and deliver the right replies.
        </p>
        <button
          style={{ padding: '16px 32px', borderRadius: 4, border: 'none', background: '#000', color: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}
          onClick={bookCall}
        >Book a Call</button>
      </section>

      <section style={{ padding: `${isMobile ? '60px' : '96px'} ${sidePad}`, maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(30px,3.6vw,46px)', fontWeight: 600, margin: 0, letterSpacing: -0.5 }}>How It Works</h2>
        </div>
        <div style={{ position: 'relative', paddingTop: 36 }}>
          {!isMobile && (
            <div style={{ position: 'absolute', top: 18, left: '1%', right: '1%', height: 3, borderRadius: 2, background: '#e0e0e0' }}>
              <div style={{ height: 3, background: '#FFD400', width: `${((hoverStep ?? 0) / (STEPS.length - 1)) * 100}%`, transition: 'width .5s cubic-bezier(.4,0,.2,1)', borderRadius: 2 }} />
            </div>
          )}
          <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? 32 : 16, position: 'relative' }}>
            {STEPS.map((s, i) => {
              const active = (hoverStep ?? 0) === i
              return (
                <div
                  key={s.num}
                  style={{ cursor: 'default', flex: isMobile ? 'none' : 1, minWidth: isMobile ? '0' : 0 }}
                  onMouseEnter={() => setHoverStep(i)}
                  onMouseLeave={() => setHoverStep(null)}
                >
                  <div style={{ width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, marginBottom: 20, transition: 'all .3s ease', background: active ? '#FFD400' : '#000', color: '#000', boxShadow: active ? '0 0 0 5px rgba(255,212,0,0.25)' : 'none' }}>{s.num}</div>
                  <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 20, fontWeight: 600, marginBottom: 8 }}>{s.title}</div>
                  <div style={{ fontSize: 14.5, lineHeight: 1.6, color: '#444' }}>{s.desc}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section style={{ padding: `${isMobile ? '60px' : '96px'} ${sidePad}`, background: '#000' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(30px,3.6vw,46px)', fontWeight: 600, color: '#fff', margin: '0 0 20px', letterSpacing: -0.5 }}>
            What counts as a qualified lead?
          </h2>
          <p style={{ fontSize: 17, color: '#b3b3b3', lineHeight: 1.7, maxWidth: 620, margin: '0 auto 16px' }}>
            A qualified lead is a real human who has replied with genuine interest — not an auto-responder, not a "remove me," not an out-of-office.
          </p>
          <p style={{ fontSize: 17, color: '#b3b3b3', lineHeight: 1.7, maxWidth: 620, margin: '0 auto 16px' }}>
            We classify every reply using AI scoring: Meeting Request, Interested, Info Request, Contact Later, or Not Interested. Only the first three count as qualified.
          </p>
          <p style={{ fontSize: 17, color: '#b3b3b3', lineHeight: 1.7, maxWidth: 620, margin: '0 auto 40px' }}>
            You only pay for what matters. No inflated lead counts. No vanity metrics.
          </p>
        </div>
      </section>

      <section style={{ padding: `${isMobile ? '48px' : '80px'} ${sidePad}`, maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
        <blockquote style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(20px,2.4vw,26px)', fontWeight: 500, lineHeight: 1.5, color: '#000', margin: 0 }}>
          "The Realtrix team have been nothing short of professional. We've managed to get over 21 meetings to date — they've found quality leads within our ideal customer persona."
        </blockquote>
        <div style={{ fontSize: 14, color: '#666', marginTop: 20 }}>— Kopano Mashona, KPRM Media</div>
        <p style={{ fontSize: 15, color: '#888', marginTop: 24 }}>Infrastructure billed at cost, a fee only when a real reply lands. <Link to="/pricing" style={{ color: '#000', fontWeight: 600, textDecoration: 'underline' }}>See exactly how pricing works →</Link></p>
      </section>

      <section style={{ padding: `${isMobile ? '60px' : '110px'} ${sidePad}`, maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(28px,3.2vw,42px)', fontWeight: 600, margin: '0 0 16px', letterSpacing: -0.5 }}>
          Ready to scale beyond single-channel?
        </h2>
        <p style={{ fontSize: 17, color: '#444', maxWidth: 520, margin: '0 auto 40px' }}>
          Pair lead generation with Multi-Touch Outreach for enterprise-grade, multi-channel campaigns.
        </p>
        <Link
          to="/services/multi-touch-outreach"
          style={{ display: 'inline-block', padding: '16px 32px', borderRadius: 4, border: 'none', background: '#FFD400', color: '#000', fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', textDecoration: 'none' }}
        >See Multi-Touch Outreach →</Link>
      </section>

      <PublicFooter />
    </div>
  )
}

export default B2BLeadGen

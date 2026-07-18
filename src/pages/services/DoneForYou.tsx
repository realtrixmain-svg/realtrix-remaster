import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../../components/SEO'
import PublicNav from '../../components/PublicNav'
import PublicFooter from '../../components/PublicFooter'

const CAL_LINK = 'https://cal.com/trevorryan/30min'
const bookCall = () => window.open(CAL_LINK, '_blank')

const PAIN_POINTS = [
  { title: 'Domain reputation ruined', desc: 'You bought a cheap domain, blasted 500 emails on day one, and now your IP is blacklisted. Recovering takes months — if it happens at all.' },
  { title: 'Inbox lands in spam', desc: 'No SPF, no DKIM, no DMARC. Your emails hit the promotions tab or the spam folder before anyone reads a word.' },
  { title: 'No system for warmup', desc: 'You send 200 emails on Monday, 50 on Wednesday, nothing for two weeks. Inconsistent volume triggers spam filters every time.' },
  { title: 'You\'re writing copy for yourself', desc: 'The message sounds great to you — because you wrote it. Prospects see "I hope this finds you well" and delete instantly.' },
]

const INCLUDED = [
  { title: 'Domain Infrastructure Setup', desc: 'We register, configure, and authenticate your sending domains — SPF, DKIM, DMARC, custom tracking — the full stack.' },
  { title: 'Email Warmup Management', desc: 'Automated warmup pools ramp your sending volume gradually, building sender reputation before a single real email goes out.' },
  { title: 'Prospect List Building', desc: 'Verified, enriched contact lists sourced from your ICP. Every email validated before it enters a sequence.' },
  { title: 'Custom Copywriting', desc: 'Subject lines, opening hooks, and body copy written for your audience — not generic templates pulled from a swipe file.' },
  { title: 'Inbox Management', desc: 'Every reply classified by AI and routed to the right person. No shared inbox chaos, no missed opportunities.' },
  { title: 'A/B Testing', desc: 'Subject lines, send times, body copy variants — tested against each other with real data, not gut instinct.' },
]

const DoneForYou: React.FC = () => {
  const [vw, setVw] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200)
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
        title="Done-For-You Cold Email Systems"
        description="We handle domain setup, list building, copywriting, and inbox management — so you can focus on closing deals. Full-service cold email for SaaS and automation teams."
        canonical="/services/done-for-you-cold-email"
        keywords="done for you cold email, cold email service, done for you email outreach, managed cold email, cold email done for you"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'Done-For-You Cold Email Systems',
          serviceType: 'Managed cold email outbound',
          provider: { '@type': 'Organization', name: 'Realtrix', url: 'https://realtrix.org' },
          description: 'Full-service cold email infrastructure, sourcing, sequencing, and AI-qualified reply management.',
          url: 'https://realtrix.org/services/done-for-you-cold-email',
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
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(36px,5vw,68px)', lineHeight: 0.98, fontWeight: 600, margin: '0 0 28px', letterSpacing: -1 }}>
          Done-For-You Cold Email Systems
        </h1>
        <p style={{ fontSize: 20, lineHeight: 1.55, color: '#333', maxWidth: 600, margin: '0 auto 44px' }}>
          Built for SaaS and automation teams that want pipeline without hiring an outreach team. We handle everything — you handle the calls.
        </p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            style={{ padding: '16px 32px', borderRadius: 4, border: 'none', background: '#000', color: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}
            onClick={bookCall}
          >Book a Call</button>
          <a href="#whats-included" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none', color: '#000', fontSize: 15, fontWeight: 600 }}>See what's included →</a>
        </div>
      </section>

      <section style={{ padding: `${isMobile ? '60px' : '96px'} ${sidePad}`, maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(30px,3.6vw,46px)', fontWeight: 600, margin: '0 0 12px', letterSpacing: -0.5 }}>Why Companies Fail at DIY</h2>
          <p style={{ fontSize: 17, color: '#444', maxWidth: 520, margin: '0 auto' }}>Cold email looks simple. It isn't. Here's where most teams get stuck.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 32 : 28 }}>
          {PAIN_POINTS.map((p, i) => (
            <div key={p.title} style={{ padding: '32px', borderRadius: 10, border: '1px solid oklch(88% 0.02 90)', background: 'oklch(99% 0.005 75)', ...(i % 2 === 1 && !isMobile ? { borderLeft: '1px solid oklch(88% 0.02 90)' } : {}) }}>
              <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 20, fontWeight: 600, marginBottom: 12, lineHeight: 1.3 }}>{p.title}</div>
              <div style={{ fontSize: 15, lineHeight: 1.65, color: '#444' }}>{p.desc}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="whats-included" style={{ padding: `${isMobile ? '60px' : '96px'} ${sidePad}`, background: '#000' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(30px,3.6vw,46px)', fontWeight: 600, color: '#fff', margin: '0 0 12px', letterSpacing: -0.5 }}>What's Included?</h2>
            <p style={{ fontSize: 17, color: '#b3b3b3', maxWidth: 520, margin: '0 auto' }}>Everything you need to run cold email at scale — without building it yourself.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr 1fr', gap: isMobile ? 24 : 20 }}>
            {INCLUDED.map((item) => (
              <div key={item.title} style={{ padding: '28px 24px', borderRadius: 8, border: '1px solid #262626', background: '#0a0a0a' }}>
                <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 18, fontWeight: 600, color: '#FFD400', marginBottom: 10 }}>{item.title}</div>
                <div style={{ fontSize: 14, lineHeight: 1.65, color: '#b3b3b3' }}>{item.desc}</div>
              </div>
            ))}
          </div>
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
          We handle domain setup, list building, copywriting, and inbox management — so you can focus on closing deals.
        </h2>
        <p style={{ fontSize: 17, color: '#444', maxWidth: 560, margin: '0 auto 40px' }}>No retainers. No mystery. One clear engagement, one clear outcome.</p>
        <button
          style={{ padding: '16px 32px', borderRadius: 4, border: 'none', background: '#FFD400', color: '#000', fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}
          onClick={bookCall}
        >Book a Call →</button>
      </section>

      <PublicFooter />
    </div>
  )
}

export default DoneForYou

import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../../components/SEO'
import PublicNav from '../../components/PublicNav'
import PublicFooter from '../../components/PublicFooter'

const CAL_LINK = 'https://cal.com/trevorryan/30min'
const bookCall = () => window.open(CAL_LINK, '_blank')

const WHY_MULTI_CHANNEL = [
  { title: 'Email alone hits a ceiling', desc: 'Most B2B prospects receive 120+ emails a day. Your message competes with everything else in their inbox — including internal threads.' },
  { title: 'Calls break through the noise', desc: 'A well-timed call after an email creates familiarity. The prospect already saw your name. Now they hear it.' },
  { title: 'LinkedIn adds credibility', desc: 'A connection request or profile view before outreach signals you\'re real. It\'s the digital equivalent of eye contact.' },
  { title: 'Repetition builds trust', desc: 'Studies show it takes 6–8 touchpoints to generate a qualified lead. Multi-channel gets you there faster without burning a single inbox.' },
]

const CADENCE = [
  { day: 'Day 1', channel: 'Email', desc: 'Personalized cold email — introduction, value prop, soft CTA.' },
  { day: 'Day 2', channel: 'Call', desc: 'Follow-up call referencing the email. Voicemail if no answer.' },
  { day: 'Day 3', channel: 'LinkedIn', desc: 'Connection request with a short, personalized note.' },
  { day: 'Day 6', channel: 'Email', desc: 'Second email — case study or social proof. Different angle.' },
  { day: 'Day 8', channel: 'LinkedIn', desc: 'Engage with their content or send a direct message.' },
  { day: 'Day 10', channel: 'Call', desc: 'Second call attempt. Reference the LinkedIn touchpoint.' },
  { day: 'Day 13', channel: 'Email', desc: 'Final email — breakup message with a clear, low-friction CTA.' },
]

const CHECKLIST = [
  'Dedicated sending domains with authentication',
  'Automated warmup and deliverability monitoring',
  'ICP-defined prospect lists, verified and enriched',
  'Multi-channel sequence design (email + call + LinkedIn)',
  'Personalized copywriting for every touchpoint',
  'AI reply classification and routing',
  'CRM / Slack integration for qualified leads',
  'Weekly performance reporting',
  'A/B testing across channels',
  'Dedicated account manager',
]

const STANDARD = [
  '3-channel cadence (email, call, LinkedIn)',
  'Up to 1,000 prospects/month',
  'Weekly reporting',
  'Email + LinkedIn automation',
  'AI reply classification',
  'CRM integration',
]

const ENTERPRISE = [
  'Everything in Standard',
  'Unlimited prospects',
  'Custom cadence design',
  'Dedicated SDR support',
  'Slack-based reply routing',
  'Quarterly strategy reviews',
  'Priority support',
]

const MultiTouchOutreach: React.FC = () => {
  const [vw, setVw] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200)
  const [hoverCard, setHoverCard] = useState<number | null>(null)
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
        title="Multi-Touch Outreach"
        description="Enterprise multi-touch B2B outreach — email, phone, and LinkedIn in a coordinated 13-day, 7-touch cadence. Infrastructure at cost, a fee only when a reply lands."
        canonical="/services/multi-touch-outreach"
        keywords="multi-touch outreach, b2b multi-channel outreach, multi-touch cadence, b2b outreach campaign, email phone linkedin outreach, enterprise outreach"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'Multi-Touch Outreach',
          serviceType: 'Multi-channel B2B outreach',
          provider: { '@type': 'Organization', name: 'Realtrix', url: 'https://realtrix.org' },
          description: 'Enterprise multi-touch B2B outreach across email, phone, and LinkedIn with a 13-day, 7-touch cadence.',
          url: 'https://realtrix.org/services/multi-touch-outreach',
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
          Multi-Touch Outreach
        </h1>
        <p style={{ fontSize: 20, lineHeight: 1.55, color: '#333', maxWidth: 600, margin: '0 auto 44px' }}>
          One email isn't enough. A coordinated 13-day, 7-touch cadence across email, phone, and LinkedIn — managed end to end.
        </p>
        <button
          style={{ padding: '16px 32px', borderRadius: 4, border: 'none', background: '#000', color: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}
          onClick={bookCall}
        >Book a Call</button>
      </section>

      <section style={{ padding: `${isMobile ? '60px' : '96px'} ${sidePad}`, maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(30px,3.6vw,46px)', fontWeight: 600, margin: '0 0 12px', letterSpacing: -0.5 }}>Why Multi-Channel Works</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 24 : 20 }}>
          {WHY_MULTI_CHANNEL.map((card, i) => {
            const active = hoverCard === i
            return (
              <div
                key={card.title}
                onMouseEnter={() => setHoverCard(i)}
                onMouseLeave={() => setHoverCard(null)}
                style={{
                  padding: '32px 28px', borderRadius: 10, border: '1px solid oklch(88% 0.02 90)',
                  background: active ? '#000' : 'oklch(99% 0.005 75)',
                  transition: 'all .3s ease',
                }}
              >
                <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 20, fontWeight: 600, marginBottom: 10, color: active ? '#FFD400' : '#000', transition: 'color .3s ease' }}>{card.title}</div>
                <div style={{ fontSize: 15, lineHeight: 1.65, color: active ? '#ccc' : '#444', transition: 'color .3s ease' }}>{card.desc}</div>
              </div>
            )
          })}
        </div>
      </section>

      <section style={{ padding: `${isMobile ? '60px' : '96px'} ${sidePad}`, background: '#000' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(30px,3.6vw,46px)', fontWeight: 600, color: '#fff', margin: '0 0 12px', letterSpacing: -0.5 }}>The 13-Day, 7-Touch Cadence</h2>
            <p style={{ fontSize: 17, color: '#b3b3b3', maxWidth: 520, margin: '0 auto' }}>Every touchpoint is timed, personalized, and tracked.</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {CADENCE.map((touch, i) => (
              <div key={touch.day} style={{ display: 'flex', gap: isMobile ? 16 : 32, alignItems: 'flex-start', padding: '24px 0', borderTop: '1px solid #262626' }}>
                <div style={{ width: isMobile ? 56 : 80, flexShrink: 0 }}>
                  <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 18, fontWeight: 600, color: '#FFD400' }}>{touch.day}</div>
                  <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 0.5, color: '#888', textTransform: 'uppercase', marginTop: 4 }}>{touch.channel}</div>
                </div>
                <div style={{ fontSize: 15, lineHeight: 1.6, color: '#b3b3b3', paddingTop: 2 }}>{touch.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: `${isMobile ? '60px' : '96px'} ${sidePad}`, maxWidth: 900, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(30px,3.6vw,46px)', fontWeight: 600, margin: '0 0 12px', letterSpacing: -0.5 }}>Everything Managed</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 16 : 12 }}>
          {CHECKLIST.map((item) => (
            <div key={item} style={{ display: 'flex', gap: 12, alignItems: 'baseline', padding: '12px 0' }}>
              <span style={{ color: '#FFD400', fontSize: 16, flexShrink: 0 }}>✓</span>
              <span style={{ fontSize: 15, lineHeight: 1.5 }}>{item}</span>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: `${isMobile ? '60px' : '100px'} ${sidePad}`, background: '#000' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(28px,3.5vw,44px)', fontWeight: 600, color: '#fff', marginBottom: 8, maxWidth: 760, marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.25 }}>Infrastructure at cost. A fee only when a reply lands.</div>
          <p style={{ fontSize: 16, color: '#888', marginBottom: 48, maxWidth: 560, marginLeft: 'auto', marginRight: 'auto' }}>Adding phone and LinkedIn touches doesn't change how you're billed — no separate retainer for this service. <Link to="/pricing" style={{ color: '#FFD400', fontWeight: 600, textDecoration: 'underline' }}>See the full cost breakdown →</Link></p>

          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 24 : 28, textAlign: 'left' }}>
            <div style={{ padding: '36px 32px', borderRadius: 10, border: '1px solid #262626', background: '#0a0a0a' }}>
              <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 600, color: '#fff', marginBottom: 24 }}>Standard</div>
              {STANDARD.map((item) => (
                <div key={item} style={{ display: 'flex', gap: 12, alignItems: 'baseline', padding: '10px 0', borderTop: '1px solid #1a1a1a' }}>
                  <span style={{ color: '#FFD400', fontSize: 14 }}>→</span>
                  <span style={{ fontSize: 14.5, color: '#b3b3b3' }}>{item}</span>
                </div>
              ))}
            </div>
            <div style={{ padding: '36px 32px', borderRadius: 10, border: '1px solid #FFD40033', background: '#0a0a0a' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
                <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 600, color: '#fff' }}>Enterprise</div>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, padding: '3px 8px', borderRadius: 999, background: 'rgba(255,212,0,0.15)', color: '#FFD400' }}>POPULAR</div>
              </div>
              {ENTERPRISE.map((item) => (
                <div key={item} style={{ display: 'flex', gap: 12, alignItems: 'baseline', padding: '10px 0', borderTop: '1px solid #1a1a1a' }}>
                  <span style={{ color: '#FFD400', fontSize: 14 }}>→</span>
                  <span style={{ fontSize: 14.5, color: '#b3b3b3' }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: `${isMobile ? '60px' : '110px'} ${sidePad}`, maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(28px,3.2vw,42px)', fontWeight: 600, margin: '0 0 16px', letterSpacing: -0.5 }}>
          Ready to go multi-channel?
        </h2>
        <p style={{ fontSize: 17, color: '#444', maxWidth: 520, margin: '0 auto 40px' }}>
          Tell us who you sell to. We'll scope the right cadence and tell you exactly what it costs.
        </p>
        <button
          style={{ padding: '16px 32px', borderRadius: 4, border: 'none', background: '#FFD400', color: '#000', fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}
          onClick={bookCall}
        >Book a Call →</button>
      </section>

      <PublicFooter />
    </div>
  )
}

export default MultiTouchOutreach

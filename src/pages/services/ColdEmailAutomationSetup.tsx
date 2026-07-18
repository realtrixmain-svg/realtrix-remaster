import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../../components/SEO'
import PublicNav from '../../components/PublicNav'
import PublicFooter from '../../components/PublicFooter'

const CARDS = [
  {
    tag: '01',
    title: 'Infrastructure & Configuration',
    items: ['DNS record setup (SPF, DKIM, DMARC)', 'Custom tracking domains', 'Google Workspace / Microsoft 365 mailbox provisioning', 'Sending domain authentication'],
    consequence: "Skip this and Google/Yahoo's bulk sender rules — enforced since 2024 — will silently reject or bulk-folder your mail before a single prospect sees it. Proper email authentication setup isn't optional anymore.",
  },
  {
    tag: '02',
    title: 'Warmup & Deliverability',
    items: ['Automated warmup pool deployment', 'Volume ramp schedules', 'Spam score testing per sequence', 'Blacklist monitoring'],
    consequence: 'Send at full volume on day one and you burn the domain before it earns any sender reputation — most blacklist flags trace back to a skipped or rushed warmup period.',
  },
  {
    tag: '03',
    title: 'Data & CRM',
    items: ['Lead source integration (data providers, professional networks, CSV)', 'CRM field mapping to your existing system', 'Workflow automation between platforms', 'Data hygiene rules and deduplication'],
    consequence: 'A bad CRM mapping means duplicate outreach to the same prospect from two reps, or a hot reply sitting unrouted in an inbox nobody checks — the setup is worthless if replies don’t land where your team actually works.',
  },
  {
    tag: '04',
    title: 'Launch Ready',
    items: ['Sequence template setup', 'A/B test configuration', 'Team training and walkthrough', 'SOP documentation for ongoing ops'],
    consequence: "This is the difference between a system your team can actually run day-to-day and one that quietly breaks the first week nobody's watching it closely.",
  },
]

const FAQS = [
  {
    q: 'How long does cold email automation setup take?',
    a: 'Roughly 4 weeks end to end: infrastructure and DNS configuration in week 1 (DNS propagation alone can take 24-48 hours), a 2-4 week warmup ramp running in parallel with CRM and sequence setup, and a launch-ready system by week 4. Rushing warmup to launch faster is the single most common cause of deliverability problems in the first 90 days.',
  },
  {
    q: 'Do I need a separate domain for cold email?',
    a: 'Yes. Sending cold outreach from your primary company domain risks your main inbox’s sender reputation if anything goes wrong. We set up dedicated sending domains and route replies back to your team, so your core domain never touches cold volume.',
  },
  {
    q: 'How many mailboxes do I need to start?',
    a: 'It scales with your target sending volume, not a fixed number — more mailboxes means more daily send capacity without tripping per-mailbox sending limits. We size this during setup based on your actual list size and target reply volume, not a generic default.',
  },
  {
    q: 'Can you integrate with my existing CRM?',
    a: 'Yes — we’ve mapped fields and built workflows for every major CRM, plus custom integrations for anything else in your stack.',
  },
  {
    q: 'What happens after setup is complete?',
    a: 'You can run the system yourself with the SOP documentation and training we provide, or hand it off entirely to our done-for-you cold email service, which takes over sending, reply management, and AI-qualified reply routing on the infrastructure we just built.',
  },
]

const ColdEmailAutomationSetup: React.FC = () => {
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
        title="Cold Email Automation Setup Service"
        description="DNS, warmup, CRM integration, and sequence templates — set up right the first time. Get a launch-ready outbound engine in weeks, not months."
        canonical="/services/cold-email-automation-setup"
        keywords="cold email automation setup, cold email infrastructure setup, email warmup setup, cold email configuration"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'Cold Email Automation Setup',
          serviceType: 'Cold email infrastructure and automation setup',
          provider: { '@type': 'Organization', name: 'Realtrix', url: 'https://realtrix.org' },
          description: 'End-to-end cold email automation setup including infrastructure, warmup, CRM integration, and launch readiness.',
          url: 'https://realtrix.org/services/cold-email-automation-setup',
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
          Cold Email Automation Setup
        </h1>
        <p style={{ fontSize: 20, lineHeight: 1.55, color: '#333', maxWidth: 600, margin: '0 auto 44px' }}>
          From DNS records to sequence templates — we build the entire outbound engine so your team can launch with confidence.
        </p>
        <Link
          to="/readiness-quiz"
          style={{ display: 'inline-block', padding: '16px 32px', borderRadius: 4, border: 'none', background: '#000', color: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', textDecoration: 'none' }}
        >Take the Readiness Quiz →</Link>
      </section>

      <section style={{ padding: `${isMobile ? '60px' : '96px'} ${sidePad}`, maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 24 : 20 }}>
          {CARDS.map((card, i) => {
            const active = hoverCard === i
            return (
              <div
                key={card.tag}
                onMouseEnter={() => setHoverCard(i)}
                onMouseLeave={() => setHoverCard(null)}
                style={{
                  padding: '36px 32px', borderRadius: 10, border: '1px solid oklch(88% 0.02 90)',
                  background: active ? '#000' : 'oklch(99% 0.005 75)',
                  transition: 'all .3s ease',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, background: active ? '#FFD400' : 'oklch(94% 0.035 95)', color: '#000', transition: 'all .3s ease' }}>{card.tag}</div>
                  <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 21, fontWeight: 600, color: active ? '#fff' : '#000', transition: 'color .3s ease' }}>{card.title}</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {card.items.map((item) => (
                    <div key={item} style={{ display: 'flex', gap: 10, alignItems: 'baseline' }}>
                      <span style={{ color: active ? '#FFD400' : '#D9A600', fontSize: 14, flexShrink: 0, marginTop: 2 }}>→</span>
                      <span style={{ fontSize: 15, lineHeight: 1.5, color: active ? '#ccc' : '#444', transition: 'color .3s ease' }}>{item}</span>
                    </div>
                  ))}
                </div>
                <p style={{ fontSize: 13.5, lineHeight: 1.55, color: active ? '#999' : '#777', marginTop: 18, paddingTop: 16, borderTop: `1px solid ${active ? '#222' : 'oklch(90% 0.02 90)'}`, transition: 'color .3s ease' }}>{card.consequence}</p>
              </div>
            )
          })}
        </div>
      </section>

      <section style={{ padding: `${isMobile ? '48px' : '64px'} ${sidePad}`, maxWidth: 800, margin: '0 auto' }}>
        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(24px,2.8vw,34px)', fontWeight: 600, margin: '0 0 16px', letterSpacing: -0.3 }}>
          Cold email setup timeline: how long does it take?
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.65, color: '#333' }}>
          Roughly four weeks, start to finish. Week 1 covers infrastructure and DNS configuration — DNS propagation alone can take 24-48 hours. Weeks 2 through 4 run domain warmup in parallel with CRM mapping and sequence setup; warmup can't be rushed without risking the domain's sender reputation. By week 4 your system is launch-ready. Skipping or shortening warmup to launch faster is the single most common cause of deliverability problems in the first 90 days.
        </p>
      </section>

      <section style={{ padding: `${isMobile ? '48px' : '64px'} ${sidePad}`, maxWidth: 800, margin: '0 auto' }}>
        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(24px,2.8vw,34px)', fontWeight: 600, margin: '0 0 24px', letterSpacing: -0.3 }}>
          Frequently asked questions
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {FAQS.map((faq) => (
            <div key={faq.q}>
              <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 18, fontWeight: 600, margin: '0 0 8px', color: '#000' }}>{faq.q}</h3>
              <p style={{ fontSize: 15, lineHeight: 1.65, color: '#444', margin: 0 }}>{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: `${isMobile ? '40px' : '56px'} ${sidePad}`, maxWidth: 800, margin: '0 auto' }}>
        <p style={{ fontSize: 16, lineHeight: 1.65, color: '#333' }}>
          Setup gets your engine running — if you'd rather we run it day-to-day, see our <Link to="/services/done-for-you-cold-email" style={{ color: '#000', fontWeight: 600, textDecoration: 'underline' }}>fully managed, pay-per-reply cold email service</Link>. Already have infrastructure but still landing in spam? That's a different problem — see <Link to="/services/email-deliverability-consulting" style={{ color: '#000', fontWeight: 600, textDecoration: 'underline' }}>deliverability consulting</Link> instead. Or <Link to="/tools/roi-calculator" style={{ color: '#000', fontWeight: 600, textDecoration: 'underline' }}>calculate the ROI</Link> of a properly set up system before you commit.
        </p>
      </section>

      <section style={{ padding: `${isMobile ? '60px' : '110px'} ${sidePad}`, maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(28px,3.2vw,42px)', fontWeight: 600, margin: '0 0 16px', letterSpacing: -0.5 }}>
          Not sure if your system is ready?
        </h2>
        <p style={{ fontSize: 17, color: '#444', maxWidth: 520, margin: '0 auto 40px' }}>
          Take our 2-minute readiness quiz to find out exactly what's missing — and what to fix first.
        </p>
        <Link
          to="/readiness-quiz"
          style={{ display: 'inline-block', padding: '16px 32px', borderRadius: 4, border: 'none', background: '#FFD400', color: '#000', fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', textDecoration: 'none' }}
        >Take the Readiness Quiz →</Link>
        <p style={{ fontSize: 14, color: '#888', marginTop: 20 }}>Already know you're ready? <a href="https://cal.com/trevorryan/30min" target="_blank" rel="noopener noreferrer" style={{ color: '#000', fontWeight: 600, textDecoration: 'underline' }}>Book a call directly →</a></p>
      </section>

      <PublicFooter />
    </div>
  )
}

export default ColdEmailAutomationSetup

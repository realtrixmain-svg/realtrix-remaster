import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../../components/SEO'
import PublicNav from '../../components/PublicNav'
import PublicFooter from '../../components/PublicFooter'

const CAL_LINK = 'https://cal.com/trevorryan/30min'
const bookCall = () => window.open(CAL_LINK, '_blank')

const AUDIT_ITEMS = [
  { title: 'DNS Authentication', desc: 'SPF, DKIM, and DMARC records — verified, aligned, and enforced.' },
  { title: 'IP & Domain Blacklist Status', desc: 'We check 100+ blacklists and flag any listings that are tanking your reach.' },
  { title: 'Sender Reputation Score', desc: 'Google Postmaster, Microsoft SNDS, and third-party reputation tools — all cross-referenced.' },
  { title: 'Content Spam Triggers', desc: 'Subject lines, body copy, link ratios, image-to-text balance — every signal that triggers filters.' },
  { title: 'Technical Setup', desc: 'Mailbox configuration, sending limits, bounce handling, feedback loop setup.' },
  { title: 'Warmup History', desc: 'Volume curves, consistency, ramp speed — the pattern that tells us if your warmup was done right.' },
]

const DeliverabilityConsulting: React.FC = () => {
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
        title="Email Deliverability Consulting"
        description="Email deliverability consulting — spam folder rescue, DNS audit, sender reputation recovery, and inbox placement optimization."
        canonical="/services/email-deliverability-consulting"
        keywords="email deliverability consulting, email deliverability audit, spam folder fix, email reputation repair, inbox placement"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'Email Deliverability Consulting',
          serviceType: 'Email deliverability consulting',
          provider: { '@type': 'Organization', name: 'Realtrix', url: 'https://realtrix.org' },
          description: 'Comprehensive email deliverability audits, spam folder rescue, and sender reputation recovery.',
          url: 'https://realtrix.org/services/email-deliverability-consulting',
          areaServed: { '@type': 'Country', name: 'Worldwide' },
          audience: { '@type': 'BusinessAudience', audienceType: 'B2B SaaS and automation companies' },
        }}
      />
      <PublicNav />

      <section style={{ padding: `${isMobile ? '100px' : '140px'} ${sidePad} ${isMobile ? '60px' : '80px'}`, maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(36px,5vw,68px)', lineHeight: 0.98, fontWeight: 600, margin: '0 0 28px', letterSpacing: -1 }}>
          Email Deliverability Consulting
        </h1>
        <p style={{ fontSize: 20, lineHeight: 1.55, color: '#333', maxWidth: 600, margin: '0 auto 44px' }}>
          Your emails aren't reaching inboxes. We find out why — and fix it, step by step.
        </p>
        <button
          style={{ padding: '16px 32px', borderRadius: 4, border: 'none', background: '#000', color: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}
          onClick={bookCall}
        >Get a Deliverability Audit</button>
      </section>

      <section style={{ padding: `${isMobile ? '60px' : '96px'} ${sidePad}`, maxWidth: 900, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(30px,3.6vw,46px)', fontWeight: 600, margin: '0 0 12px', letterSpacing: -0.5 }}>What We Audit</h2>
          <p style={{ fontSize: 17, color: '#444', maxWidth: 480, margin: '0 auto' }}>Every deliverability factor, checked against industry benchmarks and current best practices.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 20 : 16 }}>
          {AUDIT_ITEMS.map((item) => (
            <div key={item.title} style={{ padding: '28px 24px', borderRadius: 8, border: '1px solid oklch(88% 0.02 90)', background: 'oklch(99% 0.005 75)' }}>
              <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 18, fontWeight: 600, marginBottom: 8 }}>{item.title}</div>
              <div style={{ fontSize: 14, lineHeight: 1.65, color: '#444' }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: `${isMobile ? '60px' : '100px'} ${sidePad}`, background: '#000' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(30px,3.6vw,46px)', fontWeight: 600, color: '#fff', margin: '0 0 20px', letterSpacing: -0.5 }}>
            Recover Your Reputation
          </h2>
          <p style={{ fontSize: 17, color: '#b3b3b3', lineHeight: 1.7, maxWidth: 620, margin: '0 auto 20px' }}>
            If your open rates are below 30%, your sender reputation needs attention. We diagnose the root cause — DNS misconfiguration, blacklisting, content triggers, or warmup gaps — and build a recovery plan.
          </p>
          <p style={{ fontSize: 17, color: '#b3b3b3', lineHeight: 1.7, maxWidth: 620, margin: '0 auto 40px' }}>
            Most clients see measurable improvement within 2–4 weeks. We don't just tell you what's wrong — we fix it.
          </p>
          <button
            style={{ padding: '16px 32px', borderRadius: 4, border: 'none', background: '#FFD400', color: '#000', fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}
            onClick={bookCall}
          >Book an Audit →</button>
        </div>
      </section>

      <section style={{ padding: `${isMobile ? '48px' : '80px'} ${sidePad}`, maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
        <blockquote style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(20px,2.4vw,26px)', fontWeight: 500, lineHeight: 1.5, color: '#000', margin: 0 }}>
          "The Realtrix team have been nothing short of professional. We've managed to get over 21 meetings to date — they've found quality leads within our ideal customer persona."
        </blockquote>
        <div style={{ fontSize: 14, color: '#666', marginTop: 20 }}>— Kopano Mashona, KPRM Media</div>
      </section>

      <section style={{ padding: `${isMobile ? '60px' : '110px'} ${sidePad}`, maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(28px,3.2vw,42px)', fontWeight: 600, margin: '0 0 16px', letterSpacing: -0.5 }}>
          Pricing
        </h2>
        <p style={{ fontSize: 17, color: '#444', maxWidth: 520, margin: '0 auto 40px' }}>
          Audit pricing depends on your current infrastructure size and deliverability state — contact us for a custom quote. If you're also running outreach with us, see how <Link to="/pricing" style={{ color: '#000', fontWeight: 600, textDecoration: 'underline' }}>infra-at-cost, pay-per-reply pricing</Link> works for the rest of the engagement.
        </p>
        <button
          style={{ padding: '16px 32px', borderRadius: 4, border: '1px solid #000', background: 'transparent', color: '#000', fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}
          onClick={bookCall}
        >Contact for Pricing →</button>
      </section>

      <PublicFooter />
    </div>
  )
}

export default DeliverabilityConsulting

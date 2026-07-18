import React, { useState } from 'react'
import SEO from '../components/SEO'
import PublicNav from '../components/PublicNav'
import PublicFooter from '../components/PublicFooter'
import { useIsMobile } from '../hooks/useIsMobile'

const CAL_LINK = 'https://cal.com/trevorryan/30min'

const TIERS: Record<string, { total: number; rows: { label: string; value: string }[] }> = {
  Base: {
    total: 150,
    rows: [
      { label: 'Domains', value: '$20' },
      { label: 'Mailboxes & warmup', value: '$50' },
      { label: 'Sending platform', value: '$40' },
      { label: 'Sourcing & verification', value: '$25' },
      { label: 'AI reply processing', value: '$15' },
    ],
  },
  Growth: {
    total: 300,
    rows: [
      { label: 'Domains', value: '$40' },
      { label: 'Mailboxes & warmup', value: '$100' },
      { label: 'Sending platform', value: '$80' },
      { label: 'Sourcing & verification', value: '$50' },
      { label: 'AI reply processing', value: '$30' },
    ],
  },
}

const FEE_ROWS = [
  { label: 'Meeting Request', value: '$100', note: 'Qualified meeting booked' },
  { label: 'Interested', value: '$60', note: 'Positive reply, not yet a meeting' },
  { label: 'Info Request', value: '$40', note: 'Asks for details, pricing, or a one-pager' },
  { label: 'Contact Later', value: '$30', note: 'Replied but deferred' },
  { label: 'OOO / Not Interested', value: '$0', note: 'Not billable — auto-replies, negatives, OOO' },
]

const COMPARISON = [
  { feature: 'Infrastructure cost', traditional: 'Hidden in retainer', realtrix: 'At cost — transparent' },
  { feature: 'Monthly retainer', traditional: '$2,000 – $5,000+', realtrix: '$0' },
  { feature: 'Per-reply fee', traditional: 'None (built into retainer)', realtrix: 'Yes — only for classified replies' },
  { feature: 'Headcount markup', traditional: 'Yes — you pay for "team time"', realtrix: 'Zero' },
  { feature: 'Reply classification', traditional: 'Manual or none', realtrix: 'AI — scored in real time' },
  { feature: 'Contract lock-in', traditional: '3–12 months', realtrix: 'Month to month' },
]

const Pricing: React.FC = () => {
  const [tier, setTier] = useState<'Base' | 'Growth'>('Base')
  const tierData = TIERS[tier]
  const m = useIsMobile()
  const sidePad = m ? 20 : 40

  return (
    <div style={{ fontFamily: "'Work Sans',sans-serif", color: '#000', background: 'oklch(97% 0.01 75)', minHeight: '100vh' }}>
      <SEO
        title="Pricing"
        description="Transparent pricing for cold email infrastructure. Pay infrastructure at cost, and a performance fee only when a classified reply lands."
        canonical="/pricing"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'Realtrix Cold Email Infrastructure',
          provider: { '@type': 'Organization', name: 'Realtrix', url: 'https://realtrix.org' },
          description: 'Transparent pricing for cold email infrastructure. Pay infrastructure at cost, and a performance fee only when a classified reply lands.',
          url: 'https://realtrix.org/pricing',
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Realtrix Pricing',
            itemListElement: [
              { '@type': 'Offer', name: 'Base infrastructure tier', price: '150', priceCurrency: 'USD', priceSpecification: { '@type': 'UnitPriceSpecification', price: '150', priceCurrency: 'USD', unitText: 'MONTH' } },
              { '@type': 'Offer', name: 'Growth infrastructure tier', price: '300', priceCurrency: 'USD', priceSpecification: { '@type': 'UnitPriceSpecification', price: '300', priceCurrency: 'USD', unitText: 'MONTH' } },
              { '@type': 'Offer', name: 'Meeting Request fee', price: '100', priceCurrency: 'USD', description: 'Qualified meeting booked' },
              { '@type': 'Offer', name: 'Interested reply fee', price: '60', priceCurrency: 'USD', description: 'Positive reply, not yet a meeting' },
              { '@type': 'Offer', name: 'Info Request fee', price: '40', priceCurrency: 'USD', description: 'Asks for details, pricing, or a one-pager' },
              { '@type': 'Offer', name: 'Contact Later fee', price: '30', priceCurrency: 'USD', description: 'Replied but deferred' },
              { '@type': 'Offer', name: 'OOO / Not Interested', price: '0', priceCurrency: 'USD', description: 'Not billable — auto-replies, negatives, OOO' },
            ],
          },
        }}
      />
      <PublicNav />

      <section style={{ padding: `${m ? 80 : 120}px ${sidePad} ${m ? 30 : 60}px`, maxWidth: 1100, margin: '0 auto', textAlign: 'center' }}>
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(36px,4.5vw,64px)', fontWeight: 600, letterSpacing: -1, margin: '0 0 20px', lineHeight: 1.05 }}>
          You pay infra.<br />You pay for what lands.<br />Nothing else.
        </h1>
        <p style={{ fontSize: m ? 16 : 18, lineHeight: 1.6, color: '#444', maxWidth: 600, margin: '0 auto' }}>
          No blended retainer. No headcount markup. Two line items, both transparent.
        </p>
      </section>

      <section style={{ padding: `${m ? 30 : 60}px ${sidePad} ${m ? 60 : 100}px`, maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : '1fr 1fr', gap: 28 }}>
          <div style={{ padding: m ? '28px 24px' : '36px 38px', borderRadius: 10, border: '1px solid oklch(88% 0.02 90)', background: 'oklch(99% 0.005 75)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, flexWrap: 'wrap', marginBottom: 24 }}>
              <div style={{ fontFamily: "'Playfair Display',serif", fontSize: m ? 19 : 21, fontWeight: 600 }}>Infrastructure — at cost</div>
              <div style={{ display: 'flex', flexShrink: 0, whiteSpace: 'nowrap', border: '1px solid oklch(85% 0.01 70)', borderRadius: 999, overflow: 'hidden' }}>
                {(['Base', 'Growth'] as const).map((t) => (
                  <button
                    key={t} onClick={() => setTier(t)}
                    style={{ padding: '7px 16px', border: 'none', background: tier === t ? '#000' : 'transparent', color: tier === t ? '#fff' : '#333', fontSize: 12.5, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', transition: 'all .2s ease', whiteSpace: 'nowrap' }}
                  >{t}</button>
                ))}
              </div>
            </div>
            {tierData.rows.map((row) => (
              <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '11px 0', borderTop: '1px solid oklch(90% 0.01 70)', fontSize: 14.5 }}>
                <span style={{ color: '#333' }}>{row.label}</span>
                <span style={{ fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>{row.value}</span>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '18px 0 2px' }}>
              <span style={{ fontWeight: 600 }}>Total / month (est.)</span>
              <span style={{ fontFamily: "'Playfair Display',serif", fontSize: 24, fontWeight: 600, color: '#8a6d00', fontVariantNumeric: 'tabular-nums' }}>~${tierData.total}</span>
            </div>
            <div style={{ fontSize: 13, color: '#555', marginTop: 10 }}>Domains, mailboxes, sending, sourcing, verification, and AI reply processing — passed through as one line, no markup.</div>
          </div>

          <div style={{ padding: m ? '28px 24px' : '36px 38px', borderRadius: 10, border: '1px solid oklch(88% 0.02 90)', background: 'oklch(99% 0.005 75)' }}>
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: m ? 19 : 21, fontWeight: 600, marginBottom: 24 }}>Performance fee — priced by reply</div>
            {FEE_ROWS.map((row) => {
              const free = row.value === '$0'
              return (
                <div key={row.label} style={{ padding: '11px 0', borderTop: '1px solid oklch(90% 0.01 70)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 14.5, color: free ? '#777' : '#333' }}>{row.label}</span>
                    <span style={{ fontWeight: 600, fontVariantNumeric: 'tabular-nums', color: free ? '#777' : '#000' }}>{row.value}</span>
                  </div>
                  <div style={{ fontSize: 12, color: '#888', marginTop: 2 }}>{row.note}</div>
                </div>
              )
            })}
            <div style={{ fontSize: 13, color: '#555', marginTop: 18 }}>No fee is owed until a real human reply lands and gets classified. Auto-replies and negatives cost you nothing.</div>
          </div>
        </div>
      </section>

      <section style={{ padding: `${m ? 50 : 80}px ${sidePad} ${m ? 60 : 100}px`, maxWidth: 1100, margin: '0 auto' }}>
        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(28px,3.5vw,42px)', fontWeight: 600, margin: '0 0 40px', textAlign: 'center', letterSpacing: -0.5 }}>Realtrix vs. Traditional Agencies</h2>
        {m ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {COMPARISON.map((row) => (
              <div key={row.feature} style={{ padding: '20px', borderRadius: 10, border: '1px solid oklch(88% 0.02 90)', background: 'oklch(99% 0.005 75)' }}>
                <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 12 }}>{row.feature}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <div style={{ fontSize: 13 }}><span style={{ color: '#888', fontWeight: 600 }}>Agency: </span><span style={{ color: '#666' }}>{row.traditional}</span></div>
                  <div style={{ fontSize: 13 }}><span style={{ color: '#888', fontWeight: 600 }}>Realtrix: </span><span style={{ color: '#000', fontWeight: 600 }}>{row.realtrix}</span></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ border: '1px solid oklch(88% 0.02 90)', borderRadius: 10, overflow: 'hidden' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1.3fr 1.3fr', padding: '14px 24px', background: 'oklch(94% 0.01 72)', fontSize: 11, fontWeight: 700, letterSpacing: 0.5, color: '#555', textTransform: 'uppercase' as const }}>
              <div>Feature</div>
              <div>Traditional Agency</div>
              <div>Realtrix</div>
            </div>
            {COMPARISON.map((row) => (
              <div key={row.feature} style={{ display: 'grid', gridTemplateColumns: '1.4fr 1.3fr 1.3fr', padding: '14px 24px', borderTop: '1px solid oklch(92% 0.01 70)', fontSize: 14, alignItems: 'center' }}>
                <div style={{ fontWeight: 600 }}>{row.feature}</div>
                <div style={{ color: '#666' }}>{row.traditional}</div>
                <div style={{ color: '#000', fontWeight: 600 }}>{row.realtrix}</div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section style={{ color: '#fff', padding: `${m ? 60 : 100}px ${sidePad}`, textAlign: 'center', background: '#000' }}>
        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(32px,4vw,52px)', fontWeight: 600, letterSpacing: -1, margin: '0 0 24px', maxWidth: 700, marginLeft: 'auto', marginRight: 'auto' }}>
          Ready to see what it costs for <span style={{ background: '#FFD400', color: '#000', padding: '2px 9px', borderRadius: 4 }}>your</span> pipeline?
        </h2>
        <p style={{ fontSize: 17, color: '#b3b3b3', maxWidth: 440, margin: '0 auto 36px' }}>We will scope your infrastructure and give you exact numbers — no commitment required.</p>
        <a
          href={CAL_LINK} target="_blank" rel="noopener noreferrer"
          style={{
            display: 'inline-block', padding: '16px 32px', borderRadius: 4, background: '#FFD400',
            color: '#000', fontSize: 15, fontWeight: 600, textDecoration: 'none', fontFamily: "'Work Sans',sans-serif",
          }}
        >Book a Call →</a>
      </section>

      <PublicFooter />
    </div>
  )
}

export default Pricing

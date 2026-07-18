import React, { useState } from 'react'
import SEO from '../../components/SEO'
import PublicNav from '../../components/PublicNav'
import PublicFooter from '../../components/PublicFooter'
import { useIsMobile } from '../../hooks/useIsMobile'

const fmt = (n: number) => n.toLocaleString('en-US', { maximumFractionDigits: 0 })
const fmtCurrency = (n: number) => `$${fmt(n)}`

const ROICalculator: React.FC = () => {
  const [dealValue, setDealValue] = useState(5000)
  const [monthlyEmails, setMonthlyEmails] = useState(3000)
  const [responseRate, setResponseRate] = useState(3)
  const [closeRate, setCloseRate] = useState(20)
  const m = useIsMobile()
  const sidePad = m ? 20 : 40

  const replies = Math.round(monthlyEmails * (responseRate / 100))
  const meetings = Math.round(replies * (closeRate / 100))
  const pipeline = meetings * dealValue
  const monthlyCost = 150
  const roiMultiple = pipeline > 0 ? (pipeline / monthlyCost) : 0

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '12px 16px', borderRadius: 6, border: '1px solid oklch(88% 0.02 90)',
    background: '#fff', fontSize: 16, fontFamily: "'Work Sans',sans-serif", outline: 'none',
    boxSizing: 'border-box' as const,
  }
  const labelStyle: React.CSSProperties = { fontSize: 13, fontWeight: 600, color: '#333', marginBottom: 6, display: 'block' }

  return (
    <div style={{ fontFamily: "'Work Sans',sans-serif", color: '#000', background: 'oklch(97% 0.01 75)', minHeight: '100vh' }}>
      <SEO
        title="Cold Email ROI Calculator"
        description="Calculate your projected meetings, pipeline value, and ROI from cold email outreach."
        canonical="/tools/roi-calculator"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'WebApplication',
          name: 'Cold Email ROI Calculator',
          url: 'https://realtrix.org/tools/roi-calculator',
          description: 'Calculate your projected meetings, pipeline value, and ROI from cold email outreach.',
          applicationCategory: 'BusinessApplication',
          operatingSystem: 'Any (web browser)',
          offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
          provider: { '@type': 'Organization', name: 'Realtrix', url: 'https://realtrix.org' },
        }}
      />
      <PublicNav />

      <section style={{ padding: `${m ? 80 : 120}px ${sidePad} ${m ? 30 : 60}px`, maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(32px,4vw,52px)', fontWeight: 600, letterSpacing: -1, margin: '0 0 16px' }}>
          ROI Calculator
        </h1>
        <p style={{ fontSize: 17, color: '#444', maxWidth: 480, margin: '0 auto' }}>
          Plug in your numbers and see the projected return on cold email infrastructure.
        </p>
      </section>

      <section style={{ padding: `${m ? 20 : 40}px ${sidePad} ${m ? 60 : 100}px`, maxWidth: 900, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : '1fr 1fr', gap: m ? 32 : 48 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div>
              <label style={labelStyle}>Average Deal Value ($)</label>
              <input type="number" value={dealValue} onChange={(e) => setDealValue(Number(e.target.value))} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Monthly Emails Sent</label>
              <input type="number" value={monthlyEmails} onChange={(e) => setMonthlyEmails(Number(e.target.value))} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Response Rate (%)</label>
              <input type="number" value={responseRate} onChange={(e) => setResponseRate(Number(e.target.value))} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Reply-to-Meeting Close Rate (%)</label>
              <input type="number" value={closeRate} onChange={(e) => setCloseRate(Number(e.target.value))} style={inputStyle} />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {[
              { label: 'Projected Replies / mo', value: fmt(replies) },
              { label: 'Projected Meetings / mo', value: fmt(meetings) },
              { label: 'Projected Pipeline Value', value: fmtCurrency(pipeline) },
              { label: 'Infrastructure Cost', value: `${fmtCurrency(monthlyCost)}/mo` },
            ].map((r) => (
              <div key={r.label} style={{ padding: '20px 24px', borderRadius: 8, border: '1px solid oklch(88% 0.02 90)', background: 'oklch(99% 0.005 75)' }}>
                <div style={{ fontSize: 13, color: '#555', marginBottom: 4 }}>{r.label}</div>
                <div style={{ fontFamily: "'Playfair Display',serif", fontSize: m ? 22 : 28, fontWeight: 600, color: '#8a6d00', fontVariantNumeric: 'tabular-nums' }}>{r.value}</div>
              </div>
            ))}
            <div style={{ padding: '24px 24px', borderRadius: 8, background: '#000', color: '#fff', textAlign: 'center' }}>
              <div style={{ fontSize: 13, color: '#b3b3b3', marginBottom: 4 }}>Estimated ROI Multiple</div>
              <div style={{ fontFamily: "'Playfair Display',serif", fontSize: m ? 32 : 40, fontWeight: 600, color: '#FFD400' }}>{roiMultiple.toFixed(1)}×</div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 48, padding: '20px 24px', borderRadius: 8, border: '1px solid oklch(88% 0.02 90)', background: 'oklch(96% 0.035 95)', fontSize: 13, lineHeight: 1.6, color: '#555' }}>
          <strong style={{ color: '#333' }}>Disclaimer:</strong> These are projections based on your inputs and Realtrix benchmarks. Actual results depend on ICP fit, offer strength, and deliverability. Infrastructure cost shown at Base tier (~$150/mo).
        </div>
      </section>

      <PublicFooter />
    </div>
  )
}

export default ROICalculator

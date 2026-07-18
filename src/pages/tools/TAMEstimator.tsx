import React, { useState } from 'react'
import SEO from '../../components/SEO'
import PublicNav from '../../components/PublicNav'
import PublicFooter from '../../components/PublicFooter'
import { useIsMobile } from '../../hooks/useIsMobile'

const INDUSTRIES = [
  { label: 'Marketing / Agency', companies: 45000 },
  { label: 'B2B SaaS', companies: 32000 },
  { label: 'Consulting / Professional Services', companies: 28000 },
  { label: 'E-commerce / DTC', companies: 38000 },
  { label: 'Finance / Fintech', companies: 18000 },
  { label: 'Healthcare / Medtech', companies: 15000 },
]

const SIZES = [
  { label: '1–10 employees', multiplier: 0.35 },
  { label: '11–50 employees', multiplier: 0.30 },
  { label: '51–200 employees', multiplier: 0.20 },
  { label: '201–1000 employees', multiplier: 0.10 },
  { label: '1000+ employees', multiplier: 0.05 },
]

const REGIONS = [
  { label: 'North America', multiplier: 1.0 },
  { label: 'Europe', multiplier: 0.7 },
  { label: 'Africa', multiplier: 0.15 },
  { label: 'Asia-Pacific', multiplier: 0.5 },
  { label: 'Latin America', multiplier: 0.2 },
  { label: 'Global (all regions)', multiplier: 1.0 },
]

const fmt = (n: number) => Math.round(n).toLocaleString('en-US')

const TAMEstimator: React.FC = () => {
  const [industry, setIndustry] = useState(INDUSTRIES[0].label)
  const [size, setSize] = useState(SIZES[0].label)
  const [region, setRegion] = useState(REGIONS[0].label)
  const m = useIsMobile()
  const sidePad = m ? 20 : 40

  const indVal = INDUSTRIES.find((i) => i.label === industry) ?? INDUSTRIES[0]
  const sizeVal = SIZES.find((s) => s.label === size) ?? SIZES[0]
  const regionVal = REGIONS.find((r) => r.label === region) ?? REGIONS[0]

  const tam = Math.round(indVal.companies * sizeVal.multiplier * regionVal.multiplier)

  const selectStyle: React.CSSProperties = {
    width: '100%', padding: '12px 16px', borderRadius: 6, border: '1px solid oklch(88% 0.02 90)',
    background: '#fff', fontSize: 16, fontFamily: "'Work Sans',sans-serif", outline: 'none',
    boxSizing: 'border-box' as const, appearance: 'auto' as const,
  }
  const labelStyle: React.CSSProperties = { fontSize: 13, fontWeight: 600, color: '#333', marginBottom: 6, display: 'block' }

  return (
    <div style={{ fontFamily: "'Work Sans',sans-serif", color: '#000', background: 'oklch(97% 0.01 75)', minHeight: '100vh' }}>
      <SEO
        title="Cold Email TAM Estimator"
        description="Estimate your total addressable market for cold email outreach by industry, company size, and region."
        canonical="/tools/tam-estimator"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'WebApplication',
          name: 'TAM Estimator',
          url: 'https://realtrix.org/tools/tam-estimator',
          description: 'Estimate your total addressable market for cold email outreach by industry, company size, and region.',
          applicationCategory: 'BusinessApplication',
          operatingSystem: 'Any (web browser)',
          offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
          provider: { '@type': 'Organization', name: 'Realtrix', url: 'https://realtrix.org' },
        }}
      />
      <PublicNav />

      <section style={{ padding: `${m ? 80 : 120}px ${sidePad} ${m ? 30 : 60}px`, maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(32px,4vw,52px)', fontWeight: 600, letterSpacing: -1, margin: '0 0 16px' }}>
          TAM Estimator
        </h1>
        <p style={{ fontSize: 17, color: '#444', maxWidth: 480, margin: '0 auto' }}>
          Get a rough estimate of your total addressable market for cold email outreach.
        </p>
      </section>

      <section style={{ padding: `${m ? 20 : 40}px ${sidePad} ${m ? 60 : 100}px`, maxWidth: 900, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : '1fr 1fr', gap: m ? 32 : 48 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div>
              <label style={labelStyle}>Industry</label>
              <select value={industry} onChange={(e) => setIndustry(e.target.value)} style={selectStyle}>
                {INDUSTRIES.map((i) => <option key={i.label} value={i.label}>{i.label}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Company Size</label>
              <select value={size} onChange={(e) => setSize(e.target.value)} style={selectStyle}>
                {SIZES.map((s) => <option key={s.label} value={s.label}>{s.label}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Region</label>
              <select value={region} onChange={(e) => setRegion(e.target.value)} style={selectStyle}>
                {REGIONS.map((r) => <option key={r.label} value={r.label}>{r.label}</option>)}
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ padding: '32px 28px', borderRadius: 10, border: '1px solid oklch(88% 0.02 90)', background: 'oklch(99% 0.005 75)', textAlign: 'center' }}>
              <div style={{ fontSize: 13, color: '#555', marginBottom: 8 }}>Estimated Total Addressable Market</div>
              <div style={{ fontFamily: "'Playfair Display',serif", fontSize: m ? 36 : 48, fontWeight: 600, color: '#8a6d00', fontVariantNumeric: 'tabular-nums' }}>{fmt(tam)}</div>
              <div style={{ fontSize: 14, color: '#555', marginTop: 6 }}>companies</div>
            </div>

            <div style={{ padding: '20px 24px', borderRadius: 8, border: '1px solid oklch(88% 0.02 90)', background: 'oklch(96% 0.035 95)' }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, color: '#555', textTransform: 'uppercase', marginBottom: 12 }}>Breakdown</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', fontSize: 14, borderBottom: '1px solid #ddd' }}>
                <span style={{ color: '#555' }}>Industry base</span><span style={{ fontWeight: 600 }}>{fmt(indVal.companies)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', fontSize: 14, borderBottom: '1px solid #ddd' }}>
                <span style={{ color: '#555' }}>Size filter</span><span style={{ fontWeight: 600 }}>{(sizeVal.multiplier * 100).toFixed(0)}%</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', fontSize: 14 }}>
                <span style={{ color: '#555' }}>Region filter</span><span style={{ fontWeight: 600 }}>{(regionVal.multiplier * 100).toFixed(0)}%</span>
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 40, padding: '20px 24px', borderRadius: 8, border: '1px solid oklch(88% 0.02 90)', background: 'oklch(96% 0.035 95)', fontSize: 13, lineHeight: 1.6, color: '#555' }}>
          <strong style={{ color: '#333' }}>Note:</strong> This is a directional estimate for scoping outreach volume. Real TAM depends on data availability, technographic filters, and ICP refinements we run during the build phase.
        </div>
      </section>

      <PublicFooter />
    </div>
  )
}

export default TAMEstimator

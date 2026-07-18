import React, { useState } from 'react'
import SEO from '../../components/SEO'
import PublicNav from '../../components/PublicNav'
import PublicFooter from '../../components/PublicFooter'
import { useIsMobile } from '../../hooks/useIsMobile'

const BENCHMARKS = {
  openRate: { label: 'Open Rate', industry: 33, unit: '%' },
  bounceRate: { label: 'Bounce Rate', industry: 0.8, unit: '%' },
  replyRate: { label: 'Reply Rate', industry: 3.5, unit: '%' },
}

const Bar: React.FC<{ label: string; user: number; benchmark: number; unit: string }> = ({ label, user, benchmark, unit }) => {
  const isBounce = label === 'Bounce Rate'
  const max = Math.max(user, benchmark, 10) * 1.3
  const userPct = Math.min((user / max) * 100, 100)
  const benchPct = Math.min((benchmark / max) * 100, 100)
  const userOk = isBounce ? user <= benchmark : user >= benchmark

  return (
    <div style={{ marginBottom: 32 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10, flexWrap: 'wrap', gap: 4 }}>
        <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 18, fontWeight: 600 }}>{label}</div>
        <div style={{ fontSize: 14, color: '#555' }}>
          Yours: <strong style={{ color: userOk ? '#2a7d2a' : '#c0392b' }}>{user}{unit}</strong>
          <span style={{ margin: '0 8px', color: '#ccc' }}>|</span>
          Benchmark: <strong>{benchmark}{unit}</strong>
        </div>
      </div>
      <div style={{ position: 'relative', height: 10, borderRadius: 5, background: 'oklch(92% 0.01 70)', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: `${userPct}%`, borderRadius: 5, background: userOk ? '#FFD400' : '#c0392b', transition: 'width .4s ease' }} />
        <div style={{ position: 'absolute', top: -2, height: 14, width: 2, background: '#000', left: `${benchPct}%`, borderRadius: 1 }} />
      </div>
    </div>
  )
}

const BenchmarkChecker: React.FC = () => {
  const [openRate, setOpenRate] = useState(30)
  const [bounceRate, setBounceRate] = useState(1.2)
  const [replyRate, setReplyRate] = useState(2.8)
  const m = useIsMobile()
  const sidePad = m ? 20 : 40

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '12px 16px', borderRadius: 6, border: '1px solid oklch(88% 0.02 90)',
    background: '#fff', fontSize: 16, fontFamily: "'Work Sans',sans-serif", outline: 'none',
    boxSizing: 'border-box' as const,
  }
  const labelStyle: React.CSSProperties = { fontSize: 13, fontWeight: 600, color: '#333', marginBottom: 6, display: 'block' }

  return (
    <div style={{ fontFamily: "'Work Sans',sans-serif", color: '#000', background: 'oklch(97% 0.01 75)', minHeight: '100vh' }}>
      <SEO
        title="Cold Email Benchmark Checker"
        description="Compare your cold email open rate, bounce rate, and reply rate against Realtrix industry benchmarks."
        canonical="/tools/benchmark-checker"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'WebApplication',
          name: 'Cold Email Benchmark Checker',
          url: 'https://realtrix.org/tools/benchmark-checker',
          description: 'Compare your cold email open rate, bounce rate, and reply rate against Realtrix industry benchmarks.',
          applicationCategory: 'BusinessApplication',
          operatingSystem: 'Any (web browser)',
          offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
          provider: { '@type': 'Organization', name: 'Realtrix', url: 'https://realtrix.org' },
        }}
      />
      <PublicNav />

      <section style={{ padding: `${m ? 80 : 120}px ${sidePad} ${m ? 30 : 60}px`, maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(32px,4vw,52px)', fontWeight: 600, letterSpacing: -1, margin: '0 0 16px' }}>
          Benchmark Checker
        </h1>
        <p style={{ fontSize: 17, color: '#444', maxWidth: 480, margin: '0 auto' }}>
          Enter your current metrics and see how you compare to the Realtrix average across managed campaigns.
        </p>
      </section>

      <section style={{ padding: `${m ? 20 : 40}px ${sidePad} ${m ? 60 : 100}px`, maxWidth: 900, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : '1fr 1fr', gap: m ? 32 : 48 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div>
              <label style={labelStyle}>Your Open Rate (%)</label>
              <input type="number" step="0.1" value={openRate} onChange={(e) => setOpenRate(Number(e.target.value))} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Your Bounce Rate (%)</label>
              <input type="number" step="0.1" value={bounceRate} onChange={(e) => setBounceRate(Number(e.target.value))} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Your Reply Rate (%)</label>
              <input type="number" step="0.1" value={replyRate} onChange={(e) => setReplyRate(Number(e.target.value))} style={inputStyle} />
            </div>
          </div>

          <div>
            <Bar label="Open Rate" user={openRate} benchmark={BENCHMARKS.openRate.industry} unit="%" />
            <Bar label="Bounce Rate" user={bounceRate} benchmark={BENCHMARKS.bounceRate.industry} unit="%" />
            <Bar label="Reply Rate" user={replyRate} benchmark={BENCHMARKS.replyRate.industry} unit="%" />
          </div>
        </div>

        <div style={{ marginTop: 40, padding: '20px 24px', borderRadius: 8, border: '1px solid oklch(88% 0.02 90)', background: 'oklch(96% 0.035 95)', fontSize: 13, lineHeight: 1.6, color: '#555' }}>
          <strong style={{ color: '#333' }}>About these benchmarks:</strong> Based on averages across Realtrix-managed B2B cold email campaigns. Industry averages vary — these reflect Realtrix infrastructure performance with verified lists and warmed domains.
        </div>
      </section>

      <PublicFooter />
    </div>
  )
}

export default BenchmarkChecker

import React from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import PublicNav from '../components/PublicNav'
import PublicFooter from '../components/PublicFooter'
import { useIsMobile } from '../hooks/useIsMobile'

const STATS = [
  { val: '200+', label: 'Meetings booked' },
  { val: '40%+', label: 'Average open rate' },
  { val: '0.8%', label: 'Bounce rate' },
  { val: '15+', label: 'Sending domains managed' },
]

const CALC_TOOLS = [
  { title: 'ROI Calculator', desc: 'Project your pipeline value, meetings, and return on email spend.', to: '/tools/roi-calculator' },
  { title: 'Benchmark Checker', desc: 'See how your open, bounce, and reply rates compare to industry averages.', to: '/tools/benchmark-checker' },
  { title: 'TAM Estimator', desc: 'Estimate your total addressable market by industry, size, and region.', to: '/tools/tam-estimator' },
]

const STACK = [
  {
    category: 'Email Sending',
    items: [
      { name: 'Instantly.ai', role: 'Primary sending platform' },
      { name: 'Smartlead', role: 'Secondary sending & rotation' },
    ],
  },
  {
    category: 'Data & Prospecting',
    items: [
      { name: 'Apollo.io', role: 'Contact sourcing & enrichment' },
    ],
  },
  {
    category: 'Verification',
    items: [
      { name: 'NeverBounce', role: 'Email verification & list cleaning' },
      { name: 'ZeroBounce', role: 'Secondary verification & abuse detection' },
    ],
  },
]

const Tools: React.FC = () => {
  const m = useIsMobile()
  const sidePad = m ? 20 : 40

  return (
    <div style={{ fontFamily: "'Work Sans',sans-serif", color: '#000', background: 'oklch(97% 0.01 75)', minHeight: '100vh' }}>
      <SEO
        title="Tools"
        description="Free tools to evaluate your cold email performance: ROI calculator, benchmark checker, and TAM estimator."
        canonical="/tools"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Tools & Track Record',
          description: 'Free tools to evaluate your cold email performance: ROI calculator, benchmark checker, and TAM estimator.',
          url: 'https://realtrix.org/tools',
          mainEntity: {
            '@type': 'ItemList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'ROI Calculator', url: 'https://realtrix.org/tools/roi-calculator' },
              { '@type': 'ListItem', position: 2, name: 'Benchmark Checker', url: 'https://realtrix.org/tools/benchmark-checker' },
              { '@type': 'ListItem', position: 3, name: 'TAM Estimator', url: 'https://realtrix.org/tools/tam-estimator' },
            ],
          },
        }}
      />
      <PublicNav />

      <section style={{ padding: `${m ? 80 : 120}px ${sidePad} ${m ? 30 : 60}px`, maxWidth: 1100, margin: '0 auto', textAlign: 'center' }}>
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(36px,4.5vw,64px)', fontWeight: 600, letterSpacing: -1, margin: '0 0 20px', lineHeight: 1.05 }}>
          Tools & Track Record
        </h1>
        <p style={{ fontSize: m ? 16 : 18, lineHeight: 1.6, color: '#444', maxWidth: 560, margin: '0 auto' }}>
          Free calculators to scope your outreach — and the numbers behind the system we run.
        </p>
      </section>

      <section style={{ padding: `${m ? 30 : 60}px ${sidePad} ${m ? 50 : 80}px`, maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: m ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: m ? 16 : 24 }}>
          {STATS.map((s) => (
            <div key={s.label} style={{ padding: m ? '20px 16px' : '28px 20px', borderRadius: 10, border: '1px solid oklch(88% 0.02 90)', background: 'oklch(99% 0.005 75)', textAlign: 'center' }}>
              <div style={{ fontFamily: "'Playfair Display',serif", fontSize: m ? 26 : 32, fontWeight: 600, color: '#8a6d00', marginBottom: 6 }}>{s.val}</div>
              <div style={{ fontSize: 13, color: '#555' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: `${m ? 40 : 80}px ${sidePad}`, maxWidth: 1100, margin: '0 auto' }}>
        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(28px,3.5vw,42px)', fontWeight: 600, margin: '0 0 40px', letterSpacing: -0.5 }}>Calculate Your Numbers</h2>
        <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : 'repeat(3, 1fr)', gap: m ? 16 : 24 }}>
          {CALC_TOOLS.map((t) => (
            <Link key={t.to} to={t.to} style={{
              textDecoration: 'none', color: '#000', display: 'block',
              padding: m ? '24px 20px' : '32px 28px', borderRadius: 10, border: '1px solid oklch(88% 0.02 90)',
              background: 'oklch(99% 0.005 75)', transition: 'box-shadow .2s ease, border-color .2s ease',
            }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = '#FFD400'; (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(255,212,0,0.15)' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'oklch(88% 0.02 90)'; (e.currentTarget as HTMLElement).style.boxShadow = 'none' }}
            >
              <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 20, fontWeight: 600, marginBottom: 10 }}>{t.title}</div>
              <div style={{ fontSize: 15, lineHeight: 1.6, color: '#444' }}>{t.desc}</div>
              <div style={{ marginTop: 18, fontSize: 14, fontWeight: 600, color: '#8a6d00' }}>Open tool →</div>
            </Link>
          ))}
        </div>
      </section>

      <section style={{ padding: `${m ? 50 : 80}px ${sidePad} ${m ? 60 : 100}px`, background: 'oklch(96% 0.035 95)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(28px,3.5vw,42px)', fontWeight: 600, margin: '0 0 40px', letterSpacing: -0.5 }}>The Tool Stack</h2>
          <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : 'repeat(3, 1fr)', gap: m ? 32 : 28 }}>
            {STACK.map((s) => (
              <div key={s.category}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, color: '#D9A600', textTransform: 'uppercase', marginBottom: 16 }}>{s.category}</div>
                {s.items.map((item) => (
                  <div key={item.name} style={{ padding: '16px 0', borderTop: '1px solid #ddd' }}>
                    <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 18, fontWeight: 600 }}>{item.name}</div>
                    <div style={{ fontSize: 14, color: '#555', marginTop: 4 }}>{item.role}</div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  )
}

export default Tools

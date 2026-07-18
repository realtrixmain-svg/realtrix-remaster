import React from 'react'
import { Link } from 'react-router-dom'
import PublicNav from '../../components/PublicNav'
import PublicFooter from '../../components/PublicFooter'
import SEO from '../../components/SEO'

interface LegalLayoutProps {
  title: string
  description: string
  canonical: string
  lastUpdated: string
  children: React.ReactNode
}

const NAV_ITEMS = [
  { label: 'Privacy Policy', path: '/legal/privacy' },
  { label: 'Terms of Service', path: '/legal/terms' },
  { label: 'Acceptable Use Policy', path: '/legal/aup' },
  { label: 'Billing & Refund Policy', path: '/legal/billing' },
  { label: 'AI Usage & Disclaimer', path: '/legal/ai-policy' },
  { label: 'Cookie Policy', path: '/legal/cookies' },
]

const LegalLayout: React.FC<LegalLayoutProps> = ({ title, description, canonical, lastUpdated, children }) => {
  return (
    <div style={{ fontFamily: "'Work Sans', sans-serif", color: '#000', background: 'oklch(97% 0.01 75)', minHeight: '100vh' }}>
      <SEO title={title} description={description} canonical={canonical} />
      <style>{`
        .legal-content h3 { font-family: 'Playfair Display', serif; font-size: 21px; font-weight: 600; margin: 36px 0 12px; color: #000; }
        .legal-content h4 { font-family: 'Playfair Display', serif; font-size: 18px; font-weight: 600; margin: 28px 0 10px; color: #000; }
        .legal-content p { font-size: 15px; line-height: 1.7; color: '#333'; margin: 0 0 16px; }
        .legal-content ul, .legal-content ol { font-size: 15px; line-height: 1.7; color: '#333'; margin: 0 0 16px; padding-left: 22px; }
        .legal-content li { margin-bottom: 6px; }
        .legal-content a { color: #000; font-weight: 600; text-decoration: underline; text-underline-offset: 2px; }
      `}</style>

      <PublicNav />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '60px 32px 100px', display: 'grid', gridTemplateColumns: '1fr 220px', gap: 60 }}>
        <main>
          <div style={{ marginBottom: 40 }}>
            <Link to="/legal" style={{ textDecoration: 'none', color: '#888', fontSize: 13, fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: 4, marginBottom: 16 }}>← All Legal Pages</Link>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px, 3.5vw, 40px)', fontWeight: 600, lineHeight: 1.1, margin: '0 0 12px', letterSpacing: -0.3 }}>{title}</h1>
            <p style={{ fontSize: 16, lineHeight: 1.55, color: '#555', margin: '0 0 8px' }}>{description}</p>
            <div style={{ fontSize: 13, color: '#999' }}>Last updated: {lastUpdated}</div>
          </div>
          <div className="legal-content">{children}</div>
        </main>

        <aside style={{ paddingTop: 100 }}>
          <div style={{ position: 'sticky', top: 100 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, color: '#999', textTransform: 'uppercase', marginBottom: 12 }}>Policies</div>
            {NAV_ITEMS.map((item) => {
              const isCurrent = typeof window !== 'undefined' && window.location.pathname === item.path
              return (
                <Link key={item.path} to={item.path} style={{ display: 'block', padding: '8px 12px', borderRadius: 6, textDecoration: 'none', fontSize: 14, fontWeight: isCurrent ? 600 : 400, color: isCurrent ? '#000' : '#666', background: isCurrent ? 'oklch(96% 0.015 85)' : 'transparent', marginBottom: 2, transition: 'all .15s ease' }}>
                  {item.label}
                </Link>
              )
            })}
          </div>
        </aside>
      </div>

      <PublicFooter />
    </div>
  )
}

export default LegalLayout

import React from 'react'
import { Link } from 'react-router-dom'
import PublicNav from '../../components/PublicNav'
import PublicFooter from '../../components/PublicFooter'
import SEO from '../../components/SEO'
import { useIsMobile } from '../../hooks/useIsMobile'

const LEGAL_PAGES = [
  { title: 'Privacy Policy', desc: 'How we collect, use, protect, and handle your personal data.', path: '/legal/privacy', icon: '🔒' },
  { title: 'Terms of Service', desc: 'The agreement governing your use of Realtrix services and platform.', path: '/legal/terms', icon: '📋' },
  { title: 'Acceptable Use Policy', desc: 'What you can and cannot do with our platform and infrastructure.', path: '/legal/aup', icon: '⚖️' },
  { title: 'Billing & Refund Policy', desc: 'Transparent details on pricing, billing cycles, and refund procedures.', path: '/legal/billing', icon: '💳' },
  { title: 'AI Usage & Disclaimer', desc: 'How our AI systems work, their limitations, and your responsibilities.', path: '/legal/ai-policy', icon: '🤖' },
  { title: 'Cookie Policy', desc: 'What cookies we use, why, and how you can manage your preferences.', path: '/legal/cookies', icon: '🍪' },
]

const BREADCRUMB_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://realtrix.org' },
    { '@type': 'ListItem', position: 2, name: 'Legal', item: 'https://realtrix.org/legal' },
  ],
}

const PAGE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Legal — Realtrix Policies & Terms',
  description: 'All legal policies, terms of service, privacy policy, and compliance documents for Realtrix.',
  url: 'https://realtrix.org/legal',
}

const LegalHub: React.FC = () => {
  const m = useIsMobile()
  const sidePad = m ? 20 : 32

  return (
    <div style={{ fontFamily: "'Work Sans', sans-serif", color: '#000', background: 'oklch(97% 0.01 75)', minHeight: '100vh' }}>
      <SEO
        title="Legal"
        description="All legal policies, terms of service, privacy policy, and compliance documents for Realtrix."
        canonical="/legal"
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(PAGE_SCHEMA) }} />

      <PublicNav />

      <section style={{ padding: `${m ? '60px 20px 32px' : '80px 32px 48px'}`, maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, color: '#D9A600', textTransform: 'uppercase', marginBottom: 16, textShadow: '0 1px 0 rgba(0,0,0,0.12)' }}>Legal</div>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(36px, 4.5vw, 56px)', fontWeight: 600, lineHeight: 1.05, margin: '0 0 16px', letterSpacing: -0.5 }}>Policies & Terms</h1>
        <p style={{ fontSize: 19, lineHeight: 1.55, color: '#444', maxWidth: 560, margin: 0 }}>Everything you need to know about how we operate, handle data, and run our services.</p>
      </section>

      <section style={{ padding: `${m ? '0 20px 40px' : '0 32px 60px'}`, maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
        {LEGAL_PAGES.map((page) => (
          <Link key={page.path} to={page.path} style={{ textDecoration: 'none', padding: '28px 28px', borderRadius: 8, border: '1px solid oklch(88% 0.01 70)', background: 'oklch(99% 0.005 75)', transition: 'all .2s ease', display: 'block' }}>
            <div style={{ fontSize: 28, marginBottom: 14 }}>{page.icon}</div>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 600, margin: '0 0 8px', color: '#000' }}>{page.title}</h3>
            <p style={{ fontSize: 14, lineHeight: 1.55, color: '#555', margin: '0 0 14px' }}>{page.desc}</p>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#000' }}>Read →</div>
          </Link>
        ))}
      </section>

      <section style={{ padding: `${m ? '20px 20px 50px' : '40px 32px 80px'}`, maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ padding: '28px 32px', borderRadius: 8, border: '1px solid oklch(88% 0.01 70)', background: 'oklch(99% 0.005 75)', textAlign: 'center' }}>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 600, marginBottom: 8 }}>Questions about our policies?</div>
          <p style={{ fontSize: 15, lineHeight: 1.5, color: '#555', margin: '0 0 16px' }}>Contact us at <a href="mailto:trevor@realtrix.org" style={{ color: '#000', fontWeight: 600, textDecoration: 'underline', textUnderlineOffset: 2 }}>trevor@realtrix.org</a> for any legal inquiries.</p>
        </div>
      </section>

      <PublicFooter />
    </div>
  )
}

export default LegalHub

import React from 'react'
import { Link } from 'react-router-dom'
import PublicNav from '../../components/PublicNav'
import PublicFooter from '../../components/PublicFooter'
import SEO from '../../components/SEO'

const CAL_LINK = 'https://cal.com/trevorryan/30min'
const bookCall = () => window.open(CAL_LINK, '_blank')

interface ArticleLayoutProps {
  title: string
  description: string
  canonical: string
  type: 'Tip' | 'Playbook'
  tldr?: string
  children: React.ReactNode
}

const TYPE_COLORS: Record<string, { bg: string; color: string }> = {
  Tip: { bg: '#FFD400', color: '#000' },
  Playbook: { bg: '#000', color: '#fff' },
}

const ArticleLayout: React.FC<ArticleLayoutProps> = ({ title, description, canonical, type, tldr, children }) => {
  const tc = TYPE_COLORS[type]
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url: `https://realtrix.org${canonical}`,
    mainEntityOfPage: `https://realtrix.org${canonical}`,
    image: 'https://realtrix.org/og-default.png',
    author: { '@type': 'Organization', name: 'Realtrix' },
    publisher: { '@type': 'Organization', name: 'Realtrix', logo: { '@type': 'ImageObject', url: 'https://realtrix.org/logo.png' } },
  }

  return (
    <div style={{ fontFamily: "'Work Sans', sans-serif", color: '#000', background: 'oklch(97% 0.01 75)', minHeight: '100vh' }}>
      <SEO title={title} description={description} canonical={canonical} type="article" schema={articleSchema} />
      <style>{`
        .article-content h2 { font-family: 'Playfair Display', serif; font-size: 28px; font-weight: 600; margin: 48px 0 16px; color: #000; letter-spacing: -0.3px; }
        .article-content h3 { font-family: 'Playfair Display', serif; font-size: 21px; font-weight: 600; margin: 36px 0 12px; color: #000; }
        .article-content p { font-size: 17px; line-height: 1.7; color: #333; margin: 0 0 20px; }
        .article-content ul, .article-content ol { font-size: 17px; line-height: 1.7; color: #333; margin: 0 0 20px; padding-left: 24px; }
        .article-content li { margin-bottom: 8px; }
        .article-content blockquote { border-left: 3px solid #FFD400; padding: 16px 24px; margin: 28px 0; background: oklch(99% 0.005 75); border-radius: 0 6px 6px 0; }
        .article-content blockquote p { margin: 0; font-style: italic; color: #222; }
        .article-content strong { color: #000; font-weight: 700; }
        .article-content code { background: oklch(94% 0.01 75); padding: 2px 6px; border-radius: 3px; font-size: 15px; }
        .article-content a { color: #000; font-weight: 600; text-decoration: underline; text-underline-offset: 2px; }
        .article-content a:hover { color: #8a6d00; }
      `}</style>

      <PublicNav />

      <article style={{ maxWidth: 760, margin: '0 auto', padding: '60px 24px 100px' }}>
        <div style={{ marginBottom: 40 }}>
          <span style={{ display: 'inline-block', padding: '5px 12px', borderRadius: 999, fontSize: 12, fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase', background: tc.bg, color: tc.color, marginBottom: 16 }}>{type}</span>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 600, lineHeight: 1.1, margin: '0 0 16px', letterSpacing: -0.5 }}>{title}</h1>
          <p style={{ fontSize: 18, lineHeight: 1.55, color: '#444', margin: 0 }}>{description}</p>
        </div>

        {tldr && (
          <div style={{ padding: '20px 24px', borderRadius: 8, border: '1px solid oklch(88% 0.02 90)', background: 'oklch(99% 0.005 75)', marginBottom: 40 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, color: '#D9A600', textTransform: 'uppercase', marginBottom: 8 }}>TL;DR</div>
            <p style={{ fontSize: 15, lineHeight: 1.6, color: '#333', margin: 0 }}>{tldr}</p>
          </div>
        )}

        <div className="article-content" style={{ fontSize: 17, lineHeight: 1.7, color: '#333' }}>
          {children}
        </div>

        <div style={{ marginTop: 72, padding: '40px 32px', borderRadius: 10, background: '#000', color: '#fff', textAlign: 'center' }}>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 600, margin: '0 0 12px', color: '#fff' }}>We run this entire system for you.</h3>
          <p style={{ fontSize: 16, color: '#b3b3b3', maxWidth: 460, margin: '0 auto 24px', lineHeight: 1.55 }}>Outreach, infrastructure, sourcing, and AI-qualified replies — fully managed, priced transparently.</p>
          <button
            onClick={bookCall}
            style={{ padding: '14px 28px', borderRadius: 4, border: 'none', background: '#FFD400', color: '#000', fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: "'Work Sans', sans-serif" }}
          >Book a Call →</button>
        </div>
      </article>

      <PublicFooter />
    </div>
  )
}

export default ArticleLayout

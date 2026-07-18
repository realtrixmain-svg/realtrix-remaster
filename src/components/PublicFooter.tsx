import React from 'react'
import { Link } from 'react-router-dom'

const PublicFooter: React.FC = () => {
  const col: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: 10 }
  const heading: React.CSSProperties = { fontSize: 11, fontWeight: 700, letterSpacing: 1, color: '#555', textTransform: 'uppercase' as const, marginBottom: 14 }
  const link: React.CSSProperties = { textDecoration: 'none', color: '#333', fontSize: 14, fontFamily: "'Work Sans',sans-serif" }

  return (
    <footer style={{ padding: '64px 40px 32px', maxWidth: 1280, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 48, paddingBottom: 40, borderBottom: '1px solid #ddd' }}>
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontFamily: "'Playfair Display',serif", fontSize: 20, fontWeight: 600, color: '#000' }}>Realtrix</span>
        </Link>

        <div style={{ display: 'flex', gap: 64, flexWrap: 'wrap' }}>
          <div style={col}>
            <div style={heading}>Services</div>
            <Link to="/services/done-for-you-cold-email" style={link}>Done-For-You</Link>
            <Link to="/services/cold-email-automation-setup" style={link}>Cold Email Setup</Link>
            <Link to="/services/email-deliverability-consulting" style={link}>Deliverability</Link>
            <Link to="/services/b2b-lead-generation" style={link}>B2B Lead Gen</Link>
            <Link to="/services/multi-touch-outreach" style={link}>Multi-Touch</Link>
          </div>
          <div style={col}>
            <div style={heading}>Company</div>
            <Link to="/about" style={link}>About</Link>
            <Link to="/pricing" style={link}>Pricing</Link>
            <Link to="/tools" style={link}>Tools</Link>
            <Link to="/outreach" style={link}>Outreach</Link>
            <Link to="/legal" style={link}>Legal</Link>
          </div>
          <div style={col}>
            <div style={heading}>Contact</div>
            <a href="mailto:trevor@realtrix.org" style={link}>trevor@realtrix.org</a>
            <a href="mailto:abuse@realtrix.org" style={link}>Report Abuse</a>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16, paddingTop: 24 }}>
        <div style={{ fontSize: 13, color: '#555' }}>© 2026 Realtrix. Based in Johannesburg, South Africa.</div>
        <div style={{ display: 'flex', gap: 24, fontSize: 13 }}>
          <Link to="/legal/privacy" style={{ textDecoration: 'none', color: '#555' }}>Privacy</Link>
          <Link to="/legal/terms" style={{ textDecoration: 'none', color: '#555' }}>Terms</Link>
        </div>
      </div>
    </footer>
  )
}

export default PublicFooter

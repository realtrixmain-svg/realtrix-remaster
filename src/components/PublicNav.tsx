import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const CAL_LINK = 'https://cal.com/trevorryan/30min'

const SERVICES = [
  { label: 'Done-For-You', to: '/services/done-for-you-cold-email' },
  { label: 'Cold Email Setup', to: '/services/cold-email-automation-setup' },
  { label: 'Deliverability', to: '/services/email-deliverability-consulting' },
  { label: 'B2B Lead Gen', to: '/services/b2b-lead-generation' },
  { label: 'Multi-Touch', to: '/services/multi-touch-outreach' },
]

const TOOLS = [
  { label: 'All Tools', to: '/tools' },
  { label: 'ROI Calculator', to: '/tools/roi-calculator' },
  { label: 'Benchmark Checker', to: '/tools/benchmark-checker' },
  { label: 'TAM Estimator', to: '/tools/tam-estimator' },
]

const PublicNav: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [svcOpen, setSvcOpen] = useState(false)
  const [toolOpen, setToolOpen] = useState(false)
  const [vw, setVw] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200)
  const location = useLocation()

  useEffect(() => {
    const onResize = () => setVw(window.innerWidth)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const isMobile = vw < 900

  useEffect(() => {
    if (!isMobile) setMobileOpen(false)
  }, [isMobile])

  const linkColor = (path: string) => location.pathname === path ? '#000' : '#333'

  const dropdownWrap: React.CSSProperties = { position: 'relative', paddingBottom: 8 }
  const dropdownMenu: React.CSSProperties = {
    position: 'absolute', top: '100%', left: 0, marginTop: 0,
    background: '#fff', border: '1px solid #ddd', borderRadius: 6,
    padding: '8px 0', minWidth: 200, boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
    zIndex: 200,
  }
  const dropItem: React.CSSProperties = {
    display: 'block', padding: '10px 20px', fontSize: 14, color: '#333',
    textDecoration: 'none', fontWeight: 500, fontFamily: "'Work Sans',sans-serif",
  }

  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 100, display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      padding: isMobile ? '14px 20px' : '16px 40px', backdropFilter: 'blur(10px)',
      background: 'oklch(97% 0.01 75 / 0.88)',
      boxShadow: '0 1px 0 oklch(88% 0.01 70)',
    }}>
      <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 600, color: '#000', letterSpacing: 0.2 }}>Realtrix</span>
      </Link>

      {isMobile ? (
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round">
            {mobileOpen ? <><line x1="6" y1="6" x2="18" y2="18" /><line x1="6" y1="18" x2="18" y2="6" /></> : <><line x1="4" y1="7" x2="20" y2="7" /><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="17" x2="20" y2="17" /></>}
          </svg>
        </button>
      ) : (
        <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
          <Link to="/about" style={{ textDecoration: 'none', color: linkColor('/about'), fontSize: 14, fontWeight: 500 }}>About</Link>
          <Link to="/pricing" style={{ textDecoration: 'none', color: linkColor('/pricing'), fontSize: 14, fontWeight: 500 }}>Pricing</Link>

          <div style={dropdownWrap} onMouseEnter={() => setSvcOpen(true)} onMouseLeave={() => setSvcOpen(false)}>
            <span style={{ fontSize: 14, fontWeight: 500, color: '#333', cursor: 'default' }}>Services ▾</span>
            {svcOpen && (
              <div style={dropdownMenu}>
                {SERVICES.map((s) => (
                  <Link key={s.to} to={s.to} style={dropItem}
                    onMouseEnter={(e) => { (e.target as HTMLElement).style.background = 'oklch(97% 0.01 75)' }}
                    onMouseLeave={(e) => { (e.target as HTMLElement).style.background = 'transparent' }}
                  >{s.label}</Link>
                ))}
              </div>
            )}
          </div>

          <div style={dropdownWrap} onMouseEnter={() => setToolOpen(true)} onMouseLeave={() => setToolOpen(false)}>
            <span style={{ fontSize: 14, fontWeight: 500, color: '#333', cursor: 'default' }}>Tools ▾</span>
            {toolOpen && (
              <div style={dropdownMenu}>
                {TOOLS.map((t) => (
                  <Link key={t.to} to={t.to} style={dropItem}
                    onMouseEnter={(e) => { (e.target as HTMLElement).style.background = 'oklch(97% 0.01 75)' }}
                    onMouseLeave={(e) => { (e.target as HTMLElement).style.background = 'transparent' }}
                  >{t.label}</Link>
                ))}
              </div>
            )}
          </div>

          <Link to="/outreach" style={{ textDecoration: 'none', color: linkColor('/outreach'), fontSize: 14, fontWeight: 500 }}>Outreach</Link>
          <Link to="/legal" style={{ textDecoration: 'none', color: linkColor('/legal'), fontSize: 14, fontWeight: 500 }}>Legal</Link>

          <a
            href={CAL_LINK} target="_blank" rel="noopener noreferrer"
            style={{
              padding: '10px 20px', borderRadius: 4, border: 'none', background: '#000',
              color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: "'Work Sans',sans-serif",
              textDecoration: 'none', whiteSpace: 'nowrap',
            }}
          >Book a Call</a>
        </div>
      )}

      {isMobile && mobileOpen && (
        <div style={{
          position: 'fixed', top: 54, left: 0, right: 0, height: 'calc(100vh - 54px)',
          background: 'oklch(97% 0.01 75 / 0.97)', backdropFilter: 'blur(12px)',
          padding: '32px 24px', display: 'flex', flexDirection: 'column', gap: 24, zIndex: 99,
          overflowY: 'auto', WebkitOverflowScrolling: 'touch',
        }}>
          <Link to="/about" onClick={() => setMobileOpen(false)} style={{ fontSize: 18, fontWeight: 500, color: '#000', textDecoration: 'none' }}>About</Link>
          <Link to="/pricing" onClick={() => setMobileOpen(false)} style={{ fontSize: 18, fontWeight: 500, color: '#000', textDecoration: 'none' }}>Pricing</Link>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, color: '#555', textTransform: 'uppercase' as const }}>Services</div>
          {SERVICES.map((s) => (
            <Link key={s.to} to={s.to} onClick={() => setMobileOpen(false)} style={{ fontSize: 16, color: '#333', textDecoration: 'none', paddingLeft: 12 }}>{s.label}</Link>
          ))}
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, color: '#555', textTransform: 'uppercase' as const }}>Tools</div>
          {TOOLS.map((t) => (
            <Link key={t.to} to={t.to} onClick={() => setMobileOpen(false)} style={{ fontSize: 16, color: '#333', textDecoration: 'none', paddingLeft: 12 }}>{t.label}</Link>
          ))}
          <Link to="/outreach" onClick={() => setMobileOpen(false)} style={{ fontSize: 18, fontWeight: 500, color: '#000', textDecoration: 'none' }}>Outreach</Link>
          <Link to="/legal" onClick={() => setMobileOpen(false)} style={{ fontSize: 18, fontWeight: 500, color: '#000', textDecoration: 'none' }}>Legal</Link>
          <a href={CAL_LINK} target="_blank" rel="noopener noreferrer" style={{
            padding: '14px 24px', borderRadius: 4, background: '#000', color: '#fff', fontSize: 15, fontWeight: 600,
            textDecoration: 'none', textAlign: 'center' as const,
          }}>Book a Call</a>
        </div>
      )}
    </nav>
  )
}

export default PublicNav

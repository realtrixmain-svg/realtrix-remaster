import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

declare global {
  interface Window { gtag?: (...args: unknown[]) => void }
}

const KEY = 'realtrix_consent'

const read = (): string | null => {
  try { return localStorage.getItem(KEY) } catch { return null }
}

// Consent Mode v2 default (denied) is set in index.html; this upgrades or keeps it denied.
const choose = (value: 'granted' | 'denied') => {
  try { localStorage.setItem(KEY, value) } catch { /* storage blocked: choice lasts this page only */ }
  window.gtag?.('consent', 'update', { analytics_storage: value })
}

const ConsentBanner: React.FC = () => {
  const [open, setOpen] = useState(() => read() === null)
  const { pathname } = useLocation()

  // SPA page views (initial load is sent here too: send_page_view is false in index.html)
  useEffect(() => {
    window.gtag?.('event', 'page_view', { page_path: pathname, page_location: window.location.href, page_title: document.title })
  }, [pathname])

  // Footer "Cookie Settings" link reopens the banner
  useEffect(() => {
    const reopen = () => setOpen(true)
    window.addEventListener('open-cookie-settings', reopen)
    return () => window.removeEventListener('open-cookie-settings', reopen)
  }, [])

  if (!open) return null

  const btn: React.CSSProperties = { flex: 1, padding: '11px 16px', fontSize: 14, fontWeight: 600, fontFamily: "'Work Sans',sans-serif", borderRadius: 8, border: '1px solid #fff', cursor: 'pointer' }
  const answer = (v: 'granted' | 'denied') => () => { choose(v); setOpen(false) }

  return (
    <div role="dialog" aria-label="Cookie preferences" style={{ position: 'fixed', left: 16, right: 16, bottom: 16, maxWidth: 400, zIndex: 9999, background: '#000', color: '#fff', border: '1px solid #333', borderRadius: 12, padding: 20, fontFamily: "'Work Sans',sans-serif", boxShadow: '0 12px 40px rgba(0,0,0,.35)' }}>
      <p style={{ margin: '0 0 14px', fontSize: 14, lineHeight: 1.55 }}>
        We use Google Analytics to count visits. It runs only if you accept. Read our <Link to="/legal/cookies" style={{ color: '#fff', textDecoration: 'underline' }}>Cookie Policy</Link>.
      </p>
      <div style={{ display: 'flex', gap: 10 }}>
        <button onClick={answer('denied')} style={{ ...btn, background: 'transparent', color: '#fff' }}>Decline</button>
        <button onClick={answer('granted')} style={{ ...btn, background: '#fff', color: '#000' }}>Accept</button>
      </div>
    </div>
  )
}

export default ConsentBanner

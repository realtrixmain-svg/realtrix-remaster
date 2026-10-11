import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

declare global {
  interface Window { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void; [k: string]: unknown }
}

const KEY = 'realtrix_consent'
const GA_ID = 'G-L3FSEFCX8C'

const read = (): string | null => {
  try { return localStorage.getItem(KEY) } catch { return null }
}

// Google is not contacted at all until the visitor accepts.
const loadGA = () => {
  window[`ga-disable-${GA_ID}`] = false
  if (window.gtag) return
  window.dataLayer = window.dataLayer || []
  window.gtag = function () { window.dataLayer!.push(arguments) }
  window.gtag('js', new Date())
  window.gtag('config', GA_ID, { send_page_view: false })
  const s = document.createElement('script')
  s.async = true
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
  document.head.appendChild(s)
}

// Decline/withdraw: stop sending and remove GA cookies.
const stopGA = () => {
  window[`ga-disable-${GA_ID}`] = true
  document.cookie.split(';').map(c => c.trim().split('=')[0]).filter(n => n === '_ga' || n.startsWith('_ga_')).forEach(n => {
    document.cookie = `${n}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`
    document.cookie = `${n}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=.${location.hostname.replace(/^www\./, '')}`
  })
}

const ConsentBanner: React.FC = () => {
  const [open, setOpen] = useState(() => read() === null)
  const [granted, setGranted] = useState(() => read() === 'granted')
  const { pathname } = useLocation()

  // Inject GA only while consent is granted; send SPA page views (also fires on the Accept click)
  useEffect(() => {
    if (!granted) return
    loadGA()
    window.gtag?.('event', 'page_view', { page_path: pathname, page_location: window.location.href, page_title: document.title })
  }, [granted, pathname])

  // Footer "Cookie Settings" link reopens the banner
  useEffect(() => {
    const reopen = () => setOpen(true)
    window.addEventListener('open-cookie-settings', reopen)
    return () => window.removeEventListener('open-cookie-settings', reopen)
  }, [])

  if (!open) return null

  const btn: React.CSSProperties = { flex: 1, padding: '11px 16px', fontSize: 14, fontWeight: 600, fontFamily: "'Work Sans',sans-serif", borderRadius: 8, border: '1px solid #fff', cursor: 'pointer' }
  const answer = (v: 'granted' | 'denied') => () => {
    try { localStorage.setItem(KEY, v) } catch { /* storage blocked: choice lasts this page only */ }
    if (v === 'denied') stopGA()
    setGranted(v === 'granted')
    setOpen(false)
  }

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

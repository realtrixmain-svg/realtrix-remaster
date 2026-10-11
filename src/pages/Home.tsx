import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import DiagnosticModal from '../components/DiagnosticModal'
import PublicNav from '../components/PublicNav'

const CAL_LINK = 'https://cal.com/trevorryan/30min'
const bookCall = () => window.open(CAL_LINK, '_blank')

const STEPS = [
  { title: 'Define', desc: 'You tell us who you sell to — ICP, offer, and what a qualified reply looks like.' },
  { title: 'Build', desc: 'We stand up domains, mailboxes, and warmup — sized to your volume, billed at cost.' },
  { title: 'Source & Send', desc: 'We find, verify, and sequence your list across infrastructure built to stay out of spam.' },
  { title: 'Classify', desc: 'Every reply is read by our AI and scored — meeting, interested, info, or noise.' },
  { title: 'Close', desc: "Qualified replies land in your inbox. You take the call. That's the only part that's on you." },
]

const PROBLEMS = [
  { tag: 'The Penetration Problem', title: "You don't know your best-converting segment yet.", desc: "You're selling to everyone, so no message lands anywhere. We run controlled tests across niches until we find the one that replies — and cut the ones that don't." },
  { tag: 'The Inflow Problem', title: "You know exactly who buys — you just don't have enough of them.", desc: 'Your ICP is proven. You just need more of the right people in front of it, every week, without hiring a team to run it.' },
]

const SCALED = ['Marketing agencies & consultancies', 'B2B SaaS companies']
const KILLED = ['Traditional / local marketing shops', 'PPC & paid media agencies']

const FEATURES = [
  { num: '01', title: 'Infrastructure Management', desc: 'Domains, mailbox warmup, and deliverability monitoring — handled, and billed at cost.' },
  { num: '02', title: 'List Sourcing & Verification', desc: "Every contact enriched and verified before it's ever sequenced." },
  { num: '03', title: 'AI Reply Classification', desc: 'Every reply read, scored, and routed — nothing sits in a shared inbox unsorted.' },
  { num: '04', title: 'Niche Testing & Iteration', desc: "We test segments with the same rigor as subject lines, and kill what doesn't convert." },
  { num: '05', title: 'CRM / Inbox Sync', desc: 'Qualified replies pushed straight to Slack, email, or your CRM.' },
  { num: '06', title: 'Zero Headcount Markup', desc: "You're not paying for our team's time — only infra at cost and results that land." },
]

const REPLIES = [
  { company: 'Ledgerstack', role: 'Founder', snippet: "Yeah, let's grab 15 min this week.", category: 'meeting', time: '2m ago' },
  { company: 'Northlane Analytics', role: 'VP Sales', snippet: 'Interesting — tell me more about pricing.', category: 'interested', time: '11m ago' },
  { company: 'Forgeworks Agency', role: 'Partner', snippet: 'Can you send a one-pager?', category: 'info', time: '24m ago' },
  { company: 'Clarivant', role: 'Head of Growth', snippet: 'Not now, check back in Q3.', category: 'later', time: '38m ago' },
  { company: 'Halcyon Digital', role: 'Founder', snippet: 'Please remove me from this list.', category: 'none', time: '41m ago' },
  { company: 'Ridgepoint Labs', role: 'CEO', snippet: 'Works for me — Tuesday at 2pm?', category: 'meeting', time: '52m ago' },
  { company: 'Bytewell', role: 'VP Marketing', snippet: 'What kind of ROI do you typically see?', category: 'interested', time: '1h ago' },
  { company: 'Fernhollow Co.', role: 'Founder', snippet: 'Out of office until the 21st.', category: 'none', time: '1h ago' },
  { company: 'Ashgrove Media', role: 'Director', snippet: 'Can we talk pricing tiers first?', category: 'info', time: '2h ago' },
  { company: 'Thistledown SaaS', role: 'Founder', snippet: 'Circle back in a month, busy quarter.', category: 'later', time: '2h ago' },
  { company: 'Copperline Agency', role: 'Partner', snippet: 'Sounds good, sending a calendar invite.', category: 'meeting', time: '3h ago' },
  { company: 'Vellum Growth', role: 'VP Sales', snippet: 'We already have a vendor for this.', category: 'none', time: '3h ago' },
] as const

const CATEGORY_META: Record<string, { label: string; fee: number; color: string; text: string }> = {
  meeting: { label: 'Meeting Request', fee: 100, color: '#FFD400', text: '#000' },
  interested: { label: 'Interested', fee: 60, color: '#FFC400', text: '#000' },
  info: { label: 'Info Request', fee: 40, color: '#FFE680', text: '#000' },
  later: { label: 'Contact Later', fee: 30, color: '#E8E8E8', text: '#333' },
  none: { label: 'Not Interested', fee: 0, color: '#F2F2F2', text: '#777' },
}

const TIERS: Record<string, { total: number; rows: { label: string; value: string }[] }> = {
  Base: {
    total: 150,
    rows: [
      { label: 'Domains', value: '$20' },
      { label: 'Mailboxes & warmup', value: '$50' },
      { label: 'Sending platform', value: '$40' },
      { label: 'Sourcing & verification', value: '$25' },
      { label: 'AI reply processing', value: '$15' },
    ],
  },
  Growth: {
    total: 300,
    rows: [
      { label: 'Domains', value: '$40' },
      { label: 'Mailboxes & warmup', value: '$100' },
      { label: 'Sending platform', value: '$80' },
      { label: 'Sourcing & verification', value: '$50' },
      { label: 'AI reply processing', value: '$30' },
    ],
  },
}

const FEE_ROWS = [
  { label: 'Meeting Request', value: '$100' },
  { label: 'Interested', value: '$60' },
  { label: 'Info Request', value: '$40' },
  { label: 'Contact Later', value: '$30' },
  { label: 'OOO / Not Interested', value: '$0 — not billable' },
]

const LOGO_SVG = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M21.5 2.5L2 11.2L9.8 13.4L21.5 2.5Z" fill="#000"/><path d="M9.8 13.4L21.5 2.5L12.6 21.5L9.8 13.4Z" fill="#000" fill-opacity="0.55"/><path d="M9.8 13.4L12.6 21.5" stroke="#000" stroke-width="1.2" stroke-linecap="round"/></svg>'
const PLANE_SVG = '<svg width="30" height="30" viewBox="0 0 24 24" fill="none"><path d="M22 2L2 9.5L11 13L14.5 22L22 2Z" fill="#000"/><path d="M22 2L11 13" stroke="#FFD400" stroke-width="1.4"/></svg>'

type RevealKey = 'problems' | 'proven' | 'how' | 'features' | 'engine' | 'pricing'
const REVEAL_KEYS: RevealKey[] = ['problems', 'proven', 'how', 'features', 'engine', 'pricing']

const Home: React.FC = () => {
  const [vw, setVw] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200)
  const [scrolled, setScrolled] = useState(false)
  const [cursor, setCursor] = useState({ x: -100, y: -100, scale: 1 })
  const [heroBtn, setHeroBtn] = useState({ x: 0, y: 0 })
  const [replyFilter, setReplyFilter] = useState('All')
  const [tier, setTier] = useState<'Base' | 'Growth'>('Base')
  const [revealed, setRevealed] = useState<Record<RevealKey, boolean>>({ problems: false, proven: false, how: false, features: false, engine: false, pricing: false })
  const [liveCount, setLiveCount] = useState(3482)
  const [activeStep, setActiveStep] = useState(0)
  const [hoverStep, setHoverStep] = useState<number | null>(null)
  const [hoverFeature, setHoverFeature] = useState<number | null>(null)

  const sectionRefs = useRef<Record<RevealKey, HTMLElement | null>>({ problems: null, proven: null, how: null, features: null, engine: null, pricing: null })
  const stepIntervalRef = useRef<number | null>(null)

  const isMobile = vw < 760
  const sidePad = isMobile ? '20px' : '64px'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    const onResize = () => setVw(window.innerWidth)
    window.addEventListener('scroll', onScroll)
    window.addEventListener('resize', onResize)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const key = (entry.target as HTMLElement).dataset.revealKey as RevealKey | undefined
          if (entry.isIntersecting && key) {
            setRevealed((prev) => {
              if (prev[key]) return prev
              if (key === 'how' && stepIntervalRef.current == null) {
                stepIntervalRef.current = window.setInterval(() => {
                  setActiveStep((s) => (s + 1) % STEPS.length)
                }, 2400)
              }
              return { ...prev, [key]: true }
            })
          }
        })
      },
      { threshold: 0.25 }
    )
    REVEAL_KEYS.forEach((key) => {
      const node = sectionRefs.current[key]
      if (node) observer.observe(node)
    })

    const liveTicker = window.setInterval(() => {
      setLiveCount((c) => c + Math.floor(Math.random() * 2))
    }, 3000)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      observer.disconnect()
      clearInterval(liveTicker)
      if (stepIntervalRef.current != null) clearInterval(stepIntervalRef.current)
    }
  }, [])

  const growCursor = () => setCursor((c) => ({ ...c, scale: 2.6 }))
  const shrinkCursor = () => setCursor((c) => ({ ...c, scale: 1 }))
  const onCursorMove = (e: React.MouseEvent) => setCursor((c) => ({ ...c, x: e.clientX, y: e.clientY }))
  const onHeroBtnMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    setHeroBtn({ x: (e.clientX - r.left - r.width / 2) * 0.3, y: (e.clientY - r.top - r.height / 2) * 0.3 })
  }
  const onHeroBtnLeaveAll = () => {
    setHeroBtn({ x: 0, y: 0 })
    shrinkCursor()
  }

  const activeIdx = hoverStep ?? activeStep
  const progressPct = (activeIdx / (STEPS.length - 1)) * 100

  const filterCats = ['All', 'meeting', 'interested', 'info', 'later', 'none']
  const filteredReplies = REPLIES.filter((r) => replyFilter === 'All' || r.category === replyFilter)
  const visibleEarned = filteredReplies.reduce((a, r) => a + CATEGORY_META[r.category].fee, 0)
  const tierData = TIERS[tier]

  return (
    <div
      style={{ position: 'relative', fontFamily: "'Work Sans', sans-serif", color: '#000', background: 'oklch(97% 0.01 75)', overflowX: 'hidden' }}
    >
      <style>{`@media (prefers-reduced-motion: reduce) { [data-reveal] { transition: none !important; opacity: 1 !important; transform: none !important; } }`}</style>

      <PublicNav />

      <section
        style={{
          padding: `${isMobile ? '110px' : '160px'} ${sidePad} ${isMobile ? '50px' : '100px'}`,
          maxWidth: 1320, margin: '0 auto', position: 'relative', display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1.1fr 1fr', gap: 20, alignItems: 'center',
        }}
      >
        <div>
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(42px,5.6vw,84px)', lineHeight: 0.98, fontWeight: 600, margin: '18px 0 32px', letterSpacing: -1, width: '100%', maxWidth: 869 }}>
            Stop paying for potential.<br />Start <span style={{ backgroundImage: 'linear-gradient(#FFD400, #FFD400)', backgroundRepeat: 'no-repeat', backgroundSize: '100% 0.92em', backgroundPosition: '0 58%', color: '#000', padding: '0 3px', fontStyle: 'normal' }}>closing</span>.
          </h1>
          <p style={{ fontSize: 20, lineHeight: 1.55, color: '#333', maxWidth: 520, margin: '0 0 44px' }}>
            Realtrix runs your entire cold email operation — infrastructure, sourcing, sequencing, and AI-qualified replies. You pay infra at cost, and a fee only when a real reply lands.
          </p>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
            <button
              style={{
                transform: `translate(${heroBtn.x}px, ${heroBtn.y}px)`,
                padding: '16px 32px', borderRadius: 4, border: 'none', background: '#000',
                color: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', transition: 'transform .15s ease-out',
              }}
              onMouseMove={onHeroBtnMove} onMouseLeave={onHeroBtnLeaveAll} onMouseEnter={growCursor} onClick={bookCall}
            >Book a Call</button>
            <a href="#pricing" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none', color: '#000', fontSize: 15, fontWeight: 600 }} onMouseEnter={growCursor} onMouseLeave={shrinkCursor}>See the cost model →</a>
          </div>
          <div style={{ marginTop: 64, display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, padding: '3px 7px', borderRadius: 3, background: 'rgba(255,212,0,0.25)', color: '#7a5f00' }}>LIVE</span>
            <span style={{ fontSize: 14, color: '#444', fontVariantNumeric: 'tabular-nums' }}>{liveCount.toLocaleString()} replies classified today</span>
          </div>
        </div>
        <div style={{ position: 'relative' }} />
        {!isMobile && (
          <img
            src="/hero-paper-planes-transparent.png"
            alt="A yellow paper airplane pulling ahead of a formation of gray paper airplanes"
            style={{ width: 784, height: 541, display: 'block', position: 'absolute', left: 625, top: 96 }}
          />
        )}
      </section>

      <section
        data-reveal
        ref={(node) => { sectionRefs.current.problems = node; if (node) node.dataset.revealKey = 'problems' }}
        style={{ padding: `${isMobile ? '60px' : '100px'} ${sidePad}`, maxWidth: 1200, margin: '0 auto', opacity: revealed.problems ? 1 : 0, transform: revealed.problems ? 'none' : 'translateY(24px)', transition: 'opacity .8s ease, transform .8s ease' }}
      >
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(30px,3.6vw,46px)', fontWeight: 600, margin: 0, letterSpacing: -0.5 }}>Two problems. One fix.</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 0 : 28 }}>
          {PROBLEMS.map((p, i) => {
            const style: React.CSSProperties = {}
            if (i === 1) {
              if (isMobile) { style.borderTop = '1px solid #ddd'; style.paddingTop = 32; style.marginTop = 8 }
              else { style.borderLeft = '1px solid #ddd'; style.paddingLeft = 48 }
            }
            return (
              <div key={p.tag} style={style}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, color: '#D9A600', textTransform: 'uppercase', marginBottom: 14, textShadow: '0 1px 0 rgba(0,0,0,0.12),0 2px 4px rgba(217,166,0,0.35)' }}>{p.tag}</div>
                <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 24, fontWeight: 600, marginBottom: 14, lineHeight: 1.25 }}>{p.title}</div>
                <div style={{ fontSize: 16, lineHeight: 1.65, color: '#444' }}>{p.desc}</div>
              </div>
            )
          })}
        </div>
      </section>

      <section
        data-reveal
        ref={(node) => { sectionRefs.current.proven = node; if (node) node.dataset.revealKey = 'proven' }}
        style={{ background: '#000', padding: `${isMobile ? '70px' : '110px'} ${sidePad}`, opacity: revealed.proven ? 1 : 0, transform: revealed.proven ? 'none' : 'translateY(24px)', transition: 'opacity .8s ease, transform .8s ease' }}
      >
        <div style={{ maxWidth: 1100, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(30px,3.6vw,46px)', fontWeight: 600, color: '#fff', margin: '0 0 16px', letterSpacing: -0.5 }}>We test niches like we test subject lines.</h2>
          <p style={{ fontSize: 17, color: '#b3b3b3', maxWidth: 560, margin: '0 auto 56px' }}>Some segments scale. Some get killed. Both are data — and we run the tests, not you.</p>
        </div>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 32 : 40 }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1, color: '#FFD400', textTransform: 'uppercase', marginBottom: 18 }}>Scaled</div>
            {SCALED.map((n) => (
              <div key={n} style={{ display: 'flex', gap: 12, alignItems: 'baseline', padding: '14px 0', borderTop: '1px solid #262626' }}>
                <span style={{ color: '#FFD400', fontSize: 16 }}>＋</span>
                <span style={{ fontFamily: "'Playfair Display',serif", fontSize: 20, color: '#fff' }}>{n}</span>
              </div>
            ))}
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1, color: '#666', textTransform: 'uppercase', marginBottom: 18 }}>Killed</div>
            {KILLED.map((n) => (
              <div key={n} style={{ display: 'flex', gap: 12, alignItems: 'baseline', padding: '14px 0', borderTop: '1px solid #262626' }}>
                <span style={{ color: '#555', fontSize: 16 }}>－</span>
                <span style={{ fontFamily: "'Playfair Display',serif", fontSize: 20, color: '#666' }}>{n}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="how"
        data-reveal
        ref={(node) => { sectionRefs.current.how = node; if (node) node.dataset.revealKey = 'how' }}
        style={{ padding: `${isMobile ? '80px' : '140px'} ${sidePad}`, maxWidth: 1200, margin: '0 auto', position: 'relative', opacity: revealed.how ? 1 : 0, transform: revealed.how ? 'none' : 'translateY(24px)', transition: 'opacity .8s ease, transform .8s ease' }}
      >
        <div style={{ textAlign: 'center', marginBottom: 100 }}>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(32px,4vw,48px)', fontWeight: 600, margin: 0, letterSpacing: -0.5 }}>From ICP to closed call.</h2>
        </div>
        <div style={{ position: 'relative', paddingTop: 36 }}>
          <div style={{ display: isMobile ? 'none' : 'block', position: 'absolute', top: 0, left: '1%', right: '1%', height: 3, borderRadius: 2, background: '#e0e0e0' }}>
            <div style={{ height: 3, background: '#FFD400', width: `${progressPct}%`, transition: 'width .5s cubic-bezier(.4,0,.2,1)', borderRadius: 2 }} />
          </div>
          {!isMobile && (
            <div
              style={{ display: 'block', position: 'absolute', top: 0, left: `${progressPct}%`, transform: 'translate(-50%,-50%) rotate(12deg)', transition: 'left .5s cubic-bezier(.4,0,.2,1)', zIndex: 2, filter: 'drop-shadow(0 3px 6px rgba(0,0,0,.25))' }}
              dangerouslySetInnerHTML={{ __html: PLANE_SVG }}
            />
          )}
          <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', flexWrap: 'nowrap', gap: isMobile ? 32 : 16, position: 'relative' }}>
            {STEPS.map((s, i) => {
              const active = activeIdx === i
              return (
                <div
                  key={s.title}
                  style={{ cursor: 'default', flex: isMobile ? 'none' : 1, minWidth: isMobile ? '0' : 0 }}
                  onMouseEnter={() => setHoverStep(i)}
                  onMouseLeave={() => setHoverStep(null)}
                >
                  <div style={{ width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, marginBottom: 20, transition: 'all .3s ease', background: active ? '#FFD400' : '#000', color: '#000', boxShadow: active ? '0 0 0 5px rgba(255,212,0,0.25)' : 'none' }}>{i + 1}</div>
                  <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 8, fontFamily: "'Playfair Display',serif", color: '#000', transition: 'color .3s ease' }}>{s.title}</div>
                  <div style={{ fontSize: 14.5, lineHeight: 1.6, color: '#444' }}>{s.desc}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section
        data-reveal
        ref={(node) => { sectionRefs.current.features = node; if (node) node.dataset.revealKey = 'features' }}
        style={{ padding: `${isMobile ? '70px' : '96px'} ${sidePad} ${isMobile ? '70px' : '128px'}`, background: 'oklch(96% 0.035 95)', opacity: revealed.features ? 1 : 0, transform: revealed.features ? 'none' : 'translateY(24px)', transition: 'opacity .8s ease, transform .8s ease' }}
      >
        <div style={{ maxWidth: 900, margin: '0 auto 64px' }}>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(32px,4vw,48px)', fontWeight: 600, margin: 0, letterSpacing: -0.5 }}>Everything, except the call itself.</h2>
        </div>
        <div style={{ maxWidth: 900, margin: '0 auto', borderTop: '1px solid #00000018' }}>
          {FEATURES.map((f, i) => {
            const active = hoverFeature === i
            return (
              <div
                key={f.num}
                style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '70px 1fr 1.35fr', gap: isMobile ? 6 : 32, alignItems: isMobile ? 'flex-start' : 'baseline', padding: '32px 0', borderBottom: '1px solid #00000018' }}
                onMouseEnter={() => setHoverFeature(i)}
                onMouseLeave={() => setHoverFeature(null)}
              >
                <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 30, fontWeight: 600, color: active ? '#FFD400' : '#00000030', transition: 'color .25s ease' }}>{f.num}</div>
                <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 600, color: active ? '#8a6d00' : '#000', transition: 'color .25s ease' }}>{f.title}</div>
                <div style={{ fontSize: 16, lineHeight: 1.65, color: '#444' }}>{f.desc}</div>
              </div>
            )
          })}
        </div>
      </section>

      <section
        id="engine"
        data-reveal
        ref={(node) => { sectionRefs.current.engine = node; if (node) node.dataset.revealKey = 'engine' }}
        style={{ padding: `${isMobile ? '70px' : '120px'} ${sidePad}`, maxWidth: 1280, margin: '0 auto', opacity: revealed.engine ? 1 : 0, transform: revealed.engine ? 'none' : 'translateY(24px)', transition: 'opacity .8s ease, transform .8s ease' }}
      >
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(32px,4vw,52px)', fontWeight: 600, margin: '0 0 16px', letterSpacing: -0.5 }}>Every reply, scored the moment it lands.</h2>
          <p style={{ fontSize: 17, color: '#444', maxWidth: 560, margin: '0 auto' }}>Filter by category — this is the same classifier reading your inbox in real time.</p>
        </div>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 28, justifyContent: 'center' }}>
          {filterCats.map((c) => {
            const active = replyFilter === c
            return (
              <button
                key={c}
                onClick={() => setReplyFilter(c)}
                onMouseEnter={growCursor} onMouseLeave={shrinkCursor}
                style={{ padding: '8px 16px', borderRadius: 999, border: active ? '1px solid transparent' : '1px solid oklch(85% 0.01 70)', background: active ? '#000' : 'transparent', color: active ? '#fff' : '#333', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', transition: 'all .25s ease' }}
              >{c === 'All' ? 'All' : CATEGORY_META[c].label}</button>
            )
          })}
        </div>

        <div style={{ overflowX: isMobile ? 'auto' : 'visible' }}>
          <div style={{ border: '1px solid oklch(88% 0.01 70)', borderRadius: 8, overflow: 'hidden', background: 'oklch(99% 0.005 75)', minWidth: isMobile ? 720 : 'auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 2.4fr 1.2fr 0.9fr 0.7fr', padding: '14px 24px', background: 'oklch(94% 0.01 72)', fontSize: 11, fontWeight: 700, letterSpacing: 0.5, color: '#555', textTransform: 'uppercase' }}>
              <div>Company / Role</div><div>Reply</div><div>Category</div><div>Fee</div><div>When</div>
            </div>
            {filteredReplies.map((r) => {
              const cm = CATEGORY_META[r.category]
              return (
                <div key={r.company} style={{ display: 'grid', gridTemplateColumns: '1.6fr 2.4fr 1.2fr 0.9fr 0.7fr', padding: '16px 24px', borderTop: '1px solid oklch(92% 0.01 70)', alignItems: 'center', fontSize: 14 }}>
                  <div><div style={{ fontWeight: 600 }}>{r.company}</div><div style={{ fontSize: 13, color: '#555' }}>{r.role}</div></div>
                  <div style={{ color: '#333', fontStyle: 'italic' }}>"{r.snippet}"</div>
                  <div><span style={{ fontSize: 12, fontWeight: 600, padding: '4px 10px', borderRadius: 999, color: cm.text, background: cm.color }}>{cm.label}</span></div>
                  <div style={{ fontWeight: 600, color: '#000', fontVariantNumeric: 'tabular-nums' }}>{cm.fee === 0 ? '—' : `$${cm.fee}`}</div>
                  <div style={{ color: '#666', fontSize: 13 }}>{r.time}</div>
                </div>
              )
            })}
            <div style={{ padding: '14px 24px', fontSize: 12, color: '#555', borderTop: '1px solid oklch(92% 0.01 70)', display: 'flex', justifyContent: 'space-between' }}>
              <span>Showing {filteredReplies.length} of {REPLIES.length} replies · Earned in view: ${visibleEarned}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 6, height: 6, borderRadius: '50%', background: '#FFD400', animation: 'pulseDot 1.6s ease-in-out infinite' }} />Classifying live</span>
            </div>
          </div>
        </div>
      </section>

      <section
        id="pricing"
        data-reveal
        ref={(node) => { sectionRefs.current.pricing = node; if (node) node.dataset.revealKey = 'pricing' }}
        style={{ padding: `${isMobile ? '70px' : '120px'} ${sidePad} ${isMobile ? '70px' : '140px'}`, background: 'oklch(96% 0.035 95)', opacity: revealed.pricing ? 1 : 0, transform: revealed.pricing ? 'none' : 'translateY(24px)', transition: 'opacity .8s ease, transform .8s ease' }}
      >
        <div style={{ maxWidth: 1280, margin: '0 auto 48px', textAlign: 'center' }}>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(32px,4vw,48px)', fontWeight: 600, margin: '0 0 16px', letterSpacing: -0.5 }}>You pay infra. You pay for what lands. Nothing else.</h2>
          <p style={{ fontSize: 17, color: '#444', maxWidth: 640, margin: '0 auto' }}>No blended retainer, no headcount markup. Two line items, both transparent.</p>
        </div>

        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 28 }}>
          <div style={{ padding: '36px 38px', borderRadius: 10, border: '1px solid oklch(88% 0.02 90)', background: 'oklch(99% 0.005 75)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, flexWrap: 'wrap', marginBottom: 24 }}>
              <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 21, fontWeight: 600 }}>Infrastructure — at cost</div>
              <div style={{ display: 'flex', flexShrink: 0, whiteSpace: 'nowrap', border: '1px solid oklch(85% 0.01 70)', borderRadius: 999, overflow: 'hidden' }}>
                {(['Base', 'Growth'] as const).map((t) => (
                  <button
                    key={t} onClick={() => setTier(t)} onMouseEnter={growCursor} onMouseLeave={shrinkCursor}
                    style={{ padding: '7px 16px', border: 'none', background: tier === t ? '#000' : 'transparent', color: tier === t ? '#fff' : '#333', fontSize: 12.5, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', transition: 'all .2s ease', whiteSpace: 'nowrap' }}
                  >{t}</button>
                ))}
              </div>
            </div>
            {tierData.rows.map((row) => (
              <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '11px 0', borderTop: '1px solid oklch(90% 0.01 70)', fontSize: 14.5 }}>
                <span style={{ color: '#333' }}>{row.label}</span>
                <span style={{ fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>{row.value}</span>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '18px 0 2px' }}>
              <span style={{ fontWeight: 600 }}>Total / month (est.)</span>
              <span style={{ fontFamily: "'Playfair Display',serif", fontSize: 24, fontWeight: 600, color: '#8a6d00', fontVariantNumeric: 'tabular-nums' }}>~${tierData.total}</span>
            </div>
            <div style={{ fontSize: 13, color: '#555', marginTop: 10 }}>Domains, mailboxes, sending, sourcing, verification, and AI reply processing — passed through as one line, no markup games.</div>
          </div>

          <div style={{ padding: '36px 38px', borderRadius: 10, border: '1px solid oklch(88% 0.02 90)', background: 'oklch(99% 0.005 75)' }}>
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 21, fontWeight: 600, marginBottom: 24 }}>Performance fee — priced by reply</div>
            {FEE_ROWS.map((row) => {
              const notBillable = row.value === '$0 — not billable'
              return (
                <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '11px 0', borderTop: '1px solid oklch(90% 0.01 70)' }}>
                  <span style={{ fontSize: 14.5, color: notBillable ? '#777' : '#333' }}>{row.label}</span>
                  <span style={{ fontWeight: 600, fontVariantNumeric: 'tabular-nums', color: notBillable ? '#777' : '#000' }}>{row.value}</span>
                </div>
              )
            })}
            <div style={{ fontSize: 13, color: '#555', marginTop: 18 }}>No fee is owed until a real human reply lands and gets classified. Auto-replies and negatives cost you nothing.</div>
          </div>
        </div>
      </section>

      <section style={{ padding: `${isMobile ? '70px' : '110px'} ${sidePad}`, maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: 'center', justifyContent: 'center', gap: isMobile ? 28 : 0 }}>
          {[['21', 'Meetings'], ['20', 'Days'], ['33%', 'Open Rate'], ['0.8%', 'Bounce Rate']].map(([val, label], i) => (
            <React.Fragment key={label}>
              {i > 0 && !isMobile && <div style={{ width: 1, height: 56, background: 'oklch(85% 0.01 70)', margin: '0 40px' }} />}
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(32px,4vw,48px)', fontWeight: 600 }}>{val}</div>
                <div style={{ fontSize: 13, color: '#666', marginTop: 6 }}>{label}</div>
              </div>
            </React.Fragment>
          ))}
        </div>
        <p style={{ maxWidth: 680, margin: '44px auto 0', textAlign: 'center', fontSize: 17, lineHeight: 1.6, color: '#333' }}>
          The Realtrix team built a targeted consulting vertical system for KPRM Media, bypassing traditional ad spend to generate direct calendar bookings from qualified prospects.
        </p>
        <blockquote style={{ maxWidth: 680, margin: '36px auto 0', textAlign: 'center', fontFamily: "'Playfair Display',serif", fontSize: 'clamp(20px,2.4vw,26px)', fontWeight: 500, lineHeight: 1.5, color: '#000' }}>
          "The Realtrix team have been nothing short of professional. We've managed to get over 21 meetings to date — they've found quality leads within our ideal customer persona."
        </blockquote>
        <div style={{ textAlign: 'center', fontSize: 14, color: '#666', marginTop: 20 }}>— Kopano Mashona, KPRM Media</div>
      </section>

      <section style={{ padding: `${isMobile ? '70px' : '110px'} ${sidePad}`, maxWidth: 1100, margin: '0 auto', borderTop: '1px solid oklch(90% 0.01 70)' }}>
        <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: 'center', justifyContent: 'center', gap: isMobile ? 28 : 0 }}>
          {[['15', 'Meetings'], ['15', 'Days'], ['29%', 'Open Rate'], ['1.1%', 'Bounce Rate']].map(([val, label], i) => (
            <React.Fragment key={label}>
              {i > 0 && !isMobile && <div style={{ width: 1, height: 56, background: 'oklch(85% 0.01 70)', margin: '0 40px' }} />}
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(32px,4vw,48px)', fontWeight: 600 }}>{val}</div>
                <div style={{ fontSize: 13, color: '#666', marginTop: 6 }}>{label}</div>
              </div>
            </React.Fragment>
          ))}
        </div>
        <p style={{ maxWidth: 680, margin: '44px auto 0', textAlign: 'center', fontSize: 17, lineHeight: 1.6, color: '#333' }}>
          The Realtrix team stood up a cold outbound system for Sitecraft, sourcing and verifying a fresh prospect list and handling every reply so their team only had to show up to the call.
        </p>
        <blockquote style={{ maxWidth: 680, margin: '36px auto 0', textAlign: 'center', fontFamily: "'Playfair Display',serif", fontSize: 'clamp(20px,2.4vw,26px)', fontWeight: 500, lineHeight: 1.5, color: '#000' }}>
          "15 booked meetings in just over two weeks, with zero time spent on our end sourcing leads or writing follow-ups. Realtrix just handed us a calendar."
        </blockquote>
        <div style={{ textAlign: 'center', fontSize: 14, color: '#666', marginTop: 20 }}>— Daniel Reyes, Sitecraft</div>
      </section>

      <section style={{ padding: `${isMobile ? '70px' : '110px'} ${sidePad}`, maxWidth: 1100, margin: '0 auto', borderTop: '1px solid oklch(90% 0.01 70)' }}>
        <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: 'center', justifyContent: 'center', gap: isMobile ? 28 : 0 }}>
          {[['10', 'Qualified Leads'], ['2,000', 'Contacts'], ['1.7%', 'Reply Rate'], ['29%', 'Reply-to-Call Rate']].map(([val, label], i) => (
            <React.Fragment key={label}>
              {i > 0 && !isMobile && <div style={{ width: 1, height: 56, background: 'oklch(85% 0.01 70)', margin: '0 40px' }} />}
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(32px,4vw,48px)', fontWeight: 600 }}>{val}</div>
                <div style={{ fontSize: 13, color: '#666', marginTop: 6 }}>{label}</div>
              </div>
            </React.Fragment>
          ))}
        </div>
        <p style={{ maxWidth: 680, margin: '44px auto 0', textAlign: 'center', fontSize: 17, lineHeight: 1.6, color: '#333' }}>
          Realtrix ran an outbound system for Sorted Virtual Assistance, targeting small, 1-2 person professional practices and generating 10 qualified leads inside the first month of sending.
        </p>
        <div style={{ textAlign: 'center', fontSize: 14, color: '#666', marginTop: 20 }}>— Management, Sorted Virtual Assistance</div>
      </section>

      <section style={{ color: '#fff', padding: `${isMobile ? '80px' : '140px'} ${sidePad}`, textAlign: 'center', background: '#000' }}>
        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(36px,5vw,64px)', fontWeight: 600, letterSpacing: -1, margin: '0 0 28px', maxWidth: 820, marginLeft: 'auto', marginRight: 'auto' }}>
          Ready to stop paying for potential and start <span style={{ backgroundImage: 'linear-gradient(#FFD400, #FFD400)', backgroundRepeat: 'no-repeat', backgroundSize: '100% 0.92em', backgroundPosition: '0 58%', color: '#000', padding: '0 3px' }}>closing</span>?
        </h2>
        <p style={{ fontSize: 17, color: '#b3b3b3', maxWidth: 480, margin: '0 auto 12px' }}>Tell us who you sell to. We'll tell you exactly what it costs — before you spend a dollar.</p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginTop: 36 }}>
          <button
            style={{ padding: '16px 32px', borderRadius: 4, border: 'none', background: '#FFD400', color: '#000', fontSize: 15, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}
            onMouseEnter={growCursor} onMouseLeave={shrinkCursor} onClick={bookCall}
          >Book a Call →</button>
          <a href="#pricing" style={{ padding: '16px 32px', borderRadius: 4, border: '1px solid #444', color: '#fff', fontSize: 15, fontWeight: 600, textDecoration: 'none', display: 'inline-block' }} onMouseEnter={growCursor} onMouseLeave={shrinkCursor}>See the Cost Model</a>
        </div>
      </section>

      <footer style={{ padding: sidePad, maxWidth: 1280, margin: '0 auto', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 40 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 20, height: 20, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }} dangerouslySetInnerHTML={{ __html: LOGO_SVG }} />
          <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 20, fontWeight: 600 }}>Realtrix</div>
        </div>
        <div style={{ display: 'flex', gap: 64, flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, color: '#555', textTransform: 'uppercase', marginBottom: 14 }}>Product</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14 }}><a href="#engine" style={{ textDecoration: 'none' }}>Reply Engine</a><a href="#pricing" style={{ textDecoration: 'none' }}>Cost Model</a><a href="#how" style={{ textDecoration: 'none' }}>How it Works</a><Link to="/services/done-for-you-cold-email" style={{ textDecoration: 'none', color: 'inherit' }}>Done-For-You</Link><Link to="/services/cold-email-automation-setup" style={{ textDecoration: 'none', color: 'inherit' }}>Cold Email Setup</Link><Link to="/services/email-deliverability-consulting" style={{ textDecoration: 'none', color: 'inherit' }}>Deliverability</Link><Link to="/services/b2b-lead-generation" style={{ textDecoration: 'none', color: 'inherit' }}>B2B Lead Gen</Link><Link to="/services/multi-touch-outreach" style={{ textDecoration: 'none', color: 'inherit' }}>Multi-Touch</Link><Link to="/tools" style={{ textDecoration: 'none', color: 'inherit' }}>Tools</Link></div>
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, color: '#555', textTransform: 'uppercase', marginBottom: 14 }}>Company</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14 }}><Link to="/about" style={{ textDecoration: 'none', color: 'inherit' }}>About</Link><Link to="/about" style={{ textDecoration: 'none', color: 'inherit' }}>Careers</Link><Link to="/outreach" style={{ textDecoration: 'none', color: 'inherit' }}>Blog</Link></div>
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, color: '#555', textTransform: 'uppercase', marginBottom: 14 }}>Legal</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 14 }}><Link to="/legal/privacy" style={{ textDecoration: 'none', color: 'inherit' }}>Privacy</Link><Link to="/legal/terms" style={{ textDecoration: 'none', color: 'inherit' }}>Terms</Link><Link to="/legal/aup" style={{ textDecoration: 'none', color: 'inherit' }}>Security</Link></div>
          </div>
        </div>
        <div style={{ fontSize: 13, color: '#555', alignSelf: 'flex-end' }}>© 2026 Realtrix, Inc.</div>
      </footer>

      <DiagnosticModal />
    </div>
  )
}

export default Home

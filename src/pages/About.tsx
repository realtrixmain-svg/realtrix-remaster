import React from 'react'
import SEO from '../components/SEO'
import PublicNav from '../components/PublicNav'
import PublicFooter from '../components/PublicFooter'
import { useIsMobile } from '../hooks/useIsMobile'

const CAL_LINK = 'https://cal.com/trevorryan/30min'

const PILLARS = [
  { title: 'Why Realtrix Exists', desc: 'Cold email is broken. Agencies charge retainers for work that should be automated, and you never know if the money is actually generating replies. We built Realtrix to fix that — transparent infrastructure, AI-qualified replies, and zero markup.' },
  { title: 'How We Think', desc: 'We treat every niche like a hypothesis. We test segments with the same rigor as subject lines, and kill what does not convert. Data drives every decision — not hunches, not gut feeling.' },
  { title: 'Who We Work With', desc: 'Marketing agencies, B2B SaaS companies, and consultancies that have a proven offer and need a predictable pipeline. If your product sells itself on a call, we can fill your calendar.' },
]

const FOUNDERS = [
  { initials: 'TR', name: 'Trevor Ryan', role: 'Founder & Systems Architect', bio: 'Built and scaled cold email systems across multiple verticals. Obsessed with infrastructure that runs itself.' },
  { initials: 'BB', name: 'Brendon Barnard', role: 'Co-Founder & Operations Lead', bio: 'Turns complex outreach workflows into repeatable, automated pipelines. If it can be systematised, Brendon has already mapped it.' },
  { initials: 'TN', name: 'Tristan Newton', role: 'Co-Founder & AI Strategy', bio: 'Designs the AI reply classification layer. Every reply scored, every meeting routed, every signal captured.' },
]

const About: React.FC = () => {
  const m = useIsMobile()
  const sidePad = m ? 20 : 40

  return (
    <div style={{ fontFamily: "'Work Sans',sans-serif", color: '#000', background: 'oklch(97% 0.01 75)', minHeight: '100vh' }}>
      <SEO
        title="About"
        description="Realtrix was built after failing twice. Learn about the team, the thinking, and the systems behind cold email infrastructure that actually generates revenue."
        canonical="/about"
      />
      <PublicNav />

      <section style={{ padding: `${m ? 80 : 120}px ${sidePad} ${m ? 40 : 80}px`, maxWidth: 1100, margin: '0 auto', textAlign: 'center' }}>
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(36px,4.5vw,64px)', fontWeight: 600, letterSpacing: -1, margin: '0 0 24px', lineHeight: 1.05 }}>
          We Engineer<br />Revenue Systems
        </h1>
        <p style={{ fontSize: m ? 16 : 18, lineHeight: 1.6, color: '#444', maxWidth: 600, margin: '0 auto' }}>
          Realtrix does not sell "email marketing." We build the infrastructure, sourcing, sequencing, and AI classification layer that turns cold outreach into a reliable pipeline — and we charge for it the way it should be charged: at cost, plus results.
        </p>
      </section>

      <section style={{ padding: `${m ? 40 : 80}px ${sidePad}`, maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : '1fr 1fr', gap: m ? 40 : 64, alignItems: 'start' }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, color: '#D9A600', textTransform: 'uppercase', marginBottom: 16 }}>Our Story</div>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 32, fontWeight: 600, margin: '0 0 20px', lineHeight: 1.2 }}>Realtrix was built after failing twice.</h2>
            <div style={{ fontSize: 16, lineHeight: 1.7, color: '#444' }}>
              <p style={{ margin: '0 0 16px' }}>We tried the agency model. We tried the SaaS tool model. Both times, we watched good clients burn budget on infrastructure that was never designed to scale.</p>
              <p style={{ margin: '0 0 16px' }}>The third time, we stripped it back to the only thing that matters: does the email land, does the person reply, and does the meeting book?</p>
              <p style={{ margin: 0 }}>Everything else is overhead. Realtrix removes it.</p>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            {PILLARS.map((p) => (
              <div key={p.title} style={{ padding: '28px 32px', borderRadius: 10, border: '1px solid oklch(88% 0.02 90)', background: 'oklch(99% 0.005 75)' }}>
                <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 20, fontWeight: 600, marginBottom: 10 }}>{p.title}</div>
                <div style={{ fontSize: 15, lineHeight: 1.65, color: '#444' }}>{p.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: `${m ? 60 : 100}px ${sidePad}`, background: '#000', color: '#fff' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(30px,3.6vw,46px)', fontWeight: 600, margin: '0 0 16px', letterSpacing: -0.5 }}>The Team</h2>
          <p style={{ fontSize: 17, color: '#b3b3b3', maxWidth: 480, margin: '0 auto 56px' }}>Three founders. No fluff. Every one of us has hands on the systems we sell.</p>
          <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : 'repeat(3, 1fr)', gap: 32 }}>
            {FOUNDERS.map((f) => (
              <div key={f.initials} style={{ padding: '36px 28px', borderRadius: 10, border: '1px solid #262626', background: '#0a0a0a', textAlign: 'left' }}>
                <div style={{
                  width: 64, height: 64, borderRadius: '50%', background: '#FFD400', color: '#000',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 700, marginBottom: 20,
                }}>{f.initials}</div>
                <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 20, fontWeight: 600, marginBottom: 4 }}>{f.name}</div>
                <div style={{ fontSize: 13, color: '#FFD400', fontWeight: 600, marginBottom: 12 }}>{f.role}</div>
                <div style={{ fontSize: 15, lineHeight: 1.6, color: '#999' }}>{f.bio}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: `${m ? 60 : 100}px ${sidePad}`, textAlign: 'center' }}>
        <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(28px,3.5vw,42px)', fontWeight: 600, margin: '0 0 20px', letterSpacing: -0.5 }}>Ready to talk revenue systems?</h2>
        <p style={{ fontSize: 17, color: '#444', maxWidth: 480, margin: '0 auto 36px' }}>Tell us who you sell to. We will tell you exactly what it costs — before you spend a dollar.</p>
        <a
          href={CAL_LINK} target="_blank" rel="noopener noreferrer"
          style={{
            display: 'inline-block', padding: '16px 32px', borderRadius: 4, background: '#000',
            color: '#fff', fontSize: 15, fontWeight: 600, textDecoration: 'none', fontFamily: "'Work Sans',sans-serif",
          }}
        >Book a Call →</a>
      </section>

      <PublicFooter />
    </div>
  )
}

export default About

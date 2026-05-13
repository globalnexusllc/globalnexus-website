'use client'

import {useState, useEffect} from 'react'
import Link from 'next/link'
import {ParticleNetwork} from '@/components/shared/ParticleNetwork'
import {
  ArrowRight, ArrowDown, Target, Users,
  Shield, Database, DollarSign,
  ChevronRight, ChevronLeft,
} from 'lucide-react'

/* ── CLIENT LOGO WALL ── */
const tier1Clients = [
  {name: 'Neighbors', context: 'Software engineering · Platform · Chef marketplace'},
  {name: 'Featured Customers', context: 'React + Django · B2B SaaS'},
  {name: 'Go Ask Alice!', context: 'Gatsby + Drupal · Columbia University'},
  {name: 'Torc', context: 'Next.js · Tech talent marketplace'},
  {name: 'Mindtrip', context: 'AI + FastAPI · Travel assistant'},
  {name: 'Polarace', context: 'Nest.js + MongoDB · Creator platform'},
  {name: 'Trend', context: 'Next.js + Stripe · Creator marketplace'},
]
const tier2Clients: {name: string; context: string}[] = []

/* ── SELECTED ENGAGEMENTS ── */
const engagements = [
  {
    label: 'Mindtrip',
    stats: 'AI travel platform shipped in 90 days',
    detail: 'Built end-to-end AI travel assistant with FastAPI, LangChain, Pinecone vector search, and LlamaIndex. Powered real-time conversational trip planning with intelligent, intent-based recommendations.',
    accent: 'oklch(0.82 0.15 75)',
  },
  {
    label: 'Featured Customers',
    stats: 'Enterprise B2B SaaS platform rebuilt',
    detail: 'Implemented dynamic frontend with React + TypeScript, integrated React Hook Form and React Query, and built RESTful Django REST Framework endpoints. Delivered clean, responsive UI across all devices.',
    accent: 'oklch(0.6 0.2 280)',
  },
  {
    label: 'Polarace',
    stats: '3× user signups post-launch',
    detail: 'Creator job marketplace with React.js, Nest.js, Prisma, and MongoDB. Architected the full data layer supporting creator profiles, job listings, and application workflows. Deployed on AWS.',
    accent: 'oklch(0.65 0.2 150)',
  },
]

/* ── WHY DIFFERENT ── */
const diffRows = [
  {trad: 'Sells analysis', broker: 'Outsources delivery', ramp: 'Ships production-grade code end-to-end'},
  {trad: 'Bills hours', broker: 'Fixed templates', ramp: 'Outcome-driven — milestones, not timesheets'},
  {trad: 'Client manages QA', broker: 'Disappears post-handoff', ramp: 'Stays engaged from spec to scale'},
  {trad: 'Junior developers', broker: 'No technical depth', ramp: 'Senior engineers on every engagement'},
  {trad: 'Estimates ±40%', broker: 'No accountability', ramp: 'Fixed-scope delivery with clear milestones'},
]


/* ── TESTIMONIALS ── */
const testimonials = [
  {
    quote: "Global Nexus delivered our full platform from scratch — frontend, backend, and database — with a level of craftsmanship we hadn't seen before. The checkout flow alone boosted our order conversions by 40%.",
    name: 'Sarah Chen',
    title: 'Co-Founder, Neighbors',
  },
  {
    quote: "Their React and Django work was impeccable. Complex API integrations, form systems, responsive UI — all delivered cleanly and on schedule. They became an extension of our team within the first week.",
    name: 'Marcus Webb',
    title: 'VP Engineering, Featured Customers',
  },
  {
    quote: "Rebuilding our health platform in Gatsby with Drupal CMS integration was a major undertaking. Global Nexus handled it with precision. The new design system they built cut our development cycle in half.",
    name: 'Dr. Lisa Fortner',
    title: 'Digital Director, Columbia University',
  },
  {
    quote: "Fast, quality work with zero hand-holding needed. Their Next.js component library fit seamlessly into our design system, and the Storybook documentation they left behind has been invaluable.",
    name: 'Ryan Park',
    title: 'Head of Product, Torc',
  },
  {
    quote: "We needed someone who could bridge modern AI tooling with production-grade backend infrastructure. Global Nexus delivered beyond expectations — the LangChain and Pinecone integration they built is the backbone of our product today.",
    name: 'Jenna Liu',
    title: 'CTO, Mindtrip',
  },
  {
    quote: "From Nest.js APIs to React UI, everything was solid. They understood our creator audience and built features that felt native to the gaming community. Our user signups tripled in the quarter after launch.",
    name: 'Tyler Brooks',
    title: 'CEO, Polarace',
  },
  {
    quote: "What impressed us most was the product thinking behind the code. The S3 upload pipeline, shoppable video feed, and Stripe credit system — each piece was architected for scale. Global Nexus thinks like a product team, not just engineers.",
    name: 'Amanda Torres',
    title: 'Product Lead, Trend',
  },
]

/* ── HOW WE OPERATE ── */
const operateSteps = [
  {
    num: '01',
    title: 'Scope & Architect',
    desc: 'We start with a clear technical spec — stack selection, data models, API contracts, and a delivery roadmap. No ambiguity before a line of code is written.',
    Icon: Database,
    link: {label: 'Our Process →', href: '/process'},
  },
  {
    num: '02',
    title: 'Build & Iterate',
    desc: 'Agile sprints with real demos every cycle. You see working software, not status reports. We ship fast and adjust based on what you actually see.',
    Icon: Target,
    link: {label: 'View Portfolio →', href: '/proof'},
  },
  {
    num: '03',
    title: 'Launch & Scale',
    desc: 'We don\'t disappear at launch. We monitor, optimize, and stay engaged as your product grows. Uptime, performance, and feature velocity — sustained.',
    Icon: Users,
    link: {label: 'Get In Touch →', href: '/contact'},
  },
]


function ClientCard({name, context, warm = false}: {name: string; context: string; warm?: boolean}) {
  return (
    <div className="text-center px-2 py-4">
      <h3
        className="text-xs sm:text-sm font-bold tracking-[0.15em] uppercase"
        style={{fontFamily: 'var(--font-display)', color: warm ? 'oklch(0.35 0.05 50)' : 'rgba(255,255,255,0.6)'}}
      >
        {name}
      </h3>
      <p
        className="text-[11px] sm:text-xs mt-1 leading-snug"
        style={{fontFamily: 'var(--font-body)', color: warm ? 'oklch(0.55 0.05 50)' : 'rgba(255,255,255,0.3)'}}
      >
        {context}
      </p>
    </div>
  )
}

function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'done' | 'error'>('idle')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!email) return
    setStatus('submitting')
    const data = new FormData()
    data.append('form-name', 'newsletter')
    data.append('email', email)
    fetch('/', {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: new URLSearchParams(data as unknown as Record<string, string>).toString(),
    })
      .then(() => { setStatus('done'); setEmail('') })
      .catch(() => setStatus('error'))
  }

  return (
    <section className="section-light py-20 sm:py-24">
      <div className="max-w-2xl mx-auto px-5 sm:px-8 text-center">
        <div
          className="inline-block text-xs font-bold uppercase tracking-[0.2em] px-3 py-1.5 rounded-full mb-5"
          style={{background: 'rgba(100,60,30,0.08)', color: 'oklch(0.55 0.15 30)', fontFamily: 'var(--font-body)'}}
        >
          Intelligence Brief
        </div>
        <h2
          className="text-3xl sm:text-4xl font-bold mb-4"
          style={{fontFamily: 'var(--font-display)', color: 'oklch(0.18 0.03 50)'}}
        >
          Stay in the Loop
        </h2>
        <p
          className="text-base leading-relaxed mb-8 max-w-lg mx-auto"
          style={{fontFamily: 'var(--font-body)', color: 'oklch(0.45 0.02 50)'}}
        >
          Engineering insights, product breakdowns, and what we&apos;re building — straight from our team. No fluff.
        </p>

        {status === 'done' ? (
          <p className="text-base font-semibold" style={{color: 'oklch(0.55 0.15 30)', fontFamily: 'var(--font-body)'}}>
            You&apos;re in. Welcome to the list.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              name="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="flex-1 px-4 py-3 rounded-md border text-sm focus:outline-none focus:ring-2"
              style={{
                borderColor: 'oklch(0.82 0.05 80)',
                fontFamily: 'var(--font-body)',
              }}
            />
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="px-6 py-3 rounded-md text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-60 whitespace-nowrap"
              style={{background: 'oklch(0.55 0.15 30)', fontFamily: 'var(--font-body)'}}
            >
              {status === 'submitting' ? 'Subscribing…' : 'Subscribe'}
            </button>
          </form>
        )}

        {status === 'error' && (
          <p className="mt-3 text-xs" style={{color: 'oklch(0.5 0.2 20)', fontFamily: 'var(--font-body)'}}>
            Something went wrong. Try again or email us directly.
          </p>
        )}

        <p className="mt-4 text-xs" style={{color: 'oklch(0.6 0.01 50)', fontFamily: 'var(--font-body)'}}>
          No spam. Unsubscribe anytime.
        </p>
      </div>
    </section>
  )
}

export default function HomeContent() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setActive((p) => (p + 1) % testimonials.length), 6000)
    return () => clearInterval(timer)
  }, [])

  const next = () => setActive((p) => (p + 1) % testimonials.length)
  const prev = () => setActive((p) => (p - 1 + testimonials.length) % testimonials.length)

  return (
    <div className="min-h-screen">
      {/* ═══ HERO ═══ */}
      <section
        className="relative min-h-screen flex flex-col overflow-hidden"
        style={{background: 'linear-gradient(135deg, #1e3a5f 0%, #254b78 50%, #1e3a5f 100%)'}}
      >
        {/* Particle network background */}
        <div className="absolute inset-0">
          <ParticleNetwork className="absolute inset-0" />
          <div className="absolute inset-0" style={{background: 'linear-gradient(to top, rgba(30,58,95,0.92) 0%, rgba(30,58,95,0.15) 50%, rgba(30,58,95,0.4) 100%)'}} />
        </div>

        {/* Glassmorphic orbs */}
        <div className="glass-orb glass-orb-amber w-[500px] h-[500px] -top-40 -right-40 z-[1]" style={{animationDuration: '8s'}} />
        <div className="glass-orb glass-orb-rust w-[300px] h-[300px] bottom-20 left-10 z-[1]" style={{animationDuration: '12s'}} />
        <div className="glass-orb glass-orb-blue w-[200px] h-[200px] z-[1]" style={{top: '33%', right: '25%', animationDuration: '10s'}} />

        <div className="relative z-10 flex-1 flex items-center">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 w-full pt-28 pb-16">
            <div className="max-w-2xl">
              <div className="mb-8">
                <span
                  className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-white/10 bg-white/5"
                >
                  <span className="w-1.5 h-1.5 rounded-full" style={{background: 'var(--gold)'}} />
                  <span
                    className="text-[11px] sm:text-xs font-medium tracking-[0.2em] uppercase text-white/60"
                    style={{fontFamily: 'var(--font-body)'}}
                  >
                    Software Engineering Firm · Colbert, GA
                  </span>
                </span>
              </div>

              <h1
                className="font-bold text-white leading-[1.05] tracking-tight"
                style={{fontFamily: 'var(--font-display)', fontSize: 'clamp(2.75rem, 7vw, 4.5rem)'}}
              >
                We Build Digital
                <br />
                Products That{' '}
                <span style={{color: 'var(--gold)'}}>Scale.</span>
              </h1>

              <p
                className="mt-6 text-sm sm:text-base font-semibold tracking-[0.15em] uppercase"
                style={{fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.4)'}}
              >
                50+ Projects Delivered · React to AI · End-to-End
              </p>

              <p
                className="mt-6 text-lg sm:text-xl leading-relaxed max-w-xl"
                style={{fontFamily: 'var(--font-body)', color: 'rgba(255,255,255,0.65)'}}
              >
                From React frontends to AI-powered backends — we architect, build, and ship. No hand-holding required.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-md text-sm font-bold transition-all hover:opacity-90"
                  style={{
                    background: 'var(--gold)',
                    color: 'var(--dark)',
                    fontFamily: 'var(--font-body)',
                    boxShadow: '0 8px 30px rgba(212,168,67,0.2)',
                  }}
                >
                  Start a Project <ArrowRight size={16} />
                </Link>
                <Link
                  href="/proof"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-md text-sm font-semibold border border-white/20 text-white/80 hover:bg-white/5 transition-all"
                  style={{fontFamily: 'var(--font-body)'}}
                >
                  View Portfolio
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 pb-8 flex justify-center">
          <div className="flex flex-col items-center gap-2 text-white/30">
            <span className="text-[10px] tracking-[0.3em] uppercase block" style={{fontFamily: 'var(--font-mono)'}}>
              Scroll
            </span>
            <ArrowDown size={16} className="animate-bounce" />
          </div>
        </div>
      </section>

      {/* ═══ CLIENT WALL ═══ */}
      <section className="section-warm py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="text-center mb-10">
            <h2
              className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight"
              style={{fontFamily: 'var(--font-display)', color: 'var(--text-dark)'}}
            >
              Trusted by
              <br className="hidden sm:block" />
              <span style={{color: 'oklch(0.55 0.15 30)'}}> Industry-Leading Platforms</span>
            </h2>
            <p
              className="mt-3 text-sm"
              style={{fontFamily: 'var(--font-body)', color: 'oklch(0.5 0.02 50)'}}
            >
              50+ projects delivered. From startups to Fortune-backed enterprises.
            </p>
          </div>

          {/* Tier 1 */}
          <div
            className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-px rounded-lg overflow-hidden"
            style={{background: 'rgba(100,60,30,0.08)', border: '1px solid rgba(100,60,30,0.12)'}}
          >
            {tier1Clients.map((c) => (
              <div key={c.name} style={{background: 'oklch(0.96 0.02 80)'}}>
                <ClientCard name={c.name} context={c.context} warm />
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-6">
            <Link
              href="/proof"
              className="text-xs font-semibold tracking-[0.15em] uppercase transition-colors hover:opacity-70"
              style={{fontFamily: 'var(--font-body)', color: 'oklch(0.55 0.15 30)'}}
            >
              View Full Portfolio →
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ SELECTED ENGAGEMENTS ═══ */}
      <section className="section-dark py-28 sm:py-36">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="mb-14">
            <span
              className="text-xs font-semibold tracking-[0.2em] uppercase"
              style={{fontFamily: 'var(--font-body)', color: 'var(--gold)'}}
            >
              Selected Engagements
            </span>
            <h2
              className="mt-4 text-3xl sm:text-4xl font-bold text-white"
              style={{fontFamily: 'var(--font-display)'}}
            >
              Results, Not Promises.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {engagements.map((eng) => (
              <div
                key={eng.label}
                className="rounded-xl p-8 transition-all duration-300"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                <div
                  className="w-1 h-10 rounded-full mb-6"
                  style={{backgroundColor: eng.accent}}
                />
                <p
                  className="text-xs uppercase tracking-[0.15em] mb-3"
                  style={{fontFamily: 'var(--font-body)', color: 'rgba(255,255,255,0.4)'}}
                >
                  {eng.label}
                </p>
                <h3
                  className="text-xl sm:text-2xl font-bold text-white mb-4"
                  style={{fontFamily: 'var(--font-display)'}}
                >
                  {eng.stats}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{fontFamily: 'var(--font-body)', color: 'rgba(255,255,255,0.5)'}}
                >
                  {eng.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ═══ WHY WE'RE DIFFERENT ═══ */}
      <section className="section-warm py-24 sm:py-32">
        <div className="max-w-5xl mx-auto px-5 sm:px-8">
          <div className="text-center mb-14">
            <span
              className="text-xs font-semibold tracking-[0.2em] uppercase"
              style={{fontFamily: 'var(--font-body)', color: 'var(--rust)'}}
            >
              Why We&apos;re Different
            </span>
            <h2
              className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight"
              style={{fontFamily: 'var(--font-display)', color: 'var(--text-dark)'}}
            >
              Not Consultants. Not Brokers.
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[560px]">
              <thead>
                <tr>
                  <th
                    className="pb-4 text-xs uppercase tracking-[0.15em] font-semibold border-b border-black/10"
                    style={{fontFamily: 'var(--font-body)', color: 'var(--text-mid)'}}
                  >
                    Typical Agency
                  </th>
                  <th
                    className="pb-4 text-xs uppercase tracking-[0.15em] font-semibold border-b border-black/10"
                    style={{fontFamily: 'var(--font-body)', color: 'var(--text-mid)'}}
                  >
                    Offshore Team
                  </th>
                  <th
                    className="pb-4 text-xs uppercase tracking-[0.15em] font-bold border-b-2"
                    style={{fontFamily: 'var(--font-body)', color: 'var(--gold)', borderColor: 'var(--gold)'}}
                  >
                    Global Nexus
                  </th>
                </tr>
              </thead>
              <tbody>
                {diffRows.map((row, i) => (
                  <tr key={i} className="border-b border-black/5">
                    <td className="py-4 pr-6 text-sm" style={{fontFamily: 'var(--font-body)', color: 'var(--text-mid)'}}>
                      {row.trad}
                    </td>
                    <td className="py-4 pr-6 text-sm" style={{fontFamily: 'var(--font-body)', color: 'var(--text-mid)'}}>
                      {row.broker}
                    </td>
                    <td className="py-4 text-sm font-semibold" style={{fontFamily: 'var(--font-body)', color: 'var(--text-dark)'}}>
                      {row.ramp}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p
            className="mt-10 text-base sm:text-lg font-bold text-center leading-relaxed"
            style={{fontFamily: 'var(--font-display)', color: 'var(--text-dark)'}}
          >
            You work with principals. No junior layering. No staffing pyramid.
            <br className="hidden sm:block" />
            The people on the testimonials are the people who serve you.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/process"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md text-sm font-semibold transition-all hover:brightness-110"
              style={{background: 'var(--gold)', color: 'var(--dark)', fontFamily: 'var(--font-body)'}}
            >
              Take the Flow Circuit Assessment
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
            <Link
              href="/process"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md text-sm font-semibold transition-all border"
              style={{borderColor: 'rgba(30,58,95,0.3)', color: 'var(--dark)', fontFamily: 'var(--font-body)'}}
            >
              Find Your Me / Way / Our
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section className="section-dark py-28 sm:py-36 overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="text-center mb-14">
            <span
              className="text-xs font-semibold tracking-[0.2em] uppercase"
              style={{fontFamily: 'var(--font-body)', color: 'var(--gold)'}}
            >
              What Executives Say
            </span>
            <h2
              className="mt-4 text-3xl sm:text-4xl font-bold text-white"
              style={{fontFamily: 'var(--font-display)'}}
            >
              In Their Words.
            </h2>
          </div>

          {/* Desktop: 3 at a time */}
          <div className="hidden lg:block">
            <div className="grid grid-cols-3 gap-6">
              {[0, 1, 2].map((offset) => {
                const idx = (active + offset) % testimonials.length
                const t = testimonials[idx]
                return (
                  <div
                    key={`${idx}-${active}`}
                    className="rounded-xl p-8 flex flex-col"
                    style={{background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)'}}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="mb-4 shrink-0" style={{color: 'rgba(212,168,67,0.4)'}}>
                      <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" fill="currentColor"/>
                      <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" fill="currentColor"/>
                    </svg>
                    <p
                      className="text-sm leading-relaxed italic flex-1"
                      style={{fontFamily: 'var(--font-body)', color: 'rgba(255,255,255,0.7)'}}
                    >
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    <div className="mt-6 pt-4" style={{borderTop: '1px solid rgba(255,255,255,0.06)'}}>
                      <p className="text-sm font-bold text-white" style={{fontFamily: 'var(--font-display)'}}>
                        {t.name}
                      </p>
                      <p className="text-xs mt-0.5" style={{fontFamily: 'var(--font-body)', color: 'rgba(255,255,255,0.4)'}}>
                        {t.title}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="flex justify-center gap-4 mt-8">
              <button
                onClick={prev}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:border-white/30 hover:text-white text-white/40"
                style={{border: '1px solid rgba(255,255,255,0.1)'}}
              >
                <ChevronLeft size={18} />
              </button>
              <div className="flex items-center gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className="h-2 rounded-full transition-all"
                    style={{
                      width: i === active ? '24px' : '8px',
                      background: i === active ? 'var(--gold)' : 'rgba(255,255,255,0.2)',
                    }}
                  />
                ))}
              </div>
              <button
                onClick={next}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all hover:border-white/30 hover:text-white text-white/40"
                style={{border: '1px solid rgba(255,255,255,0.1)'}}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* Mobile: single card */}
          <div className="lg:hidden">
            <div
              key={active}
              className="rounded-xl p-7"
              style={{background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)'}}
            >
              <p
                className="text-sm leading-relaxed italic"
                style={{fontFamily: 'var(--font-body)', color: 'rgba(255,255,255,0.7)'}}
              >
                &ldquo;{testimonials[active].quote}&rdquo;
              </p>
              <div className="mt-5 pt-4" style={{borderTop: '1px solid rgba(255,255,255,0.06)'}}>
                <p className="text-sm font-bold text-white" style={{fontFamily: 'var(--font-display)'}}>
                  {testimonials[active].name}
                </p>
                <p className="text-xs mt-0.5" style={{fontFamily: 'var(--font-body)', color: 'rgba(255,255,255,0.4)'}}>
                  {testimonials[active].title}
                </p>
              </div>
            </div>

            <div className="flex justify-center gap-3 mt-6">
              <button
                onClick={prev}
                className="w-10 h-10 rounded-full flex items-center justify-center text-white/40 hover:text-white transition-all"
                style={{border: '1px solid rgba(255,255,255,0.1)'}}
              >
                <ChevronLeft size={18} />
              </button>
              <div className="flex items-center gap-1.5">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className="h-2 rounded-full transition-all"
                    style={{
                      width: i === active ? '20px' : '8px',
                      background: i === active ? 'var(--gold)' : 'rgba(255,255,255,0.2)',
                    }}
                  />
                ))}
              </div>
              <button
                onClick={next}
                className="w-10 h-10 rounded-full flex items-center justify-center text-white/40 hover:text-white transition-all"
                style={{border: '1px solid rgba(255,255,255,0.1)'}}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ HOW WE OPERATE ═══ */}
      <section className="section-warm py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="mb-14">
            <span
              className="text-xs font-semibold tracking-[0.2em] uppercase"
              style={{fontFamily: 'var(--font-body)', color: 'var(--rust)'}}
            >
              Our Approach
            </span>
            <h2
              className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight"
              style={{fontFamily: 'var(--font-display)', color: 'var(--text-dark)'}}
            >
              Research. Blueprint.{' '}
              <span style={{color: 'var(--rust)'}}>Activate.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {operateSteps.map((step) => (
              <div
                key={step.num}
                className="rounded-xl p-8"
                style={{background: 'rgba(255,255,255,0.6)', border: '1px solid rgba(0,0,0,0.06)'}}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{background: 'rgba(139,69,19,0.1)'}}
                  >
                    <step.Icon size={22} style={{color: 'var(--rust)'}} />
                  </div>
                  <span
                    className="text-3xl font-bold"
                    style={{fontFamily: 'var(--font-mono)', color: 'rgba(139,69,19,0.2)'}}
                  >
                    {step.num}
                  </span>
                </div>
                <h3
                  className="text-xl font-bold mb-3"
                  style={{fontFamily: 'var(--font-display)', color: 'var(--text-dark)'}}
                >
                  {step.title}
                </h3>
                <p
                  className="text-sm leading-relaxed mb-4"
                  style={{fontFamily: 'var(--font-body)', color: 'var(--text-mid)'}}
                >
                  {step.desc}
                </p>
                <Link
                  href={step.link.href}
                  className="text-xs font-semibold transition-colors hover:opacity-70"
                  style={{color: 'var(--rust)', fontFamily: 'var(--font-body)'}}
                >
                  {step.link.label}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ COMPENSATION ═══ */}
      <section className="section-light py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span
                className="text-xs font-semibold tracking-[0.2em] uppercase"
                style={{fontFamily: 'var(--font-body)', color: 'var(--rust)'}}
              >
                Compensation
              </span>
              <h2
                className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight"
                style={{fontFamily: 'var(--font-display)', color: 'var(--text-dark)'}}
              >
                Transparent Pricing,{' '}
                <span style={{color: 'var(--rust)'}}>Real Accountability.</span>
              </h2>
              <p
                className="mt-5 leading-relaxed"
                style={{fontFamily: 'var(--font-body)', color: 'var(--text-mid)', fontSize: '1rem'}}
              >
                No retainers held hostage. No billable hours divorced from results. We scope clearly, deliver fully, and stand behind our work.
              </p>
            </div>

            <div
              className="rounded-xl p-8"
              style={{background: 'rgba(255,255,255,0.6)', border: '1px solid rgba(0,0,0,0.06)'}}
            >
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <DollarSign size={20} className="shrink-0 mt-0.5" style={{color: 'var(--rust)'}} />
                  <div>
                    <div className="text-base font-bold mb-1" style={{fontFamily: 'var(--font-display)', color: 'var(--text-dark)'}}>
                      Fixed-Scope Projects
                    </div>
                    <p className="text-sm" style={{fontFamily: 'var(--font-body)', color: 'var(--text-mid)'}}>
                      Clear deliverables, clear price. No surprise invoices.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Shield size={20} className="shrink-0 mt-0.5" style={{color: 'var(--rust)'}} />
                  <div>
                    <div className="text-base font-bold mb-1" style={{fontFamily: 'var(--font-display)', color: 'var(--text-dark)'}}>
                      Milestone-Based Delivery
                    </div>
                    <p className="text-sm" style={{fontFamily: 'var(--font-body)', color: 'var(--text-mid)'}}>
                      Pay as each stage is completed and approved. Full control.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Target size={20} className="shrink-0 mt-0.5" style={{color: 'var(--rust)'}} />
                  <div>
                    <div className="text-base font-bold mb-1" style={{fontFamily: 'var(--font-display)', color: 'var(--text-dark)'}}>
                      Every Engagement Is Custom
                    </div>
                    <p className="text-sm" style={{fontFamily: 'var(--font-body)', color: 'var(--text-mid)'}}>
                      Every project is different. We scope it right before quoting.
                    </p>
                  </div>
                </div>
              </div>
              <p
                className="mt-8 pt-6 text-sm font-semibold italic"
                style={{fontFamily: 'var(--font-body)', color: 'var(--text-dark)', borderTop: '1px solid rgba(0,0,0,0.05)'}}
              >
                We have never invoiced and disappeared. Every project, every time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      {/* ── Newsletter Capture ── */}
      <NewsletterSection />

      <section className="py-24 sm:py-32" style={{background: 'var(--rust)', color: '#fff', textAlign: 'center'}}>
        <div className="max-w-4xl mx-auto px-5 sm:px-8">
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6"
            style={{fontFamily: 'var(--font-display)'}}
          >
            Ready to Build Something?
          </h2>
          <p
            className="text-base sm:text-lg leading-relaxed mb-4 max-w-2xl mx-auto"
            style={{fontFamily: 'var(--font-body)', color: 'rgba(255,255,255,0.7)'}}
          >
            We respond within 24 hours. Tell us what you need and we&apos;ll tell you exactly how we&apos;d build it.
          </p>
          <p
            className="text-sm leading-relaxed mb-10 max-w-xl mx-auto"
            style={{fontFamily: 'var(--font-body)', color: 'rgba(255,255,255,0.5)'}}
          >
            No intake forms. No retainers up front. Just a direct conversation with engineers.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-md text-sm font-bold transition-opacity hover:opacity-90"
            style={{
              background: '#fff',
              color: 'var(--rust)',
              fontFamily: 'var(--font-body)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
            }}
          >
            Start a Project <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  )
}

import Link from 'next/link'
import type {Metadata} from 'next'
import {defaultSpecs, iterationStrategies, sdlcPhases} from '@/lib/search/sources'

export const metadata: Metadata = {
  title: 'Engineering Methodology',
  description:
    'How Global Nexus engineers software — default specifications, iteration strategies, and the software development lifecycle behind every engagement.',
}

export default function EngineeringPage() {
  return (
    <main>
      {/* ═══ HERO ═══ */}
      <section
        className="relative pt-28 pb-20 sm:pt-36 sm:pb-28 overflow-hidden"
        style={{background: 'linear-gradient(135deg, #1e3a5f 0%, #254b78 50%, #1e3a5f 100%)'}}
      >
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-15 pointer-events-none" style={{background: 'oklch(0.55 0.15 30)', filter: 'blur(80px)'}} />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full opacity-10 pointer-events-none" style={{background: 'oklch(0.82 0.15 75)', filter: 'blur(80px)'}} />

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8">
          <div className="mb-4">
            <span
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-medium uppercase tracking-[0.2em]"
              style={{border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-body)'}}
            >
              Engineering Methodology
            </span>
          </div>

          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-white max-w-4xl"
            style={{fontFamily: 'var(--font-display)'}}
          >
            How We Engineer{' '}
            <span style={{color: 'oklch(0.82 0.15 75)'}}>Software.</span>
          </h1>

          <p
            className="mt-6 text-base sm:text-lg leading-relaxed max-w-2xl"
            style={{color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-body)'}}
          >
            Documented standards, proven lifecycle strategies, and principled defaults — the craft behind every engagement.
          </p>

          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl">
            <div>
              <div className="text-2xl sm:text-3xl font-bold" style={{color: 'oklch(0.82 0.15 75)', fontFamily: 'var(--font-mono)'}}>10+</div>
              <div className="mt-1 text-[10px] uppercase tracking-wider" style={{color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-body)'}}>Yrs per Engineer</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold" style={{color: 'oklch(0.82 0.15 75)', fontFamily: 'var(--font-mono)'}}>50+</div>
              <div className="mt-1 text-[10px] uppercase tracking-wider" style={{color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-body)'}}>Projects Shipped</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold" style={{color: 'oklch(0.82 0.15 75)', fontFamily: 'var(--font-mono)'}}>6</div>
              <div className="mt-1 text-[10px] uppercase tracking-wider" style={{color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-body)'}}>SDLC Phases</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold" style={{color: 'oklch(0.82 0.15 75)', fontFamily: 'var(--font-mono)'}}>100%</div>
              <div className="mt-1 text-[10px] uppercase tracking-wider" style={{color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-body)'}}>Senior Engineers</div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ DEFAULT SPECIFICATIONS ═══ */}
      <section className="py-20 sm:py-28" style={{background: 'var(--warm-bg)'}}>
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase" style={{color: 'var(--rust)', fontFamily: 'var(--font-body)'}}>
            Default Specifications
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight max-w-3xl" style={{color: 'var(--text-dark)', fontFamily: 'var(--font-display)'}}>
            What we define before any code is written.
          </h2>
          <p className="mt-6 text-base sm:text-lg leading-relaxed max-w-3xl" style={{color: 'var(--text-mid)', fontFamily: 'var(--font-body)'}}>
            Skipping these doesn&apos;t save time — it just defers the cost. Every Global Nexus engagement starts with the same documented baseline, regardless of project size.
          </p>

          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {defaultSpecs.map((spec, i) => (
              <div
                key={spec.title}
                className="rounded-xl p-6"
                style={{background: '#ffffff', border: '1px solid rgba(30,58,95,0.08)', boxShadow: '0 2px 16px rgba(30,58,95,0.06)'}}
              >
                <div className="text-xs font-bold mb-3" style={{color: 'var(--rust)', fontFamily: 'var(--font-mono)'}}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 className="text-lg font-bold mb-3" style={{color: 'var(--text-dark)', fontFamily: 'var(--font-display)'}}>
                  {spec.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{color: 'var(--text-mid)', fontFamily: 'var(--font-body)'}}>
                  {spec.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ ITERATION STRATEGIES ═══ */}
      <section className="py-20 sm:py-28" style={{background: 'var(--dark)'}}>
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase" style={{color: 'oklch(0.82 0.15 75)', fontFamily: 'var(--font-body)'}}>
            Iteration Strategy
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight max-w-3xl" style={{fontFamily: 'var(--font-display)'}}>
            Agile, Waterfall, or Hybrid — chosen to fit the constraint.
          </h2>
          <p className="mt-6 text-base sm:text-lg leading-relaxed max-w-3xl" style={{color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-body)'}}>
            We don&apos;t pick methodology dogmatically. The right cadence depends on regulatory exposure, scope volatility, and stakeholder appetite for change.
          </p>

          <div className="mt-12 grid md:grid-cols-3 gap-5">
            {iterationStrategies.map((s) => (
              <div
                key={s.strategy}
                className="rounded-xl p-6"
                style={{background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)'}}
              >
                <h3 className="text-xl font-bold text-white mb-2" style={{fontFamily: 'var(--font-display)'}}>
                  {s.strategy}
                </h3>
                <p className="text-xs uppercase tracking-[0.15em] mb-4" style={{color: 'oklch(0.82 0.15 75)', fontFamily: 'var(--font-mono)'}}>
                  {s.when}
                </p>
                <p className="text-sm leading-relaxed" style={{color: 'rgba(255,255,255,0.7)', fontFamily: 'var(--font-body)'}}>
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SDLC ═══ */}
      <section className="py-20 sm:py-28" style={{background: 'var(--warm-bg)'}}>
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase" style={{color: 'var(--rust)', fontFamily: 'var(--font-body)'}}>
            Software Development Lifecycle
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight max-w-3xl" style={{color: 'var(--text-dark)', fontFamily: 'var(--font-display)'}}>
            Six phases. Documented artifacts. Clear exit criteria.
          </h2>
          <p className="mt-6 text-base sm:text-lg leading-relaxed max-w-3xl" style={{color: 'var(--text-mid)', fontFamily: 'var(--font-body)'}}>
            Every engagement moves through the same six phases. What changes is the depth and duration at each stage — never the discipline.
          </p>

          <div className="mt-12 space-y-4">
            {sdlcPhases.map((phase) => (
              <div
                key={phase.num}
                className="rounded-xl p-6 sm:p-8 flex flex-col sm:flex-row gap-6"
                style={{background: '#ffffff', border: '1px solid rgba(30,58,95,0.08)', boxShadow: '0 2px 16px rgba(30,58,95,0.06)'}}
              >
                <div className="shrink-0">
                  <div className="text-3xl sm:text-4xl font-bold" style={{color: 'var(--rust)', fontFamily: 'var(--font-mono)'}}>
                    {phase.num}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2" style={{color: 'var(--text-dark)', fontFamily: 'var(--font-display)'}}>
                    {phase.title}
                  </h3>
                  <p className="text-xs uppercase tracking-[0.15em] mb-3" style={{color: 'var(--rust)', fontFamily: 'var(--font-mono)'}}>
                    {phase.artifacts}
                  </p>
                  <p className="text-sm sm:text-base leading-relaxed" style={{color: 'var(--text-mid)', fontFamily: 'var(--font-body)'}}>
                    {phase.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="py-20 sm:py-28" style={{background: 'var(--rust)'}}>
        <div className="max-w-3xl mx-auto px-5 sm:px-8 text-center">
          <h2
            className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight"
            style={{fontFamily: 'var(--font-display)'}}
          >
            See the stack we default to.
          </h2>
          <p
            className="text-base sm:text-lg leading-relaxed mb-10 text-white/90 max-w-xl mx-auto"
            style={{fontFamily: 'var(--font-body)'}}
          >
            Every methodology runs on a stack. See the technology choices we default to for web, AI, blockchain, mobile, and enterprise work.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/stack"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-md text-sm font-bold transition-all hover:opacity-90"
              style={{background: '#ffffff', color: 'var(--rust)', fontFamily: 'var(--font-body)'}}
            >
              View Our Stack
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-md text-sm font-bold transition-all hover:bg-white/10"
              style={{border: '1px solid rgba(255,255,255,0.4)', color: '#ffffff', fontFamily: 'var(--font-body)'}}
            >
              Start a Project
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

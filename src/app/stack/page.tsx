import Link from 'next/link'
import type {Metadata} from 'next'
import {stackEntries} from '@/lib/search/sources'
import type {StackEntry} from '@/lib/search/types'

export const metadata: Metadata = {
  title: 'Our Default Technology Stack',
  description:
    'Global Nexus default technology choices by project type — React, Angular, Vue.js, Node.js, Django, FastAPI, Flask, .NET Core, ASP.NET, C#, Azure, PostgreSQL, and more. With the reasoning behind every choice.',
}

const stacks: StackEntry[] = stackEntries

export default function StackPage() {
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
              Default Technology Stack
            </span>
          </div>

          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-white max-w-4xl"
            style={{fontFamily: 'var(--font-display)'}}
          >
            Our Default{' '}
            <span style={{color: 'oklch(0.82 0.15 75)'}}>Technology Choices.</span>
          </h1>

          <p
            className="mt-6 text-base sm:text-lg leading-relaxed max-w-3xl"
            style={{color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-body)'}}
          >
            We don&apos;t pick tools arbitrarily. Every default has a reason — performance benchmarks, developer velocity, codebase maintainability, or ecosystem maturity.
          </p>
        </div>
      </section>

      {/* ═══ STACK CARDS ═══ */}
      <section className="py-20 sm:py-28" style={{background: 'var(--warm-bg)'}}>
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="grid lg:grid-cols-2 gap-6">
            {stacks.map((entry, i) => {
              const slug = entry.label.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
              return (
              <div
                key={entry.label}
                id={slug}
                className="rounded-xl p-7 sm:p-8 flex flex-col scroll-mt-24"
                style={{background: '#ffffff', border: '1px solid rgba(30,58,95,0.08)', boxShadow: '0 2px 16px rgba(30,58,95,0.06)'}}
              >
                <div className="flex items-start justify-between mb-3 gap-3">
                  <p className="text-xs uppercase tracking-[0.2em] font-semibold" style={{color: 'var(--rust)', fontFamily: 'var(--font-mono)'}}>
                    {entry.category}
                  </p>
                  <a
                    href={`#${slug}`}
                    className="text-xs font-mono hover:opacity-70"
                    style={{color: 'var(--text-mid)'}}
                    aria-label={`Link to ${entry.label}`}
                    title={`Copy link to ${entry.label}`}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </a>
                </div>

                <h3 className="text-2xl font-bold mb-5" style={{color: 'var(--text-dark)', fontFamily: 'var(--font-display)'}}>
                  {entry.label}
                </h3>

                <div className="flex flex-wrap gap-2 mb-5">
                  {entry.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-full text-xs font-semibold"
                      style={{
                        background: 'rgba(30,58,95,0.08)',
                        color: 'var(--dark)',
                        fontFamily: 'var(--font-mono)',
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <p className="text-sm leading-relaxed flex-1" style={{color: 'var(--text-mid)', fontFamily: 'var(--font-body)'}}>
                  {entry.reasoning}
                </p>

                <div
                  className="mt-5 pt-5 text-sm font-medium"
                  style={{
                    borderTop: '1px solid rgba(30,58,95,0.08)',
                    color: 'var(--rust)',
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  ▸ {entry.callout}
                </div>
              </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══ WHEN WE DEVIATE ═══ */}
      <section className="py-20 sm:py-28" style={{background: 'var(--dark)'}}>
        <div className="max-w-4xl mx-auto px-5 sm:px-8">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase" style={{color: 'oklch(0.82 0.15 75)', fontFamily: 'var(--font-body)'}}>
            Defaults, Not Dogma
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight" style={{fontFamily: 'var(--font-display)'}}>
            When we deviate from defaults.
          </h2>
          <div className="mt-8 space-y-5 text-base leading-relaxed" style={{color: 'rgba(255,255,255,0.7)', fontFamily: 'var(--font-body)'}}>
            <p>
              These defaults represent our highest-velocity, lowest-risk paths to production. But every engagement gets a thoughtful review — we don&apos;t reach for React if the client has a deep Vue investment, and we don&apos;t propose Postgres if the workload is genuinely document-oriented.
            </p>
            <p>
              We choose tools based on three weighted factors: <span className="text-white font-semibold">existing team expertise</span> (does the client&apos;s team need to maintain this?), <span className="text-white font-semibold">workload characteristics</span> (what does the data and traffic actually look like?), and <span className="text-white font-semibold">ecosystem maturity</span> (will this still be supported in five years?).
            </p>
            <p>
              The defaults exist so we don&apos;t debate the basics on every project. The judgment exists so we don&apos;t apply them blindly.
            </p>
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
            Have a stack question?
          </h2>
          <p
            className="text-base sm:text-lg leading-relaxed mb-10 text-white/90 max-w-xl mx-auto"
            style={{fontFamily: 'var(--font-body)'}}
          >
            Tell us your constraints — team, budget, timeline, existing systems — and we&apos;ll recommend the stack that fits, not the one we sell.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-md text-sm font-bold transition-all hover:opacity-90"
            style={{background: '#ffffff', color: 'var(--rust)', fontFamily: 'var(--font-body)'}}
          >
            Start the Conversation
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
        </div>
      </section>
    </main>
  )
}

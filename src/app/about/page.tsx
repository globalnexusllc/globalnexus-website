import Link from 'next/link'
import type {Metadata} from 'next'

export const metadata: Metadata = {
  title: 'About | Global Nexus',
  description:
    'Global Nexus is a full-stack software development and digital advisory firm based in Colbert, GA. We build high-performance web apps, AI-powered platforms, and scalable digital products.',
}

const values = [
  'We write clean code by default — not because someone will audit it, but because the next engineer (or our future selves) will thank us.',
  'Clarity over cleverness. A readable solution ships faster, scales better, and costs less to maintain.',
  'We communicate early when something is unclear. Assumptions are the fastest way to waste a sprint.',
  'Every project is an opportunity to raise the bar — for our clients, for our craft, and for the developers we\'re becoming.',
  'We build with the end user in mind, always. Beautiful code that creates a frustrating experience is a failure.',
  'Long-term thinking. We architect for where your product is going, not just where it is today.',
]

const stats = [
  {value: '50+', label: 'Projects Delivered'},
  {value: '100%', label: 'Client Satisfaction'},
  {value: 'Colbert, GA', label: 'Headquarters'},
]

const expertise = [
  'React & Next.js Frontend Development',
  'Node.js, Django & FastAPI Backends',
  'AI Integration (LangChain, Pinecone, LlamaIndex)',
  'PostgreSQL, MongoDB & Redis',
  'AWS, Vercel & Digital Ocean Infrastructure',
  'Figma Design Systems & UI/UX',
  'TypeScript & Python',
  'Storybook Component Libraries',
]


export default function AboutPage() {
  return (
    <>
      {/* ═══ HERO ═══ */}
      <section
        className="relative pt-28 pb-20 sm:pt-36 sm:pb-28 overflow-hidden"
        style={{background: 'linear-gradient(135deg, oklch(0.12 0.01 250) 0%, oklch(0.16 0.02 260) 50%, oklch(0.12 0.01 250) 100%)'}}
      >
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-15 pointer-events-none" style={{background: 'oklch(0.55 0.15 30)', filter: 'blur(80px)'}} />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full opacity-10 pointer-events-none" style={{background: 'oklch(0.82 0.15 75)', filter: 'blur(80px)'}} />

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8">
          <div className="mb-4">
            <span
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-medium uppercase tracking-[0.2em]"
              style={{border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-body)'}}
            >
              About Global Nexus
            </span>
          </div>

          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-white max-w-4xl"
            style={{fontFamily: 'var(--font-display)'}}
          >
            Built to Ship.{' '}
            <span style={{color: 'oklch(0.82 0.15 75)'}}>Engineered to Scale.</span>
          </h1>

          <p
            className="mt-6 text-base sm:text-lg leading-relaxed max-w-2xl"
            style={{color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-body)'}}
          >
            Global Nexus is a full-stack software development and digital advisory firm based in Colbert, Georgia. We partner with startups, scale-ups, and enterprise clients to design, build, and ship high-performance digital products.
          </p>

          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="text-2xl sm:text-3xl font-bold" style={{color: 'oklch(0.82 0.15 75)', fontFamily: 'var(--font-mono)'}}>{s.value}</div>
                <div className="mt-1 text-[10px] uppercase tracking-wider" style={{color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-body)'}}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ COMPANY STORY ═══ */}
      <section className="relative section-warm overflow-hidden py-20 sm:py-28">
        <div className="absolute -bottom-32 -right-32 w-[300px] h-[300px] rounded-full opacity-20 pointer-events-none" style={{background: 'oklch(0.55 0.15 30)', filter: 'blur(80px)'}} />
        <div className="absolute top-10 -left-20 w-[180px] h-[180px] rounded-full opacity-15 pointer-events-none" style={{background: 'oklch(0.82 0.15 75)', filter: 'blur(80px)'}} />

        <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-8">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase" style={{color: 'oklch(0.55 0.15 30)', fontFamily: 'var(--font-body)'}}>
            Our Story
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight" style={{fontFamily: 'var(--font-display)'}}>
            We Don&apos;t Just Write Code. We Solve Problems.
          </h2>
          <div className="mt-8 space-y-5 text-base leading-relaxed" style={{color: 'oklch(0.4 0.02 50)', fontFamily: 'var(--font-body)'}}>
            <p>
              Global Nexus was built on a straightforward conviction: too many software projects fail not because of bad engineers, but because of poor architecture decisions, misaligned scope, and teams that disappear after deployment.
            </p>
            <p>
              We built Global Nexus to be the firm we always wished existed — one that takes full ownership from first commit to production launch, communicates like a partner rather than a vendor, and treats every engagement as a long-term relationship worth protecting.
            </p>
            <p>
              Based in Colbert, Georgia, we work with clients across the US and globally — from health-tech platforms at Columbia University to AI-powered travel apps, creator economy marketplaces, and enterprise B2B SaaS products. Our stack evolves with the industry; our standards don&apos;t.
            </p>
            <p>
              We don&apos;t staff junior developers onto client work and call it a team. Every engagement is driven by senior engineers who own the outcome, not just the sprint.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ WHAT WE DO ═══ */}
      <section className="py-20 sm:py-28" style={{background: '#0d1117'}}>
        <div className="max-w-4xl mx-auto px-5 sm:px-8">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase" style={{color: 'oklch(0.82 0.15 75)', fontFamily: 'var(--font-body)'}}>
            What We Do
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight" style={{fontFamily: 'var(--font-display)'}}>
            Full Stack, End to End.
          </h2>
          <p className="mt-6 text-base sm:text-lg leading-relaxed max-w-3xl" style={{color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-body)'}}>
            We don&apos;t specialize in one layer. We own the entire product — from Figma designs and React interfaces to Django APIs, AI integrations, database architecture, and cloud infrastructure.
          </p>
          <div className="mt-10 grid sm:grid-cols-2 gap-4">
            {expertise.map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-lg px-4 py-3 border" style={{background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.08)'}}>
                <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{background: 'oklch(0.82 0.15 75)'}} />
                <span className="text-sm" style={{color: 'rgba(255,255,255,0.7)', fontFamily: 'var(--font-body)'}}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ VALUES ═══ */}
      <section className="relative section-warm overflow-hidden py-20 sm:py-28">
        <div className="absolute -bottom-32 -right-32 w-[300px] h-[300px] rounded-full opacity-20 pointer-events-none" style={{background: 'oklch(0.55 0.15 30)', filter: 'blur(80px)'}} />
        <div className="absolute top-10 -left-20 w-[180px] h-[180px] rounded-full opacity-15 pointer-events-none" style={{background: 'oklch(0.82 0.15 75)', filter: 'blur(80px)'}} />

        <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4" style={{fontFamily: 'var(--font-display)'}}>
            How We <span style={{color: 'oklch(0.55 0.15 30)'}}>Work</span>
          </h2>
          <p className="text-base mb-10 max-w-2xl" style={{color: 'oklch(0.45 0.02 50)', fontFamily: 'var(--font-body)'}}>
            The principles that guide every line of code we write and every project we take on.
          </p>
          <div className="grid sm:grid-cols-2 gap-5">
            {values.map((v, i) => (
              <div key={i} className="bg-white rounded-lg p-6 border border-black/5 shadow-sm">
                <p className="text-sm leading-relaxed" style={{color: 'oklch(0.4 0.02 50)', fontFamily: 'var(--font-body)'}}>{v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="py-16 sm:py-20" style={{background: 'oklch(0.55 0.15 30)'}}>
        <div className="max-w-4xl mx-auto px-5 sm:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4" style={{fontFamily: 'var(--font-display)'}}>
            Let&apos;s Build Something Together
          </h2>
          <p className="text-white/80 text-base sm:text-lg leading-relaxed mb-8 max-w-2xl mx-auto" style={{fontFamily: 'var(--font-body)'}}>
            Got a product idea, a platform to scale, or a codebase that needs rescuing? We&apos;re ready to talk.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-md text-sm font-semibold bg-white transition-all hover:bg-white/90 shadow-lg"
            style={{color: 'oklch(0.35 0.1 30)', fontFamily: 'var(--font-body)'}}
          >
            Start a Conversation
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
        </div>
      </section>
    </>
  )
}

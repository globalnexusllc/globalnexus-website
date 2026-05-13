import Link from 'next/link'
import type {Metadata} from 'next'

export const metadata: Metadata = {
  title: 'Team',
  description:
    'Meet the senior engineers behind Global Nexus. Every team member brings 10+ years of hands-on software engineering experience.',
}

interface TeamMember {
  name: string
  title: string
  bio: string
  photo?: string
  linkedin?: string
  github?: string
}

const team: TeamMember[] = [
  {
    name: 'David Zhen',
    title: 'Co-Founder & Lead Engineer',
    bio: 'Co-founder and technical lead with 10+ years of hands-on engineering across web, mobile, and DeFi. Specializes in high-level architecture and cloud infrastructure — the decisions that determine whether a product scales gracefully or buckles at 10× load. David has taken products from zero to production across early-stage startups, and brings founder-level product judgment to every engagement, not just technical execution.',
    photo: '/team/david-zhen.png',
  },
  {
    name: 'Milan Kojadinovic',
    title: 'Senior Software Engineer · AI/ML',
    bio: 'Python ecosystem specialist with 10+ years building AI/ML platforms end-to-end. Architects inference services, retrieval pipelines, and LLM-driven backends in FastAPI, LangChain, LlamaIndex, and PyTorch. Milan\'s strength is the bridge between research-stage ML work and production-grade systems — the gap where most AI projects quietly die. Equally comfortable tuning a vector index as he is shipping the API that consumes it.',
    photo: '/team/milan-kojadinovic.png',
  },
  {
    name: 'Cole Dahl',
    title: 'HR Manager & Senior Software Engineer',
    bio: 'Senior engineer with 10+ years across Web3, DeFi, and traditional full-stack web. Has shipped Solidity smart contracts, NFT marketplaces, and B2B SaaS platforms — sometimes in the same quarter. Cole also leads people operations at Global Nexus: hiring, mentoring, and protecting the senior-engineers-only culture. He believes the best hires come from working alongside engineers on real problems, not from interview theater. Startup veteran with a strong eye for what gets a product to market.',
    photo: '/team/cole-dahl.png',
  },
  {
    name: 'Brian Howell',
    title: 'Senior Software Engineer · Game Engineering',
    bio: 'Game engineering specialist with 10+ years shipping titles on Unity and Unreal Engine. Brings real-time rendering, physics, and tight gameplay-loop thinking to non-game products — visualizations, simulators, training platforms, and any UI that has to feel alive at 60fps. Brian also leads technical recruiting from the game industry, bringing in engineers whose performance-tuning instincts translate directly to demanding production workloads.',
    photo: '/team/brian-howell.png',
  },
  {
    name: 'Daniel Baez',
    title: 'Senior Software Engineer · AWS & DevOps',
    bio: 'Full-stack web engineer and AWS infrastructure expert with 10+ years across application code and the platforms that run it. Daniel owns the boundary where software meets cloud: VPC topology, IAM policies, CI/CD pipelines, observability, and cost controls — the unglamorous work that keeps production reliable at 3am. Equally fluent shipping React/Node applications and writing the Terraform and AWS CDK that deploy them. The engineer you want when the bottleneck isn\'t the code, it\'s everything around it.',
    photo: '/team/daniel-baez.png',
  },
]

function initials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

export default function TeamPage() {
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
              The Team
            </span>
          </div>

          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-white max-w-4xl"
            style={{fontFamily: 'var(--font-display)'}}
          >
            Meet the{' '}
            <span style={{color: 'oklch(0.82 0.15 75)'}}>Engineers.</span>
          </h1>

          <p
            className="mt-6 text-base sm:text-lg leading-relaxed max-w-2xl"
            style={{color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-body)'}}
          >
            Every engineer at Global Nexus brings 10+ years of hands-on software engineering experience. No juniors staffed onto client work, no offshore handoffs — just senior practitioners who own outcomes.
          </p>
        </div>
      </section>

      {/* ═══ TEAM GRID ═══ */}
      <section className="py-20 sm:py-28" style={{background: 'var(--warm-bg)'}}>
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="grid sm:grid-cols-2 gap-6">
            {team.map((member) => (
              <div
                key={member.name}
                className="rounded-xl p-7 flex gap-5 items-start"
                style={{background: '#ffffff', border: '1px solid rgba(30,58,95,0.08)', boxShadow: '0 2px 16px rgba(30,58,95,0.06)'}}
              >
                {/* Avatar */}
                {member.photo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover shrink-0"
                    style={{border: '2px solid rgba(30,58,95,0.1)'}}
                  />
                ) : (
                  <div
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-full shrink-0 flex items-center justify-center text-2xl font-bold text-white"
                    style={{
                      background: 'linear-gradient(135deg, #1e3a5f 0%, #254b78 100%)',
                      fontFamily: 'var(--font-display)',
                    }}
                    aria-label={`${member.name} avatar placeholder`}
                  >
                    {initials(member.name)}
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold mb-1" style={{color: 'var(--text-dark)', fontFamily: 'var(--font-display)'}}>
                    {member.name}
                  </h3>
                  <p className="text-xs uppercase tracking-[0.15em] mb-3" style={{color: 'var(--rust)', fontFamily: 'var(--font-mono)'}}>
                    {member.title}
                  </p>
                  <p className="text-sm leading-relaxed mb-3" style={{color: 'var(--text-mid)', fontFamily: 'var(--font-body)'}}>
                    {member.bio}
                  </p>
                  {(member.linkedin || member.github) && (
                    <div className="flex gap-3 text-xs">
                      {member.linkedin && (
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium hover:underline"
                          style={{color: 'var(--dark)', fontFamily: 'var(--font-body)'}}
                        >
                          LinkedIn →
                        </a>
                      )}
                      {member.github && (
                        <a
                          href={member.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium hover:underline"
                          style={{color: 'var(--dark)', fontFamily: 'var(--font-body)'}}
                        >
                          GitHub →
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Hiring note */}
          <div
            className="mt-12 rounded-xl p-7 sm:p-8 text-center"
            style={{background: '#ffffff', border: '1px dashed rgba(30,58,95,0.2)'}}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-3" style={{color: 'var(--rust)', fontFamily: 'var(--font-mono)'}}>
              Hiring
            </p>
            <h3 className="text-2xl font-bold mb-3" style={{color: 'var(--text-dark)', fontFamily: 'var(--font-display)'}}>
              Senior engineers only.
            </h3>
            <p className="text-sm leading-relaxed max-w-xl mx-auto" style={{color: 'var(--text-mid)', fontFamily: 'var(--font-body)'}}>
              We only hire engineers with 10+ years of production experience. If that&apos;s you and the work resonates, get in touch.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 mt-5 px-6 py-3 rounded-md text-sm font-bold transition-all hover:opacity-90"
              style={{background: 'var(--dark)', color: '#ffffff', fontFamily: 'var(--font-body)'}}
            >
              Reach Out
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

import Link from 'next/link'
import type {Metadata} from 'next'
import {teamMembers} from '@/lib/search/sources'
import type {TeamMember} from '@/lib/search/types'
import ReadMore, {ReadMoreGroup} from '@/components/shared/ReadMore'

export const metadata: Metadata = {
  title: 'Team',
  description:
    'Meet the senior engineers behind Global Nexus. Every team member brings 10+ years of hands-on software engineering experience.',
}

const team: TeamMember[] = teamMembers

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
          <ReadMoreGroup>
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
                  <div className="text-sm leading-relaxed mb-3" style={{color: 'var(--text-mid)', fontFamily: 'var(--font-body)'}}>
                    <ReadMore id={`team-${member.name}`} lines={4}>{member.bio}</ReadMore>
                  </div>
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
          </ReadMoreGroup>

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

'use client'

import {useState} from 'react'
import Link from 'next/link'
import {portfolioProjects, portfolioCategories} from '@/lib/search/sources'
import type {PortfolioProject as Project} from '@/lib/search/types'
import ReadMore, {ReadMoreGroup} from '@/components/shared/ReadMore'

const projects: Project[] = portfolioProjects

const categories = portfolioCategories

function ProjectCard({project}: {project: Project}) {
  const [flipped, setFlipped] = useState(false)

  return (
    <div className="flex flex-col rounded-2xl overflow-hidden border border-black/5 shadow-sm bg-white">
      {/* Screenshot / fallback gradient */}
      <div className="relative h-52 overflow-hidden">
        {project.screenshot ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.screenshot}
              alt={`${project.name} website screenshot`}
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0" style={{background: 'linear-gradient(to bottom, transparent 55%, rgba(0,0,0,0.55) 100%)'}} />
          </>
        ) : (
          <>
            <div className="absolute inset-0" style={{background: project.gradient}} />
            <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)', backgroundSize: '40px 40px'}} />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-5xl font-bold text-white/20 mb-2 select-none" style={{fontFamily: 'var(--font-display)', letterSpacing: '-0.05em'}}>{project.iconLetter}</div>
                <div className="text-white font-bold text-2xl" style={{fontFamily: 'var(--font-display)'}}>{project.name}</div>
                <div className="text-white/60 text-xs mt-1" style={{fontFamily: 'var(--font-mono)'}}>{project.url.replace('https://', '')}</div>
              </div>
            </div>
          </>
        )}
        <div className="absolute top-3 right-3">
          <span
            className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full"
            style={{background: 'rgba(0,0,0,0.45)', color: 'white', fontFamily: 'var(--font-body)', backdropFilter: 'blur(4px)'}}
          >
            {project.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <h3 className="text-xl font-bold" style={{fontFamily: 'var(--font-display)'}}>{project.name}</h3>
            <p className="text-xs font-semibold mt-0.5 uppercase tracking-wide" style={{color: project.accentColor, fontFamily: 'var(--font-body)'}}>{project.role}</p>
          </div>
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
            style={{background: `${project.accentColor}15`, color: project.accentColor}}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
          </a>
        </div>

        <div className="text-sm leading-relaxed mb-4 flex-1" style={{color: 'oklch(0.45 0.02 50)', fontFamily: 'var(--font-body)'}}>
          <ReadMore id={`portfolio-${project.id}`} lines={4}>{project.description}</ReadMore>
        </div>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tech.map((t) => (
            <span
              key={t}
              className="text-[10px] font-medium px-2 py-0.5 rounded"
              style={{background: `${project.accentColor}12`, color: project.accentColor, fontFamily: 'var(--font-mono)'}}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Toggle highlights / testimonial */}
        <div className="border-t border-black/5 pt-4">
          <div className="flex gap-2 mb-3">
            <button
              onClick={() => setFlipped(false)}
              className="text-xs font-semibold px-3 py-1 rounded-md transition-all"
              style={{
                background: !flipped ? project.accentColor : 'transparent',
                color: !flipped ? 'white' : 'oklch(0.5 0.02 50)',
                fontFamily: 'var(--font-body)',
              }}
            >
              Highlights
            </button>
            <button
              onClick={() => setFlipped(true)}
              className="text-xs font-semibold px-3 py-1 rounded-md transition-all"
              style={{
                background: flipped ? project.accentColor : 'transparent',
                color: flipped ? 'white' : 'oklch(0.5 0.02 50)',
                fontFamily: 'var(--font-body)',
              }}
            >
              Client Feedback
            </button>
          </div>

          {!flipped ? (
            <ul className="space-y-1.5">
              {project.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-2 text-xs leading-relaxed" style={{color: 'oklch(0.4 0.02 50)', fontFamily: 'var(--font-body)'}}>
                  <div className="w-1 h-1 rounded-full shrink-0 mt-1.5" style={{background: project.accentColor}} />
                  {h}
                </li>
              ))}
            </ul>
          ) : (
            <div className="rounded-lg p-4" style={{background: `${project.accentColor}08`, border: `1px solid ${project.accentColor}20`}}>
              <p className="text-xs leading-relaxed italic mb-3" style={{color: 'oklch(0.4 0.02 50)', fontFamily: 'var(--font-body)'}}>
                &ldquo;{project.testimonial.quote}&rdquo;
              </p>
              <p className="text-xs font-bold" style={{color: 'oklch(0.25 0.02 50)', fontFamily: 'var(--font-display)'}}>{project.testimonial.name}</p>
              <p className="text-[10px] mt-0.5" style={{color: project.accentColor, fontFamily: 'var(--font-body)'}}>{project.testimonial.title}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function PortfolioClient() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category === activeCategory)

  return (
    <>
      {/* ═══ HERO ═══ */}
      <section
        className="relative pt-28 pb-16 sm:pt-36 sm:pb-20 overflow-hidden"
        style={{background: 'linear-gradient(135deg, #1e3a5f 0%, #254b78 50%, #1e3a5f 100%)'}}
      >
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full opacity-15 pointer-events-none" style={{background: 'oklch(0.55 0.15 30)', filter: 'blur(80px)'}} />
        <div className="absolute bottom-0 left-0 w-[250px] h-[250px] rounded-full opacity-10 pointer-events-none" style={{background: 'oklch(0.82 0.15 75)', filter: 'blur(80px)'}} />

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8">
          <span
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-medium uppercase tracking-[0.2em] mb-6"
            style={{border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-body)'}}
          >
            Portfolio
          </span>
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-white max-w-3xl"
            style={{fontFamily: 'var(--font-display)'}}
          >
            Platforms We&apos;ve{' '}
            <span style={{color: 'oklch(0.82 0.15 75)'}}>Built & Shipped</span>
          </h1>
          <p
            className="mt-6 text-base sm:text-lg leading-relaxed max-w-xl"
            style={{color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-body)'}}
          >
            50+ projects delivered across AI, health tech, creator economy, gaming, and B2B SaaS. 7 featured case studies below — real code, real clients, real results.
          </p>

          <div className="mt-8 grid grid-cols-3 sm:grid-cols-3 gap-6 max-w-md">
            {[
              {value: '50+', label: 'Projects Delivered'},
              {value: '100%', label: 'Client Satisfaction'},
              {value: 'Colbert', label: 'Georgia'},
            ].map((s) => (
              <div key={s.label}>
                <div className="text-2xl sm:text-3xl font-bold" style={{color: 'oklch(0.82 0.15 75)', fontFamily: 'var(--font-mono)'}}>{s.value}</div>
                <div className="mt-1 text-[10px] uppercase tracking-wider" style={{color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-body)'}}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FILTER + GRID ═══ */}
      <section className="section-light py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">

          {/* Category filter */}
          <div className="flex flex-wrap gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="text-xs font-semibold px-4 py-2 rounded-full transition-all"
                style={{
                  background: activeCategory === cat ? 'oklch(0.55 0.15 30)' : 'rgba(0,0,0,0.05)',
                  color: activeCategory === cat ? 'white' : 'oklch(0.45 0.02 50)',
                  fontFamily: 'var(--font-body)',
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Project grid */}
          <ReadMoreGroup>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </ReadMoreGroup>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="py-20 sm:py-28" style={{background: 'var(--rust)'}}>
        <div className="max-w-3xl mx-auto px-5 sm:px-8 text-center">
          <h2
            className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight"
            style={{fontFamily: 'var(--font-display)'}}
          >
            Want to be next?
          </h2>
          <p
            className="text-base sm:text-lg leading-relaxed mb-3 text-white/90 max-w-xl mx-auto"
            style={{fontFamily: 'var(--font-body)'}}
          >
            Tell us what you&apos;re building and we&apos;ll tell you exactly how we&apos;d approach it.
          </p>
          <p
            className="text-sm mb-10 max-w-lg mx-auto"
            style={{color: 'rgba(255,255,255,0.6)', fontFamily: 'var(--font-body)'}}
          >
            No intake forms. No retainers up front. Just a direct conversation with engineers.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-md text-sm font-bold transition-all hover:opacity-90"
            style={{background: '#ffffff', color: 'var(--rust)', fontFamily: 'var(--font-body)'}}
          >
            Start a Project
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
        </div>
      </section>
    </>
  )
}

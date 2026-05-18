import Link from 'next/link'
import type {Metadata} from 'next'
import {groq} from 'next-sanity'
import {client} from '@/lib/sanity/client'
import {searchStatic} from '@/lib/search/engine'
import type {SearchableItem, SearchKind} from '@/lib/search/types'

export const metadata: Metadata = {
  title: 'Search',
  description: 'Search across Global Nexus — pages, portfolio, team, stack, engineering methodology, and blog.',
}

const KIND_LABEL: Record<SearchKind, string> = {
  page: 'Pages',
  portfolio: 'Portfolio',
  team: 'Team',
  stack: 'Stack',
  engineering: 'Engineering',
  blog: 'Blog',
}

const KIND_ORDER: SearchKind[] = ['page', 'portfolio', 'team', 'stack', 'engineering', 'blog']

const blogSearchQuery = groq`
  *[
    _type == "post"
    && !(lower(title) match "*ramprate*")
    && !("ramprate" in categories[]->slug.current)
    && (title match $pattern || excerpt match $pattern || pt::text(body) match $pattern)
  ] | order(publishedAt desc) [0...20]{
    _id,
    title,
    "slug": slug.current,
    "section": coalesce(section, "blog"),
    excerpt
  }
`

async function fetchBlogResults(q: string): Promise<SearchableItem[]> {
  if (q.length < 2) return []
  try {
    const hits = await client.fetch(blogSearchQuery, {pattern: `*${q}*`})
    return hits.map((h: {_id: string; title: string; slug: string; section: string; excerpt?: string}) => ({
      id: `blog:${h._id}`,
      kind: 'blog' as const,
      title: h.title,
      description: h.excerpt || '',
      path: h.section === 'thinking' ? `/thinking/${h.slug}` : `/blog/${h.slug}`,
      keywords: '',
    }))
  } catch {
    return []
  }
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{q?: string; kind?: string}>
}) {
  const params = await searchParams
  const q = (params.q || '').trim()
  const activeKind = (params.kind as SearchKind | 'all' | undefined) || 'all'

  const [staticResults, blogResults] = await Promise.all([
    Promise.resolve(searchStatic(q, 80)),
    fetchBlogResults(q),
  ])

  const all: SearchableItem[] = [...staticResults, ...blogResults]
  const grouped: Record<SearchKind, SearchableItem[]> = {
    page: [], portfolio: [], team: [], stack: [], engineering: [], blog: [],
  }
  for (const item of all) grouped[item.kind].push(item)

  const totalCount = all.length
  const visibleKinds = activeKind === 'all' ? KIND_ORDER : [activeKind as SearchKind]

  return (
    <main>
      {/* Hero */}
      <section
        className="relative pt-28 pb-12 sm:pt-36 sm:pb-16 overflow-hidden"
        style={{background: 'linear-gradient(135deg, #1e3a5f 0%, #254b78 50%, #1e3a5f 100%)'}}
      >
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full opacity-10 pointer-events-none" style={{background: 'oklch(0.82 0.15 75)', filter: 'blur(80px)'}} />
        <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-3" style={{color: 'oklch(0.82 0.15 75)', fontFamily: 'var(--font-body)'}}>
            Search Results
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight" style={{fontFamily: 'var(--font-display)'}}>
            {q ? <>Results for <span style={{color: 'oklch(0.82 0.15 75)'}}>&ldquo;{q}&rdquo;</span></> : 'Search Global Nexus'}
          </h1>
          {q && (
            <p className="mt-4 text-sm" style={{color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-body)'}}>
              {totalCount} {totalCount === 1 ? 'match' : 'matches'} across pages, portfolio, team, stack, engineering, and blog
            </p>
          )}

          {/* Search form */}
          <form action="/search" method="get" className="mt-8 flex gap-2 max-w-xl">
            <input
              type="text"
              name="q"
              defaultValue={q}
              placeholder="Search…"
              className="flex-1 px-4 py-3 rounded-md text-sm text-white outline-none"
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.15)',
                fontFamily: 'var(--font-body)',
              }}
              autoFocus
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-md text-sm font-bold"
              style={{background: 'oklch(0.82 0.15 75)', color: '#0a0f1a', fontFamily: 'var(--font-body)'}}
            >
              Search
            </button>
          </form>
        </div>
      </section>

      {/* Filters + Results */}
      <section className="py-12 sm:py-16" style={{background: 'var(--warm-bg)'}}>
        <div className="max-w-5xl mx-auto px-5 sm:px-8">
          {!q ? (
            <div className="text-center py-16">
              <p style={{color: 'var(--text-mid)', fontFamily: 'var(--font-body)'}}>
                Try searching for{' '}
                {['react native', 'blockchain', 'David Zhen', 'agile', 'serverless'].map((s, i) => (
                  <span key={s}>
                    {i > 0 && ' · '}
                    <Link
                      href={`/search?q=${encodeURIComponent(s)}`}
                      className="font-semibold hover:underline"
                      style={{color: 'var(--dark)'}}
                    >
                      {s}
                    </Link>
                  </span>
                ))}
              </p>
            </div>
          ) : totalCount === 0 ? (
            <div className="text-center py-16">
              <p className="text-lg mb-4" style={{color: 'var(--text-dark)', fontFamily: 'var(--font-display)'}}>
                No matches for &ldquo;{q}&rdquo;.
              </p>
              <p className="text-sm" style={{color: 'var(--text-mid)', fontFamily: 'var(--font-body)'}}>
                Try a different keyword, or{' '}
                <Link href="/contact" className="font-semibold hover:underline" style={{color: 'var(--dark)'}}>
                  contact us directly
                </Link>
                .
              </p>
            </div>
          ) : (
            <>
              {/* Filter tabs */}
              <div className="flex flex-wrap gap-2 mb-10">
                <Link
                  href={`/search?q=${encodeURIComponent(q)}`}
                  className="px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-[0.12em] transition-all"
                  style={
                    activeKind === 'all'
                      ? {background: 'var(--dark)', color: '#ffffff', fontFamily: 'var(--font-body)'}
                      : {background: '#ffffff', color: 'var(--text-mid)', border: '1px solid rgba(30,58,95,0.15)', fontFamily: 'var(--font-body)'}
                  }
                >
                  All ({totalCount})
                </Link>
                {KIND_ORDER.map((kind) => {
                  const count = grouped[kind].length
                  if (count === 0) return null
                  return (
                    <Link
                      key={kind}
                      href={`/search?q=${encodeURIComponent(q)}&kind=${kind}`}
                      className="px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-[0.12em] transition-all"
                      style={
                        activeKind === kind
                          ? {background: 'var(--dark)', color: '#ffffff', fontFamily: 'var(--font-body)'}
                          : {background: '#ffffff', color: 'var(--text-mid)', border: '1px solid rgba(30,58,95,0.15)', fontFamily: 'var(--font-body)'}
                      }
                    >
                      {KIND_LABEL[kind]} ({count})
                    </Link>
                  )
                })}
              </div>

              {/* Result groups */}
              <div className="space-y-10">
                {visibleKinds.map((kind) => {
                  const items = grouped[kind]
                  if (!items.length) return null
                  return (
                    <div key={kind}>
                      <h2 className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{color: 'var(--rust)', fontFamily: 'var(--font-mono)'}}>
                        {KIND_LABEL[kind]} · {items.length}
                      </h2>
                      <div className="space-y-3">
                        {items.map((item) => (
                          <Link
                            key={item.id}
                            href={item.path}
                            className="block rounded-lg p-5 transition-all hover:translate-y-[-1px]"
                            style={{background: '#ffffff', border: '1px solid rgba(30,58,95,0.08)', boxShadow: '0 1px 8px rgba(30,58,95,0.04)'}}
                          >
                            <h3 className="text-base font-bold mb-1" style={{color: 'var(--text-dark)', fontFamily: 'var(--font-display)'}}>
                              {item.title}
                            </h3>
                            {item.description && (
                              <p className="text-sm leading-relaxed" style={{color: 'var(--text-mid)', fontFamily: 'var(--font-body)'}}>
                                {item.description.length > 240 ? item.description.slice(0, 240) + '…' : item.description}
                              </p>
                            )}
                            <p className="text-[10px] mt-2 font-mono" style={{color: 'var(--text-mid)', opacity: 0.6}}>
                              {item.path}
                            </p>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  )
}

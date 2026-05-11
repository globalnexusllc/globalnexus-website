import {client} from '@/lib/sanity/client'
import {postsQuery, postCountQuery, categoriesQuery} from '@/lib/sanity/queries'
import PostCard from '@/components/blog/PostCard'
import Pagination from '@/components/blog/Pagination'
import Link from 'next/link'
import type {Metadata} from 'next'

export const revalidate = 60
const POSTS_PER_PAGE = 9

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Insights on IT infrastructure, sourcing, cloud optimization, and emerging technology from Global Nexus.',
}

export default async function BlogPage({searchParams}: {searchParams: Promise<{page?: string}>}) {
  const params = await searchParams
  const currentPage = Number(params.page) || 1
  const start = (currentPage - 1) * POSTS_PER_PAGE
  const end = start + POSTS_PER_PAGE

  const [posts, totalCount, categories] = await Promise.all([
    client.fetch(postsQuery, {start, end}),
    client.fetch(postCountQuery),
    client.fetch(categoriesQuery),
  ])

  const totalPages = Math.ceil(totalCount / POSTS_PER_PAGE)

  return (
    <div style={{minHeight: '100vh'}}>
      {/* Hero */}
      <section
        className="relative pt-32 pb-20 overflow-hidden"
        style={{background: 'linear-gradient(135deg, #1e3a5f 0%, #254b78 50%, #1e3a5f 100%)'}}
      >
        <div className="glass-orb glass-orb-amber w-[400px] h-[400px] -top-40 -right-40" />
        <div className="glass-orb glass-orb-blue w-[250px] h-[250px] bottom-0 -left-24" />
        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[oklch(0.82_0.15_75)] mb-4 block" style={{fontFamily: 'var(--font-body)'}}>Insights</span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight" style={{fontFamily: 'var(--font-display)'}}>
            Blog
          </h1>
          <p className="text-white/60 text-lg leading-relaxed max-w-2xl" style={{fontFamily: 'var(--font-body)'}}>
            Practical insights on IT infrastructure, sourcing, cloud, and emerging technology.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12" style={{background: 'var(--warm-bg)'}}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          {/* Category filter */}
          {categories?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-10">
              <Link
                href="/blog"
                className="px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-[0.12em] transition-all"
                style={{
                  background: 'var(--dark)',
                  color: '#ffffff',
                  fontFamily: 'var(--font-body)',
                }}
              >
                All
              </Link>
              {categories.map((cat: {_id: string; title: string; slug: {current: string}}) => (
                <Link
                  key={cat._id}
                  href={`/blog/category/${cat.slug.current}`}
                  className="px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-[0.12em] transition-all border hover:bg-[var(--dark)] hover:text-white hover:border-[var(--dark)]"
                  style={{
                    borderColor: 'rgba(30,58,95,0.2)',
                    color: 'var(--text-mid)',
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  {cat.title}
                </Link>
              ))}
            </div>
          )}

          {posts?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post: Record<string, unknown>) => (
                <PostCard key={post._id as string} post={post} variant="light" />
              ))}
            </div>
          ) : (
            <p style={{color: 'var(--text-mid)', fontFamily: 'var(--font-body)'}}>No posts yet.</p>
          )}

          <Pagination currentPage={currentPage} totalPages={totalPages} basePath="/blog" variant="light" />
        </div>
      </section>
    </div>
  )
}

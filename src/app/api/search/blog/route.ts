import {NextRequest, NextResponse} from 'next/server'
import {groq} from 'next-sanity'
import {client} from '@/lib/sanity/client'
import type {SearchableItem} from '@/lib/search/types'

// Match across title, excerpt, and the rendered plain text of body. Re-uses the
// same legacy-content filter as the regular post queries.
const blogSearchQuery = groq`
  *[
    _type == "post"
    && !(lower(title) match "*ramprate*")
    && !("ramprate" in categories[]->slug.current)
    && (
      title match $pattern
      || excerpt match $pattern
      || pt::text(body) match $pattern
    )
  ] | order(publishedAt desc) [0...$limit]{
    _id,
    title,
    "slug": slug.current,
    "section": coalesce(section, "blog"),
    excerpt,
    publishedAt
  }
`

type BlogHit = {
  _id: string
  title: string
  slug: string
  section: 'blog' | 'thinking'
  excerpt?: string
  publishedAt?: string
}

export async function GET(req: NextRequest) {
  const q = (req.nextUrl.searchParams.get('q') || '').trim()
  const limit = Math.min(parseInt(req.nextUrl.searchParams.get('limit') || '10', 10) || 10, 50)
  if (q.length < 2) return NextResponse.json({results: []})

  // GROQ `match` uses glob patterns — append * for prefix matching, prefix * for substring
  const pattern = `*${q}*`

  try {
    const hits: BlogHit[] = await client.fetch(blogSearchQuery, {pattern, limit})
    const results: SearchableItem[] = hits.map((h) => ({
      id: `blog:${h._id}`,
      kind: 'blog',
      title: h.title,
      description: h.excerpt || '',
      path: h.section === 'thinking' ? `/thinking/${h.slug}` : `/blog/${h.slug}`,
      keywords: '',
    }))
    return NextResponse.json({results})
  } catch (err) {
    console.error('blog search failed', err)
    return NextResponse.json({results: [], error: 'search failed'}, {status: 200})
  }
}

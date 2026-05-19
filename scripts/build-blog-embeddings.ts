/* eslint-disable */
/**
 * Build the blog embeddings store used by RAG (Retrieval-Augmented Generation).
 *
 * Usage:
 *   npm run embeddings:build
 *
 * Requirements (set in .env.local):
 *   - SANITY_PROJECT_ID, SANITY_DATASET (existing — used by the site)
 *   - EMBEDDING_API_KEY (OpenAI key by default) OR
 *   - EMBEDDING_API_URL + EMBEDDING_API_KEY to point at a compatible endpoint
 *   - EMBEDDING_MODEL (default: text-embedding-3-small)
 *
 * Output: src/lib/ai/blog-embeddings.json
 */

import 'dotenv/config'
import {promises as fs} from 'fs'
import path from 'path'
import {createClient} from '@sanity/client'

// Inline the fetch query — script must run independently of Next.js build.
const POSTS_QUERY = `
  *[_type == "post"
    && !(lower(title) match "*ramprate*")
    && !("ramprate" in categories[]->slug.current)
    && defined(slug.current)
    && defined(body)
  ]{
    _id,
    title,
    "slug": slug.current,
    "section": coalesce(section, "blog"),
    "text": pt::text(body)
  }
`

interface PostRow {
  _id: string
  title: string
  slug: string
  section: 'blog' | 'thinking'
  text: string
}

interface EmbeddedChunk {
  postId: string
  title: string
  slug: string
  section: 'blog' | 'thinking'
  chunk: string
  vector: number[]
}

const CHUNK_SIZE = 1800 // ~500 tokens at ~3.6 chars/token
const CHUNK_OVERLAP = 200

function chunkText(text: string): string[] {
  const clean = text.replace(/\s+/g, ' ').trim()
  if (!clean) return []
  if (clean.length <= CHUNK_SIZE) return [clean]
  const out: string[] = []
  let i = 0
  while (i < clean.length) {
    out.push(clean.slice(i, i + CHUNK_SIZE))
    i += CHUNK_SIZE - CHUNK_OVERLAP
  }
  return out
}

async function embedBatch(inputs: string[]): Promise<number[][]> {
  const url = process.env.EMBEDDING_API_URL || 'https://api.openai.com/v1/embeddings'
  const key = process.env.EMBEDDING_API_KEY || process.env.OPENAI_API_KEY
  if (!key) throw new Error('EMBEDDING_API_KEY (or OPENAI_API_KEY) not set')

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({
      model: process.env.EMBEDDING_MODEL || 'text-embedding-3-small',
      input: inputs,
    }),
  })

  if (!res.ok) {
    const err = await res.text().catch(() => '')
    throw new Error(`Embedding API failed: ${res.status} ${err}`)
  }

  const data = await res.json()
  return data.data.map((d: {embedding: number[]}) => d.embedding)
}

async function main() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_DATASET || 'production'

  if (!projectId) {
    console.error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID')
    process.exit(1)
  }

  const sanity = createClient({
    projectId,
    dataset,
    apiVersion: '2024-01-01',
    useCdn: false,
  })

  console.log('Fetching blog posts from Sanity…')
  const posts: PostRow[] = await sanity.fetch(POSTS_QUERY)
  console.log(`Got ${posts.length} posts.`)

  // Chunk all posts up front so we can batch embed efficiently.
  const allChunks: Array<{postId: string; title: string; slug: string; section: 'blog' | 'thinking'; chunk: string}> = []
  for (const p of posts) {
    if (!p.text) continue
    const chunks = chunkText(p.text)
    for (const c of chunks) {
      allChunks.push({postId: p._id, title: p.title, slug: p.slug, section: p.section, chunk: c})
    }
  }
  console.log(`Generated ${allChunks.length} chunks. Embedding…`)

  // OpenAI allows ~100 inputs per batch for text-embedding-3-small.
  const BATCH = 64
  const embedded: EmbeddedChunk[] = []
  for (let i = 0; i < allChunks.length; i += BATCH) {
    const batch = allChunks.slice(i, i + BATCH)
    const vectors = await embedBatch(batch.map((b) => b.chunk))
    for (let j = 0; j < batch.length; j++) {
      embedded.push({
        postId: batch[j].postId,
        title: batch[j].title,
        slug: batch[j].slug,
        section: batch[j].section,
        chunk: batch[j].chunk,
        vector: vectors[j],
      })
    }
    console.log(`  …${embedded.length} / ${allChunks.length}`)
  }

  const outPath = path.join(process.cwd(), 'src', 'lib', 'ai', 'blog-embeddings.json')
  await fs.writeFile(outPath, JSON.stringify(embedded), 'utf-8')
  console.log(`Wrote ${embedded.length} embedded chunks → ${outPath}`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})

/**
 * Retrieval-Augmented Generation helper.
 *
 * Loads the pre-built blog embedding store, embeds the query, and returns the
 * top-k most relevant chunks for injection into the AI system prompt.
 *
 * The store is built offline by `scripts/build-blog-embeddings.ts`. If the
 * file is missing or empty, RAG silently degrades — the AI still answers from
 * the in-prompt knowledge base alone.
 */

import {promises as fs} from 'fs'
import path from 'path'

export interface EmbeddedChunk {
  postId: string
  title: string
  slug: string
  section: 'blog' | 'thinking'
  chunk: string
  vector: number[]
}

type LoadedStore = {
  ready: boolean
  chunks: EmbeddedChunk[]
}

let cachedStore: LoadedStore | null = null

async function loadStore(): Promise<LoadedStore> {
  if (cachedStore) return cachedStore
  const filePath = path.join(process.cwd(), 'src', 'lib', 'ai', 'blog-embeddings.json')
  try {
    const raw = await fs.readFile(filePath, 'utf-8')
    const parsed = JSON.parse(raw) as EmbeddedChunk[]
    cachedStore = {ready: parsed.length > 0, chunks: parsed}
  } catch {
    cachedStore = {ready: false, chunks: []}
  }
  return cachedStore
}

function cosineSim(a: number[], b: number[]): number {
  let dot = 0
  let na = 0
  let nb = 0
  const len = Math.min(a.length, b.length)
  for (let i = 0; i < len; i++) {
    dot += a[i] * b[i]
    na += a[i] * a[i]
    nb += b[i] * b[i]
  }
  if (na === 0 || nb === 0) return 0
  return dot / (Math.sqrt(na) * Math.sqrt(nb))
}

/** Embeds the query via the configured embedding endpoint. */
export async function embedQuery(query: string): Promise<number[] | null> {
  const url = process.env.EMBEDDING_API_URL || 'https://api.openai.com/v1/embeddings'
  const key = process.env.EMBEDDING_API_KEY || process.env.OPENAI_API_KEY
  if (!key) return null

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        model: process.env.EMBEDDING_MODEL || 'text-embedding-3-small',
        input: query,
      }),
    })
    if (!res.ok) return null
    const data = await res.json()
    return data?.data?.[0]?.embedding ?? null
  } catch {
    return null
  }
}

export interface RetrievedChunk {
  title: string
  slug: string
  section: 'blog' | 'thinking'
  chunk: string
  similarity: number
}

/**
 * Returns top-k chunks most semantically similar to the query.
 * Returns an empty array if the store is missing, empty, or query embedding fails.
 */
export async function retrieveRelevantChunks(query: string, k = 4): Promise<RetrievedChunk[]> {
  const store = await loadStore()
  if (!store.ready) return []

  const qVec = await embedQuery(query)
  if (!qVec) return []

  const scored = store.chunks.map((c) => ({
    title: c.title,
    slug: c.slug,
    section: c.section,
    chunk: c.chunk,
    similarity: cosineSim(qVec, c.vector),
  }))

  scored.sort((a, b) => b.similarity - a.similarity)
  // Filter out very weak matches (< 0.3 cosine) — they add noise without signal.
  return scored.filter((c) => c.similarity >= 0.3).slice(0, k)
}

/** Format retrieved chunks into a system message for injection into the chat. */
export function formatChunksAsContext(chunks: RetrievedChunk[]): string {
  if (chunks.length === 0) return ''
  const parts = chunks.map(
    (c, i) =>
      `[${i + 1}] **${c.title}** (cite as [${c.title}](/${c.section}/${c.slug})):\n${c.chunk.trim()}`
  )
  return `\n\n# Relevant context from our blog\n${parts.join('\n\n')}\n\nWhen any of the above is relevant to the user's question, weave it into your answer and cite the source as the Markdown link shown.`
}

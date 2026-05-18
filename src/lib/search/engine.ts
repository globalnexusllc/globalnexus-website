/**
 * Client-side fuzzy search over all locally-indexed content.
 * Sanity blog posts are searched server-side via /api/search/blog (see frontend hook).
 */

import Fuse from 'fuse.js'
import {getAllSearchable} from './sources'
import type {SearchableItem} from './types'

let cachedFuse: Fuse<SearchableItem> | null = null

function buildIndex(): Fuse<SearchableItem> {
  return new Fuse(getAllSearchable(), {
    keys: [
      {name: 'title', weight: 0.5},
      {name: 'keywords', weight: 0.3},
      {name: 'description', weight: 0.2},
    ],
    threshold: 0.35,
    ignoreLocation: true,
    minMatchCharLength: 2,
    includeScore: true,
  })
}

export function searchStatic(query: string, limit = 24): SearchableItem[] {
  const q = query.trim()
  if (q.length < 2) return []
  if (!cachedFuse) cachedFuse = buildIndex()
  return cachedFuse.search(q, {limit}).map((r) => r.item)
}

export function groupByKind(items: SearchableItem[]): Record<string, SearchableItem[]> {
  const out: Record<string, SearchableItem[]> = {}
  for (const item of items) {
    if (!out[item.kind]) out[item.kind] = []
    out[item.kind].push(item)
  }
  return out
}

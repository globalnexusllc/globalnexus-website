/**
 * In-memory rate limiter keyed by client IP.
 *
 * Default: 10 requests / 60 seconds per IP. Returns an error envelope for the
 * caller to translate into an HTTP 429 with Retry-After.
 *
 * NOTE: This is process-local. In multi-instance deployments (Vercel functions,
 * etc.) each instance has its own counter, so a determined caller could exceed
 * the global limit. Acceptable for casual abuse prevention. Swap the storage
 * adapter for Vercel KV / Upstash if you need true global limiting.
 */

interface Bucket {
  count: number
  resetAt: number
}

const WINDOW_MS = 60_000
const MAX_PER_WINDOW = 10

const buckets = new Map<string, Bucket>()

function pruneExpired(now: number) {
  // Best-effort GC every call — cheap because Map is small for our scale.
  for (const [key, b] of buckets) {
    if (b.resetAt <= now) buckets.delete(key)
  }
}

export interface RateLimitResult {
  ok: boolean
  remaining: number
  /** Seconds until the limit resets. Always set; useful in Retry-After even when ok=true. */
  retryAfter: number
}

export function checkRateLimit(key: string): RateLimitResult {
  const now = Date.now()
  pruneExpired(now)

  const existing = buckets.get(key)
  if (!existing || existing.resetAt <= now) {
    buckets.set(key, {count: 1, resetAt: now + WINDOW_MS})
    return {ok: true, remaining: MAX_PER_WINDOW - 1, retryAfter: Math.ceil(WINDOW_MS / 1000)}
  }

  if (existing.count >= MAX_PER_WINDOW) {
    return {ok: false, remaining: 0, retryAfter: Math.max(1, Math.ceil((existing.resetAt - now) / 1000))}
  }

  existing.count += 1
  return {ok: true, remaining: MAX_PER_WINDOW - existing.count, retryAfter: Math.ceil((existing.resetAt - now) / 1000)}
}

/** Pull a best-effort client IP from the request. Falls back to a generic key. */
export function clientKey(headers: Headers): string {
  const fwd = headers.get('x-forwarded-for')
  if (fwd) return fwd.split(',')[0].trim()
  const real = headers.get('x-real-ip')
  if (real) return real.trim()
  return 'anonymous'
}

import {NextRequest, NextResponse} from 'next/server'
import {GLOBAL_NEXUS_SYSTEM_PROMPT} from '@/lib/global-nexus-knowledge'
import {applyCitations} from '@/lib/ai/auto-cite'
import {checkRateLimit, clientKey} from '@/lib/ai/rate-limit'
import {retrieveRelevantChunks, formatChunksAsContext} from '@/lib/ai/rag'

interface ChatMsg {
  role: 'user' | 'assistant'
  content: string
}

// Default to OpenAI. Override OPENAI_API_URL for Azure OpenAI, a proxy, or any
// other OpenAI-compatible endpoint. The URL is expected to be the API base
// (e.g. `https://api.openai.com`) — the `/v1/chat/completions` suffix is appended.
const API_BASE = (process.env.OPENAI_API_URL || 'https://api.openai.com').replace(/\/$/, '')
const API_URL = `${API_BASE}/v1/chat/completions`
const MODEL = process.env.OPENAI_MODEL || 'gpt-4o-mini'

export async function POST(req: NextRequest) {
  // Rate limit per client IP — defense against API key cost abuse.
  const key = clientKey(req.headers)
  const limit = checkRateLimit(key)
  if (!limit.ok) {
    return NextResponse.json(
      {
        answer: `You're sending requests too quickly — please wait ~${limit.retryAfter}s before trying again.`,
        error: 'rate_limited',
      },
      {
        status: 429,
        headers: {
          'Retry-After': String(limit.retryAfter),
          'X-RateLimit-Remaining': '0',
        },
      }
    )
  }

  try {
    const {question, history = []} = (await req.json()) as {question: string; history?: ChatMsg[]}

    if (!question?.trim()) {
      return NextResponse.json({error: 'question required'}, {status: 400})
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        {answer: 'AI search is not configured. Please contact us at [Contact](/contact).'},
        {status: 200}
      )
    }

    // RAG: retrieve top-k blog chunks relevant to the question. Silently
    // degrades to an empty context block if the embeddings store is empty.
    const chunks = await retrieveRelevantChunks(question.trim(), 4)
    const ragContext = formatChunksAsContext(chunks)

    const messages = [
      {role: 'system', content: GLOBAL_NEXUS_SYSTEM_PROMPT + ragContext},
      ...history.slice(-10).map((m) => ({role: m.role, content: m.content})),
      {role: 'user', content: question.trim()},
    ]

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: MODEL,
        messages,
        max_tokens: 4096,
        temperature: 0.6,
      }),
    })

    if (!response.ok) {
      const errBody = await response.text().catch(() => '')
      console.error(`OpenAI API error ${response.status}: ${errBody.slice(0, 400)}`)
      throw new Error(`API error: ${response.status}`)
    }

    const data = await response.json()
    const raw =
      typeof data.choices?.[0]?.message?.content === 'string'
        ? data.choices[0].message.content
        : "That's a conversation for our principals — reach out at [Contact](/contact)."

    // Post-process: wrap known entity mentions in Markdown links if the model
    // didn't already (auto-cite is idempotent for already-linked phrases).
    const answer = applyCitations(raw)

    return NextResponse.json(
      {answer},
      {
        headers: {
          'X-RateLimit-Remaining': String(limit.remaining),
        },
      }
    )
  } catch {
    return NextResponse.json(
      {answer: 'Something went wrong. Try again or reach out at [Contact](/contact).'},
      {status: 200}
    )
  }
}

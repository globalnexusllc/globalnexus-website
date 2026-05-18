import {NextRequest, NextResponse} from 'next/server'
import {GLOBAL_NEXUS_SYSTEM_PROMPT} from '@/lib/global-nexus-knowledge'
import {applyCitations} from '@/lib/ai/auto-cite'
import {checkRateLimit, clientKey} from '@/lib/ai/rate-limit'
import {retrieveRelevantChunks, formatChunksAsContext} from '@/lib/ai/rag'

interface ChatMsg {
  role: 'user' | 'assistant'
  content: string
}

const API_URL = process.env.FORGE_API_URL
  ? `${process.env.FORGE_API_URL.replace(/\/$/, '')}/v1/chat/completions`
  : 'https://forge.manus.im/v1/chat/completions'

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

    if (!process.env.FORGE_API_KEY) {
      return NextResponse.json(
        {answer: 'AI search is not configured. Please contact us at [Contact](/contact).'},
        {status: 200}
      )
    }

    // RAG: retrieve top-k blog chunks relevant to the question. Silently
    // degrades to an empty context block if embeddings store / API key is missing.
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
        authorization: `Bearer ${process.env.FORGE_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gemini-2.5-flash',
        messages,
        max_tokens: 32768,
        thinking: {budget_tokens: 128},
      }),
    })

    if (!response.ok) {
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

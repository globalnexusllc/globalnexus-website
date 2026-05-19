# Global Nexus — Website

Marketing site, portfolio, and AI-assisted search for [globalnexus.one](https://globalnexus.one).
Built with **Next.js 16 (App Router)** + **Tailwind v4** + **Sanity CMS** + **TypeScript**.

---

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Environment variables

Create `.env.local` for development (gitignored). Defaults in code make most vars optional.

| Variable | Purpose | Required? |
|---|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity project to read content from | optional (falls back to the hardcoded ID in [`src/lib/sanity/client.ts`](src/lib/sanity/client.ts)) |
| `NEXT_PUBLIC_SANITY_DATASET` | Sanity dataset name | optional (defaults to `production`) |
| `OPENAI_API_KEY` | Bearer token for the AI chat and embeddings | required for AI search + RAG embeddings; site degrades gracefully without it |
| `OPENAI_API_URL` | Base URL for an OpenAI-compatible endpoint (Azure OpenAI, proxy, etc.) | optional — defaults to `https://api.openai.com` |
| `OPENAI_MODEL` | Chat model name | optional — defaults to `gpt-4o-mini` |
| `EMBEDDING_API_URL` | Embedding endpoint (OpenAI-compatible) | optional — falls back to `OPENAI_API_URL` then `https://api.openai.com` |
| `EMBEDDING_API_KEY` | Bearer token for the embedding endpoint | optional — falls back to `OPENAI_API_KEY` |
| `EMBEDDING_MODEL` | Embedding model name | optional — defaults to `text-embedding-3-small` |
| `EMBEDDING_MODEL` | Embedding model (default: `text-embedding-3-small`) | optional |

Production env vars live in **Netlify dashboard → Site settings → Environment variables**.

---

## Available scripts

| Script | What it does |
|---|---|
| `npm run dev` | Next.js dev server on `:3000` (webpack mode) |
| `npm run build` | Production build |
| `npm run start` | Run a production build locally |
| `npm run lint` | ESLint |
| `npm run embeddings:build` | Build RAG embeddings for blog posts (see below) |

Direct script invocations (no npm-script alias):

| Command | What it does |
|---|---|
| `npx tsx scripts/mobile-audit.ts` | Screenshot every page at iPhone-12 viewport and flag horizontal overflow |
| `node scripts/generate-team-avatars.js` | Regenerate the 5 NFT-style team avatars in `public/team/` |

---

## Architecture

### Pages & routing

App-router pages in `src/app/`. Hard-coded marketing content is centralized in [`src/lib/search/sources.ts`](src/lib/search/sources.ts) so pages and the unified search index stay in sync. Page components import their data from this single source.

### Content sources

- **Marketing copy** (home, about, process, contact, legal): hard-coded in TSX pages
- **Portfolio, Team, Engineering, Stack**: structured data in [`src/lib/search/sources.ts`](src/lib/search/sources.ts)
- **Blog + Thinking + categories**: Sanity CMS (project `nvzo4bql`, dataset `production`)

### Search

Two-layer search experience:

1. **General search** — `Fuse.js` fuzzy index over the unified catalog (pages, portfolio, team, stack, engineering) plus a Sanity GROQ query for blog posts. Available in the global `⌘K` modal and at `/search?q=...` ([`src/components/shared/SiteSearch.tsx`](src/components/shared/SiteSearch.tsx), [`src/app/search/page.tsx`](src/app/search/page.tsx)).
2. **AI search** — OpenAI Chat Completions (default model `gpt-4o-mini`, configurable via `OPENAI_MODEL`), with the entire site catalog injected as a system prompt ([`src/lib/global-nexus-knowledge.ts`](src/lib/global-nexus-knowledge.ts)), optional RAG over Sanity blog content ([`src/lib/ai/rag.ts`](src/lib/ai/rag.ts)), per-IP rate limiting ([`src/lib/ai/rate-limit.ts`](src/lib/ai/rate-limit.ts)), and post-response citation auto-linking ([`src/lib/ai/auto-cite.ts`](src/lib/ai/auto-cite.ts)).

### Styling

Tailwind v4 + a small custom palette in [`src/app/globals.css`](src/app/globals.css). Brand colors: medium navy (`#1e3a5f`), warm cream (`#f5f0e8`), rust (`#b05a2f`), gold accent (`var(--gold)`).

---

## Operational procedures

### AI search RAG embeddings

The AI assistant ([`/api/ai`](src/app/api/ai/route.ts)) optionally retrieves relevant blog chunks at query time. To enable:

```bash
# Requires EMBEDDING_API_KEY (or OPENAI_API_KEY)
npm run embeddings:build
```

This fetches every published post from Sanity, chunks each into ~500-token windows, embeds via the configured embedding API, and writes [`src/lib/ai/blog-embeddings.json`](src/lib/ai/blog-embeddings.json). Without this file (or its env vars), the AI still answers from the in-prompt knowledge base — RAG just degrades silently.

Re-run after meaningful blog content changes.

### Mobile responsiveness audit

Headless-Chrome (Puppeteer) screenshots every key page at iPhone-12 viewport, full-page, and flags any page whose document width exceeds 390 px.

```bash
npm run dev   # in one terminal
npx tsx scripts/mobile-audit.ts   # in another
```

Outputs go to `mobile-audit/` (gitignored). Add new routes to the `ROUTES` array in the script as the site grows.

### Team avatars

The five team-page avatars in `public/team/` are generated programmatically:
- David Zhen's avatar is the `selfie-edited.png` source photo, processed with a cell-shading / cartoon transform via `sharp`
- Other four are SVG-rendered NFT-style geometric portraits with kind-specific motifs (neural-network nodes for AI, hexagons for Web3, low-poly mesh for game eng., isometric cubes for DevOps)

Regenerate any time:

```bash
node scripts/generate-team-avatars.js
```

Edit [`scripts/generate-team-avatars.js`](scripts/generate-team-avatars.js) to add new members or swap motifs.

---

## Deployment

- **Hosting**: Netlify (`@netlify/plugin-nextjs`)
- **Build**: `yarn build` per [`netlify.toml`](netlify.toml)
- **Runtime**: Node 20

CI deploys are triggered by pushes to `master`. Preview deploys on PRs.

Required production env vars in Netlify:
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `OPENAI_API_KEY` (enables AI search; also used by the embeddings build script)
- `OPENAI_MODEL` (optional — override the default `gpt-4o-mini`)

---

## Directory map

```
src/
  app/                      ← Next.js App Router pages + API routes
    api/
      ai/                   ← AI chat endpoint (rate-limited, RAG, citations)
      search/blog/          ← Sanity blog search endpoint
      revalidate/           ← Sanity webhook → ISR revalidation
    search/                 ← Dedicated /search?q=... page
    ...                     ← Marketing pages (about, proof, team, stack, etc.)
  components/               ← React components grouped by domain
  lib/
    sanity/                 ← Sanity client, GROQ queries, Portable Text renderer
    search/                 ← Unified search index (sources.ts, engine.ts, types.ts)
    ai/                     ← AI helpers (rate limit, auto-cite, RAG, embeddings store)
    global-nexus-knowledge.ts  ← System prompt for /api/ai (derived from sources.ts)
scripts/                    ← One-off ops scripts (migrate, embeddings, audit, avatars)
public/                     ← Static assets (team photos, portfolio screenshots, icons)
```

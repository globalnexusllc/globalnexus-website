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
| `FORGE_API_URL` | Endpoint for the AI chat backend (OpenAI-compatible) | optional — AI search degrades gracefully if missing |
| `FORGE_API_KEY` | Bearer token for the AI endpoint | required if AI search is enabled |
| `EMBEDDING_API_URL` | Embedding endpoint (OpenAI-compatible) for RAG | optional — RAG silently disabled if unset |
| `EMBEDDING_API_KEY` / `OPENAI_API_KEY` | Bearer token for embeddings | required for `npm run embeddings:build` |
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
| `npm run migrate:sanity` | Clone one Sanity project → another (see below) |

Direct script invocations (no npm-script alias):

| Command | What it does |
|---|---|
| `npx tsx scripts/mobile-audit.ts` | Screenshot every page at iPhone-12 viewport and flag horizontal overflow |
| `npx tsx --env-file=.env.migrate scripts/verify-target.ts` | Side-by-side document-count diff of source vs target Sanity projects |
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
2. **AI search** — Gemini 2.5 Flash via a Forge-compatible endpoint, with the entire site catalog injected as a system prompt ([`src/lib/global-nexus-knowledge.ts`](src/lib/global-nexus-knowledge.ts)), optional RAG over Sanity blog content ([`src/lib/ai/rag.ts`](src/lib/ai/rag.ts)), per-IP rate limiting ([`src/lib/ai/rate-limit.ts`](src/lib/ai/rate-limit.ts)), and post-response citation auto-linking ([`src/lib/ai/auto-cite.ts`](src/lib/ai/auto-cite.ts)).

### Styling

Tailwind v4 + a small custom palette in [`src/app/globals.css`](src/app/globals.css). Brand colors: medium navy (`#1e3a5f`), warm cream (`#f5f0e8`), rust (`#b05a2f`), gold accent (`var(--gold)`).

---

## Operational procedures

### Sanity migration (cloning content to a new project)

Use this when moving Sanity ownership between accounts or splitting datasets.

**1. Set up credentials.** Copy the template, fill in real values (gitignored):

```bash
cp scripts/migrate-sanity.env.example .env.migrate
$EDITOR .env.migrate
```

Tokens are minted at `sanity.io/manage` → API → Tokens. Source needs **Viewer** scope; target needs **Editor** or higher.

**2. Run the migration:**

```bash
npm run migrate:sanity
```

The script:
- Preflights both projects' credentials
- Exports the source dataset (drafts + assets included) to a local `.tar.gz`
- Imports into the target with `operation: 'createOrReplace'` (idempotent, safe re-runs)
- Tolerates individual broken asset URLs (`allowFailingAssets: true`) — logs but doesn't abort
- Prints a post-migration checklist of manual steps it can't do (env var updates, CORS, schema deploy)

**3. Verify parity:**

```bash
npx tsx --env-file=.env.migrate scripts/verify-target.ts
```

Side-by-side counts per document type, plus slug parity check on the top 5 most recent posts.

**4. Update site config** to point at the new project:
- [`src/lib/sanity/client.ts`](src/lib/sanity/client.ts) — change the fallback `projectId`
- `.env.local` — set `NEXT_PUBLIC_SANITY_PROJECT_ID`
- Netlify dashboard — same env vars for production
- New project dashboard — add CORS origins (`localhost:3000` + production domain)
- Studio repo (separate from this site) — redeploy schema with the new `projectId`

**5. Rotate tokens** in the new and old projects once migration is verified.

The intermediate tarball (`sanity-export-*.tar.gz`) is gitignored — keep it as an audit snapshot, delete after verification.

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
- `FORGE_API_URL`, `FORGE_API_KEY` (if AI search enabled)
- `EMBEDDING_API_KEY` (only needed to rebuild embeddings; runtime reads the JSON file)

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

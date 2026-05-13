import Link from 'next/link'
import type {Metadata} from 'next'

export const metadata: Metadata = {
  title: 'Our Default Technology Stack',
  description:
    'Global Nexus default technology choices by project type — React, Angular, Vue.js, Node.js, Django, FastAPI, Flask, .NET Core, ASP.NET, C#, Azure, PostgreSQL, and more. With the reasoning behind every choice.',
}

interface StackEntry {
  label: string
  category: string
  stack: string[]
  reasoning: string
  callout: string
}

const stacks: StackEntry[] = [
  {
    label: 'JavaScript Web Application',
    category: 'Web · Modern',
    stack: ['React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Redis'],
    reasoning:
      "Next.js gives us server-side rendering, file-based routing, and edge deployments out of the box. TypeScript catches a class of bugs before runtime. PostgreSQL is the default for any relational data — battle-tested, feature-rich, and predictable under load.",
    callout: 'Next.js SSR cuts TTFB by ~40% vs CSR for content-heavy apps.',
  },
  {
    label: 'Microsoft Software Engineering',
    category: 'Enterprise · .NET',
    stack: ['C#', '.NET Core', 'ASP.NET MVC', 'Razor', 'Entity Framework', 'Azure', 'SQL Server'],
    reasoning:
      "For enterprises already invested in the Microsoft ecosystem, the .NET stack delivers unmatched tooling, type safety, and Azure-native deployment. ASP.NET MVC with Razor remains a workhorse for line-of-business apps; Entity Framework abstracts data access without sacrificing query control.",
    callout: '.NET Core handles 7M+ requests/sec on commodity hardware (TechEmpower benchmarks).',
  },
  {
    label: 'Angular / Vue.js Frontend',
    category: 'Web · Enterprise Frontend',
    stack: ['Angular', 'Vue.js', 'TypeScript', 'RxJS', 'Pinia / NgRx'],
    reasoning:
      "When the client mandates Angular (common in enterprise) or Vue.js (common in European and Asian markets), we deliver natively rather than forcing React. Angular shines for large, opinionated apps with strict structure. Vue 3 with the Composition API offers a lighter footprint with the same reactive model.",
    callout: 'Angular is used by 30%+ of Fortune 500 internal applications.',
  },
  {
    label: 'Python Backend & APIs',
    category: 'Backend · Python',
    stack: ['Django', 'FastAPI', 'Flask', 'PostgreSQL', 'Celery', 'Redis'],
    reasoning:
      "Django is the default for batteries-included, admin-heavy products — ORM, auth, and admin panel for free. FastAPI is the choice for async-heavy, type-validated APIs (Pydantic + OpenAPI auto-docs). Flask remains the right call for lightweight microservices where Django would be overkill.",
    callout: 'FastAPI delivers 3-5× higher throughput than Flask for async I/O workloads.',
  },
  {
    label: 'Node.js Backend & APIs',
    category: 'Backend · Node.js',
    stack: ['NestJS', 'Express', 'Prisma', 'TypeScript', 'PostgreSQL', 'MongoDB'],
    reasoning:
      "NestJS is our default for non-trivial Node.js services — opinionated module structure, dependency injection, and decorators that scale to large codebases. Prisma is the ORM of choice: type-safe schema, auto-generated client, and migrations that don't fight Git. Express stays in the toolbox for lightweight services where NestJS would be overhead.",
    callout: 'Prisma generates fully type-safe DB clients — zero runtime mismatches between schema and code.',
  },
  {
    label: 'AI / ML Platform',
    category: 'AI · Inference',
    stack: ['Python', 'FastAPI', 'LangChain', 'LlamaIndex', 'Pinecone', 'OpenAI / Anthropic APIs'],
    reasoning:
      "LangChain handles prompt orchestration, tool use, and agent loops. LlamaIndex specializes in retrieval-augmented generation. Pinecone provides vector search with sub-50ms p95 latency. FastAPI exposes inference endpoints with auto-generated OpenAPI specs — clients consume the API without ambiguity.",
    callout: 'Pinecone serves vector queries at <50ms p95 for billions of vectors.',
  },
  {
    label: 'Blockchain / Web3',
    category: 'Decentralized',
    stack: ['Solidity', 'ASP.NET Core', 'C#', 'Hardhat', 'Ethers.js', 'Unity', 'IPFS'],
    reasoning:
      "Solidity for EVM-compatible smart contracts; ASP.NET Core for off-chain services and orchestration. Hardhat provides the testing and deployment toolchain. Unity enters when on-chain gaming or NFT-driven game economies are part of the scope — the Samurai Warlords stack proved this combination ships.",
    callout: 'Hardhat is used by 80% of professional Ethereum dev teams.',
  },
  {
    label: 'Enterprise SaaS Platform',
    category: 'B2B · SaaS',
    stack: ['React', 'Django REST', 'PostgreSQL', 'Redis', 'Celery', 'Stripe'],
    reasoning:
      "Django REST Framework is hard to beat for B2B SaaS — built-in serialization, permissions, throttling, and admin tooling. React frontend provides interactivity without coupling to Django templates. Stripe handles billing complexity (subscriptions, dunning, tax, invoicing) so we don't have to rebuild it.",
    callout: 'Django REST Framework powers Instagram, Mozilla, Red Hat, and Eventbrite.',
  },
  {
    label: 'Mobile Application',
    category: 'Mobile · Cross-Platform',
    stack: ['React Native', 'Expo', 'TypeScript', 'TanStack Query', 'Reanimated'],
    reasoning:
      "React Native with Expo lets us share ~80% of code with the React web app while deploying native binaries to iOS and Android. Expo handles build infrastructure, OTA updates, and native module access. Reanimated brings 60fps gesture-driven UI without bridging overhead.",
    callout: 'React Native is used in Instagram, Discord, Shopify, and Tesla apps.',
  },
  {
    label: 'Serverless & Event-Driven',
    category: 'Architecture · Serverless',
    stack: ['Serverless Framework', 'AWS CDK', 'AWS Lambda', 'EventBridge', 'SQS', 'Step Functions'],
    reasoning:
      "When workloads are spiky, event-shaped, or pay-per-use is the right cost model, we default to serverless. Serverless Framework handles Lambda packaging and deployment with minimal config. AWS CDK gives us typed infrastructure-as-code (TypeScript) when we want richer abstractions than Terraform offers. EventBridge decouples producers from consumers; SQS guarantees delivery; Step Functions orchestrate multi-step workflows without a custom state machine.",
    callout: 'AWS CDK reduces infrastructure code by ~80% vs raw CloudFormation YAML.',
  },
  {
    label: 'Cloud Infrastructure',
    category: 'DevOps · Infrastructure',
    stack: ['AWS', 'Azure', 'Vercel', 'Docker', 'Terraform', 'GitHub Actions'],
    reasoning:
      "AWS for unconstrained scale; Azure when the client is .NET-aligned or has existing Microsoft enterprise agreements; Vercel for Next.js frontends with edge requirements. Terraform encodes infrastructure as version-controlled code. GitHub Actions runs every test, build, and deploy without external CI services.",
    callout: 'Terraform reduces infra drift incidents by 90% in audited environments.',
  },
]

export default function StackPage() {
  return (
    <main>
      {/* ═══ HERO ═══ */}
      <section
        className="relative pt-28 pb-20 sm:pt-36 sm:pb-28 overflow-hidden"
        style={{background: 'linear-gradient(135deg, #1e3a5f 0%, #254b78 50%, #1e3a5f 100%)'}}
      >
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-15 pointer-events-none" style={{background: 'oklch(0.55 0.15 30)', filter: 'blur(80px)'}} />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full opacity-10 pointer-events-none" style={{background: 'oklch(0.82 0.15 75)', filter: 'blur(80px)'}} />

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8">
          <div className="mb-4">
            <span
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-medium uppercase tracking-[0.2em]"
              style={{border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-body)'}}
            >
              Default Technology Stack
            </span>
          </div>

          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-white max-w-4xl"
            style={{fontFamily: 'var(--font-display)'}}
          >
            Our Default{' '}
            <span style={{color: 'oklch(0.82 0.15 75)'}}>Technology Choices.</span>
          </h1>

          <p
            className="mt-6 text-base sm:text-lg leading-relaxed max-w-3xl"
            style={{color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-body)'}}
          >
            We don&apos;t pick tools arbitrarily. Every default has a reason — performance benchmarks, developer velocity, codebase maintainability, or ecosystem maturity.
          </p>
        </div>
      </section>

      {/* ═══ STACK CARDS ═══ */}
      <section className="py-20 sm:py-28" style={{background: 'var(--warm-bg)'}}>
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="grid lg:grid-cols-2 gap-6">
            {stacks.map((entry, i) => (
              <div
                key={entry.label}
                className="rounded-xl p-7 sm:p-8 flex flex-col"
                style={{background: '#ffffff', border: '1px solid rgba(30,58,95,0.08)', boxShadow: '0 2px 16px rgba(30,58,95,0.06)'}}
              >
                <div className="flex items-start justify-between mb-3 gap-3">
                  <p className="text-xs uppercase tracking-[0.2em] font-semibold" style={{color: 'var(--rust)', fontFamily: 'var(--font-mono)'}}>
                    {entry.category}
                  </p>
                  <p className="text-xs font-mono" style={{color: 'var(--text-mid)'}}>
                    {String(i + 1).padStart(2, '0')}
                  </p>
                </div>

                <h3 className="text-2xl font-bold mb-5" style={{color: 'var(--text-dark)', fontFamily: 'var(--font-display)'}}>
                  {entry.label}
                </h3>

                <div className="flex flex-wrap gap-2 mb-5">
                  {entry.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-full text-xs font-semibold"
                      style={{
                        background: 'rgba(30,58,95,0.08)',
                        color: 'var(--dark)',
                        fontFamily: 'var(--font-mono)',
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <p className="text-sm leading-relaxed flex-1" style={{color: 'var(--text-mid)', fontFamily: 'var(--font-body)'}}>
                  {entry.reasoning}
                </p>

                <div
                  className="mt-5 pt-5 text-sm font-medium"
                  style={{
                    borderTop: '1px solid rgba(30,58,95,0.08)',
                    color: 'var(--rust)',
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  ▸ {entry.callout}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ WHEN WE DEVIATE ═══ */}
      <section className="py-20 sm:py-28" style={{background: 'var(--dark)'}}>
        <div className="max-w-4xl mx-auto px-5 sm:px-8">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase" style={{color: 'oklch(0.82 0.15 75)', fontFamily: 'var(--font-body)'}}>
            Defaults, Not Dogma
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-white tracking-tight" style={{fontFamily: 'var(--font-display)'}}>
            When we deviate from defaults.
          </h2>
          <div className="mt-8 space-y-5 text-base leading-relaxed" style={{color: 'rgba(255,255,255,0.7)', fontFamily: 'var(--font-body)'}}>
            <p>
              These defaults represent our highest-velocity, lowest-risk paths to production. But every engagement gets a thoughtful review — we don&apos;t reach for React if the client has a deep Vue investment, and we don&apos;t propose Postgres if the workload is genuinely document-oriented.
            </p>
            <p>
              We choose tools based on three weighted factors: <span className="text-white font-semibold">existing team expertise</span> (does the client&apos;s team need to maintain this?), <span className="text-white font-semibold">workload characteristics</span> (what does the data and traffic actually look like?), and <span className="text-white font-semibold">ecosystem maturity</span> (will this still be supported in five years?).
            </p>
            <p>
              The defaults exist so we don&apos;t debate the basics on every project. The judgment exists so we don&apos;t apply them blindly.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="py-20 sm:py-28" style={{background: 'var(--rust)'}}>
        <div className="max-w-3xl mx-auto px-5 sm:px-8 text-center">
          <h2
            className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight"
            style={{fontFamily: 'var(--font-display)'}}
          >
            Have a stack question?
          </h2>
          <p
            className="text-base sm:text-lg leading-relaxed mb-10 text-white/90 max-w-xl mx-auto"
            style={{fontFamily: 'var(--font-body)'}}
          >
            Tell us your constraints — team, budget, timeline, existing systems — and we&apos;ll recommend the stack that fits, not the one we sell.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-md text-sm font-bold transition-all hover:opacity-90"
            style={{background: '#ffffff', color: 'var(--rust)', fontFamily: 'var(--font-body)'}}
          >
            Start the Conversation
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
        </div>
      </section>
    </main>
  )
}

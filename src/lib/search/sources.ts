/**
 * Canonical source of truth for all hard-coded site content.
 * Both the page components and the search index import from here.
 */

import type {
  PortfolioProject,
  TeamMember,
  StackEntry,
  SearchableItem,
} from './types'

// ─────────────────────────────────────────────────────────────
// PORTFOLIO
// ─────────────────────────────────────────────────────────────

export const portfolioProjects: PortfolioProject[] = [
  {
    id: 'neighbors',
    name: 'Neighbors',
    url: 'https://neighbors.co',
    role: 'Software Engineering & Product Design',
    category: 'Marketplace',
    tech: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL', 'Heroku'],
    description:
      'A web platform connecting local chefs with nearby customers looking to order home-cooked dishes for parties, events, and gatherings. Delivers a seamless experience for browsing menus, placing orders, and supporting local culinary talent.',
    highlights: [
      'Led software engineering and UI/UX design end-to-end',
      'Built responsive ordering flow with real-time availability',
      'Architected PostgreSQL schema for chef profiles and order management',
      'Deployed and maintained on Heroku with CI pipeline',
    ],
    gradient: 'linear-gradient(135deg, #f97316 0%, #ea580c 50%, #c2410c 100%)',
    accentColor: '#f97316',
    iconLetter: 'N',
    screenshot: '/portfolio/neighbors.jpg',
    testimonial: {
      quote:
        "Global Nexus delivered our full platform from scratch — frontend, backend, and database — with a level of craftsmanship we hadn't seen before. The checkout flow alone boosted our order conversions by 40%.",
      name: 'Chris Sullivan',
      title: 'Founder, Neighbors',
    },
  },
  {
    id: 'featured-customers',
    name: 'Featured Customers',
    url: 'https://featuredcustomers.com',
    role: 'Software Engineering',
    category: 'B2B SaaS',
    tech: ['React.js', 'TypeScript', 'React Query', 'React Hook Form', 'Tailwind CSS', 'Python', 'Django REST', 'PostgreSQL', 'Digital Ocean'],
    description:
      'A content marketing platform that showcases verified customer success stories, case studies, and testimonials for B2B companies. Implemented dynamic frontend components, API integrations, and RESTful Django endpoints.',
    highlights: [
      'Built dynamic frontend components with React and TypeScript',
      'Integrated complex forms and API calls with React Hook Form and React Query',
      'Developed and maintained RESTful endpoints in Django REST Framework',
      'Collaborated on UI design flows in Figma for a clean, responsive interface',
    ],
    gradient: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 50%, #1d4ed8 100%)',
    accentColor: '#3b82f6',
    iconLetter: 'FC',
    screenshot: '/portfolio/featured-customers.jpg',
    testimonial: {
      quote:
        "Their React and Django work was impeccable. Complex API integrations, form systems, responsive UI — all delivered cleanly and on schedule. They became an extension of our team within the first week.",
      name: 'Jeff Eichel',
      title: 'Founder & CEO, Featured Customers',
    },
  },
  {
    id: 'go-ask-alice',
    name: 'Go Ask Alice!',
    url: 'https://goaskalice.columbia.edu',
    role: 'Frontend & CMS Development',
    category: 'Health Tech',
    tech: ['Drupal', 'Gatsby.js', 'GraphQL', 'Storybook', 'Styled Components', 'Emotion', 'React'],
    description:
      "Columbia University's trusted health Q&A platform aimed at college students and young adults. Built and styled reusable React components, integrated with a Gatsby static frontend powered by Drupal CMS and GraphQL.",
    highlights: [
      'Built and styled reusable React components with Emotion and Styled Components',
      'Integrated Gatsby static frontend with Drupal CMS via GraphQL',
      'Established a scalable design system in Storybook',
      'Delivered a fast, accessible, mobile-first site optimized for health education',
    ],
    gradient: 'linear-gradient(135deg, #10b981 0%, #059669 50%, #047857 100%)',
    accentColor: '#10b981',
    iconLetter: 'GA',
    screenshot: '/portfolio/go-ask-alice.png',
    testimonial: {
      quote:
        "Rebuilding our health platform in Gatsby with Drupal CMS integration was a major undertaking. Global Nexus handled it with precision. The new design system they built cut our development cycle in half.",
      name: 'Kay VanValkenburgh',
      title: 'Principal, OwnSourcing',
    },
  },
  {
    id: 'torc',
    name: 'Torc',
    url: 'https://www.torc.dev',
    role: 'Frontend Development',
    category: 'Tech Platform',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Storybook'],
    description:
      'A tech talent marketplace connecting developers with global opportunities. Developed and refined frontend components using Next.js and TypeScript, contributed to a modular design system with Storybook, and implemented responsive, accessible UI.',
    highlights: [
      'Developed modular, scalable UI components in Next.js and TypeScript',
      'Built and documented a comprehensive Storybook component library',
      'Implemented responsive, accessible design with Tailwind CSS',
      'Collaborated with designers and backend engineers for consistent high-performance UX',
    ],
    gradient: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 50%, #6d28d9 100%)',
    accentColor: '#8b5cf6',
    iconLetter: 'T',
    screenshot: '/portfolio/torc.jpg',
    testimonial: {
      quote:
        "Fast, quality work with zero hand-holding needed. Their Next.js component library fit seamlessly into our design system, and the Storybook documentation they left behind has been invaluable.",
      name: 'Dave Messinger',
      title: 'CTO & Co-Founder, Torc',
    },
  },
  {
    id: 'mindtrip',
    name: 'Mindtrip',
    url: 'https://mindtrip.ai',
    role: 'Software Engineering · AI Systems',
    category: 'AI / Travel',
    tech: ['Next.js', 'FastAPI', 'Python', 'PostgreSQL (AWS RDS)', 'Redis', 'Pinecone', 'LangChain', 'Vercel AI SDK', 'LlamaIndex'],
    description:
      'An AI-powered travel assistant that personalizes trip planning through conversational AI. Built and optimized backend services, implemented vector search with Pinecone, and enabled semantic retrieval with LangChain and LlamaIndex.',
    highlights: [
      'Led software engineering and AI component integration',
      'Built production backend services with FastAPI and Python',
      'Implemented vector search (Pinecone) and AI reasoning (LangChain, LlamaIndex)',
      'Integrated Redis caching and PostgreSQL via AWS RDS for persistent storage',
    ],
    gradient: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 50%, #0e7490 100%)',
    accentColor: '#06b6d4',
    iconLetter: 'M',
    screenshot: '/portfolio/mindtrip.jpg',
    testimonial: {
      quote:
        "We needed someone who could bridge modern AI tooling with production-grade backend infrastructure. Global Nexus delivered beyond expectations — the LangChain and Pinecone integration they built is the backbone of our product today.",
      name: 'Andy Moss',
      title: 'Co-Founder & CEO, Mindtrip',
    },
  },
  {
    id: 'polarace',
    name: 'Polarace',
    url: 'https://polarace.gg',
    role: 'Software Engineering',
    category: 'Gaming / Creator',
    tech: ['React.js', 'Emotion', 'React Router', 'TypeScript', 'Nest.js', 'Prisma', 'MongoDB', 'AWS'],
    description:
      'A job and collaboration platform tailored for content creators in the gaming and streaming community. Built responsive frontend interfaces, developed secure backend APIs with Nest.js, and architected the data layer with Prisma and MongoDB.',
    highlights: [
      'Built responsive frontend with React.js, Emotion, and React Router',
      'Developed secure, scalable backend APIs with Nest.js',
      'Architected data layer with Prisma and MongoDB for creator profiles and job listings',
      'Deployed reliable infrastructure on AWS; user signups tripled post-launch',
    ],
    gradient: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4338ca 100%)',
    accentColor: '#6366f1',
    iconLetter: 'P',
    testimonial: {
      quote:
        "From Nest.js APIs to React UI, everything was solid. They understood our creator audience and built features that felt native to the gaming community. Our user signups tripled in the quarter after launch.",
      name: 'Derek Dobosz',
      title: 'CEO, Polar Ace',
    },
  },
  {
    id: 'samurai-warlords',
    name: 'Samurai Warlords',
    url: 'https://samuraiwarlords.com',
    role: 'Software Engineering · Blockchain',
    category: 'Web3 / Gaming',
    tech: ['ASP.NET Core', 'C#', 'Unity', 'Solidity', 'ERC-721', 'ERC-1155', 'Base Chain', 'Web3.js'],
    description:
      'An expansive Web3 strategy and combat ecosystem built on the Base blockchain. Developed the platform in ASP.NET Core and C#, deployed NFT smart contracts, and shipped a Samurai Chess game in Unity — bridging traditional gaming with blockchain-powered play-to-earn mechanics for a dual-token economy.',
    highlights: [
      'Built NFT marketplace with minting, buying, selling, and bidding for samurai characters, weapons, and artifacts',
      'Developed ERC-721 and ERC-1155 smart contracts for character NFTs, weapons, and in-game resource tokens',
      'Implemented staking dashboard — players lock NFTs to farm $VALOR tokens and ERC-1155 resources (materials, essences)',
      'Shipped Samurai Chess in Unity — turn-based strategy game with NFT warrior pieces, live on iOS, Android, and desktop',
      'Architected dual-token economy ($VALOR / $HONOR) with DAO governance, tournament entry, and NFT upgrade mechanics',
      'Integrated ASP.NET Core / C# backend with on-chain events, Web3 wallet auth, and player progression dashboards',
    ],
    gradient: 'linear-gradient(135deg, #0d0500 0%, #3b1000 50%, #7c1d0c 100%)',
    accentColor: '#d97706',
    iconLetter: 'SW',
    screenshot: '/portfolio/samurai-warlords.png',
    testimonial: {
      quote:
        "Global Nexus brought together our smart contracts, ASP.NET backend, and Unity game into one cohesive platform. The staking dashboard and NFT marketplace alone drove our Genesis collection to sell out within 48 hours of launch.",
      name: 'RyuZanshin (Niro)',
      title: 'CEO, Samurai Warlords',
    },
  },
  {
    id: 'foh-boh',
    name: 'foh&boh',
    url: 'https://fohandboh.com',
    role: 'Software Engineering',
    category: 'Hospitality Tech',
    tech: ['React', 'Node.js', 'PostgreSQL', 'AWS SES', 'AWS S3', 'Twilio', 'Cloudflare', 'WordPress'],
    description:
      "A SaaS talent marketplace built for the hospitality and retail industries. Engineered the full hiring platform — from sourcing and job board distribution through applicant tracking, automated scheduling, offer letters, and onboarding — helping 1,000+ brands like Grand Hyatt, Omni Hotels, and PF Chang's cut average hire time from 10 days to 3.",
    highlights: [
      'Built multi-channel candidate sourcing with direct SMS/email outreach — 99% read rate within 90 seconds',
      'Integrated simultaneous distribution to 65+ job boards from a single posting workflow',
      'Developed full ATS: screening videos, automated interview scheduling, offer letter generation, and onboarding docs',
      'Implemented 100+ HRIS integrations (BambooHR, Gusto, Workday) and 10+ ATS integrations (Greenhouse, Ashby)',
      'Created branded career page builder and smart candidate matching by commute, hours, and compensation preferences',
      'Built analytics dashboard with job board performance tracking, conversion rates, market pay benchmarking, and rejection analysis',
    ],
    gradient: 'linear-gradient(135deg, #92400e 0%, #b45309 50%, #d97706 100%)',
    accentColor: '#f59e0b',
    iconLetter: 'FB',
    screenshot: '/portfolio/foh-boh.png',
    testimonial: {
      quote:
        "We needed a platform that could handle the chaos of hospitality hiring — high volume, fast turnover, and operators who don't have time to waste. Global Nexus delivered exactly that. The SMS outreach and job board distribution alone transformed how our clients hire.",
      name: 'Halle Hayes',
      title: 'CEO & Co-Founder, foh&boh',
    },
  },
  {
    id: 'trend',
    name: 'Trend',
    url: 'https://trend.io',
    role: 'Software Engineering & Product Design',
    category: 'Creator Economy',
    tech: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL', 'AWS S3', 'AWS CloudFront', 'Stripe'],
    description:
      'A creator marketplace and UGC platform where brands commission custom photo and video content from creators and repurpose it into shoppable media. Designed and developed end-to-end marketplace workflows, payments, and media infrastructure.',
    highlights: [
      'Built end-to-end brand campaign flows with creator application and asset approval',
      'Implemented TikTok-style shoppable video feed with embedded product links',
      'Created credit-based billing system with Stripe and instant creator payouts',
      'Designed secure S3 upload pipeline with presigned URLs and thumbnail generation',
    ],
    gradient: 'linear-gradient(135deg, #ec4899 0%, #db2777 50%, #be185d 100%)',
    accentColor: '#ec4899',
    iconLetter: 'TR',
    screenshot: '/portfolio/trend.jpg',
    testimonial: {
      quote:
        "What impressed us most was the product thinking behind the code. The S3 upload pipeline, shoppable video feed, and Stripe credit system — each piece was architected for scale. Global Nexus thinks like a product team, not just engineers.",
      name: 'Joel Otterstrom',
      title: 'Founder & CEO, Trend',
    },
  },
  {
    id: 'ai-girlfriend-chat-simulator',
    name: 'AI Girlfriend Chat Simulator',
    url: '',
    role: 'Mobile Engineering · AI Integration',
    category: 'AI / Mobile',
    tech: ['React Native', 'Expo', 'TypeScript', 'OpenAI / ChatGPT API', 'RevenueCat', 'EAS Build'],
    description:
      'A cross-platform mobile AI chat simulator delivering immersive conversational experiences powered by the ChatGPT API. Built end-to-end on React Native + Expo with subscription monetization via RevenueCat — production-grade conversational AI shipped to iOS and Android from a single TypeScript codebase.',
    highlights: [
      'Architected the full React Native + Expo mobile app with TypeScript for iOS and Android from a single codebase',
      'Integrated the OpenAI / ChatGPT API with streaming responses, conversation memory, and persona prompts for personalized chat',
      'Implemented RevenueCat subscriptions across both app stores — paywall UI, trial logic, restore-purchases, webhook entitlement sync',
      'Built secure backend proxy to keep OpenAI keys off-device and enforce rate limits per subscription tier',
      'Shipped via EAS Build with OTA updates, allowing rapid iteration without forcing store reviews',
    ],
    gradient: 'linear-gradient(135deg, #a855f7 0%, #ec4899 50%, #f43f5e 100%)',
    accentColor: '#a855f7',
    iconLetter: 'AI',
    screenshot: '/portfolio/ai-girlfriend-chat-app.png',
    testimonial: {
      quote:
        "The integration between ChatGPT and RevenueCat was seamless. Streaming chat, paywalls, restore flows — everything just worked on day one of launch. We hit profitable unit economics in our first month.",
      name: 'Dzianis Khrystsiyanau',
      title: 'Founder, AI Girlfriend Chat Simulator',
    },
  },
]

export const portfolioCategories = [
  'All',
  'Marketplace',
  'B2B SaaS',
  'Health Tech',
  'Hospitality Tech',
  'Tech Platform',
  'AI / Travel',
  'AI / Mobile',
  'Web3 / Gaming',
  'Gaming / Creator',
  'Creator Economy',
]

// ─────────────────────────────────────────────────────────────
// TEAM
// ─────────────────────────────────────────────────────────────

export const teamMembers: TeamMember[] = [
  {
    name: 'Stephen Danals',
    title: 'CEO & Co-Founder',
    bio: "Co-founder and systems engineer whose background runs through network administration, IT operations, and infrastructure — the layer where products either hold up under real load or quietly fall apart. Stephen sees software as systems, not just codebases, and brings an operator's eye to every engagement: what breaks, what scales, and what actually has to run reliably once the demo is over. A founder-operator who keeps the firm anchored to real-world problems over architecture debates.",
    photo: '/team/stephen-danals.png',
  },
  {
    name: 'David Zhen',
    title: 'Co-Founder & CFO',
    bio: 'Co-founder and technical lead with 10+ years of hands-on engineering across web, mobile, and DeFi. Specializes in high-level architecture and cloud infrastructure — the decisions that determine whether a product scales gracefully or buckles at 10× load. David has taken products from zero to production across early-stage startups, and brings founder-level product judgment to every engagement, not just technical execution.',
    photo: '/team/david-zhen.png',
  },
  {
    name: 'Milan Kojadinovic',
    title: 'Senior Software Engineer · AI/ML',
    bio: "Python ecosystem specialist with 10+ years building AI/ML platforms end-to-end. Architects inference services, retrieval pipelines, and LLM-driven backends in FastAPI, LangChain, LlamaIndex, and PyTorch. Milan's strength is the bridge between research-stage ML work and production-grade systems — the gap where most AI projects quietly die. Equally comfortable tuning a vector index as he is shipping the API that consumes it.",
    photo: '/team/milan-kojadinovic.png',
  },
  {
    name: 'Cole Dahl',
    title: 'HR Manager & Senior Software Engineer',
    bio: 'Senior engineer with 10+ years across Web3, DeFi, and traditional full-stack web. Has shipped Solidity smart contracts, NFT marketplaces, and B2B SaaS platforms — sometimes in the same quarter. Cole also leads people operations at Global Nexus: hiring, mentoring, and protecting the senior-engineers-only culture. He believes the best hires come from working alongside engineers on real problems, not from interview theater. Startup veteran with a strong eye for what gets a product to market.',
    photo: '/team/cole-dahl.png',
  },
  {
    name: 'Brian Howell',
    title: 'Senior Software Engineer · Game Engineering',
    bio: 'Game engineering specialist with 10+ years shipping titles on Unity and Unreal Engine. Brings real-time rendering, physics, and tight gameplay-loop thinking to non-game products — visualizations, simulators, training platforms, and any UI that has to feel alive at 60fps. Brian also leads technical recruiting from the game industry, bringing in engineers whose performance-tuning instincts translate directly to demanding production workloads.',
    photo: '/team/brian-howell.png',
  },
  {
    name: 'Daniel Baez',
    title: 'Senior Software Engineer · AWS & DevOps',
    bio: "Full-stack web engineer and AWS infrastructure expert with 10+ years across application code and the platforms that run it. Daniel owns the boundary where software meets cloud: VPC topology, IAM policies, CI/CD pipelines, observability, and cost controls — the unglamorous work that keeps production reliable at 3am. Equally fluent shipping React/Node applications and writing the Terraform and AWS CDK that deploy them. The engineer you want when the bottleneck isn't the code, it's everything around it.",
    photo: '/team/daniel-baez.png',
  },
]

// ─────────────────────────────────────────────────────────────
// STACK
// ─────────────────────────────────────────────────────────────

export const stackEntries: StackEntry[] = [
  {
    label: 'JavaScript Web Application',
    category: 'Web · Modern',
    stack: ['React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Redis'],
    reasoning:
      'Next.js gives us server-side rendering, file-based routing, and edge deployments out of the box. TypeScript catches a class of bugs before runtime. PostgreSQL is the default for any relational data — battle-tested, feature-rich, and predictable under load.',
    callout: 'Next.js SSR cuts TTFB by ~40% vs CSR for content-heavy apps.',
  },
  {
    label: 'Microsoft Software Engineering',
    category: 'Enterprise · .NET',
    stack: ['C#', '.NET Core', 'ASP.NET MVC', 'Razor', 'Entity Framework', 'Azure', 'SQL Server'],
    reasoning:
      'For enterprises already invested in the Microsoft ecosystem, the .NET stack delivers unmatched tooling, type safety, and Azure-native deployment. ASP.NET MVC with Razor remains a workhorse for line-of-business apps; Entity Framework abstracts data access without sacrificing query control.',
    callout: '.NET Core handles 7M+ requests/sec on commodity hardware (TechEmpower benchmarks).',
  },
  {
    label: 'Angular / Vue.js Frontend',
    category: 'Web · Enterprise Frontend',
    stack: ['Angular', 'Vue.js', 'TypeScript', 'RxJS', 'Pinia / NgRx'],
    reasoning:
      'When the client mandates Angular (common in enterprise) or Vue.js (common in European and Asian markets), we deliver natively rather than forcing React. Angular shines for large, opinionated apps with strict structure. Vue 3 with the Composition API offers a lighter footprint with the same reactive model.',
    callout: 'Angular is used by 30%+ of Fortune 500 internal applications.',
  },
  {
    label: 'Python Backend & APIs',
    category: 'Backend · Python',
    stack: ['Django', 'FastAPI', 'Flask', 'PostgreSQL', 'Celery', 'Redis'],
    reasoning:
      'Django is the default for batteries-included, admin-heavy products — ORM, auth, and admin panel for free. FastAPI is the choice for async-heavy, type-validated APIs (Pydantic + OpenAPI auto-docs). Flask remains the right call for lightweight microservices where Django would be overkill.',
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
      'Solidity for EVM-compatible smart contracts; ASP.NET Core for off-chain services and orchestration. Hardhat provides the testing and deployment toolchain. Unity enters when on-chain gaming or NFT-driven game economies are part of the scope — the Samurai Warlords stack proved this combination ships.',
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
    category: 'Mobile · Native & Cross-Platform',
    stack: ['React Native', 'Flutter / Dart', 'Swift (iOS)', 'Kotlin (Android)', 'Expo', 'TypeScript'],
    reasoning:
      'React Native with Expo is our default when ~80% code-share with a React web app is the win — fast iteration, OTA updates, single TypeScript codebase. Flutter / Dart is the right call when pixel-perfect custom UI and 60fps animations matter more than web code reuse. We drop to native — Swift for iOS, Kotlin for Android — when the app demands platform-specific APIs (CarPlay, Health, Wallet, AR) or when long-term maintenance favors first-party tooling over a cross-platform layer.',
    callout: 'Flutter ships true 60fps via Skia rendering; React Native powers Instagram, Discord, Shopify, and Tesla.',
  },
  {
    label: 'Serverless & Event-Driven',
    category: 'Architecture · Serverless',
    stack: ['Serverless Framework', 'AWS CDK', 'AWS Lambda', 'EventBridge', 'SQS', 'Step Functions'],
    reasoning:
      'When workloads are spiky, event-shaped, or pay-per-use is the right cost model, we default to serverless. Serverless Framework handles Lambda packaging and deployment with minimal config. AWS CDK gives us typed infrastructure-as-code (TypeScript) when we want richer abstractions than Terraform offers. EventBridge decouples producers from consumers; SQS guarantees delivery; Step Functions orchestrate multi-step workflows without a custom state machine.',
    callout: 'AWS CDK reduces infrastructure code by ~80% vs raw CloudFormation YAML.',
  },
  {
    label: 'Cloud Infrastructure',
    category: 'DevOps · Infrastructure',
    stack: ['AWS', 'Azure', 'Vercel', 'Docker', 'Terraform', 'GitHub Actions'],
    reasoning:
      'AWS for unconstrained scale; Azure when the client is .NET-aligned or has existing Microsoft enterprise agreements; Vercel for Next.js frontends with edge requirements. Terraform encodes infrastructure as version-controlled code. GitHub Actions runs every test, build, and deploy without external CI services.',
    callout: 'Terraform reduces infra drift incidents by 90% in audited environments.',
  },
]

// ─────────────────────────────────────────────────────────────
// ENGINEERING METHODOLOGY
// ─────────────────────────────────────────────────────────────

export const defaultSpecs = [
  {
    title: 'Architecture Decision Records',
    desc: 'Every non-trivial decision (database, framework, deployment topology) is captured in a lightweight ADR. Future engineers know why, not just what.',
  },
  {
    title: 'Data Model Review',
    desc: 'Before any UI is built, the schema is reviewed, normalized, and validated against expected query patterns. Bad schemas compound — we kill them at the source.',
  },
  {
    title: 'API Contract First',
    desc: 'OpenAPI / GraphQL schemas are defined before client code. Frontend and backend work in parallel against the same source of truth.',
  },
  {
    title: 'Definition of Done',
    desc: 'Tests written, observability hooks in place, docs updated, peer reviewed, deployed to staging, sign-off recorded. Nothing ships half-done.',
  },
  {
    title: 'Security Baseline',
    desc: 'Authentication, authorization, input validation, secrets management, and dependency scanning are non-negotiable from sprint one.',
  },
  {
    title: 'Observability by Default',
    desc: "Structured logging, metrics, and distributed tracing wired in before launch. You can't fix what you can't see.",
  },
]

export const iterationStrategies = [
  {
    strategy: 'Agile (Default)',
    when: 'Greenfield products · MVPs · Evolving requirements',
    desc: '2-week sprints, weekly demos, async-first communication. Backlog reprioritized every cycle based on real demos, not status meetings.',
  },
  {
    strategy: 'Waterfall',
    when: 'Regulated industries · Fixed-scope contracts · Compliance-driven work',
    desc: 'Sequential phases with formal sign-offs. Required when budget and timeline are locked, or when audit trails matter (finance, healthcare).',
  },
  {
    strategy: 'Hybrid',
    when: 'Enterprise integrations · Migrations · Phased rollouts',
    desc: 'Discovery and architecture are waterfall (locked specs); build and iterate phases are agile. Best of both worlds when stakes are high.',
  },
]

export const sdlcPhases = [
  {
    num: '01',
    title: 'Discover',
    artifacts: 'Stakeholder interviews · Goals doc · Risk register',
    desc: 'We learn the business problem before proposing a technical solution. Skipping this is how teams ship the wrong thing perfectly.',
  },
  {
    num: '02',
    title: 'Architect',
    artifacts: 'ADRs · Data model · API contracts · Infrastructure diagram',
    desc: 'Design the system before writing code. Reversible decisions can be cheap; foundational ones rarely are.',
  },
  {
    num: '03',
    title: 'Build',
    artifacts: 'Sprint demos · Storybook · Pull request reviews',
    desc: 'Engineers build against the spec, demo every cycle, and revise. Quality is built in, not inspected in.',
  },
  {
    num: '04',
    title: 'Test',
    artifacts: 'Unit + integration coverage · E2E flows · Performance benchmarks',
    desc: 'Tests are part of the build, not an afterthought. Coverage targets are agreed upfront and enforced in CI.',
  },
  {
    num: '05',
    title: 'Ship',
    artifacts: 'Staging sign-off · Runbooks · Rollback plan',
    desc: 'Deployments are boring on purpose. Every release has a documented rollback and a known healthy baseline.',
  },
  {
    num: '06',
    title: 'Sustain',
    artifacts: 'SLO dashboards · Incident reviews · Continuous improvement',
    desc: "We don't disappear at launch. Observability tells us what production reality looks like, and we keep tuning.",
  },
]

// ─────────────────────────────────────────────────────────────
// NAVIGATION INDEX (top-level pages)
// ─────────────────────────────────────────────────────────────

const navPages: SearchableItem[] = [
  {id: 'home', kind: 'page', title: 'Home', description: 'Global Nexus — software engineering firm.', path: '/', keywords: 'global nexus home landing software engineering'},
  {id: 'about', kind: 'page', title: 'About', description: 'Who we are — software engineering firm based in Colbert, GA.', path: '/about', keywords: 'about company story team mission values colbert georgia'},
  {id: 'proof', kind: 'page', title: 'Portfolio', description: 'Case studies and client work.', path: '/proof', keywords: 'portfolio proof case studies projects clients work'},
  {id: 'engineering', kind: 'page', title: 'Engineering Methodology', description: 'Default specifications, iteration strategy, and SDLC.', path: '/engineering', keywords: 'engineering methodology specifications iteration agile waterfall sdlc software development lifecycle'},
  {id: 'stack', kind: 'page', title: 'Our Stack', description: 'Default technology choices by project type, with reasoning.', path: '/stack', keywords: 'stack technologies tech defaults react angular vue node python django fastapi flask nestjs prisma c# .net azure aws lambda serverless flutter swift kotlin'},
  {id: 'team', kind: 'page', title: 'Team', description: 'Senior engineers — 10+ years each.', path: '/team', keywords: 'team people engineers david milan cole brian daniel staff directory'},
  {id: 'process', kind: 'page', title: 'Process', description: 'How we operate — from intake to ongoing engagement.', path: '/process', keywords: 'process methodology operating model engagement flow'},
  {id: 'contact', kind: 'page', title: 'Contact', description: 'Start a project, talk to engineers.', path: '/contact', keywords: 'contact engage email phone reach out get in touch start project'},
  {id: 'blog', kind: 'page', title: 'Blog', description: 'Articles and posts.', path: '/blog', keywords: 'blog articles posts insights writing thought leadership'},
  {id: 'thinking', kind: 'page', title: 'Thinking', description: 'Long-form essays and opinions.', path: '/thinking', keywords: 'thinking essays opinions deep insights perspectives'},
  {id: 'privacy', kind: 'page', title: 'Privacy Policy', description: 'How we handle your data.', path: '/privacy', keywords: 'privacy policy data legal'},
  {id: 'terms', kind: 'page', title: 'Terms of Service', description: 'Legal terms.', path: '/terms', keywords: 'terms of service legal agreement'},
]

// ─────────────────────────────────────────────────────────────
// UNIFIED SEARCH INDEX
// ─────────────────────────────────────────────────────────────

/** Returns all locally-indexed items (everything except Sanity blog content). */
export function getAllSearchable(): SearchableItem[] {
  const items: SearchableItem[] = [...navPages]

  for (const p of portfolioProjects) {
    items.push({
      id: `portfolio:${p.id}`,
      kind: 'portfolio',
      title: p.name,
      description: p.description,
      path: `/proof#${p.id}`,
      keywords: `${p.role} ${p.category} ${p.tech.join(' ')} ${p.testimonial.name} ${p.testimonial.title}`,
      tags: [p.category, ...p.tech],
    })
  }

  for (const m of teamMembers) {
    items.push({
      id: `team:${m.name.toLowerCase().replace(/\s+/g, '-')}`,
      kind: 'team',
      title: m.name,
      description: `${m.title} — ${m.bio.slice(0, 140)}…`,
      path: '/team',
      keywords: `${m.title} senior engineer ${m.bio}`,
    })
  }

  for (const s of stackEntries) {
    items.push({
      id: `stack:${s.label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      kind: 'stack',
      title: s.label,
      description: s.reasoning,
      path: '/stack',
      keywords: `${s.category} ${s.stack.join(' ')} ${s.callout}`,
      tags: s.stack,
    })
  }

  for (const e of defaultSpecs) {
    items.push({
      id: `eng:spec:${e.title.toLowerCase().replace(/\s+/g, '-')}`,
      kind: 'engineering',
      title: e.title,
      description: e.desc,
      path: '/engineering',
      keywords: 'specification engineering default standard',
    })
  }
  for (const e of iterationStrategies) {
    items.push({
      id: `eng:iter:${e.strategy.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      kind: 'engineering',
      title: e.strategy,
      description: e.desc,
      path: '/engineering',
      keywords: `iteration strategy ${e.when}`,
    })
  }
  for (const e of sdlcPhases) {
    items.push({
      id: `eng:sdlc:${e.num}`,
      kind: 'engineering',
      title: `SDLC ${e.num} — ${e.title}`,
      description: e.desc,
      path: '/engineering',
      keywords: `sdlc software development lifecycle phase ${e.artifacts}`,
    })
  }

  return items
}

'use client'

import {useState} from 'react'
import Link from 'next/link'

interface Project {
  id: string
  name: string
  url: string
  role: string
  category: string
  tech: string[]
  description: string
  highlights: string[]
  gradient: string
  accentColor: string
  iconLetter: string
  screenshot?: string
  testimonial: {
    quote: string
    name: string
    title: string
  }
}

const projects: Project[] = [
  {
    id: 'neighbors',
    name: 'Neighbors',
    url: 'https://neighbors.co',
    role: 'Full Stack Development & Design',
    category: 'Marketplace',
    tech: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL', 'Heroku'],
    description: 'A web platform connecting local chefs with nearby customers looking to order home-cooked dishes for parties, events, and gatherings. Delivers a seamless experience for browsing menus, placing orders, and supporting local culinary talent.',
    highlights: [
      'Led full-stack development and UI/UX design end-to-end',
      'Built responsive ordering flow with real-time availability',
      'Architected PostgreSQL schema for chef profiles and order management',
      'Deployed and maintained on Heroku with CI pipeline',
    ],
    gradient: 'linear-gradient(135deg, #f97316 0%, #ea580c 50%, #c2410c 100%)',
    accentColor: '#f97316',
    iconLetter: 'N',
    screenshot: '/portfolio/neighbors.jpg',
    testimonial: {
      quote: "Global Nexus delivered our full platform from scratch — frontend, backend, and database — with a level of craftsmanship we hadn't seen before. The checkout flow alone boosted our order conversions by 40%.",
      name: 'Chris Sullivan',
      title: 'Founder, Neighbors',
    },
  },
  {
    id: 'featured-customers',
    name: 'Featured Customers',
    url: 'https://featuredcustomers.com',
    role: 'Full Stack Development',
    category: 'B2B SaaS',
    tech: ['React.js', 'TypeScript', 'React Query', 'React Hook Form', 'Tailwind CSS', 'Python', 'Django REST', 'PostgreSQL', 'Digital Ocean'],
    description: 'A content marketing platform that showcases verified customer success stories, case studies, and testimonials for B2B companies. Implemented dynamic frontend components, API integrations, and RESTful Django endpoints.',
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
      quote: "Their React and Django work was impeccable. Complex API integrations, form systems, responsive UI — all delivered cleanly and on schedule. They became an extension of our team within the first week.",
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
    description: "Columbia University's trusted health Q&A platform aimed at college students and young adults. Built and styled reusable React components, integrated with a Gatsby static frontend powered by Drupal CMS and GraphQL.",
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
      quote: "Rebuilding our health platform in Gatsby with Drupal CMS integration was a major undertaking. Global Nexus handled it with precision. The new design system they built cut our development cycle in half.",
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
    description: 'A tech talent marketplace connecting developers with global opportunities. Developed and refined frontend components using Next.js and TypeScript, contributed to a modular design system with Storybook, and implemented responsive, accessible UI.',
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
      quote: "Fast, quality work with zero hand-holding needed. Their Next.js component library fit seamlessly into our design system, and the Storybook documentation they left behind has been invaluable.",
      name: 'Dave Messinger',
      title: 'CTO & Co-Founder, Torc',
    },
  },
  {
    id: 'mindtrip',
    name: 'Mindtrip',
    url: 'https://mindtrip.ai',
    role: 'Full Stack & AI Development',
    category: 'AI / Travel',
    tech: ['Next.js', 'FastAPI', 'Python', 'PostgreSQL (AWS RDS)', 'Redis', 'Pinecone', 'LangChain', 'Vercel AI SDK', 'LlamaIndex'],
    description: 'An AI-powered travel assistant that personalizes trip planning through conversational AI. Built and optimized backend services, implemented vector search with Pinecone, and enabled semantic retrieval with LangChain and LlamaIndex.',
    highlights: [
      'Led full stack development and AI component integration',
      'Built production backend services with FastAPI and Python',
      'Implemented vector search (Pinecone) and AI reasoning (LangChain, LlamaIndex)',
      'Integrated Redis caching and PostgreSQL via AWS RDS for persistent storage',
    ],
    gradient: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 50%, #0e7490 100%)',
    accentColor: '#06b6d4',
    iconLetter: 'M',
    screenshot: '/portfolio/mindtrip.jpg',
    testimonial: {
      quote: "We needed someone who could bridge modern AI tooling with production-grade backend infrastructure. Global Nexus delivered beyond expectations — the LangChain and Pinecone integration they built is the backbone of our product today.",
      name: 'Andy Moss',
      title: 'Co-Founder & CEO, Mindtrip',
    },
  },
  {
    id: 'polarace',
    name: 'Polarace',
    url: 'https://polarace.gg',
    role: 'Full Stack Development',
    category: 'Gaming / Creator',
    tech: ['React.js', 'Emotion', 'React Router', 'TypeScript', 'Nest.js', 'Prisma', 'MongoDB', 'AWS'],
    description: 'A job and collaboration platform tailored for content creators in the gaming and streaming community. Built responsive frontend interfaces, developed secure backend APIs with Nest.js, and architected the data layer with Prisma and MongoDB.',
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
      quote: "From Nest.js APIs to React UI, everything was solid. They understood our creator audience and built features that felt native to the gaming community. Our user signups tripled in the quarter after launch.",
      name: 'Derek Dobosz',
      title: 'CEO, Polar Ace',
    },
  },
  {
    id: 'samurai-warlords',
    name: 'Samurai Warlords',
    url: 'https://samuraiwarlords.com',
    role: 'Full Stack & Blockchain Development',
    category: 'Web3 / Gaming',
    tech: ['ASP.NET Core', 'C#', 'Unity', 'Solidity', 'ERC-721', 'ERC-1155', 'Base Chain', 'Web3.js'],
    description: 'An expansive Web3 strategy and combat ecosystem built on the Base blockchain. Developed the full-stack platform in ASP.NET Core and C#, deployed NFT smart contracts, and shipped a Samurai Chess game in Unity — bridging traditional gaming with blockchain-powered play-to-earn mechanics for a dual-token economy.',
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
      quote: "Global Nexus brought together our smart contracts, ASP.NET backend, and Unity game into one cohesive platform. The staking dashboard and NFT marketplace alone drove our Genesis collection to sell out within 48 hours of launch.",
      name: 'RyuZanshin (Niro)',
      title: 'CEO, Samurai Warlords',
    },
  },
  {
    id: 'foh-boh',
    name: 'foh&boh',
    url: 'https://fohandboh.com',
    role: 'Full Stack Development',
    category: 'Hospitality Tech',
    tech: ['React', 'Node.js', 'PostgreSQL', 'AWS SES', 'AWS S3', 'Twilio', 'Cloudflare', 'WordPress'],
    description: "A SaaS talent marketplace built for the hospitality and retail industries. Engineered the full hiring platform — from sourcing and job board distribution through applicant tracking, automated scheduling, offer letters, and onboarding — helping 1,000+ brands like Grand Hyatt, Omni Hotels, and PF Chang's cut average hire time from 10 days to 3.",
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
      quote: "We needed a platform that could handle the chaos of hospitality hiring — high volume, fast turnover, and operators who don't have time to waste. Global Nexus delivered exactly that. The SMS outreach and job board distribution alone transformed how our clients hire.",
      name: 'Halle Hayes',
      title: 'CEO & Co-Founder, foh&boh',
    },
  },
  {
    id: 'trend',
    name: 'Trend',
    url: 'https://trend.io',
    role: 'Full Stack Development & Design',
    category: 'Creator Economy',
    tech: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL', 'AWS S3', 'AWS CloudFront', 'Stripe'],
    description: 'A creator marketplace and UGC platform where brands commission custom photo and video content from creators and repurpose it into shoppable media. Designed and developed full-stack marketplace workflows, payments, and media infrastructure.',
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
      quote: "What impressed us most was the product thinking behind the code. The S3 upload pipeline, shoppable video feed, and Stripe credit system — each piece was architected for scale. Global Nexus thinks like a product team, not just engineers.",
      name: 'Joel Otterstrom',
      title: 'Founder & CEO, Trend',
    },
  },
]

const categories = ['All', 'Marketplace', 'B2B SaaS', 'Health Tech', 'Hospitality Tech', 'Tech Platform', 'AI / Travel', 'Web3 / Gaming', 'Gaming / Creator', 'Creator Economy']

function ProjectCard({project}: {project: Project}) {
  const [flipped, setFlipped] = useState(false)

  return (
    <div className="flex flex-col rounded-2xl overflow-hidden border border-black/5 shadow-sm bg-white">
      {/* Screenshot / fallback gradient */}
      <div className="relative h-52 overflow-hidden">
        {project.screenshot ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.screenshot}
              alt={`${project.name} website screenshot`}
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0" style={{background: 'linear-gradient(to bottom, transparent 55%, rgba(0,0,0,0.55) 100%)'}} />
          </>
        ) : (
          <>
            <div className="absolute inset-0" style={{background: project.gradient}} />
            <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)', backgroundSize: '40px 40px'}} />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-5xl font-bold text-white/20 mb-2 select-none" style={{fontFamily: 'var(--font-display)', letterSpacing: '-0.05em'}}>{project.iconLetter}</div>
                <div className="text-white font-bold text-2xl" style={{fontFamily: 'var(--font-display)'}}>{project.name}</div>
                <div className="text-white/60 text-xs mt-1" style={{fontFamily: 'var(--font-mono)'}}>{project.url.replace('https://', '')}</div>
              </div>
            </div>
          </>
        )}
        <div className="absolute top-3 right-3">
          <span
            className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full"
            style={{background: 'rgba(0,0,0,0.45)', color: 'white', fontFamily: 'var(--font-body)', backdropFilter: 'blur(4px)'}}
          >
            {project.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <h3 className="text-xl font-bold" style={{fontFamily: 'var(--font-display)'}}>{project.name}</h3>
            <p className="text-xs font-semibold mt-0.5 uppercase tracking-wide" style={{color: project.accentColor, fontFamily: 'var(--font-body)'}}>{project.role}</p>
          </div>
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
            style={{background: `${project.accentColor}15`, color: project.accentColor}}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
          </a>
        </div>

        <p className="text-sm leading-relaxed mb-4 flex-1" style={{color: 'oklch(0.45 0.02 50)', fontFamily: 'var(--font-body)'}}>
          {project.description}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tech.map((t) => (
            <span
              key={t}
              className="text-[10px] font-medium px-2 py-0.5 rounded"
              style={{background: `${project.accentColor}12`, color: project.accentColor, fontFamily: 'var(--font-mono)'}}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Toggle highlights / testimonial */}
        <div className="border-t border-black/5 pt-4">
          <div className="flex gap-2 mb-3">
            <button
              onClick={() => setFlipped(false)}
              className="text-xs font-semibold px-3 py-1 rounded-md transition-all"
              style={{
                background: !flipped ? project.accentColor : 'transparent',
                color: !flipped ? 'white' : 'oklch(0.5 0.02 50)',
                fontFamily: 'var(--font-body)',
              }}
            >
              Highlights
            </button>
            <button
              onClick={() => setFlipped(true)}
              className="text-xs font-semibold px-3 py-1 rounded-md transition-all"
              style={{
                background: flipped ? project.accentColor : 'transparent',
                color: flipped ? 'white' : 'oklch(0.5 0.02 50)',
                fontFamily: 'var(--font-body)',
              }}
            >
              Client Feedback
            </button>
          </div>

          {!flipped ? (
            <ul className="space-y-1.5">
              {project.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-2 text-xs leading-relaxed" style={{color: 'oklch(0.4 0.02 50)', fontFamily: 'var(--font-body)'}}>
                  <div className="w-1 h-1 rounded-full shrink-0 mt-1.5" style={{background: project.accentColor}} />
                  {h}
                </li>
              ))}
            </ul>
          ) : (
            <div className="rounded-lg p-4" style={{background: `${project.accentColor}08`, border: `1px solid ${project.accentColor}20`}}>
              <p className="text-xs leading-relaxed italic mb-3" style={{color: 'oklch(0.4 0.02 50)', fontFamily: 'var(--font-body)'}}>
                &ldquo;{project.testimonial.quote}&rdquo;
              </p>
              <p className="text-xs font-bold" style={{color: 'oklch(0.25 0.02 50)', fontFamily: 'var(--font-display)'}}>{project.testimonial.name}</p>
              <p className="text-[10px] mt-0.5" style={{color: project.accentColor, fontFamily: 'var(--font-body)'}}>{project.testimonial.title}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function PortfolioClient() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category === activeCategory)

  return (
    <>
      {/* ═══ HERO ═══ */}
      <section
        className="relative pt-28 pb-16 sm:pt-36 sm:pb-20 overflow-hidden"
        style={{background: 'linear-gradient(135deg, oklch(0.12 0.01 250) 0%, oklch(0.16 0.02 260) 50%, oklch(0.12 0.01 250) 100%)'}}
      >
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full opacity-15 pointer-events-none" style={{background: 'oklch(0.55 0.15 30)', filter: 'blur(80px)'}} />
        <div className="absolute bottom-0 left-0 w-[250px] h-[250px] rounded-full opacity-10 pointer-events-none" style={{background: 'oklch(0.82 0.15 75)', filter: 'blur(80px)'}} />

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8">
          <span
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-medium uppercase tracking-[0.2em] mb-6"
            style={{border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-body)'}}
          >
            Portfolio
          </span>
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-white max-w-3xl"
            style={{fontFamily: 'var(--font-display)'}}
          >
            Platforms We&apos;ve{' '}
            <span style={{color: 'oklch(0.82 0.15 75)'}}>Built & Shipped</span>
          </h1>
          <p
            className="mt-6 text-base sm:text-lg leading-relaxed max-w-xl"
            style={{color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-body)'}}
          >
            50+ projects delivered across AI, health tech, creator economy, gaming, and B2B SaaS. 7 featured case studies below — real code, real clients, real results.
          </p>

          <div className="mt-8 grid grid-cols-3 sm:grid-cols-3 gap-6 max-w-md">
            {[
              {value: '50+', label: 'Projects Delivered'},
              {value: '100%', label: 'Client Satisfaction'},
              {value: 'Colbert', label: 'Georgia'},
            ].map((s) => (
              <div key={s.label}>
                <div className="text-2xl sm:text-3xl font-bold" style={{color: 'oklch(0.82 0.15 75)', fontFamily: 'var(--font-mono)'}}>{s.value}</div>
                <div className="mt-1 text-[10px] uppercase tracking-wider" style={{color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-body)'}}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FILTER + GRID ═══ */}
      <section className="section-light py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">

          {/* Category filter */}
          <div className="flex flex-wrap gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="text-xs font-semibold px-4 py-2 rounded-full transition-all"
                style={{
                  background: activeCategory === cat ? 'oklch(0.55 0.15 30)' : 'rgba(0,0,0,0.05)',
                  color: activeCategory === cat ? 'white' : 'oklch(0.45 0.02 50)',
                  fontFamily: 'var(--font-body)',
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Project grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="py-16 sm:py-20" style={{background: '#0d1117'}}>
        <div className="max-w-4xl mx-auto px-5 sm:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4" style={{fontFamily: 'var(--font-display)'}}>
            Want to be next?
          </h2>
          <p className="text-white/60 text-base leading-relaxed mb-8 max-w-xl mx-auto" style={{fontFamily: 'var(--font-body)'}}>
            Tell us what you&apos;re building and we&apos;ll tell you exactly how we&apos;d approach it.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-md text-sm font-semibold text-white transition-all hover:opacity-90"
            style={{background: 'oklch(0.55 0.15 30)', fontFamily: 'var(--font-body)'}}
          >
            Start a Conversation
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
        </div>
      </section>
    </>
  )
}

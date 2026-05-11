import type {Metadata} from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Service | Global Nexus',
  description: 'Terms governing use of the Global Nexus website.',
}

const sections = [
  {
    title: '1. Acceptance of Terms',
    body: 'By accessing and using this website (Global Nexus.com), you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use this website.',
  },
  {
    title: '2. Description of Services',
    body: 'Global Nexus, Inc. provides enterprise advisory services including IT sourcing intelligence, growth strategy, Web3 advisory, and impact consulting. This website provides information about our services, thought leadership content, and contact mechanisms. The content on this site is for informational purposes and does not constitute professional advice.',
  },
  {
    title: '3. Intellectual Property',
    body: 'All content on this website — including text, graphics, logos, images, data compilations, and software — is the property of Global Nexus, Inc. or its content suppliers and is protected by intellectual property laws. The Global Nexus name, logo, SPY Index, Flow Circuit, and related marks are trademarks of Global Nexus, Inc.',
  },
  {
    title: '4. Use of Content',
    body: 'You may view, download, and print content from this website for personal, non-commercial use only. You may not reproduce, distribute, modify, or create derivative works from any content without prior written consent from Global Nexus, Inc. Blog articles may be shared with proper attribution and a link to the original post.',
  },
  {
    title: '5. User Submissions',
    body: 'When you submit information through our contact forms, you grant Global Nexus the right to use that information to respond to your inquiry and provide relevant services. We will handle your information in accordance with our Privacy Policy.',
  },
  {
    title: '6. Disclaimer of Warranties',
    body: 'This website and its content are provided "as is" without warranties of any kind, either express or implied. Global Nexus does not warrant that the website will be uninterrupted, error-free, or free of viruses or other harmful components. Past performance data and case studies referenced on this site do not guarantee future results.',
  },
  {
    title: '7. Limitation of Liability',
    body: 'Global Nexus, Inc. shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from your use of this website or reliance on any information provided herein.',
  },
  {
    title: '8. External Links',
    body: 'This website may contain links to third-party websites. Global Nexus is not responsible for the content or privacy practices of those sites. Links are provided for convenience and do not imply endorsement.',
  },
  {
    title: '9. Governing Law',
    body: 'These terms shall be governed by and construed in accordance with the laws of the State of California, without regard to its conflict of law provisions.',
  },
  {
    title: '10. Contact',
    body: null,
    contact: true,
  },
]

export default function TermsPage() {
  return (
    <main>
      {/* Hero */}
      <section
        className="relative pt-28 pb-20 sm:pt-36 sm:pb-28 overflow-hidden"
        style={{background: 'linear-gradient(135deg, #1e3a5f 0%, #254b78 50%, #1e3a5f 100%)'}}
      >
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full opacity-10 pointer-events-none" style={{background: 'oklch(0.55 0.22 260)', filter: 'blur(80px)'}} />
        <div className="absolute bottom-0 left-0 w-[250px] h-[250px] rounded-full opacity-10 pointer-events-none" style={{background: 'oklch(0.82 0.15 75)', filter: 'blur(80px)'}} />

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8">
          <div className="mb-6">
            <span
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-white/10 bg-white/5"
              style={{fontFamily: 'var(--font-body)'}}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{background: 'oklch(0.55 0.22 260)'}} />
              <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-white/50">Legal</span>
            </span>
          </div>

          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-white max-w-3xl"
            style={{fontFamily: 'var(--font-display)'}}
          >
            Terms of Service
          </h1>
          <p
            className="mt-6 text-base sm:text-lg text-white/50 leading-relaxed max-w-2xl"
            style={{fontFamily: 'var(--font-body)'}}
          >
            Terms governing use of this website
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20" style={{background: 'var(--warm-bg)'}}>
        <div className="max-w-3xl mx-auto px-5 sm:px-8 space-y-10">
          <p
            className="text-sm uppercase tracking-widest"
            style={{color: 'var(--text-mid)', fontFamily: 'var(--font-mono)'}}
          >
            Last Updated: April 2026
          </p>

          {sections.map((s) => (
            <div key={s.title} className="border-b pb-10 last:border-0" style={{borderColor: "rgba(139,69,19,0.1)"}}>
              <h2
                className="text-2xl font-bold mb-4"
                style={{color: 'var(--text-dark)', fontFamily: 'var(--font-display)'}}
              >
                {s.title}
              </h2>
              {s.contact ? (
                <p className="text-base leading-relaxed" style={{color: 'var(--text-mid)', fontFamily: 'var(--font-body)'}}>
                  For questions about these terms, contact us at:{' '}
                  <a
                    href="mailto:hello@globalnexus.one"
                    className="hover:underline font-medium"
                    style={{color: 'var(--dark)'}}
                  >
                    hello@globalnexus.one
                  </a>
                </p>
              ) : (
                <p className="text-base leading-relaxed" style={{color: 'var(--text-mid)', fontFamily: 'var(--font-body)'}}>
                  {s.body}
                </p>
              )}
            </div>
          ))}

          <div className="pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="text-sm" style={{color: 'var(--text-mid)', fontFamily: 'var(--font-body)'}}>
              Global Nexus, Inc. · Colbert, GA
            </p>
            <Link
              href="/privacy"
              className="text-sm font-semibold hover:underline"
              style={{color: 'var(--dark)', fontFamily: 'var(--font-body)'}}
            >
              Privacy Policy →
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

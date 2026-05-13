import Link from 'next/link'
import Logo from '@/components/shared/Logo'

const navLinks = [
  {label: 'Portfolio', href: '/proof'},
  {label: 'About', href: '/about'},
  {label: 'Contact', href: '/contact'},
]

const companyLinks = [
  {label: 'Process', href: '/process'},
  {label: 'Privacy Policy', href: '/privacy'},
  {label: 'Terms of Service', href: '/terms'},
]

export default function Footer() {
  return (
    <footer style={{background: 'var(--dark)'}} className="text-white/60 py-16">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-12">

          {/* Column 1 — Brand */}
          <div>
            <Link href="/" className="block mb-4">
              <Logo variant="light" size="md" />
            </Link>
            <p className="text-xs text-white/30 mb-3 leading-relaxed" style={{fontFamily: 'var(--font-body)'}}>
              Software engineering & digital advisory. Based in Colbert, GA.
            </p>
            <a
              href="mailto:hello@globalnexus.one"
              className="text-xs text-white/40 hover:text-white transition-colors block mb-1"
              style={{fontFamily: 'var(--font-body)'}}
            >
              hello@globalnexus.one
            </a>
            <a
              href="tel:+19042995409"
              className="text-xs text-white/40 hover:text-white transition-colors block"
              style={{fontFamily: 'var(--font-body)'}}
            >
              +1 (904) 299-5409
            </a>
          </div>

          {/* Column 2 — Navigate */}
          <div>
            <h4
              className="text-xs font-semibold uppercase tracking-[0.2em] text-white/30 mb-4"
              style={{fontFamily: 'var(--font-body)'}}
            >
              Navigate
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 hover:text-white transition-colors"
                    style={{fontFamily: 'var(--font-body)'}}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Company */}
          <div>
            <h4
              className="text-xs font-semibold uppercase tracking-[0.2em] text-white/30 mb-4"
              style={{fontFamily: 'var(--font-body)'}}
            >
              Company
            </h4>
            <ul className="space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 hover:text-white transition-colors"
                    style={{fontFamily: 'var(--font-body)'}}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30" style={{fontFamily: 'var(--font-body)'}}>
            &copy; {new Date().getFullYear()} Global Nexus. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-xs text-white/30 hover:text-white/50 transition-colors" style={{fontFamily: 'var(--font-body)'}}>
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-xs text-white/30 hover:text-white/50 transition-colors" style={{fontFamily: 'var(--font-body)'}}>
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

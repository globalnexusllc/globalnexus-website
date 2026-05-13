'use client'

import Link from 'next/link'
import {usePathname} from 'next/navigation'
import {useState, useEffect, useRef} from 'react'
import {ChevronDown} from 'lucide-react'
import Logo from '@/components/shared/Logo'
import SiteSearch from '@/components/shared/SiteSearch'

const craftItems = [
  {label: 'Engineering', href: '/engineering', desc: 'Methodology & SDLC'},
  {label: 'Stack', href: '/stack', desc: 'Default technologies'},
  {label: 'Team', href: '/team', desc: 'Senior engineers'},
]

const navItems = [
  {label: 'Portfolio', href: '/proof'},
  {label: 'About', href: '/about'},
  {label: 'Contact', href: '/contact'},
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [craftOpen, setCraftOpen] = useState(false)
  const [mobileCraftOpen, setMobileCraftOpen] = useState(false)
  const craftRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, {passive: true})
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setCraftOpen(false)
    setMobileCraftOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!craftOpen) return
    const onClickOutside = (e: MouseEvent) => {
      if (craftRef.current && !craftRef.current.contains(e.target as Node)) {
        setCraftOpen(false)
      }
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [craftOpen])

  const dark = scrolled
  const navTextColor = dark ? 'oklch(0.35 0.03 50)' : 'rgba(255,255,255,0.8)'
  const navHoverColor = dark ? 'oklch(0.18 0.03 50)' : '#ffffff'
  const mobileIconColor = dark ? 'oklch(0.18 0.03 50)' : '#ffffff'
  const craftActive = craftItems.some((c) => pathname?.startsWith(c.href))

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        dark
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-black/5'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between h-16 sm:h-20">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <Logo variant={dark ? 'dark' : 'light'} size="md" />
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-7">
          <Link
            href="/proof"
            className="text-sm font-medium tracking-wide uppercase transition-colors duration-300"
            style={{color: navTextColor, fontFamily: 'var(--font-body)'}}
            onMouseEnter={e => (e.currentTarget.style.color = navHoverColor)}
            onMouseLeave={e => (e.currentTarget.style.color = navTextColor)}
          >
            Portfolio
          </Link>

          {/* Craft dropdown */}
          <div ref={craftRef} className="relative">
            <button
              type="button"
              onClick={() => setCraftOpen((o) => !o)}
              className="flex items-center gap-1.5 text-sm font-medium tracking-wide uppercase transition-colors duration-300"
              style={{color: craftActive ? navHoverColor : navTextColor, fontFamily: 'var(--font-body)'}}
              onMouseEnter={e => (e.currentTarget.style.color = navHoverColor)}
              onMouseLeave={e => !craftActive && (e.currentTarget.style.color = navTextColor)}
              aria-expanded={craftOpen}
              aria-haspopup="true"
            >
              Craft
              <ChevronDown size={14} className={`transition-transform duration-200 ${craftOpen ? 'rotate-180' : ''}`} />
            </button>

            {craftOpen && (
              <div
                className="absolute top-full left-1/2 -translate-x-1/2 mt-3 min-w-[240px] rounded-xl overflow-hidden"
                style={{
                  background: '#ffffff',
                  border: '1px solid rgba(30,58,95,0.08)',
                  boxShadow: '0 10px 30px rgba(30,58,95,0.12)',
                }}
              >
                {craftItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block px-5 py-3.5 transition-colors"
                    style={{fontFamily: 'var(--font-body)'}}
                    onMouseEnter={e => (e.currentTarget.style.background = 'rgba(30,58,95,0.04)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                    onClick={() => setCraftOpen(false)}
                  >
                    <div className="text-sm font-semibold" style={{color: 'var(--text-dark)'}}>
                      {item.label}
                    </div>
                    <div className="text-[11px] mt-0.5" style={{color: 'var(--text-mid)'}}>
                      {item.desc}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {navItems.slice(1).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium tracking-wide uppercase transition-colors duration-300"
              style={{color: navTextColor, fontFamily: 'var(--font-body)'}}
              onMouseEnter={e => (e.currentTarget.style.color = navHoverColor)}
              onMouseLeave={e => (e.currentTarget.style.color = navTextColor)}
            >
              {item.label}
            </Link>
          ))}

          <SiteSearch scrolled={dark} />

          <Link
            href="/contact"
            className="ml-2 px-5 py-2.5 rounded-md text-sm font-semibold transition-all duration-300 shadow-sm"
            style={{
              background: 'oklch(0.82 0.15 75)',
              color: 'oklch(0.18 0.03 50)',
              fontFamily: 'var(--font-body)',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'oklch(0.78 0.16 75)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'oklch(0.82 0.15 75)')}
          >
            Get In Touch
          </Link>
        </div>

        {/* Mobile toggle */}
        <div className="lg:hidden flex items-center gap-2">
          <SiteSearch scrolled={dark} />
          <button
            className="p-3 transition-colors"
            style={{color: mobileIconColor}}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-black/5 shadow-lg">
          <div className="px-5 py-6 space-y-1">
            <Link
              href="/proof"
              className="block px-3 py-3 text-sm font-medium rounded-md transition-colors"
              style={{color: 'oklch(0.18 0.03 50)', fontFamily: 'var(--font-body)'}}
              onClick={() => setMobileOpen(false)}
            >
              Portfolio
            </Link>

            {/* Craft accordion */}
            <div>
              <button
                type="button"
                className="w-full flex items-center justify-between px-3 py-3 text-sm font-medium rounded-md transition-colors"
                style={{color: 'oklch(0.18 0.03 50)', fontFamily: 'var(--font-body)'}}
                onClick={() => setMobileCraftOpen((o) => !o)}
                aria-expanded={mobileCraftOpen}
              >
                Craft
                <ChevronDown size={16} className={`transition-transform duration-200 ${mobileCraftOpen ? 'rotate-180' : ''}`} />
              </button>
              {mobileCraftOpen && (
                <div className="pl-3 mt-1 space-y-0.5">
                  {craftItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block px-3 py-2.5 text-sm rounded-md transition-colors"
                      style={{color: 'oklch(0.35 0.03 50)', fontFamily: 'var(--font-body)'}}
                      onClick={() => setMobileOpen(false)}
                    >
                      → {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {navItems.slice(1).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-3 py-3 text-sm font-medium rounded-md transition-colors"
                style={{color: 'oklch(0.18 0.03 50)', fontFamily: 'var(--font-body)'}}
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-3">
              <Link
                href="/contact"
                className="block text-center px-5 py-3 rounded-md text-sm font-semibold"
                style={{
                  background: 'oklch(0.82 0.15 75)',
                  color: 'oklch(0.18 0.03 50)',
                  fontFamily: 'var(--font-body)',
                }}
                onClick={() => setMobileOpen(false)}
              >
                Get In Touch
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

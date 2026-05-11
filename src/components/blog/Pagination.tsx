import Link from 'next/link'

interface PaginationProps {
  currentPage: number
  totalPages: number
  basePath: string
  variant?: 'dark' | 'light'
}

export default function Pagination({currentPage, totalPages, basePath, variant = 'dark'}: PaginationProps) {
  if (totalPages <= 1) return null

  const isLight = variant === 'light'

  const inactiveStyle = isLight
    ? {background: '#ffffff', color: 'var(--text-mid)', border: '1px solid rgba(30,58,95,0.15)', fontFamily: 'var(--font-body)'}
    : {background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.08)', fontFamily: 'var(--font-body)'}

  const activeStyle = {background: 'var(--dark)', color: '#ffffff', fontFamily: 'var(--font-body)'}

  // Build visible page numbers: always show first, last, current ±1, with ellipsis gaps
  const pages: (number | 'ellipsis')[] = []
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
      pages.push(i)
    } else if (pages[pages.length - 1] !== 'ellipsis') {
      pages.push('ellipsis')
    }
  }

  return (
    <nav aria-label="Pagination" className="mt-16">
      {/* Mobile: Prev / Page X of Y / Next */}
      <div className="flex sm:hidden items-center justify-between gap-3">
        {currentPage > 1 ? (
          <Link
            href={`${basePath}?page=${currentPage - 1}`}
            className="flex-1 text-center py-3 rounded-md text-sm font-semibold transition-all hover:opacity-80"
            style={inactiveStyle}
          >
            ← Previous
          </Link>
        ) : (
          <span className="flex-1" />
        )}

        <span
          className="text-xs shrink-0"
          style={{color: isLight ? 'var(--text-mid)' : 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-body)'}}
        >
          {currentPage} / {totalPages}
        </span>

        {currentPage < totalPages ? (
          <Link
            href={`${basePath}?page=${currentPage + 1}`}
            className="flex-1 text-center py-3 rounded-md text-sm font-semibold transition-all hover:opacity-80"
            style={inactiveStyle}
          >
            Next →
          </Link>
        ) : (
          <span className="flex-1" />
        )}
      </div>

      {/* Tablet+: full page numbers with ellipsis */}
      <div className="hidden sm:flex flex-wrap justify-center gap-2">
        {currentPage > 1 && (
          <Link
            href={`${basePath}?page=${currentPage - 1}`}
            className="px-5 py-2.5 rounded-md text-sm font-medium transition-all hover:opacity-80"
            style={inactiveStyle}
          >
            Previous
          </Link>
        )}

        {pages.map((page, i) =>
          page === 'ellipsis' ? (
            <span
              key={`ellipsis-${i}`}
              className="px-3 py-2.5 text-sm"
              style={{color: isLight ? 'var(--text-mid)' : 'rgba(255,255,255,0.3)', fontFamily: 'var(--font-body)'}}
            >
              …
            </span>
          ) : (
            <Link
              key={page}
              href={`${basePath}?page=${page}`}
              className="px-4 py-2.5 rounded-md text-sm font-medium transition-all min-w-[44px] text-center hover:opacity-80"
              style={page === currentPage ? activeStyle : inactiveStyle}
            >
              {page}
            </Link>
          )
        )}

        {currentPage < totalPages && (
          <Link
            href={`${basePath}?page=${currentPage + 1}`}
            className="px-5 py-2.5 rounded-md text-sm font-medium transition-all hover:opacity-80"
            style={inactiveStyle}
          >
            Next
          </Link>
        )}
      </div>
    </nav>
  )
}

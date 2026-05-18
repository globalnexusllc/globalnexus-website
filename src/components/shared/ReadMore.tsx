'use client'

import {useState, useEffect, useRef, createContext, useContext} from 'react'

// ─── Group context (accordion behaviour) ───
// When multiple <ReadMore> instances are wrapped in <ReadMoreGroup>, only one
// can be expanded at a time. Opening one auto-collapses any other in the
// same group. Without the wrapper, each <ReadMore> manages its own state.
interface GroupContextValue {
  expandedId: string | null
  setExpandedId: (id: string | null) => void
}
const ReadMoreGroupContext = createContext<GroupContextValue | null>(null)

export function ReadMoreGroup({children}: {children: React.ReactNode}) {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  return (
    <ReadMoreGroupContext.Provider value={{expandedId, setExpandedId}}>
      {children}
    </ReadMoreGroupContext.Provider>
  )
}

interface ReadMoreProps {
  /** Text content (typically a long paragraph) */
  children: React.ReactNode
  /** Unique id within a ReadMoreGroup — required when grouping for accordion behaviour. */
  id?: string
  /** Number of lines to show before clamping. Default 4. */
  lines?: number
  /** Color of the toggle link (CSS color string or var). Default uses brand rust. */
  toggleColor?: string
  /** Optional class for the inner text wrapper. */
  className?: string
  /** Optional inline style for the inner text wrapper. */
  style?: React.CSSProperties
}

/**
 * Truncates long text to N lines and exposes a "Read more / Show less" toggle.
 *
 * The toggle is content-driven (not viewport-driven): it appears whenever the
 * actual rendered text exceeds the clamp height. This keeps behaviour correct
 * at every breakpoint — narrow desktop columns, tablet, and mobile all benefit.
 *
 * When wrapped in <ReadMoreGroup>, expanding one collapses any previously
 * expanded sibling. Each member of a group needs a unique `id` prop.
 */
export default function ReadMore({
  children,
  id,
  lines = 4,
  toggleColor = 'var(--rust)',
  className,
  style,
}: ReadMoreProps) {
  const group = useContext(ReadMoreGroupContext)
  const [localExpanded, setLocalExpanded] = useState(false)
  const [overflows, setOverflows] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  // Effective expanded state: group-tracked if available, otherwise local.
  const expanded = group && id ? group.expandedId === id : localExpanded
  const toggle = () => {
    if (group && id) {
      group.setExpandedId(expanded ? null : id)
    } else {
      setLocalExpanded((v) => !v)
    }
  }

  // Measure overflow whenever content or container width changes. ResizeObserver
  // on the element catches column-width changes (responsive grid: 1 → 2 → 3 cols)
  // that don't fire window resize events.
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const measure = () => {
      // While expanded, keep the toggle visible so the user can collapse.
      if (expanded) {
        setOverflows(true)
        return
      }
      setOverflows(el.scrollHeight - el.clientHeight > 1)
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    window.addEventListener('resize', measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [children, lines, expanded])

  const clampStyle: React.CSSProperties = expanded
    ? {}
    : {
        display: '-webkit-box',
        WebkitLineClamp: lines,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
      }

  return (
    <>
      <div
        ref={ref}
        className={className}
        style={{...clampStyle, ...style}}
        data-expanded={expanded}
      >
        {children}
      </div>
      {overflows && (
        <button
          type="button"
          onClick={toggle}
          className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] hover:opacity-80 transition-opacity"
          style={{color: toggleColor, fontFamily: 'var(--font-body)'}}
          aria-expanded={expanded}
        >
          {expanded ? '— Show less' : 'Read more →'}
        </button>
      )}
    </>
  )
}

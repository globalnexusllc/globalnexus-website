/**
 * Shared types for the unified search index.
 * Both the modal search (SiteSearch) and the /search page consume these.
 */

export type SearchKind = 'page' | 'portfolio' | 'team' | 'stack' | 'engineering' | 'blog'

export interface SearchableItem {
  id: string
  kind: SearchKind
  title: string
  description: string
  path: string
  /** Free-form, space-separated tokens to help matching (NOT shown to user). */
  keywords: string
  tags?: string[]
}

/** Project type used by `/proof` page — kept here as the canonical shape. */
export interface PortfolioProject {
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

export interface TeamMember {
  name: string
  title: string
  bio: string
  photo?: string
  linkedin?: string
  github?: string
}

export interface StackEntry {
  label: string
  category: string
  stack: string[]
  reasoning: string
  callout: string
}

export interface EngineeringItem {
  category: 'spec' | 'iteration' | 'sdlc'
  title: string
  body: string
  meta?: string
}

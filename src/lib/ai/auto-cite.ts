/**
 * Post-process AI responses: wrap plain mentions of known entities in
 * Markdown links so the frontend renders them as clickable.
 *
 * Idempotent: skips text already inside an existing [text](path) link.
 */

import {teamMembers, stackEntries, portfolioProjects} from '@/lib/search/sources'

interface CitationTarget {
  /** The exact phrase to look for. Matched case-insensitively at word boundaries. */
  phrase: string
  /** Site path to link to. */
  path: string
}

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function buildTargets(): CitationTarget[] {
  const targets: CitationTarget[] = []
  for (const m of teamMembers) targets.push({phrase: m.name, path: '/team'})
  for (const s of stackEntries) targets.push({phrase: s.label, path: '/stack'})
  for (const p of portfolioProjects) targets.push({phrase: p.name, path: `/proof#${p.id}`})
  targets.push({phrase: 'Engineering Methodology', path: '/engineering'})
  targets.push({phrase: 'Our Stack', path: '/stack'})
  // Sort longest-first so multi-word phrases match before sub-strings.
  targets.sort((a, b) => b.phrase.length - a.phrase.length)
  return targets
}

const TARGETS = buildTargets()

/**
 * Convert plain mentions of known phrases into [phrase](path) Markdown links.
 * Only links the FIRST occurrence of each phrase to avoid noise.
 */
export function applyCitations(input: string): string {
  let text = input
  // Build a single "already linked" map by scanning existing markdown links.
  const alreadyLinked = new Set<string>()
  const existingLinkRegex = /\[([^\]]+)\]\(([^)]+)\)/g
  let m: RegExpExecArray | null
  while ((m = existingLinkRegex.exec(text)) !== null) {
    alreadyLinked.add(m[1].toLowerCase())
  }

  for (const t of TARGETS) {
    if (alreadyLinked.has(t.phrase.toLowerCase())) continue
    // Word-boundary, case-insensitive, single replace (first occurrence only).
    const re = new RegExp(`(?<![\\[\\w-])(${escapeRegex(t.phrase)})(?![\\w-]|\\])`, 'i')
    const match = re.exec(text)
    if (!match) continue
    // Don't link if already inside an existing [...](...) link.
    const before = text.slice(0, match.index)
    const openBrackets = (before.match(/\[/g) || []).length
    const closeBrackets = (before.match(/\]/g) || []).length
    if (openBrackets > closeBrackets) continue
    text =
      text.slice(0, match.index) +
      `[${match[1]}](${t.path})` +
      text.slice(match.index + match[1].length)
    alreadyLinked.add(t.phrase.toLowerCase())
  }
  return text
}

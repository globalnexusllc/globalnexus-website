import type {Metadata} from 'next'
import PortfolioClient from './PortfolioClient'

export const metadata: Metadata = {
  title: 'Portfolio | Global Nexus',
  description: 'Explore our portfolio of full-stack platforms — from AI-powered travel apps to creator economy marketplaces and enterprise B2B SaaS products.',
}

export default function PortfolioPage() {
  return <PortfolioClient />
}

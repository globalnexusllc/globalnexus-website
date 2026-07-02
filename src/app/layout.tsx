import type {Metadata} from 'next'
import Script from 'next/script'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import {client} from '@/lib/sanity/client'
import {siteSettingsQuery} from '@/lib/sanity/queries'
import JsonLd, {organizationJsonLd} from '@/components/shared/JsonLd'
import ScrollToTop from '@/components/shared/ScrollToTop'
import SeoKeywords from '@/components/shared/SeoKeywords'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://globalnexus.one'),
  title: {
    default: 'Global Nexus - Software Engineering Services',
    template: '%s | Global Nexus',
  },
  description:
    'Global Nexus is a software engineering and digital advisory firm based in Colbert, GA. We build high-performance web apps, AI-powered platforms, and scalable digital products.',
  keywords: [
    'software engineering firm',
    'custom software development',
    'software development company',
    'hire software engineers',
    'React developers',
    'Angular developers',
    'Vue.js developers',
    'Node.js development',
    'NestJS development',
    'Prisma ORM',
    'Python development',
    'Django development',
    'FastAPI development',
    'Flask development',
    'C# .NET Core development',
    'ASP.NET MVC',
    'Entity Framework',
    'Azure cloud development',
    'serverless architecture',
    'AWS Lambda',
    'AWS CDK',
    'Serverless Framework',
    'event-driven architecture',
    'iOS development',
    'Swift development',
    'Android development',
    'Kotlin development',
    'Flutter development',
    'Dart development',
    'React Native development',
    'AI software development',
    'LangChain developers',
    'blockchain development',
    'Solidity smart contracts',
    'enterprise SaaS development',
    'software engineering Colbert GA',
    'software development Georgia',
    'agile software development',
    'software development lifecycle',
  ],
  icons: {
    icon: '/globe-icon.svg',
    shortcut: '/globe-icon.svg',
    apple: '/globe-icon.svg',
  },
  openGraph: {
    images: ['/og.png'],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og.png'],
  },
}

export default async function RootLayout({children}: {children: React.ReactNode}) {
  const settings = await client.fetch(siteSettingsQuery)

  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className="antialiased" suppressHydrationWarning>
        <JsonLd
          data={organizationJsonLd({
            name: 'Global Nexus',
            description:
              'Global Nexus is a software engineering and digital advisory firm based in Colbert, GA.',
            address: settings?.address,
            phone: '+19042995409',
            email: 'hello@globalnexus.one',
            socialLinks: [],
          })}
        />
        <Header />
        <main className="min-h-screen">{children}</main>
        <SeoKeywords />
        {settings?.googleAnalyticsId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${settings.googleAnalyticsId}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${settings.googleAnalyticsId}');
              `}
            </Script>
          </>
        )}
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  )
}

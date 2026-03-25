import React from 'react'
import type { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'
import './styles.css'
import { Header } from './components/Header'
import { Footer } from './components/Footer'

export const metadata: Metadata = {
  title: {
    default: 'OK Mission Tennis Club',
    template: '%s | OK Mission Tennis Club',
  },
  description:
    'OK Mission Tennis Club — 6 outdoor courts in Kelowna, BC. Programs for kids, adults, girls, and wheelchair tennis. Over 100 years of community tennis.',
  openGraph: {
    type: 'website',
    locale: 'en_CA',
    siteName: 'OK Mission Tennis Club',
    title: 'OK Mission Tennis Club',
    description:
      'OK Mission Tennis Club — 6 outdoor courts in Kelowna, BC. Programs for kids, adults, girls, and wheelchair tennis. Over 100 years of community tennis.',
  },
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  const payload = await getPayload({ config })
  const siteSettings = await payload.findGlobal({ slug: 'site-settings' })

  const headerSettings = {
    clubName: siteSettings.clubName,
    logo:
      siteSettings.logo && typeof siteSettings.logo === 'object'
        ? { url: siteSettings.logo.url, alt: siteSettings.logo.alt }
        : null,
    lovemyclubBaseUrl: siteSettings.lovemyclubBaseUrl,
  }

  // Query media for app store badge images
  const appStoreBadgeResult = await payload.find({
    collection: 'media',
    where: { alt: { equals: 'Download on the App Store' } },
    limit: 1,
  })
  const playStoreBadgeResult = await payload.find({
    collection: 'media',
    where: { alt: { equals: 'Get it on Google Play' } },
    limit: 1,
  })

  const appStoreBadge = appStoreBadgeResult.docs[0]
    ? { url: appStoreBadgeResult.docs[0].url, alt: appStoreBadgeResult.docs[0].alt }
    : null
  const playStoreBadge = playStoreBadgeResult.docs[0]
    ? { url: playStoreBadgeResult.docs[0].url, alt: playStoreBadgeResult.docs[0].alt }
    : null

  const footerSettings = {
    clubName: siteSettings.clubName,
    address: siteSettings.address,
    phone: siteSettings.phone,
    email: siteSettings.email,
    lovemyclubBaseUrl: siteSettings.lovemyclubBaseUrl,
    appStoreUrl: siteSettings.appStoreUrl,
    playStoreUrl: siteSettings.playStoreUrl,
    appStoreBadge,
    playStoreBadge,
  }

  return (
    <html lang="en">
      <body>
        <Header settings={headerSettings} />
        <main className="pt-[72px]">{children}</main>
        <Footer settings={footerSettings} />
      </body>
    </html>
  )
}

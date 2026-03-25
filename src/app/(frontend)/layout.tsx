import React from 'react'
import type { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'
import './styles.css'
import { Header } from './components/Header'

export const metadata: Metadata = {
  description: 'OK Mission Tennis Club - Kelowna, BC',
  title: 'OK Mission Tennis Club',
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

  return (
    <html lang="en">
      <body>
        <Header settings={headerSettings} />
        <main className="pt-[72px]">{children}</main>
      </body>
    </html>
  )
}

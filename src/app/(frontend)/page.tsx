import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getPayload } from 'payload'
import config from '@payload-config'
import { RichText } from '@payloadcms/richtext-lexical/react'

export const metadata: Metadata = {
  title: 'Home | OK Mission Tennis Club',
  description:
    'OK Mission Tennis Club — 6 outdoor courts in Kelowna, BC. Kids, adult, girls, and wheelchair tennis programs. Book a court, view tournaments, and more.',
  openGraph: {
    title: 'OK Mission Tennis Club',
    description:
      'OK Mission Tennis Club — 6 outdoor courts in Kelowna, BC. Kids, adult, girls, and wheelchair tennis programs.',
  },
}

export default async function HomePage() {
  const payload = await getPayload({ config })
  const siteSettings = await payload.findGlobal({ slug: 'site-settings' })

  const now = new Date().toISOString()
  const announcements = await payload.find({
    collection: 'announcements',
    where: {
      active: { equals: true },
      or: [
        { startDate: { exists: false } },
        { startDate: { less_than_equal: now } },
      ],
    },
    sort: '-priority',
  })

  // Filter out announcements past their endDate (client-side since PayloadCMS OR logic is limited)
  const activeAnnouncements = announcements.docs.filter((a) => {
    if (a.endDate && new Date(a.endDate) < new Date()) return false
    return true
  })

  const logo =
    siteSettings.logo && typeof siteSettings.logo === 'object'
      ? siteSettings.logo
      : null

  const bookingUrl = siteSettings.lovemyclubBaseUrl
    ? `${siteSettings.lovemyclubBaseUrl}/ClubMember/BookingCalendar`
    : '#'

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-800 to-emerald-950 py-20 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center">
          {logo?.url && (
            <Image
              src={logo.url}
              alt={logo.alt || siteSettings.clubName}
              width={120}
              height={120}
              className="mx-auto mb-6 h-28 w-auto rounded-full bg-white p-2"
            />
          )}
          <h1 className="text-4xl font-bold sm:text-5xl">{siteSettings.clubName}</h1>
          <p className="mt-4 text-lg text-emerald-100 sm:text-xl">
            Six outdoor courts in the heart of Okanagan Mission — serving the Kelowna community for over 100 years.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href={bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-white px-6 py-3 font-semibold text-emerald-800 shadow-lg transition-colors hover:bg-emerald-50"
            >
              Book a Court
            </a>
            <Link
              href="/programs"
              className="rounded-lg border-2 border-white/30 px-6 py-3 font-semibold text-white transition-colors hover:border-white hover:bg-white/10"
            >
              View Programs
            </Link>
          </div>
        </div>
      </section>

      {/* Announcements */}
      {activeAnnouncements.length > 0 && (
        <section className="bg-amber-50 py-10">
          <div className="mx-auto max-w-4xl px-4">
            <h2 className="mb-6 text-center text-2xl font-bold text-gray-900">Announcements</h2>
            <div className="space-y-4">
              {activeAnnouncements.map((a) => (
                <div
                  key={a.id}
                  className="rounded-lg border border-amber-200 bg-white p-5 shadow-sm"
                >
                  <h3 className="text-lg font-semibold text-gray-900">{a.title}</h3>
                  {a.body && (
                    <div className="mt-2 text-gray-600">
                      <RichText data={a.body} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* About Summary */}
      <section className="py-16">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="mb-10 text-center text-2xl font-bold text-gray-900">About Our Club</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: '🎾', title: '6 Outdoor Courts', desc: 'Well-maintained courts at 4409 Lakeshore Road, Kelowna' },
              { icon: '🏛️', title: '100+ Year History', desc: 'Tennis has been played on our courts for over a century' },
              { icon: '❤️', title: 'Charity-Run', desc: 'The oldest and only charity-run tennis facility in Kelowna' },
              { icon: '🤝', title: 'Community', desc: 'Part of the Okanagan Mission Community Hall Association' },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-gray-100 bg-white p-6 text-center shadow-sm"
              >
                <div className="mb-3 text-3xl">{item.icon}</div>
                <h3 className="mb-2 font-semibold text-gray-900">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="mb-10 text-center text-2xl font-bold text-gray-900">Explore</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Link
              href="/programs"
              className="group rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <h3 className="mb-2 text-lg font-semibold text-emerald-700 group-hover:text-emerald-800">
                Programs
              </h3>
              <p className="text-sm text-gray-600">
                Kids, adults, girls, and wheelchair tennis lessons for all skill levels.
              </p>
            </Link>

            <Link
              href="/coaches"
              className="group rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <h3 className="mb-2 text-lg font-semibold text-emerald-700 group-hover:text-emerald-800">
                Coaches
              </h3>
              <p className="text-sm text-gray-600">
                Meet our experienced coaching team offering group and private lessons.
              </p>
            </Link>

            <Link
              href="/tournaments"
              className="group rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <h3 className="mb-2 text-lg font-semibold text-emerald-700 group-hover:text-emerald-800">
                Tournaments
              </h3>
              <p className="text-sm text-gray-600">
                Six exciting tournaments throughout the 2026 season.
              </p>
            </Link>

            <a
              href={bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-xl border-2 border-emerald-200 bg-emerald-50 p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <h3 className="mb-2 text-lg font-semibold text-emerald-700 group-hover:text-emerald-800">
                Book a Court
              </h3>
              <p className="text-sm text-gray-600">
                Reserve your court time through our online booking system.
              </p>
            </a>
          </div>
        </div>
      </section>

      {/* Volunteer/Donate */}
      {siteSettings.volunteerText && (
        <section className="py-16">
          <div className="mx-auto max-w-3xl px-4">
            <h2 className="mb-6 text-center text-2xl font-bold text-gray-900">
              Volunteer &amp; Donate
            </h2>
            <div className="prose prose-emerald mx-auto text-gray-600">
              <RichText data={siteSettings.volunteerText} />
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

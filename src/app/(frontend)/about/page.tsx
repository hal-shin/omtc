import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import { RichText } from '@payloadcms/richtext-lexical/react'

export default async function AboutPage() {
  const payload = await getPayload({ config })
  const siteSettings = await payload.findGlobal({ slug: 'site-settings' })

  return (
    <div>
      {/* Page Header */}
      <section className="bg-gradient-to-br from-emerald-800 to-emerald-950 py-16 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h1 className="text-4xl font-bold">About Our Club</h1>
          <p className="mt-3 text-emerald-100">
            Learn about our history, facilities, and how to get involved.
          </p>
        </div>
      </section>

      {/* Club History */}
      {siteSettings.aboutText && (
        <section className="py-16">
          <div className="mx-auto max-w-3xl px-4">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Our History</h2>
            <div className="prose prose-emerald text-gray-600">
              <RichText data={siteSettings.aboutText} />
            </div>
          </div>
        </section>
      )}

      {/* Facility Details */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">Our Facility</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
              <h3 className="mb-2 font-semibold text-gray-900">6 Outdoor Courts</h3>
              <p className="text-sm text-gray-600">
                Our well-maintained courts are available for members to book year-round, weather permitting.
              </p>
            </div>
            <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
              <h3 className="mb-2 font-semibold text-gray-900">Location</h3>
              <p className="text-sm text-gray-600">
                4409 Lakeshore Road, Kelowna, BC V1W 1W7, Canada — in the heart of Okanagan Mission.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Parent Organization */}
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">Our Organization</h2>
          <p className="text-gray-600">
            Okanagan Mission Tennis is part of the{' '}
            <strong>Okanagan Mission Community Hall Association</strong>. We are proud to be the
            oldest and only charity-run tennis facility in Kelowna, with a focus on giving back to
            our members and the community.
          </p>
        </div>
      </section>

      {/* Volunteer & Donate */}
      {siteSettings.volunteerText && (
        <section className="bg-emerald-50 py-16">
          <div className="mx-auto max-w-3xl px-4">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">Volunteer &amp; Donate</h2>
            <div className="prose prose-emerald text-gray-600">
              <RichText data={siteSettings.volunteerText} />
            </div>

            <div className="mt-8 rounded-xl border border-emerald-200 bg-white p-6">
              <h3 className="mb-3 font-semibold text-gray-900">Areas Where Volunteers Are Needed</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-emerald-600">•</span>
                  Food prep and cleanup for club socials and tournaments
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-emerald-600">•</span>
                  Sharing special skills you may have
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-0.5 text-emerald-600">•</span>
                  Fundraising ideas and implementation
                </li>
              </ul>
            </div>

            <div className="mt-6 rounded-xl border border-emerald-200 bg-white p-6">
              <h3 className="mb-2 font-semibold text-gray-900">Donations</h3>
              <p className="text-sm text-gray-600">
                Too busy to volunteer? A financial donation is always appreciated. As a registered
                charity, <strong>charitable receipts are available</strong> for all donations.
              </p>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

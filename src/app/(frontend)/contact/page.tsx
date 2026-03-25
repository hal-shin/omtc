import React from 'react'
import Image from 'next/image'
import { getPayload } from 'payload'
import config from '@payload-config'

export default async function ContactPage() {
  const payload = await getPayload({ config })
  const siteSettings = await payload.findGlobal({ slug: 'site-settings' })

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

  const appStoreBadge = appStoreBadgeResult.docs[0] || null
  const playStoreBadge = playStoreBadgeResult.docs[0] || null

  return (
    <div>
      <section className="bg-gradient-to-br from-emerald-800 to-emerald-950 py-16 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h1 className="text-4xl font-bold">Contact</h1>
          <p className="mt-3 text-emerald-100">
            Get in touch with OK Mission Tennis Club.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Contact Details */}
            <div>
              <h2 className="mb-6 text-2xl font-bold text-gray-900">Contact Details</h2>

              <div className="space-y-4">
                {siteSettings.phone && (
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 text-emerald-600">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </span>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Phone</p>
                      <a
                        href={`tel:${siteSettings.phone}`}
                        className="text-emerald-600 hover:text-emerald-700"
                      >
                        {siteSettings.phone}
                      </a>
                    </div>
                  </div>
                )}

                {siteSettings.email && (
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 text-emerald-600">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </span>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Email</p>
                      <a
                        href={`mailto:${siteSettings.email}`}
                        className="text-emerald-600 hover:text-emerald-700"
                      >
                        {siteSettings.email}
                      </a>
                    </div>
                  </div>
                )}

                {siteSettings.address && (
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 text-emerald-600">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </span>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Address</p>
                      <p className="text-gray-600">{siteSettings.address}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* App Store Badges */}
              <div className="mt-8">
                <h3 className="mb-3 text-sm font-semibold text-gray-700">Get the LoveOurClub App</h3>
                <div className="flex flex-wrap gap-3">
                  {siteSettings.appStoreUrl && appStoreBadge?.url && (
                    <a
                      href={siteSettings.appStoreUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Image
                        src={appStoreBadge.url}
                        alt={appStoreBadge.alt}
                        width={135}
                        height={40}
                        className="h-10 w-auto"
                      />
                    </a>
                  )}
                  {siteSettings.playStoreUrl && playStoreBadge?.url && (
                    <a
                      href={siteSettings.playStoreUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Image
                        src={playStoreBadge.url}
                        alt={playStoreBadge.alt}
                        width={135}
                        height={40}
                        className="h-10 w-auto"
                      />
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Map */}
            <div>
              <h2 className="mb-6 text-2xl font-bold text-gray-900">Location</h2>
              <div className="overflow-hidden rounded-xl border border-gray-200">
                <iframe
                  title="OK Mission Tennis Club Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2545.5!2d-119.492!3d49.8547!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x537d8c0e0e0e0e0e%3A0x0!2s4409+Lakeshore+Road%2C+Kelowna%2C+BC!5e0!3m2!1sen!2sca!4v1"
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <p className="mt-3 text-sm text-gray-500">
                4409 Lakeshore Road, Kelowna, BC — in the Okanagan Mission neighbourhood.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

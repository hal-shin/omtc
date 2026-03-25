import React from 'react'
import Image from 'next/image'
import { getPayload } from 'payload'
import config from '@payload-config'

const tierOrder = ['platinum', 'gold', 'silver', 'supporter'] as const
const tierStyles: Record<string, { badge: string; border: string }> = {
  platinum: { badge: 'bg-slate-100 text-slate-800', border: 'border-slate-300' },
  gold: { badge: 'bg-amber-100 text-amber-800', border: 'border-amber-300' },
  silver: { badge: 'bg-gray-100 text-gray-700', border: 'border-gray-300' },
  supporter: { badge: 'bg-emerald-100 text-emerald-800', border: 'border-emerald-200' },
}

export default async function SponsorsPage() {
  const payload = await getPayload({ config })
  const { docs: sponsors } = await payload.find({
    collection: 'sponsors',
    sort: 'sortOrder',
    limit: 50,
    depth: 1,
  })

  // Group by tier in order
  const grouped = tierOrder
    .map((tier) => ({
      tier,
      label: tier.charAt(0).toUpperCase() + tier.slice(1),
      sponsors: sponsors.filter((s) => s.tier === tier),
    }))
    .filter((g) => g.sponsors.length > 0)

  return (
    <div>
      <section className="bg-gradient-to-br from-emerald-800 to-emerald-950 py-16 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h1 className="text-4xl font-bold">Sponsors</h1>
          <p className="mt-3 text-emerald-100">
            Thank you to our generous sponsors who make our programs possible.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4">
          {grouped.map((group) => {
            const style = tierStyles[group.tier] || tierStyles.supporter

            return (
              <div key={group.tier} className="mb-10">
                <h2 className="mb-4 text-xl font-bold text-gray-900">{group.label} Sponsors</h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {group.sponsors.map((sponsor) => {
                    const logo =
                      sponsor.logo && typeof sponsor.logo === 'object' ? sponsor.logo : null

                    return (
                      <div
                        key={sponsor.id}
                        className={`rounded-xl border bg-white p-5 shadow-sm ${style.border}`}
                      >
                        {logo?.url && (
                          <div className="mb-3 flex h-16 items-center">
                            <Image
                              src={logo.url}
                              alt={logo.alt || sponsor.name}
                              width={160}
                              height={64}
                              className="h-12 w-auto object-contain"
                            />
                          </div>
                        )}
                        <h3 className="font-semibold text-gray-900">{sponsor.name}</h3>
                        <span
                          className={`mt-2 inline-block rounded-full px-3 py-0.5 text-xs font-medium ${style.badge}`}
                        >
                          {group.label}
                        </span>
                        {sponsor.website && (
                          <p className="mt-2">
                            <a
                              href={sponsor.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-emerald-600 hover:text-emerald-700"
                            >
                              Visit website
                            </a>
                          </p>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}

          {/* Sponsorship Inquiry */}
          <div className="mt-8 rounded-xl border border-emerald-200 bg-emerald-50 p-6">
            <h2 className="mb-3 text-lg font-semibold text-gray-900">
              Interested in Sponsorship?
            </h2>
            <p className="text-sm text-gray-600">
              For sponsorship inquiries, please contact:
            </p>
            <div className="mt-3 text-sm">
              <p className="font-medium text-gray-900">Alli, McNeill Communications</p>
              <p>
                <a href="tel:250-212-4831" className="text-emerald-600 hover:text-emerald-700">
                  250.212.4831
                </a>
              </p>
              <p>
                <a
                  href="mailto:alli@mcneillcommunications.ca"
                  className="text-emerald-600 hover:text-emerald-700"
                >
                  alli@mcneillcommunications.ca
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

import React from 'react'
import type { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'

export const metadata: Metadata = {
  title: 'Tournaments',
  description:
    '2026 tournament schedule at OK Mission Tennis Club — Ice Breaker, Junior, Rookie Tour, Mid Summer, and Club Championships in Kelowna, BC.',
  openGraph: {
    title: 'Tournaments | OK Mission Tennis Club',
    description: '2026 tournament schedule at OK Mission Tennis Club.',
  },
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-CA', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

function formatDateRange(start?: string | null, end?: string | null): string {
  if (!start) return ''
  const s = formatDate(start)
  if (!end || start === end) return s
  const e = formatDate(end)
  return `${s} – ${e}`
}

export default async function TournamentsPage() {
  const payload = await getPayload({ config })
  const { docs: tournaments } = await payload.find({
    collection: 'tournaments',
    sort: 'startDate',
    limit: 20,
  })

  return (
    <div>
      <section className="bg-gradient-to-br from-emerald-800 to-emerald-950 py-16 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h1 className="text-4xl font-bold">Tournaments</h1>
          <p className="mt-3 text-emerald-100">
            2026 tournament schedule at OK Mission Tennis Club.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4">
          <div className="space-y-6">
            {tournaments.map((t) => (
              <div
                key={t.id}
                className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{t.name}</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {formatDateRange(t.startDate, t.endDate)}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {t.sanctionedBy && (
                      <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">
                        {t.sanctionedBy} Sanctioned
                      </span>
                    )}
                  </div>
                </div>

                {t.registrationDeadline && (
                  <p className="mt-3 text-sm text-gray-600">
                    <strong>Registration deadline:</strong> {formatDate(t.registrationDeadline)}
                  </p>
                )}

                {t.registrationUrl && (
                  <div className="mt-4">
                    <a
                      href={t.registrationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-emerald-700"
                    >
                      Register
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Contact for questions */}
          <div className="mt-8 rounded-xl border border-blue-100 bg-blue-50 p-5">
            <p className="text-sm text-blue-800">
              <strong>Questions about tournaments?</strong> Contact Head Pro Uri Yarkoni at{' '}
              <a href="mailto:uriytennis@gmail.com" className="underline hover:text-blue-900">
                uriytennis@gmail.com
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

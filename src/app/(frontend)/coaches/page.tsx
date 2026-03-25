import React from 'react'
import type { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'
import { CoachCard } from './CoachCard'

export const metadata: Metadata = {
  title: 'Coaches',
  description:
    'Meet the coaching team at OK Mission Tennis Club — experienced pros offering group and private tennis lessons in Kelowna, BC.',
  openGraph: {
    title: 'Coaches | OK Mission Tennis Club',
    description: 'Meet our experienced coaching team.',
  },
}

export default async function CoachesPage() {
  const payload = await getPayload({ config })
  const { docs: coaches } = await payload.find({
    collection: 'coaches',
    sort: 'sortOrder',
    limit: 20,
    depth: 1,
  })

  const coachData = coaches.map((c) => ({
    id: c.id,
    name: c.name,
    role: c.role,
    email: c.email,
    phone: c.phone,
    photo:
      c.photo && typeof c.photo === 'object'
        ? { url: c.photo.url, alt: c.photo.alt }
        : null,
    rates: c.rates,
    qualifications: c.qualifications,
    bio: c.bio,
  }))

  return (
    <div>
      <section className="bg-gradient-to-br from-emerald-800 to-emerald-950 py-16 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h1 className="text-4xl font-bold">Coaches</h1>
          <p className="mt-3 text-emerald-100">
            Meet our experienced coaching team.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4">
          <div className="mb-8 rounded-xl border border-blue-100 bg-blue-50 p-5">
            <p className="text-sm text-blue-800">
              Group lessons are club organized. All private lessons are booked through coaches
              directly.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {coachData.map((coach) => (
              <CoachCard key={coach.id} coach={coach} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

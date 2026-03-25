import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import { RichText } from '@payloadcms/richtext-lexical/react'

export default async function AdultsPage() {
  const payload = await getPayload({ config })
  const { docs: programs } = await payload.find({
    collection: 'programs',
    where: { category: { equals: 'adult' } },
    limit: 20,
  })

  return (
    <div>
      <section className="bg-gradient-to-br from-emerald-800 to-emerald-950 py-16 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h1 className="text-4xl font-bold">Adult Lessons</h1>
          <p className="mt-3 text-emerald-100">
            Group lessons for all skill levels, from beginner to advanced intermediate.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4">
          {/* NTRP Info */}
          <div className="mb-8 rounded-xl border border-blue-100 bg-blue-50 p-5">
            <h3 className="mb-2 text-sm font-semibold text-blue-800">NTRP Skill Levels</h3>
            <ul className="space-y-1 text-sm text-blue-700">
              <li><strong>1.0</strong> — Beginner: New to tennis</li>
              <li><strong>1.5–2.0</strong> — Advanced Beginner: Learning basic strokes</li>
              <li><strong>2.5–3.0</strong> — Intermediate: Consistent strokes, developing game play</li>
              <li><strong>3.5+</strong> — Advanced Intermediate: Good shot control and strategy</li>
            </ul>
          </div>

          {/* Program Cards */}
          <div className="space-y-6">
            {programs.map((program) => (
              <div
                key={program.id}
                className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{program.name}</h3>
                    {program.ageRange && (
                      <span className="mt-1 inline-block rounded-full bg-emerald-100 px-3 py-0.5 text-xs font-medium text-emerald-800">
                        {program.ageRange}
                      </span>
                    )}
                  </div>
                </div>

                {program.description && (
                  <div className="mt-3 text-sm text-gray-600">
                    <RichText data={program.description} />
                  </div>
                )}

                {program.schedule && program.schedule.length > 0 && (
                  <div className="mt-4">
                    <h4 className="mb-2 text-sm font-semibold text-gray-700">Schedule</h4>
                    <div className="space-y-2">
                      {program.schedule.map((session, i) => (
                        <div
                          key={i}
                          className="flex flex-wrap items-center justify-between gap-3 rounded-lg bg-gray-50 px-4 py-3"
                        >
                          <span className="text-sm text-gray-700">
                            {session.day} &middot; {session.time}
                          </span>
                          {session.registrationUrl && (
                            <a
                              href={session.registrationUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="rounded-lg bg-emerald-600 px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-emerald-700"
                            >
                              Register
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Policy Notes */}
          <div className="mt-8 rounded-xl border border-gray-200 bg-gray-50 p-5">
            <h3 className="mb-2 text-sm font-semibold text-gray-700">Important Notes</h3>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>• All lessons are non refundable</li>
              <li>• Register and pay online — no cash or cheques</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}

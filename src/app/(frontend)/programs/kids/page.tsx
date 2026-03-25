import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import { RichText } from '@payloadcms/richtext-lexical/react'

const ballProgression = [
  { name: 'La Petite', color: 'bg-pink-100 text-pink-800 border-pink-200' },
  { name: 'Red Ball Fundamentals', color: 'bg-red-100 text-red-800 border-red-200' },
  { name: 'Orange Ball Fundamentals', color: 'bg-orange-100 text-orange-800 border-orange-200' },
  { name: 'Green Dot Fundamentals', color: 'bg-green-100 text-green-800 border-green-200' },
  { name: 'Regular Ball Fundamentals', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
]

export default async function KidsPage() {
  const payload = await getPayload({ config })
  const { docs: programs } = await payload.find({
    collection: 'programs',
    where: { category: { equals: 'kids' } },
    limit: 20,
  })

  return (
    <div>
      <section className="bg-gradient-to-br from-emerald-800 to-emerald-950 py-16 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h1 className="text-4xl font-bold">Kids Tennis</h1>
          <p className="mt-3 text-emerald-100">
            Progressive lessons designed for young players of all ages and skill levels.
          </p>
        </div>
      </section>

      {/* Ball Progression Visual */}
      <section className="bg-gray-50 py-10">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="mb-4 text-center text-lg font-semibold text-gray-900">
            Progressive Ball System
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {ballProgression.map((ball, i) => (
              <React.Fragment key={ball.name}>
                <span
                  className={`rounded-full border px-4 py-2 text-sm font-medium ${ball.color}`}
                >
                  {ball.name}
                </span>
                {i < ballProgression.length - 1 && (
                  <span className="text-gray-400">&rarr;</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* Program Cards */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4">
          <div className="space-y-6">
            {programs.map((program) => {
              const progression = ballProgression.find((b) => b.name === program.name)

              return (
                <div
                  key={program.id}
                  className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{program.name}</h3>
                      {program.ageRange && (
                        <span className="mt-1 inline-block text-sm text-gray-500">
                          Ages: {program.ageRange}
                        </span>
                      )}
                    </div>
                    {progression && (
                      <span
                        className={`rounded-full border px-3 py-1 text-xs font-medium ${progression.color}`}
                      >
                        {progression.name}
                      </span>
                    )}
                  </div>

                  {program.description && (
                    <div className="mt-3 text-sm text-gray-600">
                      <RichText data={program.description} />
                    </div>
                  )}

                  {/* Schedule */}
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
              )
            })}
          </div>

          {/* Advanced Juniors Note */}
          <div className="mt-8 rounded-xl border border-blue-100 bg-blue-50 p-5">
            <p className="text-sm text-blue-800">
              <strong>Advanced Juniors:</strong> For players seeking more competitive training, please
              contact Head Pro Uri Yarkoni at{' '}
              <a href="mailto:uriytennis@gmail.com" className="underline hover:text-blue-900">
                uriytennis@gmail.com
              </a>
            </p>
          </div>

          {/* Policy Notes */}
          <div className="mt-6 rounded-xl border border-gray-200 bg-gray-50 p-5">
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

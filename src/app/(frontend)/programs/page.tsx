import React from 'react'
import Link from 'next/link'

const categories = [
  {
    href: '/programs/kids',
    title: 'Kids',
    description:
      'Progressive lessons from La Petite (age 3) through Regular Ball (11+), building skills step by step with age-appropriate equipment.',
  },
  {
    href: '/programs/girls',
    title: 'Girls In Tennis',
    description:
      'A program led by girls for girls, with U10 and U16 sessions designed to inspire and develop young female players.',
  },
  {
    href: '/programs/wheelchair',
    title: 'Wheelchair Tennis',
    description:
      'Open to all abilities — an inclusive program bringing tennis to everyone in the community.',
  },
  {
    href: '/programs/adults',
    title: 'Adults',
    description:
      'Group lessons for all skill levels, from beginner (1.0) to advanced intermediate (3.5+).',
  },
]

export default function ProgramsPage() {
  return (
    <div>
      <section className="bg-gradient-to-br from-emerald-800 to-emerald-950 py-16 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h1 className="text-4xl font-bold">Programs</h1>
          <p className="mt-3 text-emerald-100">
            Tennis lessons and programs for all ages and skill levels.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4">
          <div className="grid gap-6 sm:grid-cols-2">
            {categories.map((cat) => (
              <Link
                key={cat.href}
                href={cat.href}
                className="group rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <h2 className="mb-2 text-xl font-semibold text-emerald-700 group-hover:text-emerald-800">
                  {cat.title}
                </h2>
                <p className="text-sm text-gray-600">{cat.description}</p>
                <span className="mt-4 inline-block text-sm font-medium text-emerald-600 group-hover:text-emerald-700">
                  View programs &rarr;
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

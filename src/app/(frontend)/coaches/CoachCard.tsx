'use client'

import React, { useState, useMemo } from 'react'
import Image from 'next/image'

type CoachData = {
  id: number
  name: string
  role?: string | null
  email?: string | null
  phone?: string | null
  photo?: { url?: string | null; alt: string } | null
  rates?: Record<string, unknown> | null
  qualifications?: { qualification: string; id?: string | null }[] | null
  bio?: Record<string, unknown> | null
}

function renderRichText(data: Record<string, unknown> | null | undefined) {
  if (!data) return null
  try {
    const root = (data as { root: { children: { children?: { text?: string }[] }[] } }).root
    return root.children.map((block, i) => {
      const text = block.children?.map((c) => c.text || '').join('') || ''
      return (
        <p key={i} className="mb-2">
          {text}
        </p>
      )
    })
  } catch {
    return null
  }
}

function extractExcerpt(bio: Record<string, unknown> | null | undefined, maxLen = 100): string {
  if (!bio) return ''
  try {
    const root = (bio as { root: { children: { children?: { text?: string }[] }[] } }).root
    const texts: string[] = []
    for (const block of root.children) {
      if (block.children) {
        for (const child of block.children) {
          if (child.text) texts.push(child.text)
        }
      }
    }
    const full = texts.join(' ')
    return full.length > maxLen ? full.slice(0, maxLen) + '...' : full
  } catch {
    return ''
  }
}

export function CoachCard({ coach }: { coach: CoachData }) {
  const [expanded, setExpanded] = useState(false)
  const bioExcerpt = useMemo(() => extractExcerpt(coach.bio), [coach.bio])

  return (
    <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
      <div className="p-6">
        <div className="flex gap-4">
          {coach.photo?.url && (
            <Image
              src={coach.photo.url}
              alt={coach.photo.alt || coach.name}
              width={96}
              height={96}
              className="h-24 w-24 flex-shrink-0 rounded-full object-cover"
            />
          )}
          <div className="min-w-0">
            <h3 className="text-lg font-semibold text-gray-900">{coach.name}</h3>
            {coach.role && (
              <p className="text-sm font-medium text-emerald-700">{coach.role}</p>
            )}
            {!expanded && bioExcerpt && (
              <p className="mt-2 text-sm text-gray-500">{bioExcerpt}</p>
            )}
          </div>
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-4 text-sm font-medium text-emerald-600 transition-colors hover:text-emerald-700"
        >
          {expanded ? 'Show less' : 'Show more'}
        </button>
      </div>

      {expanded && (
        <div className="space-y-5 border-t border-gray-100 p-6">
          {coach.bio && (
            <div>
              <h4 className="mb-2 text-sm font-semibold text-gray-700">Bio</h4>
              <div className="text-sm text-gray-600">{renderRichText(coach.bio)}</div>
            </div>
          )}

          {coach.qualifications && coach.qualifications.length > 0 && (
            <div>
              <h4 className="mb-2 text-sm font-semibold text-gray-700">Qualifications</h4>
              <ul className="space-y-1">
                {coach.qualifications.map((q, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="mt-0.5 text-emerald-600">•</span>
                    {q.qualification}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {coach.rates && (
            <div>
              <h4 className="mb-2 text-sm font-semibold text-gray-700">Rates</h4>
              <div className="text-sm text-gray-600">{renderRichText(coach.rates)}</div>
            </div>
          )}

          <div>
            <h4 className="mb-2 text-sm font-semibold text-gray-700">Contact</h4>
            <div className="space-y-1 text-sm">
              {coach.email && (
                <p>
                  <a
                    href={`mailto:${coach.email}`}
                    className="text-emerald-600 hover:text-emerald-700"
                  >
                    {coach.email}
                  </a>
                </p>
              )}
              {coach.phone && (
                <p>
                  <a
                    href={`tel:${coach.phone}`}
                    className="text-emerald-600 hover:text-emerald-700"
                  >
                    {coach.phone}
                  </a>
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

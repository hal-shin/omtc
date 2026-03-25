import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

type FooterSettings = {
  clubName: string
  address?: string | null
  phone?: string | null
  email?: string | null
  lovemyclubBaseUrl?: string | null
  appStoreUrl?: string | null
  playStoreUrl?: string | null
  appStoreBadge?: { url?: string | null; alt: string } | null
  playStoreBadge?: { url?: string | null; alt: string } | null
}

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/programs', label: 'Programs' },
  { href: '/programs/kids', label: 'Kids' },
  { href: '/programs/girls', label: 'Girls In Tennis' },
  { href: '/programs/wheelchair', label: 'Wheelchair Tennis' },
  { href: '/programs/adults', label: 'Adults' },
  { href: '/coaches', label: 'Coaches' },
  { href: '/tournaments', label: 'Tournaments' },
  { href: '/sponsors', label: 'Sponsors' },
  { href: '/contact', label: 'Contact' },
]

export function Footer({ settings }: { settings: FooterSettings }) {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-emerald-900 text-gray-200">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Contact Info */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Contact</h3>
            {settings.address && (
              <p className="mb-2 text-sm">{settings.address}</p>
            )}
            {settings.phone && (
              <p className="mb-2 text-sm">
                <a href={`tel:${settings.phone}`} className="hover:text-emerald-300 transition-colors">
                  {settings.phone}
                </a>
              </p>
            )}
            {settings.email && (
              <p className="mb-2 text-sm">
                <a href={`mailto:${settings.email}`} className="hover:text-emerald-300 transition-colors">
                  {settings.email}
                </a>
              </p>
            )}
          </div>

          {/* Navigation */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Navigation</h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-emerald-300 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Members</h3>
            <ul className="space-y-2">
              {settings.lovemyclubBaseUrl && (
                <>
                  <li>
                    <a
                      href={`${settings.lovemyclubBaseUrl}/ClubMember/BookingCalendar`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm hover:text-emerald-300 transition-colors"
                    >
                      Book a Court
                    </a>
                  </li>
                  <li>
                    <a
                      href={`${settings.lovemyclubBaseUrl}/ClubMember/Login`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm hover:text-emerald-300 transition-colors"
                    >
                      Member Login
                    </a>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* App Badges */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Get the App</h3>
            <p className="mb-3 text-sm">Download LoveOurClub to book courts and manage your membership.</p>
            <div className="flex flex-col gap-3">
              {settings.appStoreUrl && settings.appStoreBadge?.url && (
                <a
                  href={settings.appStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src={settings.appStoreBadge.url}
                    alt={settings.appStoreBadge.alt || 'Download on the App Store'}
                    width={135}
                    height={40}
                    className="h-10 w-auto"
                  />
                </a>
              )}
              {settings.playStoreUrl && settings.playStoreBadge?.url && (
                <a
                  href={settings.playStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src={settings.playStoreBadge.url}
                    alt={settings.playStoreBadge.alt || 'Get it on Google Play'}
                    width={135}
                    height={40}
                    className="h-10 w-auto"
                  />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 border-t border-emerald-800 pt-6 text-center text-sm text-gray-400">
          &copy; {currentYear} {settings.clubName}. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

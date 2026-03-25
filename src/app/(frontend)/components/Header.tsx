'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

type SiteSettings = {
  clubName: string
  logo?: { url?: string | null; alt: string } | null
  lovemyclubBaseUrl?: string | null
}

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  {
    href: '/programs',
    label: 'Programs',
    children: [
      { href: '/programs/kids', label: 'Kids' },
      { href: '/programs/girls', label: 'Girls In Tennis' },
      { href: '/programs/wheelchair', label: 'Wheelchair Tennis' },
      { href: '/programs/adults', label: 'Adults' },
    ],
  },
  { href: '/coaches', label: 'Coaches' },
  { href: '/tournaments', label: 'Tournaments' },
  { href: '/sponsors', label: 'Sponsors' },
  { href: '/contact', label: 'Contact' },
]

export function Header({ settings }: { settings: SiteSettings }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [programsOpen, setProgramsOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const bookingUrl = settings.lovemyclubBaseUrl
    ? `${settings.lovemyclubBaseUrl}/ClubMember/BookingCalendar`
    : '#'

  const loginUrl = settings.lovemyclubBaseUrl
    ? `${settings.lovemyclubBaseUrl}/ClubMember/Login`
    : '#'

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-50 transition-shadow duration-200 ${
        scrolled ? 'bg-white/95 shadow-md backdrop-blur-sm' : 'bg-white'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        {/* Logo + Club Name */}
        <Link href="/" className="flex items-center gap-3">
          {settings.logo?.url && (
            <Image
              src={settings.logo.url}
              alt={settings.logo.alt || settings.clubName}
              width={48}
              height={48}
              className="h-12 w-auto"
            />
          )}
          <span className="hidden text-lg font-bold text-emerald-800 sm:inline">
            {settings.clubName}
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) =>
            link.children ? (
              <div key={link.href} className="group relative">
                <Link
                  href={link.href}
                  className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-emerald-50 hover:text-emerald-700"
                >
                  {link.label}
                  <svg
                    className="ml-1 inline-block h-3 w-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </Link>
                <div className="invisible absolute left-0 top-full z-50 min-w-48 rounded-lg border border-gray-100 bg-white py-2 shadow-lg transition-all group-hover:visible">
                  {link.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-700"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-emerald-50 hover:text-emerald-700"
              >
                {link.label}
              </Link>
            ),
          )}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={loginUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-gray-600 hover:text-emerald-700"
          >
            Member Login
          </a>
          <a
            href={bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-emerald-700"
          >
            Book a Court
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="rounded-md p-2 text-gray-700 hover:bg-gray-100 lg:hidden"
          aria-label="Toggle navigation menu"
        >
          {mobileOpen ? (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="border-t border-gray-100 bg-white lg:hidden">
          <nav className="mx-auto max-w-7xl space-y-1 px-4 py-3">
            {navLinks.map((link) =>
              link.children ? (
                <div key={link.href}>
                  <button
                    onClick={() => setProgramsOpen(!programsOpen)}
                    className="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-emerald-50"
                  >
                    {link.label}
                    <svg
                      className={`h-4 w-4 transition-transform ${programsOpen ? 'rotate-180' : ''}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {programsOpen && (
                    <div className="ml-4 space-y-1">
                      <Link
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className="block rounded-md px-3 py-2 text-sm text-gray-600 hover:bg-emerald-50 hover:text-emerald-700"
                      >
                        All Programs
                      </Link>
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setMobileOpen(false)}
                          className="block rounded-md px-3 py-2 text-sm text-gray-600 hover:bg-emerald-50 hover:text-emerald-700"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-emerald-50 hover:text-emerald-700"
                >
                  {link.label}
                </Link>
              ),
            )}

            <div className="border-t border-gray-100 pt-3">
              <a
                href={loginUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-emerald-50"
              >
                Member Login
              </a>
              <a
                href={bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 block rounded-lg bg-emerald-600 px-4 py-2 text-center text-sm font-semibold text-white hover:bg-emerald-700"
              >
                Book a Court
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}

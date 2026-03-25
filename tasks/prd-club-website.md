# PRD: OK Mission Tennis Club — Brochure Website

## Introduction

Replace the current LoveMyClub-hosted website (okmissiontennis.org) with a modern, self-hosted brochure website built on PayloadCMS + Next.js. The site serves as an information hub for the tennis club community — presenting programs, coaches, tournaments, and club info — while deferring all booking, registration, and membership management to the existing LoveMyClub platform (kept as a sidecar application). Club admins will maintain content via PayloadCMS's admin panel.

**Source of truth for all existing content**: `site-report.md` in the project root.

## Goals

- Provide a clean, modern, family-friendly website that presents all club information currently on the old site
- Enable non-technical club admins to update content (programs, schedules, announcements, coaches) via PayloadCMS admin UI
- Preserve all registration/booking flows by linking out to LoveMyClub (opens in new tab)
- Be locally hostable (self-hosted on the club's infrastructure or a simple VPS)
- Improve the site structure and navigation over the old site's flat SPA layout
- Fix known issues (broken Google Map, poor mobile experience)

## User Stories

### US-001: PayloadCMS Project Setup
**Description:** As a developer, I want to scaffold a Next.js + PayloadCMS project so that I have a working foundation.

**Acceptance Criteria:**
- [ ] Next.js 15 App Router project with PayloadCMS 3.x embedded
- [ ] SQLite database for local/simple hosting (swappable to Postgres)
- [ ] PayloadCMS admin panel accessible at `/admin`
- [ ] Dev server starts with `pnpm dev`
- [ ] Tailwind CSS 4 configured
- [ ] Project builds successfully with `pnpm build`

---

### US-002: Define PayloadCMS Collections
**Description:** As a developer, I need CMS collections so that admins can manage all site content.

**Acceptance Criteria:**
- [ ] `pages` collection — title, slug, content (rich text), SEO fields (meta title, meta description)
- [ ] `coaches` collection — name, title/role, email, phone, photo (upload), rates (rich text or structured), qualifications (array of strings), bio (rich text), sortOrder
- [ ] `programs` collection — name, slug, ageRange, description (rich text), schedule (array: day, time), registrationUrl (external link to LoveMyClub), category enum (kids | girls | wheelchair | adult), season/year
- [ ] `tournaments` collection — name, dates (start/end), description, registrationUrl, registrationDeadline, sanctionedBy (optional string), year
- [ ] `sponsors` collection — name, tier enum (platinum | gold | silver | supporter), logo (upload), website (optional URL), sortOrder
- [ ] `announcements` collection — title, body (rich text), active (boolean), priority (number), startDate, endDate
- [ ] `siteSettings` global — clubName, address, phone, email, aboutText (rich text), volunteerText (rich text), heroImage (upload), logo (upload), lovemyclubBaseUrl, appStoreUrl, playStoreUrl
- [ ] `media` collection for uploads (images) with proper alt text field
- [ ] Typecheck passes

---

### US-003: Seed Database with Existing Content
**Description:** As a developer, I want all existing site content pre-loaded so the site launches with full content from day one.

**Acceptance Criteria:**
- [ ] Seed script that populates all collections from `site-report.md` data
- [ ] All 4 coaches created with bios, rates, qualifications, and photos (from `assets/`)
- [ ] All kids programs (La Petite, Red Ball, Orange Ball, Green Dot, Regular Ball) created
- [ ] Girls In Tennis, Wheelchair Tennis, and Adult Lessons programs created
- [ ] All 6 tournaments for 2026 created
- [ ] All 8 sponsors created with correct tiers
- [ ] Site settings populated (address, phone, email, about text, volunteer text)
- [ ] Current announcements created (memberships sold out, spring programs live)
- [ ] Logo and app store badge images uploaded to media collection
- [ ] Seed runs cleanly: `pnpm seed`

---

### US-004: Site Layout and Navigation
**Description:** As a visitor, I want clear, modern navigation so I can find information quickly.

**Acceptance Criteria:**
- [ ] Responsive header with club logo and navigation
- [ ] Navigation structure:
  - Home
  - About (club history, facility, volunteer/donate)
  - Programs (dropdown → Kids, Girls In Tennis, Wheelchair Tennis, Adults)
  - Coaches
  - Tournaments
  - Sponsors
  - Contact
- [ ] Prominent "Book a Court" CTA button in header → opens LoveMyClub in new tab
- [ ] "Member Login" link in header → opens LoveMyClub login in new tab
- [ ] Sticky/fixed header on scroll
- [ ] Mobile hamburger menu
- [ ] Footer with: address, phone, email, app store badges, LoveMyClub links, copyright
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

---

### US-005: Home Page
**Description:** As a visitor, I want an engaging home page that gives me an overview of the club.

**Acceptance Criteria:**
- [ ] Hero section with club image/logo and tagline
- [ ] Active announcements banner (from `announcements` collection, filtered by active + date range)
- [ ] "About" summary section — 6 outdoor courts, 100+ year history, charity-run, part of Okanagan Mission Community Hall Association
- [ ] Quick links section to Programs, Coaches, Tournaments
- [ ] "Book a Court" CTA card → LoveMyClub (new tab)
- [ ] Volunteer/Donate section with CTA
- [ ] All content editable via PayloadCMS
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

---

### US-006: About Page
**Description:** As a visitor, I want to learn about the club's history, mission, and how to get involved.

**Acceptance Criteria:**
- [ ] Club history section (100+ years, oldest charity-run tennis facility in Kelowna)
- [ ] Facility details (6 outdoor courts, location)
- [ ] Parent organization info (Okanagan Mission Community Hall Association)
- [ ] Volunteer opportunities section (food prep, skills sharing, fundraising ideas)
- [ ] Donation CTA with note about charitable receipts
- [ ] Content pulled from `siteSettings` global (editable by admin)
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

---

### US-007: Programs Pages
**Description:** As a visitor, I want to browse tennis programs by category so I can find the right one for me or my child.

**Acceptance Criteria:**
- [ ] Programs index page showing all categories with brief descriptions
- [ ] Category sub-pages: Kids Lessons, Girls In Tennis, Wheelchair Tennis, Adult Lessons
- [ ] Each program card shows: name, age range, schedule, description
- [ ] "Register" button on each program → opens LoveMyClub registration URL in new tab
- [ ] Note displayed: "All lessons are non refundable" and "Register and pay online — no cash or cheques"
- [ ] Kids page shows progressive ball system (La Petite → Red → Orange → Green Dot → Regular)
- [ ] Girls In Tennis page highlights Coach Lily Clerf and "led by girls for girls" mission
- [ ] Wheelchair Tennis page includes equipment contact info (Lily Clerf)
- [ ] Adult page shows NTRP skill levels (1.0 through 3.5+)
- [ ] Advanced juniors note with Uri's contact info
- [ ] Programs pulled from CMS collection (admin-editable)
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

---

### US-008: Coaches Page
**Description:** As a visitor, I want to see who the coaches are, their qualifications, and how to book private lessons.

**Acceptance Criteria:**
- [ ] Grid or card layout showing all coaches
- [ ] Each coach card shows: photo, name, title/role, bio excerpt
- [ ] Expanded view (modal or detail section) shows: full bio, qualifications, rates table, contact info
- [ ] Note at top: "Group lessons are club organized. All private lessons are booked through coaches directly."
- [ ] Coach data pulled from CMS collection (admin can add/edit/remove coaches)
- [ ] Coach photos from uploaded media
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

---

### US-009: Tournaments Page
**Description:** As a visitor, I want to see the tournament schedule and register for upcoming events.

**Acceptance Criteria:**
- [ ] Tournament list/timeline for the current year
- [ ] Each tournament shows: name, date(s), registration deadline (if applicable), sanctioning info
- [ ] "Register" button where applicable → LoveMyClub (new tab)
- [ ] Contact info for tournament questions (Head Pro Uri Yarkoni)
- [ ] Tournaments pulled from CMS collection (admin-editable, filterable by year)
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

---

### US-010: Sponsors Page
**Description:** As a visitor or potential sponsor, I want to see current sponsors and learn about sponsorship opportunities.

**Acceptance Criteria:**
- [ ] Sponsors displayed by tier (Platinum, Gold, then others)
- [ ] Each sponsor shows: name, logo (if available), tier badge
- [ ] Sponsorship inquiry CTA with contact info (Alli, McNeill Communications)
- [ ] Sponsors pulled from CMS collection (admin-editable)
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

---

### US-011: Contact Page
**Description:** As a visitor, I want to find contact info and the club's location.

**Acceptance Criteria:**
- [ ] Club contact details: phone (250-764-7477), email (info@okmissiontennis.org), address
- [ ] Embedded Google Map with correct Kelowna coordinates (~49.8547, -119.4920) — NOT the broken Germany coordinates from the old site
- [ ] Contact form (optional — sends email to info@okmissiontennis.org)
- [ ] App store badges with links to LoveOurClub app
- [ ] Contact info pulled from `siteSettings` global
- [ ] Typecheck passes
- [ ] Verify in browser using dev-browser skill

---

### US-012: SEO and Metadata
**Description:** As a club admin, I want the site to be discoverable via search engines.

**Acceptance Criteria:**
- [ ] Each page has configurable meta title and description (from CMS)
- [ ] Open Graph tags for social sharing
- [ ] Sitemap.xml auto-generated
- [ ] robots.txt configured
- [ ] Semantic HTML (proper heading hierarchy, landmarks)
- [ ] Typecheck passes

---

### US-013: Mobile Responsiveness
**Description:** As a mobile visitor, I want the site to work well on my phone.

**Acceptance Criteria:**
- [ ] All pages render correctly on mobile (320px–768px)
- [ ] Touch-friendly navigation (hamburger menu, tap targets)
- [ ] Images are responsive (srcset or Next.js Image optimization)
- [ ] No horizontal scroll on any page
- [ ] Verify in browser using dev-browser skill (emulate mobile)

## Functional Requirements

- FR-1: The site must be built with Next.js 15 (App Router) and PayloadCMS 3.x
- FR-2: All CMS content must be editable by admins through the PayloadCMS admin panel at `/admin`
- FR-3: All "Register" and "Book" links must open the corresponding LoveMyClub URL in a new browser tab (`target="_blank"` with `rel="noopener"`)
- FR-4: The "Member Login" and "Book a Court" buttons must link to the LoveMyClub platform (new tab)
- FR-5: The LoveMyClub base URL must be configurable via CMS site settings (currently `okmissiontennis.org/ClubMember/...`)
- FR-6: The site must use SQLite by default for simple local hosting, with the ability to swap to Postgres via environment variable
- FR-7: Announcements must support active/inactive toggle and date-range visibility
- FR-8: Programs must be categorizable and filterable by type (kids, girls, wheelchair, adult)
- FR-9: Coaches must be orderable (sortOrder field) so admins control display order
- FR-10: Sponsors must be orderable within tiers
- FR-11: The Google Map on the contact page must use correct coordinates for 4409 Lakeshore Road, Kelowna, BC (~49.8547, -119.4920)
- FR-12: App store badge links must point to the LoveOurClub mobile app (Apple: `apps.apple.com/ca/app/love-our-club/id1120427940`, Google Play: `play.google.com/store/apps/details?id=com.epicware.loveourclubmobile`)

## Non-Goals

- No user authentication on the brochure site (auth lives in LoveMyClub)
- No court booking or reservation system (deferred to LoveMyClub)
- No payment processing (deferred to LoveMyClub)
- No member directory or member profiles
- No event registration forms (all registration links go to LoveMyClub)
- No blog or news feed (unless the admin requests it later)
- No e-commerce or online store
- No social media feed integration

## Design Considerations

- **Tone**: Clean, approachable, family-friendly yet slightly professional. Not corporate, not overly playful. Think "community sports club that takes tennis seriously."
- **Color palette**: Derive from the existing logo (green/blue circular badge). Use those as primary accent colors with plenty of white space.
- **Typography**: Modern sans-serif, highly readable. Consider Inter, DM Sans, or similar.
- **Imagery**: Coach photos are available. Club/facility photos needed from admin — use placeholder sections until provided.
- **Layout**: Full-width hero sections, card-based program/coach/tournament listings, generous padding.
- **Inspiration**: Modern sports club websites — clean cards, strong CTAs, easy scanning.

## Technical Considerations

- **PayloadCMS 3.x**: Embedded mode (not headless API) — runs in the same Next.js process
- **Database**: SQLite via `@payloadcms/db-sqlite` for easy local hosting; Postgres swap via `@payloadcms/db-postgres`
- **Deployment**: Must work with `node` directly (no Vercel/serverless requirement). Docker-friendly.
- **Image handling**: Use PayloadCMS media collection + Next.js `<Image>` for optimization
- **Styling**: Tailwind CSS 4
- **Seed data**: All content from `site-report.md` should be seeded on first run. Images from `assets/` directory.
- **Environment variables**: Database URL, PayloadCMS secret, Google Maps API key (or use free embed)

## Success Metrics

- All content from the old site is present and correct on the new site
- Admin can update any content section via PayloadCMS without developer help
- Site loads in under 3 seconds on mobile (Lighthouse performance > 80)
- All LoveMyClub links work correctly (open in new tab, correct URLs)
- Google Map shows correct Kelowna location
- Site is fully responsive on mobile, tablet, and desktop

## Open Questions

- Should the "Public Play" page content be recreated? It was gated behind paid membership on the old site. Need admin to provide this content.
- Should the "Socials" page content be recreated? Also gated — need admin input on whether this should be public.
- Should there be a "Membership" info page with pricing tiers, or just a CTA to contact/LoveMyClub? The old site's Membership & Rules page was gated.
- Does the club want a contact form, or just listed contact info?
- What facility/club photos are available for the hero section and about page?
- Does the club have sponsor logos in digital format?
- Is there a preferred Google Maps API key, or should we use a free embed/static map?

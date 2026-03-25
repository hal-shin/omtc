# OK Mission Tennis Club — Site Scrape Report

> **Purpose**: This report captures all publicly available content from the existing okmissiontennis.org website (powered by LoveMyClub/LoveOurClub platform). It is intended as a source-of-truth for an AI agent building a new brochure website. The LoveMyClub booking/membership platform will remain as a sidecar application — links to it should be preserved.

---

## 1. Club Identity & Branding

| Field | Value |
|-------|-------|
| **Full Name** | OK Mission Tennis Club |
| **Also referred to as** | Okanagan Mission Tennis, Ok Mission Tennis |
| **Address** | 4409 Lakeshore Road, Kelowna, BC V1W 1W7, Canada |
| **Phone** | 250-764-7477 |
| **Email** | info@okmissiontennis.org |
| **Website** | okmissiontennis.org |
| **Logo URL** | `https://loveourclubprod.blob.core.windows.net/9821c224-94af-4596-9894-9887a2b69dc0/7ef54c1f-f416-42c7-afaa-9a17574c34bc.jpg` (542x529px, circular green/blue badge with crossed rackets, text "OKANAGAN MISSION TENNIS") |
| **Copyright** | © 2026 - OK Mission Tennis Club |
| **Parent Organization** | Okanagan Mission Community Hall Association |
| **Status** | Oldest and only charity-run tennis facility in Kelowna |
| **Facility** | 6 outdoor courts |
| **History** | Tennis has been played on these courts for over 100 years |

### Color Scheme (observed from screenshots)
- **Primary**: Blue (navbar background, accent links) — approximately `#337ab7` or similar Bootstrap blue
- **Text**: Dark gray/black on white background
- **Layout**: Simple Bootstrap-based responsive layout, single-column content

---

## 2. Current Site Architecture

### Navigation Structure
```
Home
Public Play                    [LOGIN REQUIRED]
Lessons & Camps (dropdown)
  ├── Mission Tennis Coaches   [LOGIN REQUIRED]
  ├── Kids Lessons             [PUBLIC]
  ├── Girls In Tennis          [PUBLIC]
  ├── Wheelchair Tennis        [PUBLIC]
  └── Adult Lessons            [PUBLIC]
Tournaments (dropdown)
  └── Tournaments 2026         [PUBLIC]
Member Area (dropdown)
  ├── Socials                  [LOGIN REQUIRED]
  ├── Membership & Rules       [LOGIN REQUIRED]
  └── Sponsorship              [PUBLIC]
Contact                        [PUBLIC]
Register
Log In
```

### LoveMyClub (Sidecar) Integration Points

The current site runs entirely on the LoveMyClub/LoveOurClub platform (`okmissiontennis.org/ClubMember/...`). The following URLs point into the booking/registration system and should be linked to (not replicated) on the new brochure site:

- **All "Register here" links** for lessons/events → `okmissiontennis.org/ClubMember/ClubEvent?ID=...`
- **Login** → `okmissiontennis.org/ClubMember/...` (login page)
- **Register (new account)** → LoveMyClub registration flow
- **Public Play** → members-only area
- **Socials** → members-only area
- **Membership & Rules** → members-only area

### Mobile Apps (LoveOurClub)
- **Apple App Store**: https://apps.apple.com/ca/app/love-our-club/id1120427940
- **Google Play Store**: https://play.google.com/store/apps/details?id=com.epicware.loveourclubmobile&hl=en_US&gl=US

---

## 3. Page-by-Page Content

### 3.1 HOME PAGE

**Key Announcements:**
- "Memberships for 2026 are Sold Out."
- "For the 2026 wait list, contact us."
- "Spring programs are live for registration — please check out Lessons and Camps, Girls in Tennis, Wheelchair Tennis and Adult Lessons."

**About the Club:**
> Okanagan Mission Tennis has six outdoor courts in the Mission.
> Each year our members enjoy club tournaments, morning, and evening leagues (ladies, men's, singles, mixed doubles and others) and our popular club socials.
>
> To serve the community, our experienced coaches lead numerous group adult tennis lessons as well as our popular kids & juniors lessons/camps for all skill levels. Private lessons are also available.

**Heritage Section:**
> Tennis has been played on our courts for over 100 years!
>
> Okanagan Mission Tennis is part of the Okanagan Mission Community Hall Association. We are proud to be the oldest and only charity run Tennis facility in Kelowna with a focus on giving back to our members and the community.

**Volunteer / Donate Section:**
> Please Give Back - Volunteer or Donate
>
> Are you too busy to volunteer? A financial donation is appreciated and you will receive a charitable receipt.
>
> **Volunteers are needed in the following areas:**
> - Food prep/Clean up (club socials & tournaments)
>
> **Your time or a donation can help!**
> - Do you have a special skill you can share?
> - Do you have a fundraising idea you would like to implement?
> - Please contact us to share your ideas.

---

### 3.2 KIDS LESSONS (Public)

**Page Title**: ~Kids Lessons 2026~

**General Note**: "Spring programs are live for registration — please log in as a member or as a guest for access"

#### Programs:

**LA PETITE: 3–5 Year Olds**
> For the tiny ones… fun games and activities to develop some coordination and skills in preparation to learning tennis later on.
- La Petite — Sundays @ 9am → [Register](okmissiontennis.org/ClubMember/ClubEvent?ID=ef9dcdf6-c6d9-4251-99b0-3341b1b47921)

**RED BALL FUNDAMENTALS: 5–7 Year Olds**
> For kids ages 5-7, 1 hour of on court that will include introduction to the game of tennis, scoring, rules, tactical and technical skills, as well as general coordination skills and fitness. Lessons will use a red tennis ball and smaller courts designed for these ages in order to ease learning tennis skills. Appropriately sized racquets can be provided if needed.
- Red Ball — Wednesdays @ 3:30pm → [Register](okmissiontennis.org/ClubMember/ClubEvent?ID=74e67b3d-21f6-42c6-9486-e4c4280c3056)
- Red Ball — Sundays @ 10:00am → [Register](okmissiontennis.org/ClubMember/ClubEvent?ID=be7b53e5-ab30-4087-b0d9-ae43f35d30cb)

**ORANGE BALL FUNDAMENTALS: 7–9 Year Olds**
> For kids of ages 7-9, 1 hour of on court lessons that will include introduction to the game of tennis, scoring, rules, tactical and technical skills, as well as general coordination skills and fitness. Lessons will use an Orange tennis ball and a 3/4 sized court designed for these ages in order to ease learning tennis skills. Appropriately sized racquets can be provided if needed.
- Orange Ball — Wednesdays @ 4:30pm → [Register](okmissiontennis.org/ClubMember/ClubEvent?ID=3dd47b06-9f6a-4c37-8374-2233954ec5fa)
- Orange Ball — Sundays @ 11:00am → [Register](okmissiontennis.org/ClubMember/ClubEvent?ID=f82a205c-5fd5-4b7f-a4d6-dde82ddc1c00)

**GREEN DOT FUNDAMENTALS: 9–10 Year Olds**
> For kids of ages 9-10, 1 hour of on court lessons that will include introduction to the game of tennis, scoring, rules, tactical and technical skills, as well as general coordination skills and fitness. Lessons will use a green dot tennis ball and a full sized court in order to ease learning tennis skills. Appropriately sized racquets can be provided if needed.
- Green Dot — Fridays @ 3:30pm → [Register](okmissiontennis.org/ClubMember/ClubEvent?ID=d068a47e-555c-43a3-be84-597b8f67f5ad)
- Green Dot — Sundays @ 12:00pm → [Register](okmissiontennis.org/ClubMember/ClubEvent?ID=632c7c19-5a50-4051-96f4-01de048e7cb1)

**REGULAR BALL FUNDAMENTALS: 11+**
> For kids of ages 11+, 1 hour on-court lessons. Lessons will use a regular ball and a regular sized court.
- Regular Ball — Fridays @ 4:30pm → [Register](okmissiontennis.org/ClubMember/ClubEvent?ID=2fecaba0-05b0-4a19-a853-fd730a67a457)
- Regular Ball — Sundays @ 1:00pm → [Register](okmissiontennis.org/ClubMember/ClubEvent?ID=ab6fad09-004f-4909-a40e-2a3904e301a4)

**Advanced Juniors Note:**
> For advanced Junior players (Development & Competitive) please contact Uri directly — uriytennis@gmail.com

**Policies:**
- All lessons are non refundable
- Register and pay online — fast and convenient
- No cash or cheques please

---

### 3.3 GIRLS IN TENNIS (Public)

**Page Title**: ~Girls in Tennis Lessons 2026~

**Program: GIRLS IN TENNIS — Keeping Girls in Sport**

> Lead by Coach Lily Clerf
>
> This program is led by girls for girls. Tennis Canada certified instructor Lily Clerf leads a team of female coaches as they teach and empower the next generation. This is a beginner introduction to various tennis shots and game play all while having tons of fun.
> If needed, appropriate sized racquets are available.

**Sessions:**
- U10 Girls — Fridays @ 5:30PM → [Register](okmissiontennis.org/ClubMember/ClubEvent?ID=ae17b69a-4c90-4a1a-aa42-3d7ba2847cf3)
- U16 Girls — Fridays @ 6:30PM → [Register](okmissiontennis.org/ClubMember/ClubEvent?ID=edd8a439-9073-48fa-b9c7-aeb3cfe3a09c)

**Policies:** All lessons are non refundable. Register and pay online. No cash or cheques.

---

### 3.4 WHEELCHAIR TENNIS (Public)

**Page Title**: ~Wheelchair Tennis 2026~

> Lead by Coach Lily Clerf
>
> Open to all abilities. This is an introduction to tennis shots and the game structure as well as Wheelchair Tennis specific rules and shots. This program is adapted to fit the need of all participants. If equipment is required please contact Lily Clerf at lilyclerf@gmail.com and we will be happy to help.

**Sessions:**
- Fridays @ 4pm → [Register](okmissiontennis.org/ClubMember/ClubEvent?ID=d838b96d-0ec3-4a76-b0b9-5d76d31ace34)

**Policies:** Register and pay online. No cash or cheques.

---

### 3.5 ADULT LESSONS (Public)

**Page Title**: ~Adult Lessons 2026~

**Programs (using NTRP skill ratings):**

- **Adult Beginner** (1.0) — Sundays @ 3pm → [Register](okmissiontennis.org/ClubMember/ClubEvent?ID=28016243-dccd-44e0-a7eb-2f226af043b1)
- **Adult Advanced Beginner** (1.5–2.0) — Sundays @ 4pm → [Register](okmissiontennis.org/ClubMember/ClubEvent?ID=bae27a41-8d71-4682-adbd-8a9c8f5ff40c)
- **Adult Intermediate** (2.5–3.0) — Sundays @ 5pm → [Register](okmissiontennis.org/ClubMember/ClubEvent?ID=0d2c3fef-5267-487d-b9c2-17dc4843de51)
- **Adult Advanced Intermediate** (3.5+) — Sundays @ 6pm → [Register](okmissiontennis.org/ClubMember/ClubEvent?ID=70e7fce2-b918-401b-b27e-55f7913d7dda)

**Policies:** All lessons are non refundable. Register and pay online. No cash or cheques.

---

### 3.6 TOURNAMENTS 2026 (Public)

**Page Title**: ~Tournaments 2026~

**Contact for tournament questions:** Head Pro Uri Yarkoni — uriytennis@gmail.com

| Tournament | Date(s) | Notes |
|-----------|---------|-------|
| Ice Breaker Tournament/Social | April 11th | Registration deadline April 4th. [Register](okmissiontennis.org/ClubMember/ClubEvent?ID=78d1c880-722c-4333-b0b5-afb0a6603692) |
| 2 Star Junior Tennis Tournament | May 23rd & 24th | Tennis BC Sanctioned |
| Rookie Tour Junior Kids Tournament | June 20th | Tennis BC Sanctioned |
| Mid Summer Open Singles Tournament | July 3rd–5th | — |
| Mid Summer Open Doubles Tournament | August 14th–16th | — |
| Club Championships | Sept 18th–20th | — |

---

### 3.7 SPONSORSHIP (Public)

**Page Title**: Welcome to the Sponsorship page!

**Content:**
> OK Mission Tennis Club sponsorship update: We are very pleased to report that the sponsorship programs have been a huge success!

**Current Sponsors:**
| Sponsor | Level |
|---------|-------|
| Thomas Alan Budd Foundations | Platinum |
| Core Chiropractic | Gold |
| Farming Karma | — |
| Cedar Creek Estate Winery | — |
| The Beer Institute | — |
| Tim Hortons (downtown and airport stores) | — |
| It's A Bakery | — |
| Prosign sign professionals | — |

> Several more donors have come forward and are considering which level to support our sponsorship programs at. We hope you consider supporting these organisations if possible.
>
> You will start to see some banners which will be hung in specific areas to showcase and thank our sponsors this weekend as well as a new WELCOME to our club banner with their logos.
>
> More special events and other exciting additions will be taking place to enhance your membership.
>
> We have a few spots left for sponsorships so if interested, pleased let me know!

**Sponsorship Contact:**
- Alli, McNeill Communications
- Mobile: 250.212.4831
- Email: alli@mcneillcommunications.ca

---

### 3.8 CONTACT (Public)

**Content:**
> Contact OK Mission Tennis Club
> OK Mission Tennis Club is here to help. Please feel free to contact us if you require our assistance or information.

- **Telephone**: 250-764-7477
- **Address**: 4409 Lakeshore Road, Kelowna, BC, V1W 1W7, Canada
- **Email**: info@okmissiontennis.org
- **Website**: okmissiontennis.org

**Google Maps embed** present (though currently misconfigured — pointing to wrong coordinates in Germany rather than Kelowna, BC).

---

## 4. Key People

| Name | Role | Contact |
|------|------|---------|
| Uri Yarkoni | Head Pro / Coach | uriytennis@gmail.com |
| Lily Clerf | Coach (Girls in Tennis, Wheelchair Tennis) — Tennis Canada certified | lilyclerf@gmail.com |
| Alli (McNeill Communications) | Sponsorship coordinator | alli@mcneillcommunications.ca / 250.212.4831 |

---

## 5. MISSION TENNIS COACHES (Scraped via Auth)

**Page Title**: ~Mission Tennis Coaches 2026~

> Group lessons are club organized.
> All private lessons are booked through coaches directly.
> View our Lessons and Camps pages to see prices and schedules for our Kids Programs, Girls in Tennis and Adult Lessons.
> Questions? Contact: Head Pro Uri Yarkoni @ uriytennis@gmail.com

### Coach: Uri Yarkoni — Head Pro and Director of Adult Programming
- **Email**: uriytennis@gmail.com
- **Mobile**: 250-212-3206
- **Photo**: `assets/coach-uri-yarkoni.jpg`
- **Rates**:
  - Private: $75 member / $85 non-member
  - 2 Players: $45/member / $55/non-member
  - 3 Players: $35/member / $45/non-member
  - Small Group: $30/member / $40/non-member
- **Qualifications**:
  - Certified Tennis Professionals of Canada Instructor
  - Club Professional 1 (Tennis BC / Tennis Canada)
  - Coached at OK Mission Tennis in previous seasons
  - Coaching experience with all levels and ages in North Carolina and Israel as well as Kelowna
- **Bio**: Uri grew up as a competitive tennis player, always enjoying his time on court. He played NCAA college tennis for 4 years in North Carolina while completing a Business Management degree. Uri really enjoys sharing his knowledge of the game and taking a role in a player's development. After spending many years traveling around the world, Uri is very excited about returning to the tennis world and the club!

### Coach: Johnny V — "The Court Jester", Director of Kids Programming
- **Email**: coach@johnnyv.ca
- **Mobile**: 250-808-8378
- **Photo**: `assets/coach-johnny-v.jpeg`
- **Rates**:
  - Private: $65 member / $75 non-member
  - Semi-Private: $37.50/member / $47.50/non-member
  - Small Group: $30/member / $40/non-member
- **Qualifications**:
  - Certified Tennis Professionals of Canada Instructor
  - Bachelor of Education (Phys. Ed. Major) UVIC
  - Founder & Commissioner SD23 Elementary School Tennis League
- **Bio**: Johnny is a retired school teacher and been coaching and teaching kids and adults in Kelowna for over 30 years. He is passionate about introducing young players to the sport which is evident in his enthusiastic attitude on and off the court. He believes in kids having fun while learning tennis and the importance of nurturing their coordination, agility, balance and technique.

### Coach: Mike Mulholland — Assistant Kids and Adult Program Coach
- **Email**: mmulholland87@gmail.com
- **Mobile**: 250-300-4199
- **Photo**: `assets/coach-mike-mulholland.jpg`
- **Rates**:
  - Private: $65/member / $75/non-member
  - 2 Players: $40/member / $50/non-member
  - 3 Players: $30/member / $40/non-member
  - Small Group: $25/member / $35/non-member
- **Qualifications**:
  - Certified Tennis Professionals of Canada Instructor
  - Club Professional 1 (Tennis Canada)
  - First Set Provider for young tennis players
- **Bio**: Mike is a competitive and passionate player who picked up tennis later in life. He loves seeing others succeed and grow in the sport as he has. Mike draws upon his experience in both tennis other sports, psychology and analytics to provide technical and tactical improvements for your game.

### Coach: Lily Clerf — Girls in Tennis and Assistant Coach
- **Email**: lilyclerf@gmail.com
- **Mobile**: 250-808-8302
- **Photo**: `assets/coach-lily-clerf.jpeg`
- **Rates**:
  - Private: $50/member / $60/non-member
  - Semi-Private: $30/member / $40/non-member
- **Qualifications**:
  - Certified Tennis Professionals of Canada Instructor
  - Certified Tennis Canada Wheelchair Instructor
- **Bio**: Lily is a passionate and talented tennis player who has competed on the BC junior circuit for over 5 years! She is passionate about growing tennis in the Okanagan, especially with youth and beginners. She was selected to participate in the Inspire Through Sport Program, a leadership program helping girls across Canada become coaches and leaders within tennis.

---

## 6. Login-Gated Pages (Content Not Available)

The following pages still require higher-level membership access and could not be scraped:

- **Public Play** — Likely contains court booking rules, hours, drop-in info (requires paid membership)
- **Socials** — Likely contains social event calendar/details (requires paid membership)
- **Membership & Rules** — Redirects to Home page; content may only be visible to paid members

> **Recommendation**: Ask the club admin to provide this content separately.

---

## 6. Architecture Recommendations for New Brochure Site

### Pages to Create
1. **Home** — Hero section with club photo, key announcements, about blurb, volunteer/donate CTA
2. **About** — Club history (100+ years), charity status, parent org (Okanagan Mission Community Hall Association), facility details (6 courts)
3. **Lessons & Camps** — Combined page or subpages for:
   - Kids Lessons (La Petite, Red Ball, Orange Ball, Green Dot, Regular Ball)
   - Girls In Tennis
   - Wheelchair Tennis
   - Adult Lessons
4. **Coaches** — Bios for Uri Yarkoni, Lily Clerf, and others (content needed from admin)
5. **Tournaments** — 2026 schedule
6. **Membership** — General info about membership (sold out for 2026), waitlist CTA, link to LoveMyClub for details
7. **Sponsors** — Sponsor list with logos/tiers
8. **Contact** — Address, phone, email, properly configured Google Map (Kelowna coordinates: ~49.8547, -119.4920)

### External Links to Preserve (→ LoveMyClub sidecar)
- All event registration links (`/ClubMember/ClubEvent?ID=...`)
- Member login (`/ClubMember/...`)
- New member registration
- Public Play / court booking
- Mobile app links (Apple Store + Google Play for "Love Our Club" app)

### Assets (Downloaded to `assets/`)
- `logo.jpg` — Club logo (542x529px, circular green/blue badge)
- `apple-app-store-badge.png` — App Store badge
- `google-play-badge.png` — Google Play badge
- `coach-uri-yarkoni.jpg` — Head Pro photo (3008x4000px)
- `coach-johnny-v.jpeg` — Kids Director photo (1141x1045px)
- `coach-mike-mulholland.jpg` — Assistant Coach photo (3008x4000px)
- `coach-lily-clerf.jpeg` — Girls/Wheelchair Coach photo (756x1008px)
- **Still needed from admin**: Club/facility photos, sponsor logos

### Google Map Fix
The current site's Google Map points to coordinates in Germany (50.317, 11.129). The correct coordinates for 4409 Lakeshore Road, Kelowna, BC are approximately **49.8547, -119.4920**.

---

## 7. Screenshots

Screenshots captured and saved to `/Users/hal/projects/omtc/screenshots/`:
- `home.png` — Top of home page (logo, nav, announcements)
- `home-bottom.png` — Bottom of home page (history, volunteer section, footer)

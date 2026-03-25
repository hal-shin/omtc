import path from 'path'
import { fileURLToPath } from 'url'
import { getPayload } from 'payload'
import config from '@payload-config'
import fs from 'fs'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const assetsDir = path.resolve(dirname, '../assets')

async function uploadMedia(
  payload: Awaited<ReturnType<typeof getPayload>>,
  filePath: string,
  alt: string,
): Promise<number> {
  const existing = await payload.find({
    collection: 'media',
    where: { alt: { equals: alt } },
    limit: 1,
  })

  if (existing.docs.length > 0) {
    console.log(`  Media "${alt}" already exists, skipping`)
    return existing.docs[0].id as number
  }

  const ext = path.extname(filePath).toLowerCase()
  const mimeTypes: Record<string, string> = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
  }

  const fileData = fs.readFileSync(filePath)

  const doc = await payload.create({
    collection: 'media',
    data: { alt },
    file: {
      data: fileData,
      name: path.basename(filePath),
      mimetype: mimeTypes[ext] || 'application/octet-stream',
      size: fileData.length,
    },
  })

  console.log(`  Uploaded media "${alt}" (id: ${doc.id})`)
  return doc.id as number
}

function richText(paragraphs: string[]) {
  return {
    root: {
      type: 'root',
      children: paragraphs.map((text) => ({
        type: 'paragraph',
        children: [{ type: 'text', text, version: 1 }],
        direction: 'ltr' as const,
        format: '' as const,
        indent: 0,
        version: 1,
      })),
      direction: 'ltr' as const,
      format: '' as const,
      indent: 0,
      version: 1,
    },
  }
}

async function seedSiteSettings(payload: Awaited<ReturnType<typeof getPayload>>) {
  console.log('Seeding site settings...')

  const logoId = await uploadMedia(
    payload,
    path.join(assetsDir, 'logo.jpg'),
    'OK Mission Tennis Club Logo',
  )

  await uploadMedia(
    payload,
    path.join(assetsDir, 'apple-app-store-badge.png'),
    'Download on the App Store',
  )

  await uploadMedia(
    payload,
    path.join(assetsDir, 'google-play-badge.png'),
    'Get it on Google Play',
  )

  const aboutText = richText([
    'Okanagan Mission Tennis has six outdoor courts in the Mission. Each year our members enjoy club tournaments, morning, and evening leagues (ladies, men\'s, singles, mixed doubles and others) and our popular club socials.',
    'To serve the community, our experienced coaches lead numerous group adult tennis lessons as well as our popular kids & juniors lessons/camps for all skill levels. Private lessons are also available.',
    'Tennis has been played on our courts for over 100 years!',
    'Okanagan Mission Tennis is part of the Okanagan Mission Community Hall Association. We are proud to be the oldest and only charity run Tennis facility in Kelowna with a focus on giving back to our members and the community.',
  ])

  const volunteerText = richText([
    'Please Give Back - Volunteer or Donate',
    'Are you too busy to volunteer? A financial donation is appreciated and you will receive a charitable receipt.',
    'Volunteers are needed in the following areas: Food prep/Clean up (club socials & tournaments).',
    'Your time or a donation can help! Do you have a special skill you can share? Do you have a fundraising idea you would like to implement? Please contact us to share your ideas.',
  ])

  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      clubName: 'OK Mission Tennis Club',
      address: '4409 Lakeshore Road, Kelowna, BC V1W 1W7, Canada',
      phone: '250-764-7477',
      email: 'info@okmissiontennis.org',
      aboutText,
      volunteerText,
      heroImage: logoId,
      logo: logoId,
      lovemyclubBaseUrl: 'https://www.okmissiontennis.org',
      appStoreUrl: 'https://apps.apple.com/ca/app/love-our-club/id1120427940',
      playStoreUrl: 'https://play.google.com/store/apps/details?id=com.epicware.loveourclubmobile&hl=en_US&gl=US',
    },
  })

  console.log('  Site settings updated')
}

async function seedAnnouncements(payload: Awaited<ReturnType<typeof getPayload>>) {
  console.log('Seeding announcements...')

  const announcements = [
    {
      title: 'Memberships for 2026 are Sold Out',
      body: richText([
        'Memberships for 2026 are Sold Out. For the 2026 wait list, contact us.',
      ]),
      active: true,
      priority: 10,
      startDate: '2026-01-01T00:00:00.000Z',
      endDate: '2026-12-31T23:59:59.000Z',
    },
    {
      title: 'Spring programs are live for registration',
      body: richText([
        'Spring programs are live for registration — please check out Lessons and Camps, Girls in Tennis, Wheelchair Tennis and Adult Lessons.',
      ]),
      active: true,
      priority: 5,
      startDate: '2026-01-01T00:00:00.000Z',
      endDate: '2026-06-30T23:59:59.000Z',
    },
  ]

  for (const announcement of announcements) {
    const existing = await payload.find({
      collection: 'announcements',
      where: { title: { equals: announcement.title } },
      limit: 1,
    })

    if (existing.docs.length > 0) {
      console.log(`  Announcement "${announcement.title}" already exists, skipping`)
      continue
    }

    await payload.create({
      collection: 'announcements',
      data: announcement,
    })

    console.log(`  Created announcement: "${announcement.title}"`)
  }
}

async function seedCoaches(payload: Awaited<ReturnType<typeof getPayload>>) {
  console.log('Seeding coaches...')

  const coaches = [
    {
      name: 'Uri Yarkoni',
      role: 'Head Pro, Director of Adult Programming',
      email: 'uriytennis@gmail.com',
      phone: '250-212-3206',
      photoFile: 'coach-uri-yarkoni.jpg',
      photoAlt: 'Coach Uri Yarkoni',
      rates: richText([
        'Private: $75 member / $85 non-member',
        '2 Players: $45/member / $55/non-member',
        '3 Players: $35/member / $45/non-member',
        'Small Group: $30/member / $40/non-member',
      ]),
      qualifications: [
        'Certified Tennis Professionals of Canada Instructor',
        'Club Professional 1 (Tennis BC / Tennis Canada)',
        'Coached at OK Mission Tennis in previous seasons',
        'Coaching experience with all levels and ages in North Carolina and Israel as well as Kelowna',
      ],
      bio: richText([
        'Uri grew up as a competitive tennis player, always enjoying his time on court. He played NCAA college tennis for 4 years in North Carolina while completing a Business Management degree. Uri really enjoys sharing his knowledge of the game and taking a role in a player\'s development. After spending many years traveling around the world, Uri is very excited about returning to the tennis world and the club!',
      ]),
      sortOrder: 1,
    },
    {
      name: 'Johnny V',
      role: 'Director of Kids Programming',
      email: 'coach@johnnyv.ca',
      phone: '250-808-8378',
      photoFile: 'coach-johnny-v.jpeg',
      photoAlt: 'Coach Johnny V',
      rates: richText([
        'Private: $65 member / $75 non-member',
        'Semi-Private: $37.50/member / $47.50/non-member',
        'Small Group: $30/member / $40/non-member',
      ]),
      qualifications: [
        'Certified Tennis Professionals of Canada Instructor',
        'Bachelor of Education (Phys. Ed. Major) UVIC',
        'Founder & Commissioner SD23 Elementary School Tennis League',
      ],
      bio: richText([
        'Johnny is a retired school teacher and been coaching and teaching kids and adults in Kelowna for over 30 years. He is passionate about introducing young players to the sport which is evident in his enthusiastic attitude on and off the court. He believes in kids having fun while learning tennis and the importance of nurturing their coordination, agility, balance and technique.',
      ]),
      sortOrder: 2,
    },
    {
      name: 'Mike Mulholland',
      role: 'Assistant Kids and Adult Program Coach',
      email: 'mmulholland87@gmail.com',
      phone: '250-300-4199',
      photoFile: 'coach-mike-mulholland.jpg',
      photoAlt: 'Coach Mike Mulholland',
      rates: richText([
        'Private: $65/member / $75/non-member',
        '2 Players: $40/member / $50/non-member',
        '3 Players: $30/member / $40/non-member',
        'Small Group: $25/member / $35/non-member',
      ]),
      qualifications: [
        'Certified Tennis Professionals of Canada Instructor',
        'Club Professional 1 (Tennis Canada)',
        'First Set Provider for young tennis players',
      ],
      bio: richText([
        'Mike is a competitive and passionate player who picked up tennis later in life. He loves seeing others succeed and grow in the sport as he has. Mike draws upon his experience in both tennis other sports, psychology and analytics to provide technical and tactical improvements for your game.',
      ]),
      sortOrder: 3,
    },
    {
      name: 'Lily Clerf',
      role: 'Girls in Tennis and Assistant Coach',
      email: 'lilyclerf@gmail.com',
      phone: '250-808-8302',
      photoFile: 'coach-lily-clerf.jpeg',
      photoAlt: 'Coach Lily Clerf',
      rates: richText([
        'Private: $50/member / $60/non-member',
        'Semi-Private: $30/member / $40/non-member',
      ]),
      qualifications: [
        'Certified Tennis Professionals of Canada Instructor',
        'Certified Tennis Canada Wheelchair Instructor',
      ],
      bio: richText([
        'Lily is a passionate and talented tennis player who has competed on the BC junior circuit for over 5 years! She is passionate about growing tennis in the Okanagan, especially with youth and beginners. She was selected to participate in the Inspire Through Sport Program, a leadership program helping girls across Canada become coaches and leaders within tennis.',
      ]),
      sortOrder: 4,
    },
  ]

  for (const coach of coaches) {
    const existing = await payload.find({
      collection: 'coaches',
      where: { name: { equals: coach.name } },
      limit: 1,
    })

    if (existing.docs.length > 0) {
      console.log(`  Coach "${coach.name}" already exists, skipping`)
      continue
    }

    const photoId = await uploadMedia(
      payload,
      path.join(assetsDir, coach.photoFile),
      coach.photoAlt,
    )

    await payload.create({
      collection: 'coaches',
      data: {
        name: coach.name,
        role: coach.role,
        email: coach.email,
        phone: coach.phone,
        photo: photoId,
        rates: coach.rates,
        qualifications: coach.qualifications.map((q) => ({ qualification: q })),
        bio: coach.bio,
        sortOrder: coach.sortOrder,
      },
    })

    console.log(`  Created coach: "${coach.name}"`)
  }
}

async function seedPrograms(payload: Awaited<ReturnType<typeof getPayload>>) {
  console.log('Seeding programs...')

  const baseUrl = 'https://www.okmissiontennis.org/ClubMember/ClubEvent?ID='

  const programs = [
    {
      name: 'La Petite',
      slug: 'la-petite',
      ageRange: '3-5 years',
      category: 'kids' as const,
      season: 'Spring',
      year: 2026,
      description: richText([
        'For the tiny ones… fun games and activities to develop some coordination and skills in preparation to learning tennis later on.',
      ]),
      schedule: [
        { day: 'Sunday', time: '9:00 AM', registrationUrl: `${baseUrl}ef9dcdf6-c6d9-4251-99b0-3341b1b47921` },
      ],
    },
    {
      name: 'Red Ball Fundamentals',
      slug: 'red-ball',
      ageRange: '5-7 years',
      category: 'kids' as const,
      season: 'Spring',
      year: 2026,
      description: richText([
        'For kids ages 5-7, 1 hour of on court that will include introduction to the game of tennis, scoring, rules, tactical and technical skills, as well as general coordination skills and fitness. Lessons will use a red tennis ball and smaller courts designed for these ages in order to ease learning tennis skills. Appropriately sized racquets can be provided if needed.',
      ]),
      schedule: [
        { day: 'Wednesday', time: '3:30 PM', registrationUrl: `${baseUrl}74e67b3d-21f6-42c6-9486-e4c4280c3056` },
        { day: 'Sunday', time: '10:00 AM', registrationUrl: `${baseUrl}be7b53e5-ab30-4087-b0d9-ae43f35d30cb` },
      ],
    },
    {
      name: 'Orange Ball Fundamentals',
      slug: 'orange-ball',
      ageRange: '7-9 years',
      category: 'kids' as const,
      season: 'Spring',
      year: 2026,
      description: richText([
        'For kids of ages 7-9, 1 hour of on court lessons that will include introduction to the game of tennis, scoring, rules, tactical and technical skills, as well as general coordination skills and fitness. Lessons will use an Orange tennis ball and a 3/4 sized court designed for these ages in order to ease learning tennis skills. Appropriately sized racquets can be provided if needed.',
      ]),
      schedule: [
        { day: 'Wednesday', time: '4:30 PM', registrationUrl: `${baseUrl}3dd47b06-9f6a-4c37-8374-2233954ec5fa` },
        { day: 'Sunday', time: '11:00 AM', registrationUrl: `${baseUrl}f82a205c-5fd5-4b7f-a4d6-dde82ddc1c00` },
      ],
    },
    {
      name: 'Green Dot Fundamentals',
      slug: 'green-dot',
      ageRange: '9-10 years',
      category: 'kids' as const,
      season: 'Spring',
      year: 2026,
      description: richText([
        'For kids of ages 9-10, 1 hour of on court lessons that will include introduction to the game of tennis, scoring, rules, tactical and technical skills, as well as general coordination skills and fitness. Lessons will use a green dot tennis ball and a full sized court in order to ease learning tennis skills. Appropriately sized racquets can be provided if needed.',
      ]),
      schedule: [
        { day: 'Friday', time: '3:30 PM', registrationUrl: `${baseUrl}d068a47e-555c-43a3-be84-597b8f67f5ad` },
        { day: 'Sunday', time: '12:00 PM', registrationUrl: `${baseUrl}632c7c19-5a50-4051-96f4-01de048e7cb1` },
      ],
    },
    {
      name: 'Regular Ball Fundamentals',
      slug: 'regular-ball',
      ageRange: '11+',
      category: 'kids' as const,
      season: 'Spring',
      year: 2026,
      description: richText([
        'For kids of ages 11+, 1 hour on-court lessons. Lessons will use a regular ball and a regular sized court.',
      ]),
      schedule: [
        { day: 'Friday', time: '4:30 PM', registrationUrl: `${baseUrl}2fecaba0-05b0-4a19-a853-fd730a67a457` },
        { day: 'Sunday', time: '1:00 PM', registrationUrl: `${baseUrl}ab6fad09-004f-4909-a40e-2a3904e301a4` },
      ],
    },
    {
      name: 'Girls In Tennis U10',
      slug: 'girls-in-tennis-u10',
      ageRange: 'Under 10',
      category: 'girls' as const,
      season: 'Spring',
      year: 2026,
      description: richText([
        'This program is led by girls for girls. Tennis Canada certified instructor Lily Clerf leads a team of female coaches as they teach and empower the next generation. This is a beginner introduction to various tennis shots and game play all while having tons of fun. If needed, appropriate sized racquets are available.',
      ]),
      schedule: [
        { day: 'Friday', time: '5:30 PM', registrationUrl: `${baseUrl}ae17b69a-4c90-4a1a-aa42-3d7ba2847cf3` },
      ],
    },
    {
      name: 'Girls In Tennis U16',
      slug: 'girls-in-tennis-u16',
      ageRange: 'Under 16',
      category: 'girls' as const,
      season: 'Spring',
      year: 2026,
      description: richText([
        'This program is led by girls for girls. Tennis Canada certified instructor Lily Clerf leads a team of female coaches as they teach and empower the next generation. This is a beginner introduction to various tennis shots and game play all while having tons of fun. If needed, appropriate sized racquets are available.',
      ]),
      schedule: [
        { day: 'Friday', time: '6:30 PM', registrationUrl: `${baseUrl}edd8a439-9073-48fa-b9c7-aeb3cfe3a09c` },
      ],
    },
    {
      name: 'Wheelchair Tennis',
      slug: 'wheelchair-tennis',
      ageRange: 'All ages',
      category: 'wheelchair' as const,
      season: 'Spring',
      year: 2026,
      description: richText([
        'Open to all abilities. This is an introduction to tennis shots and the game structure as well as Wheelchair Tennis specific rules and shots. This program is adapted to fit the need of all participants. If equipment is required please contact Lily Clerf at lilyclerf@gmail.com and we will be happy to help.',
      ]),
      schedule: [
        { day: 'Friday', time: '4:00 PM', registrationUrl: `${baseUrl}d838b96d-0ec3-4a76-b0b9-5d76d31ace34` },
      ],
    },
    {
      name: 'Adult Beginner',
      slug: 'adult-beginner',
      ageRange: 'Adult (NTRP 1.0)',
      category: 'adult' as const,
      season: 'Spring',
      year: 2026,
      description: richText([
        'Adult beginner tennis lessons for players at NTRP skill level 1.0.',
      ]),
      schedule: [
        { day: 'Sunday', time: '3:00 PM', registrationUrl: `${baseUrl}28016243-dccd-44e0-a7eb-2f226af043b1` },
      ],
    },
    {
      name: 'Adult Advanced Beginner',
      slug: 'adult-advanced-beginner',
      ageRange: 'Adult (NTRP 1.5-2.0)',
      category: 'adult' as const,
      season: 'Spring',
      year: 2026,
      description: richText([
        'Adult advanced beginner tennis lessons for players at NTRP skill level 1.5-2.0.',
      ]),
      schedule: [
        { day: 'Sunday', time: '4:00 PM', registrationUrl: `${baseUrl}bae27a41-8d71-4682-adbd-8a9c8f5ff40c` },
      ],
    },
    {
      name: 'Adult Intermediate',
      slug: 'adult-intermediate',
      ageRange: 'Adult (NTRP 2.5-3.0)',
      category: 'adult' as const,
      season: 'Spring',
      year: 2026,
      description: richText([
        'Adult intermediate tennis lessons for players at NTRP skill level 2.5-3.0.',
      ]),
      schedule: [
        { day: 'Sunday', time: '5:00 PM', registrationUrl: `${baseUrl}0d2c3fef-5267-487d-b9c2-17dc4843de51` },
      ],
    },
    {
      name: 'Adult Advanced Intermediate',
      slug: 'adult-advanced-intermediate',
      ageRange: 'Adult (NTRP 3.5+)',
      category: 'adult' as const,
      season: 'Spring',
      year: 2026,
      description: richText([
        'Adult advanced intermediate tennis lessons for players at NTRP skill level 3.5+.',
      ]),
      schedule: [
        { day: 'Sunday', time: '6:00 PM', registrationUrl: `${baseUrl}70e7fce2-b918-401b-b27e-55f7913d7dda` },
      ],
    },
  ]

  for (const program of programs) {
    const existing = await payload.find({
      collection: 'programs',
      where: { slug: { equals: program.slug } },
      limit: 1,
    })

    if (existing.docs.length > 0) {
      console.log(`  Program "${program.name}" already exists, skipping`)
      continue
    }

    await payload.create({
      collection: 'programs',
      data: program,
    })

    console.log(`  Created program: "${program.name}"`)
  }
}

async function seedTournaments(payload: Awaited<ReturnType<typeof getPayload>>) {
  console.log('Seeding tournaments...')

  const baseUrl = 'https://www.okmissiontennis.org/ClubMember/ClubEvent?ID='

  const tournaments = [
    {
      name: 'Ice Breaker Tournament/Social',
      startDate: '2026-04-11T00:00:00.000Z',
      endDate: '2026-04-11T00:00:00.000Z',
      registrationUrl: `${baseUrl}78d1c880-722c-4333-b0b5-afb0a6603692`,
      registrationDeadline: '2026-04-04T00:00:00.000Z',
      year: 2026,
    },
    {
      name: '2 Star Junior Tennis Tournament',
      startDate: '2026-05-23T00:00:00.000Z',
      endDate: '2026-05-24T00:00:00.000Z',
      sanctionedBy: 'Tennis BC',
      year: 2026,
    },
    {
      name: 'Rookie Tour Junior Kids Tournament',
      startDate: '2026-06-20T00:00:00.000Z',
      endDate: '2026-06-20T00:00:00.000Z',
      sanctionedBy: 'Tennis BC',
      year: 2026,
    },
    {
      name: 'Mid Summer Open Singles Tournament',
      startDate: '2026-07-03T00:00:00.000Z',
      endDate: '2026-07-05T00:00:00.000Z',
      year: 2026,
    },
    {
      name: 'Mid Summer Open Doubles Tournament',
      startDate: '2026-08-14T00:00:00.000Z',
      endDate: '2026-08-16T00:00:00.000Z',
      year: 2026,
    },
    {
      name: 'Club Championships',
      startDate: '2026-09-18T00:00:00.000Z',
      endDate: '2026-09-20T00:00:00.000Z',
      year: 2026,
    },
  ]

  for (const tournament of tournaments) {
    const existing = await payload.find({
      collection: 'tournaments',
      where: { name: { equals: tournament.name } },
      limit: 1,
    })

    if (existing.docs.length > 0) {
      console.log(`  Tournament "${tournament.name}" already exists, skipping`)
      continue
    }

    await payload.create({
      collection: 'tournaments',
      data: tournament,
    })

    console.log(`  Created tournament: "${tournament.name}"`)
  }
}

async function seedSponsors(payload: Awaited<ReturnType<typeof getPayload>>) {
  console.log('Seeding sponsors...')

  const sponsors = [
    { name: 'Thomas Alan Budd Foundations', tier: 'platinum' as const, sortOrder: 1 },
    { name: 'Core Chiropractic', tier: 'gold' as const, sortOrder: 2 },
    { name: 'Farming Karma', tier: 'supporter' as const, sortOrder: 3 },
    { name: 'Cedar Creek Estate Winery', tier: 'supporter' as const, sortOrder: 4 },
    { name: 'The Beer Institute', tier: 'supporter' as const, sortOrder: 5 },
    { name: 'Tim Hortons', tier: 'supporter' as const, sortOrder: 6 },
    { name: "It's A Bakery", tier: 'supporter' as const, sortOrder: 7 },
    { name: 'Prosign', tier: 'supporter' as const, sortOrder: 8 },
  ]

  for (const sponsor of sponsors) {
    const existing = await payload.find({
      collection: 'sponsors',
      where: { name: { equals: sponsor.name } },
      limit: 1,
    })

    if (existing.docs.length > 0) {
      console.log(`  Sponsor "${sponsor.name}" already exists, skipping`)
      continue
    }

    await payload.create({
      collection: 'sponsors',
      data: sponsor,
    })

    console.log(`  Created sponsor: "${sponsor.name}"`)
  }
}

export async function seed() {
  const payload = await getPayload({ config })

  console.log('Starting seed...')
  await seedSiteSettings(payload)
  await seedAnnouncements(payload)
  await seedCoaches(payload)
  await seedPrograms(payload)
  await seedTournaments(payload)
  await seedSponsors(payload)
  console.log('Seed complete!')
}

seed()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('Seed failed:', err)
    process.exit(1)
  })

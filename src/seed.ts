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

export async function seed() {
  const payload = await getPayload({ config })

  console.log('Starting seed...')
  await seedSiteSettings(payload)
  await seedAnnouncements(payload)
  console.log('Seed complete!')
}

seed()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('Seed failed:', err)
    process.exit(1)
  })

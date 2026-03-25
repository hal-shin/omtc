import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'clubName',
      type: 'text',
      required: true,
    },
    {
      name: 'address',
      type: 'text',
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'email',
      type: 'text',
    },
    {
      name: 'aboutText',
      type: 'richText',
    },
    {
      name: 'volunteerText',
      type: 'richText',
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'lovemyclubBaseUrl',
      type: 'text',
    },
    {
      name: 'appStoreUrl',
      type: 'text',
    },
    {
      name: 'playStoreUrl',
      type: 'text',
    },
  ],
}

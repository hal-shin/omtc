import type { CollectionConfig } from 'payload'

export const Programs: CollectionConfig = {
  slug: 'programs',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'ageRange', 'season'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      unique: true,
    },
    {
      name: 'ageRange',
      type: 'text',
    },
    {
      name: 'description',
      type: 'richText',
    },
    {
      name: 'schedule',
      type: 'array',
      fields: [
        {
          name: 'day',
          type: 'text',
          required: true,
        },
        {
          name: 'time',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'registrationUrl',
      type: 'text',
    },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'Kids', value: 'kids' },
        { label: 'Girls', value: 'girls' },
        { label: 'Wheelchair', value: 'wheelchair' },
        { label: 'Adult', value: 'adult' },
      ],
    },
    {
      name: 'season',
      type: 'text',
    },
    {
      name: 'year',
      type: 'number',
    },
  ],
}

import type { CollectionConfig } from 'payload'

export const Tournaments: CollectionConfig = {
  slug: 'tournaments',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'startDate', 'year'],
  },
  access: {
    read: () => true,
  },
  defaultSort: 'startDate',
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'startDate',
      type: 'date',
    },
    {
      name: 'endDate',
      type: 'date',
    },
    {
      name: 'description',
      type: 'richText',
    },
    {
      name: 'registrationUrl',
      type: 'text',
    },
    {
      name: 'registrationDeadline',
      type: 'date',
    },
    {
      name: 'sanctionedBy',
      type: 'text',
    },
    {
      name: 'year',
      type: 'number',
    },
  ],
}

import type { CollectionConfig } from 'payload'

export const ChallengeUserSubmissions: CollectionConfig = {
  slug: 'challenge-user-submissions',
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'challenge',
      type: 'relationship',
      relationTo: 'challenges',
      hasMany: false,
      required: true,
    },
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      hasMany: false,
      required: true,
    },
    {
      name: 'solution',
      type: 'text',
      required: true,
    },
    { name: 'annotations', type: 'textarea' },
  ],
  timestamps: true,
}

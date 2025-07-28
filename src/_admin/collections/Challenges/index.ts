import { slugField } from '@/_admin/fields/slug'
import { challengeBlockFields } from '@/blocks/ChallengeBlock/config'
import type { CollectionConfig } from 'payload'

export const Challenges: CollectionConfig = {
  slug: 'challenges',
  access: {
    read: () => true, // Public read access
  },
  fields: [
    ...challengeBlockFields,
    ...slugField(),
    {
      name: 'difficulty',
      type: 'select',
      options: [
        { label: 'Easy', value: 'easy' },
        { label: 'Medium', value: 'medium' },
        { label: 'Hard', value: 'hard' },
        { label: 'Extreme', value: 'extreme' },
      ],
      defaultValue: 'easy',
    },
    {
      name: 'tags',
      type: 'relationship',
      relationTo: 'tags',
      hasMany: true,
    },
    { name: 'visible', type: 'checkbox', defaultValue: true },
  ],
  timestamps: true,
}

import { slugField } from '@/_admin/fields/slug'
import { challengeBlockFields } from '@/blocks/ChallengeBlock/config'
import type { CollectionConfig } from 'payload'

export const Challenges: CollectionConfig = {
  slug: 'challenges',
  access: {
    read: () => true, // Public read access
  },
  fields: [...challengeBlockFields, ...slugField()],
  timestamps: true,
}

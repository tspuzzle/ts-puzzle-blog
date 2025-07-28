import type { CollectionConfig } from 'payload'

export const Tags: CollectionConfig = {
  slug: 'tags',
  access: {
    read: () => true, // Public read access
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    { name: 'key', type: 'text', required: true },
    { name: 'title', type: 'text', required: true },
    { name: 'group', type: 'text' },
  ],
  timestamps: true,
}

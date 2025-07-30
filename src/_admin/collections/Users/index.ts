import type { CollectionConfig } from 'payload'

import { auth, signOut } from '@/auth'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    disableLocalStrategy: true,
    strategies: [
      {
        name: 'authjs',
        authenticate: async ({ payload }) => {
          const session = await auth()
          if (!session || !session?.user?.id) {
            return { user: null }
          }

          const user = await payload.findByID({
            collection: 'users',
            id: Number(session.user.id),
            disableErrors: true,
          })

          return { user: user ? { ...user, collection: 'users' } : null }
        },
      },
    ],
  },
  access: {
    admin: ({ req: { user } }) => {
      if (user && user.role === 'admin') {
        return true
      }
      return false
    },
    read: () => true, // Public read access
  },
  admin: {
    useAsTitle: 'email',
  },
  endpoints: [
    {
      path: '/logout',
      method: 'post',
      handler: async () => {
        await signOut()
        return Response.json({
          message: 'You have been logged out successfully.',
        })
      },
    },
  ],
  fields: [
    {
      name: 'email',
      type: 'email',
      required: true,
      access: { read: ({ req: { user } }) => user?.role === 'admin' },
    },
    { name: 'name', type: 'text' },
    { name: 'image', type: 'text' },
    {
      name: 'emailVerified',
      type: 'date',
      access: { read: ({ req: { user } }) => user?.role === 'admin' },
    },
    {
      name: 'password',
      type: 'text',
      hidden: true,
      access: { read: ({ req: { user } }) => user?.role === 'admin' },
    },
    {
      name: 'role',
      type: 'select',
      options: ['user', 'admin'],
      defaultValue: 'user',
      access: { read: ({ req: { user } }) => user?.role === 'admin' },
    },
    {
      name: 'accounts',
      type: 'join',
      collection: 'accounts',
      on: 'user',
      admin: {
        defaultColumns: ['id', 'type', 'provider'],
      },
      access: { read: ({ req: { user } }) => user?.role === 'admin' },
    },
  ],
  timestamps: true,
}

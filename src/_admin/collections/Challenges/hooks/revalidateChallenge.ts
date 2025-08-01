import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath } from 'next/cache'

import type { Challenge } from '@/payload-types'

export const revalidateChallenge: CollectionAfterChangeHook<Challenge> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    const path = `/challenges/${doc.slug}`

    payload.logger.info(`Revalidating post at path: ${path}`)

    revalidatePath(path)

    if (previousDoc.slug !== doc.slug) {
      const oldPath = `/challenges/${previousDoc.slug}`
      revalidatePath(oldPath)
    }

    revalidatePath('/challenges')
    revalidatePath('/')
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Challenge> = ({
  doc,
  req: { context },
}) => {
  if (!context.disableRevalidate) {
    const path = `/challenges/${doc?.slug}`

    revalidatePath(path)
    revalidatePath('/challenges')
    revalidatePath('/')

    // TODO: sitemap
    // revalidateTag('posts-sitemap')
  }

  return doc
}

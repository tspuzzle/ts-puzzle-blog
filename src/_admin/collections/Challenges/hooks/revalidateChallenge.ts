import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Challenge } from '@/payload-types'

export const revalidatePost: CollectionAfterChangeHook<Challenge> = ({
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

    // TODO: sitemap
    // revalidateTag('posts-sitemap')
  }

  return doc
}

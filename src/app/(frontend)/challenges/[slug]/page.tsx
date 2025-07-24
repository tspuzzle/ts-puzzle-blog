import { ChallengePage, getChallengeBySlug } from '@/_frontend/pages/challenges'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { cache } from 'react'

/*
export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const challenges = await payload.find({
    collection: 'challenges',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params = challenges.docs.map(({ slug }) => {
    return { slug }
  })

  return params
}
  */

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Challenge({ params: paramsPromise }: Args) {
  const { slug = '' } = await paramsPromise
  const challenge = await cachedGetChallengeBySlug({ slug })

  return <ChallengePage challenge={challenge} />
}

/*
export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const challenge = await cachedGetChallengeBySlug({ slug })

  return generateMeta({ doc: post })
}
  */

const cachedGetChallengeBySlug = cache(getChallengeBySlug)

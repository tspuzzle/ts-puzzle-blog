'use server'
import { getPayload } from '@payload-config'

export const getChallenges = async () => {
  const payload = await getPayload()

  const result = await payload.find({
    collection: 'challenges',
    where: { visible: { equals: true } },
    pagination: false,
  })

  return result.docs || []
}

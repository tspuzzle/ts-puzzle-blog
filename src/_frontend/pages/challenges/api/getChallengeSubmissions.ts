'use server'

import { getPayload } from '@payload-config'

export const getChallengeSubmissionsForUser = async (
  challengeId: number,
  userId: string | number,
) => {
  const payload = await getPayload()

  const result = await payload.find({
    collection: 'challenge-user-submissions',
    where: {
      challenge: {
        equals: challengeId,
      },
      user: {
        equals: userId,
      },
    },
    pagination: false,
  })
  return result.docs || []
}

export const getChallengeSubmissions = async (
  challengeId: number,
  excludeSubmissionFromUser: string | number | null | undefined,
) => {
  const payload = await getPayload()

  const result = await payload.find({
    collection: 'challenge-user-submissions',
    where: {
      challenge: {
        equals: challengeId,
      },

      ...(excludeSubmissionFromUser && {
        user: {
          not_equals: excludeSubmissionFromUser,
        },
      }),
    },
    pagination: false,
  })
  return result.docs || []
}

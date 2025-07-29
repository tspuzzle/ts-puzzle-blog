'use server'
import { getPayload } from '@payload-config'

export const submitUserChallengeSolution = async ({
  userId,
  challengeId,
  solution,
  annotations,
}: {
  userId: number | string
  challengeId: number

  solution: string
  annotations?: string
}) => {
  const payload = await getPayload()

  await payload.create({
    collection: 'challenge-user-submissions',

    data: {
      user: Number(userId),
      challenge: challengeId,
      solution,
      annotations,
    },
  })

  return
}

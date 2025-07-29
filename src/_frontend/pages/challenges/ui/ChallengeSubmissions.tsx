'use client'

import { ChallengeUserSubmission } from '@/payload-types'
import { useSession } from 'next-auth/react'
import { useEffect, useState, useTransition } from 'react'
import {
  getChallengeSubmissions,
  getChallengeSubmissionsForUser,
} from '../api/getChallengeSubmissions'

export const ChallengeSubmissions = ({ challengeId }: { challengeId: number }) => {
  const { data: session } = useSession()

  const [userSubmissions, setUserSubmissions] = useState<ChallengeUserSubmission[]>([])
  const [otherSubmissions, setOtherSubmissions] = useState<ChallengeUserSubmission[]>([])

  const [isPendingUserSubmissions, startTransitionGetUserSubmissions] = useTransition()
  const [isPendingAllSubmissions, startTransitionGetAllSubmissions] = useTransition()

  useEffect(() => {
    startTransitionGetUserSubmissions(async () => {
      if (!session?.user?.id) return
      const submissions = await getChallengeSubmissionsForUser(challengeId, session.user.id)
      setUserSubmissions(submissions)
    })

    startTransitionGetAllSubmissions(async () => {
      const submissions = await getChallengeSubmissions(challengeId, session?.user?.id)
      setOtherSubmissions(submissions)
    })
  }, [session, challengeId])

  return (
    <div>
      <h2 className="font-bold">Your Submissions</h2>
      {isPendingUserSubmissions ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {userSubmissions.map((submission) => (
            <li key={submission.id}>{submission.solution}</li>
          ))}
        </ul>
      )}

      <h2 className="font-bold mt-4">Other Submissions</h2>
      {isPendingAllSubmissions ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {otherSubmissions.map((submission) => (
            <li key={submission.id}>{submission.solution}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

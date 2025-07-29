'use client'

import { ChallengeUserSubmission } from '@/payload-types'
import { useSession } from 'next-auth/react'
import { useEffect, useState, useTransition } from 'react'
import {
  getChallengeSubmissions,
  getChallengeSubmissionsForUser,
} from '../api/getChallengeSubmissions'
import { ChallengeSubmissionCard } from './ChallengeSubmissionCard'
import { Loader2 } from 'lucide-react'

const UserSubmissions = ({ challengeId }: { challengeId: number }) => {
  const { data: session } = useSession()
  const [userSubmissions, setUserSubmissions] = useState<ChallengeUserSubmission[]>([])

  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    startTransition(async () => {
      if (!session?.user?.id) return
      const submissions = await getChallengeSubmissionsForUser(challengeId, session.user.id)
      setUserSubmissions(submissions)
    })
  }, [session, challengeId])

  if (!session?.user?.id) {
    return null
  }

  if (isPending) {
    return (
      <>
        <h1 className="font-bold text-lg mb-2">Your submissions</h1>
        <div className="w-full flex justify-center items-center h-32">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </>
    )
  }

  if (userSubmissions.length === 0) {
    return (
      <>
        <h1 className="font-bold text-lg mb-2">Your submissions</h1>
        <div className="w-full flex justify-center items-center h-32">
          You not submitted any solutions yet.
        </div>
      </>
    )
  }

  return (
    <>
      <h1 className="font-bold text-lg mb-2">Your submissions</h1>
      <div className="flex flex-col gap-4 mb-4">
        {userSubmissions.map((submission) => (
          <ChallengeSubmissionCard key={submission.id} submission={submission} />
        ))}
      </div>
    </>
  )
}

const OtherSubmissions = ({ challengeId }: { challengeId: number }) => {
  const { data: session } = useSession()
  const [submissions, setSubmissions] = useState<ChallengeUserSubmission[]>([])

  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    startTransition(async () => {
      const submissions = await getChallengeSubmissions(challengeId, session?.user?.id)
      setSubmissions(submissions)
    })
  }, [session, challengeId])

  if (isPending) {
    return (
      <>
        <h1 className="font-bold text-lg mb-2">Other submissions</h1>
        <div className="w-full flex justify-center items-center h-32">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </>
    )
  }

  if (submissions.length === 0) {
    return (
      <>
        <h1 className="font-bold text-lg mb-2">Other submissions</h1>
        <div className="w-full flex justify-center items-center h-32">
          There are no submissions yet.
        </div>
      </>
    )
  }

  return (
    <>
      <h1 className="font-bold text-lg mb-2">Other submissions</h1>
      <div className="w-full flex flex-col gap-4">
        {submissions.map((submission) => (
          <ChallengeSubmissionCard key={submission.id} submission={submission} showUser />
        ))}
      </div>
    </>
  )
}

export const ChallengeSubmissions = ({ challengeId }: { challengeId: number }) => {
  return (
    <>
      <UserSubmissions challengeId={challengeId} />
      <OtherSubmissions challengeId={challengeId} />
    </>
  )
}

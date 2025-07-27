'use client'
import { ChallengeBlock } from '@/_frontend/features/block-challenge'
import { ChallengeBlock as ChallengeBlockBase } from '@/payload-types'
import { useEffect, useState } from 'react'
import './styles.css'

export const Widget = ({ id }: { id: string }) => {
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'light')
  }, [])

  const [challenge, setChallenge] = useState<ChallengeBlockBase | null>(null)

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/challenges/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setChallenge(data)
      })
  }, [id])

  if (!challenge) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <ChallengeBlock {...challenge} mode="widget" />
    </div>
  )
}

import { ChallengeBlock } from '@/_frontend/features/block-challenge'
import { ChallengeBlock as ChallengeBlockBase } from '@/payload-types'
import { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

const Widget = ({ id }: { id: string }) => {
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

// Wait for DOM load
document.addEventListener('DOMContentLoaded', () => {
  const targets = document.querySelectorAll('[data-script="challenge"]')
  targets.forEach((el) => {
    const id = el.getAttribute('data-id')
    if (!id) return
    const mount = document.createElement('div')
    el.appendChild(mount)
    const root = createRoot(mount)
    root.render(<Widget id={id} />)
  })
})

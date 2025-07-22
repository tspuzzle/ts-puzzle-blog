import { ChallengeBlock } from '@/_frontend/features/challenge-block'
import React, { useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import { fields } from './data'

const Widget = ({ id }: { id: string }) => {
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'light')
  }, [])
  return (
    <div style={{ border: '1px solid #ccc', padding: 10 }}>
      <strong>Challenge Widget</strong>
      <br />
      <ChallengeBlock {...fields} />
    </div>
  )
}

// Wait for DOM load
document.addEventListener('DOMContentLoaded', () => {
  console.log('Widget script loaded')
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

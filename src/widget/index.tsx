import React from 'react'
import { createRoot } from 'react-dom/client'

const Widget = ({ id }: { id: string }) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: 10 }}>
      <strong>Challenge Widget</strong>
      <br />
      Loaded with ID: {id}
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

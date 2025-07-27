import { createRoot } from 'react-dom/client'
import './styles.css'
import { Widget } from './challenge-widget'

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

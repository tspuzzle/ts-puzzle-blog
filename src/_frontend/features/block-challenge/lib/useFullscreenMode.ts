import { useState } from 'react'

export const useFullscreenMode = ({ mode }: { mode: 'widget' | 'page' }) => {
  const [isFullScreen, _setIsFullScreen] = useState(mode === 'widget' ? true : false)
  const setIsFullScreen = (value: boolean) => {
    if (value) {
      document.body.style.overflow = 'hidden' // Prevent scrolling when in fullscreen
    } else {
      document.body.style.overflow = '' // Restore scrolling
    }
    _setIsFullScreen(value)
  }

  return { isFullScreen, setIsFullScreen }
}

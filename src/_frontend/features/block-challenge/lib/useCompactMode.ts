import { useEffect, useRef, useState } from 'react'

export const useCompactMode = () => {
  const [isCompactMode, setIsCompactMode] = useState(false)
  const testCasesPanelRef = useRef<HTMLDivElement>(null) // Ref for the inner div of the test cases panel

  useEffect(() => {
    const panelElement = testCasesPanelRef.current
    if (!panelElement) return

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const currentWidth = entry.contentRect.width
        const threshold = 150 // px

        if (currentWidth < threshold && !isCompactMode) {
          setIsCompactMode(true)
        }

        if (currentWidth >= threshold && isCompactMode) {
          setIsCompactMode(false)
        }
      }
    })

    resizeObserver.observe(panelElement)

    return () => {
      resizeObserver.unobserve(panelElement)
    }
  }, [isCompactMode])

  return { isCompactMode, setIsCompactMode, testCasesPanelRef }
}

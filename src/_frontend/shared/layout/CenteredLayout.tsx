import { ReactNode } from 'react'
import { cn } from '../lib/cn'

export const CenteredLayout = ({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) => {
  return (
    <div className={cn('relative min-h-screen overflow-hidden', className)}>
      {/* Background image, fixed so it doesn't scroll with content */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-50 dark:hidden"
        style={{
          backgroundImage: "url('/puzzle-pattern.png')",
          backgroundAttachment: 'fixed',
          backgroundSize: '300px',
          backgroundRepeat: 'repeat',
        }}
      />
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40 hidden dark:block"
        style={{
          backgroundImage: "url('/puzzle-pattern-dark.png')",
          backgroundAttachment: 'fixed',
          backgroundSize: '300px',
          backgroundRepeat: 'repeat',
        }}
      />

      {/* Left gradient from screen edge to content start (transparent to white) */}
      <div
        className="absolute inset-y-0 left-0 z-10 bg-gradient-to-r from-transparent to-white dark:to-black"
        style={{
          width: 'calc(50vw - 28rem)',
        }}
      />

      {/* Right gradient from content end to screen edge (white to transparent) */}
      <div
        className="absolute inset-y-0 right-0 z-10 bg-gradient-to-r from-white dark:from-black to-transparent"
        style={{
          width: 'calc(50vw - 28rem)', // 28rem is half of max-w-4xl (56rem)
        }}
      />
      <div className="relative mx-auto max-w-4xl bg-white dark:bg-black px-4 py-6 md:px-6 lg:py-16 md:py-12">
        {children}
      </div>
    </div>
  )
}

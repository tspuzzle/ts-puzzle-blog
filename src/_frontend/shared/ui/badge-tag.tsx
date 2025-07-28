import { ReactNode } from 'react'
import { cn } from '../lib/cn'
import { Badge } from './badge'

export const BadgeTag = ({ children, className }: { children: ReactNode; className?: string }) => {
  return (
    <Badge
      variant="outline"
      className={cn(
        'text-xs px-2 py-0.5 bg-primary/5 border-primary/20 text-primary hover:bg-primary/10 transition-colors',
        className,
      )}
    >
      {children}
    </Badge>
  )
}

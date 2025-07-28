import { cn } from '../lib/cn'
import { Badge } from './badge'

const difficultyConfig = {
  easy: {
    label: 'Easy',
    className: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300',
  },
  medium: {
    label: 'Medium',
    className: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300',
  },
  hard: {
    label: 'Hard',
    className: 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300',
  },
  extreme: {
    label: 'Extreme',
    className: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300',
  },
}

export type DifficultyType = keyof typeof difficultyConfig

export const DifficultyKeys = Object.keys(difficultyConfig) as Array<DifficultyType>

export const BadgeDifficulty = ({
  difficulty,
  className,
}: {
  difficulty: DifficultyType
  className?: string
}) => {
  const difficultyInfo = difficultyConfig[difficulty || 'easy']

  if (!difficultyInfo) return null

  return (
    <Badge
      variant="secondary"
      className={cn('shrink-0 font-medium', difficultyInfo.className, className)}
    >
      {difficultyInfo.label}
    </Badge>
  )
}

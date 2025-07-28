import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/_frontend/shared/ui/card'
import { Badge } from '@/_frontend/shared/ui/badge'
import { cn } from '@/_frontend/shared/lib/cn'

interface Challenge {
  id: string
  title: string
  description: string
  difficulty: 'easy' | 'medium' | 'hard' | 'extreme'
  tags: string[]
  completedBy: number
  estimatedTime: string
}

interface ChallengeCardProps {
  challenge: Challenge
}

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

export function ChallengeCard({ challenge }: ChallengeCardProps) {
  const difficultyInfo = difficultyConfig[challenge.difficulty]

  return (
    <Link href={`/challenges/${challenge.id}`} className="block group">
      <Card className="h-full min-h-[150px] flex flex-col justify-between transition-all duration-300 bg-white dark:bg-black hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1 hover:border-primary/50 group-hover:bg-gray-50/50 dark:group-hover:bg-gray-800/50 dark:border-gray-500 rounded-xl">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-2 mb-3">
            <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors line-clamp-2">
              {challenge.title}
            </CardTitle>
            <Badge
              variant="secondary"
              className={cn('shrink-0 font-medium', difficultyInfo.className)}
            >
              {difficultyInfo.label}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex flex-wrap gap-1.5">
            {challenge.tags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="text-xs px-2 py-0.5 bg-primary/5 border-primary/20 text-primary hover:bg-primary/10 transition-colors"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

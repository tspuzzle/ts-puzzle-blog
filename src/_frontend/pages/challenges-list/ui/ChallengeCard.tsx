import { BadgeDifficulty } from '@/_frontend/shared/ui/badge-difficulty'
import { BadgeTag } from '@/_frontend/shared/ui/badge-tag'
import { Card, CardContent, CardHeader, CardTitle } from '@/_frontend/shared/ui/card'
import { Challenge, Tag } from '@/payload-types'
import Link from 'next/link'

export function ChallengeCard({ challenge }: { challenge: Challenge }) {
  const tags: string[] = ((challenge.tags || []) as Tag[]).map((tag) => tag.title || tag.key || '')
  return (
    <Link href={`/challenges/${challenge.slug}`} className="block group">
      <Card className="h-full min-h-[150px] flex flex-col justify-between transition-all duration-300 bg-white dark:bg-black hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1 hover:border-primary/50 group-hover:bg-gray-50/50 dark:group-hover:bg-gray-800/50 dark:border-gray-500 rounded-xl">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-2 mb-3">
            <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors line-clamp-2">
              {challenge.title}
            </CardTitle>
            <BadgeDifficulty difficulty={challenge.difficulty} />
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <BadgeTag key={tag}>{tag}</BadgeTag>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

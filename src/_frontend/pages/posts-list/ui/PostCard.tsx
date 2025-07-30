import { Badge } from '@/_frontend/shared/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/_frontend/shared/ui/card'
import { Tag, User } from '@/payload-types'
import { format, parseISO } from 'date-fns'
import Link from 'next/link'
import { ShortenPost } from '../model'

export function BlogPostCard(props: ShortenPost) {
  const { slug, title, createdAt, meta } = props
  const tags = (props.tags || []) as Tag[]
  const author = props.author as User | null

  return (
    <Link href={`/posts/${slug}`} className="block group">
      <Card className="h-full flex flex-col transition-all duration-300 bg-white dark:bg-black hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1 hover:border-primary/50 group-hover:bg-gray-50/50 dark:group-hover:bg-gray-800/50 rounded-xl">
        {/* Removed image section */}
        <CardHeader className="pb-3 flex-grow">
          <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors line-clamp-2">
            {title}
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            Created at {format(parseISO(createdAt), 'MMMM d, yyyy')}{' '}
            {author && <span className="text-muted-foreground">by {author.name}</span>}
          </p>
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {tags.map((tag) => (
                <Badge
                  key={tag.id}
                  variant="outline"
                  className="text-xs px-2 py-0.5 bg-primary/5 border-primary/20 text-primary hover:bg-primary/10 transition-colors"
                >
                  {tag.title}
                </Badge>
              ))}
            </div>
          )}
        </CardHeader>
        {meta?.description && (
          <CardContent className="pt-0">
            <p className="text-muted-foreground text-sm line-clamp-3">{meta.description}</p>
          </CardContent>
        )}
      </Card>
    </Link>
  )
}

import { CenteredLayout } from '@/_frontend/shared/layout'
import { Badge } from '@/_frontend/shared/ui/badge'
import RichText from '@/_frontend/shared/ui/rich-text'
import { format } from 'date-fns'
import Link from 'next/link'
import { Post } from '../model'

export const PostPage = async ({ post }: { post: Post }) => {
  const relatedPosts = post.relatedPosts as Post[]

  return (
    <CenteredLayout>
      <article className="prose-gray dark:prose-invert">
        <div className="space-y-2 not-prose">
          <h1 className="text-primary text-4xl font-extrabold tracking-tight lg:text-5xl lg:leading-[3.5rem]">
            {post.title}
          </h1>
          {post.publishedAt && (
            <p className="text-muted-foreground">
              Posted on {format(new Date(post.publishedAt), 'MMMM d, yyyy')}
            </p>
          )}
          {/* Tags Section */}
          {/*
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {post.tags.map((tag) => (
                <Badge key={tag}> {tag}</Badge>
              ))}
            </div>
          )}
            */}
        </div>

        <RichText data={post.content} enableGutter={false} className="pt-4" />
      </article>

      {/* More Posts Section */}
      {relatedPosts.length > 0 && (
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 not-prose">
          <h2 className="text-2xl font-bold mb-4">More Posts</h2>
          <ul className="space-y-4">
            {relatedPosts.map((relatedPost) => (
              <li key={relatedPost.slug}>
                <Link href={`/blog/${relatedPost.slug}`} className="block group">
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-primary dark:text-gray-100 dark:group-hover:text-primary transition-colors">
                    {relatedPost.title}
                  </h3>
                  <p className="text-muted-foreground text-sm group-hover:underline">
                    Read more &rarr;
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </CenteredLayout>
  )
}

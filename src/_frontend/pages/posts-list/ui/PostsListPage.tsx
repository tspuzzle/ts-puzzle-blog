import { ShortenPost } from '../model'
import { BlogPostCard } from './PostCard'

export default function PostsListPage({ posts }: { posts: ShortenPost[] }) {
  return (
    <div className="container mx-auto px-4 py-6 md:px-6 lg:py-16 md:py-12 pt-20">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-primary mb-4">Blog</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Explore the latest articles, tutorials, and insights on web development, design, and more.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 max-w-2xl mx-auto">
        {posts.map((post) => (
          <BlogPostCard key={post.id} {...post} />
        ))}
      </div>
    </div>
  )
}

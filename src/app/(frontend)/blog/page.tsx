import { CenteredLayout } from '@/_frontend/shared/layout/CenteredLayout'
import { Badge } from '@/_frontend/shared/ui/badge'
import Image from 'next/image'
import Link from 'next/link'

export default async function Page() {
  const post = {
    title: 'My Awesome Blog Post',
    date: 'July 11, 2025',
    content: `
    <p>This is the first paragraph of your blog post. It's a great place to introduce your topic and hook your readers. You can write about anything you want here, from personal experiences to technical deep dives.</p>
    <p>Here's another paragraph, expanding on the ideas presented earlier. Remember to keep your paragraphs concise and focused on a single idea to improve readability.</p>
    <h3>A Subheading for More Detail</h3>
    <p>Subheadings help break up your content and make it easier to scan. Use them to introduce new sections or elaborate on specific points.</p>
    <ul>
      <li>This is a list item.</li>
      <li>You can use lists to present information in an organized way.</li>
      <li>They are great for steps, features, or key takeaways.</li>
    </ul>
    <blockquote>
      <p>“The only way to do great work is to love what you do.”</p>
      <footer>— <cite>Steve Jobs</cite></footer>
    </blockquote>
    <p>Finally, conclude your post with a summary or a call to action. Encourage readers to leave comments, share your post, or explore related content.</p>
  `,
    coverImage: '/placeholder.svg?height=400&width=800',
    imageCaption: 'A beautiful image related to the blog post.',
    tags: ['Next.js', 'React', 'Web Development', 'Tutorials'], // Added tags
  }

  // Placeholder for related posts - in a real app, this would be fetched
  const relatedPosts = [
    { slug: 'another-great-post', title: 'Another Great Post You Might Like' },
    { slug: 'getting-started-with-nextjs', title: 'Getting Started with Next.js' },
    { slug: 'css-tips-and-tricks', title: 'CSS Tips and Tricks for Beginners' },
  ]

  // Quiz data for this specific post
  const quizData = {
    question:
      'Which Next.js feature helps make navigation feel instant by fetching resources ahead of time?',
    options: [
      { id: '1', text: 'Server Actions' },
      { id: '2', text: 'Prefetching', isCorrect: true },
      { id: '3', text: 'Static Site Generation' },
      { id: '4', text: 'Client Components' },
    ],
  }

  return (
    <CenteredLayout className="mt-20">
      <article className="prose prose-gray dark:prose-invert">
        <div className="space-y-2 not-prose">
          <h1 className="text-primary text-4xl font-extrabold tracking-tight lg:text-5xl lg:leading-[3.5rem]">
            {post.title}
          </h1>
          <p className="text-muted-foreground">Posted on {post.date}</p>
          {/* Tags Section */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {post.tags.map((tag) => (
                <Badge key={tag}> {tag}</Badge>
              ))}
            </div>
          )}
        </div>
        <figure>
          <Image
            src={post.coverImage || '/placeholder.svg'}
            alt={post.imageCaption}
            width={800}
            height={400}
            className="aspect-video object-cover rounded-lg"
            priority
          />
          <figcaption>{post.imageCaption}</figcaption>
        </figure>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />

        {/* Quiz Block */}
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

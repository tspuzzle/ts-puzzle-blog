import { Post } from '@/payload-types'

export type ShortenPost = Pick<
  Post,
  'id' | 'title' | 'author' | 'createdAt' | 'tags' | 'meta' | 'slug'
>

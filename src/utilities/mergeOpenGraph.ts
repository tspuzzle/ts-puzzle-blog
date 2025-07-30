import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description:
    'Sharpen your TypeScript and JavaScript skills with real-world coding challenges, in-depth tutorials, and hands-on utilities. Learn advanced typing, patterns, and best practices — one challenge at a time.',
  images: [
    {
      url: `${getServerSideURL()}/website-template-OG.webp`,
    },
  ],
  siteName: 'TypeScript Challenges',
  title: 'TypeScript Challenges',
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}

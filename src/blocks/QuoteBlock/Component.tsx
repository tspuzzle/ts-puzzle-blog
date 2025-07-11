import React from 'react'

import type { QuoteBlock as QuoteBlockProps } from '@/payload-types'
import { cn } from '@/_frontend/shared/lib/cn'
import RichText from '@/_frontend/shared/ui/rich-text'

type Props = QuoteBlockProps

export const QuoteBlock: React.FC<Props> = (props) => {
  const { quote } = props

  console.log('QuoteBlock props:', props)
  return (
    <div
      className={cn(
        'relative border-l-8 border-primary bg-gray-50 p-4 pl-6 rounded text-primary italic',
        'dark:bg-gray-800', // Dark mode background
      )}
    >
      <RichText data={quote} enableGutter={false} />
    </div>
  )
}

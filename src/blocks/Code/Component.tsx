import React from 'react'

import { Code } from './Component.client'
import type { CodeBlock as CodeBlockProps } from '@/payload-types'

export type Props = CodeBlockProps & {
  className?: string
}

export const CodeBlock: React.FC<Props> = ({ className, code, language, includeLines }) => {
  return (
    <div className={[className, 'not-prose'].filter(Boolean).join(' ')}>
      <Code code={code} language={language as string} includeLines={includeLines} />
    </div>
  )
}

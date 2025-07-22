import React from 'react'

import type { CodeBlock as CodeBlockProps } from '@/payload-types'
import { CodeBlock as Code } from '@/_frontend/features/block-code'
export type Props = CodeBlockProps & {
  className?: string
}

export const CodeBlock: React.FC<Props> = ({ className, code, language, includeLines }) => {
  return (
    <div className={[className, 'not-prose'].filter(Boolean).join(' ')}>
      <Code code={code} language={language} includeLines={includeLines} />
    </div>
  )
}

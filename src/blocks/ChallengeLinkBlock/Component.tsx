import React from 'react'
import { ChallengeBlock } from '@/_frontend/features/block-challenge'

import type { Challenge, ChallengeLinkBlock as ChallengeLinkBlockProps } from '@/payload-types'
export type Props = ChallengeLinkBlockProps & {
  className?: string
}

export const ChallengeLinkBlock: React.FC<Props> = (props) => {
  const { className } = props
  const challenge = props.challengeLink.value as Challenge
  return (
    <div className={[className, 'not-prose'].filter(Boolean).join(' ')}>
      <ChallengeBlock
        {...challenge}
        id={String(challenge.id)}
        slug={challenge.slug!}
        blockType="challengeBlock"
      />
    </div>
  )
}

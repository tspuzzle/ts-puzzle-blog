import type { StaticImageData } from 'next/image'

import { cn } from '@/_frontend/shared/lib/cn'
import React from 'react'
import RichText from '@/components/RichText'

import type { MediaBlock as MediaBlockProps } from '@/payload-types'

import { Media } from '../../components/Media'

type Props = MediaBlockProps & {
  breakout?: boolean
  captionClassName?: string
  className?: string
  enableGutter?: boolean
  imgClassName?: string
  staticImage?: StaticImageData
  disableInnerContainer?: boolean
}

export const MediaBlock: React.FC<Props> = (props) => {
  const {
    captionClassName,
    caption,
    className,
    enableGutter = true,
    imgClassName,
    media,
    mediaDark,
    staticImage,
    disableInnerContainer,
  } = props

  return (
    <div
      className={cn(
        '',
        {
          container: enableGutter,
        },
        className,
      )}
    >
      {(media || staticImage) && (
        <Media
          imgClassName={cn(
            'border border-border rounded-[0.8rem]',
            mediaDark && 'dark:hidden',
            imgClassName,
          )}
          resource={media}
          src={staticImage}
        />
      )}
      {(mediaDark || staticImage) && (
        <Media
          imgClassName={cn(
            'border border-border rounded-[0.8rem]',
            mediaDark && 'hidden dark:block',
            imgClassName,
          )}
          resource={mediaDark}
          src={staticImage}
        />
      )}
      {caption && (
        <div
          className={cn(
            'mt-6',
            {
              container: !disableInnerContainer,
            },
            captionClassName,
          )}
        >
          <RichText data={caption} enableGutter={false} />
        </div>
      )}
    </div>
  )
}

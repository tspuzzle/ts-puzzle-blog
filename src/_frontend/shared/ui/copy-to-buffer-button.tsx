'use client'
import { Button } from '@/_frontend/shared/ui/button'
import { CopyIcon } from '@payloadcms/ui/icons/Copy'
import { useState } from 'react'

export function CopyToBufferButton({ code }: { code: string }) {
  const [text, setText] = useState('Copy')

  function updateCopyStatus() {
    if (text === 'Copy') {
      setText(() => 'Copied!')
      setTimeout(() => {
        setText(() => 'Copy')
      }, 1000)
    }
  }

  return (
    <div className="justify-end align-middle absolute top-2 right-2 hidden group-hover:flex">
      <Button
        className="flex gap-1 h-6 w-6 p-1"
        variant={'secondary'}
        onClick={async () => {
          await navigator.clipboard.writeText(code)
          updateCopyStatus()
        }}
      >
        <CopyIcon />
      </Button>
    </div>
  )
}

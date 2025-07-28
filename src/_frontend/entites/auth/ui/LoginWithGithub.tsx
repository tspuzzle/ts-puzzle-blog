'use client'

import { cn } from '@/_frontend/shared/lib/cn'
import { Button } from '@/_frontend/shared/ui/button'
import { signIn } from 'next-auth/react'
import { FaGithub } from 'react-icons/fa'

export const LoginWithGithub = ({
  className,
  redirectTo,
}: {
  className?: string
  redirectTo?: string
}) => {
  const loginWith = (provider: string) => {
    signIn(provider, { redirectTo })
  }

  return (
    <Button
      onClick={() => loginWith('github')}
      className={cn('w-full h-11 text-base flex items-center gap-2', className)}
    >
      <FaGithub className="h-5 w-5" />
      Sign In with GitHub
    </Button>
  )
}

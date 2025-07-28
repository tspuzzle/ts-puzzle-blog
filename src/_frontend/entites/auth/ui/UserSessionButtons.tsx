'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/_frontend/shared/ui/avatar'
import { Button } from '@/_frontend/shared/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/_frontend/shared/ui/dropdown-menu'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { signOut } from 'next-auth/react'
import { LogOut, User } from 'lucide-react'

export const UserSessionButtons = () => {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return null
  }

  console.log(session)
  return (
    <div>
      {!session && (
        <Link href="/login">
          <Button size="sm">Login</Button>
        </Link>
      )}
      {session && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="h-8 w-8 cursor-pointer">
              <AvatarImage src={session?.user?.image || undefined} alt="@username" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => {}}>
              <User />
              Profile
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => signOut()}>
              <LogOut />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  )
}

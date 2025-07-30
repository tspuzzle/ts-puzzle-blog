'use client'

import * as React from 'react'
import Link from 'next/link'
import { MenuIcon } from 'lucide-react'

import { Button } from '@/_frontend/shared/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/_frontend/shared/ui/sheet'

export function MobileNav() {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <MenuIcon className="h-6 w-6" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[250px] sm:w-[300px]">
        <nav className="flex flex-col gap-4 py-6">
          {/*
        
          <Link href="/support-us" className="text-lg font-medium" onClick={() => setIsOpen(false)}>
            Support Us
          </Link>
          */}
          <Link href="/challenges" className="text-lg font-medium" onClick={() => setIsOpen(false)}>
            Challenges
          </Link>
          <Link href="/posts" className="text-lg font-medium" onClick={() => setIsOpen(false)}>
            Blog
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  )
}

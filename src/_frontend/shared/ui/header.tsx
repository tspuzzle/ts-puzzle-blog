'use client'

import { useTheme } from '@/_frontend/shared/providers/Theme'
import { Avatar, AvatarFallback, AvatarImage } from '@/_frontend/shared/ui/avatar'
import { Moon, Sun } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import * as React from 'react'
import { cn } from '../lib/cn'
import { Button } from './button'
import { MobileNav } from './mobile-nav'
import { UserSessionButtons } from '@/_frontend/entites/auth/ui/UserSessionButtons'

export function Header() {
  const [isScrolled, setIsScrolled] = React.useState(false)
  const navRef = React.useRef<HTMLElement>(null)
  const [underlineStyle, setUnderlineStyle] = React.useState({ left: 0, width: 0, opacity: 0 })

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        // Adjust scroll threshold as needed
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const target = e.currentTarget
    if (navRef.current) {
      const navRect = navRef.current.getBoundingClientRect()
      const linkRect = target.getBoundingClientRect()
      setUnderlineStyle({
        left: linkRect.left - navRect.left,
        width: linkRect.width,
        opacity: 1,
      })
    }
  }

  const handleMouseLeave = () => {
    setUnderlineStyle((prev) => ({ ...prev, opacity: 0 }))
  }

  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
  }

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        'bg-white/80 backdrop-blur-sm dark:bg-gray-950/80', // Semi-transparent background
        isScrolled ? 'py-1 shadow-md' : 'py-2',
      )}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.svg"
              alt="Logo"
              width={172 * (isScrolled ? 0.8 : 1)} // Updated width
              height={39 * (isScrolled ? 0.8 : 1)} // Updated height
              className="transition-all duration-300 dark:hidden"
            />
            <Image
              src="/logo-dark.svg"
              alt="Logo"
              width={172 * (isScrolled ? 0.8 : 1)} // Updated width
              height={39 * (isScrolled ? 0.8 : 1)} // Updated height
              className="transition-all duration-300 hidden dark:block"
            />
          </Link>
        </div>
        <nav ref={navRef} className="relative hidden items-center gap-6 lg:flex">
          {/*
         
          <Link
            href="/support-us"
            className="text-sm font-medium py-1"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            Support Us
          </Link>
          */}
          <Link
            href="/challenges"
            className="text-sm font-medium py-1"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            Challenges
          </Link>
          <Link
            href="/posts"
            className="text-sm font-medium py-1" // Added py-1 for space for the underline
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            Blog
          </Link>
          {/* The moving underline element */}
          <div
            className="absolute bottom-0 h-[2px] bg-primary transition-all duration-300 ease-out"
            style={{
              left: underlineStyle.left,
              width: underlineStyle.width,
              opacity: underlineStyle.opacity,
            }}
          />
        </nav>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full">
            {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            <span className="sr-only">Toggle theme</span>
          </Button>
          <UserSessionButtons />

          {/*
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder-user.jpg" alt="@username" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          */}

          <MobileNav />
        </div>
      </div>
    </header>
  )
}

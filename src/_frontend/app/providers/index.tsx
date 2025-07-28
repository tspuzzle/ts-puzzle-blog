import React from 'react'

import { HeaderThemeProvider, ThemeProvider } from '../../shared/providers'
import { SessionProvider } from 'next-auth/react'

export const Providers: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <SessionProvider>
      <ThemeProvider>
        <HeaderThemeProvider>{children}</HeaderThemeProvider>
      </ThemeProvider>
    </SessionProvider>
  )
}

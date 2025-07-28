import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/_frontend/shared/ui/card'
import Link from 'next/link'

import { LoginWithGithub } from '@/_frontend/entites/auth/ui/LoginWithGithub'

export default function Page() {
  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center py-12 pt-20 bg-gradient-to-br from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      <Card className="w-full max-w-md mx-auto bg-white dark:bg-gray-900 shadow-xl rounded-xl border border-gray-200 dark:border-gray-700">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-3xl font-bold text-primary">Sign In</CardTitle>
          <CardDescription className="text-muted-foreground mt-2 text-base">
            Create your account by signing up with GitHub.
          </CardDescription>
        </CardHeader>
        <CardContent className="px-6 pb-6">
          <LoginWithGithub redirectTo="/" />

          <p className="mt-4 text-center text-xs text-muted-foreground">
            By clicking Sign In, you agree to our{' '}
            <Link href="/terms" className="underline hover:text-primary">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="underline hover:text-primary">
              Privacy Policy
            </Link>
            .
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

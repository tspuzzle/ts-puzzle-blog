import Github from 'next-auth/providers/github'
import Google from 'next-auth/providers/google'

import NextAuth from 'next-auth'
import { PayloadAuthAdapter } from '@/_frontend/shared/lib/payload-auth-adapter'

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PayloadAuthAdapter(),
  providers: [
    /*
    Credentials({
      authorize: async (credentials) => {
        const validatedFields = LoginSchema.safeParse(credentials)
        if (validatedFields.success) {
          const { email, password } = validatedFields.data
          const user = await getUserByEmail(email)

          if (!user || !user.password) {
            return null
          }

          const passwordMatch = await bcrypt.compare(password, user.password)

          if (passwordMatch) {
            return { ...user, id: user.id.toString() }
          }
        }
        return null
      },
    }),
    */
    Github({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: { strategy: 'jwt' },
  callbacks: {
    async session({ session, token }) {
      return { ...session, user: { ...session.user, id: token.sub } }
    },
  },
})

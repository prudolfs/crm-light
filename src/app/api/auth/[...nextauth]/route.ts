import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
// import bcrypt from 'bcryptjs'
// import { getUserByEmail } from '@/actions/login' // You'll need to implement this

type User = {
  id: string
  name: string
  email: string
  hashedPassword: string
}

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        // const user = (await getUserByEmail(credentials.email)) as User | null

        // if (!user) {
        //   return null
        // }

        // const passwordMatch = await bcrypt.compare(
        //   credentials.password,
        //   user.hashedPassword,
        // )

        // if (!passwordMatch) {
        //   return null
        // }

        const user: User = {
          id: '1',
          name: 'Admin',
          email: process.env.ADMIN_EMAIL as string,
          hashedPassword: process.env.ADMIN_PASSWORD as string,
        }

        if (
          credentials.email !== user.email ||
          credentials.password !== user.hashedPassword
        ) {
          return null
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt' as const,
  },
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async session({ 
      session, 
      token 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }: { session: any; token: any }) {
      if (token) {
        session.user.id = token.sub
      }
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }

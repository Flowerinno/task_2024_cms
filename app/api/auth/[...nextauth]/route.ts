import NextAuth from 'next-auth'
import { authOptions } from '@/lib/auth'

declare module 'next-auth' {
  interface Session {
    user: {
      email: string
      id: string
      role: 'ADMIN' | 'USER'
    }
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }

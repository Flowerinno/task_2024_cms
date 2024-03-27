import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export const auth = async () => {
  const session = await getServerSession(authOptions)

  if (!session || session?.user?.role !== 'ADMIN') {
    return null
  }

  return session
}

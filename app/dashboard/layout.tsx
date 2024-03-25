import { DashboardNavigationMenu } from '@/components/ui/nav/dashboard-nav'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)

  if (!session || session?.user.role !== 'ADMIN') {
    return redirect('/')
  }

  return (
    <div className='flex flex-col'>
      <DashboardNavigationMenu />
      <div className='h-screen flex flex-col space-y-5 p-2 items-center'>{children}</div>
    </div>
  )
}

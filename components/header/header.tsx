import { getServerSession } from 'next-auth/next'
import { UserNav } from '../ui/nav/user-nav'
import { NavElements } from '../ui/nav/nav-elements'
import { INavLink } from '../interface/INavLink'
import { Button } from '../ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { authOptions } from '@/lib/auth'

const navigation = [
  { key: 'Home', value: '' },
  {
    key: 'Tags',
    value: 'tags',
    auth: true,
  },
  {
    key: 'Dashboard',
    value: 'dashboard',
    admin: true,
  },
] as INavLink[]

export default async function Header() {
  const session = await getServerSession(authOptions)

  return (
    <>
      <header className='flex-col md:flex' role='heading' aria-level={1} aria-label='News CMS heading'>
        <div className='border-b'>
          <div className='flex h-16 items-center px-4'>
            {(session && session.user && (
              <>
                <div className='flex items-center space-x-6'>
                  <Image src='/logo.png' aria-label='News CMS logo image' alt='News CMS logo' width={48} height={48} />
                </div>
                <div className='mx-6' role='navigation' aria-label='Navigation menu'>
                  <NavElements session={session} navigationLinks={navigation} />
                </div>
                <div className='ml-auto flex items-center space-x-4' aria-label='User settings dropdown'>
                  <UserNav session={session} />
                </div>
              </>
            )) || (
              <>
                <div className='flex items-center space-x-6'>
                  <Image src='/logo.png' alt='logo' width={48} height={48} />
                </div>
                <div className='mx-6 '>
                  <NavElements session={session} navigationLinks={navigation} />
                </div>
                <div className='ml-auto flex items-center space-x-4'>
                  <Link href='/register' className=''>
                    <Button variant='brown'>Register</Button>
                  </Link>
                  <Link href='/login' className=''>
                    <Button variant='brown'>Login</Button>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </header>
    </>
  )
}

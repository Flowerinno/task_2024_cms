'use client'

import LoadingDots from '@/components/loading-dots'
import { UsersTable } from '@/components/users'
import { useEffect } from 'react'
import { useUserStore } from 'store'
import { getUsers } from 'utils'

export default function Users({
  searchParams,
}: {
  searchParams: {
    page?: number
    email?: string
  }
}) {
  const page = searchParams?.page && Number(searchParams.page) > 0 ? Number(searchParams.page) : 1
  const email = searchParams?.email ?? ''

  const { users, maxPage, setUsers, setMaxPage } = useUserStore((state) => state)

  useEffect(() => {
    getUsers({ page, email }).then((res) => {
      if (res) {
        setUsers(res?.users)
        setMaxPage(res?.maxPage)
      }
    })
  }, [page, email])

  if (users?.length === 0 || !maxPage) {
    return <LoadingDots />
  }

  return (
    <div className='flex flex-col h-screen w-11/12'>
      <UsersTable users={users} maxPage={maxPage} page={page} email={email} />
    </div>
  )
}

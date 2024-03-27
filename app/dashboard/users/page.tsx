'use client'

import LoadingDots from '@/components/loading-dots'
import { UsersTable } from '@/components/users'
import useSWR from 'swr'
import fetcher from '@/lib/fetcher'
import { NoData } from '@/components/no-data'
import { GetUsersResponse } from 'utils/users/types'

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

  const { data, isLoading } = useSWR<GetUsersResponse>(
    `/api/admin/users?page=${page}&emai=${email}`,
    fetcher,
  )

  if (isLoading) {
    return <LoadingDots />
  }

  if (!data) {
    return <NoData title='No users' href='/dashboard/users/create' />
  }

  return (
    <div className='flex flex-col h-screen w-11/12'>
      <UsersTable users={data?.users} maxPage={data?.maxPage} page={page} email={email} />
    </div>
  )
}

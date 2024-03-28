'use client'

import LoadingDots from '@/components/loading-dots'
import { UsersTable } from '@/components/users'
import useSWR from 'swr'
import fetcher from '@/lib/fetcher'
import { GetUsersResponse } from 'utils/users/types'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Users list | News CMS',
  description: 'List of all News CMS users.',
}

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
    `/api/admin/users?page=${page}&email=${email}`,
    fetcher,
  )

  if (isLoading) {
    return <LoadingDots />
  }

  return (
    <div className='flex flex-col h-screen w-11/12'>
      <UsersTable
        users={data?.users ?? []}
        maxPage={data?.maxPage ?? 1}
        page={page}
        email={email}
      />
    </div>
  )
}

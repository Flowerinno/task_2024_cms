'use client'

import useSWR from 'swr'
import fetcher from '@/lib/fetcher'
import LoadingDots from '@/components/loading-dots'
import { Label } from '@/components/ui/label'
import { User } from '@prisma/client'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Settings | News CMS',
  description: 'User settings',
}

export default function Settings({
  params,
}: {
  params: {
    user_id: string
  }
}) {
  const { data, isLoading } = useSWR<User>(`/api/admin/users/${params.user_id}`, fetcher, {
    refreshInterval: 50,
    revalidateOnFocus: false,
    revalidateIfStale: false,
    shouldRetryOnError: false,
  })

  if (isLoading) {
    return <LoadingDots />
  }

  if (!data) {
    return <Label>No user found</Label>
  }

  return (
    <div className='w-full p-3 text-center'>
      <Label>Email: {data.email}</Label>
    </div>
  )
}

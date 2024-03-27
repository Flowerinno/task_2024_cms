'use client'

import useSWR from 'swr'
import fetcher from '@/lib/fetcher'
import { RssSource } from '@/components/feed'
import LoadingDots from '@/components/loading-dots'
import { NoData } from '@/components/no-data'
import { Label } from '@/components/ui/label'
import { News_source } from '@prisma/client'

export default function Feed() {
  const { data, isLoading } = useSWR<News_source[]>('/api/admin/feed', fetcher)

  if (isLoading) {
    return <LoadingDots />
  }

  if (!data || data?.length === 0) {
    return <NoData title='Add new RSS source.' href='/dashboard/feed/add' />
  }

  return (
    <>
      <Label>RSS sources</Label>
      <ul className='w-full flex flex-row flex-wrap items-center justify-center gap-4'>
        {data?.map((source) => <RssSource key={source.id} source={source} />)}
      </ul>
    </>
  )
}

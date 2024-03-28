'use client'

import { useEffect } from 'react'
import useSWR from 'swr'
import fetcher from '@/lib/fetcher'
import { RssSource } from '@/components/feed'
import LoadingDots from '@/components/loading-dots'
import { NoData } from '@/components/no-data'
import { Label } from '@/components/ui/label'
import { News_source } from '@prisma/client'
import { useRss } from 'store'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sources | News CMS',
  description: 'List of RSS sources.',
}

export default function Feed() {
  const { sources, setSources } = useRss((state) => state)

  const { data, isLoading } = useSWR<News_source[]>('/api/admin/feed', fetcher)

  useEffect(() => {
    if (data) {
      setSources(data)
    }
  }, [data])

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
        {sources?.map((source) => <RssSource key={source.id} source={source} />)}
      </ul>
    </>
  )
}

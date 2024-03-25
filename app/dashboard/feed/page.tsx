'use client'

import { RssSource } from '@/components/feed'
import LoadingDots from '@/components/loading-dots'
import { NoData } from '@/components/no-data'
import { Label } from '@/components/ui/label'
import { useEffect, useState } from 'react'
import { useRss } from 'store'
import { getRssList } from 'utils'

export default function Feed() {
  const [isLoading, setIsLoading] = useState(true)
  const { sources, setSources } = useRss((state) => state)

  useEffect(() => {
    getRssList()
      .then((data) => {
        if (data) {
          setSources(data)
          setIsLoading(false)
        }
      })
      .catch((_) => setIsLoading(false))
  }, [])

  if (isLoading) {
    return <LoadingDots />
  }

  if (!sources || sources.length === 0) {
    return <NoData title='Add new RSS source.' />
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

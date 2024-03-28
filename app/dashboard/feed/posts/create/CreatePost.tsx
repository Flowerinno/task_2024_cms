'use client'

import React, { useEffect } from 'react'
import useSWR from 'swr'
import fetcher from '@/lib/fetcher'
import { useNews } from 'store/feed'
import { AddPostForm } from '@/components/feed/create'
import LoadingDots from '@/components/loading-dots'
import { Separator } from '@/components/ui/separator'
import { DraftComponent } from '@/components/feed/drafts'
import { Label } from '@/components/ui/label'
import { DraftResponse } from 'utils/feed/types'

export default function CreatePost() {
  const { drafts, setDrafts } = useNews((state) => state)

  const { data, isLoading } = useSWR<DraftResponse[]>('/api/admin/feed/drafts', fetcher)

  useEffect(() => {
    if (data) {
      setDrafts(data)
    }
  }, [data])

  useEffect(() => {}, [drafts?.length])

  if (isLoading) return <LoadingDots />

  return (
    <div className='flex flex-col md:flex-row w-full p-0'>
      <div
        id='drafts'
        className='flex md:flex-[0.3] md:flex-col flex-row p-2 overflow-x-scroll gap-2'
      >
        {drafts?.length > 0 ? (
          drafts.map((draft) => <DraftComponent key={draft.id} draft={draft} />)
        ) : (
          <Label className='self-center'>No drafts</Label>
        )}
      </div>
      <Separator orientation='vertical' className='hidden md:block' />
      <AddPostForm />
    </div>
  )
}

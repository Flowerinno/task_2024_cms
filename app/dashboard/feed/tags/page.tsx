'use client'

import { CreateTagsForm, SingleTag } from '@/components/feed'
import LoadingDots from '@/components/loading-dots'
import { NoData } from '@/components/no-data'
import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator'
import { Label } from '@radix-ui/react-label'
import { useEffect, useState } from 'react'
import { useTags } from 'store'
import { getTags } from 'utils'

export default function Tags() {
  const [isLoading, setIsLoading] = useState(true)
  const [isInactiveShown, setIsInactiveShown] = useState(1)
  const setTags = useTags((state) => state.setTags)
  const tags = useTags((state) => state.tags)

  useEffect(() => {
    getTags()
      .then((tags) => {
        if (tags) {
          setTags(tags)
          setIsLoading(false)
        }
      })
      .catch(() => {
        setIsLoading(false)
      })
  }, [])

  return (
    <div className='w-full h-screen flex flex-row gap-2  md:gap-10'>
      <div
        id='tags_list'
        className='relative flex-1 flex flex-row flex-wrap gap-3 justify-start h-fit basis-[2%] p-5'
      >
        {tags.length > 0 && (
          <div className='absolute right-0 top-[-10px] flex flex-row gap-2 items-center'>
            <Checkbox
              id='active_only'
              value={isInactiveShown}
              defaultChecked={isInactiveShown === 1}
              onCheckedChange={() => setIsInactiveShown(isInactiveShown ? 0 : 1)}
              title='active only'
            />
            <Label htmlFor='active_only'>show inactive</Label>
          </div>
        )}
        {tags?.length > 0 ? (
          tags.map((tag) => {
            if (isInactiveShown === 0 && !tag.is_active) return null
            return <SingleTag key={tag.id} tag={tag} />
          })
        ) : isLoading ? (
          <LoadingDots />
        ) : (
          <NoData title='No tags found' />
        )}
      </div>
      <Separator orientation='vertical' />
      <CreateTagsForm />
    </div>
  )
}

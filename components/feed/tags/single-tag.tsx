'use client'

import { Label } from '@/components/ui/label'
import { Tag } from '@prisma/client'
import { Switch } from '@/components/ui/switch'
import { useTags } from 'store'
import { updateTagActivity } from 'utils'

interface SingleTagProps {
  tag: Tag
  isSearching?: boolean
}

export const SingleTag = ({ tag, isSearching = false }: SingleTagProps) => {
  const updateTag = useTags((state) => state.updateTag)

  if (!tag) return null

  const onUpdate = async () => {
    const updatedTag = await updateTagActivity({
      id: tag.id,
      is_active: !tag.is_active,
    })

    if (updatedTag) {
      updateTag(updatedTag)
    }
  }

  return (
    <div className='max-h-24 h-fit flex flex-row flex-wrap items-center gap-2 border-[1px] p-3 cursor-pointer rounded-md'>
      <Label data-test-id={tag?.label} className='font-bold flex-1'>
        #{tag.label}
      </Label>
      {!isSearching && (
        <div className='flex flex-row gap-3 items-center'>
          <span>off</span>
          <Switch
            onCheckedChange={onUpdate}
            name='is_active'
            type='submit'
            checked={tag.is_active}
            data-test-id={`switch-${tag.label}`}
          />
          <span>on</span>
        </div>
      )}
    </div>
  )
}

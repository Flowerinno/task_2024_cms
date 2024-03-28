'use client'
import { FeedPostSkeleton } from '@/components/feed'
import { usePathname } from 'next/navigation'

export default function Loading() {
  const path = usePathname()

  const includedPaths = ['/', '/tags']

  if (!includedPaths.includes(path)) {
    return null
  }

  const arr = [1, 2, 3, 4, 5]
  return (
    <div
      className='w-full flex flex-col items-center justify-center gap-3 p-5 md:p-10 bg-white overflow-x-hidden'
      aria-label='Loading news feed'
    >
      {arr.map((_, i) => {
        return <FeedPostSkeleton key={i} />
      })}
      ;
    </div>
  )
}

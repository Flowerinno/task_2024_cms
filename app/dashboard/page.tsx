'use client'
import useSWR from 'swr'
import LoadingDots from '@/components/loading-dots'
import fetcher from '@/lib/fetcher'
import Link from 'next/link'
import { Label } from '@/components/ui/label'
import { Statistics } from 'utils/feed/types'

export default function Dashboard() {
  const { data, isLoading } = useSWR<Statistics>('/api/admin', fetcher)

  if (!data || isLoading) {
    return <LoadingDots />
  }

  const links = [
    {
      id: 1,
      title: 'Users',
      href: '/dashboard/users',
      count: data.users,
    },
    {
      id: 2,
      title: 'Posts',
      href: '/',
      count: data.posts,
    },
    {
      id: 3,
      title: 'Tags',
      href: '/dashboard/feed/tags',
      count: data.tags,
    },
    {
      id: 4,
      title: 'News Sources',
      href: '/dashboard/feed',
      count: data.news_sources,
    },
    {
      id: 5,
      title: 'Advertisement',
      href: '/dashboard/ads',
      count: data.ads,
    },
  ]

  return (
    <div className='flex flex-col items-center w-full'>
      <Label className='font-bold text-[24px]'>Quick overview</Label>
      <div className='flex flex-row flex-wrap justify-around items-center p-3'>
        {links.map((link) => (
          <Link
            href={link.href}
            key={link.id}
            className='flex flex-col items-center justify-center w-48 h-48 text-black bg-gray-200 rounded-lg p-4 m-2 hover:border-black hover:border-[1px]'
          >
            <h2 className='text-lg font-bold'>{link.title}</h2>
            <p className='text-xl font-bold'>{link.count}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

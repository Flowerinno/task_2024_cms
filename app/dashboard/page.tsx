import { Metadata } from 'next'
import { Label } from '@/components/ui/label'
import { countTable, Tables } from 'utils/redis'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Dashboard | News CMS',
}

type Fields = 'user' | 'post' | 'tag' | 'news_source' | 'advertisement'
const keys = ['user', 'post', 'tag', 'news_source', 'advertisement']

export default async function Page() {
  const initial = {
    user: 0,
    post: 0,
    tag: 0,
    news_source: 0,
    advertisement: 0,
  }

  const values = await Promise.all(
    keys.map(async (key) => {
      try {
        const count = await countTable(key as Tables)
        return count ?? 0
      } catch (error) {
        return 0
      }
    }),
  )

  const data = keys.reduce((acc, field, index) => {
    acc[field as Fields] = values[index]
    return acc
  }, initial)

  const links = [
    {
      id: 1,
      title: 'Users',
      href: '/dashboard/users',
      count: data?.user ?? 0,
    },
    {
      id: 2,
      title: 'Posts',
      href: '/',
      count: data?.post ?? 0,
    },
    {
      id: 3,
      title: 'Tags',
      href: '/dashboard/feed/tags',
      count: data?.tag ?? 0,
    },
    {
      id: 4,
      title: 'News Sources',
      href: '/dashboard/feed',
      count: data?.news_source ?? 0,
    },
    {
      id: 5,
      title: 'Advertisement',
      href: '/dashboard/ads',
      count: data?.advertisement ?? 0,
    },
  ]

  return (
    <div className='flex flex-col items-center w-full'>
      <Label className='font-bold text-[24px]'>Quick overview</Label>
      <div className='flex flex-row flex-wrap justify-around items-center p-3'>
        {links.map((link) => (
          <a
            href={link.href}
            key={link.id}
            className='flex flex-col items-center justify-center w-48 h-48 text-black bg-gray-200 rounded-lg p-4 m-2 hover:border-black hover:border-[1px]'
          >
            <h2 className='text-lg font-bold'>{link.title}</h2>
            <p className='text-xl font-bold'>{link.count}</p>
          </a>
        ))}
      </div>
    </div>
  )
}

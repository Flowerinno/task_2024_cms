import prisma from '@/lib/prisma'
import Link from 'next/link'
import { Metadata } from 'next'
import { Label } from '@/components/ui/label'

export const metadata: Metadata = {
  title: 'Dashboard | News CMS',
}

type Fields = 'users' | 'posts' | 'tags' | 'news_sources'
const fields = ['users', 'posts', 'tags', 'news_sources', 'ads']

export default async function Page() {
  const usersCount = prisma.user.count()
  const postsCount = prisma.post.count()
  const tagsCount = prisma.tag.count()
  const newsSourceCount = prisma.news_source.count()
  const ads = prisma.advertisement.count()

  const promises = await Promise.all([usersCount, postsCount, tagsCount, newsSourceCount, ads])

  const initial = {
    users: 0,
    posts: 0,
    tags: 0,
    news_sources: 0,
    ads: 0,
  }

  const data = fields.reduce((acc, field, index) => {
    acc[field as Fields] = promises[index]
    return acc
  }, initial)

  const links = [
    {
      id: 1,
      title: 'Users',
      href: '/dashboard/users',
      count: data?.users ?? 0,
    },
    {
      id: 2,
      title: 'Posts',
      href: '/',
      count: data?.posts ?? 0,
    },
    {
      id: 3,
      title: 'Tags',
      href: '/dashboard/feed/tags',
      count: data?.tags ?? 0,
    },
    {
      id: 4,
      title: 'News Sources',
      href: '/dashboard/feed',
      count: data?.news_sources ?? 0,
    },
    {
      id: 5,
      title: 'Advertisement',
      href: '/dashboard/ads',
      count: data?.ads ?? 0,
    },
  ]

  return (
    <div className='flex flex-col items-center w-full'>
      <Label className='font-bold text-[24px]'>Quick overview</Label>
      <div className='flex flex-row flex-wrap justify-around items-center p-3'>
        {links.map((link) => (
          <Link
            href={link.href}
            prefetch={true}
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

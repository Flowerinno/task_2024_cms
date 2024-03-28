import prisma from '@/lib/prisma'
import { FeedPost } from '@/components/feed/posts'
import { Label } from '@/components/ui/label'
import { PostWithTags } from 'utils/feed/types'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Active/Deleted posts | News CMS',
  description: 'Manage active or deleted posts.',
}

export default async function InactivePosts() {
  const posts = await prisma.post.findMany({
    where: {
      OR: [
        {
          is_active: false,
        },
        {
          is_deleted: true,
        },
      ],
    },
    orderBy: {
      created_at: 'desc',
    },
    include: {
      tags: true,
    },
  })

  if (!posts?.length) {
    return <Label>No inactive / deleted posts</Label>
  }

  return (
    <div className='flex flex-col w-full gap-3 items-center'>
      {posts.map((post) => (
        <FeedPost key={post.id} post={post as PostWithTags} isAdmin={true} />
      ))}
    </div>
  )
}

import prisma from '@/lib/prisma'
import { FeedPost } from '@/components/feed/posts'
import { Label } from '@/components/ui/label'
import { PostWithTags } from 'utils/feed/types'

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

  console.log(posts)

  if (!posts?.length) {
    return <Label>No incative/deleted posts</Label>
  }

  return (
    <div className='flex flex-col w-full gap-3 items-center'>
      {posts.map((post) => (
        <FeedPost key={post.id} post={post as PostWithTags} isAdmin={true} />
      ))}
    </div>
  )
}

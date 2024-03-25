import { SingleTag } from '@/components/feed'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export default async function EditPost({ params }: { params: { post_id: string } }) {
  const post = await prisma?.post.findUnique({
    where: {
      id: Number(params.post_id),
    },
    include: {
      tags: true,
      news_source: true,
    },
  })

  if (!post) {
    return <Label className='p-2'>Post not found</Label>
  }

  return (
    <>
      <ul className='flex flex-row gap-2 w-full p-2 items-center'>
        <Label>Attached tags: </Label>
        {post.tags.map((tag) => (
          <li key={tag.id} className='font-bold'>
            #{tag.label}
          </li>
        ))}
      </ul>
      <form
        method='POST'
        action={`/api/admin/feed/posts/edit`}
        className='flex flex-col gap-4 p-2 w-full'
      >
        <input type='hidden' name='id' defaultValue={post.id} />
        <Input
          name='title'
          type='text'
          aria-label='Post title'
          placeholder='Post title'
          className='font-bold'
          defaultValue={post.title}
        />
        <div className='flex flex-row flex-wrap justify-between gap-2'>
          <Input
            name='link'
            type='text'
            placeholder='Post link'
            aria-label='Post link'
            className='font-bold w-[49%]'
            defaultValue={post.link ?? ''}
          />
          <Input
            name='creator'
            type='text'
            placeholder='Post creator'
            aria-label='Post creator'
            className='font-bold w-[49%]'
            defaultValue={post?.creator ?? ''}
          />
        </div>
        <Textarea
          cols={50}
          rows={6}
          name='content'
          placeholder='Post content'
          defaultValue={post.content ?? ''}
          className='font-bold min-w-[250px] break-all'
        />
        <div className='flex flex-row gap-5'>
          <div className='flex flex-row items-center gap-2 cursor-pointer'>
            <Checkbox id='is_active' name='is_active' defaultChecked={post.is_active} />
            <Label className='cursor-pointer' htmlFor='is_active'>
              Is Active
            </Label>
          </div>
          <div className='flex flex-row items-center gap-2 cursor-pointer'>
            <Checkbox id='is_deleted' name='is_deleted' defaultChecked={post.is_deleted} />
            <Label
              style={{
                color: post.is_deleted ? 'red' : 'green',
              }}
              className='cursor-pointer'
              htmlFor='is_deleted'
            >
              {post.is_deleted ? 'Deleted' : 'Not deleted'}
            </Label>
          </div>
        </div>

        <Button type='submit'>Update post</Button>
      </form>
    </>
  )
}

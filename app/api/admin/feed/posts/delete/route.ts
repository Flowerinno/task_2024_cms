import { NextResponse, NextRequest } from 'next/server'
import prisma from '@/lib/prisma'
import { auth } from 'utils/auth'

import { minio } from '@/lib/minio'

export async function DELETE(req: NextRequest) {
  try {
    const session = await auth()

    if (!session) {
      return NextResponse.json(
        {
          message: 'Unauthorized',
        },
        {
          status: 401,
        },
      )
    }

    const { id } = await req.json()

    if (!id || isNaN(id)) {
      return NextResponse.json(
        {
          message: 'Post id is required',
        },
        {
          status: 400,
        },
      )
    }

    const deletedPost = await prisma.post.update({
      where: {
        id,
      },
      data: {
        is_deleted: true,
      },
    })

    if (deletedPost) {
      if (deletedPost.advertisement_id) {
        await prisma.advertisement.update({
          where: {
            id: deletedPost.advertisement_id,
          },
          data: {
            post_id: null,
            Post: {
              disconnect: {
                id: deletedPost.id,
              },
            },
          },
        })
      }

      if (deletedPost.media) {
        await minio.client.removeObject('default', `post_${id}.png`)
      }
      return NextResponse.json(
        {
          message: 'Post deleted successfully',
        },
        {
          status: 200,
        },
      )
    }

    return NextResponse.json(
      {
        message: 'Failed to delete post',
      },
      {
        status: 500,
      },
    )
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Failed to delete post',
      },
      {
        status: 500,
      },
    )
  }
}

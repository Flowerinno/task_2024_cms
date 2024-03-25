import { NextRequest, NextResponse } from 'next/server'
import { auth } from 'utils/auth'
import prisma from '@/lib/prisma'

export async function GET(
  req: NextRequest,
  params: {
    params: {
      post_id: string
    }
  },
) {
  const post_id = params.params.post_id
  if (!post_id) {
    return NextResponse.json(
      {
        message: 'Invalid post ID',
      },
      {
        status: 400,
      },
    )
  }

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

    const post = await prisma.post.findUnique({
      where: {
        id: parseInt(post_id),
      },
    })

    if (post) {
      return NextResponse.json(post)
    }

    return NextResponse.json(
      {
        message: 'Failed to find post',
      },
      {
        status: 401,
      },
    )
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Failed to find post',
      },
      {
        status: 401,
      },
    )
  }
}

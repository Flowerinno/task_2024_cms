import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { auth } from 'utils/auth'
import { minio } from '@/lib/minio'

export async function GET() {
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

    const drafts = await prisma.draft.findMany({
      orderBy: {
        created_at: 'desc',
      },
      include: {
        tags: {
          select: {
            label: true,
          },
        },
      },
    })

    const draftsWithSignedUrl = await Promise.all(
      drafts.map(async (draft) => {
        if (draft.media) {
          const asset = await minio.client.presignedGetObject('default', `draft_${draft.id}.webp`)

          return {
            ...draft,
            media: asset ?? null,
          }
        }
        return draft
      }),
    )

    return NextResponse.json(draftsWithSignedUrl, {
      status: 200,
    })
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      {
        message: 'Failed to fetch drafts',
      },
      {
        status: 500,
      },
    )
  }
}

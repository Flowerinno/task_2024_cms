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

    if (!id) {
      return NextResponse.json(
        {
          message: 'Draft id is required',
        },
        {
          status: 400,
        },
      )
    }

    const deletedDraft = await prisma.draft.delete({
      where: {
        id,
      },
    })

    if (deletedDraft) {
      if (deletedDraft.media) {
        await minio.client.removeObject('default', `draft_${id}.png`)
      }
      return NextResponse.json(
        {
          message: 'Draft deleted successfully',
        },
        {
          status: 200,
        },
      )
    }

    return NextResponse.json(
      {
        message: 'Failed to delete draft',
      },
      {
        status: 500,
      },
    )
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Failed to delete draft',
      },
      {
        status: 500,
      },
    )
  }
}

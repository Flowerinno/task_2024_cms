import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { auth } from 'utils/auth'

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

    const deletedSource = await prisma.news_source.delete({
      where: {
        id,
      },
    })

    if (deletedSource) {
      return NextResponse.json(
        {
          message: 'RSS feed deleted successfully',
        },
        {
          status: 200,
        },
      )
    }

    NextResponse.json(
      {
        message: 'Failed to delete RSS feed',
      },
      {
        status: 500,
      },
    )
  } catch (error) {
    NextResponse.json(
      {
        message: 'Failed to delete RSS feed',
      },
      {
        status: 500,
      },
    )
  }
}

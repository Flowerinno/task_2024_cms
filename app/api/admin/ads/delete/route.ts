import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { minio } from '@/lib/minio'
import { auth } from 'utils/auth'
import { decrement } from 'utils/redis'

export async function DELETE(req: NextRequest) {
  try {
    const session = auth()

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

    if (!id || isNaN(Number(id))) {
      return NextResponse.json(
        {
          message: 'Invalid request',
        },
        {
          status: 400,
        },
      )
    }

    const deletedAd = await prisma.advertisement.delete({
      where: {
        id: Number(id),
      },
    })

    if (deletedAd) {
      await decrement('advertisement')
      if (deletedAd?.media) {
        await minio.client.removeObject('default', `ads_${deletedAd.id}.png`)
      }
      return NextResponse.json(
        {
          message: 'Ad deleted successfully',
        },
        {
          status: 200,
        },
      )
    }
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Failed to delete ad',
      },
      {
        status: 500,
      },
    )
  }
}

import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'
import { auth } from 'utils/auth'

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

    const tags = await prisma.tag.findMany()

    return NextResponse.json(tags)
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Failed to fetch tags',
      },
      {
        status: 500,
      },
    )
  }
}

import prisma from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import { auth } from 'utils/auth'

export async function GET(req: NextRequest) {
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

    const url = new URL(req?.url || '')
    const page = url.searchParams.get('page') ?? 1
    const email = url.searchParams.get('email')?.toLowerCase()

    const LIMIT = 20

    const maxPage = Math.ceil((await prisma.user.count()) / LIMIT)

    const users = await prisma.user.findMany({
      where: {
        email: {
          contains: email ? email : undefined,
          mode: 'insensitive',
        },
      },
      skip: Number(page) * LIMIT - LIMIT,
      take: Number(page) * LIMIT,
      select: {
        id: true,
        email: true,
        role: true,
        is_blocked: true,
        is_deleted: true,
        created_at: true,
      },
    })

    const response = {
      users,
      maxPage,
    }

    return NextResponse.json(response, { status: 200 })
  } catch (error) {
    return NextResponse.json({
      error: 'An error occurred while fetching users',
      status: 500,
    })
  }
}

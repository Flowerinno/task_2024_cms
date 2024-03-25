import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { auth } from 'utils/auth'

export async function POST(req: NextRequest) {
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

    const { label, is_active } = await req.json()

    if (!label || typeof label !== 'string' || label.length < 3) {
      return NextResponse.json(
        {
          message: 'Invalid tag label',
        },
        {
          status: 400,
        },
      )
    }

    const isExists = await prisma.tag.findFirst({
      where: {
        label,
      },
    })

    if (isExists) {
      return NextResponse.json(
        {
          message: 'Tag with such label already exists',
        },
        {
          status: 400,
        },
      )
    }

    const tag = await prisma.tag.create({
      data: {
        label,
        is_active,
      },
    })

    if (!tag) {
      return NextResponse.json(
        {
          message: 'Failed to create tag',
        },
        {
          status: 500,
        },
      )
    }

    return NextResponse.json(tag, {
      status: 201,
    })
  } catch (error) {
    return NextResponse.json(
      {
        message: 'An error occurred while creating tag',
      },
      {
        status: 500,
      },
    )
  }
}

import prisma from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import { auth } from 'utils/auth'
import { decrement } from 'utils/redis'

export async function DELETE(req: NextRequest) {
  const session = await auth()

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await req.json()
  const user_id = id

  if (!user_id) {
    return NextResponse.json({ message: 'No/Wrong slug...' }, { status: 404 })
  }

  try {
    const deletedUser = await prisma.user.update({
      where: {
        id: user_id,
      },
      data: {
        is_deleted: true,
      },
    })

    if (!deletedUser) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 })
    }

    await decrement('user')

    return NextResponse.json({ message: 'User deleted.' })
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong on our end... We'll fix it soon." },
      { status: 500 },
    )
  }
}

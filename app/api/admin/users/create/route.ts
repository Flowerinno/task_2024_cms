import prisma from '@/lib/prisma'
import { hash } from 'bcrypt'
import { NextResponse } from 'next/server'
import { auth } from 'utils/auth'

export async function POST(req: Request) {
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

  const { email, password, is_admin } = await req.json()

  if (!email || !password) {
    return NextResponse.json({ message: 'Email and password are required.' }, { status: 400 })
  }

  const exists = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (exists) {
    return NextResponse.json({ message: 'User already exists' }, { status: 400 })
  }

  try {
    const user = await prisma.user.create({
      data: {
        email,
        password: await hash(password, 10),
        role: is_admin ? 'ADMIN' : 'USER',
      },
    })
    return NextResponse.json(user)
  } catch (error) {
    return NextResponse.json({ message: 'Failed to create new user.' }, { status: 500 })
  }
}

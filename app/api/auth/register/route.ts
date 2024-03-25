import prisma from '@/lib/prisma'
import { hash } from 'bcrypt'
import { NextResponse } from 'next/server'
import { registerSchema } from 'utils/validation/user.schema'

export async function POST(req: Request) {
  const { email, password } = await req.json()

  const validate = await registerSchema.safeParseAsync({ email, password })

  if (!validate.success) {
    return NextResponse.json(
      {
        message: 'Invalid input',
        error: validate.error,
      },
      {
        status: 400,
      },
    )
  }

  try {
    const exists = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (exists) {
      return NextResponse.json({ message: 'User already exists' }, { status: 400 })
    }

    const user = await prisma.user.create({
      data: {
        email,
        password: await hash(password, 10),
      },
    })
    return NextResponse.json(user)
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong on our end... We'll fix it soon." },
      { status: 500 },
    )
  }
}

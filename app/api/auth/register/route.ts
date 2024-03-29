import prisma from '@/lib/prisma'
import { hash } from 'bcrypt'
import { NextResponse } from 'next/server'
import { rateLimit } from 'utils'
import { registerSchema } from 'utils/validation/user.schema'

export async function POST(req: Request) {
  const currHeaders = new Headers(req.headers)

  try {
    await rateLimit({
      uniqueTokenPerInterval: 500,
      interval: 60000,
    }).check(currHeaders, 50, 'secret_token')

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

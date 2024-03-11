import { NextRequest, NextResponse } from "next/server";
import { auth } from "utils/auth";
import prisma from "@/lib/prisma";
import { editUserSchema } from "utils/validation/user.schema";

export async function PUT(req: NextRequest) {
  const session = await auth();

  if (!session) {
    return NextResponse.json(
      {
        message: "Unauthorized",
      },
      {
        status: 401,
      },
    );
  }

  try {
    const body = await req.json();

    const validate = await editUserSchema.safeParseAsync(body);

    if (!validate.success) {
      return NextResponse.json(
        {
          message: "Invalid input",
          error: validate.error,
        },
        {
          status: 400,
        },
      );
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: body.id,
      },
      data: {
        email: body.email,
        role: body.role,
        is_blocked: body.is_blocked,
        is_deleted: body.is_deleted,
      },
      select: {
        id: true,
        email: true,
        role: true,
        is_blocked: true,
        is_deleted: true,
      },
    });

    if (!updatedUser) {
      return NextResponse.json(
        {
          message: "User not found",
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json(
      {
        message: "Updated user",
        user: updatedUser,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "An error occurred while updating user",
      },
      {
        status: 500,
      },
    );
  }
}

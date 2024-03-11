import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "utils/auth";

export async function PUT(req: NextRequest) {
  try {
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

    const { id, is_active } = await req.json();

    if (!id) {
      return NextResponse.json(
        {
          message: "Tag id is required",
        },
        {
          status: 400,
        },
      );
    }

    const tag = await prisma.tag.update({
      where: {
        id,
      },
      data: {
        is_active,
      },
    });

    if (!tag) {
      return NextResponse.json(
        {
          message: "Failed to update tag",
        },
        {
          status: 500,
        },
      );
    }

    return NextResponse.json(tag, {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to update tag",
      },
      {
        status: 5000,
      },
    );
  }
}

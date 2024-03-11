import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "utils/auth";

export async function GET() {
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

    const drafts = await prisma.draft.findMany({
      where: {
        user_id: session.user.id,
      },
      orderBy: {
        created_at: "desc",
      },
      include: {
        User: {
          select: {
            email: true,
            id: true,
          },
        },
        tags: {
          select: {
            label: true,
          },
        },
      },
    });

    return NextResponse.json(drafts, {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to fetch drafts",
      },
      {
        status: 500,
      },
    );
  }
}
import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

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

    const updatedSource = await prisma.news_source.update({
      where: {
        id,
      },
      data: {
        is_active,
      },
    });

    if (updatedSource) {
      return NextResponse.json(
        {
          message: "RSS feed updated successfully",
        },
        {
          status: 200,
        },
      );
    }

    return NextResponse.json(
      {
        message: "Failed to update RSS feed",
      },
      {
        status: 500,
      },
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to update RSS feed",
      },
      {
        status: 500,
      },
    );
  }
}

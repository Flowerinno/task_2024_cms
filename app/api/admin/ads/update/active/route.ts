import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
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

    const payload = await req.json();

    const updatedAd = await prisma.advertisement.update({
      where: {
        id: payload.id,
      },
      data: {
        is_active: payload.is_active,
      },
    });

    if (!updatedAd) {
      return NextResponse.json(
        {
          message: "Failed to update ad",
        },
        {
          status: 500,
        },
      );
    }

    return NextResponse.json(updatedAd);
  } catch (error: { message: string } | any) {
    return NextResponse.json(
      {
        message: "Failed to update ad",
      },
      {
        status: 500,
      },
    );
  }
}

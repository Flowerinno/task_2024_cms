import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { createPostSchema } from "utils/validation/feed.schema";

export async function POST(req: NextRequest) {
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

    const body = await req.json();

    const validate = createPostSchema.safeParse(body);

    if (!validate.success) {
      return NextResponse.json(
        {
          message: "Invalid input",
          errors: validate.error.errors,
        },
        {
          status: 400,
        },
      );
    }

    const { title, content, creator, pubDate_included, tags, is_active, link } =
      validate.data;

    const draft = await prisma.draft.create({
      data: {
        title,
        content,
        creator,
        pubDate_included: pubDate_included || false,
        is_active: is_active || false,
        link: link || "",
        tags: {
          connect: tags.map((tag: string) => ({ label: tag })),
        },
        User: {
          connect: {
            id: session.user.id,
          },
        },
      },
      include: {
        tags: {
          select: {
            label: true,
          },
        },
        User: {
          select: {
            email: true,
            id: true,
          },
        },
      },
    });

    if (draft) {
      return NextResponse.json(
        {
          message: "Draft created",
          draft,
        },
        {
          status: 201,
        },
      );
    }

    return NextResponse.json(
      {
        message: "Failed to create draft",
      },
      {
        status: 500,
      },
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to create draft",
      },
      {
        status: 500,
      },
    );
  }
}

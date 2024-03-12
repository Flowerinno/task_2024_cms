import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "utils/auth";
export async function POST(req: NextRequest) {
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

    const body = await req.json();

    if (!body.title) {
      return NextResponse.json(
        {
          message: "Title is required",
        },
        {
          status: 400,
        },
      );
    }

    const {
      title,
      content,
      creator,
      pubDate_included,
      tags,
      is_active,
      link,
      media,
    } = body;

    const newPost = await prisma.post.create({
      data: {
        title,
        content: content || null,
        creator: creator || null,
        pubDate: pubDate_included ? new Date() : null,
        media: media ? "1" : null,
        tags: {
          connect: tags.map((tag: string) => ({ label: tag })),
        },
        is_active: is_active || false,
        link: link || "",
      },
    });

    if (newPost) {
      return NextResponse.json(
        {
          message: "Post created successfully",
        },
        {
          status: 201,
        },
      );
    }

    return NextResponse.json(
      {
        message: "Failed to create post",
      },
      {
        status: 400,
      },
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to create tag",
      },
      {
        status: 400,
      },
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { createPostSchema } from "utils/validation/feed.schema";
import { auth } from "utils/auth";
import { minio } from "@/lib/minio";
import { dataUrlToBuffer } from "utils/files";

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

    const validate = createPostSchema.safeParse(body);

    if (!validate.success) {
      return NextResponse.json(
        {
          message: "Invalid data",
          errors: validate.error.errors,
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
    } = validate.data;

    const draft = await prisma.draft.create({
      data: {
        title,
        content,
        creator,
        pubDate_included: pubDate_included || false,
        is_active: is_active || false,
        link: link || "",
        media: media ? "1" : null,
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
      if (media) {
        await minio.createBucket("default");
        const buffer = dataUrlToBuffer(media);
        await minio.client.putObject("default", `draft_${draft.id}.png`, buffer);
      }

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

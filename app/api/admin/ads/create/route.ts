import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "utils/auth";
import { createAdSchema } from "utils/validation/ads.schema";
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

    const validate = createAdSchema.safeParse(body);

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
      is_active,
      link,
      media,
      ad_priority,
      post_id,
      is_feed,
      is_search,
    } = validate.data;

    const ad = await prisma.advertisement.create({
      data: {
        title,
        is_active: is_active || false,
        link: link || "",
        media: media ? "1" : null,
        post_id: post_id === 0 ? null : post_id,
        ad_priority: Number(ad_priority) || 0,
        is_feed: is_feed || true,
        is_search: is_search || false,
        ...(post_id
          ? {
              Post: {
                connect: {
                  id: post_id,
                },
              },
            }
          : {}),
      },
    });

    if (ad) {
      if (media) {
        await minio.createBucket("default");
        const buffer = dataUrlToBuffer(media);
        await minio.client.putObject("default", `ads_${ad.id}.png`, buffer);
      }

      return NextResponse.json(ad);
    }

    return NextResponse.json(
      {
        message: "Failed to create ad",
      },
      {
        status: 500,
      },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Failed to create ad",
      },
      {
        status: 500,
      },
    );
  }
}

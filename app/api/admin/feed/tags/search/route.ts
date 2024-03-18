import { minio } from "@/lib/minio";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const page = url.searchParams.get("page");
    const search = url.searchParams.get("search");

    const page_q = page && Number(page) > 0 ? page : "1";
    const search_q = search ? search : "";

    const count = 30;

    const feed = await prisma.post.findMany({
      where: {
        is_active: true,
        is_deleted: false,
        tags: {
          some: {
            label: {
              mode: "insensitive",
              contains: search_q,
            },
            is_active: true,
          },
        },
      },
      orderBy: {
        created_at: "desc",
      },
      take: count,
      skip: (Number(page_q) - 1) * count,
      include: {
        tags: {
          where: {
            is_active: true,
          },
        },
      },
    });

    if (!feed.length) {
      return NextResponse.json(
        { feed: [], maxPage: 1 },
        {
          status: 200,
        },
      );
    }

    const maxPage = Math.ceil(feed.length / count);

    const feedWithMedia = await Promise.all(
      feed.map(async (post) => {
        if (post.media) {
          const signedUrl = await minio.client.presignedGetObject(
            "default",
            `post_${post.id}.png`,
            60, // 1 minute expiry in seconds
          );

          return {
            ...post,
            media: signedUrl,
          };
        }
        return post;
      }),
    );

    return NextResponse.json(
      { feed: feedWithMedia, maxPage },
      {
        status: 200,
      },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to get the feed" },
      { status: 500 },
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { minio } from "@/lib/minio";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const page = url.searchParams.get("page");
    const search = url.searchParams.get("search");

    const page_q = page && Number(page) > 0 ? page : "1";
    const search_q = search ? search : "";

    const count = 10;
    const maxPage = Math.ceil(
      (await prisma.post.count({
        where: {
          is_active: true,
          is_deleted: false,
          title: {
            contains: search_q,
          },
        },
      })) / count,
    );
    const feed = await prisma.post.findMany({
      where: {
        is_active: true,
        is_deleted: false,
        OR: [
          {
            title: {
              contains: search_q,
            },
          },
        ],
      },
      orderBy: {
        created_at: "desc",
      },
      take: count,
      skip: (Number(page_q) - 1) * count,
    });

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

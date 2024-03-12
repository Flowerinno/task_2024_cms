import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

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

    return NextResponse.json(
      { feed: feed, maxPage },
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

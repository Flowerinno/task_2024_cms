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
      
    const feed = await prisma.post.findMany({
      where: {
        OR: [
          {
            title: {
              contains: search_q,
            },
          },
          {
            content: {
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

    return NextResponse.json({ message: "Hello, World!" });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to get the feed" },
      { status: 500 },
    );
  }
}

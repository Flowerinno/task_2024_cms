import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "utils/auth";

type Fields = "users" | "posts" | "tags" | "news_sources";

export async function GET() {
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

    const usersCount = prisma.user.count();
    const postsCount = prisma.post.count();
    const tagsCount = prisma.tag.count();
    const newsSourceCount = prisma.news_source.count();
    const ads = prisma.advertisement.count();

    const fields = ["users", "posts", "tags", "news_sources", "ads"];

    const data = await Promise.all([
      usersCount,
      postsCount,
      tagsCount,
      newsSourceCount,
      ads,
    ]);

    const initial = {
      users: 0,
      posts: 0,
      tags: 0,
      news_sources: 0,
      ads: 0,
    };

    const stats = fields.reduce((acc, field, index) => {
      acc[field as Fields] = data[index];
      return acc;
    }, initial);

    return NextResponse.json(stats, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to fetch statistics",
      },
      {
        status: 500,
      },
    );
  }
}

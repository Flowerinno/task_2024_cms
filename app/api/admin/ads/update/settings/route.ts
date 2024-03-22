import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "utils/auth";

export async function POST(req: NextRequest) {
  const fromURL = req.headers.get("Referer") ?? "/dashboard/ads";

  try {
    const session = await auth();

    if (!session) {
      return NextResponse.redirect(fromURL, 301);
    }

    const formData = await req.formData();

    const feed_ads_per_page = formData.get("feed_ads_per_page");
    const search_ads_per_page = formData.get("search_ads_per_page");

    await prisma.settings.update({
      where: {
        id: 1,
      },
      data: {
        feed_ads_per_page: Number(feed_ads_per_page) ?? 1,
        search_ads_per_page: Number(search_ads_per_page) ?? 1,
      },
    });

    return NextResponse.redirect(fromURL, 301);
  } catch (error) {
    return NextResponse.redirect(fromURL, 301);
  }
}

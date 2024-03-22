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

    const settings = await prisma.settings.findFirst({
      where: {
        id: 1,
      },
    });

    let adsPerPage = settings?.feed_ads_per_page || 1;

    const count = 30;
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
        title: {
          contains: search_q,
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
            is_deleted: false,
          },
        },
        advertisement: true,
      },
    });

    const feedWithMedia = await Promise.all(
      feed.map(async (post) => {
        let postMedia, adMedia;
        if (post.media) {
          postMedia = await minio.client.presignedGetObject(
            "default",
            `post_${post.id}.png`,
            60, // 1 minute expiry in seconds
          );
        }

        let ad = post?.advertisement;
        if (ad?.id && ad?.is_active && adsPerPage >= 1) {
          adsPerPage -= 1; // decrease adpsPerPage by 1 when inserting an ad

          if (ad?.media) {
            adMedia = await minio.client.presignedGetObject(
              "default",
              `ads_${ad.id}.png`,
              60,
            );
          }
        } else if (ad) {
          ad = null;
        }

        return {
          ...post,
          media: postMedia,
          advertisement: ad?.is_active
            ? {
                ...ad,
                media: adMedia,
              }
            : null,
        };
      }),
    );

    const ads = await prisma.advertisement.findMany({
      where: {
        is_active: true,
        is_deleted: false,
        is_feed: true,
        post_id: null,
        title: {
          contains: search_q
        }
      },
      orderBy: {
        ad_priority: "desc",
      },
      take: adsPerPage,
    });

    const adsWithMedia = await Promise.all(
      ads.map(async (ad) => {
        if (ad.media) {
          const signedUrl = await minio.client.presignedGetObject(
            "default",
            `ads_${ad.id}.png`,
            60, // 1 minute expiry in seconds
          );

          return {
            ...ad,
            media: signedUrl,
          };
        }
        return ad;
      }),
    );

    return NextResponse.json(
      { feed: feedWithMedia, maxPage, ads: adsWithMedia, adsPerPage },
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

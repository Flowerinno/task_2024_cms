import { parseRss } from "@/lib/helpers/rss";
import prisma from "@/lib/prisma";

export const importFeedJob = async () => {
  console.log("job working");
  try {
    const sources = await prisma.news_source.findMany({
      include: {
        tags: true,
      },
    });

    for await (const source of sources) {
      if (!source?.is_active) continue; // skip inactive sources

      const { items } = await parseRss(source.url);

      for await (const rss of items) {
        const post = await prisma.post.findFirst({
          where: {
            news_source_item_id: rss.guid,
          },
        }); // check if post already exists

        if (!post) {
          await prisma.post.create({
            data: {
              title: rss.title ?? "Daily news",
              content: source?.content_included ? rss.content : null,
              creator: source?.content_included ? rss.creator : null,
              pubDate:
                source?.pubDate_included && rss.pubDate
                  ? new Date(rss.pubDate)
                  : null,
              is_active: true,
              link: source?.is_linkable ? rss.link : null,
              media: null,
              news_source_id: source.id,
              news_source_item_id: rss.guid,
              tags: {
                connect: source.tags.map((tag) => ({ id: tag.id })),
              },
            },
          });
        }
      }
    }

    console.log(
      `Feed import job completed ${new Date().getHours()}:${new Date().getMinutes()}`,
    );
  } catch (error) {
    console.error("Feed import job failed", error);
  }
};

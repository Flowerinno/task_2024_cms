import { parseRss } from '@/lib/helpers/rss'
import { createClient } from 'redis'
import prisma from '@/lib/prisma'

export const importFeedJob = async () => {
  console.log('job working')

  const redis = await createClient({
    url: process.env.REDIS_URL,
  }).connect()

  try {
    const sources = await prisma.news_source.findMany({
      where: {
        is_active: true,
        is_deleted: false,
      },
      include: {
        tags: true,
      },
    })

    for await (const source of sources) {
      const isImportTimeValid = source.last_import_time
        ? new Date().getTime() - new Date(source.last_import_time).getTime() >
          source.import_interval * 60 * 1000
        : true

      if (!isImportTimeValid) {
        console.log(
          'Feed import job skipped for source ',
          source.name,
          'because of import interval',
        )
        continue
      }

      const { items } = await parseRss(source.url)

      let count = 0

      for (const rss of items) {
        const post = await prisma.post.findFirst({
          where: {
            title: rss.title,
            news_source_item_id: rss.guid,
            news_source_id: source.id,
          },
        })

        if (!post) {
          await prisma.post.create({
            data: {
              title: rss.title ?? 'Daily news',
              content: source?.content_included ? rss.content : null,
              creator: source?.content_included ? rss.creator : null,
              pubDate: source?.pubDate_included && rss.pubDate ? new Date(rss.pubDate) : null,
              is_active: true,
              link: source?.is_linkable ? rss.link : null,
              media: null,
              news_source_id: source.id,
              news_source_item_id: rss.guid ?? null,
              tags: {
                connect: source.tags.map((tag) => ({ id: tag.id })),
              },
            },
          })
          count++
          await redis.incr('post')
        }
      }

      await prisma.news_source.update({
        where: {
          id: source.id,
        },
        data: {
          last_import_time: new Date(),
        },
      })
      console.log(count, 'new posts created')
      console.log(
        `Feed import job completed ${new Date().getHours()}:${new Date().getMinutes()} for source ${source.name}`,
      )
    }
  } catch (error) {
    console.error('Feed import job failed', error)
  } finally {
    await redis.disconnect()
  }
}

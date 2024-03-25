import { NextRequest, NextResponse } from 'next/server'
import { auth } from 'utils/auth'
import prisma from '@/lib/prisma'
import { addFeedSchema } from 'utils/validation/feed.schema'
import { CreateRssRequestInput } from '@/lib/helpers/types'

export async function POST(req: NextRequest) {
  try {
    const session = await auth()

    if (!session) {
      return NextResponse.json(
        {
          message: 'Unauthorized',
        },
        {
          status: 401,
        },
      )
    }

    const { is_active, name, tags, import_interval, include_links, included_fields, url } =
      (await req.json()) as CreateRssRequestInput

    const validate = addFeedSchema.safeParse({
      name,
      tags,
      import_interval,
      include_links,
    })

    if (!validate.success || !url) {
      return NextResponse.json(
        {
          message: 'Invalid data',
        },
        {
          status: 400,
        },
      )
    }

    const isExists = await prisma.news_source.findUnique({
      where: {
        name,
      },
    })

    if (isExists) {
      return NextResponse.json(
        {
          message: 'Feed with such name already exists',
        },
        {
          status: 400,
        },
      )
    }

    for await (const tag of tags) {
      const isTagExists = await prisma.tag.findUnique({
        where: {
          label: tag,
        },
      })

      if (!isTagExists) {
        return NextResponse.json(
          {
            message: 'Tag with such id does not exist',
          },
          {
            status: 400,
          },
        )
      }
    }

    const newSource = await prisma.news_source.create({
      data: {
        name,
        is_active,
        import_interval,
        url,
        is_linkable: include_links,
        title_included: included_fields.title,
        content_included: included_fields.content,
        pubDate_included: included_fields.pubDate,
        creator_included: included_fields.creator,
        tags: {
          connect: tags.map((tag: string) => ({
            label: tag,
          })),
        },
      },
    })

    if (!newSource) {
      return NextResponse.json(
        {
          message: 'Failed to create RSS source',
        },
        {
          status: 500,
        },
      )
    }

    return NextResponse.json(
      {
        id: newSource.id,
        message: 'RSS source created successfully',
      },
      {
        status: 201,
      },
    )
  } catch (error) {
    return NextResponse.json(
      {
        message: 'An error occurred while RSS source',
      },
      {
        status: 500,
      },
    )
  }
}

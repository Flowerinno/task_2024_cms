import { redis } from '@/lib/redis'
import prisma from '@/lib/prisma'

export type Tables = 'user' | 'post' | 'tag' | 'news_source' | 'advertisement'
const allowedTables = ['user', 'post', 'tag', 'news_source', 'advertisement']

export const getCache = async (key: string) => {
  return await redis.get(key)
}

export const setCache = async (key: string, value: string) => {
  return await redis.set(key, value)
}

export const deleteCache = async (key: string) => {
  return await redis.del(key)
}

export const increment = async (key: Tables) => {
  return await redis.incr(key)
}

export const decrement = async (key: Tables) => {
  return await redis.decr(key)
}

export const countTable = async (key: Tables) => {
  let count = 0

  if (!allowedTables.includes(key as string)) return count

  const cachedCount = await getCache(key)

  if (cachedCount) {
    count = Number(cachedCount)
    return count
  }

  switch (key) {
    case 'user':
      count = await prisma.user.count()
      break
    case 'post':
      count = await prisma.post.count({
        where: {
          is_active: true,
          is_deleted: false,
        },
      })
      break
    case 'tag':
      count = await prisma.tag.count()
      break
    case 'news_source':
      count = await prisma.news_source.count()
      break
    case 'advertisement':
      count = await prisma.advertisement.count()
      break
  }

  await setCache(key, String(count))

  return count
}

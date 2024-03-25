import { LRUCache } from 'lru-cache'

type Options = {
  uniqueTokenPerInterval?: number
  interval?: number
}
type TokenType = { count: number; lastCheck: number }

const tokenCache = new LRUCache({
  max: 500,
  ttl: 60000,
})

export function rateLimit(options?: Options) {
  return {
    check: async (headers: any, limit: number, token: string) => {
      return new Promise<void>((resolve, reject) => {
        const tokenCount = (tokenCache.get(token) as TokenType) || {
          count: 0,
          lastCheck: Date.now(),
        }

        const { count, lastCheck } = tokenCount

        const now = Date.now()
        const elapsedTime = now - lastCheck

        if (elapsedTime > (options?.interval || 60000)) {
          tokenCache.set(token, { count: 1, lastCheck: now })
        } else {
          tokenCache.set(token, { count: count + 1, lastCheck: now })
        }

        if (count >= limit) {
          const timeLeft = (options?.interval || 60000) - elapsedTime
          headers.set('Retry-After', Math.ceil(timeLeft / 1000).toString())
          reject(new Error('Rate limit exceeded'))
        } else {
          headers.set('X-RateLimit-Limit', limit.toString())
          headers.set('X-RateLimit-Remaining', (limit - count).toString())
          resolve()
        }
      })
    },
  }
}

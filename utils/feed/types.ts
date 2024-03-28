import { Advertisement, Draft, Post, Tag } from '@prisma/client'

type UserDraft = { User: { email: string; id: string } }
type Tags = { tags: { label: string }[] }
export type DraftResponse = Draft & UserDraft & Tags

export type Statistics = {
  users: number
  posts: number
  tags: number
  news_sources: number
  ads: number
}

export type PostWithTags = Post & { tags: Tag[] } & {
  advertisement: Advertisement
}

export type SearchByTagsResponse = {
  feed: PostWithTags[] | []
  maxPage: number
  ads: Advertisement[]
  adsPerPage: number
}

export type GetHomeFeedResponse = SearchByTagsResponse

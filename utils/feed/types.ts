import { Draft, Post, Tag } from "@prisma/client";

type UserDraft = { User: { email: string; id: string } };
type Tags = { tags: { label: string }[] };
export type DraftResponse = Draft & UserDraft & Tags;

export type Statistics = {
  users: number;
  posts: number;
  tags: number;
  news_sources: number;
};

export type PostWithTags = Post & { tags: Tag[] };

import Image from "next/image";
import { Label } from "@/components/ui/label";
import {
  PostContent,
  PostControls,
  PostCreator,
  PostPublicationDate,
  PostTags,
  PostTitle,
} from "./feed-components";
import { PostWithTags } from "utils/feed/types";

export async function FeedPost({
  post,
  isAdmin = false,
}: {
  post: PostWithTags;
  isAdmin?: boolean;
}) {
  return (
    <div className="flex flex-col sm:flex-row rounded-md w-full md:w-11/12 border-[1px] border-gray-400">
      {post?.media && (
        <Image
          aria-label={post.title}
          src={post.media}
          className="rounded-sm h-[200px] w-full sm:w-[300px]"
          width={200}
          height={200}
          alt={post.title}
        />
      )}
      <div className="flex w-full flex-col gap-3 p-3 justify-around">
        <div className="self-start flex flex-col sm:flex-row sm:gap-3 sm:items-center">
          <PostTitle title={post.title} link={post.link} />
          <div className="flex flex-row gap-3 items-center">
            <PostPublicationDate pubDate={post.created_at} />
            {isAdmin && <PostControls post_id={post.id} />}
            <Label>ID: {post.id}</Label>
          </div>
        </div>
        <PostContent title={post.title} content={post.content} />
        <div className="w-full flex flex-row gap-2 flex-wrap items-center justify-between">
          <PostTags tags={post.tags} />
          <PostCreator creator={post.creator} />
        </div>
      </div>
    </div>
  );
}

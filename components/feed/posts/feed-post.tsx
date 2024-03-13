import { Post } from "@prisma/client";
import { PostTitle } from "./feed-components";

export function FeedPost({ post }: { post: Post }) {
  return (
    <div className="flex flex-col gap-2 p-3 border-[1px] border-gray-400 rounded-md w-11/12">
      <PostTitle title={post.title} link={post.link} />
    </div>
  );
}

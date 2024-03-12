import { Suspense } from "react";
import LoadingDots from "@/components/loading-dots";
import { getHomeFeed } from "utils";
import { FeedPostSkeleton } from "@/components/feed";
import { FeedPagination } from "@/components/feed/posts/feed-pagination";

export default async function Home({
  searchParams: { page, search },
}: {
  searchParams: {
    page: string;
    search: string;
  };
}) {
  const page_q = page && Number(page) > 0 ? Number(page) : 1;
  const search_q = search ? search : "";
  // const feed = await getHomeFeed({ page_q, search_q });
  // console.log(feed);
  const arr = [1, 2, 3, 4];
  return (
    <div className="flex flex-col items-center justify-center gap-3 p-10 bg-white">
      {arr.map((n, i) => {
        return <FeedPostSkeleton key={i} />;
      })}
      {/* <FeedPostSkeleton /> */}
      {/* <Suspense fallback={<FeedPostSkeleton />}></Suspense> */}
      <FeedPagination page={page_q} maxPage={10} />
    </div>
  );
}

import { Suspense } from "react";
import { searchByTags } from "utils";
import { FeedPagination } from "@/components/feed/posts/feed-pagination";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Loading from "../loading";
import Link from "next/link";
import { FeedPost } from "@/components/feed/posts";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { Label } from "@/components/ui/label";

export default async function Tags({
  searchParams: { page, search },
}: {
  searchParams: {
    page: string;
    search: string;
  };
}) {
  const page_q = page && Number(page) > 0 ? Number(page) : 1;
  const search_q = search ? search : "";

  const session = await getServerSession(authOptions);
  const isAdmin = session?.user?.role === "ADMIN";

  const { maxPage, feed } = await searchByTags({
    page: page_q,
    search: search_q,
  });

  const tags = await prisma?.tag.findMany({
    where: {
      is_active: true,
      is_deleted: false,
    },
  });

  return (
    <div className="flex flex-col items-center justify-center gap-3 p-5 md:p-10 overflow-x-hidden relative">
      <form
        method="GET"
        className="w-full md:w-11/12 flex flex-col md:flex-row gap-2"
      >
        <Input
          placeholder="Search by tag... 🔎"
          aria-label="Search for news by title"
          name="search"
          defaultValue={search_q}
          className="flex-1"
        />
        <div className="flex-1 md:flex-[0.1] flex flex-row gap-2">
          <Button className="flex-1 md:flex-[0.2]" type="submit">
            Search
          </Button>
          <Link
            className="flex-1 md:flex-[0.2] inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
            href="/tags"
          >
            Reset
          </Link>
        </div>
      </form>
      <Suspense fallback={<Loading />}>
        <form
          aria-label="Popular tags"
          className="flex flex-row flex-wrap items-center justify-center gap-3 w-full"
        >
          <Label>Popular: </Label>
          {tags && tags?.length > 0 ? (
            tags?.map((tag, i) => {
              if (i > 9) {
                return null;
              }
              return (
                <button
                  aria-label="Click to search by tag"
                  type="submit"
                  name="search"
                  value={tag.label}
                  className="border-[1px] border-gray-400 rounded-md cursor-pointer p-1 text-sm"
                  key={tag.label}
                >
                  #{tag?.label}
                </button>
              );
            })
          ) : (
            <span>-</span>
          )}
        </form>
        {feed?.length > 0 &&
          feed.map((post, i) => {
            return <FeedPost key={i} post={post} isAdmin={isAdmin} />;
          })}
        {feed?.length > 0 ? (
          <FeedPagination page={page_q} maxPage={maxPage} />
        ) : (
          <Label className="p-2">No posts with such tag</Label>
        )}
      </Suspense>
    </div>
  );
}

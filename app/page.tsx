import { Suspense } from "react";
import { getHomeFeed } from "utils";
import { FeedPagination } from "@/components/feed/posts/feed-pagination";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Loading from "./loading";
import Link from "next/link";
import { FeedPost } from "@/components/feed/posts";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { SingleAdvertisement } from "@/components/ads";
import { PostWithTags } from "utils/feed/types";
import { Advertisement } from "@prisma/client";
import React from "react";
import { Label } from "@/components/ui/label";

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

  const session = await getServerSession(authOptions);

  const isAdmin = session?.user?.role === "ADMIN";

  const { feed, maxPage, ads, adsPerPage } = await getHomeFeed({
    page: page_q,
    search: search_q,
  });

  let randomAdsIndexes: Record<string, number> = {};

  for (let i = 0; i < ads?.length; i++) {
    randomAdsIndexes[i] = Math.floor(Math.random() * feed?.length);
  }

  return (
    <div className="flex flex-col items-center justify-center gap-3 p-5 md:p-10 overflow-x-hidden relative">
      <form
        method="GET"
        className="w-full md:w-11/12 flex flex-col md:flex-row gap-2"
      >
        <Input
          placeholder="Search... 🔎"
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
            href="/"
          >
            Reset
          </Link>
        </div>
      </form>
      <br />
      <Suspense fallback={<Loading />}>
        {feed?.length > 0 ? feed.map((item: PostWithTags, i) => {
          if (item.advertisement?.id) {
            return (
              <React.Fragment key={item.id}>
                <FeedPost
                  key={i}
                  post={item as PostWithTags}
                  isAdmin={isAdmin}
                />
                <SingleAdvertisement
                  key={i}
                  ad={item.advertisement as Advertisement}
                  session={session}
                />
              </React.Fragment>
            );
          }

          for (const [key, value] of Object.entries(randomAdsIndexes)) {
            if (i === value) {
              const ad = ads[Number(key)];

              return (
                <React.Fragment key={item.id}>
                  <FeedPost post={item as PostWithTags} isAdmin={isAdmin} />
                  <SingleAdvertisement key={ad?.id} ad={ad} session={session} />
                </React.Fragment>
              );
            }
          }

          return (
            <FeedPost
              key={item.id}
              post={item as PostWithTags}
              isAdmin={isAdmin}
            />
          );
        }) : <Label>No posts found.</Label>}
      </Suspense>
      <FeedPagination page={page_q} maxPage={maxPage} />
    </div>
  );
}

import LoadingDots from "@/components/loading-dots";
import { Label } from "@/components/ui/label";
import { stat } from "fs";
import Link from "next/link";
import { getStatistics } from "utils";

export default async function Dashboard() {
  const statistics = await getStatistics();

  if (!statistics) {
    return <LoadingDots />;
  }
  console.log(statistics);
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-row flex-wrap justify-around items-center p-3">
        <Link href="/dashboard/users" className="font-bold text-3xl">
          Users: <span className="text-2xl">{statistics.users}</span>
        </Link>
        <Link href="/">Posts: {statistics.posts}</Link>
        <Link href="/dashboard/feed/tags">Tags: {statistics.tags}</Link>
        <Link href="/dashboard/feed">
          News Sources: {statistics.news_sources}
        </Link>
      </div>
    </div>
  );
}

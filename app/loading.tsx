import { FeedPostSkeleton } from "@/components/feed";

export default function Loading() {
  const arr = [1, 2, 3, 4, 5];
  return (
    <div className="flex flex-col items-center justify-center gap-3 p-5 md:p-10 bg-white overflow-x-hidden">
      {arr.map((_, i) => {
        return <FeedPostSkeleton key={i} />;
      })}
      ;
    </div>
  );
}

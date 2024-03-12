import { Skeleton } from "@/components/ui/skeleton";

export const FeedPostSkeleton = () => {
  return (
    <div className="w-full h-54 gap-5 md:h-36 flex flex-col justify-center md:flex-row items-center space-x-4">
      {/* <Skeleton className="h-36 md:h-full p-1 w-full md:w-3/12 rounded-md" /> */}

      <div
        style={{ margin: 0 }}
        className="flex flex-col gap-2 items-start h-full w-full md:w-9/12"
      >
        <Skeleton className="h-12 w-8/12" />
        <Skeleton className="h-24 w-11/12" />
      </div>
    </div>
  );
};

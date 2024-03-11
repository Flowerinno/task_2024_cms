import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { FeedItem } from "@/lib/helpers/types";
import { useAddFeed } from "store";
import { formatFeedDate } from "utils/dates";

interface FeedCreationSkeletonProps {
  title?: string;
  sample: FeedItem | null;
}

export const FeedCreationSkeleton = ({
  title,
  sample,
}: FeedCreationSkeletonProps) => {
  const { included_fields, setIncludedFields } = useAddFeed((state) => state);

  if (!sample) return null;

  return (
    <div className="space-y-4">
      <Label>{title}</Label>
      <div className="flex flex-col gap-10 md:gap-4 p-4 min-w-[300px] max-w-[600px] border-[1px] border-gray-400 rounded-md">
        <div className="flex flex-row gap-3">
          {!included_fields.title && (
            <Skeleton
              id="title"
              className="h-4 w-[200px] md:w-[250px] cursor-pointer"
              onClick={() => setIncludedFields("title")}
            />
          )}
          {included_fields.title && (
            <Label
              className="h-4 cursor-pointer font-bold underline underline-offset-2"
              onClick={() => setIncludedFields("title")}
            >
              {sample.title}
            </Label>
          )}
          {!included_fields.pubDate && (
            <Skeleton
              id="pubDate"
              className="h-4 w-[100px] md:w-[150px] cursor-pointer"
              onClick={() => setIncludedFields("pubDate")}
            />
          )}
          {included_fields.pubDate && (
            <Label
              className="h-4 cursor-pointer"
              onClick={() => setIncludedFields("pubDate")}
            >
              ({formatFeedDate(sample.pubDate) ?? "2024"})
            </Label>
          )}
        </div>
        <div className="flex flex-col gap-3" style={{ margin: 0 }}>
          {!included_fields.content && (
            <Skeleton
              id="content"
              className="h-4 w-full cursor-pointer"
              onClick={() => setIncludedFields("content")}
            />
          )}
          {included_fields.content && (
            <Label
              className="cursor-pointer w-full"
              onClick={() => setIncludedFields("content")}
            >
              <p className="w-[200px] md:w-11/12 max-w-[900px] content whitespace-nowrap overflow-hidden text-ellipsis">
                {sample?.contentSnippet} {`[...]`}
              </p>
            </Label>
          )}
          {!included_fields.creator && (
            <Skeleton
              id="creator"
              className="h-4 w-[200px] cursor-pointer self-end"
              onClick={() => setIncludedFields("creator")}
            />
          )}
          {included_fields.creator && (
            <Label
              className="w-[200px] cursor-pointer self-end text-end whitespace-normal"
              onClick={() => setIncludedFields("creator")}
            >
              Author:{" "}
              <span className="text-bold text-blue-700">
                {sample?.creator ?? sample?.["dc:creator"] ?? "Unknown"}
              </span>
            </Label>
          )}
        </div>
      </div>
    </div>
  );
};

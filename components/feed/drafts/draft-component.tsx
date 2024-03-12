import React from "react";
import { useNews } from "store";
import { Label } from "@/components/ui/label";
import { formatTimestamp } from "utils/dates/timestamp";
import { DraftResponse } from "utils/feed/types";
import { CreatePostSchema } from "utils/validation/feed.schema";
import { Delete } from "lucide-react";
import { removeDraft } from "utils";

export const DraftComponent = ({ draft }: { draft: DraftResponse }) => {
  const { selectDraft, removeFromDrafts } = useNews((state) => state);

  const openDraft = () => {
    const payload: CreatePostSchema = {
      title: draft.title,
      content: draft.content || "",
      link: draft.link || "",
      creator: draft.creator || "",
      media: draft.media || "",
      tags: draft.tags?.map((tag) => tag.label) || [],
      is_active: draft.is_active,
      pubDate_included: draft.pubDate_included,
    };
    selectDraft(payload);
  };

  const handleDeleteDraft = async () => {
    const res = await removeDraft(draft.id);

    if (res) {
      removeFromDrafts(draft.id);
    }
  };

  return (
    <div className="border-[1px] w-11/12 border-gray-400 border-l-0 rounded-tr-md rounded-br-md p-2 cursor-pointer flex flex-row gap-2 ">
      <div
        className="flex flex-col gap-1 flex-1"
        aria-label="Select current draft for modification"
        onClick={openDraft}
      >
        <Label
          className="font-bold overflow-hidden text-ellipsis min-w-24 w-46 max-w-46"
          aria-label={`Draft ${draft.title}`}
        >
          {draft.title}
        </Label>
        <Label className="cursor-pointer">
          {formatTimestamp(draft.created_at)}
        </Label>
        <Label className="cursor-pointer">Author: {draft.User.email}</Label>
      </div>
      <Delete
        color="red"
        size={20}
        className="self-center p-0 m-0 hover:scale-105"
        onClick={handleDeleteDraft}
        aria-label="Remove this draft"
      />
    </div>
  );
};

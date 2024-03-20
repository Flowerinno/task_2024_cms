"use client";

import { AdvertisementDraft } from "@prisma/client";
import { Delete } from "lucide-react";
import React from "react";
import { useAdStore } from "store/ads/useAdStore";
import { Label } from "../ui/label";
import { formatTimestamp } from "utils/dates/timestamp";
import { deleteAdDraft } from "utils/ads";
import { useRouter } from "next/navigation";

export const AdDraft = ({ draft }: { draft: AdvertisementDraft }) => {
  const router = useRouter();
  const { selectDraft } = useAdStore((state) => state);

  const openDraft = () => {
    selectDraft(draft);
  };

  const handleDeleteDraft = async () => {
    const res = await deleteAdDraft(draft.id);

    if (res) {
      router.refresh();
    }
  };

  return (
    <div className="border-[1px] w-[300px] md:w-11/12 border-gray-400 border-l-0 rounded-tr-md rounded-br-md p-2 cursor-pointer flex flex-row gap-2">
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

"use client";

import React, { useEffect, useState } from "react";
import { useNews } from "store/feed";
import { AddPostForm } from "@/components/feed/create";
import LoadingDots from "@/components/loading-dots";
import { Separator } from "@/components/ui/separator";
import { getDrafts } from "utils";
import { DraftComponent } from "@/components/feed/drafts";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";

export default function CreatePost() {
  const [isLoading, setIsLoading] = useState(true);
  const { drafts, setDrafts } = useNews((state) => state);

  useEffect(() => {
    getDrafts()
      .then((res) => {
        setDrafts(res);
        setIsLoading(false);
      })
      .catch((_) => {
        toast.error("Failed to fetch drafts");
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {}, [drafts?.length]);

  if (isLoading) return <LoadingDots />;

  return (
    <div className="flex flex-row w-full p-0">
      <div id="drafts" className="flex-[0.3] flex flex-col gap-2">
        {drafts?.length > 0 ? (
          drafts.map((draft) => <DraftComponent key={draft.id} draft={draft} />)
        ) : (
          <Label className="self-center">No drafts</Label>
        )}
      </div>
      <Separator orientation="vertical" />
      <AddPostForm />
    </div>
  );
}

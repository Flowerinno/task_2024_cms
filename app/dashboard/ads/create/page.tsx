import React from "react";
import { CreateAdForm } from "@/components/ads/create-add-form";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { AdDraft } from "@/components/ads";
import { minio } from "@/lib/minio";

export default async function CreateAdd() {
  const drafts = (await prisma?.advertisementDraft.findMany()) ?? [];

  const draftsWithSignedUrl = await Promise.all(
    drafts &&
      drafts.map(async (draft) => {
        if (draft.media) {
          const signedUrl = await minio.client.presignedGetObject(
            "default",
            `ads_draft_${draft.id}.png`,
            60 * 60, // 1 hour expiry in seconds
          );

          return {
            ...draft,
            media: signedUrl,
          };
        }
        return draft;
      }),
  );

  return (
    <div className="flex flex-col md:flex-row w-full p-0">
      <div
        id="drafts"
        className="flex md:flex-[0.3] md:flex-col flex-row p-2 overflow-x-scroll gap-2"
      >
        {draftsWithSignedUrl &&
        draftsWithSignedUrl?.length > 0 &&
        draftsWithSignedUrl?.length > 0 ? (
          draftsWithSignedUrl.map((draft) => (
            <AdDraft key={draft.id} draft={draft} />
          ))
        ) : (
          <Label className="self-center p-2">No drafts...</Label>
        )}
      </div>
      <Separator orientation="vertical" className="hidden md:block h-full" />
      <CreateAdForm />
    </div>
  );
}

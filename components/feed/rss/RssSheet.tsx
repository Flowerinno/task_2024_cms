import React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { News_source } from "@prisma/client";

import { formatTimestamp } from "utils/dates/timestamp";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Alert } from "@/components/alert";
import { Separator } from "@/components/ui/separator";

import { deleteRssSource, updateRssSource } from "utils";
import { useRss } from "store";

export const RssSheet = ({ source }: { source: News_source }) => {
  const { setActiveSource, removeSource } = useRss((state) => state);

  const handleActive = async () => {
    const is_active = !source.is_active;
    const res = await updateRssSource({ id: source.id, is_active });

    if (res) {
      setActiveSource({ id: source.id, is_active });
    }
  };

  const handleDelete = async () => {
    const res = await deleteRssSource(source.id);

    if (res) {
      removeSource(source.id);
    }
  };

  return (
    <>
      <SheetContent
        aria-description="RSS sheet description"
        className="transition-all duration-200"
      >
        <SheetHeader>
          <SheetTitle
            style={{
              color: source.is_active ? "green" : "red",
            }}
          >
            {source.name} ({source.is_active ? "active" : "inactive"})
          </SheetTitle>
          <SheetDescription>
            Created at: {formatTimestamp(source.created_at)}
          </SheetDescription>
          <SheetDescription>
            Updated at: {formatTimestamp(source.updated_at)}
          </SheetDescription>
          <Separator />
          <SheetDescription>
            Import interval: {source.import_interval} minutes
          </SheetDescription>
          <SheetDescription className="space-y-4">
            <a
              href={source.url}
              target="_blank"
              className="rounded-md outline-none border-none text-blue-500 bg-gray-300 p-1"
            >
              {source.url}
            </a>
          </SheetDescription>

          <br />
          <SheetDescription className="flex flex-col">
            <Label className="text-center w-full">
              Selected fields for this rss source
            </Label>
          </SheetDescription>

          <div className="border-[1px] border-gray-400 p-3 rounded-md flex flex-col gap-2">
            <div className="flex flex-1 items-center gap-2 select-none">
              <p
                className="flex-1 border-[1px] border-gray-400 rounded-md p-1"
                style={{
                  cursor: source.is_linkable ? "pointer" : "not-allowed",
                }}
              >
                Title ({source.is_linkable ? "Linkable" : "Not linkable"})
              </p>
              {source.pubDate_included && "Publication date"}
            </div>
            {source.content_included && (
              <p className="flex-1 border-[1px] border-gray-400 rounded-md p-1 select-none">
                Content goes here
              </p>
            )}
            {source.creator_included && (
              <div className="self-end select-none">
                Author: <span className="text-blue-400">Bob Ross</span>
              </div>
            )}
          </div>
          <br />
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                aria-label="Activate/Deactivate RSS source"
                style={{
                  color: source.is_active ? "red" : "green",
                }}
              >
                {source.is_active ? "Deactivate" : "Activate"}
              </Button>
            </AlertDialogTrigger>
            <Alert
              title={
                source.is_active
                  ? "This action will deactivate RSS source"
                  : "This action will active RSS source"
              }
              description={
                source.is_active
                  ? "Are you sure you want to deactivate this RSS source? After deactivation, the source will no longer be fetching news."
                  : "Are you sure you want to activate this RSS source? After activation, the source will start news fetching."
              }
              accept="Continue"
              cancel="Cancel"
              callback={handleActive}
            />
          </AlertDialog>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button aria-label="Delete RSS source">Delete RSS source</Button>
            </AlertDialogTrigger>
            <Alert
              title={`This action will delete ~${source.name}~ RSS source`}
              description="Are you sure you want to delete this RSS source? After deletion, the source will no longer be available."
              accept="Delete"
              cancel="Cancel"
              callback={handleDelete}
            />
          </AlertDialog>
        </SheetHeader>
      </SheetContent>
    </>
  );
};

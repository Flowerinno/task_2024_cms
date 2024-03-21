"use client";
import React, { useEffect, useState } from "react";
import { Advertisement } from "@prisma/client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent } from "@/components/ui/popover";
import { formatTimestamp } from "utils/dates/timestamp";
import { Button } from "../ui/button";
import { updateAd } from "utils/ads";

export const AdPopover = ({
  ad,
  isOpen,
  onOpen,
}: {
  ad: Advertisement;
  isOpen: boolean;
  onOpen: (v: boolean) => void;
}) => {
  const [is_active, setIs_active] = useState(ad.is_active);

  return (
    <Popover open={isOpen} onOpenChange={onOpen} defaultOpen={false}>
      <PopoverContent className="absolute w-screen">
        <form
          method="POST"
          action="/api/admin/ads/update"
          className="grid gap-4 p-3"
        >
          <div className="space-y-2">
            <h4 className="font-medium leading-none">
              Created on: {formatTimestamp(ad.created_at)}{" "}
              {ad?.post_id ? `| Post ID: ${ad.post_id}` : ""}
            </h4>
          </div>
          <div className="grid gap-3">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                defaultValue={ad.title}
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="ad_priority">Ad priority</Label>
              <Input
                id="ad_priority"
                name="ad_priority"
                min={0}
                max={100}
                type="number"
                defaultValue={ad.ad_priority}
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="link">Link</Label>
              <Input
                id="link"
                name="link"
                defaultValue={ad.link ?? ""}
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="is_active">Is active</Label>
              <Input
                id="is_active"
                name="is_active"
                type="input"
                disabled
                value={is_active ? "YES" : "NO"}
                style={{
                  color: is_active ? "green" : "red",
                }}
                className="col-span-2 h-8 font-bold"
              />
            </div>
          </div>
          <input type="hidden" value={ad.id} name="id" />
          <Button type="submit" variant="default" className="flex-1">
            Update
          </Button>
        </form>
        <div className="w-full flex flex-row gap-2">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => {
              setIs_active(!is_active);
              updateAd({ id: ad.id, is_active: !is_active });
            }}
          >
            {is_active ? "Deactivate" : "Activate"}
          </Button>
          <Button variant="destructive" className="flex-1" onClick={() => {}}>
            Delete
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

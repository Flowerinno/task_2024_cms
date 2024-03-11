import React from "react";

import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { News_source } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import { RssSheet } from "./RssSheet";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";

const possible_fields = {
  title_included: "Title",
  content_included: "Content",
  creator_included: "Creator",
  pubDate_included: "Publication Date",
  is_linkable: "Linkable",
};

export const RssSource = ({ source }: { source: News_source }) => {
  return (
    <>
      <li className="w-fit min-w-[250px] p-3 border-2 border-gray-500 rounded-md flex flex-row items-center gap-5 transition-all duration-200">
        <Label
          aria-label={`RSS feed source - ${source.name}`}
          className="flex-1 p-2 font-bold tracking-widest"
          style={{ color: source?.is_active ? "green" : "red" }}
        >
          {source.name.toLowerCase()}
        </Label>

        <Separator orientation="vertical" />
        <Sheet>
          <SheetTrigger asChild>
            <Button
              aria-label="Open RSS feed description"
              title="Info"
              size="sm"
            >
              <Info size="16" />
            </Button>
          </SheetTrigger>
          <RssSheet source={source} />
        </Sheet>
      </li>
    </>
  );
};

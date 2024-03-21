import { Label } from "@/components/ui/label";
import React from "react";

export const PostCreator = ({ creator }: { creator: string | null }) => {
  if (!creator) return null;

  return (
    <Label aria-label="Post author" className="self-end flex items-center">
      Author: <span className="text-blue-400">{creator}</span>
    </Label>
  );
};

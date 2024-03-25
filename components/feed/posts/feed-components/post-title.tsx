import React from "react";
import { Label } from "@/components/ui/label";

export const PostTitle = ({
  title,
  link,
}: {
  title: string;
  link: string | null;
}) => {
  if (link) {
    return (
      <Label aria-label={title} className="font-bold text-blue-400 text-[16px]">
        <a href={link} target="_blank">
          {title}
        </a>
      </Label>
    );
  }

  return (
    <Label aria-label={title} className="font-bold text-[16px]">
      {title}
    </Label>
  );
};

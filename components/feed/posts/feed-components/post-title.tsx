import React from "react";
import { Label } from "@/components/ui/label";

export const PostTitle = ({
  title,
  link,
}: {
  title: string;
  link: string | null;
}) => {
  if (link !== null) {
    return (
      <Label>
        <a href={link} target="_blank">
          {title}
        </a>
      </Label>
    );
  }

  return <Label>{title}</Label>;
};

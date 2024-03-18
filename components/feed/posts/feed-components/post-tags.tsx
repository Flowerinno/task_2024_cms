import { Tag } from "@prisma/client";
import React from "react";

export const PostTags = ({ tags }: { tags: Tag[] | [] }) => {
  if (tags.length === 0) return null;

  return (
    <ul className="flex flex-row flex-wrap gap-2">
      {tags.map((tag) => (
        <li key={tag.id} className="text-xs bg-gray-200 p-1 rounded-md">
          #{tag.label}
        </li>
      ))}
    </ul>
  );
};

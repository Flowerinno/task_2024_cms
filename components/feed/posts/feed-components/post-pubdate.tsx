import React from "react";
import { Label } from "@/components/ui/label";
import { formatTimestamp } from "utils/dates/timestamp";

export const PostPublicationDate = ({ pubDate }: { pubDate: Date }) => {
  if (!pubDate) return null;

  return (
    <Label aria-label="Publication date">
      {formatTimestamp(pubDate, true)}
    </Label>
  );
};

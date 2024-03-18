"use client";

import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { removePost } from "utils";
import { Label } from "@/components/ui/label";

interface PostControlsProps {
  post_id: number;
}

export const PostControls = ({ post_id }: PostControlsProps) => {
  const [isDeleted, setIsDeleted] = useState(false);
  const onClick = async () => {
    const res = await removePost(post_id);

    if (res) {
      setIsDeleted(true);
    }
  };

  if (isDeleted) {
    return <Label className="font-bold text-red-500">DELETED</Label>;
  }

  return (
    <Button
      variant="destructive"
      onClick={onClick}
      className="text-[10px] p-1 h-fit"
      size="sm"
    >
      Delete
    </Button>
  );
};

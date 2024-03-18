"use client";
import React, { useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import "./post.css";

export const PostContent = ({
  content,
  title,
}: {
  content: string | null;
  title: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(!isOpen);

  let prefix = !isOpen
    ? `Read more about ${title}`
    : `Close content for ${title}`;

  if (!content) return null;

  return (
    <div className="text-gray-600 max-w-11/12 flex flex-col items-start p-0">
      <Accordion className="w-full" type="single" collapsible>
        <AccordionItem className="text-left" value="item-1">
          <AccordionTrigger
            onClick={handleOpen}
            className="text-left p-0 m-0 font-bold"
          >
            {prefix}
          </AccordionTrigger>
          <AccordionContent>
            <div
              className="whitespace-normal w-full lg:max-w-[950px] break-all overflow-wrap bg-gray-200 p-3 rounded-md"
              dangerouslySetInnerHTML={{ __html: content }}
            ></div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

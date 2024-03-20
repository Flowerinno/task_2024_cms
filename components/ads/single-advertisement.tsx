"use client";

import { Advertisement } from "@prisma/client";
import Link from "next/link";
import React, { useState } from "react";
import { Label } from "../ui/label";
import Image from "next/image";

import { AdPopover } from "./ad-popover";

export const SingleAdvertisement = ({ ad }: { ad: Advertisement }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (ad?.link) {
    return (
      <Link
        className="relative h-24 min-h-24 min-w-[300px] w-5/12 border-[2px] rounded-md hover:border-blue-400 transition-all overflow-hidden"
        href={ad.link}
        target="_blank"
        onMouseEnter={() => setIsOpen(true)}
      >
        {ad?.media && (
          <Image
            src={ad.media}
            alt={ad.title}
            width={200}
            height={200}
            className="w-full h-24 rounded-sm object-fill"
          />
        )}
        <Label
          className="absolute left-2 top-2 font-bold text-xl cursor-pointer"
          style={{
            color: ad?.media ? "white" : "black",
          }}
        >
          {ad.title}
        </Label>
        {isOpen && <AdPopover isOpen={isOpen} onOpen={setIsOpen} ad={ad} />}
      </Link>
    );
  }

  return (
    <div
      className="relative w-5/12 min-w-[300px] h-24 min-h-24 border-[2px] rounded-md "
      onMouseEnter={() => setIsOpen(true)}
    >
      {ad?.media && (
        <Image
          src={ad.media}
          alt={ad.title}
          width={200}
          height={200}
          className="w-full h-24 rounded-sm object-fill"
        />
      )}
      <Label
        className="absolute left-2 top-2 font-bold text-xl text-center"
        style={{
          color: ad?.media ? "white" : "black",
        }}
      >
        {ad.title}
      </Label>
      {isOpen && <AdPopover isOpen={isOpen} onOpen={setIsOpen} ad={ad} />}
    </div>
  );
};

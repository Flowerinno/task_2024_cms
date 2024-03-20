import React from "react";

import { Label } from "@/components/ui/label";
import Link from "next/link";
import { minio } from "@/lib/minio";
import { Advertisement } from "@prisma/client";
import { SingleAdvertisement } from "@/components/ads";

export default async function Ads() {
  let ads = await prisma?.advertisement.findMany();

  let adsWithMedia: Advertisement[] | [] = [];

  if (ads && ads?.length > 0) {
    adsWithMedia = await Promise.all(
      ads.map(async (ad) => {
        if (ad.media) {
          const signedUrl = await minio.client.presignedGetObject(
            "default",
            `ads_${ad.id}.png`,
            60 * 60, // 1 hour expiry in seconds
          );

          return {
            ...ad,
            media: signedUrl,
          };
        }
        return ad;
      }),
    );
  }

  if (ads?.length === 0) {
    return (
      <div className="text-center p-5">
        <Label className="text-md">
          No ads available.{" "}
          <Link className="text-blue-400" href="/dashboard/ads/create">
            Create one.
          </Link>
        </Label>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-row flex-wrap justify-center gap-10 p-3">
      {adsWithMedia?.length &&
        adsWithMedia.map((ad) => {
          return <SingleAdvertisement key={ad.id} ad={ad} />;
        })}
    </div>
  );
}

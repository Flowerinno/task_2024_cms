import React from "react";

import { Label } from "@/components/ui/label";
import Link from "next/link";

export default async function Ads() {
  const ads = await prisma?.advertisement.findMany();

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
    <div>
      {ads?.length &&
        ads.map((ad) => {
          return (
            <Label className="border-2 rounded-md p-2 w-24 m-2" key={ad.id}>
              {ad.title}
            </Label>
          );
        })}
    </div>
  );
}

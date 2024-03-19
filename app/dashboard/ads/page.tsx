import { Label } from "@/components/ui/label";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import { auth } from "utils/auth";

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

  return <div>Ads</div>;
}

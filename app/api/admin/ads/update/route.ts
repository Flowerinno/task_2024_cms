import { NextRequest, NextResponse } from "next/server";
import { auth } from "utils/auth";
import { updateAdSchema } from "utils/validation/ads.schema";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const fromURL = req.headers.get("Referer") ?? "/dashboard/ads";
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.redirect(
        fromURL + "?message=You are not authorized",
        303,
      );
    }

    const formData = await req.formData();

    const body = Object.fromEntries(formData);

    const validate = updateAdSchema.safeParse(body);

    if (!validate.success) {
      return NextResponse.redirect(fromURL + "?message=Invalid data", 303);
    }

    const { title, link, ad_priority, id } = validate.data;

    await prisma.advertisement.update({
      where: {
        id: Number(id),
      },
      data: {
        title,
        link,
        ad_priority: ad_priority ? parseInt(ad_priority) : 0,
      },
    });

    return NextResponse.redirect(fromURL + "?message=Ad updated", 303);
  } catch (error) {
    return NextResponse.redirect(
      fromURL + "?message=Something went wrong",
      303,
    );
  }
}

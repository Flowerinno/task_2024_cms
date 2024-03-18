import { NextRequest, NextResponse } from "next/server";
import { auth } from "utils/auth";
import prisma from "@/lib/prisma";
import { updatePostSchema } from "utils/validation/feed.schema";
import { redirect } from "next/navigation";

export async function POST(req: NextRequest) {
  const formData = await req.formData();

  const id = formData.get("id");
  const is_active = formData.get("is_active") === "on" ? true : false;
  const is_deleted = formData.get("is_deleted") === "on" ? true : false;
  const title = formData.get("title");
  const content = formData.get("content");
  const link = formData.get("link");
  const creator = formData.get("creator");

  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json(
        {
          message: "Unauthorized",
        },
        {
          status: 401,
        },
      );
    }

    const validate = updatePostSchema.safeParse({
      id: Number(id),
      is_active,
      is_deleted,
      title,
      content,
      link,
      creator,
    });

    if (!validate.success) {
      throw new Error("Invalid input");
    }

    const { data } = validate;

    await prisma.post.update({
      where: {
        id: data.id,
      },
      data: {
        is_active,
        is_deleted,
        title: data.title,
        content: data.content,
        link: data.link,
        creator: data.creator,
      },
    });
  } catch (_) {
  } finally {
    return NextResponse.redirect(
      new URL(req.url).origin + `/dashboard/feed/posts/edit/${id}`,
      302,
    );
  }
}

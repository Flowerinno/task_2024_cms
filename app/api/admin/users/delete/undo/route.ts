import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "utils/auth";

export async function DELETE(req: NextRequest, res: NextResponse) {
  const session = await auth();

  if (!session || session.user.role !== "ADMIN") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await req.json();
  const user_id = id;

  if (!user_id) {
    return NextResponse.json({ message: "No/Wrong slug..." }, { status: 404 });
  }

  try {
    const deletedUser = await prisma.user.update({
      where: {
        id: user_id,
      },
      data: {
        is_deleted: false,
      },
    });

    if (!deletedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Removed user from deleted." });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while removing user from deleted." },
      { status: 500 },
    );
  }
}

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest, res: NextResponse) {
	const session = await getServerSession(authOptions);

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
				is_deleted: true,
			},
		});

		if (!deletedUser) {
			return NextResponse.json({ message: "User not found" }, { status: 404 });
		}

		return NextResponse.json({ message: "User deleted." });
	} catch (error) {
		return NextResponse.json(
			{ message: "Something went wrong on our end... We'll fix it soon." },
			{ status: 500 }
		);
	}
}
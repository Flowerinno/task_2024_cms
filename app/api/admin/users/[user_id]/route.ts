import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
	req: Request,
	{ params }: { params: { user_id: string } }
) {
	const { user_id } = params;

	if (!user_id) {
		return NextResponse.json({ message: "No/Wrong slug..." }, { status: 404 });
	}
	try {
		const user = await prisma.user.findUnique({
			where: {
				id: user_id,
			},
			select: {
				id: true,
				email: true,
				role: true,
				created_at: true,
				is_blocked: true,
				is_deleted: true,
			},
		});

		if (!user) {
			return NextResponse.json({ message: "User not found" }, { status: 404 });
		}

		return NextResponse.json(user);
	} catch (error) {
		console.log(error);
		return NextResponse.json({
			message: "An error occurred while fetching user",
		});
	}
}

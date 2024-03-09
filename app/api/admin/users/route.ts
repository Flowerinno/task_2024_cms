import prisma from "@/lib/prisma";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export async function GET(req: NextApiRequest) {
	try {
		const url = new URL(req?.url || "", "http://localhost");
		const page = url.searchParams.get("page") ?? 1;
		const email = url.searchParams.get("email")?.toLowerCase();

		const maxPage = Math.ceil(await prisma.user.count()/ 10) ;

		const users = await prisma.user.findMany({
			where: {
				email: {
					contains: email ? email : undefined,
				},
			},
			skip: Number(page) * 10 - 10,
			take: Number(page) * 10,
			select: {
				id: true,
				email: true,
				role: true,
				is_blocked: true,
				is_deleted: true,
				created_at: true,
			},
		});

		const response = {
			users,
			maxPage,
		};

		return NextResponse.json(response, { status: 200 });
	} catch (error) {
		return NextResponse.json({
			error: "An error occurred while fetching users",
			status: 500,
		});
	}
}

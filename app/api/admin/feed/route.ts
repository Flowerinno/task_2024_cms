import { auth } from "utils/auth";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
	try {
		const session = await auth();

		if (!session) {
			return NextResponse.json(
				{
					message: "Unauthorized",
				},
				{
					status: 401,
				}
			);
		}

		const rssList = await prisma.news_source.findMany();

		return NextResponse.json(rssList);
	} catch (error) {
		return NextResponse.json({
			message: "An error occurred while fetching RSS list",
		});
	}
}

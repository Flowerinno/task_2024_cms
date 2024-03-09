import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		const session = await getServerSession(authOptions);

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

		const tags = await prisma.tag.findMany();

		return NextResponse.json( tags );
	} catch (error) {
		return NextResponse.json(
			{
				message: "Failed to fetch tags",
			},
			{
				status: 5000,
			}
		);
	}
}

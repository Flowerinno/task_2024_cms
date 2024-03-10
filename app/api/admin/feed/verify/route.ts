import { parseRss } from "@/lib/helpers/rss";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "utils/auth";

import prisma from "@/lib/prisma";

export const revalidate = 0;

export async function GET(req: NextRequest) {
	try {
		const url = new URL(req?.url || "", "http://localhost");
		const rss_url = url.searchParams.get("rss_url");

		if (!rss_url) {
			return NextResponse.json(
				{
					message: "Invalid RSS URL",
				},
				{
					status: 400,
				}
			);
		}

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

		const isExists = await prisma.news_source.findUnique({
			where: {
				url: rss_url,
			},
		});

		if (isExists) {
			return NextResponse.json(
				{
					message: "Feed already exists",
				},
				{
					status: 400,
				}
			);
		}

		const { items } = await parseRss(rss_url);

		return NextResponse.json(
			{
				...items[0],
			},
			{
				status: 200,
			}
		);
	} catch (error) {
		return NextResponse.json(
			{
				message: "Could not verify RSS feed",
			},
			{
				status: 400,
			}
		);
	}
}

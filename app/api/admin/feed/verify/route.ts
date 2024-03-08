import { parseRss } from "@/lib/helpers/rss";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "utils/auth";

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

		const { items } = await parseRss(rss_url);

		return NextResponse.json({
			...items[0],
		});
	} catch (error) {
		return NextResponse.json({
			message: "An error occurred while verifying RSS feed",
		});
	}
}

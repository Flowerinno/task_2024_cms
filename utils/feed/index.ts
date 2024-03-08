import { FeedItem } from "@/lib/helpers/types";
import { News_source } from "@prisma/client";
import toast from "react-hot-toast";

const base = process.env.NEXT_PUBLIC_API_URL;

export async function getRssList(): Promise<News_source[] | []> {
	try {
		const url = base + `/admin/feed`;
		const res = await fetch(url, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});

		const data = await res.json();

		if (res.status !== 200) {
			toast.error(data?.message ?? "");
		}

		return data ?? [];
	} catch (error: { message: string } | any) {
		return [];
	}
}

export async function verifyRss(
	rss_url: string
): Promise<FeedItem | undefined> {
	try {
		const url = new URL(`${base}/admin/feed/verify`);
		url.searchParams.append("rss_url", rss_url);

		const res = await fetch(url.href, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});

		const data = await res.json();

		if (res.status !== 200) {
			toast.error(data?.message ?? "");
			return;
		}

		toast.success("RSS feed verified successfully");

		return data;
	} catch (error: { message: string } | any) {}
}

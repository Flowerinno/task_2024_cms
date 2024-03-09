import { FeedItem } from "@/lib/helpers/types";
import { News_source, Tag } from "@prisma/client";
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

export async function getTags(): Promise<Tag[] | []> {
	try {
		const url = base + `/admin/feed/tags`;
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

export async function createTag({
	label,
	is_active,
}: {
	label: string;
	is_active: boolean;
}): Promise<Tag | undefined> {
	try {
		const url = base + `/admin/feed/tags/create`;
		const res = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ label, is_active }),
		});

		const data = await res.json();

		if (res.status !== 201) {
			toast.error(data?.message ?? "");
			return;
		}

		toast.success("Tag created successfully");

		return data;
	} catch (_) {
		toast.error("Failed to create tag");
	}
}

export async function updateTagActivity({
	id,
	is_active,
}: {
	id: number;
	is_active: boolean;
}): Promise<Tag | undefined> {
	try {
		const url = base + `/admin/feed/tags/update`;
		const res = await fetch(url, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ id, is_active }),
		});

		const data = await res.json();

		if (res.status !== 200) {
			toast.error(data?.message ?? "");
			return;
		}

		return data;
	} catch (_) {
		toast.error("Failed to update tag");
	}
}

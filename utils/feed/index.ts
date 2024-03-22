import { CreateRssRequestInput, FeedItem } from "@/lib/helpers/types";
import { Advertisement, News_source, Tag } from "@prisma/client";
import toast from "react-hot-toast";
import { DraftResponse, PostWithTags, Statistics } from "./types";
import { CreatePostSchema } from "utils/validation/feed.schema";

const base = process.env.NEXT_PUBLIC_API_URL;

export async function getStatistics(): Promise<Statistics | undefined> {
  try {
    const url = base + `/admin`;
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store, max-age=0",
      },
      cache: "no-store",
    });

    const data = await res.json();

    if (res.status !== 200) {
      toast.error(data?.message ?? "");
      return;
    }
    return data;
  } catch (error: { message: string } | any) {
    return;
  }
}

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

export async function createRssSource(
  payload: CreateRssRequestInput,
): Promise<{ id: string } | undefined> {
  try {
    const url = base + `/admin/feed/create`;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (res.status !== 201 || !data?.id) {
      toast.error(data?.message ?? "");
      return;
    }

    toast.success("RSS feed created successfully");

    return data;
  } catch (_) {
    toast.error("Failed to create RSS feed");
  }
}

export async function updateRssSource({
  id,
  is_active,
}: {
  id: number;
  is_active: boolean;
}): Promise<News_source | undefined> {
  try {
    const url = base + `/admin/feed/update`;
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

    toast.success("RSS feed updated successfully");

    return data;
  } catch (_) {
    toast.error("Failed to update RSS feed");
  }
}

export async function deleteRssSource(id: number): Promise<boolean> {
  try {
    const url = base + `/admin/feed/delete`;
    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    const data = await res.json();

    if (res.status !== 200) {
      toast.error(data?.message ?? "");
      return false;
    }

    toast.success("RSS feed deleted successfully");

    return true;
  } catch (_) {
    toast.error("Failed to delete RSS feed");
    return false;
  }
}

export async function verifyRss(
  rss_url: string,
): Promise<FeedItem | undefined> {
  try {
    const url = new URL(`${base}/admin/feed/verify`);
    url.searchParams.append("rss_url", rss_url);

    const res = await fetch(url.href, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store, max-age=0",
      },
      cache: "no-store",
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
        "Cache-Control": "no-store, max-age=0",
      },
      cache: "no-store",
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

export async function searchByTags({
  page,
  search,
}: {
  page: number;
  search: string;
}): Promise<{
  feed: PostWithTags[] | [];
  maxPage: number;
  ads: Advertisement[];
  adsPerPage: number;
}> {
  try {
    const url = new URL(base + `/admin/feed/tags/search`);

    url.searchParams.append("page", String(page));
    url.searchParams.append("search", search);

    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store, max-age=0",
      },
      cache: "no-store",
    });

    const data = await res.json();

    if (res.status !== 200) {
      toast.error(data?.message ?? "");
    }

    return data;
  } catch (error: { message: string } | any) {
    return { feed: [], maxPage: 1, ads: [], adsPerPage: 1 };
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

export async function getDrafts(): Promise<DraftResponse[] | []> {
  try {
    const url = base + `/admin/feed/drafts`;
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

export async function createDraft(
  payload: CreatePostSchema,
): Promise<DraftResponse | undefined> {
  try {
    const url = base + `/admin/feed/drafts/create`;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (res.status !== 201) {
      toast.error(data?.message ?? "");
      return;
    }

    toast.success("Draft created successfully");

    return data?.draft;
  } catch (_) {
    toast.error("Failed to create draft");
  }
}

export async function removeDraft(id: number) {
  try {
    const url = base + `/admin/feed/drafts/delete`;
    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    const data = await res.json();

    if (res.status !== 200) {
      toast.error(data?.message ?? "");
      return;
    }

    toast.success("Draft deleted successfully");

    return true;
  } catch (_) {
    toast.error("Failed to delete draft");
  }
}

export async function createPost(payload: CreatePostSchema): Promise<boolean> {
  try {
    const url = base + `/admin/feed/posts/create`;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (res.status !== 201) {
      toast.error(data?.message ?? "");
      return false;
    }

    toast.success(data?.message ?? "Post created successfully");
    return true;
  } catch (_) {
    toast.error("Failed to create post");
    return false;
  }
}

export async function getPost(id: number) {
  try {
    const url = base + `/admin/feed/posts/find/${id}`;
    const res = await fetch(url, {
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
    
    return data;
  } catch (_) {
    toast.error("Failed to fetch post");
  }
}

export async function getHomeFeed({
  page,
  search,
}: {
  page: number;
  search: string;
}): Promise<{
  feed: PostWithTags[] | [];
  maxPage: number;
  ads: Advertisement[] | [];
  adsPerPage: number;
}> {
  try {
    const url = new URL(`${base}/news`);

    url.searchParams.append("page", String(page));
    url.searchParams.append("search", search);

    const res = await fetch(url.href, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    const { feed, maxPage, ads, adsPerPage, message } = await res.json();

    if (res.status !== 200) {
      toast.error(message ?? "");
    }

    return { feed, maxPage, ads, adsPerPage };
  } catch (error: { message: string } | any) {
    return { feed: [], maxPage: 1, ads: [], adsPerPage: 1 };
  }
}

export async function removePost(id: number): Promise<boolean> {
  try {
    const url = base + `/admin/feed/posts/delete`;
    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    const data = await res.json();

    if (res.status !== 200) {
      toast.error(data?.message ?? "");
      return false;
    }

    toast.success("Post deleted successfully");

    return true;
  } catch (_) {
    toast.error("Failed to delete post");
    return false;
  }
}

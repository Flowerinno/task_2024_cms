import { Post } from "@prisma/client";
import { create } from "zustand";

type FeedStore = {
  feed: Post[] | [];
};

export const useFeed = create<FeedStore>((set) => ({
  feed: [],
  setFeed: (feed: Post[]) => set((state) => ({ ...state, feed })),
}));

import { Tag } from "@prisma/client";
import { create } from "zustand";

type TagsStore = {
  tags: Tag[] | [];
  setTags: (tags: Tag[] | []) => void;
  setTag: (tag: Tag) => void;
  updateTag: (tag: Tag) => void;
};

export const useTags = create<TagsStore>((set) => ({
  tags: [],
  setTags: (tags: Tag[] | []) => set((state) => ({ ...state, tags })),
  setTag: (tag: Tag) =>
    set((state) => ({
      ...state,
      tags: Array.isArray(state.tags) ? [...state.tags, tag] : [tag],
    })),
  updateTag: (tag: Tag) => {
    set((state) => ({
      ...state,
      tags: state.tags.map((t) => (t.id === tag.id ? tag : t)),
    }));
  },
}));

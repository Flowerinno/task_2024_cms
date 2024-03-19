import { AdvertisementDraft } from "@prisma/client";

import { create } from "zustand";

type AdStore = {
  draft: Partial<AdvertisementDraft>;
  selectDraft: (draft: AdvertisementDraft) => void;
  resetSelectedDraft: () => void;
};

export const useAdStore = create<AdStore>((set) => ({
  draft: {
    title: "",
    link: "",
    media: "",
    ad_priority: 0,
    is_active: false,
    post_id: 0,
  },
  selectDraft: (draft: AdvertisementDraft) =>
    set((state) => ({ ...state, draft })),
  resetSelectedDraft: () =>
    set((state) => ({
      ...state,
      draft: {
        title: "",
        content: "",
        link: "",
        creator: "",
        tags: [],
        media: "",
        is_active: false,
        pubDate_included: false,
      },
    })),
}));

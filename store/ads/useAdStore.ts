import { AdvertisementDraft } from '@prisma/client'

import { create } from 'zustand'

type AdStore = {
  draft: Partial<AdvertisementDraft>
  selectDraft: (draft: AdvertisementDraft) => void
  resetSelectedDraft: () => void
}

export const useAdStore = create<AdStore>((set) => ({
  draft: {
    title: '',
    link: '',
    media: '',
    ad_priority: 0,
    is_active: false,
    is_feed: true,
    is_search: false,
    post_id: 0,
  },
  selectDraft: (draft: AdvertisementDraft) => set((state) => ({ ...state, draft })),
  resetSelectedDraft: () =>
    set((state) => ({
      ...state,
      draft: {
        title: '',
        link: '',
        media: '',
        ad_priority: 0,
        is_feed: true,
        is_search: false,
        is_active: false,
      },
    })),
}))

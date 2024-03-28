import { AdvertisementDraft } from '@prisma/client'

import { create } from 'zustand'

type AdStore = {
  draft: Partial<AdvertisementDraft>
  selectDraft: (draft: AdvertisementDraft) => void
  resetSelectedDraft: () => void
}

const initialDraft: Partial<AdvertisementDraft> = {
  title: '',
  link: '',
  media: '',
  ad_priority: 0,
  is_active: false,
  is_feed: true,
  is_search: false,
  post_id: 0,
}

export const useAdStore = create<AdStore>((set) => ({
  draft: initialDraft,
  selectDraft: (draft: AdvertisementDraft) => set((state) => ({ ...state, draft })),
  resetSelectedDraft: () =>
    set((state) => ({
      ...state,
      draft: initialDraft,
    })),
}))

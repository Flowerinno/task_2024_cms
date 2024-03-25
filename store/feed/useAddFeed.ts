import { FeedItem } from '@/lib/helpers/types'
import { create } from 'zustand'

type Step = 1 | 2
type FeedStore = {
  step: Step
  url: string
  validated_feed: FeedItem | null
  included_fields: {
    title: boolean
    pubDate: boolean
    content: boolean
    creator: boolean
  }
  setStep: (step: Step) => void
  setValidatedFeed: (feed: FeedItem) => void
  setIncludedFields: (field: keyof FeedStore['included_fields']) => void
  setUrl: (url: string) => void
}

export const useAddFeed = create<FeedStore>((set) => ({
  step: 1,
  url: '',
  validated_feed: null,
  included_fields: {
    title: false,
    pubDate: false,
    content: false,
    creator: false,
  },
  setStep: (step: Step) => set((state) => ({ ...state, step })),
  setValidatedFeed: (feed: FeedItem) => set((state) => ({ ...state, validated_feed: feed })),
  setIncludedFields: (field: keyof FeedStore['included_fields']) =>
    set((state) => ({
      ...state,
      included_fields: {
        ...state.included_fields,
        [field]: state.included_fields[field] ? false : true,
      },
    })),
  setUrl: (url: string) => set((state) => ({ ...state, url })),
}))

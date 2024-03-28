import { DraftResponse } from 'utils/feed/types'
import { CreatePostSchema } from 'utils/validation/feed.schema'
import { create } from 'zustand'

type NewsStore = {
  drafts: DraftResponse[] | []
  setDrafts: (drafts: DraftResponse[] | []) => void
  draft: CreatePostSchema
  selectDraft: (draft: CreatePostSchema) => void
  addToDrafts: (draft: DraftResponse) => void
  resetSelectedDraft: () => void
  removeFromDrafts: (id: number) => void
}

const initialDraft: CreatePostSchema = {
  title: '',
  content: '',
  link: '',
  creator: '',
  tags: [],
  media: '',
  is_active: false,
  pubDate_included: false,
}

export const useNews = create<NewsStore>((set) => ({
  drafts: [],
  draft: initialDraft,
  setDrafts: (drafts: DraftResponse[] | []) => set((state) => ({ ...state, drafts })),
  selectDraft: (draft: CreatePostSchema) => set((state) => ({ ...state, draft })),
  addToDrafts: (draft: DraftResponse) =>
    set((state) => ({ ...state, drafts: [...state.drafts, draft] })),
  resetSelectedDraft: () =>
    set((state) => ({
      ...state,
      draft: initialDraft,
    })),
  removeFromDrafts: (id: number) =>
    set((state) => ({
      ...state,
      drafts: state.drafts.filter((draft) => draft.id !== id),
    })),
}))

import { News_source } from "@prisma/client";
import { create } from "zustand";

type RssStore = {
  sources: News_source[] | [];
  setSources: (sources: News_source[] | []) => void;
  setActiveSource: ({
    id,
    is_active,
  }: {
    id: number;
    is_active: boolean;
  }) => void;
  removeSource: (id: number) => void;
};

export const useRss = create<RssStore>((set) => ({
  sources: [],
  setSources: (sources: News_source[] | []) =>
    set((state) => ({ ...state, sources })),
  setActiveSource: ({ id, is_active }) =>
    set((state) => {
      state.sources.map((source) => {
        if (source.id === id) {
          source.is_active = is_active;
        }
      });
      return state;
    }),
  removeSource: (id: number) =>
    set((state) => ({
      ...state,
      sources: state.sources.filter((source) => source.id !== id),
    })),
}));

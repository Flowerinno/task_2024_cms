import { User } from "@prisma/client";
import { create } from "zustand";

type UserStore = {
  users: User[] | [];
  maxPage: number;
  setUsers: (users: User[]) => void;
  setMaxPage: (maxPage: number) => void;
};

export const useUserStore = create<UserStore>((set) => ({
  users: [],
  maxPage: 1,
  setUsers: (users) => set((state) => ({ ...state, users })),
  setMaxPage: (maxPage) => set((state) => ({ ...state, maxPage })),
}));

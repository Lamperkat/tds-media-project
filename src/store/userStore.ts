import { create } from "zustand";
import { User } from "../types/User";

type UserStoreType = {
  users: User[];
  setUsers: (users: User[]) => void;
  query: string;
  setQuery: (query: string) => void;
};

export const useUserStore = create<UserStoreType>((set) => ({
  users: [],
  setUsers: (users) => set({ users }),
  query: "",
  setQuery: (query) => set({ query }),
}));

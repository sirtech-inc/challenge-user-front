import { User } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  user: User | null;
  token: string;
  setLogin: (user: User, token: string) => void;
  logout: () => void;
}

export const useStore = create<State>()(
  persist(
    (set, get) => ({
      user: null,
      token: "",
      logout: () => {
        set(() => ({ user: null }));
        localStorage.removeItem("auth-user");
      },
      setLogin: (user: User, token: string) => {
        set({ user, token });
      },
    }),
    {
      name: "auth-user",
    }
  )
);

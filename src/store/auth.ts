import { User } from "@/types/user";
import { create } from "zustand";
import { Role } from "@/types/role";
import { persist } from "zustand/middleware";

type AuthStore = {
  user: User | null;
  accessToken: string | null;
  onAuthSuccess: (payload: { user: User; accessToken: string }) => void;
  clearAuth: () => void;
  isAdmin: () => boolean;
  isUser: () => boolean;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      onAuthSuccess: ({ user, accessToken }) => {
        set({ user: user, accessToken }); // Ambil hanya data
      },

      isAdmin: () => get().user?.role === Role.ADMIN,
      isUser: () => get().user?.role === Role.USER,

      clearAuth: () => {
        set(() => ({ user: null, accessToken: null }));
      },
    }),
    {
      name: "auth-store",
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
      }),
    },
  ),
);

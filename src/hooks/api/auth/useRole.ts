import { useAuthStore } from "@/store/auth";

export const useRole = () => {
  const user = useAuthStore((state) => state.user);
  return user?.role ?? null;
};

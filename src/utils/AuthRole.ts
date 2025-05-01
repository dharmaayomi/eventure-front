import { Session } from "next-auth";

export const isAdmin = (session: Session | null) => {
  return session?.user.role === "ADMIN";
};

export const isUser = (session: Session | null) => {
  return session?.user?.role === "USER";
};

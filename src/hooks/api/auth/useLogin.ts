"use client";

import { axiosInstance } from "@/lib/axios";
import { User } from "@/types/user";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const useLogin = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (payload: Pick<User, "email" | "password">) => {
      const { data } = await axiosInstance.post("/auth/login", payload);
      return data;
    },
    onSuccess: async (data) => {
      const { organizer, ...restUserData } = data.data;

      await signIn("credentials", {
        ...restUserData,
        ...(organizer && {
          organizerId: organizer.id,
          organizerName: organizer.name,
          organizerProfilePic: organizer.profilePic,
          organizerAboutUs: organizer.aboutUs,
          organizerCreatedAt: organizer.createdAt,
        }),
        redirect: false,
      });
      toast.success("Login success");
      router.push("/");
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data.message);
    },
  });
};

export default useLogin;

"use client";

import { User } from "@/types/user";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import useAxios from "../../useAxios";
import { auth } from "@/lib/auth";

const useUpdateProfile = () => {
  const router = useRouter();
  const { axiosInstance } = useAxios();
  return useMutation({
    mutationFn: async (payload: Pick<User, "fullName" | "userName">) => {
      const { data } = await axiosInstance.patch(
        "/auth/update-profile",
        payload,
      );
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
      toast.success("Profile updated successfully!");
      router.refresh();
      router.push("/dashboard/profile");
    },

    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data.message);
    },
  });
};

export default useUpdateProfile;

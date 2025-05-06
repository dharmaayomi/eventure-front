"use client";

import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import useAxios from "../../useAxios";
import { signIn, useSession } from "next-auth/react";

const useUploadProfile = () => {
  const router = useRouter();
  const { axiosInstance } = useAxios();
  const { update } = useSession();

  return useMutation({
    mutationFn: async (payload: { profilePic: File }) => {
      const formData = new FormData();
      formData.append("profilePic", payload.profilePic);

      const { data } = await axiosInstance.post(
        "/auth/upload-profile-picture",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      return data;
    },
    onSuccess: async (data) => {
      if (!data.data) {
        console.error("Upload response missing data:", data);
        toast.error("Upload failed or no user data returned.");
        return;
      }

      const { organizer, ...restUserData } = data.data;

      // Re-login dengan credentials provider untuk update session JWT
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

      toast.success("Profile picture uploaded successfully!");
      router.refresh();
      router.push("/dashboard/profile");
    },
    onError: (error: AxiosError<any>) => {
      toast.error(
        error.response?.data.message || "Failed to upload profile picture.",
      );
    },
  });
};

export default useUploadProfile;

"use client";

import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import useAxios from "./useAxios";

const useUploadProfile = () => {
  const router = useRouter();
  const { axiosInstance } = useAxios();

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
    onSuccess: () => {
      toast.success("Profile picture uploaded successfully!");
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

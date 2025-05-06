"use client";

import { axiosInstance } from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type UploadPayload = {
  profilePic: File;
};

const useUploadOrganizerProfile = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const token = session?.user?.accessToken;

  return useMutation({
    mutationFn: async ({ profilePic }: UploadPayload) => {
      const formData = new FormData();
      formData.append("profilePic", profilePic);

      const { data } = await axiosInstance.post(
        `/organizers/upload-organizer`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );

      return data;
    },
    onSuccess: async () => {
      toast.success("Organizer Picture uploaded successfully");
      router.push(`/dashboard/organizer`);
      router.refresh();
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data.message);
    },
  });
};

export default useUploadOrganizerProfile;

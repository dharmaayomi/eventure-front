import useAxios from "@/hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

const useUploadEventThumbnail = (id?: number) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { axiosInstance } = useAxios();
  return useMutation({
    mutationFn: async (payload: { thumbnail: File }) => {
      if (!id) throw new Error("Event ID is required");

      const formData = new FormData();
      formData.append("thumbnail", payload.thumbnail);

      const { data } = await axiosInstance.post(`/events/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return data;
    },
    onSuccess: async () => {
      toast.success("Thumbnail uploaded successfully");
      await queryClient.invalidateQueries({ queryKey: ["thumbnail event"] });
      router.refresh();
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data.message);
    },
  });
};

export default useUploadEventThumbnail;

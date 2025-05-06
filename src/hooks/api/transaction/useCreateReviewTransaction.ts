"use client";

import useAxios from "@/hooks/useAxios";
import { Rating } from "@/types/rating";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface CreateReviewPayload {
  review: string;
  rating: Rating;
}

const useCreateReview = (uuid: string) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { axiosInstance } = useAxios();

  return useMutation({
    mutationFn: async (payload: CreateReviewPayload) => {
      const { data } = await axiosInstance.post(
        `/reviews/${uuid}`,
        {
          review: payload.review,
          rating: payload.rating,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      return data;
    },
    onSuccess: async () => {
      toast.success("Review has been sent");
      await queryClient.invalidateQueries({ queryKey: ["reviews"] });
      router.push("/");
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data.message);
    },
  });
};

export default useCreateReview;

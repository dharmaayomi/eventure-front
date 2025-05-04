"use client";

import useAxios from "@/hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface UploadProofPayload {
  paymentProof: File | null;
}

const useUploadProof = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { axiosInstance } = useAxios();

  return useMutation({
    mutationFn: async (payload: UploadProofPayload) => {
      const uploadProofForm = new FormData();

      uploadProofForm.append("paymentProof", payload.paymentProof!);

      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/events`,
        createEventForm,
      );
      return data;
    },
    onSuccess: async () => {
      toast.success("Create event success");
      await queryClient.invalidateQueries({ queryKey: ["events"] });
      router.push("/");
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data.message);
    },
  });
};

export default useUploadProof;

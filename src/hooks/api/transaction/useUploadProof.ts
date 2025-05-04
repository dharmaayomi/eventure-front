"use client";

import useAxios from "@/hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

interface UploadProofPayload {
  paymentProof: File | null;
}

const useUploadProof = (uuid: string) => {
  const queryClient = useQueryClient();
  const { axiosInstance } = useAxios();

  return useMutation({
    mutationFn: async (payload: UploadProofPayload) => {
      const uploadProofForm = new FormData();

      uploadProofForm.append("paymentProof", payload.paymentProof!);

      const { data } = await axiosInstance.patch(
        `/transactions/detail/${uuid}`,
        uploadProofForm,
      );
      return data;
    },
    onSuccess: async () => {
      toast.success("Upload payment proof success");
      await queryClient.invalidateQueries({ queryKey: ["transaction", uuid] });
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data.message);
    },
  });
};

export default useUploadProof;

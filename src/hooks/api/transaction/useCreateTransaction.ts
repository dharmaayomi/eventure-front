"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface CreateTransactionPayload {
  details: { ticketId: number; qty: number }[];
}

const useCreateTransaction = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateTransactionPayload) => {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/transactions`,
        payload,
      );
      return data;
    },
    onSuccess: async () => {
      toast.success("Create transaction success");
      await queryClient.invalidateQueries({ queryKey: ["transactions"] });
      router.push("/");
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data.message);
    },
  });
};

export default useCreateTransaction;

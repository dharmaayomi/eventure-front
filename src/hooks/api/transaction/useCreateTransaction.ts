"use client";

import useAxios from "@/hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface CreateTransactionPayload {
  details: { ticketId: number; qty: number }[];
  referralCouponCode: string;
  voucherCode: string;
  usePoints: boolean;
}

const useCreateTransaction = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { axiosInstance } = useAxios();

  return useMutation({
    mutationFn: async (payload: CreateTransactionPayload) => {
      const { data } = await axiosInstance.post(`/transactions`, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("data diterima:", data);
      return data;
    },
    onSuccess: async (data) => {
      toast.success("Create transaction success");
      await queryClient.invalidateQueries({ queryKey: ["transactions"] });
      router.push(`/transaction-detail/${data.data.uuid}`);
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data.message);
    },
  });
};

export default useCreateTransaction;

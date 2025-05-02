"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface CreateVoucherPayload {
  eventId: string;
  code: string;
  discountAmount: string;
  startDate: string;
  endDate: string;
  qty: string;
}

const useCreateVoucher = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateVoucherPayload) => {
      const createVoucherForm = new FormData();

      createVoucherForm.append("eventId", payload.eventId);
      createVoucherForm.append("code", payload.code);
      createVoucherForm.append("discountAmount", payload.discountAmount);
      createVoucherForm.append("startDate", payload.startDate);
      createVoucherForm.append("endDate", payload.endDate);
      createVoucherForm.append("qty", payload.qty);

      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/vouchers`,
        createVoucherForm,
      );
      return data;
    },
    onSuccess: async () => {
      toast.success("Create voucher success");
      await queryClient.invalidateQueries({ queryKey: ["vouchers"] });
      router.push("/");
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data.message);
    },
  });
};

export default useCreateVoucher;

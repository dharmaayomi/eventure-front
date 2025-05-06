"use client";

import useAxios from "@/hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { format } from "date-fns";

interface CreateVoucherPayload {
  eventName: string;
  code: string;
  discountAmount: string;
  startDate: Date;
  endDate: Date;
}

const useCreateVoucher = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { axiosInstance } = useAxios();

  return useMutation({
    mutationFn: async (payload: CreateVoucherPayload) => {
      const createVoucherForm = new FormData();
      const startDateString =
        payload.startDate instanceof Date && !isNaN(payload.startDate.getTime())
          ? format(payload.startDate, "yyyy-MM-dd")
          : "";

      const endDateString =
        payload.endDate instanceof Date && !isNaN(payload.endDate.getTime())
          ? format(payload.endDate, "yyyy-MM-dd")
          : "";

      createVoucherForm.append("eventName", payload.eventName);
      createVoucherForm.append("code", payload.code);
      createVoucherForm.append("discountAmount", payload.discountAmount);
      createVoucherForm.append("startDate", startDateString);
      createVoucherForm.append("endDate", endDateString);

      const { data } = await axiosInstance.post(
        `/vouchers`,
        createVoucherForm,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      console.log("sending data", data);

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

"use client";

import useAxios from "@/hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface CreateTicketPayload {
  eventName: string;
  ticketType: string;
  price: number;
  qty: number;
}

const useCreateTicket = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { axiosInstance } = useAxios();

  return useMutation({
    mutationFn: async (payload: CreateTicketPayload) => {
      const { data } = await axiosInstance.post(`/tickets`, payload);
      console.log("sending data", data);

      return data;
    },
    onSuccess: async () => {
      toast.success("Create ticket success");
      await queryClient.invalidateQueries({ queryKey: ["tickets"] });
      router.push("/");
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data.message);
    },
  });
};

export default useCreateTicket;

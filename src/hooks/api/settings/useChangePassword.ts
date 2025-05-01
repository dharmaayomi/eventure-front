"use client";

import { axiosInstance } from "@/lib/axios";
import { User } from "@/types/user";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import useAxios from "../../useAxios";

const useChangePassword = () => {
  const router = useRouter();
  const { axiosInstance } = useAxios();
  return useMutation({
    mutationFn: async (payload: {
      oldPassword: string;
      newPassword: string;
    }) => {
      const { data } = await axiosInstance.patch(
        "/auth/change-password",
        payload,
      );
      return data;
    },
    onSuccess: (data) => {
      toast.success("Change password success");
      router.push("/dashboard/settings");
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data.message);
    },
  });
};

export default useChangePassword;

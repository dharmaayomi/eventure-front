"use client";

import { User } from "@/types/user";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import useAxios from "./useAxios";

const useUpdateProfile = () => {
  const router = useRouter();
  const { axiosInstance } = useAxios();
  return useMutation({
    mutationFn: async (payload: Pick<User, "fullName" | "userName">) => {
      const { data } = await axiosInstance.patch(
        "/auth/update-profile",
        payload,
      );
      return data;
    },
    onSuccess: (data) => {
      toast.success("Update profile success");
      router.push("/dashboard/profile");
    },

    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data.message);
    },
  });
};

export default useUpdateProfile;

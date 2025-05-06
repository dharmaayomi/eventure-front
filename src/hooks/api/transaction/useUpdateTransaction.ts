import useAxios from "@/hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const useUpdateTransaction = (uuid: string) => {
  const router = useRouter();
  const session = useSession();
  const token = session?.data?.user?.accessToken;
  const queryClient = useQueryClient();
  const { axiosInstance } = useAxios();

  return useMutation({
    mutationFn: async ({
      uuid,
      action,
    }: {
      uuid: string;
      action: "accept" | "reject";
    }) => {
      const response = await axiosInstance.patch(
        `/transactions/update/${uuid}`,
        { action },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }, // kirim action di body
      );
      return response.data;
    },
  });
};

export default useUpdateTransaction;

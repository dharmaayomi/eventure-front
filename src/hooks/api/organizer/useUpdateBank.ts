import { axiosInstance } from "@/lib/axios";
import { Organizer } from "@/types/organizer";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const useUpdateBank = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const token = session?.user?.accessToken;
  return useMutation({
    mutationFn: async (payload: Partial<Organizer>) => {
      const response = await axiosInstance.patch(
        `/organizers/bank-details`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return response.data;
    },

    onSuccess: () => {
      toast.success("Update bank details Success");
      router.push("/dashboard/settings");
    },
    onError: (error: AxiosError<any>) => {
      toast.error(
        error.response?.data.message || "Failed to update bank details",
      );
    },
  });
};

export default useUpdateBank;
